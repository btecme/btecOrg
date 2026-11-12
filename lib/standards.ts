import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import GithubSlugger from 'github-slugger';

// Explicit public collection: no directory discovery or arbitrary path reads.
export const standardSlugs = ['digital-design', 'ui-responsiveness', 'api-architecture-scalability'] as const;
export type StandardSlug = typeof standardSlugs[number];

export function isStandardSlug(slug: string): slug is StandardSlug {
  return standardSlugs.some(candidate => candidate === slug);
}

export function getStandard(slug: StandardSlug) {
  const { content, data } = matter(fs.readFileSync(path.join(process.cwd(), 'public', 'standards', `${slug}.md`), 'utf8'));
  const slugger = new GithubSlugger();
  // The reviewed collection uses ATX, plain-text headings. Track h1 too so
  // the contents links use the same duplicate-heading IDs as rehype-slug.
  const headings = [...content.matchAll(/^(#{1,3}) (.+)$/gm)].map(match => ({
    level: match[1].length,
    title: match[2],
    id: slugger.slug(match[2]),
  })).filter(heading => heading.level > 1);
  return {
    slug,
    title: String(data.title),
    description: String(data.description),
    reviewed: String(data.reviewed),
    content,
    headings,
    href: `/standards/${slug}`,
    rawHref: `/standards/${slug}.md`,
  };
}

export function getStandards() {
  return standardSlugs.map(getStandard);
}
