-- Sprint marketing site — per-page SEO overrides (mini SEO CMS).
-- Run this once in the Supabase SQL editor to create the table the SEO layer
-- reads from (lib/seo/metadata.ts) and the /admin/seo editor writes to.
--
-- Every column is nullable: a null field falls back to the code-level default
-- in siteConfig / the page component, so a missing row or field never breaks a
-- page. `path` is the site-relative route, e.g. '/', '/contact',
-- '/web-design-fort-worth'.

create table if not exists public.page_seo (
  path            text primary key,
  seo_title       text,
  seo_description text,
  og_image_url    text,
  canonical_url   text,
  noindex         boolean not null default false,
  updated_at      timestamptz not null default now()
);

-- Keep updated_at fresh on every write.
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

-- Row Level Security. Reads happen server-side with the service-role key
-- (bypasses RLS). We also allow anon SELECT so metadata can be read with the
-- anon key fallback if the service-role key is not configured. Writes are
-- restricted to the service role only (the /admin/seo API uses it behind a
-- shared-secret gate), so no anon INSERT/UPDATE policy is created.
alter table public.page_seo enable row level security;

drop policy if exists "page_seo public read" on public.page_seo;
create policy "page_seo public read"
  on public.page_seo
  for select
  to anon
  using (true);
