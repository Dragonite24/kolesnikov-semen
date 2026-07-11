<script lang="ts">
  import { page } from "$app/state";
  import Seo from "$lib/components/Seo.svelte";
  import Container from "$lib/components/layout/Container.svelte";
  import { m } from "$lib/paraglide/messages";
  import { localizedPath } from "$lib/utils/paths";

  const is404 = $derived(page.status === 404);

  const message = $derived(
    is404 ? m.error_not_found() : (page.error?.message ?? m.error_generic()),
  );
</script>

<Seo title={m.error_seo_title()} noindex />

<Container tag="section">
  <header class="page-header">
    <p class="font-mono text-muted">{page.status}</p>
    <h1 class="page-header__title">{message}</h1>
    {#if is404}
      <p class="page-header__description">
        {m.error_404_description()}
      </p>
    {/if}
  </header>
  <p>
    <a href={localizedPath("/")} class="link-underline">{m.error_back_home()}</a
    >
  </p>
</Container>
