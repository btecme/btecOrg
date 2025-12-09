'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AlignmentHero() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const scene = new THREE.Scene();
        scene.background = new THREE.Color('#000000');

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.z = 30;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // --- PARTICLES ---
        const count = 2000;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        const targetPositions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        // Initial positions: Chaos (Left side)
        for (let i = 0; i < count; i++) {
            // Chaos cluster on the left
            const r = 10;
            const x = (Math.random() - 0.5) * r - 15; // Shift left
            const y = (Math.random() - 0.5) * r;
            const z = (Math.random() - 0.5) * r;

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            // Target positions: Grid (Right side)
            // Create a 10x10x10 grid roughly
            const gridSide = Math.ceil(Math.pow(count, 1 / 3));
            const spacing = 2.0;
            const gx = (i % gridSide) * spacing;
            const gy = (Math.floor(i / gridSide) % gridSide) * spacing;
            const gz = Math.floor(i / (gridSide * gridSide)) * spacing;

            // Center the grid on the right
            targetPositions[i * 3] = gx - (gridSide * spacing) / 2 + 15; // Shift right
            targetPositions[i * 3 + 1] = gy - (gridSide * spacing) / 2;
            targetPositions[i * 3 + 2] = gz - (gridSide * spacing) / 2;

            // Color: Start with chaos color (Red/Orange)
            colors[i * 3] = 1.0;
            colors[i * 3 + 1] = 0.4;
            colors[i * 3 + 2] = 0.2;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('target', new THREE.BufferAttribute(targetPositions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        // Custom Shader Material
        const material = new THREE.ShaderMaterial({
            vertexShader: `
        uniform float uTime;
        attribute vec3 target;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          vec3 pos = position;
          vec3 tar = target;
          
          // Animate from pos to tar based on index and time
          // We want a streaming effect
          
          float index = float(gl_VertexID) / 2000.0; // Normalized index
          float flowSpeed = 0.2;
          float triggerTime = index * 5.0; // Stagger start times
          
          float progress = smoothstep(triggerTime, triggerTime + 2.0, uTime * flowSpeed * 10.0);
          
          // Loop the animation
          float loopTime = mod(uTime * 0.5 + index * 2.0, 4.0);
          progress = smoothstep(0.0, 1.0, loopTime);
          
          // Actually, let's just make them flow continuously
          // Use a sine wave to oscillate between chaos and order? 
          // Or just one way flow? The brief says "streaming from chaos into order"
          // Let's do a continuous flow where particles reset
          
          float t = mod(uTime * 0.5 + index, 1.0);
          // Ease in out
          float ease = t * t * (3.0 - 2.0 * t);
          
          vec3 currentPos = mix(pos, tar, ease);
          
          // Add some noise/wobble in the middle
          float noise = sin(t * 3.14159) * 2.0;
          currentPos.y += sin(currentPos.x * 0.5 + uTime) * noise * 0.5;

          vec4 mvPosition = modelViewMatrix * vec4(currentPos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          
          // Color transition: Chaos (Orange) -> Order (Cyan)
          vec3 colorChaos = vec3(1.0, 0.4, 0.2);
          vec3 colorOrder = vec3(0.2, 0.8, 1.0);
          vColor = mix(colorChaos, colorOrder, ease);
          
          // Pulse size
          gl_PointSize = (4.0 + sin(uTime * 5.0 + index * 10.0)) * (20.0 / -mvPosition.z);
          
          vAlpha = 1.0;
        }
      `,
            fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        
        void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          if (length(coord) > 0.5) discard;
          gl_FragColor = vec4(vColor, vAlpha);
        }
      `,
            uniforms: {
                uTime: { value: 0 }
            },
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthTest: false
        });

        const points = new THREE.Points(geometry, material);
        scene.add(points);

        // --- ANIMATION ---
        const clock = new THREE.Clock();
        let animationId: number;

        const animate = () => {
            animationId = requestAnimationFrame(animate);
            const t = clock.getElapsedTime();
            material.uniforms.uTime.value = t;

            // Rotate the whole scene slowly
            points.rotation.y = t * 0.05;

            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
            if (container && container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
            geometry.dispose();
            material.dispose();
        };
    }, []);

    return <div ref={containerRef} className="absolute inset-0 z-0" />;
}
