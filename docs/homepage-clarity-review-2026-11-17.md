# Homepage clarity candidate

## Scope and baseline

- Date: 2026-11-17. Repository: `btecme/btecOrg`.
- Baseline: `b581515` on `origin/main`.
- Review branch: `review/homepage-clarity-20261117` in an isolated worktree.
- Candidate only. No production publication, DNS change, form submission, or hosting-protection change is authorized by this task.
- Runtime changes: `app/page.tsx` and new `app/homepage.css`, plus one minimal layout dependency. `app/layout.tsx` uses the new 11-line `components/PageTransparency.tsx` slot to place the existing console after main only on the homepage. Navigation, footer, console implementation, forms, other pages, product claims and published articles are unchanged.

## Direction

Practical work first: hero and contact CTA → three service entrances → public evidence → inquiry steps → products/research/public-good work → closing contact CTA.

Retains the cyan/dark technical-editorial identity, fonts, background agent, motion controls, tagline and existing destinations. Removes the abstract systems diagram, product-first ordering and unsubstantiated numeric highlights other than the owner-confirmed 30+ years.

The route-aware slot places the existing transparency console after main in DOM and keyboard order on the homepage only. Homepage-specific CSS gives it normal in-flow spacing below 1280px; at larger widths the existing desktop rail is retained. Other routes keep the console before main. The console implementation is unchanged; the first keyboard link still skips directly to main content. The working security deep link reopens and focuses the console. No data collection or disclosure changed.

Metadata is exported only from `app/page.tsx`, with a distinct descriptive title, description, canonical and social metadata. Shared defaults and route-specific product metadata are not edited.

## Current-source ledger

Reviewed current production HTML/main content and repository sources on 2026-11-17. Public source is a description of the offer, not independent certification of performance.

| Group | Verified coverage | Existing destination |
| --- | --- | --- |
| Business IT & Support | Cloud, email, domains, backups | `/services#cloud-it-solutions` |
| Business IT & Support | Hardware repair, installation, upgrades | `/services#hardware-support` |
| Business IT & Support | Network/privacy assessment, security implementation | `/services#security-consulting` |
| Business IT & Support | Managed endpoints, remote support, updates, monitoring | `/services#managed-endpoint-services` |
| Business IT & Support | Website builds and domain management | `/services/websites-domains` |
| Modernization & Advisory | Vendor management, Virtual CIO, planning | `/services#general-tech-consulting` |
| Modernization & Advisory | IT stabilization, identity, cloud, endpoints, disaster recovery, automation | `/services#executive-it-stabilization` |
| Modernization & Advisory | Data/process assessment, architecture, implementation and subsequent digital-agent layering | `/alignment` and existing `/services#ai-modernization-alignment` |
| Property & Owner Services | Residential/light-commercial design and construction management | `/services#design-construction` |
| Property & Owner Services | Owner representation, property-damage claims support, drone documentation | `/services#owner-claims-advocacy` |

All ten services remain reachable through the full Services directory. Group summaries are entrances, not a new exhaustive package or universal service commitment.

### Products and research

- `/base`: active development, stable core/alpha UI. No general-release or supported-service implication.
- `/bdf`: free Windows utility, Beta, described as used in production. No full CLI/MCP parity claim.
- `/osp`: private beta, not generally available. Synthetic FauxStore demonstrations are not client proof.
- `/show`: public page offers a free local-first vendor tool and links to `theshowdata.com`. Homepage links to the existing product page; app behavior is not independently certified.
- `/research`: room-scan-to-browser-panorama example uses actual 360 capture assets. Explicitly a proof of concept, not a client case study.
- `/about`: over three decades across IT, architecture and digital design. Homepage does not imply architectural licensure.
- `/standards` and `/first-principles`: public practices and rationale, not certification or an assertion that every product conforms.
- `/contact`: existing inquiry form destination; no lead sent during testing.

### Engagement boundaries

The website service explicitly supports defining scope and costs before work. Alignment has its own assessment → architecture → execution process and $11,000 initial engagement; no such price or workflow is generalized across the business. Homepage steps invite describing needs, discussing scope and deciding how to proceed, without inventing free consultation, pricing, response time, SLA or contract terms.

## Factual gaps, deliberately not filled

- No approved named-client outcomes, case studies, testimonials, customer logos or independently supported performance metrics were established. The candidate uses public work artifacts and the verified experience statement instead. Stronger commercial proof needs an approved project/outcome source.
- No verified service radius or onsite/remote boundary by service. Geographic claims are omitted rather than assuming nationwide availability.
- No emergency response, unlimited support, licensing/certification or guaranteed insurance-recovery claim is added.
- Product maturity is copied from current public pages, not inferred from product names. Availability should be rechecked before any later publication.

## Separate next-page recommendations (not implemented)

1. **Contact first:** replace the intimidating “Serious inquiries only” opening and the 12-month-only problem prompt with wording that also fits immediate fixes and small projects. Associate form labels with inputs and review keyboard/error handling. Preserve Formspree behavior unless a separately scoped change is approved.
2. **Services next:** reflect the same three groups, retain all existing anchors, distinguish physical-service coverage from remote work, and preserve the residential/light-commercial boundary. Its current h1-to-h3 hierarchy and repeated feature lists merit a separate pass.
3. **Alignment separately:** review the high-touch/exclusionary wording and make the $11,000 initial scope and fit unambiguous. Do not treat this offer as the entry price for all b-tec work.
4. **Commercial evidence:** obtain permission for concise anonymized or named cases with a concrete problem, work performed, and supported outcome. Research artifacts remain research evidence.

## Verification and review artifacts

- Build: `NODE_OPTIONS=--max-old-space-size=1536 npx next build --webpack`.
- TypeScript: `npx tsc --noEmit`. Changed-file lint: `npx eslint app/page.tsx app/layout.tsx components/PageTransparency.tsx`. Whitespace: `git diff --check`.
- Production-build server on loopback port 3141, stopped after verification.
- Browser harness and results: `/tmp/btec-homepage-review/check.cjs` and `results.json`.
- Chromium and Firefox at 320, 390, 768, 900, 1024, 1280, 1440 and 1660px. Horizontal bounds, opening-screen primary CTA, heading hierarchy, every homepage internal destination/anchor, keyboard skip/focus/CTA activation, service jumps, console reopening, mobile menu Escape/focus return, metadata isolation, protected-route smoke checks, no-JavaScript readability and reduced-motion context.
- Homepage-scoped axe WCAG A/AA scan: zero reported violations in each engine. Color contrast is marked incomplete because of the layered background and needs manual review; saved desktop/mobile screenshots were visually inspected. This is not an accessibility certification. Full-site existing-page accessibility is outside this task.
- Screenshot copies: workspace `media/review/btec-homepage-20261117/`.
- Protected-route smoke identified existing Firefox headless WebGL exceptions (`e is not a function`) on Alignment and BASE. The same exceptions reproduce on current production; their unchanged Three.js hero initialization is implicated. Homepage tests have no such errors. These findings are recorded separately, not fixed or hidden by this homepage task. Production baseline evidence: `/tmp/btec-homepage-review/baseline-runtime.log`. A separate graphics/fallback review is recommended.
- Hosted preview URL and exact SHA are verified through the GitHub/Vercel deployment record after pushing only the review branch. Vercel sign-in may be required; do not equate SSO access with hosted interaction verification.

### Final local result

- Final production build, typecheck, changed-file lint and whitespace checks passed.
- 16/16 browser-width combinations passed overflow checks. Primary inquiry CTA is within the opening 844px screen at 320px and 390px widths in both engines.
- All 13 unique internal homepage destination pages return 200, and every homepage fragment target exists.
- Keyboard, native service anchors, console reopening/focus, homepage console DOM order, unchanged other-route DOM order, no-JavaScript content and route-specific metadata checks passed. No homepage runtime exception in either engine.
- Firefox protected-page smoke additionally observed a network-fetch error while visiting Blog. Its cause was not diagnosed; Blog source is unchanged and this is not asserted to be a homepage regression. See raw local results for the distinction.
- No conversion, ranking, traffic or real-user usability outcome is claimed by these engineering checks.
