export function isSafeReferenceHref(href: string) {
  if (/^\/(?!\/)/.test(href)) return true;

  try {
    return new URL(href).protocol === "https:";
  } catch {
    return false;
  }
}
