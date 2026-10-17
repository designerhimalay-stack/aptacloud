// Heading word fill: each word goes from
// --fill-from to --fill-to as the heading scrolls through the viewport.

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "@/lib/motion";
import { useRef } from "react";

function Word({
  word,
  i,
  n,
  progress,
  className,
}: {
  word: string;
  i: number;
  n: number;
  progress: MotionValue<number>;
  className?: string;
}) {
  const color = useTransform(progress, [i / n, (i + 1) / n], ["var(--fill-from)", "var(--fill-to)"]);
  return (
    <motion.span className={className} style={{ color }} aria-hidden="true">
      {word}
    </motion.span>
  );
}

export function FillHeading({
  text,
  className,
  wordClassName,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <h2 ref={ref} className={className} aria-label={text}>
      {words.map((w, i) =>
        reduce ? (
          <span key={i} className={wordClassName} aria-hidden="true">
            {w}
          </span>
        ) : (
          <Word key={i} word={w} i={i} n={words.length} progress={scrollYProgress} className={wordClassName} />
        ),
      )}
    </h2>
  );
}
