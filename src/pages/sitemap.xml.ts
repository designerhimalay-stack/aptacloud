// sitemap.xml, built from the page registry so every new page is listed
// automatically. Absolute URLs come from `site` + `base` (astro.config.mjs).
import type { APIRoute } from "astro";
import { SERVICE_PAGES } from "../data/services";

const BUILT = new Date().toISOString().slice(0, 10);

export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const url = (path: string) => new URL(`${base}${path}`, site).href;
  // Home first, then service, industry, and company pages. The privacy page is
  // left out while it is a noindex placeholder; add it back with the real policy.
  const entries = [
    { loc: url("/"), priority: "1.0" },
    ...SERVICE_PAGES.map((p) => ({
      loc: url(`/${p.slug}/`),
      priority: p.category === "industries" ? "0.9" : p.category === "company" ? "0.6" : "0.8",
    })),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map((e) => `  <url><loc>${e.loc}</loc><lastmod>${BUILT}</lastmod><priority>${e.priority}</priority></url>`).join("\n")}
</urlset>
`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
