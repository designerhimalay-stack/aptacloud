// AI pages: the sections of the live aptacloud.com page, in the live order
// (stats band first, then the page's sections, then related + contact).
// Repeated or thin live sections are dropped or merged (see
// docs/service-pages-review.md §7). Copy is the live copy rewritten to the brand
// and content guidelines: Australian English, no em dashes or banned words,
// no NetSuite, one primary CTA. Case studies, testimonials and their figures
// are the live page's own and are flagged for client confirmation.

import type { ServiceLayout } from "../types";

const P = "/images/photos/people";
/** Images taken from the live aptacloud.com pages (high-resolution originals only). */
const L = "/images/photos/live";

export const AI_LAYOUTS: Record<string, ServiceLayout> = {
  /* ─────────────────────────── AI Consulting ─────────────────────────── */
  "ai-consulting": {
    blocks: [
      {
        kind: "cards",
        id: "challenges",
        style: "statement",
        tag: "The challenge",
        icon: "target",
        heading: "What's slowing your business?",
        lead: "Five things we hear from leadership teams before their first AI project.",
        cols: 3,
        cta: true,
        items: [
          { title: "We're unsure how to get past the hype around AI, NLP, and machine learning.", icon: "eye" },
          { title: "AI without a plan of action risks wasting budget and time.", icon: "gauge" },
          { title: "Without a strategy, our pilot projects never grow into real systems.", icon: "layers" },
          { title: "Missed automation leaves us behind competitors and digital change.", icon: "flow" },
          { title: "We're not sure new technology fits our specific business goals.", icon: "target" },
        ],
      },
      {
        kind: "cards",
        id: "services",
        tag: "What we do",
        icon: "layers",
        heading: "Complete AI solutions for modern enterprises.",
        lead: "From the first assessment to models in production, with your data and your systems at the centre.",
        cols: 4,
        items: [
          { title: "AI assessment", text: "We evaluate your data infrastructure, cloud maturity, and automation opportunities to shape an AI solution that fits.", icon: "search" },
          { title: "Machine learning development", text: "Custom models for market forecasting, data classification, anomaly detection, and business automation.", icon: "chart" },
          { title: "AI strategy and roadmap", text: "A practical AI roadmap aligned with your business needs, budgets, and operational workflows.", icon: "layers" },
          { title: "NLP solutions", text: "Language models that read, interpret, and respond to text for customer support, document analysis, and sentiment analysis.", icon: "chat" },
          { title: "Generative AI integration", text: "Large language model (LLM) systems for content drafting, ticket handling, training assistants, and internal knowledge.", icon: "spark" },
          { title: "Predictive analytics", text: "Models trained on historical and real-time data to forecast demand, customer behaviour, and operational risk.", icon: "gauge" },
          { title: "Automation and workflows", text: "Intelligent automation for document processing, scheduling, approvals, and operational workflows.", icon: "flow" },
          { title: "AI compliance and monitoring", text: "Data controls, governance policies, and monitoring that keep your AI within regulatory frameworks.", icon: "shield" },
        ],
      },
      {
        kind: "banner",
        heading: "Let's make your business run on AI.",
        text: "Talk to our AI specialists about the workflow you want to improve first.",
        photo: { src: `${P}/ai-brain.jpg`, alt: "A wireframe brain representing artificial intelligence", position: "50% 50%" },
      },
      {
        kind: "steps",
        id: "process",
        tag: "How we work",
        icon: "flow",
        heading: "The process we follow.",
        lead: "Four stages, from readiness to long-term support.",
        steps: [
          { title: "Assessment", text: "An AI readiness assessment of your data quality, cloud setup, and team culture." },
          { title: "Roadmap", text: "We find the gaps early, so you save time and budget and move ahead with confidence." },
          { title: "Integration", text: "Our engineers bring AI into your current workflows without interrupting the work." },
          { title: "Ongoing support", text: "Support across the full lifecycle, including choosing the right LLMs and training your models." },
        ],
      },
      {
        kind: "split",
        id: "why-us",
        tag: "Why AptaCloud",
        icon: "team",
        heading: "AptaCloud, your trusted AI consultant.",
        lead: "An experienced AI implementation partner understands how models are built, integrated, and scaled in a real business.",
        photo: { src: `${P}/consult-present.jpg`, alt: "An AptaCloud consultant presenting an AI roadmap to a client team on a large screen", position: "55% 50%" },
        items: [
          { title: "Experience", text: "Deep knowledge of AI architecture, strategy, and enterprise applications across sectors and company sizes.", icon: "clock" },
          { title: "Expertise", text: "Natural language processing, machine learning, data science, and predictive analytics.", icon: "spark" },
          { title: "Customisation", text: "AI solutions that are practical, compliant, and in line with data privacy and governance standards.", icon: "cog" },
          { title: "Support", text: "From AI readiness through deployment to long-term optimisation.", icon: "shield" },
          { title: "Availability", text: "We work closely with leadership teams to match AI projects to business goals.", icon: "team" },
        ],
      },
      {
        kind: "cases",
        tag: "Case studies",
        icon: "chart",
        heading: "Transformation stories.",
        lead: "What AI consulting changed for four of our clients.",
        items: [
          {
            client: "Healthcare services group",
            place: "Toronto, Canada",
            metric: "33%",
            metricLabel: "Faster appointment allocation",
            text: "Patient demand was putting pressure on their appointment system. After reviewing operations, we advised an AI-supported scheduling framework that shortened allocation time and improved patient response.",
          },
          {
            client: "Consumer lending company",
            place: "Dallas, USA",
            metric: "23%",
            metricLabel: "Fewer verification errors",
            text: "Loan applications piled up because document checks were manual. We introduced intelligent document review and automated validation, reducing errors while speeding up approvals.",
          },
          {
            client: "Industrial equipment manufacturer",
            place: "Ohio, USA",
            metric: "20%",
            metricLabel: "Less unexpected downtime",
            text: "Frequent production delays were hurting output. We designed a predictive monitoring strategy with their team that improved maintenance planning.",
          },
          {
            client: "Insurance claims management firm",
            place: "Vancouver, Canada",
            metric: "4x",
            metricLabel: "Faster claims processing",
            text: "Manual review made high claim volumes hard to handle. We recommended an AI workflow for claim analysis and document classification, with automated approvals where the rules allow.",
          },
        ],
      },
      {
        kind: "quotes",
        tag: "Testimonials",
        icon: "chat",
        heading: "Words from our clients.",
        items: [
          {
            quote: "What impressed us most was how clearly AptaCloud set out the AI adoption strategy. With their recommendations, our insurance workflow became much faster, with 2.5x better efficiency across departments.",
            role: "Operations Executive",
            company: "Insurance Services Firm",
            place: "Calgary, Canada",
          },
          {
            quote: "Their AI consulting team helped us simplify patient scheduling and internal coordination. We've seen around a 20% improvement in operational efficiency across our clinics.",
            role: "Operations Manager",
            company: "Healthcare Provider Network",
            place: "Toronto, Canada",
          },
          {
            quote: "They helped us understand how AI could improve production forecasting. Planning accuracy rose by about 30%, giving our operations team far more confidence in scheduling.",
            role: "Supply Chain Head",
            company: "Manufacturing Company",
            place: "Detroit, USA",
          },
          {
            quote: "AptaCloud took a practical approach to our compliance workflow, adding AI-supported document validation and auditing. We cut manual review tasks by close to 37% while meeting strict regulatory standards.",
            role: "Director",
            company: "Financial Lending Company",
            place: "New York, USA",
          },
        ],
      },
      {
        kind: "banner",
        heading: "Overwhelmed by AI hype? Get real clarity in two weeks.",
        text: "Our fixed-cost AI assessment shows exactly where and how to start with AI. No lock-ins, just guidance focused on your return.",
        photo: { src: `${P}/chatgpt-monitors.jpg`, alt: "A desk with two monitors, one showing the ChatGPT launch page", position: "60% 38%" },
      },
      {
        kind: "logos",
        id: "tech-stack",
        tag: "Tech stack",
        icon: "spark",
        heading: "Our tech stack.",
        lead: "We choose the model per use case and run it inside your Microsoft environment.",
        ids: ["claude", "openai", "mistral", "gemini", "llama", "grok"],
      },
      { kind: "industries" },
      { kind: "faq" },
    ],
    faqs: [
      {
        q: "How is AptaCloud different from other AI consulting firms?",
        a: "We combine local knowledge of the US and Canadian markets with a thorough AI readiness process. We do not install AI and leave; we make sure your business is ready to support it, then stay to run and improve it.",
      },
      {
        q: "How can I tell if my business needs an AI consultant?",
        a: "If you hold large amounts of data but are unsure how to turn it into revenue, or competitors are using automation to move ahead, it is time to get advice. Our AI strategy consulting helps you set the direction.",
      },
      {
        q: "Do you support Canadian businesses locally?",
        a: "Yes. Our AI consulting in Canada covers the market dynamics, currency, and regulations such as PIPEDA that apply to North American clients.",
      },
      {
        q: "What does an AI implementation consultant do?",
        a: "An AI implementation consultant delivers the technical side of your AI strategy: data engineering, model training, and bringing the solution into your current software.",
      },
      {
        q: "Do your AI consulting services meet industry standards?",
        a: "Yes. Whether it is HIPAA in healthcare or SOC 2 in technology, we make security and compliance a priority on every AI engagement in the USA and Canada.",
      },
      {
        q: "How much does AI consulting cost?",
        a: "We scope every engagement after discovery and price it per phase, so you approve each phase before it starts. The AI readiness assessment is a fixed-cost, two-week engagement.",
      },
      {
        q: "Which AI models do you use?",
        a: "We are Microsoft-first: Azure OpenAI Service, Microsoft Copilot Studio, and Azure Machine Learning. Where another model suits the task better, such as Anthropic's Claude, Google Gemini, Mistral, xAI Grok, or Meta Llama, we use it within your cloud environment and security controls.",
      },
    ],
  },

  /* ─────────────────────────── AI Agents ─────────────────────────── */
  "ai-agents": {
    blocks: [
      {
        kind: "split",
        id: "overview",
        tag: "AI agents",
        icon: "agent",
        heading: "Intelligent agents, smart business.",
        body: [
          "AptaCloud designs and deploys AI agents built for your business. From automating workflows to supporting decisions, our agents connect to the platforms you already use, such as Microsoft 365, Dynamics 365, and your line-of-business systems.",
          "We plan, design, and orchestrate multi-agent networks that help your business run on its own, so you can automate more, integrate faster, and scale with confidence.",
        ],
        photo: { src: `${P}/ai-layers.jpg`, alt: "Data passing through the layers of an AI model, shown as glass panels", position: "55% 50%" },
      },
      {
        kind: "showcase",
        id: "frameworks",
        tag: "Frameworks",
        icon: "layers",
        heading: "The new era of AI agent frameworks.",
        lead: "We build on established and emerging agent frameworks, so your agents can reason, adapt, and act like a dependable team that works around the clock.",
        items: [
          { title: "LangChain", maker: "Open source", kicker: "Link your data to AI and make it actionable.", text: "Connects business data such as CRMs and documents to AI models, so agents give context-aware answers.", mark: "langchain", bestFor: ["Conversational agents", "CRM and document data"] },
          { title: "AutoGen", maker: "Microsoft", kicker: "Multi-agent orchestration, simplified.", text: "Agents that collaborate, validate, and escalate tasks on their own across a workflow.", mark: "autogen", bestFor: ["Reporting", "Support triage"] },
          { title: "CrewAI", maker: "Open source", kicker: "Give your agents defined roles, like a real team.", text: "Assigns each agent a role, so a structured team of agents can automate workflows and cross-functional work.", mark: "crewai", bestFor: ["Role-based teams", "Cross-department work"] },
          { title: "MetaGPT", maker: "Open source", kicker: "Turn your AI into a software engineering squad.", text: "Specialised agents take on coding and review tasks, reducing development time and improving output.", mark: "metagpt", bestFor: ["Coding", "Code review"] },
          { title: "Haystack", maker: "deepset", kicker: "Build intelligent search and RAG pipelines fast.", text: "Agents that search, retrieve, and generate accurate answers from unstructured data.", mark: "haystack", bestFor: ["Support", "Knowledge bases"] },
          { title: "LlamaIndex", maker: "Open source", kicker: "Your knowledge, ready for agents.", text: "Turns internal knowledge into a searchable, query-ready layer that agents can work from.", mark: "llamaindex", bestFor: ["Document assistants", "Enterprise search"] },
        ],
        more: {
          heading: "Also in our toolkit",
          items: [
            { title: "SuperAGI", text: "Autonomous agents with memory, tools, and persistent tasks, for scaling across departments." },
            { title: "OpenDevin", text: "An open-source agentic developer that adds AI copilots to DevOps workflows." },
            { title: "AgentVerse", text: "A simulation environment for testing multi-agent coordination before go-live." },
            { title: "ReWOO", text: "A reasoning engine for multi-step workflows that need logic, memory, and decision trees." },
          ],
        },
      },
      {
        kind: "banner",
        heading: "Want to see how these frameworks can work for your business?",
        text: "Talk us through your use case and we'll map out an agent design for it.",
        photo: { src: `${P}/ai-laptop-prompt.jpg`, alt: "A laptop showing an AI assistant ready for a prompt", position: "50% 45%" },
      },
      {
        kind: "logos",
        id: "builders",
        tone: "tint",
        tag: "Platforms",
        icon: "cog",
        heading: "Industry-standard AI agent builders and platforms.",
        lead: "Whether you want a single agent or full support to design and deploy a set of them, we bring the skills to do it.",
        body: [
          "Our team works with the latest agent platforms and tools, and with your tech stack, to build secure, efficient, and scalable solutions.",
          "Whether you are automating data flows, building a customer support agent, or automating a back-office process, we choose the right builder for your goal.",
        ],
        ids: ["copilot", "agentforce", "langflow", "crewai", "zapier", "langgraph", "flowise", "n8n"],
      },
      {
        kind: "split",
        id: "deploy",
        tag: "Deployment",
        icon: "cloud",
        heading: "Deploy AI agents wherever your team and customers already work.",
        cta: true,
        photo: { src: `${P}/support-desk.jpg`, alt: "A customer support specialist working alongside an AI agent at her desk", position: "50% 35%" },
        items: [
          { title: "Autonomous cloud deployments", text: "Always-on cloud agents for 24/7 operations.", icon: "cloud" },
          { title: "Integrated web apps", text: "AI built into customer-facing or internal portals.", icon: "code" },
          { title: "Chat agents", text: "Microsoft Teams, Slack, or custom chat agents that help people work together.", icon: "chat" },
          { title: "Independent apps", text: "Standalone AI apps for specialised workflows.", icon: "layers" },
          { title: "Embedded IoT agents", text: "AI inside connected devices for logistics, field operations, and manufacturing.", icon: "cog" },
        ],
      },
      {
        kind: "cards",
        id: "mcp",
        tag: "Model Context Protocol",
        icon: "link",
        heading: "MCP: making AI agents talk to your systems.",
        lead: "Model Context Protocol (MCP) lets agents manage, share, and understand context across models and sessions, so they remove repetitive inputs and manual handovers. We help mid-sized businesses build it into their AI agent roadmap.",
        cols: 4,
        items: [
          { title: "Context-aware AI agents", text: "Agents that keep context between interactions, whether it is a customer conversation, a finance query, or an HR request.", icon: "agent" },
          { title: "Multi-agent communication", text: "Agents share context across departments, so marketing aligns with sales and HR with finance, without knowledge gaps.", icon: "chat" },
          { title: "Task continuity and memory", text: "MCP-based memory layers let agents pick up where they left off, for project automation and support follow-ups.", icon: "clock" },
          { title: "MCP-ready infrastructure", text: "Architecture built with MCP-ready tools like AutoGen, CrewAI, and LangChain, optimised for performance and scale.", icon: "cog" },
        ],
      },
      {
        kind: "split",
        id: "agentic-ai",
        tag: "Agentic AI",
        icon: "spark",
        heading: "Put agentic AI to work.",
        body: [
          "Imagine autonomous agents that think, collaborate, and act like your best team members.",
          "Agentic AI goes beyond simple automation. These agents reason, plan, adapt, and work across workflows on their own, so your business runs smarter and more efficiently.",
        ],
        photo: { src: `${P}/robot-hand-touch.jpg`, alt: "A robotic hand reaching towards a human hand", position: "50% 55%" },
        items: [
          { title: "Make decisions without manual input", icon: "target" },
          { title: "Collaborate with other agents and people", icon: "team" },
          { title: "Adapt to changing data and business needs", icon: "flow" },
          { title: "Learn continuously and improve their actions", icon: "spark" },
        ],
      },
      {
        kind: "cards",
        id: "services",
        tag: "What we do",
        icon: "layers",
        heading: "AI agent development services.",
        cols: 3,
        items: [
          { title: "Role-based agents", text: "Modular agents built with LangChain, CrewAI, and AutoGen that act as specialists, such as an analyst, planner, or support lead.", icon: "agent" },
          { title: "Goal-oriented task execution", text: "Agents that use reasoning and long-term context to break down tasks, self-correct, and finish jobs.", icon: "target" },
          { title: "Multi-agent collaboration", text: "Whole workflows orchestrated across agents, such as finance agents working with HR and operations.", icon: "team" },
          { title: "Human-in-the-loop control", text: "Agents escalate tasks and ask for human feedback when needed, and fit in with your team.", icon: "eye" },
          { title: "Works with your tech stack", text: "Agents connect to Microsoft, Salesforce, SAP, and your other platforms to pull CRM data, update ERPs, or trigger cloud workflows.", icon: "link" },
          { title: "Enterprise-grade security", text: "Strict data governance, defined permissions, and compliance controls on every agent.", icon: "shield" },
        ],
      },
      {
        kind: "steps",
        id: "process",
        tag: "How we work",
        icon: "flow",
        heading: "Our AI agent development process.",
        lead: "Get in touch to see how our AI agents can help you reach your business goals.",
        cta: true,
        steps: [
          { title: "Requirement analysis", text: "We gather insights from stakeholders to align each agent with your business goals." },
          { title: "Solution design", text: "A scalable architecture that allows for growth, with security and compliance designed in." },
          { title: "Development and testing", text: "We build iteratively with agent builders and test thoroughly before deployment." },
          { title: "Integration", text: "Connected to your systems, including legacy ones, through secure APIs, with minimal disruption." },
          { title: "Optimisation and maintenance", text: "Ongoing support and tuning, with regular updates as your business changes." },
        ],
      },
      {
        kind: "tabs",
        id: "by-industry",
        itemIcon: "agent",
        tag: "Industry agents",
        icon: "target",
        heading: "Industry-specific AI agents.",
        lead: "Custom agents built around your requirements. From compliance-heavy workflows to data-intensive tasks, they understand your domain, connect to your systems, and take on your most critical work.",
        tabs: [
          {
            label: "Insurance",
            intro: "Agents that take the routine work out of claims, policy, and service.",
            photo: { src: `${P}/meeting-laptops.jpg`, alt: "An insurance operations team reviewing a claims workflow on their laptops", position: "50% 45%" },
            items: [
              { title: "Claims processing agents", text: "Take in documents, extract data, and route each claim to the right handler." },
              { title: "Risk assessment agents", text: "Analyse policies and client profiles to assess exposure." },
              { title: "Policy recommendation agents", text: "Suggest coverage from client inputs and past behaviour." },
              { title: "Multichannel service agents", text: "Answer clients by email, chat, and voice with accurate, real-time support." },
            ],
          },
          {
            label: "Oil & Gas",
            intro: "Agents that keep field crews and integrity teams informed.",
            photo: { src: `${P}/field-hardhat.jpg`, alt: "A field engineer in a hard hat checking equipment on site", position: "50% 35%" },
            items: [
              { title: "Field procedure agents", text: "Give crews answers from approved procedures and inspection history." },
              { title: "Maintenance planning agents", text: "Flag equipment risk from sensor and work order data." },
              { title: "Compliance reporting agents", text: "Draft regulatory reports from operational records for review." },
              { title: "Permit and safety agents", text: "Check permits and safety steps before work starts." },
            ],
          },
          {
            label: "Engineering & Construction",
            intro: "Agents that cut the rekeying between site, office, and project systems.",
            photo: { src: `${P}/ops-plans.jpg`, alt: "Two project engineers marking up construction drawings at a table", position: "50% 45%" },
            items: [
              { title: "Document control agents", text: "Read RFIs, submittals, and site reports and file them in your project systems." },
              { title: "Schedule agents", text: "Track progress against plan and flag delays early." },
              { title: "Cost and change agents", text: "Match variations and invoices to contracts for review." },
              { title: "Site support agents", text: "Answer crew questions from drawings, specifications, and safety plans." },
            ],
          },
        ],
      },
      { kind: "industries" },
      {
        kind: "banner",
        heading: "Future-proof your business with AI agents.",
        text: "Our custom agents help mid-sized businesses in regulated industries modernise faster, operate leaner, and scale with confidence.",
        photo: { src: `${P}/people-robot.jpg`, alt: "Two engineers working alongside an industrial robot arm", position: "50% 45%" },
      },
      { kind: "faq" },
    ],
    faqs: [
      {
        q: "What makes AptaCloud a strong choice for AI agent development?",
        a: "Deep domain knowledge, mid-market agility, and strong integration skills across Microsoft and cloud-native tools, so your agents deliver value quickly.",
      },
      {
        q: "Can we build our own AI agents with AptaCloud's help?",
        a: "Yes. We offer toolkits, guidance, and templates for teams that want control of their agents with expert support behind them.",
      },
      {
        q: "Do you support multi-agent systems?",
        a: "Yes. We specialise in networks of agents that communicate and solve complex business problems together.",
      },
      {
        q: "Which platforms can your AI agents work in?",
        a: "Microsoft Teams, Microsoft 365, Dynamics 365, web portals, standalone apps, and connected devices. Through MCP and APIs, agents can also act in your line-of-business systems.",
      },
      {
        q: "How do you keep AI agents safe and under control?",
        a: "Every agent has defined permissions, approval steps for sensitive actions, logging, and escalation to a named person. Your data stays in your own cloud environment.",
      },
      {
        q: "How long does it take to deploy an AI agent?",
        a: "A first agent for one workflow is usually a proof of concept measured in weeks. The timeline depends on the systems it connects to, and you get a phased plan before any build starts.",
      },
    ],
  },

  /* ─────────────────────────── Generative AI ─────────────────────────── */
  "generative-ai": {
    blocks: [
      {
        kind: "rows",
        id: "use-cases",
        tag: "Use cases",
        icon: "target",
        heading: "Where generative AI changes key business operations.",
        lead: "We know how to put generative AI to work in enterprise systems. These are the use cases where we see it pay off.",
        items: [
          {
            title: "Customer service automation",
            intro: "Want to give customers better support? Here's how we use AI in customer service:",
            bullets: [
              "AI chat assistants that answer customer questions in real time.",
              "Automatic ticket summaries, so your agents resolve queries faster.",
              "Routing customers to the right resources for a better experience.",
            ],
            note: "Automating support can cut response times sharply while keeping the personal touch customers expect.",
            photo: { src: `${P}/support-desk.jpg`, alt: "A customer service specialist with a headset, supported by an AI assistant", position: "50% 35%" },
          },
          {
            title: "Marketing and sales enablement",
            intro: "Speed up your marketing with generative AI. Here's how we use it:",
            bullets: [
              "Drafting campaign content aimed at your ideal customers.",
              "Personalising customer interactions at scale.",
              "Optimising the performance of your marketing campaigns.",
            ],
            note: "Generative AI helps you analyse customer behaviour and run campaigns that convert better across every touchpoint.",
            photo: { src: `${P}/marketing-team.jpg`, alt: "A marketing team planning a campaign together around a screen", position: "50% 40%" },
          },
          {
            title: "Operations optimisation",
            intro: "Lower operational overheads and make processes more efficient. Here's how:",
            bullets: [
              "AI document processing that frees up your people's time.",
              "Reports generated and delivered to stakeholders automatically.",
              "Manual, time-intensive processes turned into automated workflows.",
            ],
            note: "Your business saves time and money, and your teams can focus on strategic work.",
            photo: { src: `${P}/ops-plans.jpg`, alt: "Two operations managers reviewing plans and documents at a table", position: "50% 45%" },
          },
          {
            title: "Knowledge management",
            intro: "Get the full value of your organisation's knowledge with AI:",
            bullets: [
              "AI search that helps employees find what they need in seconds.",
              "AI summaries that give people quick insight from long documents.",
              "Insights that surface hidden patterns in your data.",
            ],
            note: "Better access to knowledge improves efficiency and lifts productivity.",
            photo: { src: `${P}/knowledge-pair.jpg`, alt: "Two colleagues finding answers in company documents with an AI assistant", position: "50% 40%" },
          },
        ],
      },
      {
        kind: "cards",
        id: "services",
        tag: "What we offer",
        icon: "layers",
        heading: "What we offer.",
        cols: 3,
        items: [
          { title: "AI content generation", text: "Marketing copy, product descriptions, and personalised communications, drafted by AI in your brand's voice.", icon: "doc" },
          { title: "Custom LLMs", text: "Large language models tuned on your industry data and requirements, so they understand your terminology, processes, and customers.", icon: "spark" },
          { title: "AI automation", text: "Intelligent automation from document processing to data extraction, removing manual bottlenecks and human error.", icon: "flow" },
        ],
      },
      {
        kind: "logos",
        id: "tools",
        tag: "Tools and models",
        icon: "spark",
        heading: "Tools and models we use.",
        lead: "A proven AI development ecosystem for secure, dependable generative AI applications.",
        ids: ["openai", "claude", "gemini", "llama", "mistral", "grok", "transformers", "t5", "bert"],
        groups: [
          { title: "Large language models", text: "GPT-4, Gemini, and Claude for diverse use cases, chosen for cost and fit.", icon: "spark" },
          { title: "Development frameworks", text: "LangChain, LlamaIndex, and Haystack for AI pipelines and retrieval-augmented generation (RAG).", icon: "code" },
          { title: "Cloud platforms", text: "Azure OpenAI Service, Amazon Bedrock, and Google Vertex AI for secure, enterprise-grade deployments.", icon: "cloud" },
          { title: "Vector databases", text: "Pinecone, Weaviate, and Chroma for fast knowledge retrieval and semantic search.", icon: "db" },
          { title: "MLOps tools", text: "MLflow and Weights & Biases for model versioning, monitoring, and continuous improvement.", icon: "gauge" },
        ],
      },
      {
        kind: "steps",
        id: "process",
        tag: "Our process",
        icon: "flow",
        heading: "Our process.",
        cta: true,
        photo: { src: `${P}/workshop-room.jpg`, alt: "An AptaCloud lead running a generative AI discovery workshop with a client team", position: "50% 45%" },
        steps: [
          { title: "Discovery and assessment", text: "A full business analysis to understand your challenges, infrastructure, and objectives." },
          { title: "Solution design and planning", text: "An implementation plan with milestones, timelines, and success measures, then the AI architecture and model choices." },
          { title: "Development and integration", text: "We build and tune your solution in agile sprints and connect it to your systems under strict security standards." },
          { title: "Testing and deployment", text: "Real-world testing, user acceptance testing, and training for your team." },
          { title: "Ongoing support and optimisation", text: "We monitor performance after launch and keep improving the solution." },
        ],
      },
      {
        kind: "banner",
        heading: "Want to see how generative AI can work for your business?",
        text: "Talk us through your use case and we'll map out a solution for it.",
        photo: { src: `${L}/ai-agent-holo.jpg`, alt: "A person at a laptop working with an AI assistant shown as a hologram", position: "50% 45%" },
      },
      {
        kind: "split",
        id: "advantage",
        tag: "The AptaCloud advantage",
        icon: "target",
        heading: "The AptaCloud advantage: AI implementation made simple.",
        lead: "Lower costs, faster responses, and quicker decisions, without needing a large technical team.",
        reverse: true,
        photo: { src: `${P}/group-laptop.jpg`, alt: "A client team using a no-code AI tool with an AptaCloud specialist", position: "50% 45%" },
        items: [
          { title: "No-code and low-code AI integration", text: "Business users can set up and adjust AI solutions without deep programming skills, which speeds up delivery and lowers cost.", icon: "flow" },
          { title: "Custom AI model deployment", text: "Models built around your industry, processes, and objectives after a proper business analysis.", icon: "cog" },
          { title: "Secure and compliant AI solutions", text: "Encryption, access controls, and audit trails protect your sensitive information at all times.", icon: "shield" },
          { title: "Time back for your people", text: "AI handles routine work, so your teams focus on creative and strategic tasks.", icon: "team" },
        ],
      },
      { kind: "industries" },
      { kind: "faq" },
    ],
    faqs: [
      {
        q: "How long will our generative AI project take?",
        a: "It depends on scope, but most businesses see first results within four to eight weeks. We work in agile sprints and deliver improvements as we go.",
      },
      {
        q: "How do you protect our sensitive data?",
        a: "Every generative AI solution has enterprise-grade security: role-based access controls, encryption in transit and at rest, and full audit logs.",
      },
      {
        q: "Do we need technical expertise to manage AI solutions?",
        a: "No. We provide no-code and low-code tools so your team can manage the solution, plus training to help you get the most from it.",
      },
      {
        q: "Which generative AI models do you use?",
        a: "We are Microsoft-first with Azure OpenAI Service, and choose other models such as Claude, Gemini, Llama, or Mistral where they suit the task better, all within your security controls.",
      },
      {
        q: "Can generative AI use our own documents?",
        a: "Yes. We ground assistants in your approved documents with retrieval-augmented generation, so answers come with a source your team can check.",
      },
      {
        q: "How do we choose the first use case?",
        a: "We rank use cases by value and data readiness in a short assessment, then prove the best one with a proof of concept on your data.",
      },
    ],
  },

  /* ─────────────────────────── Machine Learning ─────────────────────────── */
  "machine-learning": {
    blocks: [
      {
        kind: "cards",
        id: "what-we-do",
        tag: "What we do",
        icon: "chart",
        heading: "What we do.",
        lead: "We develop and deploy custom machine learning solutions that solve your specific business challenges.",
        body: [
          "Our data scientists and AI engineers work closely with you to understand your needs, then build intelligent systems that deliver measurable results.",
          "Every project starts with stakeholder interviews and a review of your data sources, so we apply machine learning where it adds the most value.",
        ],
        cols: 3,
        items: [
          { title: "Predictive analysis", text: "Forecast demand, spot trends, and anticipate market changes, so you can plan ahead.", icon: "chart" },
          { title: "Customer segmentation and personalisation", text: "Segment customers by behaviour, preferences, and demographics for personalised offers and campaigns.", icon: "team" },
          { title: "Fraud detection and prevention", text: "Real-time detection that analyses transaction patterns and stops losses before they occur.", icon: "shield" },
          { title: "Supply chain optimisation", text: "Optimise inventory, predict disruption, and streamline logistics.", icon: "migrate" },
          { title: "Intelligent document processing", text: "Natural language processing and computer vision that read complex documents with human-level accuracy.", icon: "doc" },
          { title: "Quality assurance and defect detection", text: "Computer vision quality control that finds defects before products reach the market.", icon: "search" },
        ],
      },
      {
        kind: "banner",
        heading: "Let's make your business run on AI.",
        text: "Start with one decision your data can improve.",
        photo: { src: `${L}/ml-robot-hand.jpg`, alt: "A robotic hand touching a glowing digital interface", position: "50% 45%" },
      },
      {
        kind: "cards",
        id: "benefits",
        tag: "Benefits",
        icon: "spark",
        heading: "Key benefits of machine learning services.",
        lead: "Why invest in machine learning? Here's what it gives your business.",
        cols: 4,
        items: [
          { title: "Efficiency and automation", text: "Models process large volumes of data in seconds, freeing your team for higher-value work.", icon: "flow" },
          { title: "Data-driven decisions", text: "Predictive insight and real-time analytics from historical patterns and current trends.", icon: "chart" },
          { title: "Better customer experience", text: "Personalised content, recommendations, and proactive support that build loyalty.", icon: "chat" },
          { title: "Competitive advantage", text: "Spot market opportunities, tune pricing, and respond to change sooner.", icon: "target" },
        ],
      },
      { kind: "industries" },
      {
        kind: "split",
        id: "responsible-ai",
        tag: "Responsible AI",
        icon: "shield",
        heading: "Machine learning you can trust.",
        lead: "Trust is fundamental to any AI implementation. We build ethical, transparent, and unbiased machine learning solutions.",
        cta: true,
        photo: { src: `${L}/trust-shield.jpg`, alt: "Open hands holding a glowing shield with a tick, a symbol of trusted AI", position: "50% 40%" },
        items: [
          { title: "We identify and address potential bias in our models.", icon: "eye" },
          { title: "Our solutions explain the decisions they make.", icon: "doc" },
          { title: "We protect your sensitive data with strong security.", icon: "shield" },
          { title: "We monitor deployed models for drift and emerging bias.", icon: "gauge" },
          { title: "People stay in control, with oversight on automated decisions.", icon: "team" },
        ],
      },
      { kind: "faq" },
    ],
    faqs: [
      {
        q: "How soon can we start using machine learning?",
        a: "It depends on your requirements. A focused solution can be in place in four to six weeks; larger enterprise systems take a few months.",
      },
      {
        q: "What if our business doesn't have enough data?",
        a: "We work with businesses at every stage of data maturity, and can help you set up the right data collection to close the gaps.",
      },
      {
        q: "Do you keep our business data secure?",
        a: "Yes. We use enterprise-grade security, including access controls and encryption, to protect all of your business data.",
      },
      {
        q: "Can machine learning work with our existing systems?",
        a: "Yes. Our solutions connect to your systems through APIs, databases, and standard protocols, and we take care not to disrupt day-to-day operations.",
      },
      {
        q: "How do you measure success?",
        a: "We agree clear KPIs at the start, such as accuracy, cost savings, and efficiency, along with measures of the impact on your business.",
      },
      {
        q: "Which tools do you build models with?",
        a: "Azure Machine Learning first, with Python, PyTorch, TensorFlow, scikit-learn, and MLflow for development, tracking, and monitoring.",
      },
    ],
  },
};
