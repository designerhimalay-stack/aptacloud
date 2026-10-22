// Phone-only hint under a horizontal card rail: "Swipe" + one dot per card,
// the dot of the card in view lit in the accent. Hidden from 810px (CSS).

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import sec from "./Section.module.css";
import s from "./RailHint.module.css";

export function RailHint({ forId, count, label = "Swipe" }: { forId: string; count: number; label?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const rail = document.getElementById(forId);
    if (!rail) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const first = rail.firstElementChild as HTMLElement | null;
      if (!first) return;
      const step = first.offsetWidth + 8;
      setIndex(Math.min(count - 1, Math.round(rail.scrollLeft / step)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    rail.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      rail.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [forId, count]);

  return (
    <div className={sec.railHint} aria-hidden="true">
      <span className={s.label}>
        {label}
        <svg viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9.5 4.5 13 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className={s.dots}>
        {Array.from({ length: count }, (_, i) => (
          <i key={i} className={cn(s.dot, i === index && s.on)} />
        ))}
      </span>
    </div>
  );
}
