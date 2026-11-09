# Security console and WordPress build policy

Updated 2026-11-09. Requested by Brian in the btec-web thread.

## Implementation

- Shared right-side `TransparencyConsole` now starts with public security context, separate from local browser readings.
- `/api/security-feed` fetches the fixed CISA KEV JSON URL, with an 8-second source timeout and hourly Next.js revalidation. Browser requests stay same-origin and contain no console readings.
- `lib/security-feed.ts` validates catalog structure and individual entries, filters by current UTC CVE identifier year, and sorts by date added to KEV (then numeric ID). Shows three WordPress-ecosystem items and four other recent entries, without duplicate IDs across groups.
- CISA KEV inclusion is the evidence for confirmed exploitation. There is no invented severity score, claim of an unpatched current exploit, or claim that this site/device runs affected software. Entry details link to CISA and NVD for affected versions and mitigations.
- A small official catalog snapshot saved November 9 is used if the upstream request fails. Its original dates are displayed and it is labeled as saved data. A client network failure uses the same fallback; a later refresh failure retains the last retrieved data with an explicit failure label. A new calendar year does not relabel previous-year identifiers as current.
- Browser refreshes hourly while mounted. It has a 10-second timeout, aborts on unmount, and uses no third-party embed or runtime dependency.
- Policy link opens a collapsed console, scrolls to the CVE heading and moves keyboard focus. Repeated same-fragment clicks work too. On smaller viewports the existing console stays inline and scrollable.

## Policy and factual timeline

Brian supplied November 2025 as b-tec's cutoff for new WordPress builds. The page preserves this as the business-policy date, not the EssentialPlugin acquisition or public malware-discovery date.

EssentialPlugin was acquired in 2025: the completed-sale case study was already published in July. Research identifies backdoors introduced during 2025, activated April 5–6, 2026, and subsequent plugin closures/protective updates. The page uses the later incident as supporting evidence, not a claim that b-tec reacted to April 2026 reporting in November 2025. It does not accuse the original developer, claim WordPress itself was acquired, or equate all installations with infected sites.

Sources checked November 9:

- https://flippa.com/blog/how-to-sell-a-wordpress-plugin-business-for-6-figures-on-flippa/
- https://anchor.host/someone-bought-30-wordpress-plugins-and-planted-a-backdoor-in-all-of-them/
- https://patchstack.com/articles/critical-supply-chain-compromise-on-20-plugins-by-essentialplugin/
- https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json
- https://cveawg.mitre.org/api/cve/CVE-2026-119977
- https://cveawg.mitre.org/api/cve/CVE-2026-87902
- https://wordpress.org/news/2026/10/wordpress-7-1-4/

## Observed checks

- Webpack production build passed, with TypeScript and all 38 generated routes. `/api/security-feed` recorded a 3600-second revalidation interval and returned the live catalog, not fallback.
- Changed-file ESLint and `git diff --check` passed.
- Selection checks passed: identifier-year filtering, ordering, WordPress grouping, malformed entry/catalog handling, next-year rollover, source-offline fallback.
- Chromium and Firefox passed at widths 320, 390, 768, 1024 and 1440 after viewport relayout settled: no horizontal overflow, populated live feed, collapse/reopen, repeated same-hash link, focus transfer, policy cutoff and incident dates, no new service-page em dashes and no runtime errors.
- Browser API-failure checks showed dated saved snapshot. JavaScript-disabled browsers retained the policy text and direct CISA catalog link.
- Browser request observation confirmed there was no direct automatic CISA request.
- Screenshots inspected: desktop console + policy and mobile policy. Local review harness/results: `/tmp/btec-security-review/`; screenshots also in workspace `media/review/btec-security-console/`.
- Preserved the owner's concurrent edit to the service-page experience paragraph from commit c5ac9e4.
