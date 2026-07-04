import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo/config";

// Web app manifest. Served at /manifest.webmanifest and auto-linked by Next.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.siteName,
    short_name: siteConfig.shortName,
    description: siteConfig.defaultDescription,
    start_url: "/",
    display: "standalone",
    background_color: siteConfig.themeColor,
    theme_color: siteConfig.themeColor,
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/apple-icon", type: "image/png", sizes: "180x180" },
    ],
  };
}
