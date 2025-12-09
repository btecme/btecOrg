import Link from 'next/link';
import AlignmentHero from '@/components/AlignmentHero';

export default function AlignmentPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
                <AlignmentHero />

                <div className="relative z-10 text-center px-6 pointer-events-none mix-blend-screen">
                    <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter mb-6">
                        Order from Chaos.
                    </h1>
                    <p className="text-xl md:text-2xl font-medium tracking-wide text-accent/80 mb-8">
                        From &quot;Rat&apos;s Nest&quot; to Dynamic Grid.
                    </p>
                    <div className="inline-block px-6 py-2 border border-accent/40 rounded-full bg-black/50 backdrop-blur-md">
                        <span className="text-accent font-mono font-bold">$11,000 USD Initial Engagement</span>
                    </div>
                </div>

                <div className="absolute bottom-10 left-0 right-0 text-center z-20 animate-bounce">
                    <span className="text-xs font-mono text-foreground/40">SCROLL TO ALIGN</span>
                </div>
            </section>

            {/* The Problem: Rat's Nest */}
            <section className="py-24 bg-background relative z-20">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="mb-4 text-accent font-mono text-sm tracking-widest">01 / THE ENTROPY</div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-8">Systems Fail Suddenly.</h2>
                    <p className="text-xl text-foreground/60 leading-relaxed mb-8">
                        Most organizations are running on unstructured data and ad-hoc processes. A &quot;rat&apos;s nest&quot; of hidden dependencies.
                        When you add high-speed AI agents to a chaotic system, you don&apos;t get efficiency. You get accelerated failure.
                    </p>
                </div>
            </section>

            {/* The Solution: Dynamic Grid */}
            <section className="py-24 bg-white/5 border-y border-white/5 relative z-20">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="mb-4 text-accent font-mono text-sm tracking-widest">02 / THE ALIGNMENT</div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-12">Mechanistic First.</h2>

                    <div className="space-y-12">
                        <div className="flex gap-6">
                            <div className="text-accent font-bold text-2xl">A</div>
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Map & Segment</h3>
                                <p className="text-foreground/60 leading-relaxed">
                                    We start by mapping your unstructured data and processes. We identify the &quot;load-bearing&quot; chaos and document it, which meets you where you are.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <div className="text-accent font-bold text-2xl">B</div>
                            <div>
                                <h3 className="text-2xl font-bold mb-2">System Design</h3>
                                <p className="text-foreground/60 leading-relaxed">
                                    We build deterministic, mechanistic systems. Solid workflows that work without AI.
                                    If it doesn&apos;t work on paper, it won&apos;t work in code.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <div className="text-accent font-bold text-2xl">C</div>
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Behavioral Intelligence</h3>
                                <p className="text-foreground/60 leading-relaxed">
                                    Only once the grid is stable do we layer on AI agents. They act as force multipliers on a solid foundation,
                                    not band-aids on a broken one. This greatly reduces dysfunction potential.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Engagement Model */}
            <section className="py-24 bg-background relative z-20">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <h2 className="text-3xl font-bold mb-8">The Engagement</h2>
                    <p className="text-xl text-foreground/60 mb-12 max-w-2xl mx-auto">
                        This is a high-touch, exclusionary service. We only take on clients who are serious about operational transformation.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8 mb-16 text-left">
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <div className="text-4xl font-bold text-accent mb-4">01</div>
                            <h3 className="font-bold mb-2">Assessment</h3>
                            <p className="text-sm text-foreground/60">Deep dive into your data topology and process bottlenecks.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <div className="text-4xl font-bold text-accent mb-4">02</div>
                            <h3 className="font-bold mb-2">Architecture</h3>
                            <p className="text-sm text-foreground/60">Design of the target state &quot;Dynamic Grid&quot; and migration plan.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <div className="text-4xl font-bold text-accent mb-4">03</div>
                            <h3 className="font-bold mb-2">Execution</h3>
                            <p className="text-sm text-foreground/60">Implementation of the core system and initial agent layering.</p>
                        </div>
                    </div>

                    <div>
                        <Link
                            href="/contact"
                            className="px-8 py-4 bg-accent text-background font-bold rounded-full hover:bg-accent-dim transition-all hover:scale-105"
                        >
                            Inquire About Availability
                        </Link>
                        <p className="mt-4 text-sm text-foreground/40">
                            $11,000 USD onboarding fee required to begin Phase 01.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
