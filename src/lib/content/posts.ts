import type {
  BlogPost,
  BlogPostFrontmatter,
  BlogPostMeta,
} from "$lib/types/blog";
import { toDateString } from "$lib/seo";
import { baseLocale, isLocale, type Locale } from "$lib/paraglide/runtime";
import type { Component } from "svelte";

type MdxModule = {
  metadata: BlogPostFrontmatter;
  default: Component;
};

const modules = import.meta.glob<MdxModule>("/src/content/blog/*.mdx", {
  eager: true,
});

type ParsedPath = { slug: string; locale: Locale };

/** Parse `some-slug.en.mdx` into `{ slug: "some-slug", locale: "en" }`. */
function parsePath(path: string): ParsedPath | null {
  const filename = path.split("/").pop() ?? "";
  const name = filename.replace(/\.mdx$/, "");
  const lastDot = name.lastIndexOf(".");
  if (lastDot === -1) return null;
  const slug = name.slice(0, lastDot);
  const locale = name.slice(lastDot + 1);
  if (!slug || !isLocale(locale)) return null;
  return { slug, locale };
}

function toMeta(
  slug: string,
  locale: Locale,
  frontmatter: BlogPostFrontmatter,
): BlogPostMeta {
  return {
    slug,
    locale,
    title: frontmatter.title,
    description: frontmatter.description,
    date: toDateString(frontmatter.date),
    updated: toDateString(frontmatter.updated),
    tags: frontmatter.tags ?? [],
    draft: frontmatter.draft ?? false,
  };
}

const registry: Record<string, Partial<Record<Locale, BlogPost>>> = {};

for (const [path, mod] of Object.entries(modules)) {
  const parsed = parsePath(path);
  if (!parsed) continue;
  const { slug, locale } = parsed;
  (registry[slug] ??= {})[locale] = {
    ...toMeta(slug, locale, mod.metadata),
    Component: mod.default,
  };
}

/** Resolve a post for a locale, falling back to the base locale translation. */
function resolveForLocale(slug: string, locale: Locale): BlogPost | undefined {
  const entry = registry[slug];
  if (!entry) return undefined;
  return entry[locale] ?? entry[baseLocale];
}

export function getSortedPosts(locale: Locale): BlogPostMeta[] {
  return Object.keys(registry)
    .map((slug) => resolveForLocale(slug, locale))
    .filter((post): post is BlogPost => !!post && !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map(({ Component: _Component, ...meta }) => meta);
}

export function getPostBySlug(
  slug: string,
  locale: Locale,
): BlogPost | undefined {
  const post = resolveForLocale(slug, locale);
  if (!post || post.draft) return undefined;
  return post;
}
