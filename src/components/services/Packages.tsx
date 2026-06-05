"use client";

import { motion } from "framer-motion";
import { ArrowRight, Building2, Check, Rocket, Store } from "lucide-react";
import PageSection from "@/components/layout/PageSection";
import { PAGE_SECTION_PY } from "@/lib/theme/section-spacing";
import HomeSectionHeader from "@/components/home/HomeSectionHeader";
import { servicesPageContent } from "@/lib/content/services-page";
import { ButtonLink } from "@/components/ui/Button";
import { SectionGreenBleedUp } from "@/components/ui/SectionAmbient";
import type { SectionTone } from "@/components/layout/PageSection";
import { surfaceCardClassName } from "@/lib/theme/surfaces";
import { cn } from "@/lib/utils";

/** Border-ring glow + gentle lift — equal on all cards (no stronger center hover). */
const PACKAGE_CARD_MOTION =
  "transition-[border-color,box-shadow,transform] duration-[480ms] ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none motion-reduce:hover:transform-none";

const PACKAGE_CARD_HOVER =
  "hover:-translate-y-1 hover:border-malachite/50 hover:shadow-[0_22px_44px_-20px_rgba(0,30,28,0.12),0_0_0_1px_rgba(0,200,83,0.28),0_0_0_3px_rgba(0,200,83,0.12),0_0_18px_-2px_rgba(0,200,83,0.22)]";

const PACKAGES = [
  {
    name: "Starter Web Package",
    kicker: "Launch",
    description: "For small businesses needing a professional digital presence fast.",
    signal: "2–4 week sprint",
    features: [
      "Template-based or simple custom build",
      "Mobile responsive design",
      "Basic SEO optimization",
      "Contact form & maps integration",
      "Fast loading speeds",
    ],
    popular: false,
    cta: "Start your journey",
    Icon: Rocket,
  },
  {
    name: "E-Commerce Pro",
    kicker: "Scale",
    description: "Full webshop with inventory management for growing retailers.",
    signal: "Storefront + ops",
    features: [
      "Custom storefront design",
      "Advanced inventory management",
      "Secure payment gateway integration",
      "User accounts & order tracking",
      "Marketing & analytics setup",
    ],
    popular: true,
    cta: "Build your store",
    Icon: Store,
  },
  {
    name: "Enterprise Custom Solution",
    kicker: "Custom",
    description: "Tailored applications and complex platforms on demand.",
    signal: "Architecture first",
    features: [
      "Bespoke system architecture",
      "Custom integrations & APIs",
      "High scalability & performance",
      "Dedicated project manager",
      "24/7 priority support",
    ],
    popular: false,
    cta: "Discuss your needs",
    Icon: Building2,
  },
] as const;

type PackagesProps = {
  sectionIndex?: number;
  previousTone?: SectionTone;
};

export default function Packages({
  sectionIndex = 2,
  previousTone = "dark-green",
}: PackagesProps) {
  const { packages } = servicesPageContent;

  return (
    <PageSection
      index={sectionIndex}
      tone="white"
      id="packages"
      previousTone={previousTone}
      nextSectionTone="light-green"
      py={PAGE_SECTION_PY}
      className="bg-[#FEFEFE]"
    >
      <SectionGreenBleedUp />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-pattern-band opacity-[0.35]"
      />

      <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-14">
        <HomeSectionHeader
          eyebrow={packages.eyebrow}
          title={packages.title}
          className="max-w-none"
          titleClassName="leading-[1.04]"
        />
        <p className="text-sm leading-relaxed text-swamp/70 lg:pb-1 lg:text-right lg:text-base">
          {packages.description}
        </p>
      </div>

      <div className="relative mt-12 grid grid-cols-1 gap-6 sm:mt-14 md:grid-cols-3 md:grid-rows-[auto_auto_auto_auto_1fr_auto] md:items-stretch md:gap-5 lg:gap-6">
        {PACKAGES.map((pkg, i) => (
          <PackageCard key={pkg.name} pkg={pkg} index={i} />
        ))}
      </div>

      <div className="relative mt-12 flex flex-col items-center gap-4 rounded-2xl border border-swamp/10 bg-white px-6 py-6 text-center shadow-[0_1px_0_rgba(0,30,28,0.05)] sm:mt-14 sm:flex-row sm:justify-between sm:px-8 sm:py-7 sm:text-left">
        <div>
          <p className="text-base font-semibold text-swamp">Not sure which package fits?</p>
          <p className="mt-1 text-sm text-swamp/65">
            We&apos;ll map scope, timeline, and budget — then recommend the right starting point.
          </p>
        </div>
        <ButtonLink href="/book" variant="outline" className="shrink-0">
          Book a scoping call
          <ArrowRight className="h-4 w-4" />
        </ButtonLink>
      </div>
    </PageSection>
  );
}

function PackageCard({
  pkg,
  index,
}: {
  pkg: (typeof PACKAGES)[number];
  index: number;
}) {
  const Icon = pkg.Icon;
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl",
        "md:row-span-6 md:grid md:grid-rows-subgrid",
        PACKAGE_CARD_MOTION,
        PACKAGE_CARD_HOVER,
        pkg.popular
          ? "border-2 border-malachite/40 bg-white shadow-[0_16px_40px_-20px_rgba(0,30,28,0.1),0_0_0_1px_rgba(0,200,83,0.1)]"
          : surfaceCardClassName("border-swamp/10"),
      )}
    >
      {pkg.popular && (
        <span className="absolute right-5 top-5 z-10 rounded-full bg-malachite px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-swamp shadow-[0_4px_14px_rgba(0,227,87,0.35)]">
          Most popular
        </span>
      )}

      <span
        aria-hidden
        className="pointer-events-none absolute right-4 top-4 z-0 font-mono text-6xl font-bold leading-none text-swamp/[0.06] sm:text-7xl"
      >
        {num}
      </span>

      <div className="relative z-10 flex items-center gap-3 px-6 pt-6 sm:px-7 sm:pt-7 md:row-start-1">
        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border shadow-[0_8px_24px_-12px_rgba(0,30,28,0.15)] transition-[border-color,background-color] duration-300",
            pkg.popular
              ? "border-malachite/40 bg-malachite/15 text-malachite-800"
              : "border-malachite/25 bg-malachite/10 text-malachite-700 group-hover:border-malachite/40 group-hover:bg-malachite/15",
          )}
        >
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </div>
        <div className="flex min-w-0 items-center gap-3">
          <span className="h-px w-8 shrink-0 bg-malachite-700" aria-hidden />
          <span className="label-tech text-malachite-700">{pkg.kicker}</span>
        </div>
      </div>

      <h3 className="relative z-10 mt-5 px-6 pr-12 text-2xl font-semibold leading-[1.12] tracking-normal text-swamp [text-wrap:balance] sm:px-7 sm:text-[1.65rem] md:row-start-2 md:mt-0">
        {pkg.name}
      </h3>

      <p className="relative z-10 mt-3 max-w-[32ch] px-6 text-sm leading-relaxed text-swamp/68 sm:px-7 md:row-start-3 md:mt-0">
        {pkg.description}
      </p>

      <div className="relative z-10 mt-5 px-6 sm:px-7 md:row-start-4 md:mt-0">
        <span
          className={cn(
            "inline-flex items-center rounded-full border px-3.5 py-1.5 text-xs font-medium",
            pkg.popular
              ? "border-malachite/30 bg-malachite/10 text-swamp"
              : "border-swamp/10 bg-bone-50/80 text-swamp/80",
          )}
        >
          {pkg.signal}
        </span>
      </div>

      <div className="relative z-10 flex flex-1 flex-col px-6 pb-6 pt-6 sm:px-7 md:row-start-5 md:pt-5">
        <div
          aria-hidden
          className={cn(
            "mb-5 h-px w-full",
            pkg.popular
              ? "bg-gradient-to-r from-malachite/40 via-malachite/15 to-transparent"
              : "bg-gradient-to-r from-malachite/30 via-swamp/8 to-transparent",
          )}
        />

        <p className="label-tech mb-4 text-malachite-700">What&apos;s included</p>
        <ul className="flex-1 space-y-3.5">
          {pkg.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-3 text-sm leading-snug text-swamp/82"
            >
              <span
                className={cn(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                  pkg.popular ? "bg-malachite/20" : "bg-malachite/12",
                )}
              >
                <Check className="h-3 w-3 text-malachite-700" strokeWidth={2.5} />
              </span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative z-10 px-6 pb-6 pt-0 sm:px-7 sm:pb-7 md:row-start-6">
        <ButtonLink
          href="/book"
          className="w-full justify-between"
          variant={pkg.popular ? "primary" : "outline"}
        >
          {pkg.cta}
          <ArrowRight className="h-4 w-4 transition-transform duration-[480ms] ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:translate-x-0.5" />
        </ButtonLink>
      </div>
    </motion.article>
  );
}
