import {
  PUBLIC_SITE_EMAIL,
  PUBLIC_SITE_GITHUB,
  PUBLIC_SITE_TELEGRAM,
} from "$env/static/public";

export const site = {
  name: "Semen Kolesnikov",
  title: "Semen Kolesnikov — Senior Frontend Developer",
  description:
    "I'm a frontend engineer focused on building scalable, high-performance web applications with React, TypeScript, and Next.js.",
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
