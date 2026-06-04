import CTA from "@/components/home/CTA";
import {
  ctaToneAfterSection,
  sectionTone,
  type SectionTone,
} from "@/components/layout/PageSection";

type PageCTAProps = {
  /** Index of the last content PageSection before the CTA */
  afterSectionIndex: number;
  /** Pass when the last section used a tone override (e.g. dark-green) */
  lastSectionTone?: SectionTone;
  /** Override alternating CTA band (e.g. white after a white careers block) */
  tone?: SectionTone;
};

export default function PageCTA({
  afterSectionIndex,
  lastSectionTone,
  tone: toneOverride,
}: PageCTAProps) {
  const resolvedLastTone =
    lastSectionTone ?? sectionTone(afterSectionIndex);
  const tone =
    toneOverride ?? ctaToneAfterSection(afterSectionIndex, resolvedLastTone);

  return <CTA tone={tone} previousTone={resolvedLastTone} />;
}
