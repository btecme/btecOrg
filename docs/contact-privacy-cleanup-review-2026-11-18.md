# Contact and privacy cleanup — review only

Baseline: production `cea953efd8f9bcf8b497a51d1d18a5fbb89f5b58`.
Branch: `review/contact-privacy-cleanup-20261118`.
No production deployment or real inquiry is authorized/performed by this review.

## Changes

- The only application handler at `/api/contact` has no callers in application source. The visible form posts directly to the existing Formspree endpoint. The legacy POST now returns HTTP **410**, `success: false`, and `Cache-Control: no-store`. It does not accept/read a Request or log payloads. Unsupported methods remain 405.
- The working Formspree destination, payload keys, labels, validation, duplicate lock, timeout, error/acceptance states and keyboard behavior are unchanged. Provider acceptance remains explicitly distinct from inbox delivery.
- `PageTransparency` renders no Data console on Contact, including initial HTML and client navigation. Privacy and other routes retain their existing console placement and default-open behavior. Contact keeps its Privacy link.
- Privacy and console disclosures describe endpoint retirement, Formspree submission storage, provider processing and unresolved account settings. They do **not** imply historical logs were deleted. Privacy supplies a deletion-request route via the already-published `hello@b-tec.org`, asking for submission email/date without promising a deletion deadline or that every copy can be removed.
- Contact includes owner-confirmed Bourbonnais/Chicagoland coverage, focusing on the south suburbs and Kankakee County; remote support depends on the issue and hardware installation is on-site. It sets a typical one-business-day response expectation. The sentence about not needing a finished brief is removed.
- Homepage headline, inquiry buttons, header/footer, Services and other page source remain unchanged. Shared console text changes are limited to the relevant disclosure; there is no redesign.

## Provider evidence: actual access vs documentation

Read-only audit on 2026-11-18. No submissions/mail bodies were read and no account settings changed.

**Actual access:** both Vercel and Formspree dashboards redirected to login in the available browser profile. The saved task-specific Vercel credential returned HTTP 403 `forbidden / Not authorized` for user/team reads; this does not prove expiration. Local Vercel CLI auth was empty; no explicitly named Formspree credential was found. Thus actual plan, members/log access, drains/exports, routing, recipients, integrations, spam toggles, quota and retention remain unverified.

**Documented provider behavior, not btec account settings:**

- [Formspree account limits](https://help.formspree.io/articles/account-management/account-limits): Free's 30-day dashboard visibility window does not delete older submissions.
- [Formspree rules](https://help.formspree.io/articles/advanced-features/form-rules/): rules can override target-email routing.
- [Formspree quota behavior](https://help.formspree.io/articles/form-and-project-settings/over-limit-submissions): acceptance/storage may occur without notification delivery.
- [Formspree privacy](https://formspree.io/legal/privacy-policy/): provider processing includes submission/request information; no btec-specific deletion period was established.
- [Vercel runtime logs](https://vercel.com/docs/logs/runtime) vary by plan/add-on. [Drains](https://vercel.com/docs/drains) may create separately retained copies. No plan-derived number is presented as this account's retention.

Detailed redacted evidence is separate from visitor copy and tracked source: `/home/brian/.openclaw/workspace/media/review/btec-contact-privacy-20261118/provider-audit.md` (private mode 600).

## Owner-confirmed wording — 2026-11-18 follow-up

- Only b-tec staff read inquiries to establish preliminary scope and next steps. This describes b-tec business access; it does not exclude the disclosed processing by service providers.
- Communication records are preserved to maintain correspondence integrity over time. The owner did not supply a fixed deletion period; none is invented.
- The response standard is expressed as “We typically respond within one business day,” reflecting business-day timing rather than an unconditional 24-clock-hour guarantee.
- Remote support depends on the issue; physical work such as hardware installation is performed on-site. No remote geographic territory is promised.
- Removed “You do not need a finished brief to get started” above the form; retained the preceding invitation.

Provider account settings remain independently unverified. Authenticated follow-up can inspect Formspree routing, integrations and provider-side retention; mailbox forwarding; and Vercel logs/exports separately. Owner-confirmed business policy does not establish those technical settings. No real inquiry or provider configuration change is part of this update.

## Verification

The detailed matrix below applies to the original `146333f` candidate. Follow-up copy verification is recorded separately below.

- Final production build, TypeScript, changed-file/new-harness lint and `git diff --check` pass. Build retains unrelated CISA feed-cache-size and `metadataBase` warnings; no fixes to those are included here. Full-repository lint is not claimed.
- Retired-handler unit check supplies a proxy Request that throws on any property access and logging functions that throw on use: **zero request/body accesses; zero log calls; 410**. Local production HTTP tests with valid JSON, malformed JSON and plain text all return 410 without reflecting the marker. Captured local server output contains no marker. GET/PUT/PATCH/DELETE return 405. This verifies application behavior, not a claim about host/network metadata retention.
- Chromium + Firefox × light + dark: **92 intercepted mock submissions** cover required/whitespace validation; all optional selections and empty fields; pending/disabled controls; same-event duplicate attempts; acceptance/reset; 422/429/500; network failure; malformed/negative acknowledgements; 15-second timeout; retained-value retry; keyboard and result focus.
- **64 rendered views**: Contact/Privacy × eight widths (320/390/768/900/1024/1280/1440/1660) × two themes × two engines. No horizontal overflow or runtime errors. Header clearance and toolbar bounds checked. Final disclosure-copy matrix repeated after rebuild.
- Navigation checks: homepage inquiry CTA to Contact; Contact → Privacy → Contact → Services; console stays absent on Contact and present elsewhere; Privacy Data-console link reveals/focuses it; menu Escape/focus; theme changes retain entered Contact values. Initial Contact HTML has no console with JavaScript disabled in both engines.
- Axe WCAG A/AA scans of Contact idle/invalid/error/success states in both browsers/themes find **zero violations**, with `color-contrast` left incomplete by automated analysis. Representative desktop/mobile screenshots inspected; this is browser emulation, not physical-device testing.
- Every browser form POST intercepted; unexpected writes aborted. No real Formspree inquiry or legacy-production POST sent; inbox delivery not tested. Exact protected-page source diff is empty.

Reproducible local checks: `docs/review/contact-privacy-20261118/{endpoint-check,form-check,layout-check}.mjs`. Serve a production build on loopback port 3158. Playwright/axe paths use this workspace's installed tools. Private screenshots, results, build/server logs and deployment metadata: `/home/brian/.openclaw/workspace/media/review/btec-contact-privacy-20261118/`.

## Follow-up copy verification — 2026-11-18

- Changed-page ESLint, TypeScript and production build pass. The existing CISA-cache and metadataBase build warnings remain unchanged.
- Local rendered HTML confirms the removed sentence is absent, the business-day response and issue-dependent remote-support wording are present, and Privacy includes the owner-confirmed staff/purpose and correspondence-preservation policy.
- Existing layout/navigation harness rerun: Contact/Privacy across eight widths, two themes and Chromium/Firefox (**64 views**), no overflow or runtime errors; preference changes retain unsent values. Representative updated mobile/desktop Contact screenshots inspected.
- Form submission code, destination and payload remain unchanged; no real inquiries sent. Production remains unchanged; this is a review-branch update.

## Separate follow-ups — not implemented

- Retiring this candidate route does not disable the current production route until a separately approved release, remove historical logs, or disable older Vercel deployment URLs. Review/protect/retire old deployments and request historical-log deletion where possible as a separate provider task.
- Keep homepage/Services structure and positioning work in a separate review. No broad copy or navigation restructuring is included.
- Existing CISA cache-size, social-metadata configuration and prior unrelated contrast/lint issues remain separate maintenance items.
