# Plan 02, Phase 2: pages and interactions

You are starting Phase 2 of plan 02: rebuild sprintvideo.co.uk as an Astro site in the madebysprint visual style with a teal accent.

## Read first

1. `plans/02-sprint-video-astro-rebuild/PLAN.md` in the `sprint-website` repository: the decisions, and every Phase 1 Ledger entry.
2. The `sprint-video-site` repository (https://github.com/sprintagency/sprint-video-site): `README.md`, `src/content/pages/*.md` (the captured copy), `src/lib/site-nav.ts`, `src/styles/tokens.css`, `src/layouts/BaseLayout.astro`.
3. The approved homepage Artifact (version 5), whose URL is in the Ledger: the home template must match it at 375 px and 1280 px.
4. `src/components/` in `sprint-website`: the madebysprint components the templates borrow from.

**Gate: stop if Phase 1 is not ticked in the `PLAN.md` checklist** (it needs the `workers.dev` deploy from `prompts/phase-1b-deploy-and-zone.md`).

## Before you build

Deep-test Phase 1 in your own clone: `npm ci`, `npm run gate`, confirm 46 tests pass and the content-parity test still fails when a paragraph is deleted (FIX REVERTED).
Check the `workers.dev` URL renders all 21 paths.

## Goal

Every page renders in its real template, with working video players and forms, deployed to the `workers.dev` URL.
The SEO layer (titles, descriptions, schema, redirects, the parity check) is Phase 3: do not build it here.

## Steps

1. Templates: home (match the Artifact), industry (shared by 11 pages), about, example-videos, white-label, contact, the three quote pages, privacy policy, 404.
   Keep the captured copy word for word; the content-parity test must stay green.
   Each `<!-- video:wistia:ID -->` or `<!-- video:vimeo:ID -->` marker in the Markdown is where that video sits.
   Frontmatter `testimonials` feeds the testimonial blocks.
   Confirm the 8 homepage video captions against the live Wistia titles (the Artifact's captions came from file names).
   Replace the single recoloured client logo strip with one file per logo.
2. `VideoFacade.astro` for Vimeo and Wistia: poster, play button, player on click, keyboard accessible.
   The posters are the Wistia thumbnails (the capture replaced the live swatch images with markers).
3. Forms: the contact form and the multi-step quote builder (fields copied from Gravity Forms form 3), posting to one Astro server endpoint on the Worker that checks Turnstile and sends through Resend.
   This is the first on-demand route: remove nothing from `astro.config.mjs` except what it needs, and keep `session: false`.
   No phone field label or `tel:` link anywhere: the old number is no longer in service.
4. Cloudflare Web Analytics; cookie consent and GA4 with the `generate_lead` event, same pattern as madebysprint (`Analytics.tsx`, `CookieConsent.tsx`).
5. Pixel review at 375, 768, 1280 and 1920 px against the Artifact and the madebysprint components.

## Proof

- Lint, `astro check`, build and Vitest are all green; the content-parity test still passes.
- Test discipline (hard rule: every test is seen red before it is trusted):
  - The form validation rules are a pure module, written test-first: CODE ABSENT, red, then green.
  - The endpoint is tested for a valid send, a failed Turnstile check and a missing field, each seen red first.
  - Record the route for each test in the plan's Ledger.
- A test enquiry sent from the `workers.dev` URL arrives by email.
- Append a Ledger entry to `PLAN.md`, write `prompts/phase-3-seo.md` in the same shape as this prompt, and tick Phase 2.
  Phase 3 must include: a 301 (not Cloudflare's default 307) for a missing trailing slash, the 3 missing H1s, the 15 missing meta descriptions, alt text for every image, and LocalBusiness schema with no `telephone`.

## Conventions

- UK spelling in all Sprint Video copy.
- No em dashes or en dashes in new copy; use a comma, a full stop, a colon or " · ".
- No green. Teal is the only accent; brand navy for active and positive states.
- No coloured stripe down the left edge of a card or section.
- Use design tokens, never hardcoded greys.

## Wrap up

When this prompt's work is done or stopped, run the `session-wrap` skill as the final step.
End with the verdict: READY TO CLEAR FOR NEXT PHASE with the Phase 3 prompt's path, or NOT READY with the one blocker.
