import type { CSSProperties } from "react";
import { Eyebrow } from "./primitives";

const col: { title: string; links: { label: string; href: string; ext?: boolean }[] }[] = [
  {
    title: "[ SERVICES ]",
    links: [
      { label: "Brand Identity", href: "/#why" },
      { label: "Digital & Social", href: "/#why" },
      { label: "Web Design", href: "/#why" },
      { label: "Video & Motion", href: "/#showreel" },
      { label: "Print Design", href: "/#why" },
      { label: "Digital Marketing", href: "/#why" },
    ],
  },
  {
    title: "[ PLATFORM ]",
    links: [
      { label: "Client Portals", href: "/#platform" },
      { label: "Workflow Automation", href: "/#platform" },
      { label: "Dashboards & Reporting", href: "/#platform" },
      { label: "Approvals", href: "/#platform" },
      { label: "Integrations", href: "/#platform" },
      { label: "AI Solutions", href: "/#platform" },
    ],
  },
  {
    title: "[ COMPANY ]",
    links: [
      { label: "Our Work", href: "/#showreel" },
      { label: "Pricing", href: "/#pricing" },
      { label: "FAQ", href: "/faq" },
      { label: "Case Studies", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Freelancers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
];

const linkStyle: CSSProperties = {
  fontSize: 15,
  color: "rgba(255,255,255,0.66)",
  textDecoration: "none",
};

const legalStyle: CSSProperties = {
  fontSize: 13,
  color: "rgba(255,255,255,0.5)",
  textDecoration: "none",
};

export default function Footer() {
  return (
    <footer
      style={{
        position: "relative",
        zIndex: 10,
        borderTop: "1px solid rgba(255,255,255,0.10)",
      }}
    >
      <div
        className="footer-grid px"
        style={{
          maxWidth: 1360,
          margin: "0 auto",
          padding: "76px 48px 44px",
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
          gap: 44,
        }}
      >
        <div style={{ maxWidth: 300 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/sprint-logo-white.svg"
            alt="Sprint"
            style={{ height: 26, width: "auto", display: "block", marginBottom: 22 }}
          />
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.55)",
              margin: "0 0 24px",
            }}
          >
            Your creative department and AI platform team. Established 2011.
          </p>
          <a
            className="cta cta-lime"
            href="#"
            data-open-contact="1"
            data-intent="demo"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "var(--sprint-lime)",
              color: "#0c1321",
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 600,
              padding: "12px 18px",
              borderRadius: 4,
            }}
          >
            Book a Demo
          </a>
        </div>

        {col.map((c) => (
          <div key={c.title}>
            <Eyebrow color="rgba(255,255,255,0.42)" style={{ marginBottom: 22 }}>
              {c.title}
            </Eyebrow>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {c.links.map((l, i) => (
                <a key={i} href={l.href} className="footer-link" style={linkStyle}>
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div
        className="px"
        style={{
          maxWidth: 1360,
          margin: "0 auto",
          padding: "22px 48px 18px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22, flexWrap: "wrap" }}>
          <a
            href="https://www.notion.so/sprintcreative/Terms-of-Service-35897d4735d180df9cedf77685398102?v=5c297d4735d182f6909108d979dc7aa7&source=copy_link"
            target="_blank"
            rel="noopener"
            className="footer-link"
            style={legalStyle}
          >
            Terms
          </a>
          <a
            href="https://sprintcreative.notion.site/Privacy-Policy-39097d4735d18029b131f9ce90353295?source=copy_link"
            target="_blank"
            rel="noopener"
            className="footer-link"
            style={legalStyle}
          >
            Privacy
          </a>
          <a
            href="https://sprintcreative.notion.site/Cookies-Policy-39097d4735d180baa7edccad82af3637?source=copy_link"
            target="_blank"
            rel="noopener"
            className="footer-link"
            style={legalStyle}
          >
            Cookies
          </a>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <a
            href="https://www.instagram.com/madebysprint"
            target="_blank"
            rel="noopener"
            className="footer-link"
            style={legalStyle}
          >
            Instagram
          </a>
          <a
            href="https://www.linkedin.com/company/sprint-creative-agency/"
            target="_blank"
            rel="noopener"
            className="footer-link"
            style={legalStyle}
          >
            LinkedIn
          </a>
        </div>
      </div>

      <div
        className="px"
        style={{
          maxWidth: 1360,
          margin: "0 auto",
          padding: "0 48px 52px",
          textAlign: "center",
        }}
      >
        <span
          className="s-mono"
          style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}
        >
          © 2026 SPRINT CREATIVE · FORT WORTH, TX
        </span>
      </div>
    </footer>
  );
}
