"use client";

import { useCallback, useEffect, useState } from "react";
import ContactWizard from "./ContactWizard";
import { DEFAULT_HEADING, HEADINGS, resolveIntent } from "@/lib/contact-form";

/* ------------------------------------------------------------------ */
/* Contact modal                                                       */
/* ------------------------------------------------------------------ */

type Prefill = { intent?: string; plan?: string; service?: string };

export default function ContactModal() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [prefill, setPrefill] = useState<Prefill>({});
  const [heading, setHeading] = useState(DEFAULT_HEADING);
  const [submitted, setSubmitted] = useState(false);

  const openContact = useCallback(
    (intent?: string, plan?: string, service?: string) => {
      const { topic: t } = resolveIntent(intent, plan, service);
      setHeading(t ? HEADINGS[t] || DEFAULT_HEADING : DEFAULT_HEADING);
      setSubmitted(false);
      setPrefill({ intent, plan, service });
      setOpen(true);
    },
    [],
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

  // Animate in + lock scroll on open; Esc to close.
  useEffect(() => {
    if (!open) return;
    document.body.classList.add("cm-open");
    const raf = requestAnimationFrame(() => setVisible(true));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  if (!open) return null;

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

        {!submitted && (
          <>
            <div
              className="s-eyebrow"
              style={{ color: "var(--sprint-lime)", marginBottom: 16 }}
            >
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
          </>
        )}

        <ContactWizard
          variant="modal"
          intent={prefill.intent}
          plan={prefill.plan}
          service={prefill.service}
          autoFocus
          onHeadingChange={setHeading}
          onSubmittedChange={setSubmitted}
          onClose={close}
        />
      </div>
    </div>
  );
}
