import type { Reroute } from "@sveltejs/kit";
import { browser } from "$app/environment";
import { base } from "$app/paths";
import {
  localeFromPathname,
  toAppUrl,
  withAppBase,
} from "$lib/i18n/routing";
import {
  deLocalizeUrl,
  defineCustomClientStrategy,
} from "$lib/paraglide/runtime";

if (browser) {
  defineCustomClientStrategy("custom-app-path", {
    getLocale: () => localeFromPathname(window.location.pathname),
    // Locale changes use localized links and perform a full navigation, so
    // there is no additional client-side state to persist here.
    setLocale: () => undefined,
  });
}

export const reroute: Reroute = (request) => {
  const url = new URL(request.url);
  const hasBase = Boolean(base) && url.pathname.startsWith(base);
  const deLocalized = deLocalizeUrl(toAppUrl(url)).pathname;
  return hasBase ? withAppBase(deLocalized) : deLocalized;
};
