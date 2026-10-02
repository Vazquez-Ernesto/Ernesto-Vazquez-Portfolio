// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { renderMarkdown } from '../src/features/agents-lab/renderMarkdown';

/** Parses the output so assertions check real elements, not string fragments. */
function render(markdown: string) {
  const container = document.createElement('div');
  container.innerHTML = renderMarkdown(markdown);
  return container;
}

describe('renderMarkdown', () => {
  it('formats the Markdown agents produce', () => {
    const html = render([
      '## Test cases',
      '',
      '**Priority**: High, *risk-based*',
      '',
      '| ID | Expected |',
      '|----|----------|',
      '| TC-01 | `400 Bad Request` |',
      '',
      '- one',
      '- two',
      '',
      '```java',
      'assertThat(x).isTrue();',
      '```',
    ].join('\n'));

    expect(html.querySelector('h2')?.textContent).toBe('Test cases');
    expect(html.querySelector('strong')?.textContent).toBe('Priority');
    expect(html.querySelectorAll('table tbody tr')).toHaveLength(1);
    expect(html.querySelector('td code')?.textContent).toBe('400 Bad Request');
    expect(html.querySelectorAll('ul li')).toHaveLength(2);
    expect(html.querySelector('pre code')?.textContent).toContain('assertThat(x).isTrue();');
  });

  it('shows raw HTML as text instead of executing it', () => {
    const html = render('Bug: <img src=x onerror="alert(1)"> and <script>alert(2)</script>');

    expect(html.querySelector('img')).toBeNull();
    expect(html.querySelector('script')).toBeNull();
    expect(html.textContent).toContain('<img src=x onerror="alert(1)">');
    expect(html.innerHTML).not.toMatch(/<img|<script/i);
  });

  it('drops dangerous links but keeps safe ones, opening them in a new tab', () => {
    const html = render('[evil](javascript:alert(1)) [repo](https://github.com/Vazquez-Ernesto)');
    const links = [...html.querySelectorAll('a')];

    expect(links.some((link) => link.getAttribute('href')?.startsWith('javascript'))).toBe(false);
    const safe = links.find((link) => link.textContent === 'repo');
    expect(safe?.getAttribute('href')).toBe('https://github.com/Vazquez-Ernesto');
    expect(safe?.getAttribute('target')).toBe('_blank');
    expect(safe?.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('removes attributes that could carry styles or handlers', () => {
    const html = render('[x](https://example.com "t")');
    const link = html.querySelector('a');

    expect(link?.getAttribute('title')).toBe('t');
    expect(link?.getAttributeNames().sort()).toEqual(['href', 'rel', 'target', 'title']);
  });
});
