"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import CustomSelect from "./CustomSelect";
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

const stepLabel = (step: number, recruit: boolean): string => {
  if (step === 1) return "Your details";
  if (step === 2) return recruit ? "Your background" : "Your project";
  return "Anything else";
};

/* ------------------------------------------------------------------ */
/* Contact modal                                                       */
/* ------------------------------------------------------------------ */

const labelStyle: CSSProperties = {
  display: "block",
  fontSize: 11,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.55)",
  marginBottom: 7,
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

export default function ContactModal() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [topic, setTopic] = useState<TopicKey>("");
  const [heading, setHeading] = useState(DEFAULT_HEADING);
  const [form, setForm] = useState({ ...emptyForm });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  const set = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const selectTopic = useCallback((t: TopicKey, presetDetail?: string) => {
    setTopic(t);
    setHeading(t ? HEADINGS[t] || DEFAULT_HEADING : DEFAULT_HEADING);
    setForm((f) => ({ ...f, detail: presetDetail ?? "" }));
  }, []);

  const openContact = useCallback(
    (intent?: string, plan?: string, service?: string) => {
      setForm({ ...emptyForm });
      setSubmitted(false);
      setSubmitting(false);
      setError("");
      setStep(1);
      const { topic: t, detail } = resolveIntent(intent, plan, service);
      selectTopic(t, detail || undefined);
      setOpen(true);
    },
    [selectTopic],
  );

  const close = useCallback(() => {
    setVisible(false);
    document.body.classList.remove("cm-open");
    setTimeout(() => setOpen(false), 320);
  }, []);

  // Delegated opener: any element with [data-open-contact] opens the modal.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const trigger = (e.target as HTMLElement)?.closest?.(
        "[data-open-contact]",
      ) as HTMLElement | null;
      if (!trigger) return;
      e.preventDefault();
      openContact(
        trigger.getAttribute("data-intent") || undefined,
        trigger.getAttribute("data-plan") || undefined,
        trigger.getAttribute("data-service") || undefined,
      );
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [openContact]);

  // Animate in + lock scroll + focus on open; Esc to close.
  useEffect(() => {
    if (!open) return;
    document.body.classList.add("cm-open");
    const raf = requestAnimationFrame(() => setVisible(true));
    const focusT = setTimeout(() => nameRef.current?.focus(), 340);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(focusT);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const next = () => {
    if (step === 1) {
      if (!form.name.trim()) return setError("Please add your name.");
      if (!validEmail(form.email.trim()))
        return setError("Please add a valid email.");
    } else if (step === 2) {
      if (!topic) return setError("Please pick what we can help with.");
    }
    setError("");
    setStep((s) => Math.min(3, s + 1));
  };

  const back = () => {
    setError("");
    setStep((s) => Math.max(1, s - 1));
  };

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
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  const detailCfg = topic ? DETAILS[topic] : null;
  const recruit = isRecruit(topic);
  const portfolioLabel =
    topic === "careers" ? "Portfolio or LinkedIn" : "Portfolio or website";
  const firstName = form.name.trim().split(" ")[0];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "32px 18px",
        overflowY: "auto",
      }}
    >
      <div
        onClick={close}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(6,10,20,0.74)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />
      <div
        id="cm-dialog"
        role="dialog"
        aria-modal="true"
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: 660,
          margin: "auto",
          borderRadius: 12,
          background:
            "radial-gradient(ellipse 110% 90% at 82% -8%,rgba(93,107,255,0.18),rgba(138,92,255,0.07) 44%,transparent 78%),#0f1729",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 50px 130px -50px rgba(0,0,0,0.9)",
          padding: "40px 44px 36px",
          opacity: visible ? 1 : 0,
          transform: visible
            ? "translateY(0) scale(1)"
            : "translateY(18px) scale(0.985)",
          transition:
            "opacity 0.32s ease,transform 0.32s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <button
          id="cm-close"
          aria-label="Close"
          onClick={close}
          style={{
            position: "absolute",
            top: 18,
            right: 18,
            width: 38,
            height: 38,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#fff",
            fontSize: 15,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.2s,border-color 0.2s",
            lineHeight: 1,
          }}
        >
          ✕
        </button>

        {!submitted ? (
          <div>
            <div className="s-eyebrow" style={{ color: "var(--sprint-lime)", marginBottom: 16 }}>
              [ GET IN TOUCH ]
            </div>
            <h2
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: "clamp(28px,3.4vw,38px)",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                margin: "0 0 12px",
              }}
            >
              <span>{heading}</span>
              <span className="s-dot">.</span>
            </h2>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.55,
                color: "rgba(255,255,255,0.64)",
                margin: "0 0 28px",
                maxWidth: 460,
              }}
            >
              Tell us what you need and we&rsquo;ll come back with a clear next
              step, usually within one business day.
            </p>

            <form
              className="cform"
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                // Enter on steps 1-2 should advance, not submit early
                // (the topic is often pre-filled, so submit() would pass).
                if (step < 3) next();
                else submit();
              }}
            >
              {/* progress */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                {[1, 2, 3].map((s) => (
                  <span
                    key={s}
                    style={{
                      height: 4,
                      flex: 1,
                      borderRadius: 2,
                      background: s <= step ? "var(--sprint-lime)" : "rgba(255,255,255,0.14)",
                      transition: "background 0.3s",
                    }}
                  />
                ))}
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
                Step {step} of 3 &middot; {stepLabel(step, recruit)}
              </div>

              {/* STEP 1 */}
              {step === 1 && (
                <div>
                  <div className="cm-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    <div>
                      <label style={labelStyle} className="s-mono">
                        Name <span style={{ color: "var(--sprint-lime)" }}>*</span>
                      </label>
                      <input
                        ref={nameRef}
                        type="text"
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                      />
                    </div>
                    <div>
                      <label style={labelStyle} className="s-mono">
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
                  <div className="cm-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 22 }}>
                    <div>
                      <label style={labelStyle} className="s-mono">Company</label>
                      <input
                        type="text"
                        placeholder="Company name"
                        value={form.company}
                        onChange={(e) => set("company", e.target.value)}
                      />
                    </div>
                    <div>
                      <label style={labelStyle} className="s-mono">Phone</label>
                      <input
                        type="tel"
                        placeholder="Optional"
                        value={form.phone}
                        onChange={(e) => set("phone", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div>
                  {!recruit && (
                    <div style={{ marginBottom: 20 }}>
                      <label style={labelStyle} className="s-mono">
                        What can we help with? <span style={{ color: "var(--sprint-lime)" }}>*</span>
                      </label>
                      <CustomSelect
                        value={topic ? TOPIC_OPTIONS.find((o) => o.value === topic)?.label || "" : ""}
                        placeholder="Select an option"
                        options={TOPIC_OPTIONS.map((o) => o.label)}
                        onChange={(label) => {
                          const t = TOPIC_OPTIONS.find((o) => o.label === label)?.value ?? "";
                          selectTopic(t as TopicKey);
                        }}
                      />
                    </div>
                  )}

                  {detailCfg && (
                    <div style={{ marginBottom: 20 }}>
                      <label style={labelStyle} className="s-mono">{detailCfg.label}</label>
                      <CustomSelect
                        value={form.detail}
                        placeholder="Select one"
                        options={detailCfg.options}
                        onChange={(v) => set("detail", v)}
                      />
                    </div>
                  )}

                  {recruit && (
                    <div style={{ marginBottom: 20 }}>
                      <label style={labelStyle} className="s-mono">{portfolioLabel}</label>
                      <input
                        type="url"
                        placeholder="https://"
                        value={form.portfolio}
                        onChange={(e) => set("portfolio", e.target.value)}
                      />
                    </div>
                  )}

                  {!recruit && (
                    <div className="cm-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                      <div>
                        <label style={labelStyle} className="s-mono">Budget</label>
                        <CustomSelect
                          value={form.budget}
                          placeholder="Select a range"
                          options={BUDGETS}
                          onChange={(v) => set("budget", v)}
                        />
                      </div>
                      <div>
                        <label style={labelStyle} className="s-mono">Timeline</label>
                        <CustomSelect
                          value={form.timeline}
                          placeholder="Select timing"
                          options={TIMELINES}
                          onChange={(v) => set("timeline", v)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div style={{ marginBottom: 14 }}>
                  <label style={labelStyle} className="s-mono">Tell us more</label>
                  <textarea
                    placeholder="A few lines on your goals, project, or question."
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                  />
                </div>
              )}

              {error && (
                <div style={{ color: "#ff8a8a", fontSize: 13, marginBottom: 12 }}>
                  {error}
                </div>
              )}

              <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
                {step > 1 && (
                  <button
                    type="button"
                    onClick={back}
                    style={{
                      flex: "none",
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
                {step < 3 ? (
                  <button
                    key="cm-continue"
                    type="button"
                    onClick={next}
                    className="cm-submit"
                    style={{
                      flex: 1,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      background: "var(--sprint-lime)",
                      color: "#0c1321",
                      border: "none",
                      borderRadius: 4,
                      fontFamily: "var(--font-sans)",
                      fontSize: 16,
                      fontWeight: 600,
                      padding: "15px 0",
                      cursor: "pointer",
                    }}
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    key="cm-send"
                    type="button"
                    onClick={() => submit()}
                    className="cm-submit"
                    disabled={submitting}
                    style={{
                      flex: 1,
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
                      padding: "15px 0",
                      cursor: "pointer",
                      opacity: submitting ? 0.7 : 1,
                    }}
                  >
                    {submitting ? "Sending…" : "Send message"}
                  </button>
                )}
              </div>
              <p
                style={{
                  fontSize: 12,
                  lineHeight: 1.5,
                  color: "rgba(255,255,255,0.4)",
                  margin: "14px 0 0",
                  textAlign: "center",
                }}
              >
                By sending this you agree to our privacy policy. We&rsquo;ll only
                use your details to reply.
              </p>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "26px 8px 18px" }}>
            <div
              style={{
                width: 60,
                height: 60,
                margin: "0 auto 22px",
                borderRadius: "50%",
                background: "var(--sprint-lime)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  width: 28,
                  height: 28,
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
                fontSize: 28,
                letterSpacing: "-0.02em",
                margin: "0 0 12px",
              }}
            >
              Message sent<span className="s-dot">.</span>
            </h2>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.66)",
                margin: "0 auto 26px",
                maxWidth: 400,
              }}
            >
              Thanks {firstName}. A member of the team will get back to you
              within one business day.
            </p>
            <button
              onClick={close}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                background: "rgba(255,255,255,0.06)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.16)",
                borderRadius: 4,
                fontFamily: "var(--font-sans)",
                fontSize: 15,
                fontWeight: 600,
                padding: "12px 22px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
