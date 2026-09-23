import { Eyebrow } from "../primitives";
import { PORTAL_PROBLEM } from "@/lib/portal-content";
import { sectionH2, sectionLead } from "./shared";

export default function ProblemSection() {
  return (
    <section
      className="px"
      style={{ position: "relative", zIndex: 10, maxWidth: 1360, margin: "0 auto", padding: "100px 48px 0" }}
    >
      <div style={{ maxWidth: 740, margin: "0 auto", textAlign: "center" }} data-reveal>
        <Eyebrow align="center" style={{ marginBottom: 20 }}>
          {PORTAL_PROBLEM.eyebrow}
        </Eyebrow>
        <h2 style={{ ...sectionH2, margin: "0 0 20px" }}>
          {PORTAL_PROBLEM.heading}
          <span className="s-dot">.</span>
        </h2>
        <p style={sectionLead}>{PORTAL_PROBLEM.body}</p>
      </div>
    </section>
  );
}
