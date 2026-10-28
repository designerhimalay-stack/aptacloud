// Internal link + anchor check over the built site: node linkcheck.mjs <distDir> <base>
// Every href under <base> must resolve to a built page (dir/index.html or a file),
// and every #fragment must match an id on the target page (or the same page).
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";
const [dist, base = "/aptacloud/"] = process.argv.slice(2);
const pages = [];
const walk = (d) => {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (f === "index.html" || f.endsWith(".html")) pages.push(p);
  }
};
walk(dist);
const ids = new Map();
const urlOf = (file) => base + file.slice(dist.length + 1).replace(/\\/g, "/").replace(/index\.html$/, "");
for (const p of pages) {
  const html = readFileSync(p, "utf8");
  ids.set(urlOf(p), new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
}
const problems = [];
for (const p of pages) {
  const html = readFileSync(p, "utf8");
  const here = urlOf(p);
  for (const m of html.matchAll(/href="([^"]+)"/g)) {
    let href = m[1].replace(/&amp;/g, "&");
    if (/^(mailto:|tel:|https?:|data:|javascript:)/.test(href)) continue;
    if (href.endsWith(".css") || href.endsWith(".svg") || href.endsWith(".png") || href.endsWith(".ico") || href.endsWith(".webmanifest") || href.endsWith(".xml") || href.endsWith(".woff2")) continue;
    let [path, frag] = href.split("#");
    if (!path) path = here;
    if (!path.startsWith(base)) { problems.push(`${here}: outside base -> ${href}`); continue; }
    const target = path.endsWith("/") ? path : path + "/";
    if (!ids.has(target)) {
      const file = join(dist, path.slice(base.length));
      if (!existsSync(file)) problems.push(`${here}: missing page -> ${href}`);
      continue;
    }
    if (frag && !ids.get(target).has(frag)) problems.push(`${here}: missing #${frag} on ${target}`);
  }
}
console.log([...new Set(problems)].join("\n") || "all internal links and anchors resolve");
console.log(`${pages.length} pages checked`);
