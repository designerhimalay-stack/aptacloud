// Agentcraft Hero: eyebrow, title, lead and buttons over a grid backdrop +
// glow, with the service ticker along the bottom (the stats row lives in
// site/Stats, as in the PDF's About section). A full-bleed duotone photo sits
// behind the whole hero, fading to the brand dark on the left and bottom, with two
// HUD chips floating over it (site/hero/AgentConsole.tsx).

import { BRAND, PRIMARY_CTA, asset } from "@/brand/brand";
import { Button } from "@/components/ui/Button";
import { LineReveal, Reveal } from "@/components/ui/Reveal";
import { Ticker } from "@/components/ui/Ticker";
import { PillTag } from "@/components/ui/PillTag";
import { Photo } from "@/components/ui/Photo";
import { cn } from "@/lib/utils";
import { AgentConsole } from "./hero/AgentConsole";
import styles from "./Hero.module.css";

const ACCENT = "var(--accent)";
// The PDF's offerings: Cloud, Data, IT, AI and the Microsoft services it lists.
const TICKER_WORDS = [
  "Cloud",
  "Data",
  "IT",
  "AI",
  "Dynamics 365",
  "Microsoft 365",
  "SharePoint",
  "Copilot",
  "Power Platform",
  "Azure",
];

export function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <div className={styles.glow} />

      <div className={styles.grid}>
        <img src={asset("/images/hero/grid.svg")} alt="" width={1920} height={1080} className={styles.gridImg} />
      </div>

      <Reveal trigger="mount" delay={0.2} duration={1.4} y={0} className={styles.backdrop}>
        <Photo
          src="/images/photos/hero-developer.jpg"
          alt=""
          sizes="100vw"
          priority
          position="68% 50%"
          className={styles.bgPhoto}
        />
        <div className={styles.fade} aria-hidden="true" />
      </Reveal>

      <div className={styles.inner}>
        <div className={styles.copy}>
          <Reveal trigger="mount" delay={0.1} className={styles.eyebrow}>
            <PillTag icon={<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M8.75 3.25c.45 3.05 1.85 4.75 4.75 5.5-2.9.75-4.3 2.45-4.75 5.5-.45-3.05-1.85-4.75-4.75-5.5 2.9-.75 4.3-2.45 4.75-5.5Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" /><path d="M15 12.25c.2 1.2.65 1.65 1.75 1.85-1.1.2-1.55.65-1.75 1.85-.2-1.2-.65-1.65-1.75-1.85 1.1-.2 1.55-.65 1.75-1.85Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" /></svg>}>Microsoft-certified cloud, data &amp; AI</PillTag>
          </Reveal>

          <div className={styles.space18} />

          <LineReveal as="h1" trigger="mount" startDelay={0.15} className={cn("t-display", styles.title)}>
            {"Your path to"}
            {"measurable"}
            <span style={{ color: ACCENT }}>AI ROI.</span>
          </LineReveal>

          <div className={styles.space22} />

          <Reveal trigger="mount" delay={0.7} className={styles.lead}>
            <p className="t-lead">{BRAND.valueProp}</p>
          </Reveal>

          <div className={styles.space28} />

          {/* One primary action; the secondary is a quiet text link so it never competes. */}
          <Reveal trigger="mount" delay={0.83} className={styles.buttons}>
            <div className={styles.btnWrap}>
              <Button label={PRIMARY_CTA.label} href={PRIMARY_CTA.href} variant="primary" />
            </div>
            <a href="#workshop" className={styles.textLink}>
              See what the workshop covers
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </Reveal>

          <div className={styles.space36} />
        </div>

        <div className={styles.visual}>
          <AgentConsole />
        </div>
      </div>

      <Ticker
        velocity={46}
        gap={40}
        className={cn(styles.ticker, styles.bordered)}
        trackClassName={styles.tickerTrack}
        items={TICKER_WORDS.map((word) => (
          <p key={word} className={cn("t-label", styles.label)}>
            <span style={{ color: ACCENT }}>{"// "}</span>
            {word}
          </p>
        ))}
      />
    </section>
  );
}

export default Hero;
