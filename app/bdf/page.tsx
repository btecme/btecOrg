import Link from 'next/link';
import type { Metadata } from 'next';

const TITLE = 'BDF — A PDF utility for people and agents';
const DESCRIPTION =
  'BDF is a free Windows PDF utility built on one consistent service behind its desktop app, command line, and agent access. Local-first, and built by b-tec.';
const PAGE_URL = 'https://www.b-tec.org/bdf';
const OG_IMAGE = 'https://www.b-tec.org/images/bdf/bdf-og-1200x630.jpg';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: 'b-tec',
    type: 'website',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const fundamentals = [
  {
    title: 'One Service, Every Interface',
    body: 'The desktop app, the command line, and agent access all run through the same underlying operations. Nothing is a separate reimplementation bolted on after the fact, so a person and an agent working on the same document are doing the exact same things.',
  },
  {
    title: 'Local by Default',
    body: 'Documents stay on your computer. Ordinary use requires no cloud account, and portable delivery means getting started is as straightforward as extracting a folder and launching the app.',
  },
  {
    title: 'Agent Access, Not a Bolt-On',
    body: 'A connected agent calls explicit tools (open, find text, render a page, rotate, save) instead of clicking around the screen. Access is opt-in, grants are scoped, and every action is enforced and logged by BDF itself.',
  },
];

export default function BdfPage() {
  return (
    <div className="min-h-screen bg-background text-foreground py-24 px-6">
      {/* Hero */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <p className="text-accent font-mono text-sm tracking-widest mb-4">BETA // WINDOWS PDF UTILITY</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-5">BDF</h1>
        <p className="text-xl md:text-2xl text-foreground/80 font-medium leading-snug mb-4">
          A PDF utility for people and agents.
        </p>
        <p className="text-foreground/60 max-w-xl mx-auto leading-relaxed">
          Built by b-tec on one architecture behind the desktop app, the command line, and agent access, to bring you
          a first-class experience without hooks, bargaining, or tantrums.
        </p>
      </div>

      {/* The b-tec Approach */}
      <section className="max-w-4xl mx-auto mb-16 text-center">
        <p className="text-accent font-mono text-xs tracking-widest mb-3">THE B-TEC APPROACH</p>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">User Value First</h2>
        <p className="text-foreground/70 leading-relaxed max-w-2xl mx-auto mb-6">
          Legacy SaaS adds features to justify the next price increase and asks you to live with its roadmap. b-tec
          builds the opposite way: software judged by the value it gives the person using it, not the subscription
          it protects.
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-3">
          {['No bloat', 'Fast', 'Resilient', 'Portable', 'Smart', 'Dynamic'].map((trait) => (
            <li
              key={trait}
              className="px-4 py-1.5 rounded-full border border-accent/30 bg-accent/5 text-sm text-foreground/80"
            >
              {trait}
            </li>
          ))}
        </ul>
      </section>

      {/* Why Free */}
      <section className="max-w-4xl mx-auto mb-16">
        <div className="rounded-2xl border border-accent/30 bg-accent/5 p-8 md:p-10 text-center">
          <p className="text-accent font-mono text-xs tracking-widest mb-3">WHY FREE?</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">We Don&rsquo;t Need to Make Money on Everything</h2>
          <p className="text-foreground/70 leading-relaxed max-w-2xl mx-auto mb-4">
            People ask why we&rsquo;re just giving BDF away. Fair question, and an honest one deserves an honest
            answer: we don&rsquo;t need to monetize every single thing we build.
          </p>
          <p className="text-foreground/70 leading-relaxed max-w-2xl mx-auto mb-6">
            A PDF utility doesn&rsquo;t need to be a profit center to be worth building well. What it needs to be is
            the one PDF tool an organization can standardize on, instead of juggling several different licenses,
            patch schedules, and renewal dates across departments. One utility. One support surface. One less piece
            of tech debt nobody budgeted for.
          </p>
          <p className="text-foreground/90 font-medium">
            Free isn&rsquo;t the strategy. Less overhead for the people using it is.
          </p>
        </div>
      </section>

      {/* The Fundamentals */}
      <section className="max-w-5xl mx-auto mb-16">
        <p className="text-accent font-mono text-xs tracking-widest mb-3 text-center md:text-left">THE FUNDAMENTALS</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center md:text-left">What&rsquo;s Actually Different</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {fundamentals.map((f) => (
            <div key={f.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold mb-3 text-accent">{f.title}</h3>
              <p className="text-foreground/70 text-sm leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What BDF is today */}
      <section className="max-w-5xl mx-auto mb-16">
        <p className="text-accent font-mono text-xs tracking-widest mb-3 text-center md:text-left">WHAT BDF IS</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center md:text-left">A PDF Utility, Built Carefully</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold mb-3 text-accent">Today</h3>
            <ul className="space-y-2 text-foreground/70 text-sm leading-relaxed">
              <li>&bull; Clean, familiar controls for the common work: open, find, comment, fill a form, organize pages, save.</li>
              <li>&bull; Careful attention to responsiveness and reliable saving, protecting your working edits.</li>
              <li>&bull; Local and portable: documents stay on your computer, with no cloud account for ordinary use.</li>
              <li>&bull; Command-line and MCP tools for connecting a compatible digital agent.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold mb-3 text-accent">Status</h3>
            <p className="text-foreground/70 text-sm leading-relaxed">
              <strong className="text-foreground">Beta.</strong> Private testing is complete, and BDF has moved into
              its portable deployment phase, used in production on the open-source PdfCraft foundation and developed
              further in b-tec&rsquo;s own direction. CLI/MCP capabilities continue to expand toward full feature
              parity across the desktop, CLI, and agent interfaces.
            </p>
          </div>
        </div>
      </section>

      {/* How it's being built */}
      <section className="max-w-5xl mx-auto mb-20">
        <p className="text-accent font-mono text-xs tracking-widest mb-3 text-center md:text-left">
          HOW IT&rsquo;S BEING BUILT
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center md:text-left">Two Different Jobs for Agents</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/10 bg-black/25 p-6">
            <p className="text-xs font-mono text-foreground/50 mb-2 uppercase tracking-wider">Agents helping build BDF</p>
            <h3 className="text-xl font-semibold mb-3 text-foreground">The build loop</h3>
            <p className="text-foreground/70 text-sm leading-relaxed">
              Human product direction, agent implementation, independent review, and real testing in the actual
              Windows application form a continuing feedback loop. The objective is useful software people can work
              with, and each testing round informs the next improvement.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/25 p-6">
            <p className="text-xs font-mono text-foreground/50 mb-2 uppercase tracking-wider">Agents using BDF</p>
            <h3 className="text-xl font-semibold mb-3 text-foreground">Working with your documents</h3>
            <p className="text-foreground/70 text-sm leading-relaxed">
              Through BDF&rsquo;s CLI and MCP tools, a connected digital agent can open and inspect PDFs, find text,
              render pages, rotate pages, and save results, working through explicit application tools instead of
              clicking around the screen. Access is opt-in: grants define which files and operations an agent may
              use, permissions are enforced by BDF, and activity is recorded for review.
            </p>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="max-w-2xl mx-auto text-center">
        <p className="text-foreground/70 leading-relaxed mb-8">
          BDF is in Beta, and it&rsquo;s being built the way most of what we publish here is built: with agents, in
          view of what works and what&rsquo;s still being proven as it moves toward a broader release. The research
          log tracks where it goes next, and the project itself is open to look at.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/research#bdf"
            className="px-7 py-3 rounded-full bg-accent text-background font-bold hover:bg-accent-dim transition-all"
          >
            Follow the Research Note
          </Link>
          <a
            href="https://github.com/btecme/bdf"
            target="_blank"
            rel="noreferrer"
            className="px-7 py-3 rounded-full border border-white/20 text-foreground hover:bg-white/10 transition-all"
          >
            View the BDF Project
          </a>
        </div>
      </section>
    </div>
  );
}
