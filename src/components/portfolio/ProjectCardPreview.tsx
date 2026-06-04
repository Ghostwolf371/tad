"use client";

import type { Project } from "@/data/projects";
import ProjectBrowserFrame from "@/components/portfolio/ProjectBrowserFrame";

type ProjectCardPreviewProps = {
  project: Project;
  className?: string;
};

export default function ProjectCardPreview({
  project,
  className = "",
}: ProjectCardPreviewProps) {
  return (
    <ProjectBrowserFrame
      project={project}
      className={className}
      aspectClassName="aspect-[16/10] sm:aspect-[16/9]"
      screenshotFit="contain"
      interactive
    />
  );
}
