'use client';

import Link from 'next/link';

export default function MemberPortalPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 relative overflow-hidden">

            {/* Background Ambience */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500/50 to-transparent opacity-20" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500/10 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-2xl w-full bg-white/5 border border-green-500/30 rounded-2xl p-8 md:p-12 relative z-10 backdrop-blur-sm">

                {/* Status Indicator */}
                <div className="flex items-center gap-3 mb-8">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="font-mono text-green-400 text-sm tracking-widest uppercase">Access Granted</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome to the Future.</h1>

                <p className="text-xl text-foreground/80 leading-relaxed mb-8">
                    Your contribution has been logged. You are now officially a <strong>Founding Member</strong> of BASE. The infrastructure build-out proceeds with your support.
                </p>

                {/* The Instructions Block */}
                <div className="bg-black/40 rounded-xl p-6 border border-white/10 mb-8 space-y-4">
                    <h3 className="font-bold text-lg text-white mb-2">Next Steps: Retrieve Your Protocol</h3>

                    <div className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-mono text-sm shrink-0">1</div>
                        <div>
                            <p className="text-foreground/70 text-sm mb-1">Check your email inbox immediately.</p>
                            <p className="text-xs font-mono text-accent bg-accent/10 inline-block px-2 py-1 rounded">
                                Sender: btec (via Lemon Squeezy)
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-mono text-sm shrink-0">2</div>
                        <div>
                            <p className="text-foreground/70 text-sm">
                                Open the email from <span className="text-foreground">hello@lemonsqueezy-mail.com</span> and click the <strong className="text-white">View Order</strong> button to download your Founding Member Document.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 pt-4 border-t border-white/10">
                    <Link
                        href="/"
                        className="px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors text-center"
                    >
                        Return to Homepage
                    </Link>
                    <a
                        href="mailto:b@btec.me"
                        className="px-6 py-3 rounded-lg text-foreground/60 hover:text-foreground text-sm font-medium transition-colors text-center ml-auto"
                    >
                        Need Help?
                    </a>
                </div>

            </div>
        </div>
    );
}