// ============================================================================
// SEO admin security: signed sessions, Cloudflare Turnstile, Upstash rate
// limiting. Server-only (imported by the /api/admin/seo route handlers).
//
// Every piece degrades gracefully by design:
//   - No ADMIN_SESSION_SECRET  -> sessions cannot be issued/verified (fail
//     closed: the admin is locked until the secret is set).
//   - No TURNSTILE_SECRET_KEY  -> the human check is skipped (not enforced)
//     so the admin still works before the keys are added.
//   - No UPSTASH_REDIS_* vars  -> rate limiting is skipped (allowed) rather
//     than throwing; add the vars to turn it on.
// ============================================================================

import crypto from "node:crypto";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// ---------------------------------------------------------------------------
// Client IP (Vercel sets x-forwarded-for; first hop is the real client).
// ---------------------------------------------------------------------------
export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

// ---------------------------------------------------------------------------
// Rate limiting (Upstash Redis, sliding window). Built lazily and only if the
// env is present, so a missing config never throws at import time.
// ---------------------------------------------------------------------------
function redisFromEnv(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  try {
    return new Redis({ url, token });
  } catch {
    return null;
  }
}

let _loginLimiter: Ratelimit | null | undefined;
let _apiLimiter: Ratelimit | null | undefined;

function loginLimiter(): Ratelimit | null {
  if (_loginLimiter !== undefined) return _loginLimiter;
  const redis = redisFromEnv();
  _loginLimiter = redis
    ? new Ratelimit({
        redis,
        // 10 sign-in attempts per IP per 10 minutes. Still infeasible to
        // brute-force a real password, but forgiving for a fumbled login.
        // A successful sign-in resets the counter (see resetLoginLimit).
        limiter: Ratelimit.slidingWindow(10, "10 m"),
        // Prefix carries a version suffix: bump it to reset every IP's counter
        // (the old keys expire on their own).
        prefix: "rl:seo:login:v2",
        analytics: false,
      })
    : null;
  return _loginLimiter;
}

function apiLimiter(): Ratelimit | null {
  if (_apiLimiter !== undefined) return _apiLimiter;
  const redis = redisFromEnv();
  _apiLimiter = redis
    ? new Ratelimit({
        redis,
        // 60 authenticated read/write calls per IP per minute.
        limiter: Ratelimit.slidingWindow(60, "1 m"),
        prefix: "rl:seo:api",
        analytics: false,
      })
    : null;
  return _apiLimiter;
}

export type RateResult = { ok: boolean; retryAfter: number };

async function limit(rl: Ratelimit | null, key: string): Promise<RateResult> {
  if (!rl) return { ok: true, retryAfter: 0 }; // not configured -> allow
  try {
    const { success, reset } = await rl.limit(key);
    const retryAfter = Math.max(0, Math.ceil((reset - Date.now()) / 1000));
    return { ok: success, retryAfter };
  } catch {
    // Never lock the admin out because the limiter backend is unreachable.
    return { ok: true, retryAfter: 0 };
  }
}

export const rateLimitLogin = (ip: string) => limit(loginLimiter(), ip);
export const rateLimitApi = (ip: string) => limit(apiLimiter(), ip);

/** Clear an IP's login attempt counter (called after a successful sign-in). */
export async function resetLoginLimit(ip: string): Promise<void> {
  const rl = loginLimiter();
  if (!rl) return;
  try {
    await rl.resetUsedTokens(ip);
  } catch {
    /* best effort */
  }
}

// ---------------------------------------------------------------------------
// Cloudflare Turnstile verification.
// ---------------------------------------------------------------------------
export function turnstileConfigured(): boolean {
  return Boolean(process.env.TURNSTILE_SECRET_KEY);
}

/** The public site key, served to the client at runtime (no rebuild needed). */
export function turnstileSiteKey(): string | null {
  return process.env.TURNSTILE_SITE_KEY || null;
}

/**
 * Verify a Turnstile token. Returns true when the human check passes, or when
 * Turnstile is not configured (so the admin still works before keys are added).
 */
export async function verifyTurnstile(
  token: string | null,
  ip: string,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not enforced until configured
  if (!token) return false;
  try {
    const form = new URLSearchParams();
    form.set("secret", secret);
    form.set("response", token);
    if (ip && ip !== "unknown") form.set("remoteip", ip);
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body: form },
    );
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false; // fail closed when a check was expected
  }
}

// ---------------------------------------------------------------------------
// Credentials (constant-time compare).
// ---------------------------------------------------------------------------
function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

export function checkCredentials(email: string, password: string): boolean {
  const e = process.env.ADMIN_EMAIL;
  const p = process.env.ADMIN_PASSWORD;
  if (!e || !p) return false; // disabled until configured
  // Compare both even if the first fails, to avoid leaking which was wrong.
  const okE = safeEqual(email, e);
  const okP = safeEqual(password, p);
  return okE && okP;
}

// ---------------------------------------------------------------------------
// Signed session tokens: base64url(payload).hmacSHA256(payload). No external
// JWT dependency needed for a single-audience server-verified token.
// ---------------------------------------------------------------------------
const SESSION_TTL_SECONDS = 8 * 60 * 60; // 8 hours

function b64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function hmac(secret: string, data: string): string {
  return b64url(crypto.createHmac("sha256", secret).update(data).digest());
}

/** Issue a session token, or null if no session secret is configured. */
export function issueSession(): { token: string; exp: number } | null {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return null;
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = b64url(JSON.stringify({ sub: "seo-admin", exp }));
  const sig = hmac(secret, payload);
  return { token: `${payload}.${sig}`, exp };
}

/** Verify a session token from an Authorization: Bearer header. */
export function verifySession(authorization: string | null): boolean {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || !authorization) return false;
  const token = authorization.replace(/^Bearer\s+/i, "").trim();
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  const expected = hmac(secret, payload);
  if (!safeEqual(sig, expected)) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64").toString()) as {
      exp?: number;
      sub?: string;
    };
    if (data.sub !== "seo-admin" || typeof data.exp !== "number") return false;
    return data.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}
