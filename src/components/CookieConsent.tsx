// Cookie consent banner (UK PECR / UK GDPR).
//
// Shown on first visit until the visitor accepts or rejects analytics cookies,
// and reopened from the footer "Cookie settings" link. Rejecting is as easy as
// accepting, as the Cookies Policy promises. Only when accepted does Analytics
// load Google Analytics.
"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import {
  getConsent,
  setConsent,
  isConsentRequired,
  clearAnalyticsCookies,
  CONSENT_OPEN_EVENT,
  type ConsentValue,
} from "@/lib/analytics/consent";

const btn: CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: 14,
  fontWeight: 600,
  padding: "11px 20px",
  borderRadius: 4,
  cursor: "pointer",
  border: "1px solid transparent",
  whiteSpace: "nowrap",
};

export default function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Auto-open on first visit only where the region requires opt-in. Elsewhere
    // (US and rest of world) analytics runs without a banner; the footer
    // "Cookie settings" link can still reopen it so anyone can opt out.
    if (isConsentRequired() && getConsent() === null) setOpen(true);
    const onOpen = () => setOpen(true);
    window.addEventListener(CONSENT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, onOpen);
  }, []);

  if (!open) return null;

  const choose = (value: ConsentValue) => {
    const prior = getConsent();
    // GA may already be running: either from a prior grant, or automatically in
    // a region that needs no banner and where the visitor had not opted out.
    const wasActive =
      prior === "granted" || (!isConsentRequired() && prior !== "denied");
    setConsent(value);
    setOpen(false);
    // Reload so Google Analytics is fully torn down (on withdrawal) or
    // initialized cleanly (when re-granting after a denial).
    if (value === "denied") {
      clearAnalyticsCookies();
      if (wasActive) location.reload();
    } else if (prior === "denied") {
      location.reload();
    }
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      style={{
        position: "fixed",
        left: 16,
        right: 16,
        bottom: 16,
        zIndex: 1000,
        maxWidth: 680,
        margin: "0 auto",
        background: "#131c2e",
        border: "1px solid rgba(255,255,255,0.14)",
        borderRadius: 12,
        boxShadow: "0 18px 50px rgba(0,0,0,0.5)",
        padding: "20px 22px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        fontFamily: "var(--font-sans)",
        color: "#fff",
      }}
    >
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "rgba(255,255,255,0.78)" }}>
        We use essential cookies to run the site, plus Google Analytics if you
        consent. You can reject analytics without affecting your visit. See our{" "}
        <a
          href="/cookies"
          style={{ color: "var(--sprint-lime)", textDecoration: "underline", whiteSpace: "nowrap" }}
        >
          Cookies Policy
        </a>
        .
      </p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={() => choose("granted")}
          style={{ ...btn, background: "var(--sprint-lime)", color: "#0c1321" }}
        >
          Accept analytics
        </button>
        <button
          type="button"
          onClick={() => choose("denied")}
          style={{
            ...btn,
            background: "transparent",
            color: "#fff",
            borderColor: "rgba(255,255,255,0.28)",
          }}
        >
          Reject
        </button>
      </div>
    </div>
  );
}
