/* @ds-bundle: {"format":3,"namespace":"SprintDesignSystem_019e22","components":[{"name":"CaseStudies","sourcePath":"ui_kits/website/CaseStudies.jsx"},{"name":"Footer","sourcePath":"ui_kits/website/Footer.jsx"},{"name":"Header","sourcePath":"ui_kits/website/Header.jsx"},{"name":"Hero","sourcePath":"ui_kits/website/Hero.jsx"},{"name":"Logos","sourcePath":"ui_kits/website/Logos.jsx"},{"name":"Pricing","sourcePath":"ui_kits/website/Pricing.jsx"},{"name":"ArrowIcon","sourcePath":"ui_kits/website/Primitives.jsx"},{"name":"Button","sourcePath":"ui_kits/website/Primitives.jsx"},{"name":"EyebrowSwatch","sourcePath":"ui_kits/website/Primitives.jsx"},{"name":"EyebrowBracket","sourcePath":"ui_kits/website/Primitives.jsx"},{"name":"SectionHeader","sourcePath":"ui_kits/website/Primitives.jsx"},{"name":"Primitives","sourcePath":"ui_kits/website/Primitives.jsx"},{"name":"Services","sourcePath":"ui_kits/website/Services.jsx"},{"name":"WhoWeAre","sourcePath":"ui_kits/website/WhoWeAre.jsx"}],"sourceHashes":{"ui_kits/website/CaseStudies.jsx":"03faf877b367","ui_kits/website/Footer.jsx":"94125ef38818","ui_kits/website/Header.jsx":"57966cd1c327","ui_kits/website/Hero.jsx":"c057faf97e79","ui_kits/website/Logos.jsx":"d370610fc5d9","ui_kits/website/Pricing.jsx":"d3393bffcec0","ui_kits/website/Primitives.jsx":"f2fb2a852196","ui_kits/website/Services.jsx":"ea146b343cc6","ui_kits/website/WhoWeAre.jsx":"7a4c9ff95f7e"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.SprintDesignSystem_019e22 = window.SprintDesignSystem_019e22 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// ui_kits/website/CaseStudies.jsx
try { (() => {
/* global React */

function CaseStudies() {
  const csStyles = {
    section: {
      background: "#0c1321",
      color: "#fff",
      padding: "140px 0 140px"
    },
    inner: {
      maxWidth: 1280,
      margin: "0 auto",
      padding: "0 48px"
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 16,
      marginTop: 56
    },
    card: {
      position: "relative",
      aspectRatio: "0.78 / 1",
      borderRadius: 8,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: 28,
      color: "#fff"
    },
    overlay: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(180deg, rgba(0,0,0,.45) 0%, rgba(0,0,0,.78) 100%)",
      pointerEvents: "none"
    },
    copy: {
      position: "relative",
      zIndex: 1,
      fontFamily: "var(--font-sans)",
      fontWeight: 500,
      fontSize: 22,
      lineHeight: 1.3,
      letterSpacing: "-0.03rem",
      maxWidth: 320
    },
    eyebrow: {
      position: "relative",
      zIndex: 1,
      marginTop: 24
    },
    footer: {
      position: "relative",
      zIndex: 1
    }
  };

  // Mock photo backgrounds — warm wood / cool indigo / orange
  const cards = [{
    bg: "linear-gradient(135deg, #8b6a4d 0%, #4a3522 100%)",
    text: "How Sprint partnered with Frontrunner Fieldhouse to transform a founder's vision into a premium sports facility brand, from zero digital presence to full-scale launch in under six months.",
    tag: "BRAND IDENTITY"
  }, {
    bg: "linear-gradient(135deg, #3e3a52 0%, #1c1b27 100%)",
    text: "As an established hospitality brand, Taco Heads partnered with Sprint to refresh and align its brand across restaurant, food truck, and digital channels.",
    tag: "BRAND IDENTITY"
  }, {
    bg: "linear-gradient(135deg, #b35a1e 0%, #5a2a09 100%)",
    text: "With only a vision and a commitment to local impact, Aledo Soccer Club partnered with Sprint to build a recognizable, trusted, and community-first brand.",
    tag: "BRAND IDENTITY"
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: csStyles.section
  }, /*#__PURE__*/React.createElement("div", {
    style: csStyles.inner
  }, /*#__PURE__*/React.createElement(window.SectionHeader, {
    eyebrow: "PROJECTS",
    title: "Case Studies",
    subEyebrow: "CREATIVE WITH RESULTS",
    onDark: true
  }), /*#__PURE__*/React.createElement("div", {
    style: csStyles.grid
  }, cards.map((c, i) => /*#__PURE__*/React.createElement("article", {
    key: i,
    style: {
      ...csStyles.card,
      background: c.bg
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: csStyles.overlay
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: csStyles.copy
  }, c.text), /*#__PURE__*/React.createElement("div", {
    style: csStyles.eyebrow
  }, /*#__PURE__*/React.createElement(window.EyebrowBracket, {
    color: "#fff"
  }, c.tag))), /*#__PURE__*/React.createElement("div", {
    style: csStyles.footer
  }, /*#__PURE__*/React.createElement(window.Button, {
    variant: "light"
  }, "View Case Study")))))));
}
window.CaseStudies = CaseStudies;
Object.assign(__ds_scope, { CaseStudies });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/CaseStudies.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Footer.jsx
try { (() => {
/* global React */

function Footer() {
  const footerStyles = {
    section: {
      background: "#0c1321",
      color: "#fff",
      padding: "96px 0 32px"
    },
    inner: {
      maxWidth: 1280,
      margin: "0 auto",
      padding: "0 48px"
    },
    cta: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 28,
      paddingBottom: 80,
      borderBottom: "1px solid rgba(255,255,255,0.16)"
    },
    eyebrow: {
      fontFamily: "var(--font-mono)",
      fontWeight: 500,
      fontSize: 13,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: "#fff"
    },
    big: {
      fontFamily: "var(--font-hero)",
      fontWeight: 900,
      fontStyle: "normal",
      textTransform: "uppercase",
      fontSize: "clamp(56px, 10vw, 160px)",
      letterSpacing: "-0.03rem",
      lineHeight: 0.95,
      margin: 0
    },
    hl: {
      background: "#b5e602",
      color: "#0c1321",
      padding: "0.02em 0.18em",
      boxDecorationBreak: "clone",
      WebkitBoxDecorationBreak: "clone"
    },
    cols: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr 1fr 1fr",
      gap: 48,
      marginTop: 64
    },
    colHead: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: "#8a8a8a",
      marginBottom: 18
    },
    link: {
      display: "block",
      padding: "4px 0",
      fontFamily: "var(--font-sans)",
      fontSize: 16,
      color: "#fff",
      textDecoration: "none"
    },
    brand: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    },
    logoMark: {
      height: 36
    },
    blurb: {
      fontSize: 14,
      color: "#8a8a8a",
      lineHeight: 1.55,
      maxWidth: 360
    },
    btm: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: 36,
      marginTop: 64,
      borderTop: "1px solid rgba(255,255,255,0.10)",
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      color: "#8a8a8a"
    }
  };
  return /*#__PURE__*/React.createElement("footer", {
    style: footerStyles.section
  }, /*#__PURE__*/React.createElement("div", {
    style: footerStyles.inner
  }, /*#__PURE__*/React.createElement("div", {
    style: footerStyles.cta
  }, /*#__PURE__*/React.createElement("div", {
    style: footerStyles.eyebrow
  }, "[ READY WHEN YOU ARE ]"), /*#__PURE__*/React.createElement("h2", {
    style: footerStyles.big
  }, "Let's ", /*#__PURE__*/React.createElement("span", {
    style: footerStyles.hl
  }, "sprint.")), /*#__PURE__*/React.createElement(window.Button, {
    variant: "lime"
  }, "Start a project")), /*#__PURE__*/React.createElement("div", {
    style: footerStyles.cols
  }, /*#__PURE__*/React.createElement("div", {
    style: footerStyles.brand
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/sprint-logo-white.svg",
    alt: "Sprint",
    style: footerStyles.logoMark
  }), /*#__PURE__*/React.createElement("p", {
    style: footerStyles.blurb
  }, "Unlimited branding and design support for Fort Worth businesses. Fast, consistent creative work without the in-house overhead.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: footerStyles.colHead
  }, "[ STUDIO ]"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: footerStyles.link
  }, "About"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: footerStyles.link
  }, "Process"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: footerStyles.link
  }, "Careers"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: footerStyles.link
  }, "Press")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: footerStyles.colHead
  }, "[ WORK ]"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: footerStyles.link
  }, "Brand Identity"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: footerStyles.link
  }, "Digital"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: footerStyles.link
  }, "Print"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: footerStyles.link
  }, "Video")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: footerStyles.colHead
  }, "[ CONTACT ]"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: footerStyles.link
  }, "hello@sprint.studio"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: footerStyles.link
  }, "Fort Worth, TX"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: footerStyles.link
  }, "Instagram"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: footerStyles.link
  }, "LinkedIn"))), /*#__PURE__*/React.createElement("div", {
    style: footerStyles.btm
  }, /*#__PURE__*/React.createElement("div", null, "[ \xA9 2026 SPRINT CREATIVE \xB7 ALL RIGHTS RESERVED ]"), /*#__PURE__*/React.createElement("div", null, "[ EST 2011 \xB7 FORT WORTH ]"))));
}
window.Footer = Footer;
Object.assign(__ds_scope, { Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Header.jsx
try { (() => {
/* global React */
const {
  useState: useHeaderState
} = React;
function Header() {
  const [open, setOpen] = useHeaderState(false);
  const headerStyles = {
    wrap: {
      position: "sticky",
      top: 16,
      zIndex: 50,
      display: "flex",
      justifyContent: "center",
      padding: "0 24px",
      pointerEvents: "none"
    },
    bar: {
      pointerEvents: "auto",
      width: "min(1280px, 100%)",
      background: "#0c1321",
      color: "#fff",
      borderRadius: 8,
      padding: "14px 22px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    },
    logo: {
      height: 28,
      display: "block"
    },
    burger: {
      width: 44,
      height: 28,
      background: "transparent",
      border: "none",
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      justifyContent: "center",
      gap: 6,
      padding: 0
    },
    bar1: {
      width: 22,
      height: 2,
      background: "#fff"
    },
    bar2: {
      width: 22,
      height: 2,
      background: "#fff"
    },
    panel: {
      pointerEvents: "auto",
      position: "fixed",
      top: 76,
      right: 24,
      width: 320,
      background: "#0c1321",
      color: "#fff",
      borderRadius: 12,
      padding: 24,
      display: open ? "flex" : "none",
      flexDirection: "column",
      gap: 14,
      border: "1px solid rgba(255,255,255,0.10)"
    },
    link: {
      fontFamily: "var(--font-sans)",
      fontWeight: 600,
      fontSize: 28,
      color: "#fff",
      textDecoration: "none",
      letterSpacing: "-0.03rem",
      padding: "6px 0"
    },
    sub: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      color: "#8a8a8a",
      marginTop: 10
    }
  };
  const links = ["Studio", "Services", "Projects", "Pricing", "Contact"];
  return /*#__PURE__*/React.createElement("div", {
    style: headerStyles.wrap
  }, /*#__PURE__*/React.createElement("div", {
    style: headerStyles.bar
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/sprint-logo-white.svg",
    alt: "Sprint",
    style: headerStyles.logo
  }), /*#__PURE__*/React.createElement("button", {
    style: headerStyles.burger,
    "aria-label": "Menu",
    onClick: () => setOpen(o => !o)
  }, /*#__PURE__*/React.createElement("span", {
    style: headerStyles.bar1
  }), /*#__PURE__*/React.createElement("span", {
    style: headerStyles.bar2
  }))), /*#__PURE__*/React.createElement("nav", {
    style: headerStyles.panel,
    "aria-label": "Primary"
  }, links.map((l, i) => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    style: headerStyles.link,
    onClick: e => {
      e.preventDefault();
      setOpen(false);
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#b5e602",
      fontFamily: "var(--font-mono)",
      fontSize: 14,
      marginRight: 12
    }
  }, "[0", i + 1, "]"), l)), /*#__PURE__*/React.createElement("div", {
    style: headerStyles.sub
  }, "[ FORT WORTH \xB7 EST 2011 ]")));
}
window.Header = Header;
Object.assign(__ds_scope, { Header });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Hero.jsx
try { (() => {
/* global React */

function Hero() {
  const heroStyles = {
    section: {
      position: "relative",
      background: "#0c1321",
      color: "#fff",
      minHeight: "min(880px, 92vh)",
      padding: "180px 0 120px",
      overflow: "hidden"
    },
    bg: {
      position: "absolute",
      inset: 0,
      backgroundImage: "linear-gradient(115deg, rgba(0,0,0,.7) 0%, rgba(0,0,0,.92) 60%), radial-gradient(800px 600px at 70% 40%, rgba(60,60,60,.7), rgba(0,0,0,1) 70%)",
      pointerEvents: "none"
    },
    grain: {
      position: "absolute",
      inset: 0,
      opacity: 0.06,
      backgroundImage: "radial-gradient(circle at 50% 50%, transparent 0, transparent 1px, rgba(255,255,255,0.5) 1px, transparent 1.5px)",
      backgroundSize: "3px 3px",
      pointerEvents: "none"
    },
    inner: {
      position: "relative",
      zIndex: 1,
      maxWidth: 1280,
      margin: "0 auto",
      padding: "0 48px"
    },
    eyebrow: {
      fontFamily: "var(--font-mono)",
      fontWeight: 500,
      fontSize: 13,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: "#fff",
      marginBottom: 28
    },
    headline: {
      // Display / hero — Montserrat Black, upright (not italic).
      fontFamily: 'var(--font-hero)',
      fontWeight: 900,
      fontStyle: "normal",
      textTransform: "uppercase",
      fontSize: "clamp(56px, 10vw, 160px)",
      letterSpacing: "-0.03rem",
      lineHeight: 0.95,
      margin: 0,
      color: "#fff",
      maxWidth: "min(1200px, 100%)"
    },
    hl: {
      background: "#b5e602",
      color: "#0c1321",
      padding: "0.02em 0.18em",
      boxDecorationBreak: "clone",
      WebkitBoxDecorationBreak: "clone"
    },
    sub: {
      marginTop: 36,
      fontFamily: "var(--font-sans)",
      fontWeight: 400,
      fontSize: 18,
      lineHeight: 1.55,
      color: "#fff",
      maxWidth: 540
    },
    subAccent: {
      color: "#b5e602",
      fontWeight: 600
    },
    ctaRow: {
      display: "flex",
      gap: 14,
      marginTop: 36,
      flexWrap: "wrap"
    }
  };
  return /*#__PURE__*/React.createElement("section", {
    style: heroStyles.section
  }, /*#__PURE__*/React.createElement("div", {
    style: heroStyles.bg
  }), /*#__PURE__*/React.createElement("div", {
    style: heroStyles.grain
  }), /*#__PURE__*/React.createElement("div", {
    style: heroStyles.inner
  }, /*#__PURE__*/React.createElement("div", {
    style: heroStyles.eyebrow
  }, "[ EST 2011 ]"), /*#__PURE__*/React.createElement("h1", {
    style: heroStyles.headline
  }, "Make your ", /*#__PURE__*/React.createElement("span", {
    style: heroStyles.hl
  }, "brand"), /*#__PURE__*/React.createElement("br", null), "as strong as your ", /*#__PURE__*/React.createElement("span", {
    style: heroStyles.hl
  }, "reputation.")), /*#__PURE__*/React.createElement("p", {
    style: heroStyles.sub
  }, /*#__PURE__*/React.createElement("span", {
    style: heroStyles.subAccent
  }, "Unlimited"), " branding and design support for Fort Worth businesses that need fast, consistent creative work without hiring an in-house design team."), /*#__PURE__*/React.createElement("div", {
    style: heroStyles.ctaRow
  }, /*#__PURE__*/React.createElement(window.Button, {
    variant: "lime"
  }, "Start Sprint"), /*#__PURE__*/React.createElement(window.Button, {
    variant: "light"
  }, "Watch the video"))));
}
window.Hero = Hero;
Object.assign(__ds_scope, { Hero });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Logos.jsx
try { (() => {
/* global React */

function Logos() {
  const logosStyles = {
    section: {
      background: "#f4f4f4",
      padding: "48px 0"
    },
    inner: {
      maxWidth: 1280,
      margin: "0 auto",
      padding: "0 48px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 40,
      flexWrap: "wrap"
    },
    logo: {
      fontFamily: "var(--font-sans)",
      fontWeight: 700,
      fontSize: 22,
      color: "#0c1321",
      letterSpacing: "-0.02em",
      opacity: 0.85
    },
    logoMuted: {
      opacity: 0.35
    },
    logoBox: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "4px 10px",
      background: "#0c1321",
      color: "#fff",
      fontFamily: "var(--font-sans)",
      fontWeight: 700,
      fontSize: 14,
      letterSpacing: "0.05em"
    }
  };
  return /*#__PURE__*/React.createElement("section", {
    style: logosStyles.section,
    "aria-label": "Trusted by"
  }, /*#__PURE__*/React.createElement("div", {
    style: logosStyles.inner
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...logosStyles.logo,
      fontStyle: "italic",
      ...logosStyles.logoMuted
    }
  }, "NBCUniversal"), /*#__PURE__*/React.createElement("span", {
    style: {
      ...logosStyles.logo,
      fontFamily: "Georgia, serif",
      letterSpacing: "0.2em"
    }
  }, "HONDA"), /*#__PURE__*/React.createElement("span", {
    style: logosStyles.logoBox
  }, "NHS"), /*#__PURE__*/React.createElement("span", {
    style: {
      ...logosStyles.logo,
      letterSpacing: "0.05em"
    }
  }, "SIEMENS"), /*#__PURE__*/React.createElement("span", {
    style: {
      ...logosStyles.logo,
      fontFamily: "Georgia, serif"
    }
  }, "Gartner", /*#__PURE__*/React.createElement("sup", {
    style: {
      fontSize: 10
    }
  }, "\xAE")), /*#__PURE__*/React.createElement("span", {
    style: {
      ...logosStyles.logo,
      ...logosStyles.logoMuted
    }
  }, "Smith+Nephew")));
}
window.Logos = Logos;
Object.assign(__ds_scope, { Logos });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Logos.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Pricing.jsx
try { (() => {
/* global React */

function Pricing() {
  const priceStyles = {
    section: {
      background: "#f4f4f4",
      padding: "120px 0 160px",
      color: "#0c1321"
    },
    inner: {
      maxWidth: 1280,
      margin: "0 auto",
      padding: "0 48px"
    },
    headWrap: {
      textAlign: "center",
      maxWidth: 980,
      margin: "0 auto"
    },
    head: {
      fontFamily: "var(--font-sans)",
      fontWeight: 600,
      fontSize: "clamp(40px, 5vw, 80px)",
      lineHeight: 1.0,
      letterSpacing: "-0.03rem",
      margin: 0
    },
    headLine: {
      display: "block"
    },
    dot: {
      color: "#b5e602"
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 18,
      marginTop: 80
    },
    card: {
      borderRadius: 12,
      padding: 36,
      display: "flex",
      flexDirection: "column",
      gap: 18,
      fontFamily: "var(--font-sans)",
      minHeight: 560
    },
    cardWhite: {
      background: "#fff",
      color: "#0c1321",
      border: "1px solid rgba(0,0,0,0.06)"
    },
    cardLime: {
      background: "#b5e602",
      color: "#0c1321"
    },
    cardDark: {
      background: "#0c1321",
      color: "#fff",
      minHeight: 280,
      alignSelf: "flex-start"
    },
    eyebrowDark: {
      fontFamily: "var(--font-mono)",
      fontWeight: 500,
      fontSize: 14,
      letterSpacing: "0.06em",
      textTransform: "uppercase"
    },
    name: {
      fontSize: 36,
      fontWeight: 600,
      letterSpacing: "-0.03rem"
    },
    desc: {
      fontSize: 15,
      lineHeight: 1.55,
      opacity: 0.85
    },
    divider: {
      borderTop: "1px solid currentColor",
      opacity: 0.18,
      margin: "8px 0"
    },
    list: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      display: "flex",
      flexDirection: "column",
      gap: 10
    },
    li: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontSize: 15
    },
    sparkle: {
      color: "#0c1321"
    },
    sparkleDark: {
      color: "#b5e602"
    },
    footer: {
      marginTop: "auto"
    },
    rightCol: {
      display: "flex",
      flexDirection: "column",
      gap: 18
    },
    testimonial: {
      background: "#fff",
      borderRadius: 12,
      padding: 24,
      fontFamily: "var(--font-mono)",
      fontSize: 14,
      lineHeight: 1.55,
      color: "#0c1321",
      letterSpacing: "0.02em",
      border: "1px solid rgba(0,0,0,0.06)"
    },
    stars: {
      color: "#b5e602",
      fontSize: 22,
      letterSpacing: 4,
      marginBottom: 12
    },
    quote: {},
    author: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginTop: 18
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: "50%",
      background: "linear-gradient(135deg,#a8a8a8,#525252)",
      flex: "0 0 auto"
    },
    name2: {
      fontFamily: "var(--font-sans)",
      fontWeight: 600,
      fontSize: 15
    },
    role: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      color: "#737373"
    }
  };
  const Sparkle = ({
    color = "#0c1321"
  }) => /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: color
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 2 L13.7 10.3 L22 12 L13.7 13.7 L12 22 L10.3 13.7 L2 12 L10.3 10.3 Z"
  }));
  const startupBullets = ["24 hour response time", "Unlimited requests", "Monthly strategy call", "Brand identity, web design and print", "Social media management", "Marketing strategy support", "1 active task at any time", "Minimum 6 month engagement"];
  const businessBullets = ["24 hour response time", "Unlimited requests", "Monthly strategy call", "Brand identity, web design and print", "Social media management", "Marketing strategy support", "2 active tasks at any time", "Minimum 6 month engagement", "Animated video productions included"];
  return /*#__PURE__*/React.createElement("section", {
    style: priceStyles.section
  }, /*#__PURE__*/React.createElement("div", {
    style: priceStyles.inner
  }, /*#__PURE__*/React.createElement("div", {
    style: priceStyles.headWrap
  }, /*#__PURE__*/React.createElement("h2", {
    style: priceStyles.head
  }, /*#__PURE__*/React.createElement("span", {
    style: priceStyles.headLine
  }, "Set monthly pricing", /*#__PURE__*/React.createElement("span", {
    style: priceStyles.dot
  }, ".")), /*#__PURE__*/React.createElement("span", {
    style: priceStyles.headLine
  }, "Custom to your needs", /*#__PURE__*/React.createElement("span", {
    style: priceStyles.dot
  }, ".")))), /*#__PURE__*/React.createElement("div", {
    style: priceStyles.grid
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...priceStyles.card,
      ...priceStyles.cardWhite
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: priceStyles.eyebrowDark
  }, "[ $2,500/m ]"), /*#__PURE__*/React.createElement("div", {
    style: priceStyles.name
  }, "Start-Up Plan"), /*#__PURE__*/React.createElement("div", {
    style: priceStyles.desc
  }, "For start-ups looking to bring their business to market as quickly as possible."), /*#__PURE__*/React.createElement("div", {
    style: priceStyles.divider
  }), /*#__PURE__*/React.createElement("ul", {
    style: priceStyles.list
  }, startupBullets.map(b => /*#__PURE__*/React.createElement("li", {
    key: b,
    style: priceStyles.li
  }, /*#__PURE__*/React.createElement(Sparkle, {
    color: "#b5e602"
  }), b))), /*#__PURE__*/React.createElement("div", {
    style: priceStyles.footer
  }, /*#__PURE__*/React.createElement(window.Button, {
    variant: "dark"
  }, "Get in touch"))), /*#__PURE__*/React.createElement("div", {
    style: {
      ...priceStyles.card,
      ...priceStyles.cardLime
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: priceStyles.eyebrowDark
  }, "[ $5,000/m ]"), /*#__PURE__*/React.createElement("div", {
    style: priceStyles.name
  }, "Business Plan"), /*#__PURE__*/React.createElement("div", {
    style: priceStyles.desc
  }, "For organizations that need on-going support long term to cover everything from pitch decks to video production. Everything covered. All in one package."), /*#__PURE__*/React.createElement("div", {
    style: priceStyles.divider
  }), /*#__PURE__*/React.createElement("ul", {
    style: priceStyles.list
  }, businessBullets.map(b => /*#__PURE__*/React.createElement("li", {
    key: b,
    style: priceStyles.li
  }, /*#__PURE__*/React.createElement(Sparkle, {
    color: "#0c1321"
  }), b))), /*#__PURE__*/React.createElement("div", {
    style: priceStyles.footer
  }, /*#__PURE__*/React.createElement(window.Button, {
    variant: "dark"
  }, "Get in touch"))), /*#__PURE__*/React.createElement("div", {
    style: priceStyles.rightCol
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...priceStyles.card,
      ...priceStyles.cardDark
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: priceStyles.eyebrowDark
  }, "[ Custom Pricing ]"), /*#__PURE__*/React.createElement("div", {
    style: priceStyles.name
  }, "Enterprise Plan"), /*#__PURE__*/React.createElement("div", {
    style: priceStyles.desc
  }, "Need more? Contact our team today to create a bespoke solution for your brand's needs."), /*#__PURE__*/React.createElement("div", {
    style: priceStyles.footer
  }, /*#__PURE__*/React.createElement(window.Button, {
    variant: "light"
  }, "Get in touch"))), /*#__PURE__*/React.createElement("div", {
    style: priceStyles.testimonial
  }, /*#__PURE__*/React.createElement("div", {
    style: priceStyles.stars
  }, "\u2605 \u2605 \u2605 \u2605 \u2605"), /*#__PURE__*/React.createElement("div", {
    style: priceStyles.quote
  }, "Sprint are highly professional and quick to respond to our rapidly changing demands, with useful, value-adding suggestions and editing."), /*#__PURE__*/React.createElement("div", {
    style: priceStyles.author
  }, /*#__PURE__*/React.createElement("div", {
    style: priceStyles.avatar
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: priceStyles.name2
  }, "Matt Richardson"), /*#__PURE__*/React.createElement("div", {
    style: priceStyles.role
  }, "[ DALKIA | EDF ENERGY ]"))))))));
}
window.Pricing = Pricing;
Object.assign(__ds_scope, { Pricing });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Pricing.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Primitives.jsx
try { (() => {
/* global React */
const {
  useState
} = React;

// ─────────────────────────────────────────────────────────────
// ArrowIcon — the universal Sprint forward arrow.
// ─────────────────────────────────────────────────────────────
function ArrowIcon({
  size = 16,
  color = "currentColor"
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "square",
    strokeLinejoin: "miter"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M13 5l7 7-7 7"
  }));
}

// ─────────────────────────────────────────────────────────────
// Button — Sprint's signature arrow-in-square CTA.
// variants: 'light' (white bg, black arrow block) - used on dark surfaces
//           'dark'  (black bg, black arrow block) - used on light surfaces
//           'lime'  (lime bg, black arrow block)  - emphasis
// ─────────────────────────────────────────────────────────────
function Button({
  children,
  variant = "dark",
  onClick
}) {
  const [hover, setHover] = useState(false);
  const palette = {
    dark: {
      bg: "#0c1321",
      fg: "#fff",
      iconBg: "#0c1321",
      iconFg: "#fff",
      hoverBg: "#b5e602",
      hoverFg: "#0c1321"
    },
    light: {
      bg: "#fff",
      fg: "#0c1321",
      iconBg: "#0c1321",
      iconFg: "#fff",
      hoverBg: "#b5e602",
      hoverFg: "#0c1321"
    },
    lime: {
      bg: "#b5e602",
      fg: "#0c1321",
      iconBg: "#0c1321",
      iconFg: "#fff",
      hoverBg: "#0c1321",
      hoverFg: "#fff"
    }
  }[variant];
  const bg = hover ? palette.hoverBg : palette.bg;
  const fg = hover ? palette.hoverFg : palette.fg;
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 12,
      padding: 0,
      paddingRight: 22,
      background: bg,
      color: fg,
      border: "none",
      borderRadius: 6,
      fontFamily: "var(--font-sans)",
      fontWeight: 500,
      fontSize: 16,
      cursor: "pointer",
      overflow: "hidden",
      transition: "background 220ms cubic-bezier(.2,.7,.2,1), color 220ms"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 48,
      height: 48,
      background: palette.iconBg,
      color: palette.iconFg,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(ArrowIcon, {
    size: 18
  })), children);
}

// ─────────────────────────────────────────────────────────────
// EyebrowSwatch — section eyebrow with the lime "marker" before it.
// ─────────────────────────────────────────────────────────────
function EyebrowSwatch({
  children,
  color = "currentColor"
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 12,
      fontFamily: "var(--font-mono)",
      fontWeight: 500,
      fontSize: 13,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-block",
      width: 48,
      height: 6,
      background: "linear-gradient(to right, rgba(181,230,2,0) 0%, #b5e602 100%)",
      borderRadius: "0 999px 999px 0"
    }
  }), /*#__PURE__*/React.createElement("span", null, "[ ", children, " ]"));
}

// EyebrowBracket — plain bracketed mono label (no swatch).
function EyebrowBracket({
  children,
  color = "currentColor"
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontWeight: 500,
      fontSize: 12,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color,
      whiteSpace: "nowrap"
    }
  }, "[ ", children, " ]");
}

// ─────────────────────────────────────────────────────────────
// SectionHeader — eyebrow + big H2 with lime dot + sub-eyebrow on right.
// onDark inverts colors for use over black sections.
// ─────────────────────────────────────────────────────────────
function SectionHeader({
  eyebrow,
  title,
  subEyebrow,
  onDark = false,
  align = "left"
}) {
  const fg = onDark ? "#fff" : "#0c1321";
  const borderColor = onDark ? "rgba(255,255,255,0.16)" : "rgba(0,0,0,0.12)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(EyebrowSwatch, {
    color: fg
  }, eyebrow), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      marginTop: 18,
      paddingBottom: 16,
      borderBottom: `1px solid ${borderColor}`,
      gap: 24,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: "var(--font-sans)",
      fontWeight: 600,
      fontSize: "clamp(40px, 7vw, 88px)",
      letterSpacing: "-0.03rem",
      lineHeight: 1,
      color: fg
    }
  }, title, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#b5e602"
    }
  }, ".")), subEyebrow && /*#__PURE__*/React.createElement(EyebrowBracket, {
    color: fg
  }, subEyebrow)));
}

// ─────────────────────────────────────────────────────────────
// Primitives — showcase of all the atoms in this file. Doubles as
// the design-system component entry for Primitives.jsx.
// ─────────────────────────────────────────────────────────────
function Primitives() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 28,
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    eyebrow: "Primitives",
    title: "Building blocks",
    subEyebrow: "01 / ATOMS"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "dark"
  }, "Default"), /*#__PURE__*/React.createElement(Button, {
    variant: "lime"
  }, "Emphasis"), /*#__PURE__*/React.createElement(Button, {
    variant: "light"
  }, "On dark")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 24,
      alignItems: "center",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(EyebrowSwatch, null, "Eyebrow"), /*#__PURE__*/React.createElement(EyebrowBracket, null, "Bracket label"), /*#__PURE__*/React.createElement(ArrowIcon, {
    size: 20
  })));
}
Object.assign(window, {
  ArrowIcon,
  Button,
  EyebrowSwatch,
  EyebrowBracket,
  SectionHeader,
  Primitives
});
Object.assign(__ds_scope, { ArrowIcon, Button, EyebrowSwatch, EyebrowBracket, SectionHeader, Primitives });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Primitives.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Services.jsx
try { (() => {
/* global React */
const {
  useState: useSvcState
} = React;
function Services() {
  const [openIdx, setOpenIdx] = useSvcState(0);
  const svcStyles = {
    section: {
      background: "#f4f4f4",
      padding: "140px 0",
      color: "#0c1321"
    },
    inner: {
      maxWidth: 1280,
      margin: "0 auto",
      padding: "0 48px"
    },
    list: {
      marginTop: 48
    },
    row: {
      display: "grid",
      gridTemplateColumns: "120px 1fr 40px",
      alignItems: "center",
      gap: 32,
      padding: "32px 0",
      borderTop: "1px solid rgba(0,0,0,0.12)",
      cursor: "pointer",
      fontFamily: "var(--font-sans)",
      transition: "padding 220ms cubic-bezier(.2,.7,.2,1)"
    },
    rowLast: {
      borderBottom: "1px solid rgba(0,0,0,0.12)"
    },
    idx: {
      fontFamily: "var(--font-mono)",
      fontWeight: 500,
      fontSize: 28,
      color: "#0c1321",
      letterSpacing: "0.02em"
    },
    title: {
      fontFamily: "var(--font-sans)",
      fontWeight: 600,
      fontSize: 32,
      letterSpacing: "-0.03rem",
      transition: "transform 220ms cubic-bezier(.2,.7,.2,1)"
    },
    plus: {
      color: "#b5e602",
      fontSize: 36,
      lineHeight: 1,
      fontWeight: 400,
      transition: "transform 220ms cubic-bezier(.2,.7,.2,1)",
      justifySelf: "end"
    },
    body: {
      gridColumn: "2 / span 2",
      maxHeight: 0,
      overflow: "hidden",
      transition: "max-height 320ms cubic-bezier(.2,.7,.2,1), padding 220ms",
      paddingTop: 0,
      fontFamily: "var(--font-sans)",
      fontSize: 17,
      lineHeight: 1.6,
      color: "#525252"
    },
    bodyOpen: {
      maxHeight: 240,
      paddingTop: 18
    }
  };
  const items = [{
    idx: "[01]",
    title: "Brand Identity",
    body: "Logo systems, brand guidelines, naming, and the visual language that makes a company recognizable from a hundred feet away."
  }, {
    idx: "[02]",
    title: "Digital Presence & Strategy",
    body: "Websites, landing pages, paid campaigns, and the day-to-day social work that keeps an audience warm."
  }, {
    idx: "[03]",
    title: "Print",
    body: "Decks, business cards, packaging, signage, and any tangible thing a customer will hold."
  }, {
    idx: "[04]",
    title: "Video Production",
    body: "Broadcast-standard motion, animation, and brand films — fully produced end-to-end."
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: svcStyles.section
  }, /*#__PURE__*/React.createElement("div", {
    style: svcStyles.inner
  }, /*#__PURE__*/React.createElement(window.SectionHeader, {
    eyebrow: "SERVICES",
    title: "What we do",
    subEyebrow: "STUDIO SERVICES"
  }), /*#__PURE__*/React.createElement("div", {
    style: svcStyles.list
  }, items.map((it, i) => {
    const open = openIdx === i;
    const last = i === items.length - 1;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      onClick: () => setOpenIdx(open ? -1 : i),
      style: {
        ...svcStyles.row,
        ...(last ? svcStyles.rowLast : {}),
        paddingBottom: open ? 16 : 32
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: svcStyles.idx
    }, it.idx), /*#__PURE__*/React.createElement("div", {
      style: {
        ...svcStyles.title,
        transform: open ? "translateX(4px)" : "none"
      }
    }, it.title), /*#__PURE__*/React.createElement("div", {
      style: {
        ...svcStyles.plus,
        transform: open ? "rotate(45deg)" : "none"
      }
    }, "+"), /*#__PURE__*/React.createElement("div", {
      style: {
        ...svcStyles.body,
        ...(open ? svcStyles.bodyOpen : {})
      }
    }, it.body));
  }))));
}
window.Services = Services;
Object.assign(__ds_scope, { Services });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Services.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/WhoWeAre.jsx
try { (() => {
/* global React */

function WhoWeAre() {
  const whoStyles = {
    section: {
      background: "#f4f4f4",
      padding: "120px 0 140px",
      color: "#0c1321"
    },
    inner: {
      maxWidth: 1280,
      margin: "0 auto",
      padding: "0 48px"
    },
    big: {
      marginTop: 60,
      fontFamily: "var(--font-sans)",
      fontWeight: 600,
      fontSize: "clamp(36px, 5vw, 72px)",
      letterSpacing: "-0.03rem",
      lineHeight: 1.0,
      color: "#a8a8a8"
    },
    accent: {
      color: "#b5e602"
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "1.5fr 1fr",
      gap: 64,
      marginTop: 80,
      paddingTop: 32,
      borderTop: "1px solid rgba(0,0,0,0.12)"
    },
    body: {
      fontFamily: "var(--font-sans)",
      fontWeight: 400,
      fontSize: 18,
      lineHeight: 1.6,
      color: "#525252"
    },
    bodyStrong: {
      color: "#0c1321",
      fontWeight: 600
    },
    list: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      display: "flex",
      flexDirection: "column",
      gap: 18
    },
    li: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      fontSize: 16,
      fontWeight: 500
    },
    sq: {
      width: 10,
      height: 10,
      background: "#b5e602",
      flex: "0 0 auto"
    }
  };
  return /*#__PURE__*/React.createElement("section", {
    style: whoStyles.section
  }, /*#__PURE__*/React.createElement("div", {
    style: whoStyles.inner
  }, /*#__PURE__*/React.createElement(window.SectionHeader, {
    eyebrow: "STUDIO",
    title: "Who we are",
    subEyebrow: "FORT WORTH \xB7 TX"
  }), /*#__PURE__*/React.createElement("h3", {
    style: whoStyles.big
  }, /*#__PURE__*/React.createElement("span", {
    style: whoStyles.accent
  }, "Everything you need to launch and grow, fast."), " ", "Most requests are delivered in days, not weeks, so your marketing can move quickly."), /*#__PURE__*/React.createElement("div", {
    style: whoStyles.grid
  }, /*#__PURE__*/React.createElement("p", {
    style: whoStyles.body
  }, /*#__PURE__*/React.createElement("span", {
    style: whoStyles.bodyStrong
  }, "Branding, websites, and content"), " ", "delivered quickly and handled for you. Since 2011, we've helped businesses launch, scale, and stay ahead with a fast, reliable design team that feels in-house without the in-house overhead."), /*#__PURE__*/React.createElement("ul", {
    style: whoStyles.list
  }, /*#__PURE__*/React.createElement("li", {
    style: whoStyles.li
  }, /*#__PURE__*/React.createElement("span", {
    style: whoStyles.sq
  }), "Logo design and branding"), /*#__PURE__*/React.createElement("li", {
    style: whoStyles.li
  }, /*#__PURE__*/React.createElement("span", {
    style: whoStyles.sq
  }), "Digital and print content design"), /*#__PURE__*/React.createElement("li", {
    style: whoStyles.li
  }, /*#__PURE__*/React.createElement("span", {
    style: whoStyles.sq
  }), "Video production to broadcast standards"), /*#__PURE__*/React.createElement("li", {
    style: whoStyles.li
  }, /*#__PURE__*/React.createElement("span", {
    style: whoStyles.sq
  }), "Social media management")))));
}
window.WhoWeAre = WhoWeAre;
Object.assign(__ds_scope, { WhoWeAre });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/WhoWeAre.jsx", error: String((e && e.message) || e) }); }

__ds_ns.CaseStudies = __ds_scope.CaseStudies;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.Header = __ds_scope.Header;

__ds_ns.Hero = __ds_scope.Hero;

__ds_ns.Logos = __ds_scope.Logos;

__ds_ns.Pricing = __ds_scope.Pricing;

__ds_ns.ArrowIcon = __ds_scope.ArrowIcon;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.EyebrowSwatch = __ds_scope.EyebrowSwatch;

__ds_ns.EyebrowBracket = __ds_scope.EyebrowBracket;

__ds_ns.SectionHeader = __ds_scope.SectionHeader;

__ds_ns.Primitives = __ds_scope.Primitives;

__ds_ns.Services = __ds_scope.Services;

__ds_ns.WhoWeAre = __ds_scope.WhoWeAre;

})();
