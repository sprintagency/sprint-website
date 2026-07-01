import type { CSSProperties } from "react";
import { Eyebrow, SparkleItem } from "./primitives";

const ADDONS = [
  {
    title: "Digital Marketing",
    blurb: "End to end campaigns that turn attention into pipeline.",
    includes: [
      "Paid media, search & social",
      "SEO & content strategy",
      "Email & lifecycle flows",
      "Landing pages & CRO",
    ],
  },
  {
    title: "Social Media Management",
    blurb: "Always on presence, planned, produced and posted.",
    includes: [
      "Content calendar & scheduling",
      "Post, story & reel design",
      "Community management",
      "Monthly performance reporting",
    ],
  },
];

const CHIPS = [
  "Paid Ads",
  "SEO / AEO",
  "Email & CRM",
  "Content",
  "Analytics",
  "PR & Outreach",
  "Email",
  "Lead Gen",
  "SMS",
  "Hyperlocal",
];

const cardStyle: CSSProperties = {
  position: "relative",
  padding: "34px 34px 28px",
  borderRadius: 6,
  background:
    "radial-gradient(ellipse 120% 130% at 88% -10%,rgba(93,107,255,0.22),rgba(138,92,255,0.09) 44%,rgba(0,200,255,0.07) 66%,rgba(255,255,255,0.015) 84%),#111a35",
  border: "1px solid rgba(120,130,255,0.18)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  transition: "border-color 0.25s ease,box-shadow 0.25s ease",
};

export default function Addons() {
  return (
    <section
      id="addons"
      className="px"
      style={{
        position: "relative",
        zIndex: 10,
        maxWidth: 1360,
        margin: "0 auto",
        padding: "20px 48px 120px",
      }}
    >
      <div
        className="addon-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1.5fr) minmax(0,0.78fr)",
          gap: 60,
          alignItems: "start",
        }}
      >
        {/* LEFT: add-on cards */}
        <div
          className="addon-list"
          style={{ display: "flex", flexDirection: "column", gap: 20 }}
        >
          {ADDONS.map((a) => (
            <div key={a.title} className="addon-card" style={cardStyle}>
              <div
                className="addon-card-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
                  gap: 40,
                }}
              >
                <div>
                  <div
                    className="s-mono"
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--sprint-lime)",
                      marginBottom: 16,
                    }}
                  >
                    Scoped to fit
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 600,
                      fontSize: 26,
                      letterSpacing: "-0.025em",
                      marginBottom: 12,
                    }}
                  >
                    {a.title}
                    <span className="s-dot">.</span>
                  </div>
                  <p
                    style={{
                      fontSize: 15,
                      lineHeight: 1.5,
                      color: "rgba(255,255,255,0.58)",
                      margin: 0,
                    }}
                  >
                    {a.blurb}
                  </p>
                </div>
                <div>
                  <div
                    className="s-mono"
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.45)",
                      marginBottom: 16,
                    }}
                  >
                    Includes
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {a.includes.map((it, i) => (
                      <SparkleItem key={i} size={14}>
                        {it}
                      </SparkleItem>
                    ))}
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: 26,
                  paddingTop: 22,
                  borderTop: "1px solid rgba(255,255,255,0.09)",
                }}
              >
                <a
                  href="#"
                  data-open-contact="1"
                  data-intent="addon"
                  data-service={a.title}
                  className="scope-btn"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 13,
                    color: "#ffffff",
                    textDecoration: "none",
                    fontSize: 14,
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}
                >
                  <span className="scope-label">Request a scope</span>
                  <span
                    className="scope-circle"
                    style={{
                      display: "inline-flex",
                      width: 40,
                      height: 40,
                      flex: "none",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid rgba(255,255,255,0.22)",
                      borderRadius: "50%",
                      fontSize: 16,
                      overflow: "hidden",
                    }}
                  >
                    <span className="scope-arrow" style={{ display: "inline-block" }}>
                      →
                    </span>
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: sticky header */}
        <div className="addon-header" style={{ position: "sticky", top: 120 }}>
          <Eyebrow style={{ marginBottom: 22 }}>[ ADD ON SERVICES ]</Eyebrow>
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "clamp(32px,3.4vw,48px)",
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              margin: "0 0 22px",
            }}
          >
            Bigger goals?
            <br />
            Add it on<span className="s-dot">.</span>
          </h2>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.62)",
              margin: 0,
            }}
          >
            Programs that run alongside your plan. Every program is scoped to
            your goals, so pricing is built around what you actually need.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 9, marginTop: 30 }}>
            {CHIPS.map((c, i) => (
              <span
                key={i}
                className="addon-chip"
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.78)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 999,
                  padding: "8px 15px",
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
