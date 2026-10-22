// Nav menu content updated as per AptaCloud (https://aptacloud.com/) with Australian English.
// One shell for every panel — a 3-column grid + a trust strip (no CTA) — filled from three building blocks:
//   tabs   — Services: categories; hovering/focusing one swaps the next two cells
//   column — a header, an optional two-line intro and its links
//   promo  — a highlighted card: logo, eyebrow, title, copy and a CTA

import { BRAND, asset, home } from "@/brand/brand";

/** Link to a service page on this site (slugs keep the live site's US spelling).
 *  Labels mirror src/data/services; kept here so the nav island stays light. */
const svc = (label: string, slug: string): NavLink => ({ label, href: asset(`/${slug}/`) });

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
} & (
  | { kind: "tabs"; tabsTitle: string; tabs: NavTab[] }
  | { kind: "columns"; lead?: NavPromo; columns: NavColumn[] }
);

export const MENUS: NavMenu[] = [
  {
    id: "services",
    label: "Services",
    kind: "tabs",
    tabsTitle: "What we do",
    tabs: [
      {
        id: "ai",
        label: "Artificial Intelligence",
        column: {
          title: "Artificial Intelligence",
          text: "Find where AI pays off first, then take it from pilot to production.",
          links: [
            svc("AI Consulting", "ai-consulting"),
            svc("AI Agents", "ai-agents"),
            svc("Generative AI", "generative-ai"),
            svc("Machine Learning", "machine-learning"),
          ],
        },
        promo: {
          logo: "/images/microsoft/copilot.svg",
          logoAlt: "Microsoft Copilot",
          eyebrow: "Flagship Programme",
          title: "AI Assessment Workshop",
          text: "A tailored workshop that shows where AI can automate your operations and what it should return.",
          cta: { label: "See what the workshop covers", href: home("#workshop") },
        },
      },
      {
        id: "data",
        label: "Data & Analytics",
        column: {
          title: "Data & Analytics",
          text: "Build the trusted data layer your reporting and AI depend on.",
          links: [
            svc("Data Engineering", "data-engineering"),
            svc("Data Warehousing", "data-warehousing"),
            svc("Data Visualisation", "data-visualization"),
          ],
        },
        promo: {
          logo: "/images/microsoft/azure.svg",
          logoAlt: "Microsoft Azure",
          eyebrow: "Data Foundations",
          title: "One Trusted Data Layer",
          text: "Pipelines, warehouses, and Power BI on Microsoft Fabric and Azure, built around the systems you run.",
          cta: { label: "Explore data engineering", href: asset("/data-engineering/") },
        },
      },
      {
        id: "app-mod",
        label: "Application Modernisation",
        column: {
          title: "Application Modernisation",
          text: "Keep the systems your business runs on, and make them connect, scale, and support AI.",
          links: [
            svc("Legacy Application Migration", "legacy-application-migration"),
            svc("Application Modernisation", "application-modernization"),
            svc("Application Re-engineering", "application-re-engineering"),
          ],
        },
        promo: {
          logo: "/images/microsoft/azure.svg",
          logoAlt: "Microsoft Azure",
          eyebrow: "Modernise Without Starting Over",
          title: "Modernise Core Applications",
          text: "Phased re-platforming and re-architecture on Microsoft Azure, with no operational shutdown.",
          cta: { label: "Explore app modernisation", href: asset("/application-modernization/") },
        },
      },
      {
        id: "microsoft",
        label: "Microsoft Services",
        column: {
          title: "Microsoft Services",
          text: "Collaboration, business applications, and low-code suites your teams already know.",
          links: [
            svc("Microsoft 365", "services/microsoft/microsoft-365"),
            svc("Microsoft Teams", "services/microsoft/teams"),
            svc("Microsoft Copilot", "services/microsoft/copilot-studio"),
            svc("Microsoft Dynamics 365", "services/microsoft/microsoft-dynamics-365"),
            svc("Microsoft Power BI", "services/microsoft/power-bi"),
            svc("Power Platform", "services/microsoft/power-platform"),
            svc("Microsoft SharePoint", "services/microsoft/sharepoint"),
            svc("Identity & Security", "services/microsoft/identity-security"),
            svc("Cloud Storage & Databases", "services/microsoft/cloud-storage"),
          ],
        },
        promo: {
          logo: "/images/microsoft/microsoft-365.svg",
          logoAlt: "Microsoft 365",
          eyebrow: "Certified Partner",
          title: "Full Microsoft Business Suite",
          text: "The complete Microsoft ecosystem tailored for productivity, collaboration and security.",
          cta: { label: "Explore Microsoft 365", href: asset("/services/microsoft/microsoft-365/") },
        },
      },
      {
        id: "azure",
        label: "Azure Cloud",
        column: {
          title: "Azure Cloud Services",
          text: "Microsoft Azure support from workload migration to round-the-clock managed cloud.",
          links: [
            svc("Azure Hosting", "azure-hosting"),
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
          title: "Cloud That Costs What It Should",
          text: "Run more on Azure for less, with costs you can explain to finance.",
          cta: { label: "Get your cloud cost review", href: home("#azure") },
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
          logo: "/images/partners/aws.svg",
          logoAlt: "AWS",
          eyebrow: "Multi-Cloud Support",
          title: "Scale Reliably on AWS",
          text: "Resilient architectures with automated failover, load balancing, and cost governance.",
          cta: { label: "Talk to a cloud expert", href: "#contact" },
        },
      },
    ],
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
      text: BRAND.valueProp,
      cta: { label: `More about ${BRAND.name}`, href: "https://aptacloud.com/about-us" },
    },
    columns: [
      {
        title: "Company",
        links: [
          { label: `About ${BRAND.name}`, href: "https://aptacloud.com/about-us" },
          { label: "Our Story", href: "https://aptacloud.com/about-us#our-story" },
          { label: "Leadership Team", href: "https://aptacloud.com/about-us#team1" },
          { label: "Global Locations", href: "https://aptacloud.com/about-us#locations" },
          { label: "Careers", href: "https://aptacloud.com/careers/" },
        ],
      },
      {
        title: "Insights & Media",
        links: [
          { label: `${BRAND.name} Blog`, href: "https://aptacloud.com/blog/" },
          { label: "White Papers", href: "https://aptacloud.com/whitepaper/" },
          { label: "Events", href: "https://aptacloud.com/events/" },
          { label: "Contact Us", href: "#contact" },
        ],
      },
    ],
  },
];
