import { profile, type Profile } from '../data/profile';
import { experience, type WorkExperience } from '../data/experience';
import { projects, type Project } from '../data/projects';
import { skills, type SkillGroup } from '../data/skills';
import type { Locale } from './locale';

/**
 * Spanish (LATAM) content overlay.
 *
 * English data in src/data/ stays canonical. This module carries only the
 * translated fields and merges them over the canonical records by stable key
 * (company for experience, id for projects, category for skills).
 */

interface ProfileEsOverlay {
  title: string;
  roles: string[];
  bio: string;
  availability: string;
  cvUrl: string;
}

const profileEs: ProfileEsOverlay = {
  title: "QA Automation Engineer / SDET · Ingeniería de Calidad con IA",
  roles: [
    "QA Automation + IA @ CFOTech IT Global Services",
    "Fundador @ QAdvanced",
    "Agentes LLM para QA en Java",
  ],
  bio: `QA Automation Engineer con más de 5 años en banca y telecomunicaciones, especializado en automatizar sistemas críticos de backend: mediación y tasación de CDRs, Web Services SOAP/REST, procesos batch y pipelines CI/CD. Construyo frameworks en Java + Cucumber que ejecutan contra servidores reales vía SSH/SFTP y bases de datos, con evidencia y reporte automático a Jira Xray. Hoy cerca del 80 % de la regresión de Mediación y Tasación en la que trabajo corre automatizada.

En paralelo diseño y pongo en producción agentes LLM aplicados a QA: backends multi-agente en Java 21 + Spring Boot, routers multi-proveedor con failover y suites de evaluación (evals). El QA Agents Lab de este sitio es uno de ellos, funcionando en vivo.

Trabajo con desarrollo asistido por IA de forma disciplinada: Spec-Driven Development, TDD estricto y memoria persistente entre sesiones. Más allá de las herramientas, mi enfoque parte de entender el negocio y construir calidad que aporte valor — no solo más cobertura.`,
  availability: "Abierto a oportunidades",
  cvUrl: "/Cv-es.pdf",
};

type ExperienceEsOverlay = Pick<
  WorkExperience,
  "role" | "contractType" | "period" | "description" | "responsibilities"
>;

const experienceEs: Record<string, ExperienceEsOverlay> = {
  "CFOTech IT Global Services": {
    role: "QA Automation + IA",
    contractType: "Cliente: Personal (Telecom Argentina) — equipos de Mediación y Tasación",
    period: "Jun 2025 – Actualidad",
    description:
      "Automatización de pruebas y agentes de IA para los equipos de QA de Mediación y Tasación de Telecom Argentina: procesamiento de CDRs, Web Services de CBS Huawei, procesos batch y pipelines de Jenkins. Hoy cerca del 80 % de la regresión corre automatizada.",
    responsibilities: [
      "Diseñé y mantengo FAC Mediación, un framework Java 11 + Cucumber + JUnit 5 con ~80 features que procesa CDRs de tráfico de datos y voz (HPGW, HSGW, IMS, VoLTE, IoT, B2B) contra servidores UAT reales vía SSH/SFTP",
      "Automaticé la regresión de Tasación en la migración de CBS Huawei a CBS Cloud: 100+ features sobre Web Services SOAP, 51 interfaces de CDR, 21 Web Services y CRs de negocio, con validación cruzada contra GaussDB",
      "Estandaricé 55 pipelines de Jenkins y los flujos multifase (con esperas de hasta 24 h) bajo un mismo contrato de parámetros, reporte HTML y carga automática de resultados a Jira Xray",
      "Encontré la causa raíz de fallos atribuidos al proveedor: el orden de elementos en plantillas SOAP violaba el XSD; lo corregí y desbloqueé la línea base de CRs",
      "Desarrollo agentes de IA para los equipos de QA de Mediación y Tasación sobre una plataforma interna (Java 21, Spring Boot, Google ADK, Gemini, pgvector): agentes de diagnóstico y operación con 47 herramientas (SSH, parcheo de CDRs ASN.1, Jira, Xray), clasificación de riesgo SAFE/MEDIO/ALTO y confirmación humana antes de cada acción",
      "Reduje la latencia del agente de seguimiento de Jira (antes 48–65 s por consulta) separando pasos de extracción en un modelo rápido y dejando el razonamiento en el modelo grande",
      "Capacité al equipo en herramientas de automatización y desarrollo asistido por IA",
    ],
  },
  "Getnet Argentina": {
    role: "QA Analyst Automation",
    contractType: "Banco Santander — Contratado por RHT",
    period: "Dic 2024 – Jun 2025",
    description:
      "Trabajé dentro del ecosistema de pagos digitales de Getnet (Banco Santander), con foco en soluciones de adquirencia y plataformas de procesamiento de pagos para comercios del modelo Agregador.",
    responsibilities: [
      "Validé soluciones de adquirencia y métodos de pago para comercios y terminales POS",
      "Probé la facturación de terminales POSNET asegurando la generación correcta de cargos y la reconciliación de datos",
      "Realicé la certificación de billeteras digitales para pagos con QR integradas con POSNET de Getnet",
      "Validé funcionalidades para el onboarding y la integración de nuevos canales de venta",
      "Testing de APIs y consultas SQL para asegurar consistencia de datos entre sistemas",
      "Colaboré en el análisis de requerimientos, refinamiento de historias de usuario y validación de criterios de aceptación",
    ],
  },
  "Nave Negocios": {
    role: "QA Analyst",
    contractType: "Banco Galicia — Contratado por TCS",
    period: "Dic 2022 – Dic 2024",
    description:
      "QA en el proyecto Nave, una plataforma digital de Banco Galicia orientada a soluciones financieras para comercios y PyMEs. Aseguré la calidad del producto a lo largo de todo el ciclo de desarrollo.",
    responsibilities: [
      "Diseñé y ejecuté pruebas E2E, de regresión y exploratorias sobre los módulos de la aplicación",
      "Validé flujos funcionales complejos a través de frontend, backend y servicios integrados",
      "Analicé requerimientos y participé en el refinamiento de historias de usuario con equipos de producto y desarrollo",
      "Gestioné defectos y su seguimiento en entornos de UAT y pre-producción",
      "Consultas SQL y análisis de logs para validación de consistencia de datos",
    ],
  },
  UPEX: {
    role: "Quality Assurance Analyst",
    contractType: "Tiempo completo",
    period: "Jun 2021 – Ene 2022",
    description:
      "QA Analyst y moderador de la Academia UPEX. Impulsé prácticas de calidad y el onboarding de nuevos miembros de la academia en metodologías BDD y testing.",
    responsibilities: [
      "Moderé sesiones de UPEX Academy y el onboarding de nuevos miembros",
      "Revisión de User Stories y mentoría en convenciones de nomenclatura, trazabilidad y cobertura",
      "Diseño de pruebas con Xray: Test Sets, Test Cases, Test Execution y reporte de bugs",
      "Ejecuté pruebas Exploratorias, Smoke y de Regresión",
      "Consultas SQL para validación de datos",
    ],
  },
};

type ProjectEsOverlay = Partial<Pick<Project, "title" | "description">>;

const projectsEs: Record<string, ProjectEsOverlay> = {
  "qa-agents-lab": {
    description:
      "La sección de agentes de este sitio: 9 agentes de QA, un agente de desarrollo y un optimizador de prompts, que se usan en vivo eligiendo proveedor y modelo. Backend Spring Boot con router LLM multi-proveedor (Gemini, Ollama, OpenRouter): hedged requests sobre virtual threads, failover, rate limiting y progreso por SSE. 390 tests, incluidas evals de agentes con LLM-as-judge.",
  },
  "qa-core": {
    description:
      "Librería Java de orquestación LLM: el router extraído a un artefacto Maven reutilizable publicado vía JitPack (com.github.Vazquez-Ernesto:qa-core:0.1.0) y consumido por qa-flows, con 149 tests en verde.",
  },
  qadvanced: {
    description:
      "Plataforma de formación QA que fundé: mentorías 1:1, portal de alumno, roadmaps gamificados de 12 semanas, banco de 50 preguntas de entrevista e integración con Google Calendar/Meet para agendar sesiones.",
  },
  "harness-engineering": {
    description:
      "Agente de código para terminal construido desde cero: bucle agente, herramientas, permisos por acción (Sí / Siempre / No), gestión de contexto y soporte para Gemini, OpenRouter, Ollama y Anthropic, con interfaz web y CLI.",
  },
  "scenario-lab": {
    description:
      "Convierte historias de usuario en escenarios Gherkin trazados a cada criterio de aceptación (@AC-n). Un generador determinístico es la línea base que mide el aporte real del LLM.",
  },
  allgamesports: {
    description:
      "Juegos clásicos compilados de su código fuente a WebAssembly (Doom, Wolfenstein 3D) y homebrew de Game Boy, jugables en el navegador. Incluye parches C/C++ propios al motor y guardado con IndexedDB.",
  },
  vidriera: {
    title: "Vidriera",
    description:
      "Servicio de sitios estáticos para comercios en Argentina, con demos de café y barbería y paquetes de precio cerrado.",
  },
  portfolio: {
    title: "Portfolio de Ernesto Vázquez",
    description:
      "Portfolio de ingeniería estático que muestra más de 5 años de QA automation y desarrollo de software. Es también el primer producto usado para probar decisiones arquitectónicas guiadas por evidencia a través de EAPA.",
  },
  "playwright-animation": {
    description:
      "Proyecto full-stack de QA automation con Playwright que cubre pruebas de UI, API y base de datos sobre una app React + Node.js + PostgreSQL, con CI en GitHub Actions.",
  },
  "selenium-java": {
    description:
      "Framework integral de QA automation construido con Java, Selenium y Cucumber. Implementa patrones BDD, Page Object Model y diseño avanzado de pruebas para sistemas complejos de banca y telecom.",
  },
  "cypress-orangehrm": {
    description:
      "Demostración de automatización E2E para el sistema OrangeHRM usando Cypress. Muestra escenarios prácticos de prueba que incluyen autenticación, operaciones CRUD y validación de datos con JavaScript moderno.",
  },
  "swabslabs-playwright": {
    description:
      "Automatización de pruebas para una plataforma de e-commerce (SwabsLabs). Cubre flujos críticos de usuario: autenticación, navegación del catálogo, gestión del carrito y procesos de checkout con Playwright.",
  },
  "react-blog": {
    description:
      "Plataforma de blog educativo construida con React. Cubre conceptos fundamentales: composición de componentes, hooks, gestión de estado y patrones de renderizado. Recurso práctico para aprender React moderno.",
  },
  "github-profile": {
    title: "Perfil de GitHub",
    description:
      "Hub central y README principal de todos mis proyectos personales. Punto de entrada para explorar el portfolio completo de frameworks de automatización, demostraciones de testing y trabajo de desarrollo full-stack.",
  },
  "aboutme-portfolio-v1": {
    description:
      "Portfolio personal original construido con HTML, CSS y JavaScript vanilla. Versión fundacional que muestra habilidades tempranas de desarrollo web y técnicas de demostración de proyectos antes de adoptar frameworks modernos.",
  },
};

const skillCategoriesEs: Record<string, string> = {
  "Test Automation": "Automatización de Pruebas",
  Languages: "Lenguajes",
  "Infrastructure & DevOps": "Infraestructura y DevOps",
  "Methodologies & Practices": "Metodologías y Prácticas",
  "Backend, Data & APIs": "Backend, Datos y APIs",
  "AI in QA": "IA en QA",
};

export function getProfile(locale: Locale): Profile {
  if (locale === "es") return { ...profile, ...profileEs };
  return profile;
}

export function getExperience(locale: Locale): WorkExperience[] {
  if (locale !== "es") return experience;
  return experience.map((job) => ({ ...job, ...experienceEs[job.company] }));
}

export function getProjects(locale: Locale): Project[] {
  if (locale !== "es") return projects;
  return projects.map((project) => ({ ...project, ...projectsEs[project.id] }));
}

export function getSkillGroups(locale: Locale): SkillGroup[] {
  if (locale !== "es") return skills;
  return skills.map((group) => ({
    ...group,
    category: skillCategoriesEs[group.category] ?? group.category,
  }));
}

/** Locale-aware label for a canonical (English) skill category. */
export function getSkillCategory(category: string, locale: Locale): string {
  if (locale !== "es") return category;
  return skillCategoriesEs[category] ?? category;
}
