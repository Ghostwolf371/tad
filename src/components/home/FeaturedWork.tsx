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
import { getProjectFeaturedImage } from "@/lib/projects/images";
import { HOME_SECTION_PY_BEFORE_WHITE } from "@/lib/theme/section-spacing";
import { cn } from "@/lib/utils";

const FEATURED_LAYOUT = {
  large: ["kings-enterprises", "smart-connexxionz"] as const,
  small: ["the-coffee-box", "hj-express", "trustbank-amanah"] as const,
} as const;

type FeaturedSlug = (typeof FEATURED_LAYOUT.large)[number] | (typeof FEATURED_LAYOUT.small)[number];
type FeaturedProject = Project & {
  featuredImage: string;
  featuredImageMobile?: string;
};
type FeaturedCardSize = "large" | "small";

function getProject(slug: FeaturedSlug): FeaturedProject {
  const project = projects.find((entry) => entry.slug === slug);
  const featuredImage = project ? getProjectFeaturedImage(project) : undefined;
  const featuredImageMobile = project
    ? getProjectFeaturedImage(project, { mobile: true })
    : undefined;
  if (!project || !featuredImage) {
    throw new Error(`Missing featured project data for "${slug}"`);
  }

  return { ...project, featuredImage, featuredImageMobile };
}

const largeProjects = FEATURED_LAYOUT.large.map(getProject);
const smallProjects = FEATURED_LAYOUT.small.map(getProject);

const CARD_SHELL: Record<FeaturedCardSize, string> = {
  large: "rounded-[1.75rem] sm:rounded-[2rem]",
  small: "rounded-[1.25rem] sm:rounded-[1.5rem]",
};

/**
 * Large: 4:3 mobile promos, 2:1 desktop banners (2400×1200 or 1920×960).
 * Small: 4:3 mobile, 3:4 desktop column (1200×1600).
 */
const CARD_ASPECT: Record<FeaturedCardSize, string> = {
  large: "aspect-[7/6] sm:aspect-[2/1]",
  small: "aspect-[7/6] sm:aspect-[3/4]",
};

/** Promo art (3D character + device) — show full frame, no screenshot crop. */
const CARD_IMAGE_CLASS: Record<FeaturedCardSize, string> = {
  large:
    "media-fill-contain object-contain object-center transform-gpu transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] group-hover:brightness-[0.96]",
  small:
    "media-fill-contain object-contain object-center transform-gpu transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] group-hover:brightness-[0.96]",
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
  const mobileSrc = project.featuredImageMobile ?? project.featuredImage;
  const hasDistinctMobileArt = Boolean(project.featuredImageMobile);

  return (
    <div className="group relative isolate" style={brandVars}>
      {/* Ambient glow behind the card, in the project's own colour.
          Animates via opacity only (compositor-friendly = smooth). */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -inset-3 -z-10 opacity-0 blur-[46px] transform-gpu",
          "transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "group-hover:opacity-70 group-focus-within:opacity-70",
          CARD_SHELL[size],
        )}
        style={{ backgroundColor: brandLighten(primary, 0.35) }}
      />
      <Link
        href={`/portfolio/${project.slug}`}
        className={cn(
          "relative block w-full overflow-hidden transform-gpu will-change-transform",
          CARD_SHELL[size],
          "border border-white/10 bg-white/[0.02]",
          isLarge
            ? "shadow-glow-green"
            : "shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
          "transition-[transform,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "group-hover:-translate-y-1.5 group-hover:border-[color:var(--brand-primary)]",
          "group-focus-within:-translate-y-1.5 group-focus-within:border-[color:var(--brand-primary)]",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--brand-primary)]",
        )}
      >
      <div className={cn("relative isolate w-full overflow-hidden", CARD_ASPECT[size])}>
        <Image
          src={mobileSrc}
          alt={project.title}
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          quality={75}
          loading="lazy"
          className={cn(
            CARD_IMAGE_CLASS[size],
            hasDistinctMobileArt && "sm:hidden",
          )}
        />
        <Image
          src={project.featuredImage}
          alt=""
          aria-hidden
          fill
          sizes={
            isLarge
              ? "(min-width: 1536px) 1280px, (min-width: 1024px) 90vw, 100vw"
              : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          }
          quality={isLarge ? 92 : 75}
          loading="lazy"
          className={cn(
            CARD_IMAGE_CLASS[size],
            hasDistinctMobileArt ? "hidden sm:block" : "block",
          )}
        />

        {/* Persistent legibility scrim — keeps the project info readable on
            every device (no hover needed). Strengthens slightly on hover. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-swamp/95 via-swamp/45 to-transparent transition-opacity duration-500 group-hover:opacity-100"
        />

        {/* Hover-only brand glow in the project's own colour */}
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500",
            "group-hover:opacity-100 group-focus-within:opacity-100",
          )}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 95% 75% at 50% 100%, ${brandTint(primary, "70")} 0%, transparent 64%)`,
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
            "group-focus-within:text-[color:var(--brand-primary-light)] group-focus-within:after:w-4",
          )}
          aria-hidden
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div
          className={cn(
            "absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-3",
            isLarge ? "px-4 pb-4 sm:px-7 sm:pb-7" : "px-3.5 pb-3.5 sm:px-5 sm:pb-5",
          )}
        >
          <div
            className={cn(
              "min-w-0 flex-1 border-l-2 pl-3",
              "border-[color:color-mix(in_srgb,var(--brand-primary)_55%,transparent)]",
              "transition-[border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              "group-hover:border-[color:var(--brand-primary)]",
              "group-focus-within:border-[color:var(--brand-primary)]",
            )}
          >
            <div
              className={cn(
                "flex flex-wrap gap-1.5",
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
                isLarge
                  ? "mt-2 text-xl sm:mt-4 sm:text-[2rem]"
                  : "mt-2 text-base sm:mt-3 sm:text-[1.35rem]",
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
              "group-focus-within:border-[color:var(--brand-primary)] group-focus-within:bg-[color:var(--brand-primary)] group-focus-within:text-[color:var(--brand-on)]",
              "group-focus-within:shadow-[0_12px_32px_color-mix(in_srgb,var(--brand-primary)_50%,transparent)]",
              isLarge ? "h-11 min-w-[3.25rem] px-5 sm:h-12 sm:min-w-[3.5rem] sm:px-6" : "h-10 min-w-[2.85rem] px-4 sm:h-11 sm:min-w-[3.1rem] sm:px-5",
            )}
            aria-hidden
          >
            <ArrowRight
              className={cn(
                "shrink-0 transition-transform duration-500 group-hover:translate-x-0.5 group-focus-within:translate-x-0.5",
                isLarge ? "size-6 sm:size-7" : "size-5 sm:size-6",
              )}
              strokeWidth={2}
            />
          </span>
        </div>
      </div>
      </Link>
    </div>
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
            gradientLastWord
            className="mt-4 text-3xl font-semibold leading-[1.03] tracking-normal text-white sm:mt-5 sm:text-4xl md:text-5xl lg:text-6xl"
          />
          <p className="mt-4 max-w-xl text-base leading-8 text-white/75 sm:mt-8 sm:text-lg">
            Production builds for clients who needed more than a template.
          </p>
        </div>
      </Reveal>

      <div className="relative z-[1] mt-10 space-y-8 sm:mt-14 sm:space-y-10 lg:space-y-12">
        {largeProjects.length > 0 ? (
          <div className="flex w-full flex-col gap-8 sm:gap-10 lg:gap-12">
            {largeProjects.map((project, i) => (
              <Reveal key={project.slug} delay={i * 0.1} className="w-full">
                <Parallax speed={i % 2 === 0 ? 0.08 : 0.16}>
                  <FeaturedMediaCard project={project} index={i} size="large" />
                </Parallax>
              </Reveal>
            ))}
          </div>
        ) : null}

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
