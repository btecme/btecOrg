# Privacy & Site Preferences + appearance control — review notes (2026-11-17)

Preview candidate only. Branch `review/privacy-appearance-20261117`, based on production `54b8965`.

## What changed

- `/privacy` — new "Privacy & Site Preferences" page; footer link on every page; Data console and Contact disclosure link to it.
- `lib/appearance.ts`, `components/AppearanceControl.tsx` — System / Light / Dark select. Head bootstrap sets `data-theme` before first paint. Only explicit Light/Dark is stored (`btec-appearance`); System removes it. OS changes are followed while System is selected; other tabs sync via `storage`.
- `components/PreferenceReset.tsx` — clears appearance and motion choices; reports when storage is blocked.
- `components/AgentPresence.tsx` — appearance + Motion share one lower-right toolbar; motion reset event; canvas repaint on theme change. Motion logic and `btec-background-motion` unchanged.
- `app/appearance.css` — light palette tokens, toolbar placement (clears open/closed Data console and safe areas), privacy page layout, compatibility rules for utility-styled pages.
- `app/globals.css` and page CSS — hard-coded dark colors moved behind semantic variables with the original values as fallbacks, so dark is unchanged.
- BASE, Alignment, parallax and presence canvases — light-theme backgrounds/colors; BASE points fade toward the paper ground and the hero copy gets a light scrim.
- `components/TransparencyConsole.tsx` — documents `btec-appearance`; `#data-console` anchor opens the console.

Article text, dates, URLs, metadata, form provider/payload and services copy are unchanged.

## Verified behavior (local production build)

- Typecheck and production build pass. Lint passes for all changed files; full-repo lint still reports pre-existing errors in `app/osp/page.tsx`, `components/ShowLaunchVideo.tsx` and `docs/review/*.cjs`.
- Chromium and Firefox: System default follows OS, including live OS change; Light/Dark persist across reload and navigation and ignore OS; System clears the override; stored Dark under a light OS is applied before DOMContentLoaded with no hydration errors; blocked storage keeps the control working for the page and the reset reports it; appearance and motion stay independent; an existing saved motion choice survives; reduced motion honored; keyboard focus visible, control ≥44px.
- Toolbar does not overlap the open console or its collapsed toggle, stays in view, and there is no horizontal overflow at 320, 375, 390, 640, 768, 1024, 1279, 1280, 1440 and 1660px on `/`, `/privacy` and `/services`.
- All 18 page routes rendered in both themes at 1440 and 390 with no overflow or runtime errors; key routes also at 768 and 320.
- axe WCAG 2.1 AA: zero violations in light on `/`, Services, Contact, BASE, OSP, an article, Privacy, Standards and About. Dark violations are identical to current production (pre-existing, unchanged). Color-contrast "incomplete" items need manual review.
- No third-party requests on Home, Privacy, Contact and Services; no form submissions made.

## Factual gaps for review

- Vercel logging configuration and retention are not verified; the page says so.
- Formspree routing, spam settings and retention are not verified.
- The legacy `/api/contact` endpoint still logs request bodies with `console.log`; behavior unchanged, log access/retention not verified.
- No analytics SDK or advertising pixel found in site code. No consent-requiring integration was found or added. This is not a legal compliance review.
