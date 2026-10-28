// Automated visual-bug sweep: node audit.mjs <width> <slug>...
// Reports per page: horizontal overflow, broken images, elements spilling out of
// their section, sections with big empty space, tiny text, overlapping
// headings, console errors.
import { chromium } from "playwright-core";
const [w, ...slugs] = process.argv.slice(2);
const width = Number(w);
const b = await chromium.launch({ executablePath: process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const ctx = await b.newContext({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
for (const slug of slugs) {
  const p = await ctx.newPage();
  const errs = [];
  p.on("pageerror", (e) => errs.push(String(e).slice(0, 120)));
  p.on("console", (m) => m.type() === "error" && errs.push(m.text().slice(0, 120)));
  await p.goto(`http://localhost:4321/aptacloud/${slug}/`, { waitUntil: "networkidle" });
  const h = await p.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += 600) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(60); }
  await p.waitForTimeout(500);
  const r = await p.evaluate(() => {
    const out = [];
    const vw = document.documentElement.clientWidth;
    if (document.documentElement.scrollWidth > vw + 1) out.push(`page overflow-x ${document.documentElement.scrollWidth}>${vw}`);
    document.querySelectorAll("img").forEach((i) => { if (i.complete && i.naturalWidth === 0) out.push(`broken img ${i.getAttribute("src")}`); });
    const main = document.querySelector("main") ?? document.body;
    const secs = [...main.querySelectorAll(":scope > section, :scope > * > section, main section[id]")].filter((s, i, a) => a.indexOf(s) === i);
    secs.forEach((sec) => {
      const id = sec.id || sec.className.slice(0, 30);
      const sr = sec.getBoundingClientRect();
      // content extent inside the section
      let top = Infinity, bottom = -Infinity;
      sec.querySelectorAll("h1,h2,h3,p,li,img,a,button,article,figure").forEach((e) => {
        const r = e.getBoundingClientRect();
        if (r.height === 0 || r.width === 0) return;
        const cs = getComputedStyle(e);
        if (cs.visibility === "hidden" || cs.display === "none") return;
        top = Math.min(top, r.top); bottom = Math.max(bottom, r.bottom);
        // horizontal spill out of viewport (not inside scroll rails)
        let el = e, inRail = false;
        while (el && el !== sec) { const o = getComputedStyle(el).overflowX; if (o === "auto" || o === "scroll" || o === "hidden" || o === "clip") { inRail = true; break; } el = el.parentElement; }
        if (!inRail && (r.right > vw + 2 || r.left < -2)) out.push(`spill-x #${id} <${e.tagName.toLowerCase()}> "${(e.textContent || e.getAttribute("src") || "").trim().slice(0, 40)}"`);
        if (["P", "LI", "H3"].includes(e.tagName) && parseFloat(cs.fontSize) < 12) out.push(`tiny text ${cs.fontSize} #${id} "${e.textContent.trim().slice(0, 30)}"`);
        if (e.scrollWidth > e.clientWidth + 2 && ["H1", "H2", "H3", "P"].includes(e.tagName) && cs.overflow !== "visible") out.push(`text clipped #${id} "${e.textContent.trim().slice(0, 30)}"`);
      });
      if (top === Infinity) { out.push(`empty section #${id}`); return; }
      const padTop = top - sr.top, padBottom = sr.bottom - bottom;
      if (padTop > 220 || padBottom > 220) out.push(`big gap #${id} top ${Math.round(padTop)} bottom ${Math.round(padBottom)} (h ${Math.round(sr.height)})`);
      if (padBottom < 20 && !/banner/.test(id)) out.push(`tight bottom #${id} ${Math.round(padBottom)}`);
    });
    // big empty gaps inside two-column splits: compare sibling column heights
    document.querySelectorAll("section [class*=layout], section [class*=split]").forEach((g) => {
      const kids = [...g.children].filter((k) => k.getBoundingClientRect().height > 0);
      if (kids.length !== 2 || getComputedStyle(g).display !== "grid") return;
      const [a, c] = kids.map((k) => k.getBoundingClientRect().height);
      if (Math.abs(a - c) > 260) out.push(`uneven columns ${Math.round(a)} vs ${Math.round(c)} in #${g.closest("section")?.id}`);
    });
    return out;
  });
  console.log(`\n== ${slug} @${width} (${h}px)`);
  [...new Set([...r, ...errs.map((e) => "console: " + e)])].forEach((l) => console.log("  " + l));
  await p.close();
}
await b.close();
