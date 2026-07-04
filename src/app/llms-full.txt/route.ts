import { buildLlmsFull } from "@/lib/seo/llms";

// Served at /llms-full.txt (expanded AEO profile). Static, regenerated at build.
export const dynamic = "force-static";

export function GET() {
  return new Response(buildLlmsFull(), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
