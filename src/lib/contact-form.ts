// Shared configuration for the contact form, used by the contact modal,
// the standalone /contact page, and the Growth Partner discovery form.

export type TopicKey =
  | "creative"
  | "ai"
  | "addon"
  | "demo"
  | "careers"
  | "freelancers"
  | "other"
  | "";

// Careers & freelancers are intentionally NOT listed here: recruit mode is only
// reachable via the footer links (data-intent="careers" / "freelancers"), not
// user-selectable in the topic picker / grid.
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
  other: null,
};

export const HEADINGS: Record<string, string> = {
  creative: "Let’s scope your creative",
  ai: "Let’s design your platform",
  addon: "Let’s scope your add-on",
  demo: "Let’s book your demo",
  careers: "Join the team",
  freelancers: "Freelance with Sprint",
  other: "Let’s talk",
};

// Careers & freelancers use a focused form: no topic picker, no budget/timeline,
// with a discipline picker + portfolio field instead.
export const isRecruit = (topic: TopicKey) =>
  topic === "careers" || topic === "freelancers";
export const DEFAULT_HEADING = "Let’s build something great";

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
