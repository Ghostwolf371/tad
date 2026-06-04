"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import PageSection from "@/components/layout/PageSection";
import { PAGE_SECTION_PY } from "@/lib/theme/section-spacing";
import HomeSectionHeader from "@/components/home/HomeSectionHeader";
import { servicesPageContent } from "@/lib/content/services-page";
import { ButtonLink } from "@/components/ui/Button";
import type { SectionTone } from "@/components/layout/PageSection";
import { cn } from "@/lib/utils";

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
    >
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

      <div className="mt-12 grid grid-cols-1 gap-5 sm:mt-14 sm:gap-6 md:grid-cols-3 md:items-stretch">
        {PACKAGES.map((pkg, i) => (
          <PackageCard key={pkg.name} pkg={pkg} index={i} />
        ))}
      </div>

      <p className="mt-10 text-center text-sm text-swamp/55">
        Not sure which package fits?{" "}
        <a
          href="/book"
          className="font-medium text-malachite-700 underline-offset-4 transition-colors hover:text-malachite-800 hover:underline"
        >
          Book a scoping call
        </a>{" "}
        — we&apos;ll recommend the right starting point.
      </p>
    </PageSection>
  );
}

function PackageIndex({ index }: { index: number }) {
  return (
    <span className="liquid-glass liquid-glass--chip liquid-glass--chip-on-light relative h-12 w-12 shrink-0 rounded-2xl">
      <span aria-hidden className="liquid-glass__backdrop" />
      <span aria-hidden className="liquid-glass__specular" />
      <span className="liquid-glass__content font-mono text-sm font-bold text-swamp">
        {String(index + 1).padStart(2, "0")}
      </span>
    </span>
  );
}

function PackageCard({
  pkg,
  index,
}: {
  pkg: (typeof PACKAGES)[number];
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border transition-[border-color,box-shadow,transform] duration-300",
        pkg.popular
          ? "z-[1] border-malachite/35 bg-gradient-to-b from-malachite/[0.07] via-white to-white shadow-[0_28px_64px_-28px_rgba(0,227,87,0.45)] lg:-mt-2 lg:mb-2 lg:scale-[1.02]"
          : "border-swamp/10 bg-white shadow-[0_1px_0_rgba(0,30,28,0.06)] hover:-translate-y-0.5 hover:border-malachite/25 hover:shadow-[0_22px_50px_-28px_rgba(0,30,28,0.18)]",
      )}
    >
      {pkg.popular && (
        <span className="absolute right-5 top-5 z-10 rounded-full bg-malachite px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-swamp">
          Most popular
        </span>
      )}

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <PackageIndex index={index} />

        <div className="mt-6 flex items-center gap-3">
          <span className="h-px w-8 bg-malachite" aria-hidden />
          <span className="label-tech text-malachite-700">{pkg.kicker}</span>
        </div>

        <h3 className="mt-3 pr-2 text-2xl font-semibold leading-[1.12] tracking-normal text-swamp">
          {pkg.name}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-swamp/70">{pkg.description}</p>

        <div className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-swamp/10 bg-bone-50/80 px-3 py-1.5 text-sm">
          <span className="text-swamp/45">Best fit</span>
          <span className="font-medium text-swamp">{pkg.signal}</span>
        </div>

        <div
          aria-hidden
          className={cn(
            "my-7 h-px w-full",
            pkg.popular
              ? "bg-gradient-to-r from-malachite/35 via-swamp/10 to-transparent"
              : "bg-gradient-to-r from-swamp/12 to-transparent",
          )}
        />

        <p className="label-tech mb-4 text-malachite-700">What&apos;s included</p>
        <ul className="flex-1 space-y-3">
          {pkg.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm leading-snug text-swamp/80">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-malachite/15">
                <Check className="h-3 w-3 text-malachite-700" strokeWidth={2.5} />
              </span>
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-8 pt-2">
          <ButtonLink
            href="/book"
            className="w-full justify-between"
            variant={pkg.popular ? "primary" : "outline"}
          >
            {pkg.cta}
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>
      </div>
    </motion.article>
  );
}
