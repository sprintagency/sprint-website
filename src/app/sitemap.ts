import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo/config";
import { SERVICES } from "@/lib/seo/services";
import { getNoindexPaths } from "@/lib/seo/metadata";

// Dynamic sitemap. Served at /sitemap.xml.
//
// Growth Partner pages are deliberately excluded (noindex). Any page flagged
// noindex in the SEO CMS is filtered out too. The Supabase read is guarded so
// a failure still yields the full set of static/service routes.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  type Entry = {
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
    lastModified?: Date;
  };

  const entries: Entry[] = [
    { path: "/", changeFrequency: "weekly", priority: 1.0 },
    { path: "/fort-worth", changeFrequency: "monthly", priority: 0.9 },
    ...SERVICES.map(
      (s): Entry => ({
        path: s.href,
        changeFrequency: "monthly",
        priority: 0.9,
      }),
    ),
    { path: "/contact", changeFrequency: "yearly", priority: 0.7 },
    { path: "/faq", changeFrequency: "monthly", priority: 0.6 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/cookies", changeFrequency: "yearly", priority: 0.3 },
  ];

  // Drop anything an editor flagged noindex in the CMS (guarded internally).
  let noindex: Set<string> = new Set();
  try {
    noindex = await getNoindexPaths();
  } catch {
    noindex = new Set();
  }

  return entries
    .filter((e) => !noindex.has(e.path))
    .map((e) => ({
      url: absoluteUrl(e.path),
      lastModified: e.lastModified || now,
      changeFrequency: e.changeFrequency,
      priority: e.priority,
    }));
}
