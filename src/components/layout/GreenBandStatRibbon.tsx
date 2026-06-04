"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type GreenBandStat = {
  label: string;
  value: string;
  hint?: string;
};

type GreenBandStatRibbonProps = {
  stats: GreenBandStat[];
  className?: string;
};

export default function GreenBandStatRibbon({ stats, className }: GreenBandStatRibbonProps) {
  return (
    <div
      className={cn(
        "grid overflow-hidden rounded-2xl border border-white/12 bg-white/[0.06] backdrop-blur-sm",
        stats.length === 2 && "sm:grid-cols-2",
        stats.length >= 3 && "sm:grid-cols-3",
        className,
      )}
    >
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "relative px-5 py-5 sm:px-7 sm:py-6",
            i > 0 && "border-t border-white/10 sm:border-t-0 sm:border-l sm:border-white/10",
          )}
        >
          <p className="label-tech-on-dark text-white/60">{stat.label}</p>
          <p className="mt-2 text-3xl font-semibold tabular-nums tracking-normal text-white sm:text-4xl">
            {stat.value}
          </p>
          {stat.hint && (
            <p className="mt-2 text-sm leading-relaxed text-white/65">{stat.hint}</p>
          )}
        </motion.div>
      ))}
    </div>
  );
}
