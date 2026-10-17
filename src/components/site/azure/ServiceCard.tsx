// Azure service card — minimalist, image-free: index + accent line icon, title,
// the PDF description, the PDF's key points as a ruled list, and a "Talk to us"
// link. White 24px card on the tinted section; hover lifts the card, warms the
// icon tile, plays the icon's own animation and nudges the link arrow.

import { cn } from "@/lib/utils";
import styles from "./ServiceCard.module.css";

export type AzureIcon = "hosting" | "migration" | "optimization" | "managed";

export type AzureService = {
  index: string;
  icon: AzureIcon;
  title: string;
  body: string;
  points: string[];
  href: string;
};

// Each icon has its own hover animation (see .card:hover rules in the CSS).
const ICONS: Record<AzureIcon, React.ReactNode> = {
  // cloud that floats, with data dots rising beneath it
  hosting: (
    <>
      <g className={styles.float}>
        <path d="M7 15.5h10a4 4 0 0 0 .5-7.97A5.75 5.75 0 0 0 6.6 6.7 4.4 4.4 0 0 0 7 15.5Z" />
      </g>
      <circle className={cn(styles.data, styles.d1)} cx="9" cy="20" r="0.9" fill="currentColor" stroke="none" />
      <circle className={cn(styles.data, styles.d2)} cx="12" cy="20" r="0.9" fill="currentColor" stroke="none" />
      <circle className={cn(styles.data, styles.d3)} cx="15" cy="20" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  // arrow travelling into a cloud
  migration: (
    <>
      <path d="M9 17.5h8a3.6 3.6 0 0 0 .45-7.17A5.2 5.2 0 0 0 7.6 8.4" />
      <g className={styles.slide}>
        <path d="M2.5 13.5h8m-2.5-2.5 2.5 2.5L8 16" />
      </g>
    </>
  ),
  // gauge whose needle sweeps up to the top of the dial
  optimization: (
    <>
      <path d="M4.5 16a7.5 7.5 0 1 1 15 0" />
      <path className={styles.ticks} d="M12 8.5v1.2M7.2 10.6l.85.85M16.8 10.6l-.85.85" />
      <g className={styles.needle}>
        <path d="M12 16 8.6 11.6" />
      </g>
      <circle cx="12" cy="16" r="1.1" fill="currentColor" stroke="none" />
      <path d="M4.5 19.5h15" />
    </>
  ),
  // shield whose check re-draws
  managed: (
    <>
      <path d="M12 3.5 5.5 6v5.5c0 4 2.8 7.4 6.5 8.5 3.7-1.1 6.5-4.5 6.5-8.5V6L12 3.5Z" />
      <path className={styles.check} pathLength={1} d="m9.25 12 2 2 3.5-3.75" />
    </>
  ),
};

export function ServiceCard({ index, icon, title, body, points, href, className }: AzureService & { className?: string }) {
  return (
    <a href={href} className={cn(styles.card, className)}>
      <div className={styles.top}>
        <span className={styles.index}>{index}</span>
        <span className={styles.iconTile}>
        <svg
          className={styles.icon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {ICONS[icon]}
        </svg>
        </span>
      </div>
      <div className={styles.main}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.body}>{body}</p>
      </div>
      <ul className={styles.points}>
        {points.map((p) => (
          <li key={p} className={styles.point}>
            <span className={styles.dot} aria-hidden="true" />
            {p}
          </li>
        ))}
      </ul>
      <span className={styles.more}>
        Talk to us <span className={styles.arrow} aria-hidden="true">→</span>
      </span>
    </a>
  );
}
