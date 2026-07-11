import type { Locale } from "$lib/paraglide/runtime";
import type { Component } from "svelte";

export interface BlogPostMeta {
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  date: string;
  updated: string;
  tags: string[];
  draft?: boolean;
}

export interface BlogPost extends BlogPostMeta {
  Component: Component;
}

/** Frontmatter shape for MDX files in `src/content/blog/`. */
export interface BlogPostFrontmatter {
  title: string;
  description: string;
  /** YAML may parse as `Date`; normalized to `YYYY-MM-DD` in `posts.ts`. */
  date: string | Date;
  updated: string | Date;
  tags?: string[];
  draft?: boolean;
}
