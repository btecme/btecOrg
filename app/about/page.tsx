export default function About() {
    return (
        <div className="container mx-auto px-6 py-20">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-12">Vision & Philosophy</h1>

                <div className="mb-16 p-10 bg-white/5 rounded-3xl border border-white/5 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4">
                        Adding Value. Building Trust.
                    </h2>
                    <p className="text-foreground/60">
                        Our guiding principle for over three decades.
                    </p>
                </div>

                <div className="space-y-12 text-lg text-foreground/80 leading-relaxed">
                    <section>
                        <h3 className="text-2xl font-bold text-foreground mb-4">Experience Matters</h3>
                        <p>
                            With decades of experience spanning IT, architecture, digital design, and working with businesses across many sectors, b-tec brings a unique, cross-disciplinary perspective to technology challenges. We don&apos;t just fix computers; we understand the systems that power your organization.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-2xl font-bold text-foreground mb-4">Referral-Driven</h3>
                        <p>
                            We are proud that the vast majority of our business comes from referrals. We don&apos;t rely on hype or aggressive marketing. Our reputation is built on the consistent delivery of solid, reliable solutions and the trust we earn from our clients every single year.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-2xl font-bold text-foreground mb-4">The Long View</h3>
                        <p>
                            In an industry obsessed with the &quot;next big thing,&quot; we focus on what lasts. We build and use infrastructure that stands the test of time and strategies that prepare you for the future without gambling on hype cycles or unproven trends. We are value first, before profit.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
