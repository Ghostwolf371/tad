"use client";

import { motion } from "framer-motion";
import { skeletonBarClassName, type SkeletonTone } from "@/components/ui/SkeletonBar";
import { useMockupAnimated } from "@/components/ui/MockupAnimationContext";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

type MockupChartBarsProps = {
  heights: readonly number[];
  activeFrom?: number;
  tone?: SkeletonTone;
  className?: string;
  barClassName?: string;
  activeClassName?: string;
  /** Override context (e.g. force static on homepage) */
  animated?: boolean;
};

export function MockupChartBars({
  heights,
  activeFrom = 6,
  tone = "light",
  className,
  barClassName,
  activeClassName = "bg-gradient-to-t from-malachite-600 to-malachite",
  animated: animatedProp,
}: MockupChartBarsProps) {
  const animated = animatedProp ?? useMockupAnimated();

  return (
    <div className={cn("flex min-h-0 flex-1 items-end gap-0.5", className)}>
      {heights.map((h, i) => {
        const active = i >= activeFrom;
        if (!active || !animated) {
          return (
            <div
              key={i}
              className={cn(
                "flex-1 rounded-sm",
                active
                  ? activeClassName
                  : skeletonBarClassName(tone, barClassName, false),
                !active && barClassName,
              )}
              style={{ height: `${h}%` }}
              aria-hidden
            />
          );
        }
        return (
          <motion.div
            key={i}
            className={cn("flex-1 rounded-sm", activeClassName, barClassName)}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{
              duration: 0.55,
              delay: 0.15 + (i - activeFrom) * 0.06,
              ease: EASE,
            }}
            aria-hidden
          />
        );
      })}
    </div>
  );
}

type MockupProgressRowProps = {
  fillPercent: number;
  index?: number;
  className?: string;
  animated?: boolean;
};

export function MockupProgressRow({
  fillPercent,
  index = 0,
  className,
  animated: animatedProp,
}: MockupProgressRowProps) {
  const animated = animatedProp ?? useMockupAnimated();

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="size-3 shrink-0 rounded-full border-2 border-malachite/25 bg-malachite/10" />
      <div className="relative h-1 min-w-0 flex-1 overflow-hidden rounded-full">
        <div
          className={skeletonBarClassName("light", "absolute inset-0 rounded-full", false)}
          aria-hidden
        />
        {animated ? (
          <motion.div
            className="relative h-full rounded-full bg-gradient-to-r from-malachite to-spring"
            initial={{ width: 0 }}
            animate={{ width: `${fillPercent}%` }}
            transition={{
              duration: 0.75,
              delay: 0.25 + index * 0.12,
              ease: EASE,
            }}
            aria-hidden
          />
        ) : (
          <div
            className="relative h-full rounded-full bg-gradient-to-r from-malachite to-spring"
            style={{ width: `${fillPercent}%` }}
            aria-hidden
          />
        )}
      </div>
    </div>
  );
}

type MockupKpiStripProps = {
  className?: string;
  tone?: SkeletonTone;
  animated?: boolean;
};

export function MockupKpiStrip({
  className,
  tone = "light",
  animated: animatedProp,
}: MockupKpiStripProps) {
  const animated = animatedProp ?? useMockupAnimated();

  return (
    <div
      className={skeletonBarClassName(
        tone,
        cn("mx-auto h-0.5 w-8 rounded-full", className),
        animated,
      )}
    />
  );
}
