import PageHero from "@/components/layout/PageHero";
import PageSection from "@/components/layout/PageSection";
import VacatureWhyJoin from "@/components/careers/VacatureWhyJoin";
import VacatureOpeningsGrid from "@/components/careers/VacatureOpeningsGrid";
import VacatureApplyBand from "@/components/careers/VacatureApplyBand";
import { PAGE_SECTION_PY } from "@/lib/theme/section-spacing";
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
      <VacatureWhyJoin sectionIndex={0} />
      <PageSection
        index={1}
        tone="dark-green"
        previousTone="white"
        py={PAGE_SECTION_PY}
        ambient="dark-band"
      >
        <VacatureOpeningsGrid />
      </PageSection>
      <VacatureApplyBand sectionIndex={2} />
    </>
  );
}
