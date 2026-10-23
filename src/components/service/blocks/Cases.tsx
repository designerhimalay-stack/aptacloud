// Case studies (the live "Transformation stories"): one card per client, the
// result first as a large figure that counts up when the card enters view,
// then who it was for and what we did. Two columns; phones get a swipe rail.

import { animate, useInView } from "@/lib/motion";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import type { Block } from "@/data/services/types";
import { cn } from "@/lib/utils";
import { Icon } from "../Icon";
import { RailHint } from "../RailHint";
import { SectionHead } from "../SectionHead";
import { toneProps, type Tone } from "../tone";
import sec from "../Section.module.css";
import s from "./Cases.module.css";

type CasesBlock = Extract<Block, { kind: "cases" }>;

/** "33%" → counts 0 → 33 and keeps the suffix; anything else shows as written. */
function Metric({ value = "" }: { value?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const on = useInView(ref, { once: true, amount: 0.6 });
  const m = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  const target = m ? Number(m[2]) : 0;
  const [n, setN] = useState(target);
  useEffect(() => {
    if (!on || !m || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const c = animate(0, target, { duration: 1.4, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(v) });
    return () => c.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [on]);
  const decimals = m?.[2].includes(".") ? 1 : 0;
  return (
    <span ref={ref} className={s.metric} aria-label={value}>
      {m ? (
        <>
          {m[1]}
          {n.toFixed(decimals)}
          <span className={s.metricSuffix}>{m[3]}</span>
        </>
      ) : (
        value
      )}
    </span>
  );
}

/** wide: one full-width card per case — label, client, and story on the left;
 *  the headline figure and results on a white panel on the right (live layout).
 *  Phones: the cases sit on a swipe rail. */
function Wide({ block, tone }: { block: CasesBlock; tone: Tone }) {
  return (
    <section id={block.id ?? "case-studies"} {...toneProps(tone)}>
      <div className={sec.container}>
        <SectionHead variant={block.head ?? "split"} tag={block.tag} icon={<Icon id={block.icon ?? "chart"} />} heading={block.heading} lead={block.lead} />
        <div id={`${block.id ?? "case-studies"}-rail`} className={cn(s.wideList, sec.rail)}>
          {block.items.map((c, i) => (
            <Reveal key={c.client} y={32} duration={1} className={s.wide}>
              <div className={s.wideStory}>
                <div className={s.top}>
                  <span className={s.label}>Case study {String(i + 1).padStart(2, "0")}</span>
                  {c.place && (
                    <span className={s.place}>
                      <Icon id="target" />
                      {c.place}
                    </span>
                  )}
                </div>
                <h3 className={s.wideClient}>{c.client}</h3>
                {c.text && <p className={s.text}>{c.text}</p>}
              </div>
              <div className={s.wideResults}>
                {c.metric && (
                  <div className={s.result}>
                    <Metric value={c.metric} />
                    <p className={s.metricLabel}>{c.metricLabel}</p>
                  </div>
                )}
                {c.points && (
                  <ul className={s.points}>
                    {c.points.map((p) => (
                      <li key={p}>
                        <span className={s.tick} aria-hidden="true">
                          <svg viewBox="0 0 16 16" fill="none">
                            <path d="m3.5 8.25 3 3 6-6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </div>
        <RailHint forId={`${block.id ?? "case-studies"}-rail`} count={block.items.length} />
      </div>
    </section>
  );
}

export function Cases({ block, tone }: { block: CasesBlock; tone: Tone }) {
  const id = block.id ?? "case-studies";
  if (block.layout === "wide") return <Wide block={block} tone={tone} />;
  return (
    <section id={id} {...toneProps(tone)}>
      <div className={sec.container}>
        <SectionHead variant={block.head ?? "split"} tag={block.tag} icon={<Icon id={block.icon ?? "chart"} />} heading={block.heading} lead={block.lead} />
        <div id={`${id}-rail`} className={cn(s.grid, block.items.length === 3 && s.three, sec.rail)}>
          {block.items.map((c, i) => (
            <Reveal key={c.client} y={32} duration={1} delay={(i % 2) * 0.08} className={s.cell}>
              <article className={s.card}>
                <div className={s.top}>
                  <span className={s.label}>Case study {String(i + 1).padStart(2, "0")}</span>
                  {c.place && (
                    <span className={s.place}>
                      <Icon id="target" />
                      {c.place}
                    </span>
                  )}
                </div>
                {c.metric && (
                  <div className={s.result}>
                    <Metric value={c.metric} />
                    <p className={s.metricLabel}>{c.metricLabel}</p>
                  </div>
                )}
                <div className={cn(s.story, !c.metric && s.storyPlain)}>
                  <h3 className={s.client}>{c.client}</h3>
                  {c.text && <p className={s.text}>{c.text}</p>}
                  {c.points && (
                    <ul className={s.points}>
                      {c.points.map((p) => (
                        <li key={p}>
                          <span className={s.tick} aria-hidden="true">
                            <svg viewBox="0 0 16 16" fill="none">
                              <path d="m3.5 8.25 3 3 6-6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <RailHint forId={`${id}-rail`} count={block.items.length} />
      </div>
    </section>
  );
}
