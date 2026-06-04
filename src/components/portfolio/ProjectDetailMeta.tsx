"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";
import { PORTFOLIO_CATEGORY_LABELS } from "@/data/projects";
import { formatProjectUrl } from "@/lib/projects/thumbnails";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type ProjectDetailMetaProps = {
  project: Project;
  className?: string;
};

export default function ProjectDetailMeta({
  project,
  className,
}: ProjectDetailMetaProps) {
  const siteUrl = formatProjectUrl(project.link);
  const hasLiveSite = project.link !== "#";

  return (
    <div className={cn("flex flex-col", className)}>
      <Link
        href="/portfolio"
        className="label-tech inline-flex w-fit items-center gap-1.5 text-malachite-700 transition hover:text-swamp"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        All projects
      </Link>

      <div className="mt-8 flex items-center gap-3">
        <span
          className="h-3 w-3 shrink-0 rounded-full ring-2 ring-white ring-offset-2 ring-offset-transparent"
          style={{ backgroundColor: project.palette.primary }}
          aria-hidden
        />
        <span className="label-tech text-malachite-700">
          {PORTFOLIO_CATEGORY_LABELS[project.portfolioCategory]}
        </span>
      </div>

      <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-normal text-swamp sm:text-3xl">
        {project.title}
      </h2>
      <p className="mt-2 font-mono text-xs font-medium uppercase tracking-[0.18em] text-swamp/45">
        {project.heading}
      </p>

      <p className="mt-6 text-sm leading-relaxed text-swamp/75 sm:text-base">
        {project.descr}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-swamp/10 bg-bone-50/80 px-3 py-1 text-[10px] font-medium uppercase tracking-normal text-swamp/60"
          >
            {tag}
          </span>
        ))}
      </div>

      {hasLiveSite && (
        <p className="mt-6 font-mono text-xs text-swamp/45">{siteUrl}</p>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
        {hasLiveSite && (
          <ButtonLink
            href={project.link}
            size="lg"
            variant="primary"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto lg:w-full"
          >
            Visit website <ExternalLink className="h-4 w-4" />
          </ButtonLink>
        )}
        <ButtonLink
          href="/contact"
          size="lg"
          variant="outline"
          className="w-full sm:w-auto lg:w-full"
        >
          Start a similar project
        </ButtonLink>
      </div>
    </div>
  );
}
