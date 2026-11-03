// Stats band, straight under the hero (the live hero's counters). It reads as
// the hero's last line: same dark ground, a hairline on top, then the figures
// in a row divided by hairlines. The figures are in the HTML from the start;
// if the band is below the fold they count up quickly as it enters view.

import { animate, useInView } from "@/lib/motion";
import { useEffect, useRef, useState } from "react";
import { Pulse } from "@/components/ui/Pulse";
import { Ticker } from "@/components/ui/Ticker";
import type { Stat } from "@/data/services/types";
import { cn } from "@/lib/utils";
import s from "./Stats.module.css";

// The real figure is in the HTML, so it shows at once. Only when the band is
// still off screen at hydration ("armed") does it reset and count up on entry.
function Figure({ stat, armed, on, delay }: { stat: Stat; armed: boolean; on: boolean; delay: number }) {
  const [n, setN] = useState(stat.value);
  useEffect(() => {
    if (!armed) return;
    if (!on) {
      setN(0);
      return;
    }
    let stop = () => {};
    const t = setTimeout(() => {
      stop = animate(0, stat.value, { duration: 1, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) }).stop;
    }, delay * 1000);
    return () => {
      clearTimeout(t);
      stop();
    };
  }, [armed, on, stat.value, delay]);
  return (
    <p className={s.figure} aria-label={`${stat.value}${stat.suffix ?? "+"} ${stat.label}`}>
      <span aria-hidden="true">{n}</span>
      <span className={s.suffix} aria-hidden="true">
        {stat.suffix ?? "+"}
      </span>
    </p>
  );
}

export function Stats({ stats, ribbon }: { stats: Stat[]; ribbon: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, { once: true, amount: 0.25 });
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    const r = ref.current?.getBoundingClientRect();
    const visible = !r || (r.top < innerHeight && r.bottom > 0);
    if (!visible && !matchMedia("(prefers-reduced-motion: reduce)").matches) setArmed(true);
  }, []);

  return (
    <section id="numbers" className={s.section}>
      <div ref={ref} className={cn(s.row, (on || !armed) && s.on, stats.length === 4 && s.four)} style={{ ["--n" as string]: stats.length }}>
        <div className={s.intro}>
          <p className={s.label}>
            <Pulse size={6} color="var(--accent)" />
            AptaCloud in numbers
          </p>
          <p className={s.introText}>One senior team for strategy, build, and support.</p>
        </div>
        {stats.map((stat, i) => (
          <div key={stat.label} className={s.stat} style={{ ["--i" as string]: i }}>
            <Figure stat={stat} armed={armed} on={on} delay={i * 0.08} />
            <span className={s.line} aria-hidden="true" />
            <p className={s.statLabel}>{stat.label}</p>
          </div>
        ))}
      </div>
      <Ticker
        velocity={40}
        gap={40}
        className={s.ribbon}
        items={ribbon.map((name) => (
          <p key={name} className={cn("t-label", s.ribbonItem)}>
            <span style={{ color: "var(--accent)" }}>{"// "}</span>
            {name}
          </p>
        ))}
      />
    </section>
  );
}
