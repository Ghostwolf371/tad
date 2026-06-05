import CookiePreferencesPanel from "@/components/CookiePreferencesPanel";
import PageHero from "@/components/layout/PageHero";
import PageSection from "@/components/layout/PageSection";
import LegalProse from "@/components/layout/LegalProse";
import { legalHeroContent } from "@/lib/content/legal-page";
import { cookiePolicy } from "@/lib/content/legal/cookies";

export const metadata = {
  title: "Cookie Policy",
  description: "TAD cookie policy — how we use cookies on tad.sr",
};

export default function CookiesPage() {
  const { cookies: hero } = legalHeroContent;

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        titleLines={hero.titleLines}
        titleGradientLine={hero.titleGradientLine}
      />

      <PageSection
        index={0}
        tone="light-green"
        maxWidth="7xl"
        py="pb-24 sm:pb-32 lg:pb-36"
      >
        <LegalProse sections={cookiePolicy.sections} showToc />
        <CookiePreferencesPanel />
      </PageSection>
    </>
  );
}
