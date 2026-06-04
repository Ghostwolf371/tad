import Link from "next/link";
import PageSection, { type SectionTone } from "@/components/layout/PageSection";
import HomeSectionHeader from "@/components/home/HomeSectionHeader";
import { aboutContent } from "@/lib/content/about";
import { ButtonLink } from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { ArrowRight, Briefcase } from "lucide-react";
import { surfaceCardClassName } from "@/lib/theme/surfaces";
import { PAGE_SECTION_PY_AFTER_DARK } from "@/lib/theme/section-spacing";
import { cn } from "@/lib/utils";

type AboutCareersSectionProps = {
  sectionIndex?: number;
  previousTone?: SectionTone;
};

const OPEN_ROLES = [
  {
    title: "Frontend Engineer",
    meta: "Paramaribo / Remote",
    href: "/vacature",
  },
  {
    title: "Product Designer",
    meta: "Paramaribo / Remote",
    href: "/vacature",
  },
  {
    title: "Marketing Strategist",
    meta: "Paramaribo",
    href: "/vacature",
  },
  {
    title: "Open application",
    meta: "Always welcome",
    href: "mailto:info@tad.sr?subject=Open%20application%20%E2%80%94%20TAD",
  },
] as const;

export default function AboutCareersSection({
  sectionIndex = 4,
  previousTone = "dark-green",
}: AboutCareersSectionProps) {
  const { careers } = aboutContent;

  return (
    <PageSection
      index={sectionIndex}
      tone="white"
      previousTone={previousTone}
      backgroundClassName="bg-white"
      py={PAGE_SECTION_PY_AFTER_DARK}
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:items-start lg:gap-14 xl:gap-20">
        <Reveal>
          <HomeSectionHeader
            eyebrow={careers.eyebrow}
            title={careers.title}
            description={careers.text}
            className="max-w-xl"
            titleClassName="text-3xl sm:text-4xl lg:text-5xl"
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={careers.primaryCta.href} variant="primary" size="lg">
              {careers.primaryCta.label} <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href={careers.secondaryCta.href} variant="outline" size="lg">
              {careers.secondaryCta.label}
            </ButtonLink>
          </div>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-swamp/60">
            Remote-friendly where the role allows. We review every application — even when no
            listing matches your profile yet.
          </p>
        </Reveal>

        <Reveal>
          <div
            className={surfaceCardClassName(
              "overflow-hidden lg:mt-2",
            )}
          >
            <div className="flex items-center gap-3 border-b border-swamp/8 px-5 py-4 sm:px-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-malachite/25 bg-malachite/10 text-malachite-700">
                <Briefcase className="h-4 w-4" strokeWidth={1.75} aria-hidden />
              </span>
              <div>
                <p className="label-tech text-malachite-700">Open roles</p>
                <p className="text-sm text-swamp/60">Paramaribo HQ · hybrid & remote</p>
              </div>
            </div>
            <ul className="divide-y divide-swamp/8">
              {OPEN_ROLES.map((role) => (
                <li key={role.title}>
                  <Link
                    href={role.href}
                    className={cn(
                      "group flex items-center justify-between gap-4 px-5 py-4 transition-colors sm:px-6",
                      "hover:bg-malachite/[0.04]",
                    )}
                  >
                    <div className="min-w-0 text-left">
                      <p className="font-medium text-swamp transition-colors group-hover:text-malachite-800">
                        {role.title}
                      </p>
                      <p className="mt-0.5 text-sm text-swamp/55">{role.meta}</p>
                    </div>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-swamp/25 transition-[transform,color] group-hover:translate-x-0.5 group-hover:text-malachite-700"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </PageSection>
  );
}
