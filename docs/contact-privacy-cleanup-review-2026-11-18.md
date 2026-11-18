# Contact and privacy cleanup — review only

Baseline: production `cea953efd8f9bcf8b497a51d1d18a5fbb89f5b58`.
Branch: `review/contact-privacy-cleanup-20261118`.
No production deployment or real inquiry is authorized/performed by this review.

## Changes

- The only application handler at `/api/contact` has no callers in application source. The visible form posts directly to the existing Formspree endpoint. The legacy POST now returns HTTP **410**, `success: false`, and `Cache-Control: no-store`. It does not accept/read a Request or log payloads. Unsupported methods remain 405.
- The working Formspree destination, payload keys, labels, validation, duplicate lock, timeout, error/acceptance states and keyboard behavior are unchanged. Provider acceptance remains explicitly distinct from inbox delivery.
- `PageTransparency` renders no Data console on Contact, including initial HTML and client navigation. Privacy and other routes retain their existing console placement and default-open behavior. Contact keeps its Privacy link.
- Privacy and console disclosures describe endpoint retirement, Formspree submission storage, provider processing and unresolved account settings. They do **not** imply historical logs were deleted. Privacy supplies a deletion-request route via the already-published `hello@b-tec.org`, asking for submission email/date without promising a deletion deadline or that every copy can be removed.
- Contact adds only the owner-supplied location/on-site coverage: Bourbonnais, Chicagoland, south suburbs and Kankakee County as the preferred area. Remote territory and reply-time copy are omitted pending confirmation.
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

## Unresolved questions and proposed wording

1. **Who reads inquiries and for what purposes?** Confirm Formspree recipients/rules/integrations and `hello@b-tec.org` forwarding, mailbox provider, readers/delegates and any other use. Candidate, only if confirmed: “Inquiries are read by Brian Earsley to respond to your request and discuss possible work.” Add other authorized readers/uses if applicable; do not promise exclusive access without evidence. Current preview retains the uncertainty.
2. **What is kept, for how long, and who handles deletion?** Confirm Formspree history, mailbox copies, exports/backups, hosting/security logs and drains separately, plus whether the public mailbox is monitored for deletion requests. Current safe wording: “For privacy questions or to request deletion of inquiry information, email hello@b-tec.org.” No invented retention period or deletion deadline. Proposed operational wording after confirmation: “We review deletion requests across the form service and our mailbox; some records may need to be retained for agreed work or legal obligations.” Confirm the actual process before adding that assurance.
3. **Is the response expectation sustainable?** Proposed: “We typically reply within one business day.” Omitted until the owner confirms; no unconditional 24-hour promise.
4. **What remote territory is supported?** On-site coverage is confirmed by this request, but remote coverage is not. Possible wording for approval: “Remote support is available case by case.” Omitted until confirmed.

Authenticated follow-up: sign into the authorized Vercel team and Formspree form, inspect configuration/access only, and reconcile these findings with the owner. Do not change spam settings or submit a real inquiry under this prompt.

## Verification

- Final production build, TypeScript, changed-file/new-harness lint and `git diff --check` pass. Build retains unrelated CISA feed-cache-size and `metadataBase` warnings; no fixes to those are included here. Full-repository lint is not claimed.
- Retired-handler unit check supplies a proxy Request that throws on any property access and logging functions that throw on use: **zero request/body accesses; zero log calls; 410**. Local production HTTP tests with valid JSON, malformed JSON and plain text all return 410 without reflecting the marker. Captured local server output contains no marker. GET/PUT/PATCH/DELETE return 405. This verifies application behavior, not a claim about host/network metadata retention.
- Chromium + Firefox × light + dark: **92 intercepted mock submissions** cover required/whitespace validation; all optional selections and empty fields; pending/disabled controls; same-event duplicate attempts; acceptance/reset; 422/429/500; network failure; malformed/negative acknowledgements; 15-second timeout; retained-value retry; keyboard and result focus.
- **64 rendered views**: Contact/Privacy × eight widths (320/390/768/900/1024/1280/1440/1660) × two themes × two engines. No horizontal overflow or runtime errors. Header clearance and toolbar bounds checked. Final disclosure-copy matrix repeated after rebuild.
- Navigation checks: homepage inquiry CTA to Contact; Contact → Privacy → Contact → Services; console stays absent on Contact and present elsewhere; Privacy Data-console link reveals/focuses it; menu Escape/focus; theme changes retain entered Contact values. Initial Contact HTML has no console with JavaScript disabled in both engines.
- Axe WCAG A/AA scans of Contact idle/invalid/error/success states in both browsers/themes find **zero violations**, with `color-contrast` left incomplete by automated analysis. Representative desktop/mobile screenshots inspected; this is browser emulation, not physical-device testing.
- Every browser form POST intercepted; unexpected writes aborted. No real Formspree inquiry or legacy-production POST sent; inbox delivery not tested. Exact protected-page source diff is empty.

Reproducible local checks: `docs/review/contact-privacy-20261118/{endpoint-check,form-check,layout-check}.mjs`. Serve a production build on loopback port 3158. Playwright/axe paths use this workspace's installed tools. Private screenshots, results, build/server logs and deployment metadata: `/home/brian/.openclaw/workspace/media/review/btec-contact-privacy-20261118/`.

## Separate follow-ups — not implemented

- Retiring this candidate route does not disable the current production route until a separately approved release, remove historical logs, or disable older Vercel deployment URLs. Review/protect/retire old deployments and request historical-log deletion where possible as a separate provider task.
- Keep homepage/Services structure and positioning work in a separate review. No broad copy or navigation restructuring is included.
- Existing CISA cache-size, social-metadata configuration and prior unrelated contrast/lint issues remain separate maintenance items.
