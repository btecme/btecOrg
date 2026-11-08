# Websites & Domains — review candidate

Date: 2026-11-08. Branch: `service/websites-domains-review`.

## Boundary and route

Nonproduction review only. Do not merge or push to `main`: that branch auto-deploys. No production configuration, DNS, purchases, or client communication is part of this change.

New dedicated route: `/services/websites-domains`. The existing `/services` directory is retained and gains a linked card. There was no existing dedicated website/domain route to redirect; existing service anchors remain intact. Homepage Practice, shared Offerings → Services, shared footer, and sitemap now discover the new child route.

## Design and content decisions

- Same Geist/cyan/dark panel system as the approved homepage, with a distinct editorial hero and visible starting-build offer.
- Inform → Sell → Operate uses native radio inputs and a CSS-driven business-site illustration. Keyboard arrows, touch, and JavaScript-disabled browsers all change the example. Core prices and capability descriptions stay visible. The illustration is not a functioning store, portal, CMS, or deployed client case study.
- Inform starts at $400 as a one-time build and includes CMS editing. Sell and Operate are custom quote. Hosting, domain registration/renewals, agreed care, and payment-provider/transaction considerations are separate; no recurring rates or mandatory plan invented.
- Website + domain → one trusted contact explains bounded management, agreed upkeep/renewals, and suspicious-notice guidance. No immunity, unlimited support, uptime, ownership/transfer, migration, or incident-response promises.
- Existing `hello@b-tec.org` and `/contact` paths used. No form submitted or new lead integration added.
- Page title, description, canonical, Open Graph/Twitter metadata, and a generated 1200×630 social image included. No prohibited terminology in new visible copy, metadata, or image text. No new runtime dependency.
- Existing homepage/background motion, removed decorative overlays, Firefox phone compatibility path, transparency console, APIs, contact form, dated posts, products, and research content remain unchanged except the requested discovery links.

## Observed verification

- Production build: `NODE_OPTIONS=--max-old-space-size=1536 npx next build --webpack` passed, including static generation of the page and social image. Initial default Turbopack attempt was terminated at type-checking on the resource-constrained shared host; no deployment was involved. Webpack build used unchanged project config.
- `npx tsc --noEmit`, changed-file ESLint, and `git diff --check` passed.
- Production-build server: `npm run start -- --hostname 127.0.0.1 --port 3115`.
- Chromium and Firefox tested at widths 320, 390, 768, 900, 1024, 1280, and 1440. No horizontal overflow; all starting/custom prices and fee qualifier remain rendered and within horizontal bounds.
- All three capability states, persistent CMS foundation, native keyboard selection/visible focus, touch selection, reduced-motion timing, no-JavaScript selection, native FAQs, and open FAQ layout passed.
- Shared console open/closed layouts, desktop keyboard menu/Escape, mobile menu/navigation at the footer, header logo loading, homepage/service directory discovery, and existing Contact route passed. No form delivery claim is made.
- Firefox small-screen static background remains in place. Lower-page/contact/footer screenshots inspected; physical-device Firefox is not independently verified.
- No browser runtime errors. Generated social PNG returns successfully and was inspected.
- Local artifacts: `/tmp/btec-websites-review/` (harness, results and build logs); screenshots under workspace `media/review/btec-websites-domains/`.

## Scope conversations, not public promises

Exact pages, content, commerce/portal capabilities, migrations/repairs, ongoing responsibilities and fees are deliberately left to an agreed quote. No factual gap requires a blanket invented inclusion.
