# Ernesto Vázquez — Portfolio

> QA Automation Engineer & Full Stack Developer with AI | Founder [@QAdvanced](https://qadvanced-io.vercel.app)

Static portfolio built with **Astro 7 + Tailwind CSS v4**. It is also the first reference implementation used to test EAPA, an evidence-driven methodology for evolving knowledge-centric engineering platforms.

---

## Live

🌐 **[ernesto-vazquez-portfolio.vercel.app](https://ernesto-vazquez-portfolio.vercel.app)**

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Astro 7](https://astro.build) — static output, island architecture |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) — `@tailwindcss/vite` plugin |
| Language | TypeScript (strict) |
| Testing | [Vitest](https://vitest.dev) — deterministic capability tests |
| Deploy | [Vercel](https://vercel.com) — CI/CD on push to `main` |
| Knowledge projection | Static `/api/context.json` experiment |
| AI agents | Optional QA Agents Lab backend ([ernesto-agents](#qa-agents-lab), Spring Boot) called from the browser — the site stays static |

---

## Features

- **Dark theme** with QAdvanced brand colors (green `#22c55e` / deep black `#0d0d0d`)
- **Fully responsive** — 375px / 768px / 1440px
- **Bilingual EN/ES** — full Spanish homepage at `/es/` with language switch, translated content overlays
- **Typed content catalog** — portfolio content lives in TypeScript files under `src/data/`
- **Bilingual engineering case study** — problem, alternatives, decision, implementation, evidence, and learning
- **Knowledge Explorer** — deterministic EN/ES answers with match confidence, evidence maturity, and references
- **Skill Evidence network** — interactive SVG graph tracing each skill to its public evidence (H2 artifacts vs H1 claims), fail-closed for untraced skills
- **QA Agents Lab** — 9 QA agents + 1 development agent backed by an LLM, each showing its techniques and where Ernesto applied them; degrades to a browsable catalog when no backend is configured
- **`/api/context.json`** — experimental static projection of part of that catalog
- **Performance-first** — static output, no JS frameworks, intersection observer animations
- **SEO** — Open Graph meta, semantic HTML, descriptive alt text

---

## Project Structure

```
ernesto-portfolio/
├── public/
│   ├── favicon.svg
│   ├── Cv.pdf                        ← downloadable CV
│   └── images/
│       └── Profile.jpg               ← profile photo
├── src/
│   ├── data/                         ← typed product content
│   │   ├── profile.ts                ← personal info, bio, social links
│   │   ├── experience.ts             ← work history (4 companies, typed)
│   │   ├── skills.ts                 ← skill groups by category
│   │   ├── certifications.ts         ← certifications
│   │   ├── projects.ts               ← project catalog
│   │   ├── caseStudies.ts            ← bilingual engineering case studies
│   │   ├── qaAgents.ts               ← QA Agents Lab catalog (EN/ES + evidence)
│   │   ├── publicKnowledge.ts         ← grounded public knowledge records
│   │   └── agentContext.ts           ← experimental context projection
│   ├── components/
│   │   ├── case-studies/
│   │   │   └── CaseStudyPage.astro   ← shared bilingual case template
│   │   ├── Header.astro              ← sticky nav with glassmorphism
│   │   ├── Hero.astro                ← fullscreen with profile photo
│   │   ├── About.astro               ← bio + quick stats
│   │   ├── Experience.astro          ← vertical timeline
│   │   ├── Skills.astro              ← tag grid by category
│   │   ├── Certifications.astro      ← card grid
│   │   ├── Projects.astro            ← featured projects
│   │   ├── SkillGraph.astro          ← skill → evidence network (SVG, animated)
│   │   ├── KnowledgeExplorer.astro    ← deterministic query interface
│   │   ├── AgentsLab.astro            ← QA Agents Lab (10 LLM agents)
│   │   ├── Contact.astro             ← contact links
│   │   ├── Footer.astro
│   │   └── ui/
│   │       ├── SectionHeader.astro
│   │       └── Tag.astro
│   ├── features/
│   │   ├── knowledge-explorer/
│   │   │   ├── types.ts               ← capability contract
│   │   │   ├── referenceSafety.ts     ← allowed href schemes
│   │   │   └── queryPortfolioKnowledge.ts ← deterministic retrieval
│   │   ├── agents-lab/
│   │   │   └── agentsClient.ts        ← typed HTTP client for the agents backend
│   │   └── skill-evidence/
│   │       ├── types.ts               ← TraceSkillEvidence contract
│   │       └── traceSkillEvidence.ts  ← curated skill → evidence map
│   ├── i18n/
│   │   ├── locale.ts                  ← Locale type, routing helpers
│   │   ├── ui.ts                      ← EN/ES UI strings (typed dictionary)
│   │   └── content.ts                 ← Spanish content overlays
│   ├── layouts/
│   │   └── BaseLayout.astro          ← HTML shell, SEO meta, fonts
│   ├── pages/
│   │   ├── index.astro               ← English single page
│   │   ├── es/index.astro            ← Spanish single page
│   │   ├── case-studies/[slug].astro ← English static cases
│   │   ├── es/casos-de-estudio/      ← Spanish static cases
│   │   └── api/
│   │       └── context.json.ts       ← static context projection
│   └── styles/
│       └── global.css                 ← Tailwind @theme tokens
├── tests/
│   ├── knowledge-explorer.test.ts     ← grounded-answer tests
│   ├── agents-lab.test.ts             ← agents catalog + HTTP client tests
│   ├── skill-evidence.test.ts         ← traceability and fail-closed tests
│   └── i18n.test.ts                   ← EN/ES parity tests
├── docs/
│   ├── eapa-manifesto.md             ← non-normative EAPA purpose
│   └── rfcs/
│       ├── RFC-000-eapa.md           ← constitution and reference architecture
│       └── RFC-001-engineering-loop.md ← experimental engineering method
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 22.12+
- npm 9.6.5+

### Install

```bash
git clone https://github.com/Vazquez-Ernesto/Ernesto-Vazquez-Portfolio.git
cd Ernesto-Vazquez-Portfolio
npm install
```

### Dev

```bash
npm run dev
# → http://localhost:4321
```

### Test

```bash
npm test
```

### Build

```bash
npm run build      # outputs to dist/
npm run preview    # preview the production build locally
```

---

## Color Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--color-brand-bg` | `#0d0d0d` | Main background |
| `--color-brand-card` | `#161616` | Cards / alternating sections |
| `--color-brand-green` | `#22c55e` | Primary accent, highlights |
| `--color-brand-red` | `#dc2626` | Secondary accent, hover states |
| `--color-brand-text` | `#f1f5f9` | Primary text |
| `--color-brand-muted` | `#94a3b8` | Secondary text |
| `--color-brand-border` | `#1e1e1e` | Borders, dividers |

---

## Current Knowledge Projection

### Executable capability

`QueryPortfolioKnowledge` is the first product capability implemented from EAPA principles. It runs entirely in the browser over curated public records:

```
Question
  ──► QueryPortfolioKnowledge
  ──► deterministic record ranking
  ──► answer + match confidence
  ──► evidence maturity + references
```

The capability responds in English or Spanish and returns `insufficient` when published evidence cannot support an answer. It does not call an LLM, persist conversation memory, or generate new claims.

### Second capability: TraceSkillEvidence

`TraceSkillEvidence` answers a different question: given a skill from the public catalog, which projects, experiences, or certifications back it?

```
Skill
  ──► TraceSkillEvidence
  ──► curated evidence map (no inference)
  ──► nodes grouped by kind, maturity H1/H2
  ──► interactive network UI (SkillGraph)
```

Skills without curated evidence return `untraced` — the system prefers admitting "no public proof yet" over fabricating links. With two capabilities live, shared invariants can now be observed before any abstraction is extracted (EAPA P9).

### Legacy projection

Portfolio content is stored as typed TypeScript objects in `src/data/`. The current `agentContext.ts` module transforms part of that content into text and JSON during the static build.

This is a product-specific DTO projection. It is **not yet** a domain model, retrieval system, RAG pipeline, agent runtime, memory layer, or provider abstraction.

### How it works

```
src/data/profile.ts       ─┐
src/data/experience.ts     ├──► agentContext.ts ──► /api/context.json
src/data/skills.ts         │
src/data/certifications.ts ─┘
```

The static endpoint `/api/context.json` exposes:

```json
{
  "version": "1.0",
  "generated_at": "...",
  "raw": "<full system prompt for LLM>",
  "structured": {
    "profile": { ... },
    "experience": [ ... ],
    "skills": { ... },
    "certifications": [ ... ]
  }
}
```

### QA Agents Lab

The `#agents` section talks to [`ernesto-agents`](https://github.com/Vazquez-Ernesto/ernesto-agents) (private during the pilot; Spring Boot, Gemini with OpenRouter fallback), which holds the agents' prompts. The portfolio only knows its public URL:

```bash
cp .env.example .env    # PUBLIC_AGENTS_API_URL=http://localhost:8081
npm run dev
```

| Agent | Category | Agent | Category |
|---|---|---|---|
| Test Case Designer | QA | Test Strategy Planner | QA |
| BDD Gherkin Writer | QA | SQL Data Validator | QA |
| Bug Report Analyst | QA | CI/CD Quality Gates | QA |
| API Test Designer | QA | Exploratory Testing Coach | QA |
| Test Automation Architect | QA | Code Reviewer & Developer | Dev |

Agent ids in `src/data/qaAgents.ts` must match the backend's `skills/lab/*.md`; both repos test the same list. Answers are rendered with `textContent` (never `innerHTML`) because LLM output is untrusted. Decision record: EL-PILOT-006 in RFC-001.

### Evidence-driven evolution

AI capabilities will be introduced only after a real portfolio use case defines:

1. the knowledge and provenance required;
2. an observable capability contract;
3. why deterministic code is insufficient;
4. evaluation and confidentiality criteria;
5. the smallest infrastructure needed to validate the hypothesis.

If on-demand rendering becomes necessary, Astro will remain static by default and only the required routes will opt out of prerendering through the deployment adapter.

The reasoning behind this evolution is documented in:

- [EAPA Manifesto](docs/eapa-manifesto.md) — non-normative purpose and principles, currently H1.
- [RFC-000 — EAPA Constitution](docs/rfcs/RFC-000-eapa.md) — reference boundaries and product-first guardrails.
- [RFC-001 — Engineering Loop](docs/rfcs/RFC-001-engineering-loop.md) — experimental decision and evaluation process.

---

## Deploy

This project deploys automatically to Vercel on every push to `main`.

| Setting | Value |
|---------|-------|
| Build Command | `astro build` |
| Output Directory | `dist` |
| Install Command | `npm install` |
| Environment Variables | `PUBLIC_AGENTS_API_URL` (optional) — URL of the ernesto-agents backend. Without it the QA Agents Lab shows the catalog only |

---

## Content Updates

To update portfolio content, edit the files in `src/data/` — no HTML or component changes needed:

| What to update | File |
|----------------|------|
| Bio, contact, links | `src/data/profile.ts` |
| Work experience | `src/data/experience.ts` |
| Skills | `src/data/skills.ts` |
| Certifications | `src/data/certifications.ts` |

---

## Author

**Ernesto Alexis Vázquez**
Buenos Aires, Argentina

- LinkedIn: [ernestoavazquez](https://www.linkedin.com/in/ernestoavazquez)
- GitHub: [Vazquez-Ernesto](https://github.com/Vazquez-Ernesto)
- QAdvanced: [qadvanced-io.vercel.app](https://qadvanced-io.vercel.app)
- Email: ernestoalexisvazquez@gmail.com

---

## License

MIT
