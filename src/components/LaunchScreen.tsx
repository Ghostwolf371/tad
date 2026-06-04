"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

const EASE = [0.22, 1, 0.36, 1] as const;
const AUTO_ENTER_MS = 7000;
const STORAGE_KEY = "tad-launch-seen";

/** Flowing aurora blobs drawn on canvas. */
const BLOBS = [
  { color: "0,227,87", x: 0.24, y: 0.32, r: 0.42, sx: 0.16, sy: 0.11, ph: 0 },
  { color: "1,242,173", x: 0.74, y: 0.3, r: 0.4, sx: 0.13, sy: 0.17, ph: 1.7 },
  { color: "0,184,160", x: 0.62, y: 0.74, r: 0.46, sx: 0.1, sy: 0.14, ph: 3.1 },
  { color: "0,227,87", x: 0.32, y: 0.78, r: 0.36, sx: 0.18, sy: 0.09, ph: 4.4 },
  { color: "1,242,173", x: 0.5, y: 0.52, r: 0.3, sx: 0.12, sy: 0.16, ph: 2.2 },
];

export default function LaunchScreen() {
  const reduceMotion = useReducedMotion();
  // Start hidden so the overlay never paints on a refresh once it's been seen
  // (the inline script in layout already decided via the .is-launching class).
  const [show, setShow] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Decide on mount: if this session already saw the launcher, stay hidden and
  // clear the holding class. Otherwise show it and hold the page content until
  // the intro reveals it (so entrance animations fire only on reveal).
  useEffect(() => {
    let seen = false;
    try {
      seen = Boolean(sessionStorage.getItem(STORAGE_KEY));
    } catch {
      /* ignore */
    }
    if (seen) {
      document.documentElement.classList.remove("is-launching");
      return;
    }
    setShow(true);
    document.documentElement.classList.add("is-launching");
    const timer = window.setTimeout(enter, AUTO_ENTER_MS);
    return () => {
      window.clearTimeout(timer);
      document.documentElement.classList.remove("is-launching");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const enter = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    // Reveal the page first, then play the exit so the content's entrance
    // animations run as the launcher lifts away.
    document.documentElement.classList.remove("is-launching");
    setShow(false);
  };

  // Animated aurora gradient.
  useEffect(() => {
    if (!show || reduceMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let start = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (now: number) => {
      if (!start) start = now;
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      const base = Math.min(w, h);
      for (const b of BLOBS) {
        const cx = (b.x + Math.sin(t * b.sx + b.ph) * 0.2) * w;
        const cy = (b.y + Math.cos(t * b.sy + b.ph) * 0.2) * h;
        const rad = b.r * base;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        g.addColorStop(0, `rgba(${b.color},0.46)`);
        g.addColorStop(1, `rgba(${b.color},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, rad, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [show, reduceMotion]);

  const lineReveal = reduceMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : {
        initial: { y: "110%" },
        animate: { y: "0%" },
        transition: { duration: 0.95, ease: EASE, delay: 0.35 },
      };

  const fade = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, ease: EASE, delay },
        };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-[#04120d] text-white"
          initial={{ opacity: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { y: "-100%" }}
          transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
          role="dialog"
          aria-label="Welcome"
        >
          {/* Slowly panning brand gradient base (dynamic, Apple-like) */}
          <div className="launch-gradient pointer-events-none absolute inset-0" aria-hidden />
          {/* Aurora canvas (blurred for a soft, flowing look) */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full [filter:blur(64px)_saturate(125%)]"
            aria-hidden
          />
          {/* Vignette + subtle grid */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,transparent_30%,rgba(0,8,6,0.7)_100%)]"
          />
          <div
            aria-hidden
            className="grid-pattern pointer-events-none absolute inset-0 opacity-[0.4] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]"
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            <motion.div {...fade(0.1)}>
              <Image
                src="/brand/logo-full-white.png"
                alt="tad."
                width={4498}
                height={1534}
                className="h-12 w-auto sm:h-14"
                priority
                unoptimized
              />
            </motion.div>

            <motion.span
              {...fade(0.2)}
              className="mt-10 inline-flex items-center font-mono text-xs font-medium uppercase tracking-[0.42em] text-white/55"
            >
              Our Website
            </motion.span>

            <h1
              aria-label="Reimagined."
              className="mt-4 overflow-hidden font-semibold leading-[0.95] tracking-tight"
              style={{ fontSize: "clamp(2.85rem, 12vw, 11rem)" }}
            >
              <motion.span className="block brand-gradient-text" {...lineReveal}>
                Reimagined.
              </motion.span>
            </h1>

            <motion.p
              {...fade(0.9)}
              className="mt-7 max-w-md text-base leading-8 text-white/60 sm:text-lg"
            >
              We&apos;ve rebuilt tad.sr from the ground up — refined, faster, and
              designed around what matters most.
            </motion.p>

            <motion.button
              {...fade(1.05)}
              type="button"
              onClick={enter}
              className="group mt-11 inline-flex items-center gap-2.5 rounded-full border border-white/25 px-8 py-3.5 text-sm font-medium tracking-wide text-white transition-colors hover:border-malachite hover:bg-malachite hover:text-swamp focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              Take a look
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </motion.button>
          </div>

          {/* Auto-enter progress bar */}
          {!reduceMotion && (
            <div className="absolute inset-x-0 bottom-0 h-[3px] bg-white/10">
              <motion.div
                className="h-full origin-left bg-gradient-to-r from-malachite to-spring"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: AUTO_ENTER_MS / 1000, ease: "linear" }}
              />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
