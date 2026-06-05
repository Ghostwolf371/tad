/** Subtle section mint — keep in sync with --color-section-mint in globals.css */
export const SECTION_MINT = "#f4f7f6";

/** Saturated section green — keep in sync with --color-section-green in globals.css */
export const SECTION_GREEN = "#001715";

/** Dark accent band — keep in sync with --color-section-dark-green in globals.css */
export const SECTION_DARK_GREEN = "#001715";

/** Brand malachite (#00e357) glow for ambient orbs */
export const HERO_GREEN_RADIAL =
  "radial-gradient(circle, rgba(0, 227, 87, 0.08) 0%, transparent 70%)";

export const HERO_MALACHITE_BLUR_CLASS = "bg-malachite/10 blur-[130px]";

/** Tailwind gradient `from-*` classes for section edge fades */
export const SECTION_EDGE_FROM_CLASS = {
  white: "from-white",
  bone: "from-bone-50",
  "light-green": "from-section-mint",
  "dark-green": "from-canvas-green",
} as const;
