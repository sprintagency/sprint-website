// Shared configuration for the contact form, used by the contact modal,
// the standalone /contact page, and the Growth Partner discovery form.

export type TopicKey =
  | "creative"
  | "ai"
  | "addon"
  | "demo"
  | "careers"
  | "freelancers"
  | "portal"
  | "other"
  | "";

// Careers, freelancers and portal are intentionally NOT listed here. Recruit
// mode is only reachable via the footer links (data-intent="careers" /
// "freelancers"), and the portal lead form only via the Sprint Portal landing
// page (data-intent="portal"). None of them is user-selectable in the picker,
// and once in one of those modes the visitor cannot switch to another topic.
export const TOPIC_OPTIONS: { value: Exclude<TopicKey, "">; label: string }[] = [
  { value: "creative", label: "Creative plan" },
  { value: "ai", label: "AI solution" },
  { value: "addon", label: "Add-on service" },
  { value: "demo", label: "Book a demo" },
  { value: "other", label: "Something else" },
];

export const DETAILS: Record<string, { label: string; options: string[] } | null> = {
  creative: { label: "Which plan?", options: ["Starter", "Growth", "Scale", "Not sure yet"] },
  ai: {
    label: "What kind?",
    options: ["AI consultation", "Custom platform build", "Workflow & automation", "Not sure yet"],
  },
  addon: { label: "Which service?", options: ["Digital Marketing", "Social Media Management", "Other"] },
  careers: {
    label: "Area of interest",
    options: ["Design", "Video & Motion", "Web & Development", "Social & Content", "Strategy & Accounts", "Something else"],
  },
  freelancers: {
    label: "Your discipline",
    options: ["Design", "Video & Motion", "Web & Development", "Social & Content", "Copywriting", "Illustration", "Something else"],
  },
  demo: null,
  portal: null,
  other: null,
};

export const HEADINGS: Record<string, string> = {
  creative: "Let’s scope your creative",
  ai: "Let’s design your platform",
  addon: "Let’s scope your add-on",
  demo: "Let’s book your demo",
  careers: "Join the team",
  freelancers: "Freelance with Sprint",
  portal: "Let’s book your Portal demo",
  other: "Let’s talk",
};

// Careers & freelancers use a focused form: no topic picker, no budget/timeline,
// with a discipline picker + portfolio field instead.
export const isRecruit = (topic: TopicKey) =>
  topic === "careers" || topic === "freelancers";

// The Sprint Portal lead form: no topic picker, no plan detail, no retainer
// budget. Step 2 asks for agency size (stored in `detail`) and timeline.
export const isPortal = (topic: TopicKey) => topic === "portal";

export const PORTAL_TEAM_SIZES = [
  "Just me",
  "2 to 5 people",
  "6 to 15 people",
  "16 to 50 people",
  "More than 50 people",
];

export const DEFAULT_HEADING = "Let’s build something great";

// Intro line under the heading, keyed by topic. Only modes a visitor cannot
// switch out of get their own line; everything else uses the default.
export const DEFAULT_INTRO =
  "Tell us what you need and we’ll come back with a clear next step, usually within one business day.";
export const INTROS: Record<string, string> = {
  portal:
    "Tell us a little about your agency and we’ll set up a 20 minute walkthrough of the live platform, usually within one business day.",
};

export const BUDGETS = [
  "Under $5k/mo",
  "$5k-$10k/mo",
  "$10k-$25k/mo",
  "$25k+/mo",
  "One-off project",
  "Not sure yet",
];

export const TIMELINES = ["ASAP", "1-3 months", "3-6 months", "Just exploring"];

export const cap = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
export const validEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

/**
 * Maps a CTA intent (and optional plan/service) to a starting topic + detail,
 * matching the smart pre-fill in the design export.
 */
export function resolveIntent(
  intent?: string | null,
  plan?: string | null,
  service?: string | null,
): { topic: TopicKey; detail: string } {
  const it = (intent || "").toLowerCase();
  switch (it) {
    case "demo":
      return { topic: "demo", detail: "" };
    // Sprint Portal landing page: the locked portal lead form.
    case "portal":
      return { topic: "portal", detail: "" };
    case "plan":
      return { topic: "creative", detail: cap(plan || "") };
    case "creative":
      return { topic: "creative", detail: "" };
    case "ai-platform":
      return { topic: "ai", detail: "Custom platform build" };
    case "ai-consultation":
      return { topic: "ai", detail: "AI consultation" };
    case "ai":
      return { topic: "ai", detail: "" };
    case "addon":
      return { topic: "addon", detail: service || "" };
    case "careers":
      return { topic: "careers", detail: "" };
    case "freelancers":
      return { topic: "freelancers", detail: "" };
    default:
      return { topic: "", detail: "" };
  }
}
