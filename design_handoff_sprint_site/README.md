# Handoff: Sprint Marketing Site

## Overview
A single-page marketing website for **Sprint** — a creative agency + AI-platform company. It presents the brand, a client logo strip, a platform/capabilities section, a creative-services showreel, pricing (with live Stripe checkout links), an add-on services section, testimonials, a capabilities grid, FAQ, and a footer. A multi-step contact form opens as a modal from every CTA, with URL-intent-style pre-fill. There is also a standalone Contact page and an FAQ page.

## About the Design Files
The files in this bundle are **design references authored in HTML** — working prototypes that show the intended look, layout, and behavior. They are **not** meant to be shipped as-is. The task is to **recreate these designs in the target codebase's environment** (e.g. Next.js/React, Astro, Vue, etc.) using that project's established components, styling approach, and conventions. If there is no existing environment yet, pick the most appropriate modern framework (a static/SSG stack like Astro or Next.js suits a marketing site) and implement there.

These prototypes were built as "Design Components" (`.dc.html`) — a lightweight custom runtime (`support.js`) that renders an `<x-dc>` template plus a `class Component` logic block. **Ignore the DC runtime specifics** when porting; treat the rendered markup, inline styles, and the logic class's behavior as the spec. All styling is inline `style="…"` plus a small `<style>` block in `<helmet>` for pseudo-states, keyframes, and media queries.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, gradients, and interactions are all specified. Recreate pixel-accurately using the codebase's own component library where possible. Exact values are listed under Design Tokens.

## Screens / Views

### 1. Home (`Hero.dc.html`) — the primary deliverable
Single scrolling page, max content width **1360px**, 48px side padding (22px on mobile). Dark navy background `#0c1321`. Ambient radial glows (indigo→violet→transparent) sit behind sections at low opacity.

**Sticky header (fixed):** translucent navy `rgba(12,19,33,0.62)` with `backdrop-filter: blur(16px)`, 1px bottom border `rgba(255,255,255,0.08)`. Left: Sprint logo (links to home) + nav links (Services→#why, Why Sprint→#why, Work→#showreel, Pricing→#pricing, FAQ→FAQ page). Right: Sign In + lime "Book Demo" button + hamburger (mobile only).
- Nav link hover: text brightens to white; a 2px lime underline grows from left width 0→100% over 0.3s `cubic-bezier(0.22,1,0.36,1)`.
- Logo hover: opacity → 0.75.
- Mobile (≤980px): nav links hidden, hamburger reveals a full-screen menu (`#mobile-menu`) with all links + Book Demo; opens by setting display:flex then opacity 0→1, locks body scroll.

**Hero section:** min-height 100vh, flex column, content vertically centered. Left copy column (max 560px): lime bracket eyebrow `[ CREATIVE + AI SOLUTIONS ]`, h1 "Creative & tech / that work." (font-size `clamp(44px,5vw,76px)`, weight 600, line-height **0.94**, letter-spacing -0.035em; the period is lime via `.s-dot`), sub-paragraph, two CTAs (Explore Creative [lime], Explore AI Solutions [ghost]), a 5-star rating line. Right: a flat-on app screenshot/video frame positioned absolutely, cropped on the right on smaller screens. A client logo strip is pinned to the bottom of the hero (`[ TRUSTED BY ]` + infinite marquee of SVG wordmarks, 54s linear loop, edge mask fade).

**The Platform (`#why`):** centered eyebrow `[ THE PLATFORM ]` + h2, then a 3-column grid of cards (`.why-grid`). First card = "A senior team on demand" with a floating cluster of 4 circular team avatars (overlapping, staggered vertical offsets, gentle float animation) over a radial indigo/violet/cyan gradient. Cards reveal on scroll (staggered translateY + opacity).

**Creative Services showreel (`#showreel`):** two-column. Left: glass video player (16:9, `<video autoplay muted loop playsinline>` streaming from the Vidzflow CDN) with a radial glow behind it and floating lime service-chip callouts (Digital Marketing, Brand Identity, Digital & Social, Video & Motion, Print Design, Web Design) that gently float; deep-blue callout color. Right: copy + a lime "Sign Up" CTA linking to #pricing.

**Pricing (`#pricing`):** centered header, 4-column grid (`.pricing-grid`) of plan cards, each with a lime bracket eyebrow, plan name, price, "Includes" list (lime 4-point-star bullets), and a CTA. Scale is the "MOST POPULAR" (lime badge, lime button). Below the grid, a centered 2-cell trust bar ("6-month rolling terms / Renews automatically" + "Pause anytime / Just 30 days' notice…") with lime Lucide icons; stacks vertically on mobile.
- **CTAs / links:**
  - Starter "Get started" → `https://buy.stripe.com/eVq9AU2bbezJ3kXgTo3oA0g` (new tab)
  - Growth "Get started" → `https://buy.stripe.com/cNi14o3ffbnxbRt5aG3oA0f` (new tab)
  - Scale "Get started" → `https://buy.stripe.com/6oUeVe1773V58Fhav03oA0e` (new tab)
  - Enterprise "Contact sales" → opens the contact modal (intent = ai-platform)

**Add-on services (`#addons`):** two boxed cards (Digital Marketing, Social Media Management) on the left with a sticky header/intro on the right; each card has a "Request a scope" CTA that opens the contact modal (intent=addon, service=<name>). Reveal-on-scroll from left.

**Capabilities grid:** 9 platform-capability cards (Client Portals, Workflow Automation, Team Collaboration, AI Assistants, Dashboards & Reporting, Secure Documents, Approvals, Integrations, Notifications) — each a lime check chip + title + one-line description, 3-col grid. Hover: lift `translateY(-8px)` + lime glow + border tint.

**Testimonials:** centered header + a fixed-height crossfade carousel (5 client quotes with avatar/name/role) — one card visible, outgoing fades out (0.3s) then incoming fades in (0.45s @ 0.22s delay), auto-advances every ~5.2s (pauses on hover), prev/next circle arrows + expanding dot indicators. Avatars are compressed 200×200 webp.

**FAQ teaser / footer:** footer has 4 link columns + a bottom bar with legal links (Terms/Privacy/Cookies → Notion URLs) left-aligned and Instagram/LinkedIn right-aligned (real profile URLs, new tab), aligned to the 1360px content edges.

### 2. Contact modal (in `Hero.dc.html`) + Contact page (`Contact.dc.html`)
Opened by every non-Stripe CTA. Centered dialog (max 660px) over a blurred backdrop; animates in (opacity + translateY/scale), closes on X / backdrop / Esc; locks body scroll.
**Multi-step form (3 steps)** with a 3-segment lime progress bar and "Step N of 3 · <label>":
- Step 1 "Your details": Name*, Email*, Company, Phone (2-col, stacks on mobile).
- Step 2 "Your project": "What can we help with?"* (custom dropdown), conditional detail dropdown (options depend on topic), Budget + Timeline dropdowns.
- Step 3 "Anything else": free-text message.
Nav: Back (hidden step 1) + Continue (steps 1–2) / Send message (step 3). Per-step validation. On success: swap form for a personalized confirmation ("Thanks <first name>…").
- **Smart pre-fill:** the opener passes an intent (demo, plan+plan name, ai-platform, ai-consultation, addon+service) that selects the topic/detail and adapts the heading ("Let's book your demo", "Let's scope your creative", etc.). The standalone `Contact.dc.html` reads the same from URL query params (`?intent=…&plan=…&service=…`).
- **Custom dropdowns:** native `<select>` is hidden and mirrored by a dark styled panel (chevron flips on open, white options with hover highlight, lime for selected) so the option list matches the dark theme.

### 3. FAQ page (`FAQ.dc.html`)
Accordion of FAQ items (`<details>`-style, lime plus icon rotates on open).

## Interactions & Behavior
- **CTA hover (all buttons):** lift `translateY(-2px)` over 0.25s `cubic-bezier(0.22,1,0.36,1)`; solid/lime buttons add lime glow `0 14px 32px -12px rgba(181,230,2,0.5)`; ghost/outline buttons brighten bg to `rgba(255,255,255,0.1)` + border `rgba(255,255,255,0.28)`. No icon movement.
- **"Request a scope" hover:** text turns lime; the circular arrow chip fills lime with a dark navy arrow. No movement.
- **Reveal-on-scroll:** capability cards and why-cards fade + slide up with staggered delays as they enter the viewport (driven by scroll listeners in the logic class).
- **Marquees:** logo strip and mobile service chips loop infinitely via a `translateX(0→-50%)` keyframe (duplicated content).
- **Testimonials:** auto-advance + crossfade as described; pause on hover.
- **Modal:** open/close animations, Esc + backdrop close, body-scroll lock, multi-step navigation with validation.
- **Contact submit:** see State Management (Supabase/Resend hooks).

## State Management
Home logic class (`class Component`) holds:
- Testimonial carousel index (auto-advance timer, pause flag).
- Contact modal: current topic, current step (1–3), submitting/submitted flags.
- Custom-dropdown open/selected state (per select).
- Refs for videos (with localStorage playback-position persistence), reveal grids, modal nodes.

**Contact submission** (in `cmSubmit`): builds a payload `{name,email,company,phone,topic,detail,budget,timeline,message,source_url,created_at}` and POSTs to **Supabase** (`{SUPABASE_URL}/rest/v1/{TABLE}` with apikey/Authorization headers), then optionally pings a **Resend** notify endpoint. Config constants are currently empty placeholders (`SUPABASE_URL`, `SUPABASE_ANON_KEY`, `TABLE='contact_submissions'`, `NOTIFY_ENDPOINT`). With no backend configured it falls back to storing submissions in `localStorage` and showing the success state. **In the real app, wire this to the actual backend (Supabase table + RLS insert policy, and a serverless function that emails via Resend).**

## Design Tokens
**Colors**
- Base background navy: `#0c1321`
- Card / panel navy: `#12182b`, dialog `#0f1729`
- Brand lime (accent, `--sprint-lime`): `#b5e602` (rgb 181,230,2)
- Text: white `#ffffff`; muted `rgba(255,255,255,0.62)`; faint `rgba(255,255,255,0.42–0.55)`
- Borders / hairlines: `rgba(255,255,255,0.08–0.16)`
- Surface fills: `rgba(255,255,255,0.03–0.09)`
- Gradient stops (glows/cards): indigo `rgba(93,107,255,x)`, violet `rgba(138,92,255,x)`, cyan `rgba(0,200,255,x)` → transparent. Header/ambient glows use indigo/violet (never lime→navy).
- Error text: `#ff8a8a`

**Typography** — from the design system CSS (`_ds/…/colors_and_type.css`): `--font-sans` (primary UI/headings, weights 500/600) and `--font-mono` (`.s-mono` — labels/eyebrows, uppercase, letter-spacing ~0.06–0.08em). Map these to the codebase's sans + mono families. Headings weight 600, tight letter-spacing (−0.02 to −0.035em). Eyebrows: bracketed uppercase in lime (`[ LABEL ]`). Headline periods are lime (`.s-dot`).
- h1: `clamp(44px,5vw,76px)`, line-height 0.94
- section h2: `clamp(30px,4.4vw,58px)`, line-height ~1.05
- body: 15–19px; small/mono labels: 11px

**Radius:** cards 4px; larger cards/dialog 6–12px; pills/circles 50%/999px.
**Shadows:** card `0 20px 44px -28px rgba(0,0,0,0.7)`; dialog `0 50px 130px -50px rgba(0,0,0,0.9)`; lime glow `0 14–26px … rgba(181,230,2,0.4–0.5)`.
**Spacing:** 1360px max content, 48px gutters (22px mobile); section vertical padding ~96–120px (60px mobile); grid gaps 20–24px.
**Easing:** `cubic-bezier(0.22,1,0.36,1)` for most transitions/reveals.
**Breakpoints:** 1100 (grids →2col), 980 (nav→hamburger, side-by-side→stack), 768 (padding shrink), 640/600 (single column, form 2-col→1col).

## Assets
- `assets/sprint-logo-white.svg` — Sprint wordmark.
- `assets/logos/logo01–11.svg` — client wordmarks for the trust marquee (placeholders; swap for real client logos).
- `assets/icons/*.svg` — Lucide-style stroke icons (megaphone, palette, monitor, clapperboard, printer, app-window, calendar-clock [rolling terms], circle-pause [pause anytime], check-bold, arrow-right, etc.) used as CSS masks (color via `background`) or `<img>`.
- `assets/team/skye|graham|trae|can.webp` — team headshots (200×200, compressed) for the "senior team" avatar cluster.
- `assets/testimonials/*.webp` — client testimonial headshots (200×200).
- **Showreel video:** hosted on CDN — `https://r2.vidzflow.com/source/ed0f5832-15ba-4b45-9c00-74433019fddf.mp4` (used in both hero frame and showreel player; muted autoplay loop).
- `exports/team-card-gradient-1920.png` — the team-card gradient exported as a 1920×1920 image (for reuse).

## Files
- `Hero.dc.html` — the full home page (primary reference). All sections, the contact modal, and the logic class live here.
- `Contact.dc.html` — standalone contact page (same form, query-param pre-fill).
- `FAQ.dc.html` — FAQ accordion page.
- `support.js` — the DC runtime (reference only; do not port).
- `assets/`, `_ds/` — icons, logos, team/testimonial images, and the design-system color/type CSS + bundle.

Note: the design-system CSS provides the `--sprint-lime`, `--font-sans`, `--font-mono`, `.s-eyebrow`, `.s-mono`, `.s-dot` tokens/classes referenced throughout. Map these onto the target project's design system.
