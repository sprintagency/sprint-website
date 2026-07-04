// ============================================================================
// JSON-LD structured-data builders.
//
// Pure functions that return plain objects, serialized into a
// <script type="application/ld+json"> by the <JsonLd> component. Every builder
// only emits fields backed by real data (placeholders are stripped), so we
// never ship a fake address, phone, coordinate, or hours to a crawler.
//
// Shared @id values let nodes reference each other cleanly:
//   #organization  -> the business (Organization + LocalBusiness + ProfessionalService)
//   #website       -> the WebSite
//   #founder       -> Graham Hollinger (Person)
// ============================================================================

import { siteConfig, absoluteUrl, real, isPlaceholder } from "./config";
import { SERVICES, type Service } from "./services";

const ORG_ID = `${siteConfig.siteUrl}/#organization`;
const WEBSITE_ID = `${siteConfig.siteUrl}/#website`;
const FOUNDER_ID = `${siteConfig.siteUrl}/#founder`;

/** Social URLs that are actually filled in (placeholders removed). */
function realSocials(): string[] {
  return siteConfig.socialProfiles.filter((u) => !isPlaceholder(u));
}

/** Fort Worth PostalAddress node. */
function primaryPostalAddress() {
  const l = siteConfig.primaryLocation;
  return {
    "@type": "PostalAddress",
    streetAddress: l.streetAddress,
    addressLocality: l.addressLocality,
    addressRegion: l.addressRegion,
    postalCode: l.postalCode,
    addressCountry: l.addressCountry,
  };
}

/** UK registered office, only if its fields are real. */
function ukPostalAddress() {
  const u = siteConfig.ukOffice;
  if (isPlaceholder(u.streetAddress) || isPlaceholder(u.postalCode)) return null;
  return {
    "@type": "PostalAddress",
    streetAddress: u.streetAddress,
    addressLocality: u.addressLocality,
    addressRegion: isPlaceholder(u.addressRegion) ? undefined : u.addressRegion,
    postalCode: u.postalCode,
    addressCountry: u.addressCountry,
  };
}

function areaServed() {
  return siteConfig.serviceAreas.map((a) => ({
    "@type": a.type,
    name: a.name,
  }));
}

function openingHoursSpecification() {
  if (!siteConfig.openingHours.length) return undefined;
  return siteConfig.openingHours.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.days,
    opens: h.opens,
    closes: h.closes,
  }));
}

/**
 * The business entity. Typed as Organization + LocalBusiness +
 * ProfessionalService so it satisfies both org-level and local-pack signals
 * from a single, de-duplicated node (@id ORG_ID).
 */
export function organizationSchema() {
  const geo =
    !isPlaceholder(siteConfig.primaryLocation.latitude) &&
    !isPlaceholder(siteConfig.primaryLocation.longitude)
      ? {
          "@type": "GeoCoordinates",
          latitude: siteConfig.primaryLocation.latitude,
          longitude: siteConfig.primaryLocation.longitude,
        }
      : undefined;

  const uk = ukPostalAddress();

  return prune({
    "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
    "@id": ORG_ID,
    name: siteConfig.siteName,
    legalName: siteConfig.legalName,
    alternateName: siteConfig.shortName,
    url: absoluteUrl("/"),
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(siteConfig.logo),
    },
    image: absoluteUrl(siteConfig.ogImage),
    description: siteConfig.defaultDescription,
    foundingDate: siteConfig.foundingYear,
    founder: { "@id": FOUNDER_ID },
    // Fort Worth is primary; UK office added as a second address when known.
    address: uk ? [primaryPostalAddress(), uk] : primaryPostalAddress(),
    geo,
    hasMap: real(siteConfig.primaryLocation.gbpUrl) || siteConfig.primaryLocation.mapUrl,
    areaServed: areaServed(),
    openingHoursSpecification: openingHoursSpecification(),
    priceRange: real(siteConfig.priceRange),
    telephone: real(siteConfig.contact.phone),
    email: siteConfig.contact.email,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: siteConfig.contact.email,
      telephone: real(siteConfig.contact.phone),
      areaServed: ["US", "GB"],
      availableLanguage: ["en"],
    },
    sameAs: realSocials(),
  });
}

/** Graham Hollinger, for E-E-A-T / founder signals. */
export function founderSchema() {
  return prune({
    "@type": "Person",
    "@id": FOUNDER_ID,
    name: siteConfig.founderProfile.name,
    jobTitle: siteConfig.founderProfile.jobTitle,
    worksFor: { "@id": ORG_ID },
    sameAs: real(siteConfig.founderProfile.sameAs),
  });
}

/**
 * WebSite node. No SearchAction: the site has no search endpoint, so we omit
 * the sitelinks search box rather than pointing at a dead URL.
 */
export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: absoluteUrl("/"),
    name: siteConfig.siteName,
    description: siteConfig.defaultDescription,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
  };
}

export type Crumb = { name: string; path: string };

/** BreadcrumbList reflecting the real URL hierarchy. */
export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

/** Service node, provided by the Organization. */
export function serviceSchema(service: Service) {
  return prune({
    "@type": "Service",
    "@id": `${siteConfig.siteUrl}${service.href}#service`,
    serviceType: service.name,
    name: `${service.name} in Fort Worth, Texas`,
    description: service.summary,
    url: absoluteUrl(service.href),
    provider: { "@id": ORG_ID },
    areaServed: areaServed(),
    // Retainer-based, priced monthly; only emit if we have a real range.
    ...(real(siteConfig.priceRange)
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "USD",
            priceRange: siteConfig.priceRange,
          },
        }
      : {}),
  });
}

/** FAQPage built from the same Q&A rendered on the page (never drifts). */
export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/**
 * SpeakableSpecification fragment, attached to the most quotable summary
 * section of a page via CSS selectors. Pass the selectors that mark the
 * lead answer paragraph(s).
 */
export function speakable(cssSelectors: string[]) {
  return {
    "@type": "SpeakableSpecification",
    cssSelector: cssSelectors,
  };
}

/**
 * WebPage node, optionally with a SpeakableSpecification pointing at the most
 * quotable summary selectors on the page.
 */
export function webPageSchema(input: {
  path: string;
  name: string;
  description?: string;
  speakableSelectors?: string[];
}) {
  return prune({
    "@type": "WebPage",
    "@id": `${siteConfig.siteUrl}${input.path === "/" ? "" : input.path}#webpage`,
    url: absoluteUrl(input.path),
    name: input.name,
    description: input.description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    inLanguage: "en-US",
    speakable: input.speakableSelectors?.length
      ? speakable(input.speakableSelectors)
      : undefined,
  });
}

/** Article / BlogPosting (available for a future blog). */
export function articleSchema(a: {
  headline: string;
  description?: string;
  path: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
}) {
  return prune({
    "@type": "BlogPosting",
    headline: a.headline,
    description: a.description,
    url: absoluteUrl(a.path),
    mainEntityOfPage: absoluteUrl(a.path),
    image: a.image ? absoluteUrl(a.image) : undefined,
    datePublished: a.datePublished,
    dateModified: a.dateModified || a.datePublished,
    author: a.authorName
      ? { "@type": "Person", name: a.authorName }
      : { "@id": FOUNDER_ID },
    publisher: { "@id": ORG_ID },
  });
}

/**
 * Wraps one or more nodes in a single @graph document with @context, so a page
 * emits one clean, cross-referenced JSON-LD block.
 */
export function graph(...nodes: (object | null | undefined)[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.filter(Boolean),
  };
}

/** Convenience: the site-wide nodes present on every page. */
export function baseGraph() {
  return [organizationSchema(), founderSchema(), websiteSchema()];
}

export const ALL_SERVICES = SERVICES;

/** Recursively remove undefined / empty-array / empty-string values. */
function prune<T>(obj: T): T {
  if (Array.isArray(obj)) {
    const arr = obj
      .map((v) => (v && typeof v === "object" ? prune(v) : v))
      .filter((v) => v !== undefined && v !== null);
    return arr as unknown as T;
  }
  if (obj && typeof obj === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
      if (v === undefined || v === null) continue;
      if (typeof v === "string" && v.trim() === "") continue;
      if (Array.isArray(v) && v.length === 0) continue;
      out[k] = v && typeof v === "object" ? prune(v) : v;
    }
    return out as T;
  }
  return obj;
}
