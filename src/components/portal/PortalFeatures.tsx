import FeatureCard from "../FeatureCard";
import { PORTAL_FEATURES } from "@/lib/portal-content";
import { MonoLabel, SectionHeading } from "./shared";

/* Three home-page feature cards (shared FeatureCard, so the overlapping
   screenshot bezel is identical), then one wide Brand Hub card with the
   screenshot bleeding off its right and bottom edges. The grid carries the
   `why-grid` class so ScrollEffects gives it the same staggered reveal and the
   same single-column collapse as the home page. */

const { brand } = PORTAL_FEATURES;

export default function PortalFeatures() {
  return (
    <section
      className="px"
      style={{ position: "relative", zIndex: 10, maxWidth: 1360, margin: "0 auto", padding: "110px 48px 40px" }}
    >
      <SectionHeading eyebrow={PORTAL_FEATURES.eyebrow} heading={PORTAL_FEATURES.heading} marginBottom={56} />

      <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 24 }}>
        {PORTAL_FEATURES.cards.map((c) => (
          <FeatureCard key={c.title} title={c.title} body={c.body} image={{ src: c.image, alt: c.alt }} />
        ))}
      </div>

      <div
        className="portal-brand-card"
        data-reveal
        style={{
          marginTop: 24,
          display: "grid",
          gridTemplateColumns: "minmax(0,0.9fr) minmax(0,1.4fr)",
          borderRadius: 6,
          background: "#12182b",
          border: "1px solid rgba(255,255,255,0.10)",
          overflow: "hidden",
        }}
      >
        <div
          className="portal-brand-copy"
          style={{ padding: "44px 40px", display: "flex", flexDirection: "column", justifyContent: "center" }}
        >
          <MonoLabel style={{ marginBottom: 14 }}>{brand.label}</MonoLabel>
          <h3
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: 26,
              letterSpacing: "-0.025em",
              margin: "0 0 10px",
            }}
          >
            {brand.heading}
            <span className="s-dot">.</span>
          </h3>
          <p style={{ fontSize: 15, lineHeight: 1.55, color: "rgba(255,255,255,0.6)", margin: 0 }}>{brand.body}</p>
        </div>
        <div className="portal-brand-media" style={{ padding: "14px 0 0", minHeight: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={brand.image}
            alt={brand.alt}
            width={brand.width}
            height={brand.height}
            loading="lazy"
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "left top",
              borderRadius: "4px 0 0 0",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRight: "none",
              borderBottom: "none",
            }}
          />
        </div>
      </div>
    </section>
  );
}
