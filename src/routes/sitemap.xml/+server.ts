import { site } from "$lib/config/site";
import { getSortedPosts } from "$lib/content/posts";
import { baseLocale, locales, type Locale } from "$lib/paraglide/runtime";
import type { RequestHandler } from "./$types";

export const prerender = true;

const staticRoutes = ["/", "/blog"];

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

/** Prefix-all localized path, e.g. `/blog` + `ru` -> `/ru/blog`. */
function localizedPath(path: string, locale: Locale): string {
  const clean = path === "/" ? "" : path;
  return `/${locale}${clean}`;
}

function buildUrl(path: string): string {
  const origin = site.url.replace(/\/$/, "");
  return `${origin}${path}`;
}

type SitemapEntry = {
  path: string;
  changefreq: string;
  priority: string;
  lastmod?: string;
};

export const GET: RequestHandler = () => {
  const entries: SitemapEntry[] = [
    ...staticRoutes.map((path) => ({
      path,
      changefreq: "monthly",
      priority: path === "/" ? "1.0" : "0.8",
    })),
    ...getSortedPosts(baseLocale).map((post) => ({
      path: `/blog/${post.slug}`,
      changefreq: "yearly",
      priority: "0.6",
      lastmod: post.updated,
    })),
  ];

  const urls = entries.flatMap((entry) =>
    locales.map((locale) => {
      const alternates = [
        ...locales.map(
          (l) =>
            `    <xhtml:link rel="alternate" hreflang="${l}" href="${escapeXml(
              buildUrl(localizedPath(entry.path, l)),
            )}" />`,
        ),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(
          buildUrl(localizedPath(entry.path, baseLocale)),
        )}" />`,
      ].join("\n");

      return `  <url>
    <loc>${escapeXml(buildUrl(localizedPath(entry.path, locale)))}</loc>${
      entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : ""
    }
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
${alternates}
  </url>`;
    }),
  );

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "max-age=0, s-maxage=3600",
    },
  });
};
