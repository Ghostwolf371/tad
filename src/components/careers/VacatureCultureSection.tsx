"use client";

import { motion } from "framer-motion";
import {
  Laptop,
  Coffee,
  Heart,
  Globe,
  Zap,
  Shield,
  Server,
  Palette,
  Code2,
  PenTool,
  BarChart3,
  type LucideIcon,
} from "lucide-react";
import GreenBandStatRibbon from "@/components/layout/GreenBandStatRibbon";
import { greenBandTagClassName } from "@/lib/theme/green-band-surfaces";
import { cn } from "@/lib/utils";

type CultureItem = {
  icon: LucideIcon;
  label: string;
  desc: string;
};

const PERKS: CultureItem[] = [
  { icon: Laptop, label: "Remote-first", desc: "Work from anywhere with async-friendly rituals." },
  { icon: Coffee, label: "Learning budget", desc: "Books, courses, and conferences covered." },
  { icon: Heart, label: "Health coverage", desc: "Support that extends beyond the screen." },
  { icon: Globe, label: "Global clients", desc: "Caribbean roots, international delivery." },
  { icon: Zap, label: "Fast hardware", desc: "Top-tier gear from day one." },
  { icon: Shield, label: "Autonomy", desc: "Own outcomes end-to-end with trust." },
];

const STACK: CultureItem[] = [
  { icon: Code2, label: "Next.js / React", desc: "App Router, RSC, modern UI" },
  { icon: Server, label: "Node / Python", desc: "APIs, workers, integrations" },
  { icon: Palette, label: "Figma", desc: "Design systems & handoff" },
  { icon: PenTool, label: "Tailwind CSS", desc: "Utility-first styling at scale" },
  { icon: BarChart3, label: "Analytics", desc: "Data-informed product decisions" },
];

const HIGHLIGHTS = [PERKS[0], PERKS[3], PERKS[5]];

function PerkRow({
  item,
  index,
}: {
  item: CultureItem;
  index: number;
}) {
  const Icon = item.icon;

  return (
    <motion.li
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex gap-4 py-4 first:pt-0 last:pb-0"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white transition-colors group-hover:border-malachite/35 group-hover:bg-malachite/15 group-hover:text-malachite">
        <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
      </span>
      <div className="min-w-0 flex-1 pt-0.5">
        <p className="font-medium text-white">{item.label}</p>
        <p className="mt-1 text-sm leading-relaxed text-white/65">{item.desc}</p>
      </div>
    </motion.li>
  );
}

function StackPill({
  item,
  index,
}: {
  item: CultureItem;
  index: number;
}) {
  const Icon = item.icon;

  return (
    <motion.li
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={cn(
          greenBandTagClassName,
          "inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium",
        )}
      >
        <Icon className="h-4 w-4 text-malachite" strokeWidth={1.75} />
        {item.label}
      </div>
    </motion.li>
  );
}

export default function VacatureCultureSection() {
  return (
    <div className="mt-10 space-y-6 sm:mt-12">
      <GreenBandStatRibbon
        stats={[
          { label: "Work style", value: "Remote-first", hint: "Async-friendly, outcome-focused" },
          { label: "Stack", value: "Modern", hint: "Next.js, Node, Figma, Tailwind" },
          { label: "Growth", value: "Built-in", hint: "Learning budget & mentorship" },
        ]}
      />

      <div className="grid gap-6 lg:grid-cols-2 lg:gap-5">
        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl border border-white/12 bg-white/[0.06] p-6 backdrop-blur-sm sm:p-8"
        >
          <p className="label-tech-on-dark text-malachite">Benefits</p>
          <h3 className="mt-3 text-2xl font-semibold leading-tight text-white">Life at TAD</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/65">
            How we support people who care about craft — not just the work on the roadmap.
          </p>
          <ul className="mt-6 divide-y divide-white/10">
            {PERKS.map((item, i) => (
              <PerkRow key={item.label} item={item} index={i} />
            ))}
          </ul>
        </motion.div>

        {/* Stack */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col rounded-2xl border border-white/12 bg-white/[0.06] p-6 backdrop-blur-sm sm:p-8"
        >
          <p className="label-tech-on-dark text-malachite">Toolkit</p>
          <h3 className="mt-3 text-2xl font-semibold leading-tight text-white">
            What you&apos;ll ship with
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white/65">
            The same modern stack we use on client work — no legacy toolchain surprises.
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {STACK.map((item, i) => (
              <StackPill key={item.label} item={item} index={i} />
            ))}
          </ul>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {STACK.slice(0, 2).map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="rounded-xl border border-malachite/30 bg-malachite/10 p-4"
                >
                  <Icon className="h-5 w-5 text-malachite" strokeWidth={1.75} />
                  <p className="mt-3 text-sm font-semibold text-white">{item.label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-white/65">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Highlight strip */}
      <div className="grid gap-4 sm:grid-cols-3">
        {HIGHLIGHTS.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.12 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-white/12 bg-white/[0.06] px-5 py-5 backdrop-blur-sm sm:px-6"
            >
              <Icon className="h-5 w-5 text-malachite" strokeWidth={1.75} />
              <p className="mt-3 font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-sm text-white/60">{item.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
