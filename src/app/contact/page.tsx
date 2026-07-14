import type { Metadata } from "next";
import ContactView from "@/components/ContactView";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/metadata";
import SocialMeta from "@/components/SocialMeta";
import { graph, breadcrumbSchema } from "@/lib/seo/schema";

const SEO = {
  path: "/contact",
  image: "/og/og-contact.png",
  title: "Contact",
  description:
    "Contact Sprint Creative Agency, a creative agency in Fort Worth, Texas. Tell us what you need and we'll come back with a clear next step, usually within one business day.",
};

export function generateMetadata(): Promise<Metadata> {
  return buildMetadata(SEO);
}

export default function ContactPage() {
  return (
    <>
      <SocialMeta {...SEO} />
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        )}
      />
      <ContactView />
    </>
  );
}
