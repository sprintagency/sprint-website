"use client";

import { useState } from "react";
import ContactWizard from "./ContactWizard";
import ContactModal from "./ContactModal";
import Header from "./Header";
import Footer from "./Footer";
import { siteConfig } from "@/lib/seo/config";
import { DEFAULT_HEADING } from "@/lib/contact-form";

export default function ContactView() {
  const [heading, setHeading] = useState(DEFAULT_HEADING);

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
      {/* ambient glows */}
      <div
        style={{
          position: "absolute",
          top: -240,
          right: -160,
          width: 1000,
          height: 1000,
          maxWidth: "80vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(93,107,255,0.26),rgba(138,92,255,0.10) 40%,transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -320,
          left: -200,
          width: 900,
          height: 900,
          maxWidth: "80vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(138,92,255,0.16),rgba(93,107,255,0.06) 44%,transparent 72%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <Header />

      <section
        className="px"
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 1360,
          margin: "0 auto",
          padding: "128px 48px 90px",
        }}
      >
        <div
          className="contact-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,0.82fr) minmax(0,1.18fr)",
            gap: 72,
            alignItems: "start",
          }}
        >
          {/* LEFT: context */}
          <div className="contact-left" style={{ position: "sticky", top: 96 }}>
            <div
              className="s-eyebrow"
              style={{ color: "var(--sprint-lime)", marginBottom: 24 }}
            >
              [ GET IN TOUCH ]
            </div>
            <h1
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: "clamp(38px,4.4vw,58px)",
                lineHeight: 1.03,
                letterSpacing: "-0.03em",
                margin: "0 0 24px",
              }}
            >
              <span>{heading}</span>
              <span className="s-dot">.</span>
            </h1>
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.66)",
                margin: "0 0 44px",
                maxWidth: 420,
              }}
            >
              Tell us what you need and we&rsquo;ll come back with a clear next
              step, usually within one business day.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
              <div>
                <div
                  className="s-mono"
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.42)",
                    marginBottom: 8,
                  }}
                >
                  Email
                </div>
                <a
                  href="mailto:hello@madebysprint.com"
                  className="footer-link"
                  style={{
                    color: "#ffffff",
                    textDecoration: "none",
                    fontSize: 17,
                    fontWeight: 500,
                  }}
                >
                  hello@madebysprint.com
                </a>
              </div>
              <div>
                <div
                  className="s-mono"
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.42)",
                    marginBottom: 8,
                  }}
                >
                  Response time
                </div>
                <div
                  style={{
                    fontSize: 17,
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.9)",
                  }}
                >
                  Within one business day
                </div>
              </div>
              <div>
                <div
                  className="s-mono"
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.42)",
                    marginBottom: 8,
                  }}
                >
                  Studio
                </div>
                <a
                  href="/fort-worth"
                  className="footer-link"
                  style={{
                    color: "#ffffff",
                    textDecoration: "none",
                    fontSize: 16,
                    fontWeight: 500,
                    lineHeight: 1.5,
                    display: "block",
                  }}
                >
                  {siteConfig.primaryLocation.streetAddress}
                  <br />
                  {siteConfig.primaryLocation.addressLocality},{" "}
                  {siteConfig.primaryLocation.addressRegion}{" "}
                  {siteConfig.primaryLocation.postalCode}
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: form card */}
          <div
            style={{
              position: "relative",
              padding: "44px 44px 40px",
              borderRadius: 10,
              background:
                "radial-gradient(ellipse 110% 120% at 80% -10%,rgba(93,107,255,0.16),rgba(138,92,255,0.06) 46%,rgba(255,255,255,0.02) 80%),rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.11)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              boxShadow: "0 40px 90px -50px rgba(0,0,0,0.85)",
            }}
          >
            <ContactWizard
              variant="inline"
              prefillFromUrl
              onHeadingChange={setHeading}
            />
          </div>
        </div>
      </section>

      <Footer />
      <ContactModal />
    </div>
  );
}
