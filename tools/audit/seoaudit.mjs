// SEO audit of the built site: node seoaudit.mjs <distDir>
// Per page: title/description length and duplicates, H1 count, heading-level
// skips, canonical, OG/Twitter tags, JSON-LD types, img alt, em dashes in text.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";
const dist = process.argv[2];
const pages = [];
const walk = (d) => { for (const f of readdirSync(d)) { const p = join(d, f); if (statSync(p).isDirectory()) walk(p); else if (f === "index.html") pages.push(p); } };
walk(dist);
const titles = new Map(), descs = new Map();
const rows = [];
const strip = (h) => h.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<style[\s\S]*?<\/style>/g, "");
for (const f of pages) {
  const html = readFileSync(f, "utf8");
  const page = f.slice(dist.length).replace(/\\/g, "/").replace(/index\.html$/, "") || "/";
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || "";
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "";
  const body = strip(html);
  const hs = [...body.matchAll(/<h([1-6])\b/g)].map((m) => Number(m[1]));
  const skips = [];
  for (let i = 1; i < hs.length; i++) if (hs[i] > hs[i - 1] + 1) skips.push(`h${hs[i - 1]}→h${hs[i]}`);
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => { try { return JSON.parse(m[1])["@type"]; } catch { return "BAD-JSON"; } });
  const imgs = [...body.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
  const noAlt = imgs.filter((t) => !/\salt=/.test(t)).length;
  const text = body.replace(/<[^>]+>/g, " ");
  const em = (text.match(/—/g) || []).length;
  (titles.get(title) || titles.set(title, []).get(title)).push(page);
  (descs.get(desc) || descs.set(desc, []).get(desc)).push(page);
  rows.push({
    page,
    titleLen: title.length,
    descLen: desc.length,
    h1: hs.filter((h) => h === 1).length,
    skips: [...new Set(skips)].join(" "),
    canonical: /rel="canonical"/.test(html),
    ogImage: /property="og:image"/.test(html),
    ogUrl: /property="og:url"/.test(html),
    twitter: /name="twitter:card"/.test(html),
    ld: ld.join(","),
    noAlt,
    em,
  });
}
const flag = (r) => [
  r.titleLen < 30 || r.titleLen > 60 ? `title ${r.titleLen}` : "",
  r.descLen < 110 || r.descLen > 160 ? `desc ${r.descLen}` : "",
  r.h1 !== 1 ? `h1×${r.h1}` : "",
  r.skips ? `skips ${r.skips}` : "",
  !r.canonical ? "no canonical" : "",
  !r.ogImage ? "no og:image" : "",
  !r.ogUrl ? "no og:url" : "",
  !r.twitter ? "no twitter" : "",
  !r.ld ? "no JSON-LD" : "",
  r.noAlt ? `${r.noAlt} img no alt` : "",
  r.em ? `${r.em} em dash` : "",
].filter(Boolean).join(" · ");
for (const r of rows.sort((a, b) => a.page.localeCompare(b.page))) console.log(`${r.page.padEnd(62)} ${flag(r)}  [${r.ld}]`);
console.log("\nDuplicate titles:", [...titles].filter(([, v]) => v.length > 1).map(([k, v]) => `${k} (${v.join(", ")})`).join("; ") || "none");
console.log("Duplicate descriptions:", [...descs].filter(([, v]) => v.length > 1).map(([k, v]) => `${k.slice(0, 50)} (${v.join(", ")})`).join("; ") || "none");
console.log("robots.txt:", existsSync(join(dist, "robots.txt")), " sitemap:", existsSync(join(dist, "sitemap-index.xml")) || existsSync(join(dist, "sitemap.xml")), " 404:", existsSync(join(dist, "404.html")));
