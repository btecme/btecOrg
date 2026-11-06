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
