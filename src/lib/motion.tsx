// In-house motion layer: the small set of primitives the site needs, with no
// animation library.
//  • MotionValue           – a value that notifies subscribers; elements bound to it
//                            update their style directly (no React re-render).
//  • useScroll             – element scroll progress (0 → 1) between two offsets.
//  • useTransform          – maps a value through input/output ranges (numbers, or
//                            strings sharing a number template; others switch).
//  • useSpring             – spring-smoothed copy of a value.
//  • motion.div/span/li    – elements whose `style` may hold MotionValues (x, y,
//                            rotate, scale go into `transform`), with optional
//                            `initial` → `animate` / `whileInView` transitions.
//  • animate, useInView, useReducedMotion – tween, viewport and preference helpers.

import {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ForwardRefExoticComponent,
  type HTMLAttributes,
  type ReactNode,
  type RefAttributes,
  type RefObject,
} from "react";

/** Expo-out easing used by the reveal animations. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export function prefersReducedMotion() {
  return typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Soft glow for status dots: two stacked shadows in the given colour. */
export const glowShadow = (c: string) =>
  `0 0 4px color-mix(in srgb, ${c} 85%, transparent), 0 0 10px color-mix(in srgb, ${c} 40%, transparent)`;

// useLayoutEffect warns during SSR; fall back to useEffect there.
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/* ── MotionValue ─────────────────────────────────────────────────────── */

export class MotionValue<T = number> {
  private value: T;
  private subs = new Set<(v: T) => void>();
  constructor(initial: T) {
    this.value = initial;
  }
  get() {
    return this.value;
  }
  set(v: T) {
    if (Object.is(v, this.value)) return;
    this.value = v;
    this.subs.forEach((fn) => fn(v));
  }
  on(_event: "change", fn: (v: T) => void) {
    this.subs.add(fn);
    return () => {
      this.subs.delete(fn);
    };
  }
}

const isMotionValue = (v: unknown): v is MotionValue<unknown> => v instanceof MotionValue;

function useConstant<T>(make: () => T): T {
  const ref = useRef<{ v: T } | null>(null);
  if (!ref.current) ref.current = { v: make() };
  return ref.current.v;
}

/* ── Interpolation ───────────────────────────────────────────────────── */

const NUM = /-?\d*\.?\d+(?:e[-+]?\d+)?/gi;

function mixValue<T>(a: T, b: T, t: number): T {
  if (typeof a === "number" && typeof b === "number") return (a + (b - a) * t) as T;
  if (typeof a === "string" && typeof b === "string") {
    const na = a.match(NUM);
    const nb = b.match(NUM);
    const sameTemplate = na && nb && na.length === nb.length && a.replace(NUM, "#") === b.replace(NUM, "#");
    if (sameTemplate) {
      let k = 0;
      return a.replace(NUM, () => {
        const x = parseFloat(na[k]);
        const y = parseFloat(nb[k]);
        k++;
        return String(Math.round((x + (y - x) * t) * 1000) / 1000);
      }) as T;
    }
  }
  // Values that can't be blended (e.g. two CSS variables) switch once the segment starts.
  return t > 0 ? b : a;
}

function interpolate<T>(input: number[], output: T[], v: number): T {
  if (v <= input[0]) return output[0];
  const last = input.length - 1;
  if (v >= input[last]) return output[last];
  let i = 0;
  while (i < last - 1 && v > input[i + 1]) i++;
  const span = input[i + 1] - input[i];
  const t = span === 0 ? 1 : (v - input[i]) / span;
  return mixValue(output[i], output[i + 1], t);
}

export function useTransform<T>(source: MotionValue<number>, input: number[], output: T[]): MotionValue<T> {
  const inRef = useRef(input);
  const outRef = useRef(output);
  inRef.current = input;
  outRef.current = output;
  const mv = useConstant(() => new MotionValue<T>(interpolate(input, output, source.get())));
  useIsoLayoutEffect(() => {
    const update = (v: number) => mv.set(interpolate(inRef.current, outRef.current, v));
    update(source.get());
    return source.on("change", update);
  }, [source, mv]);
  // Re-map when the ranges themselves change (e.g. measured offsets arrive).
  useIsoLayoutEffect(() => {
    mv.set(interpolate(input, output, source.get()));
  });
  return mv;
}

/* ── Scroll progress ─────────────────────────────────────────────────── */

type Offset = `${"start" | "center" | "end"} ${number}`;
const EDGE = { start: 0, center: 0.5, end: 1 } as const;

/** Scroll position at which the target's edge sits at the given fraction of the viewport. */
function scrollAt(offset: Offset, top: number, height: number, vh: number) {
  const [edge, frac] = offset.split(" ") as [keyof typeof EDGE, string];
  return top + EDGE[edge] * height - parseFloat(frac) * vh;
}

export function useScroll({
  target,
  offset = ["start end", "end start"] as unknown as [Offset, Offset],
}: {
  target: RefObject<HTMLElement | null>;
  offset?: [Offset, Offset] | string[];
}) {
  const scrollYProgress = useConstant(() => new MotionValue(0));
  const [a, b] = offset as [Offset, Offset];
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const el = target.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const top = r.top + window.scrollY;
      const vh = window.innerHeight;
      const from = scrollAt(a, top, r.height, vh);
      const to = scrollAt(b, top, r.height, vh);
      const p = to === from ? (window.scrollY >= to ? 1 : 0) : (window.scrollY - from) / (to - from);
      scrollYProgress.set(Math.min(1, Math.max(0, p)));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(schedule) : null;
    if (target.current) ro?.observe(target.current);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      ro?.disconnect();
    };
  }, [target, a, b, scrollYProgress]);
  return { scrollYProgress };
}

/* ── Spring ──────────────────────────────────────────────────────────── */

export function useSpring(
  source: MotionValue<number>,
  { stiffness = 100, damping = 10, mass = 1 }: { stiffness?: number; damping?: number; mass?: number } = {},
) {
  const mv = useConstant(() => new MotionValue(source.get()));
  useEffect(() => {
    let frame = 0;
    let velocity = 0;
    let last = 0;
    const step = (now: number) => {
      const dt = Math.min(0.064, last ? (now - last) / 1000 : 1 / 60);
      last = now;
      const x = mv.get();
      const goal = source.get();
      // Semi-implicit Euler in small sub-steps for stability.
      let pos = x;
      const n = 4;
      for (let i = 0; i < n; i++) {
        const h = dt / n;
        const force = -stiffness * (pos - goal) - damping * velocity;
        velocity += (force / mass) * h;
        pos += velocity * h;
      }
      if (Math.abs(goal - pos) < 0.0005 && Math.abs(velocity) < 0.0005) {
        mv.set(goal);
        velocity = 0;
        frame = 0;
        last = 0;
        return;
      }
      mv.set(pos);
      frame = requestAnimationFrame(step);
    };
    const kick = () => {
      if (!frame) frame = requestAnimationFrame(step);
    };
    const off = source.on("change", kick);
    kick();
    return () => {
      off();
      cancelAnimationFrame(frame);
    };
  }, [source, mv, stiffness, damping, mass]);
  return mv;
}

/* ── Tween ───────────────────────────────────────────────────────────── */

/** Cubic-bezier easing (x1, y1, x2, y2) as a function of progress. */
function bezier([x1, y1, x2, y2]: readonly number[]) {
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
  const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  const sx = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sy = (t: number) => ((ay * t + by) * t + cy) * t;
  const dsx = (t: number) => (3 * ax * t + 2 * bx) * t + cx;
  return (x: number) => {
    let t = x;
    for (let i = 0; i < 8; i++) {
      const d = dsx(t);
      if (Math.abs(d) < 1e-6) break;
      t -= (sx(t) - x) / d;
    }
    return sy(Math.min(1, Math.max(0, t)));
  };
}

export function animate(
  from: number,
  to: number,
  { duration = 0.3, ease = EASE_OUT_EXPO, onUpdate }: { duration?: number; ease?: readonly number[]; onUpdate: (v: number) => void },
) {
  const curve = bezier(ease);
  let frame = 0;
  let start = 0;
  const step = (now: number) => {
    if (!start) start = now;
    const t = Math.min(1, (now - start) / (duration * 1000));
    onUpdate(from + (to - from) * curve(t));
    if (t < 1) frame = requestAnimationFrame(step);
  };
  frame = requestAnimationFrame(step);
  return { stop: () => cancelAnimationFrame(frame) };
}

/* ── Viewport + preference hooks ─────────────────────────────────────── */

export function useInView(ref: RefObject<Element | null>, { once = false, amount = 0 }: { once?: boolean; amount?: number } = {}) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) setInView(false);
      },
      { threshold: amount },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, once, amount]);
  return inView;
}

/** False on the server and first client render (matching markup), then the user's preference. */
export function useReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduce;
}

/* ── motion.div / span / li ──────────────────────────────────────────── */

type Transition = { delay?: number; duration?: number; ease?: readonly number[] };
type Target = { opacity?: number; x?: number; y?: number; scale?: number; rotate?: number; filter?: string; transition?: Transition };
type MotionStyle = { [K in keyof CSSProperties]?: CSSProperties[K] | MotionValue<any> } & {
  x?: number | MotionValue<number>;
  y?: number | MotionValue<number>;
  rotate?: number | MotionValue<number>;
  scale?: number | MotionValue<number>;
};

export type MotionProps<E extends HTMLElement> = Omit<HTMLAttributes<E>, "style"> & {
  style?: MotionStyle;
  initial?: Target;
  animate?: Target;
  whileInView?: Target;
  viewport?: { once?: boolean; amount?: number };
  children?: ReactNode;
};

const TRANSFORM_KEYS = ["x", "y", "rotate", "scale"] as const;

const read = (v: unknown) => (isMotionValue(v) ? v.get() : v);

/** Resolves a motion style (MotionValues + transform shorthands) into plain CSS. */
function resolveStyle(style: MotionStyle | undefined, pose?: Target): CSSProperties {
  const out: Record<string, unknown> = {};
  const tf: Record<string, number> = {};
  for (const [k, v] of Object.entries(style ?? {})) {
    if ((TRANSFORM_KEYS as readonly string[]).includes(k)) tf[k] = read(v) as number;
    else out[k] = read(v);
  }
  if (pose) {
    for (const k of TRANSFORM_KEYS) if (pose[k] !== undefined) tf[k] = pose[k] as number;
    if (pose.opacity !== undefined) out.opacity = pose.opacity;
    if (pose.filter !== undefined) out.filter = pose.filter;
  }
  if (Object.keys(tf).length) {
    const parts: string[] = [];
    if (tf.x || tf.y) parts.push(`translate3d(${tf.x ?? 0}px, ${tf.y ?? 0}px, 0)`);
    if (tf.rotate) parts.push(`rotate(${tf.rotate}deg)`);
    if (tf.scale !== undefined && tf.scale !== 1) parts.push(`scale(${tf.scale})`);
    out.transform = parts.length ? parts.join(" ") : "none";
  }
  return out as CSSProperties;
}

function makeMotion<E extends HTMLElement>(Tag: "div" | "span" | "li") {
  const Comp = forwardRef<E, MotionProps<E>>(function Motion(
    { style, initial, animate: target, whileInView, viewport, ...rest },
    forwarded,
  ) {
    const local = useRef<E | null>(null);
    const poseRef = useRef<Target | undefined>(initial);
    const styleRef = useRef(style);
    styleRef.current = style;

    const setRef = (el: E | null) => {
      local.current = el;
      if (typeof forwarded === "function") forwarded(el);
      else if (forwarded) forwarded.current = el;
    };

    // Bound MotionValues write straight to the element.
    useIsoLayoutEffect(() => {
      const el = local.current;
      if (!el) return;
      const apply = () => Object.assign(el.style, resolveStyle(styleRef.current, poseRef.current));
      const mvs = Object.values(style ?? {}).filter(isMotionValue);
      const offs = mvs.map((mv) => mv.on("change", apply));
      apply();
      return () => offs.forEach((off) => off());
    }, [style]);

    // initial → animate (on mount) or → whileInView (once in view).
    const goal = target ?? whileInView;
    const inView = useInView(local, { once: viewport?.once ?? true, amount: viewport?.amount ?? 0 });
    const ready = target ? true : whileInView ? inView : false;
    useEffect(() => {
      const el = local.current;
      if (!el || !goal || !ready) return;
      const { delay = 0, duration = 0.3, ease = EASE_OUT_EXPO } = goal.transition ?? {};
      const curve = `cubic-bezier(${ease.join(", ")})`;
      el.style.transition = duration
        ? ["opacity", "transform", "filter"].map((p) => `${p} ${duration}s ${curve} ${delay}s`).join(", ")
        : "none";
      // Next frame, so the initial pose is painted before transitioning away from it.
      const frame = requestAnimationFrame(() => {
        poseRef.current = goal;
        Object.assign(el.style, resolveStyle(styleRef.current, goal));
      });
      return () => cancelAnimationFrame(frame);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ready, JSON.stringify(goal)]);

    const El = Tag as unknown as "div";
    return <El ref={setRef as never} style={resolveStyle(style, poseRef.current)} {...(rest as HTMLAttributes<HTMLDivElement>)} />;
  });
  return Comp as ForwardRefExoticComponent<MotionProps<E> & RefAttributes<E>>;
}

export const motion = {
  div: makeMotion<HTMLDivElement>("div"),
  span: makeMotion<HTMLSpanElement>("span"),
  li: makeMotion<HTMLLIElement>("li"),
};
