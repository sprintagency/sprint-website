// Copy and data for the Sprint Portal landing page
// (/sprint-portal-operating-system). Every word on that page lives here,
// verbatim from the approved handoff brief, so the section components stay
// presentational and the copy can be audited in one place.
//
// Org rules: no em dashes, no vendor names except integrations we ship
// (Stripe, Slack, Dropbox).

export const PORTAL_PATH = "/sprint-portal-operating-system";

export const PORTAL_LOGIN_URL = "https://portal.madebysprint.com/auth/login";

export const PORTAL_SEO = {
  title: "Sprint Portal | The bespoke agency operating system",
  description:
    "Briefs, production, review, approval, billing and retention in one operating system. Custom built for your agency by the specialist team that runs its own on it.",
};

/** Label shared by every demo button on the page. */
export const PORTAL_DEMO_LABEL = "Book a Portal Demo";

/** Contact-modal intent every demo button passes (see lib/contact-form.ts). */
export const PORTAL_DEMO_INTENT = "portal";

export const PORTAL_HERO = {
  eyebrow: "[ AGENCY OPERATING SYSTEM ]",
  /** Two lines, each ends in a lime period. */
  headline: ["Built by an agency", "For your agency"],
  lead: "Briefs, production, review, approval, billing and retention in one operating system. Custom built for your agency by the specialist team that runs its own on it.",
  secondaryLabel: "See the full feature list",
  secondaryHref: "#capabilities",
  caption: "See how it can transform your agency workflow",
  video: {
    src: "/assets/hero-animation.mp4",
    poster: "/assets/hero-dashboard-v01.webp",
    alt: "Sprint Portal dashboard",
  },
};

export const PORTAL_PROBLEM = {
  eyebrow: "[ THE PROBLEM ]",
  heading: "Your stack is the bottleneck",
  body: "A brief tool here, a project board there. Video review in one app, scripts in another, invoices in a third, and email holding it all together. Every gap between tools is where approvals stall, context gets lost, and revenue leaks.",
};

export type LifecycleStep = { number: string; title: string; body: string };

export const PORTAL_LIFECYCLE = {
  eyebrow: "[ ONE PLATFORM ]",
  heading: "Every handoff happens inside",
  steps: [
    { number: "01", title: "Onboard", body: "Tracked proposals, self-serve signup, guided setup" },
    { number: "02", title: "Submit", body: "Structured briefs, plan-aware intake" },
    { number: "03", title: "Produce", body: "Stage-based pipelines with approval gates" },
    { number: "04", title: "Approve", body: "Native review for video, scripts, images and PDFs" },
    { number: "05", title: "Bill", body: "Subscriptions, quotes, gated downloads" },
    { number: "06", title: "Retain", body: "Brand Hub, AI insights, automated nudges" },
  ] satisfies LifecycleStep[],
};

export type PortalFeatureCard = {
  image: string;
  alt: string;
  title: string;
  body: string;
};

export const PORTAL_FEATURES = {
  eyebrow: "[ WHAT YOUR CLIENTS GET ]",
  heading: "Everything between brief and delivered",
  cards: [
    {
      image: "/assets/card-new-request.webp",
      alt: "Sprint Portal new request form",
      title: "Briefs that drive production",
      body: "A structured brief becomes a stage-based pipeline automatically. Nothing gets built off a vague email.",
    },
    {
      image: "/assets/card-timeline.webp",
      alt: "Sprint Portal production pipeline",
      title: "Pipelines that match yours",
      body: "Every stage is an approval gate, and both sides always see whose move it is. Revisions happen at the cheap stage, not the expensive one.",
    },
    {
      image: "/assets/card-review.webp",
      alt: "Sprint Portal review and approval",
      title: "Review, approve, done",
      body: "Frame-accurate video comments, drawn annotations, versioned script review. Approval is an enforced gate, not a “looks good” email.",
    },
  ] satisfies PortalFeatureCard[],
  brand: {
    label: "BRAND INFRASTRUCTURE",
    heading: "The brand is live data",
    body: "A living brand hub per client: logos, palettes, fonts, voice. It compiles into every AI feature, so generated captions and copy sound like the client, not like a model.",
    image: "/assets/brand-hub-screen.webp",
    alt: "Sprint Portal Brand Hub",
    width: 1920,
    height: 1080,
  },
};

export type PortalTile = { title: string; body: string };

export const PORTAL_CAMPAIGN = {
  eyebrow: "[ CAMPAIGN SURFACE ]",
  heading: "The whole campaign, on one canvas",
  lead: "A node-based campaign map that ties goals, requests, documents and production blocks together. Linked cards are live, they always show the real status of the work itself.",
  image: "/assets/campaign-surface.webp",
  alt: "Campaign Surface, a node-based campaign map",
  width: 2400,
  height: 1131,
  tiles: [
    {
      title: "Live, not a diagram",
      body: "Cards on the canvas are the real requests and documents. Status, progress and blockers update as the work moves.",
    },
    {
      title: "Budget and workload in view",
      body: "Planned spend against budget, team workload and what is blocked, visible on the same surface as the plan.",
    },
    {
      title: "Plan fast, reuse faster",
      body: "An AI planner drafts the map, a block library fills it, and any campaign saves as a template for the next one.",
    },
  ] satisfies PortalTile[],
};

export const PORTAL_CAPABILITIES = {
  id: "capabilities",
  eyebrow: "[ AND EVERYTHING AROUND IT ]",
  heading: "The operations layer, included",
  /** Top row: what the portal itself does for the client-facing work. */
  coreLabel: "CORE PLATFORM",
  core: [
    { title: "Client review system", body: "Frame-accurate video comments, drawn annotations, versioned script and PDF review" },
    { title: "Custom pipeline builder", body: "Design stage-based pipelines per service, with an approval gate at every stage" },
    { title: "Structured brief intake", body: "Plan-aware request forms that turn every brief into a live pipeline automatically" },
    { title: "Script to storyboard AI", body: "Paste a script and the AI drafts a storyboard template from it, scene by scene, ready for the team" },
  ] satisfies PortalTile[],
  /** The operations layer around it. */
  tilesLabel: "OPERATIONS LAYER",
  tiles: [
    { title: "Payments & billing", body: "Stripe subscriptions, split-payment quotes and balance-gated downloads" },
    { title: "Role-based teams", body: "Six roles, from client sub-users to vendors. Everyone gets exactly their portal" },
    { title: "Enterprise security", body: "Database-enforced tenant isolation, encrypted secrets, full audit trails" },
    { title: "Slack, wired in", body: "Routed team channels plus direct alerts to the right staff member" },
    { title: "Automated email", body: "25 branded lifecycle templates, subjects editable in the portal" },
    { title: "Messaging built in", body: "Threads per request plus general conversations, all in one inbox" },
    { title: "Storage & delivery", body: "Organized asset libraries with Dropbox sync and shareable review links" },
    { title: "Custom integrations", body: "Calendar sync, analytics, and the tools your operation already runs on" },
  ] satisfies PortalTile[],
};

export type PortalStep = { label: string; title: string; body: string };

export const PORTAL_HOW_IT_WORKS = {
  eyebrow: "[ HOW IT WORKS ]",
  heading: "Custom, without starting from zero",
  steps: [
    { label: "STEP 01", title: "Map your workflows", body: "Discovery with our team: your services, pipelines, roles and pricing." },
    { label: "STEP 02", title: "Build on the foundation", body: "Your platform starts from the battle-tested system running Sprint today, not a blank page." },
    { label: "STEP 03", title: "Brand and tailor", body: "Your name, your domain, your service taxonomy, your plans and your tone." },
    { label: "STEP 04", title: "Launch and support", body: "Go live on your own tenant with our team behind it." },
  ] satisfies PortalStep[],
};

export const PORTAL_CTA = {
  heading: "See the live platform, not a deck",
  lead: "A 20 minute walkthrough of the production portal, mapped to how your agency works.",
};
