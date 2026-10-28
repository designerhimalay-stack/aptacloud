// Photo + copy section (the live pages' "image beside a list" blocks): a
// human photo in an 8px frame on one side; on the other the head, any intro
// paragraphs, then the points as a stacked list on one card (icon or figure,
// title, text). Points slide in one by one; the photo eases in from a slight
// zoom and brings its colour up on hover. `reverse` puts the photo on the right.

import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { PillTag } from "@/components/ui/PillTag";
import { Reveal } from "@/components/ui/Reveal";
import { FillHeading } from "@/components/site/dynamics/FillHeading";
import type { Block } from "@/data/services/types";
import { cn } from "@/lib/utils";
import { Icon } from "../Icon";
import { SectionHead } from "../SectionHead";
import { toneProps, type Tone } from "../tone";
import sec from "../Section.module.css";
import s from "./Split.module.css";

type SplitBlock = Extract<Block, { kind: "split" }>;

/** flank: centred head, then the points in two columns either side of a tall photo. */
function Flank({ block, tone }: { block: SplitBlock; tone: Tone }) {
  const items = block.items ?? [];
  const half = Math.ceil(items.length / 2);
  const side = (list: typeof items, from: number) => (
    <div className={s.flankSide}>
      {list.map((it, i) => (
        <Reveal key={it.title} y={18} duration={0.9} delay={(from + i) * 0.07} className={s.flankItem}>
          <span className={s.icon}>
            <Icon id={it.icon ?? "spark"} />
          </span>
          <div className={s.itemBody}>
            <h3 className={s.itemTitle}>{it.title}</h3>
            {it.text && <p className={s.itemText}>{it.text}</p>}
          </div>
        </Reveal>
      ))}
    </div>
  );
  return (
    <section id={block.id ?? "about"} {...toneProps(tone)}>
      <div className={sec.container}>
        <SectionHead variant="center" tag={block.tag} icon={<Icon id={block.icon ?? "spark"} />} heading={block.heading} lead={block.lead} />
        <div className={s.flank}>
          {side(items.slice(0, half), 0)}
          <Reveal y={40} duration={1.2} className={cn(s.flankMedia, "photo-host")}>
            <Photo src={block.photo.src} alt={block.photo.alt} position={block.photo.position} tone="color" sizes="(min-width: 810px) 380px, 100vw" className={s.photo} />
          </Reveal>
          {side(items.slice(half), half)}
        </div>
      </div>
    </section>
  );
}

export function Split({ block, cta, tone }: { block: SplitBlock; cta?: { label: string; short: string }; tone: Tone }) {
  if (block.list === "flank") return <Flank block={block} tone={tone} />;
  return (
    <section id={block.id ?? "about"} {...toneProps(tone)}>
      <div className={cn(sec.container, s.layout, block.reverse && s.reverse, !block.items && s.compact)}>
        <Reveal y={40} duration={1.2} className={cn(s.media, "photo-host")}>
          <Photo src={block.photo.src} alt={block.photo.alt} position={block.photo.position} tone="color" sizes="(min-width: 1200px) 560px, (min-width: 810px) 45vw, 100vw" className={s.photo} />
        </Reveal>

        <div className={s.content}>
          <Reveal y={30} duration={1}>
            <PillTag icon={<Icon id={block.icon ?? "spark"} />}>{block.tag}</PillTag>
          </Reveal>
          <FillHeading text={block.heading} className={cn(sec.heading, s.heading)} wordClassName={sec.word} />
          {block.lead && (
            <Reveal y={24} duration={1} delay={0.05}>
              <p className={s.lead}>{block.lead}</p>
            </Reveal>
          )}
          {block.body?.map((p, i) => (
            <Reveal key={p} y={24} duration={1} delay={0.08 + i * 0.04}>
              <p className={s.para}>{p}</p>
            </Reveal>
          ))}

          {block.items && (
            <div className={cn(s.list, block.list === "cards" && s.listCards, block.list === "divided" && s.listDivided)}>
              {block.items.map((it, i) => (
                <Reveal key={it.title} y={18} duration={0.9} delay={i * 0.07} className={s.item}>
                  {it.value ? (
                    <span className={s.value}>{it.value}</span>
                  ) : (
                    <span className={s.icon}>
                      <Icon id={it.icon ?? "spark"} />
                    </span>
                  )}
                  <div className={s.itemBody}>
                    <h3 className={s.itemTitle}>{it.title}</h3>
                    {it.text && <p className={s.itemText}>{it.text}</p>}
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          {block.cta && cta && !block.note && (
            <Reveal y={20} duration={0.9} className={s.cta}>
              <Button label={cta.label} shortLabel={cta.short} href="#contact" />
            </Reveal>
          )}
        </div>
      </div>

      {block.chips && (
        <div className={cn(sec.container, s.chipsWrap)}>
          <p className={s.chipsHeading}>{block.chips.heading}</p>
          <div className={s.chips}>
            {block.chips.items.map((c, i) => (
              <Reveal key={c} y={16} duration={0.8} delay={i * 0.05} className={s.chip}>
                {c}
              </Reveal>
            ))}
          </div>
        </div>
      )}

      {block.note && (
        <Reveal y={16} duration={0.9} className={cn(sec.container, s.noteWrap)}>
          <p className={s.note}>{block.note}</p>
          {block.cta && cta && <Button label={cta.label} shortLabel={cta.short} href="#contact" />}
        </Reveal>
      )}
    </section>
  );
}
