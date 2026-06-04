"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { reviews } from "@/lib/content/reviews";
import Image from "next/image";
import HomeSection from "@/components/home/HomeSection";
import HomeSectionHeader from "@/components/home/HomeSectionHeader";
import { greenBandCardClassName } from "@/lib/theme/green-band-surfaces";
import { HOME_SECTION_PY_BEFORE_WHITE } from "@/lib/theme/section-spacing";
import { cn } from "@/lib/utils";

function highlightWord(text: string, word: string) {
  if (!word) return text;
  const parts = text.split(new RegExp(`(${word})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === word.toLowerCase() ? (
      <span key={i} className="text-malachite font-semibold">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

const HIGHLIGHT_WORDS = [
  "partner",
  "back",
  "product",
  "needed",
  "ROI",
  "beautiful",
  "insane",
  "doubled",
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
    scale: 0.95,
  }),
};

export default function Reviews() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback(() => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % reviews.length);
  }, []);

  const goTo = useCallback(
    (i: number) => {
      setDirection(i > index ? 1 : -1);
      setIndex(i);
    },
    [index],
  );

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(advance, 7000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, advance]);

  const review = reviews[index];

  const highlight =
    HIGHLIGHT_WORDS.find((w) => review.text.toLowerCase().includes(w.toLowerCase())) ??
    "";

  return (
    <HomeSection
      tone="dark-green"
      edgeTop
      edgeBottom
      maxWidth="5xl"
      py={HOME_SECTION_PY_BEFORE_WHITE}
    >
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
      <HomeSectionHeader
        align="center"
        variant="dark"
        eyebrow="CLIENT REVIEWS"
        title="What our clients say"
        className="mb-12"
      />

      <div
        className={cn(
          greenBandCardClassName(
            "relative flex min-h-[420px] flex-col justify-center p-10 sm:p-14 lg:p-20",
            { featured: true, interactive: false },
          ),
        )}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={review.name + index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 200, damping: 30 },
              opacity: { duration: 0.4 },
              scale: { duration: 0.4 },
            }}
            className="flex flex-col items-center text-center"
          >
            <Quote className="h-10 w-10 text-malachite" />

            <p className="mt-10 max-w-3xl text-2xl font-medium leading-relaxed text-white sm:text-3xl lg:text-[1.8rem]">
              &ldquo;
              {highlight ? highlightWord(review.text, highlight) : review.text}
              &rdquo;
            </p>

            <div className="mt-10 flex items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, k) => (
                <Star
                  key={k}
                  className="h-6 w-6 fill-malachite text-malachite"
                />
              ))}
            </div>

            <p className="mt-4 font-mono text-sm uppercase tracking-normal text-white/55">
              4.9 / 5 AVERAGE
            </p>

            <div className="mt-10 flex items-center gap-4">
              {review.avatar ? (
                <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-malachite/35">
                  <Image
                    src={review.avatar}
                    alt={review.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-malachite/35 bg-white/10 text-xl font-semibold text-white">
                  {review.name.charAt(0)}
                </div>
              )}
              <div className="text-left">
                <p className="text-lg font-semibold text-white">{review.name}</p>
                <p className="mt-0.5 text-base text-white/65">{review.role}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-10 flex items-center justify-center gap-3">
        {reviews.map((r, i) => (
          <button
            key={r.name}
            type="button"
            onClick={() => goTo(i)}
            className={cn(
              "rounded-full transition-all duration-500",
              i === index
                ? "h-3 w-10 bg-malachite"
                : "h-3 w-3 bg-white/20 hover:bg-white/35",
            )}
            aria-label={`Go to review ${i + 1}`}
          />
        ))}
      </div>
      </div>
    </HomeSection>
  );
}
