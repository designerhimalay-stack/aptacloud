// Technology marks used in service pages (stack chips + logo marquee).
//  • color: the official Microsoft product marks (full colour) — Microsoft leads,
//    so its products keep their colour while every other mark sits monochrome.
//  • mono:  Simple Icons (CC0) / LobeHub (MIT) silhouettes, drawn in currentColor via CSS mask.
//  • AI model marks (Claude, GPT, Gemini, Grok, Llama) use their own colour where
//    they have one; GPT and Grok are black marks, so they follow currentColor.
//  • none:  no licensed mark available (e.g. Power BI, Microsoft Fabric) — the
//    chip shows a small monogram instead of inventing a logo.

export type TechMark = { name: string; color?: string; mono?: string };

const ms = (file: string) => `/images/microsoft/${file}.svg`;
const si = (file: string) => `/images/tech/${file}.svg`;
const ai = (file: string) => `/images/ai/${file}.svg`;

export const TECH = {
  azure: { name: "Microsoft Azure", color: ms("azure") },
  azureOpenAI: { name: "Azure OpenAI Service", color: ms("azure") },
  azureML: { name: "Azure Machine Learning", color: ms("azure") },
  azureDataFactory: { name: "Azure Data Factory", color: ms("azure") },
  azureSynapse: { name: "Azure Synapse Analytics", color: ms("azure") },
  azureSQL: { name: "Azure SQL", color: ms("azure") },
  aks: { name: "Azure Kubernetes Service", color: ms("azure") },
  azureFunctions: { name: "Azure Functions", color: ms("azure") },
  azureDevOps: { name: "Azure DevOps", color: ms("azure") },
  appService: { name: "Azure App Service", color: ms("azure") },
  copilot: { name: "Microsoft Copilot", color: ms("copilot") },
  copilotStudio: { name: "Microsoft Copilot Studio", color: ms("copilot") },
  dynamics: { name: "Dynamics 365", color: ms("dynamics-365") },
  m365: { name: "Microsoft 365", color: ms("microsoft-365") },
  powerPlatform: { name: "Power Platform", color: ms("power-platform") },
  sharepoint: { name: "Microsoft SharePoint", color: ms("sharepoint") },
  powerBI: { name: "Power BI" },
  fabric: { name: "Microsoft Fabric" },
  entra: { name: "Microsoft Entra ID" },
  sqlServer: { name: "SQL Server" },
  teams: { name: "Microsoft Teams" },
  onedrive: { name: "Microsoft OneDrive" },
  exchange: { name: "Exchange Online" },
  intune: { name: "Microsoft Intune" },
  defender: { name: "Microsoft Defender" },
  sentinel: { name: "Microsoft Sentinel" },
  purview: { name: "Microsoft Purview" },
  powerApps: { name: "Power Apps", color: ms("power-platform") },
  powerAutomate: { name: "Power Automate", color: ms("power-platform") },
  powerPages: { name: "Power Pages", color: ms("power-platform") },
  businessCentral: { name: "Dynamics 365 Business Central", color: ms("dynamics-365") },
  azureVM: { name: "Azure Virtual Machines", color: ms("azure") },
  cosmos: { name: "Azure Cosmos DB", color: ms("azure") },
  blob: { name: "Azure Blob Storage", color: ms("azure") },
  azureBackup: { name: "Azure Backup", color: ms("azure") },
  keyVault: { name: "Azure Key Vault", color: ms("azure") },

  // AI model families (LobeHub icons, MIT): brand colour where the mark has one.
  anthropic: { name: "Anthropic", mono: si("anthropic") },
  claude: { name: "Claude", color: ai("claude") },
  openai: { name: "OpenAI GPT", mono: ai("openai") },
  gemini: { name: "Google Gemini", color: ai("gemini") },
  grok: { name: "xAI Grok", mono: ai("grok") },
  llama: { name: "Meta Llama", color: ai("meta") },
  langchain: { name: "LangChain", mono: si("langchain") },
  huggingface: { name: "Hugging Face", mono: si("huggingface") },
  python: { name: "Python", mono: si("python") },
  pytorch: { name: "PyTorch", mono: si("pytorch") },
  scikit: { name: "scikit-learn", mono: si("scikitlearn") },
  mlflow: { name: "MLflow", mono: si("mlflow") },
  pandas: { name: "pandas", mono: si("pandas") },
  jupyter: { name: "Jupyter", mono: si("jupyter") },
  databricks: { name: "Databricks", mono: si("databricks") },
  snowflake: { name: "Snowflake", mono: si("snowflake") },
  airflow: { name: "Apache Airflow", mono: si("apacheairflow") },
  kafka: { name: "Apache Kafka", mono: si("apachekafka") },
  spark: { name: "Apache Spark", mono: si("apachespark") },
  dbt: { name: "dbt", mono: si("dbt") },
  informatica: { name: "Informatica", mono: si("informatica") },
  talend: { name: "Talend", mono: si("talend") },
  teradata: { name: "Teradata", mono: si("teradata") },
  oracle: { name: "Oracle Database", mono: si("oracle") },
  postgres: { name: "PostgreSQL", mono: si("postgresql") },
  mongodb: { name: "MongoDB", mono: si("mongodb") },
  redis: { name: "Redis", mono: si("redis") },
  elastic: { name: "Elasticsearch", mono: si("elasticsearch") },
  tableau: { name: "Tableau", mono: si("tableau") },
  qlik: { name: "Qlik", mono: si("qlik") },
  looker: { name: "Looker", mono: si("looker") },
  grafana: { name: "Grafana", mono: si("grafana") },
  kubernetes: { name: "Kubernetes", mono: si("kubernetes") },
  docker: { name: "Docker", mono: si("docker") },
  helm: { name: "Helm", mono: si("helm") },
  terraform: { name: "Terraform", mono: si("terraform") },
  githubActions: { name: "GitHub Actions", mono: si("githubactions") },
  dotnet: { name: ".NET", mono: si("dotnet") },
  springboot: { name: "Spring Boot", mono: si("springboot") },
  node: { name: "Node.js", mono: si("nodedotjs") },
  react: { name: "React", mono: si("react") },
  angular: { name: "Angular", mono: si("angular") },
  flutter: { name: "Flutter", mono: si("flutter") },
  fastapi: { name: "FastAPI", mono: si("fastapi") },
  n8n: { name: "n8n", mono: si("n8n") },
  aws: { name: "AWS", mono: si("amazonwebservices") },
  linux: { name: "Linux", mono: si("linux") },
} satisfies Record<string, TechMark>;

export type TechId = keyof typeof TECH;
