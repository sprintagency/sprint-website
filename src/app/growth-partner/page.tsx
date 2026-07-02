import type { Metadata } from "next";
import GrowthPartnerView from "@/components/GrowthPartnerView";
import { resolvePartner } from "@/lib/growth-partners";

export const metadata: Metadata = {
  title: "Book a discovery call — Sprint",
  description:
    "Tell us about your business and the Sprint team will be in touch within one business day.",
};

export default function GrowthPartnerPage() {
  return <GrowthPartnerView partner={resolvePartner()} />;
}
