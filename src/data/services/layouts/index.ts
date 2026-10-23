// Per-page layouts (live section order). Pages without one still render the
// older fixed template from extras.ts until they are rebuilt.

import type { ServiceLayout, Stat } from "../types";
import { AI_LAYOUTS } from "./ai";
import { APPMOD_LAYOUTS } from "./appmod";
import { DATA_LAYOUTS } from "./data";
import { MS_LAYOUTS } from "./microsoft";

export const LAYOUTS: Record<string, ServiceLayout> = { ...AI_LAYOUTS, ...DATA_LAYOUTS, ...APPMOD_LAYOUTS, ...MS_LAYOUTS };

/** The live hero counters (most pages). */
export const DEFAULT_STATS: Stat[] = [
  { value: 20, label: "Years in technology strategy" },
  { value: 200, label: "Cloud and AI experts" },
  { value: 300, label: "Projects delivered" },
];
