"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import SectionFade, { type SectionTone } from "@/components/layout/SectionBleed";
import RotatingServiceText, {
  MARKETING_ROTATING_TEXTS,
} from "@/components/ui/RotatingServiceText";
import { HERO_GREEN_RADIAL } from "@/lib/theme/section-colors";
import { cn } from "@/lib/utils";

const heroEnterEase = [0.22, 1, 0.36, 1] as const;

/** Page hero entrance — eyebrow → title lines → body */
const heroSequenceVars: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
};

const heroEyebrowVars: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: heroEnterEase },
  },
};

const heroTitleBlockVars: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.04 },
  },
};

/** Slide-up mask — safe with brand-gradient-text (no clip-path on gradients) */
const heroTitleLineVars: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.92, ease: heroEnterEase },
  },
};

const heroBodyVars: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: heroEnterEase },
  },
};

function HeroTitleLine({
  children,
  className,
  reduceMotion,
}: {
  children: ReactNode;
  className?: string;
  reduceMotion: boolean | null;
}) {
  return (
    <motion.span
      variants={reduceMotion ? undefined : heroTitleLineVars}
      className="block overflow-hidden pb-[0.06em] -mb-[0.06em] will-change-transform"
    >
      <span className={cn("block", className)}>{children}</span>
    </motion.span>
  );
}

type PageHeroProps = {
  eyebrow?: ReactNode;
  /** Single-line title (used when titleLines is omitted) */
  title?: string;
  /** Multi-line title with homepage-style line reveal */
  titleLines?: readonly string[];
  /** Index of titleLines entry that uses brand-gradient-text */
  titleGradientLine?: number;
  /** Word or phrase rendered with brand gradient inside a single title */
  titleAccent?: string;
  /** Prefix before rotating typewriter text (default: "We engineer ") */
  rotatingPrefix?: string;
  /** Rotating phrases; pass `true` to use default marketing list */
  rotatingTexts?: readonly string[] | boolean;
  subtitle?: ReactNode;
  cta?: { label: string; href: string };
  backgroundImage?: string;
  /** Fade the hero bottom into the next section tone (e.g. dark-green portfolio band) */
  nextSectionTone?: SectionTone;
  className?: string;
};

export default function PageHero({
  eyebrow,
  title,
  titleLines,
  titleGradientLine = 1,
  titleAccent,
  rotatingPrefix = "We engineer ",
  rotatingTexts = false,
  subtitle,
  cta,
  backgroundImage,
  nextSectionTone,
  className = "",
}: PageHeroProps) {
  const reduceMotion = useReducedMotion();

  const texts =
    rotatingTexts === true
      ? MARKETING_ROTATING_TEXTS
      : rotatingTexts === false
        ? undefined
        : rotatingTexts;

  const titleParts =
    title && titleAccent && title.includes(titleAccent)
      ? title.split(titleAccent)
      : null;

  const showRotating = Boolean(texts?.length);

  return (
    <section
      className={cn(
        "hero-section relative isolate overflow-hidden section-hero-tint pt-32 pb-20 sm:pt-40 sm:pb-24",
        className
      )}
    >
      <SectionFade tone="light-green" grid={false} />
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          className="z-[1] object-cover object-center opacity-[0.08]"
          sizes="100vw"
          aria-hidden
        />
      )}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-10%] top-[15%] z-[1] h-[55%] w-[45%] rounded-full blur-[140px]"
        style={{ background: HERO_GREEN_RADIAL, opacity: 0.45 }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-8%] top-[8%] z-[1] h-[50%] w-[40%] rounded-[100%] bg-malachite/10 blur-[130px]"
      />
      {nextSectionTone === "dark-green" ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-20 bg-gradient-to-t from-section-dark-green via-section-dark-green/45 to-transparent sm:h-28 lg:h-36"
        />
      ) : (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-16 bg-gradient-to-b from-transparent to-section-mint sm:h-20"
        />
      )}

      <div className="relative z-[2] mx-auto max-w-[90rem] px-5 sm:px-6 lg:px-20">
        <motion.div
          variants={reduceMotion ? undefined : heroSequenceVars}
          initial={reduceMotion ? false : "hidden"}
          animate={reduceMotion ? undefined : "show"}
        >
          {eyebrow && (
            <motion.div
              variants={reduceMotion ? undefined : heroEyebrowVars}
              className="flex items-center gap-3"
            >
              <span className="h-px w-6 bg-malachite-700" aria-hidden />
              <span className="label-tech text-malachite-700">{eyebrow}</span>
            </motion.div>
          )}

          {titleLines && titleLines.length > 0 ? (
            <motion.h1
              variants={reduceMotion ? undefined : heroTitleBlockVars}
              className="mt-5 max-w-4xl font-display font-bold tracking-normal text-swamp"
            >
              {titleLines.map((line, i) => (
                <HeroTitleLine
                  key={line}
                  reduceMotion={reduceMotion}
                  className="text-4xl leading-[1.05] sm:text-5xl lg:text-6xl"
                >
                  {i === titleGradientLine ? (
                    <span className="brand-gradient-text">{line}</span>
                  ) : (
                    line
                  )}
                </HeroTitleLine>
              ))}
            </motion.h1>
          ) : title ? (
            <motion.h1
              variants={reduceMotion ? undefined : heroTitleBlockVars}
              className="mt-5 max-w-4xl font-display font-bold leading-[1.05] tracking-normal text-swamp"
            >
              <HeroTitleLine
                reduceMotion={reduceMotion}
                className="text-4xl sm:text-5xl lg:text-6xl"
              >
                {titleParts ? (
                  <>
                    {titleParts[0]}
                    <span className="brand-gradient-text">{titleAccent}</span>
                    {titleParts[1]}
                  </>
                ) : (
                  title
                )}
              </HeroTitleLine>
            </motion.h1>
          ) : null}

          {showRotating && (
            <motion.p
              variants={reduceMotion ? undefined : heroBodyVars}
              className="mt-4 text-2xl leading-snug text-swamp/75 sm:text-[1.75rem] sm:leading-snug"
            >
              <span className="inline-flex flex-nowrap items-baseline">
                <span className="shrink-0 font-normal">{rotatingPrefix}</span>
                <RotatingServiceText texts={texts} />
              </span>
            </motion.p>
          )}

          {subtitle && (
            <motion.p
              variants={reduceMotion ? undefined : heroBodyVars}
              className={cn(
                "max-w-2xl text-base leading-relaxed text-swamp/75 sm:text-lg",
                showRotating ? "mt-4" : "mt-6",
              )}
            >
              {subtitle}
            </motion.p>
          )}

          {cta && (
            <motion.div variants={reduceMotion ? undefined : heroBodyVars} className="mt-8">
              <ButtonLink href={cta.href} size="lg" variant="primary">
                {cta.label} <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
