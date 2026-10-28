// Per-page layouts (live section order). Pages without one still render the
// older fixed template from extras.ts until they are rebuilt.

import type { ServiceLayout, Stat } from "../types";
import { AI_LAYOUTS } from "./ai";
import { APPMOD_LAYOUTS } from "./appmod";
import { DATA_LAYOUTS } from "./data";
import { MS_LAYOUTS } from "./microsoft";
import { AZURE_LAYOUTS } from "./azure";
import { AWS_LAYOUTS } from "./aws";
import { INDUSTRY_LAYOUTS } from "./industries";
import { COMPANY_LAYOUTS } from "./company";
import { COMPANY_STATS } from "./shared";

export const LAYOUTS: Record<string, ServiceLayout> = { ...AI_LAYOUTS, ...DATA_LAYOUTS, ...APPMOD_LAYOUTS, ...MS_LAYOUTS, ...AZURE_LAYOUTS, ...AWS_LAYOUTS, ...INDUSTRY_LAYOUTS, ...COMPANY_LAYOUTS };

/** The hero counters, in the approved credential wording (20+ years, 300+
 *  clients, 200+ engineers). The live pages varied this wording; one set now. */
export const DEFAULT_STATS: Stat[] = COMPANY_STATS;
