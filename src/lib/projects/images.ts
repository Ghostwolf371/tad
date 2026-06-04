import type { Project } from "@/data/projects";

/** Homepage featured-work cards (aspect crops differ from portfolio browser frames). */
export function getProjectFeaturedImage(project: Project): string | undefined {
  return project.featuredImage;
}

/** Portfolio grid cards, detail browser frames, and case-study heroes. */
export function getProjectPortfolioScreenshot(project: Project): string | undefined {
  return project.portfolioScreenshot;
}

export function hasProjectFeaturedImage(project: Project) {
  return Boolean(project.featuredImage);
}

export function hasProjectPortfolioScreenshot(project: Project) {
  return Boolean(project.portfolioScreenshot);
}
