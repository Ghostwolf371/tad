"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export default function GlitchText({
  text,
  className,
  trigger = "hover",
}: {
  text: string;
  className?: string;
  trigger?: "hover" | "auto";
}) {
  const [isActive, setIsActive] = useState(trigger === "auto");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (trigger !== "hover") return;
    setIsActive(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsActive(false), 400);
  };

  return (
    <span
      className={cn("relative inline-block", className)}
      onMouseEnter={handleMouseEnter}
      data-text={text}
    >
      <span className="relative z-10">{text}</span>
      {isActive && (
        <>
          <span
            className="absolute inset-0 text-malachite z-0"
            style={{
              clipPath: "inset(30% 0 50% 0)",
              transform: "translate(2px, -1px)",
              animation: "glitch-1 0.3s linear",
            }}
          >
            {text}
          </span>
          <span
            className="absolute inset-0 text-spring z-0"
            style={{
              clipPath: "inset(50% 0 30% 0)",
              transform: "translate(-2px, 1px)",
              animation: "glitch-2 0.3s linear",
            }}
          >
            {text}
          </span>
        </>
      )}
    </span>
  );
}
