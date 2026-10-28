// Renders the default share image (1200x630) and the Apple touch icon (180x180)
// from brand assets: node ogimage.mjs <publicDir>
import { chromium } from "playwright-core";
import { readFileSync } from "node:fs";
import { join } from "node:path";
const pub = process.argv[2];
const b64 = (f, mime) => `data:${mime};base64,${readFileSync(join(pub, f)).toString("base64")}`;
const logo = b64("images/aptacloud-logo-header.webp", "image/webp");
const fav = readFileSync(join(pub, "favicon.svg"), "utf8");
const font = b64("fonts/Inter-400.woff2", "font/woff2");
const font6 = b64("fonts/Inter-600.woff2", "font/woff2");
const b = await chromium.launch({ executablePath: process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
await p.setContent(`<style>
@font-face{font-family:Inter;src:url(${font}) format('woff2');font-weight:400}@font-face{font-family:Inter;src:url(${font6}) format('woff2');font-weight:600}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#0a0a0a;color:#fff;font-family:Inter,Arial,sans-serif;position:relative;overflow:hidden}
.glow{position:absolute;right:-180px;top:-220px;width:720px;height:720px;border-radius:50%;background:radial-gradient(circle,rgba(237,28,36,.35),transparent 65%)}
.grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);background-size:60px 60px;mask-image:linear-gradient(90deg,transparent,#000 60%)}
.wrap{position:absolute;inset:72px 80px;display:flex;flex-direction:column;justify-content:space-between}
.logo{height:64px;width:auto;align-self:flex-start}
h1{font-size:68px;font-weight:600;letter-spacing:-3.4px;line-height:1.05;max-width:900px}
h1 span{color:#ed1c24}
p{font-size:24px;color:rgba(255,255,255,.7);letter-spacing:-.5px;max-width:820px;line-height:1.35}
.foot{display:flex;gap:28px;font-size:20px;color:rgba(255,255,255,.55);letter-spacing:-.3px}
.foot b{color:#fff;font-weight:600}
</style>
<div class="grid"></div><div class="glow"></div>
<div class="wrap">
  <img class="logo" src="${logo}">
  <div>
    <h1>Modernise, connect, and put AI to work, <span>proven on your data.</span></h1>
  </div>
  <div class="foot"><span><b>Insurance</b></span><span><b>Oil &amp; Gas</b></span><span><b>Engineering &amp; Construction</b></span><span>Microsoft-first</span></div>
</div>`);
await p.waitForTimeout(300);
await p.screenshot({ path: join(pub, "og-image.jpg"), type: "jpeg", quality: 88 });
await p.setViewportSize({ width: 180, height: 180 });
await p.setContent(`<style>*{margin:0}body{width:180px;height:180px;background:#0a0a0a;display:flex;align-items:center;justify-content:center}svg{width:120px;height:120px}</style>${fav}`);
await p.screenshot({ path: join(pub, "apple-touch-icon.png") });
await b.close();
console.log("og-image.jpg + apple-touch-icon.png written");
