"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Footer from "./Footer";
import CustomSelect from "./CustomSelect";
import { TOPIC_OPTIONS, validEmail, type TopicKey } from "@/lib/contact-form";
import { PARTNERS, type Partner } from "@/lib/growth-partners";

// Growth Partner form uses the export's own option wording.
const GP_DETAILS: Record<string, { label: string; options: string[] } | null> = {
  creative: { label: "Which plan?", options: ["Starter", "Growth", "Scale", "Not sure yet"] },
  ai: {
    label: "What kind?",
    options: ["AI consultation", "Custom platform build", "Workflow and automation", "Not sure yet"],
  },
  addon: { label: "Which service?", options: ["Digital Marketing", "Social Media Management", "Other"] },
  demo: null,
  other: null,
};
const GP_BUDGETS = [
  "Under $5k / month",
  "$5k to $10k / month",
  "$10k to $25k / month",
  "$25k+ / month",
  "Single project",
  "Not sure yet",
];
const GP_TIMELINES = [
  "As soon as possible",
  "In 1 to 3 months",
  "In 3 to 6 months",
  "Just exploring",
];

const STEP_LABELS: Record<number, string> = {
  1: "Step 1 of 3 · Your details",
  2: "Step 2 of 3 · What you need",
  3: "Step 3 of 3 · Tell us more",
};

const NAV = [
  { label: "Services", href: "/#why" },
  { label: "Why Sprint", href: "/#why" },
  { label: "Work", href: "/#showreel" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/faq" },
];

const emptyForm = {
  name: "",
  email: "",
  company: "",
  phone: "",
  detail: "",
  budget: "",
  timeline: "",
  message: "",
};

const arrowChip: CSSProperties = {
  display: "inline-flex",
  width: 22,
  height: 22,
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(12,19,33,0.16)",
  borderRadius: 3,
};

// Match the modal / contact page: uppercase mono field labels.
const gpLabel: CSSProperties = {
  display: "block",
  fontSize: 11,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.55)",
  marginBottom: 7,
};

export default function GrowthPartnerView({ partner: initialPartner }: { partner: Partner }) {
  const [partner, setPartner] = useState<Partner>(initialPartner);
  const [menuOpen, setMenuOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [topic, setTopic] = useState<TopicKey>("");
  const [form, setForm] = useState({ ...emptyForm });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [firstName, setFirstName] = useState("");

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  // A shared link can carry ?partner= / ?gp= (id) and ?pn= (name) to override
  // the slug-resolved partner, so every lead is attributed correctly.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const slug = (q.get("partner") || q.get("gp") || "").trim().toLowerCase();
    const pn = q.get("pn") || "";
    setPartner((p) => {
      const base = slug && PARTNERS[slug] ? PARTNERS[slug] : p;
      return pn ? { ...base, name: pn } : base;
    });
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    if (menuOpen) document.body.classList.add("cm-open");
    else document.body.classList.remove("cm-open");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("cm-open");
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const detailCfg = topic ? GP_DETAILS[topic] : null;

  const next = () => {
    if (step === 1) {
      if (!form.name.trim() || !form.email.trim())
        return setError("Please add your name and email so we can reach you.");
      if (!validEmail(form.email.trim()))
        return setError("Please enter a valid email address.");
      setError("");
      return setStep(2);
    }
    if (step === 2) {
      if (!topic) return setError("Please pick what we can help with.");
      setError("");
      return setStep(3);
    }
  };

  const back = () => {
    setError("");
    setStep((s) => Math.max(1, s - 1));
  };

  const submit = async () => {
    if (submitting) return;
    if (!form.name.trim() || !form.email.trim()) {
      setStep(1);
      return setError("Please add your name and email so we can reach you.");
    }
    if (!validEmail(form.email.trim())) {
      setStep(1);
      return setError("Please enter a valid email address.");
    }
    setError("");
    setSubmitting(true);
    const payload = {
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
      topic,
      partnerId: partner.id,
      partnerName: partner.name,
      source: "qr-discovery",
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
      setFirstName(form.name.trim().split(" ")[0]);
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please email hello@madebysprint.com directly.");
      setSubmitting(false);
    }
  };

  const active = "var(--sprint-lime)";
  const idle = "rgba(255,255,255,0.14)";

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
      {/* NAV */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "rgba(12,19,33,0.62)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          className="nav-inner px"
          style={{
            maxWidth: 1360,
            margin: "0 auto",
            padding: "16px 48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 32,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 56 }}>
            <a href="/" className="logo-link" aria-label="Sprint home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/sprint-logo-white.svg"
                alt="Sprint"
                style={{ height: 26, width: "auto", display: "block" }}
              />
            </a>
            <nav className="nav-links" style={{ display: "flex", alignItems: "center", gap: 34 }}>
              {NAV.map((l) => (
                <a key={l.label} href={l.href} className="navlink" style={{ fontSize: 15, fontWeight: 500 }}>
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="nav-actions" style={{ display: "flex", alignItems: "center", gap: 22 }}>
            <a
              href="https://portal.madebysprint.com/auth/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="navlink mm-hide-mobile"
              style={{ fontSize: 15, fontWeight: 500, whiteSpace: "nowrap" }}
            >
              Sign In
            </a>
            <a
              className="cta cta-lime"
              href="#book"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "var(--sprint-lime)",
                color: "#0c1321",
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 600,
                padding: "11px 18px",
                borderRadius: 4,
                whiteSpace: "nowrap",
              }}
            >
              Book Demo
            </a>
            <button className="nav-hamburger" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round">
                <path d="M3 6h18" />
                <path d="M3 12h18" />
                <path d="M3 18h18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div
        id="mobile-menu"
        style={{
          display: menuOpen ? "flex" : "none",
          position: "fixed",
          inset: 0,
          zIndex: 200,
          background: "rgba(10,15,28,0.98)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          padding: "26px 30px 40px",
          flexDirection: "column",
          opacity: menuOpen ? 1 : 0,
          transition: "opacity 0.25s ease",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 30 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/sprint-logo-white.svg" alt="Sprint" style={{ height: 24, width: "auto", display: "block" }} />
          <button
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            style={{
              width: 44,
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 6,
              cursor: "pointer",
              padding: 0,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12" />
              <path d="M18 6L6 18" />
            </svg>
          </button>
        </div>
        {NAV.map((l) => (
          <a key={l.label} href={l.href} className="mm-link" onClick={() => setMenuOpen(false)}>
            {l.label}
          </a>
        ))}
        <a
          href="https://portal.madebysprint.com/auth/signup"
          target="_blank"
          rel="noopener noreferrer"
          className="mm-link"
          onClick={() => setMenuOpen(false)}
        >
          Sign In
        </a>
        <a
          href="#book"
          className="mm-link cta cta-lime"
          onClick={() => setMenuOpen(false)}
          style={{
            marginTop: 26,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            background: "var(--sprint-lime)",
            color: "#0c1321",
            textDecoration: "none",
            fontSize: 16,
            fontWeight: 600,
            padding: "16px 0",
            borderRadius: 4,
            borderBottom: "none",
          }}
        >
          Book Demo
        </a>
      </div>

      {/* BOOK A DISCOVERY CALL */}
      <section
        id="book"
        className="px"
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 1360,
          margin: "0 auto",
          padding: "132px 48px 96px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 10,
            left: "50%",
            transform: "translateX(-50%)",
            width: 900,
            height: 540,
            maxWidth: "92%",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse,rgba(93,107,255,0.18),rgba(0,200,255,0.06) 48%,transparent 72%)",
            filter: "blur(26px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div
          className="book-grid"
          style={{
            position: "relative",
            zIndex: 1,
            display: "grid",
            gridTemplateColumns: "0.92fr 1.08fr",
            gap: 56,
            alignItems: "center",
          }}
        >
          {/* LEFT: intro + partner */}
          <div>
            <div className="s-eyebrow" style={{ color: "var(--sprint-lime)", marginBottom: 22 }}>
              [ BOOK A DISCOVERY CALL ]
            </div>
            <h2
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: "clamp(32px,4.2vw,52px)",
                lineHeight: 1.04,
                letterSpacing: "-0.03em",
                margin: "0 0 20px",
              }}
            >
              Your growth starts here<span className="s-dot">.</span>
            </h2>
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.66)",
                margin: "0 0 30px",
                maxWidth: 440,
              }}
            >
              Tell us a little about your business and we&rsquo;ll be in touch within one business
              day to set up a short consultation.
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "14px 18px 14px 14px",
                borderRadius: 8,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                maxWidth: 360,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={partner.avatar}
                alt={partner.name}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  objectFit: "cover",
                  flex: "none",
                  border: "1px solid rgba(255,255,255,0.18)",
                  boxShadow: "0 0 0 3px rgba(181,230,2,0.12)",
                }}
              />
              <div>
                <div
                  className="s-mono"
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--sprint-lime)",
                    marginBottom: 3,
                  }}
                >
                  Your Sprint contact
                </div>
                <div style={{ fontWeight: 600, fontSize: 15, lineHeight: 1.2 }}>{partner.name}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{partner.role}</div>
              </div>
            </div>
          </div>

          {/* RIGHT: form card */}
          <div
            className="book-form"
            style={{
              position: "relative",
              borderRadius: 12,
              background:
                "radial-gradient(ellipse 110% 90% at 82% -8%,rgba(93,107,255,0.16),rgba(138,92,255,0.06) 46%,transparent 78%),#0f1729",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "0 40px 90px -40px rgba(0,0,0,0.85)",
              padding: "34px 32px 32px",
            }}
          >
            {!submitted ? (
              <form
                className="cform"
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  if (step < 3) next();
                  else submit();
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <span style={{ height: 4, flex: 1, borderRadius: 2, background: active, transition: "background 0.3s" }} />
                  <span style={{ height: 4, flex: 1, borderRadius: 2, background: step >= 2 ? active : idle, transition: "background 0.3s" }} />
                  <span style={{ height: 4, flex: 1, borderRadius: 2, background: step >= 3 ? active : idle, transition: "background 0.3s" }} />
                </div>
                <div
                  className="s-mono"
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.45)",
                    marginBottom: 20,
                  }}
                >
                  {STEP_LABELS[step]}
                </div>

                {step === 1 && (
                  <>
                    <div className="cm-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                      <div>
                        <label className="s-mono" style={gpLabel}>Name <span style={{ color: "var(--sprint-lime)" }}>*</span></label>
                        <input type="text" placeholder="Your name" value={form.name} onChange={(e) => set("name", e.target.value)} />
                      </div>
                      <div>
                        <label className="s-mono" style={gpLabel}>Email <span style={{ color: "var(--sprint-lime)" }}>*</span></label>
                        <input type="email" placeholder="you@company.com" value={form.email} onChange={(e) => set("email", e.target.value)} />
                      </div>
                    </div>
                    <div className="cm-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
                      <div>
                        <label className="s-mono" style={gpLabel}>Company</label>
                        <input type="text" placeholder="Company name" value={form.company} onChange={(e) => set("company", e.target.value)} />
                      </div>
                      <div>
                        <label className="s-mono" style={gpLabel}>Phone</label>
                        <input type="tel" placeholder="Optional" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
                      </div>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div style={{ marginBottom: 16 }}>
                      <label className="s-mono" style={gpLabel}>What can we help with? <span style={{ color: "var(--sprint-lime)" }}>*</span></label>
                      <CustomSelect
                        value={topic ? TOPIC_OPTIONS.find((o) => o.value === topic)?.label || "" : ""}
                        placeholder="Select an option"
                        options={TOPIC_OPTIONS.map((o) => o.label)}
                        onChange={(label) => {
                          const t = (TOPIC_OPTIONS.find((o) => o.label === label)?.value ?? "") as TopicKey;
                          setTopic(t);
                          set("detail", "");
                          setError("");
                        }}
                      />
                    </div>
                    {detailCfg && (
                      <div style={{ marginBottom: 16 }}>
                        <label className="s-mono" style={gpLabel}>{detailCfg.label}</label>
                        <CustomSelect
                          value={form.detail}
                          placeholder="Select one"
                          options={detailCfg.options}
                          onChange={(v) => set("detail", v)}
                        />
                      </div>
                    )}
                    <div className="cm-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
                      <div>
                        <label className="s-mono" style={gpLabel}>Budget</label>
                        <CustomSelect value={form.budget} placeholder="Select a range" options={GP_BUDGETS} onChange={(v) => set("budget", v)} />
                      </div>
                      <div>
                        <label className="s-mono" style={gpLabel}>Timeline</label>
                        <CustomSelect value={form.timeline} placeholder="Select timing" options={GP_TIMELINES} onChange={(v) => set("timeline", v)} />
                      </div>
                    </div>
                  </>
                )}

                {step === 3 && (
                  <div style={{ marginBottom: 16 }}>
                    <label className="s-mono" style={gpLabel}>Tell us more</label>
                    <textarea
                      placeholder="A few lines on your goals, project, or question."
                      value={form.message}
                      onChange={(e) => set("message", e.target.value)}
                    />
                  </div>
                )}

                {error && (
                  <div style={{ color: "#ff8a8a", fontSize: 13, lineHeight: 1.4, marginBottom: 14 }}>{error}</div>
                )}

                <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 4 }}>
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={back}
                      style={{
                        flex: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(255,255,255,0.06)",
                        color: "#fff",
                        border: "1px solid rgba(255,255,255,0.16)",
                        borderRadius: 4,
                        fontFamily: "var(--font-sans)",
                        fontSize: 15,
                        fontWeight: 600,
                        padding: "15px 22px",
                        cursor: "pointer",
                      }}
                    >
                      Back
                    </button>
                  )}
                  {step === 3 ? (
                    <button
                      key="gp-send"
                      type="button"
                      onClick={() => submit()}
                      className="book-cta"
                      disabled={submitting}
                      style={{
                        flex: 1,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 12,
                        background: "var(--sprint-lime)",
                        color: "#0c1321",
                        border: "none",
                        cursor: "pointer",
                        fontFamily: "var(--font-sans)",
                        fontSize: 16,
                        fontWeight: 600,
                        padding: "15px 24px",
                        borderRadius: 4,
                        opacity: submitting ? 0.7 : 1,
                      }}
                    >
                      {submitting ? "Sending…" : "Book my discovery call"}
                      {!submitting && <span style={arrowChip}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }} aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>}
                    </button>
                  ) : (
                    <button
                      key="gp-continue"
                      type="button"
                      onClick={next}
                      className="book-cta"
                      style={{
                        flex: 1,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        background: "var(--sprint-lime)",
                        color: "#0c1321",
                        border: "none",
                        cursor: "pointer",
                        fontFamily: "var(--font-sans)",
                        fontSize: 16,
                        fontWeight: 600,
                        padding: "15px 24px",
                        borderRadius: 4,
                      }}
                    >
                      Continue
                    </button>
                  )}
                </div>
                <p style={{ textAlign: "center", fontSize: 12, color: "rgba(255,255,255,0.4)", margin: "14px 0 0" }}>
                  We&rsquo;ll reply within one business day.
                </p>
              </form>
            ) : (
              <div style={{ textAlign: "center", padding: "26px 6px 20px" }}>
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    background: "rgba(181,230,2,0.14)",
                    border: "1px solid rgba(181,230,2,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 22px",
                  }}
                >
                  <span
                    style={{
                      width: 26,
                      height: 26,
                      background: "var(--sprint-lime)",
                      WebkitMask: "url(/assets/icons/check-bold.svg) center/contain no-repeat",
                      mask: "url(/assets/icons/check-bold.svg) center/contain no-repeat",
                    }}
                  />
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 600,
                    fontSize: 26,
                    letterSpacing: "-0.02em",
                    margin: "0 0 12px",
                  }}
                >
                  Thanks, {firstName}<span className="s-dot">.</span>
                </h3>
                <p style={{ fontSize: 16, lineHeight: 1.6, color: "rgba(255,255,255,0.66)", margin: "0 auto", maxWidth: 380 }}>
                  Your request is in. {partner.name} and the Sprint team will be in touch within one
                  business day to set up your call.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* TRUSTED BY */}
      <section
        className="px"
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: 1360,
          margin: "0 auto",
          padding: "6px 48px 60px",
        }}
      >
        <div
          className="s-eyebrow"
          style={{ color: "rgba(255,255,255,0.42)", textAlign: "center", marginBottom: 22 }}
        >
          [ TRUSTED BY ]
        </div>
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            WebkitMaskImage: "linear-gradient(to right,transparent 0%,#000 9%,#000 91%,transparent 100%)",
            maskImage: "linear-gradient(to right,transparent 0%,#000 9%,#000 91%,transparent 100%)",
          }}
        >
          <div
            className="logo-track"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 56,
              width: "max-content",
              opacity: 0.7,
              animation: "logomarquee 54s linear infinite",
            }}
          >
            {Array.from({ length: 16 }, (_, i) => {
              const n = (i % 8) + 1;
              return (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={`/assets/logos/logo${String(n).padStart(2, "0")}.svg`}
                  alt=""
                  aria-hidden={i >= 8 ? "true" : undefined}
                  style={{ height: 28, width: "auto", display: "block" }}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section
        id="what"
        className="px"
        style={{ position: "relative", zIndex: 10, maxWidth: 1360, margin: "0 auto", padding: "20px 48px 40px" }}
      >
        <div style={{ maxWidth: 720, margin: "0 auto 52px", textAlign: "center" }}>
          <div className="s-eyebrow" style={{ color: "var(--sprint-lime)", marginBottom: 20 }}>
            [ WHAT WE DO ]
          </div>
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "clamp(30px,3.6vw,46px)",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            One partner across the work that moves you forward<span className="s-dot">.</span>
          </h2>
        </div>

        <div className="pillar-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 22 }}>
          {[
            {
              icon: "palette.svg",
              title: "Creative Services",
              body: "Brand identity, digital, print, video and motion, delivered by a senior team that works as your creative department.",
            },
            {
              icon: "trending-up.svg",
              title: "Digital Marketing",
              body: "Paid media, SEO, social and lifecycle campaigns that reach the right audience and turn attention into measurable growth.",
            },
            {
              icon: "app-window.svg",
              title: "Bespoke Software",
              body: "Custom client portals, internal platforms and integrations, built around how your business actually works.",
            },
          ].map((p) => (
            <div
              key={p.title}
              className="pillar"
              style={{
                position: "relative",
                padding: "34px 30px 32px",
                borderRadius: 4,
                overflow: "hidden",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: "0 20px 44px -28px rgba(0,0,0,0.7)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 4,
                  background:
                    "radial-gradient(ellipse 130% 80% at 50% 0%,rgba(93,107,255,0.20),rgba(138,92,255,0.07) 46%,transparent 78%)",
                  pointerEvents: "none",
                }}
              />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    marginBottom: 22,
                  }}
                >
                  <span
                    style={{
                      width: 24,
                      height: 24,
                      background: "var(--sprint-lime)",
                      WebkitMask: `url(/assets/icons/${p.icon}) center/contain no-repeat`,
                      mask: `url(/assets/icons/${p.icon}) center/contain no-repeat`,
                    }}
                  />
                </div>
                <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 21, letterSpacing: "-0.02em", margin: "0 0 12px" }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,0.62)", margin: 0 }}>{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CLIENT PORTAL */}
      <section
        id="portal"
        className="px"
        style={{
          position: "relative",
          zIndex: 10,
          // overflow visible so the blurred ambient glows fade out naturally
          // instead of getting hard-clipped at the section box (the page root
          // already clips overflow-x, so no horizontal scroll results).
          overflow: "visible",
          maxWidth: 1360,
          margin: "0 auto",
          padding: "60px 48px 90px",
        }}
      >
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "visible" }}>
          <div
            style={{
              position: "absolute",
              top: "-8%",
              left: "-4%",
              width: 760,
              height: 760,
              maxWidth: "78vw",
              borderRadius: "50%",
              background: "radial-gradient(circle,rgba(93,107,255,0.22),rgba(138,92,255,0.10) 42%,rgba(12,19,33,0) 70%)",
              filter: "blur(30px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-14%",
              right: "-2%",
              width: 720,
              height: 720,
              maxWidth: "70vw",
              borderRadius: "50%",
              background: "radial-gradient(circle,rgba(0,200,255,0.16),rgba(93,107,255,0.10) 42%,rgba(12,19,33,0) 70%)",
              filter: "blur(34px)",
            }}
          />
        </div>

        <div
          className="portal-grid"
          style={{
            position: "relative",
            zIndex: 1,
            display: "grid",
            gridTemplateColumns: "1.12fr 0.88fr",
            gap: 60,
            alignItems: "center",
          }}
        >
          {/* LEFT: portal screenshot + floating callouts */}
          <div className="portal-media" style={{ position: "relative" }}>
            <div
              style={{
                position: "relative",
                zIndex: 1,
                padding: 3,
                borderRadius: 12,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.12)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                boxShadow: "0 44px 90px -40px rgba(0,0,0,0.9)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/hero-dashboard.webp"
                alt="Sprint client portal dashboard"
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                  borderRadius: 9,
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              />
            </div>

            {/* primary callout */}
            <div
              style={{
                position: "absolute",
                bottom: -22,
                right: -10,
                zIndex: 3,
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "11px 15px",
                borderRadius: 9,
                background: "rgba(12,19,33,0.82)",
                border: "1px solid rgba(181,230,2,0.32)",
                boxShadow: "0 20px 40px -22px rgba(0,0,0,0.85)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                animation: "portalFloat 6.5s ease-in-out infinite",
              }}
            >
              <span
                style={{
                  width: 30,
                  height: 30,
                  flex: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 7,
                  background: "rgba(181,230,2,0.14)",
                  border: "1px solid rgba(181,230,2,0.3)",
                }}
              >
                <span
                  style={{
                    width: 15,
                    height: 15,
                    background: "var(--sprint-lime)",
                    WebkitMask: "url(/assets/icons/check-bold.svg) center/contain no-repeat",
                    mask: "url(/assets/icons/check-bold.svg) center/contain no-repeat",
                  }}
                />
              </span>
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 600, lineHeight: 1.2 }}>Deliverable approved</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)" }}>One tap. Fully tracked.</div>
              </div>
            </div>

            {/* top-left callout */}
            <div
              className="portal-chip--extra"
              style={{
                position: "absolute",
                top: -20,
                left: -16,
                zIndex: 2,
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "11px 15px",
                borderRadius: 9,
                background: "rgba(12,19,33,0.82)",
                border: "1px solid rgba(93,107,255,0.34)",
                boxShadow: "0 20px 40px -22px rgba(0,0,0,0.85)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                animation: "portalFloat 7.4s ease-in-out infinite",
                animationDelay: "-2.4s",
              }}
            >
              <span
                style={{
                  width: 30,
                  height: 30,
                  flex: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 7,
                  background: "rgba(93,107,255,0.16)",
                  border: "1px solid rgba(93,107,255,0.32)",
                }}
              >
                <span
                  style={{
                    width: 15,
                    height: 15,
                    background: "#8fa0ff",
                    WebkitMask: "url(/assets/icons/refresh.svg) center/contain no-repeat",
                    mask: "url(/assets/icons/refresh.svg) center/contain no-repeat",
                  }}
                />
              </span>
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 600, lineHeight: 1.2 }}>Live status</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)" }}>Updated in real time.</div>
              </div>
            </div>

            {/* mid-left callout */}
            <div
              className="portal-chip--extra"
              style={{
                position: "absolute",
                top: "44%",
                left: -32,
                zIndex: 2,
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "11px 15px",
                borderRadius: 9,
                background: "rgba(12,19,33,0.82)",
                border: "1px solid rgba(138,92,255,0.34)",
                boxShadow: "0 20px 40px -22px rgba(0,0,0,0.85)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                animation: "portalFloat 8.2s ease-in-out infinite",
                animationDelay: "-4.6s",
              }}
            >
              <span
                style={{
                  width: 30,
                  height: 30,
                  flex: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 7,
                  background: "rgba(138,92,255,0.16)",
                  border: "1px solid rgba(138,92,255,0.32)",
                }}
              >
                <span
                  style={{
                    width: 15,
                    height: 15,
                    background: "#b79bff",
                    WebkitMask: "url(/assets/icons/palette.svg) center/contain no-repeat",
                    mask: "url(/assets/icons/palette.svg) center/contain no-repeat",
                  }}
                />
              </span>
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 600, lineHeight: 1.2 }}>Brand Hub</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)" }}>Assets, one click away.</div>
              </div>
            </div>
          </div>

          {/* RIGHT: copy + features */}
          <div>
            <div className="s-eyebrow" style={{ color: "var(--sprint-lime)", marginBottom: 20 }}>
              [ THE CLIENT PORTAL ]
            </div>
            <h2
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: "clamp(30px,3.6vw,46px)",
                lineHeight: 1.06,
                letterSpacing: "-0.03em",
                margin: "0 0 18px",
              }}
            >
              Your whole project, in one place<span className="s-dot">.</span>
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: "rgba(255,255,255,0.64)", margin: "0 0 30px", maxWidth: 460 }}>
              Every request, review and asset lives in a single workspace built around your team. No
              inbox archaeology, no chasing status, just clear momentum you can see.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 34 }}>
              {[
                "Track every active and queued request in real time",
                "Review and approve deliverables with time stamped comments",
                "Your full brand asset library, always a click away",
                "Message the team and keep every decision in context",
              ].map((t) => (
                <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 13 }}>
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      flex: "none",
                      marginTop: 1,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "var(--sprint-lime)",
                      borderRadius: "50%",
                    }}
                  >
                    <span
                      style={{
                        width: 12,
                        height: 12,
                        background: "#0c1321",
                        WebkitMask: "url(/assets/icons/check-bold.svg) center/contain no-repeat",
                        mask: "url(/assets/icons/check-bold.svg) center/contain no-repeat",
                      }}
                    />
                  </span>
                  <span style={{ fontSize: 16, lineHeight: 1.5, color: "rgba(255,255,255,0.82)" }}>{t}</span>
                </div>
              ))}
            </div>

            <a
              className="cta cta-lime"
              href="#book"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                background: "var(--sprint-lime)",
                color: "#0c1321",
                textDecoration: "none",
                fontSize: 16,
                fontWeight: 600,
                padding: "15px 24px",
                borderRadius: 4,
              }}
            >
              See it in your demo
              <span style={arrowChip}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }} aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
