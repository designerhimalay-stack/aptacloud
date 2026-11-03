// Runs after `astro build`. For every raster <img> in the built HTML it adds WebP
// variants (srcset), intrinsic width and height (no layout shift), and a dominant
// colour behind the photo while it loads. SVGs get width and height from their viewBox.
// Variants are cached in node_modules/.cache, so later builds only encode new photos.
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { createHash } from "node:crypto";
import sharp from "sharp";

const DIST = "dist";
const BASE = "/aptacloud/";
const CACHE = "node_modules/.cache/aptacloud-images";
const WIDTHS = [480, 800, 1200, 1600, 2400];
mkdirSync(CACHE, { recursive: true });

const walk = (d, acc = []) => {
  for (const n of readdirSync(d)) {
    const f = join(d, n);
    if (statSync(f).isDirectory()) walk(f, acc);
    else if (n.endsWith(".html")) acc.push(f);
  }
  return acc;
};

const known = new Map();
async function variants(path) {
  if (known.has(path)) return known.get(path);
  const file = join(DIST, path);
  if (!existsSync(file)) return known.set(path, null).get(path);
  const buf = readFileSync(file);
  const hash = createHash("sha1").update(buf).digest("hex").slice(0, 10);
  const meta = await sharp(buf).metadata();
  const { dominant } = await sharp(buf).stats();
  const widths = WIDTHS.filter((w) => w < meta.width);
  widths.push(Math.min(meta.width, WIDTHS[WIDTHS.length - 1]));
  const stem = path.replace(/\.[a-z]+$/i, "");
  const out = [];
  for (const w of [...new Set(widths)]) {
    const name = `${stem.replace(/[\\/]/g, "-")}-${hash}-${w}.webp`;
    const cached = join(CACHE, name);
    if (!existsSync(cached)) await sharp(buf).resize({ width: w }).webp({ quality: 74 }).toFile(cached);
    const target = join(DIST, "images/_opt", name);
    mkdirSync(dirname(target), { recursive: true });
    copyFileSync(cached, target);
    out.push(`${BASE}images/_opt/${name} ${w}w`);
  }
  const hex = (v) => v.toString(16).padStart(2, "0");
  const opaque = !meta.hasAlpha;
  const info = { srcset: out.join(", "), width: meta.width, height: meta.height, bg: opaque ? `#${hex(dominant.r)}${hex(dominant.g)}${hex(dominant.b)}` : null };
  known.set(path, info);
  return info;
}

const svgSize = (path) => {
  const file = join(DIST, path);
  if (!existsSync(file)) return null;
  const m = readFileSync(file, "utf8").match(/viewBox=["'][\d.\-]+[\s,]+[\d.\-]+[\s,]+([\d.]+)[\s,]+([\d.]+)/);
  return m ? { width: Math.round(+m[1]), height: Math.round(+m[2]) } : null;
};

let imgs = 0;
for (const page of walk(DIST)) {
  const html = readFileSync(page, "utf8");
  const tags = [...html.matchAll(/<img\b[^>]*>/g)];
  let next = html;
  for (const tag of new Set(tags.map((t) => t[0]))) {
    const src = tag.match(/\ssrc="([^"]+)"/)?.[1];
    if (!src || !src.startsWith(BASE)) continue;
    const path = src.slice(BASE.length).split("?")[0];
    let out = tag;
    const attr = (name, value) => {
      if (!new RegExp(`\\s${name}=`).test(out)) out = out.replace(/^<img\b/, `<img ${name}="${value}"`);
    };
    if (/\.svg$/i.test(path)) {
      const s = svgSize(path);
      if (s) { attr("width", s.width); attr("height", s.height); }
    } else if (/\.(jpe?g|png)$/i.test(path)) {
      const v = await variants(path);
      if (!v) continue;
      attr("srcset", v.srcset);
      attr("width", v.width);
      attr("height", v.height);
      if (v.bg) {
        out = /\sstyle="/.test(out)
          ? out.replace(/\sstyle="/, ` style="background-color:${v.bg};`)
          : out.replace(/^<img\b/, `<img style="background-color:${v.bg}"`);
      }
      imgs++;
    } else continue;
    next = next.split(tag).join(out);
  }
  if (next !== html) writeFileSync(page, next);
}
console.log(`images: ${known.size} files, ${imgs} tags`);
