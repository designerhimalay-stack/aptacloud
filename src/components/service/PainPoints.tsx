// Pain points (light, tinted) as a bento: the first problem is the feature —
// a tall dark card with a large accent quote — and the rest sit beside it as
// compact white tiles (2 × 2 for five items, 2 + 1 for four). Each tile reads
// "what they say" (H3) → "what it costs" (accent label). Hover: the tile's quote
// mark warms and an accent rule draws along its top edge. Phones: a swipe rail.

import { Reveal } from "@/components/ui/Reveal";
import type { ServicePage } from "@/data/services/types";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";
import { RailHint } from "./RailHint";
import { SectionHead } from "./SectionHead";
import { toneProps, type Tone } from "./tone";
import sec from "./Section.module.css";
import s from "./PainPoints.module.css";

export function PainPoints({ pains, tone = "tint" }: { pains: ServicePage["pains"]; tone?: Tone }) {
  const [lead, ...rest] = pains.items;
  const n = pains.items.length;
  return (
    <section id="challenges" {...toneProps(tone, "tint")}>
      <div className={sec.container}>
        <SectionHead tag="The challenge" icon={<Icon id="target" />} heading={pains.heading} lead={pains.lead} />

        <div id="challenges-rail" className={cn(s.bento, rest.length === 3 && s.bentoFour, sec.rail)}>
          <Reveal y={30} duration={1} amount={0} className={cn(s.cell, s.featureCell)}>
            <article className={cn(s.tile, s.feature)}>
            <span className={s.bigQuote} aria-hidden="true">
              “
            </span>
            <div className={s.body}>
              <p className={s.eyebrow}>What we hear most</p>
              <h3 className={s.featureTitle}>{lead.title}</h3>
              <p className={s.cost}>
                <span className={s.costLabel}>What it costs</span>
                {lead.text}
              </p>
            </div>
            </article>
          </Reveal>

          {rest.map((p, i) => (
            <Reveal key={p.title} y={30} duration={1} delay={0.06 * (i + 1)} amount={0} className={s.cell}>
              <article className={s.tile}>
              <span className={s.quote} aria-hidden="true">
                “
              </span>
              <div className={s.body}>
                <h3 className={s.title}>{p.title}</h3>
                <p className={s.cost}>
                  <span className={s.costLabel}>What it costs</span>
                  {p.text}
                </p>
              </div>
              </article>
            </Reveal>
          ))}
        </div>
        <RailHint forId="challenges-rail" count={n} />
      </div>
    </section>
  );
}
