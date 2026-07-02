import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GrowthPartnerView from "@/components/GrowthPartnerView";
import { PARTNERS, resolvePartner } from "@/lib/growth-partners";

// Partner discovery pages live at the root as /<slug> (e.g. /james-kerr).
// Only the known partner slugs are valid; any other top-level path 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(PARTNERS).map((partner) => ({ partner }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ partner: string }>;
}): Promise<Metadata> {
  const { partner } = await params;
  if (!PARTNERS[partner.toLowerCase()]) return {};
  const p = resolvePartner(partner);
  return {
    title: `Book a discovery call with ${p.name} — Sprint`,
    description:
      "Tell us about your business and your Sprint growth partner will be in touch within one business day.",
  };
}

export default async function PartnerPage({
  params,
}: {
  params: Promise<{ partner: string }>;
}) {
  const { partner } = await params;
  if (!PARTNERS[partner.toLowerCase()]) notFound();
  return <GrowthPartnerView partner={resolvePartner(partner)} />;
}
