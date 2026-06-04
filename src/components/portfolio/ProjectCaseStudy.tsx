"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { Project } from "@/data/projects";
import { greenBandPanelCardClassName } from "@/lib/theme/green-band-surfaces";
import { cn } from "@/lib/utils";

function CaseBlock({
  label,
  content,
  index,
  featured,
}: {
  label: string;
  content: string;
  index: number;
  featured?: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className={greenBandPanelCardClassName("h-full sm:p-7", { featured })}
    >
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-malachite" aria-hidden />
        <span className="label-tech-on-dark text-white/70">{label}</span>
      </div>
      <p className="mt-5 flex-1 text-sm leading-relaxed text-white/78 sm:text-base">
        {content}
      </p>
    </motion.article>
  );
}

export default function ProjectCaseStudy({ project }: { project: Project }) {
  const cs = project.caseStudy;
  if (!cs) return null;

  const sections = [
    { label: "Overview", content: cs.overview, featured: true },
    { label: "Challenge", content: cs.challenge },
    { label: "Solution", content: cs.solution },
  ];

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-3 lg:gap-5">
        {sections.map((section, i) => (
          <CaseBlock
            key={section.label}
            label={section.label}
            content={section.content}
            index={i}
            featured={section.featured}
          />
        ))}
      </div>

      {cs.results.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className={greenBandPanelCardClassName("sm:p-7")}
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-malachite" aria-hidden />
            <span className="label-tech-on-dark text-white/70">Results</span>
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {cs.results.map((result, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/6 px-4 py-3"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-malachite/20 text-malachite">
                  <Check className="h-3 w-3" strokeWidth={2.5} />
                </span>
                <span className="text-sm leading-relaxed text-white/78">{result}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
}
