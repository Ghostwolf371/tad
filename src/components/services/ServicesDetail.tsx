"use client";

import Link from "next/link";
import { ArrowUpRight, Globe } from "lucide-react";
import { services } from "@/data/services";
import { servicesPageContent } from "@/lib/content/services-page";
import PageSection from "@/components/layout/PageSection";
import { PAGE_SECTION_PY } from "@/lib/theme/section-spacing";
import HomeSectionHeader from "@/components/home/HomeSectionHeader";
import ServiceMockup from "@/components/sections/ServiceMockup";
import { SERVICE_ICONS, SERVICE_MOCKUP_VARIANT } from "@/components/services/service-visuals";
import { surfaceCardClassName } from "@/lib/theme/surfaces";
import { cn } from "@/lib/utils";

type ServicesDetailProps = {
  sectionIndex?: number;
};

export default function ServicesDetail({ sectionIndex = 0 }: ServicesDetailProps) {
  const { overview } = servicesPageContent;

  return (
    <PageSection
      index={sectionIndex}
      tone="white"
      previousTone="light-green"
      nextSectionTone="white"
      py={PAGE_SECTION_PY}
    >
      <HomeSectionHeader
        eyebrow={overview.eyebrow}
        title={overview.title}
        description={overview.description}
      />
      <p className="mt-8 text-sm text-swamp/45">{overview.footnote}</p>

      <div className="mt-14 space-y-8 sm:mt-16">
        {services.map((service, i) => {
          const Icon = SERVICE_ICONS[service.icon] ?? Globe;
          const mockupVariant = SERVICE_MOCKUP_VARIANT[service.id] ?? "dashboard";
          const reverse = i % 2 === 1;
          const greenCard =
            service.id === "web-development" || service.id === "digital-marketing";

          return (
            <article
              key={service.id}
              id={service.id}
              className={cn(
                surfaceCardClassName("scroll-mt-28 overflow-hidden"),
                greenCard &&
                  "border-malachite/25 bg-gradient-to-br from-[#0d281f] via-[#103126] to-[#123a2e] text-white",
                "grid gap-8 p-6 sm:p-8 lg:grid-cols-2 lg:items-center lg:gap-12",
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center rounded-xl border p-5 sm:p-6",
                  greenCard
                    ? "border-white/20 bg-[#F8F7F2]"
                    : "border-swamp/8 bg-bone-50/80",
                  reverse && "lg:order-2",
                )}
              >
                <div className={cn("h-[18.5rem] w-full max-w-[40rem] sm:h-[19.5rem]")}>
                  <ServiceMockup variant={mockupVariant} className="size-full" />
                </div>
              </div>

              <div className={cn(reverse && "lg:order-1")}>
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "inline-flex h-10 w-10 items-center justify-center rounded-lg border shadow-sm",
                      greenCard
                        ? "border-white/20 bg-white/10 text-malachite"
                        : "border-swamp/10 bg-white text-malachite-700",
                    )}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <span
                    className={cn(
                      greenCard ? "label-tech-on-dark text-malachite" : "label-tech text-malachite-700",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")} · {service.tagline.toUpperCase()}
                  </span>
                </div>

                <h3
                  className={cn(
                    "mt-5 text-3xl font-semibold leading-[1.08] tracking-normal sm:text-4xl",
                    greenCard ? "text-white" : "text-swamp",
                  )}
                >
                  {service.heading}
                </h3>
                <p className={cn("mt-4 text-base leading-relaxed", greenCard ? "text-white/80" : "text-swamp/75")}>
                  {service.text}
                </p>
                <p className={cn("mt-4 text-sm leading-relaxed", greenCard ? "text-white/72" : "text-swamp/70")}>
                  {service.longText}
                </p>

                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {service.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className={cn(
                        "flex items-start gap-3 text-sm before:mt-2 before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-malachite",
                        greenCard ? "text-white/82" : "text-swamp/80",
                      )}
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={cn(
                    "mt-8 inline-flex items-center gap-2 transition-all hover:gap-3",
                    greenCard
                      ? "text-xs font-medium uppercase tracking-[0.2em] text-white/90 hover:text-white"
                      : "label-tech text-malachite-700",
                  )}
                >
                  Discuss this service <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </PageSection>
  );
}
