import type { Metadata } from 'next';
import Link from 'next/link';
import ShowLaunchVideo from '@/components/ShowLaunchVideo';

const TITLE = 'SHOW: Know which shows pay.';
const DESCRIPTION =
  'A 15-second look at SHOW. Log a market in three taps and see which shows actually pay. Free, private, no spreadsheets.';
const PAGE_URL = 'https://www.b-tec.org/show';
const OG_IMAGE = 'https://www.b-tec.org/images/show/show-og-1200x630.jpg';
const OG_VIDEO = 'https://www.b-tec.org/videos/show-launch-16x9.mp4';
const POSTER_16X9 = 'https://www.b-tec.org/images/show/show-poster-16x9.jpg';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: 'b-tec',
    type: 'video.other',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
      },
    ],
    videos: [
      {
        url: OG_VIDEO,
        type: 'video/mp4',
        width: 1920,
        height: 1080,
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

export default function ShowPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: TITLE,
    description: DESCRIPTION,
    thumbnailUrl: [POSTER_16X9],
    contentUrl: OG_VIDEO,
    uploadDate: '2026-09-27',
    duration: 'PT15S',
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-24 px-6">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-accent font-mono text-xs tracking-widest mb-3">NEW PROJECT // LOCAL-FIRST VENDOR TOOL</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-6">SHOW : Market Vendor Platform</h1>

        <ShowLaunchVideo className="mb-6" />

        <p className="mx-auto mb-8 max-w-xl leading-relaxed text-foreground/70">{DESCRIPTION}</p>

        <div className="mb-6 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href="https://theshowdata.com"
            target="_blank"
            rel="noreferrer"
            className="inline-block rounded-full bg-accent px-7 py-3 text-center font-bold text-background transition-all hover:bg-accent-dim"
          >
            Log your first show
          </a>
          <Link
            href="/research#show"
            className="inline-block rounded-full border border-white/20 px-7 py-3 text-center text-foreground transition-all hover:bg-white/10"
          >
            Read the research note
          </Link>
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
