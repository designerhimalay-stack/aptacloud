// Ticker: an infinite horizontal marquee.
// `velocity` is px/second, `gap` the space
// between items. Items are repeated until one copy is wider than the
// container, then the whole set is duplicated and translated by -50%.

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Ticker({
  items,
  velocity = 46,
  gap = 40,
  direction = "left",
  className,
  trackClassName,
  style,
}: {
  items: ReactNode[];
  velocity?: number;
  /** px number or any CSS length / var() (lets the gap vary per breakpoint). */
  gap?: number | string;
  direction?: "left" | "right";
  className?: string;
  trackClassName?: string;
  style?: CSSProperties;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const [repeat, setRepeat] = useState(1);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const measure = () => {
      const o = outer.current;
      const c = copy.current;
      if (!o || !c) return;
      const one = c.scrollWidth / repeat;
      if (one <= 0) return;
      const need = Math.max(1, Math.ceil(o.clientWidth / one));
      if (need !== repeat) setRepeat(need);
      setDuration((one * need) / velocity);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (outer.current) ro.observe(outer.current);
    return () => ro.disconnect();
  }, [repeat, velocity, items.length]);

  const set = Array.from({ length: repeat }, (_, r) =>
    items.map((item, i) => (
      <div key={`${r}-${i}`} className="shrink-0" style={{ marginRight: gap }}>
        {item}
      </div>
    )),
  );

  return (
    <div ref={outer} className={cn("relative overflow-hidden", className)} style={style}>
      <div
        className={cn("flex w-max", trackClassName)}
        style={{
          animation: duration
            ? `ticker-x ${duration}s linear infinite ${direction === "right" ? "reverse" : "normal"}`
            : undefined,
        }}
      >
        <div ref={copy} className="flex shrink-0">
          {set}
        </div>
        <div className="flex shrink-0" aria-hidden="true">
          {set}
        </div>
      </div>
    </div>
  );
}
