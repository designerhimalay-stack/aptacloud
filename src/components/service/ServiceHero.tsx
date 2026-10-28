// Service-page hero (dark), built like the home hero: accent glow + masked grid,
// a full-bleed duotone photo keyed to the brand dark on the left and bottom, the
// copy column (breadcrumb, category pill, two-line title with the accent tail,
// value lead, ONE primary CTA + a quiet text link, credential line), two glass
// chips floating over the photo that drift with the pointer, and the page's
// stack as a mono ticker along the bottom. Sub-page cues: breadcrumb and a
// shorter height. No form here: the contact form has its own section (#contact).

import { useEffect, useRef } from "react";
import { asset } from "@/brand/brand";
import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { PillTag } from "@/components/ui/PillTag";
import { Pulse } from "@/components/ui/Pulse";
import { LineReveal, Reveal } from "@/components/ui/Reveal";
import { Ticker } from "@/components/ui/Ticker";
import type { Category, ServicePage } from "@/data/services/types";
import { TECH } from "@/data/tech";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Icon } from "./Icon";
import { TechMark } from "./TechMark";
import s from "./ServiceHero.module.css";

const CATEGORY_ICON = {
  ai: "spark",
  data: "db",
  appmod: "layers",
  microsoft: "team",
  azure: "cloud",
  aws: "cloud",
  industries: "target",
  insurance: "shield",
  oilgas: "pipe",
  construction: "layers",
  company: "team",
} as const;

/** Writes --px / --py (−1…1, eased) from the pointer, as the home hero's chips. */
function usePointerDrift() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !matchMedia("(pointer: fine)").matches) return;
    let raf = 0;
    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    const tick = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      el.style.setProperty("--px", x.toFixed(4));
      el.style.setProperty("--py", y.toFixed(4));
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.001 ? requestAnimationFrame(tick) : 0;
    };
    const move = (e: PointerEvent) => {
      tx = (e.clientX / innerWidth) * 2 - 1;
      ty = (e.clientY / innerHeight) * 2 - 1;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    addEventListener("pointermove", move, { passive: true });
    return () => {
      removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);
  return ref;
}

export function ServiceHero({ page, category, howHref = "#process",
  ticker = true,
}: {
  page: ServicePage;
  category: Category;
  howHref?: string | null;
  /** Off on rebuilt pages: the stack ribbon sits under the stats band instead. */
  ticker?: boolean;
}) {
  const drift = usePointerDrift();
  const { hero } = page;
  // AWS pages credit AWS certification and the Well-Architected Framework instead of Microsoft.
  const aws = page.category === "aws";

  return (
    <section id="top" className={s.hero}>
      <div className={s.glow} aria-hidden="true" />
      <div className={s.grid} aria-hidden="true">
        <img src={asset("/images/hero/grid.svg")} alt="" width={1920} height={1080} className={s.gridImg} />
      </div>

      {/* Full-bleed photo behind the whole hero, as on the home page: duotone,
          keyed to the brand dark on the left (under the copy) and the bottom. */}
      <Reveal trigger="mount" delay={0.2} duration={1.4} y={0} className={s.backdrop}>
        <Photo
          src={hero.photo.src}
          alt={hero.photo.alt}
          sizes="100vw"
          priority
          position={hero.photo.position}
          className={s.bgPhoto}
        />
        <div className={s.fade} aria-hidden="true" />
      </Reveal>

      <div className={s.inner}>
        <div className={s.copy}>
          <Reveal trigger="mount" delay={0.05} y={12}>
            <nav aria-label="Breadcrumb">
              <ol className={s.crumbs}>
                <li>
                  <a href={asset("/")}>Home</a>
                </li>
                <li aria-hidden="true">/</li>
                <li>{category.name}</li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className={s.crumbNow}>
                  {page.name}
                </li>
              </ol>
            </nav>
          </Reveal>

          <Reveal trigger="mount" delay={0.1} className={s.pill}>
            <PillTag icon={<Icon id={CATEGORY_ICON[page.category]} />}>{page.name}</PillTag>
          </Reveal>

          {/* Always two lines (title, then the accent tail): each line is kept on
              one line and the size scales to the longer one (--chars). */}
          <LineReveal
            as="h1"
            trigger="mount"
            startDelay={0.15}
            className={cn("t-display", s.title)}
            lineClassName={s.titleLine}
            style={{ ["--chars" as string]: Math.max(hero.title.length, hero.accent.length) }}
          >
            <span>{hero.title}</span>
            <span style={{ color: "var(--accent)" }}>{hero.accent}</span>
          </LineReveal>

          <Reveal trigger="mount" delay={0.55}>
            <p className={cn("t-lead", s.lead)}>{hero.lead}</p>
          </Reveal>

          <Reveal trigger="mount" delay={0.68} className={s.actions}>
            <Button label={page.cta.label} shortLabel={page.cta.short} href="#contact" variant="primary" />
            {howHref && (
              <a href={howHref} className={s.textLink}>
                How we deliver
                <ArrowUpRight />
              </a>
            )}
          </Reveal>

          <Reveal trigger="mount" delay={0.8} className={s.creds}>
            <span className={s.cred}>
              <Pulse size={6} color="var(--accent)" />
              {aws ? "AWS-certified specialists" : "Microsoft-certified specialists"}
            </span>
            <span className={s.cred}>Proof of concept on your data</span>
          </Reveal>
        </div>

        {hero.chip && (
        <Reveal trigger="mount" delay={0.3} duration={1.2} y={24} className={s.visual}>
          <div ref={drift} className={s.stage}>
            {/* One glass console (home HUD language): title + logo stack, the
                deliverables as a checklist, and a quiet "built on" footer. */}
            <div className={s.console} style={{ ["--depth" as string]: "10px" }}>
              <div className={s.consoleHead}>
                <p className={s.consoleTitle}>
                  <Pulse size={6} color="var(--accent)" />
                  {hero.chip.title}
                </p>
                <span className={s.marks}>
                  {(hero.marks ?? []).map((id) => (
                    <span key={id} className={s.markTile} title={TECH[id].name}>
                      <TechMark id={id} />
                    </span>
                  ))}
                </span>
              </div>
              <ul className={s.consoleList}>
                {hero.chip.items.map((item) => (
                  <li key={item}>
                    <span className={s.tick} aria-hidden="true">
                      <svg viewBox="0 0 16 16" fill="none">
                        <path d="m3.5 8.25 3 3 6-6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className={s.consoleFoot}>
                <span>Delivered in six phases</span>
                <span className={s.status}>
                  <i aria-hidden="true" />
                  {aws ? "Well-Architected" : "Microsoft-first"}
                </span>
              </p>
            </div>
          </div>
        </Reveal>
        )}
      </div>

      {ticker && (
        <Ticker
          velocity={40}
          gap={40}
          className={s.ticker}
          items={page.stack.map((id) => (
            <p key={id} className={cn("t-label", s.tickerItem)}>
              <span style={{ color: "var(--accent)" }}>{"// "}</span>
              {TECH[id].name}
            </p>
          ))}
        />
      )}
    </section>
  );
}
