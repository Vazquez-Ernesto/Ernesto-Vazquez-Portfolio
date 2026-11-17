export interface SkillGroup {
  category: string;
  icon: string;
  items: string[];
  accent: "green" | "red" | "neutral";
}

export const skills: SkillGroup[] = [
  {
    category: "Test Automation",
    icon: "⚡",
    items: ["Selenium WebDriver", "Playwright", "Cypress", "Cucumber (BDD)", "JUnit 5", "TestNG", "Mockito", "REST Assured", "Vitest"],
    accent: "green",
  },
  {
    category: "Languages",
    icon: "💻",
    items: ["Java", "TypeScript", "JavaScript", "SQL", "Python", "C (WebAssembly)"],
    accent: "green",
  },
  {
    category: "Infrastructure & DevOps",
    icon: "🔧",
    items: ["Jenkins", "CI/CD Pipelines", "SSH Remote Execution", "GitHub Actions", "Docker", "Git", "Vercel", "Render", "Cloudflare Workers"],
    accent: "green",
  },
  {
    category: "Methodologies & Practices",
    icon: "🧪",
    items: ["E2E Testing", "API Testing", "BDD", "Regression Testing", "Exploratory Testing", "CDR Validation", "Page Object Model", "Strict TDD", "Spec-Driven Development", "Hexagonal Architecture"],
    accent: "green",
  },
  {
    category: "Backend, Data & APIs",
    icon: "🗄️",
    items: ["Spring Boot", "REST APIs", "SOAP Web Services", "Postman", "SQL / DB Validation", "PostgreSQL + pgvector", "Log Analysis", "Data Reconciliation"],
    accent: "green",
  },
  {
    category: "AI in QA",
    icon: "🤖",
    items: ["LLM Agents (Google ADK)", "Multi-provider LLM Routing", "LLM Evals (LLM-as-judge)", "RAG & Embeddings", "Tool Calling", "Prompt Engineering", "Claude Code & MCP"],
    accent: "green",
  },
];
