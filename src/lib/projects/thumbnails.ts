import type { Project } from "@/data/projects";
import { getProjectPortfolioScreenshot } from "@/lib/projects/images";

export type ProjectPreview =
  | { kind: "screenshot"; src: string }
  | { kind: "brand"; src: string; palette: Project["palette"] };

export function getProjectPreview(project: Project): ProjectPreview {
  const screenshot = getProjectPortfolioScreenshot(project);

  if (screenshot) {
    return { kind: "screenshot", src: screenshot };
  }

  return { kind: "brand", src: project.image, palette: project.palette };
}

export function formatProjectUrl(link: string) {
  return link.replace(/^https?:\/\//, "").replace(/\/$/, "");
}
