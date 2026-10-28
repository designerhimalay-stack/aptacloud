// robots.txt: allow everything and point to the sitemap. On GitHub Pages
// (project site) crawlers only read the domain root, so this takes effect once
// the site moves to its own domain (see docs/launch-checklist.md).
import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const sitemap = new URL(`${base}/sitemap.xml`, site).href;
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
