// ============================================================================
// Service registry — the canonical list of services Sprint sells.
//
// This is the single source that powers: the /fort-worth hub, Service JSON-LD,
// the sitemap, footer links, llms.txt, and cross-linking between service and
// location pages. Each service already has a bespoke, live Fort Worth landing
// page at `href`; we treat those as the canonical service+location pages
// rather than generating thin duplicates (see HANDOFF.md, Phase 9).
//
// US spelling. No em dashes.
// ============================================================================

export type ServiceFaq = { q: string; a: string };

export type Service = {
  /** Stable slug used in schema @ids and any future /services/<slug> route. */
  slug: string;
  /** Short service name, e.g. "Video Production". */
  name: string;
  /** Canonical live landing page for this service (Fort Worth). */
  href: string;
  /** One-line description used on the hub and in Service schema. */
  summary: string;
  /** Longer description used in llms-full.txt. */
  detail: string;
  /** FAQ pulled verbatim from the live service page (keeps schema in sync). */
  faqs: ServiceFaq[];
};

export const SERVICES: Service[] = [
  {
    slug: "web-design",
    name: "Web Design",
    href: "/web-design-fort-worth",
    summary:
      "Conversion-focused Webflow websites for Fort Worth businesses, designed and shipped in weeks with unlimited revisions on one monthly rate.",
    detail:
      "Strategy, design, build, and SEO handled by one team. Sites are built in Webflow for speed and easy ongoing updates, with a first draft in 7 days and most sites live in 2 to 3 weeks.",
    faqs: [
      {
        q: "How long does a website take?",
        a: "You will see a first draft within 7 days. Most sites go live in 2 to 3 weeks, depending on scope and how quickly content is ready.",
      },
      {
        q: "Do you build in Webflow?",
        a: "Yes. We build in Webflow, so there are no plugins to update and no security holes, and your team gets a fast, stable site that is easy to manage after launch.",
      },
      {
        q: "Do you work with brands outside Fort Worth?",
        a: "Absolutely. We are based in Fort Worth, Texas, and build websites for clients nationwide, managing the whole process remotely through the Sprint Client Portal.",
      },
    ],
  },
  {
    slug: "brand-identity",
    name: "Brand Identity",
    href: "/brand-identity-fort-worth",
    summary:
      "Strategic brand identity for Fort Worth businesses: positioning, logo systems, visual identity, and guidelines on a simple monthly plan.",
    detail:
      "A dedicated branding team covering positioning and brand strategy, a full logo system, color palette, typography, supporting visual assets, and clear brand guidelines that stay consistent across every platform.",
    faqs: [
      {
        q: "How long does a brand identity take?",
        a: "You will see first concepts within 7 days. A full identity, including logo system, color, type, and guidelines, is typically delivered over a few weeks depending on scope.",
      },
      {
        q: "What is included in a brand identity?",
        a: "Positioning and brand strategy, a full logo system, color palette, typography, supporting visual assets, and clear brand guidelines that keep everything consistent across every platform and team.",
      },
      {
        q: "Do you work with brands outside Fort Worth?",
        a: "Absolutely. We are based in Fort Worth, Texas, and build brands for clients nationwide, managing the full process remotely through the Sprint Client Portal.",
      },
    ],
  },
  {
    slug: "video-production",
    name: "Video Production",
    href: "/video-production-fort-worth",
    summary:
      "Animated and live-action video for Fort Worth brands on a monthly retainer: strategy, scripting, filming, animation, and editing by one team.",
    detail:
      "A bolt-on video team producing broadcast-standard results. Cinematic live action, 2D and motion graphics animation, and hybrid pieces, all produced in house. A first storyboard in 7 days, most videos finished in 4 to 5 weeks.",
    faqs: [
      {
        q: "How long does a video take to produce?",
        a: "You will see a first storyboard within 7 days. Most videos are finished in 4 to 5 weeks, with larger commercial shoots taking longer depending on scope.",
      },
      {
        q: "Do you offer both live action and animation?",
        a: "Yes. Sprint produces cinematic live action, 2D and motion graphics animation, and hybrid pieces that combine both, all in house from our Fort Worth studio.",
      },
      {
        q: "Do you work with brands outside Fort Worth?",
        a: "Absolutely. We are based in Fort Worth, Texas, and produce video for clients nationwide, managing the full process remotely through the Sprint Client Portal.",
      },
    ],
  },
  {
    slug: "social-media-management",
    name: "Social Media",
    href: "/social-media-management-fort-worth",
    summary:
      "Social media management for Fort Worth businesses: content planning, creation, posting, and engagement on one monthly rate.",
    detail:
      "Content planned, designed, and published on a consistent schedule across Instagram, Facebook, LinkedIn, TikTok, and more, plus community management and timely responses tailored to where your audience spends time.",
    faqs: [
      {
        q: "Which platforms do you manage?",
        a: "Instagram, Facebook, LinkedIn, TikTok, and more. We tailor the mix of channels to where your audience actually spends time.",
      },
      {
        q: "Do you create the content or just schedule it?",
        a: "Both. We plan, design graphics, write captions, and publish on a consistent schedule, plus manage community engagement and responses.",
      },
      {
        q: "Do you work with brands outside Fort Worth?",
        a: "Absolutely. We are based in Fort Worth, Texas, and manage social for clients nationwide, running the whole process remotely through the Sprint Client Portal.",
      },
    ],
  },
  {
    slug: "print-design",
    name: "Print Design",
    href: "/print-design-fort-worth",
    summary:
      "Professional print design for Fort Worth businesses, from concept to print-ready files, delivered fast with unlimited revisions.",
    detail:
      "Brochures, flyers, business cards, banners, signage, direct mail, sales collateral, and event materials, all custom designed for your brand and delivered print ready. First concepts within 5 working days.",
    faqs: [
      {
        q: "How long does print design take?",
        a: "You will see first concepts within 5 working days. From there we revise until it is right and hand off print ready files, with timing depending on the size of the project.",
      },
      {
        q: "What print materials do you design?",
        a: "Brochures, flyers, business cards, banners, signage, direct mail, sales collateral, and event materials, all custom designed for your brand and delivered print ready.",
      },
      {
        q: "Do you work with brands outside Fort Worth?",
        a: "Absolutely. We are based in Fort Worth, Texas, and design print materials for clients nationwide, managing the whole process remotely through the Sprint Client Portal.",
      },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
