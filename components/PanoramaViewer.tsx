'use client';

import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    pannellum?: {
      viewer: (
        element: string | HTMLElement,
        config: Record<string, unknown>
      ) => { destroy?: () => void };
    };
  }
}

type PanoramaViewerProps = {
  imageSrc: string;
  title: string;
};

export default function PanoramaViewer({ imageSrc, title }: PanoramaViewerProps) {
  const viewerRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<{ destroy?: () => void } | null>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (!scriptReady || !viewerRef.current || !window.pannellum || instanceRef.current) {
      return;
    }

    instanceRef.current = window.pannellum.viewer(viewerRef.current, {
      type: 'equirectangular',
      panorama: imageSrc,
      autoLoad: true,
      showZoomCtrl: true,
      showFullscreenCtrl: true,
      compass: false,
      hfov: 95,
      minHfov: 50,
      maxHfov: 120,
      pitch: -4,
      yaw: 18,
      friction: 0.18,
      mouseZoom: true,
      keyboardZoom: true,
      draggable: true,
      previewTitle: title,
      hotSpotDebug: false,
    });

    return () => {
      instanceRef.current?.destroy?.();
      instanceRef.current = null;
    };
  }, [imageSrc, scriptReady, title]);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-2xl shadow-cyan-500/10">
      <link rel="stylesheet" href="/vendor/pannellum/pannellum.css" />
      <Script
        src="/vendor/pannellum/pannellum.js"
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
        onError={() => setLoadError(true)}
      />
      <div
        ref={viewerRef}
        role="img"
        aria-label={title}
        className="h-[360px] w-full md:h-[520px] [&_.pnlm-load-box]:!bg-black/70 [&_.pnlm-load-box]:!text-white"
      />
      <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/15 bg-black/55 px-3 py-1 text-xs font-mono uppercase tracking-widest text-white/75 backdrop-blur">
        Click + drag to explore
      </div>
      {loadError && (
        <div className="absolute inset-x-4 bottom-4 rounded-xl border border-red-400/30 bg-black/75 px-4 py-3 text-sm text-white/80 backdrop-blur">
          Panorama viewer script failed to load. The 360 image is available, but the interactive layer did not initialize.
        </div>
      )}
    </div>
  );
}
