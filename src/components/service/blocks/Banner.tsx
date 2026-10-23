// Mid-page banner (the live pages' call-out strips). A dark panel set inside
// the section before it: the line and the page's one primary CTA on the left,
// a human photo on the right in its own frame (no overlay). The photo eases
// in from a slight zoom; a pulse marks the panel as the next step.

import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Pulse } from "@/components/ui/Pulse";
import { Reveal } from "@/components/ui/Reveal";
import type { Block } from "@/data/services/types";
import { cn } from "@/lib/utils";
import { toneProps, type Tone } from "../tone";
import sec from "../Section.module.css";
import s from "./Banner.module.css";

type BannerBlock = Extract<Block, { kind: "banner" }>;

export function Banner({ block, cta, tone, id }: { block: BannerBlock; cta: { label: string; short: string }; tone: Tone; id: string }) {
  const t = toneProps(tone);
  return (
    <section id={id} {...t} className={cn(t.className, s.section)}>
      <div className={sec.container}>
        <Reveal y={36} duration={1.1} className={cn(s.panel, "photo-host")} data-theme="dark">
          <div className={s.copy}>
            <p className={s.eyebrow}>
              <Pulse size={6} color="var(--accent)" />
              Your next step
            </p>
            <h2 className={s.heading}>{block.heading}</h2>
            {block.text && <p className={s.text}>{block.text}</p>}
            <div className={s.actions}>
              <Button label={cta.label} shortLabel={cta.short} href="#contact" />
            </div>
          </div>
          <div className={s.media}>
            <Photo src={block.photo.src} alt={block.photo.alt} position={block.photo.position} tone="color" sizes="(min-width: 810px) 520px, 100vw" className={s.photo} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
