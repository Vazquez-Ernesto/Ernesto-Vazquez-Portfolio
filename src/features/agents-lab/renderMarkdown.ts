import DOMPurify from 'dompurify';
import { Marked } from 'marked';

/**
 * Renders an agent answer (Markdown written by an LLM) as safe HTML.
 *
 * LLM output is untrusted: a visitor can ask an agent to echo HTML or a link. Two layers:
 * 1. Raw HTML inside the Markdown is escaped, so `<img onerror=…>` shows up as text
 *    (a QA agent often needs to *show* HTML, e.g. when reviewing an XSS bug).
 * 2. DOMPurify keeps only formatting tags and http(s)/mailto links.
 */

const ALLOWED_TAGS = [
  'p', 'br', 'strong', 'em', 'del', 'code', 'pre', 'blockquote', 'hr',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li',
  'table', 'thead', 'tbody', 'tr', 'th', 'td', 'a',
];

const escapeHtml = (text: string) =>
  text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const markdown = new Marked({
  gfm: true,
  renderer: {
    // Raw HTML blocks and inline tags become visible text instead of markup
    html: ({ text }) => escapeHtml(text),
  },
});

let hooksInstalled = false;

function installLinkHook() {
  if (hooksInstalled) return;
  // External links open in a new tab without giving the new page access to this one
  DOMPurify.addHook('afterSanitizeAttributes', (node) => {
    if (node.tagName === 'A' && node.getAttribute('href')?.startsWith('http')) {
      node.setAttribute('target', '_blank');
      node.setAttribute('rel', 'noopener noreferrer');
    }
  });
  hooksInstalled = true;
}

export function renderMarkdown(source: string): string {
  installLinkHook();
  const html = markdown.parse(source, { async: false }) as string;
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR: ['href', 'title', 'align', 'target', 'rel'],
    ALLOWED_URI_REGEXP: /^(?:https?:|mailto:|#)/i,
  });
}
