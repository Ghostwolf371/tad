"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { SkeletonBar } from "@/components/ui/SkeletonBar";
import { MockupChartBars } from "@/components/ui/MockupMotion";
import { cn } from "@/lib/utils";

const BAR_HEIGHTS = [40, 58, 42, 82, 52, 70, 44, 64, 48] as const;

const STATUS_PILLS = [
  "bg-[#00e357]/35 border-[#00e357]/50",
  "bg-amber-400/30 border-amber-400/45",
  "bg-cyan-400/30 border-cyan-400/45",
] as const;

/** Saturated pills on dark homepage card */
const STATUS_PILLS_VIVID = [
  "bg-[#00e357] border-[#7dffab]/50 shadow-[0_0_10px_rgba(0,227,87,0.35)]",
  "bg-[#fbbf24] border-[#fde68a]/55 shadow-[0_0_8px_rgba(251,191,36,0.3)]",
  "bg-[#38bdf8] border-[#7dd3fc]/50 shadow-[0_0_8px_rgba(56,189,248,0.28)]",
] as const;

/** Homepage product card — dark shell, vivid accents (static, no shimmer) */
const HR_PLUS_HOME = {
  canvas: "bg-transparent",
  panel:
    "bg-[#162a22] border-[#00e357]/25 shadow-[0_0_0_1px_rgba(0,227,87,0.14),0_12px_28px_-14px_rgba(0,0,0,0.55)]",
  sk: "bg-white/24",
  skAccent: "bg-[#00e357]",
  chartMuted: "bg-white/20",
  chartLive: "bg-[#00e357] shadow-[0_0_10px_rgba(0,227,87,0.4)]",
  inset: "border-[#00e357]/14 bg-[#00e357]/[0.08]",
} as const;

function Sk({
  className,
  style,
  accent,
  static: staticBar,
  animated = true,
}: {
  className?: string;
  style?: CSSProperties;
  accent?: boolean;
  static?: boolean;
  animated?: boolean;
}) {
  if (staticBar) {
    return (
      <div
        className={cn(
          "rounded-md",
          accent ? HR_PLUS_HOME.skAccent : HR_PLUS_HOME.sk,
          className,
        )}
        style={style}
        aria-hidden
      />
    );
  }

  return (
    <SkeletonBar
      tone={accent ? "accent" : "dark"}
      animated={animated}
      className={className}
      style={style}
    />
  );
}

function MockupLogo({ small }: { small?: boolean }) {
  const mark = small ? 18 : 22;

  return (
    <Image
      src="/brand/logomark.webp"
      alt="TAD"
      width={mark}
      height={mark}
      className="shrink-0 object-contain"
      unoptimized
    />
  );
}

function DashboardWindow({
  className,
  size = "md",
  solid,
}: {
  className?: string;
  size?: "sm" | "md";
  /** Homepage card — no glow behind the panel */
  solid?: boolean;
}) {
  const sm = size === "sm";

  return (
    <div className={cn("relative flex h-full min-h-0 w-full items-center justify-center", className)}>
      {solid ? (
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute rounded-full bg-[#00e357]/25 blur-2xl",
            sm ? "right-1 top-1/2 h-16 w-16 -translate-y-1/2" : "-right-2 top-0 h-20 w-20",
          )}
        />
      ) : (
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute rounded-full bg-[#00e357]/35 blur-2xl",
            sm ? "right-0 top-1/2 h-14 w-14 -translate-y-1/2" : "-right-2 top-0 h-16 w-16",
          )}
        />
      )}
      <div
        className={cn(
          "relative w-full max-w-full",
          sm ? "[transform:rotateY(-5deg)_rotateX(2deg)]" : "[transform:rotateY(-8deg)_rotateX(3deg)]",
        )}
      >
        <div
          className={cn(
            "relative overflow-hidden rounded-lg border border-white/10",
            sm ? "p-2" : "p-2.5",
            solid
              ? cn(HR_PLUS_HOME.panel, "shadow-[0_8px_20px_-10px_rgba(0,0,0,0.35)]")
              : "bg-white/[0.07] shadow-[0_16px_40px_-12px_rgba(0,227,87,0.45)] backdrop-blur-sm",
          )}
        >
          <div className="mb-1.5 flex items-center justify-between border-b border-white/[0.08] pb-1.5">
            <div className="flex gap-0.5">
              <span className="size-1 rounded-full bg-[#ff5f57]" />
              <span className="size-1 rounded-full bg-[#febc2e]" />
              <span className="size-1 rounded-full bg-[#28c840]" />
            </div>
            <Sk static={solid} className={cn(sm ? "h-1.5 w-14" : "h-2 w-16")} />
          </div>

          <div className={cn("mb-1.5 grid grid-cols-3", sm ? "gap-1" : "gap-1.5")}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={cn(
                  "space-y-0.5 rounded-md border",
                  solid ? HR_PLUS_HOME.inset : "border-white/[0.08] bg-black/30",
                  sm ? "p-1" : "p-1.5",
                )}
              >
                <Sk static={solid} className="h-1 w-7" />
                <Sk static={solid} className="h-2.5 w-6" accent={i === 2} />
                <Sk static={solid} className="h-1 w-8" />
              </div>
            ))}
          </div>

          <div
            className={cn(
              "mb-1.5 rounded-md border",
              solid ? HR_PLUS_HOME.inset : "border-white/[0.08] bg-black/25",
              sm ? "p-1.5" : "p-2",
            )}
          >
            <Sk static={solid} className="mb-1 h-1.5 w-14" />
            {solid ? (
              <div className={cn("flex items-end justify-between gap-px", sm ? "h-7" : "h-8")}>
                {BAR_HEIGHTS.map((h, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex-1 rounded-t-sm",
                      i >= 5 ? HR_PLUS_HOME.chartLive : HR_PLUS_HOME.chartMuted,
                    )}
                    style={{ height: `${h}%` }}
                    aria-hidden
                  />
                ))}
              </div>
            ) : (
              <MockupChartBars
                heights={BAR_HEIGHTS}
                activeFrom={5}
                tone="dark"
                className="gap-px"
                barClassName="rounded-t-sm"
                activeClassName="rounded-t-sm bg-gradient-to-t from-[#00e357]/25 to-[#00e357]/70"
              />
            )}
          </div>

          <div className="space-y-1">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center justify-between gap-1">
                <div className="flex items-center gap-1">
                  <Sk static={solid} className={cn("shrink-0 rounded-full", sm ? "size-3.5" : "size-4")} />
                  <div className="space-y-0.5">
                    <Sk static={solid} className={cn(sm ? "h-1 w-10" : "h-1.5 w-12")} />
                    <Sk static={solid} className="h-1 w-7" />
                  </div>
                </div>
                <div
                  className={cn(
                    "rounded border",
                    sm ? "h-3 w-7" : "h-3.5 w-8",
                    solid ? STATUS_PILLS_VIVID[i] : STATUS_PILLS[i],
                  )}
                  aria-hidden
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

type HrPlusLandingMockupProps = {
  className?: string;
  variant?: "full" | "dashboard";
  /** Homepage product tile — tighter spacing */
  compact?: boolean;
  /** false on homepage — static skeletons, no shimmer */
  animated?: boolean;
  /** Inside ProductMockup browser — no extra window frame */
  embedded?: boolean;
};

/**
 * Fluid two-column landing skeleton — fills its parent (no CSS scale).
 */
export default function HrPlusLandingMockup({
  className,
  variant = "full",
  compact = false,
  animated = true,
  embedded = false,
}: HrPlusLandingMockupProps) {
  const solid = compact || !animated;

  if (variant === "dashboard") {
    return (
      <div
        className={cn(
          "flex h-full w-full flex-col overflow-hidden",
          embedded
            ? "min-h-0 bg-transparent"
            : "min-h-[16.5rem] rounded-xl border border-swamp/10 bg-[#0a1410]",
          className,
        )}
        role="img"
        aria-label="HR Plus dashboard skeleton preview"
      >
        {!embedded && (
          <div className="flex h-7 shrink-0 items-center gap-1 border-b border-white/[0.08] bg-black/40 px-2">
            <span className="size-1.5 rounded-full bg-[#ff5f57]" />
            <span className="size-1.5 rounded-full bg-[#febc2e]" />
            <span className="size-1.5 rounded-full bg-[#28c840]" />
            <Sk static={solid} className="ml-1 h-2 max-w-[6rem] flex-1" />
          </div>
        )}
        <div
          className={cn(
            "relative min-h-0 flex-1",
            embedded ? "p-2" : "p-3",
            solid ? HR_PLUS_HOME.canvas : "bg-[#0f1f18]",
          )}
        >
          <DashboardWindow size="sm" solid={solid} />
        </div>
      </div>
    );
  }

  const sm = compact;

  return (
    <div
      className={cn(
        "relative flex h-full w-full min-w-0 flex-col overflow-hidden",
        embedded
          ? "min-h-0 bg-transparent"
          : sm
            ? "min-h-[16.5rem] rounded-lg"
            : "min-h-[22rem] rounded-xl lg:min-h-[26rem]",
        !embedded &&
          (sm && solid
            ? HR_PLUS_HOME.canvas
            : sm
              ? "bg-[#0f1f18]"
              : "bg-[radial-gradient(ellipse_120%_90%_at_90%_0%,#1e4d34_0%,#0f1f18_48%,#0a120e_100%)]"),
        className,
      )}
      role="img"
      aria-label="HR Plus marketing site skeleton preview"
    >
      {!sm && (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-6 top-0 h-28 w-28 rounded-full bg-[#00e357]/18 blur-3xl"
        />
      )}

      <div
        className={cn(
          "relative z-10 flex min-h-0 flex-1 flex-col",
          embedded
            ? "gap-1.5 px-2 pb-2 pt-1.5"
            : sm
              ? "gap-2 px-2.5 pb-2.5 pt-2"
              : "gap-3 px-4 pb-4 pt-3 sm:gap-4 sm:px-5 sm:pb-5 sm:pt-4",
        )}
      >
        <header className="flex shrink-0 items-center justify-between gap-2">
          <MockupLogo small={sm} />
          <div className="flex min-w-0 flex-1 justify-center gap-1.5 px-1" aria-hidden>
            {(sm ? [28, 32, 24, 30] : [36, 44, 32, 40, 48]).map((w, i) => (
              <Sk key={i} static={solid} className="h-1.5 shrink-0" style={{ width: w }} />
            ))}
          </div>
          <Sk static={solid} className={cn("shrink-0 rounded-md", sm ? "h-5 w-11" : "h-6 w-14")} />
        </header>

        <div
          className={cn(
            "grid min-h-0 flex-1 gap-2",
            "grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]",
            sm ? "gap-2" : "gap-3 sm:gap-4",
          )}
        >
          <div
            className={cn(
              "flex min-w-0 flex-col justify-center",
              sm ? "space-y-1.5" : "space-y-2.5",
            )}
          >
            <Sk static={solid} className={cn("rounded-full", sm ? "h-3.5 w-24" : "h-4 w-32")} />
            <div className={cn(sm ? "space-y-1" : "space-y-1.5")}>
              <Sk static={solid} className={cn("w-full", sm ? "h-3" : "h-4")} />
              <Sk static={solid} accent className={cn(sm ? "h-3 w-[90%]" : "h-4 w-[85%]")} />
              {!sm && <Sk className="h-4 w-[60%]" />}
            </div>
            <div className="space-y-1">
              <Sk static={solid} className={cn("w-full", sm ? "h-1.5" : "h-2")} />
              <Sk static={solid} className={cn(sm ? "h-1.5 w-[92%]" : "h-2 w-full")} />
            </div>
            <div className="flex gap-1.5">
              <Sk
                static={solid}
                accent
                className={cn("rounded-md", sm ? "h-6 min-w-0 flex-1" : "h-7 w-20")}
              />
              <Sk static={solid} className={cn("rounded-md", sm ? "h-6 min-w-0 flex-1" : "h-7 w-20")} />
            </div>
            <div
              className={cn(
                "grid grid-cols-3 gap-1 border-t border-white/[0.08]",
                sm ? "pt-1.5" : "gap-1.5 pt-2.5",
              )}
            >
              {[0, 1, 2].map((i) => (
                <div key={i} className="space-y-1">
                  <Sk static={solid} accent={i === 0} className={cn(sm ? "h-3.5 w-6" : "h-4 w-8")} />
                  <Sk static={solid} className={cn("w-full", sm ? "h-1.5" : "h-2")} />
                </div>
              ))}
            </div>
          </div>

          <DashboardWindow size={sm ? "sm" : "md"} solid={solid} className="min-h-0" />
        </div>
      </div>
    </div>
  );
}
