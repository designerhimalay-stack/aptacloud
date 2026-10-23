// Service hub (live Copilot Studio diagram): the product logo in the centre of
// a ring, the services as nodes around it. One service is active at a time and
// is shown in full in the detail card beside the ring; the active node fills
// with the accent and a spoke lights up to it. It steps through on its own
// (6s each, paused on hover/focus); hovering or clicking a node or a name
// jumps to it. Phones: the ring hides and the services sit on a swipe rail.

import { useEffect, useRef, useState } from "react";
import { asset } from "@/brand/brand";
import { Reveal } from "@/components/ui/Reveal";
import type { Block } from "@/data/services/types";
import { useInView, useReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Icon } from "../Icon";
import { RailHint } from "../RailHint";
import { SectionHead } from "../SectionHead";
import { toneProps, type Tone } from "../tone";
import sec from "../Section.module.css";
import s from "./Hub.module.css";

type HubBlock = Extract<Block, { kind: "hub" }>;
type HubItem = HubBlock["items"][number];

/** A service's product logo when it has one, otherwise its line icon. */
const Mark = ({ it }: { it: HubItem }) =>
  it.logo ? <img src={asset(it.logo)} alt="" loading="lazy" decoding="async" className={s.logo} /> : <Icon id={it.icon} />;

export function Hub({ block, tone }: { block: HubBlock; tone: Tone }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const n = block.items.length;
  const item = block.items[active];

  useEffect(() => {
    if (paused || reduce || !inView) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % n), 6000);
    return () => clearTimeout(t);
  }, [active, paused, reduce, inView, n]);

  return (
    <section id={block.id ?? "services"} {...toneProps(tone)}>
      <div className={sec.container}>
        <SectionHead variant={block.head ?? "center"} tag={block.tag} icon={<Icon id={block.icon ?? "spark"} />} heading={block.heading} lead={block.lead} />

        <Reveal y={32} duration={1.1}>
          <div
            ref={ref}
            className={s.stage}
            onPointerEnter={() => setPaused(true)}
            onPointerLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <div className={s.ring} aria-hidden="true">
              <span className={s.orbit} />
              <span className={s.orbitInner} />
              {block.items.map((it, i) => {
                const a = (i / n) * Math.PI * 2 - Math.PI / 2;
                const x = 50 + Math.cos(a) * 42;
                const y = 50 + Math.sin(a) * 42;
                return (
                  <span key={it.title}>
                    <span
                      className={cn(s.spoke, i === active && s.spokeOn)}
                      style={{ width: "42%", transform: `rotate(${(a * 180) / Math.PI}deg)` }}
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      className={cn(s.node, it.logo && s.nodeLogo, i === active && s.nodeOn)}
                      style={{ left: `${x}%`, top: `${y}%` }}
                      onMouseEnter={() => setActive(i)}
                      onClick={() => setActive(i)}
                    >
                      <Mark it={it} />
                    </button>
                  </span>
                );
              })}
              <span className={s.center}>
                <img src={asset(block.center.src)} alt="" className={s.centerLogo} />
              </span>
            </div>

            <div className={s.side}>
              <div key={active} className={s.detail}>
                <span className={s.detailNo}>
                  {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
                </span>
                <h3 className={s.detailTitle}>{item.title}</h3>
                <p className={s.detailText}>{item.text}</p>
              </div>
              <div className={s.names} role="tablist" aria-label={block.tag}>
                {block.items.map((it, i) => (
                  <button
                    key={it.title}
                    type="button"
                    role="tab"
                    aria-selected={i === active}
                    className={cn(s.name, i === active && s.nameOn)}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                  >
                    <Mark it={it} />
                    {it.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Phones: every service as a card on a swipe rail. */}
        <div id={`${block.id ?? "services"}-hub-rail`} className={cn(s.mobile, sec.rail)}>
          {block.items.map((it) => (
            <article key={it.title} className={s.mcard}>
              <span className={cn(s.micon, it.logo && s.miconLogo)}>
                <Mark it={it} />
              </span>
              <h3 className={s.mtitle}>{it.title}</h3>
              <p className={s.mtext}>{it.text}</p>
            </article>
          ))}
        </div>
        <RailHint forId={`${block.id ?? "services"}-hub-rail`} count={block.items.length} />
      </div>
    </section>
  );
}
