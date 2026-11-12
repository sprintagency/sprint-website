# Sprint Video: ranking improvements

What would make sprintvideo.co.uk rank higher, with the evidence for each item.
Researched 2026-11-12 from a crawl of all 21 pages, local Lighthouse runs, and web research on competitors.

Confidence labels:

- **Strong evidence**: measured on the site, or seen directly in search results and competitor pages.
- **Reasonable inference**: follows from the evidence and from standard SEO practice, but not measured.
- **Guess**: plausible, low data.

## A caveat to settle first

The web research could not reproduce Google UK results: its search tool runs from the US.
In those results, sprintvideo.co.uk did not appear on page 1 for the head terms ("explainer video production UK", "animated video production UK", "explainer video company Scotland").
Graham reports the site ranks well, which likely means long-tail and industry queries, or UK-only results the tool cannot see.
**The Search Console export in Phase 0 settles this.**
Re-rank this list against it: work first on the queries where the site already sits in positions 5 to 20, because those move fastest.

## Part A: ship at launch (low risk, technical)

These change how the site is built, not what it says, so they are safe to ship on the same day as the migration.

1. **Speed.** *Strong evidence.*
   Mobile Lighthouse performance is 30 on the homepage and 34 on an industry page.
   Largest Contentful Paint (when the main content appears) is 12.9 s and 16.3 s; Google's "good" threshold is 2.5 s.
   The homepage downloads 14.7 MB and blocks the browser for 16.4 s, mostly from 8 Wistia players that load before anyone presses play, plus 62 scripts.
   Page speed is a confirmed Google ranking signal through Core Web Vitals, although it is a modest one; the bigger gain is in enquiries, since slow pages lose visitors before they read.
   Fix: Astro static pages, video facades, no page builder CSS.
2. **Write the 15 missing meta descriptions.** *Strong evidence (measured).*
   Without one, Google writes its own snippet, often a poor one.
   A good description does not raise rank directly; it raises click-through, and clicks are what rankings are for.
3. **Add the 3 missing H1s** (`/getpricing/`, `/get-a-quote/`, `/quote-builder/`) *Strong evidence (measured).*
4. **Alt text on all images.** *Strong evidence (measured: 193 of 252 missing).*
   Helps image search and accessibility; small direct ranking value.
5. **Structured data.** *Reasonable inference.*
   Today only the Yoast default is present.
   Add LocalBusiness (Heathhall, Dumfries DG1 3JW; no telephone, the old number is no longer in service), Service per industry page, VideoObject per video (makes videos eligible for video results), and FAQPage where a page has real FAQs.
   Google no longer shows FAQ rich results for most sites, but FAQ content still helps AI answers and long-tail queries.
6. **Sibling-brand linking with madebysprint.com.** *Reasonable inference.*
   A "Part of Sprint" link in each footer, and `parentOrganization` / `subOrganization` in each site's Organization schema, tell Google the two are one group.
   This helps brand understanding; it is not a large ranking lever.
7. **Analytics with lead tracking.** *Strong evidence (no tag on the site today).*
   Not a ranking factor, but without it nobody can tell which pages win business, so nobody can tell which improvements worked.

## Part B: content growth (Phase 5, after 4 stable weeks)

8. **Give the 12 orphaned footer topics real pages.** *Strong evidence (seen in the site's own HTML).*
   Explainer, Animated, Training, Employee Onboarding, Customer Onboarding, Customer Service, Corporate, Infographic, Construction, Fintech, Education and Educational videos all link to `/example-videos/`.
   So none of those searches has a page that can rank.
   Start with "explainer videos" and "animated videos": they are the business's head terms and have no dedicated page; the homepage carries them alone.
   Each new page needs real depth (about 600 to 1,000 words), its own example videos and a case study, not a template with the noun swapped.
9. **Deepen the 11 industry pages.** *Strong evidence (measured: about 210 to 250 words each, one shared template).*
   Add the problem the industry faces, how video solves it, the process, a named case study with an outcome, and 3 to 5 FAQs.
10. **Fix overlapping healthcare pages.** *Reasonable inference.*
    `/healthcare-explainer-videos/`, `/healthcare-and-medical-device-videos/` and `/medical-device-animations/` target close variants of the same searches, so they compete with each other.
    Use Search Console to see which one Google prefers for each query; give each a distinct intent, or merge the weakest into the strongest with a 301.
11. **Publish a pricing page with real £ figures, plus an FAQ.** *Strong evidence.*
    "Explainer video cost UK" is answered by studios publishing ranges (for example Lost Marble Media, Outmost, Whito).
    Sprint Video sells on "fixed price" but hides the price behind a brochure form.
    This also resolves OPEN 2 in the plan: consolidate the three quote pages around it with 301s.
12. **Case studies with outcomes.** *Reasonable inference.*
    The named clients on the site (Miller Insurance, Honda Europe, Dalkia EDF, Insource) are strong proof.
    One page each: brief, approach, the video, the result.
13. **A guides hub for questions a small studio can win.** *Reasonable inference.*
    "How much does an explainer video cost", "explainer video script template", "how long should an explainer video be", "medical device animation and MHRA compliance".
    Competitors that rank (Venture Videos, Outmost, Cuillin Collective) all publish guides.
    One strong guide a month beats four thin ones.
14. **A full white-label agency-partner page.** *Reasonable inference.*
    Few UK studios target "white label animation"; b2w.tv ranks with a dedicated page and visible starting price.
15. **Process page, team and credentials.** *Reasonable inference.*
    Named founder and team on About, a "how we work" page, any awards.
    These feed Google's E-E-A-T quality signals (Experience, Expertise, Authoritativeness, Trustworthiness).
16. **Location: "Scotland" and "Dumfries and Galloway", not Glasgow or Edinburgh.** *Guess (low search volume).*
    The studio is in Dumfries.
    City pages for places it is not based in risk being treated as doorway pages (thin pages made only to rank), which Google penalises.

## Part C: off-site (people work, not code)

17. **Get listed and reviewed on Clutch, then Sortlist and GoodFirms.** *Strong evidence.*
    Directory list pages (Clutch, advids, Sortlist) fill much of page 1 for the head terms.
    Small UK studios appear in those lists with 4 to 20 verified reviews.
    Sprint Video has a GoodFirms profile with no reviews and no Clutch profile was found.
18. **Claim and complete the Google Business Profile for the Dumfries address; ask past clients for Google reviews.** *Reasonable inference.*
    No profile surfaced in research; Graham should check directly.
    "Since 2011" and a long client list is a large untapped review base.
19. **Add LinkedIn, YouTube and Vimeo profiles to the site's `sameAs` links.** *Reasonable inference.*
    The site links only Facebook, X and Instagram.

## Sources

- Site crawl and Lighthouse runs: `SEO-BASELINE.md`, `seo-baseline.json` in this folder.
- https://clutch.co/agencies/video-production/explainer/uk
- https://clutch.co/profile/cuillin-collective
- https://advids.co/agencies/top-explainer-video-studios-scotland
- https://www.sortlist.co.uk/s/motion-design/dumfries-and-galloway-scotland-gb
- https://www.goodfirms.co/company/sprint-video-production
- https://www.lostmarblemedia.com/explainer-video-cost-uk/
- https://whito.co.uk/research/uk-video-marketing-costs/
- https://outmost.studio/
- https://www.venturevideos.com/
- https://www.thecuillincollective.com/
- https://www.b2w.tv/services/white-label-animation-for-agencies
- https://axs3d.com/locations/medical-animation-uk/
