export type KnowledgeLocale = "en" | "es";
export type EvidenceMaturity = "H1" | "H2";
export type MatchConfidence = "high" | "medium" | "insufficient";

export interface KnowledgeReference {
  label: string;
  href: string;
}

export interface KnowledgeEvidence {
  statement: string;
  maturity: EvidenceMaturity;
  source: KnowledgeReference;
}

export interface KnowledgeRecord {
  id: string;
  locale: KnowledgeLocale;
  title: string;
  answer: string;
  patterns: string[];
  evidence: KnowledgeEvidence[];
}

export interface KnowledgeQuery {
  question: string;
  locale?: KnowledgeLocale;
}

export interface KnowledgeAnswer {
  status: "answered" | "insufficient";
  capability: "QueryPortfolioKnowledge";
  question: string;
  locale: KnowledgeLocale;
  answer: string;
  confidence: MatchConfidence;
  evidence: KnowledgeEvidence[];
  references: KnowledgeReference[];
  matchedRecordId?: string;
}
