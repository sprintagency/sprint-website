> STATUS: DONE (2026-09-23). Page built, lint, type check and build green, verified at 375/768/1280/1920. Residuals: PR open and not yet merged (merge deploys to production); Open Graph card is the site default until a designed portal card is dropped into public/og/ and wired in page.tsx.

# 01: Sprint Portal landing page

Add a single-purpose landing page at `/sprint-portal-operating-system` that sells Sprint Portal to other agencies.
The page drives one action: Book a Portal Demo.

Size: medium (one new route, seven new section components, one small header change, one shared card extraction).
Risk: low to medium.
The only shared code touched is the header and the home page "why" card, so both need a visual re-check.

## Goal

Done looks like this:

- The route renders with the site header and footer, in the existing stack (Next.js 15 App Router, React 19, inline styles plus `globals.css` tokens).
- Every section from the handoff brief is present, with the copy verbatim and no em dashes.
- Every "Book a Portal Demo" button opens the existing contact modal with a portal-specific preset.
- Title, description, canonical, Open Graph tags, JSON-LD, and a sitemap entry are in place.
- Layout holds from 360px to 1920px with no horizontal scroll.
- `npm run lint` and `npm run build` are clean, and the page is verified in the browser at phone, tablet, and desktop widths.
- The work is on a green pull request against `main`.
  Merging to `main` auto-deploys to production through Vercel.

## Source material

The handoff zip (`Sprint Marketing Site.zip`, unpacked to the session scratchpad) contains:

- `PROMPT.md`: the build brief, with final copy and an acceptance checklist.
- `reference/Sprint Portal.dc.html`: the approved design, inline styles, visual source of truth.
- `assets/`: seven files.

The brief is explicit that the reference markup must not be copied verbatim.
It must be rebuilt with the site's own components, tokens, fonts, and spacing.

## Findings (current state, verified)

Assets:

- Five of the six images already exist in `public/assets/` and are byte-identical to the zip: `hero-dashboard-v01.webp`, `card-new-request.webp`, `card-timeline.webp`, `card-review.webp`, `brand-hub-screen.webp`.
- `check-bold.svg` already exists at `public/assets/icons/check-bold.svg`, byte-identical.
- Only `campaign-surface.png` is new.
  It is 3835 x 1807 pixels and 454 KB.
  That is far larger than any screen needs and a PNG, so it should be resized and converted to WebP before shipping.
- The hero video already lives at `public/assets/hero-animation.mp4` and is used by `src/components/Hero.tsx:236`.

Reusable pieces already in the codebase:

- Header: `src/components/Header.tsx`.
  Fixed, glass, 1360px inner width.
  Renders `NAV_LINKS` (Services, Why Sprint, Work, Pricing, FAQ, all home anchors), a Sign In link to `https://portal.madebysprint.com/auth/login`, and a "Book Demo" button.
  It has no variant prop today.
- Footer: `src/components/Footer.tsx`.
  Its `[ PLATFORM ]` column links all point at `/#platform`.
- Contact modal: `src/components/ContactModal.tsx`.
  Any element with `data-open-contact` opens it.
  `data-intent` presets the topic through `resolveIntent()` in `src/lib/contact-form.ts:83`.
  Existing intents: `demo` (heading "Let's book your demo"), `ai-platform` (topic AI, detail "Custom platform build", heading "Let's design your platform"), and others.
  There is no portal-specific intent yet.
- Button styles: `ctaLime`, `ctaGhost`, and `CtaArrow` in `src/components/primitives.tsx`.
  Hover lift and lime shadow come from the `.cta` and `.cta-lime` rules in `src/app/globals.css:191`.
- Eyebrow: `Eyebrow` in `primitives.tsx`, renders the `[ LABEL ]` mono style.
- Lime period: `<span className="s-dot">.</span>`, defined at `globals.css:130`.
- Home "why" card: `src/components/WhySection.tsx`.
  The card, glow, and overlapping glass image bezel are module-level style objects, not exported.
  The brief says to reuse this card exactly.
- Scroll reveal: `src/components/ScrollEffects.tsx`.
  It reveals `.why-grid` children with a stagger, persists `[data-hero-video]` playback position, and respects `prefers-reduced-motion`.
  It is keyed to home page class names, so it only helps the portal page where those names are reused.
- Metadata: `buildMetadata()` in `src/lib/seo/metadata.ts` for title, description, canonical, robots.
  `<SocialMeta>` in `src/components/SocialMeta.tsx` renders Open Graph tags without twitter tags (deliberate, Sprint has no X account).
  Both layer overrides from the Supabase `page_seo` table (the mini SEO CMS).
- SEO CMS registry: `EDITABLE_PAGES` in `src/lib/seo/pages.ts`.
  New indexable pages are listed there so `/admin/seo` can edit them.
- Sitemap: `src/app/sitemap.ts`, a static entry list.
- Structured data: `webPageSchema`, `breadcrumbSchema`, `graph` in `src/lib/seo/schema.ts`.
- Open Graph cards: `public/og/og-*.png`, 1200 x 630, designed in the design tool (logo, eyebrow, headline, tilted screenshot).
  Nothing in the code generates them.
- Responsive pattern in this repo: inline styles for the desktop layout, then class-based `@media` overrides with `!important` in `globals.css`.
  This is a repo convention, not an industry standard, and the plan follows it for consistency.

Environment:

- This worktree has no `node_modules`.
  Run `npm ci` before lint or build.
- `sharp` (image library) is available in the main checkout's `node_modules` as a Next.js dependency.
  It can do the one-off WebP conversion from a scratchpad script.
- Never run `npm run build` while `npm run dev` is running.
  It corrupts fonts and CSS in the dev preview.

## Decisions

LOCKED (from the brief):

- Route: `/sprint-portal-operating-system`.
- Copy: verbatim from `PROMPT.md`, no em dashes.
- Section order: nav, hero, problem, lifecycle strip, feature cards, campaign surface, capabilities grid, how it works, final CTA, footer.
- Hero video: reuse `/assets/hero-animation.mp4`, autoplay muted loop playsinline, `preload="metadata"`, poster `hero-dashboard-v01.webp`.
- Title: "Sprint Portal | The custom agency operating system".
  Description: "Briefs, production, review, approval, billing and retention in one operating system. Custom built for your agency by the specialist team that runs its own on it."
- Route added to the sitemap.
- Eyebrows are plain mono bracket labels in lime, no swatch dash, no highlight blocks, no bracketed number indices.

LOCKED (Graham, 2026-09-23):

1. Header on this page: stripped, as designed.
   Logo, `PORTAL` tag, Sign In, Book a Portal Demo.
   No Services/Why/Work/Pricing/FAQ links.
   The mobile menu shows Sign In and the demo button only.
2. Contact modal preset: new `portal` intent.
   Topic AI solution, detail "Custom platform build", heading "Let's book your Portal demo".
3. Open Graph image: the site default card (`og-home.png`) for now.
   A designed portal card can be dropped into `public/og/` later and wired with a one-line change to the page's `SEO.image`.
4. Cross-linking: yes.
   Add a "Sprint Portal" link to the footer `[ PLATFORM ]` column and list the page under `llms.txt` key pages.

DEFAULT (Claude's assumptions, overridable):

- File layout.
  Route at `src/app/sprint-portal-operating-system/page.tsx`.
  Section components in `src/components/portal/` (one file per section).
  All copy in `src/lib/portal-content.ts` as typed data, mirroring `site-content.ts`, so the page components stay small and the copy is easy to audit.
- Shared card.
  Extract the "why" card (card base, glow, overlapping bezel, h3, body) from `WhySection.tsx` into `src/components/FeatureCard.tsx`.
  `WhySection` switches to it with zero visual change.
  This is the honest way to "reuse exactly": one source of truth, not a copy that drifts.
- Header variant.
  Add a `variant?: "default" | "portal"` prop to `Header`.
  The portal variant shows the `PORTAL` tag and the "Book a Portal Demo" label.
  Whether it also hides the nav links depends on OPEN question 1.
  The mobile menu follows the same variant.
- Hero overlap.
  The hero section gets a faint tint, a hairline bottom border, and a spacer whose height is half the player height.
  The player follows with a matching negative top margin.
  Both derive from one CSS custom property (player width = `min(1120px, 100vw - gutters)`), so the border line stays roughly halfway up the player at every width.
- Scroll reveal.
  Give the portal feature grid the `why-grid` class and the hero video `data-hero-video`, so `ScrollEffects` handles both unchanged.
  Add one generic `[data-reveal]` block to `ScrollEffects` using `IntersectionObserver` (the browser API that fires when an element scrolls into view) for the lifecycle strip, capability tiles, and step cards.
  Reduced motion disables it.
- Campaign image.
  Resize to 2400px wide and convert to WebP as `public/assets/campaign-surface.webp`.
  Keep the original PNG out of the repo.
  The bezel uses `aspect-ratio` so there is no layout shift while it loads.
- Images below the fold get `loading="lazy"` and explicit width and height.
  Plain `<img>` is used, matching the rest of the site, with the existing eslint disable comment.
- Structured data: `webPageSchema` plus `breadcrumbSchema` (Home > Sprint Portal).
- SEO CMS: add the page to `EDITABLE_PAGES`.
- Responsive breakpoints: 4-column grids collapse to 2 at 1100px and 1 at 640px.
  The 6-cell lifecycle strip becomes 3 x 2 at 1100px, 2 x 3 at 900px, and 1 column at 560px.
  The wide brand card stacks at 900px.
  Feature cards stack at 980px, matching `.why-grid`.
- Header "Sign In" keeps the existing portal login URL.

## Build steps

1. Environment.
   Run `npm ci` in the worktree.
   Confirm `npm run lint` and `npm run build` pass before any change, so a later failure is ours.
2. Assets.
   Convert `campaign-surface.png` to `public/assets/campaign-surface.webp` at 2400px wide with a scratchpad `sharp` script.
   Record the output size in this plan.
   Result: 2400 x 1131, 90 KB (from a 454 KB PNG).
   Add the OG card per OPEN question 3.
3. Copy module.
   Create `src/lib/portal-content.ts` with typed constants for every section: hero, problem, lifecycle steps, feature cards, brand card, campaign tiles, capabilities, how-it-works steps, final CTA.
   Copy is pasted from `PROMPT.md` verbatim.
4. Contact intent.
   Per OPEN question 2, extend `resolveIntent()` and `HEADINGS` in `src/lib/contact-form.ts` if a new intent is chosen.
5. Shared card.
   Create `src/components/FeatureCard.tsx` from the `WhySection` style objects.
   Refactor `WhySection` to use it.
   Verify the home page is pixel-identical at 1280px and 390px.
6. Header variant.
   Add the `variant` prop and the `PORTAL` tag (11px mono, lime, 1px lime border at 40 percent, 3px radius, 4px by 8px padding).
   Default variant stays byte-for-byte the same in output.
7. Section components in `src/components/portal/`:
   `PortalHero.tsx` (centered copy, glows, overlap player, mono caption),
   `ProblemSection.tsx`,
   `LifecycleStrip.tsx`,
   `PortalFeatures.tsx` (three `FeatureCard`s plus the wide brand card),
   `CampaignSurface.tsx`,
   `CapabilitiesGrid.tsx` (`id="capabilities"`, lime circle check via `MaskIcon`),
   `HowItWorks.tsx`,
   `PortalCTA.tsx`.
8. Page.
   Create `src/app/sprint-portal-operating-system/page.tsx` wiring `generateMetadata`, `SocialMeta`, `JsonLd`, `Header variant="portal"`, the sections, `Footer`, `ContactModal`, `ScrollEffects`.
9. Styles.
   Add a `/* Sprint Portal landing page */` block to `globals.css` with the `.portal-*` responsive rules, the capability tile hover (brighter fill, lime border), and the hero overlap custom property.
10. SEO wiring.
    Add the route to `sitemap.ts` (monthly, priority 0.8), `EDITABLE_PAGES`, and, per OPEN question 4, the footer and `llms.txt`.
11. Scroll reveal.
    Add the generic `[data-reveal]` block to `ScrollEffects.tsx`.
12. Verify (see below), then commit in small steps and open the PR.

## Verification

Gate commands (run with the dev server stopped):

```bash
npm run lint
```

```bash
npm run build
```

Browser checks on the dev preview, at 360, 390, 768, 1024, 1280, and 1920 pixels wide:

- No horizontal scroll (`document.documentElement.scrollWidth === window.innerWidth`).
- Hero border line sits about halfway up the video player.
- Poster shows before the video loads, video plays muted inline.
- Feature card screenshots overlap the card tops by 40px, same as the home page.
- Every "Book a Portal Demo" button opens the modal with the chosen preset heading.
- "See the full feature list" scrolls to `#capabilities`.
- Capability tile hover shows the lime border.
- Reduced motion: sections render visible with no animation.
- Home page unchanged after the `WhySection` refactor and the header variant.

Metadata checks:

- `view-source` shows the title, description, canonical, `og:*` tags, and the JSON-LD graph.
- `/sitemap.xml` lists the route.
- `grep` the new files for em dashes and en dashes: zero hits.

## Checklist

- [x] `npm ci`, baseline lint and build green
- [x] `campaign-surface.webp` created and sized
- [x] OG card: site default (locked decision 3), no new file
- [x] `portal-content.ts` with verbatim copy
- [x] Contact intent wired
- [x] `FeatureCard.tsx` extracted, home page unchanged
- [x] `Header` variant with `PORTAL` tag
- [x] Eight section components
- [x] Route page with metadata, OG, JSON-LD
- [x] `globals.css` responsive block
- [x] Sitemap, `EDITABLE_PAGES`, footer and `llms.txt` per decision
- [x] `ScrollEffects` generic reveal
- [x] Lint and build green (tsc, eslint, next build all exit 0)
- [x] Browser verification: 375 and 768 (pane, JS measurements), 1280 and 1920 (headless captures); phone header fixed to fit (tag hidden, short label below 640px)
- [x] Zero em dashes in new files
- [x] PR opened against `main`
