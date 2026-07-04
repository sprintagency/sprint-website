"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import CustomSelect from "./CustomSelect";
import MapFacade from "./MapFacade";
import { siteConfig } from "@/lib/seo/config";
import {
  BUDGETS,
  DEFAULT_HEADING,
  DETAILS,
  HEADINGS,
  TIMELINES,
  TOPIC_OPTIONS,
  isRecruit,
  resolveIntent,
  validEmail,
  type TopicKey,
} from "@/lib/contact-form";

const monoLabel: CSSProperties = {
  display: "block",
  fontSize: 11,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.55)",
  marginBottom: 8,
};

const emptyForm = {
  name: "",
  email: "",
  company: "",
  phone: "",
  detail: "",
  budget: "",
  timeline: "",
  portfolio: "",
  message: "",
};

export default function ContactView() {
  const [form, setForm] = useState({ ...emptyForm });
  const [topic, setTopic] = useState<TopicKey>("");
  const [heading, setHeading] = useState(DEFAULT_HEADING);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const selectTopic = (t: TopicKey, presetDetail?: string) => {
    setTopic(t);
    setHeading(t ? HEADINGS[t] || DEFAULT_HEADING : DEFAULT_HEADING);
    setForm((f) => ({ ...f, detail: presetDetail ?? "" }));
  };

  // Smart pre-fill from URL query params (?intent=…&plan=…&service=…).
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const { topic: t, detail } = resolveIntent(
      q.get("intent"),
      q.get("plan"),
      q.get("service"),
    );
    if (t) selectTopic(t, detail || undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const detailCfg = topic ? DETAILS[topic] : null;
  const recruit = isRecruit(topic);
  const portfolioLabel =
    topic === "careers" ? "Portfolio or LinkedIn" : "Portfolio or website";
  const firstName = form.name.trim().split(" ")[0];

  const submit = async () => {
    if (submitting) return;
    if (!form.name.trim()) return setError("Please add your name.");
    if (!validEmail(form.email.trim()))
      return setError("Please add a valid email.");
    if (!topic) return setError("Please pick what we can help with.");
    setError("");
    setSubmitting(true);
    const payload = {
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
      topic,
      source_url: typeof window !== "undefined" ? window.location.href : "",
      created_at: new Date().toISOString(),
    };
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!r.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      setError(
        "Something went wrong. Please email hello@madebysprint.com directly.",
      );
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        background: "#0c1321",
        color: "#ffffff",
        fontFamily: "var(--font-sans)",
        minHeight: "100vh",
        overflowX: "clip",
        position: "relative",
      }}
    >
      {/* ambient glows */}
      <div
        style={{
          position: "absolute",
          top: -240,
          right: -160,
          width: 1000,
          height: 1000,
          maxWidth: "80vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(93,107,255,0.26),rgba(138,92,255,0.10) 40%,transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -320,
          left: -200,
          width: 900,
          height: 900,
          maxWidth: "80vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(138,92,255,0.16),rgba(93,107,255,0.06) 44%,transparent 72%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* minimal nav */}
      <header style={{ position: "relative", zIndex: 20 }}>
        <div
          className="px"
          style={{
            maxWidth: 1360,
            margin: "0 auto",
            padding: "22px 48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
          }}
        >
          <a href="/" className="logo-link" aria-label="Sprint home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/sprint-logo-white.svg"
              alt="Sprint"
              style={{ height: 26, width: "auto", display: "block" }}
            />
          </a>
          <a
            href="/"
            className="footer-link"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              color: "rgba(255,255,255,0.72)",
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            <span style={{ fontSize: 16 }}>&larr;</span> Back to site
          </a>
        </div>
      </header>

      <section
        className="px"
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 1360,
          margin: "0 auto",
          padding: "44px 48px 110px",
        }}
      >
        <div
          className="contact-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,0.82fr) minmax(0,1.18fr)",
            gap: 72,
            alignItems: "start",
          }}
        >
          {/* LEFT: context */}
          <div className="contact-left" style={{ position: "sticky", top: 40 }}>
            <div className="s-eyebrow" style={{ color: "var(--sprint-lime)", marginBottom: 24 }}>
              [ GET IN TOUCH ]
            </div>
            <h1
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: "clamp(38px,4.4vw,58px)",
                lineHeight: 1.03,
                letterSpacing: "-0.03em",
                margin: "0 0 24px",
              }}
            >
              <span>{heading}</span>
              <span className="s-dot">.</span>
            </h1>
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.66)",
                margin: "0 0 44px",
                maxWidth: 420,
              }}
            >
              Tell us what you need and we&rsquo;ll come back with a clear next
              step, usually within one business day.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
              <div>
                <div
                  className="s-mono"
                  style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.42)", marginBottom: 8 }}
                >
                  Email
                </div>
                <a
                  href="mailto:hello@madebysprint.com"
                  className="footer-link"
                  style={{ color: "#ffffff", textDecoration: "none", fontSize: 17, fontWeight: 500 }}
                >
                  hello@madebysprint.com
                </a>
              </div>
              <div>
                <div
                  className="s-mono"
                  style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.42)", marginBottom: 8 }}
                >
                  Response time
                </div>
                <div style={{ fontSize: 17, fontWeight: 500, color: "rgba(255,255,255,0.9)" }}>
                  Within one business day
                </div>
              </div>
              <div>
                <div
                  className="s-mono"
                  style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.42)", marginBottom: 8 }}
                >
                  Studio
                </div>
                <a
                  href="/fort-worth"
                  className="footer-link"
                  style={{ color: "#ffffff", textDecoration: "none", fontSize: 16, fontWeight: 500, lineHeight: 1.5, display: "block" }}
                >
                  {siteConfig.primaryLocation.streetAddress}
                  <br />
                  {siteConfig.primaryLocation.addressLocality},{" "}
                  {siteConfig.primaryLocation.addressRegion}{" "}
                  {siteConfig.primaryLocation.postalCode}
                </a>
              </div>
              <div>
                <div
                  className="s-mono"
                  style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.42)", marginBottom: 18 }}
                >
                  Trusted by
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3,auto)",
                    gap: "24px 30px",
                    alignItems: "center",
                    justifyItems: "start",
                    maxWidth: 360,
                  }}
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={n}
                      src={`/assets/logos/logo${String(n).padStart(2, "0")}.svg`}
                      alt=""
                      style={{ height: 22, width: "auto", display: "block", opacity: 0.55 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: form card */}
          <div
            style={{
              position: "relative",
              padding: "44px 44px 40px",
              borderRadius: 10,
              background:
                "radial-gradient(ellipse 110% 120% at 80% -10%,rgba(93,107,255,0.16),rgba(138,92,255,0.06) 46%,rgba(255,255,255,0.02) 80%),rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.11)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              boxShadow: "0 40px 90px -50px rgba(0,0,0,0.85)",
            }}
          >
            {!submitted ? (
              <form
                className="cform"
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  submit();
                }}
              >
                <div
                  className="contact-2col"
                  style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}
                >
                  <div>
                    <label className="s-mono" style={monoLabel}>
                      Name <span style={{ color: "var(--sprint-lime)" }}>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="s-mono" style={monoLabel}>
                      Email <span style={{ color: "var(--sprint-lime)" }}>*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                    />
                  </div>
                </div>

                <div
                  className="contact-2col"
                  style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 26 }}
                >
                  <div>
                    <label className="s-mono" style={monoLabel}>Company</label>
                    <input
                      type="text"
                      placeholder="Company name"
                      value={form.company}
                      onChange={(e) => set("company", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="s-mono" style={monoLabel}>Phone</label>
                    <input
                      type="tel"
                      placeholder="Optional"
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                    />
                  </div>
                </div>

                {!recruit && (
                <div style={{ marginBottom: 22 }}>
                  <label className="s-mono" style={{ ...monoLabel, marginBottom: 12 }}>
                    What can we help with? <span style={{ color: "var(--sprint-lime)" }}>*</span>
                  </label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                    {TOPIC_OPTIONS.map((o) => {
                      const on = topic === o.value;
                      return (
                        <button
                          key={o.value}
                          type="button"
                          className="ctopic"
                          onClick={() => selectTopic(o.value)}
                          style={{
                            padding: "11px 16px",
                            borderRadius: 4,
                            border: `1px solid ${on ? "#b5e602" : "rgba(255,255,255,0.14)"}`,
                            background: on ? "#b5e602" : "rgba(255,255,255,0.03)",
                            color: on ? "#0c1321" : "rgba(255,255,255,0.8)",
                            fontSize: 14,
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            fontFamily: "var(--font-sans)",
                          }}
                        >
                          {o.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
                )}

                {detailCfg && (
                  <div style={{ marginBottom: 22 }}>
                    <label className="s-mono" style={monoLabel}>{detailCfg.label}</label>
                    <CustomSelect
                      value={form.detail}
                      placeholder="Select one"
                      options={detailCfg.options}
                      onChange={(v) => set("detail", v)}
                    />
                  </div>
                )}

                {recruit && (
                  <div style={{ marginBottom: 22 }}>
                    <label className="s-mono" style={monoLabel}>{portfolioLabel}</label>
                    <input
                      type="url"
                      placeholder="https://"
                      value={form.portfolio}
                      onChange={(e) => set("portfolio", e.target.value)}
                    />
                  </div>
                )}

                {!recruit && (
                  <div
                    className="contact-2col"
                    style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 22 }}
                  >
                    <div>
                      <label className="s-mono" style={monoLabel}>Budget</label>
                      <CustomSelect
                        value={form.budget}
                        placeholder="Select a range"
                        options={BUDGETS}
                        onChange={(v) => set("budget", v)}
                      />
                    </div>
                    <div>
                      <label className="s-mono" style={monoLabel}>Timeline</label>
                      <CustomSelect
                        value={form.timeline}
                        placeholder="Select timing"
                        options={TIMELINES}
                        onChange={(v) => set("timeline", v)}
                      />
                    </div>
                  </div>
                )}

                <div style={{ marginBottom: 14 }}>
                  <label className="s-mono" style={monoLabel}>Tell us more</label>
                  <textarea
                    placeholder="A few lines on your goals, project, or question."
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                  />
                </div>

                {error && (
                  <div style={{ color: "#ff8a8a", fontSize: 13, marginBottom: 14 }}>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="csubmit"
                  disabled={submitting}
                  style={{
                    width: "100%",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    background: "var(--sprint-lime)",
                    color: "#0c1321",
                    border: "none",
                    borderRadius: 4,
                    fontFamily: "var(--font-sans)",
                    fontSize: 16,
                    fontWeight: 600,
                    padding: "16px 0",
                    cursor: "pointer",
                    marginTop: 8,
                    opacity: submitting ? 0.7 : 1,
                  }}
                >
                  {submitting ? "Sending…" : "Send message"}
                </button>

                <p
                  style={{
                    fontSize: 12,
                    lineHeight: 1.5,
                    color: "rgba(255,255,255,0.4)",
                    margin: "16px 0 0",
                    textAlign: "center",
                  }}
                >
                  By sending this you agree to our privacy policy. We&rsquo;ll
                  only use your details to reply.
                </p>
              </form>
            ) : (
              <div style={{ textAlign: "center", padding: "36px 12px 30px" }}>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    margin: "0 auto 26px",
                    borderRadius: "50%",
                    background: "var(--sprint-lime)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    animation: "cfloat 4s ease-in-out infinite",
                  }}
                >
                  <span
                    style={{
                      width: 30,
                      height: 30,
                      background: "#0c1321",
                      WebkitMask:
                        "url(/assets/icons/check-bold.svg) center/contain no-repeat",
                      mask: "url(/assets/icons/check-bold.svg) center/contain no-repeat",
                    }}
                  />
                </div>
                <h2
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 600,
                    fontSize: 30,
                    letterSpacing: "-0.02em",
                    margin: "0 0 14px",
                  }}
                >
                  Message sent<span className="s-dot">.</span>
                </h2>
                <p
                  style={{
                    fontSize: 16,
                    lineHeight: 1.6,
                    color: "rgba(255,255,255,0.66)",
                    margin: "0 auto 30px",
                    maxWidth: 400,
                  }}
                >
                  Thanks {firstName}. A member of the team will get back to you
                  within one business day.
                </p>
                <a
                  href="/"
                  className="footer-link"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 9,
                    color: "#ffffff",
                    textDecoration: "none",
                    fontSize: 15,
                    fontWeight: 600,
                  }}
                >
                  <span style={{ fontSize: 16 }}>&larr;</span> Back to site
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Fort Worth studio map (lazy, privacy-friendly facade) */}
        <div style={{ marginTop: 8 }}>
          <MapFacade
            query={`${siteConfig.siteName}, ${siteConfig.primaryLocation.streetAddress}, ${siteConfig.primaryLocation.addressLocality}, ${siteConfig.primaryLocation.addressRegion} ${siteConfig.primaryLocation.postalCode}`}
            label="Find our Fort Worth studio"
            height={320}
          />
        </div>
      </section>
    </div>
  );
}
