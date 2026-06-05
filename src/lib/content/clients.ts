/** Client logos — PNGs in public/clients, SVGs in public/clients/icons */
export type ClientLogo = {
  name: string;
  slug: string;
  /** Full wordmark (HQ PNG) for marquee / large display */
  src: string;
  /** Default compact mark for pills */
  mark: string;
  /** SVG in public/clients/icons (reference) */
  icon: string;
  /** Aspect ratio width / height for layout hints */
  aspect?: number;
  /** Force the icon to be fully rounded (marquee) */
  round?: boolean;
    /** Pill badge overrides — use trimmed *-pill.webp marks */
  pill?: {
    mark?: string;
    darkBg?: boolean;
    /** Light logo on dark badge */
    invert?: boolean;
  };
};

const WIDE = 852 / 540;
const SMART = 1920 / 1080;

function clientIcon(slug: string) {
  return `/clients/icons/${slug}.svg`;
}

export const clientLogos: readonly ClientLogo[] = [
  {
    name: "Heineken",
    slug: "heineken",
    src: "/clients/heineken-hq.webp",
    mark: "/clients/heineken-mark.svg",
    icon: clientIcon("heineken"),
    aspect: 1,
  },
  {
    name: "Parbo Bier",
    slug: "parbo-bier",
    src: "/clients/parbo-hq.webp",
    mark: "/clients/parbo.webp",
    icon: clientIcon("parbo-bier"),
    aspect: WIDE,
  },
  {
    name: "Telesur",
    slug: "telesur",
    src: "/clients/telesur-hq.webp",
    mark: "/clients/telesur.webp",
    icon: clientIcon("telesur"),
    aspect: WIDE,
  },
  {
    name: "King's Enterprises",
    slug: "kings-enterprises",
    src: "/clients/kings-crown.webp",
    mark: "/clients/kings-crown.webp",
    icon: clientIcon("kings-enterprises"),
    aspect: 1,
    pill: {
      mark: "/clients/kings-crown.webp",
    },
  },
  {
    name: "Smart Connexxionz",
    slug: "smart-connexxionz",
    src: "/clients/smart-hq.webp",
    mark: "/clients/smart-connexxionz.webp",
    icon: clientIcon("smart-connexxionz"),
    aspect: SMART,
  },
  {
    name: "Fernandes Group",
    slug: "fernandes",
    src: "/clients/fernandes-hq.webp",
    mark: "/clients/fernandes-pill.webp",
    icon: clientIcon("fernandes"),
    aspect: 1,
  },
  {
    name: "Trustbank Amanah",
    slug: "trustbank-amanah",
    src: "/clients/trustbank-hq.webp",
    mark: "/clients/trustbank-mark.svg",
    icon: clientIcon("trustbank-amanah"),
    aspect: WIDE,
    pill: {
      mark: "/clients/trustbank-mark.svg",
    },
  },
  {
    name: "All Star",
    slug: "all-star",
    src: "/clients/all-star-mark.svg",
    mark: "/clients/all-star-mark.svg",
    icon: clientIcon("all-star"),
    aspect: 215.72 / 295.31,
    pill: {
      mark: "/clients/all-star-mark.svg",
    },
  },
  {
    name: "Digital World",
    slug: "digital-world",
    src: "/clients/digital-world-hq.webp",
    mark: "/clients/digital-world.webp",
    icon: clientIcon("digital-world"),
    aspect: WIDE,
  },
  {
    name: "Maze",
    slug: "maze",
    src: "/clients/maze-hq.webp",
    mark: "/clients/maze-mark.svg",
    icon: clientIcon("maze"),
    aspect: WIDE,
    pill: {
      mark: "/clients/maze-mark.svg",
      darkBg: true,
    },
  },
  {
    name: "Queens Hotel",
    slug: "queens-hotel",
    src: "/clients/queens-hq.webp",
    mark: "/clients/queens.webp",
    icon: clientIcon("queens-hotel"),
    aspect: WIDE,
  },
  {
    name: "Chuck E. Cheese",
    slug: "chuck-e-cheese",
    src: "/clients/chuck-hq.webp",
    mark: "/clients/chuck-e-cheese.webp",
    icon: clientIcon("chuck-e-cheese"),
    aspect: WIDE,
    round: true,
  },
];
