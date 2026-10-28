// Defence in depth (Azure Security services): the protection as nested
// rings, outermost layer first, each named on its band. One layer is active at
// a time: its band fills with the accent tint, and the panel beside the rings
// shows what it guards and the Azure services that do it. It steps through on
// its own (6s each, paused on hover or focus); pointing at a band or a name
// jumps to it. Phones: the rings hide and each layer is a card on a swipe rail.

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import type { Block } from "@/data/services/types";
import { useInView, useReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Icon } from "../Icon";
import { RailHint } from "../RailHint";
import { SectionHead } from "../SectionHead";
import { TechMark } from "../TechMark";
import { toneProps, type Tone } from "../tone";
import sec from "../Section.module.css";
import s from "./Layers.module.css";

type LayersBlock = Extract<Block, { kind: "layers" }>;
type Service = LayersBlock["layers"][number]["items"][number];

const ServiceRow = ({ it }: { it: Service }) => (
  <li className={s.svc}>
    <span className={s.svcMark}>{it.mark ? <TechMark id={it.mark} /> : <Icon id={it.icon ?? "spark"} />}</span>
    <div>
      <h4 className={s.svcTitle}>{it.title}</h4>
      <p className={s.svcText}>{it.text}</p>
    </div>
  </li>
);

export function Layers({ block, tone }: { block: LayersBlock; tone: Tone }) {
  const id = block.id ?? "services";
  const n = block.layers.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const layer = block.layers[active];
  // Each ring is inset by one band; the band is the outer radius split evenly
  // between the layers and a core twice as wide.
  const band = 50 / (n + 1);

  useEffect(() => {
    if (paused || reduce || !inView) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % n), 6000);
    return () => clearTimeout(t);
  }, [active, paused, reduce, inView, n]);

  return (
    <section id={id} {...toneProps(tone)}>
      <div className={sec.container}>
        <SectionHead variant={block.head ?? "center"} tag={block.tag} icon={<Icon id={block.icon ?? "shield"} />} heading={block.heading} lead={block.lead} />

        <Reveal y={32} duration={1.1}>
          <div
            ref={ref}
            className={s.stage}
            onPointerEnter={() => setPaused(true)}
            onPointerLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <div className={s.rings} aria-hidden="true">
              {block.layers.map((l, i) => (
                <button
                  key={l.label}
                  type="button"
                  tabIndex={-1}
                  className={cn(s.ring, i === active && s.ringOn)}
                  style={{ inset: `${i * band}%` }}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                >
                  {/* The name sits centred in the band's top strip. */}
                  <span className={s.ringLabel} style={{ top: `${((band / 2) / (100 - 2 * i * band)) * 100}%` }}>
                    {l.label}
                  </span>
                </button>
              ))}
              <span className={s.core} style={{ inset: `${n * band}%` }}>
                <Icon id={block.core ?? "shield"} />
              </span>
            </div>

            <div className={s.side}>
              <div key={active} className={s.detail}>
                <span className={s.detailNo}>
                  Layer {active + 1} of {n}
                </span>
                <h3 className={s.detailTitle}>{layer.label}</h3>
                <p className={s.detailText}>{layer.text}</p>
                <ul className={s.svcs}>
                  {layer.items.map((it) => (
                    <ServiceRow key={it.title} it={it} />
                  ))}
                </ul>
              </div>
              <div className={s.names} role="tablist" aria-label={block.tag}>
                {block.layers.map((l, i) => (
                  <button
                    key={l.label}
                    type="button"
                    role="tab"
                    aria-selected={i === active}
                    className={cn(s.name, i === active && s.nameOn)}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                  >
                    <span className={s.nameDot} />
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Phones: every layer as a card on a swipe rail. */}
        <div id={`${id}-layers-rail`} className={cn(s.mobile, sec.rail)}>
          {block.layers.map((l, i) => (
            <article key={l.label} className={s.mcard}>
              <span className={s.detailNo}>
                Layer {i + 1} of {n}
              </span>
              <h3 className={s.mtitle}>{l.label}</h3>
              <p className={s.mtext}>{l.text}</p>
              <ul className={s.svcs}>
                {l.items.map((it) => (
                  <ServiceRow key={it.title} it={it} />
                ))}
              </ul>
            </article>
          ))}
        </div>
        <RailHint forId={`${id}-layers-rail`} count={n} />
      </div>
    </section>
  );
}
