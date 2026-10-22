// Section tone, following the home page rhythm: warm grey (surface-1) → white →
// dark, repeating (About → Workshop → Partners → Why → Dynamics → Microsoft …).
// The page assigns each section its tone in order (src/pages/[slug].astro).

import sec from "./Section.module.css";
import { cn } from "@/lib/utils";

export type Tone = "tint" | "white" | "dark";

/** Home rhythm for a run of sections; never ends on dark (the contact section is dark). */
export function homeRhythm(count: number): Tone[] {
  const cycle: Tone[] = ["tint", "white", "dark"];
  const tones = Array.from({ length: count }, (_, i) => cycle[i % 3]);
  if (tones[count - 1] === "dark") tones[count - 1] = "white";
  return tones;
}

export function toneProps(tone: Tone, _light?: "tint" | "light", dark: "dark" | "deep" = "dark") {
  return {
    className: cn(sec.section, tone === "tint" ? sec.tint : tone === "white" ? sec.light : sec[dark]),
    "data-theme": tone === "dark" ? undefined : ("light" as const),
  };
}
