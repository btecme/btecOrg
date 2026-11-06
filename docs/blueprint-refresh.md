# Blueprint template refresh

Branch: `ui/blueprint-refresh`. Review preview only; `main` auto-publishes.

## Direction

Reference: https://ethiack.com, reviewed 2026-11-06. Adapted its technical section markers, fine grid, dark surfaces, strong typography, and limited accent palette. Original b-tec composition and CSS diagram; no copied assets, fonts, animation, or marketing claims.

Keep b-tec cyan-blue `#00d4ff`. The homepage introduces the practice and all four existing products, then user-value positioning, services, alignment, and contact. Header and footer provide shared template improvements on existing pages. Product copy, research entries, dated posts, APIs, and their metadata are unchanged. SHOW's footer contact remains route-specific.

## Verification

- `npx tsc --noEmit`
- `npx eslint app/page.tsx app/layout.tsx components/Header.tsx components/Footer.tsx`
- `npm run build`
- Render the production build on a spare loopback port. Use a local isolated headless browser when the browser tool rejects localhost navigation.
- Check widths 320, 390, 768, 900, 1024, and 1440; inspect full-page screenshots and assert no horizontal overflow.
- Exercise desktop hover and keyboard disclosures, Escape/focus return, mobile BDF navigation, menu closure after navigation, skip link, and reduced-motion behavior.
- Smoke-check existing product, services, research, contact, about, and blog routes; compare BDF/research/content files with main.
- Fetch/reconcile origin immediately before pushing the preview branch; verify Vercel build/deployment status. Preview deployments may require the owner's Vercel team login.

## Boundaries

Global tokens/chrome change the surrounding visual frame. Existing product layouts are intentionally retained for this first template review. No new runtime dependency or tracking added. The homepage no longer mounts its particle canvas, and the layout no longer mounts the decorative circuit overlay; component source remains available for rollback.

## Candidate verification results (2026-11-06)

Production build, typecheck, and changed-file ESLint passed. Local Chromium verification passed 48 assertions across six homepage widths, three BDF widths, keyboard/mobile navigation, reduced motion, and ten existing route smoke checks; no browser runtime errors. The initial 320px statistics overflow was fixed and the checks rerun successfully.

## Agent-presence refinement (2026-11-06)

Owner clarified the exact HACKIAN reference with a screenshot: a dark, rounded, faceless humanoid shell, tall luminous faceplate, narrow neck and broad shoulders — not an anatomical human portrait. `components/AgentPresence.tsx` now creates original rounded shell geometry, projects and depth-sorts it on a transparent 2D canvas, and draws a curved uninterrupted b-tec blue faceplate with diffused vertical brushwork. Head yaw/pitch follows the pointer anywhere. No eyes, nose, mouth, point cloud, reference artwork/model/video, or reference branding. The reference itself uses a looped video; interactive head tracking is a new b-tec behavior.

The presence lives in the root layout behind all routes, with a separate halo plane and bounded scroll displacement. Cursor tracking uses passive window-level pointer events, damped animation and current viewport normalization (pointer events can arrive before a queued resize event). Animation stops when settled and when the tab is hidden. Touch-only devices and live reduced-motion preference changes receive a static faceless agent. DPR is capped at 1.5; there is no WebGL dependency or external asset request. A matching faceless SVG fallback retains the visual without JavaScript/canvas. The layer is `aria-hidden` and `pointer-events:none`; content and menus remain above it. Existing homepage map and product-card fills are slightly translucent to integrate the background.

Motion checks: compare actual rendered left/right frames, verify yaw/pitch at opposite viewport edges and below the hero, compare independent head/halo transforms at 0/120/240px scroll, resize/restore at fixed scroll and pointer position, toggle reduced motion both directions, test touch-only and no-JavaScript contexts, and inspect desktop/mobile composition. Test artifacts for this refinement: `/tmp/btec-agent-review/`; serve the completed production build at loopback port 3106. Keep build and server startup sequential: Next removes/recreates `.next` during builds.

Refinement verification: production build, typecheck, changed-file ESLint and `git diff --check` pass. The 23 motion-specific browser assertions plus all 48 original template/navigation checks pass (71 total), with no browser runtime errors. Desktop and mobile screenshots and a rendered cursor-motion frame sequence inspected; approved BDF/research/content files remain unchanged against `origin/main`.

Screenshot correction verified: production build, changed-component ESLint, typecheck, and patch checks pass. All 23 motion/accessibility assertions and 48 template/navigation checks pass again (71 total), with no browser runtime errors. Desktop, mobile, and left/right cursor frames inspected for the faceless silhouette. New motion evidence: `/home/brian/.openclaw/workspace/media/review/btec-faceless-cursor.gif`. Approved BDF/research/post files remain unchanged from production. Preview branch only; production remains unchanged.

## Leftward scroll drift and cursor gaze (2026-11-06)

Brian requested explicit leftward background travel and visibly cursor-following face orientation. The sculpture now drifts left at 0.12px per scroll pixel (bounded to 48% of viewport width); reversing scroll returns it right. Its halo follows at 65% of that displacement. Gaze uses an atan2 direction from the moving head origin to the last cursor position, recomputed during scrolling even when the pointer stays still. Yaw/pitch limits are 0.78/0.46 radians, with damped motion. Shoulders stay anchored while the head rotates; the left-side mask retains enough opacity to keep the travelling subject visible. Touch scroll drift is independent of fine-pointer gaze detection. Reduced motion still freezes both.

Verification: production build, component ESLint, TypeScript, and patch checks pass. 21 new rendered-canvas/scroll/gaze assertions, 23 existing motion/accessibility/responsive assertions, and 48 navigation/template checks pass (92 total), with no browser runtime errors. New checks measure actual luminous face pixels moving left at 0/120/240/1100/2400px, reverse-scroll restoration, visibly different opposing cursor poses, stationary-cursor gaze during drift, fixed-scroll resize restoration, touch scroll drift, and live reduced-motion transitions. Resize comparison must restore scroll and settle the viewport before restoring the pointer, since browser scroll anchoring and pointerleave events can otherwise change the baseline. Local artifacts: `/tmp/btec-scroll-gaze-review/`; existing test directories retained. Preview branch only; production unchanged.

Homepage hero topline updated to the approved brand tagline: “Adding Value. Building Trust.” Footer wording and dated content remain unchanged; this request targets the upper-left homepage line only.

Footer brand tagline updated to “Adding Value. Building Trust.” beneath the lower-left logo at Brian’s request. Keeps the existing two-line layout and route-specific contact address.

Static-background report follow-up: reproduced matching commit `647ce4b` locally using native wheel scrolling (not programmatic scroll alone): offset 0px at scroll 0, -28.80px at 240, -124.79px at 1040. All 21 existing scroll/gaze checks pass with no runtime errors. Exact hosted commit remains confirmed deployed, but Vercel SSO prevents interactive hosted verification. Requested the owner’s exact failing URL; no background code changed without reproducing the discrepancy.

## Explicit background-motion choice (2026-11-06)

Brian reports both the background and face frozen on the footer-update preview `https://btec-85oyggi34-btecs-projects.vercel.app/`. System reduced-motion preference reproduces both symptoms locally; the owner's browser state remains unknown, and Vercel SSO still blocks direct hosted interaction here. Do not claim the owner's setting is confirmed.

`AgentPresence` now exposes a small, keyboard-accessible bottom-right `Motion: on/off` button outside the decorative aria-hidden layer. Default behavior still respects live `prefers-reduced-motion`; an explicit enable/pause choice is saved privately under localStorage key `btec-background-motion`. Storage failure does not break the control. Actual mouse/pen events also enable gaze when hybrid/remote-device media queries incorrectly report no fine pointer; touch events do not invent cursor gaze. No continuous idle animation was added.

Verification artifacts: `/tmp/btec-motion-switch-review/`; screenshots copied under `media/review/btec-motion-switch/`. All 15 new checks pass, including rendered face pixels following opposite cursor positions, native wheel-driven left travel with reduced motion still enabled, reload persistence, keyboard pause, 320/390px control bounds, mobile menu use, actual mouse events under a false fine-pointer query, and blocked-storage operation. All 21 pre-existing scroll/gaze checks and 23 responsive/navigation/static-fallback checks also pass (59 total), with no browser runtime errors. Inspected painted left/right and scrolled frames. Production build, component ESLint, TypeScript and whitespace checks pass. Preview branch only; production unchanged.

## Production authorization and transparency console (2026-11-06)

Brian explicitly requested publication to the live site after requesting motion ON by default and a visible terminal-style transparency sidebar. The previously pushed preview did not include those last two changes, so both were completed before production release.

- `AgentPresence` defaults motion ON with no saved choice, including under reduced-motion system settings, per Brian's explicit request. Existing saved OFF choices remain respected; the keyboard-accessible control still persists only `btec-background-motion`. Other CSS reduced-motion behavior remains unchanged.
- The open-by-default `TransparencyConsole` is mounted in the shared layout. At >=1280px it reserves a 332px right rail; at smaller widths it becomes a bounded, scrollable in-flow panel. It can be collapsed/reopened without storage. The background canvas uses its actual content width and a ResizeObserver so the subject remains within the page when the rail opens/closes.
- Live readings: pathname without queries, viewport, language, browser time zone, online hint, pointer, scroll, motion, resource-entry count and up to 12 observed hostnames. Resource timing is explicitly partial and is not a sitewide visitor count, complete traffic intercept, cache indicator, or server-side log view. The observer does not access bodies or form values and adds no fetch/beacon/cookie/analytics dependency or console-history persistence. Samples update once per second; listeners/observers/timer are cleaned up.
- Audited disclosures: Vercel receives normal page/asset request metadata; Contact POSTs directly to Formspree (`name/email/company/sector/fix/tolerance`); the old unused-by-UI `/api/contact` still logs incoming JSON if directly invoked; BASE loads a GitHub-hosted texture; OSP requests the separate media origin. External link destinations receive navigation requests. Authored code contains no analytics SDK or ad pixel, but infrastructure, third-party retention, browser extensions and server logs cannot be audited from a client panel. Google fonts are build-time/self-hosted; SHOW share is user-triggered. No provider settings or existing forms changed.
- Verification: changed-file ESLint and production build (including TypeScript) pass; 74 local browser assertions passed across widths 320/390/768/900/1024/1280/1440/1600, motion default under reduced motion, local-only homepage network behavior, stored pause/reload, keyboard control, live readings, console collapse/reopen, client-side routes, mobile menu, ten route smoke checks, blocked storage and no-JavaScript disclosures. No browser runtime errors. Desktop/mobile screenshots inspected. Final wording was tightened to distinguish displayed/saved metadata from browser resource timing names and disclose the legacy endpoint.
- Artifacts: `/tmp/btec-live-release/check.cjs`, `/tmp/btec-live-release/results.json`, screenshots under workspace `media/review/btec-live-release/`. Published BDF/research/posts/contact/API contents remain unchanged against the production baseline.

## Sculpted torso and intermittent signal glitches (2026-11-06)

Brian requested more body depth and occasional subtle glitches, using the HACKIAN screenshot as a material/volume reference. The faceless cyan plate and approved page composition remain unchanged. `AgentPresence` now generates original rounded torso cross sections with neck tendons, a shallow collarbone ridge, sternum recess and shoulder curvature. Surface normals drive a broad directional highlight, softer specular response and opposing cyan rim. The torso turns slightly (16% of head yaw), retaining the independent gaze and scroll drift. No asset copying, new package, tracking or network request.

Glitches are 2–3 thin displaced scanline fragments, lasting 120–210ms with randomized 4.2–11-second gaps. A reused offscreen canvas prevents recursive smearing. A sleeping timeout wakes short animation bursts; settled motion has no perpetual frame loop. Saved Motion OFF and hidden tabs cancel both frames and future timers; reduced-motion suppresses unsolicited glitches while keeping the owner's approved default-on gaze/scroll behavior. Visibility restoration and preference changes safely restart scheduling. DPR remains capped at 1.5.

Verification artifacts: `/tmp/btec-depth-review/`; composition, raw painted sculpture, glitch frame and mobile captures under workspace `media/review/btec-depth/`. Run the existing 74-check release suite plus `depth-check.cjs` for actual pixel changes/restoration, limited glitch area, normal-lit neck variation, idle rendering, saved pause and visibility lifecycle. Preview branch only for review; this refinement is separate from the earlier authorized production release.

Refinement verification: production build, changed-file ESLint and whitespace checks pass. All 74 existing browser assertions and 19 new geometry/glitch/lifecycle assertions pass (93 local checks), with no runtime errors. A naturally scheduled burst changed 23,573 canvas pixels, stayed within the limited-area threshold, and restored the exact pre-burst frame. The neck contains 51 distinct sampled light values (90-level blue-channel range). Mobile composition inspected. The independent Flash review was unavailable; implementation and lifecycle were reviewed directly.


## Natural jacket silhouette (2026-11-06)

Brian asked for a more natural, less alien body with a jacket similar to the reference. Replaced the exposed tendon/collarbone/sternum treatment with a dark tailored jacket: a separate curved stand collar, narrow dark inner opening, relaxed shoulder caps, shallow armhole folds and subtle shoulder/front seams. Broad matte lighting replaces the glossy anatomical highlights. Raised the shoulder transition and shortened the visible bare neck without changing the approved faceplate or head geometry. The collar is sampled above the coat and drawn as its own upper garment layer. Only its two visible front folds are rendered; omitting the hidden rear wrap prevents painter-order self-intersections in side views. The no-JavaScript SVG fallback also wears a jacket.

Head tracking, leftward scroll drift, motion preferences, transparency console and intermittent glitch scheduling remain intact. No new package or external asset request. Review branch only; the live site remains at the earlier production release. Verification artifacts: `/tmp/btec-jacket-review/`; screenshots and motion capture under `media/review/btec-jacket/`.
