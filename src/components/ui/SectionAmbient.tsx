import {
  HERO_GREEN_RADIAL,
  HERO_MALACHITE_BLUR_CLASS,
} from "@/lib/theme/section-colors";
import { cn } from "@/lib/utils";

type AmbientOrb = {
  className: string;
  variant: "hero-green" | "hero-malachite" | "hero-white";
  opacity?: number;
};

export type SectionAmbientPreset =
  | "featured-work"
  | "timeline"
  | "reviews"
  | "trusted-by"
  | "cta"
  | "dark-band";

/**
 * Hero-style soft orbs — same colors/opacity as Hero.tsx background lighting.
 * Each preset uses a different layout so glows do not stack in the same corner.
 */
const PRESETS: Record<SectionAmbientPreset, AmbientOrb[]> = {
  /** Mint section — glow behind project cards (bottom-right), accent top-left */
  "featured-work": [
    {
      variant: "hero-green",
      className: "right-[-6%] bottom-[2%] h-[58%] w-[52%]",
      opacity: 0.6,
    },
    {
      variant: "hero-malachite",
      className: "left-[-8%] top-[22%] h-[55%] w-[40%]",
    },
    {
      variant: "hero-white",
      className: "top-[-6%] left-[38%] h-[38%] w-[42%]",
      opacity: 0.45,
    },
  ],
  /** Mint section — green concentrated upper/mid; fades before Reviews */
  timeline: [
    {
      variant: "hero-green",
      className: "left-[-14%] top-[8%] h-[68%] w-[58%]",
      opacity: 0.55,
    },
    {
      variant: "hero-malachite",
      className: "left-[8%] top-[2%] h-[58%] w-[48%]",
    },
    {
      variant: "hero-white",
      className: "right-[5%] top-[10%] h-[42%] w-[36%]",
      opacity: 0.35,
    },
  ],
  reviews: [
    {
      variant: "hero-green",
      className:
        "left-1/2 top-1/2 h-[min(34rem,85vw)] w-[min(34rem,85vw)] -translate-x-1/2 -translate-y-1/2",
      opacity: 0.6,
    },
    {
      variant: "hero-malachite",
      className: "left-[-6%] bottom-[10%] h-[50%] w-[38%]",
    },
  ],
  /** White section — diagonal: top-left + bottom-right (marquee sits in the middle) */
  "trusted-by": [
    {
      variant: "hero-green",
      className: "left-[-12%] top-[2%] h-[48%] w-[46%]",
      opacity: 0.55,
    },
    {
      variant: "hero-malachite",
      className: "right-[-10%] bottom-[-22%] h-[68%] w-[50%]",
    },
  ],
  /** Dark-green band — minimal glow, no white orbs */
  "dark-band": [
    {
      variant: "hero-green",
      className: "right-[-8%] top-[10%] h-[45%] w-[40%]",
      opacity: 0.35,
    },
    {
      variant: "hero-malachite",
      className: "left-[-10%] bottom-[5%] h-[40%] w-[35%]",
    },
  ],
  /** Mint CTA — wide base wash under the card, accent top-left only */
  cta: [
    {
      variant: "hero-green",
      className:
        "left-1/2 bottom-[-14%] h-[58%] w-[min(44rem,95vw)] -translate-x-1/2",
      opacity: 0.5,
    },
    {
      variant: "hero-malachite",
      className: "left-[-6%] top-[20%] h-[48%] w-[36%]",
    },
    {
      variant: "hero-white",
      className: "right-[-4%] top-[28%] h-[42%] w-[38%]",
      opacity: 0.38,
    },
  ],
};

/** Mint + glow at section top — bridges Trusted By → CTA without a hard edge */
export function SectionGreenBleedDown({ className }: { className?: string }) {
  return (
    <>
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 z-[1] h-44 bg-gradient-to-b from-section-mint via-section-mint/40 to-transparent sm:h-52 lg:h-60",
          className
        )}
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 z-[1] h-44 sm:h-52 lg:h-60",
          className
        )}
      >
        <div
          className="absolute left-[-14%] top-0 h-[95%] w-[55%] rounded-full blur-[140px]"
          style={{
            background: HERO_GREEN_RADIAL,
            opacity: 0.32,
          }}
        />
        <div
          className={cn(
            "absolute right-[-12%] top-[-5%] h-[88%] w-[52%] rounded-[100%]",
            HERO_MALACHITE_BLUR_CLASS
          )}
        />
      </div>
    </>
  );
}

/** Light green hint at section bottom — keeps most glow in the section below */
export function SectionGreenBleedUp({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-24 sm:h-28",
        className
      )}
    >
      <div
        className="absolute left-[-10%] bottom-0 h-full w-[42%] rounded-full blur-[120px]"
        style={{
          background: HERO_GREEN_RADIAL,
          opacity: 0.22,
        }}
      />
      <div className="absolute left-[10%] bottom-0 h-[65%] w-[32%] rounded-[100%] bg-malachite/8 blur-[100px]" />
    </div>
  );
}

type SectionAmbientProps = {
  preset: SectionAmbientPreset;
  className?: string;
};

export default function SectionAmbient({ preset, className }: SectionAmbientProps) {
  const orbs = PRESETS[preset];

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-[1] overflow-hidden",
        className
      )}
      aria-hidden
    >
      {orbs.map((orb, i) => {
        if (orb.variant === "hero-malachite") {
          return (
            <div
              key={i}
              className={cn(
                "absolute rounded-[100%]",
                HERO_MALACHITE_BLUR_CLASS,
                orb.className
              )}
            />
          );
        }

        if (orb.variant === "hero-white") {
          return (
            <div
              key={i}
              className={cn("absolute rounded-full blur-[160px]", orb.className)}
              style={{
                background:
                  "radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 80%)",
                opacity: orb.opacity ?? 0.5,
              }}
            />
          );
        }

        return (
          <div
            key={i}
            className={cn("absolute rounded-full blur-[140px]", orb.className)}
            style={{
              background: HERO_GREEN_RADIAL,
              opacity: orb.opacity ?? 0.6,
            }}
          />
        );
      })}
    </div>
  );
}
