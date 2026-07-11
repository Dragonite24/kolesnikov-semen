<script lang="ts">
  import DisplayDate from "$lib/components/DisplayDate.svelte";
  import Seo from "$lib/components/Seo.svelte";
  import Container from "$lib/components/layout/Container.svelte";
  import { m } from "$lib/paraglide/messages";
  import { formatIsoDate } from "$lib/seo";
  import { localizedPath } from "$lib/utils/paths";

  let { data } = $props();
  const meta = $derived(data.meta);
  const PostContent = $derived(data.Component);
  const showUpdated = $derived(meta.updated !== meta.date);
</script>

<Seo
  title={meta.title}
  description={meta.description}
  canonical="/blog/{meta.slug}"
  type="article"
  publishedTime={formatIsoDate(meta.date)}
  modifiedTime={showUpdated ? formatIsoDate(meta.updated) : undefined}
  tags={meta.tags}
/>

<Container tag="article">
  <header class="page-header">
    <div class="post-meta">
      <a href={localizedPath("/blog")} class="link-underline font-mono post-meta__back"
        >{m.blog_all_posts()}</a
      >
      <div class="post-meta__dates font-mono text-muted">
        <DisplayDate date={meta.date} />
        {#if showUpdated}
          <span class="post-meta__updated">
            {m.blog_updated()}
            <DisplayDate date={meta.updated} />
          </span>
        {/if}
      </div>
    </div>
    <h1 class="page-header__title">{meta.title}</h1>
    <p class="page-header__description">{meta.description}</p>
    {#if meta.tags.length > 0}
      <ul class="post-tags" aria-label={m.blog_tags_label()}>
        {#each meta.tags as tag (tag)}
          <li><span class="tag">{tag}</span></li>
        {/each}
      </ul>
    {/if}
  </header>

  <div class="prose post-body">
    <PostContent />
  </div>
</Container>

<style>
  .post-meta {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    flex-wrap: wrap;
    gap: var(--space-1) var(--space-2);
  }

  .post-meta__dates {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.25rem;
    font-size: var(--font-size-xs);
    text-align: right;
  }

  .post-meta__updated {
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 0.35em;
  }

  .post-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-1);
    margin-top: var(--space-2);
  }
</style>
