// Readiness assessment (live Re-engineering page): what we review (seven areas,
// a two-column checklist card) beside what you get (deliverables + the page's
// primary CTA). Clean cards, no gradients.

import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import type { ServiceExtras, ServicePage } from "@/data/services/types";
import { Icon } from "./Icon";
import { SectionHead } from "./SectionHead";
import { toneProps, type Tone } from "./tone";
import sec from "./Section.module.css";
import s from "./Assessment.module.css";

export function Assessment({
  data,
  cta,
  tone,
}: {
  data: NonNullable<ServiceExtras["assessment"]>;
  /** Only when this is the page's mid-page call to action. */
  cta?: ServicePage["cta"];
  tone: Tone;
}) {
  return (
    <section id="assessment" {...toneProps(tone, "tint")}>
      <div className={sec.container}>
        <SectionHead tag="Readiness assessment" icon={<Icon id="search" />} heading={data.heading} lead={data.lead} />
        <div className={s.grid}>
          <Reveal y={24} duration={0.9} amount={0} className={s.card}>
            <p className={s.cardTitle}>What we review</p>
            <ul className={s.areas}>
              {data.areas.map((a) => (
                <li key={a} className={s.area}>
                  <span className={s.check} aria-hidden="true">
                    <svg viewBox="0 0 16 16" fill="none">
                      <path d="m3.5 8.25 3 3 6-6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal y={24} duration={0.9} delay={0.08} amount={0} className={s.card}>
            <p className={s.cardTitle}>What you get</p>
            <ul className={s.deliverables}>
              {data.deliverables.map((d) => (
                <li key={d} className={s.deliverable}>
                  <span className={s.docIcon}>
                    <Icon id="doc" />
                  </span>
                  {d}
                </li>
              ))}
            </ul>
            {cta && <Button label={cta.label} shortLabel={cta.short} href="#contact" variant="primary" className={s.button} />}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
