/**
 * Contract for the TraceSkillEvidence capability.
 *
 * Second executable capability of the platform (EL-PILOT-004). It is
 * intentionally separate from the knowledge-explorer types: with two
 * capabilities we can observe what is actually invariant before extracting
 * shared contracts (EAPA P9 — evidence before abstraction).
 */

export type SkillTraceLocale = "en" | "es";

/** H1 = self-declared claim; H2 = backed by a public artifact. */
export type SkillEvidenceMaturity = "H1" | "H2";

export type SkillEvidenceKind = "project" | "experience" | "certification";

export interface SkillEvidenceNode {
  kind: SkillEvidenceKind;
  /** Stable identifier: project id, company name, or certification name. */
  id: string;
  /** Display label, locale-aware. */
  label: string;
  /** One-line explanation of why this node backs the skill. */
  detail: string;
  maturity: SkillEvidenceMaturity;
  /** Internal path or https URL pointing at the artifact. */
  href?: string;
}

export interface SkillTraceQuery {
  skill: string;
  locale?: SkillTraceLocale;
}

export interface SkillTraceResult {
  status: "traced" | "untraced";
  capability: "TraceSkillEvidence";
  /** Canonical skill name from the catalog, or the raw input when unknown. */
  skill: string;
  category?: string;
  locale: SkillTraceLocale;
  evidence: SkillEvidenceNode[];
}
