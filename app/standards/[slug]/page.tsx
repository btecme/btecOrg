import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Markdown from '@/components/Markdown';
import { getStandard, getStandards, isStandardSlug, standardSlugs } from '@/lib/standards';
import '../standards.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return standardSlugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!isStandardSlug(slug)) notFound();
  const standard = getStandard(slug);
  const title = `${standard.title} | b-tec`;
  const url = `https://www.b-tec.org${standard.href}`;
  return {
    title, description: standard.description, alternates: { canonical: url },
    openGraph: { title, description: standard.description, url, siteName: 'b-tec', type: 'article', modifiedTime: standard.reviewed },
    twitter: { card: 'summary', title, description: standard.description },
  };
}

export default async function StandardPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isStandardSlug(slug)) notFound();
  const standard = getStandard(slug);
  return <div className="site-shell standards-page">
    <nav className="standards-breadcrumb" aria-label="Breadcrumb"><Link href="/standards">← All standards</Link><a href={standard.rawHref}>Raw Markdown<span className="sr-only">: {standard.title}</span></a></nav>
    <div className="standards-layout">
      <aside className="standards-contents">
        <nav aria-label="On this page"><h2>On this page</h2><ul>{standard.headings.map(heading => <li key={heading.id} className={heading.level === 3 ? 'contents-subheading' : undefined}><a href={`#${heading.id}`}>{heading.title}</a></li>)}</ul></nav>
      </aside>
      <article className="standards-article" aria-label={standard.title}>
        <p className="eyebrow">Working standards / public edition</p>
        <Markdown source={standard.content} standardLinks />
      </article>
    </div>
    <nav className="standards-related" aria-label="Other standards"><h2>Explore the standards</h2>{getStandards().map(item => <Link key={item.slug} href={item.href} aria-current={item.slug === slug ? 'page' : undefined}>{item.title}</Link>)}</nav>
  </div>;
}
