"use client";

import { useEffect, useId, useRef, useState, type ButtonHTMLAttributes } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

export default function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoId = useId();
  const reduceMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const [isPaused, setIsPaused] = useState(Boolean(reduceMotion));
  const [hasStarted, setHasStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [inView, setInView] = useState(false);
  /** Tracks an explicit user pause so we don't auto-resume against intent. */
  const userPausedRef = useRef(false);

  /** Only decode/play the video while it's actually on screen. */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const syncDesktop = () => setIsDesktop(mediaQuery.matches);
    syncDesktop();
    mediaQuery.addEventListener("change", syncDesktop);
    return () => mediaQuery.removeEventListener("change", syncDesktop);
  }, []);

  /** Grow the reel from small → full as the section scrolls into view. */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.78, 1]);
  const shouldAnimateScale = isDesktop && !reduceMotion;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (reduceMotion) {
      video.muted = true;
      video.pause();
      return;
    }

    video.muted = isMuted;

    if (!inView || userPausedRef.current) {
      video.pause();
      return;
    }

    const playback = video.play();
    if (!playback) return;

    void playback
      .then(() => {
        setIsPaused(false);
        setHasStarted(true);
      })
      .catch(() => {
        setIsPaused(true);
      });
  }, [isMuted, reduceMotion, inView]);

  const togglePlayback = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      userPausedRef.current = false;
      try {
        await video.play();
        setIsPaused(false);
        setHasStarted(true);
      } catch {
        setIsPaused(true);
      }
      return;
    }

    userPausedRef.current = true;
    video.pause();
    setIsPaused(true);
  };

  const toggleMuted = async () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);

    if (!nextMuted && video.paused) {
      try {
        await video.play();
        setIsPaused(false);
        setHasStarted(true);
      } catch {
        video.muted = true;
        setIsMuted(true);
      }
    }
  };

  const playbackAriaLabel = isPaused
    ? hasStarted
      ? "Resume video"
      : "Play video"
    : "Pause video";
  const soundAriaLabel = isMuted ? "Unmute video" : "Mute video";

  return (
    <section ref={sectionRef} className="relative bg-white">
      <div className="mx-auto max-w-[90rem] px-5 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-12 lg:px-20 lg:pb-20 lg:pt-16">
        <motion.div
          className="mx-auto flex max-w-[75rem] flex-col items-center"
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-swamp/10 bg-white/78 px-3.5 py-1.5 shadow-[0_10px_30px_rgba(0,30,28,0.06)] backdrop-blur-md">
            <span className="h-2.5 w-2.5 rounded-full bg-malachite shadow-[0_0_12px_rgba(0,227,87,0.65)]" aria-hidden />
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-swamp/62">
              See us in action
            </span>
          </div>

          <motion.div
            className="mt-6 w-full origin-top overflow-visible"
            style={shouldAnimateScale ? { scale } : undefined}
          >
            <div className="relative rounded-[1.4rem] border border-swamp/10 bg-white/74 p-3 shadow-[0_20px_50px_-12px_rgba(0,30,28,0.14)] backdrop-blur-md sm:rounded-[1.6rem] sm:p-4">
              <div className="mb-3 flex items-center justify-between gap-3 px-1 sm:mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5" aria-hidden>
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-swamp/70">
                    TAD launch reel
                  </span>
                </div>
                <span className="hidden rounded-full border border-swamp/10 bg-white/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-swamp/70 sm:inline-flex">
                  Paramaribo
                </span>
              </div>

              <div className="relative aspect-video overflow-hidden rounded-[1rem] border border-swamp/10 bg-swamp sm:rounded-[1.2rem]">
                <video
                  id={videoId}
                  ref={videoRef}
                  className="h-full w-full object-cover"
                  src="/videos/tad-commercial.mp4"
                  muted={isMuted}
                  playsInline
                  preload="none"
                  loop={!reduceMotion}
                  onVolumeChange={(event) => setIsMuted(event.currentTarget.muted)}
                  onPlay={() => {
                    setIsPaused(false);
                    setHasStarted(true);
                  }}
                  onPause={() => setIsPaused(true)}
                />

                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-32 bg-gradient-to-t from-swamp/72 via-swamp/28 to-transparent"
                />

                <div className="absolute inset-x-3 bottom-3 z-[2] flex items-center justify-between gap-3 sm:inset-x-4 sm:bottom-4">
                  <VideoGlassControl
                    aria-controls={videoId}
                    aria-label={playbackAriaLabel}
                    aria-pressed={!isPaused}
                    onClick={() => {
                      void togglePlayback();
                    }}
                  >
                    {isPaused ? (
                      <Play className="h-[1.125rem] w-[1.125rem]" aria-hidden />
                    ) : (
                      <Pause className="h-[1.125rem] w-[1.125rem]" aria-hidden />
                    )}
                  </VideoGlassControl>

                  <VideoGlassControl
                    aria-controls={videoId}
                    aria-label={soundAriaLabel}
                    aria-pressed={!isMuted}
                    onClick={() => {
                      void toggleMuted();
                    }}
                  >
                    {isMuted ? (
                      <VolumeX className="h-[1.125rem] w-[1.125rem]" aria-hidden />
                    ) : (
                      <Volume2 className="h-[1.125rem] w-[1.125rem]" aria-hidden />
                    )}
                  </VideoGlassControl>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function VideoGlassControl({
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...props}
      className={cn(
        "glass-chip-on-dark glass-chip-on-dark--on-media h-11 w-11 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70",
        className,
      )}
    >
      {children}
    </button>
  );
}
