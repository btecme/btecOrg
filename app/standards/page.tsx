import type { Metadata } from 'next';
import Link from 'next/link';
import { getStandards } from '@/lib/standards';
import './standards.css';

const title = 'Digital Product Standards | b-tec';
const description = 'A living view of how b-tec designs and builds digital products: practical principles, honest interactions and measured architecture.';
const url = 'https://www.b-tec.org/standards';

export const metadata: Metadata = {
  title, description, alternates: { canonical: url },
  openGraph: { title, description, url, siteName: 'b-tec', type: 'website' },
  twitter: { card: 'summary', title, description },
};

export default function StandardsPage() {
  const standards = getStandards();
  return <div className="site-shell standards-page">
    <header className="standards-intro">
      <p className="eyebrow">How we build</p>
      <h1>Standards, in the open.</h1>
      <p className="standards-lead">A living view of how b-tec designs and builds digital products. Practical guidance you can read, question, and see evolve as we learn.</p>
      <p>These are working principles, not a certification, an audit, or a claim that every existing product already conforms. We apply relevant guidance to new work and changes, then verify the affected behavior.</p>
    </header>
    <section aria-labelledby="current-standards">
      <h2 id="current-standards">Current standards</h2>
      <ol className="standards-list" start={0}>
        <li value={0}>
          <span className="technical-note" aria-hidden="true">00</span>
          <div><h3 id="first-principles"><Link href="/first-principles">First Principles <span aria-hidden="true">↗</span></Link></h3>
            <p>The thinking behind our working standards: how we approach technology, design, and the people using what we build.</p>
          </div>
        </li>
        {standards.map((standard, index) => <li key={standard.slug}>
        <span className="technical-note" aria-hidden="true">0{index + 1}</span>
        <div><h3><Link href={standard.href}>{standard.title} <span aria-hidden="true">↗</span></Link></h3>
          <p>{standard.description}</p>
          <p className="standards-meta">Reviewed <time dateTime={standard.reviewed}>{standard.reviewed}</time> · <a href={standard.rawHref}>Raw Markdown<span className="sr-only">: {standard.title}</span></a></p>
        </div>
      </li>)}</ol>
    </section>
    <section className="standards-note" aria-labelledby="reading-standards">
      <h2 id="reading-standards">Read them as a working practice</h2>
      <p>Start with First Principles for the rationale, then Digital Design Standards and the interaction or API guidance relevant to your work. Requirements, optional patterns, future coverage, and verified evidence are kept distinct. Each document includes its review date and any source limitations.</p>
      <p><Link href="/contact">Talk with us</Link> about what it means for your product.</p>
    </section>
  </div>;
}
