/**
 * Static JSON endpoint: /api/context.json
 *
 * Exposes the agent knowledge base as a static file at build time.
 * The future AI chatbot fetches this to build its system prompt.
 *
 * Usage (future):
 *   const res = await fetch('/api/context.json');
 *   const context = await res.json();
 *   // → inject context.raw into LLM system prompt
 *   // → or use context.structured for RAG/embeddings
 */

import type { APIRoute } from 'astro';
import { generateAgentContext, getAgentContextJSON } from '../../data/agentContext';

export const GET: APIRoute = () => {
  return new Response(
    JSON.stringify({
      generated_at: new Date().toISOString(),
      version: '1.0',
      raw: generateAgentContext(),
      structured: getAgentContextJSON(),
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};
