import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import type { Metadata } from 'next';

// 1. Helper to find the file
function getPost(slug: string) {
    const markdownFile = fs.readFileSync(path.join('posts', slug + '.mdx'), 'utf-8');
    const { data: frontMatter, content } = matter(markdownFile);
    return {
        frontMatter,
        slug,
        content,
    };
}

// 2. Generate Static Params
export async function generateStaticParams() {
    const files = fs.readdirSync(path.join('posts'));
    return files.map((filename) => ({
        slug: filename.replace('.mdx', ''),
    }));
}

// 3. Generate per-post metadata (OG tags, title, description)
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const { frontMatter } = getPost(slug);

    return {
        title: `${frontMatter.title} | b-tec Signal Log`,
        description: frontMatter.description,
        openGraph: {
            title: frontMatter.title,
            description: frontMatter.description,
            url: `https://www.b-tec.org/blog/${slug}`,
            siteName: 'b-tec Signal Log',
            type: 'article',
            publishedTime: frontMatter.date,
        },
        twitter: {
            card: 'summary_large_image',
            title: frontMatter.title,
            description: frontMatter.description,
        },
    };
}

// 4. The Page Component
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const props = getPost(slug);

    return (
        <article className="min-h-screen bg-background text-foreground py-24 px-6">
            <div className="max-w-3xl mx-auto">

                {/* Back Button */}
                <Link href="/blog" className="text-accent hover:underline mb-8 inline-block font-mono text-sm">
                    ← Return to Signal Log
                </Link>

                {/* Header */}
                <header className="mb-12 border-b border-white/10 pb-8">
                    <p className="text-sm font-mono text-foreground/60 mb-4">{props.frontMatter.date}</p>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">{props.frontMatter.title}</h1>
                    <p className="text-xl text-foreground/80 leading-relaxed font-light">
                        {props.frontMatter.description}
                    </p>
                </header>

                {/* Content Body */}
                <div className="prose prose-invert prose-lg max-w-none">
                    <MDXRemote source={props.content} />
                </div>

            </div>
        </article>
    );
}
