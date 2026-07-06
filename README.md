# Ernesto Vázquez — Portfolio

> QA Automation Engineer & Full Stack Developer with AI | Founder [@QAdvanced](https://qadvanced-io.vercel.app)

Modern personal portfolio built with **Astro 7 + Tailwind CSS v4**, designed with an agent-ready data layer for future AI integration.

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
| Deploy | [Vercel](https://vercel.com) — CI/CD on push to `main` |
| Future AI | OpenAI / Vercel AI SDK — endpoint ready at `/api/context.json` |

---

## Features

- **Dark theme** with QAdvanced brand colors (green `#22c55e` / deep black `#0d0d0d`)
- **Fully responsive** — 375px / 768px / 1440px
- **Agent-ready data layer** — all content lives in typed TypeScript files under `src/data/`
- **`/api/context.json`** — static endpoint that exposes a structured knowledge base for AI agents
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
│   ├── data/                         ← single source of truth (feeds the AI agent)
│   │   ├── profile.ts                ← personal info, bio, social links
│   │   ├── experience.ts             ← work history (4 companies, typed)
│   │   ├── skills.ts                 ← skill groups by category
│   │   ├── certifications.ts         ← certifications
│   │   └── agentContext.ts           ← assembled knowledge base for LLMs
│   ├── components/
│   │   ├── Header.astro              ← sticky nav with glassmorphism
│   │   ├── Hero.astro                ← fullscreen with profile photo
│   │   ├── About.astro               ← bio + quick stats
│   │   ├── Experience.astro          ← vertical timeline
│   │   ├── Skills.astro              ← tag grid by category
│   │   ├── Certifications.astro      ← card grid
│   │   ├── Projects.astro            ← featured projects
│   │   ├── Contact.astro             ← contact links
│   │   ├── Footer.astro
│   │   └── ui/
│   │       ├── SectionHeader.astro
│   │       └── Tag.astro
│   ├── layouts/
│   │   └── BaseLayout.astro          ← HTML shell, SEO meta, fonts
│   ├── pages/
│   │   ├── index.astro               ← single page
│   │   └── api/
│   │       └── context.json.ts       ← AI agent endpoint
│   └── styles/
│       └── global.css                ← Tailwind @theme tokens
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

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

## Agent-Ready Architecture

All portfolio content is stored as typed TypeScript objects in `src/data/`. This makes updating the portfolio trivial — and it's the foundation for the AI agent integration planned for Phase 2.

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

### Phase 2 — AI Agent (planned)

The architecture is already prepared. Adding an AI agent only requires:

1. **`src/pages/api/chat.ts`** — SSR endpoint consuming OpenAI / Vercel AI SDK
2. **`src/components/ChatWidget.tsx`** — React island (`client:load`) with chat UI
3. Switch `output: 'static'` → `output: 'hybrid'` in `astro.config.mjs`

The agent will answer questions like:
- *"Where does Ernesto work?"*
- *"What testing frameworks does he use?"*
- *"Does he have experience with CI/CD?"*
- *"What projects has he built?"*

---

## Deploy

This project deploys automatically to Vercel on every push to `main`.

| Setting | Value |
|---------|-------|
| Build Command | `astro build` |
| Output Directory | `dist` |
| Install Command | `npm install` |
| Environment Variables | None required (static build) |

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
