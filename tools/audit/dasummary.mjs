// Summarise designaudit JSON: node dasummary.mjs <file.json>
import { readFileSync } from "node:fs";
const data = JSON.parse(readFileSync(process.argv[2], "utf8"));
const tally = (rows, key, ex) => {
  const m = new Map();
  for (const r of rows) {
    const k = key(r);
    if (!m.has(k)) m.set(k, { n: 0, ex: new Set() });
    const e = m.get(k);
    e.n++;
    if (e.ex.size < 3) e.ex.add(ex(r));
  }
  return [...m].sort((a, b) => b[1].n - a[1].n).map(([k, v]) => `   ${String(v.n).padStart(4)}  ${k}   e.g. ${[...v.ex].join(" | ")}`).join("\n");
};
const flat = (f) => data.flatMap((p) => (p[f] || []).map((r) => ({ ...r, slug: p.slug })));
console.log("ERRORS:", data.filter((p) => p.error).map((p) => p.slug + " " + p.error).join("\n") || "none");
for (const tag of ["H1", "H2", "H3"]) {
  console.log(`\n== ${tag} (size/weight/letter-spacing/line-height)`);
  console.log(tally(flat("headings").filter((h) => h.tag === tag), (h) => `${h.size}px w${h.weight} ls${h.ls} lh${h.lh}`, (h) => `${h.slug} ${h.where} "${h.text.slice(0, 30)}"`));
}
console.log("\n== H2 ending punctuation");
console.log(tally(flat("headings").filter((h) => h.tag === "H2"), (h) => (h.endsDot ? "ends with . ? !" : "NO end punctuation"), (h) => `${h.slug} "${h.text.slice(0, 40)}"`));
console.log("\n== Section padding (top/bottom)");
console.log(tally(flat("sections"), (s) => `${s.pt}/${s.pb}`, (s) => `${s.slug}#${s.id}`));
console.log("\n== Container left edge / width");
console.log(tally(flat("containers"), (c) => `left ${c.left} w ${c.width}`, (c) => `${c.slug}#${c.id}`));
console.log("\n== Cards (class radius pad)");
console.log(tally(flat("cards"), (c) => `${c.cls} r${c.radius} p${c.pad}`, (c) => `${c.slug} ${c.where}`));
console.log("\n== Buttons (height font radius padX)");
console.log(tally(flat("buttons"), (b) => `h${b.h} fs${b.fs} r${b.radius} px${b.pad}`, (b) => `${b.slug} ${b.where} "${b.text.slice(0, 26)}"`));
console.log("\n== Pills (height font)");
console.log(tally(flat("pills"), (p) => `h${p.h} fs${p.fs}`, (p) => `${p.slug} ${p.where}`));
console.log("\n== Paragraphs (size/lh)");
console.log(tally(flat("paras"), (p) => `${p.size}px lh${p.lh}`, (p) => `${p.slug} ${p.where}`));
console.log("\n== Text issues");
console.log(tally(flat("text"), (t) => t.issue, (t) => `${t.slug} ${t.where} "${t.text.slice(0, 50)}"`));
console.log("\n== Image issues");
console.log(tally(flat("images"), (i) => i.issue.replace(/\d+px/g, "Npx"), (i) => `${i.slug} ${i.src}`));
