import { buildLlmsTxt } from "@/lib/seo/llms";

// Served at /llms.txt (AEO convention). Static, regenerated at build.
export const dynamic = "force-static";

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
