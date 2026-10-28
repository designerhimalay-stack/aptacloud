// Cuts a tall screenshot into slices: node slice.mjs <in.png> <sliceHeight> [scale=0.5]
import { chromium } from "playwright-core";
import { readFileSync, writeFileSync } from "node:fs";
const [inp, hs = "2600", sc = "0.5"] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const p = await b.newPage();
const parts = await p.evaluate(async ({ uri, H, S }) => {
  const img = new Image();
  img.src = uri;
  await img.decode();
  const out = [];
  for (let y = 0; y < img.naturalHeight; y += H) {
    const h = Math.min(H, img.naturalHeight - y);
    const c = document.createElement("canvas");
    c.width = img.naturalWidth * S;
    c.height = h * S;
    c.getContext("2d").drawImage(img, 0, y, img.naturalWidth, h, 0, 0, c.width, c.height);
    out.push(c.toDataURL("image/jpeg", 0.82));
  }
  return out;
}, { uri: `data:image/png;base64,${readFileSync(inp).toString("base64")}`, H: Number(hs), S: Number(sc) });
parts.forEach((d, i) => writeFileSync(inp.replace(/\.png$/, `-${i}.jpg`), Buffer.from(d.split(",")[1], "base64")));
console.log(parts.length, "slices");
await b.close();
