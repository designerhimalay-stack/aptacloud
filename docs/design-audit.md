# Design audit: problems and bugs (2026-10-28)

How this was audited:
- **Automated crawl:** all 52 pages at 1440 px and 390 px, collecting computed styles (type scale per heading level, paragraph sizes, section padding, container edges, card radius and padding, button and pill metrics, and image resolution). The crawl also checked rendered text for em dashes, mojibake (garbled characters), double spaces, and stray spaces.
- **Visual review:** representative templates at 1440, 1024, and 390 px.

Severity: **P0** breaks trust or function; **P1** visible inconsistency a professional would spot; **P2** polish or a needs-asset item.

## Fixed

| # | Sev | Area | Problem | Fix |
|---|---|---|---|---|
| 1 | P1 | Typography | The service CSS used 40 font sizes, including half-pixel steps (12.5, 13.5, 14.5, 15.5, 16.5, 17.5, 18.5) and odd tiers (19, 21, 23, 25, 29). Card titles sat at 8 near-identical sizes. | One scale for the service CSS: 12 · 13 · 14 · 15 · 16 · 18 · 20 · 22 · 26 · 28 · 32, then the heading tiers. Card titles 20, small titles 18, card body 15, meta 13. (154 declarations changed.) |
| 2 | P1 | Typography | Section H2s were 44 px on sub-pages and 48 px on the home page. | Sub-pages now match the home page: 48 / 40 / 28 px (desktop, tablet, phone). |
| 3 | P1 | Typography | Banner H2s (38 px) and FAQ H2s (40 px) were near-identical but different tiers. | Both are 40 px. |
| 4 | P1 | Copy rhythm | "More in [category]" was the only H2 without a full stop (52 pages). | Full stop added, matching every other H2. |
| 5 | P1 | Cards | Card padding was asymmetric and uneven (32/26/30, 26/26/28, 26/28/28, 26/26/24). | Two tiers: 24 px (compact) and 28 px (roomy). |
| 6 | P1 | Cards (phone) | Primary cards mixed 20 and 22 px radii at phone width. | Primary phone cards are 22 px; compact items stay 20 px. |
| 7 | P1 | Controls | Pill tab controls varied from 37 to 47 px tall. | Tabs and blog topic filters share one spec: 11/18 px padding at 15 px. |
| 8 | P1 | Stats strip | The "numbers" band used two wordings: "Years in technology strategy · Cloud and AI experts · Projects delivered" on some pages and the approved credentials on others. | One source: 20+ years of experience, 300+ clients served, 200+ engineers under one roof. |
| 9 | P1 | About | The fourth stat (4 delivery locations) wrapped to a second row and showed "4+". | The grid follows the stat count; "4" has no plus sign. |
| 10 | P1 | Phone chips | Compliance chips stacked as up to 10 full-width rows; the split-section chips and heading were centred, which orphaned "for". | Chips wrap at natural width, align left with the section head, and use a compact size (30 px icon, 14 px text). |
| 11 | P0 | CRO | Duplicate buttons: three identical plan buttons, four identical "Talk to an Azure specialist" links, and the primary CTA repeated in up to 8 places per page. | One rule for every page (see `SUMMARY.md`: CRO). A CTA audit finds no duplicate buttons in any section. |
| 12 | P0 | Copy | Rhetorical questions in banners, CTAs, intros, and UI text. | More than 40 rewritten as statements. Informational question headings ("Why choose AptaCloud?") stay for AEO. |
| 13 | P0 | Proof | Unapproved case studies, testimonials, client logos, and off-vertical project cards. | Replaced with "typical engagement" blocks or removed. |
| 14 | P1 | Privacy | The privacy page sat outside the site shell, with a mono uppercase "[ Legal ]" micro-label (against the label rule) and no nav or footer. | Rebuilt in the site shell with an Inter label, a contact section, and `noindex` until the real policy exists. |
| 15 | P1 | 404 | No 404 page (GitHub Pages showed its own). | Branded 404 with links back into the site and the contact form. |
| 16 | P1 | 404 / privacy | A forced full-screen min-height left an empty band above the contact section. | Removed. |
| 17 | P1 | Dark-on-dark | The privacy and 404 sections were dark directly above the dark contact section, so the two merged. | Both use the light tint, as the rest of the site does before a dark section. |
| 18 | P1 | Share image | No `og:image`, so links shared without a preview. | A 1200×630 brand card (`public/og-image.jpg`) by default; service and industry pages use their hero photo. |

## Open (needs assets or a decision)

| # | Sev | Area | Problem | What's needed |
|---|---|---|---|---|
| A | P0 | Contact form | The form submits via `mailto:`, so leads aren't trackable or stored. The SEO audit skill rates this P0. | A form backend (HubSpot, Microsoft Forms or Power Automate, Formspree) and its endpoint. Wire it up in `src/components/site/CTA.tsx` (`mailtoHref`). |
| B | P0 | Privacy | A placeholder policy only. | The approved privacy policy text from AptaCloud. Then remove `noindex` from `src/pages/privacy.astro`. |
| C | P2 | Hero photos | 7 industry heroes are 1440 px wide (live originals) and 40 more are 1600 px. They're soft on 1600 px+ and retina screens; the duotone and dark fade hide most of it. | Originals of at least 1920 px when available. |
| D | P2 | AI images | `people/ai-brain.jpg` and `people/ai-layers.jpg` are 640 px and shown at about 550 px, so they're soft on retina. | Higher-resolution versions from the supplier. |
| E | P2 | Hero H1 size | The hero title scales to its longer line by design, so H1 sizes range from 48 to 64 px across pages. | Fine as designed. Keep new titles to similar lengths (about 30 characters per line) to stay near 60 px. |
| F | P2 | Home | The home hero ticker and workshop indices are 11.5 px mono. This is the approved home design and is decorative. | None. |
| G | P2 | Leaders | The leadership cards show initials, because there are no portraits. | Portraits from AptaCloud. |

## Known audit false positives (not bugs)
- "Uneven columns" on split sections: the photo is sticky on desktop and stacks on tablet and phone.
- "Big gap" on chip and arc sections: the audit script doesn't measure SVG or inline chips.
- "Tight bottom" on `#top` and `#numbers`: the hero runs straight into the stats band by design.
