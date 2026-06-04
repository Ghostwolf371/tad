import PageHero from "@/components/layout/PageHero";
import PageSection from "@/components/layout/PageSection";
import ContactMainSection from "@/components/contact/ContactMainSection";
import ContactMapSection from "@/components/contact/ContactMapSection";
import FAQSection from "@/components/contact/FAQSection";
import PageCTA from "@/components/layout/PageCTA";
import { contactContent } from "@/lib/content/contact";
import { PAGE_SECTION_PY } from "@/lib/theme/section-spacing";

export const metadata = {
  title: "Contact",
  description: "Get in touch with TAD — tell us about your project or reach us at info@tad.sr",
};

export default function ContactPage() {
  const { hero } = contactContent;

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        titleLines={hero.titleLines}
        titleGradientLine={hero.titleGradientLine}
        subtitle={hero.subtitle}
      />
      <PageSection
        index={0}
        tone="white"
        previousTone="light-green"
        nextSectionTone="light-green"
        backgroundClassName="bg-white"
        py={PAGE_SECTION_PY}
      >
        <ContactMainSection />
      </PageSection>
      <PageSection
        index={1}
        tone="dark-green"
        previousTone="white"
        nextSectionTone="white"
        ambient="dark-band"
        py={PAGE_SECTION_PY}
      >
        <ContactMapSection />
      </PageSection>
      <FAQSection sectionIndex={2} tone="white" previousTone="light-green" />
      <PageCTA afterSectionIndex={2} lastSectionTone="white" tone="white" />
    </>
  );
}
