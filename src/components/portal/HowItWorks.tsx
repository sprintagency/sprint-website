import { PORTAL_HOW_IT_WORKS } from "@/lib/portal-content";
import { MonoLabel, SectionHeading } from "./shared";

export default function HowItWorks() {
  return (
    <section
      className="px"
      style={{ position: "relative", zIndex: 10, maxWidth: 1360, margin: "0 auto", padding: "100px 48px 0" }}
    >
      <SectionHeading eyebrow={PORTAL_HOW_IT_WORKS.eyebrow} heading={PORTAL_HOW_IT_WORKS.heading} />
      <div
        className="portal-steps"
        data-reveal-group
        style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 20 }}
      >
        {PORTAL_HOW_IT_WORKS.steps.map((s) => (
          <div
            key={s.label}
            style={{
              padding: "30px 26px",
              borderRadius: 6,
              background: "#12182b",
              border: "1px solid rgba(255,255,255,0.10)",
            }}
          >
            <MonoLabel style={{ marginBottom: 16 }}>{s.label}</MonoLabel>
            <div style={{ fontWeight: 600, fontSize: 19, letterSpacing: "-0.015em", marginBottom: 8 }}>{s.title}</div>
            <p style={{ fontSize: 14, lineHeight: 1.55, color: "rgba(255,255,255,0.6)", margin: 0 }}>{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
