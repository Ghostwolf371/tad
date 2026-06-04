"use client";

import { motion } from "framer-motion";
import { Code2, Compass, PenTool, Rocket, type LucideIcon } from "lucide-react";
import { SERVICES_PROCESS_STEPS, servicesPageContent } from "@/lib/content/services-page";
import PageSection from "@/components/layout/PageSection";
import { PAGE_SECTION_PY } from "@/lib/theme/section-spacing";
import HomeSectionHeader from "@/components/home/HomeSectionHeader";
import {
  greenBandChipClassName,
  greenBandIconWellClassName,
  greenBandPanelCardClassName,
} from "@/lib/theme/green-band-surfaces";
import { cn } from "@/lib/utils";

const STEP_ICONS: LucideIcon[] = [Compass, PenTool, Code2, Rocket];

function ProcessStepCard({
  step,
  index,
}: {
  step: (typeof SERVICES_PROCESS_STEPS)[number];
  index: number;
}) {
  const Icon = STEP_ICONS[index] ?? Compass;
  const featured = index === 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        greenBandPanelCardClassName("group relative flex h-full flex-col", { featured }),
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-1 -top-2 font-mono text-5xl font-bold leading-none text-white/[0.06] lg:text-6xl"
      >
        {step.when}
      </span>

      <div className="relative flex items-start justify-between gap-3">
        <div className={greenBandIconWellClassName(featured)}>
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </div>
        <span className={greenBandChipClassName}>{step.deliverable}</span>
      </div>

      <p className="label-tech-on-dark relative mt-5 text-malachite">Step {step.when}</p>
      <h3 className="relative mt-2 text-lg font-semibold leading-snug tracking-normal text-white xl:text-xl">
        {step.title}
      </h3>
      <p className="relative mt-3 flex-1 text-sm leading-relaxed text-white/75">{step.text}</p>
    </motion.article>
  );
}

type ServicesProcessProps = {
  sectionIndex?: number;
};

export default function ServicesProcess({ sectionIndex = 1 }: ServicesProcessProps) {
  const { process } = servicesPageContent;

  return (
    <PageSection
      index={sectionIndex}
      tone="dark-green"
      previousTone="white"
      nextSectionTone="white"
      py={PAGE_SECTION_PY}
      ambient="dark-band"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end lg:gap-14">
        <HomeSectionHeader
          variant="dark"
          eyebrow={process.eyebrow}
          title={process.title}
          className="max-w-none"
          titleClassName="leading-[1.04]"
          descriptionClassName="max-w-xl"
        />
        <p className="text-sm leading-relaxed text-white/75 lg:pb-2 lg:text-right lg:text-base">
          {process.description}
        </p>
      </div>

      <ol className="mt-12 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        {SERVICES_PROCESS_STEPS.map((step, i) => (
          <li key={step.title} className="min-w-0">
            <ProcessStepCard step={step} index={i} />
          </li>
        ))}
      </ol>
    </PageSection>
  );
}
