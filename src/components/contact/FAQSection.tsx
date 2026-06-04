"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronDown, Search } from "lucide-react";
import PageSection, { type SectionTone } from "@/components/layout/PageSection";
import Reveal from "@/components/ui/Reveal";
import { isGreenBandSurface } from "@/lib/theme/green-band";
import {
  PAGE_SECTION_PY,
  PAGE_SECTION_PY_AFTER_DARK,
} from "@/lib/theme/section-spacing";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    question: "What is your typical project timeline?",
    answer:
      "Most web projects take between 4-8 weeks from discovery to launch. Complex e-commerce platforms or custom SaaS products may take 3-6 months. We will provide a detailed timeline during our initial strategy call.",
  },
  {
    question: "Do you offer post-launch support and maintenance?",
    answer:
      "Yes. We offer continuous support, hosting, and maintenance packages to ensure your digital product stays secure, fast, and up-to-date with the latest technologies.",
  },
  {
    question: "How do you handle pricing?",
    answer:
      "We offer transparent, value-based pricing. We have predefined packages for standard needs, and provide custom quotes for enterprise solutions after a thorough scoping process.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Absolutely. While we are based in Suriname, we have a strong portfolio of international clients across the Caribbean, Europe, and the US.",
  },
];

type FAQSectionProps = {
  sectionIndex?: number;
  tone?: SectionTone;
  mintVariant?: "subtle" | "vivid";
  previousTone?: SectionTone;
  nextSectionTone?: SectionTone;
};

export default function FAQSection({
  sectionIndex = 1,
  tone = "white",
  mintVariant = "subtle",
  previousTone,
  nextSectionTone,
}: FAQSectionProps) {
  const onGreen = isGreenBandSurface(tone, mintVariant);
  const [openQuestion, setOpenQuestion] = useState<string | null>(FAQS[0]?.question ?? null);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return FAQS;
    const q = query.toLowerCase();
    return FAQS.filter(
      (f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <PageSection
      index={sectionIndex}
      maxWidth="7xl"
      ambient={onGreen ? "timeline" : undefined}
      tone={tone}
      mintVariant={mintVariant}
      previousTone={previousTone}
      nextSectionTone={nextSectionTone}
      py={
        !onGreen && previousTone === "dark-green"
          ? PAGE_SECTION_PY_AFTER_DARK
          : PAGE_SECTION_PY
      }
    >
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
        <Reveal>
          <aside className="lg:pt-6">
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "h-px w-10",
                  onGreen ? "bg-malachite" : "bg-malachite-700",
                )}
                aria-hidden
              />
              <span
                className={cn(
                  "label-tech",
                  onGreen ? "text-malachite" : "text-malachite-700",
                )}
              >
                FAQ
              </span>
            </div>
            <h2
              className={cn(
                "mt-5 text-4xl font-semibold leading-[1.02] tracking-normal sm:text-5xl lg:text-6xl",
                onGreen ? "text-white" : "text-swamp",
              )}
            >
              Frequently asked questions
            </h2>
            <p
              className={cn(
                "mt-5 max-w-xl text-base leading-8 sm:text-lg",
                onGreen ? "text-white/72" : "text-swamp/62",
              )}
            >
              Got a question? If you have others, feel free to contact us.
            </p>

            <div
              className={cn(
                "mt-8 inline-flex items-center gap-3 rounded-2xl border px-4 py-3",
                onGreen
                  ? "border-white/15 bg-white/10 text-white/80"
                  : "border-swamp/10 bg-bone-50/80 text-swamp/75",
              )}
            >
              <span className="text-2xl font-semibold leading-none">{FAQS.length}</span>
              <span className="text-sm leading-tight">
                curated answers from our team
              </span>
            </div>
          </aside>
        </Reveal>

        <div
          className={cn(
            "overflow-hidden rounded-3xl border shadow-[0_14px_32px_-24px_rgba(0,30,28,0.3)]",
            onGreen
              ? "border-white/12 bg-white/[0.06] backdrop-blur-sm"
              : "border-swamp/10 bg-white",
          )}
        >
          {!onGreen && (
            <div
              aria-hidden
              className="h-1 bg-gradient-to-r from-malachite via-spring to-malachite/20"
            />
          )}

          <div
            className={cn(
              "relative p-5 sm:p-6",
              onGreen ? "border-b border-white/10" : "border-b border-swamp/8",
            )}
          >
            <Search
              className={cn(
                "absolute left-8 top-1/2 h-4 w-4 -translate-y-1/2 sm:left-9",
                onGreen ? "text-white/45" : "text-swamp/35",
              )}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search frequently asked questions"
              placeholder="Search questions..."
              className={cn(
                "w-full rounded-xl border py-3.5 pl-10 pr-20 text-base focus:outline-none focus:ring-2 focus:ring-malachite/25",
                onGreen
                  ? "border-white/15 bg-white/10 text-white placeholder:text-white/40"
                  : "border-swamp/10 bg-white text-swamp placeholder:text-swamp/35",
              )}
            />
            <span
              className={cn(
                "pointer-events-none absolute right-8 top-1/2 -translate-y-1/2 text-[10px] font-medium uppercase tracking-[0.18em]",
                onGreen ? "text-white/40" : "text-swamp/30",
              )}
            >
              Search
            </span>
          </div>

          <div className="space-y-3 p-5 sm:space-y-4 sm:p-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((faq, index) => {
                const isOpen = openQuestion === faq.question;
                const answerId = `faq-answer-${index}`;
                return (
                  <Reveal key={faq.question} delay={index * 0.06}>
                    <div
                      className={cn(
                        "overflow-hidden rounded-2xl border transition-all",
                        onGreen
                          ? isOpen
                            ? "border-white/24 bg-white/12"
                            : "border-white/12 bg-white/6"
                          : isOpen
                            ? "border-malachite/35 bg-white shadow-[0_8px_22px_-14px_rgba(0,30,28,0.26)]"
                            : "border-swamp/10 bg-white shadow-[0_1px_2px_rgba(0,30,28,0.05)]",
                      )}
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={answerId}
                        className="flex w-full items-center justify-between gap-4 p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-malachite/45 sm:p-6"
                        onClick={() => setOpenQuestion(isOpen ? null : faq.question)}
                      >
                        <div className="flex min-w-0 items-start gap-3">
                          <span
                            className={cn(
                              "font-mono text-[11px] font-medium tracking-[0.18em]",
                              onGreen ? "text-malachite/90" : "text-malachite-700",
                            )}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={cn(
                              "text-[1.05rem] font-semibold leading-snug sm:text-xl",
                              onGreen ? "text-white" : "text-swamp",
                            )}
                          >
                            {faq.question}
                          </span>
                        </div>
                        <ChevronDown
                          className={cn(
                            "h-5 w-5 shrink-0 transition-transform duration-300",
                            isOpen && "rotate-180",
                            onGreen ? "text-white/55" : "text-swamp/45",
                          )}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={answerId}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28, ease: "easeInOut" }}
                          >
                            <div
                              className={cn(
                                "border-t px-5 pb-5 text-[0.98rem] leading-8 sm:px-6 sm:pb-6",
                                onGreen
                                  ? "border-white/10 text-white/78"
                                  : "border-swamp/10 text-swamp/72",
                              )}
                            >
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Reveal>
                );
              })}
            </AnimatePresence>

            {filtered.length === 0 && (
              <div
                className={cn(
                  "py-8 text-center text-sm",
                  onGreen ? "text-white/50" : "text-swamp/50",
                )}
              >
                {`No questions found matching "${query}"`}
              </div>
            )}
            {filtered.length > 0 && (
              <div
                className={cn(
                  "pt-1 text-right text-xs font-medium uppercase tracking-[0.16em]",
                  onGreen ? "text-white/45" : "text-swamp/35",
                )}
              >
                Need something specific? <a className="text-malachite hover:underline" href="/contact">Contact us</a> <ArrowUpRight className="mb-px inline h-3 w-3" />
              </div>
            )}
          </div>
        </div>
      </div>
    </PageSection>
  );
}
