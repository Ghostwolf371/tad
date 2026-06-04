"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const GLITCH_CHARS = "!<>-_\\/[]{}—=+*^?#________";

export default function DecodeText({
  text,
  className,
  delay = 0,
  duration = 800,
  onComplete,
}: {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
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
    if (!started || done) return;

    const totalChars = text.length;
    const startTime = Date.now();
    const interval = duration / (totalChars * 3);

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const revealedCount = Math.floor(progress * totalChars);

      let result = "";
      for (let i = 0; i < totalChars; i++) {
        if (i < revealedCount) {
          result += text[i];
        } else if (i < revealedCount + 3 && text[i] !== " ") {
          result += GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        } else if (text[i] === " ") {
          result += " ";
        } else {
          result += "█";
        }
      }

      setDisplayed(result);

      if (progress >= 1) {
        setDisplayed(text);
        setDone(true);
        onComplete?.();
      } else {
        setTimeout(tick, interval);
      }
    };

    tick();
  }, [started, text, duration, done, onComplete]);

  return (
    <span className={cn("font-mono", className)}>
      {started ? displayed : "█".repeat(text.length)}
    </span>
  );
}
