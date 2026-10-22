// Per-page section order + the extra sections each live aptacloud.com page has
// (benefits, use cases, tools, frameworks, readiness assessment). The order
// mirrors each live page's sequence after the hero; "pains" leads every page
// (the guidelines' problem block), FAQ / related / contact always close it.
// Copy rewritten to the brand guidelines: no unapproved metrics or case studies.

import type { ServiceExtras } from "./types";

export const EXTRAS: Record<string, ServiceExtras> = {
  "ai-consulting": {
    sections: ["pains", "services", "process", "why", "industries"],
  },

  "ai-agents": {
    sections: ["pains", "services", "stack", "benefits", "industries", "process", "why"],
    stackHeading: {
      heading: "Frameworks and tools we build agents with.",
      lead: "Microsoft Copilot Studio and Azure OpenAI Service first, with open frameworks where a workflow needs them.",
    },
    benefits: {
      heading: "Where your agents run.",
      lead: "We deploy each agent where the work already happens, so nobody has to learn a new tool.",
      items: [
        { title: "Microsoft Teams and chat", text: "Agents your people message like a colleague, inside Teams or your support chat.", icon: "chat" },
        { title: "Inside your web apps", text: "Embedded in portals and line-of-business apps, acting on the record in front of the user.", icon: "code" },
        { title: "Autonomous cloud agents", text: "Background agents on Azure that process queues, documents, and scheduled tasks.", icon: "cloud" },
        { title: "Mobile and field apps", text: "Voice or text agents for crews on site, with answers from approved procedures.", icon: "agent" },
        { title: "Connected through MCP", text: "Model Context Protocol connectors give agents secure, reusable access to your systems.", icon: "link" },
        { title: "Human in the loop", text: "Approval steps and escalation to a named person whenever judgement is needed.", icon: "team" },
      ],
    },
  },

  "generative-ai": {
    sections: ["pains", "useCases", "services", "stack", "process", "benefits", "why", "industries"],
    useCases: {
      heading: "Where generative AI earns its place.",
      lead: "Four areas where grounded generative AI removes the most repetitive work.",
      items: [
        { title: "Customer service", text: "Assistants that answer routine questions, summarise tickets for agents, and route people to the right team.", icon: "chat" },
        { title: "Sales and proposals", text: "Drafts of proposals, bid responses, and follow-ups from your own past work and product data.", icon: "spark" },
        { title: "Operations", text: "Document intake, report generation, and manual hand-offs turned into automated workflows.", icon: "flow" },
        { title: "Knowledge management", text: "Search and summaries across policies, manuals, and project files, with the source attached.", icon: "search" },
      ],
    },
    stackHeading: {
      heading: "Models and tools we use.",
      lead: "Azure OpenAI Service first, with the model and framework chosen per use case.",
    },
    benefits: {
      heading: "What generative AI changes for your teams.",
      lead: "The value shows up in time saved on work your specialists repeat every week.",
      items: [
        { title: "Lower cost per task", text: "Drafting, summarising, and extraction move from hours of manual effort to minutes of review.", icon: "gauge" },
        { title: "Faster responses", text: "Customers and colleagues get answers without waiting for the one person who knows.", icon: "clock" },
        { title: "Faster decisions", text: "Summaries surface what matters in long documents, so decisions do not wait on reading time.", icon: "target" },
        { title: "Time back for skilled work", text: "Specialists spend their week on judgement calls instead of formatting and searching.", icon: "team" },
      ],
    },
  },

  "machine-learning": {
    sections: ["pains", "services", "benefits", "process", "useCases", "industries", "why"],
    benefits: {
      heading: "What machine learning gives your operation.",
      lead: "Models earn their keep by changing a decision, earlier and with more evidence.",
      items: [
        { title: "Less manual work", text: "Routine classification and checks run automatically on volumes no team could review by hand.", icon: "flow" },
        { title: "Decisions on evidence", text: "Forecasts and risk scores replace spreadsheets and gut feel in planning.", icon: "chart" },
        { title: "Earlier warnings", text: "Anomalies and failure risk reach a person while they are still cheap to fix.", icon: "eye" },
        { title: "Better use of people", text: "Crews, reviewers, and budget go where the model says they matter most.", icon: "team" },
      ],
    },
    useCases: {
      heading: "Machine learning use cases we build.",
      lead: "Six patterns that fit the data mid-sized operations already collect.",
      items: [
        { title: "Predictive analysis", text: "Forecast demand, workload, and trends from your historical data.", icon: "chart" },
        { title: "Segmentation", text: "Group customers, policies, or assets by behaviour to target the right action.", icon: "layers" },
        { title: "Fraud and anomaly detection", text: "Flag unusual transactions, claims, or readings for review in near real time.", icon: "shield" },
        { title: "Planning and scheduling", text: "Predict disruption and plan inventory, crews, and logistics around it.", icon: "clock" },
        { title: "Intelligent document processing", text: "Read forms, drawings, and reports with language and vision models.", icon: "doc" },
        { title: "Quality and defect detection", text: "Computer vision that spots defects and damage from photos and inspections.", icon: "search" },
      ],
    },
  },

  "data-engineering": {
    sections: ["pains", "services", "benefits", "process", "stack", "industries", "why"],
    benefits: {
      heading: "What a trusted data layer gives you.",
      lead: "Engineering the data once, properly, pays back in every report and model built on it.",
      items: [
        { title: "More value from your data", text: "Raw data becomes something teams can query and act on.", icon: "spark" },
        { title: "Better decisions", text: "One view of the business, instead of conflicting exports.", icon: "target" },
        { title: "Less manual work", text: "Pipelines replace spreadsheet preparation and rekeying.", icon: "flow" },
        { title: "Room to grow", text: "A platform that takes new sources and volumes without a rebuild.", icon: "layers" },
        { title: "Security and governance", text: "Access, lineage, and retention rules built in from the start.", icon: "shield" },
      ],
    },
    stackHeading: {
      heading: "Our data engineering stack.",
      lead: "Microsoft Fabric and Azure first, with the open tools your team may already use.",
    },
  },

  "data-warehousing": {
    sections: ["pains", "services", "benefits", "process", "industries", "stack", "why"],
    benefits: {
      heading: "What a modern warehouse gives you.",
      lead: "One governed source of truth, with costs that follow your workload.",
      items: [
        { title: "Designed for your business", text: "Subject areas and definitions shaped around how your teams report.", icon: "target" },
        { title: "Costs that follow use", text: "Separate storage and compute, so you pay for what the business uses.", icon: "gauge" },
        { title: "Ready for AI", text: "Structured and semi-structured data that machine learning can use directly.", icon: "spark" },
        { title: "Secure and reliable", text: "Encryption, role-based access, and audit trails as standard.", icon: "shield" },
      ],
    },
    stackHeading: {
      heading: "Platforms we design and migrate.",
      lead: "We build on Microsoft Fabric and Azure, and move warehouses from the platforms you run today.",
    },
  },

  "data-visualization": {
    sections: ["pains", "why", "services", "benefits", "process", "stack", "industries"],
    benefits: {
      heading: "What better reporting gives your teams.",
      lead: "Fewer reports, used more, and trusted by everyone who reads them.",
      items: [
        { title: "Better decisions", text: "The measures each role needs, at the level of detail they act on.", icon: "target" },
        { title: "Lower reporting cost", text: "Shared models replace one-off reports built by hand every month.", icon: "gauge" },
        { title: "More productive analysts", text: "Time moves from preparing data to explaining what it means.", icon: "team" },
        { title: "Built for your business", text: "Dashboards designed around your workflows, not a template.", icon: "layers" },
        { title: "Scales with you", text: "New teams, sources, and sites added without starting again.", icon: "chart" },
        { title: "Clear visibility", text: "Complex operations shown simply, so problems surface sooner.", icon: "eye" },
      ],
    },
    stackHeading: {
      heading: "Tools we report with.",
      lead: "Power BI on Microsoft Fabric first, and we work with the tools you already have.",
    },
  },

  "legacy-application-migration": {
    sections: ["pains", "benefits", "process", "services", "why", "industries"],
    benefits: {
      heading: "What moving to Azure gives you.",
      lead: "The case for migration is rarely one big saving. It is many smaller risks removed.",
      items: [
        { title: "Lower running costs", text: "No more hardware refreshes, data centre space, or out-of-support licences.", icon: "gauge" },
        { title: "Stronger security", text: "Patching, encryption, and network controls managed on a modern platform.", icon: "shield" },
        { title: "Better reliability", text: "Failover and redundancy built in, instead of one ageing server.", icon: "cloud" },
        { title: "Faster change", text: "Cloud services for analytics and AI become available to your apps.", icon: "spark" },
        { title: "Scale on demand", text: "Capacity that follows peak periods instead of being bought for them.", icon: "chart" },
        { title: "Access from anywhere", text: "Teams reach their applications from the office, home, or site.", icon: "link" },
      ],
    },
  },

  "application-modernization": {
    sections: ["pains", "services", "process", "why", "frameworks", "industries"],
    frameworks: {
      heading: "Six ways to modernise an application.",
      lead: "We recommend one per application, from the least change to the most, based on its value and lifespan.",
      items: [
        { title: "Rehost", text: "Move as it is to Azure, with minimal changes, to reduce infrastructure dependence." },
        { title: "Re-platform", text: "Shift to managed services and modern frameworks while keeping the architecture." },
        { title: "Refactor", text: "Improve the code for performance and maintainability without changing what it does." },
        { title: "Re-architect", text: "Redesign into services that scale and deploy independently." },
        { title: "Rebuild", text: "Redevelop on a modern framework, keeping the business rules that work." },
        { title: "Replace", text: "Retire the application in favour of a platform that does the job better." },
      ],
    },
  },

  "application-re-engineering": {
    sections: ["pains", "services", "benefits", "process", "useCases", "stack", "industries", "assessment", "why"],
    benefits: {
      heading: "What re-engineering gives you.",
      lead: "A platform that keeps your data and business logic, and drops the constraints.",
      items: [
        { title: "Faster change", text: "Services and containers make updates small and safe to release.", icon: "code" },
        { title: "Better reliability", text: "Cloud infrastructure with redundancy and disaster recovery built in.", icon: "cloud" },
        { title: "Stronger security", text: "Modern secure coding practices and controls from the first release.", icon: "shield" },
        { title: "Lower cost of ownership", text: "Less on-premises infrastructure and cloud-optimised licensing.", icon: "gauge" },
        { title: "Ready for AI", text: "A stack that can take on AI, analytics, and automation features.", icon: "spark" },
        { title: "Smoother operations", text: "Automation and insight built into the workflows people use daily.", icon: "flow" },
      ],
    },
    useCases: {
      heading: "Typical re-engineering projects.",
      lead: "The same pattern repeats: keep the data and rules, rebuild what people touch.",
      items: [
        { title: "Portal to responsive app", text: "An agency or claims portal rebuilt for any device, connected to the core system.", icon: "code" },
        { title: "Desktop tool to field app", text: "A desktop tool rebuilt as an offline-capable mobile app that syncs when back in range.", icon: "agent" },
        { title: "Two systems to one data flow", text: "Disconnected operational and finance systems unified on one cloud platform.", icon: "link" },
      ],
    },
    stackHeading: {
      heading: "Our re-engineering platform.",
      lead: "Microservices, containers, and serverless on Microsoft Azure, with modern front ends.",
    },
    assessment: {
      heading: "The readiness assessment.",
      lead: "Before any rebuild, we review seven areas of your application and give you a clear plan.",
      areas: [
        "Platform overview: code, architecture, data, and integrations",
        "Business drivers: goals, outcomes, and success measures",
        "Strengths, weaknesses, and risks of modernising",
        "Future-state vision for the application",
        "Budget and timing",
        "Risk management: security, compliance, and continuity",
        "Resources: skills, availability, and partners",
      ],
      deliverables: ["A findings report", "An application modernisation plan"],
    },
  },
};
