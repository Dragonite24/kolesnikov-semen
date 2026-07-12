<script lang="ts">
  import { m } from "$lib/paraglide/messages";
  import type { TocHeading } from "$lib/utils/toc";

  let { headings }: { headings: TocHeading[] } = $props();

  const visible = $derived(headings.length >= 2);
</script>

{#if visible}
  <nav class="toc" aria-labelledby="toc-heading">
    <p id="toc-heading" class="toc__label section-label font-mono text-muted">
      {m.toc_label()}
    </p>
    <ol class="toc__list">
      {#each headings as heading (heading.id)}
        <li
          class="toc__item"
          class:toc__item--h3={heading.level === 3}
        >
          <a href="#{heading.id}" class="link-underline">{heading.text}</a>
        </li>
      {/each}
    </ol>
  </nav>
{/if}

<style>
  .toc {
    margin-bottom: var(--space-3);
  }

  .toc__label {
    margin-bottom: var(--space-2);
  }

  .toc__list {
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
    padding: 0;
    list-style: none;
  }

  .toc__item {
    font-size: var(--font-size-sm);
    line-height: var(--line-height-snug);
  }

  .toc__item--h3 {
    padding-left: 1rem;
  }
</style>
