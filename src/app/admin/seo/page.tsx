"use client";

import { useCallback, useEffect, useState, type CSSProperties } from "react";
import { EDITABLE_PAGES } from "@/lib/seo/pages";

// Mini SEO CMS editor. Brand-styled, gated by the same shared secret as the
// admin API (ADMIN_SEO_SECRET). The secret is entered once and held in memory
// (and sessionStorage) for the session; it is sent as the x-admin-secret
// header on every request. Edit title/description/OG image/canonical/noindex
// per page, with live character counters (title 60, description 160).

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
  const [authed, setAuthed] = useState(false);
  const [rows, setRows] = useState<Record<string, Row>>({});
  const [status, setStatus] = useState<Record<string, string>>({});
  const [error, setError] = useState("");

  const authHeaders = (e: string, p: string) => ({
    "x-admin-email": e,
    "x-admin-password": p,
  });

  const load = useCallback(async (e: string, p: string) => {
    setError("");
    try {
      const r = await fetch("/api/admin/seo", { headers: authHeaders(e, p) });
      if (r.status === 401) {
        setError("Those credentials were not accepted.");
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

  useEffect(() => {
    if (typeof window === "undefined") return;
    const e = sessionStorage.getItem("seoEmail");
    const p = sessionStorage.getItem("seoPassword");
    if (e && p) {
      setEmail(e);
      setPassword(p);
      load(e, p).then((ok) => setAuthed(ok));
    }
  }, [load]);

  const signIn = async () => {
    const ok = await load(email, password);
    if (ok) {
      setAuthed(true);
      sessionStorage.setItem("seoEmail", email);
      sessionStorage.setItem("seoPassword", password);
    }
  };

  const update = (path: string, patch: Partial<Row>) =>
    setRows((r) => ({ ...r, [path]: { ...r[path], ...patch } }));

  const save = async (path: string) => {
    setStatus((s) => ({ ...s, [path]: "Saving…" }));
    try {
      const r = await fetch("/api/admin/seo", {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeaders(email, password) },
        body: JSON.stringify(rows[path]),
      });
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
            onKeyDown={(e) => e.key === "Enter" && signIn()}
          />
          <input
            type="password"
            autoComplete="current-password"
            style={input}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && signIn()}
          />
          {error && <div style={{ color: "#ff8a8a", fontSize: 13, marginTop: 12 }}>{error}</div>}
          <button
            onClick={signIn}
            style={{
              marginTop: 16,
              background: "#b5e602",
              color: "#0c1321",
              border: 0,
              borderRadius: 4,
              padding: "12px 20px",
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Sign in
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
