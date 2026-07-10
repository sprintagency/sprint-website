# Sprint Marketing Site

The **public marketing website** for Sprint (a creative agency + AI-platform
company): home, services, FAQ, legal pages, and SEO location landing pages (e.g.
`*-fort-worth`). Separate repo from the client app (that's `sprint-portal`).
Lead capture is a Resend-powered contact form. Recreated from the design
references in `design_handoff_sprint_site/`.

## Stack
- **Next.js 15** (App Router, RSC) + **React 19** + **TypeScript**, deployed on **Vercel**.
- **Resend** for the contact form email.
- **Supabase** (`@supabase/supabase-js`) — used by `admin`/`api`; treat as the
  data layer (some CMS/admin wiring). Verify what's actually wired before relying on it.
- **Styling:** design-system tokens in `src/app/globals.css` + inline styles
  ported 1:1 from the `design_handoff_sprint_site/` HTML. Fonts via `next/font`.
- SEO/AI discoverability is first-class: `sitemap.ts`, `robots.ts`, `manifest.ts`,
  `llms.txt` / `llms-full.txt`, per-location landing pages.

## Running & verifying
- **Dev:** `npm run dev`. **Build:** `npm run build`. **Lint:** `npm run lint`.
  (No dedicated test scripts beyond lint; a `test/` dir exists — check it before
  assuming coverage.) Get a clean `build` + `lint` before calling a change done.

## Hard conventions (Sprint org rules — apply everywhere)
- **No em/en dashes** in any copy. Use comma, period, colon, or " · ".
- **No green.** Only the lime accent is allowed; use brand navy for
  positive/active states, never emerald/olive.
- **No left-accent-border** (no colored stripe down a card/section's left edge).
- **Design tokens, not hardcoded greys.** Match the tokens in `globals.css`;
  keep styles faithful to `design_handoff_sprint_site/`.
- This is a **public** site: copy is customer-facing marketing, so mind tone, SEO
  metadata, and accessibility on every page.

## Architecture map
- `src/app/` — route-per-folder marketing pages (`page.tsx`, `contact`, `faq`,
  `privacy`, `terms`, `cookies`), SEO location pages (`*-fort-worth`), plus
  `admin`, `api`, and a dynamic `[partner]` route. `layout.tsx` + `globals.css`
  are the shared shell/tokens. SEO files at the app root (`sitemap`, `robots`,
  `manifest`, `llms*.txt`).
- `public/` — static assets. `supabase/` — SQL/config. `design_handoff_sprint_site/`
  — the source-of-truth design HTML the pages are ported from.

## Gotchas
- Pages are ported 1:1 from the design handoff — when editing layout/styles,
  reconcile with the corresponding `design_handoff_sprint_site/*.dc.html`.
- Confirm which Supabase/CMS bits are actually wired vs planned before building on them.
- Windows dev box (Git Bash / PowerShell); watch LF↔CRLF.

## Deeper context
This file is the shared, in-repo brief every session/account reads; per-account
Claude memory is NOT shared, so load-bearing facts belong here. `README.md` and a
local `HANDOFF.md` hold longer notes. Keep this file updated as the site grows.
