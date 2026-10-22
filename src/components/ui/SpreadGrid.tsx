// SpreadGrid — cards gather as a stack in the centre of their grid, then fan
// out to their places as the section scrolls into view. Progress is linked to
// scroll: it runs from the grid's top at 90% of the viewport to 40% (the cards
// are stacked as they arrive, fully spread once well in view), spring-smoothed.
// Stacked state: every card translated to the grid centre, scaled 0.86, tilted
// a few degrees (alternating) with the first card on top. Below 810px (single
// column) and with reduced motion the cards simply sit in place.

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "@/lib/motion";
import { useLayoutEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { BRAND, rgbOf } from "@/brand/brand";

// Stack shadow in the brand ink colour.
const INK = rgbOf(BRAND.colors.ink);

type Offset = { x: number; y: number };

const TILT = [-6, 4, -3, 5, -4, 3];

function SpreadItem({
  as = "div",
  className,
  progress,
  offset,
  index,
  count,
  children,
}: {
  as?: "div" | "li";
  className?: string;
  progress: MotionValue<number>;
  offset: Offset | null;
  index: number;
  count: number;
  children: ReactNode;
}) {
  const x = useTransform(progress, [0, 1], [offset?.x ?? 0, 0]);
  const y = useTransform(progress, [0, 1], [offset?.y ?? 0, 0]);
  const rotate = useTransform(progress, [0, 0.85, 1], [TILT[index % TILT.length], 0, 0]);
  const scale = useTransform(progress, [0, 1], [0.86, 1]);
  // Shape-following shadow separates the stacked cards; gone once spread.
  const filter = useTransform(
    progress,
    [0, 0.9, 1],
    [
      `drop-shadow(0px 24px 32px rgba(${INK}, 0.16))`,
      `drop-shadow(0px 0px 0px rgba(${INK}, 0))`,
      `drop-shadow(0px 0px 0px rgba(${INK}, 0))`,
    ],
  );
  const Comp = as === "li" ? motion.li : motion.div;
  // Disabled (phone / reduced motion / offset not computed yet): cards sit in place.
  if (!offset) {
    const Plain = as === "li" ? "li" : "div";
    return (
      <Plain className={className} style={{ position: "relative" }}>
        {children}
      </Plain>
    );
  }
  return (
    <Comp className={className} style={{ x, y, rotate, scale, filter, zIndex: count - index, position: "relative" }}>
      {children}
    </Comp>
  );
}

export function SpreadGrid({
  as: Tag = "div",
  itemAs = "div",
  id,
  className,
  itemClassName,
  items,
}: {
  as?: ElementType;
  itemAs?: "div" | "li";
  id?: string;
  className?: string;
  itemClassName?: string;
  items: ReactNode[];
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [offsets, setOffsets] = useState<Offset[] | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.4"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.6 });

  useLayoutEffect(() => {
    const grid = ref.current;
    if (!grid) return;
    const measure = () => {
      const kids = Array.from(grid.children) as HTMLElement[];
      const wide = matchMedia("(min-width: 810px)").matches;
      if (!wide || reduce) {
        setOffsets(null);
        return;
      }
      // offsetLeft/Top ignore transforms, so the stacked state doesn't skew the measurement.
      const cx = grid.offsetWidth / 2;
      const cy = grid.offsetHeight / 2;
      setOffsets(
        kids.map((k) => ({
          x: cx - (k.offsetLeft + k.offsetWidth / 2),
          y: cy - (k.offsetTop + k.offsetHeight / 2),
        })),
      );
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(grid);
    return () => ro.disconnect();
  }, [items.length, reduce]);

  return (
    <Tag ref={ref} id={id} className={className} style={{ position: "relative" }}>
      {items.map((item, i) => (
        <SpreadItem
          key={i}
          as={itemAs}
          className={itemClassName}
          progress={progress}
          offset={offsets ? (offsets[i] ?? { x: 0, y: 0 }) : null}
          index={i}
          count={items.length}
        >
          {item}
        </SpreadItem>
      ))}
    </Tag>
  );
}
