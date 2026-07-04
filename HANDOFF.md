# Sprint Marketing Site — SEO / AEO / Local SEO Handoff

Comprehensive technical SEO, Answer Engine Optimisation (AEO), and Fort Worth
local SEO layer for madebysprint.com. Built on Next.js 15 App Router. `next
build` passes cleanly (29 routes). US spelling throughout; no em dashes.

## Key architectural notes for the next session

- **There is no page CMS in this codebase.** Page content is static React
  (`src/lib/site-content.ts` + hard-coded JSX per page). Supabase holds contact
  submissions only. Per-page SEO is therefore controlled two ways: code-level
  defaults in `src/lib/seo/`, overridden by a new **mini SEO CMS** (a
  `page_seo` Supabase table + `/admin/seo` editor) built for this brief.
- **Growth Partner pages are never indexed** (`/lara-cassas`, `/isabel-cable`,
  `/james-kerr`, any `src/app/[partner]` slug): `noindex, nofollow`, excluded
  from the sitemap, Disallowed in robots.txt. Verified live.
- **Spelling is US, not British** (confirmed with Graham; audience is Texas).
- **Facts are never invented.** Missing business facts are clearly-commented
  `PLACEHOLDER`s in `src/lib/seo/config.ts` and stripped from schema/metadata by
  `isPlaceholder()`, so nothing fake reaches a crawler. Outstanding list below.

## What was built

**Central config** — `src/lib/seo/config.ts` (`siteConfig`, single source of
truth), `src/lib/seo/services.ts` (service registry), `src/lib/seo/pages.ts`
(editable-page registry for the CMS).

**Metadata** — root metadata + `viewport` in `src/app/layout.tsx`;
`buildMetadata()` helper (`src/lib/seo/metadata.ts`) used by every page via
`generateMetadata`, layering `page_seo` CMS overrides over code defaults with
graceful fallback. Canonicals + `en-US`/`en-GB` alternates on every page.

**Structured data** — `src/lib/seo/schema.ts` builders + `<JsonLd>` component.
Site-wide graph in the layout: Organization + LocalBusiness + ProfessionalService
(Fort Worth primary, UK office secondary), founder Person, WebSite (no
SearchAction, no search endpoint exists). Per page: Service, FAQPage (generated
from the same on-page Q&A), BreadcrumbList, WebPage + speakable. All validated
as parseable JSON-LD.

**Crawl/platform** — `app/robots.ts`, `app/sitemap.ts` (Supabase-guarded,
excludes partners + CMS-noindexed paths), `app/manifest.ts`, dynamic
`app/opengraph-image.tsx` (always-valid branded default), `app/apple-icon.tsx`.
Existing `app/icon.svg` serves the favicon. No Twitter/X account is referenced
anywhere (no handle, no twitter:site/creator, no X profile). Next.js still
auto-mirrors the Open Graph tags into account-less twitter:card tags and cannot
separate them from OG previews; removing them entirely would also remove rich
previews when the site is shared on X.

**AEO** — `/llms.txt` and `/llms-full.txt` route handlers (generated from
config + services, lead with the Fort Worth entity statement); speakable schema;
plain-text entity statements near the top of the home hero and `/fort-worth`.

**Local SEO** — `primaryLocation` + `serviceAreas` in config; full LocalBusiness
schema; new `/fort-worth` hub page (entity intro, service grid, local context,
lazy map, local FAQ); footer NAP linked to `/fort-worth`, formatted to match the
schema; lazy privacy-friendly Google Map facade (`src/components/MapFacade.tsx`)
on `/fort-worth` and `/contact`.

**Mini SEO CMS (Phase 7)** — `page_seo` table (`supabase/page_seo.sql`),
brand-styled editor at `/admin/seo` (title/description with 60/160 counters, OG
image, canonical, noindex toggle). Sign-in flow: `POST /api/admin/seo/login`
checks `ADMIN_EMAIL`/`ADMIN_PASSWORD` + a Cloudflare Turnstile token behind
per-IP rate limiting (Upstash), then issues an 8h HMAC-signed session token
(`ADMIN_SESSION_SECRET`) used as a Bearer credential on the read/write API
(`src/app/api/admin/seo/route.ts`). Security helpers: `src/lib/admin/auth.ts`.
Graceful degradation: no Turnstile keys -> human check skipped; no Upstash keys
-> rate limiting skipped; no `ADMIN_SESSION_SECRET` -> sign-in fails closed.
Needed env: `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET` (set),
`TURNSTILE_SITE_KEY`/`TURNSTILE_SECRET_KEY` and `UPSTASH_REDIS_REST_URL`/
`UPSTASH_REDIS_REST_TOKEN` (add to enable captcha + rate limiting).

**Headers/analytics** — security headers in `next.config.ts`; disabled analytics
hook (`src/components/Analytics.tsx`) awaiting a consented provider.

## SQL to run in Supabase (paste-ready)

Run `supabase/page_seo.sql` in the Supabase SQL editor:

```sql
create table if not exists public.page_seo (
  path            text primary key,
  seo_title       text,
  seo_description text,
  og_image_url    text,
  canonical_url   text,
  noindex         boolean not null default false,
  updated_at      timestamptz not null default now()
);

create or replace function public.page_seo_touch_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists page_seo_set_updated_at on public.page_seo;
create trigger page_seo_set_updated_at
  before update on public.page_seo
  for each row execute function public.page_seo_touch_updated_at();

alter table public.page_seo enable row level security;

drop policy if exists "page_seo public read" on public.page_seo;
create policy "page_seo public read"
  on public.page_seo
  for select
  to anon
  using (true);
```

Then set `ADMIN_SEO_SECRET` (and the existing `SUPABASE_URL` /
`SUPABASE_SERVICE_ROLE_KEY`) in the environment to enable `/admin/seo`.

## Outstanding PLACEHOLDER values (real facts still needed)

All live in `src/lib/seo/config.ts`. Confirmed-and-filled already: Fort Worth
address (from the live footer), UK registered office (from the legal pages),
LinkedIn + Instagram, email.

Still needed from Graham:

1. **Public phone number** (E.164 + display form) — `contact.phone` /
   `contact.phoneDisplay`. Without it, no `telephone` in schema and no phone in
   the footer NAP / GBP block.
2. **Geo coordinates** (lat/long) for 3409 Clayton Rd E — `primaryLocation.
   latitude/longitude`. Can be read off Google Maps once confirmed.
3. **Business hours** or "by appointment" — `openingHours` (schema omits the
   field until filled).
4. **Price range** (e.g. `$$` or a retainer range) — `priceRange`.
5. **Google Business Profile URL** — `primaryLocation.gbpUrl` (used for
   `hasMap`; currently falls back to a Maps search URL).
6. **Social URLs**: Facebook and YouTube profile URLs (`socialProfiles`), and
   Graham's LinkedIn (`founderProfile.sameAs`). No Twitter/X account, so Twitter
   has been removed from the SEO layer entirely.
7. **Verification codes**: Google Search Console + Bing (`verification`).
8. **Confirm the Fort Worth street address** is correct for schema/GBP (it was
   taken from the live footer, not independently confirmed).

## Google Business Profile — paste-ready (Phase 9.6)

NAP (must match the site footer character-for-character once the phone is added):

```
Made by Sprint
3409 Clayton Rd E, Fort Worth, TX 76116, USA
Phone: [ADD ONCE CONFIRMED]
```

- **Primary category:** Marketing agency
- **Secondary categories:** Website designer, Video production service, Graphic
  designer, Advertising agency
- **Services:** Web Design, Brand Identity, Video Production, Social Media
  Management, Print Design
- **Description (under 750 chars):**

> Made by Sprint is a creative agency in Fort Worth, Texas. We give local
> businesses a full creative department on one flat monthly retainer: brand
> identity, web design, video production, social media, and print design, all
> handled by one team. Established 2011, we work with businesses across Fort
> Worth and Tarrant County, including Arlington, Dallas, Southlake, Grapevine,
> Keller, and Aledo, and manage the whole process remotely for clients
> nationwide. Requests are submitted and reviewed through the Sprint Client
> Portal, with a 24 hour response time and a monthly strategy call on every
> plan. Websites are built in Webflow for speed and easy updates. Live video
> filming is available across the Fort Worth area.

Remember to link the GBP listing to `https://madebysprint.com/fort-worth` and,
once live, copy the profile URL into `primaryLocation.gbpUrl`.

## Content gaps / decisions flagged

- **Service-area expansion (Arlington, Dallas, etc.):** the 5 existing
  `/{service}-fort-worth` pages are kept as the canonical Fort Worth service
  pages (they are live, indexed, and richly designed). A generic
  `/services/[service]/[location]` template was intentionally NOT built to
  auto-generate per-metro pages, because there is no genuine localized content
  for Arlington/Dallas/etc. yet and thin duplicates would hurt rankings. To
  expand, author real localized copy per service-area first. The metro areas are
  already covered in `areaServed` schema and the `/fort-worth` hub copy.
- **"Digital Marketing"** appears in the footer/home but has no dedicated
  service page; it is not in the service registry. Add a page + registry entry
  if it should rank on its own.
- **OG artwork:** real per-page cards from the design handoff are wired from
  `/public/og` (home, each service, /fort-worth, contact, faq, growth partner;
  legal pages reuse the home card). They are **909x525**; re-export at the
  recommended **1200x630** for crisper rendering, then the dimensions in
  `siteConfig.ogImageWidth/Height` should be updated to match. A generated
  default remains at `/opengraph-image` as a fallback.
- **Canonical host / SSL:** SSL is healthy (valid Let's Encrypt cert, HTTPS
  enforced, HSTS). BUT the apex `madebysprint.com` currently 308-redirects to
  `www.madebysprint.com`, while every canonical/sitemap/OG URL uses the apex
  (non-www) per the brief. Decide the canonical host: either set the apex as
  primary in Vercel (recommended, matches the brief and all canonicals), or if
  www should be canonical, change `siteConfig.siteUrl` to
  `https://www.madebysprint.com`. Until aligned, canonicals point at a URL that
  redirects.
- **favicon.ico:** the site uses `app/icon.svg` (modern browsers). Add a
  `favicon.ico` if legacy support is needed.
- **UK office `addressRegion`** is set to "Scotland" (from "registered in
  Scotland"); refine to the council area if preferred.
