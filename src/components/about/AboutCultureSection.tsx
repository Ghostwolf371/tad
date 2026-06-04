"use client";

import { motion } from "framer-motion";
import { Eye, Layers, PenTool, type LucideIcon } from "lucide-react";
import PageSection, { type SectionTone } from "@/components/layout/PageSection";
import HomeSectionHeader from "@/components/home/HomeSectionHeader";
import { aboutContent } from "@/lib/content/about";
import { PAGE_SECTION_PY_AFTER_DARK } from "@/lib/theme/section-spacing";
import { surfaceCardInteractiveClassName } from "@/lib/theme/surfaces";
import { cn } from "@/lib/utils";

const PILLAR_ICONS: LucideIcon[] = [PenTool, Eye, Layers];

type AboutCultureSectionProps = {
  sectionIndex?: number;
  tone?: SectionTone;
  grid?: boolean;
  edgeTop?: boolean;
};

function CulturePillarCard({
  pillar,
  index,
}: {
  pillar: (typeof aboutContent.culture.pillars)[number];
  index: number;
}) {
  const Icon = PILLAR_ICONS[index] ?? PenTool;
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className={surfaceCardInteractiveClassName(
        "group relative flex h-full flex-col overflow-hidden p-6 sm:p-8",
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute right-4 top-4 font-mono text-6xl font-bold leading-none text-swamp/[0.06] sm:text-7xl"
      >
        {num}
      </span>

      <div className="relative flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-malachite/25 bg-malachite/10 text-malachite-700 transition-colors duration-300 group-hover:border-malachite/40 group-hover:bg-malachite/15">
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </div>
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-malachite-700" aria-hidden />
          <span className="label-tech text-malachite-700">{num}</span>
        </div>
      </div>

      <h3 className="relative mt-5 text-lg font-semibold leading-[1.12] tracking-normal text-swamp sm:mt-6 sm:text-xl">
        {pillar.title}
      </h3>

      <p className="relative mt-4 flex-1 text-sm leading-relaxed text-swamp/75">
        {pillar.text}
      </p>

      <div
        aria-hidden
        className={cn(
          "relative mt-6 h-px w-full sm:mt-8",
          "bg-gradient-to-r from-malachite/30 via-swamp/8 to-transparent",
          "transition-opacity duration-300 group-hover:from-malachite/50",
        )}
      />
    </motion.article>
  );
}

export default function AboutCultureSection({
  sectionIndex = 2,
  tone,
  grid,
  edgeTop = false,
}: AboutCultureSectionProps) {
  const { culture } = aboutContent;

  return (
    <PageSection
      index={sectionIndex}
      tone={tone}
      grid={grid}
      edgeTop={edgeTop}
      py={PAGE_SECTION_PY_AFTER_DARK}
    >
      <HomeSectionHeader
        eyebrow={culture.eyebrow}
        title={culture.title}
        description={culture.intro}
        className="max-w-3xl"
        descriptionClassName="mt-4 sm:mt-6"
      />
      <div className="mt-8 grid gap-5 sm:mt-12 sm:gap-6 md:grid-cols-3">
        {culture.pillars.map((pillar, i) => (
          <CulturePillarCard key={pillar.title} pillar={pillar} index={i} />
        ))}
      </div>
    </PageSection>
  );
}
