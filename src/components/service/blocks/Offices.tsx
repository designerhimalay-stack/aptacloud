// Offices (About, Careers): one card per location with its flag, city, address,
// and the local time there, ticking each minute. The time is set after mount so
// the server HTML never disagrees with the browser. Phones: a swipe rail.

import { useEffect, useState } from "react";
import { asset } from "@/brand/brand";
import { Reveal } from "@/components/ui/Reveal";
import type { Block } from "@/data/services/types";
import { cn } from "@/lib/utils";
import { Icon } from "../Icon";
import { RailHint } from "../RailHint";
import { SectionHead } from "../SectionHead";
import { toneProps, type Tone } from "../tone";
import sec from "../Section.module.css";
import s from "./Offices.module.css";

type OfficesBlock = Extract<Block, { kind: "offices" }>;

function useNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);
  return now;
}

const timeIn = (d: Date, timeZone: string) =>
  d.toLocaleTimeString("en-AU", { hour: "numeric", minute: "2-digit", timeZone }).replace(/\s?(am|pm)/i, (m) => ` ${m.trim().toLowerCase()}`);

export function Offices({ block, tone }: { block: OfficesBlock; tone: Tone }) {
  const id = block.id ?? "locations";
  const now = useNow();
  return (
    <section id={id} {...toneProps(tone)}>
      <div className={sec.container}>
        <SectionHead variant={block.head ?? "split"} tag={block.tag} icon={<Icon id={block.icon ?? "target"} />} heading={block.heading} lead={block.lead} />
        <div id={`${id}-rail`} className={cn(s.grid, sec.rail)} style={{ ["--n" as string]: block.items.length }}>
          {block.items.map((o, i) => (
            <Reveal key={o.city} y={28} duration={0.9} delay={i * 0.07} className={s.cell}>
              <article className={s.card}>
                <div className={s.top}>
                  <img src={asset(`/images/flags/${o.flag}.svg`)} alt="" width={28} height={21} className={s.flag} />
                  <span className={s.country}>{o.country}</span>
                  {o.label && <span className={s.label}>{o.label}</span>}
                </div>
                <h3 className={s.city}>{o.city}</h3>
                {o.address && <p className={s.address}>{o.address}</p>}
                <p className={s.time}>
                  <Icon id="clock" />
                  <span>{now ? timeIn(now, o.timeZone) : " "}</span>
                  <span className={s.local}>local time</span>
                </p>
              </article>
            </Reveal>
          ))}
        </div>
        <RailHint forId={`${id}-rail`} count={block.items.length} />
      </div>
    </section>
  );
}
