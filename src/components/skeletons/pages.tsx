import { SkeletonBar } from "@/components/ui/SkeletonBar";
import {
  PageCTASkeleton,
  PageHeroSkeleton,
  SectionHeaderSkeleton,
  SkeletonBrowserChrome,
  SkeletonCard,
  SkeletonDarkCard,
  SkeletonMockupPanel,
  SkeletonSection,
  SkeletonButtonRow,
  SkeletonTagRow,
  SkeletonProse,
  skeletonSpacing,
} from "@/components/skeletons/primitives";
import { cn } from "@/lib/utils";

/** Homepage — hero + about + featured + services + timeline + products + logos + CTA */
export function HomePageSkeleton() {
  return (
    <div className="bg-white" aria-busy aria-label="Loading homepage">
      <section
        className="hero-section section-hero-tint relative isolate min-h-[88vh] overflow-x-clip pt-[5.5rem] sm:pt-28 lg:min-h-screen lg:pt-32"
        aria-hidden
      >
        <div className="relative mx-auto flex w-full max-w-[90rem] flex-col items-center px-5 pb-12 text-center sm:px-6 sm:pb-14 lg:px-20 lg:pb-16">
          <div className="w-full max-w-5xl space-y-4 sm:space-y-5">
            <SkeletonBar className="mx-auto h-3 w-36" animated={false} />
            <div className="space-y-3 sm:space-y-4">
              <SkeletonBar className="mx-auto h-14 w-full rounded-lg sm:h-20" animated={false} />
              <SkeletonBar
                className="mx-auto h-14 w-[92%] rounded-lg sm:h-20"
                animated={false}
              />
              <SkeletonBar
                className="mx-auto h-14 w-[76%] rounded-lg sm:h-20"
                animated={false}
              />
            </div>
            <div className="mx-auto max-w-2xl space-y-3 pt-2">
              <SkeletonBar className="mx-auto h-5 w-full" animated={false} />
              <SkeletonBar className="mx-auto h-5 w-[82%]" animated={false} />
            </div>
          </div>

          <div className="flex justify-center pt-8 sm:pt-10">
            <SkeletonBar className="h-12 w-44 rounded-full sm:h-14 sm:w-52" animated={false} />
          </div>

          <div className="mt-10 w-full max-w-5xl sm:mt-12">
            <div className="overflow-hidden rounded-2xl border border-swamp/10 bg-white/70 p-3 shadow-[0_24px_64px_rgba(0,30,28,0.08)] backdrop-blur-sm sm:p-4">
              <div className="relative">
                <SkeletonBar className="aspect-[16/9] w-full rounded-xl" animated={false} />
                <SkeletonBar
                  className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/60 bg-white/80"
                  animated={false}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-28 bg-gradient-to-b from-transparent via-white/95 to-white sm:h-36 lg:h-44"
        />
      </section>

      <SkeletonSection tone="white" py={skeletonSpacing.home}>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <SectionHeaderSkeleton />
          <div className="space-y-3">
            <SkeletonBar className="h-4 w-full" animated={false} />
            <SkeletonBar className="h-4 w-full" animated={false} />
            <SkeletonBar className="h-4 w-11/12" animated={false} />
            <SkeletonBar className="h-11 w-40 rounded-full" animated={false} />
          </div>
        </div>
      </SkeletonSection>

      <SkeletonSection tone="dark-green" py={skeletonSpacing.home}>
        <SectionHeaderSkeleton dark />
        <div className="mt-12 space-y-8 sm:space-y-10 lg:space-y-12">
          <div className="flex flex-col gap-8 sm:gap-10 lg:gap-12">
            <SkeletonBar
              tone="dark"
              className="aspect-[16/10] w-full rounded-[1.75rem] sm:aspect-[21/9] sm:rounded-[2rem]"
              animated={false}
            />
            <SkeletonBar
              tone="dark"
              className="aspect-[16/10] w-full rounded-[1.75rem] sm:aspect-[21/9] sm:rounded-[2rem]"
              animated={false}
            />
          </div>
          <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 lg:gap-12">
            {Array.from({ length: 3 }, (_, i) => (
              <SkeletonBar
                key={i}
                tone="dark"
                className="aspect-[725/1024] w-full rounded-[1.25rem] sm:rounded-[1.5rem]"
                animated={false}
              />
            ))}
          </div>
          <div className="flex justify-center pt-3 sm:pt-4">
            <SkeletonBar tone="dark" className="h-12 w-56 rounded-full" animated={false} />
          </div>
        </div>
      </SkeletonSection>

      <SkeletonSection tone="white" py="py-10 sm:py-20 lg:py-32">
        <SectionHeaderSkeleton />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {Array.from({ length: 4 }, (_, i) => (
            <SkeletonCard key={i} className="p-5">
              <SkeletonMockupPanel className="mb-4 h-44" />
              <SkeletonBar className="h-5 w-2/3 rounded-md" animated={false} />
              <SkeletonBar className="mt-2 h-3 w-full" animated={false} />
            </SkeletonCard>
          ))}
        </div>
      </SkeletonSection>

      <SkeletonSection tone="white" py={skeletonSpacing.home}>
        <SectionHeaderSkeleton className="mx-auto text-center" />
        <div className="mx-auto mt-12 flex max-w-4xl justify-between gap-4 overflow-hidden px-2">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <SkeletonBar className="h-10 w-10 rounded-full" animated={false} />
              <SkeletonBar className="h-2 w-14" animated={false} />
            </div>
          ))}
        </div>
      </SkeletonSection>

      <SkeletonSection tone="white" py={skeletonSpacing.home}>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeaderSkeleton />
          <SkeletonBar className="h-4 w-32" animated={false} />
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {Array.from({ length: 3 }, (_, i) => (
            <SkeletonCard key={i}>
              <div
                className="border-b border-swamp/10 p-5"
                style={{
                  backgroundImage:
                    "linear-gradient(160deg, #0c1814 0%, #0a1410 42%, #0f1f18 100%)",
                }}
              >
                <SkeletonMockupPanel dark className="h-40" />
              </div>
              <div className="space-y-2 p-5">
                <SkeletonBar className="h-5 w-28 rounded-md" animated={false} />
                <SkeletonBar className="h-3 w-full" animated={false} />
              </div>
            </SkeletonCard>
          ))}
        </div>
      </SkeletonSection>

      <SkeletonSection tone="light-green" py={skeletonSpacing.home}>
        <div className="flex flex-wrap justify-center gap-3">
          {Array.from({ length: 6 }, (_, i) => (
            <SkeletonBar key={i} className="h-10 w-28 rounded-full" animated={false} />
          ))}
        </div>
      </SkeletonSection>

      <PageCTASkeleton />
    </div>
  );
}

/** Interior pages with PageHero + white content + optional dark band + CTA */
function StandardPageSkeleton({
  sections,
  showCta = true,
}: {
  showCta?: boolean;
  sections: Array<{
    tone?: "white" | "dark-green" | "light-green";
    py?: string;
    layout:
      | "prose"
      | "grid-2"
      | "grid-3"
      | "culture-pillars"
      | "gallery-carousel"
      | "split-mockup"
      | "timeline"
      | "form-map"
      | "product-rows";
  }>;
}) {
  return (
    <div className="bg-white" aria-busy>
      <PageHeroSkeleton />
      {sections.map((section, i) => (
        <SkeletonSection key={i} tone={section.tone} py={section.py}>
          {section.layout === "prose" && (
            <>
              <SectionHeaderSkeleton dark={section.tone === "dark-green"} />
              <SkeletonProse paragraphs={4} />
            </>
          )}
          {section.layout === "grid-2" && (
            <>
              <SectionHeaderSkeleton dark={section.tone === "dark-green"} />
              <div className="mt-12 grid gap-5 sm:grid-cols-2">
                {Array.from({ length: 4 }, (_, j) => (
                  <SkeletonCard key={j} className="aspect-[4/3] p-6">
                    <SkeletonBar className="h-8 w-8 rounded-lg" animated={false} />
                    <SkeletonBar className="mt-4 h-5 w-2/3 rounded-md" animated={false} />
                    <SkeletonBar className="mt-2 h-3 w-full" animated={false} />
                  </SkeletonCard>
                ))}
              </div>
            </>
          )}
          {section.layout === "grid-3" && (
            <>
              <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <SectionHeaderSkeleton dark={section.tone === "dark-green"} />
                <SkeletonBar
                  tone={section.tone === "dark-green" ? "dark" : "light"}
                  className="h-3 w-36"
                  animated={false}
                />
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                {Array.from({ length: 4 }, (_, j) => (
                  <SkeletonBar
                    key={j}
                    tone={section.tone === "dark-green" ? "dark" : "light"}
                    className="h-9 w-24 rounded-full"
                    animated={false}
                  />
                ))}
              </div>
              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 9 }, (_, j) => (
                  <SkeletonCard key={j} className="overflow-hidden">
                    <SkeletonBar className="aspect-[16/10] w-full rounded-none" animated={false} />
                    <div className="space-y-2 p-4">
                      <SkeletonBar className="h-4 w-3/4 rounded-md" animated={false} />
                      <SkeletonBar className="h-3 w-1/2" animated={false} />
                    </div>
                  </SkeletonCard>
                ))}
              </div>
            </>
          )}
          {section.layout === "gallery-carousel" && (
            <>
              <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
                <SectionHeaderSkeleton dark />
                <SkeletonBar tone="dark" className="h-4 w-full max-w-md lg:ml-auto" animated={false} />
              </div>
              <div className="mx-auto mt-10 flex h-[min(62vh,34rem)] max-w-[100rem] items-stretch justify-center gap-4 sm:gap-6">
                <SkeletonBar
                  tone="dark"
                  className="hidden h-full w-[24%] max-w-[16rem] rounded-2xl sm:block"
                  animated={false}
                />
                <SkeletonBar
                  tone="dark"
                  className="h-full min-w-0 flex-1 rounded-2xl"
                  animated={false}
                />
                <SkeletonBar
                  tone="dark"
                  className="hidden h-full w-[24%] max-w-[16rem] rounded-2xl sm:block"
                  animated={false}
                />
              </div>
              <div className="mx-auto mt-8 flex items-center justify-center gap-3">
                <SkeletonBar tone="dark" className="h-3 w-10 rounded-full" animated={false} />
                {Array.from({ length: 3 }, (_, j) => (
                  <SkeletonBar
                    key={j}
                    tone="dark"
                    className="h-3 w-3 rounded-full"
                    animated={false}
                  />
                ))}
              </div>
            </>
          )}
          {section.layout === "culture-pillars" && (
            <>
              <SectionHeaderSkeleton />
              <div className="mt-12 grid gap-5 md:grid-cols-3">
                {Array.from({ length: 3 }, (_, j) => (
                  <SkeletonCard key={j} className="space-y-4 p-6 sm:p-8">
                    <div className="flex items-start gap-4">
                      <SkeletonBar className="h-11 w-11 shrink-0 rounded-xl" animated={false} />
                      <div className="min-w-0 flex-1 space-y-2">
                        <SkeletonBar className="h-3 w-10" animated={false} />
                        <SkeletonBar className="h-5 w-4/5 rounded-md" animated={false} />
                      </div>
                    </div>
                    <SkeletonBar className="h-3 w-full" animated={false} />
                    <SkeletonBar className="h-3 w-11/12" animated={false} />
                  </SkeletonCard>
                ))}
              </div>
            </>
          )}
          {section.layout === "split-mockup" && (
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <SkeletonMockupPanel className="h-56 sm:h-64" />
              <div className="space-y-3">
                <SectionHeaderSkeleton />
                <SkeletonBar className="h-4 w-full" animated={false} />
                <SkeletonBar className="h-4 w-11/12" animated={false} />
              </div>
            </div>
          )}
          {section.layout === "timeline" && (
            <>
              <SectionHeaderSkeleton className="mx-auto text-center" />
              <div className="mx-auto mt-12 max-w-2xl space-y-8">
                {Array.from({ length: 3 }, (_, j) => (
                  <div key={j} className="flex gap-4">
                    <SkeletonBar className="h-10 w-10 shrink-0 rounded-full" animated={false} />
                    <SkeletonBar className="h-16 flex-1 rounded-lg" animated={false} />
                  </div>
                ))}
              </div>
            </>
          )}
          {section.layout === "form-map" && (
            <div className="grid gap-8 lg:grid-cols-2">
              <SkeletonCard className="p-6 sm:p-8">
                <SectionHeaderSkeleton />
                <div className="mt-8 space-y-4">
                  {Array.from({ length: 4 }, (_, j) => (
                    <SkeletonBar key={j} className="h-11 w-full rounded-lg" animated={false} />
                  ))}
                  <SkeletonBar className="h-11 w-full rounded-full" animated={false} />
                </div>
              </SkeletonCard>
              <SkeletonBar className="min-h-[280px] rounded-2xl" animated={false} />
            </div>
          )}
          {section.layout === "product-rows" && (
            <>
              <SectionHeaderSkeleton />
              <div className="mt-14 space-y-8">
                {Array.from({ length: 6 }, (_, j) => (
                  <SkeletonCard
                    key={j}
                    className={cn(
                      "grid gap-8 p-6 sm:p-8 lg:grid-cols-2 lg:items-center",
                      j % 2 === 1 && "[&>div:first-child]:lg:order-2",
                    )}
                  >
                    <SkeletonMockupPanel className="h-52" />
                    <div className="space-y-3">
                      <SkeletonBar className="h-6 w-40 rounded-md" animated={false} />
                      <SkeletonBar className="h-4 w-full" animated={false} />
                      <SkeletonBar className="h-4 w-5/6" animated={false} />
                      <SkeletonBar className="mt-4 h-10 w-32 rounded-full" animated={false} />
                    </div>
                  </SkeletonCard>
                ))}
              </div>
            </>
          )}
        </SkeletonSection>
      ))}
      {showCta && <PageCTASkeleton />}
    </div>
  );
}

export function AboutPageSkeleton() {
  return (
    <StandardPageSkeleton
      showCta={false}
      sections={[
        { layout: "split-mockup" },
        { layout: "grid-2" },
        { layout: "culture-pillars" },
        { layout: "gallery-carousel", tone: "dark-green" },
        { layout: "grid-3", tone: "dark-green" },
      ]}
    />
  );
}

export function ServicesPageSkeleton() {
  return (
    <div className="bg-white" aria-busy>
      <PageHeroSkeleton />
      <SkeletonSection>
        <div className="space-y-16">
          {Array.from({ length: 4 }, (_, i) => (
            <div
              key={i}
              className={cn(
                "grid gap-8 lg:grid-cols-2 lg:items-center",
                i % 2 === 1 && "[&>div:first-child]:lg:order-2",
              )}
            >
              <SkeletonMockupPanel
                className="h-48 sm:h-56"
                dark={i === 1}
              />
              <div className="space-y-3">
                <SkeletonBar className="h-3 w-28" animated={false} />
                <SkeletonBar className="h-7 w-3/4 rounded-lg" animated={false} />
                <SkeletonBar className="h-4 w-full" animated={false} />
                <SkeletonBar className="h-4 w-11/12" animated={false} />
              </div>
            </div>
          ))}
        </div>
      </SkeletonSection>
      <SkeletonSection tone="white">
        <SectionHeaderSkeleton className="mx-auto text-center" />
        <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-4">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <SkeletonBar className="h-10 w-10 rounded-full" animated={false} />
              <SkeletonBar className="h-3 w-16" animated={false} />
            </div>
          ))}
        </div>
      </SkeletonSection>
      <SkeletonSection tone="dark-green">
        <SectionHeaderSkeleton dark />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }, (_, i) => (
            <SkeletonDarkCard key={i} className="p-6">
              <SkeletonBar tone="dark" className="h-5 w-24 rounded-md" animated={false} />
              <SkeletonBar tone="dark" className="mt-4 h-3 w-full" animated={false} />
              <SkeletonBar tone="accent" className="mt-6 h-10 w-28 rounded-full" animated={false} />
            </SkeletonDarkCard>
          ))}
        </div>
      </SkeletonSection>
      <PageCTASkeleton />
    </div>
  );
}

export function ContactPageSkeleton() {
  return (
    <div className="bg-white" aria-busy>
      <PageHeroSkeleton />
      <SkeletonSection>
        <div className="grid gap-8 lg:grid-cols-2">
          <SkeletonCard className="p-6 sm:p-8">
            <SectionHeaderSkeleton />
            <div className="mt-8 space-y-4">
              {Array.from({ length: 5 }, (_, i) => (
                <SkeletonBar key={i} className="h-11 w-full rounded-lg" animated={false} />
              ))}
              <SkeletonBar className="h-11 w-full rounded-full" animated={false} />
            </div>
          </SkeletonCard>
          <div className="space-y-4">
            <SkeletonBar className="h-5 w-40 rounded-md" animated={false} />
            <SkeletonBar className="h-4 w-full" animated={false} />
            <SkeletonBar className="h-4 w-3/4" animated={false} />
          </div>
        </div>
      </SkeletonSection>
      <SkeletonSection tone="dark-green">
        <SkeletonBar tone="dark" className="h-64 w-full rounded-2xl sm:h-80" animated={false} />
      </SkeletonSection>
      <SkeletonSection>
        <SectionHeaderSkeleton />
        <div className="mt-10 space-y-3">
          {Array.from({ length: 5 }, (_, i) => (
            <SkeletonBar key={i} className="h-14 w-full rounded-xl" animated={false} />
          ))}
        </div>
      </SkeletonSection>
      <PageCTASkeleton />
    </div>
  );
}

export function ProductsPageSkeleton() {
  return (
    <div className="bg-white" aria-busy>
      <PageHeroSkeleton />
      <SkeletonSection>
        <SectionHeaderSkeleton />
        <div className="mt-14 space-y-8">
          {Array.from({ length: 6 }, (_, i) => (
            <SkeletonCard
              key={i}
              className={cn(
                "grid gap-8 p-6 sm:p-8 lg:grid-cols-2 lg:items-center",
                i % 2 === 1 && "[&>div:first-child]:lg:order-2",
              )}
            >
              <SkeletonMockupPanel className="h-52" dark={i === 1 || i === 2 || i === 5} />
              <div className="space-y-3">
                <SkeletonBar className="h-6 w-44 rounded-md" animated={false} />
                <SkeletonBar className="h-4 w-full" animated={false} />
                <SkeletonBar className="h-10 w-36 rounded-full" animated={false} />
              </div>
            </SkeletonCard>
          ))}
        </div>
      </SkeletonSection>
      <SkeletonSection tone="white">
        <SectionHeaderSkeleton />
        <div className="mt-10 flex gap-4 overflow-hidden">
          {Array.from({ length: 4 }, (_, i) => (
            <SkeletonCard key={i} className="min-w-[200px] shrink-0 p-4">
              <SkeletonBar className="h-20 rounded-lg" animated={false} />
            </SkeletonCard>
          ))}
        </div>
      </SkeletonSection>
      <PageCTASkeleton green />
    </div>
  );
}

export function PortfolioPageSkeleton() {
  return (
    <div className="bg-white" aria-busy>
      <PageHeroSkeleton />
      <SkeletonSection>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeaderSkeleton />
          <SkeletonBar className="h-3 w-40" animated={false} />
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {["All", "E-Commerce", "Website"].map((_, i) => (
            <SkeletonBar key={i} className="h-9 w-28 rounded-full" animated={false} />
          ))}
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 12 }, (_, i) => (
            <SkeletonCard key={i}>
              <SkeletonBar className="aspect-[16/10] w-full rounded-none" animated={false} />
              <div className="space-y-2 p-4">
                <SkeletonBar className="h-4 w-4/5 rounded-md" animated={false} />
                <SkeletonBar className="h-3 w-1/3" animated={false} />
              </div>
            </SkeletonCard>
          ))}
        </div>
      </SkeletonSection>
      <SkeletonSection tone="dark-green" py={skeletonSpacing.pageBeforeWhite}>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <SectionHeaderSkeleton dark />
          <SkeletonBar tone="dark" className="h-4 w-full max-w-md lg:ml-auto" animated={false} />
        </div>
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }, (_, i) => (
            <SkeletonBar key={i} tone="dark" className="h-24 rounded-xl" animated={false} />
          ))}
        </div>
      </SkeletonSection>
      <PageCTASkeleton green />
    </div>
  );
}

export function BookPageSkeleton() {
  return (
    <div className="bg-white" aria-busy>
      <PageHeroSkeleton />
      <SkeletonSection maxWidth="3xl">
        <SectionHeaderSkeleton className="mx-auto text-center" />
        <div className="mx-auto mt-12 max-w-2xl space-y-8">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="flex items-start gap-4">
              <SkeletonBar className="h-10 w-10 shrink-0 rounded-full" animated={false} />
              <SkeletonBar className="h-14 flex-1 rounded-lg" animated={false} />
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <SkeletonBar className="h-12 w-56 rounded-full" animated={false} />
        </div>
      </SkeletonSection>
      <SkeletonSection tone="dark-green">
        <SkeletonBrowserChrome dark className="mx-auto max-w-4xl">
          <SkeletonBar tone="dark" className="h-[420px] w-full rounded-lg" animated={false} />
        </SkeletonBrowserChrome>
      </SkeletonSection>
      <PageCTASkeleton />
    </div>
  );
}

export function VacaturePageSkeleton() {
  return (
    <div className="bg-white" aria-busy>
      <PageHeroSkeleton />
      <SkeletonSection>
        <SectionHeaderSkeleton />
        <SkeletonBar className="mt-6 h-4 w-full max-w-3xl" animated={false} />
        <SkeletonBar className="mt-2 h-4 w-5/6 max-w-2xl" animated={false} />
      </SkeletonSection>
      <SkeletonSection>
        <SectionHeaderSkeleton />
        <div className="mt-10 space-y-4">
          {Array.from({ length: 3 }, (_, i) => (
            <SkeletonCard key={i} className="p-6">
              <SkeletonBar className="h-6 w-48 rounded-md" animated={false} />
              <SkeletonBar className="mt-3 h-4 w-full" animated={false} />
              <SkeletonBar className="mt-2 h-4 w-2/3" animated={false} />
            </SkeletonCard>
          ))}
        </div>
      </SkeletonSection>
      <SkeletonSection tone="dark-green">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <SectionHeaderSkeleton dark />
          <SkeletonBar tone="dark" className="h-4 w-full max-w-sm lg:ml-auto" animated={false} />
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <SkeletonDarkCard key={i} className="h-28 p-4">
              <SkeletonBar tone="dark" className="h-4 w-24 rounded-md" animated={false} />
              <SkeletonBar tone="dark" className="mt-3 h-3 w-full" animated={false} />
            </SkeletonDarkCard>
          ))}
        </div>
      </SkeletonSection>
      <PageCTASkeleton green />
    </div>
  );
}

export function LegalPageSkeleton() {
  return (
    <div className="bg-white" aria-busy>
      <PageHeroSkeleton titleLines={2} subtitle={false} />
      <SkeletonSection maxWidth="3xl">
        <div className="grid gap-8 lg:grid-cols-[12rem_1fr]">
          <div className="hidden space-y-2 lg:block">
            {Array.from({ length: 6 }, (_, i) => (
              <SkeletonBar key={i} className="h-3 w-full" animated={false} />
            ))}
          </div>
          <SkeletonProse paragraphs={5} />
        </div>
      </SkeletonSection>
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="bg-white" aria-busy>
      <PageHeroSkeleton titleLines={2} />
      <SkeletonSection py="py-10 sm:py-12">
        <SkeletonButtonRow />
        <div className="mt-6">
          <SkeletonTagRow count={4} />
        </div>
      </SkeletonSection>
      <SkeletonSection py="py-16 sm:py-24" className="border-t border-swamp/[0.06]">
        <SkeletonCard className="overflow-hidden p-6 sm:p-10">
          <SkeletonMockupPanel className="h-64 sm:h-80" dark />
        </SkeletonCard>
      </SkeletonSection>
      <SkeletonSection>
        <SectionHeaderSkeleton />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }, (_, i) => (
            <SkeletonCard key={i} className="p-5">
              <SkeletonBar className="h-8 w-8 rounded-lg" animated={false} />
              <SkeletonBar className="mt-4 h-5 w-2/3 rounded-md" animated={false} />
              <SkeletonBar className="mt-2 h-3 w-full" animated={false} />
            </SkeletonCard>
          ))}
        </div>
      </SkeletonSection>
      <PageCTASkeleton />
    </div>
  );
}

export function ProjectDetailSkeleton() {
  return (
    <div className="bg-white" aria-busy>
      <PageHeroSkeleton titleLines={2} />
      <SkeletonSection py="pt-6 pb-20 sm:pt-8 sm:pb-28">
        <div className="rounded-2xl border border-swamp/10 bg-gradient-to-br from-malachite/20 to-transparent p-1 sm:p-1.5">
          <div className="grid gap-10 rounded-[14px] bg-white p-6 lg:grid-cols-12 lg:gap-12 lg:p-10">
            <div className="space-y-4 lg:col-span-4">
              <SkeletonBar className="h-3 w-24" animated={false} />
              <SkeletonBar className="h-8 w-3/4 rounded-lg" animated={false} />
              <SkeletonBar className="h-4 w-full" animated={false} />
              <SkeletonBar className="h-11 w-full rounded-full" animated={false} />
            </div>
            <SkeletonBrowserChrome className="lg:col-span-8">
              <SkeletonBar className="aspect-[16/10] w-full rounded-lg" animated={false} />
            </SkeletonBrowserChrome>
          </div>
        </div>
      </SkeletonSection>
      <SkeletonSection tone="dark-green">
        <SectionHeaderSkeleton dark />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {Array.from({ length: 2 }, (_, i) => (
            <SkeletonDarkCard key={i} className="h-40 p-6">
              <SkeletonBar tone="dark" className="h-5 w-32 rounded-md" animated={false} />
              <SkeletonBar tone="dark" className="mt-4 h-3 w-full" animated={false} />
            </SkeletonDarkCard>
          ))}
        </div>
      </SkeletonSection>
      <SkeletonSection>
        <div className="grid gap-4 sm:grid-cols-2">
          <SkeletonBar className="aspect-video rounded-xl" animated={false} />
          <SkeletonBar className="aspect-video rounded-xl" animated={false} />
        </div>
      </SkeletonSection>
      <PageCTASkeleton green />
    </div>
  );
}
