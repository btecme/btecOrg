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

type BodyPanel = { points: Vector[]; normal: Vector; depth: number };

// A continuous rounded bust, not a flat shoulder cutout. The cross sections
// narrow into the neck and roll out over the trapezius and shoulder caps.
function torso(): BodyPanel[] {
  const rings = [
    [.30, .28], [.33, .32], [.44, .37], [.82, .46],
    [1.32, .55], [1.78, .65], [2.02, .73], [2.17, .78],
    [2.18, .80], [2.27, .82],
  ];
  const profile = (v: number, axis: number) => {
    const t = Math.max(0, Math.min(1, v)) * (rings.length - 1);
    const i = Math.min(rings.length - 2, Math.floor(t)), f = t - i;
    const a = rings[Math.max(0, i - 1)][axis], b = rings[i][axis];
    const c = rings[i + 1][axis], d = rings[Math.min(rings.length - 1, i + 2)][axis];
    return .5 * (2 * b + (-a + c) * f + (2 * a - 5 * b + 4 * c - d) * f * f + (-a + 3 * b - 3 * c + d) * f * f * f);
  };
  const point = (v: number, a: number): Vector => {
    const y = -.84 - v * 2.28, x = Math.sin(a) * profile(v, 0);
    const front = Math.max(0, Math.cos(a));
    const tendonX = .16 + Math.max(0, -y - 1.05) * .30;
    const tendons = .065 * Math.exp(-1 * ((Math.abs(x) - tendonX) / .095) ** 2) * Math.exp(-1 * ((y + 1.32) / .38) ** 2);
    const collar = .085 * Math.exp(-1 * ((y + 1.78 + Math.abs(x) * .16) / .065) ** 2) * Math.exp(-1 * (x / 1.45) ** 4);
    const sternum = -.055 * Math.exp(-1 * (x / .18) ** 2) * Math.exp(-1 * ((y + 2.03) / .48) ** 2);
    return { x, y, z: -.19 + Math.cos(a) * profile(v, 1) + front ** 3 * (tendons + collar + sternum) };
  };
  const panels: BodyPanel[] = [];
  for (let row = 0; row < 72; row++) {
    for (let col = 0; col < 80; col++) {
      const v = (row + .5) / 72, a = (col + .5) / 80 * Math.PI * 2;
      const u0 = point(v, a - .001), u1 = point(v, a + .001);
      const v0 = point(v - .001, a), v1 = point(v + .001, a);
      const u = { x: u1.x - u0.x, y: u1.y - u0.y, z: u1.z - u0.z };
      const w = { x: v1.x - v0.x, y: v1.y - v0.y, z: v1.z - v0.z };
      const n = { x: w.y * u.z - w.z * u.y, y: w.z * u.x - w.x * u.z, z: w.x * u.y - w.y * u.x };
      const length = Math.hypot(n.x, n.y, n.z) || 1;
      panels.push({
        points: [point(row / 72, col / 80 * Math.PI * 2), point(row / 72, (col + 1) / 80 * Math.PI * 2), point((row + 1) / 72, (col + 1) / 80 * Math.PI * 2), point((row + 1) / 72, col / 80 * Math.PI * 2)],
        normal: { x: n.x / length, y: n.y / length, z: n.z / length }, depth: point(v, a).z,
      });
    }
  }
  return panels.sort((a, b) => a.depth - b.depth);
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
    const bodyPanels = torso();
    // Reused only during a short glitch burst; no image decoding or network work.
    const glitchBuffer = document.createElement('canvas');
    const glitchCtx = glitchBuffer.getContext('2d');
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
    let glitchTimer = 0, glitchStart = 0, glitchDuration = 0, glitchCount = 0;
    let glitchSlices: { y: number; h: number; shift: number }[] = [];
    // The site's motion choice stays authoritative. System reduced motion also
    // suppresses unsolicited glitch bursts, while retaining the approved gaze.
    const canGlitch = () => motionEnabled() && !reduced.matches && !document.hidden;
    let x = -.18, y = 0, targetX = -.18, targetY = 0, scroll = 0, targetScroll = window.scrollY;
    let pointerPosition: { x: number; y: number } | null = null;
    // A real mouse/pen event is stronger evidence than device media queries,
    // which can misreport the available pointer in remote or hybrid sessions.
    const canMove = () => motionEnabled() && (fine.matches || pointerPosition !== null);
    const drift = () => -Math.min(Math.max(scroll, 0) * .12, width * .48);
    const center = () => ({ x: width * (width < 641 ? .72 : .77) + drift(), y: height * .56 });
    const clamp = (n: number, bound: number) => Math.max(-bound, Math.min(bound, n));

    function render(time = performance.now()) {
      if (!ctx || !canvas || !root) return;
      ctx.clearRect(0, 0, width, height);
      const scale = Math.min(height * .235, width * (width < 641 ? .55 : .26));
      const { x: cx, y: cy } = center();
      const yaw = x, pitch = y;
      const project = (px: number, py: number, pz: number, head = true) => {
        const turn = head ? yaw : yaw * .16, tilt = head ? pitch : 0;
        const rx = px * Math.cos(turn) + pz * Math.sin(turn);
        const rz = -px * Math.sin(turn) + pz * Math.cos(turn);
        const ry = py * Math.cos(tilt) - rz * Math.sin(tilt);
        const depth = 4 / (4 - (py * Math.sin(tilt) + rz * Math.cos(tilt)));
        return { x: cx + rx * scale * depth, y: cy - ry * scale * depth, depth };
      };
      const outline = (vertices: Vector[], head = true) => {
        ctx.beginPath();
        vertices.forEach((p, i) => { const q = project(p.x, p.y, p.z, head); if (i) ctx.lineTo(q.x, q.y); else ctx.moveTo(q.x, q.y); });
        ctx.closePath();
      };
      ctx.save();
      // Soft light spill separates the obsidian bust from the page's dark ground.
      const atmosphere = ctx.createRadialGradient(cx, cy, scale * .45, cx, cy, scale * 2.5);
      atmosphere.addColorStop(0, 'rgba(0,151,229,.10)'); atmosphere.addColorStop(1, 'rgba(0,118,229,0)');
      ctx.fillStyle = atmosphere; ctx.fillRect(0, 0, width, height);
      // Surface normals light the actual rounded neck, collarbones and shoulders.
      // Wide highlights describe volume; the opposite cyan rim separates the
      // dark material from the page without outlining a flat silhouette.
      const bodyTurn = yaw * .16;
      for (const panel of bodyPanels) {
        const n = panel.normal;
        const nx = n.x * Math.cos(bodyTurn) + n.z * Math.sin(bodyTurn);
        const nz = -n.x * Math.sin(bodyTurn) + n.z * Math.cos(bodyTurn);
        if (nz < -.12) continue;
        const key = Math.max(0, nx * -.58 + n.y * .57 + nz * .58);
        const specular = Math.max(0, nx * -.32 + n.y * .32 + nz * .89) ** 22;
        const rim = Math.max(0, nx * .83 + n.y * .16 - nz * .53) ** 3;
        const edge = Math.max(0, 1 - Math.max(0, nz)) ** 3;
        outline(panel.points, false);
        ctx.fillStyle = `rgb(${Math.round(8 + key * 38 + specular * 39 + rim * 13)},${Math.round(18 + key * 52 + specular * 60 + rim * 63 + edge * 8)},${Math.round(26 + key * 62 + specular * 72 + rim * 85 + edge * 14)})`;
        ctx.fill(); ctx.strokeStyle = ctx.fillStyle; ctx.lineWidth = .65; ctx.stroke();
      }
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
      // A few displaced scanline fragments, never a full-page flash. Capture
      // once per painted frame so slices do not accumulate or smear over time.
      const glitching = canGlitch() && glitchStart > 0 && time - glitchStart < glitchDuration;
      if (glitching && glitchCtx) {
        glitchCtx.clearRect(0, 0, glitchBuffer.width, glitchBuffer.height);
        glitchCtx.drawImage(canvas, 0, 0);
        const envelope = Math.sin(Math.PI * (time - glitchStart) / glitchDuration);
        for (const slice of glitchSlices) {
          const sy = Math.max(0, Math.min(height - 1, cy + slice.y * scale));
          const sh = Math.max(1, Math.min(height - sy, slice.h * scale));
          const left = Math.max(0, cx - scale * 2.35), span = Math.min(width - left, scale * 4.7);
          const dpr = canvas.width / width;
          ctx.globalAlpha = .70 * envelope;
          ctx.clearRect(left, sy, span, sh);
          ctx.drawImage(glitchBuffer, left * dpr, sy * dpr, span * dpr, sh * dpr, left + slice.shift * scale * envelope, sy, span, sh);
          // A dim cyan echo at the displaced seam, not a bright strobe.
          ctx.globalAlpha = .12 * envelope;
          ctx.drawImage(glitchBuffer, left * dpr, sy * dpr, span * dpr, sh * dpr, left - slice.shift * scale * .5, sy, span, sh);
        }
        ctx.globalAlpha = 1;
      }
      root.dataset.glitch = glitching ? 'active' : 'idle';
      root.dataset.glitchCount = String(glitchCount);
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
      render(time);
      if ((canGlitch() && time - glitchStart < glitchDuration) || Math.abs(targetX - x) + Math.abs(targetY - y) + Math.abs(targetScroll - scroll) > .001) schedule();
    }
    function schedule() { if (!frame && !document.hidden) frame = requestAnimationFrame(tick); }
    function queueGlitch() {
      window.clearTimeout(glitchTimer); glitchTimer = 0;
      if (!canGlitch()) return;
      // Sleep between bursts. There is no perpetual idle rendering loop.
      glitchTimer = window.setTimeout(() => {
        glitchTimer = 0;
        if (!canGlitch()) return;
        glitchStart = performance.now(); glitchDuration = 120 + Math.random() * 90;
        glitchCount++;
        glitchSlices = Array.from({ length: 2 + Math.floor(Math.random() * 2) }, () => ({
          y: -1.7 + Math.random() * 3.7, h: .012 + Math.random() * .045,
          shift: (Math.random() < .5 ? -1 : 1) * (.018 + Math.random() * .035),
        }));
        schedule(); queueGlitch();
      }, 4200 + Math.random() * 6800);
    }
    function resize() {
      width = root!.clientWidth; height = innerHeight;
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      canvas!.width = Math.round(width * dpr); canvas!.height = Math.round(height * dpr);
      glitchBuffer.width = canvas!.width; glitchBuffer.height = canvas!.height;
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
      glitchStart = 0; queueGlitch();
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
    function visibility() {
      window.clearTimeout(glitchTimer); glitchTimer = 0; glitchStart = 0;
      if (document.hidden) { cancelAnimationFrame(frame); frame = 0; lastTime = 0; }
      else { schedule(); queueGlitch(); }
    }
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
      cancelAnimationFrame(frame); window.clearTimeout(glitchTimer);
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
