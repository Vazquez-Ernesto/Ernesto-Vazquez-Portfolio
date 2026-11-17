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
      "Test automation and AI agents for the QA teams of a telecom operator's core platforms: backend services, batch processes and CI/CD pipelines.",
    responsibilities: [
      "Design and maintain BDD automation frameworks in Java + Cucumber + JUnit 5 for mission-critical telecom backend processes, running against real test environments",
      "Automated regression suites for web services and batch processes during a core platform migration, cross-validated against the database",
      "Standardized the team's Jenkins pipelines under one parameter contract, with HTML reporting and automatic result upload to the test management tool",
      "Traced failures attributed to a vendor back to our own test templates, fixed them and unblocked the release baseline",
      "Build AI agents for the QA teams (Java 21, Spring Boot, Google ADK): tool calling over test environments and issue tracking, risk-based classification and human confirmation before every action",
      "Reduced agent response times by routing simple extraction steps to a faster model and keeping reasoning on the larger one",
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
      "Spring Boot",
      "Google ADK",
      "Gemini",
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
