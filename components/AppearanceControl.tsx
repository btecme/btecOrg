'use client';

import { useSyncExternalStore } from 'react';
import { APPEARANCE_EVENT, APPEARANCE_KEY, applyAppearance, saveAppearance, type Appearance } from '@/lib/appearance';

function getChoice(): Appearance {
  const value = document.documentElement.dataset.appearance;
  return value === 'light' || value === 'dark' ? value : 'system';
}
function subscribe(notify: () => void) {
  const system = matchMedia('(prefers-color-scheme: dark)');
  const update = () => notify();
  const osChange = () => { if (getChoice() === 'system') applyAppearance('system'); };
  const storageChange = (event: StorageEvent) => {
    if (event.key !== APPEARANCE_KEY && event.key !== null) return;
    applyAppearance(event.newValue === 'light' || event.newValue === 'dark' ? event.newValue : 'system');
  };
  window.addEventListener(APPEARANCE_EVENT, update);
  window.addEventListener('storage', storageChange);
  system.addEventListener('change', osChange);
  // Reconcile any OS change between the head bootstrap and hydration.
  osChange();
  return () => {
    window.removeEventListener(APPEARANCE_EVENT, update);
    window.removeEventListener('storage', storageChange);
    system.removeEventListener('change', osChange);
  };
}
const serverChoice = (): Appearance => 'system';

export default function AppearanceControl() {
  const choice = useSyncExternalStore(subscribe, getChoice, serverChoice);
  return <div className="appearance-control">
    <label htmlFor="site-appearance">Appearance</label>
    <select id="site-appearance" value={choice} onChange={event => saveAppearance(event.target.value as Appearance)}>
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  </div>;
}
