// Google Analytics 4 loader, gated on cookie consent.
//
// Nothing loads until the visitor accepts analytics cookies (see
// CookieConsent + src/lib/analytics/consent.ts). This matches the promise in
// /cookies: "we only set these cookies once you have given your consent".
//
// Set NEXT_PUBLIC_GA_ID to the GA4 Measurement ID (the "G-XXXXXXXXXX" value in
// GA Admin > Data streams > web stream). Without it, this renders nothing.
"use client";

import Script from "next/script";
import { Suspense, useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getConsent, CONSENT_EVENT, type ConsentValue } from "@/lib/analytics/consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export default function Analytics() {
  const [consent, setConsent] = useState<ConsentValue | null>(null);

  useEffect(() => {
    setConsent(getConsent());
    const onChange = (e: Event) =>
      setConsent((e as CustomEvent<ConsentValue>).detail);
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  if (!GA_ID || consent !== "granted") return null;

  return (
    <>
      <Script
        id="ga-src"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
      {/* useSearchParams must sit under a Suspense boundary in the App Router. */}
      <Suspense fallback={null}>
        <PageViews />
      </Suspense>
    </>
  );
}

// Records a page_view on client-side route changes. The initial load is already
// counted by gtag('config'), so the first render is skipped to avoid a double
// count; every subsequent in-site navigation is sent manually.
function PageViews() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (!GA_ID || typeof window.gtag !== "function") return;
    const query = searchParams.toString();
    window.gtag("event", "page_view", {
      page_path: query ? `${pathname}?${query}` : pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  return null;
}
