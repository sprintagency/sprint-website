# Sprint Marketing Site

The public marketing site for **Sprint** — a creative agency + AI-platform company.
Built with **Next.js (App Router) + TypeScript**, deployed on **Vercel**.

Recreated from the design references in `design_handoff_sprint_site/`
(`Hero.dc.html` = the home page, `FAQ.dc.html` = the FAQ page).

## Stack

- **Next.js 15** (App Router, React 19, TypeScript)
- **Fonts**: Geist / Geist Mono / Montserrat via `next/font/google`
- **Styling**: design-system tokens in `src/app/globals.css` + inline styles ported 1:1 from the handoff
- **Email**: [Resend](https://resend.com) for the contact form
- **CMS**: Supabase (planned — not wired yet)

## Getting started

```bash
npm install
cp .env.example .env.local   # add your RESEND_API_KEY
npm run dev                  # http://localhost:3000
```

Without `RESEND_API_KEY` the contact API logs the submission and returns success,
so the form UX works end-to-end in local dev.

## Project structure

```
src/
  app/
    layout.tsx            # fonts + metadata
    globals.css           # design tokens, keyframes, hover/responsive rules
    page.tsx              # home page (composes the sections)
    faq/page.tsx          # FAQ page
    api/contact/route.ts  # contact form -> Resend
  components/
    Header.tsx            # sticky nav + mobile menu (client)
    Hero.tsx              # hero + client logo marquee
    WhySection.tsx        # "The Platform" 3-card grid
    Showreel.tsx          # glass video player + floating service chips
    Pricing.tsx           # 4 plan cards (live Stripe links) + trust bar
    Addons.tsx            # add-on services
    PlatformSection.tsx   # 9 capability cards
    Testimonials.tsx      # crossfade carousel (client)
    Footer.tsx
    ContactModal.tsx      # 3-step contact modal (client)
    ScrollEffects.tsx     # reveal-on-scroll + video persistence (client)
    primitives.tsx        # shared style objects + small components
  lib/site-content.ts     # nav, logos, testimonials, capabilities, video URL
public/assets/            # icons, logos, team + testimonial images, logo
```

Any element with `data-open-contact` (+ optional `data-intent`, `data-plan`,
`data-service`) opens the contact modal with the right pre-fill — the modal
listens via a single delegated click handler.

## Contact form → Resend

`POST /api/contact` validates the payload, then emails it via Resend from
`CONTACT_FROM` (default `web@portal.madebysprint.com`) to `CONTACT_TO`
(default `hello@madebysprint.com`), with the sender's address as reply-to.

**Env vars:** `RESEND_API_KEY`, `CONTACT_FROM`, `CONTACT_TO`.

## Deploy (Vercel)

1. Import the repo in Vercel (framework auto-detected as Next.js).
2. Add the env vars from `.env.example` in Project → Settings → Environment Variables.
3. Deploy. No extra build config needed.

## Supabase (contact storage)

Each submission is inserted into a `contact_submissions` table. To enable it:

1. Run `supabase/contact_submissions.sql` in the Supabase SQL editor.
2. Set `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` (the Vercel <-> Supabase
   integration provides these). The route falls back to the anon key, which
   needs the RLS insert policy from the SQL.

If Supabase is not configured the route still succeeds (email-only). If email
fails but the row was saved, the request still returns OK so no lead is lost.

## Roadmap

- **Supabase CMS**: source pricing/testimonials/logos/FAQ content from Supabase
  (the storage half is already wired via `contact_submissions`).
