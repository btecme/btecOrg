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
