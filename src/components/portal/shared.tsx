import type { CSSProperties, ReactNode } from "react";
import { CtaArrow, Eyebrow, ctaLime } from "../primitives";
import { PORTAL_DEMO_INTENT, PORTAL_DEMO_LABEL } from "@/lib/portal-content";

/* Small building blocks shared by the Sprint Portal landing page sections. */

/** Centered eyebrow + H2 (lime period) + optional lead paragraph. */
export function SectionHeading({
  eyebrow,
  heading,
  lead,
  maxWidth = 680,
  marginBottom = 52,
}: {
  eyebrow: string;
  heading: string;
  lead?: string;
  maxWidth?: number;
  marginBottom?: number;
}) {
  return (
    <div style={{ textAlign: "center", maxWidth, margin: `0 auto ${marginBottom}px` }}>
      <Eyebrow align="center" style={{ marginBottom: 20 }}>
        {eyebrow}
      </Eyebrow>
      <h2 style={sectionH2}>
        {heading}
        <span className="s-dot">.</span>
      </h2>
      {lead ? <p style={{ ...sectionLead, margin: "18px 0 0" }}>{lead}</p> : null}
    </div>
  );
}

export const sectionH2: CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontWeight: 600,
  fontSize: "clamp(30px,3.6vw,46px)",
  lineHeight: 1.06,
  letterSpacing: "-0.03em",
  margin: 0,
};

export const sectionLead: CSSProperties = {
  fontSize: 18,
  lineHeight: 1.6,
  color: "rgba(255,255,255,0.66)",
  margin: 0,
};

/** The lime "Book a Portal Demo" button. Opens the contact modal with the portal preset. */
export function DemoButton({ style }: { style?: CSSProperties }) {
  return (
    <a
      className="cta cta-lime"
      href="#"
      data-open-contact="1"
      data-intent={PORTAL_DEMO_INTENT}
      style={{ ...ctaLime, padding: "16px 26px", ...style }}
    >
      {PORTAL_DEMO_LABEL}
      <CtaArrow dark />
    </a>
  );
}

/** Glass bezel around the hero video and the Campaign Surface screenshot. */
export const glassBezel: CSSProperties = {
  borderRadius: 12,
  padding: 10,
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.14)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  boxShadow: "0 50px 100px -34px rgba(0,0,0,0.8)",
};

/** Flat glass tile used for the campaign and capability grids. */
export const glassTile: CSSProperties = {
  padding: 24,
  borderRadius: 4,
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.12)",
};

export const tileTitle: CSSProperties = {
  fontSize: 16,
  fontWeight: 600,
  letterSpacing: "-0.01em",
};

export const tileBody: CSSProperties = {
  fontSize: 14,
  lineHeight: 1.5,
  color: "rgba(255,255,255,0.6)",
  margin: 0,
};

/** Lime mono micro-label, e.g. "01" or "STEP 01" or "BRAND INFRASTRUCTURE". */
export function MonoLabel({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div
      className="s-mono"
      style={{
        fontSize: 11,
        letterSpacing: "0.1em",
        color: "var(--sprint-lime)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** Soft radial glow blob. Position it with `style`. */
export function Glow({ style, tone = "indigo" }: { style: CSSProperties; tone?: "indigo" | "cyan" }) {
  const background =
    tone === "cyan"
      ? "radial-gradient(circle,rgba(0,200,255,0.10),rgba(93,107,255,0.08) 40%,rgba(12,19,33,0) 68%)"
      : "radial-gradient(circle,rgba(93,107,255,0.24),rgba(138,92,255,0.10) 44%,rgba(12,19,33,0) 70%)";
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        borderRadius: "50%",
        background,
        filter: "blur(32px)",
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}
