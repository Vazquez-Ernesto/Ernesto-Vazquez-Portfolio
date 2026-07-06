export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  live?: string;
  role: "personal" | "framework" | "demonstration" | "portfolio";
}

export const projects: Project[] = [
  {
    id: "portfolio",
    title: "Ernesto Vázquez Portfolio",
    description:
      "Modern personal portfolio showcasing 5+ years of QA engineering and full-stack development expertise. Built with Astro 7 + Tailwind CSS v4, featuring agent-ready data layer architecture for future AI integration.",
    technologies: ["Astro", "TypeScript", "Tailwind CSS v4", "Static Output"],
    github: "https://github.com/Vazquez-Ernesto/Ernesto-Vazquez-Portfolio",
    live: "https://ernesto-vazquez-portfolio.vercel.app/",
    role: "portfolio",
  },
  {
    id: "playwright-animation",
    title: "Playwright Animation Character Hub",
    description:
      "E2E test automation hub for anime character management system. Demonstrates modern Playwright testing patterns with TypeScript, covering complex user workflows and data validation scenarios.",
    technologies: ["Playwright", "TypeScript", "E2E Testing", "Vercel"],
    github: "https://github.com/Vazquez-Ernesto/playwright-animate-character-hub-e2e",
    live: "https://playwright-anime-character-hub-e2e.vercel.app/",
    role: "demonstration",
  },
  {
    id: "selenium-java",
    title: "Selenium Java Automation Framework",
    description:
      "Comprehensive QA automation framework built with Java, Selenium, and Cucumber. Implements BDD patterns, Page Object Model, and advanced test design for complex banking and telecom systems.",
    technologies: ["Java", "Selenium", "Cucumber", "JUnit 5", "BDD"],
    github: "https://github.com/Vazquez-Ernesto/selenium-java-automation",
    role: "framework",
  },
  {
    id: "cypress-orangehrm",
    title: "Cypress OrangeHRM Automation",
    description:
      "E2E test automation demonstration for OrangeHRM system using Cypress. Showcases practical test scenarios including authentication, CRUD operations, and data validation with modern JavaScript.",
    technologies: ["Cypress", "JavaScript", "E2E Testing", "Page Object Model"],
    github: "https://github.com/Vazquez-Ernesto/cypress-orangehrm-automation",
    role: "demonstration",
  },
  {
    id: "swabslabs-playwright",
    title: "SwabsLabs Playwright Automation",
    description:
      "Test automation for e-commerce platform (SwabsLabs). Covers critical user flows including authentication, product catalog navigation, shopping cart management, and checkout processes with Playwright.",
    technologies: ["Playwright", "JavaScript", "E2E Testing", "E-commerce"],
    github: "https://github.com/Vazquez-Ernesto/proyect-swabslabs-playwright",
    role: "demonstration",
  },
  {
    id: "react-blog",
    description:
      "Educational blog platform built with React. Covers fundamental React concepts including component composition, hooks, state management, and rendering patterns. Practical resource for learning modern React.",
    title: "React Knowledge Blog",
    technologies: ["React", "JavaScript", "Component Architecture", "GitHub Pages"],
    live: "https://vazquez-ernesto.github.io/blog-react/",
    github: "https://github.com/Vazquez-Ernesto/blog-react",
    role: "personal",
  },
  {
    id: "github-profile",
    title: "GitHub Profile",
    description:
      "Central hub and main README for all personal projects. Entry point to explore the complete portfolio of QA automation frameworks, testing demonstrations, and full-stack development work.",
    technologies: ["Git", "Profile Documentation", "Project Organization"],
    github: "https://github.com/Vazquez-Ernesto",
    role: "personal",
  },
  {
    id: "aboutme-portfolio-v1",
    title: "Ernesto Vazquez AboutMe (v1)",
    description:
      "Original personal portfolio built with vanilla HTML, CSS, and JavaScript. Foundational version showcasing early web development skills and project demonstration techniques before modern framework adoption.",
    technologies: ["HTML5", "CSS3", "JavaScript", "GitHub Pages"],
    github: "https://github.com/Vazquez-Ernesto/Ernesto-Vazquez-AboutMe",
    live: "https://vazquez-ernesto.github.io/Ernesto-Vazquez-AboutMe/",
    role: "portfolio",
  },
];
