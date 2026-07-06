export interface Certification {
  name: string;
  issuer: string;
  year?: string;
  url?: string;
}

export const certifications: Certification[] = [
  {
    name: "Domina la Automatización Web con Python y Selenium",
    issuer: "Udemy",
  },
  {
    name: "Curso Playwright con TypeScript E2E",
    issuer: "Udemy",
  },
  {
    name: "Cypress E2E Automation Testing con JS, a fondo!",
    issuer: "Udemy",
  },
  {
    name: "Gestión del Rendimiento Datos Excelencia y Cultura",
    issuer: "LinkedIn Learning",
  },
  {
    name: "Curso Programacion Para Tester, Todo lo que necesitas saber",
    issuer: "Udemy",
  },
];
