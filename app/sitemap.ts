import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const postFiles = fs.readdirSync(path.join('posts'));

    const posts = postFiles.map((filename) => {
        const slug = filename.replace('.mdx', '');
        const content = fs.readFileSync(path.join('posts', filename), 'utf-8');
        const { data } = matter(content);
        return {
            url: `https://www.b-tec.org/blog/${slug}`,
            lastModified: new Date(data.date),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        };
    });

    return [
        { url: 'https://www.b-tec.org', lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
        { url: 'https://www.b-tec.org/blog', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        ...posts,
    ];
}
