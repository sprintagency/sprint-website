# 02: Sprint Video Astro rebuild

Rebuild sprintvideo.co.uk (today WordPress + Elementor) as an Astro site in the madebysprint visual style with a teal accent.
Keep every ranking it has on launch day, then grow them.

Size: large (a design approval phase, then 5 build phases; 5 to 7 sessions).
Risk: medium.
The design work is low risk.
The risk is SEO: a careless migration can lose rankings that took years to earn.

## Goal

Done looks like this:

- sprintvideo.co.uk serves an Astro site from Cloudflare Workers, in the madebysprint look, with `#29FFCD` teal where madebysprint uses lime.
- All 21 current URLs answer 200 with the same path, the same title and the same H1 as the baseline, unless this plan records a deliberate change.
- Mobile Lighthouse scores are 95 or higher for performance, SEO, accessibility and best practices on every page template.
- Enquiry forms deliver email through Resend, and each enquiry is counted in analytics.
- Google Search Console shows no loss of clicks or impressions 6 weeks after launch, compared with the pre-launch baseline.
- A ranking-growth backlog (Phase 5) is in motion.

The site is a sibling of madebysprint.com: a visitor should see at a glance that the two companies are connected.

## Source material

- `SEO-BASELINE.md` and `seo-baseline.json` in this folder: the per-page inventory of the live site, captured 2026-11-12.
- `IMPROVEMENTS.md` in this folder: the ranking-improvement findings, with evidence and confidence labels.
- The madebysprint codebase (this repository): `src/app/globals.css` (tokens), `src/app/layout.tsx` (fonts), `src/components/` (Header, Footer, Hero, Testimonials, FinalCTA, FeatureCard, Showreel, JsonLd, SocialMeta, CookieConsent, ContactWizard).
- The live site, https://sprintvideo.co.uk/, until it is switched off.

## Findings (current state, verified 2026-11-12)

### The live site

- 21 indexable pages in `page-sitemap.xml`, all 200, each canonical to itself.
  The full list and per-page facts are in `SEO-BASELINE.md`.
- Built with WordPress, Elementor, ElementsKit, Essential Addons and the KeyDesign framework, on a LiteSpeed host, with Yoast SEO 27.9.
- Every page is about 1.6 to 2.0 MB of HTML.
  On the homepage, 1,621 KB of that is inline CSS that Elementor writes into the page.
  The homepage loads 62 external scripts.
- `http://` and `www.` both 301 to `https://sprintvideo.co.uk/`.
  Paths without a trailing slash 301 to the slash form.
- Two extra sitemaps list Elementor plumbing that is not real content: one ElementsKit popup page and two `?elementskit_template=` URLs.
- Schema is the Yoast default only: WebSite, WebPage, Organization, BreadcrumbList, ImageObject.
  There is no LocalBusiness, VideoObject, Service, FAQPage or Review schema.
- 15 of 21 pages have no meta description, so Google writes its own snippet.
- 3 pages have no H1: `/getpricing/`, `/quote-builder/`, `/get-a-quote/`.
- 193 of 252 images have no alt text.
- The 11 industry pages are thin: about 210 to 250 words each, built from one shared template (H1, one case-study H2, "What our clients say", "Get a quote").
- Videos: Wistia on the home, white-label and example-videos pages; Vimeo iframes on the industry pages.
  Every video ID is in `SEO-BASELINE.md`.
- Forms: Contact Form 7 for the site-wide footer form (`wpcf7-f10448`) and the forms on `/contact/`, `/get-a-quote/` and `/getpricing/`.
  Gravity Forms (form 3) drives `/quote-builder/`.
  reCAPTCHA protects them.
- No Google Analytics or Google Tag Manager tag is present in the HTML.
  A Hotjar reference exists.
  So there is no enquiry or conversion history to preserve, and today nobody can see which pages produce leads.
- The business address postcode is DG1 3JW (Dumfries) and the phone number is 01387 750 953.
- Copy is British English.
  No title uses an en or em dash.
  One body sentence on `/white-label-animated-video-production/` uses an em dash ("animated videos" then "without the hassle"); the capture replaces it with a comma, per the Sprint no-dash rule.

### DNS and email (checked 2026-11-12)

- The domain's DNS is run by the current host, Netnerd (`ns1.netnerd.com`, `ns2.netnerd.com`).
  The apex points at `5.254.55.40`.
- **Email is Google Workspace**: the MX record is `SMTP.GOOGLE.COM`, and the SPF record is `v=spf1 include:_spf.google.com ip4:185.229.21.105 +a +mx ip4:5.254.55.40 ~all`.
- **Three `google-site-verification` TXT records** exist.
  At least one is almost certainly the Search Console verification; losing it loses Search Console access in the middle of the migration.
- DKIM (`google._domainkey`) and DMARC (`_dmarc`) could not be read clearly with `nslookup`.
  The full zone must be exported from Netnerd, not rebuilt from lookups.
- A Cloudflare Workers custom domain requires the domain to be a zone on Cloudflare, so the nameservers move from Netnerd to Cloudflare.
  **Every record above must exist on Cloudflare before the nameserver change**, or email and Search Console break.
- Note the SPF record's `+a` and `ip4:5.254.55.40` parts authorise the old web host to send mail; once the apex points at Cloudflare, `+a` no longer means the old host.
  Check with Graham whether the old host sends any mail (for example WordPress form notifications) before tidying SPF.

### Lighthouse (mobile, local run, 2026-11-12)

Lighthouse 12.6.1, mobile, run locally with headless Chrome (Google's PageSpeed API quota was exhausted that day).

| Page | Performance | SEO | Accessibility | Best practices | LCP | Total blocking time | Page weight |
|------|------|------|------|------|------|------|------|
| `/` | 30 | 100 | 89 | 75 | 12.9 s | 16,440 ms | 14.7 MB |
| `/healthcare-explainer-videos/` | 34 | 92 | 91 | 75 | 16.3 s | 4,130 ms | 2.4 MB |

LCP (Largest Contentful Paint) is when the main content appears; Google's "good" is under 2.5 s.
Most of the homepage's weight and blocking time comes from 8 Wistia players loading before anyone presses play.
Third-party code alone blocks the main thread for 13.3 s on the homepage.
Accessibility losses: colour contrast, heading order, unlabelled form fields, links with no name.

### Footer links that go nowhere specific

12 footer links (Explainer, Animated, Training, Employee Onboarding, Customer Onboarding, Customer Service, Corporate, Infographic, Construction, Fintech, Education, Educational videos) all point to `/example-videos/`.
"Pharmaceutical Explainer Videos" points to `/healthcare-and-medical-device-videos/`.
Those topics have no page that can rank; see `IMPROVEMENTS.md` item 8.

### What ports from madebysprint

- Tokens: `src/app/globals.css` lines 11 to 68.
  `--sprint-black` is a navy-black, `#0c1321`, not pure black.
- Font: Geist and Geist Mono via `next/font/google` (`src/app/layout.tsx:2`).
  In Astro, self-host the same fonts with Fontsource so there is no third-party font request.
- The components are React with inline styles.
  They become `.astro` components: the markup and styles carry over, the React hooks do not.
  Only the interactive pieces (the quote builder, the cookie banner, the mobile menu, the video facade) need client-side JavaScript.

## Decisions

### LOCKED (confirmed by Graham)

- **Framework: Astro 7.x** (7.4.11 was current on 2026-11-12), static output.
  Reason: a 21-page content site; Astro ships zero JavaScript by default and adds it only to the interactive islands.
- **Look: the madebysprint design system**, so the two companies read as siblings.
- **Accent: Sprint Video teal.**
  - `--sv-teal: #29FFCD` (your swatch `#57D1B4` at 100% saturation, same hue 166 and lightness).
    Fills, buttons and highlights. Navy-black text on it: 14.40:1.
  - `--sv-teal-soft: #C2FFF1` replaces `--sprint-lime-soft`.
  - `--sv-teal-deep: #008566` for links and small text on white (4.62:1, passes WCAG AA).
    Never put bright teal text on white: 1.29:1.
- **Spelling: UK English** for all Sprint Video copy.
  madebysprint stays US English.
- **Every current URL is kept**, with its trailing slash.
- **Hosting: Cloudflare Workers with static assets** (Graham, 2026-11-12).
  Cloudflare's own guidance (Workers best practices) is to start new projects on Workers, not Pages: Pages still works, but new features land on Workers.
  Astro builds static HTML into `dist/`; the `@astrojs/cloudflare` adapter (14.4.x, peer `astro ^7.4.0`) adds one Worker for the form endpoint.
  `wrangler.jsonc` sets `assets.html_handling: "force-trailing-slash"`, which reproduces the live site's `/about` to `/about/` 301.
  The domain's DNS moves to Cloudflare (a requirement for a Workers custom domain); see Findings, DNS and email.

### DEFAULT (my assumption, overridable)

- **Separate repository**, `sprint-video-site`, under the same GitHub owner as this repository, deployed by Cloudflare Workers Builds (Cloudflare's Git integration: every push builds, every pull request gets a preview URL).
  Reason: different domain, audience and SEO; a change on one site cannot break the other.
  The tokens are copied, not shared through a package; with two sites, a package costs more than it saves.
- **Forms: Resend**, same as madebysprint, called from the Worker with `fetch`, protected by **Cloudflare Turnstile** (Cloudflare's free, usually invisible bot check) plus a honeypot field.
  Reason: reCAPTCHA loads about 400 KB of Google script on every page that has a form; Turnstile is far lighter and native to the host.
  The Resend API key and the Turnstile secret are Worker secrets (`wrangler secret put`), never in the repository.
- **Images: optimised at build time** (Astro's image service in compile mode).
  Reason: the Workers runtime cannot run `sharp`, so images are resized and converted to AVIF and WebP during the build, not on request.
- **Redirects:** `public/_redirects` for path redirects (including `/sitemap_index.xml` to `/sitemap-index.xml`), a Cloudflare zone Redirect Rule for `www` to apex, and `http` to `https` by Cloudflare's "Always Use HTTPS".
  The three Elementor plumbing URLs answer 410 from the Worker, because `_redirects` cannot send a 410.
- **Content: Astro content collections** (Markdown files with typed frontmatter, checked at build time).
  The 11 industry pages share one template and one schema.
- **Videos: click-to-load facades.**
  Show a poster image and a play button; load the Vimeo or Wistia player only on click.
  This is the single biggest speed win.
- **Content parity at launch.**
  Copy, titles and H1s match the baseline on launch day.
  Low-risk fixes ship at launch: the 15 missing meta descriptions, the 3 missing H1s, alt text, schema, speed.
  Copy rewrites and new pages wait for Phase 5, after 4 weeks of stable rankings.
  Reason: if rankings move, you can only find the cause when one thing changed at a time.
- **Analytics: Cloudflare Web Analytics plus GA4.**
  Cloudflare Web Analytics is cookieless, so it runs for every visitor with no consent banner and gives honest traffic and Core Web Vitals numbers.
  GA4 runs behind cookie consent, same pattern as madebysprint (`src/components/Analytics.tsx`, `CookieConsent.tsx`), for the `generate_lead` event on each form submit and the link to Search Console.
  Hotjar is dropped.
- **Elementor plumbing URLs** (the ElementsKit popup and the two `?elementskit_template=` URLs) answer 410 Gone.
  They are not real pages.
- **Rollback: the WordPress site stays running at Netnerd** for 30 days after cutover.
  Because DNS is then on Cloudflare, rollback is one change: remove the Worker custom domain and point the apex `A` record back at `5.254.55.40`.
  Cloudflare applies this in minutes; no nameserver change is needed to roll back.
- **Nameserver move happens before launch day, not on it.**
  Move the zone to Cloudflare first with the apex still pointing at the WordPress host, so email and the live site carry on unchanged.
  Launch is then only the switch of the apex to the Worker.
  Reason: it separates the risky DNS move from the site switch, so if anything breaks you know which one caused it.

### OPEN (need Graham)

1. **Who edits copy after launch?**
   WordPress lets a non-developer edit pages today.
   The default above (Markdown in git) means copy changes go through a developer or a Claude session.
   If the team needs to edit without that, add a headless CMS (a content editor that publishes into the site, for example Keystatic or Sanity) in Phase 1.
2. **The three quote pages.**
   `/getpricing/`, `/get-a-quote/` and `/quote-builder/` overlap.
   Default: keep all three at launch for parity, consolidate in Phase 5 with 301s.
3. **Access** (see Phase 0).

## Build phases

Each phase has a ready-to-paste session prompt in `prompts/`.
Run them in order; each one deep-tests the phase before it.
Phase 0.5 runs first: it needs nothing from Phase 0, so it can start today, alongside Graham's Phase 0 checklist.

### Phase 0.5: Homepage design approval (runs first; prompt: `prompts/phase-0.5-design-approval.md`)

Graham approves the visual style before any build work starts.
Changing a look on a mock-up costs minutes; changing it after the components are built costs a phase.

- Build the new sprintvideo.co.uk homepage as a published Artifact (a private claude.ai page, shared by link): the real homepage copy from `SEO-BASELINE.md`, in the madebysprint design system, with the teal set in place of lime.
- It must work at phone width and at desktop width, so Graham can review it on both.
- Graham reviews it and leaves comments on the Artifact; the session revises until he approves.
- The ledger records the approved Artifact URL and the date.
  That Artifact is the visual reference for Phases 1 and 2: the built homepage must match it.
- **Gate:** Phase 1 does not start until the approval is in the ledger.

### Phase 0: Access and baseline (Graham, about 30 minutes, no session)

- [ ] Google Search Console access for sprintvideo.co.uk (Owner).
- [ ] Export the last 16 months of Search Console data (Performance: queries and pages; Indexing: pages) into this folder as `search-console-baseline/`.
  This is the ranking baseline the launch is measured against, and it re-ranks `IMPROVEMENTS.md` (work first on queries already in positions 5 to 20).
- [ ] Check whether a Google Business Profile exists for the Dumfries address (`IMPROVEMENTS.md` item 18).
- [ ] WordPress admin login, for the Yoast export and the Gravity Forms quote-builder field list.
- [ ] A Cloudflare account (or the existing Sprint one) with access for the build sessions; note whether madebysprint.com is also on it.
- [ ] Domain registrar access for sprintvideo.co.uk (the nameserver change happens at the registrar) and a full zone export from Netnerd.
- [ ] Confirm the Vimeo and Wistia accounts that host the videos belong to Sprint, and that the videos are not set to "private to this domain".
- [ ] Resend: add and verify sprintvideo.co.uk as a sending domain, or decide to send from madebysprint's verified domain.
- [ ] Answer OPEN 1 and 2.

### Phase 1: Foundations (prompt: `prompts/phase-1-foundations.md`)

- Create the `sprint-video-site` repository; scaffold Astro 7 with TypeScript strict, `@astrojs/cloudflare` and `@astrojs/sitemap`, and `wrangler.jsonc`.
- Set `trailingSlash: 'always'` and `build.format: 'directory'` in Astro, and `assets.html_handling: "force-trailing-slash"` in Wrangler, so every URL matches the live trailing-slash form.
- Port the tokens into `src/styles/tokens.css` with the teal set; self-host Geist.
- Build the shell: `BaseLayout.astro` (head, meta, schema slot), `Header.astro`, `Footer.astro`, mobile menu island.
- Write the content capture script: fetch each of the 21 pages, extract the copy section by section into content-collection Markdown with frontmatter (title, description, H1, videos, testimonials), download every image into `src/assets/` for Astro's image pipeline.
  A human-readable diff of captured copy against the live page proves nothing was dropped.
- Set up lint (ESLint + `eslint-plugin-astro`), type check (`astro check`), build, and a Vitest unit runner.
- Connect the repository to Cloudflare Workers Builds and get the first deploy on its `workers.dev` URL, plus a preview URL for a pull request.
- Prepare the zone (no switch yet): add sprintvideo.co.uk to Cloudflare, import the Netnerd zone export, and diff it record by record against the export and the Findings list (MX, SPF, DKIM, DMARC, all three `google-site-verification` records).
  The nameserver change itself is a Graham step at the registrar, done only after that diff is clean, with the apex still pointing at the WordPress host.

### Phase 2: Pages and interactions (prompt written at the end of Phase 1)

- Templates: home, industry (shared by 11 pages), about, example-videos, white-label, contact, the three quote pages, privacy policy, 404.
- `VideoFacade.astro` for Vimeo and Wistia: poster, play button, player on click, keyboard accessible.
- Forms: contact form and the multi-step quote builder (fields copied from Gravity Forms form 3), posting to one Astro server endpoint on the Worker that checks Turnstile and sends through Resend.
- Cloudflare Web Analytics; cookie consent and GA4, with the `generate_lead` event.
- Pixel review at 375, 768, 1280 and 1920 px against madebysprint's components.

### Phase 3: SEO layer (prompt written at the end of Phase 2)

- Per-page title, meta description, canonical, Open Graph and Twitter tags from frontmatter.
- Write the 15 missing meta descriptions and the 3 missing H1s (UK spelling, no em dashes).
- Alt text for every image.
- Schema: Organization and LocalBusiness (Dumfries address, phone, opening hours, `sameAs` links) site-wide; Service on industry pages; VideoObject for every video (name, description, thumbnail, upload date, duration, embed URL); BreadcrumbList; FAQPage where a page has real FAQs.
- `sitemap-index.xml` plus a 301 from `/sitemap_index.xml` (the Yoast path Google already knows), `robots.txt`, `llms.txt`.
- Redirects: `public/_redirects` (including `/sitemap_index.xml`), the zone Redirect Rule for `www` to apex, and the Worker's 410 for the Elementor plumbing URLs.
- `public/_headers`: long cache lifetimes for hashed assets, and security headers (Content-Security-Policy, Strict-Transport-Security, X-Content-Type-Options, Referrer-Policy).
- The **parity check**: an automated test that loads every URL in `seo-baseline.json` from a preview deploy and asserts status 200, the canonical, the title and the H1 match (or match the recorded deliberate change).

### Phase 4: Launch (prompt written at the end of Phase 3)

- Pre-launch gate: parity check green, Lighthouse 95+ on every template (mobile), link check with no broken links, form delivery proven end to end, pixel review signed off.
- Refresh the Search Console export from Phase 0 so the baseline ends on launch day.
- Before launch day: confirm the nameservers have moved to Cloudflare, email still flows both ways, and Search Console still shows the property as verified.
- Launch: attach sprintvideo.co.uk as the Worker's custom domain, which repoints the apex from the WordPress host to the Worker.
  Verify HTTPS, apex and `www`, `http` to `https`, the trailing-slash 301s, the 410s, and every redirect on the live domain.
- Submit the new sitemap in Search Console; request indexing of the top pages.
- Monitor daily for week 1, then weekly until week 6: coverage errors, 404s, clicks and impressions against the baseline.
- Rollback trigger: a sustained drop of more than 20% in clicks for 2 weeks with no other cause.
  Rollback action: remove the Worker custom domain and point the apex `A` record back at `5.254.55.40` (the WordPress host).

### Phase 5: Ranking growth (after 4 stable weeks; prompt written at the end of Phase 4)

The backlog, ranked, is in `IMPROVEMENTS.md`.
Work it one change at a time and record each change's date, so movement in Search Console can be attributed.

## Verification

Gate for every phase: `npm run lint`, `npx astro check`, `npm run build`, `npx vitest run`, and the parity check once it exists (Phase 3 onward).

Test discipline (Graham ruling 2026-09-24), stated for this plan:

1. **Hard rule: every test is seen red before it is trusted.**
   The parity check is proved by the FIX REVERTED route: change one baseline title or H1 in the built page by hand, run the check, see it fail on that URL, restore it, see it pass.
   The redirect and 410 tests are proved the same way.
   The ledger records the route for each test group.
2. **Strong convention: pure rule modules are written test-first.**
   The pure modules here are the SEO metadata builder (frontmatter in, head tags out), the schema builders (page data in, JSON-LD out), and the form validation rules.
   Their cases are written and run red before the code exists (CODE ABSENT route).
3. **Refactors stay behind a characterisation suite.**
   Not expected in this plan; if Phase 5 restructures templates, snapshot the rendered head and body of every page first.

Outside the rule: the token swap to teal and the Lighthouse scores, which are proved by measurement, and the DNS move and the launch switch, which are proved by checking the live domain and by sending and receiving a test email.

## Ledger

Each session appends what it did, what it proved, and how each test was seen red.

- 2026-11-12: Plan written. Baseline captured. No build work yet.
- 2026-11-12: Hosting changed from Vercel to Cloudflare Workers (Graham). DNS and email findings added; nameserver move separated from launch.
- 2026-11-12: Phase 0.5 added (Graham): a homepage Artifact for visual approval runs first and gates Phase 1.

## Checklist

- [ ] Phase 0.5: homepage design approved by Graham (Artifact URL in the ledger)
- [ ] Phase 0: access and baseline
- [ ] Phase 1: foundations
- [ ] Phase 2: pages and interactions
- [ ] Phase 3: SEO layer
- [ ] Phase 4: launch
- [ ] Phase 5: ranking growth (ongoing)
