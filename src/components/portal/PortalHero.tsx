import { Eyebrow, ctaGhost } from "../primitives";
import { PORTAL_HERO } from "@/lib/portal-content";
import { DemoButton, Glow, glassBezel } from "./shared";

/* Centered hero with a video player that straddles the hero's bottom edge.
   The hero reserves a spacer equal to half the player's height; the player then
   pulls itself up by the same amount, so the hero's bottom hairline runs
   halfway up the back of the player at every viewport width. Both distances
   derive from the same width (min(1120px, content width)), the spacer via
   aspect-ratio 32/9 (half of 16/9) and the player via a percentage margin
   (percentage margins resolve against the container's width). */

const mediaFill = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
} as const;

export default function PortalHero() {
  const [lineOne, lineTwo] = PORTAL_HERO.headline;
  return (
    <>
      <section
        className="portal-hero"
        style={{
          position: "relative",
          zIndex: 10,
          background: "rgba(255,255,255,0.015)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* ambient glows: indigo/violet top right, faint cyan bottom left */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
          <Glow style={{ top: -200, right: -160, width: 980, height: 980, maxWidth: "80vw" }} />
          <Glow tone="cyan" style={{ bottom: -260, left: -200, width: 820, height: 820, maxWidth: "70vw" }} />
        </div>

        <div
          className="portal-hero-inner px"
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: 1360,
            margin: "0 auto",
            padding: "150px 48px 0",
            textAlign: "center",
          }}
        >
          <Eyebrow align="center" style={{ marginBottom: 26 }}>
            {PORTAL_HERO.eyebrow}
          </Eyebrow>
          <h1
            className="portal-hero-h1"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "clamp(36px,6vw,76px)",
              lineHeight: 0.98,
              letterSpacing: "-0.035em",
              margin: "0 0 26px",
            }}
          >
            {/* The explicit space keeps the words apart where the <br> is hidden (mobile). */}
            {lineOne}
            <span className="s-dot">.</span>{" "}
            <br />
            {lineTwo}
            <span className="s-dot">.</span>
          </h1>
          <p
            className="portal-hero-lead"
            style={{
              fontSize: 20,
              lineHeight: 1.5,
              color: "rgba(255,255,255,0.72)",
              margin: "0 auto 40px",
              maxWidth: 620,
            }}
          >
            {PORTAL_HERO.lead}
          </p>
          <div
            className="portal-hero-cta"
            style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 14, flexWrap: "wrap" }}
          >
            <DemoButton />
            <a
              className="cta cta-ghost"
              href={PORTAL_HERO.secondaryHref}
              style={{
                ...ctaGhost,
                padding: "16px 26px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.16)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              {PORTAL_HERO.secondaryLabel}
            </a>
          </div>
          <div
            className="s-mono"
            style={{
              fontSize: 12,
              letterSpacing: "0.06em",
              color: "rgba(255,255,255,0.5)",
              marginTop: 22,
              textTransform: "uppercase",
            }}
          >
            {PORTAL_HERO.caption}
          </div>

          {/* Spacer: half the player height (16:9 at the player width) plus its 10px bezel. */}
          <div
            className="portal-hero-spacer"
            aria-hidden="true"
            style={{ width: "min(1120px,100%)", aspectRatio: "32 / 9", margin: "56px auto 0", paddingBottom: 10 }}
          />
        </div>
      </section>

      {/* Video player, pulled up over the hero's bottom edge. */}
      <div
        className="portal-player-wrap px"
        style={{ position: "relative", zIndex: 11, maxWidth: 1360, margin: "0 auto", padding: "0 48px" }}
      >
        <div style={{ width: "min(1120px,100%)", margin: "0 auto" }}>
          {/* -28.125% = 9/32 of the container width: the same half-height the spacer reserved. */}
          <div className="portal-player" style={{ ...glassBezel, marginTop: "calc(-28.125% - 10px)" }}>
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
                data-hero-video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster={PORTAL_HERO.video.poster}
                aria-label={PORTAL_HERO.video.alt}
                style={mediaFill}
              >
                <source src={PORTAL_HERO.video.src} type="video/mp4" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={PORTAL_HERO.video.poster} alt={PORTAL_HERO.video.alt} style={mediaFill} />
              </video>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
