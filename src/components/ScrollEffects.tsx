"use client";

import { useEffect } from "react";

/* Progressive enhancement: reveal-on-scroll for the why/platform/add-on grids,
   a gentle parallax drift on the platform grid, and localStorage playback
   persistence for the two showreel videos. Ported from the logic class in
   Hero.dc.html. All effects are no-ops if their target elements are absent. */
export default function ScrollEffects() {
  useEffect(() => {
    const cleanups: Array<() => void> = [];
    const desktop = window.innerWidth > 980;
    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // ---- platform capability cards: staggered reveal ----
    const cardsGrid = document.querySelector<HTMLElement>(".platform-cards");
    if (cardsGrid) {
      const cards = Array.from(cardsGrid.children) as HTMLElement[];
      if (reduced) {
        cards.forEach((c) => {
          c.style.opacity = "1";
          c.style.transform = "translateY(0)";
        });
      } else {
        let done = false;
        const reveal = () => {
          if (done) return;
          const rect = cardsGrid.getBoundingClientRect();
          const vh = window.innerHeight || 800;
          if (rect.top < vh * 0.88) {
            done = true;
            cards.forEach((c, idx) => {
              const d = idx * 70;
              c.style.transitionDelay = d + "ms";
              c.style.opacity = "1";
              c.style.transform = "translateY(0)";
              setTimeout(() => (c.style.transitionDelay = "0ms"), d + 720);
            });
            window.removeEventListener("scroll", reveal);
          }
        };
        window.addEventListener("scroll", reveal, { passive: true });
        reveal();
        cleanups.push(() => window.removeEventListener("scroll", reveal));
      }
    }

    // ---- why grid: staggered reveal (desktop only) ----
    const whyGrid = document.querySelector<HTMLElement>(".why-grid");
    if (whyGrid && desktop && !reduced) {
      const wcards = Array.from(whyGrid.children) as HTMLElement[];
      const order: Record<number, number> = { 0: 300, 1: 0, 2: 480 };
      wcards.forEach((c) => {
        c.style.opacity = "0";
        c.style.transform = "translateY(56px)";
        c.style.transition =
          "opacity 1.25s cubic-bezier(0.22,1,0.36,1), transform 1.25s cubic-bezier(0.22,1,0.36,1)";
      });
      let wdone = false;
      const wreveal = () => {
        if (wdone) return;
        const rect = whyGrid.getBoundingClientRect();
        const vh = window.innerHeight || 800;
        if (rect.top < vh * 0.85) {
          wdone = true;
          wcards.forEach((c, idx) => {
            const d = order[idx] != null ? order[idx] : 150;
            c.style.transitionDelay = d + "ms";
            c.style.opacity = "1";
            c.style.transform = "translateY(0)";
            setTimeout(() => (c.style.transitionDelay = "0ms"), d + 1300);
          });
          window.removeEventListener("scroll", wreveal);
        }
      };
      window.addEventListener("scroll", wreveal, { passive: true });
      wreveal();
      cleanups.push(() => window.removeEventListener("scroll", wreveal));
    }

    // ---- add-on cards: slide in from the left (desktop only) ----
    const addonWrap = document.querySelector<HTMLElement>(".addon-list");
    if (addonWrap && desktop && !reduced) {
      const acards = Array.from(addonWrap.children) as HTMLElement[];
      acards.forEach((c) => {
        c.style.opacity = "0";
        c.style.transform = "translateX(-56px)";
        c.style.transition =
          "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)";
      });
      let adone = false;
      const areveal = () => {
        if (adone) return;
        const rect = addonWrap.getBoundingClientRect();
        const vh = window.innerHeight || 800;
        if (rect.top < vh * 0.85) {
          adone = true;
          acards.forEach((c, idx) => {
            const d = idx * 160;
            c.style.transitionDelay = d + "ms";
            c.style.opacity = "1";
            c.style.transform = "translateX(0)";
            setTimeout(() => (c.style.transitionDelay = "0ms"), d + 720);
          });
          window.removeEventListener("scroll", areveal);
        }
      };
      window.addEventListener("scroll", areveal, { passive: true });
      areveal();
      cleanups.push(() => window.removeEventListener("scroll", areveal));
    }

    // ---- platform grid parallax drift ----
    const parallax = document.querySelector<HTMLElement>(
      "[data-platform-parallax]",
    );
    if (parallax && !reduced) {
      const sec = parallax.closest("section") || parallax;
      const onScrollR = () => {
        const rect = sec.getBoundingClientRect();
        const vh = window.innerHeight || 800;
        let p = (vh - rect.top) / (vh * 0.9);
        p = Math.max(0, Math.min(1, p));
        parallax.style.transform =
          "translateY(" + ((1 - p) * 240).toFixed(1) + "px)";
        parallax.style.opacity = (0.35 + 0.65 * p).toFixed(3);
      };
      window.addEventListener("scroll", onScrollR, { passive: true });
      onScrollR();
      cleanups.push(() => window.removeEventListener("scroll", onScrollR));
    }

    // ---- video playback persistence ----
    const persist = (sel: string, key: string) => {
      const v = document.querySelector<HTMLVideoElement>(sel);
      if (!v) return;
      const restore = () => {
        const saved = parseFloat(localStorage.getItem(key) || "0");
        if (saved > 0 && isFinite(saved) && saved < (v.duration || 1e9)) {
          try {
            v.currentTime = saved;
          } catch {}
        }
      };
      if (v.readyState >= 1) restore();
      else v.addEventListener("loadedmetadata", restore, { once: true });
      const onTime = () => localStorage.setItem(key, String(v.currentTime));
      v.addEventListener("timeupdate", onTime);
      const p = v.play();
      if (p && p.catch) p.catch(() => {});
      cleanups.push(() => v.removeEventListener("timeupdate", onTime));
    };
    persist("[data-hero-video]", "sprint_hero_time");
    persist("[data-showreel-video]", "sprint_showreel_time");

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
