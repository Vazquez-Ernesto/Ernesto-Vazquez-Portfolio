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
    role: "Quality Engineering",
    contractType: "Client: Personal (Telecom Argentina)",
    period: "Jun 2025 – Present",
    startDate: "2025-06",
    endDate: null,
    location: "Argentina",
    description:
      "Responsible for ensuring functional and technical quality of a core rating and mediation application within the Telecom Argentina ecosystem, validating critical processes related to CDR processing and rating.",
    responsibilities: [
      "Designed and executed testing strategies (functional, integration, regression) for traffic mediation and rating systems",
      "Validated CDR processing and data reconciliation across mediation, rating, and billing chain",
      "Developed and maintained automated tests to validate critical processes and accelerate regression cycles",
      "Integrated automated tests into CI/CD pipelines with Jenkins",
      "Generated evidence, technical documentation, and traceability between requirements, test cases, and results",
      "Provided internal training on AI-based and automation testing tools",
    ],
    technologies: [
      "Java",
      "Selenium",
      "Cucumber",
      "JUnit 5",
      "Jenkins",
      "SSH",
      "CDR Processing",
      "CI/CD",
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
