# AptaCloud site

Astro 7 + React 19 islands, Tailwind v4 + CSS Modules, static build to GitHub Pages under `/aptacloud`.
Dev: `npm run dev -- --port 4321` → http://localhost:4321/aptacloud/ · Check: `npx tsc --noEmit`, `npm run build`.

## Where things live
- `src/brand/brand.ts` — name, colours, contact, `PRIMARY_CTA`, `TRUST`, `asset()` (always wrap paths), `home("#x")` for home anchors.
- `src/pages/index.astro` — home (sections in `src/components/site/`). `src/pages/[slug].astro` — the 10 service pages.
- `src/data/services/` — all service-page copy (`ai.ts`, `data.ts`, `appmod.ts`, `shared.ts`); `extras.ts` sets each page's section order (mirrors the live site) + benefits / use cases / frameworks / assessment. Backgrounds follow the home rhythm grey → white → dark (`homeRhythm` in `components/service/tone.ts`); inner panels use `var(--card)` / `var(--bg)` so they contrast on any tone. `src/data/tech.ts` — logo registry.
- `src/data/services/layouts/` — rebuilt pages: every live-page section in live order as typed blocks (cards, banner, split, rows, steps, cases, quotes, logos, statement, tabs, industries, faq), rendered by `components/service/blocks/`. Stats strip always sits under the hero. Pages without a layout still use the old extras.ts template.
- `src/components/service/` — service-page sections; `src/layouts/Site.astro` wraps Nav + Footer.
- `docs/home-page-review.md`, `docs/service-pages-review.md` — decisions and open items for the SEO reviewer.

## Rules (from AptaCloud Brand + Content Writing Guidelines v2.0)
- "AptaCloud" only. Australian spelling in copy, US spelling in URLs. Oxford comma. No em dashes.
- Banned: seamless, end-to-end, robust, cutting-edge, leverage, unlock, revolutionise, "free", "Contact us", "Book now", superlatives.
- One primary CTA per page, POC-led. No unapproved metrics, case studies or partner claims. No NetSuite. Microsoft leads.
- Verticals only: Insurance, Oil & Gas, Engineering & Construction.

## Design rules
- Match the home page system: pill tags, 24px cards, mono labels, scroll word-fill headings, `<Reveal>`.
- Labels use Inter (600, sentence case), never mono uppercase micro-labels; mono only in the hero ticker (as on home).
- No accent "border line" hover effects (user dislikes them).
- Cards stay clean and flat like home: white cards on light sections, surface cards on dark, photos above text (no dark overlays, glows or gradient cards). Hero glow/grid only. Numbers only where order matters (process).
- Sub-page hero title is always two lines (title, then the red accent tail); size scales to the longer line. Phones may wrap.
- Phones: card groups become swipe rails (`sec.rail` + `RailHint`) to cut vertical scrolling.
- AI expertise shows GPT, Claude, Gemini, Grok, Llama logos (`public/images/ai/`).
