import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig, absoluteUrl, real } from "@/lib/seo/config";
import { graph, baseGraph } from "@/lib/seo/schema";
import JsonLd from "@/components/JsonLd";
import Analytics from "@/components/Analytics";
import CookieConsent from "@/components/CookieConsent";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

// Only emit verification meta tags for codes we actually have.
const verification: Metadata["verification"] = {};
if (real(siteConfig.verification.google))
  verification.google = siteConfig.verification.google;
if (real(siteConfig.verification.bing))
  verification.other = { "msvalidate.01": siteConfig.verification.bing };

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.defaultTitle,
    template: siteConfig.titleTemplate,
  },
  description: siteConfig.defaultDescription,
  applicationName: siteConfig.siteName,
  authors: [{ name: siteConfig.founder, url: siteConfig.siteUrl }],
  creator: siteConfig.siteName,
  publisher: siteConfig.legalName,
  formatDetection: { telephone: false },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": absoluteUrl("/"),
      "en-GB": absoluteUrl("/"),
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Open Graph is intentionally NOT set here (nor via app/opengraph-image).
  // Next.js derives twitter:* tags from any Metadata `openGraph`, and the
  // business has no Twitter/X account. OG tags are rendered per page by
  // <SocialMeta> instead, so no twitter:* tags are ever emitted.
  ...(Object.keys(verification).length ? { verification } : {}),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: siteConfig.themeColor,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-US"
      className={`${geist.variable} ${geistMono.variable}`}
    >
      <body
        style={{
          background: "#0c1321",
          color: "#ffffff",
          fontFamily: "var(--font-sans)",
        }}
      >
        {/* Warm up the third-party video origins used on service pages.
            React hoists these link tags into <head>. */}
        <link rel="dns-prefetch" href="https://player.vimeo.com" />
        <link rel="dns-prefetch" href="https://app.vidzflow.com" />
        <link rel="dns-prefetch" href="https://r2.vidzflow.com" />

        {/* Site-wide structured data: Organization/LocalBusiness, founder, WebSite. */}
        <JsonLd data={graph(...baseGraph())} />
        {children}
        <Analytics />
        <CookieConsent />
      </body>
    </html>
  );
}
