"use client";

import { ArrowRight, Building2, Check, Rocket, Sparkles, Store } from "lucide-react";
import PageSection from "@/components/layout/PageSection";
import { PAGE_SECTION_PY } from "@/lib/theme/section-spacing";
import KineticHeading from "@/components/ui/KineticHeading";
import Reveal from "@/components/ui/Reveal";
import { servicesPageContent } from "@/lib/content/services-page";
import { ButtonLink } from "@/components/ui/Button";
import type { SectionTone } from "@/components/layout/PageSection";
import { cn } from "@/lib/utils";

/** Equal malachite border glow on every card — no lift, no stronger center hover. */
const PACKAGE_CARD_HOVER =
  "transition-[border-color,box-shadow] duration-[480ms] ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none";
const PACKAGE_CARD_HOVER_LIGHT =
  "hover:border-malachite/45 hover:shadow-[0_0_0_1px_rgba(0,200,83,0.28),0_0_0_3px_rgba(0,200,83,0.1),0_0_22px_-4px_rgba(0,200,83,0.22)]";
const PACKAGE_CARD_HOVER_DARK =
  "hover:border-malachite/70 hover:shadow-[0_0_0_1px_rgba(0,200,83,0.55),0_0_0_4px_rgba(0,200,83,0.18),0_0_44px_-6px_rgba(0,200,83,0.45)]";

type PackageTier = {
  name: string;
  kicker: string;
  description: string;
  signal: string;
  features: readonly string[];
  popular: boolean;
  cta: string;
  Icon: typeof Rocket;
};

const PACKAGES: readonly PackageTier[] = [
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
      edgeTop
      className="bg-[#FEFEFE]"
    >
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-14">
        <div className="max-w-2xl">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-malachite-700" aria-hidden />
              <span className="label-tech text-malachite-700">{packages.eyebrow}</span>
            </div>
          </Reveal>
          <KineticHeading
            as="h2"
            lines={["Clear packages", "for your growth."]}
            accentLastWord
            accentClassName="text-malachite-700"
            delay={0.05}
            className="mt-4 text-3xl font-bold leading-[1.06] tracking-normal text-swamp sm:mt-5 sm:text-4xl md:text-5xl lg:text-6xl"
          />
        </div>
        <Reveal delay={0.1} className="max-w-md lg:pb-1 lg:text-right">
          <p className="text-base leading-8 text-swamp/70 sm:text-lg">
            {packages.description}
          </p>
        </Reveal>
      </div>

      <div className="relative mt-10 grid grid-cols-1 gap-6 pt-5 sm:mt-12 sm:pt-6 md:grid-cols-3 md:grid-rows-[auto_auto_auto_auto] md:items-stretch md:gap-5 lg:gap-7">
        {PACKAGES.map((pkg, i) => (
          <Reveal
            key={pkg.name}
            delay={0.08 + i * 0.07}
            className="h-full md:row-span-4 md:grid md:grid-rows-subgrid"
          >
            <PackageCard pkg={pkg} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.32} className="relative mt-12 sm:mt-16">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-swamp/10 bg-white px-6 py-8 shadow-[0_1px_0_rgba(0,30,28,0.06),0_28px_56px_-36px_rgba(0,30,28,0.14)] sm:flex sm:items-center sm:justify-between sm:gap-8 sm:px-10 sm:py-9">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-malachite/40 to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-malachite/[0.08] blur-3xl"
          />
          <div className="relative flex items-start gap-4 text-center sm:text-left">
            <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-malachite/25 bg-malachite/[0.08] text-malachite-700 sm:flex">
              <Sparkles className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-lg font-semibold text-swamp sm:text-xl">
                Not sure which package fits?
              </p>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-swamp/65 sm:text-base">
                We&apos;ll map scope, timeline, and budget — then recommend the right starting
                point.
              </p>
            </div>
          </div>
          <ButtonLink
            href="/book"
            variant="outline"
            className="relative mt-6 min-w-[12rem] shrink-0 justify-center sm:mt-0"
          >
            Book a scoping call
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>
      </Reveal>
    </PageSection>
  );
}

function PackageCard({ pkg }: { pkg: PackageTier }) {
  const Icon = pkg.Icon;
  const dark = pkg.popular;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-visible rounded-[1.5rem] sm:rounded-[1.65rem]",
        "md:row-span-4 md:grid md:grid-rows-subgrid",
        PACKAGE_CARD_HOVER,
        dark
          ? cn(
              "border-2 border-malachite/35 bg-[#031a16] text-white",
              "shadow-[0_30px_70px_-30px_rgba(0,200,83,0.45),0_0_0_1px_rgba(0,200,83,0.18)]",
              PACKAGE_CARD_HOVER_DARK,
            )
          : cn(
              "border border-swamp/10 bg-white text-swamp",
              "shadow-[0_18px_44px_-30px_rgba(0,30,28,0.14),0_1px_0_rgba(0,30,28,0.04)]",
              PACKAGE_CARD_HOVER_LIGHT,
            ),
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
      >
        {dark && (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(120%_60%_at_50%_-10%,rgba(0,200,83,0.18)_0%,rgba(0,200,83,0)_55%)]" />
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-malachite to-transparent" />
          </>
        )}
      </div>

      {dark && (
        <div className="absolute left-1/2 top-0 z-30 -translate-x-1/2 -translate-y-1/2">
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-malachite/30 bg-malachite px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-swamp shadow-[0_6px_20px_-4px_rgba(0,227,87,0.5)]">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-swamp" aria-hidden />
            Most popular
          </span>
        </div>
      )}

      <div
        className={cn(
          "relative z-10 flex flex-nowrap items-center justify-between gap-4 px-6 pb-3 sm:px-7 md:row-start-1",
          dark ? "pt-8 sm:pt-9" : "pt-5 sm:pt-6",
        )}
      >
        <div className="flex min-w-0 shrink items-center gap-2.5">
          <span
            className={cn("h-px w-7 shrink-0", dark ? "bg-malachite" : "bg-malachite-700")}
            aria-hidden
          />
          <span
            className={cn(
              "shrink-0 whitespace-nowrap",
              dark ? "label-tech-on-dark text-malachite" : "label-tech text-malachite-700",
            )}
          >
            {pkg.kicker}
          </span>
        </div>
        <span
          className={cn(
            "inline-flex shrink-0 items-center whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.12em]",
            dark
              ? "border border-white/15 bg-white/5 text-white/75 backdrop-blur-sm"
              : "border border-swamp/12 bg-bone-50/70 text-swamp/65",
          )}
        >
          {pkg.signal}
        </span>
      </div>

      <div className="relative z-10 flex items-start gap-4 px-6 pb-2 pt-1 sm:px-7 sm:gap-5 md:row-start-2">
        <div
          className={cn(
            "relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-[border-color,box-shadow] duration-300 sm:h-[3.75rem] sm:w-[3.75rem]",
            dark
              ? "border border-malachite/45 bg-[radial-gradient(120%_120%_at_30%_20%,rgba(0,200,83,0.28)_0%,rgba(0,200,83,0.08)_60%,rgba(0,200,83,0)_100%)] text-malachite shadow-[0_0_0_1px_rgba(0,200,83,0.18),0_16px_32px_-18px_rgba(0,200,83,0.55)]"
              : "border border-malachite/22 bg-gradient-to-br from-white to-malachite/[0.07] text-malachite-700 shadow-[0_10px_28px_-14px_rgba(0,30,28,0.18)] group-hover:border-malachite/40 group-hover:shadow-[0_14px_32px_-14px_rgba(0,200,83,0.24)]",
          )}
        >
          <Icon className="h-6 w-6" strokeWidth={1.6} />
          <span
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-0 rounded-2xl",
              dark
                ? "ring-1 ring-inset ring-white/[0.06]"
                : "ring-1 ring-inset ring-white/80",
            )}
          />
        </div>

        <div className="min-w-0 flex-1">
          <h3
            className={cn(
              "text-[1.45rem] font-semibold leading-[1.08] tracking-tight [text-wrap:balance] sm:text-[1.65rem]",
              dark ? "text-white" : "text-swamp",
            )}
          >
            {pkg.name}
          </h3>
          <p
            className={cn(
              "mt-2 text-sm leading-relaxed",
              dark ? "text-white/72" : "text-swamp/68",
            )}
          >
            {pkg.description}
          </p>
        </div>
      </div>

      <div className="relative z-10 flex flex-1 flex-col px-6 pb-5 pt-3 sm:px-7 md:row-start-3">
        <p
          className={cn(
            "mb-3",
            dark ? "label-tech-on-dark text-malachite" : "label-tech text-malachite-700",
          )}
        >
          What&apos;s included
        </p>
        <ul className="space-y-2.5">
          {pkg.features.map((feature) => (
            <li
              key={feature}
              className={cn(
                "flex items-start gap-3 text-sm leading-snug",
                dark ? "text-white/86" : "text-swamp/82",
              )}
            >
              <span
                className={cn(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                  dark ? "bg-malachite/22 ring-1 ring-malachite/40" : "bg-malachite/12",
                )}
              >
                <Check
                  className={cn("h-3 w-3", dark ? "text-malachite" : "text-malachite-700")}
                  strokeWidth={2.6}
                />
              </span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative z-10 px-6 pb-5 pt-0 sm:px-7 sm:pb-6 md:row-start-4">
        <ButtonLink
          href="/book"
          className={cn(
            "w-full justify-between",
            dark &&
              "border-transparent bg-malachite text-swamp shadow-[0_12px_28px_-10px_rgba(0,227,87,0.55)] hover:bg-malachite-300 hover:text-swamp",
          )}
          variant={dark ? "primary" : "outline"}
        >
          {pkg.cta}
          <ArrowRight className="h-4 w-4 transition-transform duration-[480ms] ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:translate-x-0.5" />
        </ButtonLink>
      </div>
    </article>
  );
}
