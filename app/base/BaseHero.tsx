'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function BaseHero() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // --- CONFIG ---
        const SETTINGS = {
            count: 65000,
            radius: 2.5
        };

        const container = containerRef.current;
        const scene = new THREE.Scene();
        scene.background = new THREE.Color('#000000'); // Or transparent if we want to blend

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.z = 6;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // --- TEXTURE LOADER ---
        const textureLoader = new THREE.TextureLoader();
        textureLoader.crossOrigin = 'anonymous';
        const earthMap = textureLoader.load(
            'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg'
        );

        // --- SHADERS ---
        const vertexShader = `
      precision highp float;
      
      uniform float uTime;
      uniform float uMorph;
      uniform float uPixelRatio;
      uniform sampler2D uEarthMap;

      attribute vec3 positionTarget;
      
      varying float vLight;
      varying vec3 vColor;

      void main() {
          // 1. MAP LOOKUP
          vec4 mapData = texture2D(uEarthMap, uv);
          float isLand = 1.0 - smoothstep(0.2, 0.5, mapData.r);

          // 2. ROTATION (Spin & Tilt)
          vec3 pos = position;
          
          // Spin (Y-Axis)
          float spinSpeed = 0.05;
          float c = cos(uTime * spinSpeed);
          float s = sin(uTime * spinSpeed);
          float xSpin = pos.x * c - pos.z * s;
          float zSpin = pos.x * s + pos.z * c;
          pos.x = xSpin; pos.z = zSpin;

          // Tilt (23.44 deg Z-Axis)
          float tiltRad = -0.41; 
          float cT = cos(tiltRad);
          float sT = sin(tiltRad);
          float xTilt = pos.x * cT - pos.y * sT;
          float yTilt = pos.x * sT + pos.y * cT;
          pos.x = xTilt; pos.y = yTilt;

          // 3. MORPH & CHAOS
          vec3 finalPos = mix(pos, positionTarget, uMorph);

          if (uMorph > 0.01) {
              float noise = sin(finalPos.y * 10.0 + uTime * 5.0);
              finalPos += normal * noise * uMorph * 0.8;
          }

          vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
          gl_Position = projectionMatrix * mvPosition;

          // 4. LIGHTING
          vec3 lightDir = normalize(vec3(1.0, 0.5, 1.0));
          vec3 n = normal;
          float nx = n.x * c - n.z * s; float nz = n.x * s + n.z * c;
          n.x = nx; n.z = nz;
          float nxt = n.x * cT - n.y * sT; float nyt = n.x * sT + n.y * cT;
          n.x = nxt; n.y = nyt;
          
          float light = max(0.2, dot(normalize(n), lightDir));
          vLight = light;

          // --- COLORS (High End Palette) ---
          
          // OCEAN: Deep Matte Slate
          vec3 cOcean = vec3(0.05, 0.07, 0.12);

          // LAND PALETTE:
          vec3 cSage   = vec3(0.35, 0.45, 0.35); // Muted Green
          vec3 cSand   = vec3(0.60, 0.55, 0.45); // Dark Tan
          vec3 cClay   = vec3(0.55, 0.35, 0.25); // Burnt Orange/Brown

          // Mix land colors based on latitude
          float lat = abs(position.y) * 0.4;
          vec3 landMix = mix(cSage, cClay, lat);
          float landNoise = sin(position.x * 20.0) * 0.5 + 0.5;
          landMix = mix(landMix, cSand, landNoise * 0.3);

          vec3 finalEarthColor = mix(cOcean, landMix, isLand);

          // CHAOS PALETTE (Alien Green)
          vec3 cToxic  = vec3(0.2, 0.9, 0.0);
          vec3 cWhite  = vec3(0.8, 1.0, 0.8);
          float shimmer = sin(finalPos.x * 10.0 + uTime * 5.0) * 0.5 + 0.5;
          vec3 cChaos = mix(cToxic, cWhite, shimmer);

          vColor = mix(finalEarthColor, cChaos, uMorph);

          // --- SIZE ---
          float sizeMap = mix(0.5, 1.0, isLand);
          float visibility = max(sizeMap, uMorph); 
          
          gl_PointSize = 2.0 * uPixelRatio * (1.0 + light * 0.3) * (12.0 / -mvPosition.z) * visibility;
      }
    `;

        const fragmentShader = `
      precision highp float;
      varying float vLight;
      varying vec3 vColor;

      void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          if (length(coord) > 0.5) discard;
          gl_FragColor = vec4(vColor * (0.6 + 0.4 * vLight), 1.0);
      }
    `;

        // --- GEOMETRY ---
        const geometry = new THREE.SphereGeometry(SETTINGS.radius, 200, 200);
        const count = geometry.attributes.position.count;

        const targetPositions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const r = 6.0;
            targetPositions[i * 3] = (Math.random() - 0.5) * r * 2;
            targetPositions[i * 3 + 1] = (Math.random() - 0.5) * r * 2;
            targetPositions[i * 3 + 2] = (Math.random() - 0.5) * r * 2;
        }
        geometry.setAttribute('positionTarget', new THREE.BufferAttribute(targetPositions, 3));

        const material = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uMorph: { value: 0 },
                uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
                uEarthMap: { value: earthMap }
            },
            transparent: true,
            blending: THREE.NormalBlending,
            depthTest: false
        });

        const mesh = new THREE.Points(geometry, material);
        scene.add(mesh);

        // --- ANIMATION ---
        const clock = new THREE.Clock();
        let animationId: number;

        const animate = () => {
            animationId = requestAnimationFrame(animate);
            const t = clock.getElapsedTime();
            material.uniforms.uTime.value = t;

            // Cycle: Earth -> Chaos -> Earth
            let cycle = (Math.sin(t * 0.2) + 1.0) * 0.5;
            cycle = Math.pow(cycle, 12.0);
            material.uniforms.uMorph.value = cycle;

            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            material.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);
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
            earthMap.dispose();
        };
    }, []);

    return <div ref={containerRef} className="absolute inset-0 z-0" />;
}
