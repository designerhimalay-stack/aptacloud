// Section order + extra sections for the Microsoft Services pages and Azure
// Hosting, mirroring each live page's sequence after the hero (see extras.ts).

import type { ServiceExtras } from "./types";

const STD: ServiceExtras["sections"] = ["pains", "services", "benefits", "process", "industries", "why"];

export const MS_EXTRAS: Record<string, ServiceExtras> = {
  "services/microsoft/microsoft-365": {
    sections: STD,
    benefits: {
      heading: "What Microsoft 365 gives your teams.",
      lead: "The value comes from setting it up around how people work.",
      items: [
        { title: "More productive teams", text: "Mail, files, meetings, and chat in one place, so work moves faster.", icon: "team" },
        { title: "Security and compliance", text: "Protection against threats, with policies your auditors can follow.", icon: "shield" },
        { title: "Work from anywhere", text: "Secure access on any device, in the office, at home, or on site.", icon: "cloud" },
        { title: "Lower IT overheads", text: "Fewer servers to maintain and licences that match real use.", icon: "gauge" },
      ],
    },
  },
  "services/microsoft/teams": {
    sections: STD,
    benefits: {
      heading: "What Microsoft Teams gives your business.",
      lead: "One workspace for conversations, files, meetings, and the apps behind them.",
      items: [
        { title: "Clearer communication", text: "Channels by team, project, or client instead of long email threads.", icon: "chat" },
        { title: "Workspaces that fit", text: "Each team gets the apps, bots, and workflows it needs.", icon: "layers" },
        { title: "Secure by design", text: "Multi-factor authentication, encryption, and sharing rules from day one.", icon: "shield" },
        { title: "Hybrid and remote work", text: "Secure access from any device, wherever people work.", icon: "cloud" },
        { title: "Files in one place", text: "SharePoint behind every team keeps documents controlled.", icon: "doc" },
        { title: "Better meetings", text: "Scheduling, live captions, and recordings built in.", icon: "team" },
      ],
    },
  },
  "services/microsoft/copilot-studio": {
    sections: STD,
    benefits: {
      heading: "What a custom copilot gives your team.",
      lead: "Routine questions and tasks handled in seconds, in plain language.",
      items: [
        { title: "Routine tasks automated", text: "Staff stop doing the same steps by hand, and errors drop.", icon: "flow" },
        { title: "Simpler processes", text: "The copilot guides people through complex workflows step by step.", icon: "layers" },
        { title: "Answers in seconds", text: "Policies, figures, and records found without searching.", icon: "search" },
        { title: "Lighter support load", text: "Common questions answered before they reach the help desk.", icon: "gauge" },
      ],
    },
  },
  "services/microsoft/microsoft-dynamics-365": {
    sections: ["pains", "useCases", "services", "process", "why", "industries"],
    useCases: {
      heading: "Dynamics 365 applications we implement.",
      lead: "We start with the modules that remove the most manual work, then extend.",
      items: [
        { title: "Business Central", text: "Finance, sales, service, and supply chain for mid-sized firms in one system.", icon: "chart" },
        { title: "Customer Service", text: "Calls, email, and chat in one view, with every case tracked to the end.", icon: "chat" },
        { title: "Field Service", text: "Crew scheduling, work orders, and mobile capture on site.", icon: "agent" },
        { title: "Sales", text: "Pipeline, accounts, and follow-ups connected to Microsoft 365.", icon: "target" },
        { title: "Power Apps and Power BI", text: "Custom apps and reporting on top of your Dynamics 365 data.", icon: "layers" },
        { title: "Copilot Studio agents", text: "Low-code agents that answer and act on Dynamics 365 records.", icon: "spark" },
      ],
    },
  },
  "services/microsoft/power-bi": {
    sections: STD,
    benefits: {
      heading: "What Power BI gives your business.",
      lead: "Reporting that takes less effort and gets used more.",
      items: [
        { title: "Built around your decisions", text: "Dashboards designed for the measures each role acts on.", icon: "target" },
        { title: "Lower reporting cost", text: "Shared models replace reports rebuilt by hand every month.", icon: "gauge" },
        { title: "Faster delivery", text: "Reports built in short phases, starting with the one you need most.", icon: "clock" },
        { title: "Secure sharing", text: "Row-level security, so everyone sees only their own data.", icon: "shield" },
      ],
    },
  },
  "services/microsoft/power-platform": {
    sections: STD,
    benefits: {
      heading: "What Power Platform gives your teams.",
      lead: "Routine work automated on tools you already license.",
      items: [
        { title: "Less manual work", text: "Apps and flows replace forms, spreadsheets, and email approvals.", icon: "flow" },
        { title: "Decisions on live data", text: "Power BI reports on the data your apps collect.", icon: "chart" },
        { title: "Flexible without heavy code", text: "Apps adapt quickly as your processes change.", icon: "code" },
        { title: "Better collaboration", text: "Requests and approvals visible to everyone involved.", icon: "team" },
      ],
    },
  },
  "services/microsoft/sharepoint": {
    sections: STD,
    benefits: {
      heading: "What SharePoint gives your teams.",
      lead: "Documents that are controlled, findable, and connected to the work.",
      items: [
        { title: "Better collaboration", text: "Team sites and libraries built around your processes.", icon: "team" },
        { title: "Controlled access", text: "Sensitive files protected, without locking out the right people.", icon: "shield" },
        { title: "Connected to Microsoft 365", text: "Works with Microsoft Teams, Power BI, and OneDrive.", icon: "link" },
        { title: "Access from anywhere", text: "Secure cloud access for office, remote, and site teams.", icon: "cloud" },
        { title: "Reporting on your content", text: "Dashboards and lists that turn documents into decisions.", icon: "chart" },
      ],
    },
  },
  "services/microsoft/identity-security": {
    sections: ["pains", "services", "benefits", "stack", "process", "industries", "why"],
    benefits: {
      heading: "What a Zero Trust setup gives you.",
      lead: "Fewer ways in, and faster warning when something goes wrong.",
      items: [
        { title: "Lower breach risk", text: "Strong sign-in and device checks close the most common attack paths.", icon: "shield" },
        { title: "Easier compliance", text: "Access and data policies your auditors can review.", icon: "doc" },
        { title: "Protected admin access", text: "Sensitive systems reachable only by approved people, when needed.", icon: "eye" },
        { title: "Visibility across the cloud", text: "Real-time detection across sign-ins, devices, and apps.", icon: "gauge" },
      ],
    },
    stackHeading: {
      heading: "Microsoft security tools we configure.",
      lead: "One Microsoft security stack, set up to work together.",
    },
  },
  "services/microsoft/cloud-storage": {
    sections: STD,
    benefits: {
      heading: "What Microsoft cloud storage gives you.",
      lead: "Files and data that are reachable, protected, and recoverable.",
      items: [
        { title: "Access from any device", text: "Files and data reachable securely, wherever people work.", icon: "cloud" },
        { title: "Backup and recovery", text: "Automated backup with restores you have tested.", icon: "shield" },
        { title: "Connected to Microsoft 365", text: "Works with Microsoft Teams, Power BI, and Azure.", icon: "link" },
        { title: "Built-in security", text: "Encryption and multi-factor authentication as standard.", icon: "eye" },
      ],
    },
  },
  "azure-hosting": {
    sections: ["pains", "services", "benefits", "useCases", "why", "process", "industries"],
    benefits: {
      heading: "Why host on Microsoft Azure.",
      lead: "One platform for every workload, paid for as you use it.",
      items: [
        { title: "A complete platform", text: "Hosting, databases, containers, and AI services in one place.", icon: "layers" },
        { title: "Built for remote teams", text: "Virtual machines and secure access for people working anywhere.", icon: "team" },
        { title: "Security built in", text: "Encryption, network controls, and threat detection as standard.", icon: "shield" },
        { title: "Every model of cloud", text: "Infrastructure, platform, and software services side by side.", icon: "cloud" },
        { title: "Pay as you go", text: "No large upfront hardware costs, with budgets and alerts.", icon: "gauge" },
      ],
    },
    useCases: {
      heading: "Azure hosting solutions we deliver.",
      lead: "Four common setups, sized to your workload.",
      items: [
        { title: "Secure application hosting", text: "Apps behind Azure network controls and real-time threat detection.", icon: "shield" },
        { title: "Virtual machine estates", text: "Windows and Linux machines with load balancing and backup.", icon: "cog" },
        { title: "Kubernetes anywhere", text: "Clusters set up and monitored on Azure Kubernetes Service.", icon: "layers" },
        { title: "Connected devices", text: "Device data and messaging between sites and Azure, securely.", icon: "link" },
      ],
    },
  },
};
