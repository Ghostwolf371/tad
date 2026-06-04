"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import ProjectCardPreview from "@/components/portfolio/ProjectCardPreview";
import { surfaceCardClassName } from "@/lib/theme/surfaces";
import { cn } from "@/lib/utils";

function projectHoverStyle(palette: Project["palette"]): CSSProperties {
  const { primary } = palette;
  return {
    "--project-primary": primary,
    "--project-glow": `color-mix(in srgb, ${primary} 42%, transparent)`,
    "--project-glow-soft": `color-mix(in srgb, ${primary} 24%, transparent)`,
    "--project-border": `color-mix(in srgb, ${primary} 55%, transparent)`,
  } as CSSProperties;
}

export default function ProjectCard({ project }: { project: Project }) {
  const hoverStyle = projectHoverStyle(project.palette);

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      style={hoverStyle}
      className={cn(
        surfaceCardClassName("group block overflow-hidden"),
        "transition-[border-color,box-shadow,transform] duration-300 ease-out",
        "hover:-translate-y-0.5",
        "hover:border-[var(--project-border)]",
        "hover:shadow-[0_22px_48px_var(--project-glow),0_0_40px_var(--project-glow-soft)]",
      )}
    >
      <div
        className="relative p-3 pb-0 sm:p-4 sm:pb-0"
        style={{
          background: `linear-gradient(180deg, ${project.palette.primary}22 0%, transparent 72%)`,
        }}
      >
        <div className="mb-3 flex items-center justify-between gap-2 px-0.5">
          <span
            className="h-2 w-2 shrink-0 rounded-full"
            style={{ backgroundColor: project.palette.primary }}
            aria-hidden
          />
          <span className="truncate font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-swamp/45">
            {project.heading}
          </span>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-swamp/25 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--project-primary)]" />
        </div>
        <ProjectCardPreview project={project} />
      </div>

      <div className="p-5 sm:p-6">
        <h3 className="text-lg font-semibold leading-snug tracking-normal text-swamp transition-colors group-hover:text-[var(--project-primary)]">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-swamp/65">
          {project.descr}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-swamp/10 bg-bone-50/80 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-normal text-swamp/55"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
