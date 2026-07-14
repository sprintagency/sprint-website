// Registry of indexable pages whose SEO can be edited in the mini CMS
// (/admin/seo). Each entry lists the code-level default so the editor can show
// what is currently shipping when no CMS override exists. Growth Partner pages
// are intentionally absent: they are always noindex and never editable here.

import { SERVICES } from "./services";
import { siteConfig } from "./config";

export type EditablePage = {
  path: string;
  label: string;
  defaultTitle: string;
  defaultDescription: string;
};

export const EDITABLE_PAGES: EditablePage[] = [
  {
    path: "/",
    label: "Home",
    defaultTitle: siteConfig.defaultTitle,
    defaultDescription: siteConfig.defaultDescription,
  },
  {
    path: "/fort-worth",
    label: "Fort Worth hub",
    defaultTitle: "Creative Agency in Fort Worth, Texas",
    defaultDescription:
      "Sprint is a creative agency in Fort Worth, Texas. Brand, web design, video, social, and print on one flat monthly retainer.",
  },
  ...SERVICES.map((s) => ({
    path: s.href,
    label: `${s.name} (Fort Worth)`,
    defaultTitle: `${s.name} in Fort Worth, Texas`,
    defaultDescription: s.summary,
  })),
  {
    path: "/faq",
    label: "FAQ",
    defaultTitle: "FAQ",
    defaultDescription:
      "Frequently asked questions about working with Sprint Creative Agency.",
  },
  {
    path: "/contact",
    label: "Contact",
    defaultTitle: "Contact",
    defaultDescription:
      "Contact Sprint Creative Agency, a creative agency in Fort Worth, Texas.",
  },
  {
    path: "/terms",
    label: "Terms & Conditions",
    defaultTitle: "Terms & Conditions",
    defaultDescription:
      "The terms and conditions governing Sprint's subscription-based creative services.",
  },
  {
    path: "/privacy",
    label: "Privacy Policy",
    defaultTitle: "Privacy Policy",
    defaultDescription:
      "How Hollinger Creative LTD (trading as Sprint) collects, uses and protects your personal data.",
  },
  {
    path: "/cookies",
    label: "Cookies Policy",
    defaultTitle: "Cookies Policy",
    defaultDescription:
      "How Hollinger Creative LTD (trading as Sprint) uses cookies and similar technologies.",
  },
];
