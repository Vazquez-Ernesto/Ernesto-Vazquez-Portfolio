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
    agents: string;
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
  agentsLab: {
    title: string;
    subtitle: string;
    intro: string;
    disclaimer: string;
    status: { checking: string; waking: string; online: string; degraded: string; offline: string; notConfigured: string };
    categories: { about: string; qa: string; dev: string; ai: string };
    topics: string;
    techniques: string;
    evidence: string;
    inputLabel: string;
    placeholder: string;
    run: string;
    running: string;
    useExample: string;
    providerLabel: string;
    providerAuto: string;
    providerAutoShort: string;
    agentList: string;
    shortcut: string;
    characters: string;
    copy: string;
    copied: string;
    retry: string;
    slowHint: string;
    unavailable: string;
    unavailableShort: string;
    outputTitle: string;
    emptyOutput: string;
    servedBy: string;
    fallback: string;
    errors: {
      notConfigured: string;
      invalidInput: string;
      unknownAgent: string;
      rateLimited: string;
      unavailable: string;
      network: string;
      unexpected: string;
    };
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
    agents: "Agents",
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
  agentsLab: {
    title: "QA Agents Lab",
    subtitle: "12 specialized AI agents",
    intro: "Ask about my career, try nine QA agents and one development agent that encode how I work in each specialty, or improve any prompt. Pick an agent, use the sample or paste your own input, and see the method it applies.",
    disclaimer: "Answers are generated by an LLM (Gemini, with Ollama Cloud and OpenRouter as fallbacks) and can contain mistakes: they show a method, not a guarantee. Do not paste confidential data.",
    status: {
      checking: "Checking backend…",
      waking: "Waking up the agents… this can take about a minute",
      online: "Agents online",
      degraded: "Backend up, no LLM configured",
      offline: "Agents offline",
      notConfigured: "Live demo not deployed yet",
    },
    categories: { about: "Me", qa: "QA", dev: "Dev", ai: "AI" },
    topics: "Ask about",
    techniques: "Techniques",
    evidence: "Where I applied it",
    inputLabel: "Input for the agent",
    placeholder: "Paste a user story, an endpoint, a bug description, or some code…",
    run: "Run agent",
    running: "Running…",
    useExample: "Use sample input",
    providerLabel: "Preferred model",
    providerAuto: "Auto (Gemini → Ollama → OpenRouter)",
    providerAutoShort: "Auto",
    agentList: "QA agents",
    shortcut: "Ctrl + Enter to run",
    characters: "characters",
    copy: "Copy",
    copied: "Copied",
    retry: "Try again",
    slowHint: "The first model is slow or unavailable, trying the next one…",
    unavailable: "This agent is being deployed right now. Try again in a few minutes.",
    unavailableShort: "Deploying, available in a few minutes",
    outputTitle: "Agent output",
    emptyOutput: "The answer will appear here.",
    servedBy: "Answered by",
    fallback: "fallback",
    errors: {
      notConfigured: "The live backend is not deployed yet. You can still browse each agent's specialty, techniques, and sample input.",
      invalidInput: "Write something for the agent (up to 6,000 characters).",
      unknownAgent: "That agent does not exist on the backend.",
      rateLimited: "Too many requests. Try again in a minute.",
      unavailable: "The AI models are not available right now. Try again later.",
      network: "Could not reach the agents backend.",
      unexpected: "Something unexpected happened. Try again.",
    },
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
    agents: "Agentes",
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
  agentsLab: {
    title: "Laboratorio de Agentes QA",
    subtitle: "12 agentes de IA especializados",
    intro: "Preguntá por mi carrera, probá nueve agentes de QA y uno de desarrollo que aplican mi forma de trabajar en cada especialidad, o mejorá cualquier prompt. Elegí un agente, usá el ejemplo o pegá tu propio input, y mirá el método que aplica.",
    disclaimer: "Las respuestas las genera un LLM (Gemini, con Ollama Cloud y OpenRouter como respaldo) y pueden tener errores: muestran un método, no una garantía. No pegues datos confidenciales.",
    status: {
      checking: "Verificando backend…",
      waking: "Despertando agentes… puede tardar ~1 minuto",
      online: "Agentes en línea",
      degraded: "Backend activo, sin LLM configurado",
      offline: "Agentes fuera de línea",
      notConfigured: "La demo en vivo todavía no está desplegada",
    },
    categories: { about: "Yo", qa: "QA", dev: "Dev", ai: "IA" },
    topics: "Preguntá por",
    techniques: "Técnicas",
    evidence: "Dónde lo apliqué",
    inputLabel: "Input para el agente",
    placeholder: "Pegá una historia de usuario, un endpoint, la descripción de un bug o código…",
    run: "Ejecutar agente",
    running: "Ejecutando…",
    useExample: "Usar ejemplo",
    providerLabel: "Modelo preferido",
    providerAuto: "Auto (Gemini → Ollama → OpenRouter)",
    providerAutoShort: "Auto",
    agentList: "Agentes de QA",
    shortcut: "Ctrl + Enter para ejecutar",
    characters: "caracteres",
    copy: "Copiar",
    copied: "Copiado",
    retry: "Reintentar",
    slowHint: "El primer modelo está lento o no disponible, probando con el siguiente…",
    unavailable: "Este agente se está desplegando en este momento. Probá de nuevo en unos minutos.",
    unavailableShort: "Desplegándose, disponible en unos minutos",
    outputTitle: "Respuesta del agente",
    emptyOutput: "La respuesta va a aparecer acá.",
    servedBy: "Respondió",
    fallback: "respaldo",
    errors: {
      notConfigured: "El backend en vivo todavía no está desplegado. Igual podés ver la especialidad, las técnicas y el ejemplo de cada agente.",
      invalidInput: "Escribí algo para el agente (hasta 6.000 caracteres).",
      unknownAgent: "Ese agente no existe en el backend.",
      rateLimited: "Demasiadas consultas. Probá de nuevo en un minuto.",
      unavailable: "Los modelos de IA no están disponibles ahora. Probá más tarde.",
      network: "No se pudo conectar con el backend de agentes.",
      unexpected: "Pasó algo inesperado. Probá de nuevo.",
    },
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
