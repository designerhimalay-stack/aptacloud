// Microsoft — the Microsoft ecosystem. Dark (page default tokens, no
// data-theme): pill tag | heading whose words fill from grey to white as it
// scrolls through the viewport + muted lead; then a meta row (label +
// "( 04 tools )" counter) over columns of list rows — one column per tool,
// its three capabilities as pill rows. Type-and-rows only, no photo.
// Header and column group fade up (y 30 → 0, 1s), columns staggered 0.08s.

import { motion, useScroll, useTransform, type MotionValue } from "@/lib/motion";
import { useRef } from "react";
import { BRAND } from "@/brand/brand";
import { Reveal } from "@/components/ui/Reveal";
import { ToolColumn, type ToolColumnProps } from "./microsoft/ToolColumn";
import s from "./Microsoft.module.css";

const HEADING = `Unlock the power of Microsoft with ${BRAND.name}.`;
const LEAD = `At ${BRAND.name}, we bring you the full suite of Microsoft services to help your business achieve greater efficiency, collaboration and security. Our tailored solutions are designed to seamlessly integrate into your operations, ensuring that your team has the tools they need to succeed.`;

const TOOLS: ToolColumnProps[] = [
  {
    name: "SharePoint",
    caption: "Content & collaboration",
    body: "Enable better content management and collaboration with Microsoft SharePoint. We help you organise, share and access important documents and data seamlessly.",
    tags: ["Content management", "Collaboration", "Documents & data"],
    icon: "sharepoint",
  },
  {
    name: "Microsoft 365",
    caption: "Productivity suite",
    body: "Empower your workforce with Microsoft 365, a complete suite of productivity tools that drive collaboration and efficiency.",
    tags: ["Productivity tools", "Collaboration", "Efficiency"],
    icon: "m365",
  },
  {
    name: "Copilot",
    caption: "AI assistant",
    body: "Unlock the potential of AI with Microsoft Copilot — whether automating repetitive tasks or providing intelligent insights.",
    tags: ["AI", "Automate repetitive tasks", "Intelligent insights"],
    icon: "copilot",
  },
  {
    name: "Power Platform",
    caption: "Low-code & automation",
    body: "Leverage Microsoft’s Power Platform to build low-code applications, automate workflows and analyse data.",
    tags: ["Low-code apps", "Workflow automation", "Data analysis"],
    icon: "power",
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

/** Words fill from grey to white as the heading scrolls through the viewport. */
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

/** Tag icon: the four-square grid, as in the Microsoft 365 mark. */
function GridIcon() {
  return (
    <svg className={s.tagIcon} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.25" />
      <rect x="11" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.25" />
      <rect x="3" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.25" />
      <rect x="11" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

export function Microsoft() {
  return (
    <section id="microsoft" className={s.section}>
      <div className={s.container}>
        <div className={s.content}>
          <Reveal y={30} duration={1} amount={0.3} className={s.tagCol}>
            <p className={s.tag}>
              <GridIcon />
              <span>Microsoft ecosystem</span>
            </p>
          </Reveal>
          <div className={s.copy}>
            <FillHeading text={HEADING} />
            <Reveal y={30} duration={1} delay={0.1} amount={0.3}>
              <p className={s.lead}>{LEAD}</p>
            </Reveal>
          </div>
        </div>

        <div className={s.tools}>
          <Reveal y={30} duration={1} amount={0.5} className={s.meta}>
            <p className={s.metaLabel}>Explore our range of Microsoft offerings</p>
            <p className={s.counter}>( {String(TOOLS.length).padStart(2, "0")} tools )</p>
          </Reveal>
          <div className={s.columns}>
            {TOOLS.map((tool, i) => (
              <Reveal key={tool.name} y={30} duration={1} delay={i * 0.08} amount={0.2} className={s.cell}>
                <ToolColumn {...tool} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Microsoft;
