import PageHero from "@/components/layout/PageHero";
import PageSection from "@/components/layout/PageSection";
import HomeSectionHeader from "@/components/home/HomeSectionHeader";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import IndustryChart from "@/components/portfolio/IndustryChart";
import PageCTA from "@/components/layout/PageCTA";
import {
  PORTFOLIO_DELIVERED_COUNT,
  portfolioPageContent,
} from "@/lib/content/portfolio-page";
import {
  PAGE_SECTION_PY,
  PAGE_SECTION_PY_BEFORE_WHITE,
} from "@/lib/theme/section-spacing";
export const metadata = {
  title: "Portfolio",
  description:
    "View featured projects from TAD — e-commerce, web, mobile, fintech, hospitality and more across Suriname and beyond.",
};

export default function PortfolioPage() {
  const { hero } = portfolioPageContent;

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        titleLines={hero.titleLines}
        titleGradientLine={hero.titleGradientLine}
        subtitle={hero.subtitle}
      />
      <PageSection index={0} tone="white" previousTone="light-green" py={PAGE_SECTION_PY}>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <HomeSectionHeader
            eyebrow="Work"
            title="Projects we've shipped"
            description="Filter by discipline — each card links to the full case study."
            className="max-w-xl"
          />
          <p className="shrink-0 font-mono text-xs font-medium uppercase tracking-[0.2em] text-malachite-700">
            {PORTFOLIO_DELIVERED_COUNT} projects delivered
          </p>
        </div>
        <div className="mt-12">
          <PortfolioGrid />
        </div>
      </PageSection>
      <PageSection
        index={1}
        tone="dark-green"
        previousTone="white"
        ambient="dark-band"
        py={PAGE_SECTION_PY_BEFORE_WHITE}
      >
        <HomeSectionHeader
          variant="dark"
          eyebrow="Sectors"
          title="Industries we serve"
          description="Healthcare, real estate, distribution, agriculture, media, and more — classified by what each client does. Online retail is how many projects are delivered, not an industry on its own."
          className="max-w-3xl"
          titleClassName="leading-[1.04]"
        />
        <IndustryChart />
      </PageSection>
      <PageCTA afterSectionIndex={1} lastSectionTone="dark-green" />
    </>
  );
}
