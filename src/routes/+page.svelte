<script lang="ts">
  import Seo from "$lib/components/Seo.svelte";
  import Container from "$lib/components/layout/Container.svelte";
  import { site } from "$lib/config/site";
  import { m } from "$lib/paraglide/messages";
  import { localizedPath } from "$lib/utils/paths";
</script>

<Seo description={m.site_description()} />

<Container tag="section">
  <header class="page-header">
    <p class="font-mono text-muted">{m.home_kicker()}</p>
    <h1 class="page-header__title">{site.name}</h1>
    <p class="page-header__description">{m.site_description()}</p>
  </header>

  <section class="section" aria-labelledby="intro-heading">
    <h2 id="intro-heading" class="sr-only">{m.home_intro_heading()}</h2>
    <p class="prose">{m.home_interests()}</p>
  </section>

  <section class="section" aria-labelledby="links-heading">
    <h2 id="links-heading" class="section-label font-mono text-muted">
      {m.home_explore_heading()}
    </h2>
    <ul class="action-card-list">
      <li>
        <a href={localizedPath("/portfolio")} class="action-card">
          <span class="action-card__content">
            <span class="action-card__title font-heading"
              >{m.home_card_portfolio_title()}</span
            >
            <span class="action-card__meta font-mono text-muted"
              >{m.home_card_portfolio_meta()}</span
            >
          </span>
          <span class="action-card__arrow" aria-hidden="true">→</span>
        </a>
      </li>
      <li>
        <a href={localizedPath("/blog")} class="action-card">
          <span class="action-card__content">
            <span class="action-card__title font-heading"
              >{m.home_card_blog_title()}</span
            >
            <span class="action-card__meta font-mono text-muted"
              >{m.home_card_blog_meta()}</span
            >
          </span>
          <span class="action-card__arrow" aria-hidden="true">→</span>
        </a>
      </li>
    </ul>
  </section>
</Container>
