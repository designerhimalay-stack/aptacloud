// Process (light): the six named phases (Discover → Optimise) as a framed board
// of phase cards. As the section scrolls through the viewport, phases it has
// passed are marked done (accent
// node) and the phase it is on lifts as a dark card — so the page shows where a
// project would be, not just a list. Timeline badge under the centred heading
// (Guidelines §12). Tablet: 3 × 2. Phone: a compact vertical list with a rail.
// Reduced motion: every phase shows as done, no current card.

import { motion, useReducedMotion, useScroll, useTransform } from "@/lib/motion";
import { useEffect, useRef, useState } from "react";
import { PHASES } from "@/data/services/shared";
import type { ServicePage } from "@/data/services/types";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";
import { SectionHead } from "./SectionHead";
import { toneProps, type Tone } from "./tone";
import sec from "./Section.module.css";
import s from "./Process.module.css";

export function Process({ process, tone = "tint" }: { process: NonNullable<ServicePage["process"]>; tone?: Tone }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  // Runs while the board's top travels from 90% to 15% of the viewport, so the
  // phases advance as the reader moves through them rather than all at once.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.15"] });
  const clipY = useTransform(scrollYProgress, [0, 1], ["inset(0 0 100% 0)", "inset(0 0 0% 0)"]);
  // Index of the phase the scroll has reached (−1 = not started).
  const [reached, setReached] = useState(-1);

  useEffect(() => {
    if (reduce) return;
    const update = (v: number) => setReached(v <= 0.001 ? -1 : Math.min(PHASES.length - 1, Math.floor(v * PHASES.length)));
    update(scrollYProgress.get());
    return scrollYProgress.on("change", update);
  }, [scrollYProgress, reduce]);

  const done = (i: number) => (reduce ? true : i < reached || (reached === PHASES.length - 1 && i === reached));
  const current = (i: number) => !reduce && i === reached && reached < PHASES.length - 1;

  return (
    <section id="process" {...toneProps(tone, "light")}>
      <div className={sec.container}>
        <SectionHead
          variant="center"
          tag="How we work"
          icon={<Icon id="flow" />}
          heading={process.heading}
          lead={process.lead}
          aside={
            <p className={s.timeline}>
              <Icon id="clock" />
              <span className={s.timelineLabel}>Typical timeline</span>
              <span>{process.timeline}</span>
            </p>
          }
        />

        <div ref={ref} className={s.board}>
          <div className={s.railY} aria-hidden="true">
            <motion.span className={s.barFillY} style={{ clipPath: reduce ? "none" : clipY }} />
          </div>
          <ol className={s.steps}>
            {PHASES.map((phase, i) => (
              <li key={phase} className={cn(s.step, done(i) && s.done, current(i) && s.current)}>
                <div className={s.stepTop}>
                  <span className={s.node}>
                    {done(i) ? (
                      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="m3.5 8.25 3 3 6-6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      i + 1
                    )}
                  </span>
                  <span className={s.phaseNo}>Phase {String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className={s.phase}>{phase}</h3>
                <p className={s.stepText}>{process.steps[i]}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
