import type { Metadata } from "next";
import ContactView from "@/components/ContactView";

export const metadata: Metadata = {
  title: "Contact — Sprint",
  description:
    "Tell us what you need and we'll come back with a clear next step, usually within one business day.",
};

export default function ContactPage() {
  return <ContactView />;
}
