import { base } from "$app/paths";
import { localizeHref, locales } from "$lib/paraglide/runtime";

export type AppLocale = (typeof locales)[number];

/** Remove the configured `paths.base` prefix from a pathname, if present. */
function stripBase(pathname: string): string {
  if (base && pathname.startsWith(base)) {
    return pathname.slice(base.length) || "/";
  }
  return pathname;
}

/** Resolve an app path against the configured `paths.base` (e.g. GitHub Pages). */
export function resolvePath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

/**
 * Localize an internal app path to a locale (defaults to the active one) and
 * resolve it against `paths.base`. Accepts paths that may or may not already
 * include the base prefix.
 */
export function localizedPath(path: string, locale?: AppLocale): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const localized = localizeHref(
    stripBase(normalized),
    locale ? { locale } : undefined,
  );
  return `${base}${localized}`;
}

/**
 * Strip both `paths.base` and the leading locale segment from a pathname,
 * yielding the canonical, locale-agnostic app path (e.g. `/en/blog` -> `/blog`).
 */
export function deLocalizedAppPath(pathname: string): string {
  const segments = stripBase(pathname).split("/");
  if (
    segments.length > 1 &&
    (locales as readonly string[]).includes(segments[1])
  ) {
    segments.splice(1, 1);
  }
  return segments.join("/") || "/";
}
