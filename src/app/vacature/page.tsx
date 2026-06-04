import PageHero from "@/components/layout/PageHero";
import PageSection from "@/components/layout/PageSection";
import { PAGE_SECTION_PY } from "@/lib/theme/section-spacing";
import { VacatureIntro, VacatureOpenings } from "@/components/careers/VacatureClient";
import VacatureCultureSection from "@/components/careers/VacatureCultureSection";
import HomeSectionHeader from "@/components/home/HomeSectionHeader";
import PageCTA from "@/components/layout/PageCTA";
import { careersPageContent } from "@/lib/content/careers-page";

export const metadata = {
  title: "Careers",
  description:
    "Join TAD — we are looking for talented people who care about craft and shipping great work.",
};

export default function CareersPage() {
  const { hero } = careersPageContent;

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        titleLines={hero.titleLines}
        titleGradientLine={hero.titleGradientLine}
        subtitle={hero.subtitle}
      />
      <PageSection index={0} tone="white" previousTone="light-green" py={PAGE_SECTION_PY}>
        <VacatureIntro />
      </PageSection>
      <PageSection
        index={1}
        tone="white"
        previousTone="white"
        nextSectionTone="dark-green"
        py={PAGE_SECTION_PY}
      >
        <VacatureOpenings />
      </PageSection>
      <PageSection
        index={2}
        tone="dark-green"
        previousTone="white"
        ambient="dark-band"
        py={PAGE_SECTION_PY}
      >
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end lg:gap-14">
          <HomeSectionHeader
            variant="dark"
            eyebrow="Perks & stack"
            title="How we work"
            description="The tools and benefits that power our craft."
            className="max-w-none"
            titleClassName="leading-[1.04]"
          />
          <p className="text-sm leading-relaxed text-white/75 lg:pb-2 lg:text-right lg:text-base">
            Remote-friendly, well-equipped, and focused on shipping — with room to grow your
            craft.
          </p>
        </div>
        <VacatureCultureSection />
      </PageSection>
      <PageCTA afterSectionIndex={2} lastSectionTone="dark-green" />
    </>
  );
}
