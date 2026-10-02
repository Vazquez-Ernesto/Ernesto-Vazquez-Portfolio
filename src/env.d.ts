/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  /** Base URL of the ernesto-agents backend. Unset = the QA Agents Lab shows the catalog without live runs. */
  readonly PUBLIC_AGENTS_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
