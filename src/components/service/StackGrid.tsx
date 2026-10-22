// Tools / tech stack: the page's stack sorted into up to three category cards —
// Microsoft platform, AI models, Engineering & data — side by side, each a clean
// list of logo rows (mark on a white tile, name, and any grouped family members).
// Lists never leave ragged gaps the way a fixed tile grid does, and the
// Microsoft-first story reads left to right. Phones: cards stack.

import { Reveal } from "@/components/ui/Reveal";
import { TECH, type TechId } from "@/data/tech";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";
import { SectionHead } from "./SectionHead";
import { TechMark } from "./TechMark";
import { toneProps, type Tone } from "./tone";
import type { IconId } from "@/data/services/types";
import sec from "./Section.module.css";
import s from "./StackGrid.module.css";

const AI_MODELS: TechId[] = ["openai", "claude", "gemini", "grok", "llama", "anthropic"];
const isMicrosoft = (id: TechId) => {
  const t: { name: string; color?: string } = TECH[id];
  return Boolean(t.color && t.color.startsWith("/images/microsoft/")) || /^(Microsoft|Power BI|SQL Server|Azure)/.test(t.name);
};

type Row = { id: TechId; name: string; also: string[] };

/** Products that share one mark (the Azure family) become one row. */
function rows(ids: TechId[]): Row[] {
  const out: Row[] = [];
  const bySrc = new Map<string, Row>();
  for (const id of ids) {
    const t: { name: string; color?: string; mono?: string } = TECH[id];
    const src = t.color ?? t.mono;
    const hit = src ? bySrc.get(src) : undefined;
    if (hit) {
      // the family itself ("Microsoft Azure") is the row title, not a member
      if (t.name !== "Microsoft Azure") hit.also.push(t.name.replace(/^(Microsoft |Azure )/, ""));
      continue;
    }
    const r: Row = { id, name: t.name, also: [] };
    out.push(r);
    if (src) bySrc.set(src, r);
  }
  for (const r of out)
    if (r.also.length && TECH[r.id].name.startsWith("Azure ")) {
      r.also.unshift(TECH[r.id].name.replace(/^Azure /, ""));
      r.name = "Microsoft Azure";
    }
  return out;
}

export function StackGrid({ stack, heading, lead, tone }: { stack: TechId[]; heading: string; lead: string; tone: Tone }) {
  const all: { title: string; icon: IconId; rows: Row[] }[] = [
    { title: "Microsoft platform", icon: "cloud", rows: rows(stack.filter((id) => isMicrosoft(id) && !AI_MODELS.includes(id))) },
    { title: "AI models", icon: "spark", rows: rows(stack.filter((id) => AI_MODELS.includes(id))) },
    { title: "Engineering and data", icon: "code", rows: rows(stack.filter((id) => !isMicrosoft(id) && !AI_MODELS.includes(id))) },
  ];
  const groups = all.filter((g) => g.rows.length > 0);

  return (
    <section id="stack" {...toneProps(tone, "light")}>
      <div className={sec.container}>
        <SectionHead tag="Tools" icon={<Icon id="cog" />} heading={heading} lead={lead} />
        <div className={cn(s.groups, groups.length === 2 && s.two, groups.length === 1 && s.one)}>
          {groups.map((g, i) => (
            <Reveal key={g.title} y={24} duration={0.9} delay={i * 0.08} amount={0} className={s.card}>
              <div className={s.cardHead}>
                <span className={s.headIcon}>
                  <Icon id={g.icon} />
                </span>
                <p className={s.cardTitle}>{g.title}</p>
              </div>
              <ul className={s.list}>
                {g.rows.map((r) => (
                  <li key={r.id} className={s.row}>
                    <span className={s.mark}>
                      <TechMark id={r.id} className={s.logo} />
                    </span>
                    <span className={s.text}>
                      <span className={s.name}>{r.name}</span>
                      {r.also.length > 0 && <span className={s.also}>{r.also.join(", ")}</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
