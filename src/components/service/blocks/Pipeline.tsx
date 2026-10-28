// Integration pipeline (Azure Implementation services): a flow strip from your
// systems to your data platform through named stages (Connect, Route, Process,
// Move data), each stage a plate with its Azure service icons; a packet travels
// the track. Under it, the services as cards tagged with their stage; pointing
// at a card lights its stage in the strip. The track is measured from the first
// to the last marker's centre (re-measured on resize), so it never runs past
// either end. Phones: the strip runs top to bottom; the cards become a rail.

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
import { spanStyles } from "./grid";
import { Card } from "./Cards";
import sec from "../Section.module.css";
import b from "./Blocks.module.css";
import s from "./Pipeline.module.css";

type PipelineBlock = Extract<Block, { kind: "pipeline" }>;

/** The track between the first and last [data-node] centres, horizontal or vertical. */
function useTrack(box: React.RefObject<HTMLDivElement | null>) {
  const [vars, setVars] = useState<Record<string, string>>({});
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const measure = () => {
      const nodes = el.querySelectorAll<HTMLElement>("[data-node]");
      if (nodes.length < 2) return;
      const o = el.getBoundingClientRect();
      const c = (n: HTMLElement) => {
        const r = n.getBoundingClientRect();
        return { x: r.left + r.width / 2 - o.left, y: r.top + r.height / 2 - o.top };
      };
      const a = c(nodes[0]);
      const z = c(nodes[nodes.length - 1]);
      const across = Math.abs(z.x - a.x) > Math.abs(z.y - a.y);
      setVars(
        across
          ? { "--t-x": `${a.x}px`, "--t-y": `${a.y}px`, "--t-w": `${z.x - a.x}px`, "--t-h": "2px" }
          : { "--t-x": `${a.x}px`, "--t-y": `${a.y}px`, "--t-w": "2px", "--t-h": `${z.y - a.y}px` },
      );
      el.dataset.axis = across ? "x" : "y";
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [box]);
  return vars;
}

export function Pipeline({ block, tone }: { block: PipelineBlock; tone: Tone }) {
  const id = block.id ?? "services";
  const strip = useRef<HTMLDivElement>(null);
  const track = useTrack(strip);
  const [lit, setLit] = useState<number | null>(null);
  const cards = block.stages.flatMap((st, si) => st.items.map((it) => ({ ...it, kicker: st.label, stage: si })));
  const spans = spanStyles(cards.length, 3);

  return (
    <section id={id} {...toneProps(tone)}>
      <div className={sec.container}>
        <SectionHead variant={block.head ?? "center"} tag={block.tag} icon={<Icon id={block.icon ?? "flow"} />} heading={block.heading} lead={block.lead} />

        <Reveal y={32} duration={1.1}>
          <div ref={strip} className={s.strip} style={track}>
            <span className={s.track} aria-hidden="true">
              <span className={s.packet} />
            </span>
            <span className={s.end} data-node>
              {block.ends[0]}
            </span>
            {block.stages.map((st, si) => (
              <div key={st.label} className={cn(s.stage, lit === si && s.lit)} data-node>
                <p className={s.stageLabel}>{st.label}</p>
                <span className={s.icons}>
                  {st.items.map((it) => (
                    <span key={it.title} className={s.icon} title={TECH[it.mark].name}>
                      <TechMark id={it.mark} />
                    </span>
                  ))}
                </span>
              </div>
            ))}
            <span className={s.end} data-node>
              {block.ends[1]}
            </span>
          </div>
        </Reveal>

        <div id={`${id}-rail`} className={cn(b.grid, sec.rail)}>
          {cards.map((it, i) => (
            <Reveal key={it.title} y={28} duration={0.9} delay={(i % 3) * 0.06} style={spans[i]}>
              <div className={s.cardWrap} onPointerEnter={() => setLit(it.stage)} onPointerLeave={() => setLit(null)}>
                <Card item={it} style="mark" i={i} />
              </div>
            </Reveal>
          ))}
        </div>
        <RailHint forId={`${id}-rail`} count={cards.length} />
      </div>
    </section>
  );
}
