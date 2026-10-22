// FAQ (light): two columns. Left (sticky on desktop): pill, heading, lead and a
// dark "ask a specialist" card. Right: the questions as an accordion with a
// plus that turns into an accent minus. Buyer-phrased questions (6+, including
// cost and timing); FAQPage schema is emitted by the page from the same data.

import { useId, useState } from "react";
import { BRAND } from "@/brand/brand";
import { PillTag } from "@/components/ui/PillTag";
import { Reveal } from "@/components/ui/Reveal";
import { FillHeading } from "@/components/site/dynamics/FillHeading";
import type { ServicePage } from "@/data/services/types";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";
import { toneProps, type Tone } from "./tone";
import sec from "./Section.module.css";
import s from "./Faq.module.css";

export function Faq({ faqs, name, tone = "tint" }: { faqs: ServicePage["faqs"]; name: string; tone?: Tone }) {
  const uid = useId();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" {...toneProps(tone, "light")}>
      <div className={cn(sec.container, s.layout)}>
        <div className={s.side}>
          <Reveal y={30} duration={1} amount={0.3}>
            <PillTag icon={<Icon id="chat" />}>FAQs</PillTag>
          </Reveal>
          <FillHeading text={`${name}: your questions, answered.`} className={cn(sec.heading, s.heading)} wordClassName={sec.word} />
          <Reveal y={30} duration={1} delay={0.1} amount={0.3}>
            <p className={sec.lead}>Straight answers on cost, timing, data, and how we work with your team.</p>
          </Reveal>

          <Reveal y={30} duration={1} delay={0.15} amount={0.3} className={s.ask}>
            <span className={s.askIcon}>
              <Icon id="chat" />
            </span>
            <p className={s.askTitle}>Still have a question?</p>
            <p className={s.askText}>Ask a specialist directly by email, or send the form below with your details.</p>
            <div className={s.askLinks}>
              <a className={s.askLink} href={`mailto:${BRAND.contact.email}`}>
                {BRAND.contact.email}
              </a>
              <a className={s.askJump} href="#contact">
                Go to the form
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal y={30} duration={1} delay={0.05} amount={0.05} className={s.list}>
          {faqs.map((f, i) => {
            const isOpen = open === i;
            const id = `${uid}-faq-${i}`;
            return (
              <div key={f.q} className={cn(s.item, isOpen && s.open)}>
                <h3 className={s.qWrap}>
                  <button
                    type="button"
                    className={s.q}
                    aria-expanded={isOpen}
                    aria-controls={id}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span>{f.q}</span>
                    <span className={s.icon} aria-hidden="true" />
                  </button>
                </h3>
                <div id={id} className={s.a} role="region" aria-label={f.q}>
                  <div className={s.aInner}>
                    <p>{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
