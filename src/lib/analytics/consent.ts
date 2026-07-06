// Cookie-consent state shared between the banner (CookieConsent) and the
// analytics loader (Analytics). The published Cookies Policy commits us to
// loading Google Analytics only after the visitor opts in, and to storing the
// choice for 6 months, so this is the single source of truth for that.
//
// The choice is kept in a first-party cookie (not localStorage) to match the
// "Cookie preferences" entry described in /cookies exactly.
"use client";

export type ConsentValue = "granted" | "denied";

/** Cookie that records the analytics consent choice. Named in /cookies. */
export const CONSENT_COOKIE = "cookie_consent";

/** Cookie set by middleware from the visitor's country: "0" when no banner is
 *  required (US and rest of world), otherwise consent is required (EU/EEA/UK). */
export const CONSENT_REQUIRED_COOKIE = "consent_required";

/** ~6 months, matching the duration stated in the Cookies Policy. */
const CONSENT_MAX_AGE = 60 * 60 * 24 * 180;

/** Fired on the window whenever the choice changes; detail is the new value. */
export const CONSENT_EVENT = "sprint:consent";

/** Fired to reopen the banner (from the footer "Cookie settings" link). */
export const CONSENT_OPEN_EVENT = "sprint:consent-open";

/** The visitor's saved choice, or null if they have not chosen yet. */
export function getConsent(): ConsentValue | null {
  if (typeof document === "undefined") return null;
  const row = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${CONSENT_COOKIE}=`));
  const value = row?.slice(CONSENT_COOKIE.length + 1);
  return value === "granted" || value === "denied" ? value : null;
}

/** Whether this visitor's region requires prior opt-in before analytics loads.
 *  Reads the middleware-set cookie; defaults to true when unknown so a
 *  consent-required visitor is never tracked by mistake. */
export function isConsentRequired(): boolean {
  if (typeof document === "undefined") return true;
  const row = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${CONSENT_REQUIRED_COOKIE}=`));
  return row?.slice(CONSENT_REQUIRED_COOKIE.length + 1) !== "0";
}

/** Persist the choice and notify listeners (Analytics reacts to this). */
export function setConsent(value: ConsentValue): void {
  if (typeof document === "undefined") return;
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${value}; Max-Age=${CONSENT_MAX_AGE}; Path=/; SameSite=Lax${secure}`;
  window.dispatchEvent(new CustomEvent<ConsentValue>(CONSENT_EVENT, { detail: value }));
}

/** Reopen the consent banner so the visitor can change their choice. */
export function openConsentSettings(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}

/** Best-effort removal of Google Analytics cookies when consent is withdrawn. */
export function clearAnalyticsCookies(): void {
  if (typeof document === "undefined") return;
  const host = location.hostname;
  // GA sets _ga and _ga_<containerId>; also drop the apex-domain variants.
  const domains = [host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  for (const name of document.cookie.split("; ")) {
    const key = name.split("=")[0];
    if (key === "_ga" || key.startsWith("_ga_") || key === "_gid") {
      for (const d of domains) {
        document.cookie = `${key}=; Max-Age=0; Path=/; Domain=${d}`;
      }
      document.cookie = `${key}=; Max-Age=0; Path=/`;
    }
  }
}
