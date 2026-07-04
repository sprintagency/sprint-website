import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";
import JsonLd from "@/components/JsonLd";
import { Eyebrow, CtaArrow } from "@/components/primitives";
import { buildMetadata } from "@/lib/seo/metadata";
import { graph, faqSchema, breadcrumbSchema } from "@/lib/seo/schema";

export function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    path: "/faq",
    image: "/og/og-faq.png",
    title: "FAQ",
    description:
      "Frequently asked questions about working with Made by Sprint: how the monthly retainer works, what is included, turnaround times, and getting started.",
  });
}

const FAQS: { q: string; a: string }[] = [
  {
    q: "Who is Sprint for?",
    a: "Growing service businesses, founders, and startups that need fast, consistent creative output without the cost or complexity of building an in house team.",
  },
  {
    q: "What's included in the retainer?",
    a: "All plans cover branding and visual identity, Webflow web design, social media content and management, and print design. The business plan adds animated and live action video production. Every plan includes unlimited requests, 24 hour response time, and a monthly strategy call.",
  },
  {
    q: "How do we get started?",
    a: "Choose a plan, onboard your brand, submit your first request, and we get to work. Simple from day one.",
  },
  {
    q: "How does the retainer work?",
    a: "You get a dedicated creative team for one flat monthly fee. Submit requests through the Sprint Client Portal and we work through them in order, one or two active tasks at a time depending on your plan.",
  },
  {
    q: 'What is an "active task"?',
    a: "An active task is any request currently in production. A logo, a landing page, a social post, a video edit. The startup plan runs one at a time, the business plan runs two. As each task is approved, the next one begins.",
  },
  {
    q: "Is there a limit on requests?",
    a: "No. Submit as many requests as you need and we work through them in your queue. There's no cap on output over the course of your engagement.",
  },
  {
    q: "How fast is turnaround?",
    a: "We respond to every request within 24 hours. Most design and content requests are delivered within a few days. Larger projects like websites, branding systems, and video will take longer depending on complexity.",
  },
  {
    q: "Can I request a specific deadline?",
    a: "Yes. Flag your deadline in the Sprint Client Portal and your account manager will confirm whether it can be met. We'll always be upfront about what's realistic.",
  },
  {
    q: "Do unused tasks roll over?",
    a: "No. The retainer isn't a credit system so unused capacity doesn't carry over. Consistent use of your queue is where you get the most from the engagement.",
  },
  {
    q: "Do you manage social media accounts?",
    a: "Yes. We handle content creation, captions, scheduling, and posting across your platforms.",
  },
  {
    q: "Do you only build on Webflow?",
    a: "Yes. We build exclusively on Webflow for its design quality, performance, and how easy it makes ongoing updates for clients.",
  },
  {
    q: "What's the minimum contract length?",
    a: "All plans run on a minimum 6 month engagement. That's enough time to build real momentum, understand your brand, and deliver work that makes a lasting difference.",
  },
];

export default function FaqPage() {
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
      <div
        style={{
          position: "absolute",
          top: -260,
          right: -160,
          width: 1100,
          height: 1100,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(93,107,255,0.28) 0%,rgba(138,92,255,0.10) 38%,rgba(0,200,255,0.06) 58%,rgba(12,19,33,0) 74%)",
          pointerEvents: "none",
          filter: "blur(4px)",
          zIndex: 0,
        }}
      />

      <Header />

      <JsonLd
        data={graph(
          faqSchema(FAQS),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "FAQ", path: "/faq" },
          ]),
        )}
      />

      <section
        id="faq"
        className="px"
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 1360,
          margin: "0 auto",
          padding: "150px 48px 130px",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 56px" }}>
          <Eyebrow style={{ marginBottom: 20 }}>[ WORKING WITH US ]</Eyebrow>
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "clamp(34px,4.4vw,58px)",
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            Frequently asked questions<span className="s-dot">.</span>
          </h2>
        </div>

        <div
          style={{
            maxWidth: 840,
            margin: "0 auto",
            borderTop: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          {FAQS.map((f, i) => (
            <details
              key={i}
              className="faq-item"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.12)" }}
            >
              <summary
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 24,
                  padding: "26px 4px",
                }}
              >
                <span
                  className="faq-q"
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                    color: "rgba(255,255,255,0.88)",
                  }}
                >
                  {f.q}
                </span>
                <span
                  className="faq-plus"
                  style={{
                    flex: "none",
                    fontSize: 24,
                    color: "var(--sprint-lime)",
                    transition: "transform 0.28s cubic-bezier(0.22,1,0.36,1)",
                    lineHeight: 1,
                  }}
                >
                  +
                </span>
              </summary>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.65,
                  color: "rgba(255,255,255,0.6)",
                  margin: 0,
                  padding: "0 4px 28px",
                  maxWidth: 720,
                }}
              >
                {f.a}
              </p>
            </details>
          ))}
        </div>

        <div style={{ textAlign: "center", margin: "64px auto 0", maxWidth: 520 }}>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.6)",
              margin: "0 0 22px",
            }}
          >
            Still have a question? We&rsquo;ll get you an answer fast.
          </p>
          <a
            className="cta cta-lime"
            href="#"
            data-open-contact="1"
            data-intent="demo"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              background: "var(--sprint-lime)",
              color: "#0c1321",
              textDecoration: "none",
              fontSize: 15,
              fontWeight: 600,
              padding: "14px 24px",
              borderRadius: 4,
            }}
          >
            Book a Demo
            <CtaArrow dark />
          </a>
        </div>
      </section>

      <Footer />
      <ContactModal />
    </div>
  );
}
