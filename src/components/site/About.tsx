// About — Agentcraft's intro, with copy from the client PDF:
// pill tag | heading whose words fill from grey to ink as you scroll through
// it + muted lead; then three 550px cards — two stats whose numbers count in
// when they enter the viewport (one up from 0, one down from 2.5×, ≈1.3s
// ease-out) and a photo card with an overlaid call to action. The person
// stays sharp at rest and the photo softens + zooms slightly on hover.

import { animate, motion, useInView, useScroll, useTransform, type MotionValue } from "@/lib/motion";
import { useEffect, useRef, useState } from "react";
import { BRAND, asset } from "@/brand/brand";
import { Reveal } from "@/components/ui/Reveal";
import { SpreadGrid } from "@/components/ui/SpreadGrid";
import { RollingText } from "@/components/ui/RollingText";
import { cn } from "@/lib/utils";
import s from "./About.module.css";

// Short value proposition (Brand Guidelines v2.0, 3.2), Australian spelling.
const HEADING = "Your team has already started. We take it to production.";
const LEAD =
  "An AI pilot, a modernisation plan, a cloud migration: AptaCloud proves the value on your data with a proof of concept, then delivers in clear phases with senior Microsoft specialists, on the systems you already run.";

const STATS = [
  {
    value: 20,
    from: 0,
    title: "Years of Experience",
    text: "Experience across modern cloud systems, enterprise IT and AI integration.",
    icon: "calendar" as const,
  },
  {
    value: 300,
    from: 750,
    title: "Clients Served",
    text: "200+ engineers under one roof, delivering from 4 locations.",
    icon: "chart" as const,
  },
];

function Word({ word, i, n, progress }: { word: string; i: number; n: number; progress: MotionValue<number> }) {
  const color = useTransform(progress, [i / n, (i + 1) / n], ["var(--fill-from)", "var(--fill-to)"]);
  return (
    <motion.span className={s.word} style={{ color }}>
      {word}
    </motion.span>
  );
}

/** Words fill from grey to ink as the heading scrolls through the viewport. */
function FillHeading({ text }: { text: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <h2 ref={ref} className={s.heading} aria-label={text}>
      {words.map((w, i) => (
        <Word key={i} word={w} i={i} n={words.length} progress={scrollYProgress} />
      ))}
    </h2>
  );
}

function CountIn({ value, from }: { value: number; from: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [n, setN] = useState(from);
  useEffect(() => {
    if (!inView) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(value);
      return;
    }
    const controls = animate(from, value, {
      duration: 1.3,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, from, value]);
  return (
    <span ref={ref} className={s.number} aria-label={`${value}+`}>
      {n}+
    </span>
  );
}

function StatIcon({ kind }: { kind: "calendar" | "chart" }) {
  return (
    <svg className={s.icon} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      {kind === "calendar" ? (
        <>
          <rect x="5" y="7" width="22" height="20" rx="2" stroke="currentColor" strokeWidth="1.75" />
          <path d="M5 13h22M11 4.5v5M21 4.5v5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <path d="m12.5 20 2.5 2.5 5-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </>
      ) : (
        <path
          d="M5 27h22M8 27V17h4v10M14 27V11h4v16M20 27V6h4v21"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

function AboutIcon() {
  return (
    <svg className={s.tagIcon} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="8" cy="7" r="2.75" stroke="currentColor" strokeWidth="1.25" />
      <path d="M3.25 16.25c.5-2.85 2.35-4.5 4.75-4.5s4.25 1.65 4.75 4.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M13.25 4.75a2.4 2.4 0 0 1 0 4.6M14.6 12c1.35.45 2.15 1.85 2.4 4.25" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

export function About() {
  return (
    <section id="about" data-theme="light" className={s.section}>
      <div className={s.container}>
        <div className={s.content}>
          <Reveal y={30} duration={1} amount={0.3} className={s.tagCol}>
            <p className={s.tag}>
              <AboutIcon />
              <span>About Us</span>
            </p>
          </Reveal>
          <div className={s.copy}>
            <FillHeading text={HEADING} />
            <Reveal y={30} duration={1} delay={0.1} amount={0.3}>
              <p className={s.lead}>{LEAD}</p>
            </Reveal>
          </div>
        </div>

        <SpreadGrid
          className={s.cards}
          itemClassName={s.cell}
          items={[
            ...STATS.map((stat) => (
            <div key={stat.title} className={s.stat}>
              <div className={s.statTop}>
                <CountIn value={stat.value} from={stat.from} />
                <StatIcon kind={stat.icon} />
              </div>
              <div className={s.statBottom}>
                <h3 className={s.statTitle}>{stat.title}</h3>
                <p className={s.statText}>{stat.text}</p>
              </div>
            </div>
            )),
            <div key="photo" className={s.photoCard}>
            <div className={s.photoInner}>
              <img
                className={s.photo}
                src={asset("/images/photos/hero-developer-2.jpg")}
                alt={`A ${BRAND.name} engineer reviewing code across two monitors`}
                loading="lazy"
                decoding="async"
              />
              <span className={s.photoShade} aria-hidden="true" />
              <div className={s.photoContent}>
                <p className={s.photoText}>See where AI pays off in your business first.</p>
                {/* Points to the workshop section below (the hero already carries the primary CTA). */}
                <a href="#workshop" className={cn("roll-host", s.photoButton)}>
                  <RollingText text="How the assessment works" />
                </a>
              </div>
            </div>
          </div>,
          ]}
        />
      </div>
    </section>
  );
}

export default About;
