/**
 * Experimental context projection for future AI evaluation.
 *
 * This legacy module aggregates part of the portfolio catalog. It is not the
 * canonical knowledge model used by product capabilities.
 *
 * Future usage:
 *   import { generateAgentContext } from './agentContext';
 *   const systemPrompt = generateAgentContext();
 *   // → feed to OpenAI, Azure AI, Gemini, etc.
 *
 * API route (future): src/pages/api/chat.ts
 *   POST /api/chat { message: string } → { reply: string }
 */

import { profile } from './profile';
import { experience } from './experience';
import { skills } from './skills';
import { certifications } from './certifications';

/**
 * Generates a structured plain-text context string for LLM system prompts.
 * Optimized for token efficiency and clear information retrieval.
 */
export function generateAgentContext(): string {
  const currentJob = experience.find((e) => e.current);

  return `# Ernesto Vázquez — Professional Profile

## Identity
Name: ${profile.name}
Title: ${profile.title}
Location: ${profile.location}
Availability: ${profile.availability}

## Summary
${profile.bio}

## Current Position
${currentJob ? `${currentJob.role} at ${currentJob.company} (${currentJob.period})\n${currentJob.description}` : 'Not specified'}

## Work Experience
${experience
  .map(
    (e) => `
### ${e.company} — ${e.role}
Period: ${e.period} | ${e.contractType}
${e.description}
Key responsibilities:
${e.responsibilities.map((r) => `  - ${r}`).join('\n')}
Technologies: ${e.technologies.join(', ')}
`
  )
  .join('')}

## Technical Skills
${skills.map((g) => `${g.category}: ${g.items.join(', ')}`).join('\n')}

## Certifications
${certifications.map((c) => `- ${c.name} (${c.issuer})`).join('\n')}

## Contact
Email: ${profile.email}
Phone: ${profile.phone}
LinkedIn: ${profile.socials.find((s) => s.platform === 'LinkedIn')?.url}
GitHub: ${profile.socials.find((s) => s.platform === 'GitHub')?.url}
Company: ${profile.socials.find((s) => s.platform === 'QAdvanced')?.url}

## Instructions for AI Agent
- Respond in the same language the user writes in (English or Spanish)
- Be professional but approachable
- For job opportunities: direct to ${profile.email}
- If unsure about something not in this context, say so honestly
- Ernesto is based in Buenos Aires (UTC-3)
- He is fluent in Spanish (native) and English (professional)
`;
}

/**
 * Returns context as a structured JSON object.
 * Useful for vector embeddings, RAG pipelines, or structured retrieval.
 */
export function getAgentContextJSON() {
  return {
    profile: {
      name: profile.name,
      title: profile.title,
      location: profile.location,
      email: profile.email,
      phone: profile.phone,
      bio: profile.bio,
      availability: profile.availability,
    },
    experience: experience.map((e) => ({
      company: e.company,
      role: e.role,
      contractType: e.contractType,
      location: e.location,
      period: e.period,
      // ISO months let the agents backend compute years of experience deterministically
      startDate: e.startDate,
      endDate: e.endDate,
      current: e.current,
      description: e.description,
      technologies: e.technologies,
    })),
    skills: skills.map((g) => ({
      category: g.category,
      items: g.items,
    })),
    certifications: certifications.map((c) => c.name),
    contact: {
      email: profile.email,
      phone: profile.phone,
      socials: profile.socials,
    },
  };
}
