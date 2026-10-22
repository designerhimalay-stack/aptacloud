# AptaCloud home page: CRO, SXO and heuristics review

Prepared for: content and SEO review
Date: 21 October 2026
Scope: home page and global navigation of the new AptaCloud site (staging build)
Reference documents: AptaCloud Brand Guidelines v2.0 (External), AptaCloud Content Writing Guidelines v2.0

This file has three parts:

1. What we changed on the home page and why.
2. Open findings from a heuristics, CRO and SXO pass that are not fixed yet.
3. Contradictions between the guidelines, the client brief and the current site. These need a decision before we build the inner pages, so we avoid rework.

---

## 1. Changes made

### 1.1 One primary CTA (fixes CTA overload in the first screen)

Before this change, the first screen with the Services menu open showed five competing actions: "Let's talk" (nav), "Book AI workshop" (menu promo card), "Book a consultation" (menu footer strip), "Book AI workshop" (hero) and "Explore services" (hero, second filled button).

After this change:

| Location | Before | After |
|---|---|---|
| Nav pill | Let's talk | **Book your AI assessment** (the page's one primary CTA) |
| Menu promo card | Book AI workshop | Content link, e.g. "See what the workshop covers" (stays inside the menu, does not compete with the nav pill) |
| Menu footer strip | Text + "Book a consultation" link | **Trust line, no CTA:** "Built for Insurance · Oil & Gas · Engineering & Construction" + "Microsoft-certified specialists" |
| Services menu tabs | Count badges (07, 05, 09, 06, 06) | Removed (visual noise, no decision value) |
| Hero | Two filled buttons | One filled button (primary CTA) + a quiet text link "See what the workshop covers" |
| Mobile menu | Two buttons | One button (primary CTA) |
| Contact section | Form + a second "Book AI workshop" button | Form only |

Every primary button on the page now reads its label and target from one setting (`PRIMARY_CTA` in `src/brand/brand.ts`). If you decide the primary CTA should be POC-led (see 3.1), it is a one-line change.

The rule we applied: one primary action per page, repeated at decision points (hero, workshop, Why AptaCloud, contact, footer). Section-level secondary actions are matched to that section's messaging pillar and styled as secondary:

- Dynamics 365 section: "Talk to a Dynamics 365 specialist" (conversation offer)
- Azure section: "Get your cloud cost review" (pillar 3, wording from Brand Guidelines 7.1)

### 1.2 Client brief

- **NetSuite removed** everywhere: partner logo, partner heading, and the logo files themselves.
- **Anthropic added** as a partner. The partners line now reads "We partner with Microsoft, Anthropic, and AWS." Anthropic is shown as a text wordmark until we receive an approved logo file (see 3.5).

### 1.3 Copy brought in line with the guidelines

- Brand name corrected site-wide: **AptaCloud** (was "Aptacloud").
- Removed the banned words "Revolutionise", "seamless/seamlessly", "end-to-end", "robust", "exclusive", "premier", "Leverage", "Unlock the power", "Book now", "Know more", "Let's talk".
- Removed em dashes from all visible copy, alt text and page metadata.
- Removed "free" from every CTA and form subject (Brand Guidelines 7.1: do not state what is free unless AptaCloud supplies approved terms).
- "D365" replaced with "Dynamics 365". "Azure" lead copy now says "Microsoft Azure" on first use.
- Hero eyebrow is now a credential line: "Microsoft-certified cloud, data and AI consultancy".
- Hero intro, footer blurb, nav About card and meta description now use the approved one-line value proposition (Brand Guidelines 3.2), in Australian spelling.
- The About heading and intro now use the short value proposition ("Your team has already started. We take it to production.").
- **"Why choose our workshop" became "Why AptaCloud"**, with the four reasons in the fixed order from Brand Guidelines 3.4: proof before commitment, a mature phased process, senior specialists, built around what you already run. The earlier cards relied on unconfirmed figures (20+ years, 200+ engineers, 300+ clients).
- The rhetorical questions in the Workshop section are now statements in the buyer's words.
- The Microsoft, Azure and Dynamics 365 sections were rewritten around the outcome and CFO framing: "Get more from the Microsoft tools you already pay for", "Run more on Microsoft Azure, with costs you can explain".
- Page title is now "AptaCloud | Microsoft cloud, data and AI consultancy".

### 1.4 Technical fixes

- The font preload paths and the privacy page link left out the `/aptacloud` subpath, which broke them on GitHub Pages. Both are fixed.
- The AWS promo card in the menu was showing the Power Platform logo. It now shows the AWS logo.

---

## 2. Open findings (not fixed yet)

Ranked by likely impact on conversions and search visibility.

| # | Finding | Type | Recommendation |
|---|---|---|---|
| 1 | **The contact form only opens the visitor's email app** (`mailto:`). Nothing reaches AptaCloud if the visitor has no mail client set up or abandons the draft, and conversions cannot be tracked. | CRO | Connect it to a real form endpoint (HubSpot, Power Automate or similar) and fire a conversion event. This is the biggest conversion leak on the page. |
| 2 | **No proof on the home page.** No case study, POC story or testimonial. Brand Guidelines 6 calls proof "the most important part of every page". | CRO | Add a proof block once the RWLS and Warrikal case studies are cleared for publication (see 3.7). |
| 3 | **No FAQ block.** Guideline 14 lists FAQs with schema as primary AI-citation targets. | SXO | Add 6 or more buyer-phrased FAQs, including pricing and timeline, with FAQPage schema. |
| 4 | **No structured data, canonical URL, og:image, sitemap, robots.txt or llms.txt.** | SEO | Add Organization schema (name, address, locations, sameAs), canonical URLs, an Open Graph image and a sitemap during the inner-page build. Keep the entity facts identical everywhere (Guideline 14.2). |
| 5 | **Menu links go to the live aptacloud.com.** Visitors leave the new site from the first click. | UX | Replace them as each inner page is built. |
| 6 | **The region switcher does nothing.** It saves a choice but no content changes. That's a false affordance. | Heuristic: visibility of system status | Hide it until regional pages exist, or link it to /au/ and /in/ pages. |
| 7 | **The hero does not name a segment's problem or the market.** Guideline 12: the hero names the segment and its problem and names the market. The H1 is the tagline. | Messaging | The home page serves three verticals, so the segment-specific hero belongs on the vertical pages. Decide whether the home H1 stays the tagline (see 3.3). |
| 8 | **The About stat cards are credentials only** (20+, 300+). Guideline 6.1: credentials never stand alone as proof. | Messaging | Keep them only if the figures are confirmed (3.6), and pair them with proof once available. |
| 9 | **Headings animate from light grey to full colour on scroll.** Until scrolled, the text sits below accessible contrast, and the section headings do not honour reduced-motion settings. | Accessibility | Respect `prefers-reduced-motion` and start the fill at a higher contrast. |
| 10 | **Form fields use the placeholder as the visible label.** The label disappears once the visitor types. | Heuristic: recognition over recall | Use persistent visible labels. |

---

## 3. Contradictions and decisions needed

Each item notes what we did for now, so nothing is blocked.

### 3.1 Primary offer: AI Assessment Workshop or proof of concept?
- **Guidelines:** the bottom-of-funnel primary offer is a proof of concept on the client's data ("Prove it on your data"). An assessment is middle-of-funnel.
- **Client brief / current site:** the whole home page is built around the AI Assessment Workshop.
- **What we did:** set the primary CTA to "Book your AI assessment". It matches the product the page sells and the guideline's middle-of-funnel wording ("Book an AI readiness assessment").
- **Decision needed:** should the home page primary CTA stay assessment-led, or become POC-led? What is the approved POC wording?

### 3.2 Which market is the home page written for?
- **Guidelines:** one market per piece. Don't imply local Australian clients until there is proof.
- **Current site:** Australian spelling, region switcher defaulting to Australia, but US phone numbers and the Richardson, Texas address.
- **What we did:** kept Australian spelling.
- **Decision needed:** is this home page for Australia, the US, or a global entry page with regional pages under it (/au/, /in/)?

### 3.3 Tagline
- **Guidelines:** use only the tagline AptaCloud supplies. Don't create taglines.
- **Current site:** "Your Path to Measurable AI ROI" (from the client's earlier material).
- **Decision needed:** confirm this is the approved tagline.

### 3.4 Region list and locations
- **Guidelines:** the markets are the US, Australia and India. The locations are Richardson (HQ), Gurugram, Pune and Mexico City.
- **Current site:** the region switcher offers the US, India, the UAE and Australia. The footer shows only Richardson.
- **Decision needed:** should the UAE be removed? Should all four locations be listed?

### 3.5 Anthropic partnership wording and logo
- **Client brief:** add Anthropic as a partner.
- **Guidelines:** the guidelines don't mention Anthropic. "Name partner status only in the exact wording AptaCloud provides." Microsoft must lead.
- **What we did:** listed Anthropic second, after Microsoft. The lead copy says "We add Anthropic's AI models and AWS where they fit the systems you already run."
- **Decision needed:** what is the exact partnership status and wording? Can we have the approved logo file and permission to use it?

### 3.6 Company figures
- **Current site:** "20+ years of experience", "300+ clients served", "200+ engineers", "4+ global locations" (from the client's earlier PDF).
- **Guidelines:** use only figures AptaCloud supplies for each asset. Don't round up or combine them.
- **Decision needed:** confirm each figure in writing, or remove it.

### 3.7 Case studies
- **Guidelines:** the RWLS LLC and Warrikal Engineering case studies are approved for the brand, but "do not publish or reference these case studies until AptaCloud confirms they are approved for publication."
- **Decision needed:** can we publish them? They would fill the proof gap (finding 2).

### 3.8 Partner credential wording
- **Old copy:** "a certified Microsoft Dynamics 365 consulting partner".
- **Guidelines:** use Microsoft partner status only in the exact wording supplied.
- **What we did:** used "Microsoft-certified specialists" and "Microsoft-certified cloud, data and AI consultancy", which are on the guidelines' approved word list.
- **Decision needed:** give us the exact Microsoft partner designation, if you want it shown.

### 3.9 Navigation scope
- **Guidelines:** major oil and gas operators are not a target. Independent agencies are a content angle only. AWS is a supporting capability.
- **Current menu:** lists "Major Operators" and "Independent Agents" as industry pages, and gives AWS a full Services tab.
- **Decision needed:** should these be removed or demoted? We left them for now, because they mirror the live site's URLs.

### 3.10 Oxford comma with Australian English
- **Guidelines:** "Oxford comma always".
- **Note:** Australian style usually omits the Oxford comma.
- **What we did:** followed the guideline in all rewritten copy.
- **Decision needed:** please confirm this applies to the Australian pages too.

### 3.11 Process phase spelling
- **Guidelines:** the named phases are "Discover, Define, Design, Build, Integrate, Optimize".
- **What we did:** on the Australian-spelling home page we wrote "Optimise".
- **Decision needed:** are the phase names proper names (always "Optimize"), or should they be localised?

---

## 4. Next step

Once the decisions above are made, we build the inner pages with the structure from Brand Guidelines 12 and Content Writing Guidelines 7. The order would be:
1. A service page template (AI Consulting first).
2. A vertical page template (Insurance first).
