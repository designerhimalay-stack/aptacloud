# Aptacloud

Marketing site for Aptacloud, a premier consulting firm for cloud, data, IT and AI
with a Microsoft-centric focus: an AI Assessment Workshop, Dynamics 365, Microsoft 365,
SharePoint, Copilot, Power Platform, Azure and AWS.

## Stack

- Astro with React islands (only interactive sections hydrate)
- Tailwind CSS v4 plus CSS Modules per component
- A small in-house motion module (`src/lib/motion.tsx`, no animation library) for the
  scroll-linked text fill, reveals, counters and the stack-to-spread card grids
- Self-hosted Inter and Geist Mono

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # static output in dist/
npm run lint     # type-check
```

## Structure

```
src/
  brand/         single source for name, colours, logo mark, contacts, social links
  components/
    layout/      nav (mega menus, region switcher), footer, page guides
    site/        page sections: hero, about, workshop, partners, Dynamics 365,
                 Microsoft, Azure, contact
    ui/          shared pieces: buttons with rolling-text hover, pill tags,
                 reveal / word-fill motion, spread grid, ticker
  pages/         index, privacy, generated favicon
  styles/        design tokens, light-theme scope, text styles
public/          photography, product and partner logos, flags, fonts
```

## Rebranding

Everything brand-specific lives in one file, `src/brand/brand.ts`:

| Field | Controls |
|---|---|
| `name`, `tagline` | logo wordmark, copy, page title, meta tags, footer |
| `colors.accent`, `accentSoft`, `onAccent` | buttons, highlights, icons, glows, hover states |
| `colors.dark`, `colors.ink` | dark backgrounds and fades; text and shadows on light sections |
| `mark` | the pixel logo mark in the nav, footer, menus and the generated favicon |
| `contact`, `social`, `badges` | footer, contact section, phone flags and WhatsApp |

No other file hard-codes the name or these colours; change a value and rebuild.

Image and logo credits: `docs/agentcraft/PHOTO_CREDITS.md`.
