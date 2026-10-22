// Section header shared by every service-page section. Three layouts so a long
// page does not repeat one rhythm ten times:
//  • default — pill in the first column; heading + lead + aside over the other two
//  • center  — pill, heading and lead centred (process)
//  • split   — pill + heading on the left, lead (+ aside) bottom-aligned on the right
// Heading words fill on scroll (as on the home page); the rest fades up y 30 → 0.

import type { ReactNode } from "react";
import { PillTag } from "@/components/ui/PillTag";
import { Reveal } from "@/components/ui/Reveal";
import { FillHeading } from "@/components/site/dynamics/FillHeading";
import { cn } from "@/lib/utils";
import s from "./Section.module.css";

export function SectionHead({
  tag,
  icon,
  heading,
  lead,
  aside,
  variant = "default",
}: {
  tag: string;
  icon?: ReactNode;
  heading: string;
  lead?: string;
  aside?: ReactNode;
  variant?: "default" | "center" | "split";
}) {
  const pill = (
    <Reveal y={30} duration={1} amount={0.3} className={s.tagCol}>
      <PillTag icon={icon}>{tag}</PillTag>
    </Reveal>
  );
  const heading_ = <FillHeading text={heading} className={s.heading} wordClassName={s.word} />;
  const lead_ = lead && (
    <Reveal y={30} duration={1} delay={0.1} amount={0.3}>
      <p className={s.lead}>{lead}</p>
    </Reveal>
  );
  const aside_ = aside && (
    <Reveal y={30} duration={1} delay={0.15} amount={0.3} className={s.aside}>
      {aside}
    </Reveal>
  );

  if (variant === "split") {
    return (
      <div className={cn(s.head, s.headSplit)}>
        <div className={s.splitMain}>
          {pill}
          {heading_}
        </div>
        <div className={s.splitSide}>
          {lead_}
          {aside_}
        </div>
      </div>
    );
  }

  return (
    <div className={cn(s.head, variant === "center" && s.headCenter)}>
      {pill}
      <div className={s.copy}>
        {heading_}
        {lead_}
        {aside_}
      </div>
    </div>
  );
}
