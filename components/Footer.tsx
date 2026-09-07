export default function Footer() {
    return (
        <footer className="py-8 border-t border-white/5 bg-background text-center">
            <div className="container mx-auto px-6">
                <p className="text-sm text-foreground/40">
                    &copy; {new Date().getFullYear()} btec LLC. All rights reserved.
                </p>
                <a
                    href="mailto:hello@b-tec.org"
                    className="block mt-2 text-sm text-foreground/60 hover:text-accent transition-colors"
                >
                    hello@b-tec.org
                </a>
            </div>
        </footer>
    );
}
