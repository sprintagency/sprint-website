import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { EDITABLE_PAGES } from "@/lib/seo/pages";

// Admin API for the mini SEO CMS. Gated by a shared secret so it can run
// without a full auth system. Writes use the Supabase service-role key
// (server-only). Reads/writes fail gracefully if Supabase is not configured.
//
// Auth: send the secret in the `x-admin-secret` header. It is compared against
// ADMIN_SEO_SECRET. If that env var is unset, the API is disabled (fail closed).

export const dynamic = "force-dynamic";

const VALID_PATHS = new Set(EDITABLE_PAGES.map((p) => p.path));

function authorized(req: Request): boolean {
  const secret = process.env.ADMIN_SEO_SECRET;
  if (!secret) return false; // disabled until configured
  return req.headers.get("x-admin-secret") === secret;
}

function serviceClient() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  // Writes need the service-role key; fall back to anon only for reads.
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

function clean(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const t = v.trim();
  return t === "" ? null : t;
}

export async function GET(req: Request) {
  if (!authorized(req))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const supabase = serviceClient();
  if (!supabase)
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  const { data, error } = await supabase
    .from("page_seo")
    .select("path, seo_title, seo_description, og_image_url, canonical_url, noindex");
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ rows: data || [] });
}

export async function PUT(req: Request) {
  if (!authorized(req))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const path = clean(body.path);
  if (!path || !VALID_PATHS.has(path))
    return NextResponse.json({ error: "Unknown or missing path" }, { status: 400 });

  const supabase = serviceClient();
  if (!supabase)
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });

  const row = {
    path,
    seo_title: clean(body.seo_title),
    seo_description: clean(body.seo_description),
    og_image_url: clean(body.og_image_url),
    canonical_url: clean(body.canonical_url),
    noindex: body.noindex === true,
  };

  const { error } = await supabase
    .from("page_seo")
    .upsert(row, { onConflict: "path" });
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, row });
}
