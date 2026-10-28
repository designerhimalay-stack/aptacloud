// White papers: each paper as a feature card, its cover on the left (shown like
// a printed report) and its topic, title, summary, what it covers, and a link
// to read it on the right.

import { asset } from "@/brand/brand";
import { Reveal } from "@/components/ui/Reveal";
import type { Block } from "@/data/services/types";
import { ArrowUpRight, Icon } from "../Icon";
import { SectionHead } from "../SectionHead";
import { toneProps, type Tone } from "../tone";
import sec from "../Section.module.css";
import s from "./Papers.module.css";

type PapersBlock = Extract<Block, { kind: "papers" }>;

export function Papers({ block, tone }: { block: PapersBlock; tone: Tone }) {
  return (
    <section id={block.id ?? "papers"} {...toneProps(tone)}>
      <div className={sec.container}>
        <SectionHead variant={block.head ?? "split"} tag={block.tag} icon={<Icon id={block.icon ?? "doc"} />} heading={block.heading} lead={block.lead} />
        {block.items.map((p) => (
          <Reveal key={p.title} y={32} duration={1.1}>
            <article className={s.paper}>
              <div className={s.stage}>
                <img src={asset(p.cover.src)} alt={p.cover.alt} loading="lazy" decoding="async" className={s.cover} />
              </div>
              <div className={s.body}>
                <p className={s.topic}>{p.topic}</p>
                <h3 className={s.title}>{p.title}</h3>
                <p className={s.summary}>{p.summary}</p>
                <p className={s.listHead}>What it covers</p>
                <ul className={s.points}>
                  {p.points.map((pt) => (
                    <li key={pt}>
                      <span className={s.tick} aria-hidden="true">
                        <svg viewBox="0 0 16 16" fill="none">
                          <path d="m3.5 8.25 3 3 6-6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {pt}
                    </li>
                  ))}
                </ul>
                <a href={p.href} className={s.link}>
                  Read the white paper
                  <ArrowUpRight />
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
