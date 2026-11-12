import type { ComponentPropsWithoutRef } from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import styles from './Markdown.module.css';

function standardHref(href: string | undefined) {
  if (!href) return href;
  // Canonical links stay portable in raw Markdown; rendered navigation stays
  // on the current host, including review previews with new heading targets.
  if (/^https:\/\/www\.b-tec\.org\/(?:standards|first-principles)(?:#|$)/.test(href)) {
    return href.slice('https://www.b-tec.org'.length);
  }
  // Only the three public documents may become rendered standards links.
  return href.replace(/^(?:\.\/)?(digital-design|ui-responsiveness|api-architecture-scalability)\.md(?=#|$)/, '/standards/$1');
}

export default function Markdown({ source, standardLinks = false }: { source: string; standardLinks?: boolean }) {
  return <MDXRemote source={source} options={{ mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  } }} components={{
    a: ({ href, ...props }: ComponentPropsWithoutRef<'a'>) => <a {...props} href={standardLinks ? standardHref(href) : href} />,
    table: (props: ComponentPropsWithoutRef<'table'>) => (
      <div className={`markdown-table-scroll ${styles.tableScroll}`} role="region" aria-label="Data table (scroll horizontally if needed)" tabIndex={0}>
        <table {...props} />
      </div>
    ),
    th: (props: ComponentPropsWithoutRef<'th'>) => <th {...props} scope="col" />,
  }} />;
}
