/** Client review content — portraits from tad-website-2-0.webflow.io */

export type Review = {
  name: string;
  role: string;
  text: string;
  /** Optional avatar; omit for quote-only cards */
  avatar?: string;
};

export const reviews: Review[] = [
  {
    name: "Ramon B.",
    role: "Marketing Director",
    text: "Best digital partner in Suriname, hands down. Strategy, design and engineering under one roof.",
    avatar: "/reviews/client-1.png",
  },
  {
    name: "Anika S.",
    role: "Founder, Boutique Retail",
    text: "TAD turned our weekend idea into a real business in under three months. We've never looked back.",
    avatar: "/reviews/client-2.webp",
  },
  {
    name: "Jermaine V.",
    role: "Product Lead",
    text: "Senior team that thinks like product owners. They challenge the brief in the right way.",
    avatar: "/reviews/client-3.jpeg",
  },
  {
    name: "Indra K.",
    role: "Operations",
    text: "Predictable delivery, transparent pricing, no drama. Exactly what we needed.",
    avatar: "/reviews/client-4.webp",
  },
  {
    name: "Liam W.",
    role: "CMO",
    text: "Their marketing engine took us from zero to a 100k+ audience in a year. Insane ROI.",
    avatar: "/reviews/client-1.png",
  },
  {
    name: "Devika R.",
    role: "CEO, Hospitality Group",
    text: "Bookings doubled. Support tickets halved. The product just works — and looks beautiful doing it.",
    avatar: "/reviews/client-2.webp",
  },
];
