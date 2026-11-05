<script lang="ts">
  import Seo from "$lib/components/Seo.svelte";
  import Container from "$lib/components/layout/Container.svelte";
  import { getResume, yearsOfExperienceLabel } from "$lib/data/resume";
  import { m } from "$lib/paraglide/messages";
  import { getLocale } from "$lib/paraglide/runtime";

  const resume = $derived(getResume(getLocale()));
</script>

<Seo
  title={m.portfolio_seo_title()}
  description={m.portfolio_seo_description()}
  canonical="/portfolio"
  noindex
/>

<Container tag="section">
  <header class="page-header">
    <p class="font-mono text-muted">{m.role_title()}</p>
    <h1 class="page-header__title">{m.portfolio_title()}</h1>
    <p class="resume-location text-muted">
      {m.resume_location()} · UTC+4
    </p>
    <p class="page-header__description">
      {m.summary({ years: yearsOfExperienceLabel() })}
    </p>
  </header>

  <section class="section" aria-labelledby="experience-heading">
    <h2 id="experience-heading" class="section-label font-mono text-muted">
      {m.portfolio_experience_heading()}
    </h2>
    <ul class="experience-list" role="list">
      {#each resume.experience as job (job.id)}
        <li class="experience-item">
          <article>
            <header class="experience-item__header">
              <div class="experience-item__heading">
                <h3 class="experience-item__role font-heading">{job.role}</h3>
                <p class="experience-item__company">{job.company}</p>
              </div>
              <div class="experience-item__meta font-mono text-muted">
                <span>{job.location}</span>
                <span aria-hidden="true">·</span>
                <time>{job.period}</time>
              </div>
            </header>
            <p class="experience-item__about">{job.companyDescription}</p>
            <ul class="experience-item__highlights">
              {#each job.highlights as highlight (highlight)}
                <li>{highlight}</li>
              {/each}
            </ul>
            {#if job.tags.length > 0}
              <ul
                class="experience-item__tags"
                aria-label={m.portfolio_tech_label()}
              >
                {#each job.tags as tag (tag)}
                  <li><span class="tag">{tag}</span></li>
                {/each}
              </ul>
            {/if}
          </article>
        </li>
      {/each}
    </ul>
  </section>

  <section class="section" aria-labelledby="education-heading">
    <h2 id="education-heading" class="section-label font-mono text-muted">
      {m.portfolio_education_heading()}
    </h2>
    <article class="education-block">
      <h3 class="education-block__school font-heading">
        {resume.education.school}
      </h3>
      <p class="education-block__degree text-muted">
        {resume.education.degree}
      </p>
    </article>
  </section>

  <section class="section" aria-labelledby="skills-heading">
    <h2 id="skills-heading" class="section-label font-mono text-muted">
      {m.portfolio_skills_heading()}
    </h2>
    {#each resume.skillGroups as group (group.id)}
      <div class="skill-group">
        <h3 id="skills-{group.id}" class="skill-group__title font-heading">
          {group.label}
        </h3>
        <ul class="skills-list" aria-labelledby="skills-{group.id}">
          {#each group.skills as skill (skill)}
            <li><span class="tag">{skill}</span></li>
          {/each}
        </ul>
      </div>
    {/each}
  </section>

  <section class="section" aria-labelledby="additional-heading">
    <h2 id="additional-heading" class="section-label font-mono text-muted">
      {m.portfolio_additional_heading()}
    </h2>
    <ul class="additional-list text-muted">
      {#each resume.additionalInformation as item (item)}
        <li>{item}</li>
      {/each}
    </ul>
  </section>
</Container>

<style>
  .resume-location {
    font-size: var(--font-size-sm);
  }

  .experience-list {
    display: flex;
    flex-direction: column;
  }

  .experience-item {
    padding-block: var(--space-3);
    border-top: 1px solid var(--color-border);
  }

  .experience-item:first-child {
    border-top: none;
    padding-top: var(--space-2);
  }

  .experience-item__header {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    margin-bottom: var(--space-2);
  }

  @media (min-width: 600px) {
    .experience-item__header {
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      gap: var(--space-3);
    }
  }

  .experience-item__role {
    font-size: var(--font-size-xl);
    font-weight: 500;
    line-height: var(--line-height-snug);
  }

  .experience-item__company {
    font-size: var(--font-size-md);
    color: var(--color-muted);
    margin-top: 0.2rem;
  }

  .experience-item__meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    font-size: var(--font-size-xs);
    padding-top: 8px;
  }

  .experience-item__about {
    font-size: var(--font-size-sm);
    color: var(--color-muted);
    line-height: var(--line-height-relaxed);
    max-width: 65ch;
    margin-bottom: var(--space-2);
  }

  .experience-item__highlights {
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
    padding-left: 1.1rem;
    list-style: disc;
    max-width: 65ch;
  }

  .experience-item__highlights li {
    font-size: var(--font-size-sm);
    color: var(--color-muted);
    line-height: var(--line-height-relaxed);
  }

  .experience-item__tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-1);
    margin-top: var(--space-2);
  }

  .education-block {
    padding-top: var(--space-2);
  }

  .education-block__school {
    font-size: var(--font-size-lg);
    font-weight: 500;
    line-height: var(--line-height-snug);
  }

  .education-block__degree {
    margin-top: 0.35rem;
    font-size: var(--font-size-sm);
  }

  .skills-list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-1);
    padding-top: var(--space-1);
  }

  .skills-list li {
    min-width: 0;
    max-width: 100%;
    overflow-wrap: anywhere;
  }

  .skill-group__title {
    font-size: var(--font-size-base);
    font-weight: 500;
  }

  .additional-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    font-size: var(--font-size-sm);
  }
</style>
