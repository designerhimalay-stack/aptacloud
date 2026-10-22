// Content shared by every service page: categories, the three verticals we serve,
// the named delivery phases and the four "Why AptaCloud" reasons (Brand Guidelines
// v2.0 §3.4, in this order). Australian English.

import type { Category, CategoryId, IconId, IndustryId, ServicePhoto } from "./types";

export const CATEGORIES: Record<CategoryId, Category> = {
  ai: {
    id: "ai",
    name: "Artificial Intelligence",
    short: "AI",
    intro: "Find where artificial intelligence (AI) pays off first, then take it from pilot to production.",
  },
  data: {
    id: "data",
    name: "Data & Analytics",
    short: "Data",
    intro: "Build the data layer your reporting and AI depend on.",
  },
  appmod: {
    id: "appmod",
    name: "Application Modernisation",
    short: "App modernisation",
    intro: "Keep the systems your business runs on, and make them connect, scale, and support AI.",
  },
  microsoft: {
    id: "microsoft",
    name: "Microsoft Services",
    short: "Microsoft",
    intro: "Get more from the Microsoft tools your teams already use every day.",
  },
  azure: {
    id: "azure",
    name: "Azure Cloud",
    short: "Azure",
    intro: "Run more on Microsoft Azure, with costs you can explain.",
  },
};

/** The named phases (Brand Guidelines v2.0 §3.4), Australian spelling in copy. */
export const PHASES = ["Discover", "Define", "Design", "Build", "Integrate", "Optimise"] as const;

export const INDUSTRIES: Record<IndustryId, { name: string; segments: string; photo: ServicePhoto; href: string }> = {
  insurance: {
    name: "Insurance",
    segments: "MGAs, TPAs, and specialty carriers",
    photo: {
      src: "/images/photos/services/office-meeting.jpg",
      alt: "An insurance operations team talking through a workflow around a laptop",
      position: "50% 40%",
    },
    href: "https://aptacloud.com/industry/insurance/managing-general-agents/",
  },
  oilgas: {
    name: "Oil & Gas",
    segments: "Pipeline integrity, drilling, and well services",
    photo: {
      src: "/images/photos/services/ai-agents-field.jpg",
      alt: "A field engineer in safety gear on a refinery platform",
      position: "38% 35%",
    },
    href: "https://aptacloud.com/industry/oil-gas/pipeline-maintenance/",
  },
  construction: {
    name: "Engineering & Construction",
    segments: "Contractors, engineering firms, and field services",
    photo: {
      src: "/images/photos/services/construction-tablet.jpg",
      alt: "Two site engineers in hard hats reviewing plans on a tablet",
      position: "50% 45%",
    },
    href: "https://aptacloud.com/industry/engineering-and-construction/construction/",
  },
};

export const WHY: { title: string; text: string; icon: IconId }[] = [
  {
    title: "Proof before commitment",
    text: "We prove it on your data with a proof of concept before you sign for the full project. You judge our work on your systems, not on a slide.",
    icon: "target",
  },
  {
    title: "A mature, phased process",
    text: "Discover, Define, Design, Build, Integrate, Optimise. You always know what happens next and what it costs.",
    icon: "layers",
  },
  {
    title: "Senior specialists, faster decisions",
    text: "Senior Microsoft specialists do the work, without the layers and long discovery phases of larger firms.",
    icon: "team",
  },
  {
    title: "Built around what you already run",
    text: "We extend and connect your existing policy, ERP, SCADA, and project systems rather than replacing them.",
    icon: "link",
  },
];

/** Contact section: what happens after the form is sent (no response-time promise). */
export const NEXT_STEPS = [
  { title: "We read your note", text: "A specialist reviews what you have started and replies by email." },
  { title: "A short scoping call", text: "We agree the one workflow worth proving first." },
  { title: "Your proof of concept plan", text: "Phases, owners, and costs, before you commit to anything." },
];

/** How the proof of concept works: the guidelines' POC story, in three beats. */
export const POC_STEPS = [
  { title: "You bring one workflow", text: "A real process and a sample of your own data." },
  { title: "We build and test it", text: "On Microsoft Azure, alongside your IT team." },
  { title: "You decide with evidence", text: "See the result before you commit to more." },
];
