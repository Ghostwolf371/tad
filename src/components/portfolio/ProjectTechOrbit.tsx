"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

const COLORS = [
  "border-malachite/30 bg-malachite/5 text-malachite-800",
  "border-swamp/20 bg-swamp/[0.03] text-swamp/80",
  "border-amber-300/40 bg-amber-50/50 text-amber-800",
  "border-sky-300/40 bg-sky-50/50 text-sky-800",
];

export default function ProjectTechOrbit({ items }: { items: string[] }) {
  const tagged = useMemo(
    () => items.map((item, i) => ({ item, color: COLORS[i % COLORS.length] })),
    [items]
  );

  return (
    <div className="relative flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
      {/* Orbital ring visual */}
      <div className="relative hidden h-48 w-48 items-center justify-center sm:flex">
        {/* Ring */}
        <div className="absolute inset-0 rounded-full border border-malachite/10" />
        <div className="absolute inset-[15%] rounded-full border border-malachite/5" />

        {/* Orbiting items */}
        {tagged.map(({ item, color }, i) => {
          const angle = (360 / tagged.length) * i;
          const rad = (angle * Math.PI) / 180;
          const r = 60; // ring radius px
          const x = Math.cos(rad) * r;
          const y = Math.sin(rad) * r;

          return (
            <motion.div
              key={item}
              className="absolute"
              initial={false}
              animate={{
                x: [x, -y, -x, y, x],
                y: [y, x, -y, -x, y],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
                delay: -i * 5,
              }}
              style={{ marginLeft: -36, marginTop: -16 }}
            >
              <span
                className={`inline-block whitespace-nowrap rounded-full border px-4 py-1.5 text-xs font-medium ${color}`}
              >
                {item}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile fallback: simple row */}
      <div className="flex flex-wrap justify-center gap-3 sm:hidden">
        {tagged.map(({ item, color }) => (
          <span
            key={item}
            className={`rounded-full border px-4 py-1.5 text-xs font-medium ${color}`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
