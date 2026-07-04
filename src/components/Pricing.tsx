import { Eyebrow } from "./primitives";
import PricingBlocks from "./PricingBlocks";

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="px"
      style={{
        position: "relative",
        zIndex: 10,
        maxWidth: 1360,
        margin: "0 auto",
        padding: "112px 48px 120px",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 60px" }}>
        <Eyebrow style={{ marginBottom: 22 }}>[ PLANS &amp; PRICING ]</Eyebrow>
        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: "clamp(34px,4.4vw,58px)",
            lineHeight: 1.04,
            letterSpacing: "-0.03em",
            margin: "0 0 30px",
          }}
        >
          Plans that fit how you{" "}work<span className="s-dot">.</span>
        </h2>
      </div>

      <PricingBlocks />
    </section>
  );
}
