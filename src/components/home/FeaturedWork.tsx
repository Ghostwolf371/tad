"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";
import HomeSection from "@/components/home/HomeSection";
import { ButtonLink } from "@/components/ui/Button";
import KineticHeading from "@/components/ui/KineticHeading";
import Parallax from "@/components/ui/Parallax";
import Reveal from "@/components/ui/Reveal";
import { projects, type Project } from "@/data/projects";
import { HOME_SECTION_PY_BEFORE_WHITE } from "@/lib/theme/section-spacing";
import { cn } from "@/lib/utils";

const FEATURED_LAYOUT = {
  large: ["smart-connexxionz", "kings-enterprises"],
  small: ["devinas-enterprises", "the-coffee-box", "digital-world"],
} as const;

type FeaturedSlug = (typeof FEATURED_LAYOUT.large)[number] | (typeof FEATURED_LAYOUT.small)[number];
type FeaturedProject = Project & { homepageScreenshot: string };
type FeaturedCardSize = "large" | "small";

function getProject(slug: FeaturedSlug): FeaturedProject {
  const project = projects.find((entry) => entry.slug === slug);
  if (!project || !project.homepageScreenshot) {
    throw new Error(`Missing featured project data for "${slug}"`);
  }

  return { ...project, homepageScreenshot: project.homepageScreenshot };
}

const largeProjects = FEATURED_LAYOUT.large.map(getProject);
const smallProjects = FEATURED_LAYOUT.small.map(getProject);

const CARD_SHELL: Record<FeaturedCardSize, string> = {
  large: "rounded-[1.75rem] sm:rounded-[2rem]",
  small: "rounded-[1.25rem] sm:rounded-[1.5rem]",
};

/**
 * Large: 2:1 at all breakpoints. Export promos at 2400×1200 (or 1920×960 min) for sharp retina.
 * Small: taller 3:4 on desktop (1/3 column); export 1200×1600 or 1080×1440.
 */
const CARD_ASPECT: Record<FeaturedCardSize, string> = {
  large: "aspect-[2/1]",
  small: "aspect-[4/3] sm:aspect-[3/4]",
};

/** Large: full image, no crop (export 1200×600, 2:1). Small cards still cover-crop. */
const CARD_IMAGE_CLASS: Record<FeaturedCardSize, string> = {
  large:
    "media-fill-contain object-contain object-center transition duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:brightness-[0.92]",
  small:
    "media-fill-cover object-cover object-top transition duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] group-hover:brightness-[0.92]",
};

function projectBrandVars(palette: Project["palette"]): CSSProperties {
  const primaryLight = brandLighten(palette.primary, 0.62);
  return {
    "--brand-primary": palette.primary,
    "--brand-primary-light": primaryLight,
    "--brand-secondary": palette.secondary,
    "--brand-on": palette.text,
  } as CSSProperties;
}

/** Mix a brand hex toward white for readable text on dark overlays */
function brandLighten(hex: string, mixTowardWhite = 0.62) {
  const normalized = hex.replace("#", "");
  const expanded =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => char + char)
          .join("")
      : normalized.slice(0, 6);
  const channel = (start: number) => parseInt(expanded.slice(start, start + 2), 16);
  const lerp = (value: number) =>
    Math.min(255, Math.round(value + (255 - value) * mixTowardWhite));
  const toHex = (value: number) => lerp(value).toString(16).padStart(2, "0");
  return `#${toHex(channel(0))}${toHex(channel(2))}${toHex(channel(4))}`;
}

/** Append 8-digit hex alpha (e.g. "55" ≈ 33%) — matches portfolio/product band helpers */
function brandTint(hex: string, alpha: string) {
  const normalized = hex.replace("#", "");
  const expanded =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => char + char)
          .join("")
      : normalized.slice(0, 6);
  return `#${expanded}${alpha}`;
}

function FeaturedMediaCard({
  project,
  index,
  size,
}: {
  project: FeaturedProject;
  index: number;
  size: FeaturedCardSize;
}) {
  const isLarge = size === "large";
  const displayTags = project.tags.slice(0, isLarge ? 3 : 1);
  const { primary } = project.palette;
  const brandVars = projectBrandVars(project.palette);

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      style={brandVars}
      className={cn(
        "group relative block w-full overflow-hidden",
        CARD_SHELL[size],
        "border border-white/10 bg-white/[0.02]",
        isLarge
          ? "shadow-glow-green hover:shadow-glow-green--strong"
          : "shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
        "transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:-translate-y-1.5 hover:border-[color:var(--brand-primary)]",
        !isLarge &&
          "hover:shadow-[0_32px_80px_rgba(0,0,0,0.45),0_0_28px_color-mix(in_srgb,var(--brand-primary)_42%,transparent),inset_0_1px_0_rgba(255,255,255,0.12)]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--brand-primary)]",
      )}
    >
      <div className={cn("relative isolate w-full overflow-hidden", CARD_ASPECT[size])}>
        <Image
          src={project.homepageScreenshot}
          alt={project.title}
          fill
          unoptimized={isLarge}
          sizes={
            isLarge
              ? "(min-width: 1536px) 1280px, (min-width: 1024px) 90vw, 100vw"
              : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          }
          quality={isLarge ? 92 : 75}
          priority={index < 5}
          className={CARD_IMAGE_CLASS[size]}
        />

        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-swamp/25 via-transparent to-white/[0.03] transition-opacity duration-500 group-hover:opacity-0"
        />

        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500",
            "group-hover:opacity-100 group-focus-visible:opacity-100",
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-swamp via-swamp/65 to-swamp/15" />
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 90% 70% at 50% 100%, ${brandTint(primary, "55")} 0%, transparent 62%)`,
            }}
          />
          <div
            className="absolute inset-x-6 bottom-0 h-px sm:inset-x-8"
            style={{
              background: `linear-gradient(to right, transparent, ${primary}, transparent)`,
            }}
          />
        </div>

        <span
          className={cn(
            "absolute left-4 top-4 z-10 inline-flex items-center font-mono text-[10px] font-medium tracking-[0.22em] text-malachite/70 transition-all duration-500 sm:left-5 sm:top-5",
            "after:ml-1 after:h-px after:w-0 after:bg-malachite/60 after:transition-[width] after:duration-500 after:content-['']",
            "group-hover:text-[color:var(--brand-primary-light)] group-hover:after:w-4",
            "group-focus-visible:text-[color:var(--brand-primary-light)] group-focus-visible:after:w-4",
          )}
          aria-hidden
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div
          className={cn(
            "absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-3",
            isLarge ? "px-5 pb-5 sm:px-7 sm:pb-7" : "px-4 pb-4 sm:px-5 sm:pb-5",
          )}
        >
          <div
            className={cn(
              "min-w-0 flex-1",
              "border-l-2 border-transparent pl-0",
              "translate-y-4 opacity-0",
              "transition-[opacity,transform,border-color,padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              "group-hover:translate-y-0 group-hover:border-[color:var(--brand-primary)] group-hover:pl-3 group-hover:opacity-100",
              "group-focus-visible:translate-y-0 group-focus-visible:border-[color:var(--brand-primary)] group-focus-visible:pl-3 group-focus-visible:opacity-100",
            )}
          >
            <div
              className={cn(
                "flex flex-wrap gap-1.5 translate-y-2 opacity-0",
                "transition-[opacity,transform] duration-500 delay-75 ease-[cubic-bezier(0.22,1,0.36,1)]",
                "group-hover:translate-y-0 group-hover:opacity-100",
                "group-focus-visible:translate-y-0 group-focus-visible:opacity-100",
                isLarge && "sm:gap-2",
              )}
            >
              {displayTags.map((t) => (
                <span
                  key={t}
                  className={cn(
                    "inline-flex rounded-full border px-2 py-0.5 font-mono text-[9px] font-medium tracking-[0.16em] text-[color:var(--brand-primary-light)] backdrop-blur-sm sm:text-[10px]",
                    isLarge && "px-2.5 py-1 tracking-[0.18em]",
                  )}
                  style={{
                    borderColor: brandTint(brandLighten(primary, 0.45), "99"),
                    backgroundColor: brandTint(primary, "40"),
                  }}
                >
                  {t.toUpperCase()}
                </span>
              ))}
            </div>

            <h3
              className={cn(
                "font-semibold leading-[1.05] tracking-normal text-white",
                "drop-shadow-[0_2px_16px_rgba(0,0,0,0.55)]",
                "translate-y-2 opacity-0",
                "transition-[opacity,transform] duration-500 delay-150 ease-[cubic-bezier(0.22,1,0.36,1)]",
                "group-hover:translate-y-0 group-hover:opacity-100",
                "group-focus-visible:translate-y-0 group-focus-visible:opacity-100",
                isLarge
                  ? "mt-3 text-[1.65rem] sm:mt-4 sm:text-[2rem]"
                  : "mt-2.5 text-lg sm:mt-3 sm:text-[1.35rem]",
              )}
            >
              {project.title}
            </h3>
          </div>

          <span
            className={cn(
              "flex shrink-0 items-center justify-center rounded-full border border-white bg-transparent text-white",
              "transition-[transform,border-color,background-color,color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              "group-hover:border-[color:var(--brand-primary)] group-hover:bg-[color:var(--brand-primary)] group-hover:text-[color:var(--brand-on)]",
              "group-hover:shadow-[0_12px_32px_color-mix(in_srgb,var(--brand-primary)_50%,transparent)]",
              "group-focus-visible:border-[color:var(--brand-primary)] group-focus-visible:bg-[color:var(--brand-primary)] group-focus-visible:text-[color:var(--brand-on)]",
              "group-focus-visible:shadow-[0_12px_32px_color-mix(in_srgb,var(--brand-primary)_50%,transparent)]",
              isLarge ? "h-11 min-w-[3.25rem] px-5 sm:h-12 sm:min-w-[3.5rem] sm:px-6" : "h-10 min-w-[2.85rem] px-4 sm:h-11 sm:min-w-[3.1rem] sm:px-5",
            )}
            aria-hidden
          >
            <ArrowRight
              className={cn(
                "shrink-0 transition-transform duration-500 group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5",
                isLarge ? "size-6 sm:size-7" : "size-5 sm:size-6",
              )}
              strokeWidth={2}
            />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function FeaturedWork() {
  return (
    <HomeSection
      tone="dark-green"
      edgeTop
      edgeBottom
      py={HOME_SECTION_PY_BEFORE_WHITE}
      backgroundClassName="bg-canvas-green"
    >
      <div
        aria-hidden
        className="glow-bloom pointer-events-none absolute left-1/2 top-1/2 -z-[1] h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 opacity-60"
      />

      <Reveal>
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-malachite" aria-hidden />
            <span className="label-tech-on-dark">Featured work</span>
          </div>
          <KineticHeading
            as="h2"
            lines={["Selected projects", "we are proud of."]}
            accentLastWord
            useDisplayFont
            className="mt-4 text-3xl font-semibold leading-[1.03] tracking-normal text-white sm:mt-5 sm:text-4xl md:text-5xl lg:text-6xl"
          />
          <p className="mt-4 max-w-xl text-base leading-8 text-white/75 sm:mt-8 sm:text-lg">
            Production builds for clients who needed more than a template.
          </p>
        </div>
      </Reveal>

      <div className="relative z-[1] mt-10 space-y-8 sm:mt-14 sm:space-y-10 lg:space-y-12">
        <div className="flex w-full flex-col gap-8 sm:gap-10 lg:gap-12">
          {largeProjects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.1} className="w-full">
              <Parallax speed={i % 2 === 0 ? 0.08 : 0.16}>
                <FeaturedMediaCard project={project} index={i} size="large" />
              </Parallax>
            </Reveal>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 lg:gap-10 xl:gap-12">
          {smallProjects.map((project, i) => (
            <Reveal
              key={project.slug}
              delay={0.2 + i * 0.08}
              className={cn(
                "w-full",
                i === 2 && "sm:col-span-2 lg:col-span-1",
              )}
            >
              <Parallax speed={i % 2 === 0 ? 0.08 : 0.16}>
                <FeaturedMediaCard
                  project={project}
                  index={largeProjects.length + i}
                  size="small"
                />
              </Parallax>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4} className="flex justify-center pt-2 sm:pt-4">
          <ButtonLink
            href="/portfolio"
            size="lg"
            variant="primary"
            className="group min-w-[14rem] justify-center"
          >
            See full portfolio
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </ButtonLink>
        </Reveal>
      </div>
    </HomeSection>
  );
}
