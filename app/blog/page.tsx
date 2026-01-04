'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Post {
    frontMatter: {
        title: string;
        date: string;
        description: string;
    };
    slug: string;
}

export default function BlogIndex() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/posts')
            .then((res) => res.json())
            .then((data) => {
                setPosts(data);
                setLoading(false);
            });
    }, []);

    const sortedPosts = [...posts].sort((a, b) => {
        const dateA = new Date(a.frontMatter.date).getTime();
        const dateB = new Date(b.frontMatter.date).getTime();
        return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

    const toggleSort = () => {
        setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    };

    return (
        <div className="min-h-screen bg-background text-foreground py-24 px-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-6xl font-bold mb-4">Signal Log</h1>
                <p className="text-xl text-foreground/60 mb-8">Transmissions from the bunker.</p>

                {/* Sort Button */}
                <div className="flex justify-end mb-8">
                    <button
                        onClick={toggleSort}
                        className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-lg bg-white/5 hover:bg-white/10 transition-all text-sm font-mono"
                    >
                        <span className="text-foreground/60">Sort by Date:</span>
                        <span className="text-accent font-bold">
                            {sortOrder === 'desc' ? '↓ Newest First' : '↑ Oldest First'}
                        </span>
                    </button>
                </div>

                {loading ? (
                    <div className="text-center text-foreground/50 py-12">Loading posts...</div>
                ) : (
                    <div className="grid gap-6">
                        {sortedPosts.map((post) => (
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
                )}
            </div>
        </div>
    );
}