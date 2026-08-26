export type Locale = "en" | "es";

export const defaultLocale: Locale = "en";

export function isLocale(value: unknown): value is Locale {
  return value === "en" || value === "es";
}

export function otherLocale(locale: Locale): Locale {
  return locale === "es" ? "en" : "es";
}

export function homePath(locale: Locale): string {
  return locale === "es" ? "/es/" : "/";
}
