<script lang="ts">
  import { page } from "$app/stores";
  import { m } from "$lib/paraglide/messages";
  import { getLocale, locales } from "$lib/paraglide/runtime";
  import { deLocalizedAppPath, localizedPath } from "$lib/utils/paths";

  const current = $derived(getLocale());
  const appPath = $derived(deLocalizedAppPath($page.url.pathname));
</script>

<nav class="lang-switcher" aria-label={m.lang_switcher_label()}>
  {#each locales as locale (locale)}
    <a
      href={localizedPath(appPath, locale)}
      class="lang-switcher__link font-mono"
      hreflang={locale}
      aria-current={locale === current ? "true" : undefined}
      data-sveltekit-reload
    >
      {locale.toUpperCase()}
    </a>
  {/each}
</nav>

<style>
  .lang-switcher {
    display: flex;
    align-items: center;
    gap: var(--space-1);
  }

  .lang-switcher__link {
    font-size: var(--font-size-xs);
    padding: 0.15rem 0.4rem;
    border-radius: var(--radius-sm, 0.25rem);
    color: var(--color-muted);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-tight);
    transition:
      color 0.15s ease,
      background 0.15s ease;
  }

  .lang-switcher__link:hover {
    color: var(--color-fg);
  }

  .lang-switcher__link[aria-current="true"] {
    color: var(--color-fg);
    background: color-mix(in srgb, var(--color-fg) 8%, transparent);
  }
</style>
