// ============================================================================
// Central SEO / AEO configuration — single source of truth.
//
// Every SEO surface (metadata, JSON-LD, sitemap, robots, manifest, llms.txt,
// the /fort-worth hub, the service pages) reads from here so nothing is
// hard-coded twice. Change a fact once and it propagates everywhere.
//
// PLACEHOLDER values are real business facts we do not yet have confirmed.
// They are marked with the string "PLACEHOLDER" so `isPlaceholder()` can strip
// them out of schema/metadata rather than shipping fake data to crawlers.
// Search this file for "PLACEHOLDER" to find everything still needing real
// values, and see HANDOFF.md for the outstanding list.
//
// Spelling: US throughout (audience is Fort Worth, Texas). No em dashes.
// ============================================================================

/** True when a value is still an unfilled placeholder (or empty). */
export function isPlaceholder(value: unknown): boolean {
  return (
    value == null ||
    (typeof value === "string" &&
      (value.trim() === "" || value.includes("PLACEHOLDER")))
  );
}

/** Returns the value only if it is real (not a placeholder), else undefined. */
export function real<T>(value: T): T | undefined {
  return isPlaceholder(value) ? undefined : value;
}

export type PostalAddressData = {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  regionCode: string;
  postalCode: string;
  addressCountry: string; // ISO 3166-1 alpha-2
};

export type PrimaryLocation = PostalAddressData & {
  city: string;
  region: string;
  country: string;
  latitude: string; // PLACEHOLDER until confirmed / geocoded
  longitude: string; // PLACEHOLDER until confirmed / geocoded
  gbpUrl: string; // Google Business Profile / Maps share URL — PLACEHOLDER
  mapUrl: string; // Google Maps directions URL (derived from address)
};

export type ServiceArea = {
  name: string;
  /** "City" or "AdministrativeArea" (county) for schema areaServed typing. */
  type: "City" | "AdministrativeArea";
};

export const siteConfig = {
  // Canonical host is www: the live site redirects the apex to www, so
  // canonicals/sitemap/OG all use www to match the served host (no redirect
  // hop). www is also the DNS-robust choice (the apex cannot use a CNAME).
  siteUrl: "https://www.madebysprint.com",
  siteName: "Made by Sprint",
  shortName: "Sprint",
  legalName: "Hollinger Creative LTD",
  tradingName: "Made by Sprint",
  foundingYear: "2011",
  founder: "Graham Hollinger",

  // ---- Titles & descriptions -------------------------------------------
  // Kept in the existing site voice ("… — Sprint" for page titles), but the
  // template uses the full brand name for stronger entity association.
  defaultTitle: "Made by Sprint: Creative agency in Fort Worth, Texas",
  titleTemplate: "%s | Made by Sprint",
  defaultDescription:
    "Made by Sprint is a Fort Worth, Texas creative agency delivering brand, web design, video production, social, and print on flat monthly retainers. Serving the Fort Worth metro and the UK since 2011.",

  // ---- Locale ----------------------------------------------------------
  locale: "en_US", // primary market is Fort Worth, Texas
  altLocale: "en_GB", // agency also serves the UK
  themeColor: "#0c1321",

  // ---- Social ----------------------------------------------------------
  // No Twitter/X account, so no twitter handle and no X profile. Link previews
  // on every platform fall back to the Open Graph tags.
  socialProfiles: [
    // Confirmed live (pulled from the existing site footer):
    "https://www.linkedin.com/company/sprint-creative-agency/",
    "https://www.instagram.com/madebysprint",
    // PLACEHOLDER — add the real URLs (or delete the lines) once confirmed:
    "PLACEHOLDER_FACEBOOK_URL",
    "PLACEHOLDER_YOUTUBE_URL",
  ],

  // ---- Contact ---------------------------------------------------------
  contact: {
    email: "hello@madebysprint.com",
    phone: "PLACEHOLDER_PHONE", // public phone in E.164, e.g. "+1-817-555-0100"
    // Human-readable phone for display in the footer NAP (kept identical to
    // whatever is submitted to Google Business Profile). PLACEHOLDER for now.
    phoneDisplay: "PLACEHOLDER_PHONE",
  },

  // ---- Primary location (Fort Worth, TX) -------------------------------
  // Address confirmed from the live site footer. Coordinates + GBP URL are
  // still PLACEHOLDER (see HANDOFF.md).
  primaryLocation: {
    city: "Fort Worth",
    region: "Texas",
    regionCode: "TX",
    country: "US",
    streetAddress: "3409 Clayton Rd E",
    addressLocality: "Fort Worth",
    addressRegion: "TX",
    postalCode: "76116",
    addressCountry: "US",
    latitude: "PLACEHOLDER_LAT", // e.g. "32.7357"
    longitude: "PLACEHOLDER_LNG", // e.g. "-97.4478"
    gbpUrl: "PLACEHOLDER_GBP_URL", // Google Business Profile share URL
    mapUrl:
      "https://maps.google.com/?q=3409+Clayton+Rd+E,+Fort+Worth,+TX+76116",
  } satisfies PrimaryLocation,

  // ---- UK registered office (secondary address in schema) --------------
  // Confirmed from the live Privacy / Cookies policies (registered in Scotland).
  ukOffice: {
    streetAddress: "4 Rosedale Gardens",
    addressLocality: "Dumfries",
    addressRegion: "Scotland",
    regionCode: "Scotland",
    postalCode: "DG1 4LE",
    addressCountry: "GB",
  } satisfies PostalAddressData,

  // ---- Local SEO service areas -----------------------------------------
  // Confirmed with Graham: Fort Worth metro + Aledo.
  serviceAreas: [
    { name: "Fort Worth", type: "City" },
    { name: "Arlington", type: "City" },
    { name: "Dallas", type: "City" },
    { name: "Southlake", type: "City" },
    { name: "Grapevine", type: "City" },
    { name: "Keller", type: "City" },
    { name: "Aledo", type: "City" },
    { name: "Tarrant County", type: "AdministrativeArea" },
  ] satisfies ServiceArea[],

  // ---- Business hours --------------------------------------------------
  // PLACEHOLDER — confirm real hours or set to "by appointment" (see
  // openingHours in schema.ts; left empty here means schema omits the field).
  openingHours: [] as {
    days: string[]; // e.g. ["Monday","Tuesday",...]
    opens: string; // "09:00"
    closes: string; // "17:00"
  }[],

  priceRange: "PLACEHOLDER_PRICE_RANGE", // e.g. "$$" or "$1,500-$6,000/mo"

  // ---- Open Graph ------------------------------------------------------
  // Real per-page share cards live in /public/og (supplied in the design
  // handoff). Home card is the site-wide default used for schema and any page
  // without its own card. Open Graph tags are rendered by <SocialMeta> (see
  // src/components/SocialMeta.tsx), not the Metadata API, so Next never
  // auto-generates twitter:* tags (the business has no Twitter/X account).
  // NOTE: the supplied cards are 909x525; 1200x630 is the recommended size, so
  // a re-export at 1200x630 would render crisper (see HANDOFF.md).
  ogImage: "/og/og-home.png",
  ogImageWidth: 909,
  ogImageHeight: 525,
  ogImageAlt: "Made by Sprint, a creative agency in Fort Worth, Texas",
  logo: "/assets/sprint-logo-white.svg",
  logoSquare: "/icon.png", // square logo for schema (generated in Phase 4)

  // ---- Search Console / Bing verification ------------------------------
  verification: {
    google: "PLACEHOLDER_GSC", // Google Search Console meta content value
    bing: "PLACEHOLDER_BING", // Bing Webmaster Tools meta content value
  },

  // ---- Founder ---------------------------------------------------------
  founderProfile: {
    name: "Graham Hollinger",
    jobTitle: "Founder",
    sameAs: "PLACEHOLDER_FOUNDER_LINKEDIN", // Graham's LinkedIn profile URL
  },
} as const;

export type SiteConfig = typeof siteConfig;

/** Absolute URL for a site-relative path (handles leading slash + trailing). */
export function absoluteUrl(path = "/"): string {
  const base = siteConfig.siteUrl.replace(/\/$/, "");
  if (!path || path === "/") return base + "/";
  return base + (path.startsWith("/") ? path : `/${path}`);
}
