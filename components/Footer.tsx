'use client';

import { usePathname } from 'next/navigation';

export default function Footer() {
    const pathname = usePathname();
    const email = pathname?.startsWith('/show') ? 'hello@theshowdata.com' : 'hello@b-tec.org';

    return (
        <footer className="py-8 border-t border-white/5 bg-background text-center">
            <div className="container mx-auto px-6">
                <p className="text-sm text-foreground/40">
                    &copy; {new Date().getFullYear()} btec LLC. All rights reserved.
                </p>
                <a
                    href={`mailto:${email}`}
                    className="block mt-2 text-sm text-foreground/60 hover:text-accent transition-colors"
                >
                    {email}
                </a>
            </div>
        </footer>
    );
}
