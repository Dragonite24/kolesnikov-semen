<script lang="ts">
  import { page } from "$app/stores";
  import LanguageSwitcher from "$lib/components/layout/LanguageSwitcher.svelte";
  import { site } from "$lib/config/site";
  import { m } from "$lib/paraglide/messages";
  import { requestSpectrumFlash } from "$lib/utils/spectrum-flash";
  import { deLocalizedAppPath, localizedPath } from "$lib/utils/paths";

  const navItems = [
    { path: "/", label: m.nav_home },
    { path: "/portfolio", label: m.nav_portfolio },
    { path: "/blog", label: m.nav_blog },
  ] as const;

  const CLICK_WINDOW_MS = 1000;
  const CLICKS_TO_FLASH = 3;

  let logoClicks = 0;
  let lastLogoClickAt = 0;

  function isActive(path: string, pathname: string): boolean {
    const current = deLocalizedAppPath(pathname);
    if (path === "/") return current === "/";
    return current === path || current.startsWith(`${path}/`);
  }

  function onLogoClick(event: MouseEvent): void {
    const now = Date.now();
    if (now - lastLogoClickAt > CLICK_WINDOW_MS) {
      logoClicks = 0;
    }
    lastLogoClickAt = now;
    logoClicks += 1;

    if (logoClicks >= CLICKS_TO_FLASH) {
      event.preventDefault();
      logoClicks = 0;
      requestSpectrumFlash();
    }
  }
</script>

<header class="header">
  <div class="header__inner container">
    <a
      href={localizedPath("/")}
      class="header__logo font-heading"
      aria-label={m.header_logo_aria({ name: site.name })}
      onclick={onLogoClick}
    >
      {site.name}
    </a>

    <div class="header__actions">
      <nav class="header__nav" aria-label={m.nav_primary_label()}>
        <ul class="header__list">
          {#each navItems as item (item.path)}
            <li>
              <a
                href={localizedPath(item.path)}
                class="header__link link-underline font-mono"
                aria-current={isActive(item.path, $page.url.pathname)
                  ? "page"
                  : undefined}
              >
                {item.label()}
              </a>
            </li>
          {/each}
        </ul>
      </nav>

      <LanguageSwitcher />
    </div>
  </div>
</header>

<style>
  .header {
    position: sticky;
    top: 0;
    z-index: 10;
    height: var(--header-height);
    display: flex;
    align-items: center;
    background: color-mix(in srgb, var(--color-bg) 78%, transparent);
    backdrop-filter: blur(14px) saturate(1.2);
    border-bottom: 1px solid var(--color-border);
  }

  .header__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .header__logo {
    font-size: var(--font-size-md);
    font-weight: 500;
    letter-spacing: var(--letter-spacing-tight);
    transition: color var(--transition-fast);
  }

  .header__logo:hover {
    color: var(--color-accent);
  }

  .header__actions {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }

  .header__list {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }

  .header__link {
    color: var(--color-muted);
    font-weight: 400;
  }

  .header__link:hover {
    color: var(--color-text);
  }

  /* Override global .link-underline scaleX (subpixel flash on 1px lines). */
  .header__link.link-underline::after {
    height: 1px;
    transform: none;
    opacity: 0;
    transition: opacity var(--transition-base);
  }

  .header__link.link-underline:hover::after {
    transform: none;
    opacity: 1;
  }

  .header__link[aria-current="page"] {
    color: var(--color-text);
    font-weight: 500;
  }

  .header__link.link-underline[aria-current="page"]::after {
    height: 2px;
    transform: none;
    opacity: 1;
  }

  @media (max-width: 480px) {
    .header__actions {
      gap: var(--space-2);
    }
  }

  @media (max-width: 480px) {
    .header__list {
      gap: var(--space-2);
    }
  }
</style>
