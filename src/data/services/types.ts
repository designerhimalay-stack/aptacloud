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

export type Category = {
  id: CategoryId;
  name: string;
  /** Short mono label used in breadcrumbs and pill tags. */
  short: string;
  intro: string;
};
