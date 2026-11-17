'use client';

import { useState } from 'react';
import { saveAppearance } from '@/lib/appearance';

export default function PreferenceReset() {
  const [status, setStatus] = useState('');
  return <div className="preference-reset">
    <button className="button-text" type="button" onClick={() => {
      saveAppearance('system');
      window.dispatchEvent(new Event('btec-reset-motion'));
      let saved = true;
      try { localStorage.removeItem('btec-appearance'); localStorage.removeItem('btec-background-motion'); }
      catch { saved = false; }
      setStatus(saved ? 'Appearance follows your system. Motion is back to the site default. Both saved choices have been removed.' : 'Defaults applied for this page. Browser storage is unavailable, so saved choices could not be checked or cleared.');
    }}>Reset appearance and motion <span aria-hidden="true">↗</span></button>
    <p role="status">{status}</p>
  </div>;
}
