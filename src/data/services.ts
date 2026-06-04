export type Service = {
  id: string;
  heading: string;
  tagline: string;
  text: string;
  longText: string;
  highlights: string[];
  icon: string;
  image: string;
  href: string;
};

export const services: Service[] = [
  {
    id: "e-commerce",
    heading: "E-Commerce Platform",
    tagline: "Our flagship product",
    text: "Experience unparalleled UI/UX with our proprietary e-commerce platform, designed to empower your online store with cutting-edge technology and seamless shopping experiences.",
    longText:
      "Our proprietary e-commerce platform is built for brands that need more than a template. We combine conversion-focused UX, robust catalog management, payments, and fulfillment workflows into one cohesive system — engineered for Suriname and scalable internationally.",
    highlights: [
      "Conversion-optimized storefronts",
      "Inventory & order management",
      "Payments and checkout flows",
      "Marketing integrations",
    ],
    icon: "ShoppingBag",
    image: "/services/e-commerce.png",
    href: "/services#e-commerce",
  },
  {
    id: "web-development",
    heading: "Web Development",
    tagline: "Bespoke websites",
    text: "Tailored web design and development to create a unique online presence for your business, ensuring it stands out in the digital landscape.",
    longText:
      "We design and build marketing sites, web applications, and portals that reflect your brand and perform under real-world traffic. Every project starts with strategy, flows into polished UI, and ships with clean, maintainable code.",
    highlights: [
      "Custom design systems",
      "Marketing & corporate sites",
      "Web apps and portals",
      "Performance & SEO foundations",
    ],
    icon: "Globe",
    image: "/services/web-development.png",
    href: "/services#web-development",
  },
  {
    id: "mobile-development",
    heading: "Mobile Development",
    tagline: "App innovation",
    text: "Custom mobile application development to extend your digital reach, enhance customer engagement, and improve operational efficiency on iOS and Android.",
    longText:
      "Native and cross-platform apps that extend your product to customers' pockets. We handle UX, engineering, testing, and store submission — so your team can focus on the business, not the build.",
    highlights: [
      "iOS & Android apps",
      "Customer-facing products",
      "Internal tools & field apps",
      "App store launch support",
    ],
    icon: "Smartphone",
    image: "/services/mobile-development.png",
    href: "/services#mobile-development",
  },
  {
    id: "digital-marketing",
    heading: "Digital Marketing",
    tagline: "Full-spectrum campaigns",
    text: "Comprehensive digital marketing strategies encompassing social media management, SEO optimization, and engaging video content production to amplify your brand.",
    longText:
      "We plan and execute campaigns that compound over time — social, search, content, and video production aligned with your brand and measurable goals. Our in-house team has driven millions of impressions for clients worldwide.",
    highlights: [
      "Social media management",
      "SEO & content strategy",
      "Video & creative production",
      "Campaign analytics",
    ],
    icon: "Megaphone",
    image: "/services/digital-marketing.png",
    href: "/services#digital-marketing",
  },
];

export function getServiceById(id: string) {
  return services.find((s) => s.id === id);
}
