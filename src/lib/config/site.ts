import {
  PUBLIC_SITE_EMAIL,
  PUBLIC_SITE_GITHUB,
  PUBLIC_SITE_TELEGRAM,
} from "$env/static/public";
import { yearsOfExperienceLabel } from "$lib/data/resume";

export const site = {
  name: "Semen Kolesnikov",
  title: "Semen Kolesnikov — Senior Frontend Developer",
  description: `Senior Frontend Developer with ${yearsOfExperienceLabel()} years building scalable React, TypeScript, and Next.js applications—focused on architecture, performance, and maintainable UI systems.`,
  url: "https://dragonite24.github.io/kolesnikov-semen/",
  author: "Semen Kolesnikov",
  locale: "en",
  ogImage: "/android-chrome-512x512.png",
  ogImageWidth: 512,
  ogImageHeight: 512,
  email: PUBLIC_SITE_EMAIL,
  github: PUBLIC_SITE_GITHUB,
  telegram: PUBLIC_SITE_TELEGRAM,
} as const;

export type SiteConfig = typeof site;
