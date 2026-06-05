"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type Star = {
  x: number;
  y: number;
  r: number;
  base: number;
  tw: number;
  ph: number;
  green: boolean;
};
type Shooting = { x: number; y: number; vx: number; vy: number; life: number; dur: number };

/**
 * Subtle twinkling starfield for dark sections — matches the launch screen.
 * Pauses its animation while off-screen (IntersectionObserver) and is disabled
 * for reduced-motion users, so it stays cheap on the homepage.
 */
export default function Starfield({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let start = 0;
    let last = 0;
    let lastShoot = -1;
    let nextShoot = 0.8;
    let visible = true;
    let seeded = false;
    let dpr = 1;
    // Safari caps canvas dimensions/area far lower than Chrome. Dark sections
    // can be very tall, so a retina buffer (e.g. 2300px * 2) overflowed and
    // Safari rendered nothing. Keep every side under this and scale dpr down.
    const MAX_SIDE = 4000;
    let stars: Star[] = [];
    const shooting: Shooting[] = [];
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const seed = () => {
      const count = Math.min(220, Math.max(70, Math.round((w * h) / 10000)));
      stars = Array.from({ length: count }, () => ({
        x: Math.random(),
        y: Math.random(),
        r: rand(0.4, 1.5),
        base: rand(0.4, 0.92),
        tw: rand(0.4, 1.7),
        ph: Math.random() * Math.PI * 2,
        green: Math.random() < 0.16,
      }));
    };

    const resize = () => {
      const nw = canvas.offsetWidth;
      const nh = canvas.offsetHeight;
      if (nw === 0 || nh === 0) return;
      // Only re-seed on a real width change (orientation / breakpoint). Mobile
      // scrolling toggles the address bar and fires resize without changing the
      // section size — re-seeding there made the stars jump (the "glitch").
      const widthChanged = Math.abs(nw - w) > 1;
      w = nw;
      h = nh;
      dpr = Math.min(window.devicePixelRatio || 1, 2, MAX_SIDE / Math.max(w, h));
      const bw = Math.round(w * dpr);
      const bh = Math.round(h * dpr);
      if (canvas.width !== bw || canvas.height !== bh) {
        canvas.width = bw;
        canvas.height = bh;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!seeded || widthChanged) {
        seed();
        seeded = true;
      }
    };

    const draw = (now: number) => {
      if (!start) start = now;
      const t = (now - start) / 1000;
      const dt = last ? (now - last) / 1000 : 0;
      last = now;
      ctx.clearRect(0, 0, w, h);

      for (const s of stars) {
        const a = s.base * (0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * s.tw + s.ph)));
        const px = s.x * w;
        const py = s.y * h;
        const col = s.green ? "160,255,200" : "235,245,255";
        if (s.r > 0.95) {
          const g = ctx.createRadialGradient(px, py, 0, px, py, s.r * 3.5);
          g.addColorStop(0, `rgba(${col},${a * 0.4})`);
          g.addColorStop(1, `rgba(${col},0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(px, py, s.r * 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = `rgba(${col},${a})`;
        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Shooting stars — lively but varied (~every 0.9–2.2s), subtle/dimmed.
      if (t - lastShoot > nextShoot) {
        lastShoot = t;
        nextShoot = rand(0.9, 2.2);
        const fromLeft = Math.random() < 0.5;
        shooting.push({
          x: fromLeft ? rand(0.05, 0.35) : rand(0.65, 0.95),
          y: rand(0.04, 0.5),
          vx: (fromLeft ? 1 : -1) * rand(0.5, 0.8),
          vy: rand(0.3, 0.5),
          life: 0,
          dur: rand(0.9, 1.4),
        });
      }
      for (let i = shooting.length - 1; i >= 0; i--) {
        const ss = shooting[i];
        ss.life += dt;
        const prog = ss.life / ss.dur;
        if (prog >= 1) {
          shooting.splice(i, 1);
          continue;
        }
        const cx = (ss.x + ss.vx * prog) * w;
        const cy = (ss.y + ss.vy * prog) * h;
        const tx = cx - ss.vx * w * 0.09;
        const ty = cy - ss.vy * h * 0.09;
        const alpha = 0.5 * Math.sin(prog * Math.PI);
        const grad = ctx.createLinearGradient(tx, ty, cx, cy);
        grad.addColorStop(0, "rgba(180,255,210,0)");
        grad.addColorStop(1, `rgba(235,245,255,${alpha})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.3;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(cx, cy);
        ctx.stroke();
        ctx.fillStyle = `rgba(235,245,255,${alpha})`;
        ctx.beginPath();
        ctx.arc(cx, cy, 1.3, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = visible ? requestAnimationFrame(draw) : 0;
    };

    resize();
    window.addEventListener("resize", resize);
    // ResizeObserver re-runs once the canvas actually has a size (Safari can lay
    // out after the effect) and on any later size change — more reliable than
    // window resize for an element whose height comes from its content.
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !raf) {
          last = 0; // avoid a huge dt jump after being paused
          raf = requestAnimationFrame(draw);
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [reduce]);

  return <canvas ref={ref} aria-hidden className={className} />;
}
