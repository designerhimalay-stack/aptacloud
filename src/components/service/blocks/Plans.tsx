// Plans (the live "Our pricing" table): one card per plan with its headline
// terms, one CTA under the cards, then every feature compared in a grouped table
// with a sticky plan header. Phones: a plan switcher above the cards' rail,
// and the comparison shows one plan's column at a time.

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import type { Block } from "@/data/services/types";
import { cn } from "@/lib/utils";
import { Icon } from "../Icon";
import { RailHint } from "../RailHint";
import { SectionHead } from "../SectionHead";
import { toneProps, type Tone } from "../tone";
import sec from "../Section.module.css";
import s from "./Plans.module.css";

type PlansBlock = Extract<Block, { kind: "plans" }>;

export function Plans({ block, cta, tone }: { block: PlansBlock; cta?: { label: string; short: string }; tone: Tone }) {
  const id = block.id ?? "pricing";
  const [plan, setPlan] = useState(0);

  return (
    <section id={id} {...toneProps(tone)}>
      <div className={sec.container}>
        <SectionHead variant={block.head ?? "center"} tag={block.tag} icon={<Icon id={block.icon ?? "gauge"} />} heading={block.heading} lead={block.lead} />

        <div id={`${id}-rail`} className={cn(s.cards, sec.rail)}>
          {block.plans.map((p, i) => (
            <Reveal key={p.name} y={28} duration={0.9} delay={i * 0.08} className={s.cell}>
              <article className={s.card}>
                <div className={s.top}>
                  <h3 className={s.name}>{p.name}</h3>
                  <p className={s.summary}>{p.summary}</p>
                </div>
                <dl className={s.facts}>
                  {p.facts.map((f) => (
                    <div key={f.label} className={s.fact}>
                      <dt>{f.label}</dt>
                      <dd>{f.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className={s.foot}>
                  <p className={s.price}>{block.price}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <RailHint forId={`${id}-rail`} count={block.plans.length} />
        {/* One action for all three plans (a button per card repeated the same label). */}
        {cta && (
          <Reveal y={20} duration={0.9} className={s.action}>
            <Button label={cta.label} shortLabel={cta.short} href="#contact" />
          </Reveal>
        )}

        <Reveal y={24} duration={1}>
          <div className={s.compare}>
            <div className={s.compareHead}>
              <h3 className={s.compareTitle}>Compare every feature</h3>
              <div className={s.switch} role="tablist" aria-label="Plan">
                {block.plans.map((p, i) => (
                  <button key={p.name} type="button" role="tab" aria-selected={plan === i} className={cn(s.switchBtn, plan === i && s.switchOn)} onClick={() => setPlan(i)}>
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
            <table className={s.table} data-plan={plan}>
              <thead>
                <tr>
                  <th scope="col">
                    <span className="sr-only">Feature</span>
                  </th>
                  {block.plans.map((p) => (
                    <th key={p.name} scope="col">
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              {block.groups.map((g) => (
                <tbody key={g.label}>
                  <tr className={s.groupRow}>
                    <th scope="colgroup" colSpan={block.plans.length + 1}>
                      {g.label}
                    </th>
                  </tr>
                  {g.rows.map((r) => (
                    <tr key={r.label}>
                      <th scope="row">{r.label}</th>
                      {r.values.map((v, i) => (
                        <td key={i}>{v}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
            {block.note && <p className={s.note}>{block.note}</p>}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
