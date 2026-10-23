// Client logos (the live "Brands that trust us" row): a slow marquee of the
// clients' own logos on white plates, greyscale at rest, full colour on hover.

import { asset } from "@/brand/brand";
import { Reveal } from "@/components/ui/Reveal";
import { Ticker } from "@/components/ui/Ticker";
import type { Block } from "@/data/services/types";
import { Icon } from "../Icon";
import { SectionHead } from "../SectionHead";
import { toneProps, type Tone } from "../tone";
import sec from "../Section.module.css";
import s from "./Clients.module.css";

type ClientsBlock = Extract<Block, { kind: "clients" }>;

export function Clients({ block, tone }: { block: ClientsBlock; tone: Tone }) {
  const t = toneProps(tone);
  return (
    <section id={block.id ?? "clients"} {...t} className={`${t.className} ${s.section}`}>
      <div className={sec.container}>
        <SectionHead variant={block.head ?? "center"} tag={block.tag} icon={<Icon id={block.icon ?? "team"} />} heading={block.heading} lead={block.lead} />
      </div>
      {block.layout === "grid" ? (
        <div className={`${sec.container} ${s.grid}`}>
          {block.logos.map((l, i) => (
            <Reveal key={l.src} y={16} duration={0.8} delay={i * 0.05} className={s.gridCell}>
              <span className={s.plate} title={l.name}>
                <img src={asset(l.src)} alt={l.name} loading="lazy" decoding="async" className={s.logo} />
              </span>
            </Reveal>
          ))}
        </div>
      ) : (
      <Reveal y={20} duration={1}>
        <Ticker
          velocity={34}
          gap={8}
          className={s.ticker}
          items={block.logos.map((l) => (
            <span key={l.src} className={s.plate} title={l.name}>
              <img src={asset(l.src)} alt={l.name} loading="lazy" decoding="async" className={s.logo} />
            </span>
          ))}
        />
      </Reveal>
      )}
    </section>
  );
}
