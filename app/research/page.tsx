import Image from 'next/image';
import Link from 'next/link';
import PanoramaTour from '@/components/PanoramaTour';

export default function ResearchPage() {
  const tracks = [
    {
      title: 'Personal Digital Twin Systems',
      desc: 'Client-specific OpenClaw instances with tailored behavior, memory foundations, and controlled autonomy for real-world personal leverage.',
    },
    {
      title: 'Autonomous Agent Operations',
      desc: 'Persistent agents running real workflows across API, shell, browser, and internal systems with human-overwatch guardrails.',
    },
    {
      title: 'Memory Architectures in the Wild',
      desc: 'Hybrid long-term memory models (file-based + vector retrieval + session memory) for continuity, decision recall, and context durability.',
    },
    {
      title: 'Proactive Systems & Event Triggers',
      desc: 'From reactive chat to proactive execution: heartbeat checks, cron orchestration, incident triggers, and morning briefings.',
    },
    {
      title: 'Creative Agentic Stacks',
      desc: 'Experimental combinations of open-source frameworks, orchestration layers, and model-routing strategies tuned for real production constraints.',
    },
  ];

  const principles = [
    'Real-world testing over demo theater',
    'Safety, observability, and rollback before scale',
    'Token-efficient, memory-first architectures',
    'Human judgment stays in the loop on consequential actions',
  ];

  return (
    <div className="min-h-screen bg-background text-foreground py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <p className="text-accent font-mono text-sm tracking-widest mb-4">b-tec // RESEARCH LAB</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Research & Experimental Systems</h1>
          <p className="text-lg md:text-xl text-foreground/70 max-w-4xl leading-relaxed">
            This page tracks the testing we are actively running: new architectures, autonomous agent workflows,
            memory systems, and creative stacks deployed in live environments.
            We publish what works, what breaks, and what we learn.
          </p>
        </div>

        <section className="my-12 rounded-3xl border border-accent/30 bg-accent/5 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="relative">
            <p className="text-accent font-mono text-xs tracking-widest mb-3">NEW PROJECT // PRIVATE BETA IN ACTIVE DEVELOPMENT</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">OSP — Open Storage Platform</h2>
            <p className="text-foreground/80 leading-relaxed mb-5 max-w-3xl">
              Storage management software a business can own instead of rent. Each client gets an isolated instance and
              database, a contractual path to leave with the full repo and a complete database export, and a human UI,
              REST API, and MCP/AI agent layer that all run through the same service, with server-enforced permissions
              and audit trails on every action.
            </p>
            <p className="text-foreground/70 leading-relaxed mb-8 max-w-3xl">
              Self-storage is the proving ground. The lock-in problem it solves is not specific to one industry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/osp"
                className="px-7 py-3 rounded-full bg-accent text-background font-bold hover:bg-accent-dim transition-all text-center"
              >
                Read the OSP Thesis
              </Link>
              <Link
                href="/osp#interest"
                className="px-7 py-3 rounded-full border border-white/20 text-foreground hover:bg-white/10 transition-all text-center"
              >
                Help Shape the Alternative
              </Link>
            </div>
          </div>
        </section>

        <section className="my-12 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Featured Stack: OpenClaw + memU Hybrid Architecture</h2>
              <p className="text-foreground/70 leading-relaxed mb-5">
                A proactive, memory-driven agent execution model where memU acts as the intelligence layer
                for pattern detection, priority extraction, and long-term context—while OpenClaw executes
                autonomous actions through tools and specialized agents.
              </p>
              <ul className="space-y-2 text-foreground/70">
                <li>• 24/7 monitoring + trigger-based execution</li>
                <li>• Continuous memory consolidation from outcomes</li>
                <li>• Multi-agent routing for SRE, support, and research tracks</li>
                <li>• Human-steerable control surface for high-trust operations</li>
              </ul>
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/20">
              <Image
                src="/research/openclaw-memu-hybrid.jpg"
                alt="OpenClaw + memU Hybrid AI Architecture Diagram"
                width={1400}
                height={900}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </section>

        <section className="my-16 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/[0.03] to-transparent p-6 md:p-10">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-accent font-mono text-xs tracking-widest mb-3">RESEARCH EXAMPLE // AUTOMATED IMAGING PIPELINE</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Automating Imaging Pipelines: 360 Scan to Web Panorama</h2>
              <p className="text-foreground/70 leading-relaxed max-w-3xl">
                For this simple PoC, a room was scanned into Matterport, 360 images from the media library were captured, and one of our digital agents embedded these images directly into
                the web experience as a small linked tour that it built on this page. This is a simple first step toward a broader imaging pipeline
                where spatial capture, asset extraction, optimization, publishing, and interactive presentation can be
                coordinated automatically by agents. (Image capture could be from many other sources. VPiX, 3DVista, EyeSpy360, etc.)
              </p>
            </div>
            <div className="rounded-2xl border border-accent/25 bg-accent/10 px-4 py-3 text-sm text-foreground/75 lg:max-w-xs">
              The implementation uses the actual 360 image assets, not a mockup, and renders it through a lightweight browser viewer.
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
            <div className="min-w-0">
              <PanoramaTour />
            </div>

            <div className="min-w-0 space-y-5">
              <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
                <h3 className="text-xl font-semibold mb-3">Workflow</h3>
                <ol className="space-y-3 text-foreground/70 leading-relaxed">
                  <li><span className="text-accent font-mono text-sm">01</span> Scan the room.</li>
                  <li><span className="text-accent font-mono text-sm">02</span> Capture or export equirectangular 360 images from each scan position.</li>
                  <li><span className="text-accent font-mono text-sm">03</span> Store the optimized image assets with the site and label each scan node.</li>
                  <li><span className="text-accent font-mono text-sm">04</span> Link nodes with visual hotspots so visitors understand how to move between positions.</li>
                </ol>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
                <h3 className="text-xl font-semibold mb-3">Extension path</h3>
                <p className="text-foreground/70 leading-relaxed">
                  The same pattern can support multi-room property documentation, visual operations logs, maintenance records,
                  before and after comparisons, and agent-assisted publishing flows where new spatial media is collected, labeled,
                  placed, optimized, and reviewed before it goes live.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="my-16">
          <h2 className="text-3xl font-bold mb-8">Active Research Tracks</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {tracks.map((track) => (
              <div key={track.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-xl font-bold mb-3 text-accent">{track.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{track.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="my-16 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/[0.03] to-transparent p-8 md:p-10">
          <p className="text-accent font-mono text-xs tracking-widest mb-3">CASE STUDY // SUMMER 2026</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Hermes Agents: Alix &amp; Bill</h2>
          <p className="text-foreground/80 leading-relaxed mb-8 max-w-3xl">
            This summer we ran a live multi-agent experiment on the Hermes runtime (Nous Research), separate from our
            OpenClaw stack, to see what a small team of specialized agents could actually get done unsupervised on
            real infrastructure.
          </p>
          <div className="mb-8 rounded-2xl overflow-hidden border border-white/10 bg-black/20 max-w-md">
            <Image
              src="/research/hermes-agentic-frameworks.png"
              alt="Hermes, the winged messenger, representing the Hermes agentic framework running Alix and Bill"
              width={1303}
              height={1207}
              className="w-full h-auto"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-white/10 bg-black/25 p-6">
              <p className="text-accent font-mono text-xs tracking-widest mb-2">AGENT 01</p>
              <h3 className="text-xl font-bold mb-3 text-foreground">Alix — Junior Dev &amp; White Hat</h3>
              <p className="text-foreground/70 leading-relaxed">
                Alix was built as a junior developer and white hat hacker: building internal tools and utilities,
                and red teaming larger apps and websites to surface real vulnerabilities before they become real
                problems.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 p-6">
              <p className="text-accent font-mono text-xs tracking-widest mb-2">AGENT 02</p>
              <h3 className="text-xl font-bold mb-3 text-foreground">Bill — Deployment &amp; Marketing</h3>
              <p className="text-foreground/70 leading-relaxed">
                Alix created Bill, a second Hermes instance on the same server, to help with deployment strategies
                and marketing for{' '}
                <Link href="/osp" className="text-accent hover:underline">OSP (Open Storage Platform)</Link>.
                Bill runs a much newer model version than Alix.
              </p>
            </div>
          </div>
          <p className="text-foreground/70 leading-relaxed mt-8 max-w-3xl">
            Alix and Bill are being run side by side as a live comparison: same runtime, different generations,
            different jobs. We are testing and comparing their capabilities for pre-production applications, including
            assisting clients with their own OSP deployments.
          </p>
        </section>

        <section className="my-16 rounded-3xl border border-accent/30 bg-accent/5 p-8 md:p-10">
          <p className="text-accent font-mono text-xs tracking-widest mb-3">NEW PROJECT</p>
          <h2 className="text-3xl font-bold mb-4">Personal Digital Twins</h2>
          <p className="text-foreground/80 leading-relaxed mb-5">
            b-tec is actively developing Personal Digital Twins: practical, client-specific systems that extend a human&apos;s output,
            decision speed, and operational range. At the base layer, this starts with a new OpenClaw instance tuned to one person
            through light training, workflow configuration, and memory alignment. From there, the stack can stay simple, or evolve
            into a highly sophisticated digital operating layer as goals, trust, and risk tolerance increase.
          </p>
          <div className="grid md:grid-cols-2 gap-8 text-foreground/75">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">What it is</h3>
              <ul className="space-y-2">
                <li>• A human-steered digital system that helps execute, prioritize, and remember</li>
                <li>• A spectrum: from lightweight assistant behavior to advanced multi-agent stack</li>
                <li>• Built to solve current problems while preparing clients for rapid AI capability shifts</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">What it is not</h3>
              <ul className="space-y-2">
                <li>• Not magic, not consciousness, and not a replacement for human judgment</li>
                <li>• Not a &ldquo;set and forget&rdquo; black box</li>
                <li>• Not suitable for low risk-tolerance environments at this stage</li>
              </ul>
            </div>
          </div>
          <p className="text-foreground/70 leading-relaxed mt-6">
            <strong>Transparency:</strong> this category is experimental and potentially disruptive. We frame this work for people with
            high risk tolerance, often digital builders who are done with status quo tooling and want to explore this frontier responsibly.
          </p>
          <p className="text-foreground/70 leading-relaxed mt-4">
            This project is directly informed by our recent blog posts:
            {' '}
            <a href="https://www.b-tec.org/blog/ClawPilled" className="text-accent hover:underline" target="_blank" rel="noreferrer">ClawPilled</a>
            {' '}for origin story and field motivation, and{' '}
            <a href="https://www.b-tec.org/blog/TheRunway" className="text-accent hover:underline" target="_blank" rel="noreferrer">The Runway</a>
            {' '}for context on the new technology category we are mapping.
          </p>
        </section>

        <section className="my-16 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 md:p-10">
          <h2 className="text-3xl font-bold mb-6">How We Test</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Field Conditions, Not Sandbox Theater</h3>
              <p className="text-foreground/70 leading-relaxed">
                We validate systems in operational settings: noisy inputs, mixed data quality, changing priorities,
                and imperfect environments. If it only works in a clean demo, it does not pass.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Design Principles</h3>
              <ul className="space-y-2 text-foreground/70">
                {principles.map((p) => (
                  <li key={p}>• {p}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-20 mb-6 rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Transparency Note</h2>
          <p className="text-foreground/70 leading-relaxed mb-4">
            This page was co-authored and published through an operational agentic workflow. b-tec (Brian) provided direction,
            source materials, and final approval; the implementation, formatting, and deployment actions were executed by
            btec&apos;s OpenClaw-connected agent as part of live site operations.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-5">
            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs font-mono text-foreground/50 mb-2 uppercase tracking-wider">Execution Context</p>
              <ul className="space-y-2 text-sm text-foreground/80 leading-relaxed">
                <li>• Prompt authored in b-tec&apos;s dedicated Discord web channel for site operations.</li>
                <li>• Channel routing is scoped to website work (content, SEO, design, deployment tasks).</li>
                <li>• Model profile for this channel is configured for controlled site-building workflows.</li>
                <li>• Messages are processed with sender/chat context isolation to prevent cross-thread leakage.</li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs font-mono text-foreground/50 mb-2 uppercase tracking-wider">Security & Access Controls</p>
              <ul className="space-y-2 text-sm text-foreground/80 leading-relaxed">
                <li>• GitHub access is token-scoped and limited to repository content operations.</li>
                <li>• Credentials are retrieved from a vault at runtime (not embedded in page code).</li>
                <li>• Deployment path uses GitHub commit events + Vercel auto-deploy with audit trail.</li>
                <li>• High-risk actions remain explicitly user-directed; no autonomous cross-channel posting.</li>
              </ul>
            </div>
          </div>

          <p className="text-foreground/70 leading-relaxed mb-4">
            Stack used for this page: Next.js app routing, GitHub repository commit pipeline, Vercel auto-deploy,
            OpenClaw tool orchestration, and an AI-assisted content/layout pass driven by real-time instruction.
          </p>

          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <p className="text-xs font-mono text-foreground/50 mb-2 uppercase tracking-wider">Prompt used</p>
            <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
              &ldquo;We need a new Research page that outlines testing we are doing, new systems and architectures we are trying out in the wild, and new creative agentic stacks like the one attached. can you properly frame out this page?&rdquo;
            </p>
          </div>
        </section>

        <section className="my-16 text-center rounded-3xl border border-accent/30 bg-accent/5 p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-4">Follow the Research Log</h2>
          <p className="text-foreground/70 max-w-3xl mx-auto mb-8 leading-relaxed">
            Ongoing write-ups, architecture notes, and deployment lessons are published in the b-tec blog.
            If you are building in this space and want to compare notes, reach out.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/blog"
              className="px-7 py-3 rounded-full bg-accent text-background font-bold hover:bg-accent-dim transition-all"
            >
              Read Research Posts
            </Link>
            <Link
              href="/contact"
              className="px-7 py-3 rounded-full border border-white/20 text-foreground hover:bg-white/10 transition-all"
            >
              Contact b-tec
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
