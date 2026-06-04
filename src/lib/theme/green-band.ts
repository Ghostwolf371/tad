import type { SectionTone } from "@/components/layout/SectionBleed";
import type { HomeSectionTone } from "@/components/home/HomeSection";

export function isGreenBandTone(
  tone: SectionTone | HomeSectionTone,
  mintVariant?: "subtle" | "vivid",
) {
  if (tone === "dark-green") return true;
  if (tone === "light-green" && mintVariant === "vivid") return true;
  return false;
}

export function isGreenBandSurface(
  tone: SectionTone,
  mintVariant?: "subtle" | "vivid",
) {
  return isGreenBandTone(tone, mintVariant);
}
