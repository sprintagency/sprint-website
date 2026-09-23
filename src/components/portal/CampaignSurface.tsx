import { PORTAL_CAMPAIGN } from "@/lib/portal-content";
import { Glow, SectionHeading, glassBezel, glassTile, tileBody, tileTitle } from "./shared";

export default function CampaignSurface() {
  return (
    <section className="px" style={{ position: "relative", zIndex: 10, overflow: "hidden", padding: "100px 48px 0" }}>
      <Glow style={{ top: -120, left: -180, width: 920, height: 920, maxWidth: "80vw" }} />
      <div style={{ position: "relative", zIndex: 2, maxWidth: 1360, margin: "0 auto" }}>
        <SectionHeading
          eyebrow={PORTAL_CAMPAIGN.eyebrow}
          heading={PORTAL_CAMPAIGN.heading}
          lead={PORTAL_CAMPAIGN.lead}
          maxWidth={720}
        />
        <div style={glassBezel} data-reveal>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PORTAL_CAMPAIGN.image}
            alt={PORTAL_CAMPAIGN.alt}
            width={PORTAL_CAMPAIGN.width}
            height={PORTAL_CAMPAIGN.height}
            loading="lazy"
            style={{
              display: "block",
              width: "100%",
              height: "auto",
              borderRadius: 6,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          />
        </div>
        <div
          className="portal-campaign-tiles"
          data-reveal-group
          style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 20, marginTop: 24 }}
        >
          {PORTAL_CAMPAIGN.tiles.map((t) => (
            <div key={t.title} style={glassTile}>
              <div style={{ ...tileTitle, marginBottom: 8 }}>{t.title}</div>
              <p style={tileBody}>{t.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
