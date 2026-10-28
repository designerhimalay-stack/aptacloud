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

## 9b. Azure Cloud pages, batch 5 (2026-10-26)

These pages are built to the live aptacloud.com layouts, with every live section in the live order:
- Azure Migration
- Azure Implementation
- Azure Optimisation
- Azure Managed Services
- Azure Security

The nav's Azure Cloud menu now links to them.

The five live pages share one template: icon cards, a banner, "why" cards, another banner, and a curved process. Mirroring that literally would have produced five near-identical pages. Instead, each page keeps its sections and order, and gets one section designed from its own content:

| Page | Section | Design |
|---|---|---|
| Migration | Services | A migration map: where workloads run today (on-premises, VMware, AWS, Google Cloud) → Azure Migrate → where they land (Virtual Machines, Azure SQL, App Service, Azure VMware Solution). The eight services sit below it. |
| Implementation | Services | An integration pipeline: your apps → Connect (API Management) → Route (Service Bus, Event Grid) → Process (Logic Apps, Functions) → Move data (Data Factory) → your data platform. |
| Optimisation | Tools, help, process | The nine Azure tools with their product icons. The eleven "how we help" points are grouped into Cost, Performance, and Governance tabs. The process is a loop, because the live page calls optimisation "an ongoing practice". |
| Managed Services | Pricing | The live pricing table, rebuilt as three plan cards plus a full feature comparison. On phones, a plan switcher shows one plan at a time. |
| Security | Services | Defence in depth: nested layers, each mapped to the services that protect it (Detect and respond, Govern deployments, Network, Workloads, Data and secrets). |

**Icons.** Azure services now show Microsoft's official Azure architecture icons (`public/images/azure/`). Microsoft permits these icons in architecture diagrams and documentation, and we use them only to identify the products in service diagrams and cards. Please confirm the client is comfortable with this.

**Confirmed by the client (2026-10-26):** the Managed Services plan terms stay exactly as on the live page, including the database list, US$35 extra hours, the 10% prepayment discount, the response times, the support hours, and the contract lengths.

**For client confirmation:**
- **Timelines from the live FAQs:**
  - Migration: "one week to a month"
  - Implementation: "about a week for a single service, sometimes a few days"
- **Product names.** Two names on the live page were wrong or out of date:
  - "Microsoft Defender 365" described Defender for Cloud, so the card now says "Microsoft Defender for Cloud".
  - "Azure Sentinel" is now "Microsoft Sentinel".
- **Dropped (duplicates):**
  - Optimisation's third banner, which repeated the first banner's heading on the live page.
  - Three Implementation benefits that restated the service cards above them: API Management, cloud messaging (Service Bus and Event Grid), and data transformation (Data Factory).

**Removed or softened:**
- "Save up to 15%–30%" and "up to 30% cost savings" (Optimisation hero, reasons, and FAQ)
- "Up to 72%" for Reserved Instances. The FAQ now says reservations "cost less than pay-as-you-go".
- "More than 90 compliances"
- "250+ products"
- "Top-certified", "leading", and "premier" partner claims
- "Free demo", "free consultation", and "free audit" CTA labels. Every banner uses the page's single primary CTA.
- Healthcare, pharma, banking, and manufacturing industry cards. The pages show the three approved verticals.

**Photos.** Each page gets new Pexels photos, none reused from other pages, plus its own live hero image (1536px to 2121px wide) in a section where tech imagery suits the content. All are listed in PHOTO_CREDITS.md.

## 9c. AWS Cloud pages, batch 6 (2026-10-27)

These pages are built to the live layouts, in live order, with duplicates dropped:
- AWS Compute
- AWS Migration
- AWS Implementation
- AWS Optimisation
- AWS Managed Services

They form a new "AWS Cloud" category, and the nav's AWS Cloud menu links to them. AWS Security follows in the next batch.

**Each page's own design:**

| Page | Section | Design |
|---|---|---|
| Compute | Services | A spectrum from "more control" to "less to manage": EC2 → app platforms → containers → serverless, each with its AWS product icons. Nitro security and VMware sit underneath as "across every model". |
| Migration | Services | A five-phase stepper (Discover, Move data, Move workloads, Track, Optimise), with each phase's services in its panel. |
| Implementation | Services | Cards with a chip row of the AWS products each service uses. |
| Implementation | Advantages | A divided list beside the live AWS image. |
| Optimisation | Benefits | An itemised "bill": area, what we change, and the tools that do it. |
| Managed Services | Why | The points either side of a central image, as on the live page. |
| Managed Services | Process | An arc process, as on the live page. |
| Managed Services | Plans | The client-approved pricing table, with T3 (AWS) instances. |

On Managed Services, the live order (FAQ, then industries, then process) is kept.

**Dropped (duplicates):**
- **Migration:** the "20+ years of experience" point, which repeats the stats strip and lists out-of-scope industries.
- **Implementation:**
  - "Align security and compliance" (advantages) and "High security" (why) both repeat the Security and compliance service.
  - The why section's "Adopt innovation", "Cost-effectiveness", and "24/7 monitoring" repeat the advantages. "Monitoring around the clock" is kept once.
- **Optimisation:**
  - The benefits "Compute control" (repeats Resource utilisation analysis) and "Improved visibility" (merged with Financial monitoring).
  - The why section's "Tailored solutions", "Enterprise-grade security", "Cost-saving approach", and "Continuous optimisation", which repeat the services.

**Removed or softened:**
- "Save 15% to 30%" (Optimisation hero and why)
- "Up to 75% on compute costs"
- "Best", "leading", "top-most certified", "most trusted", and "ultimate saviour"
- "Free consultation", "free call", "free guide", and "free cost optimisation plan" CTAs. Every banner uses the page's single primary CTA.
- GDPR, HIPAA, and PCI-DSS compliance claims
- The Migration process said "Microsoft-certified engineers" on an AWS page; it now says "certified engineers".

**For client confirmation:**
- **Credentials.** On AWS pages, the hero credential reads "AWS-certified specialists" and the chip footer reads "Well-Architected", in place of "Microsoft-certified" and "Microsoft-first". This follows the live AWS pages' "certified AWS partner" claim; please confirm the exact AWS partner status.
- **Live FAQ answer.** The Managed Services answer to "Can you integrate AI or IoT?" described encryption keys. It now names Amazon SageMaker and AWS IoT Core; please confirm AptaCloud offers these.
- **Icons.** The AWS service icons are AWS's official architecture icons, used under the same terms as Microsoft's.

**AWS Security** was built in the following batch. Its services sit in three groups (Protect, Detect and respond, Comply), and its process is a continuous loop.

## 9d. Industry pages (2026-10-27 and 2026-10-28)

These 14 pages are built to the live layouts, in live order, at the live URLs (`/industry/...`). Each has its own page in the nav and footer:
- **The three vertical hubs:** Insurance, Oil & Gas, and Engineering & Construction.
- **Insurance:** Carriers, Managing General Agents, Third-Party Adjusters, and Independent Agents.
- **Oil & Gas:** Major Operators, Drilling & Well Services, Pipeline Maintenance, and Refining & Distribution.
- **Engineering & Construction:** Construction, Engineering & Design, and Field Services.

Each hub's "Keep exploring" cards list its segment pages.

**Shared live template, different designs.** The live segment pages share one template: challenges, eight solutions, a deep dive, a six-step framework, integrations, compliance, a banner, why us, a case study, FAQs, and blogs. So that sibling pages don't look like copies, each page gives its key sections a different form:

| Page | Signature section |
|---|---|
| Third-Party Adjusters | Solutions as a ring around Azure |
| Independent Agents | Process as an arc |
| Drilling & Well Services | Integrations as a map (wellsite → Azure → teams) |
| Pipeline Maintenance | Solutions as a four-phase stepper (Monitor, Predict, Maintain, Modernise), integrations as a system register, process as a loop |
| Refining & Distribution | Integrations as layered rings (process control → plant → enterprise → cloud) |
| Construction | Solutions in three panels, integrations as a map |
| Engineering & Design | Solutions as a four-phase stepper (Design, Coordinate, Analyse, Operate) |
| Field Services | Solutions as a ring around Dynamics 365 |

**Blogs.** Every live segment page showed the same three life-insurance posts. Each page now shows three posts relevant to its audience, linking to the live blog.

**Dropped or merged:**
- Integration groups with one or two entries are merged (for example "Historian and GIS"), so card rows stay even.
- On Drilling, the compliance standards stay inside the integrations, as on the live page.
- The Construction deep-dive point "Supports the largest single category of construction software spend" and the Engineering & Design point "Supports the fastest-growing segment in construction technology" are removed as unsourced claims.

**For client confirmation:**
- **Case-study figures.** Every outcome figure is kept from the live pages, for example "30–40% less time on submission triage" and "28% less non-productive time". Please confirm each one is approved for publication (Brand Guidelines: no unapproved metrics).
- **Major Operators.** The brand guidelines say major operators are not a target segment. The page is built because it is live and in the nav; please confirm whether to keep it.
- **Standards wording.** ISO 27001, NIST, HIPAA, and similar items read "we design for" or "built to", never "certified". Please confirm no certification is implied that AptaCloud does not hold.
- **Partner platforms.** Guidewire, Duck Creek, DXC, Applied Epic, Vertafore, Procore, Autodesk, and other platforms are named because the live pages name them. This is not a partner claim.

## 9e. Company pages (2026-10-28)

These five pages are built at the live URLs, and the nav's About menu and the footer now link to them:
- **About Us** (`/about-us/`)
- **Careers** (`/careers/`)
- **Blog** (`/blog/`)
- **White Papers** (`/whitepaper/`)
- **Events** (`/events/`)

They share the service-page shell but have no deliverables console in the hero.

| Page | Sections |
|---|---|
| About Us | Live order: our story, Microsoft services (each links to its page), leadership, partners, latest blog posts, next event, and global presence. The leadership cards show initials, because the live page has no portraits. The office cards show each office's local time. |
| Careers | The live page is empty (footer only). It now has who we are, the service lines you would work on, and our offices. The form invites candidates to send their details. |
| Blog | All 64 live posts. The newest post leads, followed by topic filters (Insurance, Oil & Gas, AI, Modernisation, Microsoft, Azure), a title search, and "Show more". On phones, posts appear as compact rows. Each post opens on the live blog. |
| White Papers | The one live paper, with its cover, a summary, and a link to the live download page. Related Azure articles sit underneath. |
| Events | The next event (Connected Claims USA 2026, 3–4 November, Orlando), with links to the event details and to registration, followed by past events as dated rows. |

The page schema is AboutPage, Blog, or WebPage, not Service. Blog, White Papers, and Events have no stats strip.

**Left out of the live content:**
- **NetSuite** partner logo (brand rule). The partners shown are Microsoft, Anthropic, and AWS, matching the home page.
- **"300+ Global Delivery Locations"** (About stats). This is clearly an error: the live page lists four offices.
- **White paper highlights.** The live paper page lists highlights from a different paper, on vibe coding, which even names "JumpGrowth". Only the paper's own Azure-cost introduction is used. The page also quotes third-party figures (Azure revenue up 31%, 82% of organisations), which are left out as unsourced.
- **HealthCon 2025.** This is a healthcare event, outside the three verticals, and its name and dates disagree (2025 against March 2026).
- **"Free Consultation"** and **"Contact Us"** labels. The nav item is now "Talk to our team".

**For client confirmation:**
- **Careers.** No open roles are listed, and the page does not invent any. Please supply roles, benefits, or a careers email if you want them shown.
- **Leadership.** Please supply portraits if you want photos in place of the initials, and confirm the titles (Hemant Madaan, Chief Executive Officer; Naval Madaan, Chief Operating Officer; Jignesh Jayaswal, Financial Controller).
- **Mexico City office.** The live page gives no address, so the card shows only the city.
- **Anthropic.** The logo is a text wordmark until the official file is supplied, as on the home page.
- **White paper.** Please confirm what the paper covers, so the "What it covers" list can match the PDF.

## 9f. SEO-team skills and CRO pass (2026-10-28)

The SEO team supplied two skills: `aptacloud-content` (house style, authority lanes, and the industry segment and service matrix) and `aptacloud-content-audit` (EEAT, SEO, AEO, SXO, and CRO audit). Every page was checked against them.

**CRO: one primary action, no duplicate buttons.** A template rule now applies on every page:
| Place | What it shows |
|---|---|
| Nav | "Let's talk" on every page, linking to the page's contact form |
| Hero | The page's primary CTA |
| Mid-page | The primary CTA once only: on the pricing table or readiness assessment if the page has one, otherwise on the first banner or section that offers it |
| Later banners | Their message and photo, with a quiet "Let's talk" text link instead of a second button |
| Contact form | The primary CTA as the submit button |
| Footer | "Back to top" (it sat right under the form, so its CTA button was a duplicate) |

- **Pricing tables** (Azure and AWS managed services) had the same button on all three plan cards. They now have one button under the cards.
- **Home page:** the primary CTA now appears only in the hero, the workshop, and the form.
  - The About photo card links to the workshop.
  - The Partners rows, the Dynamics 365 button, and the four "Talk to an Azure specialist" links now open the matching service pages, which also helps internal linking.
  - The Why section's duplicate button was removed.
- **Result:** a CTA audit across all 52 pages finds no section with two identical buttons.

**Proof: no unapproved results.** The audit skill says anonymised results from the live industry and AI Consulting pages are not approved. RWLS and Warrikal can't be published until AptaCloud confirms them. The site now handles proof like this:
- **Typical engagements.** All 17 case-study blocks (14 industry pages, AI Consulting, Legacy Migration, and Re-engineering) are now typical engagements. Each one names the segment, the pattern we often see, how a first project runs (proof of concept, then rollout), and what changes. They use no figures and no client names.
- **Removed outright:**
  - The testimonial blocks on AI Consulting and Legacy Migration.
  - The client-logo wall on Legacy Migration.
  - The healthcare, retail, banking, and manufacturing "Recent projects" cards on the nine Microsoft service pages.
- **Rebuilt for our verticals:** the App Modernisation industry and use-case cards (they were retail, healthcare, and finance).
- **When proof is approved,** the approved case studies replace the typical engagements one for one.

**Segment accuracy (industry matrix).** Each segment page now names the buyer from the matrix:
| Page | Buyer |
|---|---|
| Refining & Distribution | HSE consultancies, turnaround contractors, and NDT and inspection firms. Hero, pains, solutions, process, why us, and FAQs were rewritten, led by system integration across client sites. |
| Drilling & Well Services | Seismic and surveying, well testing and cementing, and coiled tubing and pumping firms. "GIS and field data capture" is added as its segment-specific service. |
| Pipeline Maintenance | Inspection and integrity firms, compression services, and SCADA support. The hero uses the matrix angle, "See failure risk before it becomes downtime". |
| Field Services | Mechanical, electrical, plumbing, concrete, and steel trade contractors. The hero reads "Schedule crews and capture field work without paper", and the pains cover contractor portals, crew scheduling, paper forms, and handover. |
| Construction | General contractors |
| Engineering & Design | A&E design firms. "ERP and project financials" is added as its segment-specific service. |

Services outside a segment's matrix row were renamed or removed. For example, Refining's "Enterprise asset management integration" is gone, because EAM and SCADA integration belongs to Major Operators and Pipeline only.

**House style:**
- **Rhetorical questions.** 37 CTA, banner, and intro questions are now statements (for example "Ready to get more from Dynamics 365?" → "Get more from Dynamics 365."). Informational question headings that the section answers, such as "Why choose AptaCloud?", are kept for AEO.
- **Out-of-vertical content.** Canada and healthcare content is replaced with the three verticals (AI Consulting FAQs, App Modernisation FAQ, and the Dynamics 365 "Local and global reach" card).
- **Other copy fixes.** "End-to-end", "industry-leading", "your best team members", and "industries we know best" are reworded.
- **Credentials.** About shows the approved credentials (20+ years, 300+ clients, 200+ engineers, and 4 delivery locations), and the home page now says "4 locations", not "4+".
- **AWS wording.** Company-level AWS certification claims ("certified AWS partner", "certified through the AWS Partner Network") now read "AWS partner". The client brief confirms AWS as a partner, but not a certification. Engineer-level "AWS-certified" wording stays flagged `[CONFIRM CREDENTIAL]`.

**Still open (site-wide decisions):**
- **URL slugs.** The matrix uses different slugs from the live site (for example `/industry/insurance/mgas-program-administrators/` and `/industry/construction/field-services/`). We kept the live, indexed URLs. If the matrix slugs are wanted, add 301 redirects from the live URLs.
- **Major Operators.** The audit skill names major operators as a non-ICP buyer. The page stays because it's live and in the matrix. `[NEEDS CEO SIGN-OFF]`
- **Segment-specific services.** The matrix marks its specialised O&G services (EAM and SCADA integration; GIS and field data capture) as "recommended, not yet internally confirmed". `[NEEDS CEO SIGN-OFF]`

## 10. Imagery and tools pass (2026-10-23)
- **Live-site images:** We reuse high-resolution originals only (1200px or wider) from the client's live pages. They now appear in these places:
  - The "Recent projects" cards on all nine Microsoft pages.
  - The Data Visualisation opening section, with the dashboard laptop image.
  - The data, machine learning, and generative AI banners.
- **Repeated photos:** The most reused generic photos have been replaced with new Pexels photos. No photo repeats within a page.
- **"Our tools" (Data Warehousing, Data Visualisation):** The scrolling logo strip is now a board grouped by role, with Microsoft first.
- **Footer:** The contact column repeated the contact section above it. It is now an Industries column linking to the three vertical pages.
