// Panel + list services (the live Data Visualisation layout): each group is a
// wide card with a dark panel holding the group's name and pitch on one side
// and its services as a divided list on the other. Groups alternate sides.
// List rows slide in one by one; a row lifts its title to the accent on hover.

import { Reveal } from "@/components/ui/Reveal";
import type { Block } from "@/data/services/types";
import { cn } from "@/lib/utils";
import { Icon } from "../Icon";
import { SectionHead } from "../SectionHead";
import { toneProps, type Tone } from "../tone";
import sec from "../Section.module.css";
import s from "./Panels.module.css";

type PanelsBlock = Extract<Block, { kind: "panels" }>;

export function Panels({ block, tone }: { block: PanelsBlock; tone: Tone }) {
  return (
    <section id={block.id ?? "services"} {...toneProps(tone)}>
      <div className={sec.container}>
        <SectionHead variant={block.head ?? "center"} tag={block.tag} icon={<Icon id={block.icon ?? "layers"} />} heading={block.heading} lead={block.lead} />
        <div className={s.stack}>
          {block.groups.map((g, gi) => (
            <Reveal key={g.title} y={36} duration={1.1} className={cn(s.group, gi % 2 === 1 && s.flip)}>
              <div className={s.panel} data-theme="dark">
                <span className={s.panelNo}>{String(gi + 1).padStart(2, "0")}</span>
                <h3 className={s.panelTitle}>{g.title}</h3>
                <p className={s.panelText}>{g.text}</p>
              </div>
              <ul className={s.list}>
                {g.items.map((it, i) => (
                  <li key={it.title} className={s.row} style={{ ["--i" as string]: i }}>
                    <h4 className={s.rowTitle}>{it.title}</h4>
                    <p className={s.rowText}>{it.text}</p>
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
