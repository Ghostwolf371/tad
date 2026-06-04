import type { Project } from "@/data/projects";

/** Optional homepage captures in public/projects/screenshots */
const SCREENSHOT_BY_SLUG: Partial<Record<string, string>> = {
  "kings-enterprises": "/projects/screenshots/kings-enterprises-home-v2.jpg",
  "smart-connexxionz": "/projects/screenshots/smart-connexxionz.png",
  "queens-hotel": "/projects/screenshots/queens-hotel-homepage.png",
  "trustbank-amanah": "/projects/screenshots/trustbank-amanah.png",
  "the-coffee-box": "/projects/screenshots/the-coffee-box-home-v3.jpg",
  "devinas-enterprises": "/projects/screenshots/devinas-enterprises-home-v3.jpg",
  "hj-express": "/projects/screenshots/hj-express.png",
  "digital-world": "/projects/screenshots/digital-world.png",
  "elegant-interiors": "/projects/screenshots/elegant-interiors.png",
  "sranan-fowru": "/projects/screenshots/sranan-fowru.png",
  arrowtrade: "/projects/screenshots/arrowtrade.png",
};

export type ProjectPreview =
  | { kind: "screenshot"; src: string }
  | { kind: "brand"; src: string; palette: Project["palette"] };

export function getProjectPreview(project: Project): ProjectPreview {
  const screenshot =
    project.homepageScreenshot ?? SCREENSHOT_BY_SLUG[project.slug];

  if (screenshot) {
    return { kind: "screenshot", src: screenshot };
  }

  return { kind: "brand", src: project.image, palette: project.palette };
}

export function formatProjectUrl(link: string) {
  return link.replace(/^https?:\/\//, "").replace(/\/$/, "");
}
