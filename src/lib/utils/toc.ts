export type TocHeading = {
  id: string;
  text: string;
  level: 2 | 3;
};

/** Build a URL-safe id from heading text (keeps Unicode letters/numbers). */
export function slugifyHeading(text: string): string {
  const slug = text
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
  return slug || "section";
}

/**
 * Ensure h2/h3 in `root` have unique ids and return TOC entries.
 * Mutates the DOM when an id is missing or colliding.
 */
export function collectHeadings(root: HTMLElement): TocHeading[] {
  const nodes = root.querySelectorAll("h2, h3");
  const used = new Set<string>();
  const headings: TocHeading[] = [];

  for (const el of nodes) {
    if (!(el instanceof HTMLHeadingElement)) continue;
    const text = el.textContent?.trim() ?? "";
    if (!text) continue;

    let id = el.id || slugifyHeading(text);
    if (used.has(id)) {
      let n = 2;
      while (used.has(`${id}-${n}`)) n += 1;
      id = `${id}-${n}`;
    }
    used.add(id);
    el.id = id;

    headings.push({
      id,
      text,
      level: el.tagName === "H2" ? 2 : 3,
    });
  }

  return headings;
}
