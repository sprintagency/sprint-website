import type { CSSProperties, ReactNode } from "react";

/* Shared style objects + small presentational primitives used across sections.
   Ported 1:1 from the inline styles in Hero.dc.html. */

export const LIME = "var(--sprint-lime)";

export const ctaLime: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 12,
  background: LIME,
  color: "#0c1321",
  textDecoration: "none",
  fontSize: 16,
  fontWeight: 600,
  padding: "15px 24px",
  borderRadius: 4,
};

export const ctaGhost: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 12,
  background: "rgba(255,255,255,0.05)",
  color: "#ffffff",
  textDecoration: "none",
  fontSize: 16,
  fontWeight: 600,
  padding: "15px 24px",
  borderRadius: 4,
  border: "1px solid rgba(255,255,255,0.14)",
};

/** The little arrow-in-a-square that sits at the end of a CTA. */
export function CtaArrow({ dark = false }: { dark?: boolean }) {
  return (
    <span
      style={{
        display: "inline-flex",
        width: 22,
        height: 22,
        alignItems: "center",
        justifyContent: "center",
        background: dark ? "rgba(12,19,33,0.16)" : "rgba(255,255,255,0.10)",
        borderRadius: 3,
      }}
    >
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ display: "block" }}
        aria-hidden="true"
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    </span>
  );
}

/** Bracketed lime/muted eyebrow label, e.g. [ THE PLATFORM ]. */
export function Eyebrow({
  children,
  color = LIME,
  style,
  align,
}: {
  children: ReactNode;
  color?: string;
  style?: CSSProperties;
  align?: "center";
}) {
  return (
    <div
      className="s-eyebrow"
      style={{
        color,
        ...(align === "center" ? { textAlign: "center" } : null),
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** A lime sparkle-mask bullet + label, used in "Includes" lists. */
export function SparkleItem({
  children,
  size = 15,
  color = "rgba(255,255,255,0.82)",
}: {
  children: ReactNode;
  size?: number;
  color?: string;
}) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
      <span
        style={{
          width: size,
          height: size,
          flex: "none",
          marginTop: 2,
          background: LIME,
          WebkitMask: "url(/assets/icons/sparkle.svg) center/contain no-repeat",
          mask: "url(/assets/icons/sparkle.svg) center/contain no-repeat",
        }}
      />
      <span style={{ fontSize: 14, color }}>{children}</span>
    </div>
  );
}

/** A mask-image icon tinted with a solid color (Lucide-style stroke icons). */
export function MaskIcon({
  src,
  size = 18,
  color = LIME,
  style,
}: {
  src: string;
  size?: number;
  color?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      style={{
        width: size,
        height: size,
        flex: "none",
        display: "inline-block",
        background: color,
        WebkitMask: `url(${src}) center/contain no-repeat`,
        mask: `url(${src}) center/contain no-repeat`,
        ...style,
      }}
    />
  );
}
