import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { MetadataRoute } from 'next';
import { getStandards } from '@/lib/standards';

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
        { url: 'https://www.b-tec.org/services/websites-domains', lastModified: new Date('2026-11-08'), changeFrequency: 'monthly', priority: 0.85 },
        { url: 'https://www.b-tec.org/blog', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: 'https://www.b-tec.org/research', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: 'https://www.b-tec.org/osp', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
        { url: 'https://www.b-tec.org/first-principles', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: 'https://www.b-tec.org/standards', lastModified: new Date(Math.max(...getStandards().map(item => Date.parse(item.reviewed)))), changeFrequency: 'monthly', priority: 0.7 },
        ...getStandards().map(item => ({ url: `https://www.b-tec.org${item.href}`, lastModified: new Date(item.reviewed), changeFrequency: 'monthly' as const, priority: 0.6 })),
        ...posts,
    ];
}
