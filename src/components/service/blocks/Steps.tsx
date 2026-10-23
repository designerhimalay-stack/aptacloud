// Process steps with the page's own count and names (the live pages run 4, 5
// or 6 steps). Two layouts:
//  • board  — the phase-card board from the home language: as the board
//    scrolls through view, steps passed are marked done and the current one lifts.
//  • photo  — a human photo (sticky) beside a vertical list whose rail fills
//    with the accent as you scroll, each node ticking off as it is reached.
// Reduced motion: every step shows as done.

import { motion, useReducedMotion, useScroll, useTransform } from "@/lib/motion";
import { useEffect, useRef, useState, type RefObject } from "react";
import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import type { Block } from "@/data/services/types";
import { cn } from "@/lib/utils";
import { Icon } from "../Icon";
import { SectionHead } from "../SectionHead";
import { toneProps, type Tone } from "../tone";
import sec from "../Section.module.css";
import p from "../Process.module.css";
import s from "./Steps.module.css";

type StepsBlock = Extract<Block, { kind: "steps" }>;

const Tick = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="m3.5 8.25 3 3 6-6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function useReached(n: number, offset: ["start 0.9", "start 0.15"] | ["start 0.7", "end 0.6"]) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset });
  const [reached, setReached] = useState(-1);
  useEffect(() => {
    if (reduce) return;
    const update = (v: number) => setReached(v <= 0.001 ? -1 : Math.min(n - 1, Math.floor(v * n)));
    update(scrollYProgress.get());
    return scrollYProgress.on("change", update);
  }, [scrollYProgress, reduce, n]);
  const done = (i: number) => (reduce ? true : i < reached || (reached === n - 1 && i === reached));
  const current = (i: number) => !reduce && i === reached && reached < n - 1;
  return { ref, done, current, scrollYProgress, reduce };
}

function Board({ steps }: { steps: StepsBlock["steps"] }) {
  const n = steps.length;
  const { ref, done, current, scrollYProgress, reduce } = useReached(n, ["start 0.9", "start 0.15"]);
  const clipY = useTransform(scrollYProgress, [0, 1], ["inset(0 0 100% 0)", "inset(0 0 0% 0)"]);
  const rail = useRailSpan(ref);
  return (
    <div ref={ref} className={p.board} style={rail}>
      <div className={p.railY} aria-hidden="true">
        <motion.span className={p.barFillY} style={{ clipPath: reduce ? "none" : clipY }} />
      </div>
      <ol className={cn(p.steps, s.boardSteps)} style={{ ["--n" as string]: n, ["--nmd" as string]: n % 3 === 0 ? 3 : 2 }}>
        {steps.map((step, i) => (
          <li key={step.title} className={cn(p.step, done(i) && p.done, current(i) && p.current)}>
            <div className={p.stepTop}>
              <span className={p.node} data-vnode>{done(i) ? <Tick /> : i + 1}</span>
              <span className={p.phaseNo}>Step {String(i + 1).padStart(2, "0")}</span>
            </div>
            <h3 className={p.phase}>{step.title}</h3>
            <p className={p.stepText}>{step.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Vertical rails run exactly from the first node's centre to the last node's
 *  centre: the container gets --rail-top / --rail-h from the [data-vnode]
 *  markers, re-measured whenever it resizes (card heights vary with copy and
 *  width), so a rail never runs past its end nodes. */
function useRailSpan(box: RefObject<HTMLDivElement | null>) {
  const [vars, setVars] = useState<Record<string, string>>({});
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const measure = () => {
      const nodes = el.querySelectorAll<HTMLElement>("[data-vnode]");
      if (nodes.length < 2) return;
      const top0 = el.getBoundingClientRect().top;
      const centre = (n: HTMLElement) => {
        const r = n.getBoundingClientRect();
        return r.top + r.height / 2 - top0;
      };
      const top = centre(nodes[0]);
      const h = Math.max(0, centre(nodes[nodes.length - 1]) - top);
      setVars({ "--rail-top": `${top}px`, "--rail-h": `${h}px` });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [box]);
  return vars;
}

function Vertical({ steps }: { steps: StepsBlock["steps"] }) {
  const { ref, done, current, scrollYProgress, reduce } = useReached(steps.length, ["start 0.7", "end 0.6"]);
  const fill = useTransform(scrollYProgress, [0, 1], ["inset(0 0 100% 0)", "inset(0 0 0% 0)"]);
  const rail = useRailSpan(ref);
  return (
    <div ref={ref} className={s.vlist} style={rail}>
      <span className={s.vrail} aria-hidden="true">
        <motion.span className={s.vfill} style={{ clipPath: reduce ? "none" : fill }} />
      </span>
      <ol className={s.vsteps}>
        {steps.map((step, i) => (
          <li key={step.title} className={cn(s.vstep, done(i) && s.vdone, current(i) && s.vcurrent)}>
            <span className={s.vnode} data-vnode>{done(i) ? <Tick /> : i + 1}</span>
            <div className={s.vbody}>
              <h3 className={s.vtitle}>{step.title}</h3>
              <p className={s.vtext}>{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ── Curve: the live data pages' numbered timeline, made formal ─────────
   A straight track with numbered nodes at the column centres, and one row
   of equal-height cards beneath them. As the section scrolls the track fills
   with the accent from left to right and each node switches on as it is
   reached. Below 1200px it folds into a vertical list. */
function Curve({ steps }: { steps: StepsBlock["steps"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.6"] });
  const [p, setP] = useState(0);
  useEffect(() => {
    if (reduce) return;
    setP(scrollYProgress.get());
    return scrollYProgress.on("change", setP);
  }, [scrollYProgress, reduce]);
  const progress = reduce ? 1 : p;
  const n = steps.length;

  // The track runs between the first and last node (column centres); folded
  // to a column below 1200px, it runs between the first and last node centres.
  const fill = Math.min(1, Math.max(0, (progress * n - 0.5) / (n - 1)));
  const rail = useRailSpan(ref);

  return (
    <div ref={ref} className={s.track} style={{ ["--n" as string]: n, ...rail }}>
      <div className={s.rail} aria-hidden="true">
        <span className={s.railFill} style={{ transform: `scaleX(${fill})` }} />
      </div>
      <ol className={s.trackSteps}>
        {steps.map((step, i) => {
          const reached = progress >= (i + 0.5) / n - 0.03;
          return (
            <li key={step.title} className={cn(s.tstep, reached && s.reached)}>
              <span className={s.tnode} data-vnode>{String(i + 1).padStart(2, "0")}</span>
              <div className={s.tcard}>
                <h3 className={s.ttitle}>{step.title}</h3>
                <p className={s.ttext}>{step.text}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function Steps({ block, cta, tone }: { block: StepsBlock; cta: { label: string; short: string }; tone: Tone }) {
  const button = block.cta && (
    <Reveal y={20} duration={0.9} className={s.cta}>
      <Button label={cta.label} shortLabel={cta.short} href="#contact" />
    </Reveal>
  );

  if (block.photo)
    return (
      <section id={block.id ?? "process"} {...toneProps(tone)}>
        <div className={sec.container}>
          <SectionHead variant={block.head ?? "split"} tag={block.tag} icon={<Icon id={block.icon ?? "flow"} />} heading={block.heading} lead={block.lead} />
          <div className={s.split}>
            <Reveal y={40} duration={1.2} className={cn(s.media, "photo-host")}>
              <Photo src={block.photo.src} alt={block.photo.alt} position={block.photo.position} tone="color" sizes="(min-width: 810px) 460px, 100vw" className={s.photo} />
            </Reveal>
            <div className={s.side}>
              <Vertical steps={block.steps} />
              {button}
            </div>
          </div>
        </div>
      </section>
    );

  return (
    <section id={block.id ?? "process"} {...toneProps(tone)}>
      <div className={sec.container}>
        <SectionHead variant={block.head ?? "center"} tag={block.tag} icon={<Icon id={block.icon ?? "flow"} />} heading={block.heading} lead={block.lead} />
        {block.variant === "curve" ? <Curve steps={block.steps} /> : <Board steps={block.steps} />}
        {button}
      </div>
    </section>
  );
}
