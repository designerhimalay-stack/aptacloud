// Card grid section, the workhorse of the live pages (problems, solutions,
// benefits, frameworks, reasons). One shell, several card styles, each echoing
// a layout from the live pages:
//  • icon      — icon tile, title, text (the tile fills with the accent on hover)
//  • statement — a buyer's statement in larger type, numbered softly
//  • check     — the head beside large numbered outcome rows
//  • mark      — the tool's own logo, its tagline, title and text
//  • centered  — a centred icon ring over the title and text (live service cards)
//  • plain     — title and text tiles with a soft index (live process grids)
//  • chip      — small icon + label pills in a centred row (live challenge rows)
//  • photo     — a photo above the copy and ticked points (live use-case cards)
// Cards rise in one after another; phones get a swipe rail.

import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { PillTag } from "@/components/ui/PillTag";
import { FillHeading } from "@/components/site/dynamics/FillHeading";
import { Reveal } from "@/components/ui/Reveal";
import type { Block, BlockItem } from "@/data/services/types";
import { cn } from "@/lib/utils";
import { Icon } from "../Icon";
import { RailHint } from "../RailHint";
import { SectionHead } from "../SectionHead";
import { TechMark } from "../TechMark";
import { toneProps, type Tone } from "../tone";
import { spanStyles } from "./grid";
import sec from "../Section.module.css";
import b from "./Blocks.module.css";
import s from "./Cards.module.css";

type CardsBlock = Extract<Block, { kind: "cards" }>;

const Tick = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="m3.5 8.25 3 3 6-6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function Card({ item, style, i }: { item: BlockItem; style: NonNullable<CardsBlock["style"]>; i: number }) {
  if (style === "centered")
    return (
      <article className={cn(b.card, s.centered)}>
        <span className={s.ring}>
          <Icon id={item.icon ?? "spark"} />
        </span>
        <h3 className={b.title}>{item.title}</h3>
        {item.text && <p className={b.text}>{item.text}</p>}
      </article>
    );

  if (style === "plain")
    return (
      <article className={cn(b.card, s.plain)}>
        <span className={s.plainNo}>{String(i + 1).padStart(2, "0")}</span>
        <h3 className={b.title}>{item.title}</h3>
        {item.text && <p className={b.text}>{item.text}</p>}
      </article>
    );

  if (style === "chip")
    return (
      <article className={s.chip}>
        {item.icon && (
          <span className={s.chipIcon}>
            <Icon id={item.icon} />
          </span>
        )}
        <h3 className={s.chipTitle}>{item.title}</h3>
      </article>
    );

  if (style === "photo")
    return (
      <article className={cn(s.photoCard, "photo-host")}>
        {item.photo && (
          <div className={s.photoWrap}>
            <Photo src={item.photo.src} alt={item.photo.alt} position={item.photo.position} tone="color" sizes="(min-width: 810px) 380px, 84vw" className={s.photo} />
          </div>
        )}
        <div className={s.photoBody}>
          {item.kicker && <p className={b.kicker}>{item.kicker}</p>}
          <h3 className={b.title}>{item.title}</h3>
          {item.text && <p className={b.text}>{item.text}</p>}
          {item.points && (
            <ul className={s.photoPoints}>
              {item.points.map((p) => (
                <li key={p}>
                  <span className={s.tickSm}>
                    <Tick />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          )}
        </div>
      </article>
    );

  if (style === "check")
    return (
      <article className={cn(b.card, s.check)}>
        <span className={s.tick} aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none">
            <path d="m3.5 8.25 3 3 6-6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <div className={b.body}>
          <h3 className={cn(b.title, s.checkTitle)}>{item.title}</h3>
          {item.text && <p className={b.text}>{item.text}</p>}
        </div>
      </article>
    );

  if (style === "statement")
    return (
      <article className={cn(b.card, s.statement)}>
        <div className={s.statementTop}>
          <svg className={s.quoteMark} viewBox="0 0 32 24" fill="currentColor" aria-hidden="true">
            <path d="M0 24V14.4C0 6.6 4.2 1.8 12.6 0l1.5 3.3C9.6 4.6 7.4 7.3 7.1 11.1H13V24H0Zm19 0V14.4C19 6.6 23.2 1.8 31.6 0l1.4 3.3c-4.5 1.3-6.7 4-7 7.8H32V24H19Z" />
          </svg>
          <span className={s.index}>{String(i + 1).padStart(2, "0")}</span>
        </div>
        <h3 className={s.statementTitle}>{item.title}</h3>
        {item.text && <p className={b.text}>{item.text}</p>}
      </article>
    );

  return (
    <article className={b.card}>
      {style === "mark" && item.mark ? (
        <span className={b.logoTile} title={item.title}>
          <TechMark id={item.mark} />
        </span>
      ) : (
        <span className={b.iconTile}>
          <Icon id={item.icon ?? "spark"} />
        </span>
      )}
      <div className={b.body}>
        {item.kicker && <p className={b.kicker}>{item.kicker}</p>}
        <h3 className={b.title}>{item.title}</h3>
        {item.text && <p className={b.text}>{item.text}</p>}
      </div>
    </article>
  );
}

/** check style: the head on the left, the outcomes as large numbered rows on the right. */
function Outcomes({ block, tone }: { block: CardsBlock; tone: Tone }) {
  return (
    <section id={block.id ?? "outcomes"} {...toneProps(tone)}>
      <div className={cn(sec.container, s.outcomes)}>
        <div className={s.outHead}>
          <Reveal y={30} duration={1}>
            <PillTag icon={<Icon id={block.icon ?? "target"} />}>{block.tag}</PillTag>
          </Reveal>
          <FillHeading text={block.heading} className={sec.heading} wordClassName={sec.word} />
          {block.lead && (
            <Reveal y={24} duration={1} delay={0.05}>
              <p className={sec.lead}>{block.lead}</p>
            </Reveal>
          )}
        </div>
        <div className={s.outList}>
          {block.items.map((it, i) => (
            <Reveal key={it.title} y={28} duration={1} delay={i * 0.09} className={s.outRow}>
              <span className={s.outNo}>{String(i + 1).padStart(2, "0")}</span>
              <p className={s.outTitle}>{it.title}</p>
              <span className={s.outTick} aria-hidden="true">
                <svg viewBox="0 0 16 16" fill="none">
                  <path d="m3.5 8.25 3 3 6-6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Cards({ block, cta, tone }: { block: CardsBlock; cta: { label: string; short: string }; tone: Tone }) {
  const id = block.id ?? "cards";
  const style = block.style ?? "icon";
  const spans = spanStyles(block.items.length, block.cols);
  // The live-page styles keep equal widths and centre a short last row (4 + 3, 3 + 2).
  const centred = style === "centered" || style === "plain" || style === "chip" || style === "photo";
  const cols = block.cols ?? (style === "chip" ? block.items.length : 3);
  if (style === "check") return <Outcomes block={block} tone={tone} />;

  return (
    <section id={id} {...toneProps(tone)}>
      <div className={sec.container}>
        <SectionHead variant={block.head} tag={block.tag} icon={<Icon id={block.icon ?? "spark"} />} heading={block.heading} lead={block.lead} />

        {block.body && (
          <div className={s.points}>
            {block.body.map((p, i) => (
              <Reveal key={p} y={20} duration={0.9} delay={i * 0.08} className={s.point}>
                <span className={s.pointIcon}>
                  <Icon id={(["team", "search", "target"] as const)[i % 3]} />
                </span>
                <p className={s.pointText}>{p}</p>
              </Reveal>
            ))}
          </div>
        )}

        {centred ? (
          <div
            id={`${id}-rail`}
            className={cn(s.flex, style === "chip" ? s.chips : sec.rail)}
            style={{ ["--cols" as string]: cols }}
          >
            {block.items.map((item, i) => (
              <Reveal key={item.title} y={24} duration={0.9} delay={(i % 4) * 0.06} className={s.flexCell}>
                <Card item={item} style={style} i={i} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div id={`${id}-rail`} className={cn(b.grid, sec.rail)}>
            {block.items.map((item, i) => (
              <Reveal key={item.title} y={28} duration={0.9} delay={(i % 4) * 0.06} style={spans[i]}>
                <Card item={item} style={style} i={i} />
              </Reveal>
            ))}
          </div>
        )}
        {style !== "chip" && <RailHint forId={`${id}-rail`} count={block.items.length} />}

        {block.note && (
          <Reveal y={16} duration={0.9}>
            <p className={s.note}>{block.note}</p>
          </Reveal>
        )}

        {block.more && (
          <div className={s.more}>
            <p className={s.moreHeading}>{block.more.heading}</p>
            <div className={cn(b.grid, s.moreGrid)}>
              {block.more.items.map((item, i) => (
                <Reveal key={item.title} y={20} duration={0.8} delay={i * 0.05} style={spanStyles(block.more!.items.length, block.more!.items.length)[i]}>
                  <article className={s.mini}>
                    <h3 className={s.miniTitle}>{item.title}</h3>
                    {item.text && <p className={s.miniText}>{item.text}</p>}
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {block.cta && (
          <Reveal y={20} duration={0.9} className={cn(b.ctaRow, (centred || block.note) && s.ctaCenter)}>
            <Button label={cta.label} shortLabel={cta.short} href="#contact" />
            <p className={b.ctaNote}>Fixed scope, a clear plan, and no obligation to continue.</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
