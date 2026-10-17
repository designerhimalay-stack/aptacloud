// ─────────────────────────────────────────────────────────────────────────
//  BRAND — the single source of truth.
//  Change the name, colours, logo grid or contact details here and every
//  page, component, favicon and meta tag follows.
// ─────────────────────────────────────────────────────────────────────────

export const BRAND = {
  /** Company name — used in copy, the logo wordmark, meta tags and the footer. */
  name: "Aptacloud",
  /** Short promise used in titles and the hero. */
  tagline: "Your Path to Measurable AI ROI",
  location: "Richardson, Texas",

  colors: {
    /** The signature Aptacloud signal colour (buttons, highlights, icons). */
    accent: "#ef1524",
    /** Lighter accent for hovers. */
    accentSoft: "#f04c35",
    /** Text on top of the accent colour. */
    onAccent: "#ffffff",
    /** Dark background (hero, dark sections). */
    dark: "#050505",
    /** Ink on light backgrounds. */
    ink: "#0a0a0a",
  },

  /** Logo mark: a 5×7 pixel grid ("1" = cell, "A" = the accent cell).
   *  Edit the rows to redraw the mark everywhere (nav, footer, favicon). */
  mark: [
    ".111.",
    "1...1",
    "1...1",
    "11A11",
    "1...1",
    "1...1",
    "1...1",
  ],

  /** US contact details as per Aptacloud headquarters. */
  contact: {
    phones: [
      { number: "+1 (972) 928-2341", flag: "us", country: "United States" },
      { number: "+1 (972) 779 6347", flag: "us", country: "United States" },
    ],
    email: "contact@aptacloud.com",
    address: ["801 E Campbell Rd, Ste 365", "Richardson, TX 75081, USA"],
    website: "aptacloud.com",
  },

  /** Social profiles */
  social: [
    { id: "facebook", label: "Facebook", href: "https://www.facebook.com/aptacloud" },
    { id: "instagram", label: "Instagram", href: "https://www.instagram.com/aptacloud" },
    { id: "x", label: "X", href: "https://x.com/aptacloud" },
    { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/aptacloud" },
    { id: "pinterest", label: "Pinterest", href: "https://www.pinterest.com/aptacloud" },
  ],

  /** Memberships shown in the footer */
  badges: [{ src: "/images/badges/allen-chamber.png", alt: "Proud member — Allen Chamber of Commerce 2026" }],

  year: 2026,
} as const;

export type Brand = typeof BRAND;

/** `+1 (202) 555-0147` → `+12025550147` for tel: links; digits only for wa.me. */
export const telHref = (n: string) => `tel:${n.replace(/[^+\d]/g, "")}`;
export const whatsappHref = (n: string) => `https://wa.me/${n.replace(/\D/g, "")}`;

/** `#rrggbb` → `r, g, b` (for rgba() / color-mix fallbacks). */
export function rgbOf(hex: string) {
  const h = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)).join(", ");
}

/** CSS custom properties derived from BRAND.colors — injected once in <head>. */
export function brandCssVars() {
  const c = BRAND.colors;
  return `:root{--accent:${c.accent};--accent-soft:${c.accentSoft};--ink:${c.onAccent};--accent-rgb:${rgbOf(c.accent)};--accent-08:${c.accent}14;--accent-32:${c.accent}52;--accent-50:${c.accent}80;--brand-dark:${c.dark};--brand-ink:${c.ink}}`;
}

/** The logo mark as an SVG string (favicon / static use). */
export function markSvg({ cell = BRAND.colors.ink, bg }: { cell?: string; bg?: string } = {}) {
  const size = 5;
  const gap = 1;
  const cols = BRAND.mark[0].length;
  const rows = BRAND.mark.length;
  const w = cols * size + (cols - 1) * gap;
  const h = rows * size + (rows - 1) * gap;
  const rects = BRAND.mark
    .flatMap((row, y) =>
      [...row].map((ch, x) =>
        ch === "." ? "" : `<rect x="${x * (size + gap)}" y="${y * (size + gap)}" width="${size}" height="${size}" fill="${ch === "A" ? BRAND.colors.accent : cell}"/>`,
      ),
    )
    .join("");
  if (!bg) return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">${rects}</svg>`;
  const pad = 9;
  const S = Math.max(w, h) + pad * 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}"><rect width="${S}" height="${S}" rx="${S * 0.14}" fill="${bg}"/><g transform="translate(${(S - w) / 2} ${(S - h) / 2})">${rects}</g></svg>`;
}
