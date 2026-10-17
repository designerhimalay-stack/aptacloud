// Pulse — a small glowing status dot that breathes (opacity 1 → 0.25 → 1, 2.4s).
// Static under reduced motion (see .pulse in globals.css).

import type { CSSProperties } from "react";
import { glowShadow } from "@/lib/motion";

export function Pulse({
  size = 7,
  color = "var(--accent)",
  style,
  className,
}: {
  size?: number;
  color?: string;
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <i
      aria-hidden="true"
      className={`pulse ${className ?? ""}`}
      style={{
        ...style,
        display: "block",
        width: size,
        height: size,
        borderRadius: 100,
        background: color,
        boxShadow: glowShadow(color),
      }}
    />
  );
}
