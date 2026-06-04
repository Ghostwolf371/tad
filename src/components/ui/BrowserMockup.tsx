"use client";

import { motion } from "framer-motion";
import { MockupChartBars } from "@/components/ui/MockupMotion";
import { skeletonBarClassName, type SkeletonTone } from "@/components/ui/SkeletonBar";
import { cn } from "@/lib/utils";

type Variant = "dashboard" | "ecommerce" | "mobile" | "marketing";
type Theme = "light" | "dark";

const themeStyles = {
  light: {
    shell:
      "border-swamp/10 bg-white shadow-[0_40px_80px_-20px_rgba(0,30,28,0.18)]",
    chrome: "border-b border-swamp/8 bg-bone-50",
    dot: "bg-swamp/15",
    dotActive: "bg-malachite/60",
    urlBar: "bg-swamp/[0.04]",
    bar: "bg-swamp/10",
    barActive: "bg-malachite/60",
    barHighlight: "bg-swamp/50",
    panel: "border-swamp/8 bg-bone-50",
    panelInner: "border-swamp/8 bg-white",
    chartInactive: "bg-swamp/10",
    mobileShell: "border-swamp/15 bg-bone-100",
    mobileNotch: "bg-swamp/20",
    gradient: "from-malachite/20 to-swamp/5",
  },
  dark: {
    shell:
      "border-white/10 bg-swamp-900/80 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]",
    chrome: "border-b border-white/5 bg-white/[0.02]",
    dot: "bg-white/15",
    dotActive: "bg-malachite/50",
    urlBar: "bg-white/[0.04]",
    bar: "bg-white/10",
    barActive: "bg-malachite/60",
    barHighlight: "bg-white/60",
    panel: "border-white/5 bg-white/[0.02]",
    panelInner: "border-white/5 bg-white/[0.02]",
    chartInactive: "bg-white/15",
    mobileShell: "border-white/15 bg-swamp-800",
    mobileNotch: "bg-white/20",
    gradient: "from-malachite/20 to-white/5",
  },
};

export default function BrowserMockup({
  variant = "dashboard",
  theme = "light",
  className = "",
}: {
  variant?: Variant;
  theme?: Theme;
  className?: string;
}) {
  const t = themeStyles[theme];
  const skeletonTone: SkeletonTone = theme === "dark" ? "dark" : "light";

  return (
    <div
      className={`relative overflow-hidden rounded-xl border ${t.shell} ${className}`}
    >
      <div className={`flex items-center gap-2 px-4 py-2.5 ${t.chrome}`}>
        <span className={`h-2 w-2 rounded-full ${t.dot}`} />
        <span className={`h-2 w-2 rounded-full ${t.dot}`} />
        <span className={`h-2 w-2 rounded-full ${t.dotActive}`} />
        <span
          className={cn("ml-3 h-4 flex-1 rounded", skeletonBarClassName(skeletonTone))}
        />
      </div>
      <div className="p-4">
        {variant === "dashboard" && <Dashboard t={t} skeletonTone={skeletonTone} />}
        {variant === "ecommerce" && <Ecommerce t={t} skeletonTone={skeletonTone} />}
        {variant === "mobile" && <Mobile t={t} skeletonTone={skeletonTone} />}
        {variant === "marketing" && <Marketing t={t} skeletonTone={skeletonTone} />}
      </div>
    </div>
  );
}

type T = (typeof themeStyles)["light"];

type MockupBodyProps = { t: T; skeletonTone: SkeletonTone };

function Dashboard({ t, skeletonTone }: MockupBodyProps) {
  return (
    <div className="grid grid-cols-4 gap-3">
      <aside className="col-span-1 space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-2 rounded",
              i === 1 ? t.barActive : skeletonBarClassName(skeletonTone),
            )}
            style={{ width: `${60 + ((i * 17) % 40)}%` }}
          />
        ))}
      </aside>
      <div className="col-span-3 space-y-3">
        <div className="grid grid-cols-3 gap-2">
          {[42, 68, 24].map((h, i) => (
            <div key={i} className={`rounded-md border p-2 ${t.panel}`}>
              <div className={skeletonBarClassName(skeletonTone, "h-1.5 w-10 rounded")} />
              <div className={skeletonBarClassName(skeletonTone, "mt-2 h-3 w-16 rounded")} />
              <div className={`mt-2 h-1 w-full overflow-hidden rounded ${t.chartInactive}`}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${h}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.2 + i * 0.1 }}
                  className="h-full bg-malachite"
                />
              </div>
            </div>
          ))}
        </div>
        <div className={`h-24 rounded-md border p-3 ${t.panel}`}>
          <MockupChartBars
            heights={[30, 52, 38, 66, 48, 72, 58, 82, 64, 90, 78, 96]}
            activeFrom={9}
            tone={skeletonTone}
            className="h-full gap-1.5"
            activeClassName="bg-malachite"
          />
        </div>
      </div>
    </div>
  );
}

function Ecommerce({ t, skeletonTone }: MockupBodyProps) {
  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <div className="h-5 w-16 rounded-full border border-malachite/40 bg-malachite/20" />
        <div className={skeletonBarClassName(skeletonTone, "h-5 w-12 rounded-full")} />
        <div className={skeletonBarClassName(skeletonTone, "h-5 w-14 rounded-full")} />
      </div>
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={`rounded-md border p-2 ${t.panelInner}`}>
            <div className={`aspect-square rounded bg-gradient-to-br ${t.gradient}`} />
            <div className={skeletonBarClassName(skeletonTone, "mt-2 h-1.5 w-14 rounded")} />
            <div className={`mt-1 h-1.5 w-10 rounded ${t.barActive}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Mobile({ t, skeletonTone }: MockupBodyProps) {
  return (
    <div className="flex justify-center py-2">
      <div
        className={`relative h-48 w-28 rounded-2xl border p-2 shadow-[0_0_40px_rgba(0,227,87,0.12)] ${t.mobileShell}`}
      >
        <div className={skeletonBarClassName(skeletonTone, "mx-auto mb-2 h-1 w-8 rounded-full")} />
        <div className="space-y-1.5">
          <div className={`h-10 rounded bg-gradient-to-br ${t.gradient}`} />
          <div className="grid grid-cols-2 gap-1.5">
            <div className={skeletonBarClassName(skeletonTone, "h-8 rounded")} />
            <div className="h-8 rounded bg-malachite/20" />
          </div>
          <div className={skeletonBarClassName(skeletonTone, "h-2 w-16 rounded")} />
          <div className={skeletonBarClassName(skeletonTone, "h-2 w-20 rounded")} />
          <div className={skeletonBarClassName(skeletonTone, "h-2 w-14 rounded")} />
          <div className="mt-2 h-5 rounded-full bg-malachite" />
        </div>
      </div>
    </div>
  );
}

function Marketing({ t, skeletonTone }: MockupBodyProps) {
  return (
    <div className="grid grid-cols-5 gap-3">
      <div className="col-span-2 space-y-2">
        <div className={skeletonBarClassName(skeletonTone, "h-2 w-14 rounded")} />
        <div className={skeletonBarClassName(skeletonTone, "h-3 w-full rounded")} />
        <div className={skeletonBarClassName(skeletonTone, "h-3 w-10/12 rounded")} />
        <div className="mt-3 h-6 w-20 rounded-full bg-malachite" />
      </div>
      <div className="col-span-3 space-y-2">
        <MockupChartBars
          heights={[20, 40, 60, 45, 70, 55, 85, 72, 95]}
          activeFrom={6}
          tone={skeletonTone}
          className="h-20 gap-1"
          activeClassName="bg-malachite"
        />
        <div className="flex gap-2">
          <div className={skeletonBarClassName(skeletonTone, "h-6 flex-1 rounded")} />
          <div className="h-6 w-12 rounded bg-malachite/40" />
        </div>
      </div>
    </div>
  );
}
