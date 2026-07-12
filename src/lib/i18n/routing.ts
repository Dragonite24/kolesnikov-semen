import { base } from "$app/paths";
import { locales } from "$lib/paraglide/runtime";

export type AppLocale = (typeof locales)[number];

/** Remove SvelteKit's deployment base from an application pathname. */
export function stripAppBase(pathname: string): string {
  if (base && pathname.startsWith(base)) {
    return pathname.slice(base.length) || "/";
  }
  return pathname;
}

/** Add SvelteKit's deployment base to an application pathname. */
export function withAppBase(pathname: string): string {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${base}${normalized}`;
}

/** Return a URL whose pathname is relative to the deployed application root. */
export function toAppUrl(url: URL): URL {
  const appUrl = new URL(url);
  appUrl.pathname = stripAppBase(appUrl.pathname);
  return appUrl;
}

/** Read a locale prefix from a pathname, regardless of the deployment base. */
export function localeFromPathname(pathname: string): AppLocale | undefined {
  const candidate = stripAppBase(pathname).split("/").filter(Boolean)[0];
  return (locales as readonly string[]).includes(candidate)
    ? (candidate as AppLocale)
    : undefined;
}
