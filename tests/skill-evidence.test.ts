import { describe, expect, it } from 'vitest';
import { skills } from '../src/data/skills';
import { traceSkillEvidence } from '../src/features/skill-evidence/traceSkillEvidence';
import { isSafeReferenceHref } from '../src/features/knowledge-explorer/referenceSafety';

describe('TraceSkillEvidence', () => {
  it('traces Playwright to public projects and a certification', () => {
    const result = traceSkillEvidence({ skill: 'Playwright' });

    expect(result.status).toBe('traced');
    expect(result.capability).toBe('TraceSkillEvidence');
    expect(result.category).toBe('Test Automation');
    expect(result.evidence.some((node) => node.kind === 'project' && node.maturity === 'H2')).toBe(true);
    expect(result.evidence.some((node) => node.kind === 'certification' && node.maturity === 'H1')).toBe(true);
  });

  it('matches skills case-insensitively', () => {
    const result = traceSkillEvidence({ skill: '  playwright ' });

    expect(result.status).toBe('traced');
    expect(result.skill).toBe('Playwright');
  });

  it('returns untraced for a catalog skill without curated evidence', () => {
    const result = traceSkillEvidence({ skill: 'Docker' });

    expect(result.status).toBe('untraced');
    expect(result.skill).toBe('Docker');
    expect(result.category).toBe('Infrastructure & DevOps');
    expect(result.evidence).toEqual([]);
  });

  it('returns untraced for an unknown skill without a category', () => {
    const result = traceSkillEvidence({ skill: 'Quantum Testing' });

    expect(result.status).toBe('untraced');
    expect(result.skill).toBe('Quantum Testing');
    expect(result.category).toBeUndefined();
    expect(result.evidence).toEqual([]);
  });

  it('answers in Spanish with translated category and details', () => {
    const result = traceSkillEvidence({ skill: 'Playwright', locale: 'es' });

    expect(result.status).toBe('traced');
    expect(result.locale).toBe('es');
    expect(result.category).toBe('Automatización de Pruebas');
    expect(result.evidence[0]?.detail).toMatch(/[áéíóúñ]|públic/i);
  });

  it('never fabricates evidence: every catalog skill resolves to traced or untraced', () => {
    for (const group of skills) {
      for (const item of group.items) {
        const result = traceSkillEvidence({ skill: item });
        expect(['traced', 'untraced']).toContain(result.status);
        if (result.status === 'untraced') expect(result.evidence).toEqual([]);
      }
    }
  });

  it('keeps every evidence href on an allowed URL scheme or internal anchor', () => {
    for (const group of skills) {
      for (const item of group.items) {
        const result = traceSkillEvidence({ skill: item });
        for (const node of result.evidence) {
          if (node.href === undefined) continue;
          expect(node.href.startsWith('#') || isSafeReferenceHref(node.href)).toBe(true);
        }
      }
    }
  });
});
