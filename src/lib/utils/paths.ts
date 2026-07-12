import {
  stripAppBase,
  withAppBase,
  type AppLocale,
} from "$lib/i18n/routing";
import { localizeHref, locales } from "$lib/paraglide/runtime";

export type { AppLocale } from "$lib/i18n/routing";

/** Resolve an app path against the configured `paths.base` (e.g. GitHub Pages). */
export function resolvePath(path: string): string {
  return withAppBase(path);
}

/**
 * Localize an internal app path to a locale (defaults to the active one) and
 * resolve it against `paths.base`. Accepts paths that may or may not already
 * include the base prefix.
 */
export function localizedPath(path: string, locale?: AppLocale): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const localized = localizeHref(
    stripAppBase(normalized),
    locale ? { locale } : undefined,
  );
  return withAppBase(localized);
}

/**
 * Strip both `paths.base` and the leading locale segment from a pathname,
 * yielding the canonical, locale-agnostic app path (e.g. `/en/blog` -> `/blog`).
 */
export function deLocalizedAppPath(pathname: string): string {
  const segments = stripAppBase(pathname).split("/");
  if (
    segments.length > 1 &&
    (locales as readonly string[]).includes(segments[1])
  ) {
    segments.splice(1, 1);
  }
  return segments.join("/") || "/";
}
