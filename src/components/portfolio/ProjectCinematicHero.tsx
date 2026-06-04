"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Project } from "@/data/projects";

export default function ProjectCinematicHero({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  return (
    <div ref={ref} className="relative h-[80vh] min-h-[36rem] w-full overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image
          src={project.image}
          alt={project.heading}
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Overlay gradient */}
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 bg-gradient-to-t from-swamp/80 via-swamp/40 via-60% to-transparent"
      />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 lg:p-16"
      >
        <div className="mx-auto max-w-[90rem]">
          <span className="font-mono text-[10px] uppercase tracking-normal text-malachite-300">
            Featured Project
          </span>
          <h1 className="mt-3 text-4xl font-bold tracking-normal text-white sm:text-5xl lg:text-6xl">
            {project.heading}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
            {project.descr}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
