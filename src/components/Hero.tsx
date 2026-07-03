import { CLIENT_LOGOS } from "@/lib/site-content";
import { CtaArrow, Eyebrow, ctaGhost, ctaLime } from "./primitives";

export default function Hero() {
  // Duplicate the logo list so the marquee can loop seamlessly (translateX 0 -> -50%).
  const marqueeLogos = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <section
      className="hero-section"
      style={{
        position: "relative",
        zIndex: 10,
        overflow: "hidden",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ambient glows */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -140,
            right: -110,
            width: 1080,
            height: 1020,
            maxWidth: "72vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(93,107,255,0.30),rgba(138,92,255,0.12) 42%,rgba(12,19,33,0) 70%)",
            filter: "blur(34px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -220,
            right: 120,
            width: 920,
            height: 920,
            maxWidth: "60vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(0,200,255,0.13),rgba(93,107,255,0.10) 40%,rgba(12,19,33,0) 68%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* bottom fade into page bg */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "42%",
          background:
            "linear-gradient(to bottom,rgba(12,19,33,0) 0%,rgba(12,19,33,0.7) 55%,#0c1321 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <div
        className="hero-inner px"
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1360,
          margin: "0 auto",
          width: "100%",
          padding: "132px 48px 48px",
          flex: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="hero-copy" style={{ maxWidth: 560 }}>
          <Eyebrow style={{ marginBottom: 26 }}>
            [ CREATIVE + AI SOLUTIONS ]
          </Eyebrow>

          <h1
            className="hero-h1"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "clamp(44px,5vw,76px)",
              lineHeight: 0.94,
              letterSpacing: "-0.035em",
              margin: "0 0 26px",
              whiteSpace: "nowrap",
            }}
          >
            Creative &amp; tech
            <br />
            that work<span className="s-dot">.</span>
          </h1>

          <p
            style={{
              fontSize: 19,
              lineHeight: 1.55,
              color: "rgba(255,255,255,0.68)",
              margin: "0 0 38px",
              maxWidth: 480,
              letterSpacing: "-0.01em",
            }}
          >
            Creative services and business platforms powered by AI, built to
            save you time, freeing your team to move faster and focus on what
            matters.
          </p>

          <div
            className="hero-cta"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              flexWrap: "wrap",
            }}
          >
            <a className="cta cta-lime" href="#why" style={ctaLime}>
              Explore Creative
              <CtaArrow dark />
            </a>
            <a className="cta cta-ghost" href="#platform" style={ctaGhost}>
              Explore AI Solutions
              <CtaArrow />
            </a>
          </div>

          <div
            className="hero-rating"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginTop: 34,
            }}
          >
            <span
              style={{
                color: "var(--sprint-lime)",
                fontSize: 15,
                letterSpacing: "2px",
              }}
            >
              ★★★★★
            </span>
            <span style={{ fontSize: 14, color: "rgba(255,255,255,0.55)" }}>
              Trusted by teams from Fortune 500 to fast growing SMBs
            </span>
          </div>
        </div>
      </div>

      {/* flat-on video frame */}
      <div
        className="hero-media"
        style={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          left: "clamp(640px,50vw,920px)",
          height: "min(60vh,600px)",
          zIndex: 1,
        }}
      >
        <div
          className="hero-media-frame"
          style={{
            boxSizing: "border-box",
            height: "100%",
            display: "inline-flex",
            borderRadius: 12,
            padding: 10,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "0 50px 100px -34px rgba(0,0,0,0.8)",
          }}
        >
          <div
            style={{
              height: "100%",
              aspectRatio: "16 / 9",
              borderRadius: 6,
              overflow: "hidden",
              background: "#0c1321",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/hero-dashboard-v01.webp"
              alt="Sprint client portal dashboard"
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
              }}
            />
          </div>
        </div>
      </div>

      {/* CLIENT LOGO STRIP pinned to hero bottom */}
      <div
        className="hero-strip px"
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: 1360,
          margin: "0 auto",
          padding: "0 48px 48px",
        }}
      >
        <Eyebrow
          align="center"
          color="rgba(255,255,255,0.42)"
          style={{ marginBottom: 22 }}
        >
          [ TRUSTED BY ]
        </Eyebrow>
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            WebkitMaskImage:
              "linear-gradient(to right,transparent 0%,#000 9%,#000 91%,transparent 100%)",
            maskImage:
              "linear-gradient(to right,transparent 0%,#000 9%,#000 91%,transparent 100%)",
          }}
        >
          <div
            className="logo-track"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 56,
              width: "max-content",
              opacity: 0.7,
              animation: "logomarquee 54s linear infinite",
            }}
          >
            {marqueeLogos.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={src}
                alt=""
                aria-hidden={i >= CLIENT_LOGOS.length ? "true" : undefined}
                style={{ height: 28, width: "auto", display: "block" }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
