"use client";

import { cn } from "@/lib/utils";

export default function SignalPulse({
  className,
  size = "md",
  color = "bg-malachite",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: string;
}) {
  const sizeClasses = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
  };

  return (
    <span className={cn("relative inline-flex overflow-hidden", className)}>
      <span className={cn("relative inline-flex rounded-full", color, sizeClasses[size])}>
        <span
          className={cn(
            "pointer-events-none absolute inline-flex h-full w-full rounded-full opacity-75",
            color,
            "animate-signal-wave",
          )}
        />
      </span>
    </span>
  );
}
