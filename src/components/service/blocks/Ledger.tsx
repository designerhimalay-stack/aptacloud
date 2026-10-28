// Cost ledger (AWS Optimisation benefits): the benefits set out like an
// itemised bill — the area of spend, what we change, and the AWS tools that
// do it — under a statement header, with dashed rules between lines. Rows
// slide in one by one. Phones: each line stacks (area, change, tools).

import { Reveal } from "@/components/ui/Reveal";
import type { Block } from "@/data/services/types";
import { TECH } from "@/data/tech";
import { Icon } from "../Icon";
import { SectionHead } from "../SectionHead";
import { TechMark } from "../TechMark";
import { toneProps, type Tone } from "../tone";
import sec from "../Section.module.css";
import s from "./Ledger.module.css";

type LedgerBlock = Extract<Block, { kind: "ledger" }>;

export function Ledger({ block, tone }: { block: LedgerBlock; tone: Tone }) {
  return (
    <section id={block.id ?? "benefits"} {...toneProps(tone)}>
      <div className={sec.container}>
        <SectionHead variant={block.head ?? "split"} tag={block.tag} icon={<Icon id={block.icon ?? "gauge"} />} heading={block.heading} lead={block.lead} />

        <Reveal y={32} duration={1.1}>
          <div className={s.sheet}>
            <div className={s.top}>
              <p className={s.title}>{block.title}</p>
              <span className={s.count}>
                {block.rows.length} {block.unit ?? "lines"}
              </span>
            </div>
            <div className={s.cols} aria-hidden="true">
              {(block.cols ?? ["Area", "What we change", "Tools"]).map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
            <div className={s.rows}>
              {block.rows.map((r, i) => (
                <Reveal key={r.area} y={14} duration={0.8} delay={i * 0.05} className={s.row}>
                  <p className={s.area}>{r.area}</p>
                  <div className={s.change}>
                    <h3 className={s.changeTitle}>{r.title}</h3>
                    <p className={s.changeText}>{r.text}</p>
                  </div>
                  <ul className={s.tools}>
                    {r.marks?.map((m) => (
                      <li key={m} className={s.tool}>
                        <TechMark id={m} />
                        {TECH[m].name}
                      </li>
                    ))}
                    {/* Platforms without a mark (non-Microsoft systems) as plain names. */}
                    {r.names?.map((n) => (
                      <li key={n} className={s.tool}>
                        {n}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
            {block.note && <p className={s.note}>{block.note}</p>}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
