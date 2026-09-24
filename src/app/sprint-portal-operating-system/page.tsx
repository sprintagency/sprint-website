import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";
import ScrollEffects from "@/components/ScrollEffects";
import JsonLd from "@/components/JsonLd";
import SocialMeta from "@/components/SocialMeta";
import PortalHero from "@/components/portal/PortalHero";
import ProblemSection from "@/components/portal/ProblemSection";
import LifecycleStrip from "@/components/portal/LifecycleStrip";
import PortalFeatures from "@/components/portal/PortalFeatures";
import CampaignSurface from "@/components/portal/CampaignSurface";
import CapabilitiesGrid from "@/components/portal/CapabilitiesGrid";
import HowItWorks from "@/components/portal/HowItWorks";
import PortalCTA from "@/components/portal/PortalCTA";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, graph, webPageSchema } from "@/lib/seo/schema";
import { PORTAL_PATH, PORTAL_SEO } from "@/lib/portal-content";

/* Sprint Portal landing page: sells the bespoke agency operating system to
   other agencies and drives one action, Book a Portal Demo. Copy lives in
   lib/portal-content.ts; sections in components/portal/. */

// OG image: the site default card for now. Drop a designed 1200x630 card into
// public/og/ and add `image: "/og/og-sprint-portal.png"` here to switch.
const SEO = {
  path: PORTAL_PATH,
  title: PORTAL_SEO.title,
  description: PORTAL_SEO.description,
};

export function generateMetadata(): Promise<Metadata> {
  return buildMetadata(SEO);
}

export default function SprintPortalPage() {
  return (
    <div
      className="portal-page"
      style={{
        background: "#0c1321",
        color: "#ffffff",
        fontFamily: "var(--font-sans)",
        minHeight: "100vh",
        overflowX: "clip",
        position: "relative",
      }}
    >
      <JsonLd
        data={graph(
          webPageSchema({
            path: PORTAL_PATH,
            name: PORTAL_SEO.title,
            description: PORTAL_SEO.description,
            speakableSelectors: [".portal-hero-h1", ".portal-hero-lead"],
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Sprint Portal", path: PORTAL_PATH },
          ]),
        )}
      />

      <SocialMeta {...SEO} />
      <Header variant="portal" />
      <main>
        <PortalHero />
        <ProblemSection />
        <LifecycleStrip />
        <PortalFeatures />
        <CampaignSurface />
        <CapabilitiesGrid />
        <HowItWorks />
        <PortalCTA />
      </main>
      <Footer />

      <ContactModal />
      <ScrollEffects />
    </div>
  );
}
