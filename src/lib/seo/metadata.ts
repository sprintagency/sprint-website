// ============================================================================
// Metadata helpers.
//
// `buildMetadata()` produces a Next.js Metadata object from page defaults,
// then layers on per-page overrides from the Supabase `page_seo` table (the
// mini SEO CMS, Phase 7). Every step degrades gracefully: if Supabase is
// unconfigured, unreachable, or the row/field is missing, we fall back to the
// page defaults and siteConfig, and never throw.
// ============================================================================

import type { Metadata } from "next";
import { cache } from "react";
import { createClient } from "@supabase/supabase-js";
import { siteConfig, absoluteUrl } from "./config";

export type PageSeo = {
  path: string;
  seo_title: string | null;
  seo_description: string | null;
  og_image_url: string | null;
  canonical_url: string | null;
  noindex: boolean | null;
};

function supabaseEnv() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return url && key ? { url, key } : null;
}

/**
 * Fetch the SEO override row for a path. Returns null on any failure or when
 * Supabase is not configured, so callers can fall straight through to
 * defaults. Wrapped in React `cache()` so the row is fetched once per request
 * even though both `buildMetadata` (generateMetadata) and `<SocialMeta>` (the
 * component tree) resolve the same path.
 */
export const getPageSeo = cache(
  async (path: string): Promise<PageSeo | null> => {
    const env = supabaseEnv();
    if (!env) return null;
    try {
      const supabase = createClient(env.url, env.key, {
        auth: { persistSession: false },
      });
      const { data, error } = await supabase
        .from("page_seo")
        .select("path, seo_title, seo_description, og_image_url, canonical_url, noindex")
        .eq("path", path)
        .maybeSingle();
      if (error || !data) return null;
      return data as PageSeo;
    } catch {
      return null;
    }
  },
);

/** Return the list of paths flagged noindex in the CMS (for sitemap exclusion). */
export async function getNoindexPaths(): Promise<Set<string>> {
  const env = supabaseEnv();
  if (!env) return new Set();
  try {
    const supabase = createClient(env.url, env.key, {
      auth: { persistSession: false },
    });
    const { data, error } = await supabase
      .from("page_seo")
      .select("path")
      .eq("noindex", true);
    if (error || !data) return new Set();
    return new Set(data.map((r) => (r as { path: string }).path));
  } catch {
    return new Set();
  }
}

export type BuildMetadataInput = {
  /** Site-relative path, e.g. "/contact" or "/". Used for canonical + lookup. */
  path: string;
  title: string;
  description: string;
  /** Override the OG image (else siteConfig default). Site-relative or absolute. */
  image?: string;
  imageAlt?: string;
  /** OG type; defaults to "website". */
  type?: "website" | "article" | "profile";
  /** Force noindex regardless of CMS (e.g. growth partner pages). */
  noindex?: boolean;
  /** Skip the Supabase lookup entirely (e.g. always-noindex routes). */
  skipCms?: boolean;
};

function toAbsolute(image: string): string {
  return image.startsWith("http") ? image : absoluteUrl(image);
}

const robotsIndex: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

const robotsNoindex: Metadata["robots"] = {
  index: false,
  follow: false,
  googleBot: { index: false, follow: false },
};

export type ResolvedPageMeta = {
  fullTitle: string;
  description: string;
  canonical: string;
  /** Absolute OG image URL, or undefined if none. */
  image?: string;
  imageAlt: string;
  type: "website" | "article" | "profile";
  noindex: boolean;
};

/**
 * Resolve a page's SEO values, layering CMS overrides over the supplied
 * defaults. Shared by `buildMetadata` (the <head> title/description/robots)
 * and `<SocialMeta>` (the Open Graph tags) so the two never drift, and the
 * Supabase read is deduped via the cached `getPageSeo`.
 */
export async function resolvePageMeta(
  input: BuildMetadataInput,
): Promise<ResolvedPageMeta> {
  const cms = input.skipCms ? null : await getPageSeo(input.path);

  const title = cms?.seo_title?.trim() || input.title;
  const description = cms?.seo_description?.trim() || input.description;
  // Brand suffix for the <title> and OG title. Avoid double-branding
  // if the supplied/override title already names Sprint.
  const fullTitle = /sprint/i.test(title)
    ? title
    : `${title} | ${siteConfig.siteName}`;
  // Fall back to the site-wide default OG card when no per-page image is set.
  const imageSrc = cms?.og_image_url?.trim() || input.image || siteConfig.ogImage;
  const image = imageSrc ? toAbsolute(imageSrc) : undefined;
  const imageAlt = input.imageAlt || siteConfig.ogImageAlt;
  const canonical = cms?.canonical_url?.trim() || absoluteUrl(input.path);
  const noindex = input.noindex || cms?.noindex === true;

  return {
    fullTitle,
    description,
    canonical,
    image,
    imageAlt,
    type: input.type || "website",
    noindex,
  };
}

/**
 * Build a page's Metadata, merging CMS overrides over the supplied defaults.
 * Use from a `generateMetadata` export so the async CMS read can run.
 *
 * NOTE: Open Graph tags are deliberately NOT emitted here. Next.js
 * auto-generates twitter:* tags from any `openGraph` in the Metadata object,
 * and there is no way to suppress them while keeping OG. Since the business has
 * no Twitter/X account, OG is rendered separately by <SocialMeta> and the
 * Metadata object carries only title/description/canonical/robots.
 */
export async function buildMetadata(input: BuildMetadataInput): Promise<Metadata> {
  const r = await resolvePageMeta(input);
  return {
    title: { absolute: r.fullTitle },
    description: r.description,
    alternates: {
      canonical: r.canonical,
      languages: {
        "en-US": r.canonical,
        "en-GB": r.canonical,
      },
    },
    robots: r.noindex ? robotsNoindex : robotsIndex,
  };
}
