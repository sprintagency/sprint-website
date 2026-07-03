import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";
import PricingBlocks from "@/components/PricingBlocks";
import FinalCTA from "@/components/FinalCTA";
import CaseStudyTabs from "@/components/CaseStudyTabs";
import { CLIENT_LOGOS } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Brand Identity in Fort Worth — Sprint",
  description:
    "Strategic brand identity, without the complexity. Sprint is a dedicated branding team for Fort Worth businesses that want to stand out and grow. Positioning, logo systems, visual identity, and guidelines, all handled by one team on a simple monthly plan.",
};

const chipStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: 9,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 999,
  padding: "9px 15px",
  fontSize: 13.5,
  fontWeight: 500,
} as const;

const dot = { width: 7, height: 7, borderRadius: "50%", background: "var(--sprint-lime)", flex: "none" } as const;

const featCard = {
  padding: "30px 28px 30px",
  borderRadius: 12,
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.1)",
} as const;

const featH3 = {
  fontFamily: "var(--font-sans)",
  fontWeight: 600,
  fontSize: 19,
  letterSpacing: "-0.02em",
  margin: "0 0 10px",
} as const;

const featP = { fontSize: 14.5, lineHeight: 1.62, color: "rgba(255,255,255,0.58)", margin: 0 } as const;

const STATS = [
  { value: "7 days", label: "To first concepts" },
  { value: "Full system", label: "Logo, color & type" },
  { value: "Unlimited", label: "Revisions per project" },
  { value: "Est. 2011", label: "15+ years experience" },
];

const PORTAL_FEATS = [
  { icon: "palette.svg", title: "Request in seconds", body: "Kick off a new logo, asset, or brand update in a couple of clicks. Your queue is always visible and always moving." },
  { icon: "pause.svg", title: "Review with clear notes", body: "Comment directly on any concept and keep every round of feedback in one place. No more vague notes or long email chains." },
  { icon: "check-bold.svg", title: "Approve and download anywhere", body: "Sign off in one tap and grab every asset you own, logos, source files, and full brand guidelines, ready for any team or supplier." },
];

const WHY_COLS = [
  { eyebrow: "[ DIFFERENTIATE ]", title: "Stand out in competitive markets", body: "Differentiate your business with a unique visual identity and positioning strategy that helps customers choose you over competitors." },
  { eyebrow: "[ TRUST ]", title: "Build trust and recognition", body: "Create a consistent brand experience that improves credibility, strengthens recall, and builds long term customer confidence." },
  { eyebrow: "[ CONSISTENCY ]", title: "Consistency across every touchpoint", body: "Ensure your website, social media, marketing materials, and sales assets all communicate a unified brand experience." },
  { eyebrow: "[ STRATEGY ]", title: "Strategic brand development", body: "From discovery and positioning to visual identity systems and guidelines, we manage the entire branding process from start to finish." },
];

const FAQS = [
  { q: "How long does a brand identity take?", a: "You will see first concepts within 7 days. A full identity, including logo system, color, type, and guidelines, is typically delivered over a few weeks depending on scope." },
  { q: "What is included in a brand identity?", a: "Positioning and brand strategy, a full logo system, color palette, typography, supporting visual assets, and clear brand guidelines that keep everything consistent across every platform and team." },
  { q: "Do you work with brands outside Fort Worth?", a: "Absolutely. We are based in Fort Worth, Texas, and build brands for clients nationwide, managing the full process remotely through the Sprint Client Portal." },
];

const eyebrow = { color: "var(--sprint-lime)", marginBottom: 18 } as const;
const sectionH2 = {
  fontFamily: "var(--font-sans)",
  fontWeight: 600,
  fontSize: "clamp(30px,3.6vw,46px)",
  lineHeight: 1.06,
  letterSpacing: "-0.03em",
  margin: 0,
} as const;

const collageCard = {
  borderRadius: 14,
  overflow: "hidden",
} as const;

const HERO_COLLAGE = [
  {
    src: "/assets/case-studies/ff-landscape-02.webp",
    alt: "Frontrunner Fieldhouse brand environment",
    wrap: { position: "absolute", top: 0, left: "5%", width: "60%", transform: "rotate(-3deg)", zIndex: 1 },
    card: { border: "1px solid rgba(255,255,255,0.14)", boxShadow: "0 30px 60px -28px rgba(0,0,0,0.8)", animation: "vpFloat 8s ease-in-out infinite" },
  },
  {
    src: "/assets/case-studies/ff-phone.webp",
    alt: "Frontrunner Fieldhouse mobile identity",
    wrap: { position: "absolute", top: "7%", right: "1%", width: "32%", transform: "rotate(3.5deg)", zIndex: 3 },
    card: { border: "1px solid rgba(255,255,255,0.16)", boxShadow: "0 30px 60px -26px rgba(0,0,0,0.82)", animation: "vpFloat 6.4s ease-in-out infinite", animationDelay: "-1.2s" },
  },
  {
    src: "/assets/case-studies/ff-landscape-03.webp",
    alt: "Frontrunner Fieldhouse signage and environment",
    wrap: { position: "absolute", top: "33%", left: "27%", width: "56%", transform: "rotate(-1.5deg)", zIndex: 2 },
    card: { border: "1px solid rgba(255,255,255,0.14)", boxShadow: "0 30px 60px -28px rgba(0,0,0,0.8)", animation: "vpFloat 7.6s ease-in-out infinite", animationDelay: "-3s" },
  },
  {
    src: "/assets/case-studies/ff-cards.webp",
    alt: "Frontrunner Fieldhouse brand collateral",
    wrap: { position: "absolute", bottom: 0, left: "1%", width: "36%", transform: "rotate(1.5deg)", zIndex: 4 },
    card: { border: "1px solid rgba(255,255,255,0.16)", boxShadow: "0 34px 68px -28px rgba(0,0,0,0.85)", animation: "vpFloat 7.2s ease-in-out infinite", animationDelay: "-2.4s" },
  },
  {
    src: "/assets/case-studies/ff-tee-01.webp",
    alt: "Frontrunner Fieldhouse branded merchandise",
    wrap: { position: "absolute", bottom: "3%", right: "5%", width: "27%", transform: "rotate(4deg)", zIndex: 3 },
    card: { border: "1px solid rgba(255,255,255,0.16)", boxShadow: "0 30px 60px -26px rgba(0,0,0,0.82)", animation: "vpFloat 6.9s ease-in-out infinite", animationDelay: "-0.6s" },
  },
] as const;

const csMeta = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 999,
  padding: "7px 13px",
  fontSize: 12.5,
  fontWeight: 500,
} as const;

const csMetaLabel = { color: "var(--sprint-lime)", fontSize: 10, letterSpacing: "0.06em" } as const;

export default function BrandIdentityFortWorthPage() {
  const logos = [...CLIENT_LOGOS, ...CLIENT_LOGOS];
  return (
    <div
      style={{
        background: "#0c1321",
        color: "#ffffff",
        fontFamily: "var(--font-sans)",
        minHeight: "100vh",
        overflowX: "clip",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -280,
          right: -180,
          width: 1160,
          height: 1160,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(93,107,255,0.28) 0%,rgba(138,92,255,0.11) 38%,rgba(0,200,255,0.06) 58%,rgba(12,19,33,0) 74%)",
          pointerEvents: "none",
          filter: "blur(4px)",
          zIndex: 0,
        }}
      />

      <Header />

      {/* HERO */}
      <section className="px" style={{ position: "relative", zIndex: 10, maxWidth: 1360, margin: "0 auto", padding: "132px 48px 52px" }}>
        <div className="svc-hero-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,1.02fr) minmax(0,0.98fr)", gap: 64, alignItems: "center" }}>
          <div className="vp-copy" style={{ maxWidth: 560 }}>
            <div className="s-eyebrow" style={{ color: "var(--sprint-lime)", marginBottom: 24 }}>[ SERVICE · BRAND IDENTITY ]</div>
            <h1 className="svc-hero-h1" style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "clamp(44px,5.2vw,68px)", lineHeight: 0.98, letterSpacing: "-0.035em", margin: "0 0 24px" }}>
              Brand identity in Fort Worth<span className="s-dot">.</span>
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.62, color: "rgba(255,255,255,0.66)", margin: "0 0 30px", maxWidth: 500 }}>
              Strategic brand identity, without the complexity. Sprint is a dedicated branding team for Fort Worth businesses that want to stand out and grow. Positioning, logo systems, visual identity, and guidelines, all handled by one team on a simple monthly plan.
            </p>
            <div className="svc-hero-chips" style={{ display: "flex", alignItems: "center", gap: 10, margin: "0 0 34px" }}>
              <span style={chipStyle}><span style={dot} />Brand strategy</span>
              <span style={chipStyle}><span style={dot} />Custom identity</span>
              <span style={chipStyle}><span style={dot} />Brand guidelines</span>
            </div>
            <div className="svc-hero-ctas" style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <a className="cta cta-lime" href="#" data-open-contact="1" data-intent="demo" style={{ display: "inline-flex", alignItems: "center", gap: 12, background: "var(--sprint-lime)", color: "#0c1321", textDecoration: "none", fontSize: 16, fontWeight: 600, padding: "15px 24px", borderRadius: 4 }}>
                Start a project
                <span style={{ display: "inline-flex", width: 22, height: 22, alignItems: "center", justifyContent: "center", background: "rgba(12,19,33,0.16)", borderRadius: 3 }}>→</span>
              </a>
              <a className="cta cta-ghost" href="#pricing" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.14)", color: "#fff", textDecoration: "none", fontSize: 16, fontWeight: 600, padding: "15px 24px", borderRadius: 4 }}>See pricing</a>
            </div>
          </div>

          {/* floating brand-work collage */}
          <div className="svc-hero-media" style={{ position: "relative", minWidth: 0 }}>
            <div style={{ position: "absolute", inset: "-9% -7%", borderRadius: 20, background: "radial-gradient(ellipse at 50% 46%,rgba(93,107,255,0.34),rgba(138,92,255,0.14) 40%,rgba(0,200,255,0.12) 62%,transparent 78%)", filter: "blur(46px)", zIndex: 0, pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1, height: "clamp(420px,42vw,540px)" }}>
              {HERO_COLLAGE.map((c) => (
                <div key={c.src} style={c.wrap as React.CSSProperties}>
                  <div className="collage-card" style={{ ...collageCard, ...c.card }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img decoding="async" src={c.src} alt={c.alt} loading="lazy" style={{ display: "block", width: "100%", height: "auto" }} />
                  </div>
                </div>
              ))}
            </div>
            {/* floating badge */}
            <div style={{ position: "absolute", bottom: -14, right: -14, zIndex: 4, display: "flex", alignItems: "center", gap: 11, padding: "13px 16px", borderRadius: 9, background: "rgba(12,19,33,0.82)", border: "1px solid rgba(181,230,2,0.32)", boxShadow: "0 20px 44px -22px rgba(0,0,0,0.85)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", animation: "vpFloat 6.5s ease-in-out infinite" }}>
              <span style={{ width: 32, height: 32, flex: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: 7, background: "rgba(181,230,2,0.14)", border: "1px solid rgba(181,230,2,0.3)" }}>
                <span style={{ width: 16, height: 16, background: "var(--sprint-lime)", WebkitMask: "url(/assets/icons/palette.svg) center/contain no-repeat", mask: "url(/assets/icons/palette.svg) center/contain no-repeat" }} />
              </span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.2 }}>Full brand system</div>
                <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.55)" }}>Built in six months.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTED BY */}
      <section className="px" style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 1360, margin: "0 auto", padding: "8px 48px 40px" }}>
        <div className="s-eyebrow" style={{ color: "rgba(255,255,255,0.42)", textAlign: "center", marginBottom: 22 }}>[ TRUSTED BY ]</div>
        <div style={{ position: "relative", overflow: "hidden", WebkitMaskImage: "linear-gradient(to right,transparent 0%,#000 9%,#000 91%,transparent 100%)", maskImage: "linear-gradient(to right,transparent 0%,#000 9%,#000 91%,transparent 100%)" }}>
          <div className="logo-track" style={{ display: "flex", alignItems: "center", gap: 56, width: "max-content", opacity: 0.7, animation: "logomarquee 54s linear infinite" }}>
            {logos.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={src} alt="" aria-hidden={i >= CLIENT_LOGOS.length ? "true" : undefined} style={{ height: 28, width: "auto", display: "block" }} />
            ))}
          </div>
        </div>
      </section>

      {/* STAT BAND */}
      <section className="px" style={{ position: "relative", zIndex: 10, maxWidth: 1360, margin: "0 auto", padding: "0 48px 20px" }}>
        <div className="stat-band" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, overflow: "hidden" }}>
          {STATS.map((s) => (
            <div key={s.label} style={{ background: "#0c1321", padding: "30px 26px" }}>
              <div style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "clamp(30px,3vw,40px)", letterSpacing: "-0.03em" }}>{s.value}</div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.56)", marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CASE STUDY */}
      <section id="work" className="px" style={{ position: "relative", zIndex: 10, maxWidth: 1360, margin: "0 auto", padding: "96px 48px 40px", overflow: "visible" }}>
        <div style={{ position: "absolute", top: 20, bottom: 20, left: "50%", transform: "translateX(-50%)", width: "100vw", pointerEvents: "none", background: "radial-gradient(ellipse 42% 60% at 72% 40%,rgba(93,107,255,0.13),rgba(138,92,255,0.05) 48%,transparent 70%)" }} />
        <div style={{ position: "relative", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, marginBottom: 14, flexWrap: "wrap" }}>
          <div>
            <div className="s-eyebrow" style={eyebrow}>[ CASE STUDY ]</div>
            <h2 style={{ ...sectionH2, lineHeight: 1.06 }}>A brand built from zero<span className="s-dot">.</span></h2>
          </div>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: "rgba(255,255,255,0.6)", margin: 0, maxWidth: 400 }}>
            How we took Aledo Soccer Club from a name and a vision to a fully realized, community first brand, in a single engagement.
          </p>
        </div>

        <div className="cs-wrap" style={{ position: "relative", display: "grid", gridTemplateColumns: "minmax(0,1.05fr) minmax(0,0.95fr)", gap: 52, alignItems: "center", marginTop: 34 }}>

          {/* MEDIA */}
          <div style={{ position: "relative" }}>
            <div style={{ position: "relative", aspectRatio: "16 / 9", borderRadius: 14, overflow: "hidden", border: "1px solid rgba(255,255,255,0.14)", boxShadow: "0 40px 90px -44px rgba(0,0,0,0.85)", background: "#0c1321" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img decoding="async" src="/assets/case-studies/asc-casestudy-pba.webp" alt="Aledo Soccer Club kit and identity" loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
              <div style={{ position: "absolute", left: 14, top: 14, zIndex: 2, display: "inline-flex", alignItems: "center", gap: 9, padding: "7px 12px", borderRadius: 6, background: "rgba(12,19,33,0.7)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", pointerEvents: "none" }}>
                <span style={dot} />
                <span className="s-mono" style={{ fontSize: 11, letterSpacing: "0.06em", color: "rgba(255,255,255,0.85)" }}>IDENTITY &amp; KIT</span>
              </div>
            </div>
            {/* overlapping swap card */}
            <div style={{ position: "absolute", bottom: -22, right: -16, width: "38%", transform: "rotate(4deg)", zIndex: 2 }}>
              <div className="collage-card" style={{ borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.16)", boxShadow: "0 26px 56px -24px rgba(0,0,0,0.85)", animation: "vpFloat 6.8s ease-in-out infinite" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img decoding="async" src="/assets/case-studies/asc-casestudy-v01.webp" alt="Aledo Soccer Club identity poster" loading="lazy" style={{ display: "block", width: "100%", height: "auto" }} />
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 26 }}>
              <span style={csMeta}><span className="s-mono" style={csMetaLabel}>CLIENT</span>Aledo Soccer Club</span>
              <span style={csMeta}><span className="s-mono" style={csMetaLabel}>YEAR</span>2026</span>
              <span style={csMeta}><span className="s-mono" style={csMetaLabel}>SCOPE</span>Brand, Web, Social, Video</span>
            </div>

            {/* tabs (interactive) */}
            <CaseStudyTabs />

            {/* testimonial */}
            <div style={{ marginTop: 28, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", gap: 16, alignItems: "flex-start" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img decoding="async" src="/assets/testimonials/denin.webp" alt="Denin Spriggs" loading="lazy" style={{ width: 46, height: 46, flex: "none", borderRadius: "50%", objectFit: "cover", border: "1px solid rgba(255,255,255,0.16)" }} />
              <div>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,0.82)", margin: "0 0 10px", fontStyle: "italic" }}>&ldquo;Aledo Soccer Club wouldn&rsquo;t have been possible without Sprint. From the logo and brand identity to sign ups and event marketing, they brought everything together from day one.&rdquo;</p>
                <div style={{ fontSize: 13.5, color: "#fff", fontWeight: 600 }}>Denin Spriggs</div>
                <div className="s-mono" style={{ fontSize: 11, letterSpacing: "0.04em", color: "rgba(255,255,255,0.5)" }}>CLUB DIRECTOR · ALEDO SOCCER CLUB</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="px" style={{ position: "relative", zIndex: 10, maxWidth: 1360, margin: "0 auto", padding: "80px 48px 40px" }}>
        <div style={{ maxWidth: 700, margin: "0 0 44px" }}>
          <div className="s-eyebrow" style={eyebrow}>[ PLANS &amp; PRICING ]</div>
          <h2 style={sectionH2}>Branding, without the agency overhead<span className="s-dot">.</span></h2>
        </div>
        <PricingBlocks />
      </section>

      {/* PORTAL */}
      <section id="portal" className="px" style={{ position: "relative", zIndex: 10, maxWidth: 1360, margin: "0 auto", padding: "96px 48px 40px", overflow: "visible" }}>
        <div style={{ position: "absolute", top: -40, bottom: -40, left: "50%", transform: "translateX(-50%)", width: "100vw", pointerEvents: "none", background: "radial-gradient(ellipse 44% 62% at 68% 34%,rgba(93,107,255,0.16),rgba(138,92,255,0.06) 46%,transparent 68%)" }} />
        <div className="portal-grid" style={{ position: "relative", display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.12fr)", gap: 64, alignItems: "center" }}>
          <div>
            <div className="s-eyebrow" style={{ color: "var(--sprint-lime)", marginBottom: 18 }}>[ THE PORTAL ]</div>
            <h2 style={{ ...sectionH2, margin: "0 0 20px" }}>Your whole brand, in one portal<span className="s-dot">.</span></h2>
            <p style={{ fontSize: 17, lineHeight: 1.62, color: "rgba(255,255,255,0.66)", margin: "0 0 34px", maxWidth: 520 }}>
              No more scattered email threads and lost files. Submit brand requests, review every concept, leave clear notes, and download final logos, assets, and guidelines, all in one workspace built for moving fast.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              {PORTAL_FEATS.map((f) => (
                <div key={f.title} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <span style={{ width: 48, height: 48, flex: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", background: "radial-gradient(circle at 32% 28%,rgba(93,107,255,0.38),rgba(138,92,255,0.15) 58%,rgba(255,255,255,0.02))", border: "1px solid rgba(255,255,255,0.16)", boxShadow: "0 10px 26px -12px rgba(93,107,255,0.6),inset 0 1px 0 rgba(255,255,255,0.2)" }}>
                    <span style={{ width: 20, height: 20, background: "var(--sprint-lime)", WebkitMask: `url(/assets/icons/${f.icon}) center/contain no-repeat`, mask: `url(/assets/icons/${f.icon}) center/contain no-repeat` }} />
                  </span>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 17, letterSpacing: "-0.015em", margin: "0 0 5px" }}>{f.title}</h3>
                    <p style={{ fontSize: 14.5, lineHeight: 1.55, color: "rgba(255,255,255,0.58)", margin: 0 }}>{f.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="portal-media" style={{ position: "relative" }}>
            <div style={{ position: "relative", borderRadius: 14, padding: 10, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 40px 90px -50px rgba(0,0,0,0.85)" }}>
              <div style={{ borderRadius: 8, overflow: "hidden", background: "#0c1321", border: "1px solid rgba(255,255,255,0.08)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/brand-hub-screen.webp" alt="Sprint client portal Brand Hub showing logos, color palette and typography" style={{ display: "block", width: "100%", height: "auto" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY SPRINT / SEO body */}
      <section className="px" style={{ position: "relative", zIndex: 10, maxWidth: 1360, margin: "0 auto", padding: "96px 48px 40px", overflow: "visible" }}>
        <div style={{ position: "absolute", top: 0, bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100vw", pointerEvents: "none", background: "radial-gradient(ellipse 40% 58% at 24% 30%,rgba(93,107,255,0.14),rgba(138,92,255,0.05) 48%,transparent 70%)" }} />
        <div className="why-grid" style={{ position: "relative", display: "grid", gridTemplateColumns: "minmax(0,0.86fr) minmax(0,1.14fr)", gap: 64, alignItems: "start" }}>
          <header className="why-head" style={{ position: "sticky", top: 120 }}>
            <div className="s-eyebrow" style={{ color: "var(--sprint-lime)", marginBottom: 20 }}>[ WHY SPRINT ]</div>
            <h2 style={{ ...sectionH2, margin: "0 0 22px" }}>Branding experts in Fort Worth<span className="s-dot">.</span></h2>
            <p style={{ fontSize: 16.5, lineHeight: 1.66, color: "rgba(255,255,255,0.72)", margin: "0 0 32px", maxWidth: 420 }}>
              A brand identity studio in Fort Worth, Texas, combining positioning, visual design, and clear messaging to help businesses stand out in competitive markets and grow with confidence.
            </p>
            <a className="cta cta-lime" href="#" data-open-contact="1" data-intent="demo" style={{ display: "inline-flex", alignItems: "center", gap: 11, background: "var(--sprint-lime)", color: "#0c1321", textDecoration: "none", fontSize: 15, fontWeight: 600, padding: "13px 22px", borderRadius: 4 }}>
              Book a demo <span style={{ display: "inline-flex", width: 20, height: 20, alignItems: "center", justifyContent: "center", background: "rgba(12,19,33,0.16)", borderRadius: 3 }}>→</span>
            </a>
          </header>
          <div>
            <p style={{ fontSize: 17, lineHeight: 1.66, color: "rgba(255,255,255,0.72)", margin: "0 0 36px" }}>
              Your brand is more than a logo. It is how customers recognise, remember, and trust your business. We combine research, strategy, and design to develop identities that feel distinctive, communicate credibility, and give your business a professional foundation for future growth.
            </p>
            <div className="why-cols" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
              {WHY_COLS.map((c) => (
                <div key={c.title} className="feat-card" style={featCard}>
                  <div className="s-eyebrow" style={{ color: "var(--sprint-lime)", marginBottom: 16 }}>{c.eyebrow}</div>
                  <h3 style={featH3}>{c.title}</h3>
                  <p style={featP}>{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MINI FAQ */}
      <section className="px" style={{ position: "relative", zIndex: 10, maxWidth: 1360, margin: "0 auto", padding: "80px 48px 40px" }}>
        <div style={{ maxWidth: 840, margin: "0 auto" }}>
          <div className="s-eyebrow" style={{ color: "var(--sprint-lime)", marginBottom: 18, textAlign: "center" }}>[ COMMON QUESTIONS ]</div>
          <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "clamp(28px,3.4vw,42px)", lineHeight: 1.06, letterSpacing: "-0.03em", margin: "0 0 40px", textAlign: "center" }}>
            Branding, answered<span className="s-dot">.</span>
          </h2>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
            {FAQS.map((f) => (
              <details key={f.q} className="faq-item" style={{ borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
                <summary style={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, padding: "24px 4px" }}>
                  <span className="faq-q" style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.01em", color: "rgba(255,255,255,0.88)" }}>{f.q}</span>
                  <span className="faq-plus" style={{ flex: "none", fontSize: 24, color: "var(--sprint-lime)", transition: "transform 0.28s cubic-bezier(0.22,1,0.36,1)", lineHeight: 1 }}>+</span>
                </summary>
                <p style={{ fontSize: 15, lineHeight: 1.65, color: "rgba(255,255,255,0.6)", margin: 0, padding: "0 4px 26px", maxWidth: 720 }}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
      <ContactModal />
      <Footer />
    </div>
  );
}
