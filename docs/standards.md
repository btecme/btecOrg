# Standards section

The public collection consists of exactly three Markdown files in `public/standards/`:
`digital-design.md`, `ui-responsiveness.md`, and `api-architecture-scalability.md`.

`lib/standards.ts` explicitly lists this collection and reads each public file at build
time. YAML frontmatter provides its title, description, and review date. The Markdown
body supplies the rendered page content; the same file is served at `/standards/<slug>.md`.
The index, page metadata, related navigation, and sitemap use the collection metadata.
There is no runtime document-fetch service or separate documentation application.

## Editing

Edit the public Markdown, retaining truthful review dates and source/evidence limitations.
Do not add a second copy of the article body in page components. Keep public-facing copy
clear about intended practice versus verified implementation or certification.

The current collection uses plain-text ATX headings. Heading IDs and the generated
contents links use GitHub-style slugs. Preserve IDs for linked headings when revising
titles, or update all referring links deliberately. `components/Markdown.tsx` extends
the existing `next-mdx-remote/rsc` renderer with GFM tables and heading IDs. Standard
links ending in one of the three allowlisted `.md` names are rewritten to rendered
routes while preserving fragments; raw files keep their relative Markdown links.
Canonical links to the collection landing page and First Principles become same-host
paths when rendered, so review previews do not send readers to production anchors.
The raw files retain absolute canonical URLs for standalone readers.

These are reviewed, repository-owned documents, not user-submitted MDX. Do not connect
this renderer directly to arbitrary untrusted input.

## Verification

Run `npm run build` and `npm run lint`. Check `/standards`, all three rendered documents,
and all three raw Markdown URLs. Verify table headers and keyboard horizontal scrolling,
heading anchors, cross-document fragments, navigation focus, and narrow-screen layout.
The standards pages should remain readable without JavaScript. Verify `/sitemap.xml`
and per-page canonical/description metadata as part of a preview review.

Deployment to production is a separate release decision from a review-branch preview.
