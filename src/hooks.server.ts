import type { Handle } from "@sveltejs/kit";
import { toAppUrl } from "$lib/i18n/routing";
import { paraglideMiddleware } from "$lib/paraglide/server";
import { getTextDirection } from "$lib/paraglide/runtime";

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
    { effectiveRequestUrl: toAppUrl(event.url) },
  );

export const handle: Handle = paraglideHandle;
