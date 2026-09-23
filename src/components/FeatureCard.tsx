import type { CSSProperties, ReactNode } from "react";

/* The flat navy feature card with an indigo radial wash and a slim glass
   screenshot bezel that lifts 40px out of the card's top edge. Ported 1:1 from
   the "why" cards in Hero.dc.html and shared by the home page (WhySection) and
   the Sprint Portal landing page, so the two can never drift apart. */

export const featureCardBase: CSSProperties = {
  position: "relative",
  padding: "20px 20px 34px",
  borderRadius: 4,
  background: "#12182b",
  border: "1px solid rgba(255,255,255,0.10)",
  overflow: "visible",
};

export const featureCardGlow: CSSProperties = {
  position: "absolute",
  inset: 0,
  borderRadius: 4,
  background:
    "radial-gradient(ellipse 120% 90% at 72% 22%,rgba(93,107,255,0.28),rgba(138,92,255,0.11) 42%,rgba(0,200,255,0.09) 64%,transparent 84%)",
  pointerEvents: "none",
};

export const featureCardH3: CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontWeight: 600,
  fontSize: 22,
  letterSpacing: "-0.02em",
  margin: "0 0 12px",
};

export const featureCardBody: CSSProperties = {
  fontSize: 15,
  lineHeight: 1.55,
  color: "rgba(255,255,255,0.62)",
  margin: 0,
};

// Floating glass image card that lifts up out of the card (needs overflow:visible).
// The bezel (padding + radius) is a constant % of the frame's own width so these
// smaller screenshots read as the same physical screen as the larger hero portal
// frame (~1.16% padding on a ~861px frame). box-sizing:border-box keeps the
// padding inside the aspect-ratio box; aspect-ratio 360/206 sets the frame size.
const imgCard: CSSProperties = {
  position: "relative",
  zIndex: 2,
  boxSizing: "border-box",
  aspectRatio: "360 / 206",
  marginTop: -40,
  marginBottom: 26,
  padding: "1.16%",
  borderRadius: "1.4%",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.10)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  boxShadow: "0 32px 66px -20px rgba(0,0,0,0.88)",
};

const imgInner: CSSProperties = {
  display: "block",
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center top",
  borderRadius: "0.7%",
  border: "1px solid rgba(255,255,255,0.08)",
};

type FeatureCardProps = {
  title: string;
  body: string;
  /** Screenshot shown in the overlapping glass bezel. */
  image?: { src: string; alt: string };
  /** Custom media (e.g. the avatar cluster) rendered instead of a screenshot. */
  media?: ReactNode;
};

export default function FeatureCard({ title, body, image, media }: FeatureCardProps) {
  return (
    <div style={featureCardBase}>
      <div style={featureCardGlow} />
      {image ? (
        <div className="why-imgcard" style={imgCard}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="why-img" src={image.src} alt={image.alt} loading="lazy" style={imgInner} />
        </div>
      ) : (
        media
      )}
      <div style={{ padding: "0 14px" }}>
        <h3 style={featureCardH3}>{title}</h3>
        <p style={featureCardBody}>{body}</p>
      </div>
    </div>
  );
}
