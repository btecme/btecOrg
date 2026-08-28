import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'First Principles | b-tec',
  description:
    'The principles behind how b-tec designs systems: balance, transparency, simplicity, resilience, independence, and technology that stays out of the way.',
  openGraph: {
    title: 'First Principles | b-tec',
    description:
      'The principles behind how b-tec designs systems: balance, transparency, simplicity, resilience, independence, and technology that stays out of the way.',
    url: 'https://www.b-tec.org/first-principles',
    siteName: 'b-tec',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'First Principles | b-tec',
    description:
      'The principles behind how b-tec designs systems: balance, transparency, simplicity, resilience, independence, and technology that stays out of the way.',
  },
};

const derived = [
  {
    title: 'Start With Reality',
    body: "A well-defined problem is half solved. Before choosing technology, we define what success actually looks like, and we ask three plain questions: is it true, does it work, what does it cost. We try to understand existing workflows, habits, and constraints without judgment. Technology should follow problem definition, not precede it.",
  },
  {
    title: 'Prefer Simplicity, Not Simplism',
    body: 'Do more with less. Reduce unnecessary dependencies, add redundancy where the cost of failure justifies it, and keep a reliable source of truth. Documentation should be minimal, practical, and centralized. Good systems reduce complexity without pretending complexity does not exist, and they should be understandable by whoever inherits them tomorrow.',
  },
  {
    title: 'Design for Change and Failure',
    body: "Systems degrade. People change, organizations change, vendors change, requirements change, and failures eventually happen. So we plan for degradation, design for recovery, preserve portability, and monitor what actually matters. Downtime may be inevitable. Recovery time is designable.",
  },
  {
    title: 'Ship, Learn, Improve',
    body: 'Perfect is not a useful target. We build the smallest safe, useful system, put it into real use, and observe what happens. User feedback reveals needs that planning cannot. Reversible decisions move fast; irreversible ones get more care. Analysis paralysis has a cost too.',
  },
  {
    title: 'Automate What Should Exist',
    body: "Automation is a force multiplier. It magnifies good workflows and dysfunctional ones equally, so we fix the workflow before automating it, and structure the data before asking automation or AI to reason over it. Deterministic software, automation, probabilistic AI, autonomous agents, and human judgment each have an appropriate role. There are no magic buttons.",
  },
  {
    title: 'Design for Independence',
    body: "Users and organizations should retain meaningful control over the systems their businesses depend on: data portability, understandable architecture, replaceable infrastructure, and credible exit paths. Software should serve the business. Portability is a feature. Exit should be considered during architecture, not during a breakup.",
  },
];

const healthy = [
  'Context over dogma',
  'Iteration over perfection',
  'Transparency',
  'Measurable outcomes',
  'Reversibility',
  'Clear ownership',
  'Graceful failure',
  'Continuous improvement',
  'Evidence over assumption',
];

const unhealthy = [
  'Perfection as a prerequisite for progress',
  'Arbitrary concepts of "worthiness"',
  'Rigid "always" and "never" thinking',
  '"That\u2019s how we\u2019ve always done it"',
  'Complexity for its own sake',
  'Documentation nobody can realistically use',
  'Automation applied to broken workflows',
  'Analysis paralysis',
  'Lock-in created primarily to prevent customer exit',
];

export default function FirstPrinciplesPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero */}
      <section className="container mx-auto px-6 pt-16 pb-20 md:pt-20 md:pb-28 max-w-3xl">
        <p className="text-accent font-mono text-sm tracking-widest mb-4">b-tec // FIRST PRINCIPLES</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">First Principles</h1>
        <p className="text-lg md:text-xl text-foreground/70 leading-relaxed">
          Good systems begin with clear thinking. This is the thinking underneath everything b-tec builds:
          software, infrastructure, automation, AI, and the products that come out of it.
        </p>
      </section>

      {/* The Fundamentals - the visual and philosophical center */}
      <section className="border-y border-white/5 bg-white/[0.02]">
        <div className="container mx-auto px-6 py-20 md:py-28 max-w-4xl">
          <p className="text-sm font-mono tracking-widest text-foreground/40 mb-12 text-center uppercase">
            The Fundamentals
          </p>

          <div className="mb-16 md:mb-20 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-accent mb-6">Balance</h2>
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
              Every system exists among competing forces: security, usability, simplicity, control,
              freedom, performance, resilience, cost, speed, maintainability, automation, human judgment.
              Good design does not blindly maximize one variable. The appropriate solution depends on the
              actual problem, the actual risks, and the actual people involved.
            </p>
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mt-6">
              Even good ideas become harmful without it. Transparency without restraint becomes noise.
              Security without regard for usability creates friction and workarounds. Automation without
              judgment amplifies dysfunction. Redundancy without restraint creates complexity. The objective
              is not maximum anything. The objective is the right balance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 md:gap-8 max-w-3xl mx-auto pt-10 border-t border-white/10">
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-3">Transparency</h3>
              <p className="text-foreground/70 leading-relaxed">
                Systems should be understandable: how something works, what it costs, where the data
                lives, what assumptions were made, what limitations remain. Show the work. Where practical,
                trust should be replaceable by verification.
              </p>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-3">Good Design Is Mostly Invisible</h3>
              <p className="text-foreground/70 leading-relaxed">
                The best systems disappear into the work. Good design removes unnecessary decisions, steps,
                and cognitive overhead. Complexity may still exist underneath, but people shouldn&apos;t have
                to carry it just because the system does.
              </p>
            </div>
          </div>

          <p className="text-center text-foreground/50 text-sm mt-12 max-w-xl mx-auto leading-relaxed">
            Transparency and invisible design pull in different directions. Balance is what keeps either one
            from going too far: show enough to be understood, hide enough to stay out of the way and allow flow.
          </p>
        </div>
      </section>

      {/* Principles in Practice */}
      <section className="container mx-auto px-6 py-20 md:py-28 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">Principles in Practice</h2>
        <p className="text-foreground/60 mb-12 max-w-2xl leading-relaxed">
          This what those three fundamentals look like once they meet an actual system.
        </p>
        <div className="space-y-10">
          {derived.map((d) => (
            <div key={d.title} className="pb-10 border-b border-white/5 last:border-0 last:pb-0">
              <h3 className="text-lg md:text-xl font-bold mb-3 text-foreground">{d.title}</h3>
              <p className="text-foreground/70 leading-relaxed">{d.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Healthy / Unhealthy patterns */}
      <section className="border-y border-white/5 bg-white/[0.02]">
        <div className="container mx-auto px-6 py-20 md:py-24 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-10">What We Embrace, What We Reject</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <p className="text-sm font-mono tracking-widest text-accent mb-4 uppercase">Healthy</p>
              <ul className="space-y-3">
                {healthy.map((h) => (
                  <li key={h} className="text-foreground/75 leading-relaxed flex gap-3">
                    <span className="text-accent">&bull;</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-mono tracking-widest text-foreground/40 mb-4 uppercase">Rejected</p>
              <ul className="space-y-3">
                {unhealthy.map((u) => (
                  <li key={u} className="text-foreground/50 leading-relaxed flex gap-3">
                    <span className="text-foreground/30">&bull;</span>
                    <span>{u}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The River */}
      <section className="container mx-auto px-6 py-20 md:py-24 max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">New Systems and the Cloudy River</h2>
        <p className="text-foreground/70 leading-relaxed mb-4">
          Implementing a new system can resemble dredging a river. Long-settled sediment gets disturbed,
          and for a while the water looks worse. That sediment is hidden work, inconsistent data, tribal
          knowledge, manual workarounds, undocumented exceptions. The new system did not create those
          problems. It made them visible.
        </p>
        <p className="text-foreground/70 leading-relaxed mb-8">
          Visibility usually arrives before optimization. Once the sediment clears and inputs stabilize,
          the system gets clearer, faster, and less dependent on hidden manual effort, which improves flow.
        </p>
        <p className="text-foreground/90 leading-relaxed font-medium">
          Temporary turbulence is expected.
          <br />
          The sediment was already there.
          <br />
          Clarity now reduces rework later.
        </p>
      </section>

      {/* Closing */}
      <section className="border-t border-white/5">
        <div className="container mx-auto px-6 py-20 md:py-24 max-w-2xl text-center">
          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-10">
            These principles guide how we design infrastructure, software, automation, and intelligent
            systems. The tools will change. These fundamentals will survive.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
            <Link href="/research" className="text-accent hover:text-accent-dim font-medium">
              Research
            </Link>
            <span className="hidden sm:inline text-foreground/20">/</span>
            <Link href="/osp" className="text-accent hover:text-accent-dim font-medium">
              Open Storage Platform
            </Link>
            <span className="hidden sm:inline text-foreground/20">/</span>
            <Link href="/about" className="text-accent hover:text-accent-dim font-medium">
              About b-tec
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
