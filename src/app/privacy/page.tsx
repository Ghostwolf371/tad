import PageHero from "@/components/layout/PageHero";
import PageSection from "@/components/layout/PageSection";
import LegalProse from "@/components/layout/LegalProse";
import { legalHeroContent } from "@/lib/content/legal-page";
import { privacyPolicy } from "@/lib/content/legal/privacy";

export const metadata = {
  title: "Privacy Policy",
  description: "TAD privacy policy — how we collect, use, and protect your information.",
};

export default function PrivacyPage() {
  const { privacy: hero } = legalHeroContent;

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        titleLines={hero.titleLines}
        titleGradientLine={hero.titleGradientLine}
      />

      <PageSection index={0} maxWidth="3xl">
        <LegalProse
          intro={privacyPolicy.intro}
          sections={privacyPolicy.sections}
          showToc
          showInfographic
          lastUpdated="2026-05-25"
        />
      </PageSection>
    </>
  );
}
