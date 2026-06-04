import { isGreenBandSurface } from "@/lib/theme/green-band";
import { SECTION_EDGE_FROM_CLASS } from "@/lib/theme/section-colors";
import { cn } from "@/lib/utils";

export type SectionTone = "white" | "bone" | "light-green" | "dark-green";

type SectionFadeProps = {
  tone: SectionTone;
  /** More saturated mint (e.g. About mission/vision band) */
  mintVariant?: "subtle" | "vivid";
  grid?: boolean;
  /** Fade from the previous section's background at the top */
  edgeTop?: boolean;
  /** Fade into the next section's background at the bottom */
  edgeBottom?: boolean;
  /** Override top edge source tone (defaults to previous section when wired by PageSection) */
  edgeTopFromTone?: SectionTone;
  /** Override bottom edge target tone */
  edgeBottomToTone?: SectionTone;
  /** Custom top edge gradient (e.g. section green) */
  edgeTopClassName?: string;
  /** Custom bottom edge gradient (e.g. green bleed into white below) */
  edgeBottomClassName?: string;
  /** Override base band color only (glow and edges unchanged) */
  backgroundClassName?: string;
};

const edgeFadeTop =
  "pointer-events-none absolute inset-x-0 top-0 z-[1] h-10 bg-gradient-to-b to-transparent sm:h-20 lg:h-28";

/** Soft cap on dark bands — solid green at top, no light bleed from above */
const edgeFadeTopDark =
  "pointer-events-none absolute inset-x-0 top-0 z-[1] h-8 bg-gradient-to-b from-section-dark-green to-transparent sm:h-14 lg:h-20";

const edgeFadeBottom =
  "pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-10 bg-gradient-to-t to-transparent sm:h-20 lg:h-28";

const edgeFadeBottomGreen =
  "pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-10 bg-gradient-to-t from-section-green via-section-green/70 to-transparent sm:h-16 lg:h-24";

function backgroundClass(tone: SectionTone, mintVariant?: "subtle" | "vivid"): string {
  switch (tone) {
    case "light-green":
      return mintVariant === "vivid" ? "section-mint-vivid" : "section-hero-tint";
    case "bone":
      return "section-band bg-bone-50";
    case "dark-green":
      return "bg-section-dark-green";
    default:
      return "bg-white";
  }
}

/**
 * Section background with soft gradients at boundaries (white ↔ mint ↔ dark-green).
 */
export default function SectionFade({
  tone,
  mintVariant,
  grid = false,
  edgeTop = false,
  edgeBottom = false,
  edgeTopFromTone,
  edgeBottomToTone,
  edgeTopClassName,
  edgeBottomClassName,
  backgroundClassName,
}: SectionFadeProps) {
  const topFrom =
    edgeTopFromTone != null
      ? SECTION_EDGE_FROM_CLASS[edgeTopFromTone]
      : SECTION_EDGE_FROM_CLASS[tone];
  const bottomFrom =
    edgeBottomToTone != null
      ? SECTION_EDGE_FROM_CLASS[edgeBottomToTone]
      : SECTION_EDGE_FROM_CLASS[tone];

  const greenBand = isGreenBandSurface(tone, mintVariant);

  return (
    <>
      <div
        aria-hidden
        className={cn(
          "absolute inset-0",
          backgroundClassName ?? backgroundClass(tone, mintVariant),
        )}
      />
      {greenBand && (
        <div
          aria-hidden
          className={cn(
            "section-green-band-glow absolute inset-0 z-[1]",
            tone === "dark-green" ? "opacity-90" : "opacity-100",
          )}
        />
      )}
      {edgeTop && (
        <div
          aria-hidden
          className={cn(
            tone === "dark-green" ? edgeFadeTopDark : edgeFadeTop,
            edgeTopClassName ?? (tone !== "dark-green" && topFrom),
          )}
        />
      )}
      {edgeBottom && (
        <div
          aria-hidden
          className={cn(
            edgeBottomClassName ? edgeFadeBottomGreen : edgeFadeBottom,
            edgeBottomClassName ?? bottomFrom,
          )}
        />
      )}
    </>
  );
}
