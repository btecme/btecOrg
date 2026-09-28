'use client';

import { useEffect, useRef, useState } from 'react';

const SHOW_URL = 'https://theshowdata.com';
const SHARE_URL = 'https://www.b-tec.org/show';

const LANDSCAPE_VIDEO = '/videos/show-launch-16x9.mp4';
const PORTRAIT_VIDEO = '/videos/show-launch-9x16.mp4';
const LANDSCAPE_POSTER = '/images/show/show-poster-16x9.jpg';
const PORTRAIT_POSTER = '/images/show/show-poster-9x16.jpg';

const PORTRAIT_QUERY = '(max-width: 767px) and (orientation: portrait)';

function MutedIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
      <path d="M11 5 6 9H2v6h4l5 4V5Z" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

function SoundIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
      <path d="M11 5 6 9H2v6h4l5 4V5Z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M18.5 5.5a9 9 0 0 1 0 13" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-1">
      <path d="M8 5v14l11-7Z" />
    </svg>
  );
}

export default function ShowLaunchVideo({ className = '' }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [poster, setPoster] = useState(LANDSCAPE_POSTER);
  const [muted, setMuted] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showEndCard, setShowEndCard] = useState(false);
  const [copied, setCopied] = useState(false);

  // Pick poster once on mount to match whichever <source> the browser selects.
  useEffect(() => {
    if (window.matchMedia(PORTRAIT_QUERY).matches) {
      setPoster(PORTRAIT_POSTER);
    }
  }, []);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mql.matches);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const wrapper = wrapperRef.current;
    if (!video || !wrapper || reducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 },
    );
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    setShowEndCard(video.currentTime >= 14.0);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'SHOW: Know which shows pay.',
      text: 'A 15-second look at SHOW. Log a market in three taps and see which shows actually pay.',
      url: SHARE_URL,
    };
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // user cancelled the share sheet, nothing to do
      }
      return;
    }
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(SHARE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const endCardClasses = (visible: boolean) =>
    `absolute rounded-lg transition-opacity duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 ${
      visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
    }`;

  return (
    <div className={className}>
      <div
        ref={wrapperRef}
        className="relative mx-auto w-full aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black/30 [@media(max-width:767px)_and_(orientation:portrait)]:aspect-[9/16] [@media(max-width:767px)_and_(orientation:portrait)]:max-w-[480px]"
      >
        <video
          ref={videoRef}
          muted={muted}
          loop
          playsInline
          preload="metadata"
          poster={poster}
          className="absolute inset-0 h-full w-full object-cover"
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setShowEndCard(true)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source media={PORTRAIT_QUERY} src={PORTRAIT_VIDEO} type="video/mp4" />
          <source src={LANDSCAPE_VIDEO} type="video/mp4" />
        </video>

        {reducedMotion && !isPlaying && (
          <button
            type="button"
            onClick={() => videoRef.current?.play()}
            aria-label="Play SHOW launch video"
            className="absolute inset-0 flex items-center justify-center bg-black/40 transition-colors hover:bg-black/50"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-background">
              <PlayIcon />
            </span>
          </button>
        )}

        <button
          type="button"
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? 'Turn sound on' : 'Turn sound off'}
          aria-pressed={!muted}
          className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
        >
          {muted ? <MutedIcon /> : <SoundIcon />}
        </button>

        {/* End-card link, portrait geometry */}
        <a
          href={SHOW_URL}
          target="_blank"
          rel="noopener"
          aria-label="Log your first show at TheShowData.com"
          tabIndex={showEndCard ? 0 : -1}
          className={`hidden [@media(max-width:767px)_and_(orientation:portrait)]:block ${endCardClasses(showEndCard)}`}
          style={{ left: '28.4%', top: '57.0%', width: '43.2%', height: '9.6%' }}
        />
        {/* End-card link, landscape geometry */}
        <a
          href={SHOW_URL}
          target="_blank"
          rel="noopener"
          aria-label="Log your first show at TheShowData.com"
          tabIndex={showEndCard ? 0 : -1}
          className={`block [@media(max-width:767px)_and_(orientation:portrait)]:hidden ${endCardClasses(showEndCard)}`}
          style={{ left: '37.9%', top: '66.7%', width: '24.3%', height: '16.8%' }}
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-foreground transition-all hover:bg-white/10"
        >
          {copied ? 'Link copied' : 'Share'}
        </button>
        <a
          href={LANDSCAPE_VIDEO}
          download="show-launch-16x9.mp4"
          className="text-sm text-foreground/60 underline underline-offset-4 hover:text-accent"
        >
          Download 16:9
        </a>
        <a
          href={PORTRAIT_VIDEO}
          download="show-launch-9x16.mp4"
          className="text-sm text-foreground/60 underline underline-offset-4 hover:text-accent"
        >
          Download 9:16
        </a>
      </div>
    </div>
  );
}
