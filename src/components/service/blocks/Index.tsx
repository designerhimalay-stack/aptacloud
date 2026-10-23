// Service index (live Microsoft 365 services): an editorial list. The head
// stays pinned on the left while the services run down the right as numbered
// rows: number, title, a line on what it is, then its specifics as small
// pills. Rows are divided by hairlines; on hover the number turns accent and
// the row eases right. Phones: the rows become cards on a swipe rail.

import { PillTag } from "@/components/ui/PillTag";
import { Reveal } from "@/components/ui/Reveal";
import { FillHeading } from "@/components/site/dynamics/FillHeading";
import type { Block } from "@/data/services/types";
import { cn } from "@/lib/utils";
import { Icon } from "../Icon";
import { RailHint } from "../RailHint";
import { toneProps, type Tone } from "../tone";
import sec from "../Section.module.css";
import s from "./Index.module.css";

type IndexBlock = Extract<Block, { kind: "index" }>;

export function Index({ block, tone }: { block: IndexBlock; tone: Tone }) {
  return (
    <section id={block.id ?? "services"} {...toneProps(tone)}>
      <div className={cn(sec.container, s.layout)}>
        <div className={s.head}>
          <Reveal y={30} duration={1}>
            <PillTag icon={<Icon id={block.icon ?? "layers"} />}>{block.tag}</PillTag>
          </Reveal>
          <FillHeading text={block.heading} className={sec.heading} wordClassName={sec.word} />
          {block.lead && (
            <Reveal y={24} duration={1} delay={0.05}>
              <p className={sec.lead}>{block.lead}</p>
            </Reveal>
          )}
          <p className={s.count}>
            <span>{String(block.items.length).padStart(2, "0")}</span> services
          </p>
        </div>
        <div id={`${block.id ?? "services"}-rail`} className={cn(s.list, sec.rail)}>
          {block.items.map((it, i) => (
            <Reveal key={it.title} y={20} duration={0.9} className={s.row}>
              <span className={s.no}>{String(i + 1).padStart(2, "0")}</span>
              <div className={s.body}>
                <h3 className={s.title}>{it.title}</h3>
                <p className={s.text}>{it.text}</p>
                <ul className={s.pills}>
                  {it.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <RailHint forId={`${block.id ?? "services"}-rail`} count={block.items.length} />
      </div>
    </section>
  );
}
