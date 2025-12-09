import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

export default function BlogIndex() {
    // 1. Read the 'posts' folder
    const files = fs.readdirSync(path.join('posts'));

    // 2. Get the data for each post
    const posts = files.map((filename) => {
        const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8');
        const { data: frontMatter } = matter(markdownWithMeta);
        return {
            frontMatter,
            slug: filename.split('.')[0],
        };
    });

    return (
        <div className="min-h-screen bg-background text-foreground py-24 px-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-6xl font-bold mb-4">Signal Log</h1>
                <p className="text-xl text-foreground/60 mb-16">Transmissions from the bunker.</p>

                <div className="grid gap-6">
                    {posts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="block p-8 border border-white/10 rounded-2xl bg-white/5 hover:bg-white/10 transition-all hover:scale-[1.01] group"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                <h2 className="text-2xl font-bold group-hover:text-accent transition-colors">
                                    {post.frontMatter.title}
                                </h2>
                                <span className="font-mono text-xs text-foreground/40 border border-white/10 px-2 py-1 rounded">
                                    {post.frontMatter.date}
                                </span>
                            </div>
                            <p className="text-foreground/70 leading-relaxed">
                                {post.frontMatter.description}
                            </p>
                            <span className="text-accent text-sm font-bold mt-6 inline-block opacity-0 group-hover:opacity-100 transition-opacity">
                                Read Transmission →
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}