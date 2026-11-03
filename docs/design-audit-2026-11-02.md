# Strict design audit: desktop and iPhone SE (2026-11-02)

Earlier audit: [design-audit.md](design-audit.md).

## Status after the fix pass (2026-11-03)

Findings below are as first recorded. Their current state:

- **Fixed:** R1, R5, R6, D1 to D7, D9, D10, contrast, I1, I4, I5, I6, A1, A2, A4 to A7, T1, T3 to T6, C1 to C4, C8 (overflow only), C10, C11, C13, C14.
- **Partly fixed:**
  - R2: Google Cloud now appears only in migration copy. Google tools (BigQuery, Looker Studio, Vertex AI) remain in tool lists, matching the live pages.
  - I2: photos show their dominant colour while loading, not a blurred preview.
  - I3: the Industries cards now rotate through 4 to 5 photos per vertical, so each photo still appears on several pages.
- **Closed by owner decision:** R3 and R4 (claims stay), D8 (the switcher stays because the live site has one).
- **Waiting on the owner:** R7 (form backend), C12 (Mexico City address), A3 (matching leadership portraits; stock photos can't stand in for real people).
- **Left as is:**
  - I7: heroes stay soft on 2x phones. Their dark treatment hides most of it, and generic stock would lose the themed images.
  - T2: fractional hero sizes, by design. T7 is now 12 px.
  - C5, C6, C7, C9, and the rest of C8.
  - L1 to L6: page length and repeated copy need content decisions, not styling fixes.
  - The Microsoft Azure blue label on home (4.07:1) is Microsoft's brand colour.

**Correction:** L5 says the one-line statements break left alignment on phones. They already align left there.

## How this was checked

- **Build audited:** the production build of the current working tree, including the uncommitted Antigravity work. Type-check and build pass.
- **Screens:** iPhone SE 375×667 (2x, touch) and desktop 1440×900. Chromium device emulation, not a physical iPhone or Safari.
- **Automated crawl:** all 53 pages at both sizes: overflow, contrast, tap targets, type sizes, images, clipped text, console errors, failed requests.
- **By eye:** viewport-by-viewport frames of every page at both sizes, at reduced scale. Contact, footer, FAQ, stats, and "Keep exploring" were hidden on most sheets because they repeat. Those were inspected on reference pages and covered by the crawl.
- **Interaction tests:** mobile menu, swiping rails, form errors, hero load timing, JavaScript off, region switcher, 320 px and landscape.

**Not covered:** real-device Safari, VoiceOver, and tablet widths. Privacy and 404 were viewed by eye on desktop only; on phone they had the crawl only. Rail cards after the first were sampled by eye and crawled on every page.

**Severity:** **P0** breaks a project rule, trust, or function. **P1** is a visible flaw a professional would flag. **P2** is polish.

## Summary

| Severity | Count | Main themes |
|---|---|---|
| P0 | 7 | Off-vertical case studies, Google Cloud named, unapproved leadership and AWS claims, an event about to go stale, page blank without JavaScript, form leads not captured |
| P1 | 19 | Headings stranded on the right on phones, home rails cut short, contrast, tap targets, sticky hover, repeated photos, slow hero, heavy images |
| P2 | 27 | Type scale drift, tracking, copy casing, repetition, smaller component polish |

A further 7 items (A1 to A7) cover Antigravity's uncommitted work.

**Fix first:** D1 (right-aligned headings), D2 (home rails), and D5 (sticky hover). Each is a small CSS change that affects many pages.

## P0: rules, trust, function

| # | Where | Problem | Evidence | Fix |
|---|---|---|---|---|
| R1 | `/application-re-engineering/` "Case studies" | "Regional bank" and "Payments processor" case studies. Banking and payments are off-vertical, and these are unapproved proof. | `layouts/appmod.ts:479-495` | Replace with `label: "Typical engagement"` cases in the three verticals. |
| R2 | Azure pages, `/aws-migration-services/`, and FAQs on data and application modernisation pages | Google Cloud is named in copy, FAQs, and a diagram node. `SUMMARY.md` §4 says never GCP. | `services/microsoft.ts:844-910`, `layouts/azure.ts` (15+ lines), `layouts/data.ts:109`, `layouts/appmod.ts:187,194` | Owner decision: remove it, or record an exception for "migrating from GCP". |
| R3 | `/about-us/` Leadership | The "Co-founder" badges and the lead sentence ("United States, India, and Mexico engineering practices") have no approved source. The checklist lists leadership titles and photos as awaiting client approval. | `layouts/company.ts:70-105` | Get approval, or remove the badges and lead. |
| R4 | All AWS pages | "AWS-certified specialists" sits in every AWS hero, plus "by certified specialists" and "certified AWS architect". The checklist flags this wording for confirmation, yet it is the most prominent claim on those pages. | `ServiceHero.tsx:159`, `services/aws.ts:177,326`, `layouts/aws.ts:85,242,280,329` | Confirm with AptaCloud, or use "AWS partner". |
| R5 | `/events/`, `/about-us/` | "Next event" is static data for 3-4 Nov 2026 and shows as upcoming until someone edits it. It goes out of date on 5 Nov. | `layouts/company.ts:21-24` | Compare the date at build time and handle the no-next-event state. Rebuild after each event. |
| R6 | Every page | With JavaScript off or failing, the hero is blank: no H1, copy, or CTA. Reveal content is rendered at opacity 0.001, and there is no `<noscript>` fallback. | JS-off screenshot; `Reveal.tsx:45`, `:161` | Add a `<noscript>` style that forces reveals visible, or render the hero visible by default. |
| R7 | Contact form, every page | Leads open a `mailto:` link, so they are not captured. Already logged as open, and still the biggest conversion risk. | `CTA.tsx` | Needs a form backend from the owner. |

## P1: desktop and phone

### Layout

| # | Where | Screen | Problem | Evidence | Fix |
|---|---|---|---|---|---|
| D1 | 23 sections, listed below | Phone | Section heading and lead shrink to the right side of the screen, starting at up to x=232 instead of x=16. This is the most visible bug in the audit. | `.head` is `align-items: end` from `.headSplit` (`Section.module.css:131`). It is still applied once the phone layout turns the head into a column. | In the phone block at line 211: `.headSplit { align-items: stretch; }` |
| D2 | Home: About, Workshop, Why, Azure | Phone | Rails stop 32 px short of the right edge (`right: 343` on a 375 screen), so cards are cut by a hard vertical line in mid-air. Service-page rails correctly run to 375. | `About.module.css:283`, `Workshop.module.css:189`, `WhyWorkshop.module.css:205`, `Azure.module.css:132`: negative margins with 100% width. | Add `width: auto` or `width: calc(100% + 32px)`. |
| D3 | Single-case "Typical engagement" sections on segment pages, e.g. `/industry/insurance/carriers/` | Phone | One card still uses the 288 px rail width, leaving 71 px empty on the right. It looks unfinished, and nothing follows to swipe to. | Measured: card 16 to 304, rail 375, 1 item. | When a rail has one item, make it full width (343 px). |
| D4 | Mobile menu | Phone | The sheet's outline stops about 100 px above its bottom edge (y≈340 vs 438), so the panel appears to dissolve. There is no scrim, so the hero's red CTA and ticker remain visible directly under a white "Let's talk", giving two competing CTAs. | Settled screenshot. Pill spans 24-438. | Close the outline around the whole sheet. Dim the page behind it. |

### Interaction

| # | Where | Screen | Problem | Evidence | Fix |
|---|---|---|---|---|---|
| D5 | Site-wide | Phone | Hover styles stick after a tap. For example, the form's submit button stays red after tapping, and cards stay lifted. | 55 `:hover` rules, 0 inside `@media (hover: hover)`. `CTA.module.css:408`. | Wrap hover rules in `@media (hover: hover)`. |
| D6 | Primary red button, every page | Both | The white label on red is 4.37:1 at 16 px, just under the AA minimum of 4.5:1. This is the most important control on the site. | Crawl, 51 pages. | Darken the button red slightly. |
| D7 | Rows below | Phone | Tap targets are under 44 px. | Crawl, table below. | Add padding or `min-height: 44px`. |
| D8 | Region switcher (AU, US, IN, UAE) | Both | It changes nothing: same content, same URL. It is fixed on screen on desktop, and defaults to AU while the phone numbers shown are US. A control that does nothing reduces trust. | Tested on `/ai-agents/`. | Link it to something real, or remove it. |
| D9 | Hero entrance | Both | The CTA is not fully visible until 2.8 s on a throttled phone and 1.3 s on desktop, even after the page has loaded (1.2 s and 0.2 s). The animation delays the main action. | Timed with 4× CPU and slow network on phone; no throttling on desktop. | Show the CTA within about 0.6 s and shorten the stagger. |
| D10 | Fill headings, every section | Both | Headings start at about 1.4:1 contrast (`#d0d0ca` on light, `#3a3a3a` or `#fff3` on dark) and only finish filling once they reach 45% of the screen. Much of each scroll shows a heading that can barely be read. | `FillHeading.tsx:39`; values measured on home. | Fill earlier, e.g. `["start 0.95", "end 0.7"]`, and raise the start colour. |

### Tap targets (D7)

| Element | Size (px) | Pages |
|---|---|---|
| Footer legal link | 78×16 | All |
| Breadcrumbs | 34×15 | 50 |
| FAQ "Go to the form" and email link | 20-21 tall | 45 |
| Banner "Let's talk" | 23 tall | 29 |
| Footer links | 30 tall | All |
| Nav logo | 124×32 | All |
| Mobile menu child links | 34 tall | All |
| Footer social icons | 36×36 | All |
| Hero "How we deliver" | 36 tall | 44 |
| Region chips in menu | 36 tall | All |
| Plan switch, tabs, card links, deep-dive links, contact rows | 39-41 tall | Many |

### Headings affected by D1 (x position of the H2)

| x | Sections |
|---|---|
| 232 | `/data-visualization/#tools`, `/data-warehousing/#tools` |
| 208 | `/careers/#locations` |
| 193 | `#process` on `/aws-implementation/`, `/azure-managed-services/`, `/generative-ai/`, and Microsoft `cloud-storage`, `identity-security`, `microsoft-365`, `power-platform`, `sharepoint` |
| 173, 64 | `/about-us/#articles`, `/about-us/#events` |
| 161, 132 | `/whitepaper/#articles`, `/whitepaper/#papers` |
| 21-136 | `#articles` on `/industry/insurance/` carriers, managing-general-agents, third-party-adjusters; `/industry/oil-gas/` drilling-and-well-services, major-operators, pipeline-maintenance |
| 36, 31 | `/blog/#articles`, `/services/microsoft/power-bi/#industries` |

### Contrast below AA

White-on-red is covered in D6. Figures are from the crawl. Some text uses more than one background.

| Element | Size | Ratio | Pages |
|---|---|---|---|
| "Typical engagement" label | 12 px | 3.36 | 9 |
| Office label ("Headquarters") | 12 px | 3.72 | 9 |
| "Microsoft first" pill | 12 px | 3.91 | 2 |
| Industry card name | 13 px | 3.93-4.37 | 29 |
| Article category | 13 px | 3.93-4.37 | 15+ |
| Step numbers (`.tnode`, `.plainNo`, `.phaseNo`, `.arcNo`, `.cno`) | 12-15 px | 3.93-4.37 | 20+ |
| FAQ "Go to the form" | 13-14 px | 3.93-4.37 | 45 |
| Leadership badge and role | 12 px, 15 px | 3.97, 4.21 | 1 |
| Industry segments line | 13 px | 4.17-4.27 | 21 |
| "Swipe" hint | 12 px | 4.17-4.27 | 50 |
| "Keep exploring" label | 12 px | 4.17-4.27 | 50 |

**Fix:** use a darker red for small text on light backgrounds, and raise the muted grey one step. The red on 13 px labels is the common cause.

### Images

| # | Where | Problem | Evidence | Fix |
|---|---|---|---|---|
| I1 | Every photo | No `srcset` or modern formats, so phones download the same 1400-1600 px JPEGs as desktop. A full scroll loads a median 1.9 MB of images per page, and up to 3.9 MB. 14 files exceed 300 KB, the largest being `b-majors.jpg` (621 KB) and `legacy-rack.jpg` (597 KB). | Crawl; `Photo.tsx` has no `srcset` | Generate AVIF or WebP at several widths. |
| I2 | Lazy photos | Cards show empty slots with no placeholder until the photo arrives: 0.6 to 1 s at 1.5 MB/s. On dark sections the slot is just a blank dark box. Teams was confirmed correct once loaded. | Timed, and visible in frames | Add a low-quality placeholder, and start loading earlier. |
| I3 | Industries section, 29 pages | The same three photos are on all 29 pages: `office-meeting`, `ai-agents-field`, `construction-tablet`. The rule says to avoid reuse across pages. | Counted in built HTML | Give each page its own set, or drop photos from this block. |
| I4 | `/services/microsoft/cloud-storage/` | `office-meeting.jpg` appears twice on one page (Industries and Why us). This breaks "never repeat a photo on a page". | Crawl | Swap one. |
| I5 | `/services/microsoft/copilot-studio/` Why choose | The photo shows a large "ChatGPT" screen on a Microsoft Copilot page. | Seen | Replace it. |
| I6 | 43 image files | No `width`, `height`, or aspect ratio set, which risks layout shift. Includes leadership portraits, partner logos, and Azure icons. | Crawl | Set dimensions. |
| I7 | Heroes on 2x phones | Seven industry heroes are soft: `construction`, `mga`, `field`, `carriers`, `tpa`, `agents`, and `majors` are enlarged 1.5-1.65×. Eight 1600 px photos are enlarged 1.33-1.46×. | Crawl | Use higher-resolution sources. |
| I8 | Blog and Insights cards | Thumbnails crop the live banners, so their built-in text is cut mid-word and is too small to read. | Seen | Use `contain` on a matched background, or a cleaner crop. |

## Antigravity's uncommitted work

**Sound, keep:**
- Anchor offset (`scroll-margin-top` 88/80).
- Hero grid fix.
- Hero credential bullets on phones.
- Contact block moved onto the type scale.
- `audit.mjs` false-positive fixes.

**Needs changes:**

| # | Problem | Evidence |
|---|---|---|
| A1 | Accent-border hover on leadership cards, which breaks "no accent border hover". | `People.module.css:31,42` |
| A2 | Gradient overlay on portraits, which breaks "no gradients or overlays on cards". | `People.module.css:74` |
| A3 | Portraits don't look like a set: different backgrounds, lighting, and crop tightness. Source sizes are 533×800, 1024×1022, and 853×1024. The smallest is soft on retina. | Measured |
| A4 | On a phone, one portrait card nearly fills the SE screen, and people must swipe to see the other two. | Seen |
| A5 | The "Leadership" badge repeats the section's own "Leadership" pill and adds nothing. | `layouts/company.ts` |
| A6 | Stats on narrow phones add a 38 px figure, which is off the type scale. | `Stats.module.css` |
| A7 | Docs are out of date: `design-audit.md` item G still says the cards use initials. Nothing is committed yet, and the three portraits are untracked. | `git status` |

## P2: polish

### Typography

- **T1. Off-scale sizes.**
  - Phone: 11.52, 12.32, 12.5, 14.08, 15.2, 15.6, 17, 18.56, 21.33, 22.08, 27, 34, 36, 37.5, 38, 44, 52.
  - Desktop also: 11, 16.8, 31.2.
  - The worst are the half-pixel sizes the project bans: 12.5 (footer legal), 14.08 (widespread on home), 37.5 (stat figures).
- **T2. Fractional hero H1s on desktop.** 11 different sizes from 47.57 to 72 px. Known and accepted (`design-audit.md` item E), but visible when moving between sibling pages.
- **T3. Tight tracking on small text.** Examples: 12.5 px at -0.04em (footer legal), 15 px at -0.04em (contact lead), 14 px at -0.04em, 12 px at -0.035em. Small text needs tracking closer to 0.
- **T4. Title Case slips on home.** "Years of Experience", "Clients Served", "About Us", "Our Partners" (`About.tsx:26,33,125`, `Partners.tsx:64`). The system is sentence case.
- **T5. US spelling in visible tags.** "Insurance Modernization", "Application Modernization", from blog categories.
- **T6. Single-word last lines in H3s.** 77 distinct headings, mostly FAQ questions at phone width. Add `text-wrap: balance` to headings.
- **T7. Home tiny mono text at 11-11.52 px.** Accepted earlier as decorative, and listed here only for completeness.

### Components

- **C1. Numbers without order.** Home's Why cards and Azure cards are numbered 01-04, though order doesn't matter. This breaks "numbers only where order matters".
- **C2. Mega menu.** A red radial glow in the feature card (`MegaPanel.module.css:246`) and a mono uppercase label (`:356-361`) both break design rules. The Copilot logo is also used for the AI Assessment Workshop, which isn't a Copilot product.
- **C3. Breadcrumb plus pill duplicate.** The hero says "AI Agents" twice in a row. On Application Modernisation the crumb itself repeats ("Application Modernisation / Application Modernisation"). On Engineering & Design it wraps, leaving a dangling slash at the line end.
- **C4. Duplicate pill.** "Typical engagement" appears as both the section pill and the card's label.
- **C5. Compliance chips are inconsistent.** Some pages have icons (MGA, Engineering & Design), others none (Carriers, TPA, Agents, Field Services). Long chips wrap to two lines inside a pill.
- **C6. Integration tiles.** Logo sizes vary a lot, and the small Dynamics 365 wordmark in its white tile can't be read.
- **C7. Logo grids end in orphans.** For example, 2 of 3 on AI Agents and 1 of 3 on Data Engineering.
- **C8. Home stat cards.** A large empty gap inside the card, between the figure and the title. The third About card's button text almost touches its pill edges, and the card's content overflows by 3 px.
- **C9. Home Dynamics block.** Cards inside cards inside a panel. Too much nesting on an SE screen.
- **C10. Home Microsoft cards.** Non-clickable feature pills look like buttons.
- **C11. Phone numbers.** Two formats, side by side: "+1 (972) 928-2341" and "+1 (972) 779 6347", with no label saying which is which (`brand.ts:45-46`).
- **C12. Offices.** The Mexico City card has no address, so it looks empty beside the others.
- **C13. No skip link** on any page.
- **C14. Keep exploring** is the only section with a plain label rather than a pill. On 8 pages it runs straight on from a same-coloured section with no separation (for example FAQ into Keep exploring on `/ai-consulting/`).

### Page length and repetition

- **L1. Long phone pages.** The median page is 10,119 px, about 15 SE screens. The longest is `/industry/oil-gas/pipeline-maintenance/` at 14,364 px, about 21 screens.
- **L2. Deep-dive cards.** Each stacked "Core service" panel on segment pages can exceed a full phone screen.
- **L3. Identical process copy.** "Onboard and kickoff, Review and optimise, Enhance, Managed support, Customer feedback" repeats across the Microsoft pages, so sibling pages read as a template.
- **L4. Near-identical banners.** Up to 3 per page, each a dark card with a photo and text. On dark sections the card edge almost disappears (Power BI, Teams, Identity & Security, AWS Migration, Cloud Storage).
- **L5. One-line centred statements.** "Discuss your app modernisation strategy", and similar on Application Modernisation, Re-engineering, and Legacy Migration. The owner has said they dislike these, and they break left alignment on phones.
- **L6. Desktop heading position shifts.** Within one page, heads move between centred, split, and mid-column. In the mid-column style, the heading lines up with neither the pill nor the cards below (for example "Secure, compliant construction environments").

## Checked and passing

- No horizontal overflow on any page at 375 or 1440, or on the 11 sampled pages at 320.
- No console errors, no failed requests, and no broken images on any page.
- Form inputs are 16 px (no iOS zoom), labelled, and use the right `autocomplete` and keyboard types.
- Mobile menu: 44 px button, scroll lock, focus moved into the menu, Escape closes it.
- Rail cards appear correctly when swiped.
- The hero CTA is above the fold at 375×667 on every page with a hero. On pages with a 4-line H1, the credentials line can fall at or below the fold.

## False positives excluded

- 1:1 contrast on rail cards: these are off-screen reveals that have not started.
- 1.05:1 on Azure and AWS service cards: the text is clearly legible in frames.
- "Clipped" hits on the ticker, the partner cards, and `sr-only` text.
- Footer "AptaCloud" wordmark at 1.14:1: decorative.
- Top and stats bands sharing a colour: by design.
