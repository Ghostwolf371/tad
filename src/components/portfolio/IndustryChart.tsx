"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";
import {
  PORTFOLIO_DELIVERED_COUNT,
  portfolioPageContent,
} from "@/lib/content/portfolio-page";
import GreenBandStatRibbon from "@/components/layout/GreenBandStatRibbon";
import { cn } from "@/lib/utils";

const SEGMENT_COLORS = [
  "#00e357",
  "#01f2ad",
  "#4de389",
  "#80ebab",
  "#1adb68",
  "#3dd68c",
  "#6ee7a8",
];

type IndustryRow = { label: string; value: number };

type MixSegment = IndustryRow & { color: string; pct: number };

const DONUT_R = 88;
const DONUT_C = 2 * Math.PI * DONUT_R;
const DONUT_STROKE = 18;
const DONUT_GAP = 2.5;

function PortfolioMixDonut({
  segments,
  segmentTotal,
  centerValue,
  activeLabel,
  onHover,
}: {
  segments: MixSegment[];
  segmentTotal: number;
  centerValue: string;
  activeLabel: string | null;
  onHover: (label: string | null) => void;
}) {
  let offset = 0;
  const active =
    segments.find((s) => s.label === activeLabel) ?? segments[0];

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[240px]">
      <svg
        viewBox="0 0 200 200"
        className="h-full w-full -rotate-90"
        role="img"
        aria-label="Portfolio mix by sector"
      >
        <circle
          cx="100"
          cy="100"
          r={DONUT_R}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={DONUT_STROKE}
        />
        {segments.map((seg) => {
          const length = (seg.value / segmentTotal) * DONUT_C;
          const dash = Math.max(0, length - DONUT_GAP);
          const gap = DONUT_C - dash;
          const isActive = !activeLabel || activeLabel === seg.label;
          const strokeDasharray = `${dash} ${gap}`;
          const strokeDashoffset = -offset;
          offset += length;

          return (
            <circle
              key={seg.label}
              cx="100"
              cy="100"
              r={DONUT_R}
              fill="none"
              stroke={seg.color}
              strokeWidth={DONUT_STROKE}
              strokeLinecap="butt"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className={cn(
                "cursor-pointer transition-[opacity,stroke-width] duration-300",
                isActive ? "opacity-100" : "opacity-30",
              )}
              style={
                activeLabel === seg.label
                  ? { filter: "drop-shadow(0 0 6px rgba(0,227,87,0.55))" }
                  : undefined
              }
              onMouseEnter={() => onHover(seg.label)}
              onMouseLeave={() => onHover(null)}
              onFocus={() => onHover(seg.label)}
              onBlur={() => onHover(null)}
            />
          );
        })}
      </svg>

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={active?.label}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="px-4"
          >
            <p className="label-tech-on-dark text-malachite">
              {portfolioPageContent.stats.mixTitle}
            </p>
            <p className="mt-1 text-3xl font-semibold tabular-nums text-white">{centerValue}</p>
            <p className="mt-2 text-sm font-medium text-white">{active?.label}</p>
            <p className="mt-0.5 font-mono text-xs text-white/60">
              {active?.value} · {active?.pct}%
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function getIndustryRows(): IndustryRow[] {
  const map: Record<string, number> = {};
  projects.forEach((p) => {
    const industry = p.tags[p.tags.length - 1] || "Other";
    map[industry] = (map[industry] || 0) + 1;
  });
  return Object.entries(map)
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);
}

export default function IndustryChart() {
  const { stats } = portfolioPageContent;
  const rows = useMemo(() => getIndustryRows(), []);
  const featuredCount = projects.length;
  const topSector = rows[0];
  const [activeLabel, setActiveLabel] = useState<string | null>(null);

  const displayRows = rows.slice(0, 8);
  const otherCount = rows.slice(8).reduce((sum, r) => sum + r.value, 0);
  const maxValue = rows[0]?.value ?? 1;

  const mixSegments = useMemo((): MixSegment[] => {
    const visible =
      otherCount > 0 ? [...displayRows, { label: "Other", value: otherCount }] : displayRows;
    return visible.map((row, i) => ({
      ...row,
      color: SEGMENT_COLORS[i % SEGMENT_COLORS.length],
      pct: Math.round((row.value / featuredCount) * 100),
    }));
  }, [displayRows, otherCount, featuredCount]);

  return (
    <div className="mt-8 space-y-5 sm:mt-12 sm:space-y-6">
      <GreenBandStatRibbon
        stats={[
          {
            label: stats.deliveredLabel,
            value: PORTFOLIO_DELIVERED_COUNT,
            hint: stats.deliveredHint,
          },
          {
            label: "Industries",
            value: String(rows.length),
            hint: "Distinct client verticals",
          },
          {
            label: "Leading sector",
            value: topSector?.label ?? "—",
            hint: topSector
              ? `${topSector.value} project${topSector.value === 1 ? "" : "s"} in this vertical`
              : undefined,
          },
        ]}
      />

      <div className="grid gap-6 lg:grid-cols-12 lg:gap-5">
        {/* Mix visualization */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col rounded-2xl border border-white/12 bg-white/[0.06] p-6 backdrop-blur-sm sm:p-8 lg:col-span-5"
        >
          <p className="label-tech-on-dark text-white/60">{stats.mixTitle}</p>
          <p className="mt-3 text-2xl font-semibold leading-tight text-white">
            {stats.mixSubtitle}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-white/65">{stats.mixDescription}</p>

          <div className="mt-8 flex justify-center py-2">
            <PortfolioMixDonut
              segments={mixSegments}
              segmentTotal={featuredCount}
              centerValue={PORTFOLIO_DELIVERED_COUNT}
              activeLabel={activeLabel}
              onHover={setActiveLabel}
            />
          </div>

          <ul className="mt-6 flex flex-wrap justify-center gap-2">
            {mixSegments.map((seg) => (
              <li key={seg.label}>
                <button
                  type="button"
                  onMouseEnter={() => setActiveLabel(seg.label)}
                  onMouseLeave={() => setActiveLabel(null)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-normal transition-colors",
                    activeLabel === seg.label
                      ? "border-malachite/40 bg-malachite/15 text-white"
                      : "border-white/12 bg-white/6 text-white/65 hover:border-white/20",
                  )}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: seg.color }}
                    aria-hidden
                  />
                  {seg.label}
                </button>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Sector leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl border border-white/12 bg-white/[0.06] backdrop-blur-sm lg:col-span-7"
        >
          <div className="border-b border-white/10 px-6 py-5 sm:px-8">
            <p className="label-tech-on-dark text-white/60">Sector breakdown</p>
            <p className="mt-2 text-sm text-white/65">
              Ranked by project count — experience that transfers across verticals.
            </p>
          </div>

          <ol className="divide-y divide-white/10">
            {displayRows.map((row, i) => {
              const pct = Math.round((row.value / featuredCount) * 100);
              const width = Math.max(6, Math.round((row.value / maxValue) * 100));
              const isActive = activeLabel === row.label || (!activeLabel && i === 0);

              return (
                <li key={row.label}>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveLabel(row.label)}
                    onMouseLeave={() => setActiveLabel(null)}
                    className={cn(
                      "flex w-full items-center gap-4 px-6 py-4 text-left transition-colors sm:gap-5 sm:px-8",
                      isActive ? "bg-white/[0.08]" : "hover:bg-white/[0.04]",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-mono text-xs font-semibold",
                        isActive
                          ? "bg-malachite text-swamp"
                          : "border border-white/15 bg-white/8 text-white/75",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="truncate font-medium text-white">{row.label}</span>
                        <span className="shrink-0 font-mono text-xs tabular-nums text-white/55">
                          {row.value} · {pct}%
                        </span>
                      </div>
                      <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-white/10">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all duration-300",
                            isActive ? "bg-malachite" : "bg-malachite/55",
                          )}
                          style={{ width: `${width}%` }}
                        />
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
            {otherCount > 0 && (
              <li className="px-6 py-4 sm:px-8">
                <p className="text-sm text-white/55">
                  +{rows.length - displayRows.length} more sectors with{" "}
                  <span className="font-medium text-white/75">{otherCount}</span> additional
                  project{otherCount === 1 ? "" : "s"}
                </p>
              </li>
            )}
          </ol>
        </motion.div>
      </div>
    </div>
  );
}
