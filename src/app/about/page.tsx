import Image from "next/image";
import PageHero from "@/components/layout/PageHero";
import PageSection from "@/components/layout/PageSection";
import { aboutContent } from "@/lib/content/about";
import AboutCultureSection from "@/components/about/AboutCultureSection";
import AboutMissionVisionSection from "@/components/about/AboutMissionVisionSection";
import AboutGalleryCarousel from "@/components/about/AboutGalleryCarousel";
import AboutTeamSection from "@/components/about/AboutTeamSection";
import { PAGE_SECTION_PY } from "@/lib/theme/section-spacing";

export const metadata = {
  title: "About",
  description:
    "TAD is a Suriname-based digital agency — our story from Paramaribo, mission, culture, and team.",
};

export default function AboutPage() {
  const { hero, story, storyImage } = aboutContent;

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        titleLines={hero.titleLines}
        titleGradientLine={hero.titleGradientLine}
        subtitle={hero.subtitle}
      />
      <PageSection index={0} tone="white" previousTone="light-green" py={PAGE_SECTION_PY}>
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-malachite-700" aria-hidden />
          <span className="label-tech text-malachite-700">{story.eyebrow}</span>
        </div>

        <div className="mt-6 grid gap-8 sm:mt-8 lg:grid-cols-2 lg:items-stretch lg:gap-12 xl:gap-16">
          <div className="relative aspect-[3/2] min-h-[240px] w-full overflow-hidden rounded-2xl border border-swamp/10 bg-swamp/5 shadow-[0_24px_48px_rgba(0,30,28,0.08)] sm:rounded-[1.75rem] lg:aspect-auto lg:min-h-0 lg:h-full">
            <Image
              src={storyImage}
              alt="The TAD team at a trade show booth in Paramaribo"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="flex h-full flex-col">
            <h2 className="text-3xl font-semibold leading-[1.08] tracking-normal text-swamp sm:text-4xl md:text-5xl lg:text-6xl">
              {story.title}
            </h2>
            <blockquote className="mt-6 rounded-xl border border-swamp/10 border-l-2 border-l-malachite bg-white px-5 py-4 text-sm leading-relaxed text-swamp/80 shadow-[0_1px_0_rgba(0,30,28,0.06)] sm:text-base">
              Local businesses deserve the same caliber of design, engineering, and
              marketing that global brands take for granted.
            </blockquote>
            <p className="mt-6 leading-relaxed text-swamp/75">{story.text}</p>
          </div>
        </div>
      </PageSection>
      <AboutMissionVisionSection sectionIndex={1} />
      <AboutCultureSection sectionIndex={2} tone="white" grid={false} edgeTop={false} />
      <AboutGalleryCarousel sectionIndex={3} />
      <AboutTeamSection sectionIndex={4} previousTone="dark-green" />
    </>
  );
}
