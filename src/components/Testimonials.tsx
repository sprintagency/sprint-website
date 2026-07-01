"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TESTIMONIALS } from "@/lib/site-content";
import { Eyebrow } from "./primitives";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const stackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const lastRef = useRef(0);
  const indexRef = useRef(index);
  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  const n = TESTIMONIALS.length;
  const goTo = useCallback(
    (i: number) => {
      setIndex(((i % n) + n) % n);
      lastRef.current = Date.now();
    },
    [n],
  );

  // Fix the stack height to the tallest slide so absolute slides don't collapse.
  useEffect(() => {
    const fix = () => {
      const stack = stackRef.current;
      if (!stack) return;
      let max = 0;
      stack.querySelectorAll<HTMLElement>(".testi-slide").forEach((sl) => {
        max = Math.max(max, sl.offsetHeight);
      });
      if (max > 0) stack.style.height = max + "px";
    };
    fix();
    const t = setTimeout(fix, 150);
    if (document.fonts?.ready) document.fonts.ready.then(fix);
    window.addEventListener("resize", fix, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", fix);
    };
  }, []);

  // Auto-advance every ~5.2s, paused on hover.
  useEffect(() => {
    lastRef.current = Date.now();
    const timer = setInterval(() => {
      if (pausedRef.current) return;
      if (Date.now() - lastRef.current < 5200) return;
      goTo(indexRef.current + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [goTo]);

  return (
    <section
      id="testimonials"
      className="px"
      style={{
        position: "relative",
        zIndex: 10,
        overflow: "hidden",
        padding: "110px 48px 120px",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 1100,
            height: 760,
            maxWidth: "90vw",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse,rgba(93,107,255,0.20),rgba(138,92,255,0.08) 45%,transparent 72%)",
            filter: "blur(18px)",
          }}
        />
      </div>

      <div style={{ position: "relative", zIndex: 2, maxWidth: 960, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <Eyebrow style={{ marginBottom: 20 }}>[ WHAT CLIENTS SAY ]</Eyebrow>
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
            Trusted by the teams we work with<span className="s-dot">.</span>
          </h2>
        </div>

        <div
          className="testi-row"
          style={{ display: "flex", alignItems: "center", gap: 22 }}
          onMouseEnter={() => (pausedRef.current = true)}
          onMouseLeave={() => (pausedRef.current = false)}
        >
          <button
            onClick={() => goTo(index - 1)}
            aria-label="Previous"
            className="testi-arrow"
            style={arrowStyle}
          >
            <span
              style={{
                width: 18,
                height: 18,
                transform: "rotate(180deg)",
                background: "rgba(255,255,255,0.8)",
                WebkitMask:
                  "url(/assets/icons/arrow-right.svg) center/contain no-repeat",
                mask: "url(/assets/icons/arrow-right.svg) center/contain no-repeat",
              }}
            />
          </button>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div ref={stackRef} style={{ position: "relative", minHeight: 300 }}>
              {TESTIMONIALS.map((t, i) => {
                const active = i === index;
                return (
                  <div
                    key={i}
                    className="testi-slide"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      boxSizing: "border-box",
                      padding: "2px 4px 6px",
                      opacity: active ? 1 : 0,
                      pointerEvents: active ? "auto" : "none",
                      transition: active
                        ? "opacity 0.45s ease 0.22s"
                        : "opacity 0.3s ease 0s",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        padding: "46px 46px 38px",
                        borderRadius: 8,
                        background:
                          "radial-gradient(ellipse 120% 150% at 50% -10%,rgba(93,107,255,0.16),rgba(138,92,255,0.06) 46%,rgba(255,255,255,0.02) 80%),rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.11)",
                        backdropFilter: "blur(16px)",
                        WebkitBackdropFilter: "blur(16px)",
                        boxShadow: "0 30px 70px -40px rgba(0,0,0,0.8)",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: 76,
                          lineHeight: 0.7,
                          color: "var(--sprint-lime)",
                          opacity: 0.85,
                          height: 34,
                        }}
                      >
                        &ldquo;
                      </div>
                      <p
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontWeight: 500,
                          fontSize: "clamp(19px,2.1vw,27px)",
                          lineHeight: 1.42,
                          letterSpacing: "-0.01em",
                          color: "rgba(255,255,255,0.92)",
                          margin: "22px 0 30px",
                          textWrap: "pretty",
                        }}
                      >
                        {t.quote}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 15,
                          paddingTop: 24,
                          borderTop: "1px solid rgba(255,255,255,0.09)",
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={t.img}
                          alt=""
                          style={{
                            width: 54,
                            height: 54,
                            borderRadius: "50%",
                            objectFit: "cover",
                            flex: "none",
                            border: "1px solid rgba(255,255,255,0.16)",
                            boxShadow: "0 0 0 4px rgba(255,255,255,0.03)",
                          }}
                        />
                        <div>
                          <div
                            style={{
                              fontFamily: "var(--font-sans)",
                              fontWeight: 600,
                              fontSize: 16,
                              color: "var(--sprint-lime)",
                              lineHeight: 1.3,
                            }}
                          >
                            {t.name}
                          </div>
                          <div
                            className="s-mono"
                            style={{
                              fontSize: 11,
                              letterSpacing: "0.05em",
                              color: "rgba(255,255,255,0.5)",
                              marginTop: 3,
                            }}
                          >
                            {t.title}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => goTo(index + 1)}
            aria-label="Next"
            className="testi-arrow"
            style={arrowStyle}
          >
            <span
              style={{
                width: 18,
                height: 18,
                background: "rgba(255,255,255,0.8)",
                WebkitMask:
                  "url(/assets/icons/arrow-right.svg) center/contain no-repeat",
                mask: "url(/assets/icons/arrow-right.svg) center/contain no-repeat",
              }}
            />
          </button>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 9,
            marginTop: 34,
          }}
        >
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              aria-label="Go to testimonial"
              onClick={() => goTo(i)}
              style={{
                height: 8,
                width: i === index ? 26 : 8,
                borderRadius: 99,
                background: i === index ? "var(--sprint-lime)" : "rgba(255,255,255,0.22)",
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition:
                  "width 0.35s cubic-bezier(0.22,1,0.36,1),background 0.35s",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const arrowStyle: React.CSSProperties = {
  flex: "none",
  width: 48,
  height: 48,
  borderRadius: "50%",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.12)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
