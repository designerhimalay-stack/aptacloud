// RollingText — button hover label: every character slides up
// one line, staggered, while a copy drawn with text-shadow rolls in from below.
// Triggered by hovering/focusing any ancestor with the `roll-host` class.
// --roll-from / --roll-to set the resting and hovered text colours.

import { cn } from "@/lib/utils";
import s from "./RollingText.module.css";

export function RollingText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={cn(s.roll, className)} aria-label={text}>
      {[...text].map((ch, i) => (
        <span key={i} aria-hidden="true" className={s.ch} style={{ transitionDelay: `${i * 0.018}s` }}>
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}
