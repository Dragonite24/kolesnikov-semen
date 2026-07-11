<script lang="ts">
  import { page } from "$app/state";
  import favicon from "$lib/assets/favicon.svg";
  import ReadingProgress from "$lib/components/ReadingProgress.svelte";
  import Footer from "$lib/components/layout/Footer.svelte";
  import Header from "$lib/components/layout/Header.svelte";
  import SpectrumBackground from "$lib/components/layout/SpectrumBackground.svelte";
  import { m } from "$lib/paraglide/messages";
  import { deLocalizedAppPath } from "$lib/utils/paths";
  import { onMount } from "svelte";
  import "@fontsource/geist-mono/400.css";
  import "@fontsource/geist-mono/500.css";
  import "$styles/reset.css";
  import "$styles/global.css";

  let { children } = $props();

  const showReadingProgress = $derived(
    /^\/blog\/[^/]+$/.test(deLocalizedAppPath(page.url.pathname)),
  );

  onMount(() => {
    console.log(
      `%c${m.console_greeting()}`,
      "font-family: ui-monospace, monospace; font-size: 12px; color: #7c5cff;",
    );
  });
</script>

<svelte:head>
  <meta name="theme-color" content="#fafafa" />
  <meta name="color-scheme" content="light" />
  <link rel="icon" href={favicon} />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossorigin="anonymous"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Space+Grotesk:wght@400;500;600&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<a href="#main-content" class="sr-only skip-link">{m.skip_to_content()}</a>

<SpectrumBackground />

<div class="app">
  <Header />
  {#if showReadingProgress}
    <ReadingProgress />
  {/if}
  <main id="main-content" class="app__main">
    {#key page.url.pathname}
      <div class="page-enter">
        {@render children()}
      </div>
    {/key}
  </main>
  <Footer />
</div>
