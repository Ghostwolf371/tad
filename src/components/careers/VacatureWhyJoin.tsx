"use client";

import { motion } from "framer-motion";
import { Globe, Rocket, Sparkles, type LucideIcon } from "lucide-react";
import PageSection from "@/components/layout/PageSection";
import KineticHeading from "@/components/ui/KineticHeading";
import { careersPageContent } from "@/lib/content/careers-page";
import { PAGE_SECTION_PY } from "@/lib/theme/section-spacing";
import { surfaceCardInteractiveClassName } from "@/lib/theme/surfaces";
import { cn } from "@/lib/utils";

const PILLAR_ICONS: LucideIcon[] = [Rocket, Globe, Sparkles];

function WhyJoinPillarCard({
  pillar,
  index,
}: {
  pillar: (typeof careersPageContent.whyJoin.pillars)[number];
  index: number;
}) {
  const Icon = PILLAR_ICONS[index] ?? Rocket;
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

type VacatureWhyJoinProps = {
  sectionIndex?: number;
};

export default function VacatureWhyJoin({ sectionIndex = 0 }: VacatureWhyJoinProps) {
  const { whyJoin } = careersPageContent;

  return (
    <PageSection
      index={sectionIndex}
      tone="white"
      previousTone="light-green"
      backgroundClassName="bg-[#FEFEFE]"
      py={PAGE_SECTION_PY}
      className="relative overflow-hidden"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[8%] top-[12%] h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(0,200,83,0.08)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute bottom-[10%] right-[6%] h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(0,200,83,0.06)_0%,transparent_72%)] blur-3xl" />
      </div>

      <div className="relative max-w-3xl">
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-malachite-700" aria-hidden />
          <span className="label-tech text-malachite-700">{whyJoin.eyebrow}</span>
        </div>
        <KineticHeading
          as="h2"
          lines={[...whyJoin.titleLines]}
          accentLastWord
          className="mt-4 text-3xl font-semibold leading-[1.06] tracking-normal text-swamp sm:mt-5 sm:text-4xl md:text-5xl"
        />
        <p className="mt-4 text-sm leading-relaxed text-swamp/72 sm:mt-6 sm:text-base">
          {whyJoin.description}
        </p>
      </div>

      <div className="relative mt-8 grid gap-5 sm:mt-12 sm:gap-6 md:grid-cols-3">
        {whyJoin.pillars.map((pillar, i) => (
          <WhyJoinPillarCard key={pillar.title} pillar={pillar} index={i} />
        ))}
      </div>
    </PageSection>
  );
}
