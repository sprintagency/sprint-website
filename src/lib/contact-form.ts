// Shared configuration for the contact form, used by the contact modal,
// the standalone /contact page, and the Growth Partner discovery form.

export type TopicKey = "creative" | "ai" | "addon" | "demo" | "other" | "";

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
  demo: null,
  other: null,
};

export const HEADINGS: Record<string, string> = {
  creative: "Let’s scope your creative",
  ai: "Let’s design your platform",
  addon: "Let’s scope your add-on",
  demo: "Let’s book your demo",
  other: "Let’s talk",
};
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
    default:
      return { topic: "", detail: "" };
  }
}
