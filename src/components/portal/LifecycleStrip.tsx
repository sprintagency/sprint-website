import { PORTAL_LIFECYCLE } from "@/lib/portal-content";
import { MonoLabel, SectionHeading } from "./shared";

/* One bordered strip of six equal cells separated by hairlines. Every cell
   draws a right and bottom hairline; the frame clips the outer ones with a
   1px negative margin, so the dividers stay correct when the grid reflows to
   3, 2 or 1 columns. */

export default function LifecycleStrip() {
  return (
    <section
      className="px"
      style={{ position: "relative", zIndex: 10, maxWidth: 1360, margin: "0 auto", padding: "88px 48px 0" }}
    >
      <SectionHeading eyebrow={PORTAL_LIFECYCLE.eyebrow} heading={PORTAL_LIFECYCLE.heading} />
      <div
        style={{
          border: "1px solid rgba(255,255,255,0.10)",
          borderRadius: 6,
          background: "rgba(255,255,255,0.02)",
          overflow: "hidden",
        }}
      >
        <div
          className="portal-lifecycle"
          data-reveal-group
          style={{ display: "grid", gridTemplateColumns: "repeat(6,minmax(0,1fr))", margin: "0 -1px -1px 0" }}
        >
          {PORTAL_LIFECYCLE.steps.map((s) => (
            <div
              key={s.number}
              style={{
                padding: "28px 22px",
                borderRight: "1px solid rgba(255,255,255,0.08)",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <MonoLabel style={{ marginBottom: 12 }}>{s.number}</MonoLabel>
              <div style={{ fontWeight: 600, fontSize: 17, letterSpacing: "-0.01em", marginBottom: 8 }}>{s.title}</div>
              <p style={{ fontSize: 13, lineHeight: 1.5, color: "rgba(255,255,255,0.55)", margin: 0 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
