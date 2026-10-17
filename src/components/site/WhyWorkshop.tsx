// Why Workshop — Agentcraft's workshop benefits:
// pill tag | heading whose words fill from grey to ink as you scroll through it
// (the last two words fill to the accent) + muted lead + "Book now"; then three
// white 24px-radius cards — big muted "01." numbers on top, an accent
// line icon, title and text at the bottom — that fan out of a stack as the
// grid scrolls in (<SpreadGrid>).
// On hover the number warms to a faint accent tint (0.5s ease-out) so the
// card answers the pointer.

import { motion, useScroll, useTransform, type MotionValue } from "@/lib/motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SpreadGrid } from "@/components/ui/SpreadGrid";
import s from "./WhyWorkshop.module.css";

// [word, accent?] — "with AI?" keeps the brand accent.
const HEADING: [string, boolean][] = [
  ["Ready", false],
  ["to", false],
  ["transform", false],
  ["your", false],
  ["business", false],
  ["with", true],
  ["AI?", true],
];
const LEAD = "Sign up now for our exclusive AI assessment workshop.";

// Support lines use only facts stated in the PDF.
const BENEFITS = [
  { title: "Expert guidance", text: "20+ years of experience and 200+ engineers under one roof.", icon: "guide" as const },
  { title: "Tailored solutions", text: "Tailored Cloud, Data, IT and AI offerings for your business.", icon: "tailor" as const },
  { title: "Proven results", text: "300+ clients served across 4+ global delivery locations.", icon: "results" as const },
];

function Word({
  word,
  accent,
  i,
  n,
  progress,
}: {
  word: string;
  accent: boolean;
  i: number;
  n: number;
  progress: MotionValue<number>;
}) {
  const color = useTransform(progress, [i / n, (i + 1) / n], ["var(--fill-from)", accent ? "var(--accent)" : "var(--fill-to)"]);
  return (
    <motion.span className={s.word} style={{ color }}>
      {word}
    </motion.span>
  );
}

/** Words fill from grey to ink (accent words to the accent) as the heading scrolls through the viewport. */
function FillHeading() {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const label = HEADING.map(([w]) => w).join(" ");
  return (
    <h2 ref={ref} className={s.heading} aria-label={label}>
      {HEADING.map(([w, accent], i) => (
        <Word key={i} word={w} accent={accent} i={i} n={HEADING.length} progress={scrollYProgress} />
      ))}
    </h2>
  );
}

function BenefitIcon({ kind }: { kind: "guide" | "tailor" | "results" }) {
  return (
    <svg className={s.icon} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      {kind === "guide" ? (
        // compass: guidance
        <>
          <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1.75" />
          <path d="m20.5 11.5-2.6 6.4-6.4 2.6 2.6-6.4 6.4-2.6Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
        </>
      ) : kind === "tailor" ? (
        // sliders: tailored to you
        <>
          <path d="M6 9h10M22 9h4M6 16h4M16 16h10M6 23h12M24 23h2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <circle cx="19" cy="9" r="3" stroke="currentColor" strokeWidth="1.75" />
          <circle cx="13" cy="16" r="3" stroke="currentColor" strokeWidth="1.75" />
          <circle cx="21" cy="23" r="3" stroke="currentColor" strokeWidth="1.75" />
        </>
      ) : (
        // rising line: proven results
        <>
          <path d="M5 27h22" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <path d="m6 21 6-6 5 4 9-10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20 9h6v6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
    </svg>
  );
}

function TagIcon() {
  // badge with a check: "why choose us"
  return (
    <svg className={s.tagIcon} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M10 2.75 12 4.2l2.45-.05.75 2.33 2 1.42-.75 2.35.75 2.35-2 1.42-.75 2.33-2.45-.05L10 17.75 8 16.3l-2.45.05-.75-2.33-2-1.42.75-2.35-.75-2.35 2-1.42.75-2.33L8 4.2l2-1.45Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <path d="m7.25 10.25 1.9 1.9 3.6-3.65" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function WhyWorkshop() {
  return (
    <section id="why" data-theme="light" className={s.section}>
      <div className={s.container}>
        <div className={s.content}>
          <Reveal y={30} duration={1} amount={0.3} className={s.tagCol}>
            <p className={s.tag}>
              <TagIcon />
              <span>Why choose our workshop</span>
            </p>
          </Reveal>
          <div className={s.copy}>
            <div className={s.text}>
              <FillHeading />
              <Reveal y={30} duration={1} delay={0.1} amount={0.3}>
                <p className={s.lead}>{LEAD}</p>
              </Reveal>
            </div>
            <Reveal y={30} duration={1} delay={0.15} amount={0.3}>
              <Button label="Book now" href="#contact" variant="primary" />
            </Reveal>
          </div>
        </div>

        <SpreadGrid
          as="ul"
          itemAs="li"
          className={s.cards}
          itemClassName={s.cell}
          items={BENEFITS.map((b, i) => (
            <article key={b.title} className={s.card}>
              <p className={s.number} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}.
              </p>
              <div className={s.body}>
                <BenefitIcon kind={b.icon} />
                <h3 className={s.title}>{b.title}</h3>
                <p className={s.cardText}>{b.text}</p>
              </div>
            </article>
          ))}
        />
      </div>
    </section>
  );
}

export default WhyWorkshop;
