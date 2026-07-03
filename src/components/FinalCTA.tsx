/* Shared "Start today" closing CTA (mirrors FinalCTA.dc.html). Used by the
   service landing pages. Opens the contact modal; "See pricing" jumps to the
   page's own #pricing section. */
export default function FinalCTA() {
  return (
    <section
      id="start"
      className="px"
      style={{ position: "relative", zIndex: 10, maxWidth: 1360, margin: "0 auto", padding: "80px 48px 110px" }}
    >
      <div
        style={{
          position: "relative",
          borderRadius: 16,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.1)",
          background:
            "radial-gradient(ellipse 90% 130% at 50% -10%,rgba(93,107,255,0.26),rgba(138,92,255,0.11) 44%,rgba(0,200,255,0.06) 66%,transparent 84%),rgba(255,255,255,0.02)",
          padding: "clamp(58px,8vw,96px) 32px",
          textAlign: "center",
        }}
      >
        <div className="s-eyebrow" style={{ color: "var(--sprint-lime)", marginBottom: 22 }}>
          [ READY? ]
        </div>
        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: "clamp(44px,6.4vw,76px)",
            lineHeight: 0.98,
            letterSpacing: "-0.035em",
            margin: 0,
          }}
        >
          Start today<span className="s-dot">.</span>
        </h2>
        <p
          style={{
            fontSize: 18,
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.68)",
            margin: "20px auto 38px",
            maxWidth: 500,
          }}
        >
          Free consultation, no pressure. Tell us what you need and we will take it from there.
        </p>
        <div
          className="fcta-actions"
          style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 14, flexWrap: "wrap" }}
        >
          <a
            className="fcta-btn fcta-lime"
            href="#"
            data-open-contact="1"
            data-intent="demo"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              background: "var(--sprint-lime)",
              color: "#0c1321",
              textDecoration: "none",
              fontFamily: "var(--font-sans)",
              fontSize: 16,
              fontWeight: 600,
              padding: "16px 26px",
              borderRadius: 4,
            }}
          >
            Start a project{" "}
            <span
              style={{
                display: "inline-flex",
                width: 22,
                height: 22,
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(12,19,33,0.16)",
                borderRadius: 3,
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }} aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </span>
          </a>
          <a
            className="fcta-btn fcta-ghost"
            href="#pricing"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.16)",
              color: "#fff",
              textDecoration: "none",
              fontFamily: "var(--font-sans)",
              fontSize: 16,
              fontWeight: 600,
              padding: "16px 26px",
              borderRadius: 4,
            }}
          >
            See pricing
          </a>
        </div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            marginTop: 34,
            fontSize: 13,
            color: "rgba(255,255,255,0.5)",
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--sprint-lime)", flex: "none" }} />
          <span className="s-mono" style={{ letterSpacing: "0.06em" }}>
            1 BUSINESS DAY REPLY · NO COMMITMENT
          </span>
        </div>
      </div>
    </section>
  );
}
