"use client";

import { useState } from "react";

// Privacy-friendly, lazy Google Map. Renders a lightweight styled facade and
// only loads the map iframe once the visitor clicks, so it never costs
// performance on first paint and sets no third-party cookies until asked.
export default function MapFacade({
  query,
  label = "View on Google Maps",
  height = 340,
}: {
  query: string;
  label?: string;
  height?: number;
}) {
  const [loaded, setLoaded] = useState(false);
  const embedSrc = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height,
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.12)",
        background:
          "radial-gradient(ellipse at 50% 40%,rgba(93,107,255,0.16),rgba(12,19,33,0.9) 70%)",
      }}
    >
      {loaded ? (
        <iframe
          title={`Map of ${query}`}
          src={embedSrc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          style={{ width: "100%", height: "100%", border: 0, display: "block" }}
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          aria-label={`Load the interactive map for ${query}`}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            width: "100%",
            height: "100%",
            cursor: "pointer",
            background: "transparent",
            border: 0,
            color: "#fff",
            fontFamily: "var(--font-sans)",
          }}
        >
          <span
            style={{
              width: 46,
              height: 46,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              background: "rgba(181,230,2,0.14)",
              border: "1px solid rgba(181,230,2,0.4)",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--sprint-lime)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </span>
          <span style={{ fontSize: 15, fontWeight: 600 }}>{label}</span>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>
            {query}
          </span>
        </button>
      )}
    </div>
  );
}
