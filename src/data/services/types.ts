// Content model for a service page. Section order and rules follow Brand
// Guidelines v2.0 §12 and Content Writing Guidelines v2.0 §7.2:
// hero → pain points (4–6) → services → industries → process (named phases +
// timeline) → why AptaCloud (4–6) → FAQs (6+) → related → contact.
// Copy is Australian English; slugs keep US spelling (matches the live URLs).

import type { TechId } from "@/data/tech";

export type CategoryId = "ai" | "data" | "appmod" | "microsoft" | "azure";
export type IndustryId = "insurance" | "oilgas" | "construction";
export type IconId =
  | "spark" | "agent" | "chat" | "chart" | "db" | "pipe" | "layers" | "migrate" | "code" | "shield"
  | "search" | "doc" | "flow" | "gauge" | "cloud" | "target" | "eye" | "cog" | "link" | "clock" | "team";

export type ServicePhoto = { src: string; alt: string; position?: string };

export type ServicePage = {
  slug: string;
  category: CategoryId;
  /** Nav / breadcrumb label. */
  name: string;
  /** One line for nav menus and related-service cards. */
  summary: string;
  seo: { title: string; description: string };
  hero: {
    title: string;
    /** Trailing words of the title set in the accent colour. */
    accent: string;
    lead: string;
    photo: ServicePhoto;
    /** Glass chip over the photo: a short list of what the page delivers. */
    chip: { title: string; items: string[] };
    /** Logos floating on the second chip. */
    marks: TechId[];
  };
  /** The page's one primary CTA (Brand Guidelines 7.2). */
  cta: { label: string; /** Same action, short enough for the nav pill. */ short: string; heading: string; lead: string };
  pains: { heading: string; lead: string; items: { title: string; text: string }[] };
  services: {
    heading: string;
    lead: string;
    items: { title: string; text: string; outcome: string; icon: IconId; tools: TechId[] }[];
  };
  industries: { heading: string; lead: string; items: Record<IndustryId, { useCase: string; outcome: string }> };
  process: { heading: string; lead: string; timeline: string; steps: [string, string, string, string, string, string] };
  why: { heading: string; lead: string; extra: { title: string; text: string; icon: IconId }[] };
  stack: TechId[];
  faqs: { q: string; a: string }[];
};

/** Sections whose order follows each page's live-site sequence (between the hero and the FAQ). */
export type SectionId = "pains" | "services" | "benefits" | "useCases" | "process" | "stack" | "industries" | "why" | "frameworks" | "assessment";

export type IconCard = { title: string; text: string; icon: IconId };

/** Per-page extras + section order (src/data/services/extras.ts). */
export type ServiceExtras = {
  sections: SectionId[];
  benefits?: { heading: string; lead: string; items: IconCard[] };
  useCases?: { heading: string; lead: string; items: IconCard[] };
  stackHeading?: { heading: string; lead: string };
  frameworks?: { heading: string; lead: string; items: { title: string; text: string }[] };
  assessment?: { heading: string; lead: string; areas: string[]; deliverables: string[] };
};

/* ── Page layouts (src/data/services/layouts/) ──────────────────────────
   Each page lists its own sections in the live page's order. The section
   kinds are shared, so every page keeps the home design, but the content,
   counts, and sequence are the page's own. */

export type BlockItem = {
  title: string;
  text?: string;
  icon?: IconId;
  /** A tool's logo in place of the icon. */
  mark?: TechId;
  /** Short line above the title (e.g. a framework's tagline). */
  kicker?: string;
  /** A figure in place of the icon (e.g. "20+"). */
  value?: string;
  /** Photo cards: the photo above the copy. */
  photo?: ServicePhoto;
  /** Short ticked points under the text. */
  points?: string[];
};

type Head = {
  id?: string;
  tag: string;
  icon?: IconId;
  heading: string;
  lead?: string;
  head?: "default" | "center" | "split";
  /** Pin this section's background; the rhythm continues from it. */
  tone?: "tint" | "white" | "dark";
};

export type Block =
  | (Head & {
      kind: "cards";
      /** icon = icon tile + copy · statement = a buyer's statement · check = tick rows · mark = tool logo + tagline
       *  centered = centred icon, title, text (live "service" cards) · plain = title + text tiles (live process grids)
       *  chip = small icon + label pills · photo = photo above the copy */
      style?: "icon" | "statement" | "check" | "mark" | "centered" | "plain" | "chip" | "photo";
      cols?: number;
      body?: string[];
      /** A closing line under the grid (centred), as the live pages have. */
      note?: string;
      items: BlockItem[];
      /** A second, compact row of items under the main grid. */
      more?: { heading: string; items: BlockItem[] };
      cta?: boolean;
    })
  | (Head & {
      kind: "showcase";
      /** One framework / tool at a time: a picker list beside a large detail card. */
      items: { title: string; maker?: string; kicker: string; text: string; mark: TechId; bestFor: string[] }[];
      more?: { heading: string; items: BlockItem[] };
    })
  | (Head & {
      kind: "suite";
      /** App catalogue by category (live "Why Microsoft 365?"): each group lists its apps' icons. */
      groups: { label: string; apps: { name: string; icon: string }[] }[];
    })
  | (Head & {
      kind: "index";
      /** Editorial numbered list of services, each with its own bullet points (live M365 services). */
      items: { title: string; text: string; points: string[] }[];
    })
  | (Head & {
      kind: "hub";
      /** Services orbiting a product logo (live Copilot Studio diagram); one is shown in detail at a time. */
      center: { src: string; alt: string };
      /** `logo`: a product icon in place of the line icon (live Power Platform diagram). */
      items: { title: string; text: string; icon: IconId; logo?: string }[];
    })
  | { kind: "banner"; heading: string; text?: string; photo: ServicePhoto }
  | (Head & {
      kind: "split";
      body?: string[];
      photo: ServicePhoto;
      items?: BlockItem[];
      reverse?: boolean;
      cta?: boolean;
      /** card = the points on one card (default) · cards = one small card per point · divided = rows split by hairlines */
      list?: "card" | "cards" | "divided";
      /** A row of text chips under the points (e.g. languages we migrate from). */
      chips?: { heading: string; items: string[] };
      /** A closing line under the section (centred). */
      note?: string;
    })
  | (Head & {
      kind: "panels";
      /** Live "panel + list" services: an accent panel with the group's name and pitch beside its list; alternates sides. */
      groups: { title: string; text: string; items: { title: string; text: string }[] }[];
    })
  | (Head & { kind: "rows"; items: { title: string; intro: string; bullets: string[]; note?: string; photo: ServicePhoto }[] })
  | (Head & {
      kind: "steps";
      steps: { title: string; text: string }[];
      photo?: ServicePhoto;
      cta?: boolean;
      /** board = phase cards (default) · curve = a wave path with large numbers (live data pages) */
      variant?: "board" | "curve";
    })
  | (Head & {
      kind: "cases";
      /** grid = cards (default) · wide = one row per case, story left and results right */
      layout?: "grid" | "wide";
      items: { client: string; place?: string; text?: string; metric?: string; metricLabel?: string; points?: string[] }[] })
  | (Head & { kind: "quotes"; layout?: "grid" | "slider"; items: { quote: string; role: string; company?: string; place: string }[] })
  | (Head & {
      kind: "logos";
      ids: TechId[];
      body?: string[];
      groups?: BlockItem[];
      /** board: the tools grouped by role; the first category (Microsoft) is the featured card. */
      layout?: "wall" | "board";
      categories?: { label: string; text?: string; ids: TechId[] }[];
    })
  | (Head & { kind: "statement"; body: string[]; marks?: TechId[] })
  | (Head & {
      kind: "tabs";
      /** Icon beside each item (default: a tick). */
      itemIcon?: IconId;
      tabs: { label: string; intro?: string; items: { title: string; text: string }[]; photo: ServicePhoto }[];
    })
  | (Head & { kind: "clients"; layout?: "marquee" | "grid"; logos: { src: string; name: string }[] })
  | { kind: "assessment"; heading: string; lead: string; areas: string[]; deliverables: string[] }
  | (Partial<Head> & { kind: "industries" })
  | { kind: "faq" };

export type Stat = { value: number; suffix?: string; label: string };

export type ServiceLayout = {
  /** The figures under the hero (the live hero counters). */
  stats?: Stat[];
  blocks: Block[];
  /** The live page's FAQs, rewritten to the guidelines (replaces page.faqs). */
  faqs?: { q: string; a: string }[];
};

export type Category = {
  id: CategoryId;
  name: string;
  /** Short mono label used in breadcrumbs and pill tags. */
  short: string;
  intro: string;
};
