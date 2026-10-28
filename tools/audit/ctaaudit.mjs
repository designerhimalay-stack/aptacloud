// CTA audit: node ctaaudit.mjs <slug>... (use "/" for home)
// Per page: every button-like control (buttons and links styled as buttons, plus
// any link to #contact), grouped by section; flags the same label twice in one
// section and counts how many times the page's primary action appears.
import { chromium } from "playwright-core";
const base = "http://localhost:4321/aptacloud/";
const slugs = process.argv.slice(2);
const b = await chromium.launch({ executablePath: process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
for (const slug of slugs) {
  await p.goto(base + (slug === "/" ? "" : `${slug}/`), { waitUntil: "networkidle" });
  const r = await p.evaluate(() => {
    const isBtn = (el) => {
      if (el.tagName === "BUTTON" && el.type === "submit") return true;
      const href = el.getAttribute("href") || "";
      const cls = (el.className && el.className.toString()) || "";
      return /#contact$/.test(href) || /btn|button|Button|cta|pill/i.test(cls);
    };
    const groups = {};
    for (const el of document.querySelectorAll("a, button")) {
      if (!isBtn(el)) continue;
      const rect = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      if (cs.display === "none" || cs.visibility === "hidden" || (rect.width === 0 && rect.height === 0)) continue;
      const host = el.closest("section, nav, header, footer");
      const key = host ? `${host.tagName.toLowerCase()}#${host.id || "?"}` : "body";
      const text = el.innerText.trim().replace(/\s+/g, " ");
      if (!text) continue;
      (groups[key] ||= []).push(text);
    }
    return groups;
  });
  console.log(`\n== ${slug}`);
  let total = 0;
  for (const [k, list] of Object.entries(r)) {
    const dup = list.filter((t, i) => list.indexOf(t) !== i);
    total += list.length;
    console.log(`  ${k}: ${list.join(" | ")}${dup.length ? `   <<< DUP: ${[...new Set(dup)].join(", ")}` : ""}`);
  }
}
await b.close();
