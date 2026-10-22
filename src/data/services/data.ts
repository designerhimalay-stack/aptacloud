// Data & Analytics pages. Topics follow the live aptacloud.com pages; copy
// rewritten to Brand Guidelines v2.0 and Content Writing Guidelines v2.0.

import type { ServicePage } from "./types";

export const DATA_PAGES: ServicePage[] = [
  {
    slug: "data-engineering",
    category: "data",
    name: "Data Engineering",
    summary: "Pipelines, integration, and governance on one trusted data layer.",
    seo: {
      title: "Data Engineering Services | AptaCloud",
      description:
        "Data pipelines, integration, and governance on Microsoft Fabric and Azure, so your reporting and AI run on one trusted data layer.",
    },
    hero: {
      title: "One trusted data layer for",
      accent: "reporting and AI.",
      lead: "AptaCloud's data engineers connect your scattered systems into pipelines and models your teams can trust. We build on Microsoft Fabric and Azure, around the systems you already run, so reporting and artificial intelligence (AI) work from the same data.",
      photo: {
        src: "/images/photos/services/data-eng.jpg",
        alt: "A data engineer working on pipeline code across several monitors",
        position: "50% 42%",
      },
      chip: { title: "Data platform", items: ["Pipelines and integration", "Data quality", "Governance"] },
      marks: ["azure", "databricks", "airflow"],
    },
    cta: {
      label: "Map your data in a proof of concept",
      short: "Map your data",
      heading: "See your scattered data working as one.",
      lead: "Tell us which systems hold the data you need. We will show how it connects, using a sample of your own data.",
    },
    pains: {
      heading: "Signs your data layer is holding you back.",
      lead: "Reporting and AI both fail quietly when the data underneath them is not trusted.",
      items: [
        { title: "Every report starts with a spreadsheet export.", text: "Analysts spend days preparing data before anyone can use it." },
        { title: "Two systems give two different answers.", text: "Meetings argue about whose number is right instead of what to do." },
        { title: "Every source sends data in a different format.", text: "Each new partner or system means another manual mapping job." },
        { title: "Our AI plans are stuck on data quality.", text: "Models trained on inconsistent data give answers nobody trusts." },
        { title: "Nobody knows who owns which data.", text: "Access, quality, and retention rules are applied unevenly, or not at all." },
      ],
    },
    services: {
      heading: "Data engineering services, from source to insight.",
      lead: "We build the layer once, properly, so every report and model can rely on it.",
      items: [
        {
          title: "Data architecture and consulting",
          text: "We design a data architecture that fits your systems, volumes, and reporting needs.",
          outcome: "A clear target design and a phased plan to reach it.",
          icon: "layers",
          tools: ["fabric", "azure", "databricks"],
        },
        {
          title: "Data pipelines and integration",
          text: "Batch and real-time pipelines that move data from your source systems into one place.",
          outcome: "Fresh data, without manual exports.",
          icon: "pipe",
          tools: ["azureDataFactory", "airflow", "kafka", "spark"],
        },
        {
          title: "Data cleaning and modelling",
          text: "We clean, standardise, and model your data so it means the same thing everywhere.",
          outcome: "One definition of each number across the business.",
          icon: "db",
          tools: ["dbt", "fabric", "python", "sqlServer"],
        },
        {
          title: "Data governance and security",
          text: "Ownership, access rules, lineage, and retention, set up alongside the platform.",
          outcome: "Data you can audit and share with confidence.",
          icon: "shield",
          tools: ["entra", "fabric", "azure"],
        },
        {
          title: "Data migration",
          text: "We move data from legacy databases and file stores to Azure, with validation at each step.",
          outcome: "No lost or duplicated records at cut-over.",
          icon: "migrate",
          tools: ["azureSQL", "oracle", "postgres", "azureDataFactory"],
        },
        {
          title: "Cloud data platform setup",
          text: "We stand up Microsoft Fabric, Azure Synapse Analytics, or Databricks, sized for your workload.",
          outcome: "A platform that scales without surprise costs.",
          icon: "cloud",
          tools: ["fabric", "azureSynapse", "databricks", "terraform"],
        },
      ],
    },
    industries: {
      heading: "Where clean data changes the work.",
      lead: "Each of our industries has its own version of the same problem: data that will not line up.",
      items: {
        insurance: {
          useCase: "Normalise bordereaux and claims data that arrives in a different format from every carrier.",
          outcome: "One clean dataset for reporting to capacity providers.",
        },
        oilgas: {
          useCase: "Bring inspection, supervisory control and data acquisition (SCADA), and maintenance data into one queryable store.",
          outcome: "Engineers query asset history without chasing files.",
        },
        construction: {
          useCase: "Connect project, estimating, and accounting systems such as Procore, Sage, and Autodesk.",
          outcome: "Job cost data flows without rekeying.",
        },
      },
    },
    process: {
      heading: "How we build your data platform.",
      lead: "Six phases, one source system at a time, so value arrives early.",
      timeline: "First production pipeline: typically 4 to 8 weeks",
      steps: [
        "Map your sources, volumes, and the reports and models that depend on them.",
        "Agree data definitions, owners, and quality rules with the business.",
        "Design the target architecture, pipelines, and security model.",
        "Build pipelines and models, starting with the highest-value source.",
        "Connect reporting, applications, and AI to the new data layer.",
        "Monitor quality, cost, and performance, and add the next sources.",
      ],
    },
    why: {
      heading: "Why AptaCloud for data engineering.",
      lead: "A data platform should outlast the project that built it.",
      extra: [
        { title: "Microsoft Fabric first", text: "We design on Microsoft Fabric and Azure, so your data platform sits alongside the Microsoft tools you already use.", icon: "cloud" },
      ],
    },
    stack: ["fabric", "azureDataFactory", "azureSynapse", "azureSQL", "databricks", "snowflake", "airflow", "kafka", "spark", "dbt", "python", "postgres"],
    faqs: [
      {
        q: "Which data platform is right for our business?",
        a: "It depends on your volumes, skills, and existing licences. We compare options such as Microsoft Fabric, Azure Synapse Analytics, and Databricks during discovery and recommend one, with costs attached.",
      },
      {
        q: "How long does a data engineering project take?",
        a: "A first production pipeline typically takes 4 to 8 weeks. Larger platforms are delivered in phases, one source system at a time, so value arrives early.",
      },
      {
        q: "Can you work with our legacy databases?",
        a: "Yes. We connect to on-premises SQL Server, Oracle, and file-based sources, and migrate or replicate them to Azure with validation at every step.",
      },
      {
        q: "How secure is our data?",
        a: "We apply Microsoft Entra ID access controls, encryption, and audit logging, and set governance rules for ownership and retention as part of the build.",
      },
      {
        q: "Can you help us migrate data to the cloud?",
        a: "Yes. We migrate data to Azure with minimal downtime, running old and new systems in parallel until the numbers match.",
      },
      {
        q: "How much does data engineering cost?",
        a: "We price per phase after discovery. The proof of concept connects one or two sources, so you see the approach working on your data before you commit.",
      },
    ],
  },
  {
    slug: "data-warehousing",
    category: "data",
    name: "Data Warehousing",
    summary: "Design, migrate, and modernise warehouses on Microsoft Fabric and Azure.",
    seo: {
      title: "Data Warehousing Services | AptaCloud",
      description:
        "Data warehouse design, migration, and modernisation on Microsoft Fabric and Azure, so finance, operations, and AI work from one governed source of truth.",
    },
    hero: {
      title: "A data warehouse your whole business",
      accent: "can trust.",
      lead: "AptaCloud designs, migrates, and modernises data warehouses on Microsoft Fabric and Azure. Finance, operations, and artificial intelligence (AI) get one governed source of truth, with storage and compute costs you can explain.",
      photo: {
        src: "/images/photos/services/dwh-rack.jpg",
        alt: "An engineer working on server equipment in a data centre",
        position: "45% 55%",
      },
      chip: { title: "Data warehouse", items: ["Design and modelling", "Migration to Azure", "Ongoing support"] },
      marks: ["azure", "snowflake", "databricks"],
    },
    cta: {
      label: "Assess your warehouse modernisation",
      short: "Assess your warehouse",
      heading: "Find out what your warehouse should cost and do.",
      lead: "Tell us about your current warehouse and reporting. We will map a path to a modern platform, starting with your own data.",
    },
    pains: {
      heading: "When a data warehouse stops keeping up.",
      lead: "Most warehouses were built for a smaller business and fewer questions.",
      items: [
        { title: "Overnight loads finish after the morning meeting.", text: "Leaders decide on yesterday's numbers, or none at all." },
        { title: "Our on-premises warehouse costs more every year.", text: "Hardware, licences, and specialist support grow while performance does not." },
        { title: "Adding a new data source takes months.", text: "The business works around the warehouse with its own spreadsheets." },
        { title: "It cannot handle the data AI needs.", text: "Documents, logs, and sensor data stay outside the warehouse and outside your models." },
      ],
    },
    services: {
      heading: "Data warehousing services for the full lifecycle.",
      lead: "From a new design to a migration, and the support that keeps it fast afterwards.",
      items: [
        {
          title: "Warehouse design and development",
          text: "Dimensional models, extract, load, and transform (ELT) pipelines, and semantic layers built for how your teams report.",
          outcome: "Reports that answer questions without workarounds.",
          icon: "db",
          tools: ["fabric", "azureSynapse", "dbt", "powerBI"],
        },
        {
          title: "Warehouse migration",
          text: "We move Teradata, Oracle, and SQL Server warehouses to Azure, with parallel runs to prove the numbers match.",
          outcome: "A cloud warehouse with no surprises at cut-over.",
          icon: "migrate",
          tools: ["teradata", "oracle", "sqlServer", "azureDataFactory"],
        },
        {
          title: "Warehouse modernisation",
          text: "Separate storage and compute, add near real-time loads, and support semi-structured data.",
          outcome: "Faster queries, and data ready for AI and machine learning.",
          icon: "layers",
          tools: ["fabric", "databricks", "snowflake", "spark"],
        },
        {
          title: "Warehouse support",
          text: "Monitoring, tuning, and cost governance after go-live.",
          outcome: "Performance and spend that stay under control.",
          icon: "cog",
          tools: ["azure", "grafana", "powerBI"],
        },
      ],
    },
    industries: {
      heading: "One source of truth, in every industry we serve.",
      lead: "The questions differ by industry. The need for one governed answer does not.",
      items: {
        insurance: {
          useCase: "Bring policy, claims, and billing data into one warehouse for loss ratio and portfolio reporting.",
          outcome: "Underwriting and finance see the same numbers.",
        },
        oilgas: {
          useCase: "Store years of production, inspection, and maintenance data in one governed warehouse.",
          outcome: "Trends across assets and sites, not one spreadsheet at a time.",
        },
        construction: {
          useCase: "Combine job cost, schedule, and equipment data across every project.",
          outcome: "Margin and risk visible across the whole portfolio.",
        },
      },
    },
    process: {
      heading: "How we deliver your data warehouse.",
      lead: "Six phases, one subject area at a time, with parallel runs before every switch-over.",
      timeline: "Large-scale warehouses: 6 to 18 months, delivered in phases",
      steps: [
        "Review your current warehouse, sources, reports, and costs.",
        "Agree the subject areas, definitions, and service levels the business needs.",
        "Design the data model, platform, and migration approach.",
        "Build and load the first subject area, with parallel runs against the old system.",
        "Repoint reports and applications, then retire legacy loads.",
        "Tune performance and cost, and add the next subject areas.",
      ],
    },
    why: {
      heading: "Why AptaCloud for data warehousing.",
      lead: "We build warehouses finance can budget for and IT can run.",
      extra: [
        { title: "Costs you can explain", text: "We size storage and compute to your workload and set budgets and alerts, so finance knows what the warehouse costs.", icon: "gauge" },
      ],
    },
    stack: ["fabric", "azureSynapse", "azureSQL", "azureDataFactory", "powerBI", "snowflake", "databricks", "dbt", "teradata", "oracle", "informatica", "talend"],
    faqs: [
      {
        q: "How long does a data warehouse project take?",
        a: "It depends on size and complexity. Large-scale warehouses typically take 6 to 18 months, delivered in phases so the first subject area is live well before the end.",
      },
      {
        q: "Should we use Microsoft Fabric, Synapse, or Snowflake?",
        a: "We compare them against your data volumes, skills, and licences during discovery. For most Microsoft-centric businesses we recommend Microsoft Fabric, and we show the reasoning with costs.",
      },
      {
        q: "How do you make sure the numbers match after migration?",
        a: "We run the old and new warehouses in parallel and reconcile key figures before switching any reports over.",
      },
      {
        q: "Can a data warehouse support AI and machine learning?",
        a: "Yes. A modern warehouse stores structured and semi-structured data that AI and machine learning models can use directly.",
      },
      {
        q: "How do you keep the warehouse secure?",
        a: "Encryption, role-based access through Microsoft Entra ID, and regular access reviews, with audit logs for compliance reporting.",
      },
      {
        q: "Can it connect to our ERP and CRM systems?",
        a: "Yes. We load data from enterprise resource planning (ERP) and customer relationship management (CRM) systems, including Dynamics 365, alongside your other sources.",
      },
    ],
  },
  {
    slug: "data-visualization",
    category: "data",
    name: "Data Visualisation",
    summary: "Power BI dashboards built around the decisions each team makes.",
    seo: {
      title: "Data Visualisation and Power BI Services | AptaCloud",
      description:
        "Power BI dashboards and reports built on trusted data, so every team tracks the same numbers and acts on them sooner.",
    },
    hero: {
      title: "Dashboards your teams actually",
      accent: "use to decide.",
      lead: "AptaCloud builds Power BI dashboards and reports on trusted data, designed around the decisions each team makes. Leaders, managers, and frontline staff see the same numbers, at the level of detail they need.",
      photo: {
        src: "/images/photos/services/dataviz-monitor.jpg",
        alt: "An analyst points at a dashboard on a vertical monitor while two colleagues look on",
        position: "60% 45%",
      },
      chip: { title: "Power BI", items: ["Dashboards and reports", "Self-service analytics", "Performance tuning"] },
      marks: ["azure", "m365", "sharepoint"],
    },
    cta: {
      label: "Map your reporting in a proof of concept",
      short: "Map your reporting",
      heading: "See your key numbers on one dashboard.",
      lead: "Tell us which report takes longest to build. We will rebuild it on your data and show the difference.",
    },
    pains: {
      heading: "Why reporting still takes so long.",
      lead: "Most reporting problems are not about charts. They are about trust, speed, and relevance.",
      items: [
        { title: "Our dashboards are slow, so nobody opens them.", text: "People go back to asking analysts for spreadsheets." },
        { title: "Every team has its own version of the numbers.", text: "Decisions stall while people reconcile reports." },
        { title: "A new report takes weeks to build.", text: "By the time it is ready, the question has changed." },
        { title: "Our reports show what happened, not what to do.", text: "Leaders scroll through charts without a clear next action." },
        { title: "Field and site data never reaches the dashboard.", text: "Reports miss the operational detail that explains the numbers." },
      ],
    },
    services: {
      heading: "Data visualisation services on Power BI.",
      lead: "We design every dashboard around a decision, then build the data model that supports it.",
      items: [
        {
          title: "Dashboard and report development",
          text: "Power BI dashboards designed around each role's decisions, from board level to site level.",
          outcome: "The right number in front of the right person.",
          icon: "chart",
          tools: ["powerBI", "fabric", "m365"],
        },
        {
          title: "Data models and semantic layers",
          text: "Shared data models with one definition for each measure.",
          outcome: "Every report agrees, because they all use the same model.",
          icon: "db",
          tools: ["fabric", "powerBI", "azureSQL"],
        },
        {
          title: "Dashboard optimisation",
          text: "We speed up slow reports by fixing models, queries, and refresh schedules.",
          outcome: "Dashboards that load in seconds.",
          icon: "gauge",
          tools: ["powerBI", "fabric"],
        },
        {
          title: "Self-service analytics",
          text: "Governed datasets and training, so business users can build their own reports safely.",
          outcome: "Fewer report requests waiting on the data team.",
          icon: "search",
          tools: ["powerBI", "m365", "sharepoint"],
        },
        {
          title: "Embedded and real-time dashboards",
          text: "Dashboards inside your apps, portals, and Microsoft Teams, refreshed as data arrives.",
          outcome: "Insight where the work happens.",
          icon: "eye",
          tools: ["powerBI", "azure", "react", "kafka"],
        },
      ],
    },
    industries: {
      heading: "Dashboards built for how your industry runs.",
      lead: "We design around the measures each industry already lives by.",
      items: {
        insurance: {
          useCase: "Track submission flow, quote turnaround, and loss ratios by program in one view.",
          outcome: "Program leaders see problems while they can still act.",
        },
        oilgas: {
          useCase: "Show inspection status, open findings, and downtime across every site.",
          outcome: "Operations and clients look at one reporting layer.",
        },
        construction: {
          useCase: "Bring job cost, schedule, and change orders into one project dashboard.",
          outcome: "Project managers spot overruns before the monthly report.",
        },
      },
    },
    process: {
      heading: "How we build your dashboards.",
      lead: "Six phases, designed with the people who will use the reports.",
      timeline: "Dashboards and data platforms: a few weeks to a few months",
      steps: [
        "Interview the people who use the reports and list the decisions they make.",
        "Agree measures, definitions, and the questions each dashboard must answer.",
        "Design the data model and layouts, and test wireframes with users.",
        "Build the model and dashboards on your data, one role at a time.",
        "Publish to Power BI, Microsoft Teams, or your apps, with row-level security.",
        "Track usage and performance, retire unused reports, and refine the rest.",
      ],
    },
    why: {
      heading: "Why AptaCloud for data visualisation.",
      lead: "A dashboard is only useful if someone acts on it.",
      extra: [
        { title: "Designed for decisions", text: "We start from the decision a dashboard supports, not from the data that happens to be available.", icon: "target" },
      ],
    },
    stack: ["powerBI", "fabric", "azureSQL", "azureSynapse", "m365", "sharepoint", "tableau", "qlik", "looker", "databricks", "python", "dbt"],
    faqs: [
      {
        q: "How long does a dashboard project take?",
        a: "Typically a few weeks to a few months, depending on the number of data sources and reports. We give you an estimate once we have reviewed your requirements.",
      },
      {
        q: "Will our team need technical skills to use the dashboards?",
        a: "No. We design dashboards for the people who use them and provide short training. Power users can learn to build their own reports with governed datasets.",
      },
      {
        q: "Can you work with data from third-party systems?",
        a: "Yes. We bring data from third-party platforms, spreadsheets, and databases into one model so it can be reported together.",
      },
      {
        q: "We already use Tableau or Qlik. Can you help?",
        a: "Yes. We can optimise what you have, or plan a phased move to Power BI if that reduces cost and fits your Microsoft environment.",
      },
      {
        q: "How do you keep dashboard data secure?",
        a: "We use Microsoft Entra ID sign-in and row-level security, so each person sees only the data they are allowed to see.",
      },
      {
        q: "How much does a Power BI project cost?",
        a: "We price per phase after discovery. The proof of concept rebuilds one important report on your data, so you can judge the result first.",
      },
    ],
  },
];
