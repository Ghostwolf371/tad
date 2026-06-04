"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  ArrowUpRight,
  Globe,
  Megaphone,
  ShoppingBag,
  Smartphone,
} from "lucide-react";
import { services } from "@/data/services";
import Reveal from "@/components/ui/Reveal";
import KineticHeading from "@/components/ui/KineticHeading";
import Magnetic from "@/components/ui/Magnetic";
import MarqueeRail from "@/components/ui/MarqueeRail";
import { SectionGreenBleedUp } from "@/components/ui/SectionAmbient";
import ServiceMockup, {
  type ServiceMockupVariant,
} from "@/components/sections/ServiceMockup";
import ScaleToFit from "@/components/ui/ScaleToFit";
import { cn } from "@/lib/utils";

const ICONS = {
  ShoppingBag,
  Globe,
  Smartphone,
  Megaphone,
} as const;

const MOCKUP_VARIANT: Record<string, ServiceMockupVariant> = {
  "e-commerce": "ecommerce",
  "web-development": "dashboard",
  "mobile-development": "mobile",
  "digital-marketing": "marketing",
};

const DISCIPLINES = [
  "STRATEGY",
  "DESIGN",
  "ENGINEERING",
  "MARKETING",
  "BRANDING",
  "DELIVERY",
] as const;

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const disciplineChips = DISCIPLINES.map((label) => (
  <span
    key={label}
    className="flex items-center gap-10 font-mono text-[11px] uppercase tracking-widest text-swamp/40"
  >
    {label}
    <span className="h-1 w-1 rounded-full bg-malachite" aria-hidden />
  </span>
));

export default function ServicesSection() {
  return (
    <section
      className="relative isolate overflow-x-clip bg-white pt-6 pb-10 sm:py-20 lg:py-32"
      id="services"
    >
      <SectionGreenBleedUp />

      <div className="relative z-[2] mx-auto max-w-[90rem] px-6 lg:px-20">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-malachite" aria-hidden />
                <span className="label-tech text-malachite-700">WHAT WE DO</span>
              </div>
            </Reveal>
            <KineticHeading
              as="h2"
              lines={["Services engineered", "for growth."]}
              accentLastWord
              useDisplayFont
              delay={0.05}
              className="mt-5 text-4xl font-semibold leading-[1.05] tracking-normal text-swamp sm:text-5xl lg:text-6xl"
            />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-2xl text-base leading-8 text-swamp/70">
                Strategy, design, engineering, and marketing — planned together so
                every touchpoint works as one system.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <Link
              href="/services"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-malachite-700 transition hover:text-malachite-800"
            >
              View all services
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <Reveal delay={0.18}>
          <MarqueeRail
            items={disciplineChips}
            gap="gap-10"
            className="mt-8 sm:mt-10"
          />
        </Reveal>

        <Reveal delay={0.15} staggerChildren>
          <div className="mt-10 overflow-hidden rounded-2xl border border-swamp/10 bg-white lg:mt-12">
            <div className="grid grid-cols-2 gap-px bg-swamp/10 lg:grid-cols-4 lg:items-stretch">
              {services.map((service) => {
                const Icon =
                  ICONS[service.icon as keyof typeof ICONS] ?? Globe;
                const mockupVariant =
                  MOCKUP_VARIANT[service.id] ?? "dashboard";

                return (
                  <motion.div
                    key={service.id}
                    variants={cardVariants}
                    className="h-full bg-white"
                  >
                  <Link
                    href={service.href}
                    id={service.id}
                    className="corner-brackets group flex h-full flex-col px-5 py-6 transition-colors hover:bg-bone-50/60 sm:px-6 sm:py-7"
                  >
                    <div className="mb-4 flex shrink-0 items-start justify-between gap-2">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-swamp/10 bg-white text-malachite-700 shadow-sm transition group-hover:border-malachite/25">
                        <Icon className="h-4 w-4" strokeWidth={1.75} />
                      </span>
                      <Magnetic strength={0.5}>
                        <ArrowUpRight className="h-3.5 w-3.5 text-swamp/25 transition group-hover:text-malachite-700" />
                      </Magnetic>
                    </div>

                    <ScaleToFit
                      designWidth={250}
                      designHeight={264}
                      className="mb-5 w-full shrink-0"
                    >
                      <ServiceMockup
                        variant={mockupVariant}
                        className="size-full"
                        animated={false}
                      />
                    </ScaleToFit>

                    <div className="mt-auto flex shrink-0 flex-col gap-1.5 border-t border-swamp/[0.06] pt-4">
                      <p className="label-tech text-malachite-700">
                        {service.tagline.toUpperCase()}
                      </p>
                      <h3 className="text-base font-semibold leading-snug text-swamp sm:text-lg">
                        {service.heading}
                      </h3>
                      <p className="line-clamp-3 text-sm leading-relaxed text-swamp/65">
                        {service.text}
                      </p>
                    </div>
                  </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-10 flex flex-wrap items-center gap-4 sm:mt-12">
            <span className="text-sm text-swamp/45">
              Four disciplines · One delivery team
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
