// Central content for the Sprint marketing site.
// Later this can be sourced from Supabase CMS; the shapes below are the contract.

export type NavLink = { label: string; href: string };

export const NAV_LINKS: NavLink[] = [
  { label: "Services", href: "/#why" },
  { label: "Why Sprint", href: "/#why" },
  { label: "Work", href: "/#showreel" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/faq" },
];

export const CLIENT_LOGOS = Array.from(
  { length: 11 },
  (_, i) => `/assets/logos/logo${String(i + 1).padStart(2, "0")}.svg`,
);

export type ServiceChip = { label: string; icon: string };

export const SERVICE_CHIPS: ServiceChip[] = [
  { label: "Digital Marketing", icon: "/assets/icons/megaphone.svg" },
  { label: "Brand Identity", icon: "/assets/icons/palette.svg" },
  { label: "Digital & Social", icon: "/assets/icons/monitor.svg" },
  { label: "Video & Motion", icon: "/assets/icons/clapperboard.svg" },
  { label: "Print Design", icon: "/assets/icons/printer.svg" },
  { label: "Web Design", icon: "/assets/icons/app-window.svg" },
];

export type PricingPlan = {
  eyebrow: string;
  name: string;
  price: string;
  priceNote?: string;
  blurb: string;
  includesLabel: string;
  includes: string[];
  cta: { label: string; kind: "lime" | "ghost" } & (
    | { href: string }
    | { intent: string; plan?: string }
  );
  popular?: boolean;
};

export type Capability = { title: string; desc: string };

export const CAPABILITIES: Capability[] = [
  { title: "Client Portals", desc: "Professional self service experiences" },
  { title: "Workflow Automation", desc: "Reduce manual admin and repetitive tasks" },
  { title: "Team Collaboration", desc: "Everything in one shared workspace" },
  { title: "AI Assistants", desc: "Intelligent support built into your business" },
  { title: "Dashboards & Reporting", desc: "Live operational visibility" },
  { title: "Secure Documents", desc: "One source of truth for your organisation" },
  { title: "Approvals", desc: "Faster decisions with complete audit trails" },
  { title: "Integrations", desc: "Connect the tools you already use" },
  { title: "Notifications", desc: "Keep everyone informed automatically" },
];

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  img: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "It has been an absolute pleasure working with the team at Sprint. They have assisted through a large project and ensured that we stay on track with it.",
    name: "Petro Haasbroek",
    title: "[ MARKETING MANAGER, COBA ]",
    img: "/assets/testimonials/petro.webp",
  },
  {
    quote:
      "From the start of the creative process to the delivery of the final, Sprint were an exemplary creative partner.",
    name: "David Camacho",
    title: "[ COMMUNICATIONS, SIEMENS US ]",
    img: "/assets/testimonials/david.webp",
  },
  {
    quote:
      "Sprint are highly professional and quick to respond to our rapidly changing demands, with useful, value adding suggestions and editing.",
    name: "Matt Richardson",
    title: "[ H&S DIRECTOR, DALKIA ]",
    img: "/assets/testimonials/matt.webp",
  },
  {
    quote:
      "Aledo Soccer Club wouldn't have been possible without Sprint. From the logo and brand identity to sign-ups and event marketing, they helped bring everything together from day one.",
    name: "Denin Spriggs",
    title: "[ DIRECTOR, ALEDO SOCCER CLUB ]",
    img: "/assets/testimonials/denin.webp",
  },
  {
    quote:
      "Sprint helped us refresh and align the brand across multiple areas of the business. This resulted in a consistently booked-out schedule for the taco truck.",
    name: "Sarah Kerr",
    title: "[ MANAGER, TACO HEADS STOCKYARDS ]",
    img: "/assets/testimonials/sarah.webp",
  },
];

// Showreel video (Vidzflow CDN) — reused in the hero frame and the showreel player.
export const SHOWREEL_VIDEO =
  "https://r2.vidzflow.com/source/ed0f5832-15ba-4b45-9c00-74433019fddf.mp4";
