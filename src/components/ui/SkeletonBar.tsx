import type { CSSProperties, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type SkeletonTone = "light" | "dark" | "accent";

const SHIMMER_CLASS: Record<SkeletonTone, string> = {
  light: "skeleton-shimmer skeleton-shimmer--light",
  dark: "skeleton-shimmer skeleton-shimmer--dark",
  accent: "skeleton-shimmer skeleton-shimmer--accent",
};

const STATIC_CLASS: Record<SkeletonTone, string> = {
  light: "bg-swamp/10",
  dark: "bg-white/20",
  accent: "bg-malachite/35",
};

/** Shimmering placeholder bar for mockups and loading UI */
export function skeletonBarClassName(
  tone: SkeletonTone = "light",
  className?: string,
  animated = true,
) {
  return cn("rounded-md", animated ? SHIMMER_CLASS[tone] : STATIC_CLASS[tone], className);
}

type SkeletonBarProps = HTMLAttributes<HTMLDivElement> & {
  tone?: SkeletonTone;
  animated?: boolean;
};

export function SkeletonBar({
  tone = "light",
  animated = true,
  className,
  style,
  ...props
}: SkeletonBarProps) {
  return (
    <div
      className={skeletonBarClassName(tone, className, animated)}
      style={style}
      aria-hidden
      {...props}
    />
  );
}

/** @deprecated Use static bars via animated={false} */
export function skeletonChartBarClassName(className?: string) {
  return cn("skeleton-bar-pulse", className);
}

export type SkeletonBarStyle = CSSProperties;
