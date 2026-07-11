<script lang="ts">
  import ArticleCard from "$lib/components/ArticleCard.svelte";
  import Seo from "$lib/components/Seo.svelte";
  import Container from "$lib/components/layout/Container.svelte";
  import { getSortedPosts } from "$lib/content/posts";
  import { m } from "$lib/paraglide/messages";
  import { getLocale } from "$lib/paraglide/runtime";

  const posts = $derived(getSortedPosts(getLocale()));
</script>

<Seo
  title={m.blog_seo_title()}
  description={m.blog_seo_description()}
  canonical="/blog"
/>

<Container tag="section">
  <header class="page-header">
    <p class="font-mono text-muted">{m.blog_kicker()}</p>
    <h1 class="page-header__title">{m.blog_title()}</h1>
    <p class="page-header__description">
      {m.blog_description()}
    </p>
  </header>

  <div class="blog-list" role="feed" aria-label={m.blog_feed_label()}>
    {#each posts as post (post.slug)}
      <ArticleCard {post} />
    {/each}
  </div>
</Container>

<style>
  .blog-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }
</style>
