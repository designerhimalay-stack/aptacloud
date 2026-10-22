// Azure — the four Azure services: light tinted section; a 3-column header with
// the pill tag in the first column and heading (scroll word fill) + muted lead + ink
// pill button over the other two; then the four services as minimalist text cards
// (no imagery: index + line icon, title, PDF copy, key points, link), 2 × 2 from
// 810px, one column on phones, gathered by <SpreadGrid>.
// Motion: tag / lead / button fade up y 30 → 0, 1s; heading words fill grey → ink.

import { motion, useScroll, useTransform, type MotionValue } from "@/lib/motion";
import { useRef } from "react";
import { BRAND, asset } from "@/brand/brand";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SpreadGrid } from "@/components/ui/SpreadGrid";
import { ServiceCard, type AzureService } from "./azure/ServiceCard";
import s from "./Azure.module.css";

const HEADING = "Run more on Microsoft Azure, with costs you can explain.";
const LEAD = `${BRAND.name} reviews, right-sizes, and governs your Azure estate, from first migration to managed operations, so the savings fund your next initiative.`;

// Copy from the client PDF; `points` are the PDF's own phrases, split out.
const SERVICES: AzureService[] = [
  {
    index: "01",
    icon: "hosting",
    title: "Azure Hosting",
    body: "We design and run the compute, networking, and security your workloads need on Azure, sized for how your applications actually scale.",
    points: ["Cloud computing", "Networking", "Secured workloads", "Scalable applications"],
    href: "#contact",
  },
  {
    index: "02",
    icon: "migration",
    title: "Azure Migration",
    body: "We assess your on-premises, AWS, and other cloud workloads, then move servers, applications, and databases to the right Azure resources in phases.",
    points: ["Servers, apps & databases", "On-premises & AWS workloads", "Right-sized Azure resources"],
    href: "#contact",
  },
  {
    index: "03",
    icon: "optimization",
    title: "Azure Optimisation",
    body: "A cost review, right-sizing, reserved capacity, and governance, so your Azure bill reflects what the business actually uses.",
    points: ["Cost review", "Right-sizing", "Governance"],
    href: "#contact",
  },
  {
    index: "04",
    icon: "managed",
    title: "Azure Managed Services",
    body: `${BRAND.name} runs your Azure environment with 24/7 monitoring and proactive support, working alongside your internal IT team.`,
    points: ["24/7 monitoring", "Proactive support", "Works with your IT team"],
    href: "#contact",
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

/** Words fill from grey to ink as the heading scrolls through the viewport (as About). */
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

function CloudIcon() {
  return (
    <svg className={s.tagIcon} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M5.75 15.25h8.5a3.25 3.25 0 0 0 .4-6.475A4.75 4.75 0 0 0 5.5 8.1a3.6 3.6 0 0 0 .25 7.15Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Azure() {
  return (
    <section id="azure" data-theme="light" className={s.section}>
      <div className={s.container}>
        <div className={s.content}>
          <Reveal y={30} duration={1} amount={0.3} className={s.tagCol}>
            <p className={s.tag}>
              <CloudIcon />
              <span>Azure cloud services</span>
            </p>
            {/* Official Microsoft Azure mark + wordmark (PDF: beside the heading). */}
            <p className={s.azureLogo}>
              <img src={asset("/images/microsoft/azure.svg")} alt="" width={96} height={96} />
              <span>Microsoft Azure</span>
            </p>
          </Reveal>
          <div className={s.copy}>
            <FillHeading text={HEADING} />
            <Reveal y={30} duration={1} delay={0.1} amount={0.3}>
              <p className={s.lead}>{LEAD}</p>
            </Reveal>
            <Reveal y={30} duration={1} delay={0.15} amount={0.3} className={s.buttonWrap}>
              <Button label="Get your cloud cost review" variant="outline" href="#contact" className={s.button} />
            </Reveal>
          </div>
        </div>

        <SpreadGrid
          className={s.cards}
          itemClassName={s.cell}
          items={SERVICES.map((service) => (
            <ServiceCard key={service.index} {...service} />
          ))}
        />
      </div>
    </section>
  );
}

export default Azure;
