"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.3,
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-[60]">
      <div className="h-[2px] bg-swamp/10 relative">
        <motion.div
          style={{ scaleX }}
          className="absolute inset-0 origin-left bg-gradient-to-r from-malachite via-spring to-malachite"
        />
      </div>
      {/* Section tick marks */}
      <div className="absolute top-0 left-0 right-0 h-[2px] flex justify-between px-[10%]">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-px h-1.5 bg-swamp/20 -mt-px" />
        ))}
      </div>
    </div>
  );
}
