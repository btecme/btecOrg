import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OSP — Open Storage Platform | b-tec Research',
  description:
    'OSP is modern storage management software a business can own instead of rent. Isolated instances, portable data, and an agent-native service layer. Self-storage first, not self-storage only.',
};

const failures = [
  {
    title: 'The Per-Unit Tax',
    body: 'Pricing scales with unit count, not with value delivered. Grow the business and the software gets a bigger cut of it, every month, forever.',
  },
  {
    title: 'Closed by Design',
    body: 'Data access, integrations, and automation are gated behind what the vendor decides to expose. The operator rents visibility into their own operation.',
  },
  {
    title: 'You Absorb Their Roadmap',
    body: 'Price increases, feature changes, acquisitions, and end-of-life decisions land on the operator with no vote and no recourse.',
  },
  {
    title: 'Switching Is the Punishment',
    body: 'Migration friction is not an accident. Lock-in is part of the business model, and everyone building it knows that.',
  },
  {
    title: 'Built for Clicking, Not for Agents',
    body: 'Most platforms assume a human clicking through screens. Businesses are increasingly run through APIs, automation, and AI agents. The category has not caught up.',
  },
];

const thesisPoints = [
  {
    title: 'Isolated',
    body: 'Each client runs its own instance and its own database. No shared multi-tenant blob holding your data next to a competitor\u2019s.',
  },
  {
    title: 'Portable',
    body: 'Hosted clients get a contractual path to leave, with the repo and a complete database export. Ownership means being able to walk.',
  },
  {
    title: 'Yours, Financially',
    body: 'The client always owns its Stripe account. Money moves through the client\u2019s infrastructure, not ours.',
  },
  {
    title: 'Agent-Native',
    body: 'The human UI, the REST API, and MCP/AI agents all run through the same service layer. Nothing is a second-class integration bolted on later.',
  },
  {
    title: 'Governed Autonomy',
    body: 'Agent actions carry server-enforced permissions, approval gates, idempotency, and audit trails. Automation without a paper trail is not a feature.',
  },
];

const builtFeatures = [
  'Unit inventory and status board: full CRUD, search, and real-time availability across every facility',
  'Tenant records and lease lifecycle: move-in and move-out run as resumable, auditable workflows, not simple status flags',
  'Stripe card payments and manually recorded cash/check, both driven by a dedicated payment state machine so a failed or disputed charge never corrupts the books',
  'Automated recurring billing: nightly rent charges, late fees, and prorated move-ins and move-outs',
  'Append-only financial ledger, reconciled to the penny, with balances always computed and never stored',
  'Delinquency tracking and end-of-day, occupancy, and receivables reporting, available through the API as well as the UI',
  'Append-only audit log on every state change, human or agent-initiated, recording actor, action, and before/after values',
  'Agent-native by design: every operation above is exposed as both a REST API and an MCP tool, so an AI agent runs the business through the identical service layer a staff member uses, not a bolted-on integration',
  'Security enforced at the database, not just the app: row-level tenant isolation, idempotency keys on every money-moving action, and approval gates that route anything above a configurable threshold to a human review queue, even when an agent initiated it',
];

export default function OSPPage() {
  return (
    <div className="min-h-screen bg-background text-foreground py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Hero */}
        <div className="mb-16">
          <p className="text-accent font-mono text-sm tracking-widest mb-4">b-tec // OSP RESEARCH</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-[1.1]">
            Stop being a tenant of your own software.
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 max-w-3xl leading-relaxed mb-8">
            b-tec built OSP, the Open Storage Platform: an owner-controlled, agent-native, healthy
            alternative to a rented storage-management SaaS.
          </p>
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-accent/30 bg-accent/10 w-fit">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-mono text-foreground/80">Private beta is active</span>
            </div>
            <div className="w-full max-w-[220px] aspect-[9/16] rounded-2xl overflow-hidden border border-white/10 bg-black/20">
              <video
                className="w-full h-full object-cover"
                src="https://media.b-tec.org/OSP/PreviewOSP.mp4"
                title="OSP — 90 second preview"
                controls
                playsInline
                preload="metadata"
              />
            </div>
          </div>
        </div>

        {/* The category is overdue for a reset */}
        <section className="my-20">
          <div className="mb-4 text-accent font-mono text-xs tracking-widest">01 / THE RESET</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">The storage software category is overdue for a reset.</h2>
          <p className="text-lg text-foreground/70 leading-relaxed max-w-3xl">
            Storage-management software became critical infrastructure for thousands of operators, and then quietly
            became a landlord over that infrastructure. Per-unit SaaS pricing, closed data, and structural lock-in
            were never inevitable. They were a business model choice, made at a time when there was no practical
            alternative.
          </p>
        </section>

        {/* Structural failures */}
        <section className="my-20 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-10">
          <div className="mb-4 text-accent font-mono text-xs tracking-widest">02 / THE FAILURES</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-10">Five ways the current model works against you.</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {failures.map((f) => (
              <div key={f.title} className="rounded-2xl border border-white/10 bg-black/20 p-6">
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why we're building this */}
        <section className="my-20">
          <div className="mb-4 text-accent font-mono text-xs tracking-widest">03 / WHY WE&apos;RE BUILDING THIS</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-8">This didn&apos;t start as a startup idea.</h2>
          <div className="max-w-3xl space-y-6 text-lg text-foreground/80 leading-relaxed">
            <p>
              For decades, b-tec has supported storage businesses and the legacy management systems they depend on.
              We&apos;ve worked with the software companies, lived through their limitations, built around their closed
              systems, and helped clients absorb the consequences: rising fees, forced changes, weak interoperability,
              and technology aging in place because switching cost too much.
            </p>
            <p>
              We kept waiting for a better option. It never arrived.
            </p>
            <p className="text-foreground font-medium">
              So we&apos;re building one: modern storage management software that businesses can own, understand, extend,
              and leave with, the way critical infrastructure should work.
            </p>
          </div>
        </section>

        {/* Why now */}
        <section className="my-20 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/[0.03] to-transparent p-6 md:p-10">
          <div className="mb-4 text-accent font-mono text-xs tracking-widest">04 / WHY NOW</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">AI-assisted engineering changed the economics.</h2>
          <p className="text-lg text-foreground/70 leading-relaxed max-w-3xl">
            Giving every client an isolated, portable instance used to be an operational cost a small technology
            company couldn&apos;t sustain. That is no longer true. AI-assisted engineering makes it economically
            practical for a small, experienced, and competant team to maintain a secure upstream platform while each client runs a
            fully separate, exportable system of their own. This is not a UI refresh with a chatbot bolted on (lipstick on a pig). It
            changes what the ownership model can look like.
          </p>
        </section>

        {/* The thesis */}
        <section className="my-20">
          <div className="mb-4 text-accent font-mono text-xs tracking-widest">05 / THE THESIS</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-10">Ownable. Portable. Isolated. Agent-first.</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {thesisPoints.map((t) => (
              <div key={t.title} className="rounded-2xl border border-accent/20 bg-accent/5 p-6">
                <h3 className="text-xl font-bold mb-3 text-accent">{t.title}</h3>
                <p className="text-foreground/75 leading-relaxed">{t.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How we're proving it */}
        <section className="my-20 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-10">
          <div className="mb-4 text-accent font-mono text-xs tracking-widest">06 / HOW WE&apos;RE PROVING IT</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Disciplined engineering, not promises.</h2>
          <p className="text-foreground/70 leading-relaxed max-w-3xl mb-8">
            The current build covers move-in and move-out workflows, lease and signature handling, Stripe payments
            and webhooks, and receipts. It has gone through multiple rounds of internal review and adversarial
            red-team analysis by separate engineering passes. Here is what has actually been built and tested:
          </p>
          <ul className="grid md:grid-cols-2 gap-4">
            {builtFeatures.map((f) => (
              <li key={f} className="flex gap-3 rounded-xl border border-white/10 bg-black/25 p-4 text-foreground/80 leading-relaxed">
                <span className="text-accent font-mono mt-0.5">&bull;</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <p className="text-foreground/70 leading-relaxed max-w-3xl mb-6">
              The map below lays out how this was built end to end, from product definition through
              incremental milestone development, adversarial red teaming, release validation, and the assurance
              evidence produced along the way. We&apos;re sharing it publicly so anyone evaluating OSP, or evaluating
              custom software development in general, can see the discipline behind the process.
            </p>
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/20">
              <Image
                src="/images/osp/public-assurance-map.png"
                alt="Public Assurance Map: a disciplined, human-led software development process, accelerated by AI and verified at every milestone, from product definition through incremental development, advanced red teaming, release validation, and assurance evidence."
                width={1672}
                height={941}
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Current progress / private beta invitation */}
        <section
          id="interest"
          className="my-20 rounded-3xl border border-accent/30 bg-accent/5 p-8 md:p-12 text-center scroll-mt-28"
        >
          <p className="text-accent font-mono text-xs tracking-widest mb-3">07 / STATUS</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Private beta is now active.</h2>
          <p className="text-foreground/75 max-w-2xl mx-auto mb-2 leading-relaxed">
          </p>
          <h3 className="text-2xl font-bold mt-10 mb-4">Help shape the alternative.</h3>
          <p className="text-foreground/70 max-w-2xl mx-auto mb-8 leading-relaxed">
            We&apos;re inviting a small number of storage operators who believe their software should work for them,
            not own them. If that&apos;s you, tell us about your operation and we&apos;ll follow up.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-accent text-background font-bold rounded-full hover:bg-accent-dim transition-all hover:scale-105"
          >
            Request Private Beta Access
          </Link>
        </section>

        {/* Back to research */}
        <div className="mt-16 text-center">
          <Link href="/research" className="text-accent hover:text-accent-dim font-medium inline-flex items-center gap-2">
            &larr; Back to Research
          </Link>
        </div>
      </div>
    </div>
  );
}
