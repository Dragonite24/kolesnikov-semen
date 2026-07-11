<script lang="ts">
  import { onMount } from "svelte";

  let progress = $state(0);

  function update(): void {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress = max <= 0 ? 0 : Math.min(100, Math.max(0, (window.scrollY / max) * 100));
  }

  onMount(() => {
    update();
  });
</script>

<svelte:window onscroll={update} onresize={update} />

<div class="reading-progress" aria-hidden="true">
  <div class="reading-progress__bar" style:width="{progress}%"></div>
</div>

<style>
  .reading-progress {
    position: fixed;
    top: var(--header-height);
    left: 0;
    right: 0;
    z-index: 11;
    height: 3px;
    pointer-events: none;
    background: color-mix(in srgb, var(--color-accent) 16%, transparent);
  }

  .reading-progress__bar {
    height: 100%;
    background: var(--color-accent);
    transform-origin: left center;
    transition: width 80ms linear;
  }

  @media (prefers-reduced-motion: reduce) {
    .reading-progress__bar {
      transition: none;
    }
  }
</style>
