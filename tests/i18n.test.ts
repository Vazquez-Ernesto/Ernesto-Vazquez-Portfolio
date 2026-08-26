import { describe, expect, it } from 'vitest';
import { experience } from '../src/data/experience';
import { projects } from '../src/data/projects';
import { skills } from '../src/data/skills';
import {
  getExperience,
  getProfile,
  getProjects,
  getSkillGroups,
} from '../src/i18n/content';
import { homePath, otherLocale } from '../src/i18n/locale';
import { ui, type UiStrings } from '../src/i18n/ui';

/** Recursively collects the key paths of an object for parity checks. */
function keyPaths(value: unknown, prefix = ''): string[] {
  if (Array.isArray(value)) return [prefix];
  if (value !== null && typeof value === 'object') {
    return Object.entries(value as Record<string, unknown>).flatMap(([key, child]) =>
      keyPaths(child, prefix ? `${prefix}.${key}` : key),
    );
  }
  return [prefix];
}

describe('i18n routing helpers', () => {
  it('maps locales to home paths', () => {
    expect(homePath('en')).toBe('/');
    expect(homePath('es')).toBe('/es/');
  });

  it('computes the opposite locale', () => {
    expect(otherLocale('en')).toBe('es');
    expect(otherLocale('es')).toBe('en');
  });
});

describe('UI strings parity', () => {
  it('en and es expose the exact same key structure', () => {
    expect(keyPaths(ui.es).sort()).toEqual(keyPaths(ui.en).sort());
  });

  it('no UI string is left empty in either locale', () => {
    const flatten = (strings: UiStrings): string[] => {
      const out: string[] = [];
      const walk = (value: unknown) => {
        if (typeof value === 'string') out.push(value);
        else if (Array.isArray(value)) value.forEach(walk);
        else if (value !== null && typeof value === 'object') Object.values(value).forEach(walk);
      };
      walk(strings);
      return out;
    };

    for (const locale of ['en', 'es'] as const) {
      for (const value of flatten(ui[locale])) {
        expect(value.trim().length).toBeGreaterThan(0);
      }
    }
  });
});

describe('content overlays', () => {
  it('returns canonical data for English', () => {
    expect(getProfile('en').bio).not.toContain('automatización, con foco');
    expect(getExperience('en')).toEqual(experience);
    expect(getProjects('en')).toEqual(projects);
    expect(getSkillGroups('en')).toEqual(skills);
  });

  it('overlays Spanish content without losing structural fields', () => {
    const experienceEs = getExperience('es');
    const projectsEs = getProjects('es');
    const groupsEs = getSkillGroups('es');

    expect(experienceEs).toHaveLength(experience.length);
    expect(experienceEs[0]?.company).toBe(experience[0]?.company);
    expect(experienceEs[0]?.period).toContain('Actualidad');

    expect(projectsEs).toHaveLength(projects.length);
    expect(projectsEs.map((p) => p.id)).toEqual(projects.map((p) => p.id));
    expect(projectsEs.find((p) => p.id === 'portfolio')?.title).toContain('Portfolio');

    expect(groupsEs.map((g) => g.items)).toEqual(skills.map((g) => g.items));
    expect(groupsEs.map((g) => g.category)).not.toEqual(skills.map((g) => g.category));
  });

  it('falls back to canonical data when an overlay entry is missing', () => {
    const projectsEs = getProjects('es');
    for (const project of projectsEs) {
      expect(project.title.length).toBeGreaterThan(0);
      expect(project.technologies.length).toBeGreaterThan(0);
    }
  });
});
