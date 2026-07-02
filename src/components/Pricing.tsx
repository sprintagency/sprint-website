import type { CSSProperties, ReactNode } from "react";
import { Eyebrow, MaskIcon, SparkleItem } from "./primitives";

type CardProps = {
  eyebrow: string;
  name: string;
  price: string;
  priceNote?: ReactNode;
  blurb: string;
  includesLabel: string;
  includes: string[];
  itemColor?: string;
  mutedNote?: string;
  divider?: string;
  cardStyle: CSSProperties;
  badge?: boolean;
  cta: ReactNode;
};

function PricingCard({
  eyebrow,
  name,
  price,
  priceNote,
  blurb,
  includesLabel,
  includes,
  itemColor = "rgba(255,255,255,0.82)",
  mutedNote = "rgba(255,255,255,0.5)",
  divider = "rgba(255,255,255,0.10)",
  cardStyle,
  badge,
  cta,
}: CardProps) {
  return (
    <div style={{ position: "relative", padding: "32px 28px 34px", borderRadius: 4, ...cardStyle }}>
      {badge && (
        <div
          style={{
            position: "absolute",
            top: -11,
            right: 16,
            background: "var(--sprint-lime)",
            color: "#0c1321",
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: "5px 8px",
            borderRadius: 3,
          }}
        >
          Video Included
        </div>
      )}
      <Eyebrow style={{ marginBottom: 22 }}>{eyebrow}</Eyebrow>
      <div
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 600,
          fontSize: 30,
          letterSpacing: "-0.02em",
          paddingBottom: 16,
          marginBottom: 18,
          borderBottom: "1px solid rgba(255,255,255,0.09)",
        }}
      >
        {name}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 22 }}>
        <span style={{ fontSize: 34, fontWeight: 600, letterSpacing: "-0.02em" }}>{price}</span>
        {priceNote && (
          <span style={{ fontSize: 13, color: mutedNote, lineHeight: 1.2 }}>{priceNote}</span>
        )}
      </div>
      <p
        style={{
          fontSize: 14,
          lineHeight: 1.5,
          color: itemColor === "#ffffff" ? "rgba(255,255,255,0.68)" : "rgba(255,255,255,0.62)",
          margin: "0 0 22px",
          minHeight: 42,
        }}
      >
        {blurb}
      </p>
      <div style={{ height: 1, background: divider, marginBottom: 22 }} />
      <div
        className="s-mono"
        style={{
          fontSize: 11,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: mutedNote === "rgba(255,255,255,0.55)" ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.5)",
          marginBottom: 18,
        }}
      >
        {includesLabel}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 13, marginBottom: 30 }}>
        {includes.map((it, i) => (
          <SparkleItem key={i} color={itemColor}>
            {it}
          </SparkleItem>
        ))}
      </div>
      {cta}
    </div>
  );
}

const ghostCta: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(255,255,255,0.06)",
  color: "#ffffff",
  textDecoration: "none",
  fontSize: 14,
  fontWeight: 600,
  padding: "13px 0",
  borderRadius: 4,
  border: "1px solid rgba(255,255,255,0.16)",
};

const limeCta: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "var(--sprint-lime)",
  color: "#0c1321",
  textDecoration: "none",
  fontSize: 14,
  fontWeight: 600,
  padding: "13px 0",
  borderRadius: 4,
};

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
          Plans that fit how you work<span className="s-dot">.</span>
        </h2>
      </div>

      <div
        className="pricing-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 20,
          alignItems: "start",
        }}
      >
        <PricingCard
          eyebrow="[ FOR SOLO FOUNDERS ]"
          name="Starter"
          price="$3,500"
          priceNote={
            <>
              per month
              <br />
              one flat fee
            </>
          }
          blurb="Everything a founder needs to launch and look sharp."
          includesLabel="Includes"
          includes={[
            "1 active request at a time",
            "Brand, digital & print design",
            "Unlimited revisions",
            "Dashboard & asset library",
          ]}
          cardStyle={{
            background:
              "radial-gradient(ellipse 135% 75% at 80% -5%,rgba(93,107,255,0.22),rgba(138,92,255,0.09) 42%,rgba(0,200,255,0.07) 64%,rgba(255,255,255,0.015) 82%),#111a35",
            border: "1px solid rgba(120,130,255,0.18)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
          }}
          cta={
            <a
              className="cta cta-ghost"
              href="https://buy.stripe.com/eVq9AU2bbezJ3kXgTo3oA0g"
              target="_blank"
              rel="noopener"
              style={ghostCta}
            >
              Get started
            </a>
          }
        />

        <PricingCard
          eyebrow="[ FOR GROWING BRANDS ]"
          name="Growth"
          price="$4,500"
          priceNote={
            <>
              per month
              <br />
              one flat fee
            </>
          }
          blurb="For brands scaling their marketing across every channel."
          includesLabel="Includes"
          includes={[
            "2 active requests",
            "Brand, digital & print design",
            "Unlimited revisions",
            "Dashboard & asset library",
          ]}
          itemColor="#ffffff"
          mutedNote="rgba(255,255,255,0.55)"
          divider="rgba(255,255,255,0.12)"
          cardStyle={{
            background:
              "radial-gradient(ellipse 135% 75% at 80% -5%,rgba(93,107,255,0.24),rgba(138,92,255,0.10) 42%,rgba(0,200,255,0.08) 64%,rgba(255,255,255,0.015) 82%),#121c3a",
            border: "1px solid rgba(126,136,255,0.22)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
          }}
          cta={
            <a
              className="cta cta-ghost"
              href="https://buy.stripe.com/cNi14o3ffbnxbRt5aG3oA0f"
              target="_blank"
              rel="noopener"
              style={ghostCta}
            >
              Get started
            </a>
          }
        />

        <PricingCard
          badge
          eyebrow="[ FOR MARKETING TEAMS ]"
          name="Scale"
          price="$7,500"
          priceNote={
            <>
              per month
              <br />
              one flat fee
            </>
          }
          blurb="Full service creative firepower, including video and motion."
          includesLabel="Everything in Growth, plus"
          includes={[
            "2 active requests",
            "1 active video request",
            "Motion & animation",
            "Quarterly brand reviews",
          ]}
          cardStyle={{
            background:
              "radial-gradient(ellipse 135% 78% at 80% -5%,rgba(93,107,255,0.24),rgba(138,92,255,0.10) 42%,rgba(0,200,255,0.08) 64%,rgba(255,255,255,0.015) 82%),#121c3a",
            border: "1px solid rgba(181,230,2,0.45)",
            boxShadow:
              "0 0 0 1px rgba(181,230,2,0.12),0 20px 50px -24px rgba(181,230,2,0.30)",
          }}
          cta={
            <a
              className="cta cta-lime"
              href="https://buy.stripe.com/6oUeVe1773V58Fhav03oA0e"
              target="_blank"
              rel="noopener"
              style={limeCta}
            >
              Get started
            </a>
          }
        />

        <PricingCard
          eyebrow="[ AI SOLUTIONS ]"
          name="Enterprise"
          price="Custom"
          blurb="Bespoke AI platforms and automation, built around your operation."
          includesLabel="Includes"
          includes={[
            "Custom AI platform build",
            "Workflow automation & integrations",
            "Dedicated build team",
            "Custom SLAs",
          ]}
          cardStyle={{
            background:
              "radial-gradient(ellipse 140% 70% at 82% -8%,rgba(138,92,255,0.15),rgba(93,107,255,0.05) 44%,transparent 76%),linear-gradient(180deg,#0c1124,#080b18)",
            border: "1px solid rgba(138,92,255,0.24)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.05),0 24px 60px -30px rgba(0,0,0,0.8)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
          }}
          cta={
            <a
              className="cta cta-ghost"
              href="#"
              data-open-contact="1"
              data-intent="ai-platform"
              style={ghostCta}
            >
              Contact sales
            </a>
          }
        />
      </div>

      {/* trust bar */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 38 }}>
        <div
          className="trust-bar"
          style={{
            display: "inline-flex",
            alignItems: "stretch",
            borderRadius: 6,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.025)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
        >
          <div
            className="trust-cell"
            style={{ display: "flex", alignItems: "center", gap: 11, padding: "16px 24px" }}
          >
            <MaskIcon src="/assets/icons/refresh.svg" size={22} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#ffffff", lineHeight: 1.3 }}>
                6-month rolling terms
              </div>
              <div
                className="s-mono"
                style={{ fontSize: 11, letterSpacing: "0.03em", color: "rgba(255,255,255,0.5)" }}
              >
                Renews automatically
              </div>
            </div>
          </div>
          <div className="trust-div" style={{ width: 1, background: "rgba(255,255,255,0.1)" }} />
          <div
            className="trust-cell"
            style={{ display: "flex", alignItems: "center", gap: 11, padding: "16px 24px" }}
          >
            <MaskIcon src="/assets/icons/pause.svg" size={22} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#ffffff", lineHeight: 1.3 }}>
                Pause anytime
              </div>
              <div
                className="s-mono"
                style={{ fontSize: 11, letterSpacing: "0.03em", color: "rgba(255,255,255,0.5)" }}
              >
                Just 30 days&apos; notice before your term ends
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
