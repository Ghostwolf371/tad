"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { getProjectPreview } from "@/lib/projects/thumbnails";
import { surfaceCardInteractiveClassName } from "@/lib/theme/surfaces";
import { cn } from "@/lib/utils";

function NavCard({
  project,
  direction,
}: {
  project: Project;
  direction: "prev" | "next";
}) {
  const preview = getProjectPreview(project);
  const isPrev = direction === "prev";

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className={cn(
        surfaceCardInteractiveClassName("group flex flex-1 flex-col overflow-hidden sm:flex-row"),
        !isPrev && "sm:flex-row-reverse",
      )}
    >
      <div
        className="relative h-28 w-full shrink-0 sm:h-auto sm:w-36"
        style={
          preview.kind === "brand"
            ? {
                background: `linear-gradient(135deg, ${preview.palette.primary}, ${preview.palette.secondary})`,
              }
            : undefined
        }
      >
        {preview.kind === "screenshot" ? (
          <Image
            src={preview.src}
            alt=""
            fill
            className="object-cover object-top"
            sizes="144px"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="relative h-12 w-20">
              <Image src={preview.src} alt="" fill className="object-contain" sizes="80px" />
            </div>
          </div>
        )}
      </div>
      <div className={cn("flex flex-1 flex-col justify-center p-5", isPrev ? "sm:pl-6" : "sm:pr-6 sm:text-right")}>
        <span className="label-tech inline-flex items-center gap-1 text-malachite-700">
          {isPrev ? (
            <>
              <ArrowLeft className="h-3 w-3" /> Previous
            </>
          ) : (
            <>
              Next <ArrowRight className="h-3 w-3" />
            </>
          )}
        </span>
        <span className="mt-2 font-semibold text-swamp transition group-hover:text-malachite-700">
          {project.title}
        </span>
        <span className="mt-1 line-clamp-1 text-xs text-swamp/55">{project.heading}</span>
      </div>
    </Link>
  );
}

type ProjectDetailNavProps = {
  prev: Project | null;
  next: Project | null;
};

export default function ProjectDetailNav({ prev, next }: ProjectDetailNavProps) {
  if (!prev && !next) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {prev ? <NavCard project={prev} direction="prev" /> : <div className="hidden sm:block" />}
      {next ? <NavCard project={next} direction="next" /> : null}
    </div>
  );
}
