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

/** Homepage — hero, video, about, featured, services, products, trusted-by, CTA */
export function HomePageSkeleton() {
  return (
    <div className="bg-white" aria-busy aria-label="Loading homepage">
      {/* Hero — text + illustration (matches Hero.tsx flex-col-reverse / lg:flex-row) */}
      <section
        className="hero-section section-hero-tint relative isolate overflow-x-clip pt-36 pb-8 sm:px-6 lg:pt-44 lg:pb-10"
        aria-hidden
      >
        <div className="mx-auto flex max-w-[90rem] flex-col-reverse items-center gap-8 px-5 sm:px-6 lg:flex-row lg:items-center lg:gap-8 lg:px-20">
          <div className="flex w-full flex-col items-start lg:w-1/2">
            <SkeletonBar className="mb-5 h-4 w-44 rounded-md" animated={false} />
            <div className="w-full space-y-3">
              <SkeletonBar className="h-12 w-[72%] rounded-lg sm:h-14 xl:h-16" animated={false} />
              <SkeletonBar className="h-12 w-[58%] rounded-lg sm:h-14 xl:h-16" animated={false} />
              <SkeletonBar className="h-12 w-[48%] rounded-lg sm:h-14 xl:h-16" animated={false} />
            </div>
            <div className="mt-9 flex w-full gap-3 sm:mt-10 sm:w-auto">
              <SkeletonBar className="h-12 flex-1 rounded-xl sm:h-14 sm:w-40 sm:flex-none" animated={false} />
              <SkeletonBar className="h-12 flex-1 rounded-xl sm:h-14 sm:w-40 sm:flex-none" animated={false} />
            </div>
          </div>
          <div className="flex w-full items-center justify-center lg:w-1/2">
            <SkeletonBar
              className="aspect-[16/10] w-full max-w-[42rem] rounded-2xl lg:max-w-none"
              animated={false}
            />
          </div>
        </div>
      </section>

      {/* Video — badge + browser chrome reel */}
      <SkeletonSection tone="white" py="pb-12 pt-10 sm:pb-16 sm:pt-12 lg:pb-20 lg:pt-16">
        <div className="mx-auto flex max-w-[75rem] flex-col items-center">
          <SkeletonBar className="h-8 w-40 rounded-full" animated={false} />
          <div className="mt-6 w-full">
            <SkeletonBrowserChrome className="rounded-[1.4rem] sm:rounded-[1.6rem]">
              <SkeletonBar className="aspect-video w-full rounded-[1rem] sm:rounded-[1.2rem]" animated={false} />
            </SkeletonBrowserChrome>
          </div>
        </div>
      </SkeletonSection>

      {/* About — wordmark + statement (no section header) */}
      <SkeletonSection tone="white" py="pt-2 pb-10 sm:pt-8 sm:pb-20 lg:pt-12 lg:pb-32">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-16">
          <SkeletonBar className="h-20 w-40 rounded-lg sm:h-24 sm:w-48 lg:h-28 lg:w-56" animated={false} />
          <div className="w-full max-w-2xl flex-1 space-y-3 text-center lg:text-left">
            <SkeletonBar className="mx-auto h-5 w-full lg:mx-0" animated={false} />
            <SkeletonBar className="mx-auto h-5 w-full lg:mx-0" animated={false} />
            <SkeletonBar className="mx-auto h-5 w-[90%] lg:mx-0" animated={false} />
          </div>
        </div>
      </SkeletonSection>

      {/* Featured work — dark band, 2 large + 3 small + CTA */}
      <SkeletonSection tone="dark-green" py={skeletonSpacing.pageBeforeWhite}>
        <SectionHeaderSkeleton dark className="max-w-2xl" />
        <div className="mt-10 space-y-8 sm:mt-14 sm:space-y-10 lg:space-y-12">
          <div className="flex flex-col gap-8 sm:gap-10 lg:gap-12">
            <SkeletonBar
              tone="dark"
              className="aspect-[4/3] w-full rounded-[1.75rem] sm:aspect-[21/9] sm:rounded-[2rem]"
              animated={false}
            />
            <SkeletonBar
              tone="dark"
              className="aspect-[4/3] w-full rounded-[1.75rem] sm:aspect-[21/9] sm:rounded-[2rem]"
              animated={false}
            />
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 lg:gap-10">
            {Array.from({ length: 3 }, (_, i) => (
              <SkeletonBar
                key={i}
                tone="dark"
                className="aspect-[4/3] w-full rounded-[1.25rem] sm:aspect-[725/1024] sm:rounded-[1.5rem]"
                animated={false}
              />
            ))}
          </div>
          <div className="flex justify-center pt-2 sm:pt-4">
            <SkeletonBar tone="dark" className="h-12 w-56 rounded-full" animated={false} />
          </div>
        </div>
      </SkeletonSection>

      {/* Services — header row, discipline marquee, 4-up grid */}
      <SkeletonSection tone="white" py="pt-6 pb-10 sm:py-20 lg:py-32">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeaderSkeleton className="max-w-3xl" />
          <SkeletonBar className="h-4 w-36 shrink-0" animated={false} />
        </div>
        <div className="mt-8 flex gap-6 overflow-hidden sm:mt-10">
          {Array.from({ length: 5 }, (_, i) => (
            <SkeletonBar key={i} className="h-3 w-24 shrink-0" animated={false} />
          ))}
        </div>
        <SkeletonCard className="mt-10 overflow-hidden p-0 lg:mt-12">
          <div className="grid grid-cols-2 gap-px bg-swamp/10 lg:grid-cols-4">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="space-y-4 bg-white p-5 sm:p-6">
                <SkeletonBar className="h-9 w-9 rounded-lg" animated={false} />
                <SkeletonBar className="h-36 w-full rounded-lg sm:h-44" animated={false} />
                <div className="space-y-2 border-t border-swamp/[0.06] pt-4">
                  <SkeletonBar className="h-3 w-20" animated={false} />
                  <SkeletonBar className="h-5 w-3/4 rounded-md" animated={false} />
                  <SkeletonBar className="h-3 w-full" animated={false} />
                </div>
              </div>
            ))}
          </div>
        </SkeletonCard>
      </SkeletonSection>

      {/* Products — dark band, 3 cards */}
      <SkeletonSection tone="dark-green" py={skeletonSpacing.pageBeforeWhite}>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeaderSkeleton dark className="max-w-2xl" />
          <SkeletonBar tone="dark" className="h-4 w-36 shrink-0" animated={false} />
        </div>
        <div className="mt-12 grid gap-5 sm:mt-14 lg:grid-cols-3">
          {Array.from({ length: 3 }, (_, i) => (
            <SkeletonDarkCard key={i}>
              <div
                className="border-b border-white/10 p-5"
                style={{
                  backgroundImage:
                    "linear-gradient(160deg, #0c1814 0%, #0a1410 42%, #0f1f18 100%)",
                }}
              >
                <SkeletonBar tone="dark" className="h-44 w-full rounded-lg sm:h-52" animated={false} />
              </div>
              <div className="space-y-2 p-5">
                <SkeletonBar tone="dark" className="h-5 w-28 rounded-md" animated={false} />
                <SkeletonBar tone="dark" className="h-3 w-full" animated={false} />
              </div>
            </SkeletonDarkCard>
          ))}
        </div>
      </SkeletonSection>

      {/* Trusted by — white band, centered header, dual marquee rows */}
      <SkeletonSection tone="white" py={skeletonSpacing.homeAfterDark}>
        <SectionHeaderSkeleton className="mx-auto max-w-2xl text-center [&>div:first-child]:justify-center" />
        <div className="mt-16 space-y-5">
          {Array.from({ length: 2 }, (_, row) => (
            <div key={row} className="flex gap-4 overflow-hidden py-1">
              {Array.from({ length: 6 }, (_, i) => (
                <div
                  key={i}
                  className="flex shrink-0 items-center gap-3 rounded-full border border-swamp/10 bg-white px-5 py-3 shadow-[0_8px_26px_rgba(0,30,28,0.06)]"
                >
                  <SkeletonBar className="h-11 w-11 rounded-full" animated={false} />
                  <SkeletonBar className="h-4 w-24 rounded-md" animated={false} />
                </div>
              ))}
            </div>
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
      | "team-grid"
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
          {section.layout === "team-grid" && (
            <>
              <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
                <SectionHeaderSkeleton />
                <SkeletonBar className="h-3 w-48 lg:ml-auto" animated={false} />
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 8 }, (_, j) => (
                  <SkeletonCard key={j} className="flex flex-col items-center p-6">
                    <SkeletonBar className="h-24 w-24 rounded-full" animated={false} />
                    <SkeletonBar className="mt-5 h-4 w-3/4 rounded-md" animated={false} />
                    <SkeletonBar className="mt-2 h-3 w-1/2" animated={false} />
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
        { layout: "team-grid", tone: "white" },
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
      <SkeletonSection tone="dark-green">
        <SectionHeaderSkeleton dark />
        <SkeletonBar tone="dark" className="mt-4 h-4 max-w-2xl" animated={false} />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }, (_, i) => (
            <SkeletonDarkCard key={i} className="p-5 sm:p-6">
              <SkeletonBar tone="dark" className="h-10 w-10 rounded-xl" animated={false} />
              <SkeletonBar tone="dark" className="mt-5 h-3 w-20" animated={false} />
              <SkeletonBar tone="dark" className="mt-3 h-5 w-3/4 rounded-md" animated={false} />
              <SkeletonBar tone="dark" className="mt-4 h-3 w-full" animated={false} />
              <SkeletonBar tone="dark" className="mt-5 h-8 w-28 rounded-lg" animated={false} />
            </SkeletonDarkCard>
          ))}
        </div>
      </SkeletonSection>
      <SkeletonSection tone="white">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <SectionHeaderSkeleton />
          <SkeletonBar className="h-4 w-full max-w-sm lg:ml-auto" animated={false} />
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }, (_, i) => (
            <SkeletonCard key={i} className="overflow-hidden p-0">
              <div className="border-b border-swamp/8 bg-bone-50/60 p-6">
                <SkeletonBar className="h-12 w-12 rounded-xl" animated={false} />
                <SkeletonBar className="mt-5 h-3 w-16" animated={false} />
                <SkeletonBar className="mt-3 h-6 w-4/5 rounded-lg" animated={false} />
                <SkeletonBar className="mt-3 h-4 w-full" animated={false} />
              </div>
              <div className="space-y-3 p-6">
                <SkeletonBar className="h-8 w-36 rounded-full" animated={false} />
                {Array.from({ length: 4 }, (_, j) => (
                  <SkeletonBar key={j} className="h-3 w-full" animated={false} />
                ))}
                <SkeletonBar className="mt-4 h-11 w-full rounded-full" animated={false} />
              </div>
            </SkeletonCard>
          ))}
        </div>
      </SkeletonSection>
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
    </div>
  );
}

export function ProductsPageSkeleton() {
  return (
    <div className="bg-white" aria-busy>
      <PageHeroSkeleton />
      <SkeletonSection>
        <SectionHeaderSkeleton />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {Array.from({ length: 6 }, (_, i) => (
            <SkeletonCard key={i} className="flex flex-col overflow-hidden p-0">
              <SkeletonMockupPanel
                className="h-44 rounded-none border-0 border-b"
                dark={i === 1 || i === 2 || i === 5}
              />
              <div className="space-y-3 p-5 sm:p-6">
                <SkeletonBar className="h-4 w-32 rounded-md" animated={false} />
                <SkeletonBar className="h-6 w-3/4" animated={false} />
                <SkeletonBar className="h-4 w-full" animated={false} />
                <SkeletonBar className="h-4 w-5/6" animated={false} />
                <SkeletonBar className="h-8 w-28 rounded-full" animated={false} />
              </div>
            </SkeletonCard>
          ))}
        </div>
      </SkeletonSection>
      <PageCTASkeleton />
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
        <SectionHeaderSkeleton dark className="max-w-3xl" />
        <SkeletonBar tone="dark" className="mt-4 h-4 max-w-2xl" animated={false} />
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {Array.from({ length: 3 }, (_, i) => (
            <SkeletonBar key={i} tone="dark" className="h-24 rounded-2xl" animated={false} />
          ))}
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          <SkeletonDarkCard className="p-6 sm:p-8 lg:col-span-5">
            <SkeletonBar tone="dark" className="h-3 w-28" animated={false} />
            <SkeletonBar tone="dark" className="mt-4 h-7 w-4/5 rounded-lg" animated={false} />
            <SkeletonBar tone="dark" className="mt-3 h-4 w-full" animated={false} />
            <SkeletonBar
              tone="dark"
              className="mx-auto mt-8 aspect-square w-full max-w-[200px] rounded-full"
              animated={false}
            />
          </SkeletonDarkCard>
          <SkeletonDarkCard className="overflow-hidden p-0 lg:col-span-7">
            <SkeletonBar tone="dark" className="h-14 w-full rounded-none" animated={false} />
            {Array.from({ length: 5 }, (_, i) => (
              <SkeletonBar
                key={i}
                tone="dark"
                className="h-16 w-full rounded-none border-t border-white/10"
                animated={false}
              />
            ))}
          </SkeletonDarkCard>
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
      </SkeletonSection>
      <SkeletonSection tone="dark-green">
        <SkeletonBrowserChrome dark className="mx-auto max-w-4xl">
          <SkeletonBar tone="dark" className="h-[420px] w-full rounded-lg" animated={false} />
        </SkeletonBrowserChrome>
      </SkeletonSection>
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
