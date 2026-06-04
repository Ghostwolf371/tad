import { cn } from "@/lib/utils";
import SectionFade, { type SectionTone } from "@/components/layout/SectionBleed";
import { isGreenBandSurface } from "@/lib/theme/green-band";
import { PAGE_SECTION_PY } from "@/lib/theme/section-spacing";

export type { SectionTone };
import SectionAmbient, {
  type SectionAmbientPreset,
} from "@/components/ui/SectionAmbient";

type PageSectionProps = {
  children: React.ReactNode;
  /** Section order after PageHero: 0 = light-green, 1 = white, 2 = light-green, … */
  index: number;
  /** Override alternating tone (e.g. dark-green accent band) */
  tone?: SectionTone;
  className?: string;
  innerClassName?: string;
  grid?: boolean;
  id?: string;
  py?: string;
  maxWidth?: "7xl" | "5xl" | "3xl" | "full";
  /** Homepage-style soft orbs for mint/white bands */
  ambient?: SectionAmbientPreset;
  /** When the prior band used a tone override (e.g. dark-green at index 0) */
  previousTone?: SectionTone;
  /**
   * Next section tone — only used for vivid-green → white bottom bleed (no white wash).
   */
  nextSectionTone?: SectionTone;
  /** Saturated green background (`#001715`) for visible green bands */
  mintVariant?: "subtle" | "vivid";
  /** Override top edge gradient class (e.g. `from-section-green`) */
  edgeTopClassName?: string;
  /** Top edge fade — default off to avoid white haze between bands */
  edgeTop?: boolean;
  /** Bottom edge fade — default off; vivid mint → white uses green bleed only */
  edgeBottom?: boolean;
  /** Override base band color only (glow and edges unchanged) */
  backgroundClassName?: string;
};

const MAX_WIDTH: Record<NonNullable<PageSectionProps["maxWidth"]>, string> = {
  "7xl": "max-w-[90rem]",
  "5xl": "max-w-5xl",
  "3xl": "max-w-3xl",
  full: "max-w-full",
};

export function sectionTone(index: number): SectionTone {
  return index % 2 === 0 ? "light-green" : "white";
}

/** Tone of the section immediately above (PageHero = light-green). */
export function previousSectionTone(
  index: number,
  explicitPrevious?: SectionTone,
): SectionTone {
  if (explicitPrevious) return explicitPrevious;
  if (index === 0) return "light-green";
  return sectionTone(index - 1);
}

/** CTA band tone opposite the last content section for white ↔ green alternation. */
export function ctaToneAfterSection(
  sectionIndex: number,
  sectionToneOverride?: SectionTone,
): SectionTone {
  const lastTone = sectionToneOverride ?? sectionTone(sectionIndex);
  if (lastTone === "dark-green" || lastTone === "light-green") return "white";
  return "light-green";
}

export default function PageSection({
  children,
  index,
  tone: toneOverride,
  className,
  innerClassName,
  grid,
  id,
  py = PAGE_SECTION_PY,
  maxWidth = "7xl",
  ambient,
  previousTone,
  nextSectionTone,
  mintVariant = "subtle",
  edgeTopClassName: edgeTopClassNameProp,
  edgeTop: edgeTopProp = false,
  edgeBottom: edgeBottomProp = false,
  backgroundClassName,
}: PageSectionProps) {
  const tone = toneOverride ?? sectionTone(index);
  const isDark = tone === "dark-green";
  const prevTone = previousSectionTone(index, previousTone);
  const vividAfterWhite =
    tone === "light-green" && mintVariant === "vivid" && prevTone === "white";
  const vividBeforeWhite =
    tone === "light-green" && mintVariant === "vivid" && nextSectionTone === "white";

  /** Dark bands: solid green cap only — never fade from white */
  const edgeTopFromTone: SectionTone = isDark ? "dark-green" : prevTone;

  const edgeTopClassName =
    edgeTopClassNameProp ??
    (vividAfterWhite ? "from-section-green" : undefined);

  const edgeBottomClassName = vividBeforeWhite ? "from-section-green" : undefined;

  const edgeTop = edgeTopProp || vividAfterWhite;
  const edgeBottom = edgeBottomProp || Boolean(edgeBottomClassName);
  const resolvedAmbient = ambient;

  return (
    <section
      id={id}
      data-section-tone={tone}
      className={cn(
        "relative isolate overflow-hidden",
        py,
        isDark && "text-white",
        className,
      )}
    >
      <SectionFade
        tone={tone}
        mintVariant={tone === "light-green" ? mintVariant : undefined}
        grid={false}
        edgeTop={edgeTop}
        edgeTopFromTone={edgeTopFromTone}
        edgeTopClassName={edgeTopClassName}
        edgeBottom={edgeBottom}
        edgeBottomToTone={edgeBottomClassName ? undefined : nextSectionTone}
        edgeBottomClassName={edgeBottomClassName}
        backgroundClassName={backgroundClassName}
      />
      {resolvedAmbient && <SectionAmbient preset={resolvedAmbient} />}
      <div
        className={cn(
          "relative z-[2] mx-auto px-5 sm:px-6 lg:px-20",
          MAX_WIDTH[maxWidth],
          innerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}
