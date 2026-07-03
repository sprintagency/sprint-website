import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhySection from "@/components/WhySection";
import Showreel from "@/components/Showreel";
import Pricing from "@/components/Pricing";
import Addons from "@/components/Addons";
import PlatformSection from "@/components/PlatformSection";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";
import ScrollEffects from "@/components/ScrollEffects";

export default function Home() {
  return (
    <div
      style={{
        background: "#0c1321",
        color: "#ffffff",
        fontFamily: "var(--font-sans)",
        minHeight: "100vh",
        overflowX: "clip",
        position: "relative",
      }}
    >
      {/* ambient glow behind the whole page */}
      <div
        style={{
          position: "absolute",
          top: -260,
          right: -160,
          width: 1100,
          height: 1100,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(93,107,255,0.28) 0%,rgba(138,92,255,0.11) 34%,rgba(0,200,255,0.10) 56%,rgba(12,19,33,0) 74%)",
          pointerEvents: "none",
          filter: "blur(4px)",
          zIndex: 0,
        }}
      />

      <Header />
      <Hero />
      <WhySection />
      <Showreel />
      <Pricing />
      <Addons />
      <PlatformSection />
      <Testimonials />
      <Footer />

      <ContactModal />
      <ScrollEffects />
    </div>
  );
}
