"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export const MARKETING_ROTATING_TEXTS = [
  "digital products.",
  "web applications.",
  "mobile apps.",
  "digital brands.",
] as const;

type RotatingServiceTextProps = {
  texts?: readonly string[];
  className?: string;
};

/** Typewriter-style rotating text with blinking cursor (homepage hero pattern). */
export default function RotatingServiceText({
  texts = MARKETING_ROTATING_TEXTS,
  className = "",
}: RotatingServiceTextProps) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [chars, setChars] = useState(texts[0].length);
  const [phase, setPhase] = useState<"typing" | "waiting">("waiting");

  const slotCh = Math.max(...texts.map((s) => s.length));

  useEffect(() => {
    if (reduceMotion) return;
    if (phase === "typing" && chars < texts[index].length) {
      const t = setTimeout(() => setChars((c) => c + 1), 42);
      return () => clearTimeout(t);
    }
    if (phase === "typing" && chars >= texts[index].length) {
      const t = setTimeout(() => setPhase("waiting"), 0);
      return () => clearTimeout(t);
    }
  }, [phase, chars, index, texts, reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    if (phase !== "waiting") return;
    const t = setTimeout(() => {
      setChars(0);
      setIndex((prev) => (prev + 1) % texts.length);
      setPhase("typing");
    }, 2200);
    return () => clearTimeout(t);
  }, [phase, texts.length, reduceMotion]);

  if (reduceMotion) {
    return (
      <span className={`font-semibold brand-gradient-text ${className}`}>
        {texts[0]}
      </span>
    );
  }

  const displayText = texts[index].slice(0, chars);
  const isComplete = chars >= texts[index].length;

  return (
    <span
      className={`relative inline-block max-w-full align-baseline ${className}`}
      style={{ minWidth: `min(100%, ${slotCh}ch)` }}
      aria-live="polite"
    >
      <span className="inline-block max-w-full align-baseline font-semibold brand-gradient-text sm:whitespace-nowrap">
        {displayText}
      </span>
      <motion.span
        aria-hidden
        animate={{ opacity: [0, 1] }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
        className="relative -ml-px inline-block h-[0.85em] w-[2.5px] align-middle rounded-full"
        style={{
          background: isComplete ? "rgba(0,227,87,0.35)" : "#00e357",
        }}
      />
    </span>
  );
}
