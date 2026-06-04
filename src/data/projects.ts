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
  /** Webflow case-study screenshot when available; otherwise cards use `image` SVG */
  homepageScreenshot?: string;
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
 * Projects without homepageScreenshot have no imagery on Webflow CDN —
 * only brand SVGs in public/projects/. Live-site captures would be a separate pass.
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
    homepageScreenshot: "/projects/screenshots/kings-enterprises-home-promo.png",
    featured: true,
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
    homepageScreenshot: "/projects/screenshots/smart-connexxionz-home-promo.png",
    featured: true,
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
    homepageScreenshot: "/projects/screenshots/queens-hotel-homepage.png",
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
    homepageScreenshot: "/projects/screenshots/trustbank-amanah.png",
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
    homepageScreenshot: "/projects/screenshots/the-coffee-box-home-v3.jpg",
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
    homepageScreenshot: "/projects/screenshots/devinas-enterprises-home-v3.jpg",
    featured: true,
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
    homepageScreenshot: "/projects/screenshots/hj-express.png",
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
    homepageScreenshot: "/projects/screenshots/digital-world.png",
    featured: true,
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
    homepageScreenshot: "/projects/screenshots/elegant-interiors.png",
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
    homepageScreenshot: "/projects/screenshots/sranan-fowru.png",
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
    homepageScreenshot: "/projects/screenshots/arrowtrade.png",
    palette: { primary: "#0D9488", secondary: "#99D4CF", text: "#FFFFFF" },
    caseStudy: caseFromDescr(
      "B2B retail and distribution storefront showcasing brands, popular products, and supplier relationships.",
      "Arrow Trade N.V."
    ),
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function hasRealScreenshot(project: Project) {
  return Boolean(project.homepageScreenshot);
}

export function getProjectVisual(project: Project) {
  return project.homepageScreenshot ?? project.image;
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
  if (project.homepageScreenshot) return "popout";
  return "cover";
}

/** Gallery shots excluding the hero screenshot (no duplicate strips). */
export function getProjectGallery(project: Project): string[] {
  const hero = project.homepageScreenshot;
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
