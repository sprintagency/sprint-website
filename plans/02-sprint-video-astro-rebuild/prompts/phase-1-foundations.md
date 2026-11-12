# Plan 02, Phase 1: Sprint Video Astro foundations

You are starting Phase 1 of plan 02: rebuild sprintvideo.co.uk as an Astro site in the madebysprint visual style with a teal accent.

## Read first

1. `plans/02-sprint-video-astro-rebuild/PLAN.md` in the `sprint-website` repository (the madebysprint site). It holds every decision, marked LOCKED, DEFAULT or OPEN.
2. `plans/02-sprint-video-astro-rebuild/SEO-BASELINE.md` and `seo-baseline.json`: the 21 live pages you must reproduce.
3. `src/app/globals.css`, `src/app/layout.tsx` and `src/components/` in the same repository: the design system you are porting.

Check the Phase 0 checklist in `PLAN.md` before you start.
If OPEN 1 (who edits copy, and so whether a headless CMS is needed) is still unanswered, ask Graham before you choose the content layer, and do the other steps while you wait.

## Goal

A new repository, `sprint-video-site`, with an Astro 7 site that renders the header, the footer and the 21 captured pages as plain content in the shared layout, deployed by Cloudflare Workers Builds to its `workers.dev` URL, with the sprintvideo.co.uk zone prepared on Cloudflare but not yet switched.
Page templates, forms and the SEO layer are Phases 2 and 3: do not build them here.

## Steps

1. Create the repository `sprint-video-site` under the same GitHub owner as `sprint-website`, private.
   Scaffold Astro 7 (pin the exact version you install) with TypeScript strict, `@astrojs/cloudflare` (14.4.x or later within the major that matches your Astro) and `@astrojs/sitemap`.
   Set `site: 'https://sprintvideo.co.uk'`, `trailingSlash: 'always'` and `build.format: 'directory'`.
   Add `wrangler.jsonc` with `assets.html_handling: "force-trailing-slash"` and a `compatibility_date` of the day you scaffold.
   Use Astro's compile-time image service: the Workers runtime cannot run `sharp`.
2. Port the tokens from `src/app/globals.css` (lines 11 to 68) into `src/styles/tokens.css`.
   Replace the lime set with the LOCKED teal set: `--sv-teal: #29FFCD`, `--sv-teal-soft: #C2FFF1`, `--sv-teal-deep: #008566`.
   Every token that read lime now reads teal; text on white that was accent-coloured uses `--sv-teal-deep`.
   Self-host Geist and Geist Mono with Fontsource.
3. Build `BaseLayout.astro`, `Header.astro` and `Footer.astro` from the madebysprint components.
   Copy the footer's link list from the live site exactly, including the links that all point to `/example-videos/` (parity at launch; they are fixed in Phase 5).
   Add a "Part of Sprint" link to madebysprint.com in the footer.
4. Write `scripts/capture-content.mjs`.
   It reads `seo-baseline.json`, fetches each live URL, and writes one Markdown file per page into a content collection, with frontmatter for title, meta description, H1, Vimeo IDs, Wistia IDs and testimonials.
   It downloads every content image into `src/assets/` and records its alt text (empty where the live site has none; Phase 3 writes them).
   Keep the live copy word for word in UK English. Remove nothing.
   The one exception is the em dash in the body of `/white-label-animated-video-production/`: replace it with a comma (Sprint no-dash rule) and note it in the ledger.
5. Add the gate: ESLint with `eslint-plugin-astro`, `astro check`, `astro build`, and Vitest.
   Add a GitHub Actions workflow only if the ci-minutes skill agrees it is worth the minutes.
6. Write a content-parity test that, for each captured page, compares the word count of the Markdown body with the baseline `words` field and fails if any page loses more than 5%.
7. Connect the repository to Cloudflare Workers Builds and get a deploy on the `workers.dev` URL, plus a preview URL from a pull request.
   Do not attach sprintvideo.co.uk to the Worker.
8. Prepare the zone: add sprintvideo.co.uk to Cloudflare and import Graham's Netnerd zone export.
   Diff the Cloudflare records against the export and against `PLAN.md` Findings, DNS and email (MX, SPF, DKIM, DMARC, all three `google-site-verification` TXT records), and record the clean diff in the ledger.
   Keep the apex `A` record pointing at the WordPress host, `5.254.55.40`.
   Do not change the nameservers: that is Graham's step at the registrar, done only after the diff is clean.

## Proof

- Lint, `astro check`, build and Vitest are all green.
- The `workers.dev` URL renders all 21 paths with the trailing slash, in the shared layout, at 375, 768, 1280 and 1920 px, with no layout faults you would not ship.
- Test discipline (hard rule: every test is seen red before it is trusted):
  - The content-parity test is proved FIX REVERTED: delete a paragraph from one captured page, see the test fail on that page, restore it, see it pass.
  - Any pure module you write (for example a frontmatter schema or a slug helper) is written test-first: CODE ABSENT, red, then green.
  - Record the route for each test in the plan's Ledger.
- Append a Ledger entry to `PLAN.md`: what was built, the pinned Astro and adapter versions, the `workers.dev` URL, the zone diff result, and how each test was seen red.
- Write the Phase 2 prompt at `plans/02-sprint-video-astro-rebuild/prompts/phase-2-pages.md` in the same shape as this one, and tick Phase 1 in the checklist.

## Conventions

- UK spelling in all Sprint Video copy and in this plan's ledger notes about copy.
- No em dashes or en dashes in new copy; use a comma, a full stop, a colon or " · ".
- No green. Teal is the only accent; brand navy for active and positive states.
- No coloured stripe down the left edge of a card or section.
- Use design tokens, never hardcoded greys.

## Wrap up

When this prompt's work is done or stopped, run the `session-wrap` skill as the final step.
Tidy tabs, servers and background tasks.
Remove the worktree only when every commit is pushed and the work is safe elsewhere.
If this was the plan's last phase, stamp the plan DONE and move it to `plans/complete/`.
End with the verdict: READY TO CLEAR FOR NEXT PHASE with the Phase 2 prompt's path, or NOT READY with the one blocker, and run the skill again once it clears.
