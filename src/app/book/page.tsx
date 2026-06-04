import PageHero from "@/components/layout/PageHero";
import PageSection from "@/components/layout/PageSection";
import HomeSectionHeader from "@/components/home/HomeSectionHeader";
import BookingWidget from "@/components/contact/BookingWidget";
import CountdownTimer from "@/components/book/CountdownTimer";
import PageCTA from "@/components/layout/PageCTA";
import { bookContent } from "@/lib/content/book";
import { Zap, Target, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Book a Strategy Call",
  description: "Schedule a free strategy call or demo with the TAD team.",
};

const STEP_ICONS = [Zap, Target, ArrowRight];

export default function BookPage() {
  const { hero, expect } = bookContent;

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
        nextSectionTone="dark-green"
        maxWidth="3xl"
        ambient="reviews"
      >
        <HomeSectionHeader
          eyebrow={expect.eyebrow}
          title={expect.title}
          align="center"
          className="mx-auto"
        />

        <div className="relative mt-12">
          <div className="absolute left-[19px] top-8 bottom-8 w-px bg-swamp/10 md:left-1/2 md:-translate-x-px" />
          <div className="space-y-8">
            {expect.points.map((point, i) => {
              const Icon = STEP_ICONS[i] ?? ArrowRight;
              return (
                <div
                  key={point}
                  className={`relative flex items-start gap-6 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}
                >
                  <div className="hidden md:block md:w-1/2" />
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-malachite/30 bg-white shadow-sm">
                    <Icon className="h-4 w-4 text-malachite-700" />
                  </div>
                  <div className={`md:w-1/2 ${i % 2 === 1 ? "md:text-right" : ""}`}>
                    <p className="text-sm leading-relaxed text-swamp/75">{point}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <CountdownTimer />
        </div>
      </PageSection>

      <PageSection
        index={1}
        tone="dark-green"
        previousTone="white"
        nextSectionTone="white"
        maxWidth="7xl"
        ambient="dark-band"
      >
        <BookingWidget />
      </PageSection>
      <PageCTA afterSectionIndex={1} lastSectionTone="dark-green" tone="white" />
    </>
  );
}
