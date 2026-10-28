// Core-service deep dive (the live industry pages' two featured services):
// two large cards side by side — the service's mark, name, what it does for
// this industry, four ticked outcomes, and a link to the service's own page.
// The first card sits on the dark surface, the second on the section's card
// colour, so the pair reads as one featured unit. Phones: stacked.

import { Reveal } from "@/components/ui/Reveal";
import { serviceHref } from "@/data/services";
import type { Block } from "@/data/services/types";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Icon } from "../Icon";
import { SectionHead } from "../SectionHead";
import { TechMark } from "../TechMark";
import { toneProps, type Tone } from "../tone";
import sec from "../Section.module.css";
import s from "./Focus.module.css";

type FocusBlock = Extract<Block, { kind: "focus" }>;

const Tick = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="m3.5 8.25 3 3 6-6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function Focus({ block, tone }: { block: FocusBlock; tone: Tone }) {
  return (
    <section id={block.id ?? "deep-dive"} {...toneProps(tone)}>
      <div className={sec.container}>
        <SectionHead variant={block.head ?? "center"} tag={block.tag} icon={<Icon id={block.icon ?? "target"} />} heading={block.heading} lead={block.lead} />
        <div className={s.pair}>
          {block.items.map((it, i) => (
            <Reveal key={it.title} y={32} duration={1} delay={i * 0.08} className={s.cell}>
              <article className={cn(s.card, i === 0 && s.dark)} data-theme={i === 0 ? "dark" : undefined}>
                <div className={s.top}>
                  <span className={cn(s.mark, it.mark && s.markLogo)}>{it.mark ? <TechMark id={it.mark} /> : <Icon id={it.icon} />}</span>
                  <span className={s.kicker}>Core service</span>
                </div>
                <h3 className={s.title}>{it.title}</h3>
                <p className={s.text}>{it.text}</p>
                <ul className={s.points}>
                  {it.points.map((p) => (
                    <li key={p}>
                      <span className={s.tick}>
                        <Tick />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
                {it.href && (
                  <a href={serviceHref(it.href)} className={s.link}>
                    Explore {it.title}
                    <ArrowUpRight />
                  </a>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
