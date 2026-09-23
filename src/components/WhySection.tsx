import FeatureCard from "./FeatureCard";
import { Eyebrow } from "./primitives";

const avatarShadow =
  "0 0 0 2px rgba(12,18,40,0.95),0 0 0 3.5px rgba(255,255,255,0.15)";

export default function WhySection() {
  return (
    <section
      id="why"
      className="px"
      style={{
        position: "relative",
        zIndex: 10,
        maxWidth: 1360,
        margin: "0 auto",
        padding: "96px 48px 40px",
      }}
    >
      <div
        style={{
          maxWidth: 780,
          margin: "0 auto 52px",
          textAlign: "center",
        }}
      >
        <Eyebrow style={{ marginBottom: 20 }}>[ THE PLATFORM ]</Eyebrow>
        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: "clamp(30px,3.6vw,46px)",
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            margin: 0,
          }}
        >
          Everything a creative department is<span className="s-dot">.</span>{" "}
          None of the overhead<span className="s-dot">.</span>
        </h2>
      </div>

      <div
        className="why-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 24,
        }}
      >
        {/* Card 1 — senior team avatar cluster */}
        <FeatureCard
          title="A senior team on demand"
          body="Brand, digital, print and video specialists working as your department, with no recruiting or overhead."
          media={
            <div
              style={{
                position: "relative",
                zIndex: 1,
                height: 180,
                marginBottom: 26,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                className="avatar-cluster"
                style={{ display: "flex", alignItems: "center" }}
              >
                {/* eslint-disable @next/next/no-img-element */}
                <img
                  src="/assets/team/skye.webp"
                  alt="Skye"
                  width={200}
                  height={200}
                  loading="lazy"
                  style={{
                    width: 76,
                    height: 76,
                    borderRadius: "50%",
                    objectFit: "cover",
                    boxShadow: avatarShadow,
                    marginTop: 12,
                    zIndex: 2,
                    animation: "floatB 7s ease-in-out 0s infinite",
                  }}
                />
                <img
                  src="/assets/team/graham.webp"
                  alt="Graham"
                  width={200}
                  height={200}
                  loading="lazy"
                  style={{
                    width: 76,
                    height: 76,
                    borderRadius: "50%",
                    objectFit: "cover",
                    boxShadow: avatarShadow,
                    marginLeft: -12,
                    marginTop: -12,
                    zIndex: 4,
                    animation: "floatA 7.6s ease-in-out 0.5s infinite",
                  }}
                />
                <img
                  src="/assets/team/trae.webp"
                  alt="Trae"
                  width={200}
                  height={200}
                  loading="lazy"
                  style={{
                    width: 76,
                    height: 76,
                    borderRadius: "50%",
                    objectFit: "cover",
                    boxShadow: avatarShadow,
                    marginLeft: -12,
                    marginTop: 10,
                    zIndex: 5,
                    animation: "floatB 8.3s ease-in-out 1s infinite",
                  }}
                />
                <img
                  src="/assets/team/can.webp"
                  alt="Can"
                  width={200}
                  height={200}
                  loading="lazy"
                  style={{
                    width: 76,
                    height: 76,
                    borderRadius: "50%",
                    objectFit: "cover",
                    boxShadow: avatarShadow,
                    marginLeft: -12,
                    marginTop: -12,
                    zIndex: 3,
                    animation: "floatA 6.6s ease-in-out 0.3s infinite",
                  }}
                />
                <img
                  src="/assets/team/jamie.webp"
                  alt="Jamie"
                  width={200}
                  height={200}
                  loading="lazy"
                  style={{
                    width: 76,
                    height: 76,
                    borderRadius: "50%",
                    objectFit: "cover",
                    boxShadow: avatarShadow,
                    marginLeft: -12,
                    marginTop: 12,
                    zIndex: 1,
                    animation: "floatB 7.9s ease-in-out 0.8s infinite",
                  }}
                />
                {/* eslint-enable @next/next/no-img-element */}
              </div>
            </div>
          }
        />

        {/* Card 2 */}
        <FeatureCard
          title="Delivered in days, not weeks"
          body="Submit unlimited requests and we turn them around fast, one after another, so your marketing never waits on creative."
          image={{ src: "/assets/card-new-request.webp", alt: "Sprint new request" }}
        />

        {/* Card 3 */}
        <FeatureCard
          title="One platform to run it all"
          body="Track projects, review deliverables, message the team and manage every brand asset in one workspace, built around you."
          image={{ src: "/assets/card-review.webp", alt: "Sprint deliverable review" }}
        />
      </div>
    </section>
  );
}
