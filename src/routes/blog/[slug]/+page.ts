import { error } from "@sveltejs/kit";
import { getPostBySlug } from "$lib/content/posts";
import { getLocale } from "$lib/paraglide/runtime";
import type { PageLoad } from "./$types";

export const prerender = true;

export const load: PageLoad = ({ params }) => {
  const post = getPostBySlug(params.slug, getLocale());

  if (!post) {
    error(404, "Post not found");
  }

  const { Component, ...meta } = post;
  return { meta, Component };
};
