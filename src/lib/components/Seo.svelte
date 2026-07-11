<script lang="ts">
  import { buildSeoMeta, type SeoProps } from "$lib/seo";

  let props: SeoProps = $props();
  const meta = $derived(buildSeoMeta(props));
</script>

<svelte:head>
  <title>{meta.title}</title>
  <meta name="description" content={meta.description} />
  <link rel="canonical" href={meta.canonical} />

  {#if meta.noindex}
    <meta name="robots" content="noindex, nofollow" />
  {:else}
    {#each meta.alternates as alternate (alternate.locale)}
      <link rel="alternate" hreflang={alternate.locale} href={alternate.href} />
    {/each}
    <link rel="alternate" hreflang="x-default" href={meta.xDefault} />
  {/if}

  <meta property="og:title" content={meta.title} />
  <meta property="og:description" content={meta.description} />
  <meta property="og:url" content={meta.canonical} />
  <meta property="og:type" content={meta.type} />
  <meta property="og:site_name" content={meta.siteName} />
  <meta property="og:locale" content={meta.locale} />

  {#if meta.image}
    <meta property="og:image" content={meta.image} />
  {/if}

  {#if meta.type === "article" && meta.publishedTime}
    <meta property="article:published_time" content={meta.publishedTime} />
  {/if}

  {#if meta.type === "article" && meta.modifiedTime}
    <meta property="article:modified_time" content={meta.modifiedTime} />
  {/if}

  {#if meta.tags}
    {#each meta.tags as tag (tag)}
      <meta property="article:tag" content={tag} />
    {/each}
  {/if}

  <meta
    name="twitter:card"
    content={meta.image ? "summary_large_image" : "summary"}
  />
  <meta name="twitter:title" content={meta.title} />
  <meta name="twitter:description" content={meta.description} />
  {#if meta.twitterHandle}
    <meta name="twitter:site" content={meta.twitterHandle} />
  {/if}

  {#if meta.image}
    <meta name="twitter:image" content={meta.image} />
  {/if}
</svelte:head>
