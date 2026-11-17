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
  title: "QA Automation Engineer / SDET · AI Quality Engineering",
  roles: [
    "QA Automation + AI Engineer @ CFOTech IT Global Services",
    "Founder @ QAdvanced",
    "LLM Agents for QA in Java",
  ],
  location: "Buenos Aires, CABA, Argentina",
  email: "ernestoalexisvazquez@gmail.com",
  phone: "+54 3704824222",
  bio: `QA Automation Engineer with 5+ years in banking and telecom, specialized in automating mission-critical backend systems: CDR mediation and rating, SOAP/REST web services, batch processes and CI/CD pipelines. I build Java + Cucumber frameworks that run against real servers over SSH/SFTP and databases, with automatic evidence and reporting to Jira Xray. About 80% of the Mediation and Rating regression I work on now runs automated.

I also design and ship LLM agents for QA to production: multi-agent backends in Java 21 + Spring Boot, multi-provider LLM routers with failover, and evaluation suites (evals). The QA Agents Lab on this site is one of them, running live.

I use AI-assisted development with discipline: Spec-Driven Development, strict TDD and persistent memory across sessions. Beyond tools, my approach starts from understanding the business and building quality that delivers value — not just more test coverage.`,
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
