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
          top: -320,
          right: -220,
          width: 1360,
          height: 1280,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(150,110,255,0.42) 0%,rgba(120,96,246,0.20) 40%,rgba(93,107,255,0.08) 60%,rgba(12,19,33,0) 76%)",
          pointerEvents: "none",
          filter: "blur(10px)",
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
