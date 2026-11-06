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
  const motionButtonRef = useRef<HTMLButtonElement>(null);

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
    const motionButton = motionButtonRef.current;
    const storageKey = 'btec-background-motion';
    let motionChoice: boolean | null = null;
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved === 'on' || saved === 'off') motionChoice = saved === 'on';
    } catch { /* Motion still works when browser storage is unavailable. */ }
    const motionEnabled = () => motionChoice ?? true;
    let width = 0, height = 0, frame = 0, lastTime = 0;
    let x = -.18, y = 0, targetX = -.18, targetY = 0, scroll = 0, targetScroll = window.scrollY;
    let pointerPosition: { x: number; y: number } | null = null;
    // A real mouse/pen event is stronger evidence than device media queries,
    // which can misreport the available pointer in remote or hybrid sessions.
    const canMove = () => motionEnabled() && (fine.matches || pointerPosition !== null);
    const drift = () => -Math.min(Math.max(scroll, 0) * .12, width * .48);
    const center = () => ({ x: width * (width < 641 ? .72 : .77) + drift(), y: height * .56 });
    const clamp = (n: number, bound: number) => Math.max(-bound, Math.min(bound, n));

    function render() {
      if (!ctx || !canvas || !root) return;
      ctx.clearRect(0, 0, width, height);
      const scale = Math.min(height * .235, width * (width < 641 ? .55 : .26));
      const { x: cx, y: cy } = center();
      const yaw = x, pitch = y;
      const project = (px: number, py: number, pz: number, head = true) => {
        const turn = head ? yaw : 0, tilt = head ? pitch : 0;
        const rx = px * Math.cos(turn) + pz * Math.sin(turn);
        const rz = -px * Math.sin(turn) + pz * Math.cos(turn);
        const ry = py * Math.cos(tilt) - rz * Math.sin(tilt);
        const depth = 4 / (4 - (py * Math.sin(tilt) + rz * Math.cos(tilt)));
        return { x: cx + rx * scale * depth, y: cy - ry * scale * depth, depth };
      };
      const outline = (vertices: Vector[]) => {
        ctx.beginPath();
        vertices.forEach((p, i) => { const q = project(p.x, p.y, p.z); if (i) ctx.lineTo(q.x, q.y); else ctx.moveTo(q.x, q.y); });
        ctx.closePath();
      };
      const contour = (vertices: number[][]) => {
        ctx.beginPath();
        vertices.forEach(([px, py, pz], i) => { const q = project(px, py, pz, false); if (i) ctx.lineTo(q.x, q.y); else ctx.moveTo(q.x, q.y); });
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
      // The whole sculpture travels left; the halo lags behind for depth.
      root.style.setProperty('--agent-halo-x', `${drift() * .65 - x * 35}px`);
      root.style.setProperty('--agent-halo-y', `${-y * 28}px`);
      root.dataset.offsetX = drift().toFixed(2);
      root.dataset.centerX = cx.toFixed(2);
      root.dataset.centerY = cy.toFixed(2);
      root.dataset.scrollMotion = motionEnabled() ? 'drifting' : 'static';
      root.dataset.motionPreference = motionChoice === null ? 'default-on' : motionChoice ? 'on' : 'off';
      root.dataset.reducedMotion = String(reduced.matches);
      root.dataset.yaw = yaw.toFixed(4); root.dataset.pitch = pitch.toFixed(4);
      root.dataset.motion = canMove() ? 'interactive' : 'static';
      root.dataset.ready = 'true';
    }
    function tick(time: number) {
      frame = 0;
      const step = 1 - Math.exp(-Math.min(time - (lastTime || time - 16), 64) / 115);
      lastTime = time;
      scroll += (targetScroll - scroll) * step;
      aim();
      x += (targetX - x) * step; y += (targetY - y) * step;
      render();
      if (Math.abs(targetX - x) + Math.abs(targetY - y) + Math.abs(targetScroll - scroll) > .001) schedule();
    }
    function schedule() { if (!frame && !document.hidden) frame = requestAnimationFrame(tick); }
    function resize() {
      width = root!.clientWidth; height = innerHeight;
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      canvas!.width = Math.round(width * dpr); canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0); aim(); render(); schedule();
    }
    function aim() {
      if (!canMove() || !pointerPosition) { targetX = -.18; targetY = 0; return; }
      // Gaze is relative to the current, drifting head, not the viewport center.
      // Live dimensions also cover pointer events arriving before resize handling.
      const liveWidth = root!.clientWidth;
      const currentX = liveWidth * (liveWidth < 641 ? .72 : .77)
        - Math.min(Math.max(scroll, 0) * .12, liveWidth * .48);
      targetX = clamp(Math.atan2(pointerPosition.x - currentX, liveWidth * .42), .78);
      targetY = clamp(Math.atan2(pointerPosition.y - innerHeight * .56, innerHeight * .72), .46);
    }
    function pointer(event: PointerEvent) {
      if (event.pointerType === 'touch') return;
      pointerPosition = { x: event.clientX, y: event.clientY };
      if (canMove()) { aim(); schedule(); }
    }
    function reset() { pointerPosition = null; aim(); schedule(); }
    function onScroll() { if (motionEnabled()) { targetScroll = window.scrollY; schedule(); } }
    function preference() {
      const enabled = motionEnabled();
      if (motionButton) {
        motionButton.hidden = false;
        motionButton.textContent = enabled ? 'Motion: on' : 'Motion: off';
        motionButton.setAttribute('aria-pressed', String(enabled));
        motionButton.setAttribute('aria-label', enabled ? 'Pause background motion' : 'Enable background motion');
        motionButton.title = enabled ? 'Pause background motion' : 'Enable background motion';
      }
      if (!enabled) { cancelAnimationFrame(frame); frame = 0; lastTime = 0; x = targetX = -.18; y = targetY = 0; scroll = targetScroll = 0; render(); }
      else { targetScroll = window.scrollY; aim(); schedule(); }
    }
    function toggleMotion() {
      motionChoice = !motionEnabled();
      try { localStorage.setItem(storageKey, motionChoice ? 'on' : 'off'); } catch { /* Optional persistence. */ }
      preference();
    }
    function visibility() { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; lastTime = 0; } else schedule(); }
    window.addEventListener('pointermove', pointer, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', resize);
    window.addEventListener('blur', reset);
    document.documentElement.addEventListener('pointerleave', reset);
    document.addEventListener('visibilitychange', visibility);
    reduced.addEventListener('change', preference); fine.addEventListener('change', preference);
    motionButton?.addEventListener('click', toggleMotion);
    const sizeObserver = new ResizeObserver(resize);
    sizeObserver.observe(root);
    resize(); preference();
    return () => {
      cancelAnimationFrame(frame);
      sizeObserver.disconnect();
      window.removeEventListener('pointermove', pointer); window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resize); window.removeEventListener('blur', reset);
      document.documentElement.removeEventListener('pointerleave', reset); document.removeEventListener('visibilitychange', visibility);
      reduced.removeEventListener('change', preference); fine.removeEventListener('change', preference);
      motionButton?.removeEventListener('click', toggleMotion);
    };
  }, []);

  return <><div className="agent-presence" ref={rootRef} aria-hidden="true">
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
  </div>
    <button className="agent-motion-control" ref={motionButtonRef} type="button" hidden aria-label="Enable background motion" aria-pressed="false">Motion: off</button>
  </>;
}
