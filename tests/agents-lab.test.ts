import { describe, expect, it } from 'vitest';
import { QA_AGENT_IDS, getQaAgents, qaAgentCatalog } from '../src/data/qaAgents';
import {
  MAX_MESSAGE_LENGTH,
  checkHealth,
  normalizeBaseUrl,
  runAgent,
} from '../src/features/agents-lab/agentsClient';
import { isSafeReferenceHref } from '../src/features/knowledge-explorer/referenceSafety';

const BASE = 'https://agents.example.com';

/** Fake fetch that records the request and answers with a fixed response. */
function fakeFetch(status: number, body: unknown, headers: Record<string, string> = {}) {
  const calls: { url: string; init?: RequestInit }[] = [];
  const impl = async (url: string, init?: RequestInit) => {
    calls.push({ url, init });
    const payload = typeof body === 'string' ? body : JSON.stringify(body);
    return new Response(payload, { status, headers });
  };
  return { impl, calls };
}

const request = { agentId: 'bug-report-analyst', message: 'Login fails', locale: 'en' as const };

describe('QA Agents Lab catalog', () => {
  it('has 10 agents in the same order as the backend', () => {
    // Same list as LAB_AGENT_IDS in ernesto-agents SkillLoaderTest
    expect(qaAgentCatalog.map((agent) => agent.id)).toEqual([...QA_AGENT_IDS]);
    expect(QA_AGENT_IDS).toHaveLength(10);
  });

  it('has nine QA agents and one development agent', () => {
    expect(qaAgentCatalog.filter((agent) => agent.category === 'qa')).toHaveLength(9);
    expect(qaAgentCatalog.filter((agent) => agent.category === 'dev').map((agent) => agent.id)).toEqual([
      'code-review-dev',
    ]);
  });

  it('fills every text in both languages', () => {
    for (const locale of ['en', 'es'] as const) {
      for (const agent of getQaAgents(locale)) {
        expect(agent.name.trim(), `${agent.id} name`).not.toBe('');
        expect(agent.summary.trim(), `${agent.id} summary`).not.toBe('');
        expect(agent.example.trim(), `${agent.id} example`).not.toBe('');
        expect(agent.example.length).toBeLessThanOrEqual(MAX_MESSAGE_LENGTH);
        expect(agent.techniques.length).toBeGreaterThan(0);
      }
    }
  });

  it('backs every agent with safe evidence links', () => {
    for (const agent of qaAgentCatalog) {
      expect(agent.evidence.length, agent.id).toBeGreaterThan(0);
      for (const item of agent.evidence) {
        expect(isSafeReferenceHref(item.href) || item.href.startsWith('#'), item.href).toBe(true);
        // H2 means a public artifact: it must be an external https link, not a page anchor
        if (item.maturity === 'H2') expect(item.href).toMatch(/^https:\/\/github\.com\/Vazquez-Ernesto\//);
        if (item.maturity === 'H1') expect(item.href.startsWith('#')).toBe(true);
      }
    }
  });
});

describe('normalizeBaseUrl', () => {
  it.each([
    [undefined, null],
    ['', null],
    ['   ', null],
    ['not a url', null],
    ['http://agents.example.com', null],
    ['javascript:alert(1)', null],
    ['https://agents.example.com/', 'https://agents.example.com'],
    ['http://localhost:8081', 'http://localhost:8081'],
    ['http://127.0.0.1:8081//', 'http://127.0.0.1:8081'],
  ])('%s → %s', (input, expected) => {
    expect(normalizeBaseUrl(input)).toBe(expected);
  });
});

describe('runAgent', () => {
  it('posts to the agent endpoint and returns the answer', async () => {
    const { impl, calls } = fakeFetch(200, {
      response: '**Title**: [Login] ...',
      agent: 'bug-report-analyst',
      provider: 'OPENROUTER',
      fallback: true,
    });
    let clock = 1_000;
    const now = () => (clock += 1_500);

    const result = await runAgent(BASE, { ...request, provider: 'GEMINI' }, impl, now);

    expect(result).toEqual({
      status: 'ok',
      response: '**Title**: [Login] ...',
      agent: 'bug-report-analyst',
      provider: 'OPENROUTER',
      fallback: true,
      latencyMs: 1_500,
    });
    expect(calls[0]?.url).toBe(`${BASE}/api/agents/bug-report-analyst/chat`);
    expect(calls[0]?.init?.method).toBe('POST');
    expect(JSON.parse(String(calls[0]?.init?.body))).toEqual({
      message: 'Login fails',
      locale: 'en',
      provider: 'GEMINI',
    });
  });

  it('encodes the agent id in the URL', async () => {
    const { impl, calls } = fakeFetch(404, {});
    await runAgent(BASE, { ...request, agentId: '../health' }, impl);
    expect(calls[0]?.url).toBe(`${BASE}/api/agents/..%2Fhealth/chat`);
  });

  it('does not call the backend when it is not configured', async () => {
    const { impl, calls } = fakeFetch(200, {});
    expect(await runAgent(null, request, impl)).toEqual({ status: 'error', error: 'not-configured' });
    expect(calls).toHaveLength(0);
  });

  it.each([
    ['blank', '   '],
    ['too long', 'a'.repeat(MAX_MESSAGE_LENGTH + 1)],
  ])('rejects %s input without calling the backend', async (_, message) => {
    const { impl, calls } = fakeFetch(200, {});
    expect(await runAgent(BASE, { ...request, message }, impl)).toEqual({ status: 'error', error: 'invalid-input' });
    expect(calls).toHaveLength(0);
  });

  it('maps 400 to invalid-input with the problem detail', async () => {
    const { impl } = fakeFetch(400, { detail: 'Invalid request content.' });
    expect(await runAgent(BASE, request, impl)).toEqual({
      status: 'error',
      error: 'invalid-input',
      detail: 'Invalid request content.',
    });
  });

  it('maps 429 to rate-limited with Retry-After', async () => {
    const { impl } = fakeFetch(429, {}, { 'Retry-After': '42' });
    expect(await runAgent(BASE, request, impl)).toEqual({
      status: 'error',
      error: 'rate-limited',
      retryAfterSeconds: 42,
    });
  });

  it.each([
    [404, 'unknown-agent'],
    [503, 'unavailable'],
    [500, 'unexpected'],
  ])('maps HTTP %i to %s', async (status, error) => {
    const { impl } = fakeFetch(status, {});
    expect(await runAgent(BASE, request, impl)).toMatchObject({ status: 'error', error });
  });

  it('maps a thrown fetch (network down, CORS, timeout) to network', async () => {
    const failing = async () => {
      throw new TypeError('Failed to fetch');
    };
    expect(await runAgent(BASE, request, failing)).toEqual({ status: 'error', error: 'network' });
  });

  it.each([
    ['invalid JSON', 'not json'],
    ['missing response', { provider: 'GEMINI' }],
    ['unknown provider', { response: 'ok', provider: 'OTHER' }],
  ])('rejects a malformed 200 body (%s)', async (_, body) => {
    const { impl } = fakeFetch(200, body);
    expect(await runAgent(BASE, request, impl)).toMatchObject({ status: 'error', error: 'unexpected' });
  });
});

describe('checkHealth', () => {
  it.each([
    [200, { status: 'ok' }, 'online'],
    [200, { status: 'degraded' }, 'degraded'],
    [500, {}, 'offline'],
  ])('HTTP %i %j → %s', async (status, body, expected) => {
    const { impl, calls } = fakeFetch(status, body);
    expect(await checkHealth(BASE, impl)).toBe(expected);
    expect(calls[0]?.url).toBe(`${BASE}/api/health`);
  });

  it('reports offline when the request fails and not-configured without URL', async () => {
    expect(await checkHealth(BASE, async () => Promise.reject(new Error('down')))).toBe('offline');
    expect(await checkHealth(null)).toBe('not-configured');
  });
});
