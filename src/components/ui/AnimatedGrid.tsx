"use client";

import { cn } from "@/lib/utils";

export default function AnimatedGrid({
  className,
  cellSize = 56,
  opacity = 0.06,
}: {
  className?: string;
  cellSize?: number;
  opacity?: number;
}) {
  return (
    <div
      className={cn("absolute inset-0 pointer-events-none", className)}
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0, 30, 28, ${opacity}) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 30, 28, ${opacity}) 1px, transparent 1px)
        `,
        backgroundSize: `${cellSize}px ${cellSize}px`,
      }}
    />
  );
}
