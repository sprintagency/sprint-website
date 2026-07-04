// Renders Open Graph <meta> tags for a page. React 19 hoists these into
// <head>. We render OG ourselves (instead of via the Next.js Metadata API)
// because Next auto-generates twitter:* tags from any Metadata `openGraph`,
// and Made by Sprint has no Twitter/X account. This keeps rich link previews
// (Facebook, LinkedIn, Slack, iMessage, X) via Open Graph with zero twitter:*
// tags. CMS overrides are applied through the shared resolvePageMeta().
import { resolvePageMeta, type BuildMetadataInput } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/seo/config";

export default async function SocialMeta(props: BuildMetadataInput) {
  const r = await resolvePageMeta(props);
  return (
    <>
      <meta property="og:type" content={r.type} />
      <meta property="og:site_name" content={siteConfig.siteName} />
      <meta property="og:locale" content={siteConfig.locale} />
      <meta property="og:url" content={r.canonical} />
      <meta property="og:title" content={r.fullTitle} />
      <meta property="og:description" content={r.description} />
      {r.image ? (
        <>
          <meta property="og:image" content={r.image} />
          <meta property="og:image:width" content={String(siteConfig.ogImageWidth)} />
          <meta property="og:image:height" content={String(siteConfig.ogImageHeight)} />
          <meta property="og:image:alt" content={r.imageAlt} />
        </>
      ) : null}
    </>
  );
}
