// Icon-card sections from the live pages:
//  • benefits — "what it gives you": a grid of cards (icon tile, title, text);
//    the icon tile fills with the accent on hover.
//  • useCases — wider cards with the icon beside the copy and a "Use case" label.
// Clean cards (var(--card)) in the home language; phones get a swipe rail.

import { Reveal } from "@/components/ui/Reveal";
import type { IconCard } from "@/data/services/types";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";
import { RailHint } from "./RailHint";
import { SectionHead } from "./SectionHead";
import { toneProps, type Tone } from "./tone";
import sec from "./Section.module.css";
import s from "./FeatureGrid.module.css";

export function FeatureGrid({
  id,
  variant,
  heading,
  lead,
  items,
  tone,
}: {
  id: "benefits" | "use-cases";
  variant: "benefits" | "useCases";
  heading: string;
  lead: string;
  items: IconCard[];
  tone: Tone;
}) {
  const n = items.length;
  const cols = variant === "useCases" ? (n === 3 ? s.c3 : s.c2) : n === 4 ? s.c4 : n === 5 ? s.c5 : s.c3;
  return (
    <section id={id} {...toneProps(tone, "tint")}>
      <div className={sec.container}>
        <SectionHead
          variant={variant === "useCases" ? "split" : "default"}
          tag={variant === "useCases" ? "Use cases" : "Benefits"}
          icon={<Icon id={variant === "useCases" ? "target" : "spark"} />}
          heading={heading}
          lead={lead}
        />
        <div id={`${id}-rail`} className={cn(s.grid, cols, sec.rail)}>
          {items.map((it, i) => (
            <Reveal key={it.title} y={24} duration={0.9} delay={i * 0.05} amount={0} className={s.cell}>
              <article className={cn(s.card, variant === "useCases" && s.wide)}>
                <span className={s.icon}>
                  <Icon id={it.icon} />
                </span>
                <div className={s.body}>
                  {variant === "useCases" && <p className={s.label}>Use case</p>}
                  <h3 className={s.title}>{it.title}</h3>
                  <p className={s.text}>{it.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <RailHint forId={`${id}-rail`} count={n} />
      </div>
    </section>
  );
}
