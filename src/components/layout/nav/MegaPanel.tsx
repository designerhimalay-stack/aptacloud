// Desktop mega panel — one shell for every nav menu: a black 24px-radius card under the
// pill, a 3-column grid of 20px-padded cells and a trust strip (the industries we serve
// + the Microsoft credential; deliberately no CTA, the promo card carries the panel's
// one action). Cells are built from
// three blocks only (see ./menus.ts): Tabs, Column and Promo, so Services, Industries
// and About share every size, type style and hover.

import { useEffect, useId, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { TRUST, asset } from "@/brand/brand";
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

/** Path of a nav href without trailing slash (for "you are here" matching). */
const pathOf = (href: string) => href.split("#")[0].replace(/\/$/, "");

function Column({
  column,
  onLink,
  current,
  panelProps,
}: {
  column: NavColumn;
  onLink: OnLink;
  current: string;
  panelProps?: object;
}) {
  return (
    <div className={cn(s.cell, s.column)} {...panelProps}>
      <p className={s.title}>{column.title}</p>
      {column.text && <p className={s.text}>{column.text}</p>}
      <ul className={s.links}>
        {column.links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              className={cn(s.link, current && pathOf(l.href) === current && s.linkCurrent)}
              aria-current={current && pathOf(l.href) === current ? "page" : undefined}
              onClick={(e) => onLink(e, l.href)}
            >
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
            src={asset(promo.logo)}
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
  const [current, setCurrent] = useState("");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // After hydration: mark the page we are on, and open its category's tab.
  useEffect(() => {
    const here = window.location.pathname.replace(/\/index\.html$/, "").replace(/\/$/, "");
    setCurrent(here);
    if (menu.kind !== "tabs") return;
    const owner = menu.tabs.find((t) => t.column.links.some((l) => pathOf(l.href) === here));
    if (owner) setTab(owner.id);
  }, [menu]);

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
                </button>
              );
            })}
          </div>
        </div>
        <Column
          key={active.id}
          column={active.column}
          onLink={onLink}
          current={current}
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
          <Column key={c.title} column={c} onLink={onLink} current={current} />
        ))}
      </>
    );
  }

  return (
    <div id={id} className={cn(s.panel, open && s.open)}>
      <div className={s.grid}>{cells}</div>
      <div className={s.footer}>
        <p className={s.footerText}>
          <span className={s.footerLead}>Built for</span>
          {TRUST.industries.map((name, i) => (
            <span key={name}>
              {i > 0 && <span className={s.footerDot} aria-hidden="true">·</span>}
              {name}
            </span>
          ))}
        </p>
        <p className={s.footerBadge}>
          <span className={s.footerPulse} aria-hidden="true" />
          {TRUST.credential}
        </p>
      </div>
    </div>
  );
}
