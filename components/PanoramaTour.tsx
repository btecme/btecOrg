'use client';

import { useMemo, useState } from 'react';
import PanoramaViewer, { type PanoramaHotspot } from '@/components/PanoramaViewer';

type TourScene = {
  id: string;
  label: string;
  imageSrc: string;
  title: string;
  description: string;
  hotspots: PanoramaHotspot[];
};

const scenes: TourScene[] = [
  {
    id: 'room',
    label: 'Room scan',
    imageSrc: '/research/matterport-imaging-pipeline-360.jpg',
    title: 'Interactive 360 panorama captured from inside the room',
    description: 'Interior capture from the Matterport media library, embedded directly as an explorable browser panorama.',
    hotspots: [
      {
        id: 'to-hallway',
        label: 'Step into hallway',
        targetSceneId: 'hallway',
        position: { left: '50%', top: '72%' },
      },
    ],
  },
  {
    id: 'hallway',
    label: 'Hallway scan',
    imageSrc: '/research/matterport-imaging-pipeline-hallway-360.jpg',
    title: 'Interactive 360 panorama captured from the hallway outside the door',
    description: 'A second scan position just outside the doorway, showing how linked capture points can form a lightweight tour.',
    hotspots: [
      {
        id: 'to-room',
        label: 'Enter room',
        targetSceneId: 'room',
        position: { left: '50%', top: '70%' },
      },
    ],
  },
];

export default function PanoramaTour() {
  const [activeSceneId, setActiveSceneId] = useState(scenes[0].id);
  const activeScene = useMemo(
    () => scenes.find((scene) => scene.id === activeSceneId) ?? scenes[0],
    [activeSceneId],
  );

  return (
    <div className="min-w-0 max-w-full space-y-4">
      <PanoramaViewer
        key={activeScene.id}
        imageSrc={activeScene.imageSrc}
        title={activeScene.title}
        sceneLabel={activeScene.label}
        hotspots={activeScene.hotspots}
        onHotspotSelect={setActiveSceneId}
      />

      <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
        <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-accent">Tour position</p>
            <h3 className="mt-1 text-lg font-semibold">{activeScene.label}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {scenes.map((scene) => (
              <button
                key={scene.id}
                type="button"
                onClick={() => setActiveSceneId(scene.id)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  scene.id === activeScene.id
                    ? 'border-accent bg-accent text-background font-semibold'
                    : 'border-white/15 bg-white/5 text-foreground/75 hover:bg-white/10 hover:text-foreground'
                }`}
                aria-pressed={scene.id === activeScene.id}
              >
                {scene.label}
              </button>
            ))}
          </div>
        </div>
        <p className="text-sm leading-relaxed text-foreground/70">{activeScene.description}</p>
      </div>
    </div>
  );
}
