import BaseHero from './BaseHero';

export default function BasePage() {
    return (
        <div className="min-h-screen bg-background text-foreground">

            {/* Hero Section */}
            <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
                <BaseHero />

                <div className="relative z-10 text-center px-6 pointer-events-none mix-blend-exclusion">
                    <h1 className="text-6xl md:text-9xl font-extrabold tracking-tighter mb-4 uppercase">BASE</h1>
                    <p className="text-xl md:text-2xl font-medium tracking-[0.2em] text-accent/80 uppercase mb-8">
                        Your intelligence. Your infrastructure.
                    </p>
                    <p className="max-w-xl mx-auto text-lg text-foreground/80 leading-relaxed">
                        A local-first, sovereign archive for your AI conversations and digital history.
                        The Git for human-AI cognition.
                    </p>
                </div>

                <div className="absolute bottom-10 left-0 right-0 text-center z-20 animate-bounce">
                    <span className="text-xs font-mono text-foreground/40">SCROLL TO DECRYPT</span>
                </div>
            </section>

            {/* The Storm (Problem) */}
            <section className="py-24 bg-background relative z-20">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="mb-4 text-accent font-mono text-sm tracking-widest">01 / THE WAVES</div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-8">The Internet is Darkening.</h2>
                    <p className="text-xl text-foreground/60 leading-relaxed mb-8">
                        The waves started in 2022 and have been increasing in size. AI powered cyber threats, disinformation, scams, social attacks. Now the wind is picking up. In 2026, the majority of the internet will be AI-generated noise, persuasion, and predation.
                    </p>
                </div>
            </section>

            {/* The Bunker (Solution) */}
            <section className="py-24 bg-white/5 border-y border-white/5 relative z-20">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="mb-4 text-accent font-mono text-sm tracking-widest">02 / THE BUNKER</div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-12">A Sovereign Vault.</h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-2xl font-bold mb-4">Local First</h3>
                            <p className="text-foreground/60 leading-relaxed">
                                BASE pulls your history out of cloud AI tools and stores it locally on your own hardware. You own the bits.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-4">Sovereign Search</h3>
                            <p className="text-foreground/60 leading-relaxed">
                                Search across all your conversations and documents with a local engine that respects your privacy.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 03 / THE FUTURE (New Section) */}
            <section className="py-24 bg-background relative z-20">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="mb-4 text-accent font-mono text-sm tracking-widest">03 / THE FUTURE</div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-8">What Comes Next.</h2>

                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        <div className="p-6 border border-white/10 rounded-xl bg-white/5">
                            <h3 className="text-xl font-bold mb-3">Proof of Humanity</h3>
                            <p className="text-sm text-foreground/60">We are building a secure ID system that proves you are a real person—without giving away your private data.</p>
                        </div>
                        <div className="p-6 border border-white/10 rounded-xl bg-white/5">
                            <h3 className="text-xl font-bold mb-3">Private Sync & Backup</h3>
                            <p className="text-sm text-foreground/60">Sync your phone and computer directly. Optional encrypted cloud backups on your terms.</p>
                        </div>
                        <div className="p-6 border border-white/10 rounded-xl bg-white/5">
                            <h3 className="text-xl font-bold mb-3">Your Digital Bodyguard</h3>
                            <p className="text-sm text-foreground/60">Future versions will actively scan the web for you, blocking scams and predatory AI.</p>
                        </div>
                    </div>

                    {/* Founding Member Block */}
                    <div className="p-8 bg-white/5 rounded-2xl border border-accent/40 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <h3 className="text-2xl md:text-3xl font-bold mb-4 relative z-10">Become a Founding Member.</h3>
                        <p className="text-2xl font-bold text-accent mb-6 relative z-10">$100 / One-Time.</p>
                        <p className="text-foreground/60 leading-relaxed mb-8 max-w-2xl relative z-10">
                            We don't want investors controlling this. We want you. A one-time payment of $100 helps us build this infrastructure. In return, you get lifetime access to BASE and all future updates. No monthly fees, ever.
                        </p>

                        <a
                            href="https://buy.stripe.com/eVq14p1s95ZzaNwfI82cg00"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-8 py-4 bg-accent text-background font-bold rounded-full hover:bg-accent-dim transition-all hover:scale-105 cursor-pointer relative z-10"
                        >
                            Join as Founding Member
                        </a>
                    </div>
                </div>
            </section>

            {/* Roadmap / Status */}
            <section className="py-24 bg-background relative z-20">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <h2 className="text-3xl font-bold mb-8">Current Status</h2>
                    <div className="inline-flex flex-col items-start text-left space-y-4 p-8 bg-white/5 rounded-2xl border border-white/10">
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-green-500" />
                            <span className="font-mono">Core Engine: Stable</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-yellow-500" />
                            <span className="font-mono">UI/UX: Alpha</span>
                        </div>
                    </div>

                    {/* DISCLAIMER */}
                    <p className="mt-12 text-sm font-light italic text-foreground/40 max-w-2xl mx-auto">
                        BASE is currently in active development. Founding Membership helps fund the infrastructure build-out. Features subject to change based on security audits.
                    </p>

                </div>
            </section>
        </div>
    );
}