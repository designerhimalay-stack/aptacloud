// Desktop mega panel — one shell for every nav menu: a black 24px-radius card under the
// pill, a 3-column grid of 20px-padded cells and a footer strip. Cells are built from
// three blocks only (see ./menus.ts): Tabs, Column and Promo, so Services, Industries
// and About share every size, type style and hover.

import { useId, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { Logo } from "@/brand/Logo";
import { cn } from "@/lib/utils";
import type { NavColumn, NavMenu, NavPromo } from "./menus";
import s from "./MegaPanel.module.css";

type OnLink = (e: MouseEvent<HTMLAnchorElement>, href: string) => void;

export function Arrow({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Column({ column, onLink, panelProps }: { column: NavColumn; onLink: OnLink; panelProps?: object }) {
  return (
    <div className={cn(s.cell, s.column)} {...panelProps}>
      <p className={s.title}>{column.title}</p>
      {column.text && <p className={s.text}>{column.text}</p>}
      <ul className={s.links}>
        {column.links.map((l) => (
          <li key={l.label}>
            <a href={l.href} className={s.link} onClick={(e) => onLink(e, l.href)}>
              <span>{l.label}</span>
              <Arrow className={s.linkArrow} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Promo({ promo, onLink }: { promo: NavPromo; onLink: OnLink }) {
  return (
    <div className={cn(s.cell, s.promo)}>
      <span className={s.glow} aria-hidden="true" />
      <div className={s.promoLogo}>
        {promo.logo === "mark" ? (
          <Logo height={26} theme="dark" />
        ) : (
          <img
            src={promo.logo}
            alt={promo.logoAlt}
            height={26}
            style={{ height: "26px", width: "auto", display: "block", objectFit: "contain" }}
          />
        )}
      </div>
      <div className={s.promoBody}>
        <p className={s.eyebrow}>{promo.eyebrow}</p>
        <p className={s.title}>{promo.title}</p>
        <p className={s.text}>{promo.text}</p>
      </div>
      <a href={promo.cta.href} className={s.promoCta} onClick={(e) => onLink(e, promo.cta.href)}>
        <span>{promo.cta.label}</span>
        <span className={s.promoArrow}>
          <Arrow />
        </span>
      </a>
    </div>
  );
}

export function MegaPanel({ menu, id, open, onLink }: { menu: NavMenu; id: string; open: boolean; onLink: OnLink }) {
  const uid = useId();
  const [tab, setTab] = useState(menu.kind === "tabs" ? menu.tabs[0].id : "");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (menu.kind !== "tabs") return;
    const n = menu.tabs.length;
    const next = e.key === "ArrowDown" ? (i + 1) % n : e.key === "ArrowUp" ? (i - 1 + n) % n : -1;
    if (next < 0) return;
    e.preventDefault();
    setTab(menu.tabs[next].id);
    tabRefs.current[next]?.focus();
  };

  let cells;
  if (menu.kind === "tabs") {
    const active = menu.tabs.find((t) => t.id === tab) ?? menu.tabs[0];
    cells = (
      <>
        <div className={cn(s.cell, s.tabsCell)}>
          <p className={s.label}>{menu.tabsTitle}</p>
          <div className={s.tabs} role="tablist" aria-orientation="vertical" aria-label={menu.label}>
            {menu.tabs.map((t, i) => {
              const on = t.id === active.id;
              return (
                <button
                  key={t.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  id={`${uid}-tab-${t.id}`}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls={`${uid}-tabpanel`}
                  tabIndex={on ? 0 : -1}
                  className={cn(s.tab, on && s.tabOn)}
                  onPointerEnter={(e) => e.pointerType !== "touch" && setTab(t.id)}
                  onFocus={() => setTab(t.id)}
                  onClick={() => setTab(t.id)}
                  onKeyDown={(e) => onTabKey(e, i)}
                >
                  <span>{t.label}</span>
                  <span className={s.tabCount}>{String(t.column.links.length).padStart(2, "0")}</span>
                </button>
              );
            })}
          </div>
        </div>
        <Column
          key={active.id}
          column={active.column}
          onLink={onLink}
          panelProps={{ id: `${uid}-tabpanel`, role: "tabpanel", "aria-labelledby": `${uid}-tab-${active.id}` }}
        />
        <Promo key={`${active.id}-promo`} promo={active.promo} onLink={onLink} />
      </>
    );
  } else {
    cells = (
      <>
        {menu.lead && <Promo promo={menu.lead} onLink={onLink} />}
        {menu.columns.map((c) => (
          <Column key={c.title} column={c} onLink={onLink} />
        ))}
      </>
    );
  }

  return (
    <div id={id} className={cn(s.panel, open && s.open)}>
      <div className={s.grid}>{cells}</div>
      <div className={s.footer}>
        <p className={s.footerText}>{menu.footer.text}</p>
        <a href={menu.footer.link.href} className={s.footerLink} onClick={(e) => onLink(e, menu.footer.link.href)}>
          <span>{menu.footer.link.label}</span>
          <Arrow className={s.footerArrow} />
        </a>
      </div>
    </div>
  );
}
