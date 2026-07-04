import type { Metadata } from "next";
import ContactView from "@/components/ContactView";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo/metadata";
import { graph, breadcrumbSchema } from "@/lib/seo/schema";

export function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    path: "/contact",
    title: "Contact",
    description:
      "Contact Made by Sprint, a creative agency in Fort Worth, Texas. Tell us what you need and we'll come back with a clear next step, usually within one business day.",
  });
}

export default function ContactPage() {
  return (
    <>
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
