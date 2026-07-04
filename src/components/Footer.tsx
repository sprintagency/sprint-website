import type { CSSProperties } from "react";
import { Eyebrow } from "./primitives";
import { siteConfig, real } from "@/lib/seo/config";

const loc = siteConfig.primaryLocation;
// NAP string kept identical to the LocalBusiness schema and Google Business
// Profile so the citation matches character-for-character (a ranking factor).
const NAP = `${siteConfig.siteName}, ${loc.streetAddress}, ${loc.addressLocality}, ${loc.addressRegion} ${loc.postalCode}, USA`;
const phone = real(siteConfig.contact.phoneDisplay);

type FooterLink = {
  label: string;
  href: string;
  ext?: boolean;
  openContact?: boolean;
  intent?: string;
};

const col: { title: string; links: FooterLink[] }[] = [
  {
    title: "[ SERVICES ]",
    links: [
      { label: "Brand Identity", href: "/brand-identity-fort-worth" },
      { label: "Social Media", href: "/social-media-management-fort-worth" },
      { label: "Web Design", href: "/web-design-fort-worth" },
      { label: "Video & Motion", href: "/video-production-fort-worth" },
      { label: "Print Design", href: "/print-design-fort-worth" },
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
      { label: "Careers", href: "#", openContact: true, intent: "careers" },
      { label: "Freelancers", href: "#", openContact: true, intent: "freelancers" },
      { label: "Contact", href: "/contact" },
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
          <a href="/" aria-label="Sprint home" style={{ display: "inline-block" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/sprint-logo-white.svg"
              alt="Sprint"
              style={{ height: 26, width: "auto", display: "block", marginBottom: 22 }}
            />
          </a>
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
                <a
                  key={i}
                  href={l.href}
                  className="footer-link"
                  style={linkStyle}
                  {...(l.openContact ? { "data-open-contact": "1" } : {})}
                  {...(l.intent ? { "data-intent": l.intent } : {})}
                >
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
          <a href="/terms" className="footer-link" style={legalStyle}>
            Terms
          </a>
          <a href="/privacy" className="footer-link" style={legalStyle}>
            Privacy
          </a>
          <a href="/cookies" className="footer-link" style={legalStyle}>
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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span
          className="s-mono"
          style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}
        >
          © 2026 SPRINT
        </span>
        {/* Full NAP (Name, Address, Phone) in crawlable text, linked to the
            Fort Worth hub. Formatting matches the LocalBusiness schema exactly. */}
        <address
          style={{
            fontStyle: "normal",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
          }}
        >
          <a
            href="/fort-worth"
            className="footer-link"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              color: "rgba(255,255,255,0.4)",
              textDecoration: "none",
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ flex: "none" }}
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="s-mono" style={{ fontSize: 11.5, letterSpacing: "0.04em" }}>
              {NAP}
            </span>
          </a>
          {phone ? (
            <a
              href={`tel:${siteConfig.contact.phone.replace(/[^+\d]/g, "")}`}
              className="footer-link"
              style={{ fontSize: 11.5, color: "rgba(255,255,255,0.4)", textDecoration: "none" }}
            >
              {phone}
            </a>
          ) : null}
        </address>
      </div>
    </footer>
  );
}
