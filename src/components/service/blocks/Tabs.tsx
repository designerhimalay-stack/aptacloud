// Tabbed panel (the live "industry-specific AI agents" block): pill tabs on
// top; the panel shows the tab's photo beside its list of items. Switching
// tabs cross-fades the panel and slides the list in. Keyboard: arrow keys move
// between tabs (WAI-ARIA tabs pattern).

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import type { Block } from "@/data/services/types";
import { cn } from "@/lib/utils";
import { Icon } from "../Icon";
import { SectionHead } from "../SectionHead";
import { toneProps, type Tone } from "../tone";
import sec from "../Section.module.css";
import s from "./Tabs.module.css";

type TabsBlock = Extract<Block, { kind: "tabs" }>;

export function Tabs({ block, tone }: { block: TabsBlock; tone: Tone }) {
  const [active, setActive] = useState(0);
  const uid = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const tab = block.tabs[active];

  const onKey = (e: KeyboardEvent) => {
    const n = block.tabs.length;
    const next = e.key === "ArrowRight" ? (active + 1) % n : e.key === "ArrowLeft" ? (active - 1 + n) % n : -1;
    if (next < 0) return;
    e.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <section id={block.id ?? "by-industry"} {...toneProps(tone)}>
      <div className={sec.container}>
        <SectionHead variant={block.head ?? "split"} tag={block.tag} icon={<Icon id={block.icon ?? "target"} />} heading={block.heading} lead={block.lead} />

        <Reveal y={24} duration={1} className={s.tabs} role="tablist" aria-label={block.tag} onKeyDown={onKey}>
          {block.tabs.map((t, i) => (
            <button
              key={t.label}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${uid}-tab-${i}`}
              aria-selected={i === active}
              aria-controls={`${uid}-panel`}
              tabIndex={i === active ? 0 : -1}
              className={cn(s.tab, i === active && s.on)}
              onClick={() => setActive(i)}
            >
              {t.label}
            </button>
          ))}
        </Reveal>

        <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${active}`} className={s.panel}>
          <div key={`m-${active}`} className={cn(s.media, s.fade, "photo-host")}>
            <Photo src={tab.photo.src} alt={tab.photo.alt} position={tab.photo.position} tone="color" sizes="(min-width: 810px) 520px, 100vw" className={s.photo} />
          </div>
          <div key={`c-${active}`} className={cn(s.content, s.fade)}>
            {tab.intro && <p className={s.intro}>{tab.intro}</p>}
            <ul className={s.items}>
              {tab.items.map((it, i) => (
                <li key={it.title} className={s.item} style={{ ["--i" as string]: i }}>
                  <span className={s.icon} aria-hidden="true">
                    {block.itemIcon ? (
                      <Icon id={block.itemIcon} />
                    ) : (
                      <svg viewBox="0 0 16 16" fill="none">
                        <path d="m3.5 8.25 3 3 6-6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <div>
                    <h3 className={s.itemTitle}>{it.title}</h3>
                    <p className={s.itemText}>{it.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
