import { skills } from '../../data/skills';
import { getSkillCategory } from '../../i18n/content';
import type {
  SkillEvidenceNode,
  SkillTraceLocale,
  SkillTraceQuery,
  SkillTraceResult,
} from './types';

/**
 * TraceSkillEvidence — second executable capability (EL-PILOT-004).
 *
 * Given a skill from the public catalog, returns the curated chain of
 * evidence that backs it: projects (H2, public artifacts), experience and
 * certifications (H1, self-declared). Skills without curated evidence are
 * reported as `untraced` — fail-closed by design, never inferred.
 *
 * The map below is deliberately explicit and hand-maintained. Deriving it
 * automatically from tags was evaluated and rejected: it would fabricate
 * weak links and hide the difference between declared and proven skills.
 */

type LocalText = Record<SkillTraceLocale, string>;

interface CuratedNode {
  kind: SkillEvidenceNode["kind"];
  id: string;
  label: LocalText;
  detail: LocalText;
  maturity: SkillEvidenceNode["maturity"];
  href?: string;
}

const project = (
  id: string,
  label: string,
  detail: LocalText,
  href: string,
): CuratedNode => ({
  kind: "project",
  id,
  label: { en: label, es: label },
  detail,
  maturity: "H2",
  href,
});

const job = (company: string, detail: LocalText): CuratedNode => ({
  kind: "experience",
  id: company,
  label: { en: company, es: company },
  detail,
  maturity: "H1",
  href: "#experience",
});

const cert = (name: string, detail: LocalText): CuratedNode => ({
  kind: "certification",
  id: name,
  label: { en: name, es: name },
  detail,
  maturity: "H1",
  href: "#certifications",
});

const CERT_SELENIUM_PYTHON = "Domina la Automatización Web con Python y Selenium";
const CERT_PLAYWRIGHT = "Curso Playwright con TypeScript E2E";
const CERT_CYPRESS = "Cypress E2E Automation Testing con JS, a fondo!";

const evidenceBySkill: Record<string, CuratedNode[]> = {
  "Selenium WebDriver": [
    project(
      "selenium-java",
      "Selenium Java Automation Framework",
      {
        en: "Public framework with Selenium, Cucumber and JUnit 5 for banking and telecom systems.",
        es: "Framework público con Selenium, Cucumber y JUnit 5 para sistemas bancarios y de telecom.",
      },
      "https://github.com/Vazquez-Ernesto/selenium-java-automation",
    ),
    job("CFOTech IT Global Services", {
      en: "Daily Selenium automation for Telecom Argentina mediation and rating regression suites.",
      es: "Automatización diaria con Selenium para regresiones de mediación y tasación en Telecom Argentina.",
    }),
    cert(CERT_SELENIUM_PYTHON, {
      en: "Formal training on web automation with Selenium.",
      es: "Formación formal en automatización web con Selenium.",
    }),
  ],
  Cypress: [
    project(
      "cypress-orangehrm",
      "Cypress OrangeHRM Automation",
      {
        en: "Public E2E suite over OrangeHRM with auth, CRUD and data validation scenarios.",
        es: "Suite E2E pública sobre OrangeHRM con escenarios de autenticación, CRUD y validación de datos.",
      },
      "https://github.com/Vazquez-Ernesto/cypress-orangehrm-automation",
    ),
    cert(CERT_CYPRESS, {
      en: "Formal training on Cypress E2E with JavaScript.",
      es: "Formación formal en Cypress E2E con JavaScript.",
    }),
  ],
  Playwright: [
    project(
      "playwright-animation",
      "Playwright Animation Character Hub",
      {
        en: "Public E2E hub with TypeScript covering complex user workflows.",
        es: "Hub E2E público con TypeScript que cubre flujos de usuario complejos.",
      },
      "https://github.com/Vazquez-Ernesto/playwright-animate-character-hub-e2e",
    ),
    project(
      "swabslabs-playwright",
      "SwabsLabs Playwright Automation",
      {
        en: "Public e-commerce flows: auth, catalog, cart and checkout.",
        es: "Flujos públicos de e-commerce: autenticación, catálogo, carrito y checkout.",
      },
      "https://github.com/Vazquez-Ernesto/proyect-swabslabs-playwright",
    ),
    cert(CERT_PLAYWRIGHT, {
      en: "Formal training on Playwright with TypeScript.",
      es: "Formación formal en Playwright con TypeScript.",
    }),
  ],
  "Cucumber (BDD)": [
    project(
      "selenium-java",
      "Selenium Java Automation Framework",
      {
        en: "Gherkin features and step definitions in a public BDD framework.",
        es: "Features en Gherkin y step definitions en un framework BDD público.",
      },
      "https://github.com/Vazquez-Ernesto/selenium-java-automation",
    ),
    job("CFOTech IT Global Services", {
      en: "BDD scenarios for CDR processing and rating validation.",
      es: "Escenarios BDD para validación de procesamiento y tasación de CDRs.",
    }),
    job("UPEX", {
      en: "Onboarded academy members into BDD and testing methodologies.",
      es: "Onboarding de miembros de la academia en BDD y metodologías de testing.",
    }),
  ],
  "JUnit 5": [
    project(
      "selenium-java",
      "Selenium Java Automation Framework",
      {
        en: "JUnit 5 as the test runner of the public Java framework.",
        es: "JUnit 5 como runner de tests del framework Java público.",
      },
      "https://github.com/Vazquez-Ernesto/selenium-java-automation",
    ),
    job("CFOTech IT Global Services", {
      en: "JUnit 5 suites integrated into Jenkins pipelines.",
      es: "Suites JUnit 5 integradas en pipelines de Jenkins.",
    }),
  ],
  Java: [
    project(
      "selenium-java",
      "Selenium Java Automation Framework",
      {
        en: "Main language of the public automation framework.",
        es: "Lenguaje principal del framework de automatización público.",
      },
      "https://github.com/Vazquez-Ernesto/selenium-java-automation",
    ),
    job("CFOTech IT Global Services", {
      en: "Java as primary language for mediation and rating test automation.",
      es: "Java como lenguaje principal para la automatización de mediación y tasación.",
    }),
  ],
  JavaScript: [
    project(
      "cypress-orangehrm",
      "Cypress OrangeHRM Automation",
      {
        en: "E2E suites written in modern JavaScript.",
        es: "Suites E2E escritas en JavaScript moderno.",
      },
      "https://github.com/Vazquez-Ernesto/cypress-orangehrm-automation",
    ),
    project(
      "react-blog",
      "React Knowledge Blog",
      {
        en: "Educational blog built with React and JavaScript.",
        es: "Blog educativo construido con React y JavaScript.",
      },
      "https://github.com/Vazquez-Ernesto/blog-react",
    ),
  ],
  TypeScript: [
    project(
      "playwright-animation",
      "Playwright Animation Character Hub",
      {
        en: "E2E hub written in TypeScript.",
        es: "Hub E2E escrito en TypeScript.",
      },
      "https://github.com/Vazquez-Ernesto/playwright-animate-character-hub-e2e",
    ),
    project(
      "portfolio",
      "Ernesto Vázquez Portfolio",
      {
        en: "This site: typed data layer, typed capabilities and Astro islands in TypeScript.",
        es: "Este sitio: capa de datos tipada, capabilities tipadas e islas Astro en TypeScript.",
      },
      "https://github.com/Vazquez-Ernesto/Ernesto-Vazquez-Portfolio",
    ),
  ],
  Python: [
    cert(CERT_SELENIUM_PYTHON, {
      en: "Web automation with Python and Selenium.",
      es: "Automatización web con Python y Selenium.",
    }),
  ],
  SQL: [
    job("Getnet Argentina", {
      en: "SQL queries ensuring data consistency across payment systems.",
      es: "Consultas SQL para asegurar consistencia de datos entre sistemas de pago.",
    }),
    job("Nave Negocios", {
      en: "SQL and log analysis for data consistency validation.",
      es: "SQL y análisis de logs para validación de consistencia de datos.",
    }),
    job("UPEX", {
      en: "SQL queries for data validation.",
      es: "Consultas SQL para validación de datos.",
    }),
  ],
  Jenkins: [
    job("CFOTech IT Global Services", {
      en: "Automated tests integrated into CI/CD pipelines with Jenkins.",
      es: "Tests automatizados integrados en pipelines de CI/CD con Jenkins.",
    }),
  ],
  "CI/CD Pipelines": [
    job("CFOTech IT Global Services", {
      en: "Regression suites executed in CI/CD for critical telecom processes.",
      es: "Suites de regresión ejecutadas en CI/CD para procesos críticos de telecom.",
    }),
  ],
  "SSH Remote Execution": [
    job("CFOTech IT Global Services", {
      en: "Remote execution over SSH against UAT Linux servers for CDR validation.",
      es: "Ejecución remota por SSH contra servidores Linux UAT para validación de CDRs.",
    }),
  ],
  Git: [
    project(
      "github-profile",
      "GitHub Profile",
      {
        en: "Public profile organizing all frameworks and testing demonstrations.",
        es: "Perfil público que organiza todos los frameworks y demostraciones de testing.",
      },
      "https://github.com/Vazquez-Ernesto",
    ),
  ],
  "E2E Testing": [
    project(
      "playwright-animation",
      "Playwright Animation Character Hub",
      {
        en: "Complex E2E user workflows with Playwright.",
        es: "Flujos E2E complejos de usuario con Playwright.",
      },
      "https://github.com/Vazquez-Ernesto/playwright-animate-character-hub-e2e",
    ),
    project(
      "cypress-orangehrm",
      "Cypress OrangeHRM Automation",
      {
        en: "E2E scenarios with Cypress over a real HR system.",
        es: "Escenarios E2E con Cypress sobre un sistema HR real.",
      },
      "https://github.com/Vazquez-Ernesto/cypress-orangehrm-automation",
    ),
    job("Nave Negocios", {
      en: "E2E, regression and exploratory tests across application modules.",
      es: "Pruebas E2E, de regresión y exploratorias sobre los módulos de la aplicación.",
    }),
  ],
  "API Testing": [
    job("Getnet Argentina", {
      en: "API testing for acquiring solutions and payment methods.",
      es: "Testing de APIs para soluciones de adquirencia y métodos de pago.",
    }),
  ],
  BDD: [
    project(
      "selenium-java",
      "Selenium Java Automation Framework",
      {
        en: "BDD patterns with Cucumber in a public framework.",
        es: "Patrones BDD con Cucumber en un framework público.",
      },
      "https://github.com/Vazquez-Ernesto/selenium-java-automation",
    ),
    job("UPEX", {
      en: "Mentoring on BDD, traceability and coverage.",
      es: "Mentoría en BDD, trazabilidad y cobertura.",
    }),
  ],
  "Regression Testing": [
    job("CFOTech IT Global Services", {
      en: "Regression strategies for traffic mediation and rating systems.",
      es: "Estrategias de regresión para sistemas de mediación y tasación de tráfico.",
    }),
    job("Nave Negocios", {
      en: "Regression testing across application modules.",
      es: "Pruebas de regresión sobre los módulos de la aplicación.",
    }),
  ],
  "Exploratory Testing": [
    job("Nave Negocios", {
      en: "Exploratory sessions over complex functional workflows.",
      es: "Sesiones exploratorias sobre flujos funcionales complejos.",
    }),
    job("UPEX", {
      en: "Exploratory, smoke and regression testing execution.",
      es: "Ejecución de pruebas exploratorias, smoke y de regresión.",
    }),
  ],
  "CDR Validation": [
    job("CFOTech IT Global Services", {
      en: "CDR processing validation and reconciliation across mediation, rating and billing.",
      es: "Validación de procesamiento de CDRs y reconciliación entre mediación, tasación y facturación.",
    }),
  ],
  "REST APIs": [
    job("Getnet Argentina", {
      en: "REST API validation in the Santander digital payments ecosystem.",
      es: "Validación de APIs REST en el ecosistema de pagos digitales de Santander.",
    }),
  ],
  Postman: [
    job("Getnet Argentina", {
      en: "Postman as daily tool for API testing.",
      es: "Postman como herramienta diaria para testing de APIs.",
    }),
  ],
  "SQL / DB Validation": [
    job("Getnet Argentina", {
      en: "Database queries ensuring consistency across payment systems.",
      es: "Consultas a bases de datos para asegurar consistencia entre sistemas de pago.",
    }),
    job("Nave Negocios", {
      en: "SQL validation across frontend, backend and integrated services.",
      es: "Validación SQL entre frontend, backend y servicios integrados.",
    }),
  ],
  "Log Analysis": [
    job("Nave Negocios", {
      en: "Log analysis for data consistency validation.",
      es: "Análisis de logs para validación de consistencia de datos.",
    }),
  ],
  "Data Reconciliation": [
    job("CFOTech IT Global Services", {
      en: "Data reconciliation across the mediation, rating and billing chain.",
      es: "Reconciliación de datos a lo largo de la cadena de mediación, tasación y facturación.",
    }),
    job("Getnet Argentina", {
      en: "POSNET terminal billing reconciliation.",
      es: "Reconciliación de facturación de terminales POSNET.",
    }),
  ],
};

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

/** All catalog skills, flattened, canonical English names. */
const catalog = skills.flatMap((group) =>
  group.items.map((item) => ({ item, category: group.category, key: normalize(item) })),
);

export function traceSkillEvidence(query: SkillTraceQuery): SkillTraceResult {
  const locale: SkillTraceLocale = query.locale ?? "en";
  const key = normalize(query.skill);
  const entry = catalog.find((candidate) => candidate.key === key);

  const curated = entry ? evidenceBySkill[entry.item] ?? [] : [];
  const evidence: SkillEvidenceNode[] = curated.map((node) => ({
    kind: node.kind,
    id: node.id,
    label: node.label[locale],
    detail: node.detail[locale],
    maturity: node.maturity,
    href: node.href,
  }));

  if (!entry || evidence.length === 0) {
    return {
      status: "untraced",
      capability: "TraceSkillEvidence",
      skill: entry?.item ?? query.skill,
      category: entry ? getSkillCategory(entry.category, locale) : undefined,
      locale,
      evidence: [],
    };
  }

  return {
    status: "traced",
    capability: "TraceSkillEvidence",
    skill: entry.item,
    category: getSkillCategory(entry.category, locale),
    locale,
    evidence,
  };
}
