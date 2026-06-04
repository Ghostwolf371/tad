"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Send } from "lucide-react";
import PageSection from "@/components/layout/PageSection";
import { careersPageContent } from "@/lib/content/careers-page";
import { PAGE_SECTION_PY } from "@/lib/theme/section-spacing";
import { ButtonLink } from "@/components/ui/Button";
import { surfaceCardClassName } from "@/lib/theme/surfaces";
import { cn } from "@/lib/utils";

type VacatureApplyBandProps = {
  sectionIndex?: number;
};

export default function VacatureApplyBand({ sectionIndex = 2 }: VacatureApplyBandProps) {
  const { applyBand } = careersPageContent;
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handlePoolSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes("@")) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <PageSection
      index={sectionIndex}
      tone="white"
      previousTone="dark-green"
      py={PAGE_SECTION_PY}
      backgroundClassName="bg-[#FEFEFE]"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          surfaceCardClassName(),
          "relative mx-auto max-w-2xl overflow-hidden px-6 py-10 text-center sm:px-10 sm:py-12",
        )}
      >
        <p className="label-tech text-malachite-700">{applyBand.eyebrow}</p>
        <h2 className="mt-4 text-2xl font-semibold leading-tight text-swamp sm:text-3xl">
          {applyBand.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-swamp/70 sm:text-base">
          {applyBand.description}
        </p>

        <div className="mx-auto mt-8 max-w-md">
          {submitted ? (
            <p className="rounded-xl border border-malachite/25 bg-malachite/[0.06] px-5 py-4 text-sm text-swamp/80">
              Thanks — we&apos;ll reach out when a role opens.
            </p>
          ) : (
            <form onSubmit={handlePoolSubmit} className="relative">
              <div className="flex items-center rounded-xl border border-swamp/12 bg-bone-50/80 px-4 py-3 focus-within:border-malachite/40 focus-within:ring-2 focus-within:ring-malachite/15">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email for our talent pool"
                  className="flex-1 bg-transparent text-sm text-swamp placeholder:text-swamp/40 outline-none"
                  required
                />
                <button
                  type="submit"
                  className="ml-2 rounded-lg bg-malachite p-2 text-swamp transition hover:bg-spring"
                  aria-label="Submit email"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <ButtonLink
            href="mailto:info@tad.sr?subject=Open%20application%20%E2%80%94%20TAD"
            size="lg"
            variant="primary"
          >
            Email your CV <Mail className="h-4 w-4" />
          </ButtonLink>
          <ButtonLink href="/contact" size="lg" variant="outline">
            Get in touch <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>
      </motion.div>
    </PageSection>
  );
}
