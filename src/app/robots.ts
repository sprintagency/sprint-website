import type { MetadataRoute } from "next";
import { siteConfig, absoluteUrl } from "@/lib/seo/config";
import { PARTNERS } from "@/lib/growth-partners";

// robots.txt. Served at /robots.txt.
//
// Growth Partner discovery pages must never be indexed (they are attributed,
// private landing pages), so their slugs are Disallowed here and also carry
// noindex metadata. /admin (SEO CMS) and /api are kept out of the index too.
export default function robots(): MetadataRoute.Robots {
  const partnerPaths = Object.keys(PARTNERS).map((slug) => `/${slug}`);
  const privatePaths = ["/admin", "/admin/", "/api/", ...partnerPaths];

  return {
    rules: [
      {
        // Standard crawlers: full access except private paths.
        userAgent: "*",
        allow: "/",
        disallow: privatePaths,
      },
      {
        // AI answer + search agents. We WANT to appear in AI answers, so these
        // are all allowed. If we ever want to opt OUT of AI *training*
        // specifically, the agents to Disallow would be: GPTBot, CCBot,
        // Google-Extended, Applebot-Extended. Leaving them allowed for now.
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-Web",
          "anthropic-ai",
          "PerplexityBot",
          "Applebot",
          "Bingbot",
          "Google-Extended",
          "CCBot",
        ],
        allow: "/",
        disallow: privatePaths,
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteConfig.siteUrl,
  };
}
