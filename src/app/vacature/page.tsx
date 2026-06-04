import PageHero from "@/components/layout/PageHero";
import PageSection from "@/components/layout/PageSection";
import { PAGE_SECTION_PY } from "@/lib/theme/section-spacing";
import { VacatureIntro, VacatureOpenings } from "@/components/careers/VacatureClient";
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
      <PageSection index={1} tone="white" previousTone="white" py={PAGE_SECTION_PY}>
        <VacatureOpenings />
      </PageSection>
    </>
  );
}
