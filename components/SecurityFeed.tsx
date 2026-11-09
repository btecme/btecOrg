'use client';

import { useEffect, useState } from 'react';
import { CISA_CATALOG_URL, getSecuritySnapshot, type SecurityEntry, type SecurityFeed as Feed } from '@/lib/security-feed';

const date = (value: string) => new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(value));

function Entries({ entries }: { entries: SecurityEntry[] }) {
  return <ul className="console-cves">{entries.map(entry => <li key={entry.id}>
    <a href={`${CISA_CATALOG_URL}?field_cve=${entry.id}`} target="_blank" rel="noopener noreferrer">{entry.id} <span aria-hidden="true">↗</span></a>
    <strong>{entry.vendor} · {entry.product}</strong>
    <span>{entry.title}</span>
    <small>Added to CISA KEV <time dateTime={entry.added}>{date(entry.added)}</time></small>
    <details><summary>What it means</summary><p>{entry.summary}</p><a href={`https://nvd.nist.gov/vuln/detail/${entry.id}`} target="_blank" rel="noopener noreferrer">NVD record and advisories ↗</a></details>
  </li>)}</ul>;
}

export default function SecurityFeed() {
  const [feed, setFeed] = useState<Feed | null>(null);
  const [unavailable, setUnavailable] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const update = async () => {
      try {
        const response = await fetch('/api/security-feed', { signal: AbortSignal.any([controller.signal, AbortSignal.timeout(10000)]), cache: 'no-store' });
        if (!response.ok) throw new Error('Feed unavailable');
        const next: Feed = await response.json();
        if (next.year !== new Date().getUTCFullYear() || !Array.isArray(next.wordpress) || !Array.isArray(next.latest)) throw new Error('Feed year unavailable');
        setFeed(next);
        setUnavailable(false);
      } catch {
        if (!controller.signal.aborted) {
          setFeed(previous => previous ?? getSecuritySnapshot(new Date().getUTCFullYear()));
          setUnavailable(true);
        }
      }
    };
    void update();
    const timer = window.setInterval(update, 60 * 60 * 1000);
    return () => { controller.abort(); window.clearInterval(timer); };
  }, []);

  return <section className="console-security" aria-labelledby="console-security">
    <h2 id="console-security" tabIndex={-1}><span aria-hidden="true">01 / </span>Current CVEs{feed ? ` · ${feed.year}` : ''}</h2>
    <p>Real vulnerabilities with confirmed exploitation, from <a href={CISA_CATALOG_URL} target="_blank" rel="noopener noreferrer">CISA’s Known Exploited Vulnerabilities catalog ↗</a>.</p>
    <p className="console-feed-note">Public security context, not a scan of this site or your device. A CVE is a tracked vulnerability; CISA lists these because they have been exploited in the wild.</p>
    <div aria-live="polite" className="console-feed-status">
      {!feed ? <p>Loading current-year CVEs…</p> : <p>{feed.snapshot ? 'Saved snapshot; current feed unavailable. ' : unavailable ? 'Refresh failed; showing last retrieved data. ' : 'Refreshes hourly. '}Catalog updated <time dateTime={feed.catalogUpdated}>{date(feed.catalogUpdated)}</time>.{(feed.snapshot || unavailable) && <> Data saved <time dateTime={feed.retrievedAt}>{date(feed.retrievedAt)}</time>.</>}</p>}
    </div>
    {feed && <>
      <h3>WordPress ecosystem</h3>
      {feed.wordpress.length ? <Entries entries={feed.wordpress} /> : <p>No matching current-year entries in this catalog snapshot. That does not mean there are no vulnerabilities.</p>}
      <a className="console-policy-link" href="/services/websites-domains#wordpress-policy">Why our new builds don’t use WordPress →</a>
      <h3>Latest across other platforms</h3>
      {feed.latest.length ? <Entries entries={feed.latest} /> : <p>No matching current-year entries available in this snapshot.</p>}
      <p className="console-feed-note">Selected {feed.year} CVE identifiers, ordered by date added to CISA KEV, not disclosure date. This is not a complete list of vulnerabilities. See each advisory for affected versions and fixes.</p>
    </>}
    <noscript><p>Enable JavaScript for this feed, or <a href={CISA_CATALOG_URL}>read the CISA catalog directly</a>.</p></noscript>
  </section>;
}
