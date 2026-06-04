/** Total delivered count shown in stats (marketing figure). */
export const PORTFOLIO_DELIVERED_COUNT = "150+";

export const portfolioPageContent = {
  hero: {
    eyebrow: "Portfolio",
    titleLines: ["Featured projects", "we ship."] as const,
    titleGradientLine: 1,
    subtitle:
      "E-commerce, web, mobile, fintech, and hospitality — a sample of what we have delivered for clients in Suriname and beyond.",
  },
  stats: {
    deliveredLabel: "Delivered",
    deliveredHint: "Projects shipped across sectors",
    mixTitle: "Portfolio mix",
    mixSubtitle: "Where client work clusters",
    mixDescription:
      "Sector share across our featured case studies — part of 150+ projects delivered for operators in Suriname and beyond.",
  },
} as const;
