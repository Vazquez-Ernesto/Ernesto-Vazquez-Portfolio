import type { Locale } from './locale';

export interface UiStrings {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    about: string;
    experience: string;
    skills: string;
    evidence: string;
    projects: string;
    knowledge: string;
    contact: string;
    resume: string;
    menuLabel: string;
    switchLabel: string;
    switchAria: string;
  };
  hero: {
    greeting: string;
    title: string;
    taglinePre: string;
    taglineLink: string;
    viewWork: string;
    downloadCv: string;
    scrollLabel: string;
  };
  about: {
    title: string;
    subtitle: string;
    stats: { years: string; companies: string; domains: string; frameworks: string };
    aiTitle: string;
    aiItems: string[];
    location: string;
  };
  experience: {
    title: string;
    subtitle: string;
  };
  skills: {
    title: string;
    subtitle: string;
  };
  certifications: {
    title: string;
    subtitle: string;
  };
  evidence: {
    title: string;
    subtitle: string;
    instructions: string;
    legendH2: string;
    legendH1: string;
    untracedTitle: string;
    untracedBody: string;
    groupProject: string;
    groupExperience: string;
    groupCertification: string;
    networkLabel: string;
  };
  projects: {
    title: string;
    subtitle: string;
    caseStudy: string;
    footerPre: string;
    footerPost: string;
  };
  knowledge: {
    title: string;
    subtitle: string;
    label: string;
    placeholder: string;
    button: string;
    note: string;
    emptyState: string;
    suggestions: string[];
    matchConfidence: string;
    evidence: string;
    references: string;
  };
  contact: {
    badge: string;
    title: string;
    body: string;
    cta: string;
    labels: { email: string; linkedin: string; github: string; phone: string };
  };
  footer: {
    builtWith: string;
  };
}

const en: UiStrings = {
  meta: {
    title: "Ernesto Vázquez — QA Automation Engineer & Full Stack Developer",
    description:
      "QA Automation Engineer specialized in banking and telecom systems with 5+ years of experience. Founder of QAdvanced. Exploring AI in QA.",
  },
  nav: {
    about: "About",
    experience: "Experience",
    skills: "Skills",
    evidence: "Evidence",
    projects: "Projects",
    knowledge: "Knowledge",
    contact: "Contact",
    resume: "Resume ↓",
    menuLabel: "Toggle navigation menu",
    switchLabel: "ES",
    switchAria: "Cambiar a español",
  },
  hero: {
    greeting: "Hi, I'm",
    title: "QA Automation Engineer & Full Stack Developer with AI",
    taglinePre: "Building quality systems for banking & telecom. Founder of",
    taglineLink: "QAdvanced",
    viewWork: "View My Work",
    downloadCv: "Download CV",
    scrollLabel: "Scroll down",
  },
  about: {
    title: "About Me",
    subtitle: "Who I am",
    stats: {
      years: "Years of Experience",
      companies: "Companies",
      domains: "Industry Domains",
      frameworks: "Test Frameworks",
    },
    aiTitle: "Currently exploring AI in QA:",
    aiItems: [
      "Test scenario generation with LLMs",
      "Automated result analysis",
      "AI-assisted debugging and validation",
      "Intelligent test suite maintenance",
    ],
    location: "Location",
  },
  experience: {
    title: "Experience",
    subtitle: "Professional journey",
  },
  skills: {
    title: "Skills",
    subtitle: "Tools & technologies",
  },
  certifications: {
    title: "Certifications",
    subtitle: "Continuous learning",
  },
  evidence: {
    title: "Skill Evidence",
    subtitle: "Claims traced to proof",
    instructions: "Select a skill to see the public evidence that backs it.",
    legendH2: "H2 — backed by a public artifact",
    legendH1: "H1 — self-declared claim",
    untracedTitle: "No public evidence traced yet",
    untracedBody:
      "This skill is declared in the public catalog, but no project, experience, or certification links to it yet. Fail-closed by design.",
    groupProject: "Projects",
    groupExperience: "Experience",
    groupCertification: "Certifications",
    networkLabel: "Skill evidence network",
  },
  projects: {
    title: "Projects",
    subtitle: "What I've built",
    caseStudy: "Case Study",
    footerPre: "Find more on",
    footerPost: "— complete automation frameworks, testing patterns, and code samples.",
  },
  knowledge: {
    title: "Knowledge Explorer",
    subtitle: "Grounded answers",
    label: "Ask about experience, projects, decisions, or evidence",
    placeholder: "What evidence supports the architecture decision?",
    button: "Query",
    note: "Deterministic retrieval. No LLM, conversation memory, or generated claims.",
    emptyState: "Select a question or query the public knowledge catalog.",
    suggestions: [
      "What is EAPA?",
      "Why did you remove the agent-ready claim?",
      "Which projects use Playwright?",
      "Where does Ernesto work?",
    ],
    matchConfidence: "Match confidence",
    evidence: "Evidence",
    references: "References",
  },
  contact: {
    badge: "Let's talk",
    title: "Get In Touch",
    body: "Whether it's a QA challenge, a collaboration opportunity, or just a tech conversation — I'm always open.",
    cta: "Send Me a Message",
    labels: { email: "Email", linkedin: "LinkedIn", github: "GitHub", phone: "Phone" },
  },
  footer: {
    builtWith: "Built with Astro.",
  },
};

const es: UiStrings = {
  meta: {
    title: "Ernesto Vázquez — QA Automation Engineer & Full Stack Developer",
    description:
      "QA Automation Engineer especializado en sistemas bancarios y de telecomunicaciones con más de 5 años de experiencia. Fundador de QAdvanced. Explorando IA en QA.",
  },
  nav: {
    about: "Sobre mí",
    experience: "Experiencia",
    skills: "Skills",
    evidence: "Evidencia",
    projects: "Proyectos",
    knowledge: "Conocimiento",
    contact: "Contacto",
    resume: "CV ↓",
    menuLabel: "Abrir o cerrar el menú de navegación",
    switchLabel: "EN",
    switchAria: "Switch to English",
  },
  hero: {
    greeting: "Hola, soy",
    title: "QA Automation Engineer & Full Stack Developer con IA",
    taglinePre: "Construyendo sistemas de calidad para banca y telecom. Fundador de",
    taglineLink: "QAdvanced",
    viewWork: "Ver mi trabajo",
    downloadCv: "Descargar CV",
    scrollLabel: "Desplazarse hacia abajo",
  },
  about: {
    title: "Sobre mí",
    subtitle: "Quién soy",
    stats: {
      years: "Años de experiencia",
      companies: "Empresas",
      domains: "Dominios de industria",
      frameworks: "Frameworks de testing",
    },
    aiTitle: "Actualmente explorando IA en QA:",
    aiItems: [
      "Generación de escenarios de prueba con LLMs",
      "Análisis automatizado de resultados",
      "Depuración y validación asistida por IA",
      "Mantenimiento inteligente de suites de pruebas",
    ],
    location: "Ubicación",
  },
  experience: {
    title: "Experiencia",
    subtitle: "Trayectoria profesional",
  },
  skills: {
    title: "Skills",
    subtitle: "Herramientas y tecnologías",
  },
  certifications: {
    title: "Certificaciones",
    subtitle: "Aprendizaje continuo",
  },
  evidence: {
    title: "Evidencia de Skills",
    subtitle: "Claims trazados a pruebas",
    instructions: "Selecciona una skill para ver la evidencia pública que la respalda.",
    legendH2: "H2 — respaldada por un artefacto público",
    legendH1: "H1 — afirmación autodeclarada",
    untracedTitle: "Sin evidencia pública trazada todavía",
    untracedBody:
      "Esta skill está declarada en el catálogo público, pero ningún proyecto, experiencia o certificación la enlaza todavía. Fail-closed por diseño.",
    groupProject: "Proyectos",
    groupExperience: "Experiencia",
    groupCertification: "Certificaciones",
    networkLabel: "Red de evidencia de skills",
  },
  projects: {
    title: "Proyectos",
    subtitle: "Lo que construí",
    caseStudy: "Caso de estudio",
    footerPre: "Encontrá más en",
    footerPost: "— frameworks de automatización completos, patrones de testing y ejemplos de código.",
  },
  knowledge: {
    title: "Explorador de Conocimiento",
    subtitle: "Respuestas con evidencia",
    label: "Preguntá sobre experiencia, proyectos, decisiones o evidencia",
    placeholder: "¿Qué evidencia respalda la decisión de arquitectura?",
    button: "Consultar",
    note: "Retrieval determinístico. Sin LLM, sin memoria conversacional, sin afirmaciones generadas.",
    emptyState: "Elegí una pregunta o consultá el catálogo público de conocimiento.",
    suggestions: [
      "¿Qué es EAPA?",
      "¿Por qué eliminaron la promesa agent ready?",
      "¿Qué proyectos usan Playwright?",
      "¿Dónde trabaja Ernesto actualmente?",
    ],
    matchConfidence: "Coincidencia",
    evidence: "Evidencia",
    references: "Referencias",
  },
  contact: {
    badge: "Hablemos",
    title: "Contactame",
    body: "Sea un desafío de QA, una oportunidad de colaboración o simplemente una charla técnica — siempre estoy abierto.",
    cta: "Enviame un mensaje",
    labels: { email: "Email", linkedin: "LinkedIn", github: "GitHub", phone: "Teléfono" },
  },
  footer: {
    builtWith: "Hecho con Astro.",
  },
};

export const ui: Record<Locale, UiStrings> = { en, es };
