// Framework cards (AI agent frameworks): one card per tool — its logo, name
// and maker, the one-line pitch, what it does, and "best for" tags pinned to
// the foot. Cards rise in one after another; on hover the card lifts and the
// logo plate scales. Underneath, the rest of the toolkit as compact cards.
// Phones: a swipe rail.

import { Reveal } from "@/components/ui/Reveal";
import type { Block } from "@/data/services/types";
import { cn } from "@/lib/utils";
import { Icon } from "../Icon";
import { RailHint } from "../RailHint";
import { SectionHead } from "../SectionHead";
import { TechMark } from "../TechMark";
import { toneProps, type Tone } from "../tone";
import sec from "../Section.module.css";
import s from "./Showcase.module.css";

type ShowcaseBlock = Extract<Block, { kind: "showcase" }>;

export function Showcase({ block, tone }: { block: ShowcaseBlock; tone: Tone }) {
  const id = block.id ?? "frameworks";
  return (
    <section id={id} {...toneProps(tone)}>
      <div className={sec.container}>
        <SectionHead variant={block.head ?? "split"} tag={block.tag} icon={<Icon id={block.icon ?? "layers"} />} heading={block.heading} lead={block.lead} />

        <div id={`${id}-rail`} className={cn(s.grid, sec.rail)}>
          {block.items.map((it, i) => (
            <Reveal key={it.title} y={28} duration={0.95} delay={(i % 3) * 0.07} className={s.cell}>
              <article className={s.card}>
                <div className={s.top}>
                  <span className={s.logo}>
                    <TechMark id={it.mark} className={s.logoMark} />
                  </span>
                  <div>
                    <h3 className={s.name}>{it.title}</h3>
                    {it.maker && <p className={s.maker}>{it.maker}</p>}
                  </div>
                </div>
                <p className={s.kicker}>{it.kicker}</p>
                <p className={s.text}>{it.text}</p>
                <ul className={s.chips} aria-label="Best for">
                  {it.bestFor.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
        <RailHint forId={`${id}-rail`} count={block.items.length} />

        {block.more && (
          <div className={s.more}>
            <p className={s.moreHeading}>{block.more.heading}</p>
            <div className={s.moreGrid}>
              {block.more.items.map((it, i) => (
                <Reveal key={it.title} y={20} duration={0.8} delay={i * 0.05} className={s.mini}>
                  <p className={s.miniTitle}>{it.title}</p>
                  {it.text && <p className={s.miniText}>{it.text}</p>}
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
