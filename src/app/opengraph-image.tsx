import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/seo/config";

// Site-wide default Open Graph image (1200x630), generated so it is always
// valid. To use bespoke artwork, replace this file or set a per-page
// og_image_url in the SEO CMS (Phase 7).
export const alt = siteConfig.ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0c1321",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 74, height: 14, borderRadius: 7, background: "#b5e602" }} />
          <div style={{ color: "#ffffff", fontSize: 30, fontWeight: 700, letterSpacing: -0.5 }}>
            Made by Sprint
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              color: "#ffffff",
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 900,
            }}
          >
            Creative agency in Fort Worth, Texas
          </div>
          <div style={{ color: "rgba(255,255,255,0.66)", fontSize: 30, maxWidth: 940 }}>
            Brand, web, video, social, and print on flat monthly retainers. Established 2011.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 12, height: 12, borderRadius: 6, background: "#b5e602" }} />
          <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 24, letterSpacing: 1 }}>
            madebysprint.com
          </div>
        </div>
      </div>
    ),
    size,
  );
}
