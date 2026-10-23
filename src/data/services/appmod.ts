// Application Modernisation pages. Topics follow the live aptacloud.com pages;
// copy rewritten to Brand Guidelines v2.0 and Content Writing Guidelines v2.0.

import type { ServicePage } from "./types";

export const APPMOD_PAGES: ServicePage[] = [
  {
    slug: "legacy-application-migration",
    category: "appmod",
    name: "Legacy Application Migration",
    summary: "Move legacy apps to Azure in phases, with no operational shutdown.",
    seo: {
      title: "Legacy Application Migration Services | AptaCloud",
      description:
        "Move legacy applications to Microsoft Azure in phases, with testing at every step and no operational shutdown.",
    },
    hero: {
      title: "Move legacy apps to the cloud",
      accent: "without the shutdown.",
      lead: "AptaCloud migrates the applications your business still depends on to Microsoft Azure, in phases, with parallel running and testing at every step. Your teams keep working while the platform underneath them changes.",
      photo: {
        src: "/images/photos/services/legacy-rack.jpg",
        alt: "An engineer checks a server rack with a handheld tester during a migration",
        position: "50% 45%",
      },
      chip: { title: "Migration", items: ["Rehost or re-platform", "Data migration", "Phased cut-over"] },
      marks: ["azure", "dotnet", "linux"],
    },
    cta: {
      label: "Start a migration assessment",
      short: "Start an assessment",
      heading: "Find out what moving your legacy apps involves.",
      lead: "Tell us which applications you need to move. We will assess dependencies, risk, and the right approach for each one.",
    },
    pains: {
      heading: "What running legacy applications really costs.",
      lead: "The risk of staying put grows quietly, until a failure makes the decision for you.",
      items: [
        { title: "Our servers and licences are out of support.", text: "Every month adds security risk and emergency patching cost." },
        { title: "Only one person understands how the app works.", text: "Knowledge walks out the door with them, and changes stall." },
        { title: "The app cannot connect to anything new.", text: "New tools and AI projects work around it instead of with it." },
        { title: "We are afraid migration will stop the business.", text: "The move keeps getting postponed while the risk grows." },
        { title: "Hosting costs rise, but performance does not.", text: "You pay more each year for a system that is slower than it should be." },
      ],
    },
    services: {
      heading: "Legacy migration services, from assessment to stable.",
      lead: "We choose the approach per application, not one approach for everything.",
      items: [
        {
          title: "Migration assessment and planning",
          text: "We map applications, dependencies, and data flows, then recommend rehost, re-platform, or re-architect for each one.",
          outcome: "A migration blueprint with timelines, costs, and risks.",
          icon: "search",
          tools: ["azure", "azureDevOps"],
        },
        {
          title: "Rehost (lift and shift)",
          text: "Move applications to Azure virtual machines with no code changes.",
          outcome: "Out of the data centre quickly, with minimal risk.",
          icon: "cloud",
          tools: ["azure", "linux", "terraform"],
        },
        {
          title: "Re-platform",
          text: "Move to managed Azure services such as Azure App Service and Azure SQL, with small code changes.",
          outcome: "Lower running costs and less maintenance.",
          icon: "layers",
          tools: ["appService", "azureSQL", "dotnet"],
        },
        {
          title: "Data migration",
          text: "Migrate databases with validation, reconciliation, and parallel running.",
          outcome: "Every record accounted for at cut-over.",
          icon: "db",
          tools: ["azureSQL", "sqlServer", "oracle", "azureDataFactory"],
        },
        {
          title: "Testing and validation",
          text: "Functional, integration, performance, and security testing, before and after the move.",
          outcome: "No surprises for users on day one.",
          icon: "shield",
          tools: ["azureDevOps", "githubActions"],
        },
        {
          title: "Post-migration support",
          text: "Monitoring, tuning, and managed support until the application is stable.",
          outcome: "A migration that stays finished.",
          icon: "cog",
          tools: ["azure", "grafana"],
        },
      ],
    },
    industries: {
      heading: "Legacy migration in the industries we serve.",
      lead: "Each industry has applications that are too important to switch off and too old to keep as they are.",
      items: {
        insurance: {
          useCase: "Move ageing policy and billing applications to Azure without changing how underwriters work.",
          outcome: "Lower hosting risk while you plan deeper modernisation.",
        },
        oilgas: {
          useCase: "Migrate field reporting and maintenance applications running on out-of-support servers.",
          outcome: "Stable systems for crews, and fewer emergency fixes.",
        },
        construction: {
          useCase: "Move estimating and project applications from office servers to Azure.",
          outcome: "Project teams reach their tools from any site.",
        },
      },
    },
    process: {
      heading: "How we migrate without downtime.",
      lead: "Six phases, with old and new systems running side by side before any switch.",
      timeline: "Typical re-platforming: 8 to 12 weeks per application",
      steps: [
        "Inventory applications, dependencies, data, and support contracts.",
        "Choose rehost, re-platform, or re-architect for each application, with costs.",
        "Design the Azure landing zone, security, and cut-over plan.",
        "Migrate code, configuration, and data in stages, in a parallel environment.",
        "Test with users, run old and new side by side, then move traffic over.",
        "Decommission legacy servers, tune performance, and right-size costs.",
      ],
    },
    why: {
      heading: "Why AptaCloud for legacy migration.",
      lead: "Migration risk is managed in the plan, long before cut-over weekend.",
      extra: [
        { title: "Phased cut-over", text: "We run old and new systems in parallel and move traffic gradually, so there is no big-bang weekend.", icon: "migrate" },
      ],
    },
    stack: ["azure", "appService", "azureSQL", "aks", "azureDevOps", "sqlServer", "dotnet", "oracle", "linux", "terraform", "docker", "githubActions"],
    faqs: [
      {
        q: "Which legacy platforms can you migrate?",
        a: "Applications built on .NET Framework, Visual Basic, PowerBuilder, Java, and COBOL, running on servers or mainframes, with SQL and NoSQL databases.",
      },
      {
        q: "Should we lift and shift, or re-architect?",
        a: "It depends on each application's value and remaining lifespan. We recommend an approach per application during discovery, often rehosting first and modernising later.",
      },
      {
        q: "Can you migrate without downtime?",
        a: "In most cases, yes. We run systems in parallel, synchronise data, and shift traffic gradually before decommissioning the old environment.",
      },
      {
        q: "How long does a legacy migration take?",
        a: "Re-platforming a typical application takes 8 to 12 weeks. Larger portfolios are migrated in waves, with a timeline agreed in the Define phase.",
      },
      {
        q: "What testing do you do?",
        a: "Functional, integration, performance, security, and user acceptance testing, before and after the move.",
      },
      {
        q: "How much does legacy migration cost?",
        a: "We price per phase after a migration assessment, which gives you timelines, costs, and risks for each application before you commit.",
      },
      {
        q: "Do you only migrate to Microsoft Azure?",
        a: "We lead with Microsoft Azure. Where you already run workloads on AWS, we plan around them.",
      },
    ],
  },
  {
    slug: "application-modernization",
    category: "appmod",
    name: "Application Modernisation",
    summary: "Modernise core applications in phases, without starting over.",
    seo: {
      title: "Application Modernisation Services | AptaCloud",
      description:
        "Modernise the applications your business runs on, without starting over. Phased re-platforming and re-architecture on Microsoft Azure.",
    },
    hero: {
      title: "Modernise core applications",
      accent: "without starting over.",
      lead: "AptaCloud modernises the applications your business depends on, keeping the logic that works and replacing what holds you back. We deliver in phases on Microsoft Azure, so the business keeps running throughout.",
      photo: {
        src: "/images/photos/services/appmod-team.jpg",
        alt: "A developer and a colleague discussing code at a shared workstation",
        position: "50% 40%",
      },
      chip: { title: "Modernisation", items: ["Assessment and roadmap", "Re-platform or re-architect", "APIs and integration"] },
      marks: ["azure", "aks", "dotnet"],
    },
    cta: {
      label: "Assess your modernisation path",
      short: "Assess your path",
      heading: "Get a modernisation plan for your core systems.",
      lead: "Tell us which application slows you down. We will assess it and show the phased path to modernise it.",
    },
    pains: {
      heading: "Why core applications stall growth.",
      lead: "The systems that built the business are often the ones holding it back now.",
      items: [
        { title: "Every change takes months to release.", text: "New products and pricing wait on a rigid, decades-old codebase." },
        { title: "Our system cannot scale with the business.", text: "Peak periods mean slow screens, workarounds, and overtime." },
        { title: "We cannot connect it to modern tools or AI.", text: "Data stays locked inside, and new projects build around it." },
        { title: "Running costs keep rising.", text: "Specialist skills, licences, and infrastructure eat the budget for improvement." },
        { title: "Replacing it feels too risky.", text: "So nothing changes, and the technical debt keeps growing." },
      ],
    },
    services: {
      heading: "Application modernisation services, phase by phase.",
      lead: "Keep what works, change what does not, and connect the result to everything else.",
      items: [
        {
          title: "Application assessment",
          text: "We assess code, architecture, and technical debt, and rank what to modernise first.",
          outcome: "A phased roadmap with costs and risks.",
          icon: "search",
          tools: ["azure", "azureDevOps"],
        },
        {
          title: "Re-platforming",
          text: "Move applications to modern frameworks and managed services while keeping the core logic.",
          outcome: "Faster releases, without a rewrite.",
          icon: "layers",
          tools: ["appService", "dotnet", "azureSQL"],
        },
        {
          title: "Re-architecting to microservices",
          text: "Break monoliths into services that deploy and scale independently.",
          outcome: "When one part fails, the rest keeps running.",
          icon: "code",
          tools: ["aks", "kubernetes", "docker", "azureFunctions"],
        },
        {
          title: "API integration",
          text: "APIs that connect your core systems to CRM, ERP, portals, and AI.",
          outcome: "Data flows where it is needed, without rekeying.",
          icon: "link",
          tools: ["azure", "dynamics", "powerPlatform"],
        },
        {
          title: "Data transformation",
          text: "Move and restructure application data with validation at each step.",
          outcome: "No data lost, and data ready for reporting and AI.",
          icon: "db",
          tools: ["azureSQL", "azureDataFactory", "fabric"],
        },
        {
          title: "Ongoing modernisation support",
          text: "Optimisation, security updates, and new features after launch.",
          outcome: "A platform that keeps improving.",
          icon: "cog",
          tools: ["azureDevOps", "githubActions", "grafana"],
        },
      ],
    },
    industries: {
      heading: "Modernisation without rip-and-replace.",
      lead: "In each of our industries, the core system stays. What changes is what it can connect to.",
      items: {
        insurance: {
          useCase: "Extend your policy administration system (PAS) with APIs instead of replacing it.",
          outcome: "New products launch without a core system rewrite.",
        },
        oilgas: {
          useCase: "Modernise maintenance and inspection applications so field data reaches the office in real time.",
          outcome: "Decisions made on current data, not last week's upload.",
        },
        construction: {
          useCase: "Turn desktop estimating and project tools into cloud apps your teams can reach from site.",
          outcome: "One version of each project, wherever people work.",
        },
      },
    },
    process: {
      heading: "How we modernise in phases.",
      lead: "Six phases, released alongside the old system, with no operational shutdown.",
      timeline: "Re-platforming: 8 to 12 weeks. Full re-architecting: 4 to 6 months",
      steps: [
        "Review systems, infrastructure, and processes to find the real bottlenecks.",
        "Choose rehost, re-platform, or rebuild for each component, within your budget.",
        "Design the target architecture, APIs, and data flows.",
        "Refactor code and data in increments, with automated testing.",
        "Release in phases alongside the old system, with no operational shutdown.",
        "Monitor, tune, and keep improving after launch.",
      ],
    },
    why: {
      heading: "Why AptaCloud for application modernisation.",
      lead: "Modernisation should reduce risk, not add to it.",
      extra: [
        { title: "Open pricing and milestones", text: "A fixed-cost discovery stage gives you estimates and milestones before the full engagement starts.", icon: "clock" },
      ],
    },
    stack: ["azure", "aks", "appService", "azureFunctions", "azureSQL", "azureDevOps", "dotnet", "springboot", "node", "react", "kubernetes", "docker"],
    faqs: [
      {
        q: "How long does application modernisation take?",
        a: "Basic re-platforming typically takes 8 to 12 weeks. Full re-architecting takes 4 to 6 months, delivered in phases.",
      },
      {
        q: "Which modernisation approach is right for us?",
        a: "We assess each application and recommend rehosting, re-platforming, refactoring, re-architecting, rebuilding, or replacing, based on its value and lifespan.",
      },
      {
        q: "Will modernisation disrupt our operations?",
        a: "We release in phases, run old and new side by side, and test thoroughly, so there is no operational shutdown.",
      },
      {
        q: "How much does application modernisation cost?",
        a: "It depends on complexity and scope. A fixed-cost discovery stage gives you estimates before the full engagement.",
      },
      {
        q: "Which cloud platforms do you use?",
        a: "We lead with Microsoft Azure, and support hybrid setups where you keep some systems on-premises or on AWS.",
      },
      {
        q: "What happens after launch?",
        a: "We offer managed services, monitoring, security updates, and new features, or hand over fully to your team.",
      },
    ],
  },
  {
    slug: "application-re-engineering",
    category: "appmod",
    name: "Application Re-engineering",
    summary: "Rebuild legacy apps as cloud-native platforms, keeping your data and logic.",
    seo: {
      title: "Application Re-engineering Services | AptaCloud",
      description:
        "Re-engineer legacy applications into cloud-native platforms on Microsoft Azure while keeping your critical data and business logic.",
    },
    hero: {
      title: "Rebuild what holds you back,",
      accent: "keep what works.",
      lead: "AptaCloud re-engineers legacy applications into cloud-native platforms on Microsoft Azure. We keep your critical data and business logic, redesign the architecture and user experience, and add automation and artificial intelligence (AI) where they remove manual work.",
      photo: {
        src: "/images/photos/services/reeng-code.jpg",
        alt: "An engineer pointing at application code on a monitor while working at the keyboard",
        position: "50% 45%",
      },
      chip: { title: "Re-engineering", items: ["Code and architecture audit", "Cloud-native rebuild", "Modern user experience"] },
      marks: ["azure", "aks", "react"],
    },
    cta: {
      label: "Book a readiness assessment",
      short: "Book an assessment",
      heading: "Find out if your application is ready to re-engineer.",
      lead: "Tell us about the application. We will review code, data, and risk, and give you a findings report and a modernisation plan.",
    },
    pains: {
      heading: "When an application needs more than a migration.",
      lead: "Moving a broken architecture to the cloud only moves the problem.",
      items: [
        { title: "The architecture cannot take one more change.", text: "Every fix breaks something else, so releases slow to a crawl." },
        { title: "Staff fight the interface every day.", text: "Training takes longer, and errors creep in through workarounds." },
        { title: "It will not run on a phone or tablet.", text: "Field and site teams fall back to paper and re-entry." },
        { title: "We cannot add automation or AI to it.", text: "Your team still does by hand the work a modern platform would do for them." },
      ],
    },
    services: {
      heading: "Application re-engineering services.",
      lead: "We evolve the application you have, rather than starting from zero.",
      items: [
        {
          title: "Audit and analysis",
          text: "An in-depth review of code, architecture, data flows, and integrations.",
          outcome: "A clear view of what to keep, rebuild, or retire.",
          icon: "search",
          tools: ["azureDevOps", "dotnet"],
        },
        {
          title: "Architecture and design",
          text: "Future-state architecture, data structures, APIs, and user experience designs.",
          outcome: "A design your team reviews before anything is rebuilt.",
          icon: "layers",
          tools: ["azure", "aks"],
        },
        {
          title: "Cloud-native engineering",
          text: "Microservices, containers, and serverless components, built in agile increments.",
          outcome: "An application that scales and updates without downtime.",
          icon: "code",
          tools: ["aks", "kubernetes", "docker", "azureFunctions"],
        },
        {
          title: "User experience redesign",
          text: "Responsive web and mobile interfaces, designed with the people who use them.",
          outcome: "Faster work and fewer errors, on any device.",
          icon: "eye",
          tools: ["react", "angular", "flutter"],
        },
        {
          title: "Automation and AI features",
          text: "Workflow automation, analytics, and AI features added where they remove manual work.",
          outcome: "The rebuilt app does more of the work for your team.",
          icon: "spark",
          tools: ["azureOpenAI", "powerPlatform", "powerBI"],
        },
        {
          title: "Post-implementation support",
          text: "Ongoing optimisation and support as new needs emerge.",
          outcome: "A platform that stays current.",
          icon: "cog",
          tools: ["azureDevOps", "grafana"],
        },
      ],
    },
    industries: {
      heading: "Re-engineering for field-heavy industries.",
      lead: "In our industries, the people who need the application most are often away from a desk.",
      items: {
        insurance: {
          useCase: "Re-engineer agency and claims portals into responsive apps connected to your core systems.",
          outcome: "Agents and adjusters work faster from any device.",
        },
        oilgas: {
          useCase: "Rebuild desktop field tools as offline-capable mobile apps that sync when crews are back in range.",
          outcome: "Field data is captured once, at the source.",
        },
        construction: {
          useCase: "Replace paper and spreadsheet forms with a mobile app that feeds your project systems.",
          outcome: "Approvals and reports move without chasing paperwork.",
        },
      },
    },
    process: {
      heading: "How we re-engineer an application.",
      lead: "Six phases, with the new application released alongside the old one.",
      timeline: "From 6 weeks for simpler apps to 6 months for complex platforms",
      steps: [
        "Audit code, architecture, data flows, and integrations.",
        "Agree business drivers, success measures, budget, and risks.",
        "Design the future-state architecture, data, APIs, and user experience.",
        "Engineer the new application in agile increments, with automated tests.",
        "Migrate data, connect integrations, and release alongside the old system.",
        "Support, tune, and extend the platform as needs change.",
      ],
    },
    why: {
      heading: "Why AptaCloud for re-engineering.",
      lead: "We change the platform without losing what your business has built into it.",
      extra: [
        { title: "Readiness assessment first", text: "We review your platform, business drivers, risks, and budget, then give you a findings report and a modernisation plan.", icon: "doc" },
      ],
    },
    stack: ["azure", "aks", "appService", "azureFunctions", "azureSQL", "azureDevOps", "azureOpenAI", "react", "angular", "flutter", "dotnet", "kubernetes"],
    faqs: [
      {
        q: "How long does application re-engineering take?",
        a: "Typically from 6 weeks for simpler applications to 6 months for complex platforms, delivered in phases.",
      },
      {
        q: "What is the difference between re-engineering and migration?",
        a: "Migration moves an application largely as it is. Re-engineering redesigns its architecture and user experience while keeping your data and business logic.",
      },
      {
        q: "Can you add AI or automation to our application?",
        a: "Yes. We add analytics, conversational interfaces, document processing, and workflow automation where they remove manual work.",
      },
      {
        q: "Which legacy technologies do you work with?",
        a: "Business-critical systems from COBOL and early .NET to legacy Java EE, including ERP, CRM, and industry-specific applications.",
      },
      {
        q: "How do you migrate the data safely?",
        a: "We combine automated migration tools with manual validation of every transformation, and reconcile records before cut-over.",
      },
      {
        q: "What does the readiness assessment include?",
        a: "A review of your platform, business drivers, risks, budget, and resources, with a findings report and an application modernisation plan.",
      },
    ],
  },
];
