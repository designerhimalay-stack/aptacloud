// Service pages registry: every page, in nav order, plus lookups.

import { asset } from "@/brand/brand";
import { AI_PAGES } from "./ai";
import { APPMOD_PAGES } from "./appmod";
import { DATA_PAGES } from "./data";
import { EXTRAS } from "./extras";
import { DEFAULT_STATS, LAYOUTS } from "./layouts";
import { AZURE_PAGES, MS_PAGES } from "./microsoft";
import { MS_EXTRAS } from "./microsoft-extras";
import { CATEGORIES } from "./shared";
import type { CategoryId, ServicePage } from "./types";

export const SERVICE_PAGES: ServicePage[] = [...AI_PAGES, ...DATA_PAGES, ...APPMOD_PAGES, ...MS_PAGES, ...AZURE_PAGES];

/** URL of a service page (slug keeps US spelling to match the live site). */
export const serviceHref = (slug: string) => asset(`/${slug}/`);

export const pagesIn = (category: CategoryId) => SERVICE_PAGES.filter((p) => p.category === category);

export function getService(slug: string) {
  const page = SERVICE_PAGES.find((p) => p.slug === slug);
  if (!page) throw new Error(`Unknown service page: ${slug}`);
  const extras = EXTRAS[slug] ?? MS_EXTRAS[slug] ?? { sections: ["pains", "services", "process", "industries", "why"] };
  // Related: up to three pages from the same category, the ones that follow this page.
  const group = pagesIn(page.category);
  const at = group.findIndex((p) => p.slug === slug);
  const siblings = [1, 2, 3].map((k) => group[(at + k) % group.length]).filter((p, i, a) => p.slug !== slug && a.indexOf(p) === i);
  const layout = LAYOUTS[slug];
  return { page, extras, layout, stats: layout?.stats ?? DEFAULT_STATS, category: CATEGORIES[page.category], siblings };
}

export { CATEGORIES };
export type { ServicePage };
