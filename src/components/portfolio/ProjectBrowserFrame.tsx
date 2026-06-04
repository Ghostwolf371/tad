"use client";

import Image from "next/image";
import { Lock } from "lucide-react";
import type { Project } from "@/data/projects";
import {
  formatProjectUrl,
  getProjectPreview,
} from "@/lib/projects/thumbnails";
import { cn } from "@/lib/utils";

type ProjectBrowserFrameProps = {
  project: Project;
  className?: string;
  aspectClassName?: string;
  /** How homepage screenshots fill the frame — cards use contain to show more of the capture. */
  screenshotFit?: "cover" | "contain";
  priority?: boolean;
  interactive?: boolean;
};

export default function ProjectBrowserFrame({
  project,
  className = "",
  aspectClassName = "aspect-[4/3]",
  screenshotFit = "cover",
  priority = false,
  interactive = false,
}: ProjectBrowserFrameProps) {
  const preview = getProjectPreview(project);
  const siteUrl = formatProjectUrl(project.link);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-swamp/10 bg-white shadow-[0_1px_0_rgba(0,30,28,0.06)]",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-swamp/[0.08] bg-[#eceeed] px-3 py-2.5 sm:px-4">
        <div className="flex shrink-0 gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57] sm:h-3 sm:w-3" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e] sm:h-3 sm:w-3" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840] sm:h-3 sm:w-3" />
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-full border border-swamp/10 bg-white px-2.5 py-1 sm:px-3">
          <Lock className="h-2.5 w-2.5 shrink-0 text-swamp/30" />
          <span className="truncate font-mono text-[10px] text-swamp/55 sm:text-[11px]">
            {siteUrl}
          </span>
        </div>
      </div>

      <div className={cn("relative overflow-hidden bg-bone-50", aspectClassName)}>
        {preview.kind === "screenshot" ? (
          <Image
            src={preview.src}
            alt={project.title}
            fill
            priority={priority}
            sizes="(max-width: 1024px) 100vw, 900px"
            className={cn(
              screenshotFit === "contain"
                ? "object-contain object-top"
                : "object-cover object-top",
              interactive && screenshotFit === "cover" && "transition duration-500 group-hover:scale-[1.02]",
              interactive && screenshotFit === "contain" && "transition duration-500 group-hover:scale-[1.01]",
            )}
          />
        ) : (
          <>
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background: `linear-gradient(145deg, ${preview.palette.primary}, ${preview.palette.secondary})`,
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center p-10 sm:p-14">
              <div className="relative h-[45%] w-[75%] drop-shadow-[0_16px_40px_rgba(0,30,28,0.2)]">
                <Image
                  src={preview.src}
                  alt=""
                  fill
                  className="object-contain"
                  sizes="400px"
                />
              </div>
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,30,28,0.14),transparent_50%)]"
            />
          </>
        )}
      </div>
    </div>
  );
}
