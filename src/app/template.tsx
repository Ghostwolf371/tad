"use client";

import { motion, useReducedMotion } from "framer-motion";

// Module-level flag: true on the very first render (full page load), false for
// every client-side navigation afterwards. App Router re-mounts this template on
// each navigation, so we use it to skip the curtain on first load (it would
// otherwise clash with the launch screen).
let firstRender = true;

export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const skip = firstRender || reduce;
  firstRender = false;

  return (
    <>
      {children}
      {!skip && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[150] bg-canvas-green"
          initial={{ y: 0 }}
          animate={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        />
      )}
    </>
  );
}
