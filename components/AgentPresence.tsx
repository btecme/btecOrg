'use client';

import { useEffect, useRef } from 'react';

type Vector = { x: number; y: number; z: number };
type Panel = { points: Vector[]; light: number };
const signedPower = (n: number, power: number) => Math.sign(n) * Math.abs(n) ** power;

// Original featureless agent shell. The front is a single luminous faceplate,
// deliberately without anatomical features, eyes, text or a character logo.
function shell() {
  const panels: Panel[] = [];
  const point = (row: number, col: number): Vector => {
    const v = row / 48 * Math.PI;
    const a = col / 64 * Math.PI * 2;
    const y = .21 + 1.43 * Math.cos(v);
    const r = Math.sin(v) ** .8;
    const taper = y < -.35 ? 1 - (-y - .35) * .13 : 1;
    return { x: Math.sin(a) * .91 * r * taper, y, z: Math.cos(a) * .66 * r };
  };
  for (let row = 0; row < 48; row++) {
    for (let col = 0; col < 64; col++) {
      const a = (col + .5) / 64 * Math.PI * 2;
      const v = (row + .5) / 48 * Math.PI;
      const light = Math.max(0, Math.sin(a) * -.55 + Math.cos(v) * .25 + Math.cos(a) * .20);
      panels.push({ points: [point(row, col), point(row, col + 1), point(row + 1, col + 1), point(row + 1, col)], light });
    }
  }
  return panels;
}

function plate(w: number, h: number, z: number) {
  return Array.from({ length: 128 }, (_, i): Vector => {
    const a = i / 128 * Math.PI * 2;
    const x = w * signedPower(Math.cos(a), .43);
    const y = .22 + h * signedPower(Math.sin(a), .43);
    return { x, y, z: z - .12 * (x / w) ** 2 - .035 * ((y - .22) / h) ** 2 };
  });
}

export default function AgentPresence() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!root || !canvas || !ctx) return;
    const panels = shell();
    const bezel = plate(.65, 1.18, .71);
    const screen = plate(.56, 1.09, .733);
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const fine = matchMedia('(any-hover: hover) and (any-pointer: fine)');
    let width = 0, height = 0, frame = 0, lastTime = 0;
    let x = -.18, y = 0, targetX = -.18, targetY = 0, scroll = window.scrollY, targetScroll = scroll;
    const canMove = () => !reduced.matches && fine.matches;
    const clamp = (n: number, bound: number) => Math.max(-bound, Math.min(bound, n));

    function render() {
      if (!ctx || !canvas || !root) return;
      ctx.clearRect(0, 0, width, height);
      const scale = Math.min(height * .235, width * (width < 641 ? .55 : .26));
      const cx = width * (width < 641 ? .72 : .77);
      const cy = height * .56 + Math.sin(scroll / 1200) * 22;
      const yaw = x, pitch = y;
      const project = (px: number, py: number, pz: number) => {
        const rx = px * Math.cos(yaw) + pz * Math.sin(yaw);
        const rz = -px * Math.sin(yaw) + pz * Math.cos(yaw);
        const ry = py * Math.cos(pitch) - rz * Math.sin(pitch);
        const depth = 4 / (4 - (py * Math.sin(pitch) + rz * Math.cos(pitch)));
        return { x: cx + rx * scale * depth, y: cy - ry * scale * depth, depth };
      };
      const outline = (vertices: Vector[]) => {
        ctx.beginPath();
        vertices.forEach((p, i) => { const q = project(p.x, p.y, p.z); if (i) ctx.lineTo(q.x, q.y); else ctx.moveTo(q.x, q.y); });
        ctx.closePath();
      };
      const contour = (vertices: number[][]) => {
        ctx.beginPath();
        vertices.forEach(([px, py, pz], i) => { const q = project(px, py, pz); if (i) ctx.lineTo(q.x, q.y); else ctx.moveTo(q.x, q.y); });
        ctx.closePath();
      };
      ctx.save();
      // Soft light spill separates the obsidian bust from the page's dark ground.
      const atmosphere = ctx.createRadialGradient(cx, cy, scale * .45, cx, cy, scale * 2.5);
      atmosphere.addColorStop(0, 'rgba(0,151,229,.10)'); atmosphere.addColorStop(1, 'rgba(0,118,229,0)');
      ctx.fillStyle = atmosphere; ctx.fillRect(0, 0, width, height);
      // Shoulders and a tapered articulated neck, receding behind the head.
      contour([[-2.05,-2.4,-.3],[-1.98,-2.17,-.3],[-1.43,-1.94,-.23],[-.66,-1.63,-.16],[-.34,-1.4,-.14],[-.30,-.88,-.2],[.34,-.88,-.2],[.38,-1.43,-.14],[.69,-1.64,-.16],[1.48,-1.97,-.23],[2.0,-2.2,-.3],[2.05,-2.4,-.3]]);
      const body = ctx.createLinearGradient(cx - scale * 1.6, cy, cx + scale * 1.6, cy + scale * 2);
      body.addColorStop(0, '#17303b'); body.addColorStop(.32, '#07141c'); body.addColorStop(.7, '#060e16'); body.addColorStop(1, '#10232e');
      ctx.fillStyle = body; ctx.shadowColor = '#00b9ff'; ctx.shadowBlur = scale * .035; ctx.fill();
      ctx.strokeStyle = 'rgba(59,188,236,.20)'; ctx.lineWidth = 1; ctx.stroke(); ctx.shadowBlur = 0;
      // Depth-sort the rounded shell to preserve real head rotation.
      const ordered = panels.map(p => ({ ...p, depth: p.points.reduce((d, v) => d - v.x * Math.sin(yaw) + v.z * Math.cos(yaw), 0) / 4 })).sort((a, b) => a.depth - b.depth);
      for (const p of ordered) {
        outline(p.points);
        const l = p.light;
        ctx.fillStyle = `rgb(${Math.round(5+l*24)},${Math.round(15+l*42)},${Math.round(23+l*48)})`;
        ctx.fill(); ctx.strokeStyle = ctx.fillStyle; ctx.lineWidth = .6; ctx.stroke();
      }
      outline(bezel);
      ctx.fillStyle = '#030e17'; ctx.fill();
      ctx.strokeStyle = 'rgba(85,200,245,.18)'; ctx.lineWidth = scale * .022; ctx.stroke();
      outline(screen);
      const glass = ctx.createLinearGradient(cx - scale * .7, cy - scale * 1.1, cx + scale * .7, cy + scale * 1.1);
      glass.addColorStop(0, '#65d8ff'); glass.addColorStop(.22, '#28b8ed'); glass.addColorStop(.65, '#0598d2'); glass.addColorStop(1, '#43cefa');
      ctx.fillStyle = glass; ctx.shadowColor = '#00c8ff'; ctx.shadowBlur = scale * .055; ctx.fill(); ctx.shadowBlur = 0;
      ctx.strokeStyle = 'rgba(160,234,255,.42)'; ctx.lineWidth = 1.2; ctx.stroke();
      // Diffused, vertical brushwork gives the glass an impressionistic finish.
      ctx.save(); ctx.clip();
      for (let i = 0; i < 96; i++) {
        const px = (i / 95 * 2 - 1) * .56;
        const top = project(px, 1.34, .733 - .12 * (px / .56) ** 2);
        const bottom = project(px, -.9, .733 - .12 * (px / .56) ** 2);
        ctx.beginPath(); ctx.moveTo(top.x, top.y); ctx.lineTo(bottom.x, bottom.y);
        ctx.strokeStyle = `rgba(184,239,255,${.012 + (Math.sin(i * 19.71) + 1) * .018})`;
        ctx.lineWidth = scale * (.003 + (i % 3) * .002); ctx.stroke();
      }
      const sheen = ctx.createLinearGradient(cx - scale * .8, cy, cx + scale * .7, cy);
      sheen.addColorStop(0, 'rgba(214,249,255,.20)'); sheen.addColorStop(.19, 'rgba(214,249,255,0)'); sheen.addColorStop(.8, 'rgba(0,36,71,.07)'); sheen.addColorStop(1, 'rgba(0,36,71,.25)');
      ctx.fillStyle = sheen; ctx.fillRect(0, 0, width, height); ctx.restore();
      // Fade the sculpture into the page instead of ending at a hard cutout.
      ctx.globalCompositeOperation = 'destination-in';
      const fade = ctx.createLinearGradient(0, cy + scale * 1.35, 0, cy + scale * 2.45);
      fade.addColorStop(0, '#fff'); fade.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = fade; ctx.fillRect(0, 0, width, height); ctx.restore();
      root.style.setProperty('--agent-halo-x', `${-x * 35}px`);
      root.style.setProperty('--agent-halo-y', `${-y * 28 + Math.sin(scroll / 1200) * 40}px`);
      canvas.style.transform = `translate3d(${x * 10}px, ${y * 8}px, 0)`;
      root.dataset.yaw = yaw.toFixed(4); root.dataset.pitch = pitch.toFixed(4);
      root.dataset.motion = canMove() ? 'interactive' : 'static';
      root.dataset.ready = 'true';
    }
    function tick(time: number) {
      frame = 0;
      const step = 1 - Math.exp(-Math.min(time - (lastTime || time - 16), 64) / 115);
      lastTime = time;
      x += (targetX - x) * step; y += (targetY - y) * step; scroll += (targetScroll - scroll) * step;
      render();
      if (Math.abs(targetX - x) + Math.abs(targetY - y) + Math.abs(targetScroll - scroll) > .001) schedule();
    }
    function schedule() { if (!frame && !document.hidden) frame = requestAnimationFrame(tick); }
    function resize() {
      width = innerWidth; height = innerHeight;
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      canvas!.width = Math.round(width * dpr); canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0); render();
    }
    function pointer(event: PointerEvent) {
      if (!canMove() || event.pointerType === 'touch') return;
      // Track the pointer relative to the visible head, including over links/nav.
      // Pointer events can precede the queued resize event: use current viewport dimensions.
      targetX = clamp((event.clientX / innerWidth - (innerWidth < 641 ? .72 : .77)) * .95, .55);
      targetY = clamp((event.clientY / innerHeight - .56) * .65, .28); schedule();
    }
    function reset() { targetX = -.18; targetY = 0; schedule(); }
    function onScroll() { if (canMove()) { targetScroll = window.scrollY; schedule(); } }
    function preference() {
      if (!canMove()) { cancelAnimationFrame(frame); frame = 0; x = targetX = -.18; y = targetY = 0; scroll = targetScroll = 0; render(); }
      else { targetScroll = window.scrollY; schedule(); }
    }
    function visibility() { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; lastTime = 0; } else schedule(); }
    window.addEventListener('pointermove', pointer, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', resize);
    window.addEventListener('blur', reset);
    document.documentElement.addEventListener('pointerleave', reset);
    document.addEventListener('visibilitychange', visibility);
    reduced.addEventListener('change', preference); fine.addEventListener('change', preference);
    resize(); preference();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', pointer); window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resize); window.removeEventListener('blur', reset);
      document.documentElement.removeEventListener('pointerleave', reset); document.removeEventListener('visibilitychange', visibility);
      reduced.removeEventListener('change', preference); fine.removeEventListener('change', preference);
    };
  }, []);

  return <div className="agent-presence" ref={rootRef} aria-hidden="true">
    <div className="agent-halo" />
    <svg className="agent-fallback" viewBox="0 0 400 600" fill="none">
      <defs>
        <linearGradient id="agent-glass" x1="125" y1="70" x2="270" y2="370" gradientUnits="userSpaceOnUse"><stop stopColor="#65d8ff" /><stop offset="1" stopColor="#079bd5" /></linearGradient>
        <linearGradient id="agent-shell" x1="80" y1="100" x2="330" y2="470" gradientUnits="userSpaceOnUse"><stop stopColor="#25414e" /><stop offset=".6" stopColor="#07141c" /><stop offset="1" stopColor="#10232e" /></linearGradient>
      </defs>
      <path d="M12 590 35 545 143 488 161 452 159 395Q96 372 91 286L91 174Q91 65 195 57 305 57 309 170L310 292Q309 369 245 398L245 455 263 488 367 548 389 590Z" fill="url(#agent-shell)" stroke="#2986ab" strokeOpacity=".35" />
      <path d="M140 105Q143 89 166 88L235 90Q259 92 261 115L260 342Q257 368 233 371L163 368Q141 366 139 341Z" fill="url(#agent-glass)" />
    </svg>
    <canvas className="agent-canvas" ref={canvasRef} />
  </div>;
}
