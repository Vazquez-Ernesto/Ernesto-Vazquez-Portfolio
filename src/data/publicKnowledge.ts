import { caseStudies, getCaseStudyPath } from './caseStudies';
import { experience } from './experience';
import { profile } from './profile';
import { projects } from './projects';
import { skills } from './skills';
import type { KnowledgeRecord } from '../features/knowledge-explorer/types';

const repositoryUrl = "https://github.com/Vazquez-Ernesto/Ernesto-Vazquez-Portfolio";
const manifestoUrl = `${repositoryUrl}/blob/main/docs/eapa-manifesto.md`;
const currentExperience = experience.find((item) => item.current);
const testAutomation = skills.find((group) => group.category === "Test Automation");
const playwrightProjects = projects.filter((project) =>
  project.technologies.some((technology) => technology.toLowerCase() === "playwright")
);

function findCaseStudy(locale: "en" | "es") {
  return caseStudies.find((caseStudy) => caseStudy.projectId === "portfolio" && caseStudy.locale === locale);
}

function createCurrentRoleRecords(): KnowledgeRecord[] {
  if (!currentExperience) return [];

  return [
    {
      id: "current-role-en",
      locale: "en",
      title: "Current professional role",
      answer: `${profile.name} currently works in ${currentExperience.role} at ${currentExperience.company}. The public profile lists the period as ${currentExperience.period}.`,
      patterns: ["current role", "current job", "where does ernesto work", "where is ernesto working"],
      evidence: [
        {
          statement: "This is a self-reported professional profile claim.",
          maturity: "H1",
          source: { label: "Experience timeline", href: "/#experience" },
        },
      ],
    },
    {
      id: "current-role-es",
      locale: "es",
      title: "Rol profesional actual",
      answer: `${profile.name} trabaja actualmente en ${currentExperience.role} en ${currentExperience.company}. El perfil público indica el período ${currentExperience.period}.`,
      patterns: ["rol actual", "trabajo actual", "donde trabaja ernesto", "en que trabaja ernesto"],
      evidence: [
        {
          statement: "Es una afirmación profesional declarada por el autor.",
          maturity: "H1",
          source: { label: "Línea de experiencia", href: "/#experience" },
        },
      ],
    },
  ];
}

function createTestingRecords(): KnowledgeRecord[] {
  if (!testAutomation) return [];
  const tools = testAutomation.items.join(", ");

  return [
    {
      id: "testing-stack-en",
      locale: "en",
      title: "Test automation stack",
      answer: `The public skills catalog lists ${tools}. Project repositories provide additional evidence for Selenium, Cypress, and Playwright.`,
      patterns: ["testing frameworks", "test automation tools", "qa tools", "what testing tools"],
      evidence: [
        {
          statement: "The stack is declared in the portfolio and supported by public project repositories.",
          maturity: "H2",
          source: { label: "Skills and projects", href: "/#skills" },
        },
      ],
    },
    {
      id: "testing-stack-es",
      locale: "es",
      title: "Stack de automatización",
      answer: `El catálogo público de skills incluye ${tools}. Los repositorios aportan evidencia adicional para Selenium, Cypress y Playwright.`,
      patterns: ["frameworks de testing", "herramientas de automatizacion", "herramientas qa", "que herramientas de testing"],
      evidence: [
        {
          statement: "El stack está declarado en el portfolio y respaldado por repositorios públicos.",
          maturity: "H2",
          source: { label: "Skills y proyectos", href: "/#skills" },
        },
      ],
    },
  ];
}

function createPlaywrightRecords(): KnowledgeRecord[] {
  const titles = playwrightProjects.map((project) => project.title).join(", ");
  const source = playwrightProjects[0]?.github ?? "/#projects";
  if (!titles) return [];

  return [
    {
      id: "playwright-projects-en",
      locale: "en",
      title: "Projects using Playwright",
      answer: `The public project catalog contains these Playwright projects: ${titles}.`,
      patterns: ["projects use playwright", "playwright projects", "which projects use playwright"],
      evidence: [
        {
          statement: "The project metadata and linked repositories identify Playwright explicitly.",
          maturity: "H2",
          source: { label: "Playwright project repository", href: source },
        },
      ],
    },
    {
      id: "playwright-projects-es",
      locale: "es",
      title: "Proyectos que usan Playwright",
      answer: `El catálogo público contiene estos proyectos con Playwright: ${titles}.`,
      patterns: ["proyectos usan playwright", "proyectos con playwright", "que proyectos usan playwright"],
      evidence: [
        {
          statement: "La metadata y los repositorios enlazados identifican Playwright explícitamente.",
          maturity: "H2",
          source: { label: "Repositorio del proyecto Playwright", href: source },
        },
      ],
    },
  ];
}

function createDecisionRecords(): KnowledgeRecord[] {
  return (["en", "es"] as const).flatMap((locale) => {
    const caseStudy = findCaseStudy(locale);
    if (!caseStudy) return [];
    const isSpanish = locale === "es";

    return [{
      id: `agent-ready-decision-${locale}`,
      locale,
      title: isSpanish ? "Decisión sobre agent-ready" : "Agent-ready architecture decision",
      answer: caseStudy.decision,
      patterns: isSpanish
        ? ["por que eliminaron la promesa agent ready", "por que no un llm", "decision agent ready", "por que sigue estatico"]
        : ["why did you remove the agent ready claim", "why no llm", "agent ready decision", "why keep it static"],
      evidence: caseStudy.evidence.map((item) => ({
        statement: item.observation,
        maturity: item.maturity,
        source: {
          label: isSpanish ? "Caso de estudio" : "Case study",
          href: getCaseStudyPath(caseStudy),
        },
      })),
    } satisfies KnowledgeRecord];
  });
}

function createEvidenceRecords(): KnowledgeRecord[] {
  return (["en", "es"] as const).flatMap((locale) => {
    const caseStudy = findCaseStudy(locale);
    if (!caseStudy) return [];
    const isSpanish = locale === "es";

    return [{
      id: `architecture-evidence-${locale}`,
      locale,
      title: isSpanish ? "Evidencia de la decisión" : "Decision evidence",
      answer: caseStudy.result,
      patterns: isSpanish
        ? ["evidencia respalda la decision", "evidencia de arquitectura", "como validaron la decision"]
        : ["evidence supports the decision", "architecture evidence", "how was the decision validated"],
      evidence: caseStudy.evidence.map((item) => ({
        statement: `${item.claim} ${item.observation}`,
        maturity: item.maturity,
        source: {
          label: isSpanish ? "Evidencia del caso" : "Case evidence",
          href: getCaseStudyPath(caseStudy),
        },
      })),
    } satisfies KnowledgeRecord];
  });
}

const eapaRecords: KnowledgeRecord[] = [
  {
    id: "eapa-purpose-en",
    locale: "en",
    title: "Purpose of EAPA",
    answer: "EAPA is a working methodology and reference architecture for knowledge-centric engineering platforms enabled by AI. The portfolio is the product; EAPA is a means to build it and learn with evidence.",
    patterns: ["what is eapa", "eapa purpose", "why eapa exists"],
    evidence: [
      {
        statement: "EAPA remains a working hypothesis, not a stable framework.",
        maturity: "H1",
        source: { label: "EAPA Manifesto", href: manifestoUrl },
      },
    ],
  },
  {
    id: "eapa-purpose-es",
    locale: "es",
    title: "Propósito de EAPA",
    answer: "EAPA es una metodología de trabajo y arquitectura de referencia para plataformas de ingeniería centradas en conocimiento y habilitadas por IA. El portfolio es el producto; EAPA es un medio para construirlo y aprender con evidencia.",
    patterns: ["que es eapa", "proposito de eapa", "por que existe eapa"],
    evidence: [
      {
        statement: "EAPA permanece como hipótesis de trabajo, no como framework estable.",
        maturity: "H1",
        source: { label: "Manifiesto EAPA", href: manifestoUrl },
      },
    ],
  },
];

export const publicKnowledge: KnowledgeRecord[] = [
  ...createCurrentRoleRecords(),
  ...createTestingRecords(),
  ...createPlaywrightRecords(),
  ...createDecisionRecords(),
  ...createEvidenceRecords(),
  ...eapaRecords,
];
