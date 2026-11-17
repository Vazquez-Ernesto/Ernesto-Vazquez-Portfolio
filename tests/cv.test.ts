import { describe, expect, it } from 'vitest';
import { projects } from '../src/data/projects';
import { skills } from '../src/data/skills';
import {
  cvAreas,
  getCvExtras,
  getCvProjects,
  getCvSkillGroups,
  matchesArea,
} from '../src/data/cv';

describe('CV data', () => {
  it('only lists projects that exist in the public catalog', () => {
    const ids = new Set(projects.map((project) => project.id));
    for (const project of getCvProjects('en')) {
      expect(ids).toContain(project.id);
    }
  });

  it('tags every CV project and skill group with at least one known area', () => {
    const known = new Set(cvAreas);
    const tagged = [...getCvProjects('en'), ...getCvSkillGroups('en')];
    for (const item of tagged) {
      expect(item.areas.length).toBeGreaterThan(0);
      item.areas.forEach((area) => expect(known).toContain(area));
    }
  });

  it('covers every skill group of the catalog', () => {
    expect(getCvSkillGroups('en').map((group) => group.items)).toEqual(skills.map((group) => group.items));
  });

  it('filters by area and keeps everything for "all"', () => {
    const cvProjects = getCvProjects('en');
    const ai = cvProjects.filter((project) => matchesArea(project.areas, 'ai'));

    expect(ai.map((project) => project.id)).toContain('qa-agents-lab');
    expect(ai.map((project) => project.id)).not.toContain('cypress-orangehrm');
    expect(cvProjects.filter((project) => matchesArea(project.areas, 'all'))).toHaveLength(cvProjects.length);
  });

  it('localizes projects without changing their order', () => {
    expect(getCvProjects('es').map((project) => project.id)).toEqual(getCvProjects('en').map((project) => project.id));
    expect(getCvSkillGroups('es')[0]?.category).toBe('Automatización de Pruebas');
  });

  it('keeps education, languages and AI practices in parity across locales', () => {
    const en = getCvExtras('en');
    const es = getCvExtras('es');

    expect(es.education).toHaveLength(en.education.length);
    expect(es.languages).toHaveLength(en.languages.length);
    expect(es.practices).toHaveLength(en.practices.length);
    expect(en.languages.join(' ')).toContain('A1/A2');
  });
});
