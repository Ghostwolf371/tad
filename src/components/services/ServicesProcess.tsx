"use client";

import { motion } from "framer-motion";
import { Code2, Compass, PenTool, Rocket, type LucideIcon } from "lucide-react";
import { SERVICES_PROCESS_STEPS, servicesPageContent } from "@/lib/content/services-page";
import PageSection from "@/components/layout/PageSection";
import { PAGE_SECTION_PY } from "@/lib/theme/section-spacing";
import HomeSectionHeader from "@/components/home/HomeSectionHeader";
import { surfaceCardInteractiveClassName } from "@/lib/theme/surfaces";
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
      className={surfaceCardInteractiveClassName(
        "group relative flex h-full flex-col overflow-hidden p-5 sm:p-6",
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute right-4 top-4 z-0 font-mono text-6xl font-bold leading-none text-swamp/[0.06] sm:text-7xl"
      >
        {step.when}
      </span>

      <div className="relative flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-malachite/25 bg-malachite/10 text-malachite-700 transition-colors duration-300 group-hover:border-malachite/40 group-hover:bg-malachite/15">
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </div>
        <div className="flex min-w-0 items-center gap-3">
          <span className="h-px w-8 shrink-0 bg-malachite-700" aria-hidden />
          <span className="label-tech text-malachite-700">{step.when}</span>
        </div>
      </div>

      <h3 className="relative mt-5 text-lg font-semibold leading-snug tracking-normal text-swamp sm:mt-6 xl:text-xl">
        {step.title}
      </h3>
      <p className="relative mt-3 flex-1 text-sm leading-relaxed text-swamp/75">{step.text}</p>

      <div className="relative mt-5 sm:mt-6">
        <span className="label-tech inline-flex w-fit items-center rounded-lg border border-malachite/20 bg-malachite/8 px-3 py-2 text-malachite-700">
          {step.deliverable}
        </span>
      </div>

      <div
        aria-hidden
        className={cn(
          "relative mt-5 h-px w-full sm:mt-6",
          "bg-gradient-to-r from-malachite/30 via-swamp/8 to-transparent",
          "transition-opacity duration-300 group-hover:from-malachite/50",
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
      tone="white"
      previousTone="white"
      py={PAGE_SECTION_PY}
      className="bg-[#FEFEFE]"
    >
      <HomeSectionHeader
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
          className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[4.5rem] hidden h-px bg-gradient-to-r from-transparent via-malachite/20 to-transparent lg:block"
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
