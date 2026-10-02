/**
 * HTTP client for the QA Agents Lab backend (ernesto-agents, EL-PILOT-006).
 *
 * Kept free of DOM code so every status the API can return is covered by
 * unit tests with a fake fetch. The UI only maps results to messages.
 */

export const MAX_MESSAGE_LENGTH = 6000;
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
      fallback: boolean;
      latencyMs: number;
    }
  | {
      status: "error";
      error: AgentRunError;
      detail?: string;
      retryAfterSeconds?: number;
    };

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
  let response: Response;
  try {
    response = await fetchImpl(`${baseUrl}/api/agents/${encodeURIComponent(request.agentId)}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, locale: request.locale, provider: request.provider }),
      signal: timeoutSignal(RUN_TIMEOUT_MS),
    });
  } catch {
    return { status: "error", error: "network" };
  }

  switch (response.status) {
    case 200:
      break;
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

  try {
    const body = await response.json();
    // Never trust the response shape blindly, even from our own backend
    if (typeof body?.response !== "string" || !isLabProvider(body?.provider)) {
      return { status: "error", error: "unexpected", detail: "Malformed response" };
    }
    return {
      status: "ok",
      response: body.response,
      agent: String(body.agent ?? request.agentId),
      provider: body.provider,
      fallback: body.fallback === true,
      latencyMs: Math.max(0, Math.round(now() - started)),
    };
  } catch {
    return { status: "error", error: "unexpected", detail: "Invalid JSON" };
  }
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
