import type { CSSProperties } from "react";
import { Eyebrow } from "./primitives";

const cardBase: CSSProperties = {
  position: "relative",
  padding: "20px 20px 34px",
  borderRadius: 4,
  background: "#12182b",
  border: "1px solid rgba(255,255,255,0.10)",
  overflow: "hidden",
};

const cardGlow: CSSProperties = {
  position: "absolute",
  inset: 0,
  borderRadius: 4,
  background:
    "radial-gradient(ellipse 120% 90% at 72% 22%,rgba(93,107,255,0.28),rgba(138,92,255,0.11) 42%,rgba(0,200,255,0.09) 64%,transparent 84%)",
  pointerEvents: "none",
};

const avatarShadow =
  "0 0 0 2px rgba(12,18,40,0.95),0 0 0 3.5px rgba(255,255,255,0.15)";

const h3: CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontWeight: 600,
  fontSize: 22,
  letterSpacing: "-0.02em",
  margin: "0 0 12px",
};

const body: CSSProperties = {
  fontSize: 15,
  lineHeight: 1.55,
  color: "rgba(255,255,255,0.62)",
  margin: 0,
};

const imgCard: CSSProperties = {
  position: "relative",
  borderRadius: 4,
  overflow: "hidden",
  border: "1px solid rgba(255,255,255,0.08)",
  height: 196,
  marginBottom: 26,
  background: "#0c1321",
};

export default function WhySection() {
  return (
    <section
      id="why"
      className="px"
      style={{
        position: "relative",
        zIndex: 10,
        maxWidth: 1360,
        margin: "0 auto",
        padding: "96px 48px 40px",
      }}
    >
      <div
        style={{
          maxWidth: 780,
          margin: "0 auto 52px",
          textAlign: "center",
        }}
      >
        <Eyebrow style={{ marginBottom: 20 }}>[ THE PLATFORM ]</Eyebrow>
        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: "clamp(30px,3.6vw,46px)",
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            margin: 0,
          }}
        >
          Everything a creative department is<span className="s-dot">.</span>{" "}
          None of the overhead<span className="s-dot">.</span>
        </h2>
      </div>

      <div
        className="why-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 24,
        }}
      >
        {/* Card 1 — senior team avatar cluster */}
        <div style={cardBase}>
          <div style={cardGlow} />
          <div
            style={{
              position: "relative",
              zIndex: 1,
              height: 180,
              marginBottom: 26,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              className="avatar-cluster"
              style={{ display: "flex", alignItems: "center" }}
            >
              {/* eslint-disable @next/next/no-img-element */}
              <img
                src="/assets/team/skye.webp"
                alt="Skye"
                width={200}
                height={200}
                loading="lazy"
                style={{
                  width: 82,
                  height: 82,
                  borderRadius: "50%",
                  objectFit: "cover",
                  boxShadow: avatarShadow,
                  marginTop: 14,
                  animation: "floatB 7s ease-in-out 0s infinite",
                }}
              />
              <img
                src="/assets/team/graham.webp"
                alt="Graham"
                width={200}
                height={200}
                loading="lazy"
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: "50%",
                  objectFit: "cover",
                  boxShadow: avatarShadow,
                  marginLeft: -18,
                  marginTop: -8,
                  zIndex: 3,
                  animation: "floatA 7.6s ease-in-out 0.5s infinite",
                }}
              />
              <img
                src="/assets/team/trae.webp"
                alt="Trae"
                width={200}
                height={200}
                loading="lazy"
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: "50%",
                  objectFit: "cover",
                  boxShadow: avatarShadow,
                  marginLeft: -18,
                  marginTop: 4,
                  zIndex: 2,
                  animation: "floatB 8.3s ease-in-out 1s infinite",
                }}
              />
              <img
                src="/assets/team/can.webp"
                alt="Can"
                width={200}
                height={200}
                loading="lazy"
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  objectFit: "cover",
                  boxShadow: avatarShadow,
                  marginLeft: -18,
                  marginTop: -12,
                  zIndex: 1,
                  animation: "floatA 6.6s ease-in-out 0.3s infinite",
                }}
              />
              {/* eslint-enable @next/next/no-img-element */}
            </div>
          </div>
          <div style={{ padding: "0 14px" }}>
            <h3 style={h3}>A senior team on demand</h3>
            <p style={body}>
              Brand, digital, print and video specialists working as your
              department, with no recruiting, retainers, or overhead.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div style={cardBase}>
          <div style={cardGlow} />
          <div style={imgCard}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/platform.webp"
              alt="Sprint workflow"
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "46% 58%",
              }}
            />
          </div>
          <div style={{ padding: "0 14px" }}>
            <h3 style={h3}>Delivered in days, not weeks</h3>
            <p style={body}>
              Submit unlimited requests and we turn them around fast, one after
              another, so your marketing never waits on creative.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div style={cardBase}>
          <div style={cardGlow} />
          <div style={imgCard}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/platform.webp"
              alt="Sprint activity"
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "92% 62%",
              }}
            />
          </div>
          <div style={{ padding: "0 14px" }}>
            <h3 style={h3}>One platform to run it all</h3>
            <p style={body}>
              Track projects, review deliverables, message the team and manage
              every brand asset in one workspace, built around you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
