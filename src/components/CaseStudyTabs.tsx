"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

const csBullet: CSSProperties = { display: "flex", gap: 11, alignItems: "flex-start" };
const csBulletIcon: CSSProperties = {
  width: 16,
  height: 16,
  flex: "none",
  marginTop: 2,
  background: "var(--sprint-lime)",
  WebkitMask: "url(/assets/icons/sparkle.svg) center/contain no-repeat",
  mask: "url(/assets/icons/sparkle.svg) center/contain no-repeat",
};
const csBulletText: CSSProperties = { fontSize: 15, color: "rgba(255,255,255,0.82)" };
const panelP: CSSProperties = { fontSize: 16.5, lineHeight: 1.66, color: "rgba(255,255,255,0.74)" };

function Bullet({ children }: { children: ReactNode }) {
  return (
    <div style={csBullet}>
      <span style={csBulletIcon} />
      <span style={csBulletText}>{children}</span>
    </div>
  );
}

const TABS: { label: string; panel: ReactNode }[] = [
  {
    label: "The brief",
    panel: (
      <>
        <p style={{ ...panelP, margin: "0 0 18px" }}>
          When the founder came to Sprint, Aledo Soccer Club did not exist yet. No logo, no systems,
          no channels. Just a clear vision: a not for profit club that truly belonged to Aledo.
        </p>
        <p style={{ ...panelP, margin: 0 }}>
          The job was not only to launch a club, but to build trust, recognition, and community
          connection from day one.
        </p>
      </>
    ),
  },
  {
    label: "What we built",
    panel: (
      <>
        <p style={{ ...panelP, margin: "0 0 20px" }}>
          A complete brand, and the systems to run it, delivered end to end.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
          <Bullet>Full brand identity rooted in Aledo&rsquo;s character</Bullet>
          <Bullet>Digital ecosystem for registration and operations</Bullet>
          <Bullet>Print and physical materials for players and families</Bullet>
          <Bullet>Growth tools, including facility planning and proposals</Bullet>
        </div>
      </>
    ),
  },
  {
    label: "In the community",
    panel: (
      <>
        <p style={{ ...panelP, margin: "0 0 20px" }}>
          At its core, the club is about community. We built a communication strategy focused on
          trust, engagement, and visibility.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
          <Bullet>Social media setup and branded templates</Bullet>
          <Bullet>Promo videos and try out campaigns</Bullet>
          <Bullet>Summer camp promotional content</Bullet>
        </div>
      </>
    ),
  },
];

export default function CaseStudyTabs() {
  const [active, setActive] = useState(0);
  return (
    <>
      <div style={{ display: "flex", gap: 28, borderBottom: "1px solid rgba(255,255,255,0.12)", marginBottom: 24 }}>
        {TABS.map((t, i) => {
          const on = i === active;
          return (
            <button
              key={t.label}
              type="button"
              onClick={() => setActive(i)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: 15,
                color: on ? "#ffffff" : "rgba(255,255,255,0.5)",
                padding: "0 0 14px",
                borderBottom: on ? "2px solid var(--sprint-lime)" : "2px solid transparent",
                marginBottom: -1,
                transition: "color 0.2s ease",
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      <div style={{ minHeight: 210 }}>{TABS[active].panel}</div>
    </>
  );
}
