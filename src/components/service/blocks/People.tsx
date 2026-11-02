// Leadership (About): executive portraits, names, roles, and focus badges.
// Clean, flat card system matching the home rhythm; phones: a swipe rail.

import { asset } from "@/brand/brand";
import { Reveal } from "@/components/ui/Reveal";
import type { Block } from "@/data/services/types";
import { cn } from "@/lib/utils";
import { Icon } from "../Icon";
import { RailHint } from "../RailHint";
import { SectionHead } from "../SectionHead";
import { toneProps, type Tone } from "../tone";
import sec from "../Section.module.css";
import s from "./People.module.css";

type PeopleBlock = Extract<Block, { kind: "people" }>;

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

export function People({ block, tone }: { block: PeopleBlock; tone: Tone }) {
  const id = block.id ?? "leadership";
  return (
    <section id={id} {...toneProps(tone)}>
      <div className={sec.container}>
        <SectionHead
          variant={block.head ?? "center"}
          tag={block.tag}
          icon={<Icon id={block.icon ?? "team"} />}
          heading={block.heading}
          lead={block.lead}
        />
        <div id={`${id}-rail`} className={cn(s.grid, sec.rail)} style={{ ["--n" as string]: block.items.length }}>
          {block.items.map((p, i) => (
            <Reveal key={p.name} y={28} duration={0.9} delay={i * 0.08} className={s.cell}>
              <article className={s.card}>
                <div className={s.photoWrap}>
                  {p.photo ? (
                    <img
                      src={asset(p.photo.src)}
                      alt={p.photo.alt}
                      loading="lazy"
                      decoding="async"
                      className={s.photo}
                      style={p.photo.position ? { objectPosition: p.photo.position } : undefined}
                    />
                  ) : (
                    <span className={s.mono} aria-hidden="true">
                      {initials(p.name)}
                    </span>
                  )}
                </div>
                <div className={s.body}>
                  <h3 className={s.name}>{p.name}</h3>
                  <p className={s.role}>{p.role}</p>
                  {p.text && <p className={s.text}>{p.text}</p>}
                  {p.badge && (
                    <div className={s.metaRow}>
                      <span className={s.badge}>{p.badge}</span>
                    </div>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <RailHint forId={`${id}-rail`} count={block.items.length} />
      </div>
    </section>
  );
}
