import { PORTAL_CTA } from "@/lib/portal-content";
import { DemoButton, sectionLead } from "./shared";

export default function PortalCTA() {
  return (
    <section
      className="px"
      style={{ position: "relative", zIndex: 10, overflow: "hidden", padding: "96px 48px 100px", textAlign: "center" }}
    >
      {/* indigo glow rising from the bottom */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          bottom: -300,
          transform: "translateX(-50%)",
          width: 1000,
          maxWidth: "120vw",
          height: 700,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse,rgba(93,107,255,0.24),rgba(138,92,255,0.10) 46%,transparent 72%)",
          filter: "blur(24px)",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", zIndex: 2, maxWidth: 1360, margin: "0 auto" }} data-reveal>
        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: "clamp(34px,4.2vw,48px)",
            lineHeight: 1.04,
            letterSpacing: "-0.03em",
            margin: "0 0 16px",
          }}
        >
          {PORTAL_CTA.heading}
          <span className="s-dot">.</span>
        </h2>
        <p style={{ ...sectionLead, lineHeight: 1.55, margin: "0 auto 32px", maxWidth: 520 }}>{PORTAL_CTA.lead}</p>
        <DemoButton />
      </div>
    </section>
  );
}
