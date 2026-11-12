# Plans

Build plans for the Sprint marketing site.
One folder per plan, so work is easy to pick up, hand off, and track.

## Conventions

- `plans/` lives at the repo root.
- One folder per plan, named `NN-kebab-slug`.
  `NN` is a two-digit build order: smallest, safest, most enabling first.
- Each folder holds a `PLAN.md`.
  Extra files (diagrams, notes, sample data) may live alongside it.
- Finished plans move to `plans/complete/` and keep their folder name and number.
- When a plan is finished (built and its verification gate passes):
  1. Stamp the top of its `PLAN.md` with `> STATUS: DONE (YYYY-MM-DD). <result + residuals>.`
  2. Tick the checklist.
  3. Move the folder into `plans/complete/`.
  4. Update the tables below.

## Active

| # | Plan | Summary |
|---|------|---------|
| 02 | [Sprint Video Astro rebuild](02-sprint-video-astro-rebuild/PLAN.md) | Rebuild sprintvideo.co.uk in Astro with the madebysprint look and a teal accent, keep its rankings, then grow them |

## Complete

| # | Plan | Done |
|---|------|------|
| 01 | [Sprint Portal landing page](complete/01-sprint-portal-landing-page/PLAN.md) | 2026-09-23 |
