"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import PageSection from "@/components/layout/PageSection";
import HomeSectionHeader from "@/components/home/HomeSectionHeader";
import { aboutContent } from "@/lib/content/about";
import { PAGE_SECTION_PY_AFTER_DARK } from "@/lib/theme/section-spacing";
import { cn } from "@/lib/utils";

/** Landscape frame — 3:2 matches gallery assets on mobile + desktop */
const SLIDE_FRAME = "relative aspect-[3/2] w-full overflow-hidden";

function slideAt(index: number, offset: number, length: number) {
  return (index + offset + length) % length;
}

type Slide = (typeof aboutContent.gallery.slides)[number];

function CarouselSlide({
  slide,
  variant,
  onClick,
  label,
}: {
  slide: Slide;
  variant: "center" | "peek";
  onClick?: () => void;
  label?: string;
}) {
  const isCenter = variant === "center";
  const Wrapper = onClick ? "button" : "div";

  return (
    <Wrapper
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={cn(
        "relative block h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-swamp/30 shadow-[0_28px_70px_rgba(0,0,0,0.4)] transition-[opacity,transform] duration-500",
        !isCenter && "opacity-50 hover:opacity-75",
        onClick &&
          "cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-malachite",
      )}
      aria-label={label}
    >
      <Image
        src={slide.src}
        alt={isCenter ? slide.alt : ""}
        fill
        className="object-cover object-center"
        sizes={
          isCenter
            ? "(max-width: 768px) 100vw, (max-width: 1280px) 55vw, 720px"
            : "(max-width: 1280px) 28vw, 360px"
        }
        priority={isCenter}
      />
      <div
        aria-hidden
        className={cn(
          "absolute inset-0",
          isCenter
            ? "bg-gradient-to-t from-swamp/50 via-transparent to-transparent"
            : "bg-swamp/30",
        )}
      />
    </Wrapper>
  );
}

type AboutGalleryCarouselProps = {
  sectionIndex?: number;
};

export default function AboutGalleryCarousel({
  sectionIndex = 3,
}: AboutGalleryCarouselProps) {
  const { gallery } = aboutContent;
  const slides = gallery.slides;
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((i: number) => {
    setIndex((i + slides.length) % slides.length);
  }, [slides.length]);

  const advance = useCallback(() => {
    setIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(advance, 6000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, advance]);

  const current = slides[index];
  const previous = slides[slideAt(index, -1, slides.length)];
  const upcoming = slides[slideAt(index, 1, slides.length)];

  return (
    <PageSection
      index={sectionIndex}
      tone="dark-green"
      previousTone="white"
      ambient="dark-band"
      maxWidth="full"
      py={PAGE_SECTION_PY_AFTER_DARK}
    >
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="mx-auto max-w-[100rem] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end lg:gap-14">
            <HomeSectionHeader
              variant="dark"
              eyebrow={gallery.eyebrow}
              title={gallery.title}
              className="max-w-none"
              titleClassName="leading-[1.04]"
            />
            <p className="text-sm leading-relaxed text-white/75 lg:pb-2 lg:text-right lg:text-base">
              {gallery.description}
            </p>
          </div>

          <div className="relative mt-10 w-full sm:mt-12">
            <div className="flex items-stretch justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6">
              <div
                className={cn(
                  SLIDE_FRAME,
                  "hidden w-[min(28vw,14rem)] shrink-0 sm:block lg:w-[min(24vw,16rem)]",
                )}
              >
                <CarouselSlide
                  slide={previous}
                  variant="peek"
                  onClick={prev}
                  label="Previous slide"
                />
              </div>

              <motion.div
                key={current.src}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className={cn(SLIDE_FRAME, "relative min-w-0 flex-1")}
              >
                <CarouselSlide slide={current} variant="center" />
                <div className="absolute inset-0 z-10 flex sm:hidden">
                  <button
                    type="button"
                    onClick={prev}
                    className="h-full w-1/2 touch-manipulation"
                    aria-label="Previous slide"
                  />
                  <button
                    type="button"
                    onClick={next}
                    className="h-full w-1/2 touch-manipulation"
                    aria-label="Next slide"
                  />
                </div>
              </motion.div>

              <div
                className={cn(
                  SLIDE_FRAME,
                  "hidden w-[min(28vw,14rem)] shrink-0 sm:block lg:w-[min(24vw,16rem)]",
                )}
              >
                <CarouselSlide
                  slide={upcoming}
                  variant="peek"
                  onClick={next}
                  label="Next slide"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3 sm:mt-8">
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => goTo(i)}
                className={cn(
                  "rounded-full transition-all duration-500",
                  i === index
                    ? "h-3 w-10 bg-malachite"
                    : "h-3 w-3 bg-white/25 hover:bg-white/40",
                )}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </PageSection>
  );
}
