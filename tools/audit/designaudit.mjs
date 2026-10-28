// Design-consistency audit: node designaudit.mjs <width> <out.json> <slug>...
// Collects computed styles across pages so inconsistencies show as data:
// heading scale by level, section padding, container left edges, card radius and
// padding, button metrics, pill tags, paragraph sizes, heading punctuation,
// em dashes and other text issues, under-resolution images, and missing alt.
import { chromium } from "playwright-core";
import { writeFileSync } from "node:fs";
const [w, out, ...slugs] = process.argv.slice(2);
const width = Number(w);
const base = "http://localhost:4321/aptacloud/";
const b = await chromium.launch({ executablePath: process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const ctx = await b.newContext({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
const p = await ctx.newPage();
const all = [];
for (const slug of slugs) {
  const url = base + (slug === "/" ? "" : `${slug}/`);
  for (let tries = 0; tries < 2; tries++) {
    try {
      await p.goto(url, { waitUntil: "networkidle", timeout: 60000 });
      await p.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); }
        window.scrollTo(0, 0);
      });
      await p.waitForTimeout(400);
      const r = await p.evaluate(() => {
        const px = (v) => Math.round(parseFloat(v) * 10) / 10;
        const vis = (el) => {
          const cs = getComputedStyle(el);
          const rc = el.getBoundingClientRect();
          return cs.display !== "none" && cs.visibility !== "hidden" && rc.width > 0 && rc.height > 0;
        };
        const where = (el) => {
          const s = el.closest("section, nav, footer, header");
          return s ? `${s.tagName.toLowerCase()}#${s.id || "?"}` : "body";
        };
        const txt = (el) => el.innerText.trim().replace(/\s+/g, " ").slice(0, 60);
        const res = { headings: [], sections: [], containers: [], cards: [], buttons: [], pills: [], paras: [], text: [], images: [] };
        for (const h of document.querySelectorAll("h1, h2, h3")) {
          if (!vis(h)) continue;
          const cs = getComputedStyle(h);
          res.headings.push({ tag: h.tagName, size: px(cs.fontSize), weight: cs.fontWeight, ls: cs.letterSpacing, lh: px(cs.lineHeight) || cs.lineHeight, where: where(h), text: txt(h), endsDot: /[.!?]$/.test(h.innerText.trim()) });
        }
        for (const s of document.querySelectorAll("main > section, body > section, section[id]")) {
          if (!vis(s) || s.closest("section") !== s) continue;
          const cs = getComputedStyle(s);
          res.sections.push({ id: s.id, pt: px(cs.paddingTop), pb: px(cs.paddingBottom) });
          const c = s.firstElementChild;
          if (c) res.containers.push({ id: s.id, left: Math.round(c.getBoundingClientRect().left + parseFloat(getComputedStyle(c).paddingLeft)), width: Math.round(c.getBoundingClientRect().width) });
        }
        for (const el of document.querySelectorAll("article, [class*='card'], [class*='Card']")) {
          if (!vis(el)) continue;
          const cs = getComputedStyle(el);
          const r = parseFloat(cs.borderTopLeftRadius);
          if (r < 12) continue;
          const cls = (el.className && el.className.toString().split(" ")[0]) || el.tagName;
          res.cards.push({ cls: cls.replace(/_[a-z0-9]{5}_\d+$/i, ""), radius: px(cs.borderTopLeftRadius), pad: `${px(cs.paddingTop)}/${px(cs.paddingLeft)}`, where: where(el) });
        }
        for (const el of document.querySelectorAll("a, button")) {
          if (!vis(el)) continue;
          const cls = (el.className && el.className.toString()) || "";
          if (!/btn|button|Button|roll-host/.test(cls) && el.tagName !== "BUTTON") continue;
          const cs = getComputedStyle(el);
          const rc = el.getBoundingClientRect();
          if (rc.height < 30) continue;
          res.buttons.push({ h: Math.round(rc.height), fs: px(cs.fontSize), radius: px(cs.borderTopLeftRadius), pad: px(cs.paddingLeft), where: where(el), text: txt(el).replace(/(\S) (?=\S( |$))/g, "$1") });
        }
        for (const el of document.querySelectorAll("[class*='pill'], [class*='Pill'], [class*='tag']")) {
          if (!vis(el)) continue;
          const rc = el.getBoundingClientRect();
          if (rc.height > 60 || rc.height < 18) continue;
          const cs = getComputedStyle(el);
          res.pills.push({ h: Math.round(rc.height), fs: px(cs.fontSize), where: where(el) });
        }
        for (const el of document.querySelectorAll("p")) {
          if (!vis(el) || el.innerText.trim().length < 40) continue;
          const cs = getComputedStyle(el);
          res.paras.push({ size: px(cs.fontSize), lh: px(cs.lineHeight) || cs.lineHeight, where: where(el) });
        }
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let n;
        while ((n = walker.nextNode())) {
          const t = n.nodeValue;
          if (!t || !n.parentElement || !vis(n.parentElement) || n.parentElement.closest("script,style")) continue;
          if (/—/.test(t)) res.text.push({ issue: "em dash", where: where(n.parentElement), text: t.trim().slice(0, 80) });
          if (/ – /.test(t)) res.text.push({ issue: "spaced en dash", where: where(n.parentElement), text: t.trim().slice(0, 80) });
          if (/\s{2,}\S/.test(t.trim()) && !/\n/.test(t)) res.text.push({ issue: "double space", where: where(n.parentElement), text: t.trim().slice(0, 80) });
          if (/â€|Ã|Â/.test(t)) res.text.push({ issue: "mojibake", where: where(n.parentElement), text: t.trim().slice(0, 80) });
          if (/\s[,.]/.test(t) && !/\.\w/.test(t)) res.text.push({ issue: "space before punctuation", where: where(n.parentElement), text: t.trim().slice(0, 80) });
        }
        for (const img of document.querySelectorAll("img")) {
          if (!vis(img)) continue;
          const rc = img.getBoundingClientRect();
          const alt = img.getAttribute("alt");
          if (alt === null) res.images.push({ issue: "no alt attribute", src: img.currentSrc.slice(-60) });
          if (img.naturalWidth && /\.(jpe?g|png|webp)/i.test(img.currentSrc) && img.naturalWidth < rc.width * 1.2 && rc.width > 200)
            res.images.push({ issue: `low-res ${img.naturalWidth}px shown at ${Math.round(rc.width)}px`, src: img.currentSrc.slice(-60), where: where(img) });
        }
        return res;
      });
      all.push({ slug, ...r });
      break;
    } catch (e) {
      if (tries) all.push({ slug, error: String(e).slice(0, 200) });
    }
  }
}
writeFileSync(out, JSON.stringify(all, null, 1));
await b.close();
console.log(`${all.length} pages -> ${out}`);
