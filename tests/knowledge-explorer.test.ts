import { describe, expect, it } from 'vitest';
import { publicKnowledge } from '../src/data/publicKnowledge';
import { queryPortfolioKnowledge } from '../src/features/knowledge-explorer/queryPortfolioKnowledge';
import { isSafeReferenceHref } from '../src/features/knowledge-explorer/referenceSafety';

describe('QueryPortfolioKnowledge', () => {
  it('answers the current role with self-reported evidence', () => {
    const result = queryPortfolioKnowledge({ question: 'Where does Ernesto work?' });

    expect(result.status).toBe('answered');
    expect(result.matchedRecordId).toBe('current-role-en');
    expect(result.answer).toContain('CFOTech IT Global Services');
    expect(result.evidence[0]?.maturity).toBe('H1');
  });

  it('detects Spanish and answers in the same language', () => {
    const result = queryPortfolioKnowledge({ question: '¿Dónde trabaja Ernesto actualmente?' });

    expect(result.status).toBe('answered');
    expect(result.locale).toBe('es');
    expect(result.matchedRecordId).toBe('current-role-es');
  });

  it('finds projects that explicitly use Playwright', () => {
    const result = queryPortfolioKnowledge({ question: 'Which projects use Playwright?' });

    expect(result.status).toBe('answered');
    expect(result.matchedRecordId).toBe('playwright-projects-en');
    expect(result.answer).toContain('Playwright Animation Character Hub');
    expect(result.evidence[0]?.maturity).toBe('H2');
  });

  it('explains the agent-ready decision from the case study', () => {
    const result = queryPortfolioKnowledge({ question: 'Why did you remove the agent-ready claim?' });

    expect(result.status).toBe('answered');
    expect(result.matchedRecordId).toBe('agent-ready-decision-en');
    expect(result.confidence).toBe('high');
    expect(result.references[0]?.href).toContain('/case-studies/');
  });

  it('returns evidence with mixed maturity honestly', () => {
    const result = queryPortfolioKnowledge({ question: 'What evidence supports the decision?' });

    expect(result.status).toBe('answered');
    expect(result.matchedRecordId).toBe('architecture-evidence-en');
    expect(result.evidence.map((item) => item.maturity)).toContain('H1');
    expect(result.evidence.map((item) => item.maturity)).toContain('H2');
  });

  it('explains EAPA without presenting it as stable architecture', () => {
    const result = queryPortfolioKnowledge({ question: 'What is EAPA?' });

    expect(result.status).toBe('answered');
    expect(result.matchedRecordId).toBe('eapa-purpose-en');
    expect(result.answer).toContain('working methodology');
    expect(result.evidence[0]?.maturity).toBe('H1');
  });

  it('refuses an undocumented Astro versus Next comparison', () => {
    const result = queryPortfolioKnowledge({ question: 'Why did you choose Astro instead of Next.js?' });

    expect(result.status).toBe('insufficient');
    expect(result.confidence).toBe('insufficient');
    expect(result.evidence).toEqual([]);
  });

  it('refuses empty or unrelated questions', () => {
    expect(queryPortfolioKnowledge({ question: '' }).status).toBe('insufficient');
    expect(queryPortfolioKnowledge({ question: 'What is the weather today?' }).status).toBe('insufficient');
  });

  it('accepts all meaningful tokens in a different order with medium match confidence', () => {
    const result = queryPortfolioKnowledge({ question: 'role current' });

    expect(result.status).toBe('answered');
    expect(result.matchedRecordId).toBe('current-role-en');
    expect(result.confidence).toBe('medium');
  });

  it('refuses tied records instead of selecting one arbitrarily', () => {
    const result = queryPortfolioKnowledge({ question: 'current role testing frameworks' });

    expect(result.status).toBe('insufficient');
    expect(result.matchedRecordId).toBeUndefined();
  });

  it('refuses partial and accidental token matches', () => {
    expect(queryPortfolioKnowledge({ question: 'projects' }).status).toBe('insufficient');
    expect(queryPortfolioKnowledge({ question: 'current weather roleplay' }).status).toBe('insufficient');
  });

  it('allows only internal paths and HTTPS references', () => {
    expect(isSafeReferenceHref('/case-studies/example/')).toBe(true);
    expect(isSafeReferenceHref('https://github.com/example')).toBe(true);
    expect(isSafeReferenceHref('//evil.example')).toBe(false);
    expect(isSafeReferenceHref('http://insecure.example')).toBe(false);
    expect(isSafeReferenceHref('javascript:alert(1)')).toBe(false);
  });

  it('keeps every curated knowledge reference on an allowed URL scheme', () => {
    const references = publicKnowledge.flatMap((record) => record.evidence.map((item) => item.source.href));

    expect(references.length).toBeGreaterThan(0);
    expect(references.every(isSafeReferenceHref)).toBe(true);
  });
});
