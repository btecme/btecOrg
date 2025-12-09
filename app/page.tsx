import Link from 'next/link';
import ParallaxBackground from '@/components/ParallaxBackground';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ParallaxBackground />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/10 via-background to-background opacity-50" />

        <div className="container mx-auto px-6 relative z-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50 pb-6">
            Future systems for<br />the age of AI.
          </h1>
          <p className="text-xl md:text-2xl text-foreground/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            b-tec builds resilient infrastructure and professional alignment strategies for organizations that want to stay standing.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/base"
              className="px-8 py-4 bg-accent text-background font-bold rounded-full hover:bg-accent-dim transition-all hover:scale-105"
            >
              Explore BASE
            </Link>
            <Link
              href="/alignment"
              className="px-8 py-4 border border-foreground/20 text-foreground font-medium rounded-full hover:bg-foreground/5 transition-all hover:border-foreground/40"
            >
              Professional Alignment
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-white/5 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Years Experience', value: '30+' },
              { label: 'Clients Served', value: '300+' },
              { label: 'Systems Built', value: '5,000+' },
              { label: 'Installs', value: '50,000+' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">{stat.value}</div>
                <div className="text-sm text-foreground/60 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="container mx-auto px-6 py-24">
        <h2 className="text-3xl md:text-4xl font-bold mb-20 text-center">Core Foundations</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: 'Cloud Solutions',
              desc: 'Robust, scalable cloud architecture that grows with your needs without locking you in.',
            },
            {
              title: 'Versatility',
              desc: 'From hardware to high-level strategy, we bridge the gap between physical and digital.',
            },
            {
              title: 'Solid Foundations',
              desc: 'We build systems that last, prioritizing stability and security over fleeting trends.',
            },
            {
              title: 'Customer Experience',
              desc: 'Direct, honest communication and support. No tickets into the void.',
            },
          ].map((prop) => (
            <div key={prop.title} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-accent/20 transition-colors">
              <h3 className="text-xl font-bold mb-4 text-foreground">{prop.title}</h3>
              <p className="text-foreground/60 leading-relaxed">{prop.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Teasers */}
      <section className="container mx-auto px-6 grid md:grid-cols-2 gap-12 pb-24">
        {/* BASE Teaser */}
        <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-8 md:p-12">
          <div className="relative z-10">
            <div className="text-accent text-sm font-bold tracking-widest mb-4">FLAGSHIP PRODUCT</div>
            <h3 className="text-3xl font-bold mb-4">BASE</h3>
            <p className="text-foreground/60 mb-8 max-w-md">
              The Git for human-AI cognition. A sovereign archive for your digital history.
            </p>
            <Link href="/base" className="text-accent hover:text-accent-dim font-medium inline-flex items-center gap-2">
              Learn more <span className="text-xl">→</span>
            </Link>
          </div>
          <div className="absolute right-0 bottom-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors" />
        </div>

        {/* Alignment Teaser */}
        <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-8 md:p-12">
          <div className="relative z-10">
            <div className="text-accent text-sm font-bold tracking-widest mb-4">PREMIUM SERVICE</div>
            <h3 className="text-3xl font-bold mb-4">Professional Alignment</h3>
            <p className="text-foreground/60 mb-8 max-w-md">
              Move from unstructured chaos to AI-ready systems. Optimizing data & workflows to leverage synthetic intellegence.
            </p>
            <Link href="/alignment" className="text-accent hover:text-accent-dim font-medium inline-flex items-center gap-2">
              Learn more <span className="text-xl">→</span>
            </Link>
          </div>
          <div className="absolute right-0 bottom-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-colors" />
        </div>
      </section>
    </div>
  );
}
