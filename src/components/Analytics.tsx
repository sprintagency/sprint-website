// Analytics hook point — intentionally DISABLED.
//
// No analytics provider is wired yet. The Cookies Policy references Google
// Analytics behind consent, so any provider added here MUST only load after the
// visitor consents (privacy-respecting, no scripts before opt-in).
//
// To enable, implement your consented provider below (e.g. gate a GA4 or a
// cookieless provider like Plausible/Umami on the consent state) and render it.
// Left as a no-op so nothing tracks by default.
export default function Analytics() {
  return null;
}
