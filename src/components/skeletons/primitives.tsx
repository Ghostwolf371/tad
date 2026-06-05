import type { ReactNode } from "react";
import { SkeletonBar } from "@/components/ui/SkeletonBar";
import {
  CTA_SECTION_PY,
  HOME_SECTION_PY,
  HOME_SECTION_PY_AFTER_DARK,
  PAGE_SECTION_PY,
  PAGE_SECTION_PY_BEFORE_WHITE,
} from "@/lib/theme/section-spacing";
import { cn } from "@/lib/utils";

export function PageHeroSkeleton({
  titleLines = 2,
  subtitle = true,
  className,
}: {
  titleLines?: number;
  subtitle?: boolean;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "hero-section relative isolate overflow-hidden section-hero-tint pt-32 pb-20 sm:pt-40 sm:pb-24",
        className,
      )}
      aria-hidden
    >
      <div className="relative z-[2] mx-auto max-w-[90rem] px-5 sm:px-6 lg:px-20">
        <div className="flex items-center gap-3">
          <SkeletonBar className="h-px w-6 shrink-0" animated={false} />
          <SkeletonBar className="h-3 w-28" animated={false} />
        </div>
        <div className="mt-5 max-w-4xl space-y-3">
          {Array.from({ length: titleLines }, (_, i) => (
            <SkeletonBar
              key={i}
              className={cn(
                "h-10 rounded-lg sm:h-14",
                i === titleLines - 1 && titleLines > 1 ? "w-[88%]" : "w-full",
              )}
              animated={false}
            />
          ))}
        </div>
        {subtitle && (
          <div className="mt-6 max-w-2xl space-y-2">
            <SkeletonBar className="h-4 w-full" animated={false} />
            <SkeletonBar className="h-4 w-[92%]" animated={false} />
          </div>
        )}
      </div>
    </section>
  );
}

export function SectionHeaderSkeleton({
  dark = false,
  className,
}: {
  dark?: boolean;
  className?: string;
}) {
  const tone = dark ? "dark" : "light";
  return (
    <div className={cn("max-w-3xl space-y-3", className)}>
      <div className="flex items-center gap-3">
        <SkeletonBar tone={tone} className="h-px w-10" animated={false} />
        <SkeletonBar tone={tone} className="h-3 w-32" animated={false} />
      </div>
      <SkeletonBar tone={tone} className="h-9 w-[min(100%,28rem)] rounded-lg" animated={false} />
      <SkeletonBar tone={tone} className="h-4 w-full" animated={false} />
      <SkeletonBar tone={tone} className="h-4 w-11/12" animated={false} />
    </div>
  );
}

type SkeletonSectionProps = {
  tone?: "white" | "light-green" | "dark-green";
  children: ReactNode;
  className?: string;
  py?: string;
  maxWidth?: "7xl" | "3xl";
};

export function SkeletonSection({
  tone = "white",
  children,
  className,
  py = PAGE_SECTION_PY,
  maxWidth = "7xl",
}: SkeletonSectionProps) {
  const bg =
    tone === "dark-green"
      ? "bg-canvas-green"
      : tone === "light-green"
        ? "bg-section-mint"
        : "bg-white";

  return (
    <section className={cn("relative isolate overflow-x-clip", bg, py, className)} aria-hidden>
      <div
        className={cn(
          "relative z-[2] mx-auto px-5 sm:px-6 lg:px-20",
          maxWidth === "3xl" ? "max-w-3xl" : "max-w-[90rem]",
        )}
      >
        {children}
      </div>
    </section>
  );
}

export function SkeletonCard({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-swamp/10 bg-white shadow-[0_1px_0_rgba(0,30,28,0.06)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SkeletonDarkCard({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SkeletonBrowserChrome({
  dark = false,
  className,
  children,
}: {
  dark?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const tone = dark ? "dark" : "light";
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border shadow-[0_24px_64px_rgba(0,30,28,0.08)]",
        dark ? "border-white/10 bg-[#0f1f18]" : "border-swamp/10 bg-white",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2 border-b px-3 py-2.5",
          dark ? "border-white/10 bg-white/[0.03]" : "border-swamp/8 bg-bone-50",
        )}
      >
        <span className="h-2 w-2 rounded-full bg-red-400/70" />
        <span className="h-2 w-2 rounded-full bg-amber-400/70" />
        <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
        <SkeletonBar tone={tone} className="ml-2 h-4 flex-1 rounded-md" animated={false} />
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}

export function SkeletonMockupPanel({
  dark = false,
  className,
}: {
  dark?: boolean;
  className?: string;
}) {
  const tone = dark ? "dark" : "light";
  return (
    <SkeletonBrowserChrome dark={dark} className={className}>
      <div className="grid gap-3 sm:grid-cols-[5.5rem_1fr]">
        <div className="space-y-2">
          {Array.from({ length: 4 }, (_, i) => (
            <SkeletonBar
              key={i}
              tone={tone}
              className={cn("h-8 rounded-lg", i === 0 && "bg-malachite/30")}
              animated={false}
            />
          ))}
        </div>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 3 }, (_, i) => (
              <SkeletonBar key={i} tone={tone} className="h-14 rounded-lg" animated={false} />
            ))}
          </div>
          <SkeletonBar tone={tone} className="h-24 rounded-lg" animated={false} />
        </div>
      </div>
    </SkeletonBrowserChrome>
  );
}

export function SkeletonButtonRow({ count = 2 }: { count?: number }) {
  return (
    <div className="flex flex-wrap gap-3">
      {Array.from({ length: count }, (_, i) => (
        <SkeletonBar
          key={i}
          className={cn("h-11 rounded-full", i === 0 ? "w-40" : "w-36")}
          animated={false}
        />
      ))}
    </div>
  );
}

export function SkeletonTagRow({ count = 3 }: { count?: number }) {
  return (
    <div className="flex flex-wrap gap-2">
      {Array.from({ length: count }, (_, i) => (
        <SkeletonBar key={i} className="h-7 w-20 rounded-full" animated={false} />
      ))}
    </div>
  );
}

export function PageCTASkeleton({ green = false }: { green?: boolean }) {
  return (
    <section
      className={cn(
        "relative isolate overflow-x-clip",
        green ? "bg-canvas-green" : "bg-white",
        green ? HOME_SECTION_PY_AFTER_DARK : CTA_SECTION_PY,
      )}
      aria-hidden
    >
      <div className="relative z-[2] mx-auto max-w-[90rem] px-5 sm:px-6 lg:px-20">
        <div
          className={cn(
            "mx-auto max-w-3xl rounded-2xl border p-8 sm:p-10 lg:p-12",
            green
              ? "border-white/10 bg-white/[0.04]"
              : "border-swamp/10 bg-bone-50/80",
          )}
        >
          <div className="flex flex-col items-center gap-4 text-center">
            <SkeletonBar
              tone={green ? "dark" : "light"}
              className="h-3 w-24 rounded-full"
              animated={false}
            />
            <SkeletonBar
              tone={green ? "dark" : "light"}
              className="h-9 w-full max-w-md rounded-lg"
              animated={false}
            />
            <SkeletonBar
              tone={green ? "dark" : "light"}
              className="h-4 w-full max-w-sm"
              animated={false}
            />
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <SkeletonBar
                tone={green ? "accent" : "light"}
                className="h-11 w-36 rounded-full"
                animated={false}
              />
              <SkeletonBar
                tone={green ? "dark" : "light"}
                className="h-11 w-32 rounded-full"
                animated={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SkeletonProse({ paragraphs = 6 }: { paragraphs?: number }) {
  return (
    <div className="mt-10 space-y-8">
      <SkeletonBar className="h-4 w-full" animated={false} />
      <SkeletonBar className="h-4 w-11/12" animated={false} />
      {Array.from({ length: paragraphs }, (_, i) => (
        <div key={i} className="space-y-2 border-t border-swamp/10 pt-8">
          <SkeletonBar className="h-6 w-48 rounded-lg" animated={false} />
          <SkeletonBar className="h-4 w-full" animated={false} />
          <SkeletonBar className="h-4 w-full" animated={false} />
          <SkeletonBar className="h-4 w-4/5" animated={false} />
        </div>
      ))}
    </div>
  );
}

export const skeletonSpacing = {
  home: HOME_SECTION_PY,
  homeAfterDark: HOME_SECTION_PY_AFTER_DARK,
  page: PAGE_SECTION_PY,
  pageBeforeWhite: PAGE_SECTION_PY_BEFORE_WHITE,
} as const;
