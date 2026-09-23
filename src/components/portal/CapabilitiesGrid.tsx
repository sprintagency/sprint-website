import { MaskIcon } from "../primitives";
import { PORTAL_CAPABILITIES } from "@/lib/portal-content";
import { Glow, SectionHeading, glassTile, tileBody, tileTitle } from "./shared";

/* Eight glass tiles, each with a lime circle checkmark. Hover (brighter fill,
   lime border) lives in globals.css under .portal-cap-tile. */

export default function CapabilitiesGrid() {
  return (
    <section
      id={PORTAL_CAPABILITIES.id}
      className="px"
      style={{ position: "relative", zIndex: 10, overflow: "hidden", padding: "100px 48px 30px" }}
    >
      <Glow style={{ top: -140, right: -160, width: 980, height: 980, maxWidth: "80vw" }} />
      <div style={{ position: "relative", zIndex: 2, maxWidth: 1360, margin: "0 auto" }}>
        <SectionHeading
          eyebrow={PORTAL_CAPABILITIES.eyebrow}
          heading={PORTAL_CAPABILITIES.heading}
          maxWidth={720}
          marginBottom={56}
        />
        <div
          className="portal-cap-grid"
          data-reveal-group
          style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 20 }}
        >
          {PORTAL_CAPABILITIES.tiles.map((t) => (
            <div key={t.title} className="portal-cap-tile" style={{ ...glassTile, padding: 22 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 9 }}>
                <span
                  aria-hidden="true"
                  style={{
                    width: 18,
                    height: 18,
                    flex: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--sprint-lime)",
                    borderRadius: "50%",
                  }}
                >
                  <MaskIcon src="/assets/icons/check-bold.svg" size={11} color="#0c1321" />
                </span>
                <span style={tileTitle}>{t.title}</span>
              </div>
              <p style={{ ...tileBody, paddingLeft: 29 }}>{t.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
