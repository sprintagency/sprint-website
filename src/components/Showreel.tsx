import type { CSSProperties } from "react";
import { SHOWREEL_VIDEO } from "@/lib/site-content";
import { CtaArrow, Eyebrow, ctaLime } from "./primitives";

type Float = {
  label: string;
  icon: string;
  pos: CSSProperties;
  anim: string;
};

// Floating lime service callouts around the player (exact positions from handoff).
const FLOATS: Float[] = [
  {
    label: "Digital Marketing",
    icon: "/assets/icons/megaphone.svg",
    pos: { top: -18, left: "50%", transform: "translateX(-50%)", zIndex: 3 },
    anim: "floatCenter 6.5s ease-in-out 0s infinite",
  },
  {
    label: "Brand Identity",
    icon: "/assets/icons/palette.svg",
    pos: { top: 34, left: -26, zIndex: 2 },
    anim: "floatA 7.2s ease-in-out 0.5s infinite",
  },
  {
    label: "Digital & Social",
    icon: "/assets/icons/monitor.svg",
    pos: { bottom: 78, left: -26, zIndex: 2 },
    anim: "floatB 8s ease-in-out 1s infinite",
  },
  {
    label: "Video & Motion",
    icon: "/assets/icons/clapperboard.svg",
    pos: { top: 44, right: -26, zIndex: 2 },
    anim: "floatA 6.8s ease-in-out 0.3s infinite",
  },
  {
    label: "Print Design",
    icon: "/assets/icons/printer.svg",
    pos: { bottom: 24, right: -26, zIndex: 2 },
    anim: "floatB 7.6s ease-in-out 1.4s infinite",
  },
  {
    label: "Web Design",
    icon: "/assets/icons/app-window.svg",
    pos: { top: "46%", right: -30, zIndex: 2 },
    anim: "floatA 8.4s ease-in-out 0.8s infinite",
  },
];

// The mobile marquee uses a slightly different order; duplicated for the loop.
const MOBILE_CHIPS = [
  { label: "Digital Marketing", icon: "/assets/icons/megaphone.svg" },
  { label: "Brand Identity", icon: "/assets/icons/palette.svg" },
  { label: "Video & Motion", icon: "/assets/icons/clapperboard.svg" },
  { label: "Web Design", icon: "/assets/icons/app-window.svg" },
  { label: "Print Design", icon: "/assets/icons/printer.svg" },
  { label: "Digital & Social", icon: "/assets/icons/monitor.svg" },
];

const floatChip: CSSProperties = {
  position: "absolute",
  display: "flex",
  alignItems: "center",
  gap: 10,
  background: "rgba(11,17,44,0.82)",
  color: "#ffffff",
  padding: "12px 15px",
  borderRadius: 4,
  border: "1px solid rgba(255,255,255,0.12)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  boxShadow: "0 16px 40px -16px rgba(10,16,52,0.72)",
};

const chipLabel: CSSProperties = {
  fontSize: 14,
  fontWeight: 600,
  letterSpacing: "-0.01em",
};

export default function Showreel() {
  return (
    <section
      id="showreel"
      className="px"
      style={{
        position: "relative",
        zIndex: 10,
        maxWidth: 1360,
        margin: "0 auto",
        padding: "100px 48px 60px",
      }}
    >
      <div
        className="showreel-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1.15fr) minmax(0,0.85fr)",
          gap: 60,
          alignItems: "center",
        }}
      >
        {/* LEFT: glass video player + floating chips */}
        <div style={{ position: "relative", minWidth: 0 }}>
          <div
            style={{
              position: "absolute",
              inset: "-9% -7%",
              borderRadius: 20,
              background:
                "radial-gradient(ellipse at 50% 46%,rgba(93,107,255,0.32),rgba(138,92,255,0.13) 40%,rgba(0,200,255,0.12) 62%,transparent 78%)",
              filter: "blur(44px)",
              zIndex: 0,
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 1,
              borderRadius: 10,
              padding: 10,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: "0 40px 90px -34px rgba(0,0,0,0.75)",
            }}
          >
            <div
              style={{
                position: "relative",
                borderRadius: 6,
                overflow: "hidden",
                background: "#0c1321",
                aspectRatio: "16 / 9",
              }}
            >
              <video
                data-showreel-video
                autoPlay
                muted
                loop
                playsInline
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              >
                <source src={SHOWREEL_VIDEO} type="video/mp4" />
              </video>
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  padding: 18,
                  background:
                    "linear-gradient(to top,rgba(12,19,33,0.78),rgba(12,19,33,0) 100%)",
                  display: "flex",
                  alignItems: "center",
                  gap: 11,
                  pointerEvents: "none",
                }}
              >
                <span style={{ color: "#fff", fontSize: 13, lineHeight: 1 }}>
                  ▶
                </span>
                <span
                  className="s-mono"
                  style={{ fontSize: 12, color: "rgba(255,255,255,0.85)" }}
                >
                  SHOWREEL 2026
                </span>
              </div>
            </div>
          </div>

          {/* floating chips (hidden on mobile) */}
          {FLOATS.map((f, i) => (
            <div
              key={i}
              className="svc-float"
              style={{ ...floatChip, ...f.pos, animation: f.anim }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={f.icon}
                width={19}
                height={19}
                alt=""
                style={{ display: "block" }}
              />
              <span style={chipLabel}>{f.label}</span>
            </div>
          ))}

          {/* mobile-only marquee of chips */}
          <div
            className="svc-mobile"
            style={{
              display: "none",
              marginTop: 16,
              position: "relative",
              overflow: "hidden",
              WebkitMaskImage:
                "linear-gradient(to right,transparent 0%,#000 8%,#000 92%,transparent 100%)",
              maskImage:
                "linear-gradient(to right,transparent 0%,#000 8%,#000 92%,transparent 100%)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                width: "max-content",
                animation: "logomarquee 24s linear infinite",
              }}
            >
              {[...MOBILE_CHIPS, ...MOBILE_CHIPS].map((c, i) => (
                <div
                  key={i}
                  aria-hidden={i >= MOBILE_CHIPS.length ? "true" : undefined}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 9,
                    background: "rgba(11,17,44,0.82)",
                    color: "#fff",
                    padding: "11px 14px",
                    borderRadius: 4,
                    border: "1px solid rgba(255,255,255,0.12)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.icon} width={18} height={18} alt="" />
                  <span style={chipLabel}>{c.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: copy */}
        <div style={{ maxWidth: 460 }}>
          <Eyebrow style={{ marginBottom: 22 }}>[ CREATIVE SERVICES ]</Eyebrow>
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "clamp(30px,3.6vw,46px)",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              margin: "0 0 24px",
            }}
          >
            Full service creative, in motion<span className="s-dot">.</span>
          </h2>
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.66)",
              margin: "0 0 34px",
            }}
          >
            Brand identity, digital, print, and broadcast standard video and
            motion. One team, produced end to end and delivered through your
            Sprint platform.
          </p>
          <a className="cta cta-lime" href="#pricing" style={ctaLime}>
            Sign Up
            <CtaArrow dark />
          </a>
        </div>
      </div>
    </section>
  );
}
