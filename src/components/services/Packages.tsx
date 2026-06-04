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

/** Border-ring glow + gentle lift (no inner fill / halo) */
const PACKAGE_CARD_MOTION =
  "transition-[border-color,box-shadow,transform] duration-[480ms] ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none motion-reduce:hover:transform-none";

const PACKAGE_CARD_HOVER =
  "hover:-translate-y-1 hover:border-malachite/50 hover:shadow-[0_22px_44px_-20px_rgba(0,30,28,0.12),0_0_0_1px_rgba(0,200,83,0.28),0_0_0_3px_rgba(0,200,83,0.12),0_0_18px_-2px_rgba(0,200,83,0.22)]";

/** Shared header styling for left/right flank cards (symmetric bookends). */
const FLANK_CARD_VISUAL = {
  headerGradient: "from-[#dff5e8]/90 via-[#f0faf4] to-white",
  iconWell: "border-malachite/30 bg-malachite/12 text-malachite-700",
  decorVariant: "launch",
} as const;

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
    ...FLANK_CARD_VISUAL,
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
    headerGradient: "from-malachite/30 via-[#d4f5e2]/80 to-white",
    iconWell: "border-malachite/45 bg-malachite/20 text-malachite-800",
    decorVariant: "scale",
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
    ...FLANK_CARD_VISUAL,
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
      className="bg-white"
    >
      <SectionGreenBleedUp />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-14">
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

      <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-14 md:grid-cols-3 md:grid-rows-[auto_auto_auto_auto_1fr] md:items-stretch md:gap-5 lg:gap-6">
        {PACKAGES.map((pkg, i) => (
          <PackageCard key={pkg.name} pkg={pkg} index={i} />
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-swamp/10 bg-gradient-to-r from-bone-50/90 via-white to-bone-50/80 px-6 py-5 text-center shadow-[0_1px_0_rgba(0,30,28,0.05)] sm:mt-14 sm:px-8 sm:py-6">
        <p className="text-sm text-swamp/70 sm:text-base">
          Not sure which package fits?{" "}
          <a
            href="/book"
            className="font-semibold text-malachite-700 underline-offset-4 transition-colors hover:text-malachite-800 hover:underline"
          >
            Book a scoping call
          </a>{" "}
          <span className="text-swamp/50">— we&apos;ll recommend the right starting point.</span>
        </p>
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

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl",
        "md:row-span-5 md:grid md:grid-rows-subgrid",
        PACKAGE_CARD_MOTION,
        PACKAGE_CARD_HOVER,
        pkg.popular
          ? "z-[1] border-2 border-malachite/35 bg-white shadow-[0_20px_48px_-24px_rgba(0,30,28,0.1),0_0_0_1px_rgba(0,200,83,0.12)] lg:-mt-3 lg:mb-3 lg:scale-[1.03]"
          : surfaceCardClassName("border-swamp/10"),
      )}
    >
      {pkg.popular && (
        <span className="absolute right-5 top-5 z-10 rounded-full bg-malachite px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-swamp shadow-[0_4px_14px_rgba(0,227,87,0.35)]">
          Most popular
        </span>
      )}

      <div
        className={cn(
          "relative overflow-hidden border-b border-swamp/[0.06] bg-gradient-to-br",
          "md:row-span-4 md:grid md:grid-rows-subgrid md:row-start-1",
          pkg.headerGradient,
        )}
      >
        <PackageHeaderDecor variant={pkg.decorVariant} />

        <div className="relative z-10 flex items-start px-6 pt-5 sm:px-7 sm:pt-6 md:row-start-1 md:px-7 md:pt-6">
          <div
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border shadow-[0_8px_24px_-12px_rgba(0,30,28,0.2)] transition-[border-color] duration-[480ms] ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:border-malachite/45",
              pkg.iconWell,
            )}
          >
            <Icon className="h-5 w-5" strokeWidth={1.75} />
          </div>
        </div>

        <div className="relative z-10 mt-4 flex items-center gap-3 px-6 sm:px-7 md:row-start-2 md:mt-0 md:px-7">
          <span className="h-px w-8 bg-malachite" aria-hidden />
          <span className="label-tech text-malachite-700">{pkg.kicker}</span>
        </div>

        <h3 className="relative z-10 mt-3 px-6 pr-10 text-2xl font-semibold leading-[1.12] tracking-normal text-swamp [text-wrap:balance] sm:px-7 sm:text-[1.65rem] md:row-start-3 md:mt-0 md:px-7">
          {pkg.name}
        </h3>
        <p className="relative z-10 mt-2.5 max-w-[28ch] px-6 pb-5 text-sm leading-relaxed text-swamp/68 sm:px-7 md:row-start-4 md:mt-0 md:px-7 md:pb-5">
          {pkg.description}
        </p>
      </div>

      <div className="flex flex-1 flex-col px-6 pb-6 pt-5 sm:px-7 sm:pb-7 md:row-start-5 md:flex md:flex-col">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-malachite/20 bg-malachite/[0.06] px-3.5 py-1.5 text-sm">
          <span className="text-[11px] font-medium uppercase tracking-wide text-swamp/45">
            Best fit
          </span>
          <span className="font-semibold text-swamp">{pkg.signal}</span>
        </div>

        <div
          aria-hidden
          className={cn(
            "my-6 h-px w-full",
            pkg.popular
              ? "bg-gradient-to-r from-malachite/40 via-malachite/15 to-transparent"
              : "bg-gradient-to-r from-swamp/14 via-swamp/6 to-transparent",
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

        <div className="mt-8 pt-1">
          <ButtonLink
            href="/book"
            className={cn(
              "w-full justify-between",
              pkg.popular && "shadow-[0_12px_28px_-10px_rgba(0,227,87,0.55)]",
            )}
            variant={pkg.popular ? "primary" : "outline"}
          >
            {pkg.cta}
            <ArrowRight className="h-4 w-4 transition-transform duration-[480ms] ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:translate-x-0.5" />
          </ButtonLink>
        </div>
      </div>
    </motion.article>
  );
}

function PackageHeaderDecor({
  variant,
}: {
  variant: (typeof PACKAGES)[number]["decorVariant"];
}) {
  return (
    <div
      aria-hidden
      className={cn("package-header-decor", `package-header-decor--${variant}`)}
    >
      <div className="package-header-decor__mesh" />
      <div className="package-header-decor__dots" />
      <svg
        className="package-header-decor__arcs sm:h-64 sm:w-64"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="168" cy="32" r="72" stroke="currentColor" strokeWidth="1" opacity="0.9" />
        <circle cx="168" cy="32" r="108" stroke="currentColor" strokeWidth="0.75" opacity="0.55" />
        <circle cx="168" cy="32" r="140" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
        <path
          d="M 120 32 A 48 48 0 0 1 168 80"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          opacity="0.65"
        />
      </svg>
    </div>
  );
}
