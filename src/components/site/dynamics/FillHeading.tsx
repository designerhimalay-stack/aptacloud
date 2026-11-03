// Heading word fill: each word goes from
// --fill-from to --fill-to as the heading scrolls through the viewport.

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "@/lib/motion";
import { Fragment, useRef } from "react";

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
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.95", "end 0.7"] });
  const words = text.split(" ");
  return (
    <h2 ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <Fragment key={i}>
          {reduce ? (
            <span className={wordClassName} aria-hidden="true">
              {w}
            </span>
          ) : (
            <Word word={w} i={i} n={words.length} progress={scrollYProgress} className={wordClassName} />
          )}{" "}
        </Fragment>
      ))}
    </h2>
  );
}
