// Testimonials (the live "Words from our clients"): quote cards with an accent
// quote mark, the words, and who said it (role, company, city) beside a
// monogram. The first card is set larger as the lead quote; phones get a rail.

import { useEffect, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { useReducedMotion } from "@/lib/motion";
import type { Block } from "@/data/services/types";
import { cn } from "@/lib/utils";
import { Icon } from "../Icon";
import { RailHint } from "../RailHint";
import { SectionHead } from "../SectionHead";
import { toneProps, type Tone } from "../tone";
import sec from "../Section.module.css";
import s from "./Quotes.module.css";

type QuotesBlock = Extract<Block, { kind: "quotes" }>;

const initials = (t: string) =>
  t
    .split(/\s+/)
    .filter((w) => /^[A-Z]/.test(w))
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

/** slider: one large quote at a time (the live carousel). Auto-advances every
 *  7s, pauses on hover/focus; arrows and dots to move; the quote cross-fades. */
function Slider({ block, tone }: { block: QuotesBlock; tone: Tone }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const n = block.items.length;
  const q = block.items[i];
  useEffect(() => {
    if (paused || reduce) return;
    const t = setTimeout(() => setI((v) => (v + 1) % n), 7000);
    return () => clearTimeout(t);
  }, [i, paused, reduce, n]);
  const go = (d: number) => setI((v) => (v + d + n) % n);

  return (
    <section id={block.id ?? "testimonials"} {...toneProps(tone)}>
      <div className={sec.container}>
        <SectionHead variant={block.head ?? "split"} tag={block.tag} icon={<Icon id={block.icon ?? "chat"} />} heading={block.heading} lead={block.lead} />
        <Reveal y={32} duration={1}>
          <div
            className={s.slide}
            onPointerEnter={() => setPaused(true)}
            onPointerLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            aria-roledescription="carousel"
          >
            <svg className={s.slideMark} viewBox="0 0 32 24" fill="currentColor" aria-hidden="true">
              <path d="M0 24V14.4C0 6.6 4.2 1.8 12.6 0l1.5 3.3C9.6 4.6 7.4 7.3 7.1 11.1H13V24H0Zm19 0V14.4C19 6.6 23.2 1.8 31.6 0l1.4 3.3c-4.5 1.3-6.7 4-7 7.8H32V24H19Z" />
            </svg>
            <figure key={i} className={s.slideBody} aria-live="polite">
              <blockquote className={s.slideQuote}>{q.quote}</blockquote>
              <figcaption className={s.by}>
                <span className={s.avatar} aria-hidden="true">
                  {initials(q.company ?? q.role)}
                </span>
                <span className={s.who}>
                  <span className={s.role}>{q.role}</span>
                  <span className={s.company}>{q.company ? `${q.company}, ${q.place}` : q.place}</span>
                </span>
              </figcaption>
            </figure>
            <div className={s.controls}>
              <div className={s.dots}>
                {block.items.map((it, k) => (
                  <button key={it.quote} type="button" className={cn(s.dot, k === i && s.dotOn)} aria-label={`Show quote ${k + 1}`} aria-current={k === i} onClick={() => setI(k)} />
                ))}
              </div>
              <div className={s.arrows}>
                <button type="button" className={s.arrow} aria-label="Previous quote" onClick={() => go(-1)}>
                  <svg viewBox="0 0 16 16" fill="none"><path d="M10 3.5 5.5 8l4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                <button type="button" className={s.arrow} aria-label="Next quote" onClick={() => go(1)}>
                  <svg viewBox="0 0 16 16" fill="none"><path d="M6 3.5 10.5 8 6 12.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Quotes({ block, tone }: { block: QuotesBlock; tone: Tone }) {
  const id = block.id ?? "testimonials";
  if (block.layout === "slider") return <Slider block={block} tone={tone} />;
  return (
    <section id={id} {...toneProps(tone)}>
      <div className={sec.container}>
        <SectionHead variant={block.head} tag={block.tag} icon={<Icon id={block.icon ?? "chat"} />} heading={block.heading} lead={block.lead} />
        <div id={`${id}-rail`} className={cn(s.grid, sec.rail)}>
          {block.items.map((q, i) => (
            <Reveal key={q.quote} y={32} duration={1} delay={(i % 3) * 0.07} className={cn(s.cell, i === 0 && s.lead)}>
              <figure className={s.card}>
                <svg className={s.mark} viewBox="0 0 32 24" fill="currentColor" aria-hidden="true">
                  <path d="M0 24V14.4C0 6.6 4.2 1.8 12.6 0l1.5 3.3C9.6 4.6 7.4 7.3 7.1 11.1H13V24H0Zm19 0V14.4C19 6.6 23.2 1.8 31.6 0l1.4 3.3c-4.5 1.3-6.7 4-7 7.8H32V24H19Z" />
                </svg>
                <blockquote className={s.quote}>{q.quote}</blockquote>
                <figcaption className={s.by}>
                  <span className={s.avatar} aria-hidden="true">
                    {initials(q.company ?? q.role)}
                  </span>
                  <span className={s.who}>
                    <span className={s.role}>{q.role}</span>
                    <span className={s.company}>{q.company ? `${q.company}, ${q.place}` : q.place}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <RailHint forId={`${id}-rail`} count={block.items.length} />
      </div>
    </section>
  );
}
