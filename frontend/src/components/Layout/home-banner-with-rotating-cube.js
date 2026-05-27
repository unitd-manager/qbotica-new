"use client";

import { useEffect, useRef, useState } from "react";
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
  const imgRef       = useRef(null);
  const [ready, setReady] = useState(false);

  // ── Init arcs + load center image ──────────────────────────────────────────
  useEffect(() => {
    arcsRef.current = CITY_PAIRS.map(([s, e]) => {
      const [ax, ay, az] = latLngToVec(s[0], s[1]);
      const [bx, by, bz] = latLngToVec(e[0], e[1]);
      return {
        ax, ay, az, bx, by, bz,
        progress: Math.random(),
        speed: 0.0016 + Math.random() * 0.002,
        color: Math.random() > 0.45 ? "#60a5fa" : "#f97316",
      };
    });

    // Load center image — put your image in /public and update the path
    const img = new Image();
    img.onload = () => { imgRef.current = img; setReady(true); };
    img.onerror = (err) => { console.error('Failed to load center image:', err); setReady(true); };
    img.src = "/assets/images/qbcomp.webp"; // ← change to your image path in /public
  }, []);

  // ── Canvas draw loop ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!ready) return;
    const canvas = canvasRef.current;
    const wrap   = globeWrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const { width, height } = wrap.getBoundingClientRect();
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
      const cx = W / 2, cy = H / 2;
      const R  = Math.min(W, H) * 0.380;
      const ang = rotRef.current;

      ctx.clearRect(0, 0, W, H);

      // 1. Outer atmosphere glow
      const atm = ctx.createRadialGradient(cx, cy, R * 0.8, cx, cy, R * 1.32);
      atm.addColorStop(0,    "rgba(20,60,180,0.0)");
      atm.addColorStop(0.35, "rgba(50,100,220,0.13)");
      atm.addColorStop(0.7,  "rgba(80,140,255,0.22)");
      atm.addColorStop(1,    "rgba(249,115,22,0.30)");
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.3, 0, Math.PI * 2);
      ctx.fillStyle = atm;
      ctx.fill();

      // 2. Globe semi-transparent fill
      const gf = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.22, R * 0.03, cx, cy, R);
      gf.addColorStop(0,   "rgba(16,34,100,0.82)");
      gf.addColorStop(0.5, "rgba(6,14,48,0.76)");
      gf.addColorStop(1,   "rgba(2,5,18,0.68)");
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = gf;
      ctx.fill();

      // 3. Clip to globe sphere
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
        ctx.ellipse(cx, yy, rr, rr * 0.13, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(70,140,255,0.12)";
        ctx.lineWidth = 0.8 * dpr;
        ctx.stroke();
      }

      // Longitude grid lines
      for (let lng = 0; lng < 180; lng += 30) {
        const a  = (lng * Math.PI / 180) + ang;
        const rx = Math.abs(Math.sin(a)) * R;
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, R, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(70,140,255,0.08)";
        ctx.lineWidth = 0.7 * dpr;
        ctx.stroke();
      }

      // Land dots
      for (const [lt, lg] of LAND_DOTS) {
        const [vx, vy, vz] = latLngToVec(lt, lg);
        const [rx, ry, rz] = rotY(vx, vy, vz, ang);
        if (rz < 0) continue;
        const bright = 0.28 + 0.72 * rz;
        ctx.beginPath();
        ctx.arc(cx + rx * R, cy - ry * R, 1.05 * dpr * bright, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(120,195,255,${0.5 * bright})`;
        ctx.fill();
      }

      // Arc trails
      for (const arc of arcsRef.current) {
        arc.progress += arc.speed;
        if (arc.progress > 1) arc.progress = 0;
        const head   = arc.progress;
        const tStart = Math.max(0, head - 0.20);
        const SEG    = 44;
        let prevX = 0, prevY = 0, hasPrev = false;

        for (let i = 0; i <= SEG; i++) {
          const t = tStart + (i / SEG) * (head - tStart);
          if (t < 0 || t > 1) continue;
          const [sx, sy, sz] = slerp(arc.ax, arc.ay, arc.az, arc.bx, arc.by, arc.bz, t);
          const [rx, ry, rz] = rotY(sx * 1.065, sy * 1.065, sz * 1.065, ang);
          if (rz < -0.15) { hasPrev = false; continue; }
          const px = cx + rx * R, py = cy - ry * R;

          if (hasPrev) {
            const alpha = ((t - tStart) / (head - tStart)) * 0.9;
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(px, py);
            ctx.strokeStyle = arc.color + Math.round(alpha * 255).toString(16).padStart(2, "0");
            ctx.lineWidth = 1.6 * dpr;
            ctx.stroke();
          }
          prevX = px; prevY = py; hasPrev = true;
        }

        // Arc head dot
        const [hx, hy, hz] = slerp(arc.ax, arc.ay, arc.az, arc.bx, arc.by, arc.bz, head);
        const [rhx, rhy, rhz] = rotY(hx * 1.07, hy * 1.07, hz * 1.07, ang);
        if (rhz > -0.1) {
          ctx.beginPath();
          ctx.arc(cx + rhx * R, cy - rhy * R, 2.2 * dpr, 0, Math.PI * 2);
          ctx.fillStyle = arc.color;
          ctx.fill();
        }
      }

     /* =========================================
   CENTER ROTATING CUBE IMAGE
========================================= */

const centerImg = imgRef.current;

if (centerImg) {

  const imgSize = R * 1.02;

  ctx.save();

  /* move to globe center */

  ctx.translate(cx, cy);

  /* rotate cube image */

  ctx.rotate(Date.now() * 0.0008);

  /* glow */

  ctx.shadowColor = "rgba(249,115,22,0.9)";
  ctx.shadowBlur = 35 * dpr;

  /* draw perfectly centered */

  ctx.drawImage(
    centerImg,
    -imgSize / 2,
    -imgSize / 2,
    imgSize,
    imgSize
  );

  ctx.restore();
}

      ctx.restore(); // end globe clip

      // 5. Globe rim (blue left → orange right)
      const rim = ctx.createLinearGradient(cx - R, cy, cx + R, cy);
      rim.addColorStop(0,    "rgba(96,165,250,0.75)");
      rim.addColorStop(0.45, "rgba(96,165,250,0.20)");
      rim.addColorStop(0.72, "rgba(249,115,22,0.55)");
      rim.addColorStop(1,    "rgba(249,115,22,0.95)");
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = rim;
      ctx.lineWidth = 2.2 * dpr;
      ctx.stroke();

      // Orange right-side glow
      const og = ctx.createRadialGradient(cx + R * 0.8, cy, 0, cx + R * 0.8, cy, R * 0.72);
      og.addColorStop(0, "rgba(249,115,22,0.55)");
      og.addColorStop(1, "rgba(249,115,22,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.1, 0, Math.PI * 2);
      ctx.fillStyle = og;
      ctx.fill();

      // 6. Orbital rings
      ctx.save();
      ctx.translate(cx, cy);

      ctx.beginPath();
      ctx.ellipse(0, 0, R * 1.22, R * 0.26, -0.18, 0, Math.PI * 2);
      const rg1 = ctx.createLinearGradient(-R * 1.22, 0, R * 1.22, 0);
      rg1.addColorStop(0,    "rgba(96,165,250,0)");
      rg1.addColorStop(0.25, "rgba(96,165,250,0.65)");
      rg1.addColorStop(0.75, "rgba(96,165,250,0.65)");
      rg1.addColorStop(1,    "rgba(96,165,250,0)");
      ctx.strokeStyle = rg1;
      ctx.lineWidth = 1.8 * dpr;
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(0, R * 0.1, R * 1.08, R * 0.16, 0.12, 0, Math.PI * 2);
      const rg2 = ctx.createLinearGradient(-R * 1.08, 0, R * 1.08, 0);
      rg2.addColorStop(0,    "rgba(249,115,22,0)");
      rg2.addColorStop(0.35, "rgba(249,115,22,0.58)");
      rg2.addColorStop(0.65, "rgba(249,115,22,0.58)");
      rg2.addColorStop(1,    "rgba(249,115,22,0)");
      ctx.strokeStyle = rg2;
      ctx.lineWidth = 1.4 * dpr;
      ctx.stroke();

      ctx.restore();

      // 7. Ground pulse rings
      const pulse = (Date.now() % 2200) / 2200;
      for (let i = 0; i < 3; i++) {
        const t  = (pulse + i / 3) % 1;
        const rx = R * (0.5 + t * 0.78);
        ctx.beginPath();
        ctx.ellipse(cx, cy + R * 0.96, rx, rx * 0.13, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(249,115,22,${(1 - t) * 0.42})`;
        ctx.lineWidth = 1.2 * dpr;
        ctx.stroke();
      }

      rotRef.current += 0.0024;
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [ready]);

  // ── JSX ─────────────────────────────────────────────────────────────────────
  return (
   <section className={heroStyles['nh-hero-banner']} suppressHydrationWarning>

      {/* Background grid */}
      <div className={heroStyles['nh-hero-bg']} />

      <div className={heroStyles['nh-hero-container']}>
        <div className={heroStyles['nh-hero-grid']}>
        {/* ── Left: text ─────────────────────────────────────────────────── */}
        <div className={heroStyles['nh-hero-content']}>

          

          {/* Heading */}
          <div className={heroStyles['nh-hero-title']}>
            <div className={heroStyles['nh-hero-title-line']}>Agentic AI</div>
            <div className={heroStyles['nh-hero-title-line']}>That Runs</div>
            <div className={heroStyles['nh-hero-title-line']}><span className={heroStyles['nh-hero-highlight']}>Your Business</span></div>
          </div>

          {/* Subtext */}
          <p className={heroStyles['nh-hero-desc']}>
            Move beyond pilots and "assistants." qBotica runs your enterprise operations using Agentic AI to execute end-to-end workflows across your systems, documents, and decisions.
          </p>

          {/* Buttons */}
          <div className={heroStyles['nh-hero-actions']}>
            <button className={heroStyles['primary-btn']}>Request a Demo →</button>
            <button className={heroStyles['secondary-btn']}>See Agentic AI In Action →</button>
          </div>
        </div>

        {/* ── Right: globe canvas ─────────────────────────────────────────── */}
        <div ref={globeWrapRef} className={heroStyles['nh-hero-cube-wrapper']}>
          <canvas ref={canvasRef} className={heroStyles.canvas} />
        </div>
        </div>
      </div>
    </section>
  );
}