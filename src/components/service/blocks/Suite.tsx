// App suite (live "Why Microsoft 365?"): the apps grouped by what they do.
// Each group is a card sized to its number of apps (a bento that packs
// itself): the category label on top, then the app icons in white plates with
// their names. Icons pop in group by group and lift on hover.

import { asset } from "@/brand/brand";
import { Reveal } from "@/components/ui/Reveal";
import type { Block } from "@/data/services/types";
import { cn } from "@/lib/utils";
import { Icon } from "../Icon";
import { RailHint } from "../RailHint";
import { SectionHead } from "../SectionHead";
import { toneProps, type Tone } from "../tone";
import sec from "../Section.module.css";
import s from "./Suite.module.css";

type SuiteBlock = Extract<Block, { kind: "suite" }>;

export function Suite({ block, tone }: { block: SuiteBlock; tone: Tone }) {
  return (
    <section id={block.id ?? "suite"} {...toneProps(tone)}>
      <div className={sec.container}>
        <SectionHead variant={block.head ?? "center"} tag={block.tag} icon={<Icon id={block.icon ?? "layers"} />} heading={block.heading} lead={block.lead} />
        <div id={`${block.id ?? "suite"}-rail`} className={cn(s.bento, sec.rail)}>
          {block.groups.map((g, gi) => (
            <Reveal key={g.label} y={24} duration={0.9} delay={(gi % 4) * 0.06} className={s.group} style={{ ["--apps" as string]: g.apps.length }}>
              <p className={s.label}>{g.label}</p>
              <ul className={s.apps}>
                {g.apps.map((a) => (
                  <li key={a.name} className={s.app}>
                    <span className={s.plate}>
                      <img src={asset(a.icon)} alt="" loading="lazy" decoding="async" className={s.icon} />
                    </span>
                    <span className={s.name}>{a.name}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
        <RailHint forId={`${block.id ?? "suite"}-rail`} count={block.groups.length} />
      </div>
    </section>
  );
}
