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
    items: ["Selenium WebDriver", "Cypress", "Playwright", "Cucumber (BDD)", "JUnit 5", "TestNG"],
    accent: "green",
  },
  {
    category: "Languages",
    icon: "💻",
    items: ["Java", "JavaScript", "TypeScript", "Python", "SQL"],
    accent: "green",
  },
  {
    category: "Infrastructure & DevOps",
    icon: "🔧",
    items: ["Jenkins", "CI/CD Pipelines", "SSH Remote Execution", "Docker", "Git", "GitHub Actions"],
    accent: "green",
  },
  {
    category: "Testing Methodologies",
    icon: "🧪",
    items: ["E2E Testing", "API Testing", "BDD", "Regression Testing", "Exploratory Testing", "CDR Validation"],
    accent: "green",
  },
  {
    category: "Data & APIs",
    icon: "🗄️",
    items: ["REST APIs", "Postman", "SQL / DB Validation", "Log Analysis", "Data Reconciliation"],
    accent: "green",
  },
  {
    category: "AI in QA",
    icon: "🤖",
    items: ["LLM Integration", "Test Scenario Generation", "Automated Result Analysis", "Prompt Engineering", "AI-Assisted Debugging"],
    accent: "green",
  },
];
