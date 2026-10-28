// Data & Analytics pages: every section of the live aptacloud.com page, in the
// live order, rewritten to the brand and content guidelines.

import type { ServiceLayout } from "../types";
import { COMPANY_STATS } from "./shared";

const P = "/images/photos/people";
/** Images taken from the live aptacloud.com pages (high-resolution originals only). */
const L = "/images/photos/live";

export const DATA_LAYOUTS: Record<string, ServiceLayout> = {
  /* ─────────────────────────── Data Engineering ─────────────────────────── */
  "data-engineering": {
    stats: COMPANY_STATS,
    blocks: [
      {
        kind: "split",
        id: "overview",
        tag: "Why our services",
        icon: "db",
        heading: "Why our data engineering services?",
        body: [
          "AptaCloud helps organisations get the full value from their data with practical engineering.",
          "Whether you want to improve operations, make better decisions, or drive digital transformation, our data engineering consultants guide you at every step.",
        ],
        cta: true,
        photo: { src: `${P}/data-team.jpg`, alt: "AptaCloud data engineers reviewing a pipeline design with a client on a laptop", position: "50% 40%" },
      },
      {
        kind: "cards",
        id: "services",
        tag: "What we do",
        icon: "layers",
        heading: "What data engineering services do we offer?",
        cols: 4,
        items: [
          { title: "Data engineering consulting", text: "Scalable data architectures designed for large-scale analytics and your long-term needs.", icon: "team" },
          { title: "Data collection", text: "Custom extraction from multiple sources, for high-quality data you can analyse.", icon: "search" },
          { title: "Data cleaning and processing", text: "Cleansing and preparation that remove the inconsistencies and errors behind unreliable insight.", icon: "cog" },
          { title: "Data integration", text: "Data from diverse sources brought into one view for deeper analysis.", icon: "link" },
          { title: "Data pipelines", text: "Efficient, real-time pipelines from extraction through transformation to loading.", icon: "pipe" },
          { title: "Data migration", text: "System moves to Azure and other clouds with minimal downtime, into central stores that improve analytics.", icon: "migrate" },
          { title: "Data management and governance", text: "Governance frameworks for data accuracy, security, and regulatory compliance.", icon: "shield" },
          { title: "Data security", text: "Encryption, continuous monitoring, and proven security measures that prevent breaches.", icon: "eye" },
        ],
      },
      {
        kind: "split",
        id: "benefits",
        tag: "Why AptaCloud",
        icon: "team",
        heading: "What you gain with AptaCloud.",
        lead: "One team across the full data lifecycle, with the depth to make your data pay back.",
        reverse: true,
        photo: { src: `${L}/de-monitors.jpg`, alt: "Two data engineers reviewing pipeline metrics across several monitors", position: "50% 45%" },
        items: [
          { title: "More value from your data", text: "Raw data turned into insight that drives business outcomes.", icon: "spark" },
          { title: "Better decisions", text: "Smarter, faster decisions from one data-driven view of the business.", icon: "target" },
          { title: "Higher efficiency", text: "Streamlined data workflows with fewer bottlenecks.", icon: "flow" },
          { title: "Room to scale", text: "Flexible solutions that grow and adapt with your business.", icon: "chart" },
          { title: "Deep, tailored expertise", text: "Years of industry knowledge and a strategy shaped around your needs.", icon: "layers" },
        ],
      },
      {
        kind: "banner",
        heading: "Improve your data infrastructure.",
        text: "Partner with AptaCloud to future-proof your data strategy.",
        photo: { src: `${L}/datacentre-servers.jpg`, alt: "Rows of servers in a data centre", position: "50% 50%" },
      },
      {
        kind: "steps",
        id: "process",
        tag: "How we work",
        icon: "flow",
        heading: "What process do we follow?",
        lead: "Six steps from the first conversation to a pipeline we monitor in production.",
        steps: [
          { title: "Discovery", text: "We learn your business needs, challenges, and goals to shape a data strategy that fits." },
          { title: "Data collection", text: "We gather data from multiple sources and make sure it is relevant, clean, and ready." },
          { title: "Data cleaning", text: "Proven tools and techniques clean, transform, and prepare data for quality and integrity." },
          { title: "Data integration", text: "Data from different systems brought into one structure for easy access and analysis." },
          { title: "Analysis and visualisation", text: "Insight delivered through clear visuals and reports that are easy to act on." },
          { title: "Deployment and monitoring", text: "We monitor performance after go-live and keep tuning for better results." },
        ],
      },
      { kind: "industries" },
      {
        kind: "logos",
        id: "tools",
        tag: "Tools and platforms",
        icon: "db",
        heading: "Tools and platforms we work with.",
        lead: "Microsoft Fabric and Power BI first, alongside the platforms your data already lives on.",
        ids: ["fabric", "powerBI", "sqlServer", "snowflake", "bigquery", "redshift", "dataStudio"],
      },
      { kind: "faq" },
    ],
    faqs: [
      {
        q: "How do we know which data solution is right for our business?",
        a: "We work closely with you during discovery to understand your challenges and goals, then propose a solution built around your needs.",
      },
      {
        q: "How secure is our data?",
        a: "Security comes first. We apply encryption, monitoring, and compliance controls to protect your data at every step.",
      },
      {
        q: "Can you help with cloud migration?",
        a: "Yes. We migrate data platforms to Azure, AWS, and Google Cloud with minimal downtime, ready to scale.",
      },
      {
        q: "What's the typical timeline for a data engineering project?",
        a: "It depends on scope. We agree a phased plan with clear milestones after discovery, so you know what is delivered and when.",
      },
      {
        q: "How do we get started with AptaCloud?",
        a: "Book an initial consultation. We'll assess your needs and propose a strategy to help you reach your data goals.",
      },
      {
        q: "Do you work with Microsoft Fabric?",
        a: "Yes. We are Microsoft-first and build many data platforms on Microsoft Fabric and Azure, with Power BI for reporting.",
      },
    ],
  },

  /* ─────────────────────────── Data Warehousing ─────────────────────────── */
  "data-warehousing": {
    stats: COMPANY_STATS,
    blocks: [
      {
        kind: "split",
        id: "overview",
        tag: "Why our services",
        icon: "db",
        heading: "Why our data warehousing services?",
        body: [
          "AptaCloud's data warehousing services help businesses centralise, analyse, and act on their data.",
          "With us, you improve operational efficiency, make decisions from one trusted source, and keep your data secure and compliant.",
        ],
        cta: true,
        reverse: true,
        photo: { src: `${P}/consult-present.jpg`, alt: "An AptaCloud data lead presenting warehouse reporting to a client team", position: "55% 50%" },
      },
      {
        kind: "cards",
        id: "services",
        tag: "What we do",
        icon: "layers",
        heading: "What services do we offer?",
        style: "centered",
        head: "center",
        cols: 2,
        items: [
          { title: "Data warehouse migration", text: "We move legacy warehouses to modern cloud platforms such as Microsoft Fabric and Azure, with migration plans built around data integrity, reliability, and your business goals.", icon: "migrate" },
          { title: "Warehouse design and development", text: "Warehouses designed around your business, with ETL and ELT pipelines, solid data modelling, and integration that scales as you grow.", icon: "db" },
          { title: "Data warehouse modernisation", text: "Modern architecture that improves performance, handles big data, and supports AI-powered insight, so your data platform keeps up.", icon: "spark" },
          { title: "Data warehouse support", text: "Issue resolution, optimisation, and proactive maintenance that keep data quality high and the platform reliable.", icon: "shield" },
        ],
      },
      {
        kind: "banner",
        heading: "Improve your data infrastructure.",
        text: "Partner with AptaCloud to future-proof your data strategy.",
        photo: { src: `${L}/servers-cloud.jpg`, alt: "A data centre aisle with a cloud above the server racks", position: "50% 50%" },
      },
      {
        kind: "cards",
        id: "benefits",
        tag: "Benefits",
        icon: "spark",
        heading: "Benefits of working with AptaCloud.",
        style: "centered",
        head: "center",
        cols: 2,
        items: [
          { title: "Built for your business", text: "Solutions shaped around your requirements and operational goals, for efficiency and room to adapt.", icon: "target" },
          { title: "Cost optimisation", text: "Separate storage and compute scale with demand, so you pay for what the business uses.", icon: "gauge" },
          { title: "Ready for AI and big data", text: "Structured, semi-structured, and unstructured data ready for machine learning and predictive analytics.", icon: "chart" },
          { title: "Secure and reliable", text: "Encryption, role-based access, and compliance controls keep your data safe and available.", icon: "shield" },
        ],
      },
      {
        kind: "steps",
        id: "process",
        tag: "How we work",
        icon: "flow",
        heading: "What process do we follow?",
        lead: "Four stages, from kickoff to ongoing managed support.",
        variant: "curve",
        steps: [
          { title: "Onboard and kickoff", text: "We set up the cloud environment, connect your systems, define scope, and agree security policies." },
          { title: "Review and optimise", text: "Day-to-day management: monitoring, updates, and tuning for performance, availability, and reliability." },
          { title: "Enhance", text: "Auto-scaling, resource allocation, and performance tuning that improve agility and find cost savings." },
          { title: "Managed support", text: "Ongoing monitoring and troubleshooting, with expert support that keeps the platform secure and available." },
        ],
      },
      { kind: "industries" },
      {
        kind: "logos",
        id: "tools",
        tag: "Our tools",
        icon: "db",
        layout: "board",
        heading: "Our tools.",
        lead: "We work with proven platforms to deliver enterprise-grade data warehousing, Microsoft first.",
        ids: ["azure", "fabric", "sqlServer", "snowflake", "bigquery", "redshift", "oracle", "ibm", "teradata", "airflow", "informatica", "talend"],
        categories: [
          { label: "Microsoft data platform", text: "Where most of our warehouses are built, run, and governed.", ids: ["fabric", "azure", "sqlServer"] },
          { label: "Cloud warehouses", ids: ["snowflake", "bigquery", "redshift"] },
          { label: "Enterprise databases", ids: ["oracle", "ibm", "teradata"] },
          { label: "Integration and orchestration", ids: ["airflow", "informatica", "talend"] },
        ],
      },
      { kind: "faq" },
    ],
    faqs: [
      { q: "How does a data warehouse benefit a business?", a: "It centralises and organises large volumes of data, so analytics, compliance, and decisions all start from one trusted source." },
      { q: "How long does a data warehouse project take?", a: "It depends on complexity. Large-scale enterprise deployments typically take 6 to 18 months, delivered in phases so value arrives early." },
      { q: "How secure are your data warehousing solutions?", a: "Security comes first: encryption, access controls, and regular compliance audits on every platform we build." },
      { q: "Can your data warehouses handle big data and AI workloads?", a: "Yes. Our modern architectures are designed for high-performance big data and AI applications." },
      { q: "Do you integrate with our existing systems?", a: "Yes. We connect the warehouse to your ERP, CRM, and other business systems as part of the design." },
      { q: "Can you migrate our existing warehouse to Microsoft Fabric?", a: "Yes. We migrate warehouses from SQL Server, Oracle, Teradata, and other platforms to Microsoft Fabric and Azure, with validation at every step." },
    ],
  },

  /* ─────────────────────────── Data Visualisation ─────────────────────────── */
  "data-visualization": {
    stats: COMPANY_STATS,
    blocks: [
      {
        kind: "split",
        id: "overview",
        tag: "Why AptaCloud",
        icon: "chart",
        heading: "Why choose AptaCloud?",
        body: [
          "We deliver data analytics and visualisation services shaped around your business objectives, with scalability, security, and compliance built in.",
          "Whether you want to streamline reporting, improve decision-making, or run operations more efficiently, our team designs the strategy with you.",
        ],
        cta: true,
        reverse: true,
        photo: { src: `${L}/dv-laptop.jpg`, alt: "A laptop showing an analytics dashboard with charts and KPIs", position: "50% 50%" },
      },
      {
        kind: "panels",
        id: "services",
        tag: "What we do",
        icon: "layers",
        heading: "What services do we offer?",
        groups: [
          {
            title: "Data analytics services",
            text: "Insight that drives growth and efficiency. We help you find the patterns, trends, and outliers in your data, so decisions rest on reliable, real-time information.",
            items: [
              { title: "Data platform development", text: "Custom platforms that keep data flowing across the business, from collection to cleaning, centralised and easy to analyse." },
              { title: "Data cleaning and preprocessing", text: "Proven tools clean, transform, and prepare data to the highest quality before any analysis begins." },
              { title: "Data integration", text: "Data from multiple systems brought into one structure for easy access and better analysis." },
              { title: "Data analysis", text: "We analyse the integrated data to find patterns and trends you can act on." },
              { title: "Scalable analytics solutions", text: "Analytics that scales as you grow, from one team to the whole organisation." },
            ],
          },
          {
            title: "Data visualisation services",
            text: "Complex data turned into clear, engaging insight. With intuitive dashboards and interactive reports, your teams make informed decisions faster.",
            items: [
              { title: "Reports and dashboards development", text: "Dashboards and reports for every level of analytics experience that simplify complex data, show trends, and track KPIs." },
              { title: "Dashboard optimisation", text: "Existing dashboards made faster and clearer, with better load times and visuals." },
              { title: "Visualisation with cloud integration", text: "Real-time, central dashboards that combine sources on Azure and other cloud platforms." },
              { title: "Interactive visualisations", text: "Visuals people can explore for themselves, for deeper insight." },
            ],
          },
        ],
      },
      {
        kind: "cards",
        id: "benefits",
        tag: "Benefits",
        icon: "spark",
        heading: "Benefits of our services.",
        style: "centered",
        head: "center",
        cols: 3,
        items: [
          { title: "Better decisions", text: "Insight that helps teams make faster, better-informed decisions.", icon: "target" },
          { title: "Cost efficiency", text: "Lower operating costs from an optimised data infrastructure and streamlined processes.", icon: "gauge" },
          { title: "Higher productivity", text: "Automated data processes and easier access lift efficiency across teams.", icon: "team" },
          { title: "Built for your business", text: "Solutions designed around your specific needs and objectives.", icon: "layers" },
          { title: "Scales with you", text: "Architecture that grows with your business, whatever its size.", icon: "chart" },
          { title: "Clear visibility", text: "Easy-to-use dashboards and reports that make complex data clear.", icon: "eye" },
        ],
      },
      {
        kind: "banner",
        heading: "Get more from your reporting.",
        text: "Partner with AptaCloud to future-proof your data strategy.",
        photo: { src: `${L}/dv-monitors.jpg`, alt: "Monitors showing interactive dashboards with maps and charts", position: "50% 50%" },
      },
      {
        kind: "steps",
        id: "process",
        tag: "How we work",
        icon: "flow",
        heading: "What process do we follow?",
        lead: "Six steps from understanding your goals to dashboards we monitor in use.",
        variant: "curve",
        steps: [
          { title: "Discovery", text: "We learn your business needs, challenges, and goals to shape a data strategy that fits." },
          { title: "Data collection", text: "We gather data from multiple sources and make sure it is relevant, clean, and ready." },
          { title: "Data cleaning", text: "Proven tools clean, transform, and prepare data for quality and integrity." },
          { title: "Data integration", text: "Data from different systems brought into one structure for easy access." },
          { title: "Analysis and visualisation", text: "Insight delivered through clear visuals and reports that are easy to act on." },
          { title: "Deployment and monitoring", text: "We monitor dashboards after go-live and keep improving them." },
        ],
      },
      { kind: "industries" },
      {
        kind: "logos",
        id: "tools",
        tag: "Our tools",
        icon: "chart",
        layout: "board",
        heading: "Our tools.",
        lead: "Power BI on Microsoft Fabric first, and we work with the BI tools and data platforms you already have.",
        ids: ["tableau", "powerBI", "dataStudio", "looker", "qlik", "sqlServer", "redshift", "bigquery", "snowflake", "azure", "oracle", "ibm", "airflow", "informatica", "talend", "teradata"],
        categories: [
          { label: "Microsoft analytics", text: "Power BI on your Microsoft data, where most of our dashboards are built.", ids: ["powerBI", "azure", "sqlServer"] },
          { label: "BI and visualisation", ids: ["tableau", "looker", "qlik", "dataStudio"] },
          { label: "Cloud warehouses", ids: ["snowflake", "bigquery", "redshift"] },
          { label: "Enterprise databases", ids: ["oracle", "ibm", "teradata"] },
          { label: "Integration and orchestration", ids: ["airflow", "informatica", "talend"] },
        ],
      },
      { kind: "faq" },
    ],
    faqs: [
      { q: "How do we know if data analytics is right for our business?", a: "If decisions wait on spreadsheets, or teams argue about whose numbers are right, analytics will pay back. It brings your data together so reporting, compliance, and decisions start from one source." },
      { q: "What types of businesses do you work with?", a: "We focus on mid-sized insurance, oil & gas, and engineering & construction firms, and our solutions adapt to the size and needs of each business." },
      { q: "How long does it take to build a data platform or dashboard?", a: "It depends on complexity, typically from a few weeks to a few months. We give you a timeline based on your requirements before work starts." },
      { q: "Will our team need technical skills to use the dashboards?", a: "No. We design dashboards to be easy to use for anyone, whatever their technical background, and we train your team." },
      { q: "Can you integrate data from third-party sources?", a: "Yes. We bring data from multiple sources, including third-party platforms, into one place so it is all accessible." },
      { q: "Do you work with Power BI?", a: "Yes. Power BI on Microsoft Fabric is our first choice, and we also support Tableau, Qlik, and Looker where you already use them." },
    ],
  },
};
