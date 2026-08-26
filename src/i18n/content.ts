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
}

const profileEs: ProfileEsOverlay = {
  title: "QA Automation Engineer & Full Stack Developer con IA",
  roles: [
    "QA Engineer @ CFOTech IT Global Services",
    "Fundador @ QAdvanced",
    "Full Stack Developer con IA",
  ],
  bio: `QA Engineer especializado en automatización, con foco en sistemas complejos y flujos end-to-end en entornos productivos. Con más de 5 años de experiencia en banca y telecomunicaciones, diseño e implemento soluciones de testing automatizado que reducen los tiempos de regresión y mejoran la confiabilidad de sistemas críticos.

Trabajo principalmente con Java, Selenium, Cypress y Playwright, integrando pruebas sobre UI, APIs y procesos batch. En el día a día automatizo flujos reales que incluyen ejecución remota por SSH, validación de archivos CDR, procesamiento de datos y control de pipelines en entornos de CI/CD.

Más allá de las herramientas, mi enfoque parte de entender el negocio y construir soluciones de calidad que realmente aporten valor — no solo aumentar la cobertura de pruebas. Actualmente exploro cómo aplicar IA en QA: generación de escenarios de prueba, análisis automatizado de resultados y procesos de depuración más rápidos.`,
  availability: "Abierto a oportunidades",
};

type ExperienceEsOverlay = Pick<
  WorkExperience,
  "role" | "contractType" | "period" | "description" | "responsibilities"
>;

const experienceEs: Record<string, ExperienceEsOverlay> = {
  "CFOTech IT Global Services": {
    role: "Quality Engineering",
    contractType: "Cliente: Personal (Telecom Argentina)",
    period: "Jun 2025 – Actualidad",
    description:
      "Responsable de garantizar la calidad funcional y técnica de una aplicación core de tasación y mediación dentro del ecosistema de Telecom Argentina, validando procesos críticos de procesamiento y tasación de CDRs.",
    responsibilities: [
      "Diseñé y ejecuté estrategias de prueba (funcionales, integración, regresión) para sistemas de mediación y tasación de tráfico",
      "Validé el procesamiento de CDRs y la reconciliación de datos a lo largo de la cadena de mediación, tasación y facturación",
      "Desarrollé y mantuve tests automatizados para validar procesos críticos y acelerar los ciclos de regresión",
      "Integré tests automatizados en pipelines de CI/CD con Jenkins",
      "Generé evidencia, documentación técnica y trazabilidad entre requerimientos, casos de prueba y resultados",
      "Dicté capacitaciones internas sobre herramientas de testing con IA y automatización",
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
  portfolio: {
    title: "Portfolio de Ernesto Vázquez",
    description:
      "Portfolio de ingeniería estático que muestra más de 5 años de QA automation y desarrollo de software. Es también el primer producto usado para probar decisiones arquitectónicas guiadas por evidencia a través de EAPA.",
  },
  "playwright-animation": {
    description:
      "Hub de automatización E2E para un sistema de gestión de personajes de anime. Demuestra patrones modernos de testing con Playwright y TypeScript, cubriendo flujos de usuario complejos y escenarios de validación de datos.",
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
  "Testing Methodologies": "Metodologías de Testing",
  "Data & APIs": "Datos y APIs",
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
