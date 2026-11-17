# Contact clarity preview — 2026-11-17

## Scope

- Repository: `btecme/btecOrg`; isolated worktree `btecOrg-contact`.
- Branch: `review/contact-clarity-20261117`, based on production `60c20cc4dbb5cf0ba8ab51f07239ae017b94e70e` (the approved homepage).
- Preview only: no merge, production push, promotion, DNS change, access-protection change or real inquiry submission.
- Runtime changes: Contact page and page-scoped CSS; one existing route-aware console slot adds Contact to content-first DOM order; one shared privacy-disclosure sentence is updated to accurately describe submitted fields.
- Homepage source/styles, global CSS/layout, header/footer, all other pages, API routes and dependencies are unchanged. Homepage console positioning stays as approved; other routes retain their previous console ordering. Contact retains the desktop console rail and places it after intake on smaller screens.

## Copy and interaction

- Exact requested heading, introduction, message label/helper and Send inquiry button.
- Required name, email and description; optional company/organization and service selector, initially blank, with all four requested choices.
- Removes general-intake sector, disruption tolerance, 12-month framing and Serious inquiries only. No phone, budget, attachment, calendar or second intake step added.
- Direct email: `hello@b-tec.org`, verified against live Contact/footer on this date. No response-time, availability or free-consultation promise.
- Persistent labels, explicit required/optional markers, autocomplete, 16px input text, 48px minimum field heights, responsive two-column/single-column layout, focus outlines, inline associated validation messages and first-invalid focus.
- Immediate live sending status, disabled form controls and button while pending, plus a synchronous request lock against repeat submit events.
- Success is shown only for a positive Formspree JSON acknowledgement over a successful HTTP response. Success explicitly says that provider acceptance is not confirmed inbox delivery. New-inquiry action resets and focuses Name.
- Rejections, network errors, malformed/nonpositive acknowledgements and a 15-second abort timeout retain every entered value and allow retry. Ambiguous responses say submission is unconfirmed, may have been accepted, and retry could duplicate it. No automatic retries.

## Preserved integration contract

Inspected existing source before editing. Browser POST remains directly to `https://formspree.io/f/mpwvjvvv` with `Content-Type: application/json` and `Accept: application/json`; no routing to `/api/contact` (that unchanged legacy endpoint logs JSON without sending mail).

Payload:

```json
{
  "name": "visitor name",
  "email": "visitor email",
  "company": "optional organization or empty string",
  "service": "selected visible service label or empty string",
  "fix": "visitor description, unchanged",
  "sector": "",
  "tolerance": ""
}
```

The existing `fix` message key is preserved, not silently renamed to `message`. `service` is additive. Legacy qualification keys stay present but blank for shape compatibility; the old Technology/Medium defaults are no longer invented answers to questions that are not asked. No visitor-controlled routing or subject override is added.

No client-side spam controls existed in the baseline source; no controls were removed or bypassed. Formspree endpoint and provider configuration are unchanged. Provider-side spam controls, recipients, automations and field-dependent downstream rules are not inspectable from this repository and remain unverified. Additive service storage is proven at the request boundary with mocks, not in the provider dashboard.

No form drafts, values, response bodies or status are added to local/session storage or logs. The console still does not read form values; only its submitted-field description changes. The existing motion preference remains the sole observed local-storage key. Browser-native autofill and provider/hosting retention are not controlled by the form.

## Checks performed

- Production build: `NODE_OPTIONS=--max-old-space-size=1536 npx next build --webpack` — passed; see `docs/review/contact-20261117/build.log`.
- TypeScript: `npx tsc --noEmit` — passed.
- ESLint: `npx eslint app/contact/page.tsx components/TransparencyConsole.tsx components/PageTransparency.tsx` — passed.
- `git diff --check` — passed.
- Source parity against baseline for homepage, homepage CSS, globals/layout, navigation/footer and legacy API route — passed.
- Production artifact served locally at `http://127.0.0.1:3143`.
- Harness: `node docs/review/contact-20261117/check.cjs`; local host enforced; **all browser POSTs intercepted**, unexpected destinations aborted. No real Formspree request or inquiry sent.
- Chromium and Firefox: 320, 390, 768, 900, 1024, 1280, 1440, 1660px; no horizontal page/control overflow; field/control sizing checked.
- Exact required/optional field counts, labels, removed copy, verified email, neutral service state, all service choices, empty optional fields and exact payload/headers.
- Empty/whitespace/invalid-email validation, described errors, label-to-input focus, keyboard-only name/email/message/company/selector/button traversal and submission.
- Delayed sending, disabled inputs/button, repeated same-event `requestSubmit()` attempts, positive acknowledgement, success focus/reset and new-inquiry focus.
- Mock 422, 429, 500, network abort, malformed JSON, nonpositive acknowledgement, actual 15-second timeout; every failure retains values, restores send and succeeds on an explicitly initiated mocked retry without refilling.
- Homepage-to-Contact keyboard CTA, skip link, mobile menu Escape/focus return, client navigation Contact-to-Services-and-back; homepage metadata and route-specific console DOM order retained.
- Zero Contact/homepage browser runtime exceptions in these checks.
- Axe WCAG A/AA page-main scans in idle, invalid, error and success states: zero reported violations in both engines. Color contrast remains an automated incomplete check over layered backgrounds; screenshots visually inspected. Not an accessibility certification or full-site audit.
- Results: `docs/review/contact-20261117/results.json`. Local screenshots: workspace `media/review/btec-contact-20261117/`.

## Limits and handoff

- Real provider acceptance, inbox receipt, Reply-To, provider-side spam filtering and downstream integrations were deliberately not exercised. Mock acceptance is not real delivery evidence.
- Physical-device and screen-reader testing not performed; desktop engines with responsive viewport and keyboard tests were used.
- Hosted preview deployment/access details are recorded in the final handoff. If Vercel SSO is required, local screenshots and checks are the UI evidence; do not claim hosted form interaction was verified through a login screen.
- Production remains on the approved homepage. Do not merge or promote this Contact candidate without separate owner authorization.
