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
    mixTitle: "Sector share",
    mixSubtitle: "Industries we serve",
    mixDescription:
      "Each project is classified by what the client does — not how they sell online. Hover the chart or breakdown to explore sector distribution across featured case studies.",
  },
} as const;
