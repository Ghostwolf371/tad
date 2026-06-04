"use client";

import { motion } from "framer-motion";
import TadWordmark from "@/components/ui/TadWordmark";

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, amount: 0.08, margin: "0px 0px -48px 0px" } as const;

export default function AboutSection() {
  return (
    <section className="relative bg-white pt-2 pb-10 sm:pt-8 sm:pb-20 lg:pt-12 lg:pb-32">
      <div className="relative z-[2] mx-auto flex max-w-[90rem] flex-col items-center gap-10 px-5 sm:px-6 lg:flex-row lg:gap-16 lg:px-20">
        {/* Wordmark */}
        <motion.div
          className="shrink-0"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <div className="text-center lg:text-left">
            <TadWordmark size="hero" />
          </div>
        </motion.div>

        {/* Decorative line + arrow (desktop only) */}
        <motion.div
          className="hidden lg:flex lg:items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.4, ease: EASE, delay: 0.15 }}
          aria-hidden
        >
          <motion.div
            className="flex origin-left items-center"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
          >
            <span className="inline-block h-px w-16 bg-malachite sm:w-24" />
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="-ml-px text-malachite"
            >
              <path
                d="M4 3l6 5-6 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.div>

        {/* Statement */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: 26 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.85, ease: EASE, delay: 0.1 }}
        >
          <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
            <p className="text-lg leading-8 text-swamp/80 sm:text-xl sm:leading-9">
              is a leading software development and service agency with talented
              and motivated people based in Paramaribo, Suriname. We help small,
              medium and large enterprises build a better business.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
