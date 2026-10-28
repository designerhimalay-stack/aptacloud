// AWS Cloud pages (nav AWS Cloud menu). Topics follow the live aptacloud.com
// pages; copy rewritten to Brand Guidelines v2.0 and Content Writing
// Guidelines v2.0 (Australian English, no unapproved metrics). Slugs keep the
// live URLs. The page layouts (every live section, in order) are in
// layouts/aws.ts; the fields below feed the hero, CTA, SEO, industries, and
// the template fallback.

import type { ServicePage } from "./types";

const photo = (file: string, alt: string, position = "50% 45%") => ({ src: `/images/photos/aws/${file}.jpg`, alt, position });

const AGREED = "Timeline agreed after a review of your workloads";

export const AWS_PAGES: ServicePage[] = [
  {
    slug: "aws-compute",
    category: "aws",
    name: "AWS Compute",
    summary: "Amazon EC2, containers, and serverless compute, chosen and set up for each workload.",
    seo: {
      title: "AWS Compute Services | AptaCloud",
      description: "AWS compute services: Amazon EC2, containers on Amazon ECS and EKS, and serverless with AWS Lambda and Fargate, chosen and set up for each workload.",
    },
    hero: {
      title: "The right AWS compute",
      accent: "for every workload.",
      lead: "AptaCloud helps you choose and run the right compute on Amazon Web Services (AWS), from Amazon EC2 instances to containers and serverless with AWS Lambda and AWS Fargate. We assess each workload, set it up securely, and tune it after go-live.",
      photo: photo("cmp-dev", "A developer working across two monitors at his desk", "55% 40%"),
      chip: { title: "AWS compute", items: ["Instance selection", "Containers and serverless", "Set-up and tuning"] },
      marks: ["ec2", "lambda", "eks"],
    },
    cta: {
      label: "Size one workload on AWS",
      short: "Size a workload",
      heading: "Find the right compute for one workload first.",
      lead: "Tell us about one application. We will recommend the compute model and instance size, and show what it should cost to run.",
    },
    pains: {
      heading: "When compute costs more than it should.",
      lead: "Most compute problems come from the wrong model or the wrong size.",
      items: [
        { title: "Our instances are bigger than they need to be.", text: "We pay for capacity nobody uses." },
        { title: "We run servers for jobs that run once a day.", text: "Idle machines cost the same as busy ones." },
        { title: "Deployments are slow and manual.", text: "Every release takes a weekend." },
        { title: "We are not sure our instances are secure.", text: "Security groups were set up years ago." },
      ],
    },
    services: {
      heading: "AWS compute services.",
      lead: "Every compute model, chosen per workload.",
      items: [
        { title: "Amazon EC2", text: "Instances chosen by memory, storage, and performance.", outcome: "The right size for each workload.", icon: "cog", tools: ["ec2"] },
        { title: "App platforms", text: "AWS App Runner, Elastic Beanstalk, and Lightsail.", outcome: "Apps deployed without managing servers.", icon: "code", tools: ["appRunner", "beanstalk"] },
        { title: "Containers", text: "Amazon ECS, EKS, and ECR set up and managed.", outcome: "Faster, repeatable releases.", icon: "layers", tools: ["ecs", "eks", "ecr"] },
        { title: "Serverless", text: "AWS Lambda and AWS Fargate for event-driven work.", outcome: "Pay only when code runs.", icon: "spark", tools: ["lambda", "fargate"] },
        { title: "Security", text: "The AWS Nitro System and security groups configured.", outcome: "Workloads isolated and protected.", icon: "shield", tools: ["ec2"] },
        { title: "VMware to AWS", text: "On-premises vSphere workloads moved to AWS.", outcome: "No more ageing hosts.", icon: "migrate", tools: ["evs"] },
      ],
    },
    industries: {
      heading: "AWS compute in our industries.",
      lead: "Each industry has workloads with their own peaks.",
      items: {
        insurance: { useCase: "Rating and quoting services on containers that scale for renewal peaks.", outcome: "Quotes stay fast when volumes spike." },
        oilgas: { useCase: "Field data processed by AWS Lambda as it arrives from site.", outcome: "Compute paid for only when data lands." },
        construction: { useCase: "Estimating and project apps moved from office servers to Amazon EC2.", outcome: "Project teams reach their tools from any site." },
      },
    },
    process: {
      heading: "How we set up AWS compute.",
      lead: "Six phases, from assessment to tuning.",
      timeline: AGREED,
      steps: [
        "Assess your workloads and current infrastructure.",
        "Agree the compute model and budget for each workload.",
        "Design accounts, networking, and security.",
        "Set up and configure the instances or services.",
        "Connect monitoring with Amazon CloudWatch.",
        "Right-size and tune after go-live.",
      ],
    },
    why: {
      heading: "Why AptaCloud for AWS compute.",
      lead: "Compute chosen for the workload, not the habit.",
      extra: [{ title: "Every compute model", text: "Instances, containers, and serverless, chosen per workload by one team.", icon: "layers" }],
    },
    stack: ["ec2", "lambda", "fargate", "ecs", "eks", "ecr", "appRunner", "beanstalk", "lightsail", "evs", "cloudWatch"],
    faqs: [],
  },
  {
    slug: "aws-migration-services",
    category: "aws",
    name: "AWS Migration",
    summary: "Data, applications, and servers moved to AWS, starting with a pilot.",
    seo: {
      title: "AWS Migration Services | AptaCloud",
      description: "AWS migration for databases, applications, servers, and mainframes, from on-premises or other clouds, starting with a pilot and tracked in one place.",
    },
    hero: {
      title: "Move to AWS,",
      accent: "starting with a pilot.",
      lead: "AptaCloud moves your databases, applications, and servers to Amazon Web Services (AWS) from on-premises systems or other clouds. We assess your workloads, prove the approach on a small pilot, then migrate the rest and track every step.",
      photo: photo("mig-plan", "A team planning a migration with notes on a glass wall", "50% 40%"),
      chip: { title: "AWS migration", items: ["Discovery and planning", "Pilot first", "Data, apps, and servers"] },
      marks: ["awsMgn", "awsDms", "awsDiscovery"],
    },
    cta: {
      label: "Start with an AWS pilot",
      short: "Start a pilot",
      heading: "Move one workload to AWS as a pilot.",
      lead: "Tell us what you run today. We will move a small part of it to AWS first, so you see the approach work before the full migration.",
    },
    pains: {
      heading: "When the move to AWS feels too risky.",
      lead: "Most migrations stall on what might go wrong.",
      items: [
        { title: "We do not know everything we run.", text: "Old servers and hidden dependencies surface mid-move." },
        { title: "Our database is too big to move over the network.", text: "Transfers would take weeks." },
        { title: "We cannot afford downtime.", text: "Customers notice every outage." },
        { title: "Our mainframe holds us back.", text: "The skills to run it are getting harder to find." },
      ],
    },
    services: {
      heading: "AWS migration services.",
      lead: "Every phase of the move, from discovery to optimisation.",
      items: [
        { title: "Discovery", text: "AWS Application Discovery Service maps what you run.", outcome: "A plan built on facts.", icon: "search", tools: ["awsDiscovery"] },
        { title: "Database migration", text: "AWS Database Migration Service, online or offline.", outcome: "Data moved with little downtime.", icon: "db", tools: ["awsDms"] },
        { title: "Application and server migration", text: "AWS Application Migration Service lifts and shifts servers.", outcome: "Apps tested before cut-over.", icon: "migrate", tools: ["awsMgn"] },
        { title: "Mainframe modernisation", text: "Mainframe workloads moved to AWS services.", outcome: "No more mainframe lock-in.", icon: "layers", tools: ["awsMainframe"] },
        { title: "Bulk data transfer", text: "AWS Snowball devices for large datasets.", outcome: "Large data moved without the network.", icon: "cloud", tools: ["snowball"] },
        { title: "Optimisation", text: "The new environment tuned after the move.", outcome: "AWS costs that match your use.", icon: "gauge", tools: ["costExplorer"] },
      ],
    },
    industries: {
      heading: "AWS migration in our industries.",
      lead: "Each industry has systems that must keep running during the move.",
      items: {
        insurance: { useCase: "Policy and claims databases moved with AWS Database Migration Service.", outcome: "Claims keep flowing during cut-over." },
        oilgas: { useCase: "Years of field and sensor data moved in bulk with AWS Snowball.", outcome: "Historical data on AWS without saturating site links." },
        construction: { useCase: "Project servers lifted to AWS with AWS Application Migration Service.", outcome: "Project teams keep working through the move." },
      },
    },
    process: {
      heading: "How we migrate to AWS.",
      lead: "Six phases, from discovery to an optimised environment.",
      timeline: "Usually a few weeks to a month, depending on your databases, servers, and applications",
      steps: [
        "Discover your servers, applications, and data.",
        "Agree the plan and the pilot workload.",
        "Design the AWS accounts, networking, and security.",
        "Run the pilot, then migrate in waves.",
        "Track progress and validate each workload.",
        "Optimise the new environment.",
      ],
    },
    why: {
      heading: "Why AptaCloud for AWS migration.",
      lead: "A pilot first, then the full move.",
      extra: [{ title: "Pilot first", text: "We prove the approach on a small set of workloads before moving the rest.", icon: "target" }],
    },
    stack: ["awsMgn", "awsDms", "awsDiscovery", "awsMainframe", "snowball", "ec2", "rds", "aurora", "lambda", "fargate"],
    faqs: [],
  },
  {
    slug: "aws-implementation",
    category: "aws",
    name: "AWS Implementation",
    summary: "AWS infrastructure, data, serverless, and security set up as a solid foundation.",
    seo: {
      title: "AWS Implementation Services | AptaCloud",
      description: "AWS implementation for infrastructure, migration, data and analytics, serverless, and security, built on the AWS Well-Architected Framework.",
    },
    hero: {
      title: "Build on AWS",
      accent: "on a solid foundation.",
      lead: "AptaCloud implements Amazon Web Services (AWS) for growing businesses, from infrastructure set-up and automation to hardening, security, and cost control. Our AWS-certified architects build each environment on the AWS Well-Architected Framework.",
      photo: photo("imp-dev", "A developer reviewing code on a monitor in a busy office", "55% 40%"),
      chip: { title: "AWS implementation", items: ["Infrastructure and automation", "Security and compliance", "Data and serverless"] },
      marks: ["vpc", "apiGateway", "securityHub"],
    },
    cta: {
      label: "Get your AWS architecture plan",
      short: "Get a plan",
      heading: "Get an AWS architecture plan before you build.",
      lead: "Tell us your goals and what you run today. We will design the AWS foundation and show what it should cost.",
    },
    pains: {
      heading: "When an AWS environment grows without a plan.",
      lead: "Most AWS problems start with a rushed set-up.",
      items: [
        { title: "Our accounts and networks grew by accident.", text: "Nobody can explain how they fit together." },
        { title: "Security was added afterwards.", text: "Access rules differ from team to team." },
        { title: "Our data sits in too many places.", text: "Reports take days to assemble." },
        { title: "We cannot see what is happening.", text: "Problems surface when customers complain." },
      ],
    },
    services: {
      heading: "AWS implementation services.",
      lead: "The foundation, data, apps, and security, set up together.",
      items: [
        { title: "Infrastructure set-up", text: "Amazon Route 53, Auto Scaling groups, and VPCs.", outcome: "A scalable, reliable base.", icon: "layers", tools: ["route53", "vpc"] },
        { title: "Cloud migration", text: "Workloads moved with AWS Application Migration Service.", outcome: "No lost working days.", icon: "migrate", tools: ["awsMgn"] },
        { title: "Data and analytics", text: "Amazon Redshift, AWS Glue, Amazon Athena, and QuickSight.", outcome: "Decisions on current data.", icon: "chart", tools: ["awsRedshift", "glue"] },
        { title: "Serverless", text: "AWS Lambda, API Gateway, Step Functions, and EventBridge.", outcome: "Apps that scale on demand.", icon: "spark", tools: ["lambda", "apiGateway"] },
        { title: "Security and compliance", text: "IAM, AWS Shield, AWS WAF, and Security Hub.", outcome: "A posture your auditors can review.", icon: "shield", tools: ["iam", "securityHub"] },
        { title: "Managed services", text: "Backups, monitoring, and compliance after go-live.", outcome: "Operations that keep running.", icon: "clock", tools: ["awsBackup", "cloudWatch"] },
      ],
    },
    industries: {
      heading: "AWS implementation in our industries.",
      lead: "Each industry needs a foundation it can build on.",
      items: {
        insurance: { useCase: "A secure AWS foundation for broker portals and claims APIs.", outcome: "New products launch on a ready platform." },
        oilgas: { useCase: "Sensor and maintenance data streamed into Amazon Redshift.", outcome: "Operations see field data the same day." },
        construction: { useCase: "Project and document apps on serverless AWS services.", outcome: "Apps that scale with each project." },
      },
    },
    process: {
      heading: "How we implement AWS.",
      lead: "Six phases, from planning to ongoing support.",
      timeline: AGREED,
      steps: [
        "Assess your goals, requirements, and infrastructure.",
        "Agree the roadmap and the services to use.",
        "Design the architecture on the Well-Architected Framework.",
        "Deploy the infrastructure, data, and applications.",
        "Connect monitoring, security, and cost controls.",
        "Optimise and support the environment.",
      ],
    },
    why: {
      heading: "Why AptaCloud for AWS implementation.",
      lead: "Built right the first time.",
      extra: [{ title: "Well-Architected from day one", text: "Every environment follows the AWS Well-Architected Framework.", icon: "layers" }],
    },
    stack: ["vpc", "route53", "ec2AutoScaling", "lambda", "apiGateway", "stepFunctions", "eventBridge", "awsRedshift", "glue", "iam", "securityHub", "cloudWatch"],
    faqs: [],
  },
  {
    slug: "aws-optimization",
    category: "aws",
    name: "AWS Optimisation",
    summary: "Idle and oversized AWS resources found and released, with performance kept.",
    seo: {
      title: "AWS Cost Optimisation Services | AptaCloud",
      description: "AWS cost optimisation: idle and oversized resources released, storage and databases right-sized, and spend tracked with budgets and dashboards.",
    },
    hero: {
      title: "Stop paying for AWS",
      accent: "you do not use.",
      lead: "AptaCloud finds the unused and oversized resources in your Amazon Web Services (AWS) environment and releases them. We right-size compute, storage, and databases, and keep your spend in line with your workloads.",
      photo: photo("opt-present", "A specialist presenting cost dashboards to a team", "55% 40%"),
      chip: { title: "AWS optimisation", items: ["Usage and billing audit", "Right-sizing", "Budgets and alerts"] },
      marks: ["costExplorer", "trustedAdvisor", "computeOptimizer"],
    },
    cta: {
      label: "Review my AWS bill",
      short: "Review my bill",
      heading: "Find out what is driving your AWS bill.",
      lead: "Give us read access to your billing data. We will show where the spend goes and what to change first.",
    },
    pains: {
      heading: "When the AWS bill keeps climbing.",
      lead: "Most overspend sits in resources nobody watches.",
      items: [
        { title: "Our bill grows every month.", text: "Usage has not changed, but the cost has." },
        { title: "Old snapshots and volumes pile up.", text: "Storage costs creep up unnoticed." },
        { title: "Instances run all night.", text: "Test environments never switch off." },
        { title: "We never chose a pricing model.", text: "Everything runs on demand." },
      ],
    },
    services: {
      heading: "AWS optimisation services.",
      lead: "Cost, performance, and governance, reviewed together.",
      items: [
        { title: "Usage audit", text: "EC2, RDS, Lambda, and other resources reviewed.", outcome: "A ranked list of savings.", icon: "search", tools: ["computeOptimizer"] },
        { title: "Right-sizing", text: "Instances, storage, and databases matched to use.", outcome: "No more paying for idle capacity.", icon: "gauge", tools: ["ec2", "rds"] },
        { title: "Storage tiers", text: "S3 lifecycle policies and cleaner EBS volumes.", outcome: "Cold data on cheaper tiers.", icon: "db", tools: ["s3", "ebs"] },
        { title: "Pricing models", text: "Savings Plans and reservations where usage is steady.", outcome: "Lower rates on predictable work.", icon: "doc", tools: ["costExplorer"] },
        { title: "Governance", text: "IAM policies and AWS Config rules.", outcome: "Spend and access under control.", icon: "shield", tools: ["iam", "awsConfig"] },
        { title: "Ongoing reviews", text: "Trusted Advisor and Cost Explorer checks.", outcome: "Savings that last.", icon: "eye", tools: ["trustedAdvisor"] },
      ],
    },
    industries: {
      heading: "AWS optimisation in our industries.",
      lead: "Each industry has quiet periods worth paying less for.",
      items: {
        insurance: { useCase: "Quoting workloads scaled down outside renewal periods.", outcome: "Peak capacity without paying for it all year." },
        oilgas: { useCase: "Historical sensor data moved to Amazon S3 Glacier.", outcome: "Years of data kept for a fraction of the cost." },
        construction: { useCase: "Project environments switched off when projects close.", outcome: "Costs that follow the project pipeline." },
      },
    },
    process: {
      heading: "How we optimise AWS.",
      lead: "Six phases that repeat, because optimisation is ongoing.",
      timeline: "Scope agreed after a first look at your billing data",
      steps: [
        "Assess your architecture, billing, and usage.",
        "Map how each resource is used.",
        "Plan right-sizing, storage tiers, and pricing models.",
        "Make the changes with your team.",
        "Set budgets, alerts, and accountability.",
        "Review regularly and adjust.",
      ],
    },
    why: {
      heading: "Why AptaCloud for AWS optimisation.",
      lead: "Savings you can explain to finance.",
      extra: [{ title: "Costs you can explain", text: "Every change comes with what it saves and why.", icon: "gauge" }],
    },
    stack: ["costExplorer", "trustedAdvisor", "computeOptimizer", "awsBudgets", "cloudWatch", "s3", "ebs", "rds", "lambda", "systemsManager"],
    faqs: [],
  },
  {
    slug: "aws-managed-services",
    category: "aws",
    name: "AWS Managed Services",
    summary: "AWS infrastructure, security, databases, and networks, managed and monitored for you.",
    seo: {
      title: "AWS Managed Services | AptaCloud",
      description: "AWS managed services for infrastructure, security, databases, networks, and incidents, with plans sized to your servers.",
    },
    hero: {
      title: "AWS, managed day to day",
      accent: "by certified specialists.",
      lead: "AptaCloud manages your Amazon Web Services (AWS) environment, from account set-up and security to databases, networks, and incident response. We automate, secure, and scale your workloads, so your team can focus on the business.",
      photo: photo("man-control", "An operations engineer watching a wall of monitoring screens", "45% 40%"),
      chip: { title: "Managed AWS", items: ["Monitoring and patching", "Security and backup", "Incident reporting"] },
      marks: ["cloudWatch", "awsBackup", "systemsManager"],
    },
    cta: {
      label: "Get an AWS support plan",
      short: "Get a support plan",
      heading: "Find the right managed plan for your AWS servers.",
      lead: "Tell us how many servers and databases you run. We will recommend a plan and quote the monthly fee.",
    },
    pains: {
      heading: "When running AWS takes over your team.",
      lead: "Most IT teams were not hired to watch servers all day.",
      items: [
        { title: "Patching falls behind.", text: "Updates wait until something breaks." },
        { title: "Nobody watches the environment at night.", text: "Customers find problems first." },
        { title: "We are not sure our backups work.", text: "Nobody has tested a restore." },
        { title: "Incidents have no paper trail.", text: "The same problems keep coming back." },
      ],
    },
    services: {
      heading: "AWS managed services.",
      lead: "Every layer of your AWS environment, managed by one team.",
      items: [
        { title: "Infrastructure management", text: "Workloads from on-premises and other clouds run on AWS.", outcome: "Infrastructure that stays current.", icon: "cloud", tools: ["ec2"] },
        { title: "Security management", text: "Endpoint security, IAM, and EC2 security groups.", outcome: "Threats found before they spread.", icon: "shield", tools: ["securityHub", "iam"] },
        { title: "Operations and monitoring", text: "Automation, scaling, and change management.", outcome: "A steady, well-run environment.", icon: "eye", tools: ["cloudWatch"] },
        { title: "Database management", text: "Relational, in-memory, document, and graph databases.", outcome: "Databases that patch and back up on schedule.", icon: "db", tools: ["rds", "dynamodb"] },
        { title: "Network management", text: "Firewalls, transit gateways, and network monitoring.", outcome: "Networks you can see and control.", icon: "link", tools: ["vpc"] },
        { title: "Incident management", text: "Incidents handled and reported.", outcome: "Problems fixed and not repeated.", icon: "clock", tools: ["systemsManager"] },
      ],
    },
    industries: {
      heading: "AWS managed services in our industries.",
      lead: "Each industry has systems that must stay up.",
      items: {
        insurance: { useCase: "Policy and claims platforms on AWS monitored and patched for you.", outcome: "Brokers and claimants are never kept waiting." },
        oilgas: { useCase: "Operations and reporting workloads managed with tested backups.", outcome: "Field teams keep working through incidents." },
        construction: { useCase: "Project and document systems managed across every site.", outcome: "Project teams get on with the job." },
      },
    },
    process: {
      heading: "How we manage AWS.",
      lead: "Six phases, from planning to ongoing improvement.",
      timeline: "Onboarding agreed after a review of your environment",
      steps: [
        "Review your AWS accounts and support needs.",
        "Agree the plan, response times, and reporting.",
        "Set up security baselines, monitoring, and backup.",
        "Take over day-to-day operations.",
        "Report monthly on performance, security, and cost.",
        "Act on feedback and improve the service.",
      ],
    },
    why: {
      heading: "Why AptaCloud for AWS managed services.",
      lead: "One team that knows your environment.",
      extra: [{ title: "Plans that fit", text: "Standard, Premium, and Enterprise plans sized to your servers.", icon: "layers" }],
    },
    stack: ["cloudWatch", "awsBackup", "systemsManager", "securityHub", "iam", "vpc", "ec2", "rds", "dynamodb", "eks"],
    faqs: [],
  },
  {
    slug: "aws-security",
    category: "aws",
    name: "AWS Security",
    summary: "Data, networks, and applications on AWS protected, watched, and kept compliant.",
    seo: {
      title: "AWS Security Services | AptaCloud",
      description: "AWS security services to protect data, networks, and applications, detect threats and vulnerabilities, and keep compliance on record.",
    },
    hero: {
      title: "Protect, detect, and comply",
      accent: "across your AWS workloads.",
      lead: "AptaCloud secures your applications, networks, and data on Amazon Web Services (AWS). We protect what you run, detect threats and vulnerabilities early, and keep the evidence your auditors ask for.",
      photo: photo("sec-analyst", "A specialist working on a laptop in a bright office", "62% 40%"),
      chip: { title: "AWS security", items: ["Data and network protection", "Threat detection", "Compliance reporting"] },
      marks: ["securityHub", "guardDuty", "awsWaf"],
    },
    cta: {
      label: "Get an AWS security review",
      short: "Get a security review",
      heading: "Find the gaps in your AWS security.",
      lead: "Tell us what you run on AWS. We will review your set-up against AWS security best practice and show what to fix first.",
    },
    pains: {
      heading: "When you are not sure your AWS set-up is secure.",
      lead: "Most cloud breaches start with a setting nobody checked.",
      items: [
        { title: "Sensitive data sits in buckets nobody reviews.", text: "Nobody knows what is exposed." },
        { title: "Security findings are spread across consoles.", text: "Alerts are missed or ignored." },
        { title: "Our web apps face bot and DDoS traffic.", text: "Customers feel every slowdown." },
        { title: "Audits mean weeks of evidence gathering.", text: "Reports are assembled by hand." },
      ],
    },
    services: {
      heading: "AWS security services.",
      lead: "Protection, detection, and compliance, set up together.",
      items: [
        { title: "Data security", text: "Amazon Macie, Security Lake, and AWS CloudHSM.", outcome: "Sensitive data found and protected.", icon: "db", tools: ["macie", "cloudHsm"] },
        { title: "Network security", text: "AWS Certificate Manager and AWS Network Firewall.", outcome: "Only the traffic you allow.", icon: "link", tools: ["acm", "networkFirewall"] },
        { title: "Application security", text: "AWS Shield, AWS WAF, and Verified Permissions.", outcome: "Apps protected from bots and DDoS.", icon: "shield", tools: ["awsShield", "awsWaf"] },
        { title: "Threat detection", text: "Amazon Detective, GuardDuty, and Security Hub.", outcome: "Threats found and acted on.", icon: "eye", tools: ["detective", "securityHub"] },
        { title: "Vulnerability management", text: "Amazon Inspector across workloads.", outcome: "Vulnerabilities fixed before they are used.", icon: "search", tools: ["inspector"] },
        { title: "Compliance reporting", text: "AWS Audit Manager frameworks and reports.", outcome: "Audit evidence on hand.", icon: "doc", tools: ["auditManager"] },
      ],
    },
    industries: {
      heading: "AWS security in our industries.",
      lead: "Each industry holds data that must be protected.",
      items: {
        insurance: { useCase: "Policyholder data in Amazon S3 classified and watched with Amazon Macie.", outcome: "Audit evidence ready when regulators ask." },
        oilgas: { useCase: "Operational systems on AWS monitored with GuardDuty and Security Hub.", outcome: "Threats to operations found early." },
        construction: { useCase: "Project portals protected with AWS WAF and AWS Shield.", outcome: "Partners keep working through attack traffic." },
      },
    },
    process: {
      heading: "How we secure AWS.",
      lead: "Six phases, from review to ongoing monitoring.",
      timeline: AGREED,
      steps: [
        "Review your AWS accounts and current security set-up.",
        "Agree priorities against AWS security best practice.",
        "Design protection for data, networks, and applications.",
        "Set up the security services.",
        "Connect detection, alerting, and compliance reporting.",
        "Monitor, review, and strengthen as threats change.",
      ],
    },
    why: {
      heading: "Why AptaCloud for AWS security.",
      lead: "Security set up properly, then watched.",
      extra: [{ title: "Protect, detect, comply", text: "Every part of AWS security handled by one team.", icon: "shield" }],
    },
    stack: ["securityHub", "guardDuty", "macie", "inspector", "detective", "awsShield", "awsWaf", "acm", "networkFirewall", "kms", "auditManager"],
    faqs: [],
  },
];
