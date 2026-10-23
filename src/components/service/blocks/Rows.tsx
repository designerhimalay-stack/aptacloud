// Alternating feature rows (the live Generative AI use-case blocks): each row
// is one card holding a human photo and the copy (index, title, intro, ticked
// points, a closing line). Photos alternate sides down the page. Phones get a
// swipe rail, photo on top.

import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import type { Block } from "@/data/services/types";
import { cn } from "@/lib/utils";
import { Icon } from "../Icon";
import { RailHint } from "../RailHint";
import { SectionHead } from "../SectionHead";
import { toneProps, type Tone } from "../tone";
import sec from "../Section.module.css";
import s from "./Rows.module.css";

type RowsBlock = Extract<Block, { kind: "rows" }>;

export function Rows({ block, tone }: { block: RowsBlock; tone: Tone }) {
  const id = block.id ?? "use-cases";
  return (
    <section id={id} {...toneProps(tone)}>
      <div className={sec.container}>
        <SectionHead variant={block.head ?? "split"} tag={block.tag} icon={<Icon id={block.icon ?? "target"} />} heading={block.heading} lead={block.lead} />
        <div id={`${id}-rail`} className={cn(s.rows, sec.rail)}>
          {block.items.map((row, i) => (
            <Reveal key={row.title} y={40} duration={1.1} className={cn(s.row, i % 2 === 1 && s.flip, "photo-host")}>
              <div className={s.media}>
                <Photo src={row.photo.src} alt={row.photo.alt} position={row.photo.position} tone="color" sizes="(min-width: 810px) 540px, 84vw" className={s.photo} />
              </div>
              <div className={s.copy}>
                <span className={s.index}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={s.title}>{row.title}</h3>
                <p className={s.intro}>{row.intro}</p>
                <ul className={s.points}>
                  {row.bullets.map((p) => (
                    <li key={p}>
                      <span className={s.tick} aria-hidden="true">
                        <svg viewBox="0 0 16 16" fill="none">
                          <path d="m3.5 8.25 3 3 6-6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
                {row.note && <p className={s.note}>{row.note}</p>}
              </div>
            </Reveal>
          ))}
        </div>
        <RailHint forId={`${id}-rail`} count={block.items.length} />
      </div>
    </section>
  );
}
