# Sprint Design System

> A high-fidelity design system for **Sprint** — a Fort Worth creative agency.
> Use this to mock, prototype, or ship anything that needs to look and sound like Sprint.

---

## 1. Brand at a glance

**Who they are.** Sprint is an unlimited branding & design subscription service for Fort Worth businesses that need fast, consistent creative work without hiring an in-house design team. Established 2011.

**What they sell.** Subscription bundles of work, billed monthly:

- **Brand identity** — logos, brand systems
- **Digital presence & strategy** — websites, social, marketing
- **Print** — flyers, decks, packaging
- **Video production** — broadcast-standard motion & animation

**How they sound.** Fast. Punchy. Confident, never cute. Plain American English with a Fort Worth-y, no-nonsense tone. The word *unlimited* is doing real work in the marketing.

**Visual one-liner.** Deep-navy canvas (`#0c1321`). One screaming lime green accent. Big, semibold sans-serif headlines. Monospace bracket labels (`[ STUDIO ]`) hovering over everything like crop-marks on a printer's proof.

---

## 2. Sources & inputs

These are the raw materials this system was built from:

| File | What it is |
|---|---|
| `uploads/Screenshot 2026-05-13 184956.png` | Hero / landing — black bg, italic SPRINT logo, "MAKE YOUR BRAND AS STRONG AS YOUR REPUTATION" with green text-highlight |
| `uploads/Screenshot 2026-05-13 185034.png` | "Who we are" — light bg, big "Everything you need to launch and grow, fast." in lime green, square-bullet checklist |
| `uploads/Screenshot 2026-05-13 185051.png` | "Case Studies" — black bg, 3 image cards with darkened backgrounds and "View Case Study" pill button |
| `uploads/Screenshot 2026-05-13 185108.png` | "What we do" services accordion — light bg, `[01] [02] [03] [04]` mono indices, `+` expanders |
| `uploads/Screenshot 2026-05-13 185123.png` | Pricing — three plan cards (white / lime / black) + 5-star testimonial card |
| `uploads/SPRINT_VIBE_LOGO.png` | Lime circle "vibe" badge with italic black SPRINT wordmark |
| `uploads/SPRINT_LOGO_BLK.svg` | Master wordmark — italic, with a subtle horizontal speed-line gradient through the middle |

No codebase, Figma, or production source files were provided. Everything else (semantic tokens, spacing, component variants, UI kit code) is inferred from the screenshots and the user's stated palette/type rules.

---

## 3. Content fundamentals

### Voice
**Fast, confident, plain.** Sprint sells speed and reliability, so the copy itself reads quickly: short sentences, declarative claims, no filler. They favor active verbs (*launch*, *grow*, *partnered*, *transform*) over adjectives.

- ✓ "Everything you need to launch and grow, fast."
- ✓ "Most requests are delivered in days, not weeks, so your marketing can move quickly."
- ✗ "We're a passionate creative collective dedicated to..." — too soft, too agency-cliché.

### Person
**Second-person, addressing the customer.** "Make **your** brand as strong as **your** reputation." First-person plural ("we", "we've helped") is used sparingly in the *Who we are* slot.

### Casing
- **Headlines:** Sentence case (`Who we are.` / `What we do.` / `Set monthly pricing.`)
- **Hero display:** ALL CAPS when paired with the green highlight ("MAKE YOUR BRAND AS STRONG AS YOUR REPUTATION") — this is the only place ALL CAPS shows up in marketing copy.
- **Section eyebrows:** `[ ALL CAPS IN MONO BRACKETS ]` — `[ STUDIO ]`, `[ PROJECTS ]`, `[ SERVICES ]`, `[ BRAND IDENTITY ]`, `[ EST 2011 ]`, `[ $2,500/m ]`.
- **List items / button labels:** Title Case — "Get in touch", "View Case Study", "Brand Identity".

### Punctuation
- **Trailing period on H2s and section headers** — and that period is colored lime green: `Who we are.` `Case Studies.` `What we do.` This is a system-wide signature. Always include the period; always paint it green.
- **Periods inside the lime highlight.** When a sentence ends on a highlighted word (e.g. `…as strong as your reputation.`), the period sits **inside** the highlight span and inherits its foreground color (black on lime). Never let a stray black period dangle outside the green block.
- **Brackets** wrap every eyebrow / mono label. Spaces inside: `[ STUDIO ]` not `[STUDIO]`.
- **Em dashes & ampersands** used freely in list copy ("Digital Presence & Strategy").
- **Pipes in caption strings:** `[ DALKIA | EDF ENERGY ]`.

### Emoji & slang
**Never.** No emoji in marketing copy. No exclamation marks. No "let's", no "yay", no "magic". The only "punctuation as decoration" is the green dot and the green text-highlight.

### Example tone snippets
> **Hero:** "Make your brand as strong as your reputation."
> **Sub:** "Unlimited branding and design support for Fort Worth businesses that need fast, consistent creative work without hiring an in-house design team."
> **Service eyebrow:** `[ BRAND IDENTITY ]`
> **Testimonial caption:** `[ DALKIA | EDF ENERGY ]`

---

## 4. Visual foundations

### Color
**A near-black navy base with one screaming lime accent.** No gradients allowed except the speed-line inside the wordmark. A small set of extended accents exists for data-viz and tags, but lime stays the brand.

| Token | Hex | Role |
|---|---|---|
| `--sprint-black` | `#0c1321` | Primary dark surface, primary text on light |
| `--sprint-white` | `#ffffff` | Primary light surface, primary text on dark |
| `--sprint-lime` | `#b5e602` | The brand. Highlight, accent, CTAs, dot, eyebrow swatch |
| `--sprint-lime-soft` | `#d7ffaa` | Companion mint — rare, for soft accents/backgrounds |
| `--accent-cyan / -indigo / -violet / -orange / -emerald` | `#00C8FF` `#5D6BFF` `#8A5CFF` `#FF8A00` `#00C875` | Extended accents — data-viz, tags, illustrative moments. **Secondary to lime; use sparingly.** |
| `--grey-100` → `--grey-900` | greys | Sections, dividers, muted body |

Sections alternate between **deep navy** (`--sprint-black` `#0c1321`) and **near-white grey-100**. The lime is used as a *spike* — one highlight per screen, never wallpapered. The extended accents (cyan / indigo / violet / orange / emerald) are reserved for charts, tags and illustrative moments — never as a second brand color.

### Type
- **Family:** [Geist](https://vercel.com/font) sans for everything, [Geist Mono](https://vercel.com/font) for eyebrows, indices, and caption strings.
- **Display / hero / slogan:** uses `--font-hero` — set to **Montserrat Black 900, italic, uppercase**. This is the *only* place Montserrat is used; reserved for the biggest display moments (hero H1, footer slogan, billboard-style headers). H2/H3 section heads, body, UI labels — all Geist or Geist Mono.
- **Headline weight:** Geist **Semibold (600)** is the canonical headline weight everywhere else (per brand spec).
- **Letter spacing:** Headlines run slightly tight (`-0.02em`). Mono eyebrows run a touch wider (`+0.08em`).
- **Period treatment:** Every section H2 ends in `.` and that period is `--sprint-lime`.
- **Highlight treatment:** Lime block sits behind selected words in the hero/CTA. Background `--sprint-lime`, foreground black, ~0.18em horizontal padding, no rounding.

### Layout
- **Generous vertical whitespace.** Sections breathe — a marketing block is usually ~25% headline, ~75% air.
- **Eyebrow above headline, always.** Pattern: `[ MONO LABEL ]` → big H2 with green dot → optional sub-eyebrow on the right.
- **Hairline dividers** below section headers separate the title slug from the body. Color is `rgba(0,0,0,0.12)` on light, `rgba(255,255,255,0.16)` on dark.

### Backgrounds & textures
- **Flat solid colors only** — no gradients, no patterns, no noise.
- The only image treatment is **darkened photo backgrounds** on case-study cards: ~50–70% black overlay so white text reads.
- **No hand-drawn illustrations, no abstract shapes.** The brand mark is the only graphic flourish.

### Imagery vibe
- Real product photography from client work — warm, slightly desaturated, low-key lit.
- Heavily darkened when used as a background; full color when shown as a thumbnail/portfolio piece.
- No stock photography of smiling teams or laptops.

### Corner radii
- Cards: **`12px` (lg)**.
- Buttons & chips: **`4–6px` (sm)** — almost square. Buttons are rectangular pills with a square arrow icon block.
- Inputs: **`6px`**.
- Pure rounded (`999px`) is **only** for the avatar in testimonials and the lime "vibe" logo.

### Borders
- Light surfaces: `1px solid rgba(0,0,0,0.10)` for hairlines.
- Dark surfaces: `1px solid rgba(255,255,255,0.10)`.
- Pricing cards on white background carry no border — they sit on `--grey-100` and use color (white / lime / black) as the separator.

### Shadows
- **Sparingly.** Most cards on flat surfaces use no shadow at all.
- `--shadow-card` (`0 8px 24px rgba(0,0,0,0.08)`) for floating elements like the testimonial chip.
- `--shadow-lime` (`0 6px 20px rgba(181, 230, 2, 0.35)`) reserved for "this is the recommended plan" hover states.

### Motion
- **Snappy and short.** Sprint *is* speed.
- `--dur-base: 220ms` with `--ease-standard` is the workhorse.
- Hovers fade between black/lime fills, never grow or bounce.
- No parallax. No scroll-jacking. No carousel auto-advance.

### Hover & press states
- **Buttons (dark on light):** hover swaps the fill to lime, text stays black.
- **Buttons (light on dark):** hover swaps the fill to lime, text flips to black.
- **Press:** 96% scale, `--dur-fast`.
- **Links:** underline appears on hover, color stays the same.
- **Accordion rows:** the green `+` rotates to `×` and the row's text inches right by ~4px.

### Transparency & blur
Used essentially **never**. The brand is opaque and confident. The only translucency is the photo-overlay scrim on case-study cards.

### Cards
- Square-ish, minimal shadow, generous interior padding (`--space-7` / 48px).
- A pricing card's *plan* color (white / lime / black) is its only chrome — no border on the lime or black variants.

### Layout rules
- **Max content width:** ~1280px.
- **Grid gutter:** 24px (`--space-5`) on desktop.
- **Page margin:** clamp from 24px (mobile) up to 96px (desktop).
- The bracketed eyebrow always sits *on the same vertical axis* as the headline — they share a left edge.

---

## 5. Iconography

Sprint's icon vocabulary is **minimal and utilitarian**:

- **Arrow forward (`→`)** inside a small filled square is the universal "go" icon — appears on every button. White block on dark CTAs, black block on light CTAs.
- **Plus (`+`)** in lime green for accordion expanders.
- **Four-point star / sparkle (`✦`)** in lime green as the list bullet on pricing plans.
- **Solid square (`▪`)** in lime green as the bullet on services lists (smaller than the sparkle, used inline).
- **Five-pointed stars (`★`)** in lime green for the testimonial rating row.
- **Hamburger (`≡`)** for the mobile/header nav menu — three short white bars, no chrome.
- **The lime "swatch dash"** — a 48×6 marker line that prefaces section eyebrows. Filled with a horizontal gradient (`transparent → #b5e602`) and pill-rounded on the right end only (`border-radius: 0 999px 999px 0`). Left edge fades to nothing, so the marker reads like it's *arriving* at the bracket.

**No emoji**, ever. **No unicode dingbats** beyond the sparkle/star above. **No icon font dependency** — every icon is either a unicode char or a small inline SVG (`assets/icons/`).

For anything beyond this kit (mostly product/service-specific icons inside long-form copy), match the closest **[Lucide](https://lucide.dev)** icon at `1.5px` stroke, monochrome. Flag in review when used so we can vet brand fit.

### What's included in `assets/`

- `sprint-logo-black.svg` — master wordmark, black, with built-in speed-line gradient
- `sprint-logo-white.svg` — wordmark recolored for dark backgrounds (same paths, white fill)
- `sprint-vibe-logo.png` — lime circle badge wordmark
- `icons/` — two icon families:
  - **UI icons** (existing): `arrow-right`, `plus`, `sparkle`, `star`, `menu`, `close` — light-stroke (1.5–2px), inline-with-text size.
  - **Web suite** (new, heavy-stroke): `calendar`, `docs`, `meetings`, `projects`, `team`, `testimonials`, `sprint-mark`, plus extensions `video`, `lightning`, `message`, `check`, `briefcase`, `mail`, `search`, `play`. **19px stroke** on a `414.54 × 427.84` viewBox, no backgrounds, all paths set to `stroke: currentColor` so they tint freely to lime, mint, white, or black. Use these at section-marker scale (32–96px).

---

## 6. Components

The UI kit in `ui_kits/website/` is compiled into `_ds_bundle.js` and every component is exposed on `window.SprintDesignSystem_019e22`. Load the bundle, then destructure what you need:

```html
<script src="_ds_bundle.js"></script>
<script>
  const { Hero, Pricing, Button } = window.SprintDesignSystem_019e22;
</script>
```

| Component | Props | What it is |
|---|---|---|
| `Button` | `variant?: 'light' \| 'dark' \| 'lime'`, `onClick?`, `children` | Signature arrow-in-square CTA. Hover flips fill to lime. |
| `ArrowIcon` | `size?`, `color?` | The universal forward arrow used inside buttons. |
| `EyebrowSwatch` | `color?`, `children` | Mono `[ LABEL ]` eyebrow with the 48×6 lime marker dash. |
| `EyebrowBracket` | `color?`, `children` | Plain bracketed mono label (no swatch). |
| `SectionHeader` | `eyebrow`, `title`, `subEyebrow?`, `onDark?`, `align?` | Eyebrow + big H2 with the lime period + optional sub-eyebrow. |
| `Primitives` | — | Showcase of all the atoms above (Button, eyebrows, arrow). |
| `Header` | `children?` | Black pill nav with italic SPRINT wordmark + hamburger. |
| `Hero` | `children?` | Navy hero — `[ EST 2011 ]`, ALL-CAPS headline with lime highlights. |
| `Logos` | `children?` | Client logo strip. |
| `WhoWeAre` | `children?` | Light “Who we are.” block with a 3-column feature list. |
| `CaseStudies` | `children?` | `[ PROJECTS ]` section with three darkened photo cards. |
| `Services` | `children?` | Light accordion list `[01]…[04]` with the green plus. |
| `Pricing` | `children?` | Three pricing cards (white / lime / black) + testimonial. |
| `Footer` | `children?` | Footer with the big SPRINT mark, sitemap & legal. |

The page-section components (`Header` … `Footer`) take no configuration — they render the canonical Sprint homepage blocks. The atoms in `Primitives.jsx` (`Button`, `SectionHeader`, eyebrows, `ArrowIcon`) are the reusable building blocks for new layouts.

---

## 7. Index — what's in this folder

```
.
├── README.md                  ← you are here
├── SKILL.md                   ← Claude/Agent Skill front-matter
├── colors_and_type.css        ← every token + utility class
├── _ds_bundle.js              ← compiled components (generated)
├── _ds_manifest.json          ← design-system manifest (generated)
├── _adherence.oxlintrc.json   ← lint rules for adherence (generated)
├── fonts/                     ← Geist + Montserrat variable fonts
├── assets/
│   ├── sprint-logo-black.svg
│   ├── sprint-logo-white.svg
│   ├── sprint-vibe-logo.png
│   └── icons/*.svg
├── preview/                   ← Design System tab cards
│   ├── colors-*.html
│   ├── type-*.html
│   ├── spacing-*.html
│   ├── components-*.html
│   └── brand-*.html
└── ui_kits/
    └── website/
        ├── README.md
        ├── index.html         ← full homepage; loads _ds_bundle.js
        ├── *.jsx               ← exported DS components (Hero, Pricing, Button, …)
        └── *.d.ts              ← type/prop declarations per component
```

The `ui_kits/website/*.jsx` files are compiled into `_ds_bundle.js` and exposed on
`window.SprintDesignSystem_019e22`. Consume them with
`const { Hero, Button } = window.SprintDesignSystem_019e22` after loading the bundle —
see `ui_kits/website/index.html` for the canonical wiring.

---

## 8. Caveats & open questions

- **Geist now loaded locally** from `fonts/Geist-VariableFont_wght.ttf` + `Geist-Italic-VariableFont_wght.ttf` (uploaded by the brand). **Geist Mono is still loaded from Google Fonts** — drop a local `GeistMono-VF.ttf` into `fonts/` and add a third `@font-face` block to `colors_and_type.css` whenever the file is available.
- **No codebase or Figma file** was provided — components in `ui_kits/website/` are reconstructed pixel-by-pixel from the five hero screenshots, not from production source. They are now exported as design-system components (compiled into `_ds_bundle.js`); if you have a repo or a Figma, importing it would let us tighten spacing, hover states, and the case-study cards' photo treatment.
- **Base color is deep navy `#0c1321`, not pure black.** Earlier drafts used `#000000`; everything (tokens, guidance, cards) now references the navy. An extended accent palette (cyan / indigo / violet / orange / emerald) was added for data-viz and tags — lime remains the sole brand accent.
- **Only the marketing site was provided.** No dashboard / admin / customer portal exists in this kit. If those products are real, share screenshots or a repo and they'll get their own UI kit.
