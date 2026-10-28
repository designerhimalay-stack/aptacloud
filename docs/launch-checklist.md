# Launch checklist (SEO, content, and technical)

Status as of 2026-10-28. ✅ done and verified, ⚠️ done but needs a decision or asset, ❌ blocker.
To check again, run `npm run build`, then the audit scripts in [SUMMARY.md](../SUMMARY.md) (section 7).

## 1. Blockers before going live on aptacloud.com

- ❌ **Contact form backend.** The form opens a `mailto:` link, so leads are not stored or tracked. Connect HubSpot, Power Automate, or Formspree in `src/components/site/CTA.tsx`, and add a thank-you state and a conversion event.
- ❌ **Privacy policy text.** The policy page is a placeholder and is `noindex`. Get the approved text from AptaCloud, then remove `noindex` in `src/pages/privacy.astro`.
- ❌ **Production domain.** `astro.config.mjs` has `site: "https://designerhimalay-stack.github.io"` and `base: "/aptacloud"`. For aptacloud.com:
  - Set `site: "https://aptacloud.com"` and `base: "/"`.
  - Rebuild.
  - Canonical tags, Open Graph URLs, the sitemap, robots.txt, and the JSON-LD all follow automatically.
- ❌ **301 redirects from the live WordPress URLs.** All 50 page slugs match the live site, so redirects are needed only for URLs we dropped or never rebuilt:
  - individual `/blog/<slug>/` posts (they still live on WordPress)
  - `/event/...` pages
  - the white paper detail page
  - `/in/`, `/uae/`, and any tag or category archives
  
  Decide: keep WordPress for the blog on a subdomain, or migrate the posts.
- ⚠️ **Client approvals** (see `docs/service-pages-review.md`, sections 9d to 9f):
  - Major Operators page (non-ICP)
  - segment-specific oil and gas services
  - engineer-level "AWS-certified" wording
  - RWLS and Warrikal case studies
  - leadership titles and photos
  - the Careers page with no open roles

## 2. On-page SEO

- ✅ Every page has exactly one H1, and no heading levels are skipped.
- ✅ Unique titles, 30 to 60 characters, in the pattern "Topic | AptaCloud".
- ✅ Unique meta descriptions, 110 to 160 characters (the privacy page is shorter and `noindex`).
- ✅ Self-referencing canonical on every page.
- ✅ Open Graph (type, locale `en_AU`, title, description, URL, image, and image alt) and a Twitter `summary_large_image` card on every page.
- ✅ Share image: a 1200×630 brand card, or the page's hero photo on service and industry pages.
- ✅ `lang="en-AU"`, viewport, theme colour, SVG favicon, and Apple touch icon.
- ✅ All images have `alt` text (decorative images use `alt=""`).
- ✅ Internal links: 0 broken links or anchors across 53 built pages (checked with `linkcheck.mjs`).
- ✅ Breadcrumbs, both visible and in BreadcrumbList schema.
- ✅ URL slugs match the live site (US spelling in URLs, Australian spelling in copy).
- ⚠️ The SEO team's sitemap proposes different slugs (for example `/industry/insurance/mgas-program-administrators/`). We kept the indexed live slugs. If the new slugs are adopted, add 301 redirects.

## 3. Structured data (JSON-LD)

- ✅ Organization (name, URL, logo, email, phone, address, social profiles) and WebSite on every page.
- ✅ Service pages and industry pages: BreadcrumbList, Service, and FAQPage (6 or more Q&As each).
- ✅ Company pages: AboutPage, Blog, or WebPage, plus BreadcrumbList.
- ⚠️ Check the live site in Google's Rich Results Test after the domain move.

## 4. Crawl and index

- ✅ `sitemap.xml`: 51 URLs (the home page plus 50 pages), generated from the page registry so new pages are added automatically. The privacy page is left out until its real text is published.
- ✅ `robots.txt`: allows all and points to the sitemap.
- ✅ The 404 page is `noindex` and links back into the site.
- ⚠️ On GitHub Pages (a project site), crawlers read `robots.txt` only at the domain root. It takes effect on aptacloud.com.
- ⚠️ After launch: submit the sitemap in Google Search Console and Bing Webmaster Tools, and check index coverage after 1 to 2 weeks.

## 5. Content and brand (Brand Guidelines v2.0 and the SEO team's skills)

- ✅ No em dashes in any rendered text, checked across all pages.
- ✅ No rhetorical questions in CTAs, banners, or intros. Informational question headings are kept for AEO.
- ✅ Banned words removed: seamless, end-to-end, robust, cutting-edge, leverage, unlock, revolutionise, "free", "Contact us", "Book now", and superlatives.
- ✅ Australian spelling, Oxford comma, and "AptaCloud" only.
- ✅ No unapproved metrics, case studies, testimonials, or client logos. Proof is shown as "typical engagements".
- ✅ Verticals only (insurance, oil and gas, engineering and construction). No healthcare, retail, or Canada content.
- ✅ Credentials in the approved wording (20+ years, 300+ clients, 200+ engineers, 4 delivery locations).
- ✅ Each segment page names the matrix buyer and maps only the services the matrix marks for that segment.
- ✅ Microsoft leads. AWS is a supporting partner. No NetSuite.

## 6. Conversion (CRO)

- ✅ One primary action per page: in the hero, once mid-page, and in the contact form.
- ✅ The nav reads "Let's talk" on every page. No section has two identical buttons.
- ✅ POC-led CTA wording (for example "Prove the move on one workload").
- ❌ The form destination is not trackable yet (see 1).
- ⚠️ Add analytics (GA4 or Clarity) with events for CTA clicks and form submits. Cookie consent is needed if non-essential cookies are used.

## 7. Performance and accessibility

- ✅ Static HTML (Astro). React islands hydrate only when visible. Fonts are self-hosted and preloaded.
- ✅ Images load lazily below the fold. Hero images are `priority`.
- ✅ Reduced-motion support on every animation.
- ✅ Visible focus styles on tabs and controls. The FAQ uses buttons.
- ⚠️ Convert JPEG photos to AVIF or WebP with `srcset` (Astro `<Image>`) for faster mobile loading. This is the biggest Lighthouse gain left.
- ⚠️ Run Lighthouse (mobile) on the home page and one service page after the domain move. Target LCP under 2.5 s and CLS under 0.1.
- ⚠️ Run a full WCAG 2.1 AA pass (axe DevTools). Check muted-text contrast on the tint background.

## 8. Legal and trust

- ❌ Privacy policy (see 1).
- ⚠️ Terms of use and a cookie policy, if analytics cookies are used.
- ✅ Third-party logos are used only to identify integrations (see `docs/agentcraft/PHOTO_CREDITS.md`).
- ✅ Photo credits are recorded: Pexels photos by ID, and the live-site originals.
