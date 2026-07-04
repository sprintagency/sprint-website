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
import { createClient } from "@supabase/supabase-js";
import { siteConfig, absoluteUrl, real } from "./config";

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
 * defaults. Cached per-path for the request via Next's fetch-less memoization
 * would require React cache(); we keep it simple and let Next dedupe the
 * generateMetadata calls per route.
 */
export async function getPageSeo(path: string): Promise<PageSeo | null> {
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
}

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
  /** Override OG/Twitter image (else siteConfig default). Site-relative or absolute. */
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

function twitterSite() {
  return real(siteConfig.twitterHandle);
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

/**
 * Build a page's Metadata, merging CMS overrides over the supplied defaults.
 * Use from a `generateMetadata` export so the async CMS read can run.
 */
export async function buildMetadata(input: BuildMetadataInput): Promise<Metadata> {
  const cms = input.skipCms ? null : await getPageSeo(input.path);

  const title = cms?.seo_title?.trim() || input.title;
  const description = cms?.seo_description?.trim() || input.description;
  // Brand suffix for the <title> and OG/Twitter titles. Avoid double-branding
  // if the supplied/override title already names Sprint.
  const fullTitle = /sprint/i.test(title)
    ? title
    : `${title} | ${siteConfig.siteName}`;
  // Only override the site-wide default OG image (app/opengraph-image.tsx)
  // when a real per-page image is supplied via the CMS or the caller.
  const imageOverride = cms?.og_image_url?.trim() || input.image;
  const image = imageOverride ? toAbsolute(imageOverride) : undefined;
  const imageAlt = input.imageAlt || siteConfig.ogImageAlt;
  const canonical = cms?.canonical_url?.trim() || absoluteUrl(input.path);
  const noindex = input.noindex || cms?.noindex === true;

  return {
    title: { absolute: fullTitle },
    description,
    alternates: {
      canonical,
      languages: {
        "en-US": canonical,
        "en-GB": canonical,
      },
    },
    robots: noindex ? robotsNoindex : robotsIndex,
    openGraph: {
      type: input.type || "website",
      siteName: siteConfig.siteName,
      locale: siteConfig.locale,
      url: canonical,
      title: fullTitle,
      description,
      ...(image
        ? {
            images: [
              {
                url: image,
                width: siteConfig.ogImageWidth,
                height: siteConfig.ogImageHeight,
                alt: imageAlt,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(image ? { images: [image] } : {}),
      ...(twitterSite()
        ? { site: siteConfig.twitterHandle, creator: siteConfig.twitterHandle }
        : {}),
    },
  };
}
