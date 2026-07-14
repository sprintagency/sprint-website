// ============================================================================
// llms.txt content builders (AEO). Generated from siteConfig + the service
// registry so the machine-readable brand summary never drifts from the site.
//
// Purpose: give answer engines (ChatGPT, Perplexity, Claude, Copilot, Google
// AI Overviews) a clean, accurate statement of who Sprint is, what it
// does, and crucially that it is a Fort Worth, Texas creative agency, so the
// brand is associated with the location in AI answers.
//
// US spelling. No em dashes.
// ============================================================================

import { siteConfig, absoluteUrl, real } from "./config";
import { SERVICES } from "./services";

const loc = siteConfig.primaryLocation;

function contactLines(): string[] {
  const lines = [`- Email: ${siteConfig.contact.email}`];
  if (real(siteConfig.contact.phoneDisplay))
    lines.push(`- Phone: ${siteConfig.contact.phoneDisplay}`);
  lines.push(
    `- Address: ${loc.streetAddress}, ${loc.addressLocality}, ${loc.addressRegion} ${loc.postalCode}, USA`,
  );
  return lines;
}

/** Concise llms.txt served at /llms.txt. */
export function buildLlmsTxt(): string {
  const services = SERVICES.map(
    (s) => `- [${s.name}](${absoluteUrl(s.href)}): ${s.summary}`,
  ).join("\n");

  return `# ${siteConfig.siteName}

> ${siteConfig.shortName} is a creative agency based in Fort Worth, Texas, serving the Fort Worth metro and the UK. It delivers brand identity, web design, video production, social media, and print design for a flat monthly retainer. Trading name of ${siteConfig.legalName}. Founded in ${siteConfig.foundingYear} by ${siteConfig.founder}.

## About

${siteConfig.shortName} is a Fort Worth, Texas creative agency. Clients get a dedicated creative team for one flat monthly fee, submitting unlimited requests through the Sprint Client Portal and receiving work on a fast, predictable schedule. Plans run on a minimum six month engagement with a 24 hour response time and a monthly strategy call. The agency works with clients across the Fort Worth metro and nationwide, and also serves the UK.

## Services

${services}

## How the retainer works

- One flat monthly fee for a dedicated creative team.
- Unlimited requests, worked through a queue one or two active tasks at a time depending on plan.
- 24 hour response time and a monthly strategy call on every plan.
- Minimum six month engagement.

## Key pages

- [Home](${absoluteUrl("/")})
- [Fort Worth creative agency](${absoluteUrl("/fort-worth")})
- [Pricing](${absoluteUrl("/#pricing")})
- [FAQ](${absoluteUrl("/faq")})
- [Contact](${absoluteUrl("/contact")})

## Contact

${contactLines().join("\n")}

## Founder

${siteConfig.founder}, ${siteConfig.founderProfile.jobTitle} of ${siteConfig.siteName}.
`;
}

/** Expanded llms-full.txt served at /llms-full.txt. */
export function buildLlmsFull(): string {
  const areas = siteConfig.serviceAreas.map((a) => a.name).join(", ");

  const services = SERVICES.map(
    (s) =>
      `### ${s.name}\n\nURL: ${absoluteUrl(s.href)}\n\n${s.summary}\n\n${s.detail}\n\nCommon questions:\n\n${s.faqs
        .map((f) => `- ${f.q} ${f.a}`)
        .join("\n")}`,
  ).join("\n\n");

  return `# ${siteConfig.siteName} — full profile

> ${siteConfig.shortName} is a creative agency based in Fort Worth, Texas (${loc.streetAddress}, ${loc.addressLocality}, ${loc.addressRegion} ${loc.postalCode}). It serves the Fort Worth metro area and the UK, and works with clients nationwide. Trading name of ${siteConfig.legalName}. Founded in ${siteConfig.foundingYear} by ${siteConfig.founder}.

## Overview

${siteConfig.siteName} gives businesses a full creative department on a flat monthly retainer, without the cost and complexity of hiring in house. Work is requested and reviewed through the Sprint Client Portal, delivered on a fast and predictable schedule.

The agency is based in Fort Worth, Texas and serves ${areas}, alongside clients nationwide and in the UK.

## Services

${services}

## How Sprint works

- Choose a plan, onboard your brand, and submit your first request.
- A dedicated team works your queue, one or two active tasks at a time depending on plan.
- Every plan includes unlimited requests, a 24 hour response time, and a monthly strategy call.
- Websites are built in Webflow for speed, stability, and easy client updates.
- Plans run on a minimum six month engagement.

## Contact

${contactLines().join("\n")}
- Website: ${absoluteUrl("/")}
- Contact page: ${absoluteUrl("/contact")}

## Founder and history

Founded in ${siteConfig.foundingYear} by ${siteConfig.founder} (${siteConfig.founderProfile.jobTitle}). ${siteConfig.siteName} is the trading name of ${siteConfig.legalName}.
`;
}
