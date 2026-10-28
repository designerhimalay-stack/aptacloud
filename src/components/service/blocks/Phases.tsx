// Migration phases (AWS Migration services): the services grouped by phase
// on a connected stepper. Choosing a phase fills the line up to it and opens
// its panel (the phase's purpose beside its services, each with its AWS
// icon). Every panel is in the page; the closed ones are hidden. The line runs
// from the first node's centre to the last (equal columns, offsets of half a
// column), so it never overshoots. Phones: the services as a swipe rail, each
// tagged with its phase.

import { useState, type KeyboardEvent } from "react";
import { Reveal } from "@/components/ui/Reveal";
import type { Block } from "@/data/services/types";
import { cn } from "@/lib/utils";
import { Icon } from "../Icon";
import { RailHint } from "../RailHint";
import { SectionHead } from "../SectionHead";
import { TechMark } from "../TechMark";
import { toneProps, type Tone } from "../tone";
import sec from "../Section.module.css";
import s from "./Phases.module.css";

type PhasesBlock = Extract<Block, { kind: "phases" }>;
type Service = PhasesBlock["phases"][number]["items"][number];

const Svc = ({ it, kicker }: { it: Service; kicker?: string }) => (
  <article className={s.svc}>
    <span className={cn(s.svcMark, !it.mark && s.svcIcon)}>{it.mark ? <TechMark id={it.mark} /> : <Icon id={it.icon ?? "flow"} />}</span>
    {kicker && <p className={s.kicker}>{kicker}</p>}
    <h4 className={s.svcTitle}>{it.title}</h4>
    <p className={s.svcText}>{it.text}</p>
  </article>
);

export function Phases({ block, tone }: { block: PhasesBlock; tone: Tone }) {
  const id = block.id ?? "services";
  const n = block.phases.length;
  const [active, setActive] = useState(0);

  const onKey = (e: KeyboardEvent) => {
    const next = e.key === "ArrowRight" ? (active + 1) % n : e.key === "ArrowLeft" ? (active - 1 + n) % n : -1;
    if (next < 0) return;
    e.preventDefault();
    setActive(next);
    document.getElementById(`${id}-phase-${next}`)?.focus();
  };

  return (
    <section id={id} {...toneProps(tone)}>
      <div className={sec.container}>
        <SectionHead variant={block.head ?? "center"} tag={block.tag} icon={<Icon id={block.icon ?? "migrate"} />} heading={block.heading} lead={block.lead} />

        <Reveal y={32} duration={1.1} className={s.desk}>
          <div className={s.stepper} style={{ ["--n" as string]: n }} role="tablist" aria-label={block.tag} onKeyDown={onKey}>
            <span className={s.line} aria-hidden="true">
              <span className={s.fill} style={{ transform: `scaleX(${n > 1 ? active / (n - 1) : 1})` }} />
            </span>
            {block.phases.map((p, i) => (
              <button
                key={p.label}
                id={`${id}-phase-${i}`}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-controls={`${id}-panel-${i}`}
                tabIndex={i === active ? 0 : -1}
                className={cn(s.step, i <= active && s.reached, i === active && s.on)}
                onClick={() => setActive(i)}
              >
                <span className={s.node}>{i + 1}</span>
                <span className={s.label}>{p.label}</span>
              </button>
            ))}
          </div>

          {block.phases.map((p, i) => (
            <div key={p.label} id={`${id}-panel-${i}`} role="tabpanel" aria-labelledby={`${id}-phase-${i}`} hidden={i !== active} className={s.panel}>
              <div className={s.intro}>
                <span className={s.introNo}>
                  Phase {i + 1} of {n}
                </span>
                <h3 className={s.introTitle}>{p.label}</h3>
                <p className={s.introText}>{p.text}</p>
              </div>
              <div className={s.svcs} style={{ ["--k" as string]: p.items.length }}>
                {p.items.map((it) => (
                  <Svc key={it.title} it={it} />
                ))}
              </div>
            </div>
          ))}
        </Reveal>

        {/* Phones: every service on one rail, tagged with its phase. */}
        <div id={`${id}-phases-rail`} className={cn(s.mobile, sec.rail)}>
          {block.phases.flatMap((p, i) => p.items.map((it) => <Svc key={it.title} it={it} kicker={`Phase ${i + 1}: ${p.label}`} />))}
        </div>
        <RailHint forId={`${id}-phases-rail`} count={block.phases.reduce((a, p) => a + p.items.length, 0)} />
      </div>
    </section>
  );
}
