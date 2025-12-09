// import Link from 'next/link';

export default function Blog() {
    const posts = [
        {
            slug: 'base-announcement',
            title: 'Introducing BASE: The Git for Human Cognition',
            date: 'November 2025',
            excerpt: 'Why we need a sovereign archive for our digital history in the age of generative AI.',
            tag: 'BASE',
        },
        {
            slug: 'professional-alignment',
            title: 'The Cost of Chaos: Why Systems Fail',
            date: 'October 2025',
            excerpt: 'Unstructured data is a liability. How to align your organization for the future.',
            tag: 'Systems',
        },
        {
            slug: 'civil-defense',
            title: 'Digital Civil Defense',
            date: 'September 2025',
            excerpt: 'Practical steps for protecting your information infrastructure.',
            tag: 'AI Risk',
        },
    ];

    return (
        <div className="container mx-auto px-6 py-20">
            <h1 className="text-4xl md:text-5xl font-bold mb-12">Blog</h1>

            <div className="grid gap-8 max-w-4xl">
                {posts.map((post) => (
                    <article key={post.slug} className="group p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-accent/20 transition-all">
                        <div className="flex items-center gap-4 text-sm text-foreground/40 mb-4">
                            <span>{post.date}</span>
                            <span className="w-1 h-1 rounded-full bg-foreground/40" />
                            <span className="text-accent">{post.tag}</span>
                        </div>
                        <h2 className="text-2xl font-bold mb-4 group-hover:text-accent transition-colors">
                            {post.title}
                        </h2>
                        <p className="text-foreground/60 mb-6 leading-relaxed">
                            {post.excerpt}
                        </p>
                        {/* 
            <Link href={`/blog/${post.slug}`} className="text-sm font-bold text-foreground/80 hover:text-accent transition-colors">
              Read more →
            </Link> 
            */}
                        <span className="text-sm font-bold text-foreground/40 cursor-not-allowed">
                            Read more →
                        </span>
                    </article>
                ))}
            </div>
        </div>
    );
}
