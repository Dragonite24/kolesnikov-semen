import { m } from "$lib/paraglide/messages";
import { getLocale, type Locale } from "$lib/paraglide/runtime";

/** First professional role — Lanbilling, March 2020 */
export const careerStart = new Date("2020-03-01");

const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;

export function yearsOfExperience(asOf: Date = new Date()): number {
  const elapsed = asOf.getTime() - careerStart.getTime();
  return Math.max(0, Math.floor(elapsed / MS_PER_YEAR));
}

export function yearsOfExperienceLabel(asOf: Date = new Date()): string {
  return `${yearsOfExperience(asOf)}+`;
}

export function buildSummary(
  asOf: Date = new Date(),
  locale: Locale = getLocale(),
): string {
  return m.summary({ years: yearsOfExperienceLabel(asOf) }, { locale });
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  companyDescription: string;
  highlights: string[];
  tags: string[];
}

export interface SkillGroup {
  id: string;
  label: string;
  skills: string[];
}

/** Resolve all CV content per request instead of capturing a locale at import time. */
export function getResume(locale: Locale) {
  const options = { locale };
  const experience: ExperienceItem[] = [
    {
      id: "elfsight",
      role: "Frontend Engineer",
      company: "Elfsight",
      location: m.resume_location({}, options),
      period: m.resume_elfsight_period({}, options),
      companyDescription: m.resume_elfsight_description({}, options),
      highlights: [
        m.resume_elfsight_timeline({}, options),
        m.resume_elfsight_performance({}, options),
        m.resume_elfsight_i18n({}, options),
        m.resume_elfsight_builds({}, options),
        m.resume_elfsight_boundaries({}, options),
        m.resume_elfsight_testing({}, options),
        m.resume_elfsight_ai({}, options),
      ],
      tags: [
        "React",
        "TypeScript",
        "Nx",
        "Lingui",
        "Vite",
        "Storybook",
        "Vitest",
      ],
    },
    {
      id: "code-it-up",
      role: "Frontend Engineer",
      company: "Code It Up",
      location: m.resume_location({}, options),
      period: m.resume_code_it_up_period({}, options),
      companyDescription: m.resume_code_it_up_description({}, options),
      highlights: [
        m.resume_code_it_up_design_system({}, options),
        m.resume_code_it_up_marketplace({}, options),
        m.resume_code_it_up_tables({}, options),
        m.resume_code_it_up_architecture({}, options),
      ],
      tags: ["React", "Next.js", "Redux", "Redux-Saga"],
    },
    {
      id: "lanbilling",
      role: "Frontend Engineer",
      company: "Lanbilling",
      location: m.resume_lanbilling_location({}, options),
      period: m.resume_lanbilling_period({}, options),
      companyDescription: m.resume_lanbilling_description({}, options),
      highlights: [
        m.resume_lanbilling_payments({}, options),
        m.resume_lanbilling_components({}, options),
      ],
      tags: ["JavaScript", "CRM", "PHP"],
    },
  ];

  const skillGroups: SkillGroup[] = [
    {
      id: "frontend",
      label: m.resume_skills_frontend({}, options),
      skills: [
        "TypeScript",
        "JavaScript",
        "React",
        "Next.js",
        "HTML",
        "CSS",
        "SCSS",
        "Tailwind CSS",
        "styled-components",
        "Zod",
      ],
    },
    {
      id: "state",
      label: m.resume_skills_state({}, options),
      skills: [
        "Redux / Redux Toolkit",
        "Redux-Saga",
        "TanStack Query",
        "Zustand",
        "REST API",
        "GraphQL",
        "WebSocket",
      ],
    },
    {
      id: "architecture",
      label: m.resume_skills_architecture({}, options),
      skills: [
        m.resume_skill_microfrontends({}, options),
        "Module Federation",
        m.resume_skill_nx({}, options),
        "SSR",
        "SSG",
        "ISR",
      ],
    },
    {
      id: "ui",
      label: m.resume_skills_ui({}, options),
      skills: [
        m.resume_skill_design_systems({}, options),
        "Storybook",
        "Lingui (i18n)",
      ],
    },
    {
      id: "build",
      label: m.resume_skills_build({}, options),
      skills: [
        "Vite",
        "Rolldown",
        "Webpack",
        m.resume_skill_node({}, options),
        "Docker",
        "Git",
        "GitLab CI/CD",
      ],
    },
    {
      id: "testing",
      label: m.resume_skills_testing({}, options),
      skills: [
        "Jest",
        "Vitest",
        "React Testing Library",
        "Playwright",
        m.resume_skill_visual_testing({}, options),
        m.resume_skill_smoke_testing({}, options),
      ],
    },
    {
      id: "performance",
      label: m.resume_skills_performance({}, options),
      skills: [
        "Core Web Vitals",
        "Lighthouse",
        "code splitting",
        "lazy loading",
        "tree-shaking",
        m.resume_skill_seo({}, options),
        "WCAG",
        "ARIA",
      ],
    },
    {
      id: "ai",
      label: m.resume_skills_ai({}, options),
      skills: ["Claude Code", "MCP", m.resume_skill_ai_agents({}, options)],
    },
  ];

  return {
    experience,
    education: {
      school: m.resume_education_school({}, options),
      degree: m.resume_education_degree({}, options),
    },
    skillGroups,
    additionalInformation: [
      m.resume_english({}, options),
      m.resume_russian({}, options),
      m.resume_achievement({}, options),
    ],
  };
}
