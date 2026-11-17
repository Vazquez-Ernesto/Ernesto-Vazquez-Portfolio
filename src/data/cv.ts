import { getProjects, getSkillGroups } from '../i18n/content';
import type { Locale } from '../i18n/locale';
import type { Project } from './projects';
import { skills, type SkillGroup } from './skills';

/**
 * CV-only view over the canonical catalog.
 *
 * The /cv page reuses src/data as its single source of truth. This module
 * only adds what a CV needs on top: which projects make the cut, the focus
 * areas used by the filter, and the few sections the home page does not show.
 */

export type CvArea = "qa" | "ai" | "software";
export type CvFilter = CvArea | "all";

export const cvAreas: CvArea[] = ["qa", "ai", "software"];

export interface CvProject extends Project {
  areas: CvArea[];
}

export interface CvSkillGroup extends SkillGroup {
  areas: CvArea[];
}

/** Projects shown on the CV, in display order, with their focus areas. */
const projectAreas: Array<[string, CvArea[]]> = [
  ["qa-agents-lab", ["ai", "software"]],
  ["qa-core", ["ai", "software"]],
  ["qadvanced", ["qa"]],
  ["harness-engineering", ["ai", "software"]],
  ["scenario-lab", ["ai", "qa"]],
  ["allgamesports", ["software"]],
  ["vidriera", ["software"]],
  ["playwright-animation", ["qa"]],
  ["selenium-java", ["qa"]],
  ["cypress-orangehrm", ["qa"]],
  ["swabslabs-playwright", ["qa"]],
];

/** Focus areas per canonical (English) skill category. */
const skillGroupAreas: Record<string, CvArea[]> = {
  "Test Automation": ["qa"],
  Languages: ["qa", "ai", "software"],
  "Infrastructure & DevOps": ["software"],
  "Methodologies & Practices": ["qa", "software"],
  "Backend, Data & APIs": ["software"],
  "AI in QA": ["ai"],
};

export function matchesArea(areas: CvArea[], filter: CvFilter): boolean {
  return filter === "all" || areas.includes(filter);
}

export function getCvProjects(locale: Locale): CvProject[] {
  const byId = new Map(getProjects(locale).map((project) => [project.id, project]));
  return projectAreas.flatMap(([id, areas]) => {
    const project = byId.get(id);
    return project ? [{ ...project, areas }] : [];
  });
}

export function getCvSkillGroups(locale: Locale): CvSkillGroup[] {
  return getSkillGroups(locale).map((group, index) => ({
    ...group,
    areas: skillGroupAreas[skills[index]?.category ?? ""] ?? [],
  }));
}

interface CvPractice {
  title: string;
  body: string;
}

export interface CvExtras {
  education: string[];
  languages: string[];
  practices: CvPractice[];
}

const extras: Record<Locale, CvExtras> = {
  en: {
    education: ["Universidad Nacional de Formosa (Argentina) — university studies, not completed"],
    languages: ["Spanish: native", "English: Elementary (A1/A2), reads technical documentation"],
    practices: [
      { title: "Spec-Driven Development", body: "Every significant change goes through proposal, spec, design, tasks, implementation and verification, with a sub-agent per phase." },
      { title: "Strict TDD with agents", body: "The agent writes the failing test first; no change is closed without a green suite." },
      { title: "Evals over opinions", body: "Deterministic baselines, golden sets and LLM-as-judge to decide whether a model or prompt actually improves results." },
      { title: "Persistent memory", body: "Decisions, root causes and conventions recorded with Engram across 15+ projects, retrievable between sessions." },
      { title: "Safe agents", body: "Tools classified by risk, human confirmation for write actions, anti-hallucination guards and credentials kept out of code." },
    ],
  },
  es: {
    education: ["Universidad Nacional de Formosa — estudios universitarios (incompletos)"],
    languages: ["Español: nativo", "Inglés: básico (A1/A2), lectura de documentación técnica"],
    practices: [
      { title: "Spec-Driven Development", body: "Cada cambio grande pasa por propuesta, especificación, diseño, tareas, implementación y verificación, con sub-agentes por fase." },
      { title: "TDD estricto con agentes", body: "El agente escribe primero el test que falla; ningún cambio se da por cerrado sin la suite en verde." },
      { title: "Evals antes que opiniones", body: "Línea base determinística, golden sets y LLM-as-judge para decidir si un modelo o prompt mejora de verdad." },
      { title: "Memoria persistente", body: "Decisiones, causas raíz y convenciones registradas con Engram en más de 15 proyectos, recuperables entre sesiones." },
      { title: "Agentes seguros", body: "Herramientas clasificadas por riesgo, confirmación humana en acciones de escritura, guardas contra alucinación y credenciales fuera del código." },
    ],
  },
};

export function getCvExtras(locale: Locale): CvExtras {
  return extras[locale];
}
