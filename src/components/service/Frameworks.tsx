// Modernisation frameworks (live App Modernisation page): the six approaches as
// a scale from least to most change. A neutral track with "Less change" /
// "More change" ends sits above six cards; each card shows its place on the
// scale as a row of dots (filled up to its position). Phones: swipe rail.

import { Reveal } from "@/components/ui/Reveal";
import type { ServiceExtras } from "@/data/services/types";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";
import { RailHint } from "./RailHint";
import { SectionHead } from "./SectionHead";
import { toneProps, type Tone } from "./tone";
import sec from "./Section.module.css";
import s from "./Frameworks.module.css";

export function Frameworks({ data, tone }: { data: NonNullable<ServiceExtras["frameworks"]>; tone: Tone }) {
  const n = data.items.length;
  return (
    <section id="frameworks" {...toneProps(tone, "tint")}>
      <div className={sec.container}>
        <SectionHead tag="Approaches" icon={<Icon id="layers" />} heading={data.heading} lead={data.lead} />

        <div className={s.scale} aria-hidden="true">
          <span>Less change</span>
          <span className={s.track} />
          <span>More change</span>
        </div>

        <div id="frameworks-rail" className={cn(s.grid, sec.rail)}>
          {data.items.map((f, i) => (
            <Reveal key={f.title} y={24} duration={0.9} delay={i * 0.05} amount={0} className={s.cell}>
              <article className={s.card}>
                <span className={s.dots} aria-label={`Level ${i + 1} of ${n}`}>
                  {Array.from({ length: n }, (_, d) => (
                    <i key={d} className={cn(s.dot, d <= i && s.on)} />
                  ))}
                </span>
                <h3 className={s.title}>{f.title}</h3>
                <p className={s.text}>{f.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <RailHint forId="frameworks-rail" count={n} />
      </div>
    </section>
  );
}
