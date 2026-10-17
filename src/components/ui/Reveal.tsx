// Entrance and scroll effects used across the page:
//  • <Reveal>      – block fade-up: opacity 0 → 1, y 28 → 0, 0.9s easeOutExpo.
//                    trigger="inView" (once) or "mount" (with absolute delay).
//  • <LineReveal>  – section headings: scroll-linked word fill
//                    (trigger "mount" keeps the blur line reveal for the hero).

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionProps,
  type MotionValue,
  EASE_OUT_EXPO,
} from "@/lib/motion";
import {
  Children,
  Fragment,
  isValidElement,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

type Trigger = "inView" | "mount";

export function Reveal({
  children,
  delay = 0,
  y = 28,
  duration = 0.9,
  trigger = "inView",
  amount = 0,
  ...rest
}: {
  children?: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  trigger?: Trigger;
  amount?: number;
} & Omit<MotionProps<HTMLDivElement>, "children">) {
  const reduce = useReducedMotion();
  const hidden = { opacity: 0.001, y };
  // Reduced motion: same element tree as SSR (no hydration mismatch), shown instantly.
  const shown = reduce
    ? { opacity: 1, y: 0, transition: { duration: 0 } }
    : { opacity: 1, y: 0, transition: { delay, duration, ease: EASE_OUT_EXPO } };
  return trigger === "mount" ? (
    <motion.div initial={hidden} animate={shown} {...rest}>
      {children}
    </motion.div>
  ) : (
    <motion.div initial={hidden} whileInView={shown} viewport={{ once: true, amount }} {...rest}>
      {children}
    </motion.div>
  );
}

type Token = { kind: "word"; text: string; color?: string } | { kind: "node"; node: ReactNode };

/** Flattens a heading line into words (keeping <br>s and the line's own colour). */
function tokenize(line: ReactNode): Token[] {
  if (typeof line === "string" || typeof line === "number") {
    return String(line)
      .split(/\s+/)
      .filter(Boolean)
      .map((text) => ({ kind: "word" as const, text }));
  }
  if (isValidElement(line)) {
    const props = line.props as { children?: ReactNode; style?: CSSProperties };
    if (line.type === "br") return [{ kind: "node", node: line }];
    const color = props.style?.color;
    return Children.toArray(props.children).flatMap((c) =>
      tokenize(c).map((t) => (t.kind === "word" && color ? { ...t, color } : t)),
    );
  }
  return [];
}

function FillWord({
  text,
  color,
  i,
  n,
  progress,
}: {
  text: string;
  color?: string;
  i: number;
  n: number;
  progress: MotionValue<number>;
}) {
  const c = useTransform(progress, [i / n, (i + 1) / n], ["var(--fill-from)", color ?? "currentColor"]);
  return (
    <motion.span style={{ color: c, display: "inline-block", marginRight: "0.25em" }}>{text}</motion.span>
  );
}

/**
 * Section headings. Each direct child is one line (strings or <span>s; a span's
 * inline `color` is kept as that line's final colour).
 *  • default (in view): a scroll-linked word fill — every word goes from
 *    --fill-from to its colour as the heading scrolls through the viewport.
 *  • trigger="mount": lines rise in from blur on load (used by the hero, which is
 *    already on screen).
 */
export function LineReveal({
  as: Tag = "h2",
  children,
  className,
  startDelay = 0,
  stagger = 0.05,
  trigger = "inView",
  lineClassName,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  startDelay?: number;
  stagger?: number;
  trigger?: Trigger;
  lineClassName?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.5"] });
  const lines = Children.toArray(children);

  if (trigger === "inView") {
    const tokenLines = lines.map(tokenize);
    const n = Math.max(1, tokenLines.flat().filter((t) => t.kind === "word").length);
    let w = 0;
    return (
      <Tag ref={ref} className={className} style={{ position: "relative" }}>
        {tokenLines.map((tokens, li) => (
          <span key={li} className={lineClassName} style={{ display: "block" }}>
            {tokens.map((t, ti) =>
              t.kind === "node" ? (
                <Fragment key={ti}>{t.node}</Fragment>
              ) : reduce ? (
                <span key={ti} style={{ color: t.color, display: "inline-block", marginRight: "0.25em" }}>
                  {t.text}
                </span>
              ) : (
                <FillWord key={ti} text={t.text} color={t.color} i={w++} n={n} progress={scrollYProgress} />
              ),
            )}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag ref={ref} className={className} style={{ position: "relative" }}>
      {lines.map((line, i) => {
        const hidden = { opacity: 0.001, y: 40, filter: "blur(10px)" };
        const shown = {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: reduce
            ? { duration: 0 }
            : { delay: startDelay + i * stagger, duration: 1.2, ease: EASE_OUT_EXPO },
        };
        return (
          <motion.span key={i} className={lineClassName} style={{ display: "block" }} initial={hidden} animate={shown}>
            {line}
          </motion.span>
        );
      })}
    </Tag>
  );
}
