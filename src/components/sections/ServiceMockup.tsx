"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  MockupChartBars,
  MockupKpiStrip,
  MockupProgressRow,
} from "@/components/ui/MockupMotion";
import { MockupAnimationProvider } from "@/components/ui/MockupAnimationContext";
import { skeletonBarClassName, type SkeletonTone } from "@/components/ui/SkeletonBar";
import { cn } from "@/lib/utils";
import { useMockupAnimated } from "@/components/ui/MockupAnimationContext";

function useSk() {
  const animated = useMockupAnimated();
  return (tone: SkeletonTone, className: string) =>
    skeletonBarClassName(tone, className, animated);
}

export type ServiceMockupVariant =
  | "ecommerce"
  | "dashboard"
  | "mobile"
  | "marketing";

/** Fixed canvas — every service card uses the same frame size */
export const SERVICE_MOCKUP_HEIGHT = "h-[16.5rem]";

type ServiceMockupProps = {
  variant: ServiceMockupVariant;
  className?: string;
  /** false on homepage — static skeletons, no shimmer or grow-in */
  animated?: boolean;
};

const PATHS: Record<ServiceMockupVariant, string> = {
  ecommerce: "shop",
  dashboard: "app",
  mobile: "mobile",
  marketing: "campaigns",
};

function Chrome({ path }: { path: string }) {
  return (
    <div className="flex h-8 shrink-0 items-center gap-1.5 border-b border-swamp/[0.06] bg-bone-50 px-2.5">
      <span className="h-[6px] w-[6px] rounded-full bg-[#ff5f57]" />
      <span className="h-[6px] w-[6px] rounded-full bg-[#febc2e]" />
      <span className="h-[6px] w-[6px] rounded-full bg-[#28c840]" />
      <span className="ml-1 min-w-0 flex-1 truncate rounded bg-swamp/[0.04] px-1.5 py-0.5 font-mono text-[7px] text-swamp/40">
        tad.sr/{path}
      </span>
    </div>
  );
}

/** Shared body — top-aligned, fills remaining frame height */
function Canvas({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-h-0 flex-1 flex-col justify-start overflow-hidden bg-white p-2.5",
        className
      )}
    >
      {children}
    </div>
  );
}

function EcommerceMockup() {
  const sk = useSk();
  const products = [
    { hot: true },
    { hot: false },
    { hot: true },
  ];

  return (
    <Canvas className="bg-bone-50/30 p-3">
      <div className="flex h-full flex-col gap-2">
        <div className="flex shrink-0 items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <div className="size-4 rounded-md bg-gradient-to-br from-malachite to-spring shadow-sm" />
            <div className={sk("light", "h-1.5 w-12 rounded-full")} />
          </div>
          <div className="flex items-center gap-1">
            <div className="h-5 w-14 rounded-full border border-swamp/[0.06] bg-white" />
            <div className="relative size-5 rounded-full border border-malachite/20 bg-white">
              <div className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-malachite ring-2 ring-white" />
            </div>
          </div>
        </div>

        <div className="relative shrink-0 overflow-hidden rounded-xl border border-malachite/15 bg-gradient-to-br from-malachite/20 via-malachite-50 to-spring/15 p-3 shadow-sm">
          <div className="pointer-events-none absolute -right-4 -top-4 h-14 w-14 rounded-full bg-spring/20 blur-lg" />
          <div className={sk("light", "relative h-1.5 w-20 rounded-full")} />
          <div className={sk("light", "relative mt-2 h-2 w-28 rounded-full")} />
          <div className="relative mt-3 inline-flex h-6 items-center rounded-full bg-malachite px-3 shadow-[0_2px_10px_rgba(0,227,87,0.35)]">
            <div className="h-1 w-10 rounded-full bg-swamp/25" />
          </div>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-3 gap-1.5">
          {products.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 4 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 + i * 0.04, duration: 0.35 }}
              className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-swamp/[0.06] bg-white p-1.5 shadow-sm"
            >
              <div
                className={cn(
                  "min-h-0 flex-1 rounded-md",
                  p.hot
                    ? "bg-gradient-to-br from-malachite/30 to-spring/15"
                    : "bg-bone-100"
                )}
              >
                {p.hot && (
                  <span className="m-1 inline-block rounded bg-malachite px-1 py-px text-[6px] font-bold uppercase text-swamp">
                    Sale
                  </span>
                )}
              </div>
              <div className={sk("light", "mt-1.5 h-1 w-full rounded-full")} />
              <div
                className={cn(
                  "mt-1 h-1 rounded-full",
                  p.hot ? "w-3/4 bg-malachite" : sk("light", "w-1/2")
                )}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </Canvas>
  );
}

function DashboardMockup() {
  const sk = useSk();
  const bars = [32, 48, 40, 68, 52, 82, 58, 94, 72, 88];

  return (
    <Canvas className="p-3">
      <div className="grid h-full grid-cols-[22%_1fr] gap-2">
        <aside className="flex flex-col rounded-lg border border-swamp/[0.06] bg-bone-50 p-2 shadow-sm">
          <div className="mb-2 size-4 rounded-md bg-malachite/80" />
          <div className="flex min-h-0 flex-1 flex-col gap-1.5">
            {[true, false, false, false, false, false].map((active, i) => (
              <div
                key={i}
                className={cn(
                  "h-1.5 rounded-full",
                  active ? "w-full bg-malachite" : sk("light", "w-4/5")
                )}
              />
            ))}
          </div>
        </aside>

        <div className="flex min-h-0 flex-col gap-2">
          <div className="grid shrink-0 grid-cols-3 gap-1.5">
            {[
              { highlight: true, value: "w-full" },
              { highlight: false, value: "w-2/3" },
              { highlight: false, value: "w-3/4" },
            ].map((stat, i) => (
              <div
                key={i}
                className="rounded-lg border border-swamp/[0.06] bg-white px-2 py-2 shadow-sm"
              >
                <div className={sk("light", "h-1 w-8 rounded-full")} />
                <div
                  className={cn(
                    "mt-2 h-2 rounded-full",
                    stat.highlight
                      ? "w-full bg-malachite"
                      : sk("light", `mt-2 h-2 rounded-full ${stat.value}`)
                  )}
                />
              </div>
            ))}
          </div>

          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-swamp/[0.06] bg-bone-50/80 p-2 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <div className={sk("light", "h-1.5 w-16 rounded-full")} />
              <div className="flex gap-1">
                <div className="size-2 rounded-sm bg-malachite" />
                <div className={sk("light", "size-2 rounded-sm")} />
              </div>
            </div>
            <MockupChartBars
              heights={bars}
              activeFrom={7}
              activeClassName="bg-gradient-to-t from-malachite-600 to-malachite shadow-[0_0_8px_rgba(0,227,87,0.25)]"
            />
          </div>

          <div className="grid shrink-0 grid-cols-2 gap-1.5">
            <div className="h-9 rounded-lg border border-swamp/[0.05] bg-white p-1.5 shadow-sm">
              <div className={sk("light", "h-1 w-10 rounded-full")} />
              <div className="mt-1.5 h-1.5 w-full rounded-full bg-malachite/50" />
            </div>
            <div className="h-9 rounded-lg border border-swamp/[0.05] bg-white p-1.5 shadow-sm">
              <div className={sk("light", "h-1 w-8 rounded-full")} />
              <div className={sk("light", "mt-1.5 h-1.5 w-4/5 rounded-full")} />
            </div>
          </div>
        </div>
      </div>
    </Canvas>
  );
}

/** Compact iPhone-style shell (matches hero showcase framing at card scale). */
function ServicePhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-full w-full">
      <div aria-hidden className="absolute -left-px top-[22%] z-20 h-3.5 w-[2px] rounded-l-sm bg-[#3a3a3c]" />
      <div aria-hidden className="absolute -left-px top-[31%] z-20 h-5 w-[2px] rounded-l-sm bg-[#3a3a3c]" />
      <div aria-hidden className="absolute -left-px top-[42%] z-20 h-5 w-[2px] rounded-l-sm bg-[#3a3a3c]" />
      <div aria-hidden className="absolute -right-px top-[30%] z-20 h-6 w-[2px] rounded-r-sm bg-[#3a3a3c]" />
      <div
        className="relative h-full w-full rounded-[1.4rem] bg-[#1c1c1e] p-[2px]"
        style={{
          boxShadow: "inset 1px 0 0 rgba(255,255,255,0.08), 0 0 0 1px rgba(255,255,255,0.06)",
        }}
      >
        <div className="h-full w-full rounded-[1.28rem] bg-[#0a0a0b] p-[1.5px]">
          <div className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-[1.18rem] bg-[#f6faf7]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[1.18rem] bg-gradient-to-br from-white/22 via-transparent to-transparent"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-[7px] z-20 h-[9px] w-[26px] -translate-x-1/2 rounded-full bg-[#0d0d0f] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
            />
            {children}
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-1 left-1/2 h-[2px] w-[26%] -translate-x-1/2 rounded-full bg-swamp/25"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileMockup() {
  const sk = useSk();
  const tiles = [{ active: true }, { active: false }, { active: false }];

  return (
    <Canvas className="relative overflow-hidden bg-gradient-to-b from-bone-50 via-white to-bone-50/80 p-2">
      <div className="relative z-10 flex h-full items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="relative flex h-[92%] w-auto max-w-[56%] shrink-0 flex-col aspect-[10/19.5]"
        >
          <ServicePhoneFrame>
            <div className="relative flex min-h-0 flex-1 flex-col gap-1.5 px-2 pb-2 pt-[18px]">
              <div className="relative shrink-0 overflow-hidden rounded-lg border border-malachite/15 bg-gradient-to-br from-malachite/22 via-malachite-50 to-spring/15 p-2 shadow-sm">
                <div className="pointer-events-none absolute -right-2 -top-2 h-8 w-8 rounded-full bg-spring/25 blur-md" />
                <div className="relative h-1 w-12 rounded-full bg-swamp/18" />
                <div className={sk("light", "relative mt-1.5 h-1 w-9 rounded-full")} />
                <div className="relative mt-2 inline-flex h-4 items-center rounded-full bg-malachite px-2 shadow-[0_2px_8px_rgba(0,227,87,0.3)]">
                  <div className="h-0.5 w-6 rounded-full bg-swamp/25" />
                </div>
              </div>

              <div className="grid min-h-0 flex-1 grid-cols-3 gap-1">
                {tiles.map((tile, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 3 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.06 + i * 0.04, duration: 0.3 }}
                    className="flex min-h-0 flex-col overflow-hidden rounded-md border border-swamp/[0.06] bg-bone-50/80 p-1"
                  >
                    <div
                      className={cn(
                        "min-h-0 flex-1 rounded-sm",
                        tile.active
                          ? "bg-gradient-to-br from-malachite/35 to-spring/15"
                          : "bg-bone-100"
                      )}
                    />
                    <div
                      className={cn(
                        "mt-1 h-0.5 rounded-full",
                        tile.active ? "w-full bg-malachite" : sk("light", "w-2/3")
                      )}
                    />
                  </motion.div>
                ))}
              </div>

              <div className="grid shrink-0 grid-cols-3 gap-0.5 rounded-md border border-swamp/[0.05] bg-bone-50/60 p-0.5">
                {[true, false, false].map((active, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex flex-col items-center gap-0.5 rounded py-0.5",
                      active && "bg-white shadow-sm"
                    )}
                  >
                    <div
                      className={cn(
                        "size-2 rounded-sm",
                        active ? "bg-malachite" : sk("light", "size-2 rounded-sm")
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>
          </ServicePhoneFrame>
        </motion.div>
      </div>
    </Canvas>
  );
}

function MarketingMockup() {
  const sk = useSk();
  const bars = [38, 55, 42, 65, 48, 78, 58, 92, 70, 88] as const;
  const campaigns = [88, 62, 76] as const;

  return (
    <Canvas className="bg-bone-50/20 p-3">
      <div className="flex h-full flex-col gap-2">
        <div className="grid shrink-0 grid-cols-3 gap-1.5">
          {[
            { kpi: "84%", accent: false },
            { kpi: "2.4k", accent: false },
            { kpi: "+38%", accent: true },
          ].map((item, i) => (
            <div
              key={i}
              className={cn(
                "rounded-lg border px-2 py-2.5 text-center shadow-sm",
                item.accent
                  ? "border-malachite/25 bg-malachite/10"
                  : "border-swamp/[0.06] bg-white"
              )}
            >
              <span
                className={cn(
                  "font-mono text-[8px] font-semibold leading-none",
                  item.accent ? "text-malachite-700" : "text-swamp/50"
                )}
              >
                {item.kpi}
              </span>
              <MockupKpiStrip className="mt-1.5" />
            </div>
          ))}
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-swamp/[0.06] bg-white p-2.5 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <div className={sk("light", "h-1.5 w-14 rounded-full")} />
            <div className="flex items-center gap-1">
              <span className="text-[6px] font-medium text-swamp/40">Reach</span>
              <div className="size-2 rounded-sm bg-malachite" />
            </div>
          </div>
          <MockupChartBars heights={bars} activeFrom={6} />
        </div>

        <div className="shrink-0 space-y-1.5 rounded-lg border border-swamp/[0.06] bg-white p-2 shadow-sm">
          {campaigns.map((width, i) => (
            <MockupProgressRow key={i} fillPercent={width} index={i} />
          ))}
        </div>
      </div>
    </Canvas>
  );
}

const BODIES: Record<ServiceMockupVariant, () => ReactNode> = {
  ecommerce: EcommerceMockup,
  dashboard: DashboardMockup,
  mobile: MobileMockup,
  marketing: MarketingMockup,
};

export default function ServiceMockup({
  variant,
  className = "",
  animated = true,
}: ServiceMockupProps) {
  const Body = BODIES[variant];

  return (
    <MockupAnimationProvider animated={animated}>
      <div
        className={cn(
          "flex h-full min-h-0 flex-col overflow-hidden rounded-lg border border-swamp/10 bg-white shadow-[0_12px_32px_-16px_rgba(0,30,28,0.18)]",
          className,
        )}
      >
        <Chrome path={PATHS[variant]} />
        <Body />
      </div>
    </MockupAnimationProvider>
  );
}
