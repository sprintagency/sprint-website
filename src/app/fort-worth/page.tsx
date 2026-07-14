import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";
import FinalCTA from "@/components/FinalCTA";
import JsonLd from "@/components/JsonLd";
import MapFacade from "@/components/MapFacade";
import { CtaArrow } from "@/components/primitives";
import { CLIENT_LOGOS } from "@/lib/site-content";
import { SERVICES } from "@/lib/seo/services";
import { siteConfig } from "@/lib/seo/config";
import { buildMetadata } from "@/lib/seo/metadata";
import SocialMeta from "@/components/SocialMeta";
import {
  graph,
  serviceSchema,
  faqSchema,
  breadcrumbSchema,
  webPageSchema,
} from "@/lib/seo/schema";

const SEO = {
  path: "/fort-worth",
  image: "/og/og-services.png",
  title: "Creative Agency in Fort Worth, Texas",
  description:
    "Sprint is a creative agency in Fort Worth, Texas. Brand, web design, video, social, and print on one flat monthly retainer, serving the Fort Worth metro and beyond since 2011.",
};

export function generateMetadata(): Promise<Metadata> {
  return buildMetadata(SEO);
}

const loc = siteConfig.primaryLocation;
const napAddress = `${loc.streetAddress}, ${loc.addressLocality}, ${loc.addressRegion} ${loc.postalCode}`;

const LOCAL_FAQS = [
  {
    q: "Where is Sprint based?",
    a: `Sprint is a creative agency based in Fort Worth, Texas, at ${napAddress}. We work with businesses across the Fort Worth metro and nationwide.`,
  },
  {
    q: "Which areas around Fort Worth do you serve?",
    a: "Fort Worth and the surrounding Tarrant County metro, including Arlington, Dallas, Southlake, Grapevine, Keller, and Aledo, along with clients nationwide and in the UK.",
  },
  {
    q: "Do you offer video filming in Fort Worth?",
    a: "Yes. Live filming is available in the Fort Worth, Texas area within Tarrant County on our video production plans, with wider shoots quoted separately.",
  },
  {
    q: "How do you work with local businesses?",
    a: "Everything runs through the Sprint Client Portal. You submit requests, review work with notes pinned to the design, and approve, all in one place, with a monthly strategy call on every plan.",
  },
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
const featCard = {
  padding: "28px 26px",
  borderRadius: 12,
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.1)",
  textDecoration: "none",
  color: "#fff",
  display: "block",
} as const;
const featH3 = {
  fontFamily: "var(--font-sans)",
  fontWeight: 600,
  fontSize: 19,
  letterSpacing: "-0.02em",
  margin: "0 0 10px",
} as const;
const featP = {
  fontSize: 14.5,
  lineHeight: 1.62,
  color: "rgba(255,255,255,0.58)",
  margin: 0,
} as const;

export default function FortWorthPage() {
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

      <SocialMeta {...SEO} />
      <Header />

      <JsonLd
        data={graph(
          webPageSchema({
            path: "/fort-worth",
            name: "Creative Agency in Fort Worth, Texas",
            description:
              "Sprint is a creative agency in Fort Worth, Texas, offering brand, web, video, social, and print on a monthly retainer.",
            speakableSelectors: [".fw-h1", ".fw-lead"],
          }),
          ...SERVICES.map((s) => serviceSchema(s)),
          faqSchema(LOCAL_FAQS),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Fort Worth", path: "/fort-worth" },
          ]),
        )}
      />

      <main>
        {/* HERO */}
        <section
          className="px"
          style={{
            position: "relative",
            zIndex: 10,
            maxWidth: 1360,
            margin: "0 auto",
            padding: "150px 48px 60px",
          }}
        >
          <div className="vp-copy" style={{ maxWidth: 760 }}>
            <div className="s-eyebrow" style={{ color: "var(--sprint-lime)", marginBottom: 24 }}>
              [ CREATIVE AGENCY · FORT WORTH, TEXAS ]
            </div>
            <h1
              className="fw-h1"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: "clamp(44px,5.2vw,68px)",
                lineHeight: 0.99,
                letterSpacing: "-0.035em",
                margin: "0 0 24px",
              }}
            >
              Creative agency in Fort Worth, Texas<span className="s-dot">.</span>
            </h1>
            <p
              className="fw-lead"
              style={{
                fontSize: 18.5,
                lineHeight: 1.62,
                color: "rgba(255,255,255,0.7)",
                margin: "0 0 32px",
                maxWidth: 640,
              }}
            >
              Sprint is a creative agency based in Fort Worth, Texas. We
              give local businesses a full creative department, brand identity,
              web design, video production, social media, and print, on one flat
              monthly retainer. Established 2011, serving the Fort Worth metro
              and clients nationwide.
            </p>
            <div className="fcta-actions" style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <a
                className="cta cta-lime"
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
                  fontSize: 16,
                  fontWeight: 600,
                  padding: "15px 24px",
                  borderRadius: 4,
                }}
              >
                Start a project
                <CtaArrow dark />
              </a>
              <a
                className="cta cta-ghost"
                href="#services"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: 16,
                  fontWeight: 600,
                  padding: "15px 24px",
                  borderRadius: 4,
                }}
              >
                See services
              </a>
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

        {/* SERVICES */}
        <section id="services" className="px" style={{ position: "relative", zIndex: 10, maxWidth: 1360, margin: "0 auto", padding: "80px 48px 40px" }}>
          <div style={{ maxWidth: 700, margin: "0 0 40px" }}>
            <div className="s-eyebrow" style={eyebrow}>[ WHAT WE DO ]</div>
            <h2 style={sectionH2}>Every creative service, one Fort Worth team<span className="s-dot">.</span></h2>
          </div>
          <div className="feat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {SERVICES.map((s) => (
              <a key={s.slug} href={s.href} className="feat-card" style={featCard}>
                <h3 style={featH3}>{s.name} in Fort Worth</h3>
                <p style={featP}>{s.summary}</p>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 16, color: "var(--sprint-lime)", fontSize: 14, fontWeight: 600 }}>
                  Learn more
                  <CtaArrow dark />
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* LOCAL CONTEXT + MAP */}
        <section className="px" style={{ position: "relative", zIndex: 10, maxWidth: 1360, margin: "0 auto", padding: "80px 48px 40px" }}>
          <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,1.05fr) minmax(0,0.95fr)", gap: 56, alignItems: "center" }}>
            <div>
              <div className="s-eyebrow" style={eyebrow}>[ BASED IN FORT WORTH ]</div>
              <h2 style={{ ...sectionH2, margin: "0 0 22px" }}>Built for Fort Worth business<span className="s-dot">.</span></h2>
              <p style={{ fontSize: 16.5, lineHeight: 1.68, color: "rgba(255,255,255,0.72)", margin: "0 0 18px" }}>
                Fort Worth is a city built on business, and the brands that win here have a clear, consistent presence. We have been building brands and websites since 2011, working as a fast, trusted extension of local teams across Tarrant County and the wider metro.
              </p>
              <p style={{ fontSize: 16.5, lineHeight: 1.68, color: "rgba(255,255,255,0.72)", margin: 0 }}>
                From our Fort Worth base we serve Arlington, Dallas, Southlake, Grapevine, Keller, and Aledo, and manage the whole process remotely for clients nationwide. Live video filming is available across the Fort Worth area.
              </p>
              <address
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  marginTop: 26,
                  fontStyle: "normal",
                  fontSize: 15,
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                <strong style={{ fontWeight: 600 }}>{siteConfig.siteName}</strong>
                <span>{napAddress}, USA</span>
                <a href={`mailto:${siteConfig.contact.email}`} className="footer-link" style={{ color: "var(--sprint-lime)", textDecoration: "none" }}>
                  {siteConfig.contact.email}
                </a>
              </address>
            </div>
            <MapFacade query={`${siteConfig.siteName}, ${napAddress}`} height={360} />
          </div>
        </section>

        {/* LOCAL FAQ */}
        <section className="px" style={{ position: "relative", zIndex: 10, maxWidth: 1360, margin: "0 auto", padding: "70px 48px 40px" }}>
          <div style={{ maxWidth: 840, margin: "0 auto" }}>
            <div className="s-eyebrow" style={{ color: "var(--sprint-lime)", marginBottom: 18, textAlign: "center" }}>[ FORT WORTH, ANSWERED ]</div>
            <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "clamp(28px,3.4vw,42px)", lineHeight: 1.06, letterSpacing: "-0.03em", margin: "0 0 40px", textAlign: "center" }}>
              Working with a Fort Worth agency<span className="s-dot">.</span>
            </h2>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
              {LOCAL_FAQS.map((f) => (
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
      </main>

      <FinalCTA />
      <ContactModal />
      <Footer />
    </div>
  );
}
