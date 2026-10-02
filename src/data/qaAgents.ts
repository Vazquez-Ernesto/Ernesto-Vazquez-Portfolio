import type { Locale } from '../i18n/locale';

/**
 * QA Agents Lab catalog (EL-PILOT-006).
 *
 * The prompts live in the ernesto-agents backend (src/main/resources/skills/lab/<id>.md).
 * This file holds what the portfolio shows: bilingual copy, a sample input, and the
 * evidence behind each specialty, using the same H1/H2 maturity as TraceSkillEvidence.
 * Ids must match the backend: both repos test the same list.
 */

export const QA_AGENT_IDS = [
  "about-ernesto",
  "test-case-designer",
  "bdd-gherkin-writer",
  "bug-report-analyst",
  "api-test-designer",
  "automation-architect",
  "test-strategy-planner",
  "sql-data-validator",
  "ci-quality-gates",
  "exploratory-testing-coach",
  "code-review-dev",
] as const;

export type QaAgentId = (typeof QA_AGENT_IDS)[number];
export type QaAgentCategory = "about" | "qa" | "dev";
export type QaAgentMaturity = "H1" | "H2";

type LocalText = Record<Locale, string>;

interface QaAgentEvidenceEntry {
  label: LocalText;
  maturity: QaAgentMaturity;
  href: string;
}

interface QaAgentEntry {
  id: QaAgentId;
  icon: string;
  category: QaAgentCategory;
  name: LocalText;
  summary: LocalText;
  techniques: string[];
  /** Localized replacement for techniques (the About agent lists topics, not techniques). */
  topics?: Record<Locale, string[]>;
  example: LocalText;
  evidence: QaAgentEvidenceEntry[];
}

export interface QaAgent {
  id: QaAgentId;
  icon: string;
  category: QaAgentCategory;
  name: string;
  summary: string;
  techniques: string[];
  example: string;
  evidence: { label: string; maturity: QaAgentMaturity; href: string }[];
}

const REPO = {
  portfolio: "https://github.com/Vazquez-Ernesto/Ernesto-Vazquez-Portfolio",
  selenium: "https://github.com/Vazquez-Ernesto/selenium-java-automation",
  playwright: "https://github.com/Vazquez-Ernesto/playwright-animate-character-hub-e2e",
  cypress: "https://github.com/Vazquez-Ernesto/cypress-orangehrm-automation",
  reactBlog: "https://github.com/Vazquez-Ernesto/blog-react",
};

const job = (en: string, es: string): QaAgentEvidenceEntry => ({
  label: { en, es },
  maturity: "H1",
  href: "#experience",
});

const repo = (en: string, es: string, href: string): QaAgentEvidenceEntry => ({
  label: { en, es },
  maturity: "H2",
  href,
});

const same = (text: string): LocalText => ({ en: text, es: text });

export const qaAgentCatalog: QaAgentEntry[] = [
  {
    id: "about-ernesto",
    icon: "👤",
    category: "about",
    name: { en: "About Ernesto", es: "Sobre Ernesto" },
    summary: {
      en: "Ask anything about my career: where I work, my stack, years of experience, projects, and how to reach me.",
      es: "Preguntá lo que quieras sobre mi carrera: dónde trabajo, mi stack, años de experiencia, proyectos y cómo contactarme.",
    },
    techniques: [],
    topics: {
      en: ["Current role", "Tech stack", "Years of experience", "Projects", "Contact"],
      es: ["Rol actual", "Stack técnico", "Años de experiencia", "Proyectos", "Contacto"],
    },
    example: {
      en: "Where does Ernesto work now, which technologies does he use, and how many years of QA experience does he have?",
      es: "¿Dónde trabaja Ernesto hoy, qué tecnologías maneja y cuántos años de experiencia tiene en QA?",
    },
    evidence: [
      repo("Portfolio data (src/data, typed)", "Datos del portfolio (src/data, tipados)", REPO.portfolio),
      job("Work history in this portfolio", "Trayectoria en este portfolio"),
    ],
  },
  {
    id: "test-case-designer",
    icon: "🧪",
    category: "qa",
    name: { en: "Test Case Designer", es: "Diseñador de Casos de Prueba" },
    summary: {
      en: "Turns a requirement into test cases with formal black-box techniques, prioritized by risk.",
      es: "Convierte un requerimiento en casos de prueba con técnicas de caja negra, priorizados por riesgo.",
    },
    techniques: ["Equivalence partitioning", "Boundary values", "Decision tables", "State transition", "Pairwise"],
    example: {
      en: "User story: As a bank customer I want to transfer money between my own accounts.\nRules: amount between 1 and 10,000 USD with up to 2 decimals; daily limit of 20,000 USD; the source account must have enough balance; transfers are blocked between 23:55 and 00:05.",
      es: "Historia: Como cliente del banco quiero transferir dinero entre mis propias cuentas.\nReglas: monto entre 1 y 10.000 USD con hasta 2 decimales; límite diario de 20.000 USD; la cuenta origen debe tener saldo suficiente; no se permiten transferencias entre las 23:55 y las 00:05.",
    },
    evidence: [
      job("UPEX — test design in Xray", "UPEX — diseño de pruebas en Xray"),
      job("Nave — E2E and regression suites", "Nave — suites E2E y de regresión"),
    ],
  },
  {
    id: "bdd-gherkin-writer",
    icon: "🥒",
    category: "qa",
    name: { en: "BDD Gherkin Writer", es: "Escritor BDD / Gherkin" },
    summary: {
      en: "Writes declarative Gherkin scenarios from user stories, plus Cucumber step definitions in Java.",
      es: "Escribe escenarios Gherkin declarativos desde historias de usuario, con step definitions de Cucumber en Java.",
    },
    techniques: ["Given/When/Then", "Scenario Outline", "Ubiquitous language", "Cucumber + JUnit 5"],
    example: {
      en: "As a merchant I want to generate a QR code to charge a customer, so that they can pay with their digital wallet. The QR code expires after 5 minutes and the amount must be greater than zero.",
      es: "Como comercio quiero generar un código QR para cobrarle a un cliente, para que pueda pagar con su billetera digital. El QR vence a los 5 minutos y el monto debe ser mayor a cero.",
    },
    evidence: [
      repo("Selenium + Cucumber public framework", "Framework público con Selenium + Cucumber", REPO.selenium),
      job("UPEX and CFOTech — BDD with Cucumber", "UPEX y CFOTech — BDD con Cucumber"),
    ],
  },
  {
    id: "bug-report-analyst",
    icon: "🐞",
    category: "qa",
    name: { en: "Bug Report Analyst", es: "Analista de Reportes de Bugs" },
    summary: {
      en: "Turns a vague complaint into a reproducible bug report with severity, priority, and missing data.",
      es: "Convierte una queja vaga en un reporte de bug reproducible con severidad, prioridad y datos faltantes.",
    },
    techniques: ["Severity vs priority", "Reproduction steps", "Root-cause hypotheses", "Jira"],
    example: {
      en: "Hey, sometimes when I try to pay with QR the app keeps loading forever and then shows 'Error 500'. It happened twice this morning on my Android phone, and the second time the money was debited anyway.",
      es: "Che, a veces cuando quiero pagar con QR la app queda cargando para siempre y después muestra 'Error 500'. Me pasó dos veces hoy a la mañana en mi Android, y la segunda vez igual me debitaron la plata.",
    },
    evidence: [job("Nave — defect management in Jira", "Nave — gestión de defectos en Jira")],
  },
  {
    id: "api-test-designer",
    icon: "🔌",
    category: "qa",
    name: { en: "API Test Designer", es: "Diseñador de Tests de API" },
    summary: {
      en: "Designs functional, negative, security, and contract tests for REST endpoints, with REST Assured code.",
      es: "Diseña tests funcionales, negativos, de seguridad y de contrato para endpoints REST, con código REST Assured.",
    },
    techniques: ["Status codes", "401 vs 403", "Contract / schema", "Idempotency", "REST Assured"],
    example: same(
      'POST /api/v1/transfers\nRequires a Bearer token.\nBody: { "fromAccount": "string", "toAccount": "string", "amount": number, "currency": "ARS" | "USD" }\nReturns 201 with { "id", "status", "createdAt" }.',
    ),
    evidence: [job("Getnet — REST API validation with Postman", "Getnet — validación de APIs REST con Postman")],
  },
  {
    id: "automation-architect",
    icon: "🤖",
    category: "qa",
    name: { en: "Test Automation Architect", es: "Arquitecto de Automatización" },
    summary: {
      en: "Designs and reviews Selenium, Playwright, and Cypress frameworks: locators, waits, and flaky tests.",
      es: "Diseña y revisa frameworks de Selenium, Playwright y Cypress: locators, esperas y tests flaky.",
    },
    techniques: ["Page Object Model", "Explicit waits", "Test isolation", "Flaky test diagnosis"],
    example: {
      en: 'This Selenium test fails randomly in Jenkins. Review it:\n\n@Test\nvoid login() throws Exception {\n  driver.get(BASE_URL);\n  driver.findElement(By.xpath("/html/body/div[2]/form/div[1]/input")).sendKeys("admin");\n  driver.findElement(By.xpath("/html/body/div[2]/form/div[2]/input")).sendKeys("admin123");\n  driver.findElement(By.xpath("/html/body/div[2]/form/button")).click();\n  Thread.sleep(5000);\n  assertTrue(driver.getPageSource().contains("Dashboard"));\n}',
      es: 'Este test de Selenium falla de forma aleatoria en Jenkins. Revisalo:\n\n@Test\nvoid login() throws Exception {\n  driver.get(BASE_URL);\n  driver.findElement(By.xpath("/html/body/div[2]/form/div[1]/input")).sendKeys("admin");\n  driver.findElement(By.xpath("/html/body/div[2]/form/div[2]/input")).sendKeys("admin123");\n  driver.findElement(By.xpath("/html/body/div[2]/form/button")).click();\n  Thread.sleep(5000);\n  assertTrue(driver.getPageSource().contains("Dashboard"));\n}',
    },
    evidence: [
      repo("Selenium Java framework", "Framework Selenium Java", REPO.selenium),
      repo("Playwright E2E project", "Proyecto E2E con Playwright", REPO.playwright),
      repo("Cypress OrangeHRM project", "Proyecto Cypress OrangeHRM", REPO.cypress),
    ],
  },
  {
    id: "test-strategy-planner",
    icon: "🗺️",
    category: "qa",
    name: { en: "Test Strategy Planner", es: "Planificador de Estrategia de Testing" },
    summary: {
      en: "Builds a risk-based test strategy: test levels, automation scope, entry/exit criteria, and metrics.",
      es: "Arma una estrategia de testing basada en riesgo: niveles, alcance de automatización, criterios y métricas.",
    },
    techniques: ["Risk matrix", "Test pyramid", "Entry / exit criteria", "Quality metrics"],
    example: {
      en: "We release a new billing module for a telecom company in 6 weeks. It rates prepaid and postpaid calls from CDR files, applies promotions, and generates invoices. Team: 4 developers and 2 QA engineers. Today all tests are manual.",
      es: "En 6 semanas sale un módulo nuevo de facturación para una telco. Tasa llamadas prepagas y pospagas desde archivos CDR, aplica promociones y genera facturas. Equipo: 4 devs y 2 QA. Hoy todas las pruebas son manuales.",
    },
    evidence: [job("CFOTech — testing strategies for Telecom", "CFOTech — estrategias de testing para Telecom")],
  },
  {
    id: "sql-data-validator",
    icon: "🗄️",
    category: "qa",
    name: { en: "SQL Data Validator", es: "Validador de Datos SQL" },
    summary: {
      en: "Writes SQL checks for data integrity and reconciliation between systems and batch processes.",
      es: "Escribe chequeos SQL de integridad y conciliación de datos entre sistemas y procesos batch.",
    },
    techniques: ["Reconciliation", "Duplicates & orphans", "Date boundaries", "Checks as tests"],
    example: {
      en: "Table cdr_raw(call_id, msisdn, start_time, duration_sec) is loaded by mediation. Table rated_calls(call_id, msisdn, amount, rated_at) is produced by rating. Every raw CDR must be rated exactly once. Help me validate yesterday's batch.",
      es: "La tabla cdr_raw(call_id, msisdn, start_time, duration_sec) la carga mediación. La tabla rated_calls(call_id, msisdn, amount, rated_at) la genera tasación. Cada CDR debe tasarse exactamente una vez. Ayudame a validar el batch de ayer.",
    },
    evidence: [
      job("CFOTech — CDR mediation → rating reconciliation", "CFOTech — conciliación de CDR mediación → tasación"),
      job("Getnet — POSNET data consistency", "Getnet — consistencia de datos POSNET"),
    ],
  },
  {
    id: "ci-quality-gates",
    icon: "🚦",
    category: "qa",
    name: { en: "CI/CD Quality Gates", es: "Quality Gates en CI/CD" },
    summary: {
      en: "Designs pipelines with test stages, objective quality gates, and a flaky-test policy.",
      es: "Diseña pipelines con etapas de test, quality gates objetivos y una política para tests flaky.",
    },
    techniques: ["Jenkinsfile", "GitHub Actions", "Fast feedback", "Flaky quarantine"],
    example: {
      en: "Java 21 + Maven project with JUnit 5 unit tests, Cucumber API tests, and a Selenium regression suite that takes 90 minutes. We use Jenkins and deploy to a UAT server over SSH.",
      es: "Proyecto Java 21 + Maven con tests unitarios JUnit 5, tests de API con Cucumber y una regresión Selenium que tarda 90 minutos. Usamos Jenkins y desplegamos a un servidor UAT por SSH.",
    },
    evidence: [job("CFOTech — Jenkins regression pipelines", "CFOTech — pipelines de regresión en Jenkins")],
  },
  {
    id: "exploratory-testing-coach",
    icon: "🧭",
    category: "qa",
    name: { en: "Exploratory Testing Coach", es: "Coach de Testing Exploratorio" },
    summary: {
      en: "Creates time-boxed exploratory charters driven by risks and heuristics (SBTM).",
      es: "Crea charters exploratorios con time-box guiados por riesgos y heurísticas (SBTM).",
    },
    techniques: ["Charters", "SFDIPOT", "HICCUPPS oracles", "Session debrief"],
    example: {
      en: "New feature: merchants can refund a QR payment from the web portal within 30 days, either partially or in full.",
      es: "Funcionalidad nueva: los comercios pueden devolver un pago con QR desde el portal web dentro de los 30 días, de forma parcial o total.",
    },
    evidence: [job("Nave and UPEX — exploratory testing", "Nave y UPEX — testing exploratorio")],
  },
  {
    id: "code-review-dev",
    icon: "💻",
    category: "dev",
    name: { en: "Code Reviewer & Developer", es: "Code Reviewer y Desarrollador" },
    summary: {
      en: "Reviews and writes Java, TypeScript, and React code with a tester's eye: bugs, security, and unit tests.",
      es: "Revisa y escribe código Java, TypeScript y React con mirada de tester: bugs, seguridad y tests unitarios.",
    },
    techniques: ["Clean code", "SOLID", "XSS / injection", "JUnit 5", "Vitest"],
    example: {
      en: "Review this function and write tests for it:\n\nasync function showUser(id) {\n  const res = await fetch('/api/users/' + id);\n  const user = await res.json();\n  document.getElementById('profile').innerHTML =\n    '<h2>' + user.name + '</h2><p>' + user.bio + '</p>';\n}",
      es: "Revisá esta función y escribile tests:\n\nasync function showUser(id) {\n  const res = await fetch('/api/users/' + id);\n  const user = await res.json();\n  document.getElementById('profile').innerHTML =\n    '<h2>' + user.name + '</h2><p>' + user.bio + '</p>';\n}",
    },
    evidence: [
      repo("This portfolio (Astro + TypeScript + Vitest)", "Este portfolio (Astro + TypeScript + Vitest)", REPO.portfolio),
      repo("React Knowledge Blog", "Blog de conocimiento en React", REPO.reactBlog),
    ],
  },
];

export function getQaAgents(locale: Locale): QaAgent[] {
  return qaAgentCatalog.map((agent) => ({
    id: agent.id,
    icon: agent.icon,
    category: agent.category,
    name: agent.name[locale],
    summary: agent.summary[locale],
    techniques: agent.topics?.[locale] ?? agent.techniques,
    example: agent.example[locale],
    evidence: agent.evidence.map((item) => ({
      label: item.label[locale],
      maturity: item.maturity,
      href: item.href,
    })),
  }));
}
