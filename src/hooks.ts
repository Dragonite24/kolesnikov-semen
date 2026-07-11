import type { Reroute } from "@sveltejs/kit";
import { base } from "$app/paths";
import { deLocalizeUrl } from "$lib/paraglide/runtime";

export const reroute: Reroute = (request) => {
  const url = new URL(request.url);
  // SvelteKit runs `reroute` before stripping `paths.base`, so match against a
  // base-less path (Paraglide's URL patterns are defined without the base) and
  // re-add the base to the result so SvelteKit still recognises it as in-scope.
  const hasBase = Boolean(base) && url.pathname.startsWith(base);
  if (hasBase) {
    url.pathname = url.pathname.slice(base.length) || "/";
  }
  const deLocalized = deLocalizeUrl(url).pathname;
  return hasBase ? `${base}${deLocalized}` : deLocalized;
};
