// Artificial Intelligence pages. Topics follow the live aptacloud.com pages;
// copy rewritten to Brand Guidelines v2.0 and Content Writing Guidelines v2.0
// (Australian English, no unapproved metrics or case studies, POC-led CTA).
// Timelines marked in docs/service-pages-review.md need AptaCloud confirmation.

import type { ServicePage } from "./types";

export const AI_PAGES: ServicePage[] = [
  {
    slug: "ai-consulting",
    category: "ai",
    name: "AI Consulting",
    summary: "Find the workflow where AI pays off first, then take it to production.",
    seo: {
      title: "AI Consulting Services | AptaCloud",
      description:
        "AI consulting for mid-sized insurance, oil & gas, and construction firms. We find the workflow where AI pays off, prove it on your data, and take it to production on Microsoft Azure.",
    },
    hero: {
      title: "Take your AI plans from pilot",
      accent: "to production.",
      lead: "Most teams we talk to have already started: a pilot, a Copilot rollout, a proof of concept. Our artificial intelligence (AI) consultants find the workflow where AI pays off first, prove it on your data, and deliver it on the Microsoft tools you already run.",
      photo: {
        src: "/images/photos/services/ai-consulting.jpg",
        alt: "A consultant presents an AI readiness dashboard to an operations team in a meeting room",
        position: "55% 50%",
      },
      chip: { title: "AI readiness assessment", items: ["Data readiness", "Priority use cases", "Phased roadmap"] },
      marks: ["openai", "claude", "gemini", "grok"],
    },
    cta: {
      label: "Book an AI readiness assessment",
      short: "Book an assessment",
      heading: "Find where AI pays off in your business first.",
      lead: "Tell us about the workflow or pilot you are working on. We will map what it needs from your data and what it should return.",
    },
    pains: {
      heading: "Where AI plans stall before they pay back.",
      lead: "The model is rarely the problem. These are the patterns we see when AI initiatives fail to reach production.",
      items: [
        { title: "Leadership wants AI, but nobody has picked the first use case.", text: "Effort spreads across ideas, and none get the data or budget to finish." },
        { title: "Our pilot worked in the demo and stopped there.", text: "Without integration and an owner, it never touches a live workflow or pays back." },
        { title: "AI spend is growing without a business case.", text: "Licences and experiments pile up while finance asks what the return is." },
        { title: "Our data is not ready, and we are not sure what ready means.", text: "Models trained on scattered data give answers your teams will not trust." },
        { title: "We cannot tell what AI should and should not touch.", text: "Automating the wrong step adds risk and rework instead of removing it." },
      ],
    },
    services: {
      heading: "AI consulting services, from assessment to production.",
      lead: "Each service names what we do and what you get. Most engagements start with the readiness assessment.",
      items: [
        {
          title: "AI readiness assessment",
          text: "We review your data, cloud maturity, and workflows to find where AI can automate work first.",
          outcome: "A ranked list of use cases, with the data each one needs.",
          icon: "target",
          tools: ["azure", "fabric", "powerBI"],
        },
        {
          title: "AI strategy and roadmap",
          text: "We turn the priority use cases into a phased plan with costs, owners, and success measures.",
          outcome: "A roadmap your finance and IT leads can both sign off.",
          icon: "layers",
          tools: ["azureDevOps", "m365"],
        },
        {
          title: "Generative AI and copilots",
          text: "We build assistants on Azure OpenAI Service and Microsoft Copilot Studio, grounded in your own documents.",
          outcome: "Answers your teams can trace back to an approved source.",
          icon: "chat",
          tools: ["azureOpenAI", "copilotStudio", "claude", "gemini", "grok"],
        },
        {
          title: "Machine learning models",
          text: "Forecasting, classification, and anomaly detection models trained on your operational data.",
          outcome: "Predictions that feed decisions inside the systems you already use.",
          icon: "chart",
          tools: ["azureML", "python", "scikit", "mlflow"],
        },
        {
          title: "Workflow automation",
          text: "We automate document intake, approvals, and scheduling with Power Platform and AI agents.",
          outcome: "Fewer manual hand-offs between teams and systems.",
          icon: "flow",
          tools: ["powerPlatform", "copilot", "n8n"],
        },
        {
          title: "AI governance and monitoring",
          text: "Access controls, usage logging, and model monitoring, set up before go-live.",
          outcome: "AI you can audit, explain, and switch off when needed.",
          icon: "shield",
          tools: ["entra", "azure", "mlflow"],
        },
      ],
    },
    industries: {
      heading: "Where AI consulting pays off first.",
      lead: "We focus on three industries, so use cases start from how your operations actually run.",
      items: {
        insurance: {
          useCase: "Triage incoming submissions and route them by appetite before an underwriter opens them.",
          outcome: "Underwriters spend their time on the risks you want to write.",
        },
        oilgas: {
          useCase: "Give field crews instant answers from approved procedures and inspection history.",
          outcome: "Less time searching manuals, more time on the job in front of them.",
        },
        construction: {
          useCase: "Pull data from requests for information (RFIs), submittals, and site reports into your project systems.",
          outcome: "Project teams stop rekeying the same information into three tools.",
        },
      },
    },
    process: {
      heading: "How an AI consulting engagement runs.",
      lead: "The same six phases on every engagement, so you always know what happens next.",
      timeline: "AI readiness assessment: two weeks, fixed cost",
      steps: [
        "Interviews and a review of your data, cloud setup, and current AI efforts.",
        "Rank use cases by value and data readiness, and agree success measures.",
        "Choose the architecture, models, and controls for the first use case.",
        "Build a proof of concept on your data and test it with the people who will use it.",
        "Connect it to your live systems with your IT team, behind your access controls.",
        "Measure the result, tune the model, and plan the next use case.",
      ],
    },
    why: {
      heading: "Why AptaCloud for AI consulting.",
      lead: "Each reason is backed by how we work, not by a claim.",
      extra: [
        { title: "Honest about limits", text: "We tell you where AI will not help yet, and what has to be true of your data first.", icon: "eye" },
      ],
    },
    stack: ["azureOpenAI", "copilotStudio", "openai", "claude", "gemini", "grok", "llama", "azureML", "fabric", "langchain", "python", "mlflow"],
    faqs: [
      {
        q: "How much does AI consulting cost?",
        a: "We scope every engagement after discovery and price it per phase, so you approve each phase before it starts. The AI readiness assessment is a fixed-cost, two-week engagement, and the proof of concept is scoped to one workflow.",
      },
      {
        q: "How long until we see AI working in our business?",
        a: "The assessment takes two weeks. A proof of concept on one workflow follows, and production timing depends on how ready your data and integrations are. You get a phased timeline at the end of the Define phase.",
      },
      {
        q: "Do we need clean data before we start?",
        a: "No. Part of the assessment is measuring data readiness for each use case. Where data is the blocker, we plan the data work first, usually in Microsoft Fabric or Azure, before building the model.",
      },
      {
        q: "Will an AI consultant replace our IT team?",
        a: "No. We work alongside your IT team, use the tools they already manage, and hand over documentation and training so they can run what we build.",
      },
      {
        q: "Which AI models do you use?",
        a: "We are Microsoft-first: Azure OpenAI Service, Microsoft Copilot Studio, and Azure Machine Learning. Where another model suits the task better, such as Anthropic's Claude, Google Gemini, xAI Grok, or Meta Llama, we use it within your cloud environment and security controls.",
      },
      {
        q: "How do you keep our data secure?",
        a: "Your data stays in your Microsoft tenant. We apply Microsoft Entra ID access controls, log model usage, and agree what data each model can see before it goes live.",
      },
      {
        q: "What if our AI pilot has already stalled?",
        a: "That is the most common starting point. We review what your team built, keep what works, and plan the steps to take it into a live workflow.",
      },
    ],
  },
  {
    slug: "ai-agents",
    category: "ai",
    name: "AI Agents",
    summary: "Agents that act inside your systems and hand off to a person when it matters.",
    seo: {
      title: "AI Agent Development Services | AptaCloud",
      description:
        "We design, build, and run AI agents that take repetitive steps off your teams, grounded in your own procedures and connected to the systems you already use. Proven on your data first.",
    },
    hero: {
      title: "AI agents that do the work,",
      accent: "not just the demo.",
      lead: "AptaCloud builds artificial intelligence (AI) agents that read your procedures, act inside your systems, and hand off to a person when judgement is needed. We prove each agent on one workflow and your own data before it goes live.",
      photo: {
        src: "/images/photos/services/colleagues-laptop.jpg",
        alt: "Two colleagues reviewing an agent's output on a laptop",
        position: "50% 50%",
      },
      chip: { title: "Agent build", items: ["Grounded in your procedures", "Connected to your systems", "Human in the loop"] },
      marks: ["openai", "claude", "gemini", "grok"],
    },
    cta: {
      label: "Prove an agent on your workflow",
      short: "Prove an agent",
      heading: "Pick one workflow. We will prove an agent on it.",
      lead: "Tell us which repetitive task eats your team's day. We will show what an agent can do with it, using your own data.",
    },
    pains: {
      heading: "Why AI agents stall before production.",
      lead: "An agent that answers questions is quick to build. One your team trusts inside a live workflow is the hard part.",
      items: [
        { title: "Our chatbot answers, but it cannot do anything.", text: "Staff still copy answers into other systems, so the time saved is small." },
        { title: "Frontline staff cannot find the right procedure in time.", text: "Work slows down or gets done from memory, which adds risk on site." },
        { title: "Every request needs three logins and two hand-offs.", text: "Simple tasks wait in someone's inbox for days." },
        { title: "We do not know what the agent did, or why.", text: "Without logs and guardrails, nobody will sign it off for real work." },
        { title: "Our agent cannot see the data it needs.", text: "It gives generic answers, and your team goes back to the old way." },
      ],
    },
    services: {
      heading: "AI agent development, from one assistant to a team of agents.",
      lead: "We start with the workflow, then choose the simplest agent that does the job well.",
      items: [
        {
          title: "Knowledge and procedure agents",
          text: "Agents that answer from your approved procedures, policies, and manuals, by text or voice.",
          outcome: "Staff get the right answer, with the source attached.",
          icon: "doc",
          tools: ["azureOpenAI", "sharepoint", "claude", "elastic"],
        },
        {
          title: "Task and workflow agents",
          text: "Agents that complete multi-step tasks such as intake, data entry, and approvals inside your systems.",
          outcome: "Repetitive steps move without waiting on a person.",
          icon: "flow",
          tools: ["copilotStudio", "powerPlatform", "dynamics", "n8n"],
        },
        {
          title: "Multi-agent systems",
          text: "Several agents with defined roles that pass work between them and escalate to a person when needed.",
          outcome: "Longer processes run with a clear checkpoint and owner at each step.",
          icon: "agent",
          tools: ["openai", "claude", "gemini", "langchain"],
        },
        {
          title: "Model Context Protocol (MCP) integration",
          text: "We connect agents to your tools and data through MCP, so one agent can work across systems with the right permissions.",
          outcome: "Agents reuse secure connections instead of one-off integrations.",
          icon: "link",
          tools: ["azureFunctions", "entra", "claude"],
        },
        {
          title: "Agents in Microsoft Teams and your apps",
          text: "We deploy agents where your people already work: Microsoft Teams, your web apps, or a mobile app in the field.",
          outcome: "Adoption without asking staff to learn a new tool.",
          icon: "chat",
          tools: ["m365", "copilot", "react", "flutter"],
        },
        {
          title: "Guardrails and monitoring",
          text: "Role-based access, approval steps for sensitive actions, and a log of every agent decision.",
          outcome: "An agent your security team and auditors can review.",
          icon: "shield",
          tools: ["entra", "azure", "grafana"],
        },
      ],
    },
    industries: {
      heading: "Where agents earn their keep.",
      lead: "Agents work best on frequent, well-defined tasks. In our three industries, these are good first candidates.",
      items: {
        insurance: {
          useCase: "An intake agent that reads submissions, checks them against appetite, and drafts the file note.",
          outcome: "Underwriters start from a prepared file instead of a raw email.",
        },
        oilgas: {
          useCase: "A procedure agent that gives crews the right standard operating procedure (SOP) by voice or text on site.",
          outcome: "Answers in seconds, from the approved version only.",
        },
        construction: {
          useCase: "A field agent that turns site photos and notes into structured daily reports.",
          outcome: "Reports reach the office the same day, ready for billing and claims.",
        },
      },
    },
    process: {
      heading: "How we build an agent your team relies on.",
      lead: "Six phases, from one workflow to an agent in daily use.",
      timeline: "First agent in production: typically 4 to 8 weeks",
      steps: [
        "Map the workflow, the people involved, and the systems the agent must touch.",
        "Agree what the agent may do on its own, and where a person approves.",
        "Choose the model, tools, and permissions, and design the hand-off points.",
        "Build the agent and test it on real cases with the people who will use it.",
        "Connect it to Teams, your apps, and your systems through secure connectors.",
        "Review the logs, tune answers and actions, and extend to the next workflow.",
      ],
    },
    why: {
      heading: "Why AptaCloud for AI agents.",
      lead: "Agents touch live work, so how they are built matters as much as what they do.",
      extra: [
        { title: "Human in the loop by design", text: "Every agent has clear limits, an approval step for sensitive actions, and a person to escalate to.", icon: "agent" },
      ],
    },
    stack: ["copilotStudio", "azureOpenAI", "openai", "claude", "gemini", "grok", "langchain", "sharepoint", "m365", "powerPlatform", "azureFunctions", "n8n"],
    faqs: [
      {
        q: "What is the difference between a chatbot and an AI agent?",
        a: "A chatbot answers questions. An agent also takes actions: it can fill in a form, update a record, or start an approval, within the limits you set.",
      },
      {
        q: "How long does it take to build an AI agent?",
        a: "A first agent on one workflow typically reaches production in 4 to 8 weeks, depending on how many systems it connects to. We confirm the timeline at the end of the Define phase.",
      },
      {
        q: "How much does an AI agent cost?",
        a: "We price per phase after discovery. The proof of concept is scoped to one workflow, so you see the agent working on your data before you commit to a full build.",
      },
      {
        q: "Can AI agents work with our existing systems?",
        a: "Yes. We connect agents to Microsoft 365, Dynamics 365, SharePoint, and your line-of-business systems through APIs and Model Context Protocol connectors.",
      },
      {
        q: "How do you stop an agent making mistakes?",
        a: "We limit what each agent can do, require approval for sensitive actions, ground answers in approved sources, and log every decision so it can be reviewed.",
      },
      {
        q: "Do we have to use Microsoft Copilot Studio?",
        a: "Not always. Copilot Studio suits many Microsoft 365 workflows. For more complex agents we build on Azure OpenAI Service and other models, still inside your Microsoft environment.",
      },
      {
        q: "Can our team maintain the agents after launch?",
        a: "Yes. We hand over documentation, admin training, and monitoring dashboards, and can stay on for ongoing support if you want it.",
      },
    ],
  },
  {
    slug: "generative-ai",
    category: "ai",
    name: "Generative AI",
    summary: "Assistants, drafting, and document automation grounded in your own data.",
    seo: {
      title: "Generative AI Development Services | AptaCloud",
      description:
        "Generative AI built on your own documents and data: assistants, drafting, and document automation on Azure OpenAI Service, with the security controls your business needs.",
    },
    hero: {
      title: "Generative AI grounded in",
      accent: "your own data.",
      lead: "AptaCloud builds generative artificial intelligence (AI) tools that draft, summarise, and answer from your documents, inside your Microsoft environment. Every answer can be traced to a source, and your data stays yours.",
      photo: {
        src: "/images/photos/services/genai.jpg",
        alt: "Two colleagues reviewing a generated report together at a desk",
        position: "50% 50%",
      },
      chip: { title: "Generative AI", items: ["Answers from your documents", "Drafts and summaries", "Secure in your tenant"] },
      marks: ["openai", "claude", "gemini", "grok"],
    },
    cta: {
      label: "Test generative AI on your documents",
      short: "Test it on your data",
      heading: "See generative AI work on your own documents.",
      lead: "Share the documents or process you have in mind. We will show what a grounded assistant can do with them.",
    },
    pains: {
      heading: "Why generative AI disappoints in practice.",
      lead: "The tools are easy to try. Getting answers your teams can rely on takes more than a prompt.",
      items: [
        { title: "The answers sound right, but they are not.", text: "Staff stop trusting the tool after a few confident mistakes." },
        { title: "Our knowledge sits in thousands of files nobody can search.", text: "People rebuild answers that already exist, and new staff take longer to ramp up." },
        { title: "We cannot let sensitive data leave our environment.", text: "Security concerns block adoption, so teams use unapproved tools instead." },
        { title: "Reports and summaries still take hours to write.", text: "Skilled people spend their week formatting instead of deciding." },
      ],
    },
    services: {
      heading: "Generative AI services built for accuracy and control.",
      lead: "We design every tool to answer from your sources, inside your security boundary.",
      items: [
        {
          title: "Retrieval-augmented generation (RAG) assistants",
          text: "Assistants that search your documents and answer with citations, built on Azure OpenAI Service.",
          outcome: "Answers your teams can check against the source.",
          icon: "search",
          tools: ["azureOpenAI", "sharepoint", "elastic", "langchain"],
        },
        {
          title: "Document processing",
          text: "Extract, classify, and summarise data from forms, contracts, and reports.",
          outcome: "Data reaches your systems without manual rekeying.",
          icon: "doc",
          tools: ["azureOpenAI", "powerPlatform", "python"],
        },
        {
          title: "Content and report drafting",
          text: "Drafts of reports, emails, and summaries in your house style, ready for a person to review.",
          outcome: "Hours of writing become minutes of editing.",
          icon: "spark",
          tools: ["copilot", "openai", "claude", "gemini"],
        },
        {
          title: "Custom and fine-tuned models",
          text: "Models adapted to your terminology where a general model is not accurate enough.",
          outcome: "Better accuracy on the language your business actually uses.",
          icon: "cog",
          tools: ["azureML", "huggingface", "pytorch", "llama"],
        },
        {
          title: "Secure deployment and governance",
          text: "Private endpoints, access controls, content filters, and usage logging in your tenant.",
          outcome: "Generative AI your security team can approve.",
          icon: "shield",
          tools: ["entra", "azure", "azureOpenAI"],
        },
      ],
    },
    industries: {
      heading: "Where generative AI saves the most time.",
      lead: "The best first use cases are document-heavy tasks your specialists repeat every week.",
      items: {
        insurance: {
          useCase: "Summarise claim files and draft correspondence for adjusters to review.",
          outcome: "Adjusters spend less time reading and more time deciding.",
        },
        oilgas: {
          useCase: "Turn inspection reports and maintenance history into searchable answers.",
          outcome: "Engineers find past findings in seconds, not by digging through folders.",
        },
        construction: {
          useCase: "Draft bid responses and project reports from your past projects and specifications.",
          outcome: "Estimators start from a strong draft, not a blank page.",
        },
      },
    },
    process: {
      heading: "How we deliver generative AI.",
      lead: "Six phases, with your data and security controls agreed before anything is built.",
      timeline: "Initial results: typically 4 to 8 weeks",
      steps: [
        "Find the documents, questions, and drafting tasks that cost your teams the most time.",
        "Agree accuracy targets, what data the model may see, and who reviews outputs.",
        "Design the retrieval index, prompts, and security controls in your Azure tenant.",
        "Build on your documents and test answers with the people who will use them.",
        "Bring it into Microsoft Teams, SharePoint, or your own apps.",
        "Measure answer quality and usage, then refine prompts and sources.",
      ],
    },
    why: {
      heading: "Why AptaCloud for generative AI.",
      lead: "Accuracy and security are designed in from the first phase.",
      extra: [
        { title: "Every answer has a source", text: "We design generative AI to cite the document it used, so people can check before they act.", icon: "search" },
      ],
    },
    stack: ["azureOpenAI", "copilot", "openai", "claude", "gemini", "grok", "llama", "m365", "sharepoint", "langchain", "huggingface", "elastic"],
    faqs: [
      {
        q: "How long does a generative AI project take?",
        a: "Most businesses see initial results in 4 to 8 weeks, starting with one use case. Larger rollouts are delivered in phases after that.",
      },
      {
        q: "Will our data be used to train public models?",
        a: "No. With Azure OpenAI Service, your prompts and documents stay in your Microsoft tenant and are not used to train the underlying models.",
      },
      {
        q: "How do you stop generative AI making things up?",
        a: "We ground answers in your documents through retrieval, require citations, set confidence thresholds, and test against real questions before launch.",
      },
      {
        q: "Do we need technical staff to manage it?",
        a: "No. We hand over admin training and simple controls for updating documents and prompts. Your IT team keeps ownership of access and security.",
      },
      {
        q: "Which generative AI models do you use?",
        a: "Mainly Azure OpenAI Service (GPT models) and Microsoft Copilot. We also use Anthropic's Claude, Google Gemini, xAI Grok, or Meta Llama where they suit the task better, within the same security controls.",
      },
      {
        q: "How much does generative AI cost?",
        a: "We price per phase after discovery, and the proof of concept covers one use case. Ongoing model usage is billed through your Azure subscription, and we estimate it before you commit.",
      },
    ],
  },
  {
    slug: "machine-learning",
    category: "ai",
    name: "Machine Learning",
    summary: "Forecasting, anomaly detection, and predictive maintenance on your data.",
    seo: {
      title: "Machine Learning Development Services | AptaCloud",
      description:
        "Machine learning models for forecasting, anomaly detection, and predictive maintenance, trained on your operational data and run on Azure Machine Learning.",
    },
    hero: {
      title: "Machine learning that sees",
      accent: "problems coming.",
      lead: "AptaCloud builds machine learning (ML) models that forecast demand, flag anomalies, and predict failures from the data your operations already collect. We prove the model on your data, then run it inside the systems your teams use.",
      photo: {
        src: "/images/photos/services/ml-robotics.jpg",
        alt: "Two engineers training a collaborative robot arm in a lab",
        position: "45% 45%",
      },
      chip: { title: "ML model", items: ["Forecasting", "Anomaly detection", "Predictive maintenance"] },
      marks: ["azureML", "python", "databricks"],
    },
    cta: {
      label: "Prove a model on your data",
      short: "Prove a model",
      heading: "See what your operational data can predict.",
      lead: "Tell us the decision you want to make earlier. We will test whether your data can support a model for it.",
    },
    pains: {
      heading: "Why machine learning projects stall.",
      lead: "Most organisations have the data. The gap is between a working model and a decision that changes because of it.",
      items: [
        { title: "We collect sensor and inspection data nobody can query.", text: "Warning signs sit in files until after the failure." },
        { title: "Our forecasts are spreadsheets and gut feel.", text: "Inventory, crews, and capacity are planned too early or too late." },
        { title: "The model worked in a notebook and never went live.", text: "Data science effort produces reports, not changes in how work gets done." },
        { title: "Nobody trusts a prediction they cannot explain.", text: "Teams ignore the model and keep the old process." },
        { title: "Models drift, and nobody notices.", text: "Accuracy falls quietly until a bad decision exposes it." },
      ],
    },
    services: {
      heading: "Machine learning services that end in a decision.",
      lead: "We build each model around the decision it improves, and the system where that decision is made.",
      items: [
        {
          title: "Predictive maintenance",
          text: "Models that use sensor, supervisory control and data acquisition (SCADA), and inspection data to estimate failure risk.",
          outcome: "Maintenance planned before downtime, not after it.",
          icon: "gauge",
          tools: ["azureML", "databricks", "kafka", "python"],
        },
        {
          title: "Demand and capacity forecasting",
          text: "Forecasts for demand, workload, and resource needs, refreshed as new data arrives.",
          outcome: "Plans built on evidence rather than last year's numbers.",
          icon: "chart",
          tools: ["azureML", "fabric", "powerBI", "scikit"],
        },
        {
          title: "Anomaly and fraud detection",
          text: "Models that flag unusual transactions, claims, or readings for a person to review.",
          outcome: "Issues reach a person while they are still cheap to fix.",
          icon: "eye",
          tools: ["azureML", "spark", "python"],
        },
        {
          title: "Intelligent document processing",
          text: "Computer vision and language models that read forms, drawings, and reports.",
          outcome: "Structured data from documents, without manual entry.",
          icon: "doc",
          tools: ["azureOpenAI", "pytorch", "python"],
        },
        {
          title: "Machine learning operations (MLOps)",
          text: "Pipelines to retrain, deploy, and monitor models, with alerts when accuracy drifts.",
          outcome: "Models that stay accurate after launch.",
          icon: "cog",
          tools: ["mlflow", "azureDevOps", "githubActions", "docker"],
        },
      ],
    },
    industries: {
      heading: "Where machine learning pays off.",
      lead: "Each of our industries already collects the data these models need.",
      items: {
        insurance: {
          useCase: "Score claims and submissions for risk and possible fraud before manual review.",
          outcome: "Reviewers focus on the files that need them.",
        },
        oilgas: {
          useCase: "Predict pipeline and equipment failure risk from inspection and sensor data.",
          outcome: "Crews and budget go to the assets most likely to fail.",
        },
        construction: {
          useCase: "Forecast job cost and schedule risk from your past project data.",
          outcome: "Project managers see overruns while there is still time to act.",
        },
      },
    },
    process: {
      heading: "How we take a model to production.",
      lead: "Six phases, from a business question to a model your teams use every day.",
      timeline: "Simple models: 4 to 6 weeks. Enterprise rollouts: several months, in phases",
      steps: [
        "Agree the decision to improve, and check what data exists for it.",
        "Set the accuracy and business measures the model must meet.",
        "Prepare features, and choose the modelling approach and platform.",
        "Train and validate the model against real historical cases.",
        "Deploy it into your apps, dashboards, or workflows with your IT team.",
        "Monitor accuracy and drift, and retrain as conditions change.",
      ],
    },
    why: {
      heading: "Why AptaCloud for machine learning.",
      lead: "A model only matters if people act on it. We build for that.",
      extra: [
        { title: "Explainable by default", text: "We show which factors drive each prediction, so the people using it can challenge it.", icon: "eye" },
      ],
    },
    stack: ["azureML", "fabric", "databricks", "powerBI", "openai", "claude", "gemini", "python", "scikit", "pytorch", "mlflow", "spark"],
    faqs: [
      {
        q: "How soon can we start using machine learning?",
        a: "Simple models typically take 4 to 6 weeks. Enterprise implementations take several months and are delivered in phases, so you see value early.",
      },
      {
        q: "What if we do not have enough data?",
        a: "We work with every level of data maturity. If the data is not there yet, we help you set up collection and storage first, then build the model.",
      },
      {
        q: "Can machine learning integrate with our existing systems?",
        a: "Yes. We deploy models behind APIs and connect them to your apps, Power BI dashboards, and workflows, working with your IT team to avoid disruption.",
      },
      {
        q: "How do you measure success?",
        a: "We agree measures at the start, such as accuracy, cost saved, or downtime avoided, and report against them through the Optimise phase.",
      },
      {
        q: "Is our data secure?",
        a: "Models are trained and run in your Azure environment, with Microsoft Entra ID access controls and encryption at rest and in transit.",
      },
      {
        q: "How much does a machine learning project cost?",
        a: "We price per phase after discovery. The proof of concept tests one model on your data, so you know it works before funding the full build.",
      },
    ],
  },
];
