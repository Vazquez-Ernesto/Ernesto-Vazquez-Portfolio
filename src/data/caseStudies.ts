export type CaseStudyLocale = "en" | "es";
export type EvidenceMaturity = "H1" | "H2";

export interface CaseStudyOption {
  title: string;
  status: "selected" | "rejected";
  rationale: string;
}

export interface CaseStudyEvidence {
  claim: string;
  observation: string;
  maturity: EvidenceMaturity;
}

export interface CaseStudy {
  projectId: string;
  locale: CaseStudyLocale;
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  maturity: EvidenceMaturity;
  problem: string;
  context: string;
  constraints: string[];
  options: CaseStudyOption[];
  decision: string;
  implementation: string[];
  evidence: CaseStudyEvidence[];
  result: string;
  learnings: string[];
  nextHypothesis: string;
}

const sharedProjectId = "portfolio";

export const caseStudies: CaseStudy[] = [
  {
    projectId: sharedProjectId,
    locale: "en",
    slug: "evidence-driven-portfolio",
    title: "From agent-ready claims to evidence-driven architecture",
    summary:
      "A documentation correction exposed a larger engineering lesson: architecture claims must describe capabilities that exist, not intentions that sound impressive.",
    publishedAt: "2026-08-05",
    maturity: "H1",
    problem:
      "The repository described an agent-ready architecture and recommended a future hybrid runtime even though it had no LLM integration, agent runtime, retrieval system, or product memory.",
    context:
      "The portfolio already had a useful typed catalog and a static JSON projection. The problem was not the experiment itself; it was presenting that projection as evidence of an architecture that had not been implemented or evaluated.",
    constraints: [
      "Keep the deployed portfolio static and dependency-free.",
      "Do not delete a useful experiment merely because its original narrative was overstated.",
      "Do not introduce an AI provider before a product capability requires one.",
      "Use only public evidence and exclude confidential or proprietary information.",
    ],
    options: [
      {
        title: "Keep the roadmap claims",
        status: "rejected",
        rationale:
          "It preserved an attractive story but continued to blur planned capabilities with implemented behavior.",
      },
      {
        title: "Delete the context endpoint",
        status: "rejected",
        rationale:
          "The endpoint remains a useful static projection experiment. Removing it would discard evidence instead of correcting its scope.",
      },
      {
        title: "Reframe it as an experimental projection",
        status: "selected",
        rationale:
          "This keeps the working code, makes its limits explicit, and defers runtime choices until a real capability defines them.",
      },
    ],
    decision:
      "Describe the current system as a static portfolio with a product-specific knowledge projection. Keep static output and require future AI work to start from a capability, evaluation criteria, and the smallest necessary infrastructure.",
    implementation: [
      "Replaced agent-ready claims in the README with the current system boundaries.",
      "Removed the obsolete recommendation to switch Astro to hybrid output.",
      "Documented static-first rendering and route-level on-demand rendering as a future, case-driven choice.",
      "Recorded the change as EL-PILOT-001 in the Engineering Loop RFC.",
    ],
    evidence: [
      {
        claim: "The repository no longer promises an implemented agent runtime.",
        observation: "Searches for the obsolete agent-ready and hybrid-output claims return no matches.",
        maturity: "H2",
      },
      {
        claim: "The corrected documents remain mechanically valid.",
        observation: "Editor diagnostics, local links, and whitespace checks pass.",
        maturity: "H2",
      },
      {
        claim: "The new narrative helps recruiters understand the engineering decision.",
        observation: "This case study is the first public test; reader comprehension has not been measured yet.",
        maturity: "H1",
      },
    ],
    result:
      "Technical accuracy is locally supported at H2. The stronger product hypothesis, that a recruiter can understand the reasoning in under ten minutes, remains H1 until evaluated with real readers.",
    learnings: [
      "A working DTO projection is useful evidence, but it is not automatically a domain model or an agent architecture.",
      "Correcting an overstated claim can create more credibility than adding another integration.",
      "Routine changes can preserve decision traceability without requiring another RFC.",
    ],
    nextHypothesis:
      "A structured case study will help readers reconstruct the problem, alternatives, decision, evidence, and learning more clearly than a project card alone.",
  },
  {
    projectId: sharedProjectId,
    locale: "es",
    slug: "portfolio-guiado-por-evidencia",
    title: "De promesas agent-ready a una arquitectura guiada por evidencia",
    summary:
      "Una corrección documental reveló una lección mayor: las afirmaciones arquitectónicas deben describir capacidades existentes, no intenciones atractivas.",
    publishedAt: "2026-08-05",
    maturity: "H1",
    problem:
      "El repositorio describía una arquitectura agent-ready y recomendaba un runtime híbrido futuro, aunque no existían integración con LLM, runtime de agentes, recuperación ni memoria de producto.",
    context:
      "El portfolio ya tenía un catálogo tipado útil y una proyección JSON estática. El problema no era el experimento, sino presentarlo como evidencia de una arquitectura todavía no implementada ni evaluada.",
    constraints: [
      "Mantener el portfolio desplegado como sitio estático y sin dependencias nuevas.",
      "No eliminar un experimento útil solo porque su narrativa original exageraba su alcance.",
      "No introducir un proveedor de IA antes de que una capability real lo necesite.",
      "Usar solo evidencia pública y excluir información confidencial o propietaria.",
    ],
    options: [
      {
        title: "Mantener las promesas del roadmap",
        status: "rejected",
        rationale:
          "Conservaba una historia atractiva, pero seguía mezclando capacidades planeadas con comportamiento implementado.",
      },
      {
        title: "Eliminar el endpoint de contexto",
        status: "rejected",
        rationale:
          "El endpoint sigue siendo un experimento útil de proyección estática. Eliminarlo descartaba evidencia en lugar de corregir su alcance.",
      },
      {
        title: "Presentarlo como proyección experimental",
        status: "selected",
        rationale:
          "Conserva el código funcional, explicita sus límites y difiere decisiones de runtime hasta que una capability real las exija.",
      },
    ],
    decision:
      "Describir el sistema actual como un portfolio estático con una proyección de conocimiento específica del producto. Mantener static output y exigir que cualquier IA futura parta de una capability, criterios de evaluación e infraestructura mínima.",
    implementation: [
      "Reemplazamos en el README las promesas agent-ready por los límites actuales del sistema.",
      "Eliminamos la recomendación obsoleta de cambiar Astro a output híbrido.",
      "Documentamos static-first y el renderizado on-demand por ruta como decisión futura guiada por un caso real.",
      "Registramos el cambio como EL-PILOT-001 en la RFC del Engineering Loop.",
    ],
    evidence: [
      {
        claim: "El repositorio ya no promete un runtime de agentes implementado.",
        observation: "Las búsquedas de los claims agent-ready y hybrid-output obsoletos no devuelven resultados.",
        maturity: "H2",
      },
      {
        claim: "Los documentos corregidos siguen siendo válidos mecánicamente.",
        observation: "Pasaron diagnósticos del editor, enlaces locales y controles de whitespace.",
        maturity: "H2",
      },
      {
        claim: "La nueva narrativa ayuda a recruiters a comprender la decisión de ingeniería.",
        observation: "Este caso de estudio es la primera prueba pública; todavía no medimos comprensión con lectores.",
        maturity: "H1",
      },
    ],
    result:
      "La exactitud técnica está respaldada localmente en H2. La hipótesis de producto, que un recruiter comprenda el razonamiento en menos de diez minutos, permanece H1 hasta evaluarla con lectores reales.",
    learnings: [
      "Una proyección DTO funcional es evidencia útil, pero no se convierte automáticamente en dominio o arquitectura de agentes.",
      "Corregir una afirmación exagerada puede generar más credibilidad que sumar otra integración.",
      "Los cambios Routine pueden conservar trazabilidad sin exigir otra RFC.",
    ],
    nextHypothesis:
      "Un caso de estudio estructurado ayudará a reconstruir problema, alternativas, decisión, evidencia y aprendizaje con más claridad que una tarjeta de proyecto.",
  },
];

export function getCaseStudies(locale: CaseStudyLocale) {
  return caseStudies.filter((caseStudy) => caseStudy.locale === locale);
}

export function getCaseStudyPath(caseStudy: CaseStudy) {
  const basePath = caseStudy.locale === "es" ? "/es/casos-de-estudio" : "/case-studies";
  return `${basePath}/${caseStudy.slug}/`;
}

export function getCaseStudyTranslation(caseStudy: CaseStudy) {
  return caseStudies.find(
    (candidate) => candidate.projectId === caseStudy.projectId && candidate.locale !== caseStudy.locale
  );
}
