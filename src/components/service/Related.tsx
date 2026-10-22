// Related services (deep dark, sits directly above the contact section on the
// same surface): the other pages in this category as photo link cards — each
// page's own hero photo (full colour, zooms on hover, as the industry cards), its
// name and one-line summary. Internal links for readers and search. Phones get a
// swipe rail.

import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { serviceHref } from "@/data/services";
import type { Category, ServicePhoto } from "@/data/services/types";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "./Icon";
import { RailHint } from "./RailHint";
import { toneProps, type Tone } from "./tone";
import sec from "./Section.module.css";
import s from "./Related.module.css";

export type RelatedPage = { slug: string; name: string; summary: string; photo: ServicePhoto };

export function Related({ category, siblings, tone = "dark" }: { category: Category; siblings: RelatedPage[]; tone?: Tone }) {
  return (
    <section aria-labelledby="related-title" {...toneProps(tone, "light", "deep")} className={cn(toneProps(tone, "light", "deep").className, s.section)}>
      <div className={sec.container}>
        <div className={s.head}>
          <div>
            <p className={s.kicker}>Keep exploring</p>
            <h2 id="related-title" className={s.title}>
              More in {category.name}
            </h2>
          </div>
          <p className={s.intro}>{category.intro}</p>
        </div>
        <div id="related-rail" className={cn(s.cards, sec.rail)} style={{ ["--n" as string]: siblings.length }}>
          {siblings.map((p, i) => (
            <Reveal key={p.slug} y={24} duration={0.9} delay={i * 0.06} amount={0} className={s.cell}>
              <a href={serviceHref(p.slug)} className={cn(s.card, "photo-host")}>
                <div className={s.thumb}>
                  <Photo
                    src={p.photo.src}
                    alt=""
                    position={p.photo.position}
                    tone="color"
                    sizes="(min-width: 1200px) 380px, 84vw"
                    className={s.photo}
                  />
                  <span className={s.arrow} aria-hidden="true">
                    <ArrowUpRight />
                  </span>
                </div>
                <div className={s.body}>
                  <span className={s.name}>{p.name}</span>
                  <span className={s.summary}>{p.summary}</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
        <RailHint forId="related-rail" count={siblings.length} />
      </div>
    </section>
  );
}
