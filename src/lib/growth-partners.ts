// Growth Partner directory. Each partner gets an attributed discovery-call
// landing page at /<id> (e.g. /james-kerr, from a QR code or shared link).

export type Partner = {
  id: string;
  name: string;
  role: string;
  avatar: string;
};

export const PARTNERS: Record<string, Partner> = {
  "lara-cassas": {
    id: "lara-cassas",
    name: "Lara Cassas",
    role: "Growth Partner",
    avatar: "/assets/team/lara-cassas.webp",
  },
  "isabel-cable": {
    id: "isabel-cable",
    name: "Isabel Cable",
    role: "Growth Partner",
    avatar: "/assets/team/isabel-cable.webp",
  },
  "james-kerr": {
    id: "james-kerr",
    name: "James Kerr",
    role: "Growth Partner",
    avatar: "/assets/team/james-kerr.webp",
  },
};

export const DEFAULT_PARTNER_ID = "lara-cassas";

export function resolvePartner(slug?: string | null): Partner {
  const key = (slug || "").trim().toLowerCase().replace(/\.(html?|dc\.html)$/i, "");
  return PARTNERS[key] || PARTNERS[DEFAULT_PARTNER_ID];
}
