import { NextResponse } from "next/server";
import {
  clientIp,
  rateLimitLogin,
  resetLoginLimit,
  verifyTurnstile,
  turnstileConfigured,
  turnstileSiteKey,
  checkCredentials,
  issueSession,
} from "@/lib/admin/auth";

// Sign-in for the mini SEO CMS. Rate limited per IP, gated by a Cloudflare
// Turnstile human check, and on success issues a short-lived signed session
// token used as a Bearer credential for the /api/admin/seo read/write calls.
export const dynamic = "force-dynamic";

// GET returns the client config so the sign-in form can render the Turnstile
// widget without a rebuild when keys change (the site key is public).
export function GET() {
  return NextResponse.json({
    turnstileSiteKey: turnstileSiteKey(),
    captchaRequired: turnstileConfigured(),
  });
}

export async function POST(req: Request) {
  const ip = clientIp(req);

  // 1. Rate limit first, so brute-force attempts are throttled before any work.
  const rl = await rateLimitLogin(ip);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many attempts. Please wait and try again." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } },
    );
  }

  let body: { email?: string; password?: string; turnstileToken?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const email = (body.email || "").trim();
  const password = body.password || "";

  // 2. Human check (skipped only when Turnstile is not configured).
  const human = await verifyTurnstile(body.turnstileToken ?? null, ip);
  if (!human) {
    return NextResponse.json(
      { error: "Human verification failed. Please try again." },
      { status: 403 },
    );
  }

  // 3. Credentials.
  if (!checkCredentials(email, password)) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  // 4. Issue a signed session.
  const session = issueSession();
  if (!session) {
    // ADMIN_SESSION_SECRET not set: fail closed rather than hand out a token
    // that cannot be verified.
    return NextResponse.json(
      { error: "Admin session is not configured" },
      { status: 503 },
    );
  }

  // Successful sign-in clears this IP's attempt counter so a legitimate admin
  // can never lock themselves out by fumbling a few logins.
  await resetLoginLimit(ip);

  return NextResponse.json({ ok: true, token: session.token, exp: session.exp });
}
