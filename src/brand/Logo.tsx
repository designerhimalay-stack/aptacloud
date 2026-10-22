// <Logo> — Official AptaCloud logo and brand mark.
// Renders the official AptaCloud logo asset with proper responsive sizing.

import type { CSSProperties } from "react";
import { BRAND, asset } from "./brand";

export function Mark({
  height = 28,
  className,
  style,
}: {
  height?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      className={className}
      style={{
        display: "inline-block",
        height,
        width: height * 1.15,
        overflow: "hidden",
        position: "relative",
        flex: "none",
        ...style,
      }}
      aria-hidden="true"
    >
      <img
        src={asset("/images/aptacloud-logo-header.webp")}
        alt={`${BRAND.name} mark`}
        style={{
          height: "100%",
          width: "auto",
          maxWidth: "none",
          objectFit: "cover",
          objectPosition: "left center",
          display: "block",
        }}
        loading="eager"
        decoding="async"
      />
    </span>
  );
}

/** The company name set as the wordmark with the signature AptaCloud red 'C'. */
export function Wordmark({
  className,
  style,
  plain = false,
}: {
  className?: string;
  style?: CSSProperties;
  plain?: boolean;
}) {
  return (
    <span className={className} style={{ fontWeight: 700, ...style }}>
      {plain ? (
        BRAND.name
      ) : (
        <>
          <span>Apta</span>
          <span style={{ color: "var(--wordmark-accent, var(--accent))" }}>C</span>
          <span>loud</span>
        </>
      )}
    </span>
  );
}

/** Official AptaCloud Logo lockup */
export function Logo({
  height = 30,
  className,
  style,
  theme = "light",
}: {
  height?: number;
  gap?: number;
  className?: string;
  wordmarkClassName?: string;
  showWordmark?: boolean;
  style?: CSSProperties;
  theme?: "light" | "dark";
}) {
  const src = theme === "dark" ? "/images/aptacloud-logo.webp" : "/images/aptacloud-logo-header.webp";

  return (
    <span
      className={className}
      style={{
        alignItems: "center",
        display: "inline-flex",
        lineHeight: 1,
        height,
        ...style,
      }}
    >
      <img
        src={asset(src)}
        alt={BRAND.name}
        height={height}
        style={{
          height: `${height}px`,
          width: "auto",
          display: "block",
          objectFit: "contain",
        }}
        loading="eager"
        decoding="async"
      />
    </span>
  );
}
