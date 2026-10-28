// Why AptaCloud (light, tinted): the four guideline reasons (§3.4, in order)
// plus one page-specific reason, as rows on white cards; beside them a dark
// "proof of concept" card — the guidelines' POC story in three beats with the
// page's primary CTA. The POC card stays in view (sticky) while the reasons
// scroll on desktop; on phones it comes first, compact.

import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { POC_STEPS, WHY } from "@/data/services/shared";
import type { ServicePage } from "@/data/services/types";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";
import { RailHint } from "./RailHint";
import { SectionHead } from "./SectionHead";
import { toneProps, type Tone } from "./tone";
import sec from "./Section.module.css";
import s from "./WhyUs.module.css";

export function WhyUs({ why, cta, tone = "tint" }: { why: NonNullable<ServicePage["why"]>; cta: ServicePage["cta"]; tone?: Tone }) {
  const reasons = [...WHY, ...why.extra];
  return (
    <section id="why" {...toneProps(tone, "tint")}>
      <div className={sec.container}>
        <SectionHead tag="Why AptaCloud" icon={<Icon id="shield" />} heading={why.heading} lead={why.lead} />

        <div className={s.grid}>
          <Reveal y={30} duration={1} amount={0.2} className={s.pocCol}>
            <div className={s.poc}>
              <p className={s.pocEyebrow}>
                <span className={s.pocDot} aria-hidden="true" />
                Proof before commitment
              </p>
              <h3 className={s.pocTitle}>How the proof of concept works.</h3>
              <ol className={s.pocSteps}>
                {POC_STEPS.map((step, i) => (
                  <li key={step.title} className={s.pocStep}>
                    <span className={s.pocNum}>{i + 1}</span>
                    <div>
                      <p className={s.pocStepTitle}>{step.title}</p>
                      <p className={s.pocStepText}>{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <Button label={cta.label} shortLabel={cta.short} href="#contact" variant="primary" className={s.pocButton} />
            </div>
          </Reveal>

          <div id="why-rail" className={cn(s.reasons, reasons.length % 2 === 1 && s.odd, sec.rail)} role="list">
            {reasons.map((r, i) => (
              <Reveal key={r.title} role="listitem" y={24} duration={0.9} delay={i * 0.05} amount={0} className={s.reason}>
                <span className={s.reasonIcon}>
                  <Icon id={r.icon} />
                </span>
                <div className={s.reasonBody}>
                  <h3 className={s.reasonTitle}>{r.title}</h3>
                  <p className={s.reasonText}>{r.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <RailHint forId="why-rail" count={reasons.length} />
        </div>
      </div>
    </section>
  );
}
