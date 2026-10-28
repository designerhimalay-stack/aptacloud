// Migration map (Azure Migration services): where workloads run today on the
// left, the Azure landing point in the middle, and what they land as on the
// right, joined by wires that carry a moving dash toward Azure. Wires are
// measured from the real pill and hub edges (re-measured on resize), so each
// one starts and ends exactly on its marker. The services follow as centred
// cards, each with its Azure product icon. Phones: the map stacks top to
// bottom with a short rail between groups, and the cards become a swipe rail.

import { useEffect, useRef, useState } from "react";
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
import c from "./Cards.module.css";
import s from "./Map.module.css";

type MapBlock = Extract<Block, { kind: "map" }>;

/** Horizontal S-curve between two points. */
const wire = (x1: number, y1: number, x2: number, y2: number) => {
  const k = (x2 - x1) * 0.55;
  return `M${x1} ${y1} C${x1 + k} ${y1}, ${x2 - k} ${y2}, ${x2} ${y2}`;
};

function useWires(stage: React.RefObject<HTMLDivElement | null>) {
  const [box, setBox] = useState({ w: 0, h: 0, d: [] as string[] });
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const measure = () => {
      const o = el.getBoundingClientRect();
      const hub = el.querySelector<HTMLElement>("[data-hub]")?.getBoundingClientRect();
      if (!hub || o.width < 810) return setBox({ w: 0, h: 0, d: [] });
      const hy = hub.top + hub.height / 2 - o.top;
      const d: string[] = [];
      el.querySelectorAll<HTMLElement>("[data-from]").forEach((p) => {
        const r = p.getBoundingClientRect();
        d.push(wire(r.right - o.left, r.top + r.height / 2 - o.top, hub.left - o.left, hy));
      });
      el.querySelectorAll<HTMLElement>("[data-to]").forEach((p) => {
        const r = p.getBoundingClientRect();
        d.push(wire(hub.right - o.left, hy, r.left - o.left, r.top + r.height / 2 - o.top));
      });
      setBox({ w: o.width, h: o.height, d });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [stage]);
  return box;
}

export function MigrationMap({ block, tone }: { block: MapBlock; tone: Tone }) {
  const id = block.id ?? "services";
  const stage = useRef<HTMLDivElement>(null);
  const wires = useWires(stage);

  return (
    <section id={id} {...toneProps(tone)}>
      <div className={sec.container}>
        <SectionHead variant={block.head ?? "center"} tag={block.tag} icon={<Icon id={block.icon ?? "migrate"} />} heading={block.heading} lead={block.lead} />

        <Reveal y={32} duration={1.1}>
          <div ref={stage} className={s.stage}>
            {wires.w > 0 && (
              <svg className={s.wires} width={wires.w} height={wires.h} viewBox={`0 0 ${wires.w} ${wires.h}`} aria-hidden="true">
                {wires.d.map((d) => (
                  <path key={`b${d}`} d={d} className={s.wire} />
                ))}
                {wires.d.map((d, i) => (
                  <path key={`f${d}`} d={d} className={s.flow} style={{ animationDelay: `${(i % 4) * -0.45}s` }} />
                ))}
              </svg>
            )}

            <div className={cn(s.col, s.colFrom)}>
              <p className={s.colLabel}>{block.labels?.[0] ?? "Where it runs today"}</p>
              <ul className={s.pills}>
                {block.from.map((f) => (
                  <li key={f.label} className={s.pill} data-from>
                    <span className={s.pillIcon}>
                      <Icon id={f.icon} />
                    </span>
                    {f.label}
                  </li>
                ))}
              </ul>
            </div>

            <div className={s.hubCol}>
              <span className={s.hub} data-hub title={TECH[block.hub.mark].name}>
                <TechMark id={block.hub.mark} className={s.hubMark} />
              </span>
              <p className={s.hubLabel}>{block.hub.label}</p>
            </div>

            <div className={cn(s.col, s.colTo)}>
              <p className={s.colLabel}>{block.labels?.[1] ?? "Where it lands on Azure"}</p>
              <ul className={s.pills}>
                {block.to.map((t) => (
                  <li key={t.label} className={cn(s.pill, s.pillTo)} data-to>
                    <span className={s.pillMark}>
                      <TechMark id={t.mark} />
                    </span>
                    {t.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <div id={`${id}-rail`} className={cn(c.flex, sec.rail)} style={{ ["--cols" as string]: block.cols ?? 4 }}>
          {block.items.map((item, i) => (
            <Reveal key={item.title} y={24} duration={0.9} delay={(i % 4) * 0.06} className={c.flexCell}>
              <Card item={item} style="centered" i={i} />
            </Reveal>
          ))}
        </div>
        <RailHint forId={`${id}-rail`} count={block.items.length} />
      </div>
    </section>
  );
}
