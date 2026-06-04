"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function TypewriterText({
  text,
  className,
  speed = 40,
  delay = 0,
  showCursor = true,
  onComplete,
}: {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  showCursor?: boolean;
  onComplete?: () => void;
}) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1));
      }, speed + Math.random() * 20);
      return () => clearTimeout(timer);
    } else if (!done) {
      const timer = setTimeout(() => {
        setDone(true);
        onComplete?.();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [started, displayed, text, speed, done, onComplete]);

  return (
    <span className={cn("font-mono", className)}>
      {displayed}
      {showCursor && !done && (
        <span className="text-malachite animate-blink">_</span>
      )}
      {showCursor && done && (
        <span className="text-malachite opacity-50">_</span>
      )}
    </span>
  );
}
