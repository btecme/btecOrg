import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET() {
    const postsDirectory = path.join(process.cwd(), 'posts');
    const files = fs.readdirSync(postsDirectory);

    const posts = files
        .filter((filename) => filename.endsWith('.mdx') || filename.endsWith('.md'))
        .map((filename) => {
            const filePath = path.join(postsDirectory, filename);
            const markdownWithMeta = fs.readFileSync(filePath, 'utf-8');
            const { data: frontMatter } = matter(markdownWithMeta);
            return {
                frontMatter,
                slug: filename.replace(/\.mdx?$/, ''),
            };
        });

    return NextResponse.json(posts);
}
