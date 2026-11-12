# Plan 02, Phase 0.5: Sprint Video homepage design approval

You are running Phase 0.5 of plan 02: rebuild sprintvideo.co.uk as an Astro site in the madebysprint visual style with a teal accent.
This phase builds no site code.
It produces one thing: a published Artifact of the new homepage that Graham approves before Phase 1 starts.

## Read first

1. `plans/02-sprint-video-astro-rebuild/PLAN.md` in the `sprint-website` repository: Decisions (the LOCKED teal set and UK spelling) and Phase 0.5.
2. `plans/02-sprint-video-astro-rebuild/SEO-BASELINE.md`, section `/`: the live homepage's H1, H2s and video IDs.
3. The madebysprint design system in the same repository: `src/app/globals.css` (tokens, lines 11 to 68), `src/app/page.tsx` and the components it uses in `src/components/` (Header, Hero, Showreel, Testimonials, FeatureCard, FinalCTA, Footer).
4. The live sites, to compare by eye: https://madebysprint.com/ (the look to match) and https://sprintvideo.co.uk/ (the content to carry).

## Goal

A published Artifact that shows the new sprintvideo.co.uk homepage, fully designed, at phone and desktop widths.
A visitor who knows madebysprint.com should see at once that the two are sibling companies.

## Steps

1. Load the `artifact-design` skill before you write the page, and follow its contract (title, theming, library and font rules, phone width).
   Start with the Artifact tool's `quickstart` (intent `design`, `design_systems: false`, because the design system is madebysprint's own, described in this repository).
2. Capture the live homepage's copy section by section, word for word, in UK English.
   Keep the H1 "Quality explainer video production since 2011." and the section order unless a madebysprint pattern clearly serves it better; note any reordering for Graham.
   Replace the one live em dash rule-wise: no em or en dashes anywhere.
3. Build the page with the madebysprint tokens and component patterns, swapping the lime set for the teal set:
   - `#29FFCD` teal for fills, buttons and highlights, with navy-black `#0c1321` text on it.
   - `#C2FFF1` soft teal where madebysprint uses the soft lime.
   - `#008566` deep teal for links and small accent text on white.
   - Geist from Google Fonts (the Artifact rules allow Google Fonts stylesheets).
   - Header with the live site's navigation, a "Part of Sprint" link to madebysprint.com in the footer.
4. Videos are click-to-load facades: a poster and a play button, no player script.
   Use the Wistia thumbnails for the posters if the Artifact rules allow those image URLs; otherwise upload poster stills to the Artifact's asset store.
5. Publish it. Give Graham the link, and say in two or three lines what he is looking at and what is still placeholder.
6. Revise from his comments on the Artifact (read them with `ArtifactComments`) until he says it is approved.
   Republish to the same URL each time, so the link never changes.

## Proof

- Check the page yourself before you send the link: at 375 px and at 1280 px, in light and dark mode, nothing overflows, nothing overlaps, every heading and button is readable.
  Be picky: this page is the visual contract for the whole build.
- Contrast: every text and background pair meets WCAG AA (4.5:1 for body text, 3:1 for large text).
  The teal pairs in `PLAN.md` are already measured; measure any new pair you introduce.
- No green other than the teal set; no coloured stripe down a card's left edge; no em or en dashes; UK spelling.
- Test discipline: this phase writes no tests, because design is proved by Graham's review and by measurement, which the plan's test rule puts outside its scope.
- Append to the Ledger in `PLAN.md`: the Artifact URL, the date Graham approved it, and any design decisions he made in review (for example a section reordered or a token changed).
  If a decision changes a LOCKED token, update the Decisions section too.
- Tick Phase 0.5 in the checklist.

## Wrap up

When this prompt's work is done or stopped, run the `session-wrap` skill as the final step.
Tidy tabs, servers and background tasks.
Remove the worktree only when every commit is pushed and the work is safe elsewhere.
End with the verdict: READY TO CLEAR FOR NEXT PHASE with the Phase 1 prompt's path (`plans/02-sprint-video-astro-rebuild/prompts/phase-1-foundations.md`), or NOT READY with the one blocker (usually "waiting on Graham's approval"), and run the skill again once it clears.
