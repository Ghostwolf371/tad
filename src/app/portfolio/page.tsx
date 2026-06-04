import PageHero from "@/components/layout/PageHero";
import PageSection from "@/components/layout/PageSection";
import HomeSectionHeader from "@/components/home/HomeSectionHeader";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import IndustryChart from "@/components/portfolio/IndustryChart";
import PageCTA from "@/components/layout/PageCTA";
import { portfolioPageContent } from "@/lib/content/portfolio-page";
import {
  PAGE_SECTION_PY,
  PAGE_SECTION_PY_BEFORE_WHITE,
} from "@/lib/theme/section-spacing";
import { projects } from "@/data/projects";

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
            {projects.length} projects delivered
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
        <div className="grid gap-6 sm:gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-14">
          <HomeSectionHeader
            variant="dark"
            eyebrow="Industries"
            title="Clients by industry"
            description="Where our work lands — from retail and hospitality to fintech, aviation, and beyond."
            className="max-w-none"
            titleClassName="leading-[1.04]"
            descriptionClassName="max-w-xl"
          />
          <p className="text-sm leading-relaxed text-white/70 lg:pb-2 lg:text-right lg:text-base">
            Every project is tagged by sector so you can see how experience transfers across
            verticals.
          </p>
        </div>
        <IndustryChart />
      </PageSection>
      <PageCTA afterSectionIndex={1} lastSectionTone="dark-green" />
    </>
  );
}
