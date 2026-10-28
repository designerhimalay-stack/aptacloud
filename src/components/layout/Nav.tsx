// Nav — a floating black pill: logo, links with the "( label )" hover, white CTA pill. The client PDF's nav has three items —
// Services · Industries · About — each opening a mega panel built from one shell
// (./nav/MegaPanel, content in ./nav/menus): desktop opens on hover or click; compact
// renders the same content as accordion groups inside the pill's panel.
// The region switcher (US · IN · UAE · AU) is its own pill at the top right, separate
// from the nav (desktop); on compact it becomes chips in the menu panel.
// Tablet/Phone (≤1199.98): logo + menu button; the pill itself grows into the menu panel.
// Behaviour: smooth anchor scroll and a menu guard (scroll lock, Esc closes, focus
// trap, closes when leaving the compact range).

import { useEffect, useId, useLayoutEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { BRAND, PRIMARY_CTA, asset } from "@/brand/brand";
import { Logo } from "@/brand/Logo";
import { RollingText } from "@/components/ui/RollingText";
import { cn } from "@/lib/utils";
import styles from "./Nav.module.css";
import { MENUS, type NavMenu } from "./nav/menus";
import { MegaPanel } from "./nav/MegaPanel";

// Region switcher (set default to Australia).
const REGIONS = [
  { code: "AU", label: "Australia", flag: "au" },
  { code: "US", label: "United States", flag: "us" },
  { code: "IN", label: "India", flag: "in" },
  { code: "UAE", label: "United Arab Emirates", flag: "ae" },
] as const;
type Region = (typeof REGIONS)[number]["code"];
const REGION_KEY = "site-region";

// The nav's one CTA reads "Let's talk" on every page and opens the page's contact
// form (CRO: the page-specific primary action lives in the hero and the form).
type NavCta = { label: string; href: string };
const DEFAULT_CTA: NavCta = { label: "Let's talk", href: PRIMARY_CTA.href };

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
const COMPACT_QUERY = "(max-width: 1199.98px)";
const CLOSE_DELAY = 140;

/** Smooth-scroll to an in-page anchor. */
function scrollToHash(href: string) {
  const id = href.slice(1);
  if (!id) return true; // placeholder link: stay put
  const target = document.getElementById(id);
  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  else if (id === "top") window.scrollTo({ top: 0, behavior: "smooth" });
  else return false;
  if (window.location.hash !== href) window.history.pushState(null, "", href);
  return true;
}

/** Nav link: the label, with brackets that fade in on hover — "( About )". */
function LinkLabel({ label, children }: { label: string; children?: ReactNode }) {
  return (
    <>
      <span className={styles.paren} aria-hidden="true">
        (
      </span>
      <span>{label}</span>
      {children}
      <span className={styles.paren} aria-hidden="true">
        )
      </span>
    </>
  );
}

function Chevron({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M3 4.5 6 7.5l3-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Arrow({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Globe({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M1.75 8h12.5M8 1.75c1.7 1.75 2.5 3.8 2.5 6.25S9.7 12.5 8 14.25C6.3 12.5 5.5 10.45 5.5 8S6.3 3.5 8 1.75Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Country flag (flag-icons, MIT): /images/flags/{code}.svg, 4:3. */
function Flag({ code, className }: { code: string; className?: string }) {
  return <img className={cn(styles.flag, className)} src={asset(`/images/flags/${code}.svg`)} alt="" width={20} height={15} />;
}

function Check({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="m3.5 8.25 3 3 6-6.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** True when `href` points at the page we are on (so a hash link should scroll). */
function onThisPage(url: URL) {
  const strip = (p: string) => p.replace(/\/index\.html$/, "/").replace(/\/$/, "");
  return url.origin === window.location.origin && strip(url.pathname) === strip(window.location.pathname);
}

export function Nav({ cta = DEFAULT_CTA }: { cta?: NavCta }) {
  const TALK = cta;
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState<string | null>(null); // desktop dropdown
  const [group, setGroup] = useState<string | null>(null); // compact accordion
  const [sub, setSub] = useState<string | null>(null); // compact Services category
  const barRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const regionRef = useRef<HTMLDivElement>(null);
  const [region, setRegion] = useState<Region>("AU");
  const closeTimer = useRef<number | undefined>(undefined);
  const hoveredAt = useRef(0);
  const hoverId = useRef<string | null>(null);
  const uid = useId();
  const sheetId = `${uid}-sheet`;

  // Menu guard: scroll lock, Esc to close, focus trap. Layout effect so the lock is
  // released synchronously when closing via flushSync (before scrolling to an anchor).
  useLayoutEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const body = document.body;
    const pill = pillRef.current;
    const toggle = toggleRef.current;
    const prevBody = body.style.overflow;
    const prevHtml = html.style.overflow;
    body.style.overflow = "hidden";
    html.style.overflow = "hidden";

    // The open pill is capped to the viewport in CSS and its link list scrolls
    // inside it (header row and CTA stay put), so the bar itself never scrolls.

    // On a service page, open Services at the current page's category.
    const here = window.location.pathname.replace(/\/$/, "");
    for (const m of MENUS) {
      if (m.kind !== "tabs") continue;
      const tab = m.tabs.find((t) => t.column.links.some((l) => l.href.replace(/\/$/, "") === here));
      if (tab) {
        setGroup(m.id);
        setSub(tab.id);
      }
    }

    const first = window.setTimeout(() => {
      sheetRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus({ preventScroll: true });
    }, 80);

    // Trap inside the whole pill: logo, close button and the panel.
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key === "Tab") {
        if (!pill) return;
        const items = Array.from(pill.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
          (el) => el.offsetParent !== null && getComputedStyle(el).visibility !== "hidden",
        );
        if (items.length === 0) return;
        const a = items[0];
        const z = items[items.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && (active === a || !pill.contains(active))) {
          e.preventDefault();
          z.focus();
        } else if (!e.shiftKey && (active === z || !pill.contains(active))) {
          e.preventDefault();
          a.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(first);
      window.removeEventListener("keydown", onKey);
      body.style.overflow = prevBody;
      html.style.overflow = prevHtml;
      setGroup(null);
      setSub(null);
      // After the commit: React restores focus to the (still mounted) panel link
      // at the end of the commit, which would undo a synchronous focus here.
      queueMicrotask(() => toggle?.focus({ preventScroll: true }));
    };
  }, [open]);

  // Desktop dropdown: Esc returns focus to its trigger; a press outside closes it.
  useEffect(() => {
    if (!drop) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const trigger = document.getElementById(`${uid}-${drop}-trigger`);
      setDrop(null);
      trigger?.focus({ preventScroll: true });
    };
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!linksRef.current?.contains(t) && !regionRef.current?.contains(t)) setDrop(null);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [drop, uid]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  // Restore the remembered region after hydration (server always renders the default).
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(REGION_KEY);
      if (REGIONS.some((r) => r.code === saved)) setRegion(saved as Region);
    } catch {
      /* storage blocked: keep the default */
    }
  }, []);

  const chooseRegion = (code: Region) => {
    setRegion(code);
    try {
      window.localStorage.setItem(REGION_KEY, code);
    } catch {
      /* storage blocked: the choice lasts for this visit */
    }
  };
  const current = REGIONS.find((r) => r.code === region) ?? REGIONS[0];
  const regionLabel = current.label;

  // The open state only exists on Tablet/Phone; leaving that range closes it.
  useEffect(() => {
    const mq = window.matchMedia(COMPACT_QUERY);
    const onChange = () => {
      if (!mq.matches) setOpen(false);
      else setDrop(null);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const onAnchorClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    setDrop(null);
    const url = new URL(href, window.location.href);
    // Another page: let the browser navigate (close the menu so bfcache restores it closed).
    if (!onThisPage(url)) {
      if (open) setOpen(false);
      return;
    }
    // Close first so the scroll lock is released before scrolling.
    if (open) flushSync(() => setOpen(false));
    if (scrollToHash(url.hash || "#top")) e.preventDefault();
  };

  // Hover intent: open at once, close after a short grace so the cursor can cross the gap.
  const hoverOpen = (id: string) => {
    window.clearTimeout(closeTimer.current);
    if (hoverId.current !== id || !drop) {
      hoverId.current = id;
      hoveredAt.current = performance.now();
    }
    setDrop(id);
  };
  // A click that lands right after the hover opened the panel keeps it open
  // (otherwise hover-then-click would immediately close it); later clicks toggle.
  const clickToggle = (id: string) => {
    const justHovered = hoverId.current === id && performance.now() - hoveredAt.current < 600;
    setDrop((d) => (justHovered ? id : d === id ? null : id));
  };
  const hoverClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => {
      hoverId.current = null;
      setDrop(null);
    }, CLOSE_DELAY);
  };

  // Compact menu: the same content as the desktop panels, stacked.
  const compactLinks = (links: { label: string; href: string }[]) => (
    <ul className={styles.groupList}>
      {links.map((l) => (
        <li key={l.label}>
          <a href={l.href} className={styles.groupLink} onClick={(e) => onAnchorClick(e, l.href)}>
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  );
  const accentLink = (l: { label: string; href: string }) => (
    <a href={l.href} className={cn(styles.groupLink, styles.groupLinkAccent)} onClick={(e) => onAnchorClick(e, l.href)}>
      {l.label}
      <Arrow className={styles.groupArrow} />
    </a>
  );
  const renderCompact = (menu: NavMenu) => {
    if (menu.kind === "tabs") {
      return (
        <>
          {menu.tabs.map((t) => {
            const on = sub === t.id;
            const subId = `${uid}-${menu.id}-${t.id}`;
            return (
              <div key={t.id} className={styles.subGroup}>
                <button
                  type="button"
                  className={cn(styles.subHead, on && styles.current)}
                  aria-expanded={on}
                  aria-controls={subId}
                  onClick={() => setSub((v) => (v === t.id ? null : t.id))}
                >
                  <span>{t.label}</span>
                  <span className={styles.groupIcon} aria-hidden="true" />
                </button>
                <div id={subId} className={cn(styles.groupWrap, on && styles.groupOpen)}>
                  <div className={styles.groupInner}>
                    {compactLinks(t.column.links)}
                    {accentLink(t.promo.cta)}
                  </div>
                </div>
              </div>
            );
          })}
        </>
      );
    }
    return (
      <>
        {menu.lead && (
          <div className={styles.section}>
            <p className={styles.sectionText}>{menu.lead.text}</p>
            {accentLink(menu.lead.cta)}
          </div>
        )}
        {menu.columns.map((c) => (
          <div key={c.title} className={styles.section}>
            <p className={styles.sectionTitle}>{c.title}</p>
            {compactLinks(c.links)}
          </div>
        ))}
      </>
    );
  };

  return (
    <div ref={barRef} className={styles.bar}>
      <nav
        ref={pillRef}
        className={cn(styles.pill, open && styles.open)}
        aria-label="Main"
      >
        <div className={styles.row}>
          <a
            href={asset("/")}
            className={styles.logo}
            aria-label={`${BRAND.name}, home`}
            onClick={(e) => onAnchorClick(e, asset("/"))}
          >
            <Logo height={30} />
          </a>

          <ul ref={linksRef} className={cn(styles.links, drop && styles.linksActive)}>
            {MENUS.map((menu) => {
              const isOpen = drop === menu.id;
              const panelId = `${uid}-${menu.id}-panel`;
              return (
                <li
                  key={menu.id}
                  className={styles.item}
                  onPointerEnter={(e) => e.pointerType !== "touch" && hoverOpen(menu.id)}
                  onPointerLeave={(e) => e.pointerType !== "touch" && hoverClose()}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node | null))
                      setDrop((d) => (d === menu.id ? null : d));
                  }}
                >
                  <button
                    id={`${uid}-${menu.id}-trigger`}
                    type="button"
                    className={cn(styles.link, styles.trigger, isOpen && styles.current)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => clickToggle(menu.id)}
                  >
                    <LinkLabel label={menu.label}>
                      <Chevron className={styles.chev} />
                    </LinkLabel>
                  </button>

                  <MegaPanel menu={menu} id={panelId} open={isOpen} onLink={onAnchorClick} />
                </li>
              );
            })}
          </ul>

          <a
            href={TALK.href}
            className={cn("roll-host", styles.cta, styles.ctaDesktop)}
            onClick={(e) => onAnchorClick(e, TALK.href)}
          >
            <RollingText text={TALK.label} />
          </a>

          <button
            ref={toggleRef}
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls={sheetId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={styles.line1} />
            <span className={styles.line2} />
          </button>
        </div>

        <div className={styles.sheetWrap}>
          <div ref={sheetRef} id={sheetId} className={styles.sheet}>
            <ul className={styles.sheetLinks}>
              {MENUS.map((menu, i) => {
                const isOpen = group === menu.id;
                const listId = `${uid}-${menu.id}-group`;
                return (
                  <li key={menu.id} style={{ transitionDelay: open ? `${0.08 + i * 0.05}s` : "0s" }}>
                    <button
                      type="button"
                      className={cn(styles.sheetLink, styles.groupHead, isOpen && styles.current)}
                      aria-expanded={isOpen}
                      aria-controls={listId}
                      onClick={() => setGroup((g) => (g === menu.id ? null : menu.id))}
                    >
                      <span className={styles.groupLabel}>
                        <LinkLabel label={menu.label} />
                      </span>
                      <span className={styles.groupIcon} aria-hidden="true" />
                    </button>
                    <div id={listId} className={cn(styles.groupWrap, isOpen && styles.groupOpen)}>
                      <div className={styles.groupInner}>{renderCompact(menu)}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className={styles.sheetRegion}>
              <p className={styles.sheetRegionLabel}>
                <Globe className={styles.globe} />
                Region
              </p>
              <div className={styles.chips} role="group" aria-label="Region">
                {REGIONS.map((r) => (
                  <button
                    key={r.code}
                    type="button"
                    className={cn(styles.chip, r.code === region && styles.chipOn)}
                    aria-pressed={r.code === region}
                    aria-label={r.label}
                    onClick={() => chooseRegion(r.code)}
                  >
                    <Flag code={r.flag} />
                    {r.code}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.sheetCtas}>
              <a href={TALK.href} className={cn("roll-host", styles.cta)} onClick={(e) => onAnchorClick(e, TALK.href)}>
                <RollingText text={TALK.label} />
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div
        ref={regionRef}
        className={styles.regionDock}
        onPointerEnter={(e) => e.pointerType !== "touch" && hoverOpen("region")}
        onPointerLeave={(e) => e.pointerType !== "touch" && hoverClose()}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setDrop((d) => (d === "region" ? null : d));
        }}
      >
        <button
          id={`${uid}-region-trigger`}
          type="button"
          className={cn(styles.regionBtn, drop === "region" && styles.current)}
          aria-expanded={drop === "region"}
          aria-controls={`${uid}-region-panel`}
          aria-label={`Region: ${regionLabel}`}
          onClick={() => clickToggle("region")}
        >
          <Flag code={current.flag} />
          <span>{region}</span>
          <Chevron className={styles.chev} />
        </button>
        <div
          id={`${uid}-region-panel`}
          className={cn(styles.drop, styles.dropRegion, drop === "region" && styles.dropOpen)}
        >
          <p className={styles.dropHead}>Select your region</p>
          <ul className={styles.dropList}>
            {REGIONS.map((r) => {
              const on = r.code === region;
              return (
                <li key={r.code}>
                  <button
                    type="button"
                    className={cn(styles.dropLink, styles.regionOpt, on && styles.regionOn)}
                    aria-pressed={on}
                    onClick={() => {
                      chooseRegion(r.code);
                      setDrop(null);
                      document.getElementById(`${uid}-region-trigger`)?.focus({ preventScroll: true });
                    }}
                  >
                    <Flag code={r.flag} className={styles.flagLg} />
                    <span className={cn(styles.dropText, styles.regionText)}>
                      <span className={styles.dropTitle}>{r.label}</span>
                      <span className={styles.dropDesc}>{r.code}</span>
                    </span>
                    <span className={styles.regionCheck}>{on && <Check />}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
