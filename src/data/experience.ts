export interface WorkExperience {
  company: string;
  role: string;
  contractType: string;
  period: string;
  startDate: string;
  endDate: string | null;
  location: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  current: boolean;
}

export const experience: WorkExperience[] = [
  {
    company: "CFOTech IT Global Services",
    role: "QA Automation + AI Engineer",
    contractType: "Client: Personal (Telecom Argentina) — Mediation & Rating teams",
    period: "Jun 2025 – Present",
    startDate: "2025-06",
    endDate: null,
    location: "Buenos Aires, Argentina",
    description:
      "Test automation and AI agents for the Mediation and Rating QA teams of Telecom Argentina: CDR processing, Huawei CBS web services, batch processes and Jenkins pipelines. About 80% of the regression now runs automated.",
    responsibilities: [
      "Designed and maintain FAC Mediation, a Java 11 + Cucumber + JUnit 5 framework with ~80 features that processes data and voice traffic CDRs (HPGW, HSGW, IMS, VoLTE, IoT, B2B) against real UAT servers over SSH/SFTP",
      "Automated the Rating regression for the Huawei CBS to CBS Cloud migration: 100+ features over SOAP web services, 51 CDR interfaces, 21 web services and business CRs, cross-validated against GaussDB",
      "Standardized 55 Jenkins pipelines and the multi-phase flows (with waits of up to 24 h) under one parameter contract, HTML reporting and automatic result upload to Jira Xray",
      "Found the root cause of failures blamed on the vendor: element order in SOAP templates violated the XSD; fixed it and unblocked the CR baseline",
      "Build AI agents for the Mediation and Rating QA teams on an internal agent platform (Java 21, Spring Boot, Google ADK, Gemini, pgvector): diagnostics and operations agents with 47 tools (SSH, ASN.1 CDR patching, Jira, Xray), SAFE/MEDIUM/HIGH risk classification and human confirmation before every action",
      "Cut the latency of the Jira tracking agent (previously 48–65 s per query) by routing extraction steps to a fast model and keeping reasoning on the large one",
      "Trained the team on automation tooling and AI-assisted development",
    ],
    technologies: [
      "Java",
      "Cucumber",
      "JUnit 5",
      "Selenium",
      "SOAP",
      "SSH / SFTP",
      "Jenkins",
      "Jira Xray",
      "GaussDB",
      "Spring Boot",
      "Google ADK",
      "Gemini",
      "CDR Processing",
    ],
    current: true,
  },
  {
    company: "Getnet Argentina",
    role: "QA Analyst Automation",
    contractType: "Banco Santander — Contracted by RHT",
    period: "Dec 2024 – Jun 2025",
    startDate: "2024-12",
    endDate: "2025-06",
    location: "Buenos Aires, Argentina",
    description:
      "Worked within the Getnet (Banco Santander) digital payments ecosystem, focusing on acquiring solutions and payment processing platforms for merchants in the Aggregator business model.",
    responsibilities: [
      "Validated acquiring solutions and payment methods for merchants and POS terminals",
      "Tested POSNET terminal billing ensuring accurate charge generation and data reconciliation",
      "Conducted certification of digital wallets for QR payments integrated with Getnet POSNET",
      "Validated features for new onboarding and sales channels integration",
      "API testing and SQL database queries ensuring data consistency across systems",
      "Collaborated in requirement analysis, user story refinement, and acceptance criteria validation",
    ],
    technologies: [
      "REST APIs",
      "SQL",
      "Postman",
      "Scrum / Agile",
      "Functional Testing",
      "Integration Testing",
    ],
    current: false,
  },
  {
    company: "Nave Negocios",
    role: "QA Analyst",
    contractType: "Banco Galicia — Contracted by TCS",
    period: "Dec 2022 – Dec 2024",
    startDate: "2022-12",
    endDate: "2024-12",
    location: "Buenos Aires, Argentina",
    description:
      "QA on the Nave project, a digital platform by Banco Galicia focused on financial solutions for merchants and SMEs. Ensured product quality throughout the development lifecycle.",
    responsibilities: [
      "Designed and executed E2E, regression, and exploratory tests across application modules",
      "Validated complex functional workflows across frontend, backend, and integrated services",
      "Analyzed requirements and participated in user story refinement with product and dev teams",
      "Managed defects and tracked issues in UAT and pre-production environments",
      "SQL queries and log analysis for data consistency validation",
    ],
    technologies: [
      "SQL",
      "Scrum / Agile",
      "E2E Testing",
      "Exploratory Testing",
      "Jira",
      "UAT",
    ],
    current: false,
  },
  {
    company: "UPEX",
    role: "Quality Assurance Analyst",
    contractType: "Full-time",
    period: "Jun 2021 – Jan 2022",
    startDate: "2021-06",
    endDate: "2022-01",
    location: "Buenos Aires, Argentina",
    description:
      "QA Analyst and Academy Moderator at UPEX. Drove quality practices and onboarded new academy members into BDD and testing methodologies.",
    responsibilities: [
      "Moderated UPEX Academy sessions and onboarded new members",
      "User Story review and mentoring on naming conventions, traceability, and coverage",
      "Test design using Xray: Test Sets, Test Cases, Test Execution, and bug reporting",
      "Executed Exploratory, Smoke, and Regression testing",
      "SQL queries for data validation",
    ],
    technologies: ["Jira", "Xray", "SQL", "Scrum / Agile", "BDD"],
    current: false,
  },
];
