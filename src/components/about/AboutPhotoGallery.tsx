"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import PageSection, { type SectionTone } from "@/components/layout/PageSection";
import HomeSectionHeader from "@/components/home/HomeSectionHeader";
import { aboutContent } from "@/lib/content/about";
import { PAGE_SECTION_PY_AFTER_DARK } from "@/lib/theme/section-spacing";
import { cn } from "@/lib/utils";

type AboutPhotoGalleryProps = {
  sectionIndex?: number;
  previousTone?: SectionTone;
};

type GalleryImage = (typeof aboutContent.photoGallery.images)[number];

const layoutConfig = {
  hero: {
    grid: "col-span-6",
    aspect: "aspect-[16/10] sm:aspect-[3/2] lg:aspect-[21/9]",
    sizes: "(max-width: 1280px) 100vw, 1280px",
  },
  landscape: {
    grid: "col-span-3",
    aspect: "aspect-[3/2]",
    sizes: "(max-width: 768px) 50vw, (max-width: 1280px) 50vw, 640px",
  },
  square: {
    grid: "col-span-2",
    aspect: "aspect-square",
    sizes: "(max-width: 768px) 33vw, (max-width: 1280px) 33vw, 420px",
  },
} as const;

function GalleryTile({ image, index }: { image: GalleryImage; index: number }) {
  const config = layoutConfig[image.layout];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-swamp/10 bg-white shadow-[0_1px_0_rgba(0,30,28,0.06)]",
        config.grid,
      )}
    >
      <div className={cn("relative overflow-hidden bg-bone-50", config.aspect)}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover object-center transition duration-500 group-hover:scale-[1.02]"
          sizes={config.sizes}
        />
      </div>
    </motion.div>
  );
}

export default function AboutPhotoGallery({
  sectionIndex = 4,
  previousTone = "dark-green",
}: AboutPhotoGalleryProps) {
  const { photoGallery } = aboutContent;

  return (
    <PageSection
      index={sectionIndex}
      tone="white"
      previousTone={previousTone}
      backgroundClassName="bg-[#FEFEFE]"
      py={PAGE_SECTION_PY_AFTER_DARK}
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end lg:gap-14">
        <HomeSectionHeader
          variant="light"
          eyebrow={photoGallery.eyebrow}
          title={photoGallery.title}
          className="max-w-none"
          titleClassName="leading-[1.04]"
        />
        <p className="text-sm leading-relaxed text-swamp/75 lg:pb-2 lg:text-right lg:text-base">
          {photoGallery.description}
        </p>
      </div>

      <div className="mt-10 grid grid-cols-6 gap-3 sm:mt-12 sm:gap-4 lg:gap-5">
        {photoGallery.images.map((image, i) => (
          <GalleryTile key={image.src} image={image} index={i} />
        ))}
      </div>
    </PageSection>
  );
}
