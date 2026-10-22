// Industries (deep dark): the three verticals we serve as framed photo cards in
// the home Workshop's language — photo on top (zooms on hover), then the
// industry, this service's use case and its outcome on a plain panel. Each card
// links to the industry page. Phones get a swipe rail.

import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { INDUSTRIES } from "@/data/services/shared";
import type { IndustryId, ServicePage } from "@/data/services/types";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Icon } from "./Icon";
import { RailHint } from "./RailHint";
import { SectionHead } from "./SectionHead";
import { toneProps, type Tone } from "./tone";
import sec from "./Section.module.css";
import s from "./Industries.module.css";

const ORDER: IndustryId[] = ["insurance", "oilgas", "construction"];

export function Industries({ industries, tone = "dark" }: { industries: ServicePage["industries"]; tone?: Tone }) {
  return (
    <section id="industries" {...toneProps(tone, "light", "deep")}>
      <div className={sec.container}>
        <SectionHead variant="split" tag="Industries" icon={<Icon id="target" />} heading={industries.heading} lead={industries.lead} />

        <ul id="industries-rail" className={cn(s.cards, sec.rail)}>
          {ORDER.map((id, i) => {
            const ind = INDUSTRIES[id];
            const item = industries.items[id];
            return (
              <li key={id} className={s.cell}>
                <Reveal y={30} duration={1} delay={i * 0.08} amount={0} className={s.reveal}>
                  <a href={ind.href} className={cn(s.card, "photo-host")}>
                    <div className={s.thumb}>
                      <Photo
                        src={ind.photo.src}
                        alt={ind.photo.alt}
                        position={ind.photo.position}
                        tone="color"
                        sizes="(min-width: 1200px) 380px, (min-width: 810px) 33vw, 84vw"
                        className={s.photo}
                      />
                      <span className={s.arrow} aria-hidden="true">
                        <ArrowUpRight />
                      </span>
                    </div>
                    <div className={s.body}>
                      <p className={s.name}>{ind.name}</p>
                      <p className={s.segments}>{ind.segments}</p>
                      <h3 className={s.useCase}>{item.useCase}</h3>
                      <p className={s.outcome}>{item.outcome}</p>
                    </div>
                  </a>
                </Reveal>
              </li>
            );
          })}
        </ul>
        <RailHint forId="industries-rail" count={ORDER.length} />
      </div>
    </section>
  );
}
