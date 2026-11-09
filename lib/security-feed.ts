import fallback from '@/data/security-feed-snapshot.json';

export const CISA_FEED_URL = 'https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json';
export const CISA_CATALOG_URL = 'https://www.cisa.gov/known-exploited-vulnerabilities-catalog';

export type SecurityEntry = { id: string; vendor: string; product: string; title: string; summary: string; added: string };
export type SecurityFeed = { year: number; catalogUpdated: string; retrievedAt: string; snapshot: boolean; wordpress: SecurityEntry[]; latest: SecurityEntry[] };

const isObject = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null;
const isText = (value: unknown): value is string => typeof value === 'string' && value.length > 0 && value.length <= 3000;

export function selectSecurityFeed(catalog: unknown, year: number, retrievedAt: string, snapshot = false): SecurityFeed {
  if (!isObject(catalog) || !isText(catalog.dateReleased) || !Number.isFinite(Date.parse(catalog.dateReleased)) || !Array.isArray(catalog.vulnerabilities)) throw new Error('Invalid CISA catalog');
  const entries: SecurityEntry[] = catalog.vulnerabilities.flatMap((entry: unknown) => {
    if (!isObject(entry) || typeof entry.cveID !== 'string' || !new RegExp(`^CVE-${year}-\\d{4,}$`).test(entry.cveID)) return [];
    if (![entry.vendorProject, entry.product, entry.vulnerabilityName, entry.shortDescription].every(isText) || typeof entry.dateAdded !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(entry.dateAdded) || !Number.isFinite(Date.parse(entry.dateAdded))) return [];
    return [{ id: entry.cveID, vendor: entry.vendorProject as string, product: entry.product as string, title: entry.vulnerabilityName as string, summary: entry.shortDescription as string, added: entry.dateAdded }];
  });
  entries.sort((a, b) => b.added.localeCompare(a.added) || b.id.localeCompare(a.id, 'en', { numeric: true }));
  const wordpress = entries.filter(entry => /wordpress/i.test(`${entry.vendor} ${entry.product}`)).slice(0, 3);
  const wordpressIds = new Set(wordpress.map(entry => entry.id));
  return { year, catalogUpdated: catalog.dateReleased, retrievedAt, snapshot, wordpress, latest: entries.filter(entry => !wordpressIds.has(entry.id)).slice(0, 4) };
}

export function getSecuritySnapshot(year: number): SecurityFeed {
  return selectSecurityFeed(fallback.catalog, year, fallback.retrievedAt, true);
}

export async function getSecurityFeed(): Promise<SecurityFeed> {
  const year = new Date().getUTCFullYear();
  try {
    const response = await fetch(CISA_FEED_URL, { next: { revalidate: 3600 }, signal: AbortSignal.timeout(8000) });
    if (!response.ok) throw new Error('CISA feed unavailable');
    return selectSecurityFeed(await response.json(), year, new Date().toISOString());
  } catch {
    return getSecuritySnapshot(year);
  }
}
