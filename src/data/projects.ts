export type PortfolioCategory = "e-commerce" | "website" | "custom-software";

export const PORTFOLIO_CATEGORY_LABELS: Record<PortfolioCategory, string> = {
  "e-commerce": "E-Commerce",
  website: "Website",
  "custom-software": "Custom Software",
};

export type Project = {
  id: number;
  slug: string;
  title: string;
  heading: string;
  descr: string;
  tags: string[];
  /** Primary client vertical — drives portfolio industry chart. */
  industry: string;
  /** Filter group for portfolio grid */
  portfolioCategory: PortfolioCategory;
  link: string;
  image: string;
  /** Homepage featured-work — desktop/tablet (sm+). */
  featuredImage?: string;
  /** Homepage featured-work — mobile (<sm); portrait promos when provided. */
  featuredImageMobile?: string;
  /** Portfolio grid cards, detail browser frames, and case-study heroes. */
  portfolioScreenshot?: string;
  /** Phone mockup for mobile web apps; default is desktop browser chrome. */
  portfolioFrame?: "browser" | "phone";
  /** Full promo composite (logo + devices) — flat 16:9, no extra phone shells. */
  portfolioPresentation?: "device" | "composite";
  /** Extra shots from Webflow portfolio detail pages */
  galleryImages?: string[];
  featured?: boolean;
  palette: { primary: string; secondary: string; text: string };
  caseStudy?: {
    overview: string;
    challenge: string;
    solution: string;
    results: string[];
  };
};

/**
 * Projects without portfolioScreenshot have no live capture — cards fall back to brand SVGs.
 */

function caseFromDescr(descr: string, title: string) {
  return {
    overview: descr,
    challenge: `${title} needed a digital presence that matched their ambition — clearer positioning, faster paths to conversion, and a brand that earns trust at first glance.`,
    solution:
      "TAD partnered on strategy, design, and engineering — shipping a cohesive experience across web, brand, and marketing touchpoints tuned to their audience.",
    results: [
      "Unified brand and product experience",
      "Modern, mobile-ready web platform",
      "Marketing-ready assets and launch support",
    ],
  };
}

type ProjectEntry = Omit<Project, "caseStudy">;

const projectList: ProjectEntry[] = [
  {
    id: 1,
    slug: "kings-enterprises",
    title: "King's Enterprises N.V.",
    heading: "All Hail The King",
    descr:
      "King's Enterprises N.V. is Suriname's largest spirits and duty-free distributor — retail, wholesale, and travel-retail across Suriname, Guyana, and Trinidad, plus cosmetics, tobacco, and luxury goods.",
    tags: ["Website", "E-Commerce", "Distribution"],
    industry: "Distribution & Retail",
    portfolioCategory: "e-commerce",
    link: "https://www.kings.sr",
    image: "/projects/kings-enterprises.svg",
    featuredImage: "/projects/screenshots/kings-enterprises-home-promo.webp",
    featuredImageMobile: "/projects/screenshots/kings-enterprises-home-featured-mobile.webp",
    portfolioScreenshot: "/projects/screenshots/kings-enterprises.webp",
    palette: { primary: "#FEE15B", secondary: "#FFFF92", text: "#171717" },
  },
  {
    id: 2,
    slug: "smart-connexxionz",
    title: "Smart Connexxionz",
    heading: "The Ultimate Gadget Pleasure",
    descr:
      "Smart Connexxionz is a Suriname electronics retailer selling phones, laptops, TVs, and accessories through Paramaribo-area stores and an online shop — with delivery, hire-purchase, and repair services.",
    tags: ["Website", "E-Commerce", "Electronics"],
    industry: "Electronics Retail",
    portfolioCategory: "e-commerce",
    link: "https://www.smartconnexxionz.com/",
    image: "/projects/smart-connexxionz.svg",
    featuredImage: "/projects/screenshots/smart-connexxionz-home-promo.webp",
    featuredImageMobile: "/projects/screenshots/smart-connexxionz-home-featured-mobile.webp",
    portfolioScreenshot: "/projects/screenshots/smart-connexxionz.webp",
    palette: { primary: "#1EB6EC", secondary: "#9BE2FE", text: "#FFFFFF" },
  },
  {
    id: 3,
    slug: "queens-hotel",
    title: "Queens Hotel",
    heading: "The Luxurious Experience",
    descr:
      "Queens Hotel is a centrally located Paramaribo hotel with standard rooms through executive suites, on-site dining, conference facilities, and online booking for stays and packages.",
    tags: ["Website", "Booking", "Hospitality"],
    industry: "Hospitality",
    portfolioCategory: "website",
    link: "https://www.queenshotelsuriname.com",
    image: "/projects/queens-hotel.svg",
    portfolioScreenshot: "/projects/screenshots/queens-hotel-homepage.webp",
    palette: { primary: "#72000A", secondary: "#320005", text: "#FFFFFF" },
  },
  {
    id: 4,
    slug: "trustbank-amanah",
    title: "Trustbank Amanah",
    heading: "Confidence Is The Key",
    descr:
      "Trustbank Amanah's digital onboarding portal lets customers apply online for giro and savings accounts, business accounts, personal loans, mortgages, and SME financing.",
    tags: ["Custom Software", "Digital Onboarding", "Banking"],
    industry: "Banking & Finance",
    portfolioCategory: "custom-software",
    link: "https://mijneaanvraag.trustbankamanah.com",
    image: "/projects/trustbank-amanah.svg",
    featuredImage: "/projects/screenshots/trustbank-amanah-home-featured.webp",
    featuredImageMobile: "/projects/screenshots/trustbank-amanah-home-featured-mobile.webp",
    portfolioScreenshot: "/projects/screenshots/trustbank-amanah.webp",
    featured: true,
    palette: { primary: "#041C2C", secondary: "#B8956B", text: "#FFFFFF" },
  },
  {
    id: 5,
    slug: "the-coffee-box",
    title: "The Coffee Box",
    heading: "Serve Joy With Us",
    descr:
      "The Coffee Box is a Paramaribo grill café and specialty coffee brand serving international kitchen dishes, tapas, and lounge experiences across multiple locations with events and evening programming.",
    tags: ["Website", "Brand", "Food & Beverage"],
    industry: "Food & Beverage",
    portfolioCategory: "website",
    link: "https://www.thecoffeeboxsu.com/",
    image: "/projects/elegant-interiors.svg",
    featuredImage: "/projects/screenshots/the-coffee-box-home-featured.webp",
    featuredImageMobile: "/projects/screenshots/the-coffee-box-home-featured-mobile.webp",
    portfolioScreenshot: "/projects/screenshots/the-coffee-box-home-desktop.webp",
    featured: true,
    palette: { primary: "#1B4332", secondary: "#E8A87C", text: "#FFFFFF" },
  },
  {
    id: 6,
    slug: "devinas-enterprises",
    title: "Devinas Enterprises",
    heading: "Your Total Office",
    descr:
      "Devina's Enterprises is a Paramaribo office supplier selling furniture, machines, paper goods, computers, safes, and telecom equipment through an online catalog — operating since 1994.",
    tags: ["Website", "E-Commerce", "Office Supplies"],
    industry: "Office Supplies",
    portfolioCategory: "e-commerce",
    link: "https://www.nvdevinas.com/",
    image: "/projects/arrowtrade.svg",
    portfolioScreenshot: "/projects/screenshots/devinas-enterprises-home-desktop.webp",
    palette: { primary: "#003B71", secondary: "#E2231A", text: "#FFFFFF" },
  },
  {
    id: 7,
    slug: "hj-express",
    title: "HJ Express",
    heading: "Serving All Generations",
    descr:
      "HJ Express is a Suriname retail and wholesale store for household goods, cleaning products, coffee, cacao, and tea — with competitive pricing and free shipping on wholesale orders.",
    tags: ["Website", "E-Commerce", "Retail"],
    industry: "Retail & Wholesale",
    portfolioCategory: "e-commerce",
    link: "https://www.hjexpress.sr/en",
    image: "/projects/hj-express.svg",
    featuredImage: "/projects/screenshots/hj-express-home-featured.webp",
    featuredImageMobile: "/projects/screenshots/hj-express-home-featured-mobile.webp",
    portfolioScreenshot: "/projects/screenshots/hj-express-home-desktop.webp",
    featured: true,
    palette: { primary: "#1E4A7A", secondary: "#5B9BD5", text: "#FFFFFF" },
  },
  {
    id: 8,
    slug: "digital-world",
    title: "Digital World",
    heading: "Premium Tech For Modern Living",
    descr:
      "Digital World is a Suriname electronics retailer offering audio systems, TVs, smart-home devices, drones, camping gear, and wellness electronics with competitive pricing and customer support.",
    tags: ["Website", "E-Commerce", "Electronics"],
    industry: "Electronics Retail",
    portfolioCategory: "e-commerce",
    link: "https://www.digitalworld.sr/en",
    image: "/projects/digital-world.svg",
    portfolioScreenshot: "/projects/screenshots/digital-world-home-desktop.webp",
    palette: { primary: "#C41E3A", secondary: "#F4A4B0", text: "#FFFFFF" },
  },
  {
    id: 9,
    slug: "elegant-interiors",
    title: "Elegant Interiors N.V.",
    heading: "Spaces That Inspire",
    descr:
      "Elegant Interiors N.V. designs and supplies custom kitchens, bathroom furniture, wall units, walk-in closets, and office furnishings in Suriname with project portfolios and lead capture.",
    tags: ["Website", "Marketing", "Interior Design"],
    industry: "Interior Design",
    portfolioCategory: "website",
    link: "https://www.elegantinteriorsnv.com/",
    image: "/projects/elegant-interiors.svg",
    portfolioScreenshot: "/projects/screenshots/elegant-interiors.webp",
    palette: { primary: "#1C1C1C", secondary: "#C9A961", text: "#FFFFFF" },
  },
  {
    id: 10,
    slug: "sranan-fowru",
    title: "Sranan Fowru",
    heading: "Honest Surinamese Chicken",
    descr:
      "Sranan Fowru is Suriname's market-leading locally raised chicken brand, operating nationwide branches since 1999 with certified food-safety standards, fresh poultry products, and recipes.",
    tags: ["Website", "E-Commerce", "Food & Agriculture"],
    industry: "Food & Agriculture",
    portfolioCategory: "e-commerce",
    link: "https://srananfowru.sr/",
    image: "/projects/sranan-fowru.svg",
    portfolioScreenshot: "/projects/screenshots/sranan-fowru.webp",
    palette: { primary: "#00843D", secondary: "#E2231A", text: "#FFFFFF" },
  },
  {
    id: 11,
    slug: "arrowtrade",
    title: "Arrow Trade N.V.",
    heading: "Quality Delivered Daily",
    descr:
      "Arrow Trade N.V. distributes FMCG and hospitality supplies in Suriname — importing international food, beverage, dairy, frozen, and non-food products for retail and HORECA customers.",
    tags: ["Website", "E-Commerce", "Distribution"],
    industry: "Distribution",
    portfolioCategory: "e-commerce",
    link: "https://arrowtradenv.com/",
    image: "/projects/arrowtrade.svg",
    portfolioScreenshot: "/projects/screenshots/arrowtrade.webp",
    palette: { primary: "#0D9488", secondary: "#99D4CF", text: "#FFFFFF" },
  },
  {
    id: 12,
    slug: "apotheek-mac-donald",
    title: "Apotheek Mac Donald",
    heading: "Your Trusted Healthcare Partner",
    descr:
      "Apotheek Mac Donald is a Paramaribo pharmacy offering prescription handling, pharmaceutical advice, medicine delivery, eyewear, and an in-house API healthcare product line.",
    tags: ["Website", "Marketing", "Healthcare"],
    industry: "Healthcare",
    portfolioCategory: "website",
    link: "https://www.apotheekmacdonald.sr/",
    image: "/projects/helix-earth.svg",
    portfolioScreenshot: "/projects/screenshots/apotheek-mac-donald-home-desktop.webp",
    palette: { primary: "#0B6E4F", secondary: "#7DD3A8", text: "#FFFFFF" },
  },
  {
    id: 13,
    slug: "pan-american-group",
    title: "Pan American Group",
    heading: "Regional Business Leadership",
    descr:
      "Pan American Group is a Suriname holding company spanning automotive sales, real-estate development, and infrastructure engineering — roads, ports, mining, and marine works.",
    tags: ["Website", "Marketing", "Conglomerate"],
    industry: "Automotive & Construction",
    portfolioCategory: "website",
    link: "https://www.panamericangroup.sr/",
    image: "/projects/helix-earth.svg",
    portfolioScreenshot: "/projects/screenshots/pan-american-group-home-desktop.webp",
    palette: { primary: "#1E3A5F", secondary: "#C9A227", text: "#FFFFFF" },
  },
  {
    id: 14,
    slug: "health-invest",
    title: "Health Invest",
    heading: "Investing In Better Care",
    descr:
      "Health Investment and Development N.V. invests in and develops healthcare businesses in Suriname — medical centers, equipment distribution, consultancy, and logistics for the care sector.",
    tags: ["Website", "Marketing", "Healthcare"],
    industry: "Healthcare",
    portfolioCategory: "website",
    link: "https://healthinvest.sr/",
    image: "/projects/helix-earth.svg",
    portfolioScreenshot: "/projects/screenshots/health-invest-home-desktop.webp",
    palette: { primary: "#00695C", secondary: "#4DB6AC", text: "#FFFFFF" },
  },
  {
    id: 15,
    slug: "shasvien-trucks",
    title: "Shasvien Trucks",
    heading: "Heavy-Duty Solutions On The Road",
    descr:
      "Shasvien Trucks and Maintenance Services N.V. (STMS) installs and maintains fuel-station equipment, bulk fuel storage tanks, fuel transport, and bunkering services in Suriname.",
    tags: ["Website", "E-Commerce", "Energy"],
    industry: "Energy & Industrial",
    portfolioCategory: "e-commerce",
    link: "https://stms.sr/",
    image: "/projects/helix-earth.svg",
    portfolioScreenshot: "/projects/screenshots/shasvien-trucks-home-desktop.webp",
    palette: { primary: "#B91C1C", secondary: "#F87171", text: "#FFFFFF" },
  },
  {
    id: 16,
    slug: "troytec",
    title: "Troytec",
    heading: "Engineering That Performs",
    descr:
      "TroyTec is a Guyana-based media production company specializing in videography, photography, drone aerial footage, graphic design, and wide-format printing for events and corporate clients.",
    tags: ["Website", "Marketing", "Media"],
    industry: "Media Production",
    portfolioCategory: "website",
    link: "https://troytecgy.com/",
    image: "/projects/troytec.svg",
    portfolioScreenshot: "/projects/screenshots/troytec-home-desktop.webp",
    palette: { primary: "#1D4ED8", secondary: "#93C5FD", text: "#FFFFFF" },
  },
  {
    id: 17,
    slug: "interdeco",
    title: "Interdeco Kitchens",
    heading: "Kitchens Crafted To Inspire",
    descr:
      "Interdeco Kitchens is a Suriname interior firm offering custom kitchens, bathroom vanities, wardrobes, and full-home design from showroom consultation through installation.",
    tags: ["Website", "Marketing", "Interior Design"],
    industry: "Interior Design",
    portfolioCategory: "website",
    link: "https://interdecokitchens.com/",
    image: "/projects/elegant-interiors.svg",
    portfolioScreenshot: "/projects/screenshots/interdeco-home-desktop.webp",
    palette: { primary: "#292524", secondary: "#D6D3D1", text: "#FFFFFF" },
  },
  {
    id: 18,
    slug: "rashiv",
    title: "Rashiv Vastgoed",
    heading: "Real Estate With Clarity",
    descr:
      "Rashiv Onroerendgoed Mij N.V. has developed housing and land projects across Suriname since 1998 — listing homes, commercial plots, and subdivision projects for sale and brokerage.",
    tags: ["Website", "Marketing", "Real Estate"],
    industry: "Real Estate",
    portfolioCategory: "website",
    link: "https://www.rashivvastgoed.nl/",
    image: "/projects/rashiv.svg",
    portfolioScreenshot: "/projects/screenshots/rashiv-home-desktop.webp",
    palette: { primary: "#128BC0", secondary: "#60D3F7", text: "#FFFFFF" },
  },
  {
    id: 19,
    slug: "unistone",
    title: "Unistone & More",
    heading: "Stone Surfaces That Last",
    descr:
      "Uni Stone & More is a Wanica showroom and online store for ceramic, porcelain, and natural-stone tiles plus building and installation materials with expert project guidance.",
    tags: ["Website", "E-Commerce", "Building Materials"],
    industry: "Building Materials",
    portfolioCategory: "e-commerce",
    link: "https://www.unistoneandmore.com/",
    image: "/projects/suriname-natural-stone.svg",
    portfolioScreenshot: "/projects/screenshots/unistone-home-desktop.webp",
    palette: { primary: "#57534E", secondary: "#A8A29E", text: "#FFFFFF" },
  },
  {
    id: 20,
    slug: "orange-suriname",
    title: "Orange Suriname",
    heading: "Experience Suriname",
    descr:
      "Orange Travel & Jungle Tours offers 55+ Suriname day trips, multi-day tours, car and bike rentals, and custom itineraries covering jungle, cultural, and coastal experiences.",
    tags: ["Website", "Booking", "Travel"],
    industry: "Travel & Tourism",
    portfolioCategory: "website",
    link: "https://www.orangesuriname.com/",
    image: "/projects/helix-earth.svg",
    portfolioScreenshot: "/projects/screenshots/orange-suriname-home-desktop.webp",
    palette: { primary: "#EA580C", secondary: "#FDBA74", text: "#FFFFFF" },
  },
  {
    id: 21,
    slug: "md-pharma",
    title: "MD Pharma Wholesale",
    heading: "Pharmaceutical Supply At Scale",
    descr:
      "MD Pharma Wholesale N.V. distributes certified medicines and pharmaceutical products to healthcare providers across Suriname with secure distribution and professional support.",
    tags: ["Website", "E-Commerce", "Healthcare"],
    industry: "Healthcare",
    portfolioCategory: "e-commerce",
    link: "https://mdpharmawholesale.sr/",
    image: "/projects/helix-earth.svg",
    portfolioScreenshot: "/projects/screenshots/md-pharma-home-desktop.webp",
    palette: { primary: "#0369A1", secondary: "#7DD3FC", text: "#FFFFFF" },
  },
  {
    id: 22,
    slug: "westland-valley",
    title: "Westland Valley",
    heading: "Land With Vision",
    descr:
      "Westland Valley is a fourth-generation Surinamese family farm cultivating organic tomatoes, bell peppers, chili peppers, and cucumbers using modern agricultural techniques.",
    tags: ["Website", "Marketing", "Agriculture"],
    industry: "Agriculture",
    portfolioCategory: "website",
    link: "https://westland-valley.com/",
    image: "/projects/helix-earth.svg",
    portfolioScreenshot: "/projects/screenshots/westland-valley-home-desktop.webp",
    palette: { primary: "#166534", secondary: "#86EFAC", text: "#FFFFFF" },
  },
  {
    id: 23,
    slug: "amaurens-design",
    title: "Amaurens Design",
    heading: "Design That Defines Spaces",
    descr:
      "Amaurens Design is the creative studio of Mirella Amautan in French Guiana — handcrafted art, Tembe-inspired décor, jewelry, carnival costumes, and cultural workshops rooted in Maroon heritage.",
    tags: ["Website", "Marketing", "Arts & Culture"],
    industry: "Arts & Culture",
    portfolioCategory: "website",
    link: "https://amaurensdesign.com/",
    image: "/projects/elegant-interiors.svg",
    portfolioScreenshot: "/projects/screenshots/amaurens-design-home-desktop.webp",
    palette: { primary: "#4C1D95", secondary: "#C4B5FD", text: "#FFFFFF" },
  },
  {
    id: 24,
    slug: "philadelphia-church",
    title: "Philadelphia Church of God",
    heading: "Faith, Community, Purpose",
    descr:
      "Philadelphia Church of God (Seventh Day) is a Christ-centered, Sabbath-keeping congregation in Philadelphia, Pennsylvania — sharing service times, events, youth ministry, and Bible-study resources.",
    tags: ["Website", "Marketing", "Nonprofit"],
    industry: "Nonprofit",
    portfolioCategory: "website",
    link: "https://pcogsd.org/",
    image: "/projects/helix-earth.svg",
    portfolioScreenshot: "/projects/screenshots/philadelphia-church-home-desktop.webp",
    palette: { primary: "#1E40AF", secondary: "#93C5FD", text: "#FFFFFF" },
  },
  {
    id: 25,
    slug: "welink-crm",
    title: "Welink CRM",
    heading: "Real Estate, One Dashboard",
    descr:
      "Welink CRM is a mobile app for WeLink Real Estate agents in Suriname to manage property listings, purchase pipelines, client updates, and field deal tracking.",
    tags: ["Custom Software", "Mobile App", "Real Estate"],
    industry: "Real Estate",
    portfolioCategory: "custom-software",
    link: "#",
    image: "/projects/helix-earth.svg",
    portfolioFrame: "phone",
    portfolioPresentation: "composite",
    portfolioScreenshot: "/projects/screenshots/welink-crm-portfolio.webp",
    palette: { primary: "#E85D26", secondary: "#FDBA74", text: "#171717" },
  },
  {
    id: 26,
    slug: "fitness-pro",
    title: "Fitness Pro",
    heading: "Gym Life In Your Pocket",
    descr:
      "Fitness Pro is a gym management dashboard and member app for Pro-Fitness N.V. in Suriname — membership management, class scheduling, QR check-in, and operational insights.",
    tags: ["Custom Software", "Mobile App", "Fitness"],
    industry: "Fitness & Wellness",
    portfolioCategory: "custom-software",
    link: "https://profitnessnv.sr/",
    image: "/projects/helix-earth.svg",
    portfolioFrame: "phone",
    portfolioPresentation: "composite",
    portfolioScreenshot: "/projects/screenshots/fitness-pro-portfolio.webp",
    palette: { primary: "#DC2626", secondary: "#FCA5A5", text: "#FFFFFF" },
  },
];

export const projects: Project[] = projectList.map((entry) => ({
  ...entry,
  caseStudy: caseFromDescr(entry.descr, entry.title),
}));

export const featuredProjects = projects.filter((p) => p.featured);

export function hasRealScreenshot(project: Project) {
  return Boolean(project.portfolioScreenshot);
}

export function getProjectVisual(project: Project) {
  return project.portfolioScreenshot ?? project.image;
}

export type ProjectPreviewMode = "cover" | "character" | "popout";

const PROJECT_PREVIEW_MODES: Partial<Record<string, ProjectPreviewMode>> = {
  "kings-enterprises": "cover",
  "smart-connexxionz": "character",
  "queens-hotel": "cover",
  "the-coffee-box": "popout",
  "devinas-enterprises": "popout",
};

/** How portfolio imagery should be framed in cards and case studies. */
export function getProjectPreviewMode(project: Project): ProjectPreviewMode {
  const mapped = PROJECT_PREVIEW_MODES[project.slug];
  if (mapped) return mapped;
  if (project.portfolioScreenshot) return "popout";
  return "cover";
}

/** Gallery shots excluding the hero screenshot (no duplicate strips). */
export function getProjectGallery(project: Project): string[] {
  const hero = project.portfolioScreenshot;
  const images = project.galleryImages ?? [];
  const unique = [...new Set(images)];
  if (unique.length <= 1) return [];
  return unique.filter((src) => src !== hero);
}

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: projects[index === 0 ? projects.length - 1 : index - 1],
    next: projects[(index + 1) % projects.length],
  };
}
