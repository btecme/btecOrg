import type { Metadata } from 'next';
import Link from 'next/link';
import CapabilityExplorer from './CapabilityExplorer';
import './websites-domains.css';

const title = 'Websites & Domains | Professional websites from $400 | b-tec';
const description = 'Your website. Your domain. Handled. Professional informational websites from $400, including CMS editing. One-time builds, with ongoing services quoted separately.';
const route = 'https://www.b-tec.org/services/websites-domains';
export const metadata: Metadata = {
  title, description, alternates: { canonical: route },
  openGraph: { title, description, url: route, type: 'website', siteName: 'b-tec', images: [{ url: `${route}/opengraph-image`, width: 1200, height: 630, alt: 'Your website. Your domain. Handled. Professional websites from $400. One-time build; ongoing services quoted separately.' }] },
  twitter: { card: 'summary_large_image', title, description, images: [`${route}/opengraph-image`] },
};

const faqs = [
  ['What’s included in the starting site?', 'From $400, the starting offer is a fast, professional informational website with clear next steps for customers and a CMS for editing your content. We agree on pages, content and other project needs before quoting. It is a starting build price, not a fixed price for every project.'],
  ['Can I update it myself?', 'Yes. CMS editing is part of the starting offer, not an upgrade. You can update content from wherever you are. We’ll scope which content you need to manage as part of the build.'],
  ['Can you help with my existing site or domain?', 'Let’s look at what you have, who currently manages it and what you want to change. We can discuss a new build or help with an existing website or domain. Any move, repair or ongoing management is scoped and quoted before work begins.'],
  ['What if I need a store or customer logins?', 'That’s where Sell and Operate come in. Product catalogs, checkout, accounts, private areas and database-backed workflows are custom-quoted possibilities. We define the capabilities your business actually needs; these are not included in the $400 starting offer.'],
  ['What costs recur?', 'The website build is a one-time project cost. Hosting, domain registration and renewals, and any agreed care are separate services, quoted for your needs. Stores also need a conversation about payment-provider and transaction fees. We lay out the relevant costs before you decide.'],
  ['Do I have to start with the biggest option?', 'No. An informational site is a complete solution when your goal is credibility, information and inquiries. Further capabilities can be scoped later. We’ll review what that change requires rather than promise a one-click upgrade or free migration.'],
];

export default function WebsitesDomains() {
  return <div className="wd-page">
    <section className="site-shell wd-hero" aria-labelledby="wd-title">
      <div className="wd-topline"><Link href="/services" className="technical-note">← All services</Link><p className="eyebrow">Websites &amp; Domains</p></div>
      <div className="wd-hero-grid">
        <div><h1 id="wd-title">Your website.<br />Your domain.<br /><span>Handled.</span></h1><p className="wd-hero-description">A professional online presence. One trusted contact.<br className="wd-desktop-break" /> Far less to figure out.</p><div className="action-row"><a className="button-primary" href="mailto:hello@b-tec.org?subject=Website%20%26%20domain%20conversation">Let’s talk about your website <span aria-hidden="true">↗</span></a><a className="button-text" href="#capabilities">Explore the options <span aria-hidden="true">↓</span></a></div></div>
        <aside className="wd-offer" aria-label="Starting website offer"><p className="eyebrow">Professional websites from</p><p className="wd-big-price">$400<span> / build</span></p><p className="wd-price-terms">One-time build; ongoing services quoted separately.</p><div className="wd-offer-rule" /><p className="wd-offer-outcome">A real home for your business.<br /><span>Not another technical job.</span></p><p>Fast, professional informational websites. CMS editing included, so your content stays in your hands.</p><span className="wd-offer-foot">Built for speed, stability and sensible security.</span></aside>
      </div>
      <div className="wd-hero-foot"><span>Decades of hands-on experience.</span><span>One clear place to turn.</span></div>
    </section>

    <section className="site-shell wd-section" id="capabilities" aria-labelledby="capabilities-title"><div className="section-heading"><div><p className="eyebrow">01 / The right amount of website</p><h2 id="capabilities-title">What should your<br /><span>website do for you?</span></h2></div><p>Inform → Sell → Operate.<br />Choose the capability your business needs. Bigger isn’t automatically better.</p></div><CapabilityExplorer /></section>

    <section className="wd-management" aria-labelledby="management-title"><div className="site-shell wd-section"><div className="section-heading"><div><p className="eyebrow">02 / Connected, not complicated</p><h2 id="management-title">Two moving parts.<br /><span>One trusted contact.</span></h2></div><p>The website is the deliverable. The relationship is the service.</p></div>
      <div className="wd-connection" role="img" aria-label="Your website plus your domain connects to one trusted contact at b-tec"><div><span className="technical-note">The place people visit</span><strong>Your website</strong><span>Pages, content, functionality</span></div><span className="wd-connection-symbol" aria-hidden="true">+</span><div><span className="technical-note">The address they remember</span><strong>Your domain</strong><span>Registration, settings, renewals</span></div><span className="wd-connection-symbol" aria-hidden="true">→</span><div className="wd-contact-node"><span className="technical-note">The people you turn to</span><strong>b-tec</strong><span>One trusted contact</span></div></div>
      <div className="wd-care-grid"><div><h3>Someone who knows the setup.</h3><p>Help with technical settings and website or domain questions. Coordination of agreed renewals and upkeep. One competent company to turn to, instead of sorting through providers alone.</p></div><div><h3>“Not sure whether that notice is real? Send it to us.”</h3><p>A suspicious invoice, a renewal notice, a website warning: bring it to someone who knows your setup. Practical guidance helps reduce exposure and avoid mistakes; it doesn’t eliminate every scam or attack.</p></div></div>
      <div className="wd-cost-line"><span className="eyebrow">Clear scope. Clear costs.</span><p>The build is one project. Hosting, domain registration and renewals, and agreed care are quoted separately. We’ll define the responsibilities and costs together.</p></div>
    </div></section>

    <section className="site-shell wd-section wd-why" aria-labelledby="why-title"><div><p className="eyebrow">03 / Experience, with a better starting point</p><h2 id="why-title">The technology<br />has gotten cheaper.<br /><span>The confusion hasn’t.</span></h2></div><div className="wd-why-copy"><p>We have built, hosted and managed websites and domains for decades. This used to be much more difficult and took much longer.</p><p>Modern tools have dramatically reduced the cost of building a professional informational site. b-tec is expanding an established service and passing that efficiency along while keeping experienced, trustworthy help at the center.</p><p>You get a modern, lightweight website and a clear place to turn when the technical details get noisy.</p><span className="technical-note">Building websites since the nineteen hundreds.</span></div></section>

    <section className="site-shell wd-section wd-faq" aria-labelledby="faq-title"><div><p className="eyebrow">04 / Before we begin</p><h2 id="faq-title">Good questions.<br /><span>Plain answers.</span></h2></div><div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>

    <section className="site-shell wd-final" aria-labelledby="wd-final-title"><div className="wd-final-panel"><p className="eyebrow">New website. Existing domain. A simpler next step.</p><h2 id="wd-final-title">Let’s simplify your<br /><span>online presence.</span></h2><p>Tell us what you have and what you need. We’ll work out the right scope, together.</p><div className="action-row"><a className="button-primary" href="mailto:hello@b-tec.org?subject=Website%20%26%20domain%20conversation">Email hello@b-tec.org <span aria-hidden="true">↗</span></a><Link className="button-text" href="/contact">Use our contact page <span aria-hidden="true">→</span></Link></div></div></section>
  </div>;
}
