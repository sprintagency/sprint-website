import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";
import PricingBlocks from "@/components/PricingBlocks";
import FinalCTA from "@/components/FinalCTA";
import { CLIENT_LOGOS } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Print Design in Fort Worth — Sprint",
  description:
    "Professional print design for Fort Worth businesses. From concept to final print ready files, delivered fast, with unlimited revisions on one simple monthly rate.",
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
  padding: "30px 28px",
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

const FEATURES = [
  { eyebrow: "[ SPEED ]", title: "Quick turnaround", body: "First concepts delivered within 5 working days, so your materials are ready when you need them." },
  { eyebrow: "[ MATERIALS ]", title: "Professional print materials", body: "Brochures, flyers, business cards, banners, and more, designed to impress." },
  { eyebrow: "[ REVISIONS ]", title: "Unlimited revisions", body: "Need a new version or a quick adjustment? Revisions are always included." },
  { eyebrow: "[ FILES ]", title: "Print ready files", body: "Delivered in the correct formats with proper setup for professional printing." },
];

const STATS = [
  { value: "5 days", label: "To first concepts" },
  { value: "Print ready", label: "Files at handoff" },
  { value: "Unlimited", label: "Revisions per project" },
  { value: "Est. 2011", label: "15+ years experience" },
];

const PORTAL_FEATS = [
  { icon: "printer.svg", title: "Request in seconds", body: "Kick off a new brochure, flyer, or business card in a couple of clicks. Your queue is always visible and always moving." },
  { icon: "pause.svg", title: "Review right on the proof", body: "Leave notes pinned to any part of the design and keep every round of feedback in one place. No more vague emails." },
  { icon: "check-bold.svg", title: "Approve and download", body: "Sign off in one tap and grab final print ready files, set up correctly for professional production." },
];

const WHY_COLS = [
  { eyebrow: "[ DESIGN ]", title: "Professional print design", body: "Custom designed materials tailored to your brand and your audience, never templated." },
  { eyebrow: "[ FILES ]", title: "Print ready files", body: "Delivered in the correct formats and specifications for professional printing." },
  { eyebrow: "[ RANGE ]", title: "Brochures, flyers and more", body: "From sales collateral to event materials, we design whatever your business needs." },
  { eyebrow: "[ PRODUCTION ]", title: "Print production support", body: "From file setup to final delivery, we coordinate with printers to get materials produced correctly." },
];

const FAQS = [
  { q: "How long does print design take?", a: "You will see first concepts within 5 working days. From there we revise until it is right and hand off print ready files, with timing depending on the size of the project." },
  { q: "What print materials do you design?", a: "Brochures, flyers, business cards, banners, signage, direct mail, sales collateral, and event materials, all custom designed for your brand and delivered print ready." },
  { q: "Do you work with brands outside Fort Worth?", a: "Absolutely. We are based in Fort Worth, Texas, and design print materials for clients nationwide, managing the whole process remotely through the Sprint Client Portal." },
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

export default function PrintDesignFortWorthPage() {
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
      <section className="px" style={{ position: "relative", zIndex: 10, maxWidth: 1360, margin: "0 auto", padding: "150px 48px 96px" }}>
        <div className="svc-hero-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,1.02fr) minmax(0,0.98fr)", gap: 64, alignItems: "center" }}>
          <div className="vp-copy" style={{ maxWidth: 560 }}>
            <div className="s-eyebrow" style={{ color: "var(--sprint-lime)", marginBottom: 24 }}>[ SERVICE · PRINT DESIGN ]</div>
            <h1 className="svc-hero-h1" style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "clamp(44px,5.2vw,68px)", lineHeight: 0.98, letterSpacing: "-0.035em", margin: "0 0 24px" }}>
              Print design in Fort Worth<span className="s-dot">.</span>
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.62, color: "rgba(255,255,255,0.66)", margin: "0 0 30px", maxWidth: 500 }}>
              Professional print design for Fort Worth businesses. From concept to final print ready files, delivered fast, with unlimited revisions on one simple monthly rate. Brochures, flyers, business cards, signage, and more, all handled by one team.
            </p>
            <div className="svc-hero-chips" style={{ display: "flex", alignItems: "center", gap: 10, margin: "0 0 34px" }}>
              <span style={chipStyle}><span style={dot} />Bespoke print design</span>
              <span style={chipStyle}><span style={dot} />Unlimited revisions</span>
              <span style={chipStyle}><span style={dot} />Quick turnaround</span>
            </div>
            <div className="svc-hero-ctas" style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <a className="cta cta-lime" href="#" data-open-contact="1" data-intent="demo" style={{ display: "inline-flex", alignItems: "center", gap: 12, background: "var(--sprint-lime)", color: "#0c1321", textDecoration: "none", fontSize: 16, fontWeight: 600, padding: "15px 24px", borderRadius: 4 }}>
                Start a project
                <span style={{ display: "inline-flex", width: 22, height: 22, alignItems: "center", justifyContent: "center", background: "rgba(12,19,33,0.16)", borderRadius: 3 }}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }} aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
              </a>
              <a className="cta cta-ghost" href="#pricing" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.14)", color: "#fff", textDecoration: "none", fontSize: 16, fontWeight: 600, padding: "15px 24px", borderRadius: 4 }}>See pricing</a>
            </div>
          </div>

          <div className="svc-hero-media" style={{ position: "relative", minWidth: 0 }}>
            <div style={{ position: "absolute", inset: "-9% -7%", borderRadius: 20, background: "radial-gradient(ellipse at 50% 46%,rgba(93,107,255,0.34),rgba(138,92,255,0.14) 40%,rgba(0,200,255,0.12) 62%,transparent 78%)", filter: "blur(46px)", zIndex: 0, pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1, borderRadius: 10, padding: 10, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", boxShadow: "0 40px 90px -34px rgba(0,0,0,0.75)" }}>
              <div style={{ position: "relative", borderRadius: 6, overflow: "hidden", background: "#0c1321", aspectRatio: "16 / 9" }}>
                <iframe
                  src="https://app.vidzflow.com/v/Zr6i7wlAFx?ap=true&muted=true&loop=true&controls=false&bv=false&piv=false&playsinline=true&bc=%230c1321"
                  title="Annual report brochure design"
                  allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                  allowFullScreen
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
                />
                <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: 18, background: "linear-gradient(to top,rgba(12,19,33,0.78),rgba(12,19,33,0) 100%)", display: "flex", alignItems: "center", gap: 11, pointerEvents: "none" }}>
                  <span style={dot} />
                  <span className="s-mono" style={{ fontSize: 12, color: "rgba(255,255,255,0.85)" }}>ANNUAL REPORT DESIGN</span>
                </div>
              </div>
            </div>
            <div style={{ position: "absolute", top: -20, right: -18, zIndex: 3, display: "flex", alignItems: "center", gap: 11, padding: "13px 16px", borderRadius: 9, background: "rgba(12,19,33,0.82)", border: "1px solid rgba(181,230,2,0.32)", boxShadow: "0 20px 44px -22px rgba(0,0,0,0.85)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", animation: "vpFloat 6.5s ease-in-out infinite" }}>
              <span style={{ width: 32, height: 32, flex: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: 7, background: "rgba(181,230,2,0.14)", border: "1px solid rgba(181,230,2,0.3)" }}>
                <span style={{ width: 16, height: 16, background: "var(--sprint-lime)", WebkitMask: "url(/assets/icons/printer.svg) center/contain no-repeat", mask: "url(/assets/icons/printer.svg) center/contain no-repeat" }} />
              </span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.2 }}>Print ready files</div>
                <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.55)" }}>One team, end to end.</div>
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

      {/* FEATURES */}
      <section className="px" style={{ position: "relative", zIndex: 10, maxWidth: 1360, margin: "0 auto", padding: "96px 48px 40px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, marginBottom: 36, flexWrap: "wrap" }}>
          <div>
            <div className="s-eyebrow" style={eyebrow}>[ WHAT YOU GET ]</div>
            <h2 style={sectionH2}>Print that gets noticed<span className="s-dot">.</span></h2>
          </div>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: "rgba(255,255,255,0.6)", margin: 0, maxWidth: 400 }}>
            Bespoke, print ready materials that make your business look the part, delivered on a simple monthly plan from our Fort Worth studio.
          </p>
        </div>
        <div className="feat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
          {FEATURES.map((f) => (
            <div key={f.title} className="feat-card" style={featCard}>
              <div className="s-eyebrow" style={{ color: "var(--sprint-lime)", marginBottom: 16 }}>{f.eyebrow}</div>
              <h3 style={featH3}>{f.title}</h3>
              <p style={featP}>{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="px" style={{ position: "relative", zIndex: 10, maxWidth: 1360, margin: "0 auto", padding: "80px 48px 40px" }}>
        <div style={{ maxWidth: 700, margin: "0 0 44px" }}>
          <div className="s-eyebrow" style={eyebrow}>[ PLANS &amp; PRICING ]</div>
          <h2 style={sectionH2}>Print, without the agency overhead<span className="s-dot">.</span></h2>
        </div>
        <PricingBlocks />
      </section>

      {/* PORTAL */}
      <section className="px" style={{ position: "relative", zIndex: 10, maxWidth: 1360, margin: "0 auto", padding: "96px 48px 40px", overflow: "visible" }}>
        <div style={{ position: "absolute", top: -40, bottom: -40, left: "50%", transform: "translateX(-50%)", width: "100vw", pointerEvents: "none", background: "radial-gradient(ellipse 44% 62% at 68% 34%,rgba(93,107,255,0.16),rgba(138,92,255,0.06) 46%,transparent 68%)" }} />
        <div className="portal-grid" style={{ position: "relative", display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.12fr)", gap: 64, alignItems: "center" }}>
          <div>
            <div className="s-eyebrow" style={{ color: "var(--sprint-lime)", marginBottom: 18 }}>[ THE PORTAL ]</div>
            <h2 style={{ ...sectionH2, margin: "0 0 20px" }}>Your whole print project in one portal<span className="s-dot">.</span></h2>
            <p style={{ fontSize: 17, lineHeight: 1.62, color: "rgba(255,255,255,0.66)", margin: "0 0 34px", maxWidth: 520 }}>
              No more scattered email threads and lost files. Submit requests, review every proof, leave notes right on the design, and download final print ready files, all in one workspace built for moving fast.
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
            <div style={{ position: "relative", borderRadius: 12, padding: 3, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 40px 90px -50px rgba(0,0,0,0.85)" }}>
              <div style={{ borderRadius: 9, overflow: "hidden", background: "#0c1321", border: "1px solid rgba(255,255,255,0.08)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/hero-dashboard-v01.webp" alt="Sprint client portal dashboard for print design" style={{ display: "block", width: "100%", height: "auto" }} />
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
            <h2 style={{ ...sectionH2, margin: "0 0 22px" }}>Print design built for Fort Worth<span className="s-dot">.</span></h2>
            <p style={{ fontSize: 16.5, lineHeight: 1.66, color: "rgba(255,255,255,0.72)", margin: "0 0 32px", maxWidth: 420 }}>
              A Fort Worth print design studio creating marketing materials that help businesses get noticed, from brochures and flyers to business cards, signage, and direct mail.
            </p>
            <a className="cta cta-lime" href="#" data-open-contact="1" data-intent="demo" style={{ display: "inline-flex", alignItems: "center", gap: 11, background: "var(--sprint-lime)", color: "#0c1321", textDecoration: "none", fontSize: 15, fontWeight: 600, padding: "13px 22px", borderRadius: 4 }}>
              Book a demo <span style={{ display: "inline-flex", width: 20, height: 20, alignItems: "center", justifyContent: "center", background: "rgba(12,19,33,0.16)", borderRadius: 3 }}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }} aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
            </a>
          </header>
          <div>
            <p style={{ fontSize: 17, lineHeight: 1.66, color: "rgba(255,255,255,0.72)", margin: "0 0 36px" }}>
              Fort Worth is a city built on business, and the companies that stand out present themselves professionally at every touchpoint. Print still plays a vital role in building trust and staying top of mind. We have been building brands and marketing materials since 2011, working as a fast, trusted extension of your team.
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
            Print design, answered<span className="s-dot">.</span>
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
