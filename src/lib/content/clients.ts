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
    /** Pill badge overrides — use trimmed *-pill.png marks */
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
    src: "/clients/heineken-hq.png",
    mark: "/clients/heineken-mark.svg",
    icon: clientIcon("heineken"),
    aspect: 1,
  },
  {
    name: "Parbo Bier",
    slug: "parbo-bier",
    src: "/clients/parbo-hq.png",
    mark: "/clients/parbo.png",
    icon: clientIcon("parbo-bier"),
    aspect: WIDE,
  },
  {
    name: "Telesur",
    slug: "telesur",
    src: "/clients/telesur-hq.png",
    mark: "/clients/telesur.png",
    icon: clientIcon("telesur"),
    aspect: WIDE,
  },
  {
    name: "King's Enterprises",
    slug: "kings-enterprises",
    src: "/clients/kings-crown.png",
    mark: "/clients/kings-crown.png",
    icon: clientIcon("kings-enterprises"),
    aspect: 1,
    pill: {
      mark: "/clients/kings-crown.png",
    },
  },
  {
    name: "Smart Connexxionz",
    slug: "smart-connexxionz",
    src: "/clients/smart-hq.png",
    mark: "/clients/smart-connexxionz.png",
    icon: clientIcon("smart-connexxionz"),
    aspect: SMART,
  },
  {
    name: "Fernandes",
    slug: "fernandes",
    src: "/clients/fernandes-hq.png",
    mark: "/clients/fernandes-pill.png",
    icon: clientIcon("fernandes"),
    aspect: 1,
  },
  {
    name: "Trustbank Amanah",
    slug: "trustbank-amanah",
    src: "/clients/trustbank-hq.png",
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
    src: "/clients/digital-world-hq.png",
    mark: "/clients/digital-world.png",
    icon: clientIcon("digital-world"),
    aspect: WIDE,
  },
  {
    name: "Maze",
    slug: "maze",
    src: "/clients/maze-hq.png",
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
    src: "/clients/queens-hq.png",
    mark: "/clients/queens.png",
    icon: clientIcon("queens-hotel"),
    aspect: WIDE,
  },
  {
    name: "Chuck E. Cheese",
    slug: "chuck-e-cheese",
    src: "/clients/chuck-hq.png",
    mark: "/clients/chuck-e-cheese.png",
    icon: clientIcon("chuck-e-cheese"),
    aspect: WIDE,
    round: true,
  },
];
