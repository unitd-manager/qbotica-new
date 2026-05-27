"use client";

import { useEffect, useRef } from "react";
import heroStyles from './home-banner-with-rotating-cube.module.css';

// ─── Land dots ────────────────────────────────────────────────────────────────
const LAND_DOTS = [];
(function buildDots() {
  for (let lat = -80; lat <= 80; lat += 4.5) {
    for (let lng = -180; lng < 180; lng += 5) {
      const isLand =
        (lat > 10  && lat < 75  && lng > -140 && lng < -55) ||
        (lat > -55 && lat < 15  && lng > -82  && lng < -34) ||
        (lat > 35  && lat < 72  && lng > -12  && lng < 45)  ||
        (lat > -36 && lat < 38  && lng > -18  && lng < 52)  ||
        (lat > 0   && lat < 78  && lng > 45   && lng < 150) ||
        (lat > -40 && lat < -10 && lng > 113  && lng < 155) ||
        (lat > 60  && lat < 84  && lng > -58  && lng < -18);
      if (isLand) LAND_DOTS.push([lat, lng]);
    }
  }
})();

// ─── City pairs for arc trails ────────────────────────────────────────────────
const CITY_PAIRS = [
  [[40.7, -74.0],  [51.5,  -0.1]],
  [[51.5,  -0.1],  [48.8,   2.4]],
  [[35.7, 139.7],  [22.3, 114.2]],
  [[19.4, -99.1],  [-33.9, 151.2]],
  [[55.7,  37.6],  [28.6,  77.2]],
  [[1.35, 103.8],  [40.7, -74.0]],
  [[-23.5,-46.6],  [48.8,   2.4]],
  [[31.2, 121.5],  [37.6,  55.7]],
  [[48.8,   2.4],  [35.7, 139.7]],
  [[-33.9,151.2],  [1.35, 103.8]],
];

// ─── Math helpers ─────────────────────────────────────────────────────────────
function latLngToVec(lat, lng) {
  const phi   = (90 - lat)  * Math.PI / 180;
  const theta = (lng + 180) * Math.PI / 180;
  return [
    -Math.sin(phi) * Math.cos(theta),
     Math.cos(phi),
     Math.sin(phi) * Math.sin(theta),
  ];
}

function rotY(x, y, z, a) {
  return [
    x * Math.cos(a) + z * Math.sin(a),
    y,
   -x * Math.sin(a) + z * Math.cos(a),
  ];
}

function slerp(ax, ay, az, bx, by, bz, t) {
  const dot   = Math.max(-1, Math.min(1, ax*bx + ay*by + az*bz));
  const theta = Math.acos(dot);
  if (Math.abs(theta) < 1e-6) return [ax, ay, az];
  const s  = Math.sin(theta);
  const sa = Math.sin((1 - t) * theta) / s;
  const sb = Math.sin(t * theta) / s;
  return [sa*ax + sb*bx, sa*ay + sb*by, sa*az + sb*bz];
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function HeroSection() {
  const canvasRef    = useRef(null);
  const globeWrapRef = useRef(null);
  const rotRef       = useRef(0);
  const arcsRef      = useRef([]);
  const rafRef       = useRef(0);
  // imgRef starts null — globe draws immediately; image slots in when ready
  const imgRef       = useRef(null);

  // ── Init arcs (runs once, no image dependency) ─────────────────────────────
  useEffect(() => {
    arcsRef.current = CITY_PAIRS.map(([s, e]) => {
      const [ax, ay, az] = latLngToVec(s[0], s[1]);
      const [bx, by, bz] = latLngToVec(e[0], e[1]);
      return {
        ax, ay, az, bx, by, bz,
        progress: Math.random(),
        speed: 0.0014 + Math.random() * 0.0018,
        color: Math.random() > 0.45 ? "#60a5fa" : "#f97316",
      };
    });

    // Load image in background — globe already running, image just shows up when ready
    const img = new Image();
    img.onload = () => { imgRef.current = img; };
    img.onerror = () => { console.warn("qbcomp.webp not found — globe runs without center image"); };
    img.src = "/assets/images/qbcomp.webp"; // ← update path as needed
  }, []);

  // ── Canvas draw loop — starts immediately, no image gate ───────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap   = globeWrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const { width, height } = wrap.getBoundingClientRect();
      // Guard against zero-size wrapper during SSR / before layout
      if (!width || !height) return;
      canvas.width  = width  * dpr;
      canvas.height = height * dpr;
      canvas.style.width  = width  + "px";
      canvas.style.height = height + "px";
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const draw = () => {
      const dpr = window.devicePixelRatio || 1;
      const W = canvas.width, H = canvas.height;
      if (!W || !H) { rafRef.current = requestAnimationFrame(draw); return; }

      const cx = W / 2, cy = H / 2;
      const R = Math.min(W, H) * 0.47;
      const ang = rotRef.current;
      const now = Date.now();

      ctx.clearRect(0, 0, W, H);

      /* ── 1. Outer atmosphere ───────────────────────────────────────────── */
      const atm = ctx.createRadialGradient(cx, cy, R * 0.75, cx, cy, R * 1.45);
      atm.addColorStop(0,    "rgba(0,0,0,0)");
      atm.addColorStop(0.30, "rgba(30,80,220,0.09)");
      atm.addColorStop(0.65, "rgba(60,120,255,0.18)");
      atm.addColorStop(0.85, "rgba(249,115,22,0.20)");
      atm.addColorStop(1,    "rgba(249,115,22,0.0)");
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.42, 0, Math.PI * 2);
      ctx.fillStyle = atm;
      ctx.fill();

      /* ── 2. Globe body fill ────────────────────────────────────────────── */
      const gf = ctx.createRadialGradient(
        cx - R * 0.28, cy - R * 0.20, R * 0.02,
        cx, cy, R
      );
      gf.addColorStop(0,    "rgba(18,40,120,0.88)");
      gf.addColorStop(0.45, "rgba(8,16,58,0.82)");
      gf.addColorStop(1,    "rgba(2,4,18,0.72)");
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = gf;
      ctx.fill();

      /* ── 3. Clipped interior (grid + dots + arcs + image) ──────────────── */
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R - 0.5, 0, Math.PI * 2);
      ctx.clip();

      // Latitude grid lines
      for (let lat = -75; lat <= 75; lat += 25) {
        const yy = cy - (lat / 90) * R;
        const rr = Math.sqrt(Math.max(0, R * R - (yy - cy) ** 2));
        if (rr < 2) continue;
        ctx.beginPath();
        ctx.ellipse(cx, yy, rr, rr * 0.12, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(80,150,255,0.10)";
        ctx.lineWidth = 0.7 * dpr;
        ctx.stroke();
      }

      // Longitude grid lines
      for (let lng = 0; lng < 180; lng += 30) {
        const a  = (lng * Math.PI / 180) + ang;
        const rx = Math.abs(Math.sin(a)) * R;
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, R, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(80,150,255,0.07)";
        ctx.lineWidth = 0.6 * dpr;
        ctx.stroke();
      }

      // Soft continent base (transparent world map) — draw first with blur
      ctx.save();
      ctx.filter = `blur(${6 * dpr}px)`;
      ctx.globalAlpha = 0.18;
      ctx.fillStyle = 'rgba(20,36,80,0.9)';
      for (const [lt, lg] of LAND_DOTS) {
        const [vx, vy, vz] = latLngToVec(lt, lg);
        const [rx, ry, rz] = rotY(vx, vy, vz, ang);
        if (rz < 0) continue;
        ctx.beginPath();
        ctx.arc(cx + rx * R, cy - ry * R, 6 * dpr, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Land dots (detail) — add brighter speckles on top for texture
      for (const [lt, lg] of LAND_DOTS) {
        const [vx, vy, vz] = latLngToVec(lt, lg);
        const [rx, ry, rz] = rotY(vx, vy, vz, ang);
        if (rz < 0) continue;
        const bright = 0.30 + 0.70 * rz;
        ctx.beginPath();
        ctx.arc(cx + rx * R, cy - ry * R, 1.1 * dpr * bright, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(140,210,255,${0.55 * bright})`;
        ctx.fill();
      }

      // Arc trails
      for (const arc of arcsRef.current) {
        arc.progress += arc.speed;
        if (arc.progress > 1) arc.progress = 0;

        const head   = arc.progress;
        const tStart = Math.max(0, head - 0.22);
        const SEG    = 50;
        let prevX = 0, prevY = 0, hasPrev = false;

        for (let i = 0; i <= SEG; i++) {
          const t = tStart + (i / SEG) * (head - tStart);
          if (t < 0 || t > 1) continue;
          const [sx, sy, sz] = slerp(arc.ax, arc.ay, arc.az, arc.bx, arc.by, arc.bz, t);
          const [rx, ry, rz] = rotY(sx * 1.07, sy * 1.07, sz * 1.07, ang);
          if (rz < -0.15) { hasPrev = false; continue; }
          const px = cx + rx * R, py = cy - ry * R;

          if (hasPrev) {
            const alpha = ((t - tStart) / (head - tStart)) * 0.92;
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(px, py);
            ctx.strokeStyle = arc.color + Math.round(alpha * 255).toString(16).padStart(2, "0");
            ctx.lineWidth = 1.7 * dpr;
            ctx.stroke();
          }
          prevX = px; prevY = py; hasPrev = true;
        }

        // Arc head glow dot
        const [hx, hy, hz] = slerp(arc.ax, arc.ay, arc.az, arc.bx, arc.by, arc.bz, head);
        const [rhx, rhy, rhz] = rotY(hx * 1.075, hy * 1.075, hz * 1.075, ang);
        if (rhz > -0.1) {
          const hpx = cx + rhx * R, hpy = cy - rhy * R;
          const halo = ctx.createRadialGradient(hpx, hpy, 0, hpx, hpy, 6 * dpr);
          halo.addColorStop(0,   arc.color + "cc");
          halo.addColorStop(0.4, arc.color + "55");
          halo.addColorStop(1,   arc.color + "00");
          ctx.beginPath();
          ctx.arc(hpx, hpy, 6 * dpr, 0, Math.PI * 2);
          ctx.fillStyle = halo;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(hpx, hpy, 2.4 * dpr, 0, Math.PI * 2);
          ctx.fillStyle = arc.color;
          ctx.fill();
        }
      }

      // Center image — only drawn if loaded, globe works fine without it
      const centerImg = imgRef.current;
      if (centerImg) {
        const imgSize = R * 1.0;
        ctx.save();
        ctx.translate(cx, cy);
        // faster center image rotation for a more dynamic feel
        ctx.rotate(now * 0.0035);
        ctx.shadowColor = "rgba(249,115,22,0.80)";
        ctx.shadowBlur  = 40 * dpr;
        ctx.drawImage(centerImg, -imgSize / 2, -imgSize / 2, imgSize, imgSize);
        ctx.shadowColor = "rgba(96,165,250,0.40)";
        ctx.shadowBlur  = 22 * dpr;
        ctx.drawImage(centerImg, -imgSize / 2, -imgSize / 2, imgSize, imgSize);
        ctx.restore();
      }

      ctx.restore(); // end clip

      /* ── 4. Globe rim ──────────────────────────────────────────────────── */
      const rim = ctx.createLinearGradient(cx - R, cy, cx + R, cy);
      rim.addColorStop(0,    "rgba(96,165,250,0.80)");
      rim.addColorStop(0.42, "rgba(96,165,250,0.18)");
      rim.addColorStop(0.70, "rgba(249,115,22,0.60)");
      rim.addColorStop(1,    "rgba(249,115,22,0.98)");
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = rim;
      ctx.lineWidth = 2.4 * dpr;
      ctx.stroke();

      // Right-side orange bloom
      const og = ctx.createRadialGradient(cx + R * 0.82, cy, 0, cx + R * 0.82, cy, R * 0.68);
      og.addColorStop(0, "rgba(249,115,22,0.48)");
      og.addColorStop(1, "rgba(249,115,22,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.1, 0, Math.PI * 2);
      ctx.fillStyle = og;
      ctx.fill();

      /* ── 5. Orbital rings ──────────────────────────────────────────────── */
      ctx.save();
      ctx.translate(cx, cy);

      // Ring 1 — blue, slow rotation
      const ringAng1 = now * 0.00018;
      ctx.save();
      ctx.rotate(ringAng1);
      ctx.beginPath();
      ctx.ellipse(0, 0, R * 1.24, R * 0.25, -0.16, 0, Math.PI * 2);
      const rg1 = ctx.createLinearGradient(-R * 1.24, 0, R * 1.24, 0);
      rg1.addColorStop(0,    "rgba(96,165,250,0)");
      rg1.addColorStop(0.22, "rgba(96,165,250,0.70)");
      rg1.addColorStop(0.78, "rgba(96,165,250,0.70)");
      rg1.addColorStop(1,    "rgba(96,165,250,0)");
      ctx.strokeStyle = rg1;
      ctx.lineWidth = 1.6 * dpr;
      ctx.stroke();
      ctx.restore();

      // Ring 2 — orange, counter-rotation
      const ringAng2 = -now * 0.00012;
      ctx.save();
      ctx.rotate(ringAng2);
      ctx.beginPath();
      ctx.ellipse(0, R * 0.08, R * 1.10, R * 0.15, 0.14, 0, Math.PI * 2);
      const rg2 = ctx.createLinearGradient(-R * 1.10, 0, R * 1.10, 0);
      rg2.addColorStop(0,    "rgba(249,115,22,0)");
      rg2.addColorStop(0.30, "rgba(249,115,22,0.62)");
      rg2.addColorStop(0.70, "rgba(249,115,22,0.62)");
      rg2.addColorStop(1,    "rgba(249,115,22,0)");
      ctx.strokeStyle = rg2;
      ctx.lineWidth = 1.3 * dpr;
      ctx.stroke();
      ctx.restore();

      // Ring 3 — faint purple accent
      ctx.beginPath();
      ctx.ellipse(0, -R * 0.06, R * 0.96, R * 0.10, -0.22, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(167,139,250,0.28)";
      ctx.lineWidth = 0.9 * dpr;
      ctx.stroke();

      ctx.restore();

      /* ── 6. Ground pulse rings ─────────────────────────────────────────── */
      const pulse = (now % 2400) / 2400;
      for (let i = 0; i < 3; i++) {
        const t  = (pulse + i / 3) % 1;
        const pr = R * (0.45 + t * 0.80);
        ctx.beginPath();
        ctx.ellipse(cx, cy + R * 0.97, pr, pr * 0.12, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(249,115,22,${(1 - t) * 0.38})`;
        ctx.lineWidth = 1.1 * dpr;
        ctx.stroke();
      }

      /* ── 7. Orbiting nodes ─────────────────────────────────────────────── */
      // Node on ring 1
      const nodeAng = now * 0.00090;
      const nx  = R * 1.24 * Math.cos(nodeAng);
      const ny  = R * 0.25 * Math.sin(nodeAng);
      const nxT = nx * Math.cos(-0.16) - ny * Math.sin(-0.16);
      const nyT = nx * Math.sin(-0.16) + ny * Math.cos(-0.16);
      const n1x = cx + nxT, n1y = cy + nyT;
      const ng1 = ctx.createRadialGradient(n1x, n1y, 0, n1x, n1y, 8 * dpr);
      ng1.addColorStop(0, "rgba(96,165,250,0.9)");
      ng1.addColorStop(1, "rgba(96,165,250,0)");
      ctx.beginPath(); ctx.arc(n1x, n1y, 8 * dpr, 0, Math.PI * 2);
      ctx.fillStyle = ng1; ctx.fill();
      ctx.beginPath(); ctx.arc(n1x, n1y, 3 * dpr, 0, Math.PI * 2);
      ctx.fillStyle = "#93c5fd"; ctx.fill();

      // Node on ring 2
      const nodeAng2 = -now * 0.00065 + Math.PI;
      const nx2  = R * 1.10 * Math.cos(nodeAng2);
      const ny2  = R * 0.15 * Math.sin(nodeAng2);
      const nx2T = nx2 * Math.cos(0.14) - ny2 * Math.sin(0.14);
      const ny2T = nx2 * Math.sin(0.14) + ny2 * Math.cos(0.14);
      const n2x = cx + nx2T, n2y = cy + R * 0.08 + ny2T;
      const ng2 = ctx.createRadialGradient(n2x, n2y, 0, n2x, n2y, 7 * dpr);
      ng2.addColorStop(0, "rgba(249,115,22,0.9)");
      ng2.addColorStop(1, "rgba(249,115,22,0)");
      ctx.beginPath(); ctx.arc(n2x, n2y, 7 * dpr, 0, Math.PI * 2);
      ctx.fillStyle = ng2; ctx.fill();
      ctx.beginPath(); ctx.arc(n2x, n2y, 2.8 * dpr, 0, Math.PI * 2);
      ctx.fillStyle = "#fb923c"; ctx.fill();

      // increase globe rotation speed (was 0.0022)
      rotRef.current += 0.06;
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []); // ← empty deps: starts immediately, never re-mounts

  // ── JSX ─────────────────────────────────────────────────────────────────────
  return (
    <section className={heroStyles['nh-hero-banner']} suppressHydrationWarning>

      <div className={heroStyles['nh-hero-bg']} />

      <div className={heroStyles['nh-hero-container']}>
        <div className={heroStyles['nh-hero-grid']}>

          {/* ── Left: text ────────────────────────────────────────────── */}
          <div className={heroStyles['nh-hero-content']}>

            

            <div className={heroStyles['nh-hero-title']}>
              <div className={heroStyles['nh-hero-title-line']}>Agentic AI</div>
              <div className={heroStyles['nh-hero-title-line']}>That Runs</div>
              <div className={heroStyles['nh-hero-title-line']}>
                <span className={heroStyles['nh-hero-highlight']}>Your Business</span>
              </div>
            </div>

            <p className={heroStyles['nh-hero-desc']}>
              Move beyond pilots and "assistants." qBotica runs your enterprise operations
              using Agentic AI to execute end-to-end workflows across your systems,
              documents, and decisions.
            </p>

            <div className={heroStyles['nh-hero-actions']}>
              <button className={heroStyles['primary-btn']}>Request a Demo →</button>
              <button className={heroStyles['secondary-btn']}>See Agentic AI In Action →</button>
            </div>

            
          </div>

          {/* ── Right: globe ──────────────────────────────────────────── */}
          <div ref={globeWrapRef} className={heroStyles['nh-hero-cube-wrapper']}>
            <canvas ref={canvasRef} className={heroStyles.canvas} />
          </div>

        </div>
      </div>
    </section>
  );
}