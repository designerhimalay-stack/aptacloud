// Line icons for service pages: 24px grid, 1.6px stroke, round joins — the same
// drawing language as the home page's tag and stat icons.

import type { IconId } from "@/data/services/types";

const PATHS: Record<IconId, string[]> = {
  spark: ["M12 3.5c.6 4 2.4 6.2 6.2 7.2-3.8 1-5.6 3.2-6.2 7.2-.6-4-2.4-6.2-6.2-7.2 3.8-1 5.6-3.2 6.2-7.2Z", "M19 15.5c.25 1.5.8 2.1 2.2 2.3-1.4.3-1.95.85-2.2 2.3-.25-1.45-.8-2-2.2-2.3 1.4-.2 1.95-.8 2.2-2.3Z"],
  agent: ["M8 9.5h8a3 3 0 0 1 3 3V16a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3v-3.5a3 3 0 0 1 3-3Z", "M12 9.5V6M12 6a1.25 1.25 0 1 0 0-2.5A1.25 1.25 0 0 0 12 6Z", "M9.5 14h.01M14.5 14h.01", "M2.75 13.5v2M21.25 13.5v2"],
  chat: ["M5 5.5h14a1.5 1.5 0 0 1 1.5 1.5v8.5A1.5 1.5 0 0 1 19 17h-7.5L7 20.5V17H5a1.5 1.5 0 0 1-1.5-1.5V7A1.5 1.5 0 0 1 5 5.5Z", "M8 10h8M8 13h5"],
  chart: ["M4 20h16", "M7 16.5V12M11 16.5V8M15 16.5v-6M19 16.5V5.5"],
  db: ["M12 3.5c4.4 0 7.5 1.3 7.5 3s-3.1 3-7.5 3-7.5-1.3-7.5-3 3.1-3 7.5-3Z", "M4.5 6.5v11c0 1.7 3.1 3 7.5 3s7.5-1.3 7.5-3v-11", "M4.5 12c0 1.7 3.1 3 7.5 3s7.5-1.3 7.5-3"],
  pipe: ["M3.5 7.5h6a2 2 0 0 1 2 2v5a2 2 0 0 0 2 2h7", "M3.5 4.5v6M20.5 13.5v6", "M6.5 16.5h2"],
  layers: ["m12 3.5 8.5 4.5-8.5 4.5L3.5 8 12 3.5Z", "m3.5 12 8.5 4.5 8.5-4.5", "m3.5 16 8.5 4.5 8.5-4.5"],
  migrate: ["M4 8h12.5M13 4.5 16.5 8 13 11.5", "M20 16H7.5M11 12.5 7.5 16l3.5 3.5"],
  code: ["m8.5 7.5-4.5 4.5 4.5 4.5M15.5 7.5l4.5 4.5-4.5 4.5", "m13.5 5-3 14"],
  shield: ["M12 3.5 19 6v5.5c0 4.3-2.9 7.6-7 9-4.1-1.4-7-4.7-7-9V6l7-2.5Z", "m9 12 2.2 2.2L15.5 10"],
  search: ["M10.5 17.5a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z", "m15.5 15.5 5 5"],
  doc: ["M6.5 3.5h7.5l4.5 4.5v12.5h-12V3.5Z", "M14 3.5V8h4.5", "M9 12.5h6M9 16h6"],
  flow: ["M5 4.5h4v4H5zM15 15.5h4v4h-4z", "M7 8.5V12a2 2 0 0 0 2 2h6a2 2 0 0 1 2 2v-.5", "M15 6.5h4M17 4.5v4"],
  gauge: ["M4.5 16.5a7.5 7.5 0 1 1 15 0", "m12 16.5 3.5-5", "M4.5 20h15"],
  cloud: ["M7.5 18.5h9.5a3.75 3.75 0 0 0 .4-7.48A5.5 5.5 0 0 0 6.9 9.9a4.25 4.25 0 0 0 .6 8.6Z"],
  target: ["M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17Z", "M12 16.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z", "M12 12.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z"],
  eye: ["M2.75 12S6 5.5 12 5.5 21.25 12 21.25 12 18 18.5 12 18.5 2.75 12 2.75 12Z", "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"],
  cog: ["M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z", "M19.4 13.5a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1v.3a2 2 0 1 1-4 0v-.2a1.6 1.6 0 0 0-2.7-1.1l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0-1.1-2.7H3.5a2 2 0 1 1 0-4h.2a1.6 1.6 0 0 0 1.1-2.7l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 2.7-1.1V3.5a2 2 0 1 1 4 0v.2a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0 1.1 2.7h.3a2 2 0 1 1 0 4h-.2a1.6 1.6 0 0 0-1.6 1.2Z"],
  link: ["M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1.2 1.2", "M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1.2-1.2"],
  team: ["M9 11a3.25 3.25 0 1 0 0-6.5A3.25 3.25 0 0 0 9 11Z", "M3 19.5c.5-3.4 2.9-5.5 6-5.5s5.5 2.1 6 5.5", "M15.5 4.75a3 3 0 0 1 0 5.9M17.5 14.4c1.9.6 3.1 2.4 3.5 5.1"],
  clock: ["M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17Z", "M12 7.5V12l3 2"],
};

export function Icon({ id, className }: { id: IconId; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {PATHS[id].map((d, i) => (
        <path key={i} d={d} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      ))}
    </svg>
  );
}

/** Diagonal arrow used on links and cards (same as the nav's). */
export function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
