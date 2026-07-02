import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";
import PricingBlocks from "@/components/PricingBlocks";
import FinalCTA from "@/components/FinalCTA";
import { CLIENT_LOGOS, SHOWREEL_VIDEO } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Video Production in Fort Worth — Sprint",
  description:
    "Animated and live action video, produced without the wait. Sprint is a bolt on video team for brands that need broadcast standard results on a simple monthly retainer. Strategy, scripting, filming, animation, and editing, all handled by one team.",
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
  { value: "7 days", label: "To first storyboard" },
  { value: "4 to 5 wks", label: "Typical delivery" },
  { value: "Unlimited", label: "Revisions per project" },
  { value: "Est. 2011", label: "15+ years experience" },
];

const WORK = [
  { src: "https://player.vimeo.com/video/1010534063?title=0&byline=0&portrait=0&dnt=1", title: "NBCUniversal" },
  { src: "https://player.vimeo.com/video/1182554200?title=0&byline=0&portrait=0&dnt=1", title: "Miller" },
  { src: "https://player.vimeo.com/video/1188039890?title=0&byline=0&portrait=0&dnt=1", title: "Frontrunner Fieldhouse" },
  { src: "https://player.vimeo.com/video/1184339325?title=0&byline=0&portrait=0&dnt=1", title: "EasyKnock" },
  { src: "https://player.vimeo.com/video/1182674444?title=0&byline=0&portrait=0&dnt=1", title: "Vyaire" },
  { src: "https://player.vimeo.com/video/1010526020?title=0&byline=0&portrait=0&dnt=1", title: "Tetra Pak" },
];

const PORTAL_FEATS = [
  { icon: "clapperboard.svg", title: "Request in seconds", body: "Kick off a new video, edit, or cutdown in a couple of clicks. Your queue is always visible and always moving." },
  { icon: "pause.svg", title: "Review with timestamped notes", body: "Click any moment in a cut and leave a note pinned to the exact frame. No more vague feedback or long email chains." },
  { icon: "check-bold.svg", title: "Approve and download anywhere", body: "Sign off in one tap and grab platform ready exports for web, social, and broadcast, plus every source file you own." },
];

const WHY_COLS = [
  { eyebrow: "[ FORMATS ]", title: "Every kind of video", body: "Explainers, product films, brand stories, commercials, testimonials, and social edits, in both live action and animation." },
  { eyebrow: "[ CLARITY ]", title: "Complex made clear", body: "We turn technical software and services into clear, engaging video that helps audiences quickly grasp the value." },
  { eyebrow: "[ REACH ]", title: "Built for every channel", body: "Optimized for websites, paid ads, presentations, events, and every social platform and device." },
  { eyebrow: "[ PRODUCTION ]", title: "End to end production", body: "From concept to final delivery we manage scripting, filming, animation, editing, and sound, with clear communication throughout." },
];

const FAQS = [
  { q: "How long does a video take to produce?", a: "You will see a first storyboard within 7 days. Most videos are finished in 4 to 5 weeks, with larger commercial shoots taking longer depending on scope." },
  { q: "Do you offer both live action and animation?", a: "Yes. Sprint produces cinematic live action, 2D and motion graphics animation, and hybrid pieces that combine both, all in house from our Fort Worth studio." },
  { q: "Do you work with brands outside Fort Worth?", a: "Absolutely. We are based in Fort Worth, Texas, and produce video for clients nationwide, managing the full process remotely through the Sprint Client Portal." },
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

export default function VideoProductionFortWorthPage() {
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
            <div className="s-eyebrow" style={{ color: "var(--sprint-lime)", marginBottom: 24 }}>[ SERVICE · VIDEO PRODUCTION ]</div>
            <h1 className="svc-hero-h1" style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "clamp(44px,5.2vw,68px)", lineHeight: 0.98, letterSpacing: "-0.035em", margin: "0 0 24px" }}>
              Video production in Fort Worth<span className="s-dot">.</span>
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.62, color: "rgba(255,255,255,0.66)", margin: "0 0 30px", maxWidth: 500 }}>
              Animated and live action video, produced without the wait. Sprint is a bolt on video team for brands that need broadcast standard results on a simple monthly retainer. Strategy, scripting, filming, animation, and editing, all handled by one team.
            </p>
            <div className="svc-hero-chips" style={{ display: "flex", alignItems: "center", gap: 10, margin: "0 0 34px" }}>
              <span style={chipStyle}><span style={dot} />Fully custom</span>
              <span style={chipStyle}><span style={dot} />Premium animation</span>
              <span style={chipStyle}><span style={dot} />Quick turnaround</span>
            </div>
            <div className="svc-hero-ctas" style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <a className="cta cta-lime" href="#" data-open-contact="1" data-intent="demo" style={{ display: "inline-flex", alignItems: "center", gap: 12, background: "var(--sprint-lime)", color: "#0c1321", textDecoration: "none", fontSize: 16, fontWeight: 600, padding: "15px 24px", borderRadius: 4 }}>
                Start a project
                <span style={{ display: "inline-flex", width: 22, height: 22, alignItems: "center", justifyContent: "center", background: "rgba(12,19,33,0.16)", borderRadius: 3 }}>→</span>
              </a>
              <a className="cta cta-ghost" href="#pricing" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.14)", color: "#fff", textDecoration: "none", fontSize: 16, fontWeight: 600, padding: "15px 24px", borderRadius: 4 }}>See pricing</a>
            </div>
          </div>

          {/* glass showreel media (placeholder tile) */}
          <div className="svc-hero-media" style={{ position: "relative", minWidth: 0 }}>
            <div style={{ position: "absolute", inset: "-9% -7%", borderRadius: 20, background: "radial-gradient(ellipse at 50% 46%,rgba(93,107,255,0.34),rgba(138,92,255,0.14) 40%,rgba(0,200,255,0.12) 62%,transparent 78%)", filter: "blur(46px)", zIndex: 0, pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1, borderRadius: 10, padding: 10, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", boxShadow: "0 40px 90px -34px rgba(0,0,0,0.75)" }}>
              <div style={{ position: "relative", borderRadius: 6, overflow: "hidden", background: "#0c1321", aspectRatio: "16 / 9" }}>
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                >
                  <source src={SHOWREEL_VIDEO} type="video/mp4" />
                </video>
                <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: 18, background: "linear-gradient(to top,rgba(12,19,33,0.78),rgba(12,19,33,0) 100%)", display: "flex", alignItems: "center", gap: 11, pointerEvents: "none" }}>
                  <span style={{ color: "#fff", fontSize: 13, lineHeight: 1 }}>▶</span>
                  <span className="s-mono" style={{ fontSize: 12, color: "rgba(255,255,255,0.85)" }}>SHOWREEL 2026</span>
                </div>
              </div>
            </div>
            {/* floating badge */}
            <div style={{ position: "absolute", top: -20, right: -18, zIndex: 3, display: "flex", alignItems: "center", gap: 11, padding: "13px 16px", borderRadius: 9, background: "rgba(12,19,33,0.82)", border: "1px solid rgba(181,230,2,0.32)", boxShadow: "0 20px 44px -22px rgba(0,0,0,0.85)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", animation: "vpFloat 6.5s ease-in-out infinite" }}>
              <span style={{ width: 32, height: 32, flex: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: 7, background: "rgba(181,230,2,0.14)", border: "1px solid rgba(181,230,2,0.3)" }}>
                <span style={{ width: 16, height: 16, background: "var(--sprint-lime)", WebkitMask: "url(/assets/icons/clapperboard.svg) center/contain no-repeat", mask: "url(/assets/icons/clapperboard.svg) center/contain no-repeat" }} />
              </span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.2 }}>Live action + animation</div>
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

      {/* WORK GALLERY */}
      <section className="px" style={{ position: "relative", zIndex: 10, maxWidth: 1360, margin: "0 auto", padding: "96px 48px 40px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, marginBottom: 36, flexWrap: "wrap" }}>
          <div>
            <div className="s-eyebrow" style={eyebrow}>[ SELECTED WORK ]</div>
            <h2 style={sectionH2}>In motion<span className="s-dot">.</span></h2>
          </div>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: "rgba(255,255,255,0.6)", margin: 0, maxWidth: 400 }}>
            Commercials, explainers, brand films, and social edits, produced for teams across the country from our Fort Worth studio.
          </p>
        </div>
        <div className="work-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {WORK.map((w) => (
            <div key={w.title} className="work-slot" style={{ borderRadius: 10, overflow: "hidden", border: "1px solid rgba(255,255,255,0.12)", position: "relative", aspectRatio: "16 / 9", background: "#0c1321" }}>
              <iframe
                src={w.src}
                title={w.title}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="px" style={{ position: "relative", zIndex: 10, maxWidth: 1360, margin: "0 auto", padding: "80px 48px 40px" }}>
        <div style={{ maxWidth: 700, margin: "0 0 44px" }}>
          <div className="s-eyebrow" style={eyebrow}>[ PLANS &amp; PRICING ]</div>
          <h2 style={sectionH2}>Video, without the agency overhead<span className="s-dot">.</span></h2>
        </div>
        <PricingBlocks />
      </section>

      {/* PORTAL */}
      <section id="portal" className="px" style={{ position: "relative", zIndex: 10, maxWidth: 1360, margin: "0 auto", padding: "96px 48px 40px", overflow: "visible" }}>
        <div style={{ position: "absolute", top: -40, bottom: -40, left: "50%", transform: "translateX(-50%)", width: "100vw", pointerEvents: "none", background: "radial-gradient(ellipse 44% 62% at 68% 34%,rgba(93,107,255,0.16),rgba(138,92,255,0.06) 46%,transparent 68%)" }} />
        <div className="portal-grid" style={{ position: "relative", display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.12fr)", gap: 64, alignItems: "center" }}>
          <div>
            <div className="s-eyebrow" style={{ color: "var(--sprint-lime)", marginBottom: 18 }}>[ THE PORTAL ]</div>
            <h2 style={{ ...sectionH2, margin: "0 0 20px" }}>Your whole video pipeline in one portal<span className="s-dot">.</span></h2>
            <p style={{ fontSize: 17, lineHeight: 1.62, color: "rgba(255,255,255,0.66)", margin: "0 0 34px", maxWidth: 520 }}>
              No more scattered email threads and lost feedback. Submit requests, watch every cut, leave frame accurate notes, and download final files, all in one workspace built for moving fast.
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
                <img src="/assets/hero-dashboard-v01.webp" alt="Sprint client portal dashboard for video production" style={{ display: "block", width: "100%", height: "auto" }} />
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
            <h2 style={{ ...sectionH2, margin: "0 0 22px" }}>Fort Worth video production experts<span className="s-dot">.</span></h2>
            <p style={{ fontSize: 16.5, lineHeight: 1.66, color: "rgba(255,255,255,0.72)", margin: "0 0 32px", maxWidth: 420 }}>
              A video production company in Fort Worth, Texas, creating cinematic live action campaigns and bold 2D animation that help brands explain their product and convert their audience.
            </p>
            <a className="cta cta-lime" href="#" data-open-contact="1" data-intent="demo" style={{ display: "inline-flex", alignItems: "center", gap: 11, background: "var(--sprint-lime)", color: "#0c1321", textDecoration: "none", fontSize: 15, fontWeight: 600, padding: "13px 22px", borderRadius: 4 }}>
              Book a demo <span style={{ display: "inline-flex", width: 20, height: 20, alignItems: "center", justifyContent: "center", background: "rgba(12,19,33,0.16)", borderRadius: 3 }}>→</span>
            </a>
          </header>
          <div>
            <p style={{ fontSize: 17, lineHeight: 1.66, color: "rgba(255,255,255,0.72)", margin: "0 0 36px" }}>
              Great stories deserve exceptional execution. We combine creative direction, motion design, and production expertise to deliver polished video for websites, social campaigns, events, and paid advertising, adapting to every brief while keeping communication clear and timelines reliable.
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
            Video production, answered<span className="s-dot">.</span>
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
