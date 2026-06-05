export type ProductHighlight = {
  title: string;
  description: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  heading: string;
  descr: string;
  longDescr: string;
  idealFor: string;
  highlights: ProductHighlight[];
  tags: string[];
  features: string[];
  externalHref: string;
  palette: { primary: string; secondary: string; text: string };
};

export const products: Product[] = [
  {
    id: "flex-pos",
    slug: "payza",
    name: "PayZa",
    heading: "PayZa",
    descr:
      "User-friendly Point of Sale software. Set-up in minutes, sell in seconds. Compatible with any device. No installation and no specific hardware required.",
    longDescr:
      "PayZa is point-of-sale software built for speed and flexibility. Configure it to match your retail workflow, run on the devices you already own, and start selling without a lengthy IT rollout.",
    idealFor:
      "Retail shops, cafés, and pop-ups that need a fast checkout without buying dedicated POS hardware.",
    highlights: [
      {
        title: "Sell on any device",
        description:
          "Tablets, laptops, or phones — one responsive register that works in the browser.",
      },
      {
        title: "Configure your floor",
        description:
          "Map products, modifiers, and payment types to how your team actually sells.",
      },
      {
        title: "Go live quickly",
        description:
          "Skip lengthy installs. Train staff and open the register in a single afternoon.",
      },
    ],
    tags: ["POS", "Retail"],
    features: [
      "Set up in minutes, sell in seconds",
      "Works on any device — no special hardware",
      "No installation required",
      "Highly configurable for your business",
    ],
    externalHref: "https://tad.sr/product-payza",
    palette: { primary: "#00e357", secondary: "#01f2ad", text: "#001e1c" },
  },
  {
    id: "hr-plus",
    slug: "hr-plus",
    name: "HR Plus",
    heading: "HR Plus",
    descr:
      "HR Plus is web-based HR software built for Surinamese businesses — personnel, payroll, leave, and an AI assistant in one platform, with 25+ modules and no dedicated IT team required.",
    longDescr:
      "HR Plus brings employee directory, leave requests, absence calendars, payroll, and dozens of other HR tools into one web-based system. Built for SMEs in Suriname and the Caribbean — simple to adopt, easy to maintain.",
    idealFor:
      "SMEs in Suriname and the Caribbean that need structured HR without hiring an internal systems team.",
    highlights: [
      {
        title: "Leave & absence",
        description:
          "Request, approve, and visualize time off on shared calendars everyone can trust.",
      },
      {
        title: "Employee records",
        description:
          "Central profiles, documents, and history — no more scattered spreadsheets.",
      },
      {
        title: "25+ HR modules",
        description:
          "Onboarding, reviews, payroll, and policies in one web app your team can learn fast.",
      },
    ],
    tags: ["HR System", "SME"],
    features: [
      "25+ HR modules built in",
      "Employee directory & profiles",
      "Leave, payroll & absence calendars",
      "Built-in AI assistant",
    ],
    externalHref: "https://tad.sr/",
    palette: { primary: "#00e357", secondary: "#01f2ad", text: "#f5fff8" },
  },
  {
    id: "bouw-plus",
    slug: "bouw-plus",
    name: "Bouw+",
    heading: "Bouw+",
    descr:
      "Finance operations platform for service businesses: projects, quotes, invoices, payments, expenses, and Dutch-language workflows in one app.",
    longDescr:
      "Bouw+ is an API-first Next.js platform for finance operations. It combines projects, offertes, facturen, payments, and income/expense journaling with Dutch-first UX and robust PDF output for quotes and invoices.",
    idealFor:
      "Service companies that need Dutch-language operations with project-to-cashflow workflows and document-grade PDF exports.",
    highlights: [
      {
        title: "Project to cashflow flow",
        description:
          "Manage projects, quotes, invoices, payments, and expenses in one connected workflow.",
      },
      {
        title: "Dutch workflow native",
        description:
          "Built around Dutch-language operations including offertes/facturen lifecycle handling.",
      },
      {
        title: "Production PDF output",
        description:
          "Generate branded quote and invoice PDFs with conditional totals, payment blocks, and optional attachment merges.",
      },
    ],
    tags: ["Finance Ops", "Dutch Workflows", "PDF"],
    features: [
      "Projects with status, timeline, costs, and attachments",
      "Quotes with templates, approval flow, and locked states",
      "Invoices with payment status, archive support, and outstanding tracking",
      "Payments with bulk allocation and overpay checks",
      "Income/expense journal with cost-group support",
      "API-first Next.js architecture with Prisma-backed workflows",
    ],
    externalHref: "https://tad.sr/",
    palette: { primary: "#00e357", secondary: "#9CF4C2", text: "#001e1c" },
  },
  {
    id: "invoice-plus",
    slug: "invoice-plus",
    name: "Invoice+",
    heading: "Invoice+",
    descr:
      "Smart invoicing workspace for creating, tracking, and following up invoices with real-time status visibility.",
    longDescr:
      "Invoice+ helps teams draft invoices faster, track payment progress, and keep billing operations clean with searchable customer and invoice histories.",
    idealFor:
      "Growing teams that need structured invoice operations without heavy ERP complexity.",
    highlights: [
      {
        title: "Fast invoice creation",
        description:
          "Turn line items into polished invoices quickly with reusable templates.",
      },
      {
        title: "Status clarity",
        description:
          "Track draft, sent, overdue, and paid states with simple visibility.",
      },
      {
        title: "Team-friendly workflow",
        description:
          "Keep comments, metadata, and client references in one billing view.",
      },
    ],
    tags: ["Billing", "Operations"],
    features: [
      "Template-based invoice drafting",
      "Payment status tracking and reminders",
      "Searchable customer billing history",
      "Export-friendly invoice records",
    ],
    externalHref: "https://tad.sr/",
    palette: { primary: "#00e357", secondary: "#01f2ad", text: "#f5fff8" },
  },
  {
    id: "vendor-plus",
    slug: "vendor-plus",
    name: "Vendor+",
    heading: "Vendor+",
    descr:
      "Vendor operations hub for supplier records, payable tracking, and procurement visibility.",
    longDescr:
      "Vendor+ centralizes supplier data and payable workflows so finance and operations teams can monitor commitments, due dates, and payment actions without scattered spreadsheets.",
    idealFor:
      "Operations and finance teams coordinating multiple suppliers and recurring payables.",
    highlights: [
      {
        title: "Supplier directory",
        description:
          "Store vendor profiles, contracts, and notes in one place.",
      },
      {
        title: "Payables timeline",
        description:
          "See upcoming, due, and completed payments at a glance.",
      },
      {
        title: "Procurement visibility",
        description:
          "Track requests, approvals, and purchase context from one dashboard.",
      },
    ],
    tags: ["Vendors", "Procurement"],
    features: [
      "Centralized vendor records",
      "Payables and due-date tracking",
      "Procurement request overview",
      "Team-ready operational notes",
    ],
    externalHref: "https://tad.sr/",
    palette: { primary: "#0EA5A5", secondary: "#99F6E4", text: "#001e1c" },
  },
  {
    id: "whatsapp-ai",
    slug: "whatsapp-ai-chatbot",
    name: "WhatsApp AI Chatbot",
    heading: "WhatsApp AI Chatbot",
    descr:
      "The smart assistant for businesses with seamless Google Calendar integration to book appointments directly through WhatsApp.",
    longDescr:
      "An AI-driven WhatsApp assistant that qualifies leads, answers customer questions around the clock, and books appointments through Google Calendar — always on when your team is not.",
    idealFor:
      "Service businesses, clinics, and sales teams that live on WhatsApp and lose leads after hours.",
    highlights: [
      {
        title: "Always-on replies",
        description:
          "Answer FAQs and capture intent instantly, even when your team is offline.",
      },
      {
        title: "Calendar booking",
        description:
          "Offer real time slots and confirm appointments inside the chat thread.",
      },
      {
        title: "Qualified handoffs",
        description:
          "Route hot leads to your team with context — not just another unread message.",
      },
    ],
    tags: ["AI Chatbot", "Automation", "WhatsApp"],
    features: [
      "24/7 Automated customer support",
      "Lead qualification & CRM sync",
      "Seamless Google Calendar integration",
      "Natural language understanding",
    ],
    externalHref: "https://tad.sr/",
    palette: { primary: "#00e357", secondary: "#01f2ad", text: "#f5fff8" },
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}
