export interface SocialLink {
  platform: string;
  url: string;
  handle: string;
}

export interface Profile {
  name: string;
  title: string;
  roles: string[];
  location: string;
  email: string;
  phone: string;
  bio: string;
  availability: string;
  socials: SocialLink[];
  cvUrl: string;
}

export const profile: Profile = {
  name: "Ernesto Alexis Vázquez",
  title: "QA Automation Engineer & Full Stack Developer with AI",
  roles: [
    "QA Engineer @ CFOTech IT Global Services",
    "Founder @ QAdvanced",
    "Full Stack Developer with AI",
  ],
  location: "Buenos Aires, CABA, Argentina",
  email: "ernestoalexisvazquez@gmail.com",
  phone: "+54 3704824222",
  bio: `QA Engineer specialized in automation, with a focus on complex systems and end-to-end flows in production environments. With over 5 years of experience in banking and telecommunications, I design and implement automated testing solutions that reduce regression time and improve the reliability of critical systems.

I primarily work with Java, Selenium, Cypress, and Playwright, integrating tests across UI, APIs, and batch processes. In my daily work, I automate real-world workflows that include remote execution via SSH, CDR file validation, data processing, and pipeline control within CI/CD environments.

Beyond tools, my approach is centered on understanding the business and building quality solutions that truly deliver value — not just increasing test coverage. Currently exploring how to apply AI in QA: test scenario generation, automated result analysis, and faster debugging processes.`,
  availability: "Open to opportunities",
  socials: [
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/ernestoavazquez",
      handle: "ernestoavazquez",
    },
    {
      platform: "GitHub",
      url: "https://github.com/Vazquez-Ernesto",
      handle: "Vazquez-Ernesto",
    },
    {
      platform: "QAdvanced",
      url: "https://qadvanced-io.vercel.app",
      handle: "QAdvanced",
    },
  ],
  cvUrl: "/Cv.pdf",
};
