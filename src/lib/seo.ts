import { site } from "$lib/config/site";
import {
  baseLocale,
  getLocale,
  locales,
  localizeHref,
  type Locale,
} from "$lib/paraglide/runtime";

export interface SeoProps {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  noindex?: boolean;
}

export interface HreflangAlternate {
  locale: Locale;
  href: string;
}

/** Map an app locale to an Open Graph `og:locale` value. */
const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  ru: "ru_RU",
};

/**
 * Build an absolute URL. `site.url` already contains the deployment base path
 * (e.g. the GitHub Pages project segment), so localized paths from Paraglide
 * (which are base-less, like `/en/blog`) are appended directly.
 */
function absoluteUrl(path: string): string {
  const origin = site.url.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${normalized}`;
}

/** Localized absolute URL for a base-less app path in a specific locale. */
function localizedUrl(path: string, locale: Locale): string {
  return absoluteUrl(localizeHref(path, { locale }));
}

export function buildSeoMeta(props: SeoProps = {}) {
  const title = props.title ? `${props.title} · ${site.name}` : site.title;
  const description = props.description ?? site.description;
  const appPath = props.canonical ?? "/";
  const locale = getLocale();

  const canonical = localizedUrl(appPath, locale);
  const alternates: HreflangAlternate[] = locales.map((l) => ({
    locale: l,
    href: localizedUrl(appPath, l),
  }));
  const xDefault = localizedUrl(appPath, baseLocale);

  const image = props.image ? absoluteUrl(props.image) : undefined;
  const type = props.type ?? "website";

  return {
    title,
    description,
    canonical,
    alternates,
    xDefault,
    image,
    type,
    publishedTime: props.publishedTime,
    modifiedTime: props.modifiedTime,
    tags: props.tags,
    noindex: props.noindex ?? false,
    siteName: site.name,
    locale: OG_LOCALE[locale],
    twitterHandle: undefined,
  };
}

/** Normalize YAML/MDX dates (`Date` or ISO string) to `YYYY-MM-DD`. */
export function toDateString(value: string | Date): string {
  if (value instanceof Date) {
    const y = value.getUTCFullYear();
    const m = String(value.getUTCMonth() + 1).padStart(2, "0");
    const d = String(value.getUTCDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }
  const match = /^(\d{4}-\d{2}-\d{2})/.exec(String(value));
  return match?.[1] ?? String(value);
}

/** Calendar date in local time — avoids UTC day-shift from `YYYY-MM-DD`. */
function toLocalDate(value: string | Date): Date {
  const iso = toDateString(value);
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function formatIsoDate(date: string | Date): string {
  return `${toDateString(date)}T00:00:00.000Z`;
}

export function formatDisplayDate(date: string | Date): string {
  return new Intl.DateTimeFormat(getLocale(), {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(toLocalDate(date));
}
