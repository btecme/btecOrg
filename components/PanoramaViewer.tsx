'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export type PanoramaHotspot = {
  id: string;
  label: string;
  targetSceneId: string;
  position?: {
    left: string;
    top: string;
  };
};

type PanoramaViewerProps = {
  imageSrc: string;
  title: string;
  sceneLabel?: string;
  hotspots?: PanoramaHotspot[];
  onHotspotSelect?: (targetSceneId: string) => void;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export default function PanoramaViewer({ imageSrc, title, sceneLabel, hotspots = [], onHotspotSelect }: PanoramaViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const pointerRef = useRef({
    active: false,
    lastX: 0,
    lastY: 0,
    lon: -90,
    lat: 0,
  });
  const [webglReady, setWebglReady] = useState(false);
  const [initFailed, setInitFailed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const applyView = useCallback((lon: number, lat: number, fov?: number) => {
    const camera = cameraRef.current;
    if (!camera) return;

    const safeLat = clamp(lat, -85, 85);
    const phi = THREE.MathUtils.degToRad(90 - safeLat);
    const theta = THREE.MathUtils.degToRad(lon);

    const target = new THREE.Vector3(
      500 * Math.sin(phi) * Math.cos(theta),
      500 * Math.cos(phi),
      500 * Math.sin(phi) * Math.sin(theta),
    );
    camera.lookAt(target);

    if (typeof fov === 'number') {
      camera.fov = clamp(fov, 35, 90);
      camera.updateProjectionMatrix();
    }
  }, []);

  const resetView = useCallback(() => {
    pointerRef.current.lon = -90;
    pointerRef.current.lat = 0;
    applyView(-90, 0, 90);
  }, [applyView]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(72, 1, 1, 1100);
    cameraRef.current = camera;
    sceneRef.current = scene;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    } catch {
      window.setTimeout(() => setInitFailed(true), 0);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    rendererRef.current = renderer;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      imageSrc,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.minFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;

        const geometry = new THREE.SphereGeometry(500, 60, 40);
        geometry.scale(-1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        const resize = () => {
          const width = container.clientWidth;
          const height = container.clientHeight;
          if (!width || !height) return;
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height, false);
        };

        resize();
        resizeObserverRef.current = new ResizeObserver(resize);
        resizeObserverRef.current.observe(container);

        resetView();
        setWebglReady(true);

        const render = () => {
          frameRef.current = window.requestAnimationFrame(render);
          renderer.render(scene, camera);
        };
        render();
      },
      undefined,
      () => {
        setInitFailed(true);
      },
    );

    return () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
      resizeObserverRef.current?.disconnect();
      resizeObserverRef.current = null;
      renderer.dispose();
      scene.traverse((object) => {
        const mesh = object as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((material) => material.dispose());
        } else if (mesh.material) {
          mesh.material.dispose();
        }
      });
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      sceneRef.current = null;
      cameraRef.current = null;
      rendererRef.current = null;
    };
  }, [applyView, imageSrc, resetView]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!webglReady) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    pointerRef.current.active = true;
    pointerRef.current.lastX = event.clientX;
    pointerRef.current.lastY = event.clientY;
    setIsDragging(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!pointerRef.current.active) return;

    const deltaX = event.clientX - pointerRef.current.lastX;
    const deltaY = event.clientY - pointerRef.current.lastY;

    pointerRef.current.lastX = event.clientX;
    pointerRef.current.lastY = event.clientY;
    pointerRef.current.lon -= deltaX * 0.12;
    pointerRef.current.lat += deltaY * 0.12;
    pointerRef.current.lat = clamp(pointerRef.current.lat, -85, 85);

    applyView(pointerRef.current.lon, pointerRef.current.lat);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    pointerRef.current.active = false;
    setIsDragging(false);
  };

  const adjustZoom = (delta: number) => {
    const camera = cameraRef.current;
    if (!camera) return;
    applyView(pointerRef.current.lon, pointerRef.current.lat, camera.fov + delta);
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    adjustZoom(event.deltaY * 0.03);
  };

  return (
    <div className="relative min-w-0 max-w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-2xl shadow-cyan-500/10">
      <div className="absolute left-4 top-4 z-20 rounded-full border border-white/15 bg-black/55 px-3 py-1 text-xs font-mono uppercase tracking-widest text-white/75 backdrop-blur">
        {sceneLabel ? `${sceneLabel} · Drag to orbit` : 'Drag to orbit'}
      </div>

      <div className="absolute right-4 top-4 z-20 flex gap-2">
        <button
          type="button"
          onClick={() => adjustZoom(-6)}
          className="rounded-full border border-white/15 bg-black/55 px-3 py-1 text-sm text-white/85 backdrop-blur transition hover:bg-black/70"
          aria-label="Zoom in"
        >
          +
        </button>
        <button
          type="button"
          onClick={() => adjustZoom(6)}
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
        ref={containerRef}
        role="img"
        aria-label={title}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
        className={`relative h-[360px] w-full overflow-hidden bg-black [touch-action:none] md:h-[520px] ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      />

      {hotspots.map((hotspot) => (
        <button
          key={hotspot.id}
          type="button"
          onClick={() => onHotspotSelect?.(hotspot.targetSceneId)}
          className="group absolute z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 rounded-full text-white transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent/80"
          style={{
            left: hotspot.position?.left ?? '50%',
            top: hotspot.position?.top ?? '72%',
          }}
          aria-label={hotspot.label}
        >
          <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-cyan-200/70 bg-cyan-400/25 shadow-[0_0_35px_rgba(34,211,238,0.45)] backdrop-blur-md">
            <span className="absolute h-16 w-16 animate-ping rounded-full border border-cyan-200/40" />
            <span className="relative text-2xl">➜</span>
          </span>
          <span className="rounded-full border border-white/15 bg-black/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/90 backdrop-blur transition group-hover:bg-black/85">
            {hotspot.label}
          </span>
        </button>
      ))}

      {initFailed && (
        <div className="absolute inset-x-4 bottom-4 z-20 rounded-xl border border-amber-400/25 bg-black/75 px-4 py-3 text-sm text-white/80 backdrop-blur">
          Panorama rendering failed on this device. The source image is available, but interactive 360 controls could not initialize.
        </div>
      )}
    </div>
  );
}
