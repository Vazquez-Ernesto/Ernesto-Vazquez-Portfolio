import { publicKnowledge } from '../../data/publicKnowledge';
import type {
  KnowledgeAnswer,
  KnowledgeLocale,
  KnowledgeQuery,
  KnowledgeRecord,
  KnowledgeReference,
} from './types';
import { isSafeReferenceHref } from './referenceSafety';

const stopWords = new Set([
  "a", "an", "and", "are", "does", "is", "of", "the", "to", "what", "which",
  "como", "cual", "de", "el", "en", "es", "la", "las", "los", "por", "que",
]);

const EXACT_PHRASE_PRIORITY = 200;
const COMPLETE_TOKEN_PRIORITY = 100;
const MIN_PATTERN_TOKENS = 2;

interface PatternMatch {
  score: number;
  confidence: "high" | "medium" | "insufficient";
}

const noMatch: PatternMatch = { score: 0, confidence: "insufficient" };

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(value: string) {
  return normalizeText(value)
    .split(" ")
    .filter((token) => token.length > 1 && !stopWords.has(token));
}

function scorePattern(question: string, questionTokens: string[], pattern: string) {
  const normalizedPattern = normalizeText(pattern);
  const patternTokens = tokenize(pattern);
  const phraseMatches = ` ${question} `.includes(` ${normalizedPattern} `);
  if (phraseMatches) {
    return { score: EXACT_PHRASE_PRIORITY + patternTokens.length, confidence: "high" } satisfies PatternMatch;
  }
  if (patternTokens.length < MIN_PATTERN_TOKENS) return noMatch;

  const matches = patternTokens.filter((token) => questionTokens.includes(token)).length;
  if (matches === patternTokens.length) {
    return { score: COMPLETE_TOKEN_PRIORITY + matches, confidence: "medium" } satisfies PatternMatch;
  }
  return noMatch;
}

function scoreRecord(question: string, questionTokens: string[], record: KnowledgeRecord) {
  return record.patterns
    .map((pattern) => scorePattern(question, questionTokens, pattern))
    .sort((left, right) => right.score - left.score)[0] ?? noMatch;
}

function detectLocale(question: string): KnowledgeLocale {
  const normalized = normalizeText(question);
  const spanishSignals = ["como", "cual", "donde", "evidencia", "por que", "proyectos", "trabaja"];
  return spanishSignals.some((signal) => normalized.includes(signal)) ? "es" : "en";
}

function uniqueReferences(evidence: KnowledgeRecord["evidence"]) {
  const references = new Map<string, KnowledgeReference>();
  evidence.forEach((item) => references.set(item.source.href, item.source));
  return [...references.values()];
}

function insufficientAnswer(question: string, locale: KnowledgeLocale): KnowledgeAnswer {
  const answer = locale === "es"
    ? "No encuentro evidencia pública suficiente para responder con confianza. Probá con experiencia, proyectos, testing, EAPA o la decisión agent-ready."
    : "I do not have enough public evidence to answer confidently. Try asking about experience, projects, testing, EAPA, or the agent-ready decision.";

  return {
    status: "insufficient",
    capability: "QueryPortfolioKnowledge",
    question,
    locale,
    answer,
    confidence: "insufficient",
    evidence: [],
    references: [],
  };
}

export function queryPortfolioKnowledge(query: KnowledgeQuery): KnowledgeAnswer {
  const question = normalizeText(query.question);
  const locale = query.locale ?? detectLocale(query.question);
  if (!question) return insufficientAnswer(query.question, locale);

  const questionTokens = tokenize(question);
  const ranked = publicKnowledge
    .filter((record) => record.locale === locale)
    .map((record) => ({ record, match: scoreRecord(question, questionTokens, record) }))
    .sort((left, right) => right.match.score - left.match.score);
  const [best, second] = ranked;

  if (!best || best.match.score === 0 || (second !== undefined && best.match.score === second.match.score)) {
    return insufficientAnswer(query.question, locale);
  }

  const evidence = best.record.evidence.filter((item) => isSafeReferenceHref(item.source.href));
  if (evidence.length === 0) return insufficientAnswer(query.question, locale);

  return {
    status: "answered",
    capability: "QueryPortfolioKnowledge",
    question: query.question,
    locale,
    answer: best.record.answer,
    confidence: best.match.confidence,
    evidence,
    references: uniqueReferences(evidence),
    matchedRecordId: best.record.id,
  };
}
