import Link from 'next/link';
import type { Metadata } from 'next';
import ScreenshotLightbox from '@/components/ScreenshotLightbox';

const TITLE = 'BDF — A PDF utility for you and your agents';
const DESCRIPTION =
  'BDF is a PDF application built through collaboration between a human and AI agents. A useful tool, and an unexpected mirror.';
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

export default function BdfPage() {
  return (
    <div className="min-h-screen bg-background text-foreground py-24 px-6">
      {/* Hero */}
      <div className="max-w-3xl mx-auto text-center mb-14">
        <p className="text-accent font-mono text-sm tracking-widest mb-4">IN DEVELOPMENT // WINDOWS PDF UTILITY</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-5">BDF</h1>
        <p className="text-xl md:text-2xl text-foreground/80 font-medium leading-snug">
          A useful tool. An unexpected mirror.
        </p>
      </div>

      {/* Introduction, part 1 */}
      <div className="max-w-2xl mx-auto text-lg text-foreground/80 leading-relaxed space-y-5 mb-12">
        <p>At first glance, it&rsquo;s just a book open in a PDF application.</p>
        <p>
          The book is <em className="not-italic font-semibold text-foreground">LOOK</em>, an inquiry into identity,
          consciousness, and the stories we tell ourselves. The application is{' '}
          <em className="not-italic font-semibold text-foreground">BDF</em>, built through collaboration between a
          human and AI agents. On the screen is the book&rsquo;s acknowledgment:
        </p>
      </div>

      {/* Screenshot + pull quote */}
      <div className="max-w-5xl mx-auto mb-14">
        <div className="grid md:grid-cols-5 gap-8 md:gap-10 items-start">
          <div className="md:col-span-3">
            <ScreenshotLightbox
              src="/images/bdf/bdf-look-screenshot.png"
              alt="BDF, a Windows PDF application, with LOOK-free-reader-edition.pdf open to its Acknowledgments page"
              width={1244}
              height={1033}
              priority
            />
            <p className="text-xs text-foreground/50 mt-3">
              LOOK, open inside BDF: the application built through the collaboration its own acknowledgment
              describes.
            </p>
          </div>
          <div className="md:col-span-2 md:pt-4">
            <blockquote className="border-l-2 border-accent pl-5 md:pl-6">
              <p className="text-xl md:text-2xl text-foreground/90 leading-snug">
                &ldquo;To those building digital intelligence: thank you for the mirror, whether or not you meant to
                build one.&rdquo;
              </p>
              <footer className="mt-4 text-sm text-foreground/50">&mdash; LOOK, Acknowledgments</footer>
            </blockquote>
          </div>
        </div>
      </div>

      {/* Introduction, part 2 */}
      <div className="max-w-2xl mx-auto text-lg text-foreground/80 leading-relaxed space-y-5 mb-20">
        <p>The software holding those words was created through the very collaboration they describe.</p>
        <p>
          Then the screenshot was shown to an AI assistant working as a digital twin. Asked to appreciate its depth,
          the assistant pointed out the connection: a book about looking, open inside a tool built with digital
          intelligence, thanking its builders for a mirror. Now the mirror itself was being asked to look.
        </p>
        <p>
          That doesn&rsquo;t establish anything about machine consciousness. It reveals something closer to home:
          building with AI can bring our own thinking into view. Assumptions become instructions. Intentions meet
          results. What seemed clear in our heads becomes something we can examine, question, and refine.
        </p>
        <p>
          Years of inward inquiry and decades of practical technology work meet in that ordinary screen. The inquiry
          became a book. The collaboration became an application. The application holds the book, and the
          conversation brings the relationship into focus.
        </p>
        <p>
          BDF begins with a practical purpose: working with PDFs. It is currently a private Windows preview built on
          PdfCraft, with early tools for AI agents to work with documents too.
        </p>
        <p>This page follows that work: what BDF does, how it&rsquo;s being built, and what the process reveals along the way.</p>
        <p className="font-medium text-foreground/90">
          Useful software is the point. The unexpected mirror is part of the story.
        </p>
      </div>

      {/* What BDF is */}
      <section className="max-w-5xl mx-auto mb-16">
        <p className="text-accent font-mono text-xs tracking-widest mb-3 text-center md:text-left">
          WHAT BDF IS
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center md:text-left">A PDF Utility, Built Carefully</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold mb-3 text-accent">Today</h3>
            <ul className="space-y-2 text-foreground/70 text-sm leading-relaxed">
              <li>&bull; Clean, familiar controls for the common work: open, find, comment, fill a form, organize pages, save.</li>
              <li>&bull; Careful attention to responsiveness and reliable saving, protecting your working edits.</li>
              <li>&bull; Local and portable: documents stay on your computer, with no cloud account for ordinary use.</li>
              <li>&bull; Initial command-line and MCP tools for connecting a compatible digital agent.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold mb-3 text-accent">Status</h3>
            <p className="text-foreground/70 text-sm leading-relaxed">
              Currently being tested in a private Windows 11 preview, built on the open-source PdfCraft foundation
              and developed further in b-tec&rsquo;s own direction. Initial CLI/MCP capabilities exist; complete
              feature parity across the desktop, CLI, and agent interfaces, and a broadly qualified release, are
              still in progress.
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
          BDF is still early, and it&rsquo;s being built the way most of what we publish here is built: with agents,
          in view of what works and what&rsquo;s still being proven. The research log tracks where it goes next, and
          the project itself is open to look at.
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
