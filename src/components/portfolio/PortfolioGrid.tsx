"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  projects,
  type PortfolioCategory,
} from "@/data/projects";
import ProjectCard from "./ProjectCard";
import { cn } from "@/lib/utils";

const ALL = "all" as const;

const FILTERS: { id: typeof ALL | PortfolioCategory; label: string }[] = [
  { id: ALL, label: "All" },
  { id: "e-commerce", label: "E-Commerce" },
  { id: "website", label: "Website" },
  { id: "custom-software", label: "Custom Software" },
];

type PortfolioGridProps = {
  onDark?: boolean;
};

export default function PortfolioGrid({ onDark = false }: PortfolioGridProps) {
  const [active, setActive] = useState<typeof ALL | PortfolioCategory>(ALL);

  const filtered = useMemo(() => {
    if (active === ALL) return projects;
    return projects.filter((p) => p.portfolioCategory === active);
  }, [active]);

  return (
    <>
      <div
        className={cn(
          "flex flex-wrap items-center gap-3 rounded-2xl border p-4 sm:p-5",
          onDark
            ? "border-white/12 bg-white/[0.06]"
            : "border-swamp/10 bg-bone-50/60 shadow-[0_1px_0_rgba(0,30,28,0.04)]",
        )}
      >
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActive(filter.id)}
              className={cn(
                "relative rounded-full px-4 py-2 text-xs font-medium tracking-normal transition-colors",
                active === filter.id
                  ? "text-swamp"
                  : onDark
                    ? "border border-white/20 text-white/70 hover:border-malachite/40 hover:text-white"
                    : "border border-swamp/10 bg-white text-swamp/70 hover:border-malachite/30 hover:text-swamp",
              )}
            >
              {active === filter.id && (
                <motion.div
                  layoutId="activeFilterPill"
                  className="absolute inset-0 rounded-full bg-malachite shadow-[0_2px_8px_rgba(0,227,87,0.35)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{filter.label}</span>
            </button>
          ))}
        </div>
        <span
          className={cn(
            "ml-auto font-mono text-[10px] font-medium uppercase tracking-normal",
            onDark ? "text-white/55" : "text-swamp/45",
          )}
        >
          {filtered.length} shown
        </span>
      </div>

      <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
