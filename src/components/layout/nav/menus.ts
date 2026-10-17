// Nav menu content updated as per Aptacloud (https://aptacloud.com/) with Australian English.
// One shell for every panel — a 3-column grid + a footer strip — filled from three building blocks:
//   tabs   — Services: categories; hovering/focusing one swaps the next two cells
//   column — a header, an optional two-line intro and its links
//   promo  — a highlighted card: logo, eyebrow, title, copy and a CTA

import { BRAND } from "@/brand/brand";

export type NavLink = { label: string; href: string };
export type NavColumn = { title: string; text?: string; links: NavLink[] };
export type NavPromo = {
  /** Logo image path, or "mark" for the brand mark. */
  logo: string;
  logoAlt: string;
  eyebrow: string;
  title: string;
  text: string;
  cta: NavLink;
};
export type NavTab = { id: string; label: string; column: NavColumn; promo: NavPromo };

export type NavMenu = {
  id: string;
  label: string;
  footer: { text: string; link: NavLink };
} & (
  | { kind: "tabs"; tabsTitle: string; tabs: NavTab[] }
  | { kind: "columns"; lead?: NavPromo; columns: NavColumn[] }
);

const CONSULT: NavLink = { label: "Book a consultation", href: "#contact" };

export const MENUS: NavMenu[] = [
  {
    id: "services",
    label: "Services",
    kind: "tabs",
    tabsTitle: "What we do",
    tabs: [
      {
        id: "ai",
        label: "AI & Data Solutions",
        column: {
          title: "AI & Data Solutions",
          text: "Discover where AI pays off first, then roll it out safely across your enterprise.",
          links: [
            { label: "AI Consulting", href: "https://aptacloud.com/ai-consulting/" },
            { label: "AI Agents", href: "https://aptacloud.com/ai-agents/" },
            { label: "Generative AI", href: "https://aptacloud.com/generative-ai/" },
            { label: "Machine Learning", href: "https://aptacloud.com/machine-learning/" },
            { label: "Data Engineering", href: "https://aptacloud.com/data-engineering/" },
            { label: "Data Warehousing", href: "https://aptacloud.com/data-warehousing/" },
            { label: "Data Visualisation", href: "https://aptacloud.com/data-visualization/" },
          ],
        },
        promo: {
          logo: "/images/microsoft/copilot.svg",
          logoAlt: "Microsoft Copilot",
          eyebrow: "Flagship Programme",
          title: "AI Assessment Workshop",
          text: "A tailored workshop that demonstrates how AI automates operations and drives measurable ROI.",
          cta: { label: "Book AI workshop", href: "#workshop" },
        },
      },
      {
        id: "app-mod",
        label: "App Modernisation",
        column: {
          title: "Application Modernisation",
          text: "Re-engineer and migrate legacy platforms into resilient, cloud-native architectures.",
          links: [
            { label: "Legacy Application Migration", href: "https://aptacloud.com/legacy-application-migration/" },
            { label: "Application Modernisation", href: "https://aptacloud.com/application-modernization/" },
            { label: "Application Re-engineering", href: "https://aptacloud.com/application-re-engineering/" },
            { label: "Cloud Architecture Review", href: "#azure" },
            { label: "DevOps & CI/CD Pipelines", href: "#azure" },
          ],
        },
        promo: {
          logo: "/images/microsoft/azure.svg",
          logoAlt: "Application Modernisation",
          eyebrow: "App Modernisation Mastery",
          title: "Modernise Core Applications",
          text: "Transform legacy technical debt into scalable, high-performance cloud applications.",
          cta: { label: "Explore app modernisation", href: "https://aptacloud.com/application-modernization/" },
        },
      },
      {
        id: "microsoft",
        label: "Microsoft Services",
        column: {
          title: "Microsoft Services",
          text: "Collaboration, business applications, and low-code suites your teams already know.",
          links: [
            { label: "Microsoft 365", href: "https://aptacloud.com/services/microsoft/microsoft-365/" },
            { label: "Microsoft Teams", href: "https://aptacloud.com/services/microsoft/teams/" },
            { label: "Microsoft Copilot", href: "https://aptacloud.com/services/microsoft/copilot-studio/" },
            { label: "Microsoft Dynamics 365", href: "https://aptacloud.com/services/microsoft/microsoft-dynamics-365/" },
            { label: "Microsoft Power BI", href: "https://aptacloud.com/services/microsoft/power-bi/" },
            { label: "Power Platform", href: "https://aptacloud.com/services/microsoft/power-platform/" },
            { label: "Microsoft SharePoint", href: "https://aptacloud.com/services/microsoft/sharepoint/" },
            { label: "Identity & Security", href: "https://aptacloud.com/services/microsoft/identity-security/" },
            { label: "Cloud Storage & Databases", href: "https://aptacloud.com/services/microsoft/cloud-storage/" },
          ],
        },
        promo: {
          logo: "/images/microsoft/microsoft-365.svg",
          logoAlt: "Microsoft 365",
          eyebrow: "Certified Partner",
          title: "Full Microsoft Business Suite",
          text: "The complete Microsoft ecosystem tailored for productivity, collaboration and security.",
          cta: { label: "Explore Microsoft services", href: "#microsoft" },
        },
      },
      {
        id: "azure",
        label: "Azure Cloud",
        column: {
          title: "Azure Cloud Services",
          text: "End-to-end Azure support from workload migration to round-the-clock managed cloud.",
          links: [
            { label: "Azure Hosting", href: "https://aptacloud.com/azure-hosting/" },
            { label: "Azure Migration", href: "https://aptacloud.com/azure-migration/" },
            { label: "Azure Implementation", href: "https://aptacloud.com/azure-implementation/" },
            { label: "Azure Optimisation", href: "https://aptacloud.com/azure-optimization/" },
            { label: "Azure Managed Services", href: "https://aptacloud.com/azure-managed-services/" },
            { label: "Azure Security", href: "https://aptacloud.com/azure-security/" },
          ],
        },
        promo: {
          logo: "/images/microsoft/azure.svg",
          logoAlt: "Microsoft Azure",
          eyebrow: "Cloud Excellence",
          title: "Modernise Your Infrastructure",
          text: "Smarter operations, enhanced data security, and seamless digital transformation on Azure.",
          cta: { label: "Explore Azure hosting", href: "https://aptacloud.com/azure-hosting/" },
        },
      },
      {
        id: "aws",
        label: "AWS Cloud",
        column: {
          title: "AWS Cloud Services",
          text: "Comprehensive AWS cloud infrastructure design, deployment, optimisation, and security.",
          links: [
            { label: "AWS Compute", href: "https://aptacloud.com/aws-compute/" },
            { label: "AWS Migration", href: "https://aptacloud.com/aws-migration-services/" },
            { label: "AWS Implementation", href: "https://aptacloud.com/aws-implementation/" },
            { label: "AWS Optimisation", href: "https://aptacloud.com/aws-optimization/" },
            { label: "AWS Managed Services", href: "https://aptacloud.com/aws-managed-services/" },
            { label: "AWS Security", href: "https://aptacloud.com/aws-security/" },
          ],
        },
        promo: {
          logo: "/images/microsoft/power-platform.svg",
          logoAlt: "AWS Cloud",
          eyebrow: "Multi-Cloud Expertise",
          title: "Scale Reliably on AWS",
          text: "Robust architectures with automated failover, load balancing, and cost governance.",
          cta: { label: "Talk to a cloud expert", href: "#contact" },
        },
      },
    ],
    footer: { text: "Not sure where to begin? The AI Assessment Workshop maps out your path.", link: CONSULT },
  },
  {
    id: "industries",
    label: "Industries",
    kind: "columns",
    columns: [
      {
        title: "Insurance",
        text: "Automate policy processing, claims adjustment and compliance workflows.",
        links: [
          { label: "Carriers", href: "https://aptacloud.com/industry/insurance/carriers/" },
          { label: "Managing General Agents (MGA)", href: "https://aptacloud.com/industry/insurance/managing-general-agents/" },
          { label: "Third Party Adjusters (TPA)", href: "https://aptacloud.com/industry/insurance/third-party-adjusters/" },
          { label: "Independent Agents", href: "https://aptacloud.com/industry/insurance/independent-agents/" },
        ],
      },
      {
        title: "Oil & Gas",
        text: "Connect well sites, pipeline maintenance, and refining operations with real-time analytics.",
        links: [
          { label: "Major Operators", href: "https://aptacloud.com/industry/oil-gas/major-operators/" },
          { label: "Drilling & Well Services", href: "https://aptacloud.com/industry/oil-gas/drilling-and-well-services/" },
          { label: "Pipeline Maintenance", href: "https://aptacloud.com/industry/oil-gas/pipeline-maintenance/" },
          { label: "Refining & Distribution", href: "https://aptacloud.com/industry/oil-gas/refining-and-distribution/" },
        ],
      },
      {
        title: "Engineering & Construction",
        text: "Streamline field operations, BIM collaboration, and multi-site project controls.",
        links: [
          { label: "Construction", href: "https://aptacloud.com/industry/engineering-and-construction/construction/" },
          { label: "Engineering & Design", href: "https://aptacloud.com/industry/engineering-and-construction/engineering-and-design/" },
          { label: "Field Services", href: "https://aptacloud.com/industry/engineering-and-construction/field-services/" },
        ],
      },
    ],
    footer: { text: "Don’t see your sector? We deliver solutions across diverse industries.", link: { label: "Talk to an industry specialist", href: "#contact" } },
  },
  {
    id: "about",
    label: "About",
    kind: "columns",
    lead: {
      logo: "/images/aptacloud-logo.webp",
      logoAlt: BRAND.name,
      eyebrow: `About ${BRAND.name}`,
      title: "Your Path to Measurable AI ROI",
      text: `${BRAND.name} is a premier technology consulting firm specialising in modern cloud systems, IT infrastructure, software engineering, and enterprise AI integration.`,
      cta: { label: `More about ${BRAND.name}`, href: "https://aptacloud.com/about-us" },
    },
    columns: [
      {
        title: "Company",
        links: [
          { label: "Know More About Aptacloud", href: "https://aptacloud.com/about-us" },
          { label: "Our Story", href: "https://aptacloud.com/about-us#our-story" },
          { label: "Leadership Team", href: "https://aptacloud.com/about-us#team1" },
          { label: "Global Locations", href: "https://aptacloud.com/about-us#locations" },
          { label: "Careers", href: "https://aptacloud.com/careers/" },
        ],
      },
      {
        title: "Insights & Media",
        links: [
          { label: "Aptacloud Blog", href: "https://aptacloud.com/blog/" },
          { label: "White Papers", href: "https://aptacloud.com/whitepaper/" },
          { label: "Events", href: "https://aptacloud.com/events/" },
          { label: "Contact Us", href: "#contact" },
        ],
      },
    ],
    footer: { text: "20+ years of collective experience · Hundreds of enterprises empowered", link: { label: "Let’s talk", href: "#contact" } },
  },
];
