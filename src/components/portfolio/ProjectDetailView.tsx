import Image from "next/image";
import type { Project } from "@/data/projects";
import {
  getAdjacentProjects,
  getProjectGallery,
  PORTFOLIO_CATEGORY_LABELS,
} from "@/data/projects";
import PageHero from "@/components/layout/PageHero";
import PageSection, { sectionTone } from "@/components/layout/PageSection";
import { PAGE_SECTION_PY } from "@/lib/theme/section-spacing";
import type { SectionTone } from "@/components/layout/SectionBleed";
import HomeSectionHeader from "@/components/home/HomeSectionHeader";
import PageCTA from "@/components/layout/PageCTA";
import ProjectBrowserFrame from "@/components/portfolio/ProjectBrowserFrame";
import ProjectDetailMeta from "@/components/portfolio/ProjectDetailMeta";
import ProjectCaseStudy from "@/components/portfolio/ProjectCaseStudy";
import ProjectDetailNav from "@/components/portfolio/ProjectDetailNav";
import Reveal from "@/components/ui/Reveal";
import { heroTitleLines } from "@/lib/hero-title-lines";
import { cn } from "@/lib/utils";

export default function ProjectDetailView({ project }: { project: Project }) {
  const { prev, next } = getAdjacentProjects(project.slug);
  const cs = project.caseStudy;
  const gallery = getProjectGallery(project);
  const hasGallery = gallery.length > 0;

  let sectionIndex = 0;
  let lastSectionIndex = 0;
  let lastSectionTone: SectionTone | undefined;

  const markSection = (index: number, tone?: SectionTone) => {
    lastSectionIndex = index;
    lastSectionTone = tone;
  };

  const showcaseIndex = sectionIndex;
  markSection(showcaseIndex);
  sectionIndex += 1;

  const caseStudySectionIndex = cs ? sectionIndex : null;
  if (caseStudySectionIndex != null) {
    markSection(caseStudySectionIndex, "dark-green");
    sectionIndex += 1;
  }

  const gallerySectionIndex = hasGallery ? sectionIndex : null;
  if (gallerySectionIndex != null) {
    markSection(gallerySectionIndex, "white");
    sectionIndex += 1;
  }

  const navSectionIndex = sectionIndex;
  markSection(navSectionIndex);

  const titleLines = heroTitleLines(project.heading);
  const previousToneForCaseStudy = sectionTone(showcaseIndex);

  return (
    <>
      <PageHero
        eyebrow={PORTFOLIO_CATEGORY_LABELS[project.portfolioCategory]}
        titleLines={titleLines}
        titleGradientLine={titleLines.length > 1 ? 1 : 0}
        subtitle={project.descr}
      />

      <PageSection
        index={showcaseIndex}
        py="pt-6 pb-20 sm:pt-8 sm:pb-28"
        previousTone="light-green"
      >
        <div
          className="relative -mt-2 overflow-hidden rounded-2xl p-1 sm:p-1.5"
          style={{
            background: `linear-gradient(135deg, ${project.palette.primary}55, ${project.palette.secondary}33)`,
          }}
        >
          <div className="grid gap-10 rounded-[14px] bg-white p-6 lg:grid-cols-12 lg:gap-12 lg:p-10">
            <Reveal className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
              <ProjectDetailMeta project={project} />
            </Reveal>

            <Reveal delay={0.08} className="lg:col-span-8">
              <ProjectBrowserFrame
                project={project}
                aspectClassName="aspect-[16/10] sm:aspect-[16/9]"
                priority
                className="shadow-[0_24px_64px_rgba(0,30,28,0.12)]"
              />
            </Reveal>
          </div>
        </div>
      </PageSection>

      {caseStudySectionIndex != null && (
        <PageSection
          index={caseStudySectionIndex}
          tone="dark-green"
          previousTone={previousToneForCaseStudy}
          nextSectionTone={hasGallery ? "white" : undefined}
          ambient="dark-band"
          py={PAGE_SECTION_PY}
        >
          <div className="mb-10 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-14">
            <HomeSectionHeader
              variant="dark"
              eyebrow="Delivery"
              title="How we approached it"
              description="Strategy, design, and engineering — scoped to move the business forward."
              className="max-w-none"
              titleClassName="leading-[1.04]"
            />
            <p className="text-sm leading-relaxed text-white/70 lg:pb-2 lg:text-right lg:text-base">
              A snapshot of the work behind {project.title} — from first brief to launch.
            </p>
          </div>
          <ProjectCaseStudy project={project} />
        </PageSection>
      )}

      {gallerySectionIndex != null && (
        <PageSection
          index={gallerySectionIndex}
          tone="white"
          previousTone={cs ? "dark-green" : previousToneForCaseStudy}
          py={PAGE_SECTION_PY}
        >
          <HomeSectionHeader
            eyebrow="Gallery"
            title="More from this project"
            description="Additional screens and visuals from the build."
            className="max-w-xl"
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {gallery.map((src, i) => (
              <Reveal key={src} delay={i * 0.06}>
                <div
                  className={cn(
                    "group relative overflow-hidden rounded-xl border border-swamp/10 bg-white shadow-[0_1px_0_rgba(0,30,28,0.06)]",
                    i === 0 && gallery.length > 2 && "sm:col-span-2",
                  )}
                >
                  <div
                    className={cn(
                      "relative overflow-hidden bg-bone-50",
                      i === 0 && gallery.length > 2 ? "aspect-[21/9]" : "aspect-[16/10]",
                    )}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      className="object-cover object-top transition duration-500 group-hover:scale-[1.02]"
                      sizes={
                        i === 0 && gallery.length > 2
                          ? "(max-width: 1280px) 100vw, 1280px"
                          : "(max-width: 768px) 100vw, 50vw"
                      }
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </PageSection>
      )}

      <PageSection
        index={navSectionIndex}
        tone="white"
        grid={false}
        previousTone={hasGallery ? "white" : cs ? "dark-green" : previousToneForCaseStudy}
        py="py-16 sm:py-20"
      >
        <p className="label-tech mb-6 text-malachite-700">Continue exploring</p>
        <ProjectDetailNav prev={prev} next={next} />
      </PageSection>

      <PageCTA
        afterSectionIndex={lastSectionIndex}
        lastSectionTone={lastSectionTone ?? sectionTone(lastSectionIndex)}
      />
    </>
  );
}
