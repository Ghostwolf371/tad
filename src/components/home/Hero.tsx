"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";

const WORDS = ["designs", "websites", "apps"];
const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduceMotion = useReducedMotion();

  /** Fade-up entrance (disabled under reduced motion). */
  const enter = (delay: number, y = 22) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.2 },
          transition: { duration: 0.75, ease: EASE, delay },
        };

  const [word, setWord] = useState(WORDS[0]);
  const state = useRef({ index: 0, sub: WORDS[0].length, deleting: false });

  useEffect(() => {
    if (reduceMotion) {
      setWord(WORDS[0]);
      return;
    }
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const s = state.current;
      const full = WORDS[s.index];

      if (!s.deleting) {
        s.sub += 1;
        if (s.sub >= full.length) {
          s.sub = full.length;
          s.deleting = true;
          setWord(full);
          timer = setTimeout(tick, 1400); // pause at full word
          return;
        }
      } else {
        s.sub -= 1;
        if (s.sub <= 0) {
          s.sub = 0;
          s.deleting = false;
          s.index = (s.index + 1) % WORDS.length;
        }
      }
      setWord(WORDS[s.index].slice(0, s.sub));
      timer = setTimeout(tick, s.deleting ? 55 : 110);
    };

    timer = setTimeout(tick, 1400);
    return () => clearTimeout(timer);
  }, [reduceMotion]);

  return (
    <section className="hero-section relative overflow-hidden bg-white text-swamp">
      <div className="mx-auto flex max-w-[90rem] flex-col-reverse items-center gap-8 px-5 pb-8 pt-36 sm:px-6 lg:flex-row lg:items-center lg:gap-8 lg:px-20 lg:pb-10 lg:pt-44">
        {/* Text column */}
        <div className="flex w-full flex-col items-start justify-center lg:w-1/2">
          <motion.p
            {...enter(0.05)}
            className="mb-5 text-sm font-bold uppercase tracking-[0.14em] text-swamp/70 sm:text-base"
          >
            From Now to Next 🚀
          </motion.p>

          <motion.h1
            {...enter(0.15)}
            className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight xl:text-7xl"
          >
            <span className="block">We build</span>
            <span className="block text-malachite">out of the box</span>
            <span className="block">
              {word}
              <span
                aria-hidden
                className="ml-1 inline-block w-[3px] -translate-y-1 align-middle bg-malachite"
                style={{ height: "0.85em", animation: reduceMotion ? "none" : "blink 1s step-end infinite" }}
              />
            </span>
          </motion.h1>

          <motion.div
            {...enter(0.3)}
            className="mt-9 flex w-full items-center gap-3 sm:mt-10 sm:w-auto"
          >
            <ButtonLink
              href="/portfolio"
              variant="outline"
              size="lg"
              className="flex-1 rounded-xl px-3 text-[13px] uppercase tracking-normal sm:flex-none sm:px-7 sm:text-base sm:tracking-wide"
            >
              View our work
            </ButtonLink>
            <ButtonLink
              href="/contact"
              variant="primary"
              size="lg"
              className="flex-1 rounded-xl px-3 text-[13px] uppercase tracking-normal sm:flex-none sm:px-7 sm:text-base sm:tracking-wide"
            >
              Contact us
            </ButtonLink>
          </motion.div>
        </div>

        {/* Illustration column */}
        <motion.div
          {...enter(0.12, 28)}
          className="relative flex w-full items-center justify-center lg:w-1/2"
        >
          <Image
            src="/hero/hero-tad.png"
            alt="The TAD team collaborating on digital products"
            width={1920}
            height={1080}
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-auto w-full max-w-[42rem] scale-[1.22] object-contain lg:max-w-none lg:translate-x-[6%] lg:translate-y-8 lg:scale-[1.28] xl:translate-x-[9%] xl:scale-[1.42]"
          />
        </motion.div>
      </div>
    </section>
  );
}
