"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/site-content";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock body scroll while the mobile menu is open (matches .cm-open behaviour).
  useEffect(() => {
    if (menuOpen) document.body.classList.add("cm-open");
    else document.body.classList.remove("cm-open");
    return () => document.body.classList.remove("cm-open");
  }, [menuOpen]);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "rgba(12,19,33,0.62)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          className="nav-inner px"
          style={{
            maxWidth: 1360,
            margin: "0 auto",
            padding: "16px 48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 32,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 56 }}>
            <a href="/" className="logo-link" aria-label="Sprint home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/sprint-logo-white.svg"
                alt="Sprint"
                style={{ height: 26, width: "auto", display: "block" }}
              />
            </a>
            <nav
              className="nav-links"
              style={{ display: "flex", alignItems: "center", gap: 34 }}
            >
              {NAV_LINKS.map((l, i) => (
                <a
                  key={i}
                  href={l.href}
                  className="navlink"
                  style={{ fontSize: 15, fontWeight: 500 }}
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
          <div
            className="nav-actions"
            style={{ display: "flex", alignItems: "center", gap: 22 }}
          >
            <a
              href="https://portal.madebysprint.com/auth/login"
              target="_blank"
              rel="noopener noreferrer"
              className="navlink mm-hide-mobile"
              style={{ fontSize: 15, fontWeight: 500, whiteSpace: "nowrap" }}
            >
              Sign In
            </a>
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
                padding: "11px 18px",
                borderRadius: 4,
                whiteSpace: "nowrap",
              }}
            >
              Book Demo
            </a>
            <button
              className="nav-hamburger"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M3 6h18" />
                <path d="M3 12h18" />
                <path d="M3 18h18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div
        id="mobile-menu"
        style={{
          display: menuOpen ? "flex" : "none",
          position: "fixed",
          inset: 0,
          zIndex: 200,
          background: "rgba(10,15,28,0.98)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          padding: "26px 30px 40px",
          flexDirection: "column",
          opacity: menuOpen ? 1 : 0,
          transition: "opacity 0.25s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 30,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/sprint-logo-white.svg"
            alt="Sprint"
            style={{ height: 24, width: "auto", display: "block" }}
          />
          <button
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            style={{
              width: 44,
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 6,
              cursor: "pointer",
              padding: 0,
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12" />
              <path d="M18 6L6 18" />
            </svg>
          </button>
        </div>
        {NAV_LINKS.map((l, i) => (
          <a
            key={i}
            href={l.href}
            className="mm-link"
            onClick={() => setMenuOpen(false)}
          >
            {l.label}
          </a>
        ))}
        <a
          href="https://portal.madebysprint.com/auth/login"
          target="_blank"
          rel="noopener noreferrer"
          className="mm-link"
          onClick={() => setMenuOpen(false)}
        >
          Sign In
        </a>
        <a
          href="#"
          className="mm-link cta cta-lime"
          data-open-contact="1"
          data-intent="demo"
          onClick={() => setMenuOpen(false)}
          style={{
            marginTop: 26,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            background: "var(--sprint-lime)",
            color: "#0c1321",
            textDecoration: "none",
            fontSize: 16,
            fontWeight: 600,
            padding: "16px 0",
            borderRadius: 4,
            borderBottom: "none",
          }}
        >
          Book a Demo
        </a>
      </div>
    </>
  );
}
