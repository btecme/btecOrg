'use client';

import Image from 'next/image';
import { useCallback, useMemo, useRef, useState } from 'react';

type PanoramaViewerProps = {
  imageSrc: string;
  title: string;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export default function PanoramaViewer({ imageSrc, title }: PanoramaViewerProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef<{ x: number; y: number; startX: number; startY: number; active: boolean }>({
    x: 0,
    y: 0,
    startX: 0,
    startY: 0,
    active: false,
  });

  const [zoom, setZoom] = useState(1.25);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const resetView = useCallback(() => {
    setZoom(1.25);
    setOffset({ x: 0, y: 0 });
  }, []);

  const boundedOffset = useMemo(() => {
    const maxX = Math.max(0, ((zoom - 1) * 100) / 2);
    const maxY = Math.max(0, ((zoom - 1) * 55) / 2);
    return {
      x: clamp(offset.x, -maxX, maxX),
      y: clamp(offset.y, -maxY, maxY),
    };
  }, [offset.x, offset.y, zoom]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    viewport.setPointerCapture(event.pointerId);
    dragStateRef.current = {
      x: boundedOffset.x,
      y: boundedOffset.y,
      startX: event.clientX,
      startY: event.clientY,
      active: true,
    };
    setIsDragging(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStateRef.current.active) return;

    const deltaX = event.clientX - dragStateRef.current.startX;
    const deltaY = event.clientY - dragStateRef.current.startY;
    const speed = 0.05 / zoom;

    setOffset({
      x: dragStateRef.current.x - deltaX * speed,
      y: dragStateRef.current.y - deltaY * speed,
    });
  };

  const releasePointer = (event: React.PointerEvent<HTMLDivElement>) => {
    if (viewportRef.current?.hasPointerCapture(event.pointerId)) {
      viewportRef.current.releasePointerCapture(event.pointerId);
    }
    dragStateRef.current.active = false;
    setIsDragging(false);
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    setZoom((current) => clamp(current - event.deltaY * 0.001, 1, 2.4));
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-2xl shadow-cyan-500/10">
      <div className="absolute left-4 top-4 z-20 rounded-full border border-white/15 bg-black/55 px-3 py-1 text-xs font-mono uppercase tracking-widest text-white/75 backdrop-blur">
        Click + drag to explore
      </div>

      <div className="absolute right-4 top-4 z-20 flex gap-2">
        <button
          type="button"
          onClick={() => setZoom((current) => clamp(current + 0.15, 1, 2.4))}
          className="rounded-full border border-white/15 bg-black/55 px-3 py-1 text-sm text-white/85 backdrop-blur transition hover:bg-black/70"
          aria-label="Zoom in"
        >
          +
        </button>
        <button
          type="button"
          onClick={() => setZoom((current) => clamp(current - 0.15, 1, 2.4))}
          className="rounded-full border border-white/15 bg-black/55 px-3 py-1 text-sm text-white/85 backdrop-blur transition hover:bg-black/70"
          aria-label="Zoom out"
        >
          −
        </button>
        <button
          type="button"
          onClick={resetView}
          className="rounded-full border border-white/15 bg-black/55 px-3 py-1 text-xs font-medium text-white/85 backdrop-blur transition hover:bg-black/70"
        >
          Reset
        </button>
      </div>

      <div
        key={imageSrc}
        ref={viewportRef}
        role="img"
        aria-label={title}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={releasePointer}
        onPointerCancel={releasePointer}
        onWheel={handleWheel}
        className={`relative h-[360px] w-full overflow-hidden bg-black md:h-[520px] ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      >
        <div
          className="absolute inset-0"
          style={{
            transform: `scale(${zoom}) translate(${boundedOffset.x}%, ${boundedOffset.y}%)`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 120ms ease-out',
          }}
        >
          <Image
            src={imageSrc}
            alt={title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 70vw"
            className="select-none object-cover"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
