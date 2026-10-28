# AptaCloud website: handover summary

Read this first if you are taking over this project (any model or developer). It records what exists, the rules every change must follow, how to verify work, and what is still open. Last updated 2026-10-28.

## 1. What this is

The marketing site for **AptaCloud**, a Microsoft-first cloud, data, and AI consultancy for mid-sized businesses in three verticals: **Insurance**, **Oil & Gas**, and **Engineering & Construction**. It replaces the WordPress site at aptacloud.com and keeps its live URL paths.

- **Stack:** Astro 7 (static output) + React 19 islands, Tailwind v4 + CSS Modules, TypeScript.
- **Pages:** 53 built pages. That is the home page, 50 registry pages (service, industry, and company), the privacy page, and a 404.
- **Live preview:** https://designerhimalay-stack.github.io/aptacloud/ (GitHub Pages, `gh-pages` branch).
- **Repo:** https://github.com/designerhimalay-stack/aptacloud (`main` holds the source).

## 2. Commands

```bash
npm install
npm run dev -- --port 4321    # http://localhost:4321/aptacloud/
npx tsc --noEmit              # type-check (must be clean)
npm run build                 # static build into dist/ (must succeed)
```

**Deploy** ("push to live"):
1. Commit and push to `main`.
2. Run `npm run build`.
3. Create a temporary worktree: `git worktree add -B gh-pages <tmp> origin/gh-pages`.
4. Delete everything in `<tmp>` except `.git`, copy `dist/*` in, and keep `.nojekyll`.
5. Commit with the message `Deploy <main-sha>: <summary>` and push.
6. Check the Pages build: `gh api repos/designerhimalay-stack/aptacloud/pages/builds/latest`.
7. Remove the worktree.

**Windows / PowerShell 5.1 pitfalls:**
- Write commit messages to a file without a BOM and use `git commit -F file`. `Out-File -Encoding utf8` adds a BOM; use `[IO.File]::WriteAllText(path, text, (New-Object Text.UTF8Encoding $false))`.
- Large pushes can fail with HTTP 408. Retry with `git -c http.postBuffer=524288000 push`.

## 3. Where things live

| Path | What |
|---|---|
| `src/brand/brand.ts` | Name, colours, contact, `PRIMARY_CTA`, `asset()` (always wrap site paths), `home("#x")` |
| `src/pages/index.astro` | Home page (sections in `src/components/site/`) |
| `src/pages/[...slug].astro` | Every service, industry, and company page; also holds the CTA cadence rule (`ctaFor`) and the JSON-LD |
| `src/pages/404.astro`, `privacy.astro`, `sitemap.xml.ts`, `robots.txt.ts` | Utility pages and SEO files |
| `src/layouts/Base.astro` | `<head>`: canonical, Open Graph, Twitter card, Organization + WebSite JSON-LD |
| `src/layouts/Site.astro` | Nav + main + footer shell (props: `title`, `description`, `jsonLd`, `image`, `noindex`) |
| `src/data/services/*.ts` | The page registry: `ai.ts`, `data.ts`, `appmod.ts`, `microsoft.ts` (Microsoft + Azure), `aws.ts`, `industries.ts`, `company.ts`. Each entry holds the slug, category, hero, CTA, SEO, and stack. |
| `src/data/services/layouts/*.ts` | Each page's sections in order, as typed blocks |
| `src/data/services/types.ts` | `ServicePage`, `Block` (every block kind and its fields), `BlockItem` |
| `src/data/services/shared.ts` | Categories, verticals, delivery phases |
| `src/data/services/layouts/shared.ts` | `COMPANY_STATS`: the approved credentials, the one source for every stats strip |
| `src/data/blog.ts` | The 64 live blog posts (titles, categories, dates). Feature images are in `public/images/blog/posts/`. |
| `src/data/tech.ts` | Logo registry (`TechId` → name + icon), including official Azure and AWS architecture icons |
| `src/components/service/blocks/` | One component per block kind (Cards, Split, Steps, Banner, Map, Layers, Phases, Ledger, Hub, Focus, Posts, People, Offices, Events, Papers, BlogIndex, and others) |
| `src/components/layout/nav/menus.ts` | Mega-menu links (`svc()` builds a link to a registry page) |
| `docs/service-pages-review.md` | Decision log and items awaiting client confirmation (read sections 9d to 9f) |
| `docs/design-audit.md` | Design problems and bugs list (fixed and open) |
| `docs/launch-checklist.md` | SEO, content, and technical launch checklist with status |
| `docs/agentcraft/PHOTO_CREDITS.md` | Credits for every photo and logo set |
| `tools/audit/` | Audit scripts (see section 7) |
| `CLAUDE.md` | Short project rules (kept in sync with this file) |

**Add a page:**
1. Add an entry to the right registry file.
2. Add its layout (blocks in live order) to the matching `layouts/*.ts`.
3. Link it in `menus.ts` with `svc(label, slug)`.
4. Build, then run the audits.

The sitemap picks it up automatically.

## 4. Content rules (non-negotiable)

**Sources:**
- Brand Guidelines v2.0 and Content Writing Guidelines v2.0 (Word files in the owner's Downloads).
- The SEO team's two skills, `aptacloud-content.skill` and `aptacloud-content-audit.skill` (zip files in Downloads; open `SKILL.md` and `references/industry-sitemap.md`).

On any conflict, the brand guidelines and `aptacloud-content` win.

- **Name and spelling.** Always "AptaCloud". Australian spelling in copy, US spelling in URLs. Oxford comma.
- **No em dashes. No rhetorical questions.** CTA and banner headings are statements. Informational question headings that the section answers ("Why choose AptaCloud?") are allowed, for AEO.
- **Banned:** seamless, end-to-end, robust, cutting-edge, leverage, unlock, revolutionise, "free", "Contact us", "Book now", "Get started", and superlatives (best, leading, industry-leading, world-class).
- **Verticals only:** insurance, oil and gas, and engineering and construction. Never healthcare, retail, banking, or Canada.
- **Segment pages** name the buyer exactly as the matrix in `industry-sitemap.md` does, and map only the services the matrix marks for that segment. For example, Refining & Distribution is HSE, turnaround, and NDT inspection firms, not refiners. Field Services is MEP, concrete, and steel trade contractors.
- **Microsoft leads.** AWS supports. Anthropic is a partner for AI models. Never NetSuite or GCP.
- **Proof.** No figures, client names, testimonials, or client logos unless AptaCloud has approved them. The only approved case studies are RWLS LLC and Warrikal Engineering, and they **cannot be published until AptaCloud confirms**. Until then, case sections are "typical engagements": client-pattern framing ("We often see…"), proof of concept then rollout, and qualitative outcomes (`label: "Typical engagement"` on a `cases` block).
- **Credentials**, in the approved wording only: 20+ years of experience, 300+ clients served, 200+ engineers under one roof, 4 delivery locations.
- **Statistics** need a named source. AWS is described as "AWS partner", never "certified AWS partner". Engineer-level "AWS-certified" wording is flagged for confirmation.

## 5. Design system (strict)

- **Match the home page:**
  - pill tags with an icon
  - 24 px cards (20 px for compact list items; 28 px for large feature panels)
  - Inter throughout
  - mono type only in the hero and stats tickers
  - scroll word-fill headings
  - `<Reveal>` entrances
- **Type scale (service CSS):**
  - 12 · 13 · 14 · 15 · 16 · 18 · 20 · 22 · 26 · 28 · 32, then the heading tiers
  - section H2: 48 / 40 / 28 px (desktop, tablet, phone)
  - banner and FAQ H2: 40 px
  - card title 20, small title 18, card body 15, meta 13
  - **No half-pixel sizes.** Don't add new sizes off this scale.
- **Spacing:**
  - section padding 128 / 104 / 56 px
  - container 1176 px
  - card padding 24 px (compact) or 28 px (roomy); phones 20 to 22 px
  - phone primary card radius 22 px
- **Section rhythm:** tint → white → dark, repeating (handled in `[...slug].astro`). Banners take the tone of the section before them. Never put two dark sections next to each other.
- **Hero:** the title is always two lines (the title, then a red accent tail), sized to the longer line. One primary button plus a "How we deliver" text link.
- **Cards** are flat: white on tint, surface on dark, and photos sit above the text. No glows, gradients, dark overlays, or accent-border hover effects.
- **Numbers** appear only where order matters (process steps).
- **Phones:** card groups become swipe rails (`sec.rail` + `RailHint`, which hides for a single card). Everything aligns left with the section head. Chips wrap at their natural width.
- **Photos:**
  - human photos first
  - never repeat a photo on a page; avoid reuse across pages
  - live-site images only if at least 1200 px
  - Pexels by ID via its CDN (`https://images.pexels.com/photos/<id>/pexels-photo-<id>.jpeg?auto=compress&cs=tinysrgb&w=1600`); Unsplash and Pixabay block bots
  - record every new photo in `PHOTO_CREDITS.md`

## 6. CRO rule (template level)

- **Nav pill:** "Let's talk" on every page. It goes to the page's `#contact` form.
- **Primary CTA:**
  - in the **hero**
  - **once mid-page:** the pricing table or readiness assessment if the page has one, otherwise the first banner or block that offers it (`ctaFor` in `[...slug].astro`)
  - in the **contact form**
- **Later banners** keep their message and show a quiet "Let's talk" text link.
- **Footer:** "Back to top", because the form sits directly above it.
- **Never two identical buttons in one section.** Verify with `tools/audit/ctaaudit.mjs`.

## 7. Verify before you ship (audit tools)

Start the dev server first. The browser scripts use Chrome via `playwright-core`; set `CHROME_PATH` if Chrome is elsewhere.

```bash
node tools/audit/audit.mjs 1440 <slug>...         # overflow, broken images, gaps, console errors (repeat at 1024 and 390)
node tools/audit/designaudit.mjs 1440 out.json <slug>... && node tools/audit/dasummary.mjs out.json   # type, spacing, card, and button consistency; text issues
node tools/audit/ctaaudit.mjs <slug>...           # duplicate buttons per section
node tools/audit/shoot.mjs /path/ name 1440 full  # screenshot (modes: full, fold, el:#id)
node tools/audit/seoaudit.mjs dist                # after build: titles, descriptions, H1, canonical, OG, JSON-LD, alt, em dashes
node tools/audit/linkcheck.mjs dist /aptacloud/   # every internal link and #anchor resolves
```

**Don't edit `src/` while a crawl is running.** The dev server reloads and the crawl fails.

**Known audit false positives:**
- "uneven columns" on split sections (sticky photo)
- "big gap" on chip and arc sections
- "tight bottom" on `#top` and `#numbers`

Always check 1440, 1024, and 390 by eye before reporting a page as done.

## 8. Current state

- **Pages:**
  - home
  - 9 Microsoft, 6 Azure, 6 AWS, 4 AI, 3 data, and 3 application modernisation service pages
  - 3 industry hubs and 11 segment pages
  - About, Careers, Blog, White Papers, Events
  - privacy and 404
- **Checks, all passing at the last run:**
  - type-check and build are clean
  - 0 broken links
  - 0 duplicate buttons
  - 0 em dashes in rendered text
  - SEO audit: every page has exactly one H1, a canonical, OG and Twitter tags, and JSON-LD; there's a sitemap and robots.txt
- **Open blockers:** see `docs/launch-checklist.md` §1 (form backend, privacy text, production domain and redirects, client approvals). Design items still open are in `docs/design-audit.md` ("Open").

## 9. Decisions already made (don't reopen without the owner)

- Live URL slugs are kept. The SEO team's matrix slugs differ; adopting them needs 301 redirects.
- Blog posts and event detail pages stay on the live WordPress site; cards link out to them.
- Pricing terms on the Azure and AWS managed services pages are client-approved as on the live site.
- Duplicate live sections are dropped without asking.
- Each sibling page gets a different design for its key sections (map, layers, phases, ledger, hub, and so on), so the template doesn't read as copies.
- Industry pages with the live template keep every live section in live order.

## 10. Owner preferences

- Work in batches. Plan each page from its live counterpart (every live section, in order, upgraded and not replicated).
- Professional, strict design. No shortcuts or guesses; check the brand and SEO files instead.
- When the owner asks to commit or deploy, run the full audits first, then commit and deploy without asking again.
