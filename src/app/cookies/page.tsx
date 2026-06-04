import PageHero from "@/components/layout/PageHero";
import PageSection from "@/components/layout/PageSection";
import CookiesClient from "@/components/cookies/CookiesClient";
import { legalHeroContent } from "@/lib/content/legal-page";

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
      <PageSection index={0} py="pb-24 sm:pb-32">
        <CookiesClient />
      </PageSection>
    </>
  );
}
