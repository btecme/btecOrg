'use client';

import { useEffect, useRef } from 'react';

type Point = { x: number; y: number; z: number; light: number; size: number };
const gaussian = (x: number, y: number, cx: number, cy: number, sx: number, sy: number) =>
  Math.exp(-(((x - cx) / sx) ** 2) - ((y - cy) / sy) ** 2);

// An original sculpted point field: brow, recessed eyes, nose, cheeks, lips and jaw.
function face(x: number, y: number) {
  return .46 * Math.sqrt(Math.max(0, 1 - (x / .92) ** 2 - (y / 1.6) ** 2))
    + .30 * gaussian(x, y, 0, .02, .14, .48)
    + .26 * gaussian(x, y, 0, -.17, .17, .15)
    + .08 * gaussian(x, y, 0, -.57, .34, .10)
    + .09 * gaussian(x, y, 0, -.86, .28, .16)
    + .11 * gaussian(x, y, -.38, -.18, .25, .23)
    + .11 * gaussian(x, y, .38, -.18, .25, .23)
    + .10 * gaussian(x, y, -.31, .42, .29, .12)
    + .10 * gaussian(x, y, .31, .42, .29, .12)
    - .17 * gaussian(x, y, -.32, .23, .22, .13)
    - .17 * gaussian(x, y, .32, .23, .22, .13)
    - .06 * gaussian(x, y, 0, -.62, .28, .025);
}

function sculpt() {
  const points: Point[] = [];
  let seed = 71;
  const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  for (let row = 0; row < 115; row++) {
    const y = -1.13 + row / 114 * 2.62;
    const jaw = y < -.30 ? 1 - (-y - .30) * .28 : 1;
    const width = .87 * Math.sqrt(Math.max(0, 1 - ((y - .16) / 1.35) ** 2)) * jaw;
    for (let col = 0; col < 67; col++) {
      const x = (col / 66 * 2 - 1) * width;
      if (random() < .15) continue;
      const jx = x + (random() - .5) * .013;
      const jy = y + (random() - .5) * .012;
      const edge = Math.abs(x) / Math.max(width, .01);
      const dx = (face(jx + .015, jy) - face(jx - .015, jy)) / .03;
      const dy = (face(jx, jy + .015) - face(jx, jy - .015)) / .03;
      const lighting = Math.max(.08, (-dx * -.55 - dy * .45 + .75) / Math.hypot(dx, dy, 1));
      points.push({ x: jx, y: jy, z: face(jx, jy), light: (.30 + random() * .35) * lighting + edge * .1, size: random() > .97 ? 1.7 : .65 + random() * .65 });
    }
  }
  // A receding cranial shell and fragmented neck give the face actual volume.
  for (let i = 0; i < 1300; i++) {
    const a = random() * Math.PI * 2;
    const y = random() * 2.5 - 1.05;
    const radius = Math.sqrt(Math.max(0, 1 - ((y - .2) / 1.35) ** 2));
    points.push({ x: Math.sin(a) * .84 * radius, y, z: -Math.abs(Math.cos(a)) * .62 * radius, light: .025 + random() * .07, size: .7 });
  }
  for (let i = 0; i < 500; i++) {
    const y = -1.05 - random() * .7;
    const x = (random() - .5) * (.58 + Math.max(0, -y - 1.4) * 2.7);
    points.push({ x, y, z: -.10 + random() * .18, light: .08 + random() * .20, size: .7 });
  }
  return points.sort((a, b) => a.z - b.z);
}

export default function AgentPresence() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!root || !canvas || !ctx) return;
    const points = sculpt();
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const fine = matchMedia('(any-hover: hover) and (any-pointer: fine)');
    let width = 0, height = 0, frame = 0, lastTime = 0;
    let x = -.18, y = 0, targetX = -.18, targetY = 0, scroll = window.scrollY, targetScroll = scroll;
    const canMove = () => !reduced.matches && fine.matches;
    const clamp = (n: number, bound: number) => Math.max(-bound, Math.min(bound, n));

    function render() {
      if (!ctx || !canvas || !root) return;
      ctx.clearRect(0, 0, width, height);
      const scale = Math.min(height * .255, width * (width < 641 ? .55 : .26));
      const cx = width * (width < 641 ? .72 : .77);
      const cy = height * .51 + Math.sin(scroll / 1200) * 22;
      const yaw = x, pitch = y;
      const project = (px: number, py: number, pz: number) => {
        const rx = px * Math.cos(yaw) + pz * Math.sin(yaw);
        const rz = -px * Math.sin(yaw) + pz * Math.cos(yaw);
        const ry = py * Math.cos(pitch) - rz * Math.sin(pitch);
        const depth = 4 / (4 - (py * Math.sin(pitch) + rz * Math.cos(pitch)));
        return { x: cx + rx * scale * depth, y: cy - ry * scale * depth, depth };
      };
      for (const p of points) {
        const q = project(p.x, p.y, p.z);
        ctx.fillStyle = `rgba(42,188,231,${p.light * .90})`;
        ctx.beginPath(); ctx.arc(q.x, q.y, p.size * q.depth, 0, Math.PI * 2); ctx.fill();
      }
      // Broken contour strokes suggest a scanned sculpture rather than a solid mask.
      ctx.lineWidth = .6;
      for (let row = 0; row < 39; row++) {
        const py = -1.07 + row * .065;
        const jaw = py < -.30 ? 1 - (-py - .30) * .28 : 1;
        const span = .87 * Math.sqrt(Math.max(0, 1 - ((py - .16) / 1.35) ** 2)) * jaw;
        ctx.strokeStyle = `rgba(75,203,240,${row % 4 === 0 ? .16 : .07})`;
        ctx.beginPath();
        for (let col = 0; col <= 80; col++) {
          const px = (col / 80 * 2 - 1) * span;
          const q = project(px, py, face(px, py));
          if (col === 0 || (col + row * 3) % 23 === 0) ctx.moveTo(q.x, q.y); else ctx.lineTo(q.x, q.y);
        }
        ctx.stroke();
      }
      // Sparse anatomical accents retain the impression of a calm human face.
      const trace = (coordinates: number[][], alpha: number) => {
        ctx.strokeStyle = `rgba(89,214,251,${alpha})`; ctx.lineWidth = .8; ctx.beginPath();
        coordinates.forEach(([px, py], i) => {
          const q = project(px, py, face(px, py) + .008);
          if (!i) ctx.moveTo(q.x, q.y); else ctx.lineTo(q.x, q.y);
        }); ctx.stroke();
      };
      trace([[-.12,.31],[-.13,.11],[-.17,-.14],[-.13,-.23],[0,-.28],[.13,-.23],[.17,-.14]], .30);
      trace([[-.26,-.59],[-.14,-.56],[0,-.58],[.14,-.56],[.26,-.59]], .31);
      trace([[-.23,-.64],[-.12,-.68],[.02,-.69],[.15,-.67],[.23,-.63]], .14);
      for (const side of [-1, 1]) {
        trace([[side*.14,.42],[side*.27,.47],[side*.42,.45],[side*.55,.37]], .25);
        trace([[side*.50,.05],[side*.58,-.11],[side*.52,-.29]], .13);
      }
      // Quiet almond-shaped eyes; pupils move a little beyond the head's turn.
      for (const side of [-1, 1]) {
        const ex = side * .32, ey = .23;
        ctx.strokeStyle = 'rgba(114,222,255,.48)'; ctx.lineWidth = .85; ctx.beginPath();
        for (let i = 0; i <= 40; i++) {
          const a = i / 40 * Math.PI * 2;
          const px = ex + Math.cos(a) * .15;
          const py = ey + Math.sin(a) * .045;
          const q = project(px, py, face(px, py) + .015);
          if (!i) ctx.moveTo(q.x, q.y); else ctx.lineTo(q.x, q.y);
        }
        ctx.stroke();
        const pupil = project(ex + yaw * .055, ey - pitch * .06, face(ex, ey) + .028);
        ctx.fillStyle = 'rgba(156,235,255,.72)'; ctx.beginPath(); ctx.arc(pupil.x, pupil.y, scale * .016, 0, Math.PI * 2); ctx.fill();
      }
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
      targetY = clamp((event.clientY / innerHeight - .51) * .65, .28); schedule();
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
      <path d="M128 548 153 440 119 381 96 274 102 171 144 105 206 78 267 104 302 172 308 275 286 376 251 438 276 548M153 440Q203 481 251 438M123 239Q153 218 177 244M229 244Q253 218 282 239M199 232 181 314 207 328 221 313M167 373Q204 391 242 370" stroke="currentColor" strokeWidth="1.2" />
      <ellipse cx="203" cy="275" rx="140" ry="211" stroke="currentColor" strokeDasharray="1 12" />
    </svg>
    <canvas className="agent-canvas" ref={canvasRef} />
  </div>;
}
