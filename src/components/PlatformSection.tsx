import type { CSSProperties } from "react";
import { CAPABILITIES } from "@/lib/site-content";
import { CtaArrow, Eyebrow, ctaLime } from "./primitives";

// Cards start hidden; ScrollEffects reveals them with a stagger on scroll-in.
const cardStyle: CSSProperties = {
  padding: "22px 22px",
  borderRadius: 4,
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.12)",
  boxShadow: "0 20px 44px -28px rgba(0,0,0,0.7)",
  opacity: 0,
  transform: "translateY(42px)",
  transition:
    "background 200ms ease,border-color 200ms ease,box-shadow 200ms ease,opacity 640ms ease,transform 640ms cubic-bezier(0.16,1,0.3,1)",
};

export default function PlatformSection() {
  return (
    <section
      id="platform"
      className="px"
      style={{
        position: "relative",
        zIndex: 10,
        overflow: "hidden",
        padding: "120px 48px 150px",
        background: "#0c1321",
      }}
    >
      {/* ambient glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -140,
            width: 1150,
            height: 1150,
            maxWidth: "80vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(93,107,255,0.30),rgba(138,92,255,0.12) 42%,rgba(12,19,33,0) 70%)",
            filter: "blur(30px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: -40,
            height: 540,
            background:
              "radial-gradient(ellipse 92% 100% at 62% 100%,rgba(93,107,255,0.22),rgba(0,200,255,0.08) 46%,rgba(12,19,33,0) 74%)",
            filter: "blur(30px)",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 300,
          background:
            "linear-gradient(to bottom,rgba(0,0,0,0.85) 0%,rgba(0,0,0,0.42) 26%,rgba(0,0,0,0) 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <div
        className="platform-grid"
        data-platform-parallax
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1360,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(0,0.72fr) minmax(0,1.28fr)",
          gap: 56,
          alignItems: "start",
          willChange: "transform",
        }}
      >
        {/* heading */}
        <div style={{ maxWidth: 560 }}>
          <Eyebrow style={{ marginBottom: 22 }}>[ BEYOND CREATIVE ]</Eyebrow>
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "clamp(32px,4vw,52px)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              margin: "0 0 26px",
            }}
          >
            Need a platform like{" "}Sprint?
          </h2>
          <p
            style={{
              fontSize: 19,
              lineHeight: 1.55,
              color: "rgba(255,255,255,0.78)",
              margin: "0 0 14px",
              fontWeight: 500,
            }}
          >
            We don&apos;t just create great work. We build better ways to work.
          </p>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.62)",
              margin: "0 0 34px",
              maxWidth: 540,
            }}
          >
            Our AI team designs bespoke client portals, workflow automation and
            internal platforms that help businesses operate more efficiently.
          </p>
          <a
            className="cta cta-lime"
            href="#"
            data-open-contact="1"
            data-intent="ai-consultation"
            style={ctaLime}
          >
            Free Consultation
            <CtaArrow dark />
          </a>
        </div>

        {/* capability cards */}
        <div className="platform-cards-wrap" style={{ position: "relative" }}>
        <div
          className="platform-cards"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 22,
            alignItems: "stretch",
          }}
        >
          {CAPABILITIES.map((c) => (
            <div key={c.title} style={cardStyle}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 11,
                  marginBottom: 9,
                }}
              >
                <span
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
                  <span
                    style={{
                      width: 11,
                      height: 11,
                      background: "#0c1321",
                      WebkitMask:
                        "url(/assets/icons/check-bold.svg) center/contain no-repeat",
                      mask: "url(/assets/icons/check-bold.svg) center/contain no-repeat",
                    }}
                  />
                </span>
                <span
                  style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.01em" }}
                >
                  {c.title}
                </span>
              </div>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.5,
                  color: "rgba(255,255,255,0.6)",
                  margin: 0,
                  paddingLeft: 29,
                }}
              >
                {c.desc}
              </p>
            </div>
          ))}
        </div>
          {/* Mobile-only scroll indicator: hidden on desktop, driven by
             ScrollEffects to track the masked capability list's scroll. */}
          <div className="platform-scroll-rail" aria-hidden="true">
            <div className="platform-scroll-thumb" />
          </div>
        </div>
      </div>
    </section>
  );
}
