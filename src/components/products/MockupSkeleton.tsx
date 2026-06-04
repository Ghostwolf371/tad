"use client";

import HrPlusLandingMockup from "@/components/products/hr-plus/HrPlusLandingMockup";
import { MockupChartBars } from "@/components/ui/MockupMotion";
import { SkeletonBar } from "@/components/ui/SkeletonBar";
import { cn } from "@/lib/utils";

const BAR_HEIGHTS = [35, 60, 40, 85, 55, 75, 40, 65, 50] as const;

type HrPlusDashboardPanelProps = {
  className?: string;
  theme?: "light" | "dark";
};

/**
 * HR PLUS dashboard skeleton — layout copied from marketing mockup reference.
 * Parent must be `position: relative` with room for overlapping popovers.
 */
export function HrPlusDashboardPanel({
  className,
  theme = "light",
}: HrPlusDashboardPanelProps) {
  const dark = theme === "dark";

  return (
    <div
      className={cn(
        "relative flex w-full justify-center font-sans select-none",
        dark ? "text-zinc-500" : "text-swamp/40",
        className,
      )}
      role="img"
      aria-label="HR Plus dashboard preview"
    >
      <div className="relative w-full max-w-[560px]">
        <div
          className={cn(
            "relative w-full overflow-hidden rounded-2xl p-6 backdrop-blur-xl",
            dark
              ? "border border-zinc-800/60 bg-[#09100e]/90 shadow-2xl"
              : "border border-swamp/[0.08] bg-white shadow-[0_20px_50px_-12px_rgba(15,40,32,0.12)]",
          )}
        >
          <div
            className={cn(
              "mb-6 flex items-center justify-between border-b pb-4",
              dark ? "border-zinc-900/80" : "border-swamp/[0.06]",
            )}
          >
            <div className="flex gap-1.5">
              <div className={cn("size-2.5 rounded-full", dark ? "bg-zinc-800" : "bg-swamp/12")} />
              <div className={cn("size-2.5 rounded-full", dark ? "bg-zinc-800" : "bg-swamp/12")} />
              <div className={cn("size-2.5 rounded-full", dark ? "bg-zinc-800" : "bg-swamp/12")} />
            </div>
            <SkeletonBar
              tone={dark ? "dark" : "light"}
              className="h-3 w-36 rounded"
            />
            <div className="w-4" />
          </div>

          <div className="mb-6 grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={cn(
                  "space-y-2.5 rounded-xl border p-3.5",
                  dark
                    ? "border-zinc-800/30 bg-zinc-900/40"
                    : "border-swamp/[0.06] bg-bone-50/80",
                )}
              >
                <SkeletonBar
                  tone={dark ? "dark" : "light"}
                  className="h-2 w-14 rounded"
                />
                <SkeletonBar
                  tone={i === 2 ? "accent" : dark ? "dark" : "light"}
                  className={cn("h-5 rounded", i === 2 ? "w-20" : "w-12")}
                />
                <SkeletonBar
                  tone={dark ? "dark" : "light"}
                  className="h-2 w-10 rounded"
                />
              </div>
            ))}
          </div>

          <div
            className={cn(
              "mb-6 space-y-5 rounded-xl border p-4",
              dark
                ? "border-zinc-800/30 bg-zinc-900/20"
                : "border-swamp/[0.06] bg-bone-50/50",
            )}
          >
            <SkeletonBar
              tone={dark ? "dark" : "light"}
              className="h-2 w-28 rounded"
            />
            <MockupChartBars
              heights={BAR_HEIGHTS}
              activeFrom={5}
              tone={dark ? "dark" : "light"}
              className="h-16 gap-1 px-1 pt-1"
              barClassName="w-7 rounded-t-sm"
              activeClassName={cn(
                "w-7 rounded-t-sm bg-gradient-to-t",
                dark
                  ? "from-emerald-600/10 to-emerald-400/50"
                  : "from-malachite/15 to-malachite/55",
              )}
            />
          </div>

          <div className="space-y-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={cn(
                  "flex items-center justify-between border-b py-1 pb-3 last:border-0 last:pb-0",
                  dark ? "border-zinc-900/40" : "border-swamp/[0.06]",
                )}
              >
                <div className="flex items-center gap-3">
                  <SkeletonBar
                    tone={dark ? "dark" : "light"}
                    className="size-9 shrink-0 rounded-full"
                  />
                  <div className="space-y-2">
                    <SkeletonBar
                      tone={dark ? "dark" : "light"}
                      className="h-3 w-28 rounded"
                    />
                    <SkeletonBar
                      tone={dark ? "dark" : "light"}
                      className="h-2 w-16 rounded"
                    />
                  </div>
                </div>
                <div
                  className={cn(
                    "h-6 w-16 rounded-md",
                    i === 0
                      ? dark
                        ? "border border-emerald-900/30 bg-emerald-950/60"
                        : "border border-malachite/30 bg-malachite/15"
                      : i === 1
                        ? dark
                          ? "border border-amber-900/30 bg-amber-950/60"
                          : "border border-amber-200/80 bg-amber-50"
                        : dark
                          ? "border border-blue-900/30 bg-blue-950/60"
                          : "border border-sky-200/80 bg-sky-50",
                  )}
                />
              </div>
            ))}
          </div>
        </div>

        <div
          className={cn(
            "absolute -left-8 bottom-1/3 flex items-center gap-3 rounded-xl border p-3 shadow-2xl",
            dark
              ? "border-zinc-800/90 bg-zinc-950/95"
              : "border-swamp/[0.08] bg-white shadow-[0_12px_32px_-8px_rgba(15,40,32,0.14)]",
          )}
        >
          <div
            className={cn(
              "flex size-7 items-center justify-center rounded-lg",
              dark ? "bg-emerald-500/20" : "bg-malachite/15",
            )}
          >
            <div
              className={cn(
                "-translate-y-0.5 size-3 rotate-45 border-b-2 border-r-2",
                dark ? "border-emerald-400" : "border-malachite",
              )}
            />
          </div>
          <div className="space-y-1.5">
            <SkeletonBar tone={dark ? "dark" : "light"} className="h-1.5 w-16 rounded" />
            <SkeletonBar tone={dark ? "dark" : "light"} className="h-3 w-24 rounded" />
          </div>
        </div>

        <div
          className={cn(
            "absolute -right-4 top-1/3 flex items-center gap-3 rounded-xl border p-3 shadow-2xl",
            dark
              ? "border-zinc-800/90 bg-zinc-950/95"
              : "border-swamp/[0.08] bg-white shadow-[0_12px_32px_-8px_rgba(15,40,32,0.14)]",
          )}
        >
          <div
            className={cn(
              "flex size-7 items-center justify-center rounded-lg",
              dark ? "bg-zinc-900" : "bg-bone-100",
            )}
          >
            <div className={cn("size-3 rounded-sm", dark ? "bg-zinc-700" : "bg-swamp/15")} />
          </div>
          <div className="space-y-1.5">
            <SkeletonBar tone={dark ? "dark" : "light"} className="h-1.5 w-24 rounded" />
            <SkeletonBar tone={dark ? "dark" : "light"} className="h-3 w-16 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

type HrPlusPreviewStageProps = {
  className?: string;
  /** Card — inside product browser frame; detail — floating on product pages */
  variant?: "card" | "detail";
  compact?: boolean;
  animated?: boolean;
  /** Skip duplicate window chrome when nested in ProductMockup browser */
  embedded?: boolean;
};

/** Stage wrapper: sizes and background for product surfaces */
export function HrPlusPreviewStage({
  className,
  variant = "detail",
  compact = false,
  animated = true,
  embedded = false,
}: HrPlusPreviewStageProps) {
  return (
    <HrPlusLandingMockup
      variant={variant === "card" && !compact ? "dashboard" : "full"}
      compact={compact}
      animated={animated}
      embedded={embedded}
      className={className}
    />
  );
}

type MockupSkeletonProps = {
  className?: string;
};

/** Full-viewport HR PLUS marketing preview */
export default function MockupSkeleton({ className }: MockupSkeletonProps) {
  return (
    <HrPlusLandingMockup
      className={cn("min-h-screen rounded-none", className)}
    />
  );
}
