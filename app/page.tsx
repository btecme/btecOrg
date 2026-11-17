import type { Metadata } from 'next';
import Link from 'next/link';
import './homepage.css';

const title = 'IT Support, Technology Advisory & Property Services | b-tec';
const description = 'Practical IT support, cloud and security, technology modernization, and property-owner services. More than 30 years of hands-on experience. Tell b-tec what you need.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: 'https://www.b-tec.org/' },
  openGraph: { title, description, url: 'https://www.b-tec.org/', siteName: 'b-tec', type: 'website' },
  twitter: { card: 'summary', title, description },
};

const services = [
  {
    id: 'business-it', number: '01', title: 'Business IT & Support',
    problem: 'Something broken, unreliable, or harder than it should be?',
    description: 'Get help with hardware, cloud and email, backups, and security. Keep everyday systems in shape with managed endpoint support, updates, and monitoring.',
    href: '/services#cloud-it-solutions', label: 'Explore IT & support',
    related: [{ href: '/services/websites-domains', label: 'Websites & domains' }],
  },
  {
    id: 'modernization', number: '02', title: 'Modernization & Advisory',
    problem: 'Outgrown informal IT or a patchwork of vendors and workarounds?',
    description: 'Stabilize your technology, plan the next investment, and bring vendors into line. Virtual CIO guidance, clearer workflows, and practical automation start with sound foundations.',
    href: '/services#executive-it-stabilization', label: 'Explore modernization',
    related: [{ href: '/alignment', label: 'Data & workflow alignment' }],
  },
  {
    id: 'property-owners', number: '03', title: 'Property & Owner Services',
    problem: 'Planning a build, managing a project, or dealing with property damage?',
    description: 'Get help with residential and light commercial design and construction management, owner representation, and claims advocacy. Drone-assisted assessments document hard-to-reach areas.',
    href: '/services#design-construction', label: 'Explore property services',
    related: [{ href: '/services#owner-claims-advocacy', label: 'Owner & claims advocacy' }],
  },
];

const products = [
  { name: 'BASE', status: 'Active development · UI/UX alpha', description: 'A local-first archive for digital history and conversations with digital agents. Features remain in development.', href: '/base' },
  { name: 'BDF', status: 'Free Windows utility · Beta', description: 'A local, portable PDF utility for people and agents. In production use while development continues.', href: '/bdf' },
  { name: 'OSP', status: 'Private beta', description: 'Storage management software with isolated instances, portable data, and tools for people and digital agents.', href: '/osp' },
  { name: 'SHOW', status: 'Free web app', description: 'A private, local-first market logbook that helps vendors see which shows pay.', href: '/show' },
];

function Arrow() { return <span aria-hidden="true">↗</span>; }

export default function Home() {
  return (
    <div className="homepage-candidate">
      <section className="site-shell hp-hero" aria-labelledby="home-title">
        <div className="hp-topline"><p className="eyebrow">Adding Value. Building Trust.</p><p className="technical-note">30+ years of hands-on experience</p></div>
        <h1 id="home-title">IT that works.<br /><span>Projects that move forward.</span></h1>
        <p className="hp-intro">b-tec helps businesses and property owners solve practical problems: reliable IT, better systems and workflows, and hands-on support for construction and property claims.</p>
        <div className="action-row"><Link href="/contact" className="button-primary">Tell us what you need <Arrow /></Link><Link href="#services" className="button-text">Explore services <span aria-hidden="true">↓</span></Link></div>
        <nav className="hp-starting-points" aria-label="Find your service"><a href="#business-it">Business IT &amp; Support <Arrow /></a><a href="#modernization">Modernization &amp; Advisory <Arrow /></a><a href="#property-owners">Property &amp; Owner Services <Arrow /></a></nav>
      </section>

      <section id="services" className="site-shell hp-section" aria-labelledby="services-title">
        <div className="section-heading"><div><p className="eyebrow">01 / Services</p><h2 id="services-title">Start with what<br /><span>needs attention.</span></h2></div><p>A specific fix or a larger change. Find the right starting point, then tell us what is happening.</p></div>
        <div className="hp-service-grid">{services.map(service => <article className="hp-service" id={service.id} key={service.id}><p className="technical-note">/{service.number}</p><h3>{service.title}</h3><p className="hp-problem">{service.problem}</p><p className="hp-service-description">{service.description}</p><div className="hp-service-links"><Link href={service.href} className="button-text">{service.label} <Arrow /></Link>{service.related.map(link => <Link className="hp-related" href={link.href} key={link.href}>{link.label} <Arrow /></Link>)}</div></article>)}</div>
        <div className="hp-service-foot"><p>See the full scope, from repairs and ongoing support to strategic and property work.</p><Link href="/services" className="button-text">View all services <Arrow /></Link></div>
      </section>

      <section id="experience" className="hp-evidence-band" aria-labelledby="experience-title"><div className="site-shell hp-section">
        <div className="section-heading"><div><p className="eyebrow">02 / Experience you can examine</p><h2 id="experience-title">Decades of practice.<br /><span>Work you can look at.</span></h2></div><p>More than 30 years across IT, architecture, and digital design. Here are examples of how we approach the work.</p></div>
        <div className="hp-evidence-grid">
          <article><p className="hp-evidence-label">The long view</p><h3>Experience across disciplines</h3><p>Hands-on technical work and an understanding of the physical systems and people around it.</p><Link href="/about" className="button-text">About the practice <Arrow /></Link></article>
          <article><p className="hp-evidence-label">Working example · Research</p><h3>From room scan to web tour</h3><p>Actual 360° capture assets, linked and rendered as an explorable browser panorama. A documented proof of concept, not a client case study.</p><Link href="/research" className="button-text">Explore the research example <Arrow /></Link></article>
          <article><p className="hp-evidence-label">Published working standards</p><h3>See what guides the build</h3><p>Our public design, responsiveness, and API standards make the thinking behind our systems open to inspection.</p><Link href="/standards" className="button-text">Read the standards <Arrow /></Link></article>
        </div>
      </div></section>

      <section className="site-shell hp-section" aria-labelledby="start-title">
        <div className="section-heading"><div><p className="eyebrow">03 / Getting started</p><h2 id="start-title">Bring the problem.<br /><span>Let’s define the work.</span></h2></div><p>A hardware repair, a website, or a multi-site technology plan. You do not need a finished brief to make an inquiry.</p></div>
        <ol className="hp-steps">
          <li><span className="technical-note" aria-hidden="true">01</span><h3>Tell us what you need</h3><p>Describe what you want to fix, build, or improve. Include what you have now and any constraints that matter.</p></li>
          <li><span className="technical-note" aria-hidden="true">02</span><h3>Define the scope</h3><p>Use the conversation to clarify the work, priorities, and whether the service is a fit.</p></li>
          <li><span className="technical-note" aria-hidden="true">03</span><h3>Agree the next step</h3><p>Discuss the proposed scope, responsibilities, and costs before deciding how to proceed.</p></li>
        </ol>
        <p className="hp-process-note">Specific offerings have their own scope and terms. <Link href="/alignment">Professional Alignment</Link> is a separate, high-touch engagement.</p>
      </section>

      <section id="products" className="site-shell hp-section hp-explore" aria-labelledby="products-title">
        <div className="section-heading"><div><p className="eyebrow">04 / Products &amp; exploration</p><h2 id="products-title">Useful tools.<br /><span>Room for what’s next.</span></h2></div><p>Our products and research sit alongside our services. Each project has its own availability and stage of development.</p></div>
        <div className="product-grid">{products.map(product => <Link href={product.href} key={product.name} className="product-panel"><p className="technical-note hp-product-status">{product.status}</p><div className="product-name-row"><h3>{product.name}</h3><span className="product-arrow"><Arrow /></span></div><p>{product.description}</p><div className="product-bottom"><span>Explore {product.name}</span><span aria-hidden="true">→</span></div></Link>)}</div>
        <p className="hp-research-note">Experimental systems are research, not a promise of a supported commercial service. Current capabilities, limits, and access details stay on each project page.</p>
        <div className="hp-explore-grid">
          <article><p className="eyebrow">Research</p><h3>What we’re testing</h3><p>Digital agents, memory systems, and new workflows. Field notes include what works, what breaks, and what is still experimental.</p><Link href="/research" className="button-text">Visit the research lab <Arrow /></Link></article>
          <article><p className="eyebrow">Public-good work</p><h3>Useful knowledge, shared</h3><p>Open standards and public security information are part of the practice. The transparency console explains this page’s data use and shows the public vulnerability feed.</p><div className="hp-public-links"><Link href="/first-principles" className="button-text">Our first principles <Arrow /></Link><a href="#console-security" className="button-text">Security &amp; transparency <Arrow /></a></div></article>
        </div>
      </section>

      <section className="site-shell hp-closing" aria-labelledby="contact-title"><p className="eyebrow">A clear next step</p><h2 id="contact-title">What needs<br /><span>your attention?</span></h2><p>A computer that is not working, a system you have outgrown, or a property project that needs direction. Tell us what you have and what you need to change.</p><Link href="/contact" className="button-primary">Tell us what you need <Arrow /></Link></section>
    </div>
  );
}
