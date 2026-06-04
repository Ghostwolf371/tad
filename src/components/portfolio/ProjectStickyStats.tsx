"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import type { Project } from "@/data/projects";
import { PORTFOLIO_CATEGORY_LABELS } from "@/data/projects";

export default function ProjectStickyStats({ project }: { project: Project }) {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [200, 350], [0, 1]);

  return (
    <>
      {/* Inline tag strip below hero */}
      <div className="border-b border-swamp/10 bg-white">
        <div className="mx-auto flex max-w-[90rem] items-center gap-3 px-6 py-4 lg:px-20">
          <span className="font-mono text-[10px] uppercase tracking-normal text-swamp/40">
            {PORTFOLIO_CATEGORY_LABELS[project.portfolioCategory]}
          </span>
          <span className="h-3 w-px bg-swamp/15" />
          <div className="flex gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-sm border border-swamp/10 bg-swamp/[0.02] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-normal text-swamp/60"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Floating mini-bar on scroll */}
      <motion.div
        style={{ opacity }}
        className="pointer-events-none fixed left-1/2 top-20 z-50 -translate-x-1/2"
      >
        <div className="rounded-full border border-swamp/10 bg-white/80 px-4 py-1.5 shadow-sm backdrop-blur-md">
          <span className="text-sm font-medium text-swamp/70">
            {project.heading}
          </span>
        </div>
      </motion.div>
    </>
  );
}
