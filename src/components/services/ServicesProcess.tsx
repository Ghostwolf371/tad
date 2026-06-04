"use client";

import { motion } from "framer-motion";
import { Code2, Compass, PenTool, Rocket, type LucideIcon } from "lucide-react";
import { SERVICES_PROCESS_STEPS, servicesPageContent } from "@/lib/content/services-page";
import PageSection from "@/components/layout/PageSection";
import { PAGE_SECTION_PY } from "@/lib/theme/section-spacing";
import HomeSectionHeader from "@/components/home/HomeSectionHeader";
import {
  greenBandDeliverableClassName,
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

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        greenBandPanelCardClassName(
          "group relative flex h-full flex-col overflow-hidden transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-malachite/35 hover:bg-white/10 hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)]",
        ),
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute right-4 top-4 z-0 font-mono text-6xl font-bold leading-none text-white/[0.06] sm:text-7xl"
      >
        {step.when}
      </span>

      <div className="relative flex items-center gap-3">
        <div className={greenBandIconWellClassName()}>
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </div>
        <div className="flex min-w-0 items-center gap-3">
          <span className="h-px w-8 shrink-0 bg-malachite" aria-hidden />
          <span className="label-tech-on-dark text-malachite">{step.when}</span>
        </div>
      </div>

      <h3 className="relative mt-5 text-lg font-semibold leading-snug tracking-normal text-white sm:mt-6 xl:text-xl">
        {step.title}
      </h3>
      <p className="relative mt-3 flex-1 text-sm leading-relaxed text-white/75">{step.text}</p>

      <div className="relative mt-5 sm:mt-6">
        <span className={greenBandDeliverableClassName}>{step.deliverable}</span>
      </div>

      <div
        aria-hidden
        className={cn(
          "relative mt-5 h-px w-full sm:mt-6",
          "bg-gradient-to-r from-malachite/35 via-white/10 to-transparent",
          "transition-opacity duration-300 group-hover:from-malachite/55",
        )}
      />
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
      <HomeSectionHeader
        variant="dark"
        eyebrow={process.eyebrow}
        title={process.title}
        description={process.description}
        className="max-w-3xl"
        titleClassName="leading-[1.04]"
        descriptionClassName="mt-4 max-w-2xl sm:mt-5"
      />

      <ol className="relative mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        <div
          aria-hidden
          className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[4.5rem] hidden h-px bg-gradient-to-r from-transparent via-malachite/25 to-transparent lg:block"
        />
        {SERVICES_PROCESS_STEPS.map((step, i) => (
          <li key={step.title} className="relative min-w-0">
            <ProcessStepCard step={step} index={i} />
          </li>
        ))}
      </ol>
    </PageSection>
  );
}
