"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Skip the route curtain on the very first page load (clashes with launch screen).
// Must be module-level so it survives template remounts on client navigations.
let isFirstPageLoad = true;

export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  // Always false on SSR + first client render so hydration matches server HTML.
  const [showCurtain, setShowCurtain] = useState(false);

  useEffect(() => {
    if (isFirstPageLoad) {
      isFirstPageLoad = false;
      return;
    }
    if (!reduce) setShowCurtain(true);
    // Run once per template mount — remounts happen on client navigations.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {children}
      {showCurtain && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[150] bg-canvas-green"
          initial={{ y: 0 }}
          animate={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          onAnimationComplete={() => setShowCurtain(false)}
        />
      )}
    </>
  );
}
