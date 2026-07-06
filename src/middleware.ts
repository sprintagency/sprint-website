// Geo-gates the cookie-consent banner. The published Cookies Policy commits us
// to loading Google Analytics only after opt-in, which UK/EU law (PECR / GDPR)
// requires. Visitors outside those regions do not need a banner, so we set a
// client-readable cookie recording whether prior consent is required, based on
// Vercel's edge geolocation. CookieConsent and Analytics read that cookie.
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** EU + EEA + UK: regions that require prior opt-in for analytics cookies. */
const CONSENT_REQUIRED_COUNTRIES = new Set([
  // EU
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR",
  "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK",
  "SI", "ES", "SE",
  // EEA (non-EU)
  "IS", "LI", "NO",
  // UK
  "GB",
]);

export const CONSENT_REQUIRED_COOKIE = "consent_required";

export function middleware(req: NextRequest) {
  const country = req.headers.get("x-vercel-ip-country")?.toUpperCase() ?? "";
  // Unknown country (e.g. local dev, or a missing header) errs on the side of
  // requiring consent so a consent-required visitor is never tracked by mistake.
  const desired = country === "" || CONSENT_REQUIRED_COUNTRIES.has(country) ? "1" : "0";

  const res = NextResponse.next();
  // Only write the cookie when it is missing or has changed. Skipping the
  // Set-Cookie header on repeat visits keeps static responses CDN-cacheable.
  if (req.cookies.get(CONSENT_REQUIRED_COOKIE)?.value !== desired) {
    res.cookies.set(CONSENT_REQUIRED_COOKIE, desired, {
      path: "/",
      sameSite: "lax",
      // Not HttpOnly: the client components need to read it.
      maxAge: 60 * 60 * 24, // refreshed the next day, or sooner if geo changes
    });
  }
  return res;
}

export const config = {
  // Run on page requests; skip static assets, images, and API routes.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|og|assets|api).*)"],
};
