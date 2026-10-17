// Human photography inside the acid-tech theme: the photo is rendered
// monochrome and darkened with an orange multiply wash so it sits on the dark brand background
// with the rest of the imagery; hovering a `.photo-host` ancestor (or the
// photo itself) brings the colour back over 1.4s easeOutExpo with a slow zoom.
// Optional scan line (the orange band from the hero render) and HUD corners.

import { cn } from "@/lib/utils";
import styles from "./Photo.module.css";

export function Photo({
  src,
  alt,
  sizes = "(max-width: 809px) 100vw, 50vw",
  priority = false,
  scan = false,
  corners = false,
  tone = "duotone",
  className,
  position,
}: {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  /** Animated orange scan band sweeping vertically. */
  scan?: boolean;
  /** 12px orange HUD brackets in the four corners. */
  corners?: boolean;
  /** duotone = mono + orange wash; mono = mono only; color = untouched. */
  tone?: "duotone" | "mono" | "color";
  className?: string;
  /** CSS object-position, e.g. "30% 40%". */
  position?: string;
}) {
  return (
    <div className={cn(styles.photo, styles[tone], className)}>
      <img
        src={src}
        alt={alt}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={styles.img}
        style={position ? { objectPosition: position } : undefined}
      />
      <span className={styles.wash} aria-hidden="true" />
      {scan && <span className={styles.scan} aria-hidden="true" />}
      {corners && (
        <span className={styles.corners} aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
      )}
    </div>
  );
}
