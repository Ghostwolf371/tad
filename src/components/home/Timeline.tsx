"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Code2, Compass, PenTool, Rocket } from "lucide-react";
import HomeSection from "@/components/home/HomeSection";
import { HOME_SECTION_PY_BEFORE_WHITE } from "@/lib/theme/section-spacing";
import KineticHeading from "@/components/ui/KineticHeading";
import Parallax from "@/components/ui/Parallax";
import SignalPulse from "@/components/ui/SignalPulse";
import Reveal from "@/components/ui/Reveal";
import {
  greenBandCardClassName,
  greenBandDeliverableClassName,
  greenBandIconWellLgClassName,
} from "@/lib/theme/green-band-surfaces";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    when: "01",
    icon: Compass,
    title: "Discovery",
    text: "Goals, audience, scope, content, integrations, and success metrics.",
    deliverable: "Project map",
  },
  {
    when: "02",
    icon: PenTool,
    title: "Wireframes",
    text: "User journeys and page structure before visual polish locks the flow.",
    deliverable: "Clickable flow",
  },
  {
    when: "03",
    icon: Code2,
    title: "Design",
    text: "High-fidelity UI, responsive states, content rhythm, and design system.",
    deliverable: "Launch UI",
  },
  {
    when: "04",
    icon: Rocket,
    title: "Development",
    text: "Clean build, staging, testing, analytics, handoff, and production deploy.",
    deliverable: "Live product",
  },
] as const;

function StepCard({
  step,
  index,
}: {
  step: (typeof STEPS)[number];
  index: number;
}) {
  const Icon = step.icon;
  const featured = index === 0;

  return (
    <Reveal delay={index * 0.12} blur scale={0.95} y={24} className="block w-full min-w-0">
      <article
        className={cn(
          greenBandCardClassName(
            [
              "group relative grid w-full gap-5 p-5",
              "lg:grid-cols-[3rem_minmax(0,10rem)_minmax(0,1fr)_auto]",
              "lg:items-start",
              "transition-colors duration-500 hover:border-malachite/60",
            ].join(" "),
            { featured },
          ),
        )}
      >
        <div className={greenBandIconWellLgClassName(featured)}>
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </div>

        <div className="min-w-0">
          <span className="label-tech-on-dark flex items-center gap-2 text-malachite">
            Step {step.when}
          </span>
          <h3 className="mt-2 text-xl font-semibold tracking-normal text-white sm:text-2xl">{step.title}</h3>
        </div>

        <p className="min-w-0 text-sm leading-7 text-white/75">{step.text}</p>

        <span className={cn(greenBandDeliverableClassName, "shrink-0 justify-self-end lg:justify-self-auto")}>
          {step.deliverable}
        </span>
      </article>
    </Reveal>
  );
}

export default function Timeline() {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const dotTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <HomeSection
      tone="dark-green"
      backgroundClassName="bg-canvas-green"
      edgeTop
      edgeBottom
      className="overflow-x-clip"
      py={HOME_SECTION_PY_BEFORE_WHITE}
    >
      <div
        aria-hidden
        className="glow-bloom pointer-events-none absolute left-1/2 top-1/3 -z-[0] h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2"
      />

      <div className="relative z-[1] grid gap-8 lg:grid-cols-[0.82fr_1fr] lg:items-end">
        <div>
          <span className="label-tech-on-dark text-malachite">TAD process</span>
          <KineticHeading
            as="h2"
            lines={["From kickoff to launch,", "without the black box."]}
            accentLastWord
            useDisplayFont
            className="mt-4 text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.04] tracking-tight text-white"
          />
        </div>
        <p className="max-w-2xl text-base leading-8 text-white/80 lg:justify-self-end">
          A predictable path from idea to production. Each step has a clear output, so clients
          can see what is being decided, designed, built, and shipped.
        </p>
      </div>

      <div ref={containerRef} className="relative z-[1] mt-16 overflow-visible">
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-[13px] top-0 z-0 hidden w-px -translate-x-1/2 lg:block"
        >
          <div className="absolute inset-0 bg-white/20" />
          {reduceMotion ? (
            <div className="absolute inset-0 origin-top bg-malachite shadow-glow-green" />
          ) : (
            <motion.div
              className="absolute inset-0 origin-top bg-malachite shadow-glow-green"
              style={{
                scaleY: lineScale,
                boxShadow: "0 0 16px rgba(0,227,87,0.6)",
              }}
            />
          )}

          {/* Glowing leading cap that tracks the line fill position */}
          {reduceMotion ? (
            <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2">
              <span className="block h-2.5 w-2.5 rounded-full bg-malachite shadow-[0_0_14px_rgba(0,227,87,0.9)]" />
            </div>
          ) : (
            <motion.div
              className="absolute left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
              style={{ top: dotTop }}
            >
              <SignalPulse
                size="sm"
                className="block animate-pulse-glow rounded-full shadow-[0_0_14px_rgba(0,227,87,0.9)]"
              />
            </motion.div>
          )}
        </div>

        <ol className="relative z-[1] flex flex-col gap-5">
          {STEPS.map((step, i) => (
            <li key={step.title} className="flex w-full items-start gap-4 lg:gap-5">
              <div className="relative hidden w-7 shrink-0 items-start justify-center pt-5 lg:flex">
                <motion.div
                  className="relative z-10 h-3 w-3 rounded-full border-2 border-[#001715] bg-malachite shadow-[0_0_0_3px_rgba(0,227,87,0.25)]"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ delay: i * 0.12, duration: 0.4, type: "spring" }}
                />
              </div>
              <div className="min-w-0 flex-1">
                <Parallax speed={0.08}>
                  <StepCard step={step} index={i} />
                </Parallax>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </HomeSection>
  );
}
