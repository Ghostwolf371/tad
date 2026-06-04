"use client";

import { motion } from "framer-motion";
import { Target, Telescope, type LucideIcon } from "lucide-react";
import PageSection from "@/components/layout/PageSection";
import { aboutContent } from "@/lib/content/about";
import {
  greenBandIconWellLgClassName,
  greenBandPanelCardClassName,
} from "@/lib/theme/green-band-surfaces";
import {
  PAGE_SECTION_PY_BEFORE_WHITE,
} from "@/lib/theme/section-spacing";
import { cn } from "@/lib/utils";

const MISSION_ICONS: LucideIcon[] = [Target, Telescope];

type CardProps = {
  eyebrow: string;
  title: string;
  text: string;
  index: number;
  featured?: boolean;
};

function MissionVisionCard({ eyebrow, title, text, index, featured }: CardProps) {
  const Icon = MISSION_ICONS[index] ?? Target;
  const watermark = index === 0 ? "M" : "V";

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        greenBandPanelCardClassName("group relative overflow-hidden p-4 sm:p-6", { featured }),
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute right-4 top-4 font-mono text-7xl font-bold leading-none text-white/[0.07] sm:text-8xl"
      >
        {watermark}
      </span>

      <div className="relative flex items-center gap-3">
        <div className={greenBandIconWellLgClassName(featured)}>
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </div>
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-malachite" aria-hidden />
          <span className="label-tech-on-dark text-white/70">{eyebrow}</span>
        </div>
      </div>

      <h3 className="relative mt-5 text-xl font-semibold leading-[1.1] tracking-normal text-white sm:mt-6 sm:text-2xl lg:text-3xl">
        {title}
      </h3>

      <p className="relative mt-4 flex-1 text-sm leading-relaxed text-white/78 sm:text-base">
        {text}
      </p>

      <div
        aria-hidden
        className={cn(
          "relative mt-5 h-px w-full sm:mt-8",
          featured
            ? "bg-gradient-to-r from-malachite/60 via-spring/40 to-transparent"
            : "bg-gradient-to-r from-white/25 to-transparent",
        )}
      />
    </motion.article>
  );
}

type AboutMissionVisionSectionProps = {
  sectionIndex?: number;
};

export default function AboutMissionVisionSection({
  sectionIndex = 1,
}: AboutMissionVisionSectionProps) {
  const { mission, vision } = aboutContent;

  return (
    <PageSection
      index={sectionIndex}
      tone="dark-green"
      previousTone="white"
      nextSectionTone="white"
      ambient="dark-band"
      py={PAGE_SECTION_PY_BEFORE_WHITE}
    >
      <div className="grid gap-3 sm:gap-4 lg:grid-cols-2 lg:gap-5">
        <MissionVisionCard
          eyebrow={mission.eyebrow}
          title={mission.title}
          text={mission.text}
          index={0}
          featured
        />
        <MissionVisionCard
          eyebrow={vision.eyebrow}
          title={vision.title}
          text={vision.text}
          index={1}
        />
      </div>
    </PageSection>
  );
}
