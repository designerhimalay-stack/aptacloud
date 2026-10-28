// Company pages (the nav's About menu): About Us, Careers, Blog, White Papers,
// and Events. URLs keep the live paths. They share the service-page shell (hero,
// blocks from layouts/company.ts, related cards, contact), without the hero's
// deliverables console. Copy follows Brand Guidelines v2.0 (Australian English).

import { PRIMARY_CTA } from "@/brand/brand";
import type { ServicePage } from "./types";

const photo = (file: string, alt: string, position = "50% 45%") => ({ src: `/images/photos/company/${file}.jpg`, alt, position });

const MICROSOFT_STACK: ServicePage["stack"] = ["azure", "dynamics", "m365", "sharepoint", "copilot", "powerPlatform", "powerBI", "fabric"];

export const COMPANY_PAGES: ServicePage[] = [
  {
    slug: "about-us",
    category: "company",
    name: "About Us",
    summary: "Who we are, the team that leads us, and where we work.",
    seo: {
      title: "About AptaCloud | Cloud, Data, and AI Consultancy",
      description: "AptaCloud modernises and connects the systems mid-sized insurance, oil and gas, and construction firms run on, then puts AI to work on top of them.",
    },
    hero: {
      title: "We take your plans",
      accent: "from pilot to production.",
      lead: "AptaCloud modernises the systems mid-sized insurance, oil and gas, and engineering and construction businesses run on, connects them, and puts AI to work on top of them. We prove the value on your data before you commit.",
      photo: photo("about-hero", "A team working together at their desks in a bright office", "50% 40%"),
    },
    cta: {
      label: PRIMARY_CTA.label,
      short: PRIMARY_CTA.short,
      heading: "Tell us what you have already started.",
      lead: "An AI pilot, a modernisation plan, a cloud migration: tell us where you are, and we will show you the next step, proven on your data.",
    },
    stack: MICROSOFT_STACK,
    faqs: [],
  },
  {
    slug: "careers",
    category: "company",
    name: "Careers",
    summary: "Work with senior engineers on the systems businesses run on.",
    seo: {
      title: "Careers at AptaCloud | Cloud, Data, and AI Engineering",
      description: "Work with AptaCloud's engineers in the United States, India, and Mexico on AI, data, application modernisation, and Microsoft cloud projects.",
    },
    hero: {
      title: "Work on the systems",
      accent: "businesses run on.",
      lead: "Join more than 200 engineers in the United States, India, and Mexico who modernise and connect the systems mid-sized businesses depend on, and put AI to work on top of them.",
      photo: photo("careers-hero", "Developers working at their desks in an open-plan office", "50% 45%"),
    },
    cta: {
      label: "Send us your details",
      short: "Send your details",
      heading: "Work with us.",
      lead: "There are no roles listed right now. Tell us about yourself and the work you want to do, and we will keep your details for future roles.",
    },
    stack: MICROSOFT_STACK,
    faqs: [],
  },
  {
    slug: "blog",
    category: "company",
    name: "Blog",
    summary: "Articles on AI, data, modernisation, and the Microsoft platform.",
    seo: {
      title: "AptaCloud Blog | AI, Data, and Modernisation Insights",
      description: "Practical articles on AI, data, application modernisation, Microsoft, and Azure, for insurance, oil and gas, and engineering and construction teams.",
    },
    hero: {
      title: "Insights on AI, data,",
      accent: "and modernisation.",
      lead: "Practical articles from our specialists on AI, data, application modernisation, and the Microsoft platform, written for insurance, oil and gas, and engineering and construction teams.",
      photo: photo("blog-hero", "A man reading a printed article beside his laptop at a desk", "60% 35%"),
    },
    cta: {
      label: PRIMARY_CTA.label,
      short: PRIMARY_CTA.short,
      heading: "Put these ideas to work in your business.",
      lead: "Tell us what you are working on. We will show where AI and modernisation would pay off first, proven on your data.",
    },
    stack: MICROSOFT_STACK,
    faqs: [],
  },
  {
    slug: "whitepaper",
    category: "company",
    name: "White Papers",
    summary: "In-depth guides on running the cloud well.",
    seo: {
      title: "AptaCloud White Papers | Azure and Cloud Guides",
      description: "In-depth white papers from AptaCloud's specialists, starting with how to keep Microsoft Azure costs under control.",
    },
    hero: {
      title: "In-depth guides",
      accent: "for technology leaders.",
      lead: "Longer reads from our specialists on running Microsoft Azure and the cloud well, with the detail behind the decisions.",
      photo: photo("papers-hero", "A business leader reviewing a printed report with charts at his desk", "60% 40%"),
    },
    cta: {
      label: "Get an Azure cost review",
      short: "Get a cost review",
      heading: "Find out where your Azure spend goes.",
      lead: "We will review your Azure environment and show where costs can come down without hurting performance.",
    },
    stack: ["azure", "costManagement", "azAdvisor", "azMonitor", "azPolicy", "azAutoscale", "powerBI"],
    faqs: [],
  },
  {
    slug: "events",
    category: "company",
    name: "Events",
    summary: "Where to meet our leadership next.",
    seo: {
      title: "AptaCloud Events | Where to Meet Our Team",
      description: "The insurance, oil and gas, and technology conferences where you can meet AptaCloud's leadership next, plus the events we have attended.",
    },
    hero: {
      title: "Meet our team",
      accent: "at industry events.",
      lead: "Our leadership attends the conferences where insurance, oil and gas, and technology leaders meet. Here is where to find us next.",
      photo: photo("events-hero", "A speaker addressing a full conference hall", "50% 45%"),
    },
    cta: {
      label: "Arrange a meeting at an event",
      short: "Arrange a meeting",
      heading: "Meet us at the next event.",
      lead: "Tell us which event you are attending and what you would like to discuss, and we will set up a time to meet.",
    },
    stack: MICROSOFT_STACK,
    faqs: [],
  },
];
