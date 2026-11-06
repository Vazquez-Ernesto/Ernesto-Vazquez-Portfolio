/**
 * HTTP client for the QA Agents Lab backend (ernesto-agents, EL-PILOT-006).
 *
 * Kept free of DOM code so every status the API can return is covered by
 * unit tests with a fake fetch. The UI only maps results to messages.
 */

// Same value as ChatRequest.MAX_MESSAGE_LENGTH in ernesto-agents: the backend rejects longer
// messages with a 400, so this is the real ceiling, not an UI suggestion. ~25k tokens.
export const MAX_MESSAGE_LENGTH = 100_000;
// Generous on purpose: the free backend host sleeps when idle and needs ~1 minute to wake up
const RUN_TIMEOUT_MS = 90_000;
const HEALTH_TIMEOUT_MS = 75_000;

export type LabLocale = "en" | "es";
/** Same order as the backend fallback chain. */
export const LAB_PROVIDERS = ["GEMINI", "OLLAMA", "OPENROUTER"] as const;
export type LabProvider = (typeof LAB_PROVIDERS)[number];

export interface AgentRunRequest {
  agentId: string;
  message: string;
  locale: LabLocale;
  /** Preferred provider for this request only; the backend falls back to the other one. */
  provider?: LabProvider;
  /**
   * Model id from GET /models. Only meaningful together with an explicit provider: a model
   * belongs to one provider's catalog, so it is dropped when no provider was chosen.
   */
  model?: string;
}

export type AgentRunError =
  | "not-configured"
  | "invalid-input"
  | "unknown-agent"
  | "rate-limited"
  | "unavailable"
  | "network"
  | "unexpected";

export type AgentRunResult =
  | {
      status: "ok";
      response: string;
      agent: string;
      provider: LabProvider;
      /** Model that produced the answer; absent when the backend cannot name it. */
      model?: string;
      fallback: boolean;
      latencyMs: number;
    }
  | {
      status: "error";
      error: AgentRunError;
      detail?: string;
      retryAfterSeconds?: number;
    };

/**
 * What the run is doing right now, not what it produced: the answer still arrives in one piece
 * so the backend keeps its provider fallback. "provider" is the first model asked, "retry" any
 * model asked afterwards (a hedge after 5 s or a fallback after a failure).
 */
export type AgentProgress = { stage: "provider" | "retry"; provider: LabProvider };

export type BackendHealth = "online" | "degraded" | "offline" | "not-configured";

type FetchLike = (input: string, init?: RequestInit) => Promise<Response>;

/**
 * Accepts https URLs, and http only for local development.
 * Returns the URL without trailing slashes, or null when the lab has no backend.
 */
export function normalizeBaseUrl(raw: string | undefined | null): string | null {
  const value = raw?.trim();
  if (!value) return null;
  try {
    const url = new URL(value);
    const isLocal = url.hostname === "localhost" || url.hostname === "127.0.0.1";
    if (url.protocol !== "https:" && !(url.protocol === "http:" && isLocal)) return null;
    return value.replace(/\/+$/, "");
  } catch {
    return null;
  }
}

function timeoutSignal(ms: number): AbortSignal | undefined {
  return typeof AbortSignal !== "undefined" && "timeout" in AbortSignal ? AbortSignal.timeout(ms) : undefined;
}

async function problemDetail(response: Response): Promise<string | undefined> {
  try {
    const body = await response.json();
    return typeof body?.detail === "string" ? body.detail : undefined;
  } catch {
    return undefined;
  }
}

export function isLabProvider(value: unknown): value is LabProvider {
  return (LAB_PROVIDERS as readonly unknown[]).includes(value);
}

/** Same shape the backend sends on both endpoints, so both endpoints parse it the same way. */
type RawAnswer = {
  response?: unknown;
  agent?: unknown;
  provider?: unknown;
  model?: unknown;
  fallback?: unknown;
};

function answerFrom(
  body: RawAnswer | null,
  request: AgentRunRequest,
  started: number,
  now: () => number,
): AgentRunResult {
  const text = body?.response;
  const provider = body?.provider;
  // Never trust the response shape blindly, even from our own backend
  if (typeof text !== "string" || !isLabProvider(provider)) {
    return { status: "error", error: "unexpected", detail: "Malformed response" };
  }
  const rawModel = body?.model;
  const model = typeof rawModel === "string" ? rawModel.trim() : "";
  const answer = {
    status: "ok" as const,
    response: text,
    agent: String(body?.agent ?? request.agentId),
    provider,
    fallback: body?.fallback === true,
    latencyMs: Math.max(0, Math.round(now() - started)),
  };
  // Only present when the backend actually named a model: the UI hides the chip otherwise
  return model ? { ...answer, model } : answer;
}

async function errorForResponse(response: Response): Promise<AgentRunResult> {
  switch (response.status) {
    case 400:
      return { status: "error", error: "invalid-input", detail: await problemDetail(response) };
    case 404:
      return { status: "error", error: "unknown-agent" };
    case 429: {
      const retryAfter = Number.parseInt(response.headers.get("Retry-After") ?? "", 10);
      return {
        status: "error",
        error: "rate-limited",
        retryAfterSeconds: Number.isFinite(retryAfter) ? retryAfter : undefined,
      };
    }
    case 503:
      return { status: "error", error: "unavailable" };
    default:
      return { status: "error", error: "unexpected", detail: `HTTP ${response.status}` };
  }
}

export async function runAgent(
  baseUrl: string | null,
  request: AgentRunRequest,
  fetchImpl: FetchLike = fetch,
  now: () => number = () => Date.now(),
): Promise<AgentRunResult> {
  if (!baseUrl) return { status: "error", error: "not-configured" };

  // Same rules as the backend's @Valid ChatRequest: fail before spending a request
  const message = request.message.trim();
  if (!message || message.length > MAX_MESSAGE_LENGTH) {
    return { status: "error", error: "invalid-input" };
  }

  const started = now();
  const model = request.provider ? request.model?.trim() || undefined : undefined;
  let response: Response;
  try {
    response = await fetchImpl(`${baseUrl}/api/agents/${encodeURIComponent(request.agentId)}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, locale: request.locale, provider: request.provider, model }),
      signal: timeoutSignal(RUN_TIMEOUT_MS),
    });
  } catch {
    return { status: "error", error: "network" };
  }

  if (response.status !== 200) return errorForResponse(response);

  try {
    return answerFrom((await response.json()) as RawAnswer | null, request, started, now);
  } catch {
    return { status: "error", error: "unexpected", detail: "Invalid JSON" };
  }
}

interface SseFrame {
  event: string;
  data: string;
}

/**
 * Splits what has arrived into complete SSE frames and keeps the incomplete tail.
 *
 * A frame is a blank-line-terminated block of "event:" / "data:" lines. The tail matters:
 * a chunk boundary can land in the middle of a JSON payload, and parsing it early would
 * drop a real event.
 */
function parseSseFrames(buffer: string): { frames: SseFrame[]; rest: string } {
  const blocks = buffer.replace(/\r\n/g, "\n").split("\n\n");
  const rest = blocks.pop() ?? "";
  const frames: SseFrame[] = [];
  for (const block of blocks) {
    let event = "message";
    const data: string[] = [];
    for (const line of block.split("\n")) {
      if (line.startsWith("event:")) event = line.slice("event:".length).trim();
      else if (line.startsWith("data:")) data.push(line.slice("data:".length).replace(/^ /, ""));
    }
    // A keep-alive comment or an empty block produces no frame
    if (data.length > 0) frames.push({ event, data: data.join("\n") });
  }
  return { frames, rest };
}

function jsonOrNull(text: string): Record<string, unknown> | null {
  try {
    const value: unknown = JSON.parse(text);
    return value !== null && typeof value === "object" ? (value as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

const STREAM_ERRORS: readonly AgentRunError[] = [
  "invalid-input",
  "unknown-agent",
  "rate-limited",
  "unavailable",
  "network",
  "unexpected",
];

function errorFromStream(body: Record<string, unknown> | null): AgentRunResult {
  // Locals on purpose: the code has to be read twice (check, then cast) and this keeps the
  // narrowing obvious instead of relying on how TS treats `body?.error` in a compound condition.
  const rawError = body?.error;
  const error =
    typeof rawError === "string" && (STREAM_ERRORS as readonly string[]).includes(rawError)
      ? (rawError as AgentRunError)
      : "unexpected";
  const rawDetail = body?.detail;
  const detail = typeof rawDetail === "string" ? rawDetail : undefined;
  return detail ? { status: "error", error, detail } : { status: "error", error };
}

/**
 * Same as {@link runAgent}, plus a callback for each provider the backend asks.
 *
 * Uses fetch with a hand-written SSE reader instead of EventSource: EventSource cannot POST.
 * The progress is cosmetic, so a broken stream never changes the final answer; and a backend
 * deployed before this endpoint existed (404/405/415) falls back to the plain one instead of
 * showing the visitor an error it does not have.
 */
export async function runAgentStreaming(
  baseUrl: string | null,
  request: AgentRunRequest,
  onProgress: (progress: AgentProgress) => void = () => {},
  fetchImpl: FetchLike = fetch,
  now: () => number = () => Date.now(),
): Promise<AgentRunResult> {
  if (!baseUrl) return { status: "error", error: "not-configured" };

  const message = request.message.trim();
  if (!message || message.length > MAX_MESSAGE_LENGTH) {
    return { status: "error", error: "invalid-input" };
  }

  const started = now();
  const model = request.provider ? request.model?.trim() || undefined : undefined;
  let response: Response;
  try {
    response = await fetchImpl(`${baseUrl}/api/agents/${encodeURIComponent(request.agentId)}/chat/stream`, {
      method: "POST",
      // No Accept header on purpose: an unknown agent answers 404 as Problem+JSON, and asking
      // only for text/event-stream would turn that honest 404 into a 406.
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, locale: request.locale, provider: request.provider, model }),
      signal: timeoutSignal(RUN_TIMEOUT_MS),
    });
  } catch {
    return { status: "error", error: "network" };
  }

  // An older backend has no streaming route: use the endpoint it does have
  if (response.status === 404 || response.status === 405 || response.status === 415) {
    return runAgent(baseUrl, request, fetchImpl, now);
  }
  if (response.status !== 200) return errorForResponse(response);
  if (!response.body) return { status: "error", error: "unexpected", detail: "Empty stream" };

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let providers = 0;
  let outcome: AgentRunResult | undefined;

  try {
    while (!outcome) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const parsed = parseSseFrames(buffer);
      buffer = parsed.rest;
      for (const frame of parsed.frames) {
        if (frame.event === "provider") {
          const provider = jsonOrNull(frame.data)?.provider;
          if (isLabProvider(provider)) {
            onProgress({ stage: providers === 0 ? "provider" : "retry", provider });
            providers += 1;
          }
        } else if (frame.event === "done") {
          outcome = answerFrom(jsonOrNull(frame.data) as RawAnswer | null, request, started, now);
        } else if (frame.event === "error") {
          outcome = errorFromStream(jsonOrNull(frame.data));
        }
      }
    }
  } catch {
    // Timeout mid-stream, the host dropped the connection, a body that is not a stream...
    return { status: "error", error: "network" };
  } finally {
    // We already have the answer: stop the request instead of leaving it half-open
    void reader.cancel().catch(() => {});
  }

  return outcome ?? { status: "error", error: "unexpected", detail: "The stream ended before the answer" };
}

export async function checkHealth(baseUrl: string | null, fetchImpl: FetchLike = fetch): Promise<BackendHealth> {
  if (!baseUrl) return "not-configured";
  try {
    const response = await fetchImpl(`${baseUrl}/api/health`, { signal: timeoutSignal(HEALTH_TIMEOUT_MS) });
    if (!response.ok) return "offline";
    const body = await response.json();
    return body?.status === "ok" ? "online" : "degraded";
  } catch {
    return "offline";
  }
}

/**
 * Agent ids the backend serves right now, or null when they cannot be read (then nothing is
 * restricted). Lets the UI grey out an agent whose backend deploy has not finished yet,
 * instead of showing "that agent does not exist" (the frontend deploys in seconds, the backend in minutes).
 */
export async function fetchAvailableAgents(
  baseUrl: string | null,
  fetchImpl: FetchLike = fetch,
): Promise<Set<string> | null> {
  if (!baseUrl) return null;
  try {
    const response = await fetchImpl(`${baseUrl}/api/agents`, { signal: timeoutSignal(HEALTH_TIMEOUT_MS) });
    if (!response.ok) return null;
    const body: unknown = await response.json();
    if (!Array.isArray(body)) return null;
    return new Set(
      body
        .map((agent) => (agent as { id?: unknown } | null)?.id)
        .filter((id): id is string => typeof id === "string"),
    );
  } catch {
    return null;
  }
}

export interface LabModelOption {
  id: string;
  name: string;
}

/** Only providers that can serve a model right now appear here. */
export type LabModelCatalog = Partial<Record<LabProvider, LabModelOption[]>>;

/**
 * Models each provider can serve (GET /models), or null when the catalog cannot be read.
 * A null catalog is not an error: the UI then hides the model picker and sends no override,
 * which is exactly what the backend does by default.
 */
export async function fetchModelCatalog(
  baseUrl: string | null,
  fetchImpl: FetchLike = fetch,
): Promise<LabModelCatalog | null> {
  if (!baseUrl) return null;
  try {
    const response = await fetchImpl(`${baseUrl}/api/models`, { signal: timeoutSignal(HEALTH_TIMEOUT_MS) });
    if (!response.ok) return null;
    const body: unknown = await response.json();
    const models = (body as { models?: unknown } | null)?.models;
    if (!models || typeof models !== "object") return null;
    const catalog: LabModelCatalog = {};
    for (const provider of LAB_PROVIDERS) {
      const list = (models as Record<string, unknown>)[provider];
      if (!Array.isArray(list)) continue;
      const options = list
        .map((item) => item as { id?: unknown; name?: unknown } | null)
        .filter((item): item is { id: string; name?: unknown } => typeof item?.id === "string")
        .map((item) => ({ id: item.id, name: typeof item.name === "string" ? item.name : item.id }));
      if (options.length > 0) catalog[provider] = options;
    }
    return catalog;
  } catch {
    return null;
  }
}

export interface WakeOptions {
  /** Health checks to try before giving up (default 24, ~2-3 minutes with the default delay). */
  attempts?: number;
  delayMs?: number;
  sleep?: (ms: number) => Promise<void>;
  /** Called before each retry, so the UI can say the backend is waking up. */
  onRetry?: (attempt: number) => void;
}

/**
 * Retries the health check while the backend looks offline. A sleeping free-tier host
 * answers the first requests with a proxy error (e.g. Cloudflare 522, without CORS
 * headers) and only becomes reachable once the app has started.
 */
export async function waitForBackend(
  baseUrl: string | null,
  fetchImpl: FetchLike = fetch,
  { attempts = 24, delayMs = 5_000, sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)), onRetry }: WakeOptions = {},
): Promise<BackendHealth> {
  for (let attempt = 1; ; attempt++) {
    const state = await checkHealth(baseUrl, fetchImpl);
    if (state !== "offline" || attempt >= attempts) return state;
    onRetry?.(attempt);
    await sleep(delayMs);
  }
}
