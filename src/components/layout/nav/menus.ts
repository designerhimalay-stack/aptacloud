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
            svc("Azure Migration", "azure-migration"),
            svc("Azure Implementation", "azure-implementation"),
            svc("Azure Optimisation", "azure-optimization"),
            svc("Azure Managed Services", "azure-managed-services"),
            svc("Azure Security", "azure-security"),
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
            svc("AWS Compute", "aws-compute"),
            svc("AWS Migration", "aws-migration-services"),
            svc("AWS Implementation", "aws-implementation"),
            svc("AWS Optimisation", "aws-optimization"),
            svc("AWS Managed Services", "aws-managed-services"),
            svc("AWS Security", "aws-security"),
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
          svc("Insurance overview", "industry/insurance"),
          svc("Carriers", "industry/insurance/carriers"),
          svc("Managing General Agents (MGA)", "industry/insurance/managing-general-agents"),
          svc("Third Party Adjusters (TPA)", "industry/insurance/third-party-adjusters"),
          svc("Independent Agents", "industry/insurance/independent-agents"),
        ],
      },
      {
        title: "Oil & Gas",
        text: "Connect well sites, pipeline maintenance, and refining operations with real-time analytics.",
        links: [
          svc("Oil & Gas overview", "industry/oil-gas"),
          svc("Major Operators", "industry/oil-gas/major-operators"),
          svc("Drilling & Well Services", "industry/oil-gas/drilling-and-well-services"),
          svc("Pipeline Maintenance", "industry/oil-gas/pipeline-maintenance"),
          svc("Refining & Distribution", "industry/oil-gas/refining-and-distribution"),
        ],
      },
      {
        title: "Engineering & Construction",
        text: "Streamline field operations, BIM collaboration, and multi-site project controls.",
        links: [
          svc("Engineering & Construction overview", "industry/engineering-and-construction"),
          svc("Construction", "industry/engineering-and-construction/construction"),
          svc("Engineering & Design", "industry/engineering-and-construction/engineering-and-design"),
          svc("Field Services", "industry/engineering-and-construction/field-services"),
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
      cta: { label: `More about ${BRAND.name}`, href: asset("/about-us/") },
    },
    columns: [
      {
        title: "Company",
        links: [
          { label: `About ${BRAND.name}`, href: asset("/about-us/") },
          { label: "Our story", href: asset("/about-us/#our-story") },
          { label: "Leadership team", href: asset("/about-us/#leadership") },
          { label: "Global locations", href: asset("/about-us/#locations") },
          { label: "Careers", href: asset("/careers/") },
        ],
      },
      {
        title: "Insights & Media",
        links: [
          { label: `${BRAND.name} blog`, href: asset("/blog/") },
          { label: "White papers", href: asset("/whitepaper/") },
          { label: "Events", href: asset("/events/") },
          { label: "Talk to our team", href: "#contact" },
        ],
      },
    ],
  },
];
