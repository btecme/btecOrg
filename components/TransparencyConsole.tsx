'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import SecurityFeed from './SecurityFeed';

type Snapshot = { viewport: string; language: string; timezone: string; connection: string; pointer: string; scroll: string; motion: string; resources: number; hosts: string[] };

export default function TransparencyConsole() {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);

  useEffect(() => {
    const revealSecurity = () => {
      setOpen(true);
      requestAnimationFrame(() => {
        const heading = document.getElementById('console-security');
        heading?.focus({ preventScroll: true });
        heading?.scrollIntoView({ block: 'nearest' });
      });
    };
    const onHash = () => { if (window.location.hash === '#console-security') revealSecurity(); };
    const onClick = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest('a[href="#console-security"]')) revealSecurity();
    };
    onHash();
    window.addEventListener('hashchange', onHash);
    document.addEventListener('click', onClick);
    return () => { window.removeEventListener('hashchange', onHash); document.removeEventListener('click', onClick); };
  }, []);

  useEffect(() => {
    let pointer = 'Not used yet';
    const hosts = new Set<string>();
    let resources = 0;
    const observe = (entries: PerformanceEntry[]) => {
      for (const entry of entries) {
        try {
          const url = new URL(entry.name);
          if (!['https:', 'http:'].includes(url.protocol)) continue;
          hosts.add(url.host);
          resources++;
        } catch { /* Ignore non-network resource names. */ }
      }
    };
    let observer: PerformanceObserver | undefined;
    if (typeof PerformanceObserver !== 'undefined') {
      observer = new PerformanceObserver(list => observe(list.getEntries()));
      try { observer.observe({ type: 'resource', buffered: true }); }
      catch { observe(performance.getEntriesByType('resource')); }
    } else observe(performance.getEntriesByType('resource'));
    const onPointer = (event: PointerEvent) => {
      if (event.pointerType !== 'touch') pointer = `${Math.round(event.clientX)}, ${Math.round(event.clientY)} px`;
    };
    const update = () => {
      const agent = document.querySelector<HTMLElement>('.agent-presence');
      let motion = agent?.dataset.scrollMotion === 'drifting' ? 'On' : 'Off';
      try { motion += localStorage.getItem('btec-background-motion') ? ' · saved on this device' : ' · site default'; }
      catch { motion += ' · storage unavailable'; }
      setSnapshot({
        viewport: `${innerWidth} × ${innerHeight} px`,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        connection: navigator.onLine ? 'Browser reports online' : 'Browser reports offline',
        pointer,
        scroll: `${Math.round(scrollY)} px`,
        motion,
        resources,
        hosts: [...hosts].slice(0, 12),
      });
    };
    window.addEventListener('pointermove', onPointer, { passive: true });
    const timer = window.setInterval(update, 1000);
    update();
    return () => { observer?.disconnect(); clearInterval(timer); window.removeEventListener('pointermove', onPointer); };
  }, []);

  return <aside className="transparency-console" data-open={open} aria-label="Data transparency console">
    <div className="transparency-heading">
      <button type="button" aria-expanded={open} aria-controls="transparency-content" onClick={() => setOpen(!open)}>
        <span aria-hidden="true">&gt;_ </span>Data console <span aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
    </div>
    <div id="transparency-content" hidden={!open} className="transparency-content">
      <p className="console-status"><span aria-hidden="true">●</span> Public security + local transparency</p>
      <p>Published vulnerability reports, plus a window into what this page can see, use and send.</p>
      <SecurityFeed />
      <section>
        <h2><span aria-hidden="true">02 / </span>In your browser · live</h2>
        <p>These readings stay in your browser; this console does not upload them.</p>
        <dl>
          <div><dt>Page</dt><dd>{pathname}</dd></div>
          <div><dt>Viewport</dt><dd>{snapshot?.viewport ?? 'Reading…'}</dd></div>
          <div><dt>Language</dt><dd>{snapshot?.language ?? 'Reading…'}</dd></div>
          <div><dt>Time zone</dt><dd>{snapshot?.timezone ?? 'Reading…'}</dd></div>
          <div><dt>Connection</dt><dd>{snapshot?.connection ?? 'Reading…'}</dd></div>
          <div><dt>Pointer</dt><dd>{snapshot?.pointer ?? 'Not used yet'}</dd></div>
          <div><dt>Scroll</dt><dd>{snapshot?.scroll ?? '0 px'}</dd></div>
          <div><dt>Motion</dt><dd>{snapshot?.motion ?? 'On by default'}</dd></div>
        </dl>
        <p>Pointer and scroll drive the background locally. Only your motion choice is saved by this feature, under <code>btec-background-motion</code>. No visit history or console readings are saved.</p>
      </section>
      <section>
        <h2><span aria-hidden="true">03 / </span>Network activity</h2>
        <p><strong>{snapshot?.resources ?? '…'}</strong> resource requests observed during this visit. Includes assets and page prefetches, not a visitor count.</p>
        <ul>{snapshot?.hosts.map(host => <li key={host}><code>{host}</code></li>)}</ul>
        <p>Hostnames only; request paths, query strings, form values and response bodies are not displayed or saved by this console. Browser timing data is partial and does not reveal server-to-server traffic or whether a request used cache.</p>
      </section>
      <section>
        <h2><span aria-hidden="true">04 / </span>What leaves this device</h2>
        <p>Page and asset requests reach the site host (Vercel). Servers can receive your IP address, browser headers and requested URL. Their logs and retention are not visible here.</p>
        <p>No analytics SDK or advertising pixel is installed in the site code. This is not a guarantee about browser extensions, hosting infrastructure or third-party services.</p>
        <p>The security feed requests <code>/api/security-feed</code> from this site. The server retrieves public CISA data; your browser does not contact CISA unless you follow a source link. No browser readings are included in the feed request.</p>
        <p>Submitting Contact sends your name, email, company, sector, message and tolerance selection to <strong>Formspree</strong>. This console never reads those values. An older <code>/api/contact</code> endpoint logs messages sent directly to it; the current form does not use it.</p>
        <p>BASE loads a texture from <code>raw.githubusercontent.com</code>; OSP video loads from <code>media.b-tec.org</code>. Those servers receive the corresponding requests. Following external links shares a request with that destination.</p>
      </section>
      <p className="console-footnote">Public CVE reports are shared information. Browser readings are your session only. No identity lookup, IP lookup, location permission or added tracking.</p>
    </div>
  </aside>;
}
