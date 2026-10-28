// Compute spectrum (AWS Compute services): the compute models in order along a
// scale from "more control" to "less to manage", each with its AWS products,
// on one card. The scale's nodes sit in the same grid columns as the models,
// so each node is centred over its column exactly. What applies to every model
// (security, VMware) follows as compact cards. Phones: the scale becomes a
// labelled line and the models a swipe rail.

import { Reveal } from "@/components/ui/Reveal";
import type { Block } from "@/data/services/types";
import { TECH } from "@/data/tech";
import { cn } from "@/lib/utils";
import { Icon } from "../Icon";
import { RailHint } from "../RailHint";
import { SectionHead } from "../SectionHead";
import { TechMark } from "../TechMark";
import { toneProps, type Tone } from "../tone";
import { Card } from "./Cards";
import sec from "../Section.module.css";
import b from "./Blocks.module.css";
import s from "./Spectrum.module.css";

type SpectrumBlock = Extract<Block, { kind: "spectrum" }>;

const Chevron = ({ flip }: { flip?: boolean }) => (
  <svg viewBox="0 0 10 12" className={cn(s.chev, flip && s.flip)} aria-hidden="true">
    <path d="M2 1l6 5-6 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function Spectrum({ block, tone }: { block: SpectrumBlock; tone: Tone }) {
  const id = block.id ?? "services";
  const n = block.models.length;

  return (
    <section id={id} {...toneProps(tone)}>
      <div className={sec.container}>
        <SectionHead variant={block.head ?? "center"} tag={block.tag} icon={<Icon id={block.icon ?? "cloud"} />} heading={block.heading} lead={block.lead} />

        <Reveal y={32} duration={1.1}>
          <div className={s.board} style={{ ["--n" as string]: n }}>
            <div className={s.scale} aria-hidden="true">
              <span className={s.end}>
                <Chevron flip />
                {block.ends[0]}
              </span>
              <span className={s.end}>
                {block.ends[1]}
                <Chevron />
              </span>
            </div>
            <div className={s.track} aria-hidden="true">
              {block.models.map((m) => (
                <span key={m.title} className={s.tick}>
                  <span className={s.node} />
                </span>
              ))}
            </div>

            <div id={`${id}-rail`} className={cn(s.models, sec.rail)}>
              {block.models.map((m) => (
                <article key={m.title} className={s.model}>
                  <span className={s.marks}>
                    {m.marks.map((k) => (
                      <span key={k} className={s.mark} title={TECH[k].name}>
                        <TechMark id={k} />
                      </span>
                    ))}
                  </span>
                  <p className={s.names}>{m.marks.map((k) => TECH[k].name).join(" · ")}</p>
                  <h3 className={s.title}>{m.title}</h3>
                  <p className={s.text}>{m.text}</p>
                </article>
              ))}
            </div>
            <RailHint forId={`${id}-rail`} count={n} />
          </div>
        </Reveal>

        {block.more && (
          <div className={s.more}>
            <p className={s.moreHeading}>{block.more.heading}</p>
            <div className={cn(b.grid, s.moreGrid)}>
              {block.more.items.map((it, i) => (
                <Reveal key={it.title} y={20} duration={0.9} delay={i * 0.06} style={{ ["--span" as string]: 60 / block.more!.items.length, ["--span-md" as string]: 60 / block.more!.items.length }}>
                  <Card item={it} style={it.mark ? "mark" : "icon"} i={i} />
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
