// Stats band, straight under the hero (the live hero's counters). It reads as
// the hero's last line: same dark ground, a hairline on top, then the figures
// in a row divided by hairlines. Each figure counts up from zero as it enters
// view and an accent line draws in under it, one after another.

import { animate, useInView } from "@/lib/motion";
import { useEffect, useRef, useState } from "react";
import { Pulse } from "@/components/ui/Pulse";
import { Ticker } from "@/components/ui/Ticker";
import type { Stat } from "@/data/services/types";
import { cn } from "@/lib/utils";
import s from "./Stats.module.css";

function Figure({ stat, on, delay }: { stat: Stat; on: boolean; delay: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!on) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(stat.value);
      return;
    }
    let stop = () => {};
    const t = setTimeout(() => {
      stop = animate(0, stat.value, { duration: 1.8, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) }).stop;
    }, delay * 1000);
    return () => {
      clearTimeout(t);
      stop();
    };
  }, [on, stat.value, delay]);
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
  const on = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section id="numbers" className={s.section}>
      <div ref={ref} className={cn(s.row, on && s.on, stats.length === 4 && s.four)} style={{ ["--n" as string]: stats.length }}>
        <div className={s.intro}>
          <p className={s.label}>
            <Pulse size={6} color="var(--accent)" />
            AptaCloud in numbers
          </p>
          <p className={s.introText}>One senior team for strategy, build, and support.</p>
        </div>
        {stats.map((stat, i) => (
          <div key={stat.label} className={s.stat} style={{ ["--i" as string]: i }}>
            <Figure stat={stat} on={on} delay={i * 0.15} />
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
