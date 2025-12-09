'use client';

import { useEffect, useRef } from 'react';

export default function ParallaxBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        // Resize handler
        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        // Particles
        const particles: { x: number; y: number; size: number; speed: number; opacity: number }[] = [];
        const particleCount = 300;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 2,
                speed: Math.random() * 0.5 + 0.1,
                opacity: Math.random() * 0.6 + 0.2,
            });
        }

        // Animation Loop
        let animationId: number;
        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Parallax offset based on scroll
            const scrollY = window.scrollY;

            particles.forEach((p) => {
                ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;

                // Move particles slowly upward
                p.y -= p.speed;

                // Apply parallax effect (move faster/slower based on scroll)
                const parallaxY = p.y - scrollY * (p.speed * 0.5);

                // Wrap around
                if (parallaxY < -10) {
                    p.y = height + scrollY * (p.speed * 0.5) + 10;
                }

                // Draw
                ctx.beginPath();
                ctx.arc(p.x, (parallaxY + height) % height, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            animationId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none opacity-50"
        />
    );
}
