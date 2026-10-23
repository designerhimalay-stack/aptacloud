// Statement section (the live pages' short headline + paragraph blocks, e.g.
// "MCP: making AI agents talk to your systems"): centred pill and heading
// with the scroll word-fill, the paragraph set large underneath, and the
// relevant logos floating in a row that drifts up as the section scrolls.

import { motion, useScroll, useTransform } from "@/lib/motion";
import { useRef } from "react";
import { PillTag } from "@/components/ui/PillTag";
import { Reveal } from "@/components/ui/Reveal";
import { FillHeading } from "@/components/site/dynamics/FillHeading";
import type { Block } from "@/data/services/types";
import { TECH } from "@/data/tech";
import { cn } from "@/lib/utils";
import { Icon } from "../Icon";
import { TechMark } from "../TechMark";
import { toneProps, type Tone } from "../tone";
import sec from "../Section.module.css";
import s from "./Statement.module.css";

type StatementBlock = Extract<Block, { kind: "statement" }>;

export function Statement({ block, tone }: { block: StatementBlock; tone: Tone }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section id={block.id ?? "overview"} {...toneProps(tone)}>
      <div ref={ref} className={cn(sec.container, s.wrap)}>
        <Reveal y={30} duration={1}>
          <PillTag icon={<Icon id={block.icon ?? "spark"} />}>{block.tag}</PillTag>
        </Reveal>
        <FillHeading text={block.heading} className={cn(sec.heading, s.heading)} wordClassName={sec.word} />
        {block.body.map((p, i) => (
          <Reveal key={p} y={24} duration={1} delay={0.05 + i * 0.05}>
            <p className={cn(s.text, i > 0 && s.textSmall)}>{p}</p>
          </Reveal>
        ))}
        {block.marks && (
          <motion.div className={s.marks} style={{ y }}>
            {block.marks.map((id) => (
              <span key={id} className={s.markTile} title={TECH[id].name}>
                <TechMark id={id} className={s.mark} />
                <span className={s.markName}>{TECH[id].name}</span>
              </span>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
