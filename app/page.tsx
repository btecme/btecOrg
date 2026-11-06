import Link from 'next/link';

const products = [
  { id: '01', name: 'BASE', type: 'Sovereign archive', description: 'The Git for human and digital agent cognition. A sovereign archive for your digital history.', href: '/base', detail: 'Keep your history. Own your foundation.' },
  { id: '02', name: 'BDF', type: 'PDF utility · Beta', description: 'A PDF utility for people and agents. Local, portable, and built around one architecture for the desktop, command line, and agent access.', href: '/bdf', detail: 'One service. Every interface.' },
  { id: '03', name: 'OSP', type: 'Open Storage Platform', description: 'Modern storage management software a business can own. Isolated instances, portable data, and an agent-native service layer.', href: '/osp', detail: 'Your operation. Your data.' },
  { id: '04', name: 'SHOW', type: 'Market vendor platform', description: 'Log a market in three taps and see which shows actually pay. A private, local-first tool for market vendors.', href: '/show', detail: 'Know which shows pay.' },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? '↗' : '→'}</span>;
}

export default function Home() {
  return (
    <div className="home-refresh">
      <section className="home-hero site-shell" aria-labelledby="home-title">
        <div className="hero-topline"><p className="eyebrow">Independent thinking. Practical technology.</p><span className="technical-note">b-tec / future systems</span></div>
        <div className="hero-composition">
          <div className="hero-copy">
            <h1 id="home-title">Future systems for the age of <span>digital intelligence.</span></h1>
            <p className="hero-description">b-tec builds resilient infrastructure and professional alignment strategies for organizations that want to stay standing.</p>
            <div className="action-row"><Link href="/services" className="button-primary">Explore our services <Arrow /></Link><Link href="#products" className="button-text">Meet the products <Arrow diagonal /></Link></div>
          </div>
          <div className="system-map" aria-label="b-tec connects infrastructure, software, digital agents, and people around user value" role="img">
            <div className="map-caption"><span>Built around you</span><span>01 / 04</span></div>
            <div className="map-field" aria-hidden="true">
              <div className="map-orbit orbit-outer" /><div className="map-orbit orbit-inner" />
              <div className="map-line horizontal" /><div className="map-line vertical" />
              <div className="map-core"><span className="map-core-symbol">b.</span><span>User value</span></div>
              <span className="map-node node-top">Infrastructure</span><span className="map-node node-right">Software</span><span className="map-node node-bottom">Digital agents</span><span className="map-node node-left">People</span>
              <span className="map-cross cross-one">+</span><span className="map-cross cross-two">+</span>
            </div>
            <div className="map-caption map-bottom"><span>Human direction.<br />Connected systems.</span><span className="map-signal"><i /> b-tec built</span></div>
          </div>
        </div>
        <a className="hero-scroll technical-note" href="#experience"><span aria-hidden="true">↓</span> Explore the practice</a>
      </section>

      <section id="experience" className="experience-band" aria-label="Experience in numbers">
        <div className="site-shell experience-grid">{[
          { label: 'Years experience', value: '30+' }, { label: 'Clients served', value: '300+' }, { label: 'Systems built', value: '5,000+' }, { label: 'Installs', value: '50,000+' },
        ].map(stat => <div key={stat.label} className="experience-item"><p>{stat.value}</p><span>{stat.label}</span></div>)}</div>
      </section>

      <section id="products" className="site-shell home-section" aria-labelledby="products-title">
        <div className="section-heading"><div><p className="eyebrow">01 / Products</p><h2 id="products-title">Useful software.<br /><span>Built with purpose.</span></h2></div><p>Tools shaped by real work, with user value at the center of every decision.</p></div>
        <div className="product-grid">{products.map(product => <Link href={product.href} key={product.name} className="product-panel"><div className="product-top"><span className="technical-note">{product.type}</span><span className="product-index">/{product.id}</span></div><div className="product-name-row"><h3>{product.name}</h3><span className="product-arrow"><Arrow diagonal /></span></div><p>{product.description}</p><div className="product-bottom"><span>{product.detail}</span><span aria-hidden="true">→</span></div></Link>)}</div>
      </section>

      <section className="approach-band" aria-labelledby="approach-title"><div className="site-shell approach-layout"><div><p className="eyebrow">02 / The b-tec approach</p><h2 id="approach-title">User value.<br />First.</h2></div><div className="approach-copy"><p>Technology earns its place by making life better for the people using it.</p><p>Decades of hands-on work inform how we build: clear thinking, solid foundations, and systems that keep working as your needs evolve.</p><Link href="/first-principles" className="button-text">Our first principles <Arrow diagonal /></Link></div></div></section>

      <section className="site-shell home-section" aria-labelledby="foundations-title"><div className="section-heading"><div><p className="eyebrow">03 / The practice</p><h2 id="foundations-title">A strong foundation.<br /><span>Room to move forward.</span></h2></div><Link href="/services" className="button-text">All services <Arrow diagonal /></Link></div><div className="foundation-list">{[
        { title: 'Cloud solutions', desc: 'Robust, scalable cloud architecture that grows with your needs.', href: '/services#cloud-it-solutions' },
        { title: 'Versatility', desc: 'From hardware to high-level strategy, we bridge the gap between physical and digital.', href: '/services' },
        { title: 'Solid foundations', desc: 'Stability, security, and carefully built systems that last.', href: '/services#security-consulting' },
        { title: 'Customer experience', desc: 'Direct, honest communication and support from people who know your systems.', href: '/contact' },
      ].map((item,i) => <Link href={item.href} className="foundation-row" key={item.title}><span className="technical-note">0{i+1}</span><h3>{item.title}</h3><p>{item.desc}</p><Arrow diagonal /></Link>)}</div></section>

      <section className="site-shell alignment-section"><div className="alignment-panel"><div><p className="eyebrow">Professional alignment</p><h2>Bring your systems<br />into alignment.</h2><p>Organize your data and workflows for the possibilities of digital intelligence.</p></div><Link href="/alignment" className="button-primary">Explore alignment <Arrow /></Link></div></section>

      <section className="site-shell home-contact" aria-labelledby="contact-title"><p className="eyebrow">Let’s build what comes next</p><h2 id="contact-title">Good work starts<br />with a conversation.</h2><Link href="/contact" className="button-primary">Talk with b-tec <Arrow diagonal /></Link></section>
    </div>
  );
}
