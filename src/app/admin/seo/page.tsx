"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { EDITABLE_PAGES } from "@/lib/seo/pages";

// Mini SEO CMS editor. Brand-styled. Sign-in posts email + password and a
// Cloudflare Turnstile "check you are human" token to /api/admin/seo/login,
// which (behind per-IP rate limiting) returns a short-lived signed session
// token. That token is held in sessionStorage and sent as an Authorization:
// Bearer header on the read/write calls, so the captcha is solved once per
// session, not on every request. Edit title/description/OG image/canonical/
// noindex per page, with live character counters (title 60, description 160).

type Turnstile = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id?: string) => void;
};
declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

type Row = {
  path: string;
  seo_title: string;
  seo_description: string;
  og_image_url: string;
  canonical_url: string;
  noindex: boolean;
};

const TITLE_MAX = 60;
const DESC_MAX = 160;

const shell: CSSProperties = {
  background: "#0c1321",
  color: "#fff",
  minHeight: "100vh",
  fontFamily: "var(--font-sans)",
  padding: "48px 24px 120px",
};
const wrap: CSSProperties = { maxWidth: 860, margin: "0 auto" };
const label: CSSProperties = {
  display: "block",
  fontSize: 11,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.55)",
  marginBottom: 8,
};
const input: CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 4,
  color: "#fff",
  fontFamily: "var(--font-sans)",
  fontSize: 14,
  padding: "10px 12px",
  outline: "none",
};
const card: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 12,
  background: "rgba(255,255,255,0.02)",
  padding: 24,
  marginBottom: 20,
};

function emptyRow(path: string): Row {
  return {
    path,
    seo_title: "",
    seo_description: "",
    og_image_url: "",
    canonical_url: "",
    noindex: false,
  };
}

function counter(len: number, max: number): CSSProperties {
  return {
    fontSize: 11,
    marginTop: 6,
    color: len > max ? "#ff8a8a" : "rgba(255,255,255,0.4)",
  };
}

export default function SeoAdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [authed, setAuthed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [rows, setRows] = useState<Record<string, Row>>({});
  const [status, setStatus] = useState<Record<string, string>>({});
  const [error, setError] = useState("");

  // Turnstile ("check you are human") state.
  const [siteKey, setSiteKey] = useState<string | null>(null);
  const [captchaRequired, setCaptchaRequired] = useState(false);
  const [capToken, setCapToken] = useState("");
  const capRef = useRef<HTMLDivElement | null>(null);
  const widgetId = useRef<string | null>(null);

  const load = useCallback(async (tok: string) => {
    setError("");
    try {
      const r = await fetch("/api/admin/seo", {
        headers: { Authorization: `Bearer ${tok}` },
      });
      if (r.status === 401) {
        setError("Your session has expired. Please sign in again.");
        return false;
      }
      if (r.status === 429) {
        setError("Too many requests. Please wait a moment and try again.");
        return false;
      }
      if (!r.ok) {
        const j = await r.json().catch(() => ({}));
        setError(j.error || "Could not load SEO data.");
        return false;
      }
      const j = (await r.json()) as { rows: Row[] };
      const byPath: Record<string, Row> = {};
      for (const p of EDITABLE_PAGES) byPath[p.path] = emptyRow(p.path);
      for (const row of j.rows) {
        byPath[row.path] = {
          path: row.path,
          seo_title: row.seo_title || "",
          seo_description: row.seo_description || "",
          og_image_url: row.og_image_url || "",
          canonical_url: row.canonical_url || "",
          noindex: !!row.noindex,
        };
      }
      setRows(byPath);
      return true;
    } catch {
      setError("Network error loading SEO data.");
      return false;
    }
  }, []);

  // Load the sign-in config (Turnstile site key) and restore any live session.
  useEffect(() => {
    if (typeof window === "undefined") return;
    fetch("/api/admin/seo/login")
      .then((r) => r.json())
      .then((c: { turnstileSiteKey?: string | null; captchaRequired?: boolean }) => {
        setSiteKey(c.turnstileSiteKey || null);
        setCaptchaRequired(Boolean(c.captchaRequired));
      })
      .catch(() => {});

    const tok = sessionStorage.getItem("seoToken");
    if (tok) {
      setToken(tok);
      load(tok).then((ok) => {
        if (ok) setAuthed(true);
        else sessionStorage.removeItem("seoToken");
      });
    }
  }, [load]);

  const resetCaptcha = useCallback(() => {
    setCapToken("");
    if (window.turnstile && widgetId.current) {
      try {
        window.turnstile.reset(widgetId.current);
      } catch {
        /* ignore */
      }
    }
  }, []);

  // Render the Turnstile widget on the sign-in screen once we have a site key.
  useEffect(() => {
    if (authed || !siteKey) return;
    const renderWidget = () => {
      if (!window.turnstile || !capRef.current || widgetId.current) return;
      widgetId.current = window.turnstile.render(capRef.current, {
        sitekey: siteKey,
        theme: "dark",
        callback: (t: string) => setCapToken(t),
        "error-callback": () => setCapToken(""),
        "expired-callback": () => setCapToken(""),
      });
    };
    if (window.turnstile) {
      renderWidget();
      return;
    }
    const scriptId = "cf-turnstile-script";
    if (!document.getElementById(scriptId)) {
      const s = document.createElement("script");
      s.id = scriptId;
      s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      s.async = true;
      s.defer = true;
      s.onload = renderWidget;
      document.head.appendChild(s);
    } else {
      const poll = setInterval(() => {
        if (window.turnstile) {
          clearInterval(poll);
          renderWidget();
        }
      }, 150);
      return () => clearInterval(poll);
    }
  }, [authed, siteKey]);

  const signIn = async () => {
    if (busy) return;
    setError("");
    setBusy(true);
    try {
      const r = await fetch("/api/admin/seo/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, turnstileToken: capToken }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) {
        setError(j.error || "Sign in failed.");
        resetCaptcha();
        return;
      }
      const tok = j.token as string;
      sessionStorage.setItem("seoToken", tok);
      setToken(tok);
      const ok = await load(tok);
      setAuthed(ok);
      if (ok) setPassword("");
    } catch {
      setError("Network error signing in.");
      resetCaptcha();
    } finally {
      setBusy(false);
    }
  };

  const update = (path: string, patch: Partial<Row>) =>
    setRows((r) => ({ ...r, [path]: { ...r[path], ...patch } }));

  const save = async (path: string) => {
    setStatus((s) => ({ ...s, [path]: "Saving…" }));
    try {
      const r = await fetch("/api/admin/seo", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(rows[path]),
      });
      if (r.status === 401) {
        setStatus((s) => ({ ...s, [path]: "" }));
        setAuthed(false);
        setToken("");
        sessionStorage.removeItem("seoToken");
        setError("Your session has expired. Please sign in again.");
        return;
      }
      if (!r.ok) {
        const j = await r.json().catch(() => ({}));
        setStatus((s) => ({ ...s, [path]: j.error || "Save failed" }));
        return;
      }
      setStatus((s) => ({ ...s, [path]: "Saved" }));
      setTimeout(() => setStatus((s) => ({ ...s, [path]: "" })), 2000);
    } catch {
      setStatus((s) => ({ ...s, [path]: "Network error" }));
    }
  };

  if (!authed) {
    const blockedByCaptcha = captchaRequired && !capToken;
    return (
      <div style={shell}>
        <div style={{ ...wrap, maxWidth: 400 }}>
          <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>
            SEO editor<span style={{ color: "#b5e602" }}>.</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, marginBottom: 20 }}>
            Sign in to edit per-page SEO.
          </p>
          <input
            type="email"
            autoComplete="username"
            style={{ ...input, marginBottom: 12 }}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !blockedByCaptcha && signIn()}
          />
          <input
            type="password"
            autoComplete="current-password"
            style={input}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !blockedByCaptcha && signIn()}
          />
          {siteKey && <div ref={capRef} style={{ marginTop: 16 }} />}
          {error && <div style={{ color: "#ff8a8a", fontSize: 13, marginTop: 12 }}>{error}</div>}
          <button
            onClick={signIn}
            disabled={busy || blockedByCaptcha}
            style={{
              marginTop: 16,
              background: "#b5e602",
              color: "#0c1321",
              border: 0,
              borderRadius: 4,
              padding: "12px 20px",
              fontWeight: 600,
              fontSize: 14,
              cursor: busy || blockedByCaptcha ? "not-allowed" : "pointer",
              opacity: busy || blockedByCaptcha ? 0.55 : 1,
            }}
          >
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={shell}>
      <div style={wrap}>
        <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 6 }}>
          Per-page SEO<span style={{ color: "#b5e602" }}>.</span>
        </h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, marginBottom: 32 }}>
          Blank fields fall back to the built-in defaults. Changes take effect on
          the next page load (or redeploy for statically cached pages).
        </p>
        {error && <div style={{ color: "#ff8a8a", fontSize: 13, marginBottom: 16 }}>{error}</div>}

        {EDITABLE_PAGES.map((p) => {
          const row = rows[p.path] || emptyRow(p.path);
          return (
            <div key={p.path} style={card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 18 }}>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 600 }}>{p.label}</div>
                  <code style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{p.path}</code>
                </div>
                <button
                  onClick={() => save(p.path)}
                  style={{
                    background: "#b5e602",
                    color: "#0c1321",
                    border: 0,
                    borderRadius: 4,
                    padding: "8px 16px",
                    fontWeight: 600,
                    fontSize: 13,
                    cursor: "pointer",
                  }}
                >
                  Save
                </button>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={label}>SEO title</label>
                <input
                  style={input}
                  value={row.seo_title}
                  placeholder={p.defaultTitle}
                  onChange={(e) => update(p.path, { seo_title: e.target.value })}
                />
                <div style={counter(row.seo_title.length, TITLE_MAX)}>
                  {row.seo_title.length}/{TITLE_MAX}
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={label}>SEO description</label>
                <textarea
                  style={{ ...input, minHeight: 70, resize: "vertical", lineHeight: 1.5 }}
                  value={row.seo_description}
                  placeholder={p.defaultDescription}
                  onChange={(e) => update(p.path, { seo_description: e.target.value })}
                />
                <div style={counter(row.seo_description.length, DESC_MAX)}>
                  {row.seo_description.length}/{DESC_MAX}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={label}>Social image URL</label>
                  <input
                    style={input}
                    value={row.og_image_url}
                    placeholder="/og/custom.png or https://…"
                    onChange={(e) => update(p.path, { og_image_url: e.target.value })}
                  />
                </div>
                <div>
                  <label style={label}>Canonical URL</label>
                  <input
                    style={input}
                    value={row.canonical_url}
                    placeholder="(defaults to this page)"
                    onChange={(e) => update(p.path, { canonical_url: e.target.value })}
                  />
                </div>
              </div>

              <label style={{ display: "inline-flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={row.noindex}
                  onChange={(e) => update(p.path, { noindex: e.target.checked })}
                />
                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.8)" }}>
                  Hide from search engines (noindex, and drop from sitemap)
                </span>
              </label>

              {status[p.path] && (
                <div style={{ fontSize: 12, color: "#b5e602", marginTop: 12 }}>{status[p.path]}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
