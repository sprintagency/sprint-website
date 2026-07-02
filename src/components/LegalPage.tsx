import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";

type LegalPageProps = {
  title: string;
  lastUpdated: string;
  /** Pre-sanitised legal body HTML from the design export. */
  bodyHtml: string;
};

export default function LegalPage({ title, lastUpdated, bodyHtml }: LegalPageProps) {
  return (
    <div
      style={{
        background: "#0c1321",
        color: "#ffffff",
        fontFamily: "var(--font-sans)",
        minHeight: "100vh",
        position: "relative",
        overflowX: "clip",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -260,
          right: -160,
          width: 1000,
          height: 1000,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(93,107,255,0.22) 0%,rgba(138,92,255,0.09) 40%,rgba(12,19,33,0) 72%)",
          pointerEvents: "none",
          filter: "blur(4px)",
          zIndex: 0,
        }}
      />

      <Header />

      <main
        className="legal-main px"
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 820,
          margin: "0 auto",
          padding: "150px 48px 90px",
        }}
      >
        <div className="s-eyebrow" style={{ color: "var(--sprint-lime)", marginBottom: 20 }}>
          [ LEGAL ]
        </div>
        <h1
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: "clamp(38px,5vw,58px)",
            lineHeight: 1.0,
            letterSpacing: "-0.035em",
            margin: "0 0 16px",
          }}
        >
          {title}
          <span className="s-dot">.</span>
        </h1>
        <p
          className="s-mono"
          style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", margin: "0 0 44px" }}
        >
          {lastUpdated}
        </p>
        <div className="legal" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      </main>

      <Footer />
      <ContactModal />
    </div>
  );
}
