"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode } from "react";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  /** Animation duration in seconds */
  duration?: number;
  y?: number;
  scale?: number;
  blur?: boolean;
  mask?: boolean;
  staggerChildren?: boolean;
  children: ReactNode;
};

export default function Reveal({
  delay = 0,
  duration = 0.85,
  y = 16,
  scale = 1,
  blur = false,
  mask = false,
  staggerChildren = false,
  children,
  ...rest
}: RevealProps) {
  const initial: Record<string, number | string> = {
    opacity: 0,
    y,
  };
  const animate: Record<string, number | string> = {
    opacity: 1,
    y: 0,
  };

  if (scale !== 1) {
    initial.scale = scale;
    animate.scale = 1;
  }

  if (blur) {
    initial.filter = "blur(4px)";
    animate.filter = "blur(0px)";
  }

  if (mask) {
    initial.clipPath = "inset(0 100% 0 0)";
    animate.clipPath = "inset(0 0% 0 0)";
  }

  if (staggerChildren) {
    return (
      <motion.div
        variants={{
          hidden: initial,
          visible: {
            ...animate,
            transition: {
              staggerChildren: 0.1,
              delayChildren: delay,
            },
          },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08, margin: "0px 0px -48px 0px" }}
        {...rest}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, amount: 0.08, margin: "0px 0px -48px 0px" }}
      transition={{ duration, ease: [0.22, 1, 0.36, 1], delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
