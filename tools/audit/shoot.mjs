// Usage: node shoot.mjs <path> <name> [width=1440] [mode=full|fold|menu] [height]
// Screenshots the dev site with Chrome. Reduced motion so reveals/scroll effects settle.
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

const [, , path = "/", name = "shot", w = "1440", mode = "full", h] = process.argv;
const width = Number(w);
const height = Number(h ?? (width < 600 ? 844 : 900));
const out = fileURLToPath(new URL("./out/", import.meta.url));
mkdirSync(out, { recursive: true });

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, reducedMotion: process.env.MOTION ? "no-preference" : "reduce" });
const page = await ctx.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
await page.goto(`http://localhost:4321/aptacloud${path}`, { waitUntil: "networkidle" });

if (mode === "full") {
  // walk the page so lazy images and in-view reveals fire
  const total = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < total; y += height * 0.5) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(350);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${out}${name}.png`, fullPage: true });
} else if (mode.startsWith("menu")) {
  const label = mode.split(":")[1] ?? "Services";
  await page.getByRole("button", { name: label }).first().hover();
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${out}${name}.png` });
} else if (mode.startsWith("el:")) {
  // el:<selector>[,<selector>...] — scroll each into view, then shoot the element
  const sels = mode.slice(3).split(",");
  for (const [i, sel] of sels.entries()) {
    const el = page.locator(sel).first();
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(900);
    await el.screenshot({ path: `${out}${name}${sels.length > 1 ? "-" + i : ""}.png` });
  }
} else if (mode === "mobilemenu") {
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${out}${name}.png` });
} else {
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${out}${name}.png` });
}
console.log(errors.length ? `ERRORS:\n${errors.join("\n")}` : "no console errors");
await browser.close();

