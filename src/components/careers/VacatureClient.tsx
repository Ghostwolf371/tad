"use client";

import { useState } from "react";
import Image from "next/image";
import HomeSectionHeader from "@/components/home/HomeSectionHeader";
import { careersContent } from "@/lib/content/careers";
import { Send, ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { surfaceCardClassName } from "@/lib/theme/surfaces";
import { cn } from "@/lib/utils";

const ROLES = ["Engineer", "Designer", "Strategist", "Writer"];

function TalentPool() {
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
    <div className="mx-auto mt-8 max-w-md">
      {submitted ? (
        <p className="rounded-xl border border-malachite/30 bg-malachite-50/80 px-5 py-4 text-sm text-swamp/80">
          Thanks — we&apos;ll reach out when a role opens.
        </p>
      ) : (
        <form onSubmit={handlePoolSubmit} className="relative">
          <div className="flex items-center rounded-xl border border-swamp/10 bg-bone-50/80 px-4 py-3 shadow-sm focus-within:border-malachite/35 focus-within:ring-2 focus-within:ring-malachite/20">
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
  );
}

/** Intro block — used inside white PageSection */
export function VacatureIntro() {
  return (
    <>
      <p className="text-center text-sm text-swamp/65">
        We&apos;re often hiring for:{" "}
        <span className="font-medium text-malachite-700">{ROLES.join(" · ")}</span>
      </p>

      <div className="relative mt-10 overflow-hidden rounded-2xl border border-swamp/10 shadow-[0_24px_64px_rgba(0,30,28,0.1)]">
        <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
          <Image
            src="/team/group-3.jpeg"
            alt="TAD team collaboration"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-swamp/75 via-swamp/25 to-transparent"
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
          <p className="max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl">
            {careersContent.culture}
          </p>
        </div>
      </div>
    </>
  );
}

/** Open roles — elevated card on white section */
export function VacatureOpenings() {
  return (
    <div className={cn(surfaceCardClassName(), "overflow-hidden shadow-[0_24px_64px_rgba(0,30,28,0.08)]")}>
      <div
        aria-hidden
        className="h-1 bg-gradient-to-r from-malachite via-spring to-malachite/40"
      />
      <div className="p-6 text-center sm:p-10 lg:p-12">
        <HomeSectionHeader
          variant="light"
          eyebrow="Open roles"
          title={careersContent.openings.title}
          description={careersContent.openings.empty}
          align="center"
          className="mx-auto max-w-2xl"
        />
        <TalentPool />
        <div className="mt-10 flex justify-center">
          <ButtonLink href="/contact" size="lg" variant="primary">
            Get in touch <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}

/** @deprecated — use VacatureCultureSection */
export default function VacatureClient() {
  return (
    <>
      <VacatureIntro />
      <div className="mt-16">
        <VacatureOpenings />
      </div>
    </>
  );
}
