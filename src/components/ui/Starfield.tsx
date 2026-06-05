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
    let visible = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let stars: Star[] = [];
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const seed = () => {
      const count = Math.min(150, Math.max(45, Math.round((w * h) / 15000)));
      stars = Array.from({ length: count }, () => ({
        x: Math.random(),
        y: Math.random(),
        r: rand(0.3, 1),
        base: rand(0.12, 0.42),
        tw: rand(0.3, 1.4),
        ph: Math.random() * Math.PI * 2,
        green: Math.random() < 0.16,
      }));
    };

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      if (w === 0 || h === 0) return;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const draw = (now: number) => {
      if (!start) start = now;
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const a = s.base * (0.3 + 0.7 * (0.5 + 0.5 * Math.sin(t * s.tw + s.ph)));
        const px = s.x * w;
        const py = s.y * h;
        const col = s.green ? "150,255,190" : "220,238,255";
        ctx.fillStyle = `rgba(${col},${a})`;
        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = visible ? requestAnimationFrame(draw) : 0;
    };

    resize();
    window.addEventListener("resize", resize);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !raf) raf = requestAnimationFrame(draw);
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [reduce]);

  return <canvas ref={ref} aria-hidden className={className} />;
}
