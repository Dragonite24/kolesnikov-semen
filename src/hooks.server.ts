import type { Handle } from "@sveltejs/kit";
import { base } from "$app/paths";
import { paraglideMiddleware } from "$lib/paraglide/server";
import { getTextDirection } from "$lib/paraglide/runtime";

/**
 * Paraglide's URL patterns are defined without `paths.base`, so feed the
 * middleware a base-less URL. Otherwise locale detection fails on the base
 * prefix and every page falls back to the base locale.
 */
function baselessUrl(url: URL): URL {
  if (base && url.pathname.startsWith(base)) {
    const stripped = new URL(url);
    stripped.pathname = stripped.pathname.slice(base.length) || "/";
    return stripped;
  }
  return url;
}

const paraglideHandle: Handle = ({ event, resolve }) =>
  paraglideMiddleware(
    event.request,
    ({ locale }) =>
      resolve(event, {
        transformPageChunk: ({ html }) =>
          html
            .replace("%lang%", locale)
            .replace("%dir%", getTextDirection(locale)),
      }),
    { effectiveRequestUrl: baselessUrl(event.url) },
  );

export const handle: Handle = paraglideHandle;
