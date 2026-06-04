"use client";

import { animate, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

type Props = {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
  slotMachine?: boolean;
};

export default function Counter({ to, suffix = "", duration = 2, className, slotMachine = false }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.floor(v).toLocaleString());

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration, ease: [0.22, 1, 0.36, 1] });
      return () => controls.stop();
    }
  }, [inView, to, duration, count]);

  if (slotMachine && inView) {
    const digits = to.toString().split("");
    return (
      <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
        <span className="inline-flex overflow-hidden h-[1em] leading-none">
          {digits.map((digit, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {digit}
            </motion.span>
          ))}
        </span>
        {suffix}
      </span>
    );
  }

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
