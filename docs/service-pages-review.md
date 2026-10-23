# AptaCloud service pages: build notes and content review

Prepared for: content and SEO review
Date: 21 October 2026
Scope: the 10 service pages under Services in the navigation (Artificial Intelligence, Data & Analytics, Application Modernisation)
Reference documents: AptaCloud Brand Guidelines v2.0 (External), AptaCloud Content Writing Guidelines v2.0

## 1. Pages built

| Category | Page | URL (same slug as the live site) |
|---|---|---|
| Artificial Intelligence | AI Consulting | /ai-consulting/ |
| | AI Agents | /ai-agents/ |
| | Generative AI | /generative-ai/ |
| | Machine Learning | /machine-learning/ |
| Data & Analytics | Data Engineering | /data-engineering/ |
| | Data Warehousing | /data-warehousing/ |
| | Data Visualisation | /data-visualization/ |
| Application Modernisation | Legacy Application Migration | /legacy-application-migration/ |
| | Application Modernisation | /application-modernization/ |
| | Application Re-engineering | /application-re-engineering/ |

URLs keep the live site's US spelling, and the copy uses Australian spelling (Brand Guidelines 10). That way existing links and search rankings carry over.

All page copy is in `src/data/services/` (one file per category), so content edits never touch the design code.

## 2. Page structure

Every page follows Brand Guidelines 12 and Content Writing Guidelines 7.2, in this order:

1. **Hero:** states the outcome for the buyer, gives one credential line ("Microsoft-certified specialists · Proof of concept on your data") and has **one primary CTA**. It has no form; the form has its own section at the end of the page, as you asked.
2. **Pain points:** 4 to 5 per page, written as H3s in the buyer's words, each with its consequence.
3. **Services:** each one says what it does, what the outcome is, and which tools it uses (Microsoft products first).
4. **Process:** the six named phases (Discover, Define, Design, Build, Integrate, Optimise), with a timeline indicator under the heading.
5. **Industries:** only the three in-scope verticals. Each gets one sentence on the use case and one on the outcome.
6. **Why AptaCloud:** the four reasons from Brand Guidelines 3.4, in order, plus one evidenced reason specific to the page. Beside them is a "How the proof of concept works" card, which serves as the proof block.
7. **FAQs:** 6 to 7 per page, phrased the way a buyer would search, including cost and timeline. FAQPage schema is included.
8. **Related services:** internal links to the other pages in the same category.
9. **Contact:** the form, with a heading, intro and submit label specific to the page.

**CTA discipline:** each page has one primary action. The nav button, hero button, proof-of-concept card, contact form and footer button all use that same action, worded for the page (for example "Prove an agent on your workflow"). On phones the label shortens to fit ("Prove an agent"). Section-level links are secondary only: "How we deliver", industry pages, and related services.

## 3. What we changed from the live pages

The live pages supplied the topics, services, process steps, tools and FAQs. We rewrote the copy to the guidelines, and **did not carry over** the following:

| Removed from the live pages | Reason |
|---|---|
| All case studies and testimonials (for example the Toronto healthcare, Dallas lending and Chicago retail results, "$12M fraud prevented", "2.5x efficiency", "4X faster migrations") | None of them is an approved case study. Only RWLS and Warrikal are approved, and those can't be published until AptaCloud confirms (Brand Guidelines 6.2). |
| Industry lists showing Healthcare, Medical Devices, Pharmaceuticals, Banking, Financial Services and Manufacturing | These are out of scope for US and Australian content (Brand Guidelines 13). |
| NetSuite and Salesforce integration claims, and the Google Cloud and AWS Bedrock emphasis | Microsoft leads; NetSuite and GCP are not to be featured. |
| "30% to 50% cost reduction", "60%+ savings", "near-100% accuracy", "zero downtime guaranteed", "guaranteed SLAs" | These are unsourced or "up to" style claims (Content Writing Guidelines 6.2). |
| Stat counters ("20+ years", "300+ projects"), which also render as "0+" on the live site | These are credentials needing confirmation (see 4.4), and the counters are currently broken on the live site. |
| "Free consultation", "Contact us", "Book now", "Let's talk" | Banned CTA wording (Brand Guidelines 7.2). |
| PIPEDA, HIPAA and Canadian market references | Wrong market for these pages. |

## 4. Items that need AptaCloud confirmation before launch

These come from the live site, or are reasonable inferences from it. They are worded carefully, but each one is a claim.

### 4.1 Timelines (the guidelines require a timeline indicator in each process section)

| Page | Timeline used | Source |
|---|---|---|
| AI Consulting | Readiness assessment: two weeks, fixed cost | Live AI Consulting page |
| AI Agents | First agent in production: typically 4 to 8 weeks | **Inferred** from the live Generative AI page; please confirm |
| Generative AI | Initial results: typically 4 to 8 weeks | Live page |
| Machine Learning | Simple models 4 to 6 weeks; enterprise rollouts several months | Live page |
| Data Engineering | First production pipeline: typically 4 to 8 weeks | **Inferred**; please confirm |
| Data Warehousing | Large-scale: 6 to 18 months, in phases | Live page |
| Data Visualisation | A few weeks to a few months | Live page |
| Legacy Application Migration | Re-platforming: 8 to 12 weeks per application | Live Application Modernisation page |
| Application Modernisation | Re-platforming 8 to 12 weeks; re-architecting 4 to 6 months | Live page |
| Application Re-engineering | 6 weeks to 6 months | Live page |

### 4.2 Commercial terms
- **"Fixed-cost"** is used for the AI readiness assessment and the Application Modernisation discovery stage, as on the live pages. Brand Guidelines 7.1 says not to state offer terms unless AptaCloud supplies them, so please confirm both.
- **Pricing FAQs** say: "we price per phase after discovery". Please confirm this describes how AptaCloud actually prices.

### 4.3 Technology and partner mentions
- **Anthropic's Claude** appears as a supported model, which fits the new Anthropic partnership. We need the exact partnership wording before using the word "partner" on these pages. For now they say only "we use".
- **Procore, Sage and Autodesk** appear as integration examples on Data Engineering. Content Writing Guidelines 2.2 allows describing integration experience with these, but please confirm that experience exists.
- **Product names:** we used "Azure OpenAI Service", "Microsoft Copilot Studio", "Microsoft Fabric" and "Microsoft Entra ID", per the naming table. Microsoft renames AI products often, so please re-check them at launch.

### 4.4 Credential line
- **"Microsoft-certified specialists"** comes from the guidelines' approved word list. If AptaCloud wants its exact Microsoft partner designation shown in the hero, please supply the wording.

## 5. SEO and SXO

- **Titles:** unique title and meta description per page, in the format "Service Name Services | AptaCloud". Descriptions have no em dashes and no superlatives.
- **Structured data on every page:** BreadcrumbList, Service and FAQPage JSON-LD.
- **Headings:** one H1 per page (in the hero). Each section heading is an H2; pain points, services, industry use cases and FAQ questions are H3s.
- **Answers first:** the hero lead answers "what is this and who is it for" within the first 60 words (Brand Guidelines 14.2).
- **Internal linking:** the nav menu, the related-services block, and the footer Services column all link between the new pages. Home-page anchors (#workshop, #azure and so on) now work from every page.
- **Still open:** canonical URLs, an Open Graph image, a sitemap, robots.txt and llms.txt. These need the final domain, so they're best added once the site moves from the GitHub Pages staging URL to aptacloud.com.

## 6. Design audit: issues found and fixed

We audited every section at desktop (1440px), tablet (1024px) and phone (390px) widths.

| # | Issue | Fix |
|---|---|---|
| 1 | The contact form sat in the hero on the live site (your feedback) | Moved to its own section; the hero has one CTA |
| 2 | Hero credential line wrapped awkwardly on desktop and phone | Cut to two items; stacked on phones |
| 3 | Long CTA labels overflowed their buttons on phones | Shorter label for the same action below 520px |
| 4 | Pain-point titles started at different heights in a row | Titles share one top line; consequences pinned to the bottom |
| 5 | Too much empty space inside pain cards | Card height reduced |
| 6 | Too much vertical scrolling on phones | Pain points, industries, "Why AptaCloud" and related services become swipe rails with a position indicator; services become an accordion |
| 7 | On the phone rails, the next card did not peek in, so the rail did not look swipeable | Reveal threshold fixed so the neighbouring card shows |
| 8 | Hero image too small on tablets, leaving dead space | Image spans the full width on tablets |
| 9 | Where a product has no licensed logo, its letter tile looked like a placeholder in the hero | Hero tiles use only real logos; letter tiles stay only in labelled chips |
| 10 | The menu opened on the wrong category, with no "you are here" marker | The menu opens on the current page's category and marks the current page |
| 11 | Nav logo and footer links pointed to anchors that exist only on the home page | They now link to the home page from any page |
| 12 | AWS promo card showed the Power Platform logo | AWS logo |

## 6b. Design upgrades: second audit (22 October 2026)

| # | Section | Problem | Upgrade |
|---|---|---|---|
| 1 | All | Every section header used the same layout, so long pages felt repetitive | Three header layouts: standard, centred (Process) and split (Industries); the FAQ has its own two-column layout |
| 2 | Pain points | Five identical white cards with empty space; template feel | Bento grid: the most common problem as a large dark card with an accent quote, the rest as compact tiles; "What it costs" labels |
| 3 | Services | Large empty area in the detail panel | Large faded icon for the selected service, plus a dot grid and accent glow; list numbers removed |
| 4 | Process | Centred text floating under dots, with a lot of white space | Framed board of phase cards. A progress bar fills as you scroll, finished phases show a tick, and the current phase lifts as a dark card |
| 5 | Why AptaCloud | Tall stack of five rows, with empty space under the proof-of-concept card | Two-column tile grid (icon, title, text); icon fills red on hover; proof-of-concept card stays in view while the tiles scroll |
| 6 | FAQ | "Ask a specialist" card floated alone with empty space below | Sticky left column (heading and a dark ask card) beside question cards; on phones the ask card moves after the questions |
| 7 | Related services | Text-only cards | Photo cards using each page's hero image (tinted, colour on hover) |
| 8 | Contact | Large empty left column | "What happens next" steps (we read your note, a scoping call, your proof of concept plan). No response-time promises |
| 9 | Consistency | Numbers on problems, services, reasons and process | Numbers kept only on the process, the one place where order matters |
| 10 | Consistency | Two "Why" reasons used the same icon | New "team" icon for senior specialists |
| 11 | Scrolling | The process board finished before the reader reached it | Progress now runs while the board travels up the screen |

## 6c. Section order matched to the live pages (22 October 2026)

Each page now follows the order of its live aptacloud.com page after the hero. The pain-point block opens every page, as the guidelines require. FAQs, related services, and the contact form close every page.

New section types taken from the live pages: Benefits, Use cases, Tools/tech stack, Modernisation frameworks (Application Modernisation), and Readiness assessment (Application Re-engineering). All copy is rewritten to the guidelines.

**Not carried over** (each needs AptaCloud approval first): case studies, testimonials, client logo walls, and stat counters.

Order is set per page in `src/data/services/extras.ts`.

## 6d. Microsoft Services and Azure Hosting pages (nav items 11 to 20)

**New pages:**
- Microsoft 365
- Microsoft Teams
- Microsoft Copilot (Copilot Studio)
- Microsoft Dynamics 365
- Microsoft Power BI
- Power Platform
- Microsoft SharePoint
- Identity & Security
- Cloud Storage & Databases
- Azure Hosting

URLs match the live site (for example `/services/microsoft/teams/`). Each page follows its live page's section order (`src/data/services/microsoft-extras.ts`).

**Not carried over:**
- "Recent projects" case studies (banking, healthcare, retail, and manufacturing)
- Healthcare, banking, and manufacturing industry cards
- ISO 9001/27001 claims
- "Up to 15% cost savings"
- "Competitive pricing" claims

**Needs confirmation:**
- **Dynamics 365 timeline:** "6 to 12 weeks" (live page).
- **Copilot and Power Platform timeline:** "typically 4 to 8 weeks" for a first copilot or app (inferred).
- **Other pages:** say "timeline agreed after discovery" rather than invent one.
- **Product names to check at launch:** Microsoft Entra ID (formerly Azure Active Directory), Microsoft Purview, and Microsoft Sentinel.

## 7. Imagery

- **Photography:** 13 new Unsplash photos (Unsplash licence, free for commercial use), chosen to match each service and the three industries. All have descriptive alt text.
- **Logos:** Microsoft product logos come from the official Microsoft files already in the project. Other tools use Simple Icons (CC0), shown in one colour so Microsoft stays visually first.
- **Without a licensed logo:** Power BI, Microsoft Fabric, Microsoft Entra ID and SQL Server show as a small letter mark beside the product name, rather than an invented logo.

## 7. Live-structure rebuild, batch 1 (2026-10-22)

These pages now carry every section of the live page, in the live order: AI Consulting, AI Agents, Generative AI, Machine Learning and Data Engineering. Items for the SEO reviewer and client:

- **Case studies, testimonials and their figures** come from the live pages: 33%, 23%, 20%, 4x, 2.5x, 37%, 60% and $12M. The Content Guidelines say "no unapproved metrics or case studies", so the client needs to confirm them before launch.
- **Industries:** the live pages list eight industries (healthcare, pharma, banking and others). We kept the three approved verticals. The AI Agents industry tabs cover Insurance, Oil & Gas and Engineering & Construction instead of the live healthcare, pharma and finance tabs.
- **Calls to action:** every mid-page banner uses the page's single primary CTA. The live banners each had a different label, such as "free call" and "Contact Today!".
- **FAQs:** the live questions come first, rewritten, and extra buyer questions bring each page to at least 6.
- **Logos:** Power BI, Fabric, SQL Server, Langflow, Flowise, BERT, T5, Transformers and Looker Studio are cropped from the logo files already on the live site. AutoGen, Haystack and MetaGPT show monograms because no logo file is available for them.
- **Hero counters** (20+, 200+, 300+) move to a stats strip under the hero.

### 7a. Sections dropped or merged in batch 1 (2026-10-22, agreed with the designer)
- **AI Consulting:** dropped the second banner ("Improve your return…").
- **AI Agents:** dropped "digital employee", "Don't just build a bot", the 20+/200+/300+ track record (it repeats the stats band) and the MCP banner. The MCP outcomes moved into the MCP section. "How we build agents" moved into the services section, which gained a security card. The page is now 12 sections instead of 20.
- **Generative AI:** dropped the "AI consulting" card from "What we offer" and merged the benefits into "The AptaCloud advantage".
- **Machine Learning:** dropped the unattributed case results (60%, $12M) and the second banner. "What we do" and "Solutions" are merged.
- **Data Engineering:** merged "Why AptaCloud" into the benefits section, cut the services from 11 to 8 (visualisation and cloud transformation have their own pages), and removed TensorFlow and PyTorch from the logos.

## 8. Live-structure rebuild, batch 2 (2026-10-22)

Rebuilt in live section order, with repeats cut using the batch 1 rules: Data Warehousing, Data Visualisation, Legacy Application Migration, Application Modernisation and Application Re-engineering.

- **Dropped or merged:**
  - Data Visualisation: the two service lists became one tabbed section (analytics and visualisation).
  - Legacy Migration: the services section repeated the 5-step approach, so its detail moved into the steps. The first of two banners was dropped.
  - Re-engineering: three overlapping benefit lists became one. The intro gains moved into the opening section, and "Why re-engineer" was dropped. The first of two banners was dropped, keeping the readiness banner.
  - Application Modernisation: the live "industry-tailored" section (retail, healthcare, BFSI) became the standard three-vertical industries section.
- **For client confirmation:**
  - Case studies on Legacy Migration (20% NPS, 2x dispatch, $2M) and Application Modernisation (40%, 80%, 24h), and the 5 Application Modernisation testimonials, credited by company type and city as on the live page.
  - The "Brands that trust us" client logos (7). We dropped one that is actually a Looker logo.
- **Softened claims:**
  - "4X faster migrations" became "faster migrations".
  - "Guaranteed/financial SLAs" became "agreed service levels".
  - "Over 90% of migrations in 90 days" became "most within a few months".
  - "Near 100% data accuracy" was removed.
- **Re-engineering case studies** have no outcomes on the live page, so none were added.

### 8a. Batch 2 redone to the live layouts (2026-10-23)
After review, batch 2 now keeps **every** live section, in the live order, and each section echoes the live layout in the site's design:

- **Restored:** Data Visualisation's two service lists as panel + list cards (all 9 services) and all 16 tool logos; Legacy Migration's first banner, its services section and all 8 FAQs; Application Modernisation's retail, healthcare and BFSI cards, its frameworks closing line and the agilitas logo; Re-engineering's "you get" row, first banner, live use cases (manufacturing, healthcare, finance) and "Why re-engineer".
- **New section layouts** in the block library:
  - centred-icon cards
  - plain step tiles
  - icon chips
  - photo cards
  - wave process (data pages)
  - panel + list
  - list-beside-photo (cards or divided rows)
  - wide case studies
  - client logo grid
  - testimonial slider
  - logo strip

## 9. Live-structure rebuild, batch 4 (2026-10-23)

These pages now carry every section of the live page, in the live order: Power Platform, Microsoft SharePoint, Identity & Security, Cloud Storage & Databases, and Azure Hosting.

- **Section layouts follow each live page:**
  - Power Platform: the radial services diagram is rebuilt as a service hub, with the Power BI, Power Apps, Power Automate, and Copilot Studio logos as nodes.
  - SharePoint: centred service cards (3 + 3 + 2, as live) and the "24/7 support" photo section.
  - Identity: a "Microsoft products" section with the Entra, Entra ID, and Intune logos.
  - Cloud Storage: the 2 × 2 OneDrive service cards.
  - Azure Hosting: all 16 service cards, the curve process, and the live FAQs.
- **Not added:** the live SharePoint page has no industries section, so none was added.
- **For client confirmation:**
  - The "Recent projects" titles on all four Microsoft pages. They name banking, healthcare, retail, and manufacturing clients, as on the live pages.
  - Azure Hosting: "more than five years" of Azure managed hosting, and "Microsoft partner". The live page says "certified Microsoft Solution Partner"; please supply the exact designation.
  - The Azure stats strip (20+, 300+, 200+). The live counters show "0+".
- **Removed or softened:**
  - "Saved up to 15% of the cost" was removed.
  - "More than 250 products" was removed (no figure is given).
  - "GDPR and HIPAA … guaranteeing" became "the regulations your industry works under".
  - The live Azure Active Directory card described backups; it now describes Microsoft Entra ID.
  - "Azure Active Directory" is shown as "Microsoft Entra ID (formerly Azure Active Directory)".
- **Logos:** the Entra ID, Azure AD, and Intune icons are taken from the live page's own files.
- **Photos:** eight new Pexels photos (Pexels licence, free for commercial use), listed in PHOTO_CREDITS.md.

## 10. Imagery and tools pass (2026-10-23)
- **Live-site images:** We reuse high-resolution originals only (1200px or wider) from the client's live pages. They now appear in these places:
  - The "Recent projects" cards on all nine Microsoft pages.
  - The Data Visualisation opening section, with the dashboard laptop image.
  - The data, machine learning, and generative AI banners.
- **Repeated photos:** The most reused generic photos have been replaced with new Pexels photos. No photo repeats within a page.
- **"Our tools" (Data Warehousing, Data Visualisation):** The scrolling logo strip is now a board grouped by role, with Microsoft first.
- **Footer:** The contact column repeated the contact section above it. It is now an Industries column linking to the three vertical pages.
