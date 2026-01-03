'use client';

export default function CircuitBackground() {
    return (
        <div
            className="fixed bottom-0 right-0 z-0 pointer-events-none opacity-[0.15]"
            style={{ width: '400px', height: '400px' }}
        >
            <svg
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#00D4FF] w-full h-full"
            >
                {/* Main Circuit Lines */}
                <path d="M400 300 L 350 300 L 300 250 L 100 250" stroke="currentColor" strokeWidth="2" />
                <path d="M400 150 L 320 150 L 280 190" stroke="currentColor" strokeWidth="2" />
                <path d="M400 50 L 380 50 L 300 130 L 200 130" stroke="currentColor" strokeWidth="2" />

                {/* Nodes */}
                <circle cx="100" cy="250" r="4" fill="currentColor" />
                <circle cx="280" cy="190" r="4" fill="currentColor" />
                <circle cx="200" cy="130" r="4" fill="currentColor" />

                {/* Additional decorative paths */}
                <path d="M50 400 L 50 350 L 150 250" stroke="currentColor" strokeWidth="1" />
                <path d="M250 400 L 250 320 L 320 250" stroke="currentColor" strokeWidth="1" />

                {/* Glowing Nodes */}
                <circle cx="50" cy="350" r="3" fill="currentColor" className="animate-pulse" />
                <circle cx="250" cy="320" r="3" fill="currentColor" className="animate-pulse" />
            </svg>
        </div>
    );
}
