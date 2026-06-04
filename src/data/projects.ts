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
  /** Filter group for portfolio grid */
  portfolioCategory: PortfolioCategory;
  link: string;
  image: string;
  /** Homepage featured-work crops (different aspect than portfolio browser frames). */
  featuredImage?: string;
  /** Portfolio grid cards, detail browser frames, and case-study heroes. */
  portfolioScreenshot?: string;
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

export const projects: Project[] = [
  {
    id: 1,
    slug: "kings-enterprises",
    title: "King's Enterprises N.V.",
    heading: "All Hail The King",
    descr:
      "King's Enterprises N.V. is Suriname's largest specialist in the field of alcoholic beverages and Duty-Free stores. With their extensive sales network and strategic location, they can offer products to everyone. Their daily activities consist of retail, wholesale, distribution, E-commerce and duty free.",
    tags: ["Website", "Marketing", "E-Commerce"],
    portfolioCategory: "e-commerce",
    link: "https://www.kings.sr",
    image: "/projects/kings-enterprises.svg",
    featuredImage: "/projects/screenshots/kings-enterprises-home-promo.png",
    portfolioScreenshot: "/projects/screenshots/kings-enterprises.png",
    palette: { primary: "#FEE15B", secondary: "#FFFF92", text: "#171717" },
    caseStudy: caseFromDescr(
      "King's Enterprises N.V. is Suriname's largest specialist in the field of alcoholic beverages and Duty-Free stores.",
      "King's Enterprises"
    ),
  },
  {
    id: 2,
    slug: "smart-connexxionz",
    title: "Smart Connexxionz",
    heading: "The Ultimate Gadget Pleasure",
    descr:
      "Smart Connexxionz is the first end-to-end gadgets ecommerce platform in Suriname. It is a smart solution that allows people to discover, try and buy the latest gadgets.",
    tags: ["Website", "Marketing", "E-Commerce"],
    portfolioCategory: "e-commerce",
    link: "https://www.smartconnexxionz.com/",
    image: "/projects/smart-connexxionz.svg",
    featuredImage: "/projects/screenshots/smart-connexxionz-home-promo.png",
    portfolioScreenshot: "/projects/screenshots/smart-connexxionz.png",
    palette: { primary: "#1EB6EC", secondary: "#9BE2FE", text: "#FFFFFF" },
    caseStudy: caseFromDescr(
      "The first end-to-end gadgets ecommerce platform in Suriname.",
      "Smart Connexxionz"
    ),
  },
  {
    id: 3,
    slug: "queens-hotel",
    title: "Queens Hotel",
    heading: "The Luxurious Experience",
    descr:
      "Queens Hotel allows people to create and confirm bookings online effortlessly. This experience upsells potential guests with attractive packages including tickets, tours and activities.",
    tags: ["Website", "Marketing", "Hospitality"],
    portfolioCategory: "website",
    link: "https://www.queenshotelsuriname.com",
    image: "/projects/queens-hotel.svg",
    portfolioScreenshot: "/projects/screenshots/queens-hotel-homepage.png",
    palette: { primary: "#72000A", secondary: "#320005", text: "#FFFFFF" },
    caseStudy: caseFromDescr(
      "Online bookings and upsell packages for tours, tickets, and activities.",
      "Queens Hotel"
    ),
  },
  {
    id: 4,
    slug: "trustbank-amanah",
    title: "Trustbank Amanah",
    heading: "Confidence Is The Key",
    descr:
      "Trustbank Amanah has grown substantially since its inception in 1989. It now provides Islamic banking services, aiming to transform the financial landscape in Suriname, the Caribbean, and Latin America, with aspirations to become a regional financial hub.",
    tags: ["Website", "Marketing", "Fintech"],
    portfolioCategory: "custom-software",
    link: "https://mijneaanvraag.trustbankamanah.com",
    image: "/projects/trustbank-amanah.svg",
    featuredImage: "/projects/screenshots/trustbank-amanah-home-featured.png",
    portfolioScreenshot: "/projects/screenshots/trustbank-amanah.png",
    featured: true,
    palette: { primary: "#041C2C", secondary: "#B8956B", text: "#FFFFFF" },
    caseStudy: caseFromDescr(
      "Islamic banking services transforming the financial landscape in Suriname and beyond.",
      "Trustbank Amanah"
    ),
  },
  {
    id: 5,
    slug: "the-coffee-box",
    title: "The Coffee Box",
    heading: "Serve Joy With Us",
    descr:
      "The Coffee Box is Suriname's premier grill and café — an international kitchen and specialty coffee experience with two Paramaribo locations, event programming, and a brand-forward digital presence.",
    tags: ["Website", "Brand", "Hospitality"],
    portfolioCategory: "website",
    link: "https://www.thecoffeeboxsu.com/",
    image: "/projects/elegant-interiors.svg",
    featuredImage: "/projects/screenshots/the-coffee-box-home-featured.png",
    portfolioScreenshot: "/projects/screenshots/the-coffee-box-home-desktop.png",
    featured: true,
    palette: { primary: "#1B4332", secondary: "#E8A87C", text: "#FFFFFF" },
    caseStudy: caseFromDescr(
      "Grill café and specialty coffee brand with bilingual menus, lounge experiences, and multi-location storytelling.",
      "The Coffee Box"
    ),
  },
  {
    id: 6,
    slug: "devinas-enterprises",
    title: "Devinas Enterprises",
    heading: "Your Total Office",
    descr:
      "Devina's Enterprises is Suriname's full-service office supplier — e-commerce for machines, furniture, supplies, and telecom with category browsing, cart checkout, and bilingual storefront experiences.",
    tags: ["Website", "E-Commerce", "Retail"],
    portfolioCategory: "e-commerce",
    link: "https://www.nvdevinas.com/",
    image: "/projects/arrowtrade.svg",
    portfolioScreenshot: "/projects/screenshots/devinas-enterprises-home-desktop.png",
    palette: { primary: "#003B71", secondary: "#E2231A", text: "#FFFFFF" },
    caseStudy: caseFromDescr(
      "Office supplies and equipment e-commerce with featured products, categories, and account checkout flows.",
      "Devinas Enterprises"
    ),
  },
  {
    id: 7,
    slug: "hj-express",
    title: "HJ Express",
    heading: "Serving All Generations",
    descr:
      "HJ Express is a Suriname retail and wholesale destination for household goods, coffee, cacao, tea, and everyday essentials — with competitive pricing, newsletter updates, and free shipping on wholesale orders.",
    tags: ["Website", "E-Commerce", "Retail"],
    portfolioCategory: "e-commerce",
    link: "https://www.hjexpress.sr/en",
    image: "/projects/hj-express.svg",
    featuredImage: "/projects/screenshots/hj-express-home-featured.png",
    portfolioScreenshot: "/projects/screenshots/hj-express-home-desktop.png",
    featured: true,
    palette: { primary: "#1E4A7A", secondary: "#5B9BD5", text: "#FFFFFF" },
    caseStudy: caseFromDescr(
      "Retail and wholesale e-commerce for household, coffee, and grocery categories across Suriname.",
      "HJ Express"
    ),
  },
  {
    id: 8,
    slug: "digital-world",
    title: "Digital World",
    heading: "Premium Tech For Modern Living",
    descr:
      "Digital World brings premium personal and home technology to Suriname — from audio and smart home to drones, camping gear, and wellness electronics, with unbeatable prices and hands-on customer support.",
    tags: ["Website", "E-Commerce", "Electronics"],
    portfolioCategory: "e-commerce",
    link: "https://www.digitalworld.sr/en",
    image: "/projects/digital-world.svg",
    portfolioScreenshot: "/projects/screenshots/digital-world-home-desktop.png",
    palette: { primary: "#C41E3A", secondary: "#F4A4B0", text: "#FFFFFF" },
    caseStudy: caseFromDescr(
      "Premium consumer electronics and smart-home retail with bilingual storefront and category-led discovery.",
      "Digital World"
    ),
  },
  {
    id: 9,
    slug: "elegant-interiors",
    title: "Elegant Interiors N.V.",
    heading: "Spaces That Inspire",
    descr:
      "Elegant Interiors crafts bespoke kitchens, bathrooms, wall furniture, and office furnishings for Suriname — combining premium materials, portfolio showcases, and lead capture for residential and commercial clients.",
    tags: ["Website", "Marketing", "Interiors"],
    portfolioCategory: "website",
    link: "https://www.elegantinteriorsnv.com/",
    image: "/projects/elegant-interiors.svg",
    portfolioScreenshot: "/projects/screenshots/elegant-interiors.png",
    palette: { primary: "#1C1C1C", secondary: "#C9A961", text: "#FFFFFF" },
    caseStudy: caseFromDescr(
      "Interior solutions brand site with service lines, project gallery, and conversion-focused contact flows.",
      "Elegant Interiors N.V."
    ),
  },
  {
    id: 10,
    slug: "sranan-fowru",
    title: "Sranan Fowru",
    heading: "Honest Surinamese Chicken",
    descr:
      "Sranan Fowru is Suriname's leading locally raised chicken brand — from farm to table with strict food-safety standards, nationwide branches, product catalog, recipes, and a story rooted in local pride since 1999.",
    tags: ["Website", "Marketing", "Food"],
    portfolioCategory: "website",
    link: "https://srananfowru.sr/",
    image: "/projects/sranan-fowru.svg",
    portfolioScreenshot: "/projects/screenshots/sranan-fowru.png",
    palette: { primary: "#00843D", secondary: "#E2231A", text: "#FFFFFF" },
    caseStudy: caseFromDescr(
      "National poultry brand platform highlighting quality, certifications, products, and community recipes.",
      "Sranan Fowru"
    ),
  },
  {
    id: 11,
    slug: "arrowtrade",
    title: "Arrow Trade N.V.",
    heading: "Quality Delivered Daily",
    descr:
      "Arrow Trade N.V. connects international FMCG, hospitality, and food-service suppliers with Suriname and the region — distributing coffee, syrups, frozen goods, dairy, and non-food essentials to retail and HORECA partners.",
    tags: ["Website", "E-Commerce", "Distribution"],
    portfolioCategory: "website",
    link: "https://arrowtradenv.com/",
    image: "/projects/arrowtrade.svg",
    portfolioScreenshot: "/projects/screenshots/arrowtrade.png",
    palette: { primary: "#0D9488", secondary: "#99D4CF", text: "#FFFFFF" },
    caseStudy: caseFromDescr(
      "B2B retail and distribution storefront showcasing brands, popular products, and supplier relationships.",
      "Arrow Trade N.V."
    ),
  },
  {
    id: 12,
    slug: "apotheek-mac-donald",
    title: "Apotheek Mac Donald",
    heading: "Your Trusted Healthcare Partner",
    descr:
      "Apotheek Mac Donald is a Suriname pharmacy brand with an online presence for healthcare products, services, and trusted guidance for patients and families.",
    tags: ["Website", "Marketing", "Healthcare"],
    portfolioCategory: "website",
    link: "https://www.apotheekmacdonald.sr/",
    image: "/projects/helix-earth.svg",
    portfolioScreenshot: "/projects/screenshots/apotheek-mac-donald-home-desktop.png",
    palette: { primary: "#0B6E4F", secondary: "#7DD3A8", text: "#FFFFFF" },
    caseStudy: caseFromDescr(
      "Pharmacy brand site connecting patients to products, care, and local healthcare expertise.",
      "Apotheek Mac Donald"
    ),
  },
  {
    id: 13,
    slug: "pan-american-group",
    title: "Pan American Group",
    heading: "Regional Business Leadership",
    descr:
      "Pan American Group presents its corporate portfolio, services, and regional presence through a polished marketing site built for partners and stakeholders.",
    tags: ["Website", "Marketing", "Corporate"],
    portfolioCategory: "website",
    link: "https://www.panamericangroup.sr/",
    image: "/projects/helix-earth.svg",
    portfolioScreenshot: "/projects/screenshots/pan-american-group-home-desktop.png",
    palette: { primary: "#1E3A5F", secondary: "#C9A227", text: "#FFFFFF" },
    caseStudy: caseFromDescr(
      "Corporate group website highlighting services, leadership, and regional operations.",
      "Pan American Group"
    ),
  },
  {
    id: 14,
    slug: "health-invest",
    title: "Health Invest",
    heading: "Investing In Better Care",
    descr:
      "Health Invest connects patients and partners to healthcare investment, services, and programs through a clear digital platform tailored to Suriname.",
    tags: ["Website", "Marketing", "Healthcare"],
    portfolioCategory: "website",
    link: "https://healthinvest.sr/",
    image: "/projects/helix-earth.svg",
    portfolioScreenshot: "/projects/screenshots/health-invest-home-desktop.png",
    palette: { primary: "#00695C", secondary: "#4DB6AC", text: "#FFFFFF" },
    caseStudy: caseFromDescr(
      "Healthcare investment and services platform with patient-focused storytelling.",
      "Health Invest"
    ),
  },
  {
    id: 15,
    slug: "shasvien-trucks",
    title: "Shasvien Trucks",
    heading: "Heavy-Duty Solutions On The Road",
    descr:
      "Shasvien Trucks (STMS) showcases commercial vehicles, parts, and fleet services for Suriname — helping businesses move goods with reliable equipment and support.",
    tags: ["Website", "Marketing", "Automotive"],
    portfolioCategory: "website",
    link: "https://stms.sr/",
    image: "/projects/helix-earth.svg",
    portfolioScreenshot: "/projects/screenshots/shasvien-trucks-home-desktop.png",
    palette: { primary: "#B91C1C", secondary: "#F87171", text: "#FFFFFF" },
    caseStudy: caseFromDescr(
      "Commercial truck and fleet services site with inventory, brands, and lead capture.",
      "Shasvien Trucks"
    ),
  },
  {
    id: 16,
    slug: "troytec",
    title: "Troytec",
    heading: "Engineering That Performs",
    descr:
      "Troytec delivers industrial and technical solutions in Guyana with a web presence that explains capabilities, projects, and how clients can engage their team.",
    tags: ["Website", "Marketing", "Industrial"],
    portfolioCategory: "website",
    link: "https://troytecgy.com/",
    image: "/projects/troytec.svg",
    portfolioScreenshot: "/projects/screenshots/troytec-home-desktop.png",
    palette: { primary: "#1D4ED8", secondary: "#93C5FD", text: "#FFFFFF" },
    caseStudy: caseFromDescr(
      "Industrial engineering brand site with service lines and project credibility.",
      "Troytec"
    ),
  },
  {
    id: 17,
    slug: "interdeco",
    title: "Interdeco Kitchens",
    heading: "Kitchens Crafted To Inspire",
    descr:
      "Interdeco Kitchens markets premium kitchen and interior solutions internationally — portfolio galleries, product lines, and consultation flows for residential and trade clients.",
    tags: ["Website", "Marketing", "Interiors"],
    portfolioCategory: "website",
    link: "https://interdecokitchens.com/",
    image: "/projects/elegant-interiors.svg",
    portfolioScreenshot: "/projects/screenshots/interdeco-home-desktop.png",
    palette: { primary: "#292524", secondary: "#D6D3D1", text: "#FFFFFF" },
    caseStudy: caseFromDescr(
      "Kitchen and interior brand site with project showcases and lead generation.",
      "Interdeco Kitchens"
    ),
  },
  {
    id: 18,
    slug: "rashiv",
    title: "Rashiv Vastgoed",
    heading: "Real Estate With Clarity",
    descr:
      "Rashiv Vastgoed is a Netherlands-based real estate firm with a bilingual site for listings, services, and investor-ready property storytelling.",
    tags: ["Website", "Marketing", "Real Estate"],
    portfolioCategory: "website",
    link: "https://www.rashivvastgoed.nl/",
    image: "/projects/rashiv.svg",
    portfolioScreenshot: "/projects/screenshots/rashiv-home-desktop.png",
    palette: { primary: "#128BC0", secondary: "#60D3F7", text: "#FFFFFF" },
    caseStudy: caseFromDescr(
      "Real estate platform highlighting listings, services, and brand trust.",
      "Rashiv Vastgoed"
    ),
  },
  {
    id: 19,
    slug: "unistone",
    title: "Unistone & More",
    heading: "Stone Surfaces That Last",
    descr:
      "Unistone & More presents natural stone, countertops, and surfacing products with inspiration galleries and paths for designers and homeowners to request quotes.",
    tags: ["Website", "Marketing", "Construction"],
    portfolioCategory: "website",
    link: "https://www.unistoneandmore.com/",
    image: "/projects/suriname-natural-stone.svg",
    portfolioScreenshot: "/projects/screenshots/unistone-home-desktop.png",
    palette: { primary: "#57534E", secondary: "#A8A29E", text: "#FFFFFF" },
    caseStudy: caseFromDescr(
      "Natural stone and surfacing catalog with project inspiration and lead capture.",
      "Unistone & More"
    ),
  },
  {
    id: 20,
    slug: "orange-suriname",
    title: "Orange Suriname",
    heading: "Experience Suriname",
    descr:
      "Orange Travel & Jungle Tours promotes Suriname adventures — curated tours, jungle experiences, and booking paths for international and local travelers.",
    tags: ["Website", "Marketing", "Travel"],
    portfolioCategory: "website",
    link: "https://www.orangesuriname.com/",
    image: "/projects/helix-earth.svg",
    portfolioScreenshot: "/projects/screenshots/orange-suriname-home-desktop.png",
    palette: { primary: "#EA580C", secondary: "#FDBA74", text: "#FFFFFF" },
    caseStudy: caseFromDescr(
      "Tourism and jungle adventure brand site with packages and discovery content.",
      "Orange Suriname"
    ),
  },
  {
    id: 21,
    slug: "md-pharma",
    title: "MD Pharma Wholesale",
    heading: "Pharmaceutical Supply At Scale",
    descr:
      "MD Pharma Wholesale serves pharmacies and healthcare partners in Suriname with product catalogs, ordering flows, and B2B positioning on the web.",
    tags: ["Website", "E-Commerce", "Healthcare"],
    portfolioCategory: "e-commerce",
    link: "https://mdpharmawholesale.sr/",
    image: "/projects/helix-earth.svg",
    portfolioScreenshot: "/projects/screenshots/md-pharma-home-desktop.png",
    palette: { primary: "#0369A1", secondary: "#7DD3FC", text: "#FFFFFF" },
    caseStudy: caseFromDescr(
      "Pharmaceutical wholesale platform for catalog discovery and B2B ordering.",
      "MD Pharma Wholesale"
    ),
  },
  {
    id: 22,
    slug: "westland-valley",
    title: "Westland Valley",
    heading: "Land With Vision",
    descr:
      "Westland Valley markets land development and investment opportunities with storytelling, visuals, and inquiry flows for buyers exploring regional projects.",
    tags: ["Website", "Marketing", "Real Estate"],
    portfolioCategory: "website",
    link: "https://westland-valley.com/",
    image: "/projects/helix-earth.svg",
    portfolioScreenshot: "/projects/screenshots/westland-valley-home-desktop.png",
    palette: { primary: "#166534", secondary: "#86EFAC", text: "#FFFFFF" },
    caseStudy: caseFromDescr(
      "Land development and investment site with project highlights and lead capture.",
      "Westland Valley"
    ),
  },
  {
    id: 23,
    slug: "amaurens-design",
    title: "Amaurens Design",
    heading: "Design That Defines Spaces",
    descr:
      "Amaurens Design showcases interior and creative design work — portfolio-driven pages, service positioning, and contact paths for residential and commercial clients.",
    tags: ["Website", "Marketing", "Interiors"],
    portfolioCategory: "website",
    link: "https://amaurensdesign.com/",
    image: "/projects/elegant-interiors.svg",
    portfolioScreenshot: "/projects/screenshots/amaurens-design-home-desktop.png",
    palette: { primary: "#4C1D95", secondary: "#C4B5FD", text: "#FFFFFF" },
    caseStudy: caseFromDescr(
      "Interior design studio site with portfolio galleries and consultation CTAs.",
      "Amaurens Design"
    ),
  },
  {
    id: 24,
    slug: "philadelphia-church",
    title: "Philadelphia Church of God",
    heading: "Faith, Community, Purpose",
    descr:
      "Philadelphia Church of God (Suriname & Dutch Guiana) shares ministry updates, events, and resources through a welcoming site for members and visitors.",
    tags: ["Website", "Marketing", "Nonprofit"],
    portfolioCategory: "website",
    link: "https://pcogsd.org/",
    image: "/projects/helix-earth.svg",
    portfolioScreenshot: "/projects/screenshots/philadelphia-church-home-desktop.png",
    palette: { primary: "#1E40AF", secondary: "#93C5FD", text: "#FFFFFF" },
    caseStudy: caseFromDescr(
      "Church and community site with events, ministry content, and engagement paths.",
      "Philadelphia Church of God"
    ),
  },
];

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
