'use client';

import { useMemo, useState } from 'react';
import PanoramaViewer from '@/components/PanoramaViewer';

type TourScene = {
  id: string;
  label: string;
  imageSrc: string;
  title: string;
  description: string;
};

const scenes: TourScene[] = [
  {
    id: 'room',
    label: 'Room scan',
    imageSrc: '/research/matterport-imaging-pipeline-360.jpg',
    title: 'Interactive 360 panorama captured from inside the room',
    description: 'Interior capture from the Matterport media library, embedded directly as an explorable browser panorama.',
  },
  {
    id: 'hallway',
    label: 'Hallway scan',
    imageSrc: '/research/matterport-imaging-pipeline-hallway-360.jpg',
    title: 'Interactive 360 panorama captured from the hallway outside the door',
    description: 'A second scan position just outside the doorway, showing how linked capture points can form a lightweight tour.',
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
      <div className="relative">
        <PanoramaViewer
          key={activeScene.id}
          imageSrc={activeScene.imageSrc}
          title={activeScene.title}
          sceneLabel={activeScene.label}
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-4 z-30 flex justify-center">
          <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-3 py-2 backdrop-blur-sm">
            {scenes.map((scene) => {
              const isActive = scene.id === activeScene.id;
              return (
                <button
                  key={scene.id}
                  type="button"
                  onClick={() => setActiveSceneId(scene.id)}
                  className={`h-3 w-3 rounded-full transition ${
                    isActive
                      ? 'bg-accent ring-2 ring-accent/30'
                      : 'border border-black bg-transparent hover:border-white/70'
                  }`}
                  aria-label={`View ${scene.label}`}
                  aria-pressed={isActive}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
        <p className="text-sm leading-relaxed text-foreground/70">{activeScene.description}</p>
      </div>
    </div>
  );
}
