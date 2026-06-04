"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Fraction of scroll travel; positive moves slower/up. */
  speed?: number;
  axis?: "y";
  /** Small degrees of settle rotation across scroll. */
  rotate?: number;
  className?: string;
};

export default function Parallax({
  children,
  speed = 0.15,
  axis = "y",
  rotate = 0,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const syncDesktop = () => setIsDesktop(mediaQuery.matches);

    syncDesktop();
    mediaQuery.addEventListener("change", syncDesktop);
    return () => mediaQuery.removeEventListener("change", syncDesktop);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, -speed * 100]);
  const rotateValue = useTransform(scrollYProgress, [0, 1], [rotate, -rotate]);

  const enabled = isDesktop && !reduceMotion;

  // Always attach the ref to the rendered element so useScroll's target is
  // hydrated (a detached target ref makes framer-motion throw). When disabled
  // we simply omit the animated style so it behaves like a plain wrapper.
  return (
    <motion.div
      ref={ref}
      style={
        enabled
          ? axis === "y"
            ? { y, rotate: rotateValue }
            : { rotate: rotateValue }
          : undefined
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}
