"use client";

import { ArrowRight, Calendar, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import SectionFade, { type SectionTone } from "@/components/layout/SectionBleed";
import Reveal from "@/components/ui/Reveal";
import { SectionGreenBleedDown } from "@/components/ui/SectionAmbient";
import {
  greenBandPromoPanelClassName,
  greenBandTagClassName,
} from "@/lib/theme/green-band-surfaces";
import { isGreenBandTone } from "@/lib/theme/green-band";
import {
  CTA_SECTION_PY,
  CTA_SECTION_PY_AFTER_DARK_GREEN,
} from "@/lib/theme/section-spacing";
import { cn } from "@/lib/utils";

type CTAProps = {
  /** Band background (default white — homepage unchanged) */
  tone?: SectionTone;
  /** Section immediately above the CTA, for top edge fade */
  previousTone?: SectionTone;
};

export default function CTA({ tone = "white", previousTone }: CTAProps) {
  const onGreenBand = isGreenBandTone(tone);
  const isMint = tone === "light-green";
  const afterDarkGreen = previousTone === "dark-green";

  return (
    <section
      className={cn(
        "relative isolate overflow-x-clip",
        afterDarkGreen ? CTA_SECTION_PY_AFTER_DARK_GREEN : CTA_SECTION_PY,
      )}
    >
      <SectionFade
        tone={tone}
        mintVariant={tone === "light-green" ? "vivid" : undefined}
        grid={false}
      />
      {isMint && <SectionGreenBleedDown />}
      <div className="relative z-[2] mx-auto max-w-[90rem] px-5 sm:px-6 lg:px-20">
        <Reveal blur>
          <div
            className={
              onGreenBand
                ? greenBandPromoPanelClassName()
                : "relative overflow-hidden rounded-3xl border border-swamp/10 bg-white px-6 py-10 shadow-[0_20px_60px_rgba(0,30,28,0.09)] sm:px-10 sm:py-12 lg:px-14 lg:py-14"
            }
          >
            <div
              className={cn(
                "pointer-events-none absolute inset-x-8 top-0 h-px sm:inset-x-12",
                onGreenBand
                  ? "bg-gradient-to-r from-transparent via-malachite/50 to-transparent"
                  : "bg-gradient-to-r from-transparent via-swamp/15 to-transparent",
              )}
              aria-hidden
            />

            <div className="relative grid gap-10 lg:grid-cols-[1.35fr_auto] lg:items-center lg:gap-14">
              <div className="text-center lg:text-left">
                <div
                  className={cn(
                    "mb-5 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-normal",
                    onGreenBand
                      ? "border-white/15 bg-white/10 text-white/70"
                      : "border-swamp/10 bg-bone-50 text-swamp/60",
                  )}
                >
                  <Sparkles
                    className={cn(
                      "h-3.5 w-3.5",
                      onGreenBand ? "text-malachite" : "text-malachite-700",
                    )}
                    aria-hidden
                  />
                  Let&apos;s build together
                </div>
                <h2
                  className={cn(
                    "text-4xl font-semibold leading-[1.03] tracking-normal sm:text-5xl lg:text-[3.35rem]",
                    onGreenBand ? "text-white" : "text-swamp",
                  )}
                >
                  Ready to build something{" "}
                  <span className="brand-gradient-text">great?</span>
                </h2>
                <p
                  className={cn(
                    "mt-5 max-w-xl text-lg leading-relaxed sm:text-xl lg:mx-0 mx-auto",
                    onGreenBand ? "text-white/75" : "text-swamp/70",
                  )}
                >
                  Tell us what you&apos;re shipping. We&apos;ll map scope, timeline, and the
                  right team — strategy, design, and engineering in one place.
                </p>
                <div className="mt-7 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                  {["Strategy + Design + Engineering", "Fast kickoff", "Senior team"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className={onGreenBand ? greenBandTagClassName : "rounded-full border border-swamp/10 bg-bone-50 px-3.5 py-1.5 text-xs font-medium text-swamp/65"}
                      >
                        {tag}
                      </span>
                    ),
                  )}
                </div>
              </div>

              <div className="flex w-full flex-col gap-3 sm:mx-auto sm:max-w-sm lg:mx-0 lg:max-w-none lg:min-w-[15.5rem]">
                <ButtonLink
                  href="/contact"
                  size="lg"
                  variant="primary"
                  className="group w-full justify-center shadow-[0_12px_28px_rgba(0,227,87,0.22)] hover:shadow-[0_16px_36px_rgba(0,227,87,0.28)]"
                >
                  Start a project
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </ButtonLink>
                <ButtonLink
                  href="/book"
                  size="lg"
                  variant={onGreenBand ? "subtle" : "outline"}
                  className={cn(
                    "w-full justify-center",
                    !onGreenBand && "border-swamp/12 bg-white hover:bg-bone-50",
                  )}
                >
                  <Calendar className="h-4 w-4" />
                  Book a call
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
