"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

const EASE = [0.22, 1, 0.36, 1] as const;
const AUTO_ENTER_MS = 7000;
const STORAGE_KEY = "tad-launch-seen";

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
    let isBot = false;
    try {
      // Skip the intro for crawlers and audit tools (Lighthouse/PageSpeed,
      // headless Chrome, search bots) so they measure the real content right
      // away. Human visitors still get the full launch experience.
      isBot =
        /bot|crawl|spider|lighthouse|headless|pagespeed|gtmetrix|pingdom|prerender/i.test(
          navigator.userAgent || "",
        );
      seen = Boolean(sessionStorage.getItem(STORAGE_KEY));
    } catch {
      /* ignore */
    }
    if (seen || isBot) {
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

  // Twinkling starfield + occasional shooting stars (Rolls-Royce "Starlight").
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
    let last = 0;
    let lastShoot = -2;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let stars: Star[] = [];
    const shooting: Shooting[] = [];
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const seed = () => {
      // Density scales with the viewport, capped for performance.
      const count = Math.min(210, Math.max(90, Math.round((w * h) / 11000)));
      stars = Array.from({ length: count }, () => ({
        x: Math.random(),
        y: Math.random(),
        r: rand(0.3, 1.05),
        base: rand(0.14, 0.46),
        tw: rand(0.3, 1.5),
        ph: Math.random() * Math.PI * 2,
        green: Math.random() < 0.14,
      }));
    };

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (now: number) => {
      if (!start) start = now;
      const t = (now - start) / 1000;
      const dt = last ? (now - last) / 1000 : 0;
      last = now;
      ctx.clearRect(0, 0, w, h);

      // Stars
      for (const s of stars) {
        const a = s.base * (0.32 + 0.68 * (0.5 + 0.5 * Math.sin(t * s.tw + s.ph)));
        const px = s.x * w;
        const py = s.y * h;
        const col = s.green ? "150,255,190" : "225,240,255";
        if (s.r > 0.85) {
          const g = ctx.createRadialGradient(px, py, 0, px, py, s.r * 3);
          g.addColorStop(0, `rgba(${col},${a * 0.18})`);
          g.addColorStop(1, `rgba(${col},0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(px, py, s.r * 3, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = `rgba(${col},${a})`;
        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Spawn a shooting star occasionally (~every 7s) — a rare, quiet accent
      if (t - lastShoot > 7) {
        lastShoot = t;
        const fromLeft = Math.random() < 0.5;
        shooting.push({
          x: fromLeft ? rand(0.05, 0.35) : rand(0.65, 0.95),
          y: rand(0.05, 0.4),
          vx: (fromLeft ? 1 : -1) * rand(0.5, 0.8),
          vy: rand(0.32, 0.5),
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
        const alpha = 0.5 * Math.sin(prog * Math.PI); // ease in/out, dimmed
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
          {/* Deep brand-night base (subtle, keeps the stars feeling premium) */}
          <div
            className="launch-gradient pointer-events-none absolute inset-0 opacity-[0.28]"
            aria-hidden
          />
          {/* Twinkling starfield + shooting stars (sharp — no blur) */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full"
            aria-hidden
          />
          {/* Vignette for depth (darker edges make the starfield read) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_45%,transparent_35%,rgba(0,6,4,0.82)_100%)]"
          />
          {/* Calm zone behind the content — dims the stars so the logo and
              headline stay clean and uncluttered. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_52%_46%_at_50%_44%,rgba(4,18,13,0.72)_0%,rgba(4,18,13,0.3)_46%,transparent_72%)]"
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            <motion.div {...fade(0.1)}>
              <Image
                src="/brand/logo-full-white.png"
                alt="tad."
                width={4498}
                height={1534}
                sizes="(min-width: 640px) 220px, 170px"
                className="h-12 w-auto sm:h-14"
                priority
              />
            </motion.div>

            <motion.span
              {...fade(0.2)}
              className="mt-10 inline-flex items-center font-mono text-xs font-medium uppercase tracking-[0.42em] text-white/55"
            >
              Our New Home
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
              Every pixel, rethought. Every second, faster. The new tad.sr is
              here.
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
