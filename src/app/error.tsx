"use client";

import { useEffect } from "react";
import { ButtonLink } from "@/components/ui/Button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      console.error("Application error:", error);
    }
  }, [error]);

  return (
    <section className="relative isolate flex min-h-[70vh] items-center justify-center section-hero-tint py-24">
      <div className="relative z-[2] mx-auto max-w-md px-6 text-center">
        <span className="label-tech text-malachite-700">Error</span>
        <h1 className="mt-4 text-3xl font-semibold tracking-normal text-swamp sm:text-4xl">
          Something went wrong
        </h1>
        <p className="mt-4 text-base leading-relaxed text-swamp/75">
          We encountered an unexpected error. Please try again or contact us if the
          problem persists.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center rounded-full border border-swamp/15 bg-white px-6 py-3 text-sm font-medium text-swamp transition hover:border-malachite/30"
          >
            Try again
          </button>
          <ButtonLink href="/contact" variant="primary" size="lg">
            Contact us
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
