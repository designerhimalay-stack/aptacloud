// Agentcraft — AI Assessment Workshop.
// Eyebrow, three-line heading | lead, then a row of four photo cards
// (01–04, title, text) in the site's rounded card language (24px cards,
// 16px photos, 8px gaps).

import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { PillTag } from "@/components/ui/PillTag";
import { SpreadGrid } from "@/components/ui/SpreadGrid";
import { LineReveal, Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import s from "./Workshop.module.css";

const THRESHOLD = 0.1;

const QUESTIONS = [
  "Are you confused about too much AI noise?",
  "Want to know how AI can really impact and change your business?",
];

/* The PDF's "What you'll gain"; one line each, written from the PDF's copy. */
const GAINS = [
  {
    index: "01",
    title: "In-depth AI analysis",
    text: "Understand how artificial intelligence can really impact and change your business.",
    src: "/images/photos/workshop-analysis.jpg",
    alt: "A consultant presents to a team seated around a conference table with laptops",
    position: "45% 50%",
  },
  {
    index: "02",
    title: "Customised AI strategy",
    text: "A tailored plan for how AI can automate your operations and drive growth.",
    src: "/images/photos/workshop-strategy.jpg",
    alt: "Hands gesturing over a laptop during a strategy discussion",
    position: "40% 50%",
  },
  {
    index: "03",
    title: "Hands-on experience",
    text: "Cut through the AI noise and see what AI can really do for your business.",
    src: "/images/photos/workshop-hands-on.jpg",
    alt: "Three colleagues laughing while working together on laptops at a shared table",
    position: "55% 50%",
  },
  {
    index: "04",
    title: "Actionable insights",
    text: "Leave with a clear view of where AI delivers measurable ROI for your business.",
    src: "/images/photos/workshop-insights.jpg",
    alt: "Team members point at a laptop screen while agreeing on next steps",
    position: "50% 45%",
  },
];

const IMAGE_SIZES =
  "(min-width: 1200px) calc((min(100vw - 120px, 1176px) - 24px) / 4 - 32px), " +
  "(min-width: 810px) calc((100vw - 89px) / 2 - 32px), calc(100vw - 71px)";

export function Workshop() {
  return (
    <section id="workshop" data-theme="light" className={s.root}>
      <div className={s.container}>
        <Reveal amount={THRESHOLD} className={cn(s.text, s.centered)}>
          <PillTag icon={<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="4.5" y="4" width="11" height="13.25" rx="1.75" stroke="currentColor" strokeWidth="1.25" /><rect x="7.25" y="2.75" width="5.5" height="2.75" rx="0.9" stroke="currentColor" strokeWidth="1.25" /><path d="m7.4 11.1 1.85 1.85 3.4-3.6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" /></svg>}>AI Assessment Workshop</PillTag>
        </Reveal>
        <div className={s.space20} />

        <div className={s.head}>
          <LineReveal as="h2" className={cn("t-h2", s.title, s.centered)}>
            <span>Unlock the power</span>
            <span>of AI with our</span>
            <span>exclusive workshop.</span>
          </LineReveal>
          <Reveal delay={0.1} amount={THRESHOLD} className={cn(s.lead, s.centered)}>
            <p className="t-body">
              Our tailored AI assessment workshop is designed to help you understand how artificial intelligence (AI)
              can automate your operations and drive growth.
            </p>
            <ul className={s.questions}>
              {QUESTIONS.map((q) => (
                <li key={q} className={s.question}>
                  <span className={s.qMark} aria-hidden="true">
                    ?
                  </span>
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className={s.space64} />

        <Reveal amount={THRESHOLD} className={s.gainsHead}>
          <p className={s.gainsLabel}>What you’ll gain</p>
          <p className={s.gainsCount}>( 04 outcomes )</p>
        </Reveal>
        <div className={s.space20} />

        <SpreadGrid
          as="ol"
          itemAs="li"
          className={s.cards}
          itemClassName={s.li}
          items={GAINS.map((g) => (
              <div key={g.index} className={cn(s.card, "photo-host")}>
                <Photo
                  src={g.src}
                  alt={g.alt}
                  sizes={IMAGE_SIZES}
                  position={g.position}
                  tone="color"
                  className={s.photo}
                />
                <div className={s.space28} />
                <p className={cn("t-label-accent", s.text, s.centered)}>{g.index}</p>
                <div className={s.space18} />
                <h3 className={cn("t-h4", s.text, s.centered)}>{g.title}</h3>
                <div className={s.space12} />
                <p className={cn("t-body-sm", s.text, s.body, s.centered)}>{g.text}</p>
              </div>
          ))}
        />

        <div className={s.space40} />
        <Reveal delay={0.1} amount={THRESHOLD} className={s.cta}>
          <Button label="Book AI workshop" href="#contact" />
        </Reveal>
      </div>
    </section>
  );
}

export default Workshop;
