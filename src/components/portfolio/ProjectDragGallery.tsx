"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function ProjectDragGallery({ images }: { images: string[] }) {
  return (
    <div className="relative">
      <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none">
        {images.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="relative aspect-video w-[85vw] shrink-0 snap-start overflow-hidden rounded-xl border border-swamp/10 shadow-sm sm:w-[60vw] lg:w-[45vw]"
          >
            <Image
              src={src}
              alt={`Project screenshot ${i + 1}`}
              fill
              className="object-cover transition duration-700 hover:scale-105"
              sizes="(max-width: 640px) 85vw, (max-width: 1024px) 60vw, 45vw"
            />
            {/* Gradient edge fade */}
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white/20 to-transparent" />
          </motion.div>
        ))}
      </div>

      {/* Scroll hint dots */}
      {images.length > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {images.map((_, i) => (
            <span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-swamp/20"
              aria-hidden
            />
          ))}
        </div>
      )}
    </div>
  );
}
