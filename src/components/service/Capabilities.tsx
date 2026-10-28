// Services: one card per service in the home Azure cards' language — icon tile
// (fills with the accent on hover) beside the tools' marks, title, what it does,
// the outcome row, and the tools. Cards fan out of a stack as the grid scrolls
// in (<SpreadGrid>, as on the home page) and lift on hover. Grid: 3 columns for
// six, 3 + 2 for five, 2 × 2 for four; phones get a swipe rail. AI pages add the
// model strip underneath.

import { SpreadGrid } from "@/components/ui/SpreadGrid";
import type { ServicePage } from "@/data/services/types";
import { TECH } from "@/data/tech";
import { cn } from "@/lib/utils";
import { AiModels } from "./AiModels";
import { Icon } from "./Icon";
import { RailHint } from "./RailHint";
import { SectionHead } from "./SectionHead";
import { TechMark } from "./TechMark";
import { toneProps, type Tone } from "./tone";
import sec from "./Section.module.css";
import s from "./Capabilities.module.css";

/** Only real logos sit in the card's top-right tiles (no letter monograms). */
const hasMark = (id: keyof typeof TECH) => {
  const t: { name: string; color?: string; mono?: string } = TECH[id];
  return Boolean(t.color || t.mono);
};

/** Tools with a real logo, one per distinct logo (e.g. Dynamics 365 + Business Central share one). */
const uniqueMarks = (ids: (keyof typeof TECH)[]) => {
  const seen = new Set<string>();
  return ids.filter((id) => {
    const t: { name: string; color?: string; mono?: string } = TECH[id];
    const src = t.color ?? t.mono;
    if (!hasMark(id) || !src || seen.has(src)) return false;
    seen.add(src);
    return true;
  });
};

export function Capabilities({ services, models = false, tone = "dark" }: { services: NonNullable<ServicePage["services"]>; models?: boolean; tone?: Tone }) {
  const n = services.items.length;
  const cols = n === 4 ? s.c2 : n === 5 ? s.c5 : s.c3;

  return (
    <section id="services" {...toneProps(tone)}>
      <div className={sec.container}>
        <SectionHead tag="What we do" icon={<Icon id="layers" />} heading={services.heading} lead={services.lead} />

        <SpreadGrid
          id="services-rail"
          className={cn(s.grid, cols, sec.rail)}
          itemClassName={s.cell}
          items={services.items.map((item) => (
            <article key={item.title} className={s.card}>
              <div className={s.top}>
                <span className={s.iconTile}>
                  <Icon id={item.icon} />
                </span>
                <span className={s.marks} aria-hidden="true">
                  {uniqueMarks(item.tools).slice(0, 3).map((t) => (
                    <span key={t} className={s.markTile} title={TECH[t].name}>
                      <TechMark id={t} />
                    </span>
                  ))}
                </span>
              </div>

              <div className={s.main}>
                <h3 className={s.title}>{item.title}</h3>
                <p className={s.text}>{item.text}</p>
              </div>

              <div className={s.outcome}>
                <span className={s.outcomeLabel}>Outcome</span>
                <p>{item.outcome}</p>
              </div>

              <p className={s.tools}>
                <span className={s.toolsLabel}>Tools</span>
                {item.tools.map((t) => TECH[t].name).join(", ")}
              </p>
            </article>
          ))}
        />
        <RailHint forId="services-rail" count={n} />

        {models && <AiModels />}
      </div>
    </section>
  );
}
