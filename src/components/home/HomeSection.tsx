import { isGreenBandTone } from "@/lib/theme/green-band";
import { HOME_SECTION_PY } from "@/lib/theme/section-spacing";
import { cn } from "@/lib/utils";

export type HomeSectionTone = "white" | "light" | "dark-green";
export type HomeSectionTextVariant = "light" | "dark";

type HomeSectionProps = {
  children: React.ReactNode;
  tone?: HomeSectionTone;
  className?: string;
  innerClassName?: string;
  id?: string;
  py?: string;
  edgeTop?: boolean;
  edgeBottom?: boolean;
  withContainer?: boolean;
  maxWidth?: "7xl" | "5xl" | "3xl" | "full";
  containerPadding?: "default" | "none";
  /** Override base band color only (grid, glow, and content unchanged) */
  backgroundClassName?: string;
};

export const HOME_SECTION_BACKGROUND_CLASS: Record<HomeSectionTone, string> = {
  white: "bg-white",
  light: "section-hero-tint",
  "dark-green": "bg-section-dark-green",
};

export const HOME_SECTION_EDGE_FROM_CLASS: Record<HomeSectionTone, string> = {
  white: "from-white",
  light: "from-section-mint",
  "dark-green": "from-section-dark-green",
};

export const HOME_SECTION_TEXT_CONTEXT: Record<
  HomeSectionTone,
  HomeSectionTextVariant
> = {
  white: "light",
  light: "light",
  "dark-green": "dark",
};

const HOME_SECTION_TEXT_CLASS: Record<HomeSectionTone, string> = {
  white: "text-swamp",
  light: "text-swamp",
  "dark-green": "text-white",
};

const MAX_WIDTH: Record<NonNullable<HomeSectionProps["maxWidth"]>, string> = {
  "7xl": "max-w-[90rem]",
  "5xl": "max-w-5xl",
  "3xl": "max-w-3xl",
  full: "max-w-full",
};

const CONTAINER_PADDING: Record<
  NonNullable<HomeSectionProps["containerPadding"]>,
  string
> = {
  default: "px-5 sm:px-6 lg:px-20",
  none: "",
};

const edgeFadeTop =
  "pointer-events-none absolute inset-x-0 top-0 z-[1] h-6 bg-gradient-to-b to-transparent sm:h-16 lg:h-24";

const edgeFadeBottom =
  "pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-6 bg-gradient-to-t to-transparent sm:h-16 lg:h-24";

export default function HomeSection({
  children,
  tone = "white",
  className,
  innerClassName,
  id,
  py = HOME_SECTION_PY,
  edgeTop = false,
  edgeBottom = false,
  withContainer = true,
  maxWidth = "7xl",
  containerPadding = "default",
  backgroundClassName,
}: HomeSectionProps) {
  const textVariant = HOME_SECTION_TEXT_CONTEXT[tone];
  const onSaturatedGreen = isGreenBandTone(tone);

  return (
    <section
      id={id}
      data-home-tone={tone}
      data-home-text={textVariant}
      className={cn(
        "relative isolate",
        tone === "white" ? "overflow-x-clip" : "overflow-hidden",
        HOME_SECTION_TEXT_CLASS[tone],
        py,
        className,
      )}
    >
      <div
        aria-hidden
        className={cn(
          "absolute inset-0",
          backgroundClassName ?? HOME_SECTION_BACKGROUND_CLASS[tone],
        )}
      />
      {onSaturatedGreen && (
        <div aria-hidden className="section-green-band-glow absolute inset-0 z-[1] opacity-90" />
      )}
      {edgeTop && (
        <div
          aria-hidden
          className={cn(edgeFadeTop, HOME_SECTION_EDGE_FROM_CLASS[tone])}
        />
      )}
      {edgeBottom && (
        <div
          aria-hidden
          className={cn(edgeFadeBottom, HOME_SECTION_EDGE_FROM_CLASS[tone])}
        />
      )}

      {withContainer ? (
        <div
          className={cn(
            "relative z-[2] mx-auto",
            MAX_WIDTH[maxWidth],
            CONTAINER_PADDING[containerPadding],
            innerClassName,
          )}
        >
          {children}
        </div>
      ) : (
        <div className={cn("relative z-[2]", innerClassName)}>{children}</div>
      )}
    </section>
  );
}
