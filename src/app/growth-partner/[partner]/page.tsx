import type { Metadata } from "next";
import GrowthPartnerView from "@/components/GrowthPartnerView";
import { PARTNERS, resolvePartner } from "@/lib/growth-partners";

export function generateStaticParams() {
  return Object.keys(PARTNERS).map((partner) => ({ partner }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ partner: string }>;
}): Promise<Metadata> {
  const { partner } = await params;
  const p = resolvePartner(partner);
  return {
    title: `Book a discovery call with ${p.name} — Sprint`,
    description:
      "Tell us about your business and your Sprint growth partner will be in touch within one business day.",
  };
}

export default async function GrowthPartnerSlugPage({
  params,
}: {
  params: Promise<{ partner: string }>;
}) {
  const { partner } = await params;
  return <GrowthPartnerView partner={resolvePartner(partner)} />;
}
