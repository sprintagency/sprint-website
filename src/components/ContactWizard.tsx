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

const stepLabel = (step: number, recruit: boolean): string => {
  if (step === 1) return "Your details";
  if (step === 2) return recruit ? "Your background" : "Your project";
  return "Anything else";
};

type Variant = "modal" | "inline";

interface ContactWizardProps {
  variant: Variant;
  /** Prefill (modal): resolved from the clicked trigger's data attributes. */
  intent?: string;
  plan?: string;
  service?: string;
  /** Inline page: resolve prefill from the URL query string on mount. */
  prefillFromUrl?: boolean;
  /** Focus the name field shortly after mount (modal, after its open animation). */
  autoFocus?: boolean;
  /** Report the current heading so the caller can render it in its own layout. */
  onHeadingChange?: (heading: string) => void;
  /** Report submitted state (the modal hides its heading on success). */
  onSubmittedChange?: (submitted: boolean) => void;
  /** Success "Close" action (modal only). */
  onClose?: () => void;
}

/**
 * Shared 3-step contact form used by both the floating ContactModal and the
 * inline /contact card. Owns all form state, validation, and submission; the
 * surrounding chrome (overlay vs. page column, heading placement) lives in the
 * caller and is fed the current heading via onHeadingChange.
 */
export default function ContactWizard({
  variant,
  intent,
  plan,
  service,
  prefillFromUrl = false,
  autoFocus = false,
  onHeadingChange,
  onSubmittedChange,
  onClose,
}: ContactWizardProps) {
  // Resolve modal prefill synchronously so the heading doesn't flash.
  const initial = resolveIntent(intent, plan, service);
  const [step, setStep] = useState(1);
  const [topic, setTopic] = useState<TopicKey>(initial.topic);
  const [form, setForm] = useState({
    ...emptyForm,
    detail: initial.detail || "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  const set = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const selectTopic = useCallback(
    (t: TopicKey, presetDetail?: string) => {
      setTopic(t);
      onHeadingChange?.(t ? HEADINGS[t] || DEFAULT_HEADING : DEFAULT_HEADING);
      setForm((f) => ({ ...f, detail: presetDetail ?? "" }));
    },
    [onHeadingChange],
  );

  // On mount: apply prefill (URL for inline, props for modal) and report the
  // resulting heading up to the caller.
  useEffect(() => {
    if (prefillFromUrl && typeof window !== "undefined") {
      const q = new URLSearchParams(window.location.search);
      const { topic: t, detail } = resolveIntent(
        q.get("intent"),
        q.get("plan"),
        q.get("service"),
      );
      if (t) {
        selectTopic(t, detail || undefined);
        return;
      }
    }
    onHeadingChange?.(
      topic ? HEADINGS[topic] || DEFAULT_HEADING : DEFAULT_HEADING,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onSubmittedChange?.(submitted);
  }, [submitted, onSubmittedChange]);

  useEffect(() => {
    if (!autoFocus) return;
    const t = setTimeout(() => nameRef.current?.focus(), 340);
    return () => clearTimeout(t);
  }, [autoFocus]);

  const detailCfg = topic ? DETAILS[topic] : null;
  const recruit = isRecruit(topic);
  const portfolioLabel =
    topic === "careers" ? "Portfolio or LinkedIn" : "Portfolio or website";
  const firstName = form.name.trim().split(" ")[0];

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

  if (submitted) {
    return (
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
            animation: "cfloat 4s ease-in-out infinite",
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
          Thanks {firstName}. A member of the team will get back to you within
          one business day.
        </p>
        {variant === "modal" ? (
          <button
            onClick={onClose}
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
        ) : (
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
        )}
      </div>
    );
  }

  return (
    <form
      className="cform"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        // Enter on steps 1-2 should advance, not submit early (the topic is
        // often pre-filled, so submit() would otherwise pass validation).
        if (step < 3) next();
        else submit();
      }}
    >
      {/* progress */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 14,
        }}
      >
        {[1, 2, 3].map((s) => (
          <span
            key={s}
            style={{
              height: 4,
              flex: 1,
              borderRadius: 2,
              background:
                s <= step ? "var(--sprint-lime)" : "rgba(255,255,255,0.14)",
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
          <div
            className="cm-2col"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              marginBottom: 16,
            }}
          >
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
          <div
            className="cm-2col"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              marginBottom: 22,
            }}
          >
            <div>
              <label style={labelStyle} className="s-mono">
                Company
              </label>
              <input
                type="text"
                placeholder="Company name"
                value={form.company}
                onChange={(e) => set("company", e.target.value)}
              />
            </div>
            <div>
              <label style={labelStyle} className="s-mono">
                Phone
              </label>
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
                What can we help with?{" "}
                <span style={{ color: "var(--sprint-lime)" }}>*</span>
              </label>
              <CustomSelect
                value={
                  topic
                    ? TOPIC_OPTIONS.find((o) => o.value === topic)?.label || ""
                    : ""
                }
                placeholder="Select an option"
                options={TOPIC_OPTIONS.map((o) => o.label)}
                onChange={(label) => {
                  const t =
                    TOPIC_OPTIONS.find((o) => o.label === label)?.value ?? "";
                  selectTopic(t as TopicKey);
                }}
              />
            </div>
          )}

          {detailCfg && (
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle} className="s-mono">
                {detailCfg.label}
              </label>
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
              <label style={labelStyle} className="s-mono">
                {portfolioLabel}
              </label>
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
              className="cm-2col"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                marginBottom: 20,
              }}
            >
              <div>
                <label style={labelStyle} className="s-mono">
                  Budget
                </label>
                <CustomSelect
                  value={form.budget}
                  placeholder="Select a range"
                  options={BUDGETS}
                  onChange={(v) => set("budget", v)}
                />
              </div>
              <div>
                <label style={labelStyle} className="s-mono">
                  Timeline
                </label>
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
          <label style={labelStyle} className="s-mono">
            Tell us more
          </label>
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

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginTop: 8,
        }}
      >
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
        By sending this you agree to our privacy policy. We&rsquo;ll only use
        your details to reply.
      </p>
    </form>
  );
}
