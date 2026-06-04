"use client";

import { motion } from "framer-motion";
import { Brain, Globe, Shield, Zap, type LucideIcon } from "lucide-react";
import PageSection from "@/components/layout/PageSection";
import { PAGE_SECTION_PY } from "@/lib/theme/section-spacing";
import HomeSectionHeader from "@/components/home/HomeSectionHeader";
import {
  greenBandIconWellClassName,
  greenBandPanelCardClassName,
} from "@/lib/theme/green-band-surfaces";
import { cn } from "@/lib/utils";

type RoadmapStatus = "in-progress" | "planned";

type RoadmapItem = {
  quarter: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  status: RoadmapStatus;
};

const ROADMAP_ITEMS: RoadmapItem[] = [
  {
    quarter: "Q3 2025",
    title: "AI Analytics Engine",
    desc: "Natural-language queries across all product data.",
    icon: Brain,
    status: "in-progress",
  },
  {
    quarter: "Q4 2025",
    title: "Multi-Tenant SSO",
    desc: "Enterprise-grade single sign-on and role management.",
    icon: Shield,
    status: "planned",
  },
  {
    quarter: "Q1 2026",
    title: "Global Edge Deploy",
    desc: "Sub-100ms response times on every continent.",
    icon: Globe,
    status: "planned",
  },
  {
    quarter: "Q2 2026",
    title: "Autonomous Agents",
    desc: "Self-managing workflows that adapt to your business.",
    icon: Zap,
    status: "planned",
  },
];

function StatusBadge({ status }: { status: RoadmapStatus }) {
  if (status === "in-progress") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-malachite px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-normal text-swamp">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-swamp/50" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-swamp" />
        </span>
        In progress
      </span>
    );
  }

  return (
    <span className="inline-flex rounded-full border border-white/25 bg-white/10 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-normal text-white/85">
      Planned
    </span>
  );
}

function RoadmapCard({ item, index }: { item: RoadmapItem; index: number }) {
  const Icon = item.icon;
  const active = item.status === "in-progress";

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={greenBandPanelCardClassName("relative h-full", { featured: active })}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="label-tech-on-dark text-white/70">{item.quarter}</span>
        <StatusBadge status={item.status} />
      </div>

      <div className={cn(greenBandIconWellClassName(active), "mt-5 h-12 w-12")}>
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </div>

      <h3 className="mt-5 text-lg font-semibold leading-snug tracking-normal text-white">
        {item.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-white/75">{item.desc}</p>
    </motion.article>
  );
}

export default function ProductRoadmap({
  sectionIndex = 2,
}: {
  sectionIndex?: number;
}) {
  return (
    <PageSection
      index={sectionIndex}
      tone="dark-green"
      previousTone="white"
      nextSectionTone="light-green"
      ambient="dark-band"
      py={PAGE_SECTION_PY}
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end lg:gap-14">
        <HomeSectionHeader
          variant="dark"
          eyebrow="Up next"
          title="Product roadmap"
          description="What we're building next — transparent priorities, shipped continuously."
          className="max-w-none"
          titleClassName="leading-[1.04]"
          descriptionClassName="max-w-xl"
        />
        <p className="text-sm leading-relaxed text-white/70 lg:pb-2 lg:text-right lg:text-base">
          Live products today, platform upgrades on a public cadence — so you know what ships
          next.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-5">
        {ROADMAP_ITEMS.map((item, i) => (
          <RoadmapCard key={item.title} item={item} index={i} />
        ))}
      </div>
    </PageSection>
  );
}
