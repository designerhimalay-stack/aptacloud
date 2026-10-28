// Events: the next event as a feature card (photo, dates, venue, what we will
// be there for, and links to the event and its registration), then past events
// as dated rows on one card. Dates are ISO in the data and shown in Australian
// order ("3–4 November 2026").

import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import type { Block } from "@/data/services/types";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Icon } from "../Icon";
import { SectionHead } from "../SectionHead";
import { toneProps, type Tone } from "../tone";
import sec from "../Section.module.css";
import s from "./Events.module.css";

type EventsBlock = Extract<Block, { kind: "events" }>;

const day = (iso: string) => new Date(`${iso}T00:00:00`);
const month = (d: Date) => d.toLocaleDateString("en-AU", { month: "long" });

/** "3–4 November 2026", or "30 March – 1 April 2026" across months. */
export function dateRange(start: string, end: string) {
  const a = day(start);
  const b = day(end);
  if (start === end) return `${a.getDate()} ${month(a)} ${a.getFullYear()}`;
  if (a.getMonth() === b.getMonth()) return `${a.getDate()}–${b.getDate()} ${month(a)} ${a.getFullYear()}`;
  return `${a.getDate()} ${month(a)} – ${b.getDate()} ${month(b)} ${b.getFullYear()}`;
}

export function Events({ block, tone }: { block: EventsBlock; tone: Tone }) {
  const { next, past } = block;
  return (
    <section id={block.id ?? "events"} {...toneProps(tone)}>
      <div className={sec.container}>
        <SectionHead variant={block.head ?? "split"} tag={block.tag} icon={<Icon id={block.icon ?? "clock"} />} heading={block.heading} lead={block.lead} />

        {next && (
          <Reveal y={32} duration={1.1}>
            <article className={s.next}>
              <div className={s.media}>
                <Photo src={next.photo.src} alt={next.photo.alt} position={next.photo.position} tone="color" sizes="(min-width: 1200px) 560px, 92vw" className={s.photo} />
              </div>
              <div className={s.body}>
                <p className={s.kicker}>
                  <span className={s.dot} aria-hidden="true" />
                  Next event
                </p>
                <p className={s.date}>{dateRange(next.start, next.end)}</p>
                <h3 className={s.name}>{next.name}</h3>
                <p className={s.venue}>
                  <Icon id="target" />
                  {next.venue}
                </p>
                <p className={s.text}>{next.text}</p>
                <div className={s.links}>
                  <a href={next.href} className={s.link}>
                    Event details
                    <ArrowUpRight />
                  </a>
                  {next.register && (
                    <a href={next.register} className={s.link} target="_blank" rel="noopener noreferrer">
                      Register with the organiser
                      <ArrowUpRight />
                    </a>
                  )}
                </div>
              </div>
            </article>
          </Reveal>
        )}

        {past.length > 0 && (
          <Reveal y={28} duration={1}>
            <div className={s.past}>
              <p className={s.pastHead}>Past events</p>
              <ul className={s.rows}>
                {past.map((e) => {
                  const inner = (
                    <>
                      <span className={s.rowDate}>{dateRange(e.start, e.end)}</span>
                      <span className={s.rowName}>{e.name}</span>
                      <span className={s.rowVenue}>{e.venue}</span>
                    </>
                  );
                  return (
                    <li key={e.name}>
                      {e.href ? (
                        <a href={e.href} className={cn(s.row, s.rowLink)}>
                          {inner}
                          <ArrowUpRight />
                        </a>
                      ) : (
                        <div className={s.row}>{inner}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        )}

        {block.all && (
          <a href={block.all} className={s.all}>
            All events
            <ArrowUpRight />
          </a>
        )}
      </div>
    </section>
  );
}
