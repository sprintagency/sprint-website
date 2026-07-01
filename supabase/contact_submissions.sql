-- Sprint marketing site — contact form storage.
-- Run this once in the Supabase SQL editor (or via the CLI) to create the
-- table the /api/contact route writes to.

create table if not exists public.contact_submissions (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  email       text not null,
  company     text,
  phone       text,
  topic       text,
  detail      text,
  budget      text,
  timeline    text,
  message     text,
  source_url  text
);

-- Row Level Security. The API route uses the service-role key, which bypasses
-- RLS, so the policy below is only needed if you fall back to the anon key.
alter table public.contact_submissions enable row level security;

-- Allow anonymous INSERTs (the public form) but no reads for anon.
drop policy if exists "public form can insert" on public.contact_submissions;
create policy "public form can insert"
  on public.contact_submissions
  for insert
  to anon
  with check (true);

-- Reads stay restricted to the service role / authenticated dashboard users.
