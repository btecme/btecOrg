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

                <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome to the Resistance.</h1>

                <p className="text-xl text-foreground/80 leading-relaxed mb-8">
                    Your contribution has been logged. You are now officially a <strong>Founding Member</strong> of BASE.
                </p>

                <p className="text-sm text-foreground/60 mb-8 p-4 border border-white/10 rounded-lg bg-black/20">
                    <strong>Note:</strong> Your <strong>Stripe Transaction ID</strong> (found on your email receipt) is your cryptographically unique Founder Hash. Save it.
                </p>

                {/* THE DOWNLOAD BUTTON */}
                <div className="mb-8">
                    <a
                        href="/btec-ProtocolFounder_01-BASE.pdf"
                        download="btec-ProtocolFounder_01-BASE.pdf"
                        className="block w-full py-4 bg-green-600 hover:bg-green-500 text-white font-bold text-center rounded-lg transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(22,163,74,0.3)]"
                    >
                        Download Founding Protocol (.pdf)
                    </a>
                    <p className="text-xs text-center mt-3 text-foreground/40">
                        Secure transmission.
                    </p>
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