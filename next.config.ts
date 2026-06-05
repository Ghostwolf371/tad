import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/v2", destination: "/", permanent: true },
      { source: "/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/cookie-policy", destination: "/cookies", permanent: true },
      {
        source: "/about",
        has: [{ type: "query", key: "section", value: "e-commerce" }],
        destination: "/services#e-commerce",
        permanent: true,
      },
      {
        source: "/about",
        has: [{ type: "query", key: "section", value: "web-development" }],
        destination: "/services#web-development",
        permanent: true,
      },
      {
        source: "/about",
        has: [{ type: "query", key: "section", value: "mobile-development" }],
        destination: "/services#mobile-development",
        permanent: true,
      },
      {
        source: "/about",
        has: [{ type: "query", key: "section", value: "digital-marketing" }],
        destination: "/services#digital-marketing",
        permanent: true,
      },
      {
        source: "/products/hr4u",
        destination: "/products/hr-plus",
        permanent: true,
      },
      {
        source: "/products/whatsapp-ai-sales-chatbot",
        destination: "/products/whatsapp-ai-chatbot",
        permanent: true,
      },
    ];
  },
  images: {
    dangerouslyAllowSVG: true,
    formats: ["image/avif", "image/webp"],
    qualities: [75, 92],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2400, 3840],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },
};

export default nextConfig;
