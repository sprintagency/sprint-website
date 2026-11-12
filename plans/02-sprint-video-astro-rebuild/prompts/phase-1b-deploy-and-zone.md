# Plan 02, Phase 1b: first deploy and zone preparation

You are finishing Phase 1 of plan 02: rebuild sprintvideo.co.uk as an Astro site in the madebysprint visual style with a teal accent.
Steps 1 to 6 of `prompts/phase-1-foundations.md` are done; this prompt is its steps 7 and 8.

## Read first

1. `plans/02-sprint-video-astro-rebuild/PLAN.md` in the `sprint-website` repository, above all the Ledger entry "Phase 1 steps 1 to 6 DONE" and Findings, DNS and email.
2. The `sprint-video-site` repository (https://github.com/sprintagency/sprint-video-site, local clone `D:\sprint-video-site`): `README.md`, `astro.config.mjs`, `wrangler.jsonc`.

**Gate: stop if Phase 0 has not given you access.**
You need a Cloudflare account with access for this session, and Graham's full zone export from Netnerd in `plans/02-sprint-video-astro-rebuild/`.
If either is missing, do not start; tell Graham which Phase 0 item is still open.

## Before you build

Deep-test what steps 1 to 6 shipped, in a fresh clone: `npm ci`, then `npm run gate` (lint, `astro check`, build, Vitest), and confirm 46 tests pass.
Read the ledger claims against the code; record any claim that does not hold.

## Steps

1. Connect `sprint-video-site` to Cloudflare Workers Builds.
   Build command `npm run build`, deploy command `npx wrangler deploy`.
   `astro build` writes `dist/client/wrangler.json`, and `wrangler deploy` finds it through `.wrangler/deploy/config.json`: check the build log shows that file in use.
   Get a deploy on the `workers.dev` URL, and a preview URL from a pull request (make a one-line README change on a branch to prove it).
   Do not attach sprintvideo.co.uk to the Worker.
2. On the `workers.dev` URL, check all 21 paths answer 200 with the trailing slash, at 375, 768, 1280 and 1920 px, with no horizontal scroll.
   Note what a missing trailing slash answers (it was 307 on the local Workers runtime; Phase 3 makes it 301).
3. Prepare the zone: add sprintvideo.co.uk to Cloudflare and import Graham's Netnerd zone export.
   Diff the Cloudflare records against the export and against `PLAN.md` Findings, DNS and email (MX, SPF, DKIM, DMARC, all three `google-site-verification` TXT records), and record the clean diff in the ledger.
   Keep the apex `A` record pointing at the WordPress host, `5.254.55.40`.
   Do not change the nameservers: that is Graham's step at the registrar, done only after the diff is clean.

## Proof

- The `workers.dev` URL and a pull-request preview URL, both in the ledger.
- The zone diff, record by record, in the ledger, with every difference explained or fixed.
- Append a Ledger entry to `PLAN.md`, tick Phase 1 in the checklist.
- Phase 2's prompt already exists at `prompts/phase-2-pages.md`: update it with anything this phase found.

## Conventions

- UK spelling in all Sprint Video copy and in ledger notes about copy.
- No em dashes or en dashes in new copy; use a comma, a full stop, a colon or " · ".
- No phone number anywhere: 01387 750 953 is no longer in service.

## Wrap up

When this prompt's work is done or stopped, run the `session-wrap` skill as the final step.
End with the verdict: READY TO CLEAR FOR NEXT PHASE with the Phase 2 prompt's path, or NOT READY with the one blocker.
