export type CareerCategory = "all" | "development" | "design" | "management";

export type CareerRole = {
  slug: string;
  title: string;
  category: Exclude<CareerCategory, "all">;
  employmentType: string;
  workplace: string;
  summary: string;
  intro: string;
  responsibilities: readonly string[];
  requirements: readonly string[];
  niceToHave?: readonly string[];
  whatWeOffer: readonly string[];
};

export const careerCategories: { id: CareerCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "development", label: "Development" },
  { id: "design", label: "Design" },
  { id: "management", label: "Management" },
];

export const careerRoles: CareerRole[] = [
  {
    slug: "senior-web-designer-developer",
    title: "Senior Web Designer & Developer",
    category: "design",
    employmentType: "Full-time",
    workplace: "Paramaribo · Suriname",
    summary:
      "Lead visual direction and front-end delivery for client websites and product interfaces — from concept to production-ready build.",
    intro:
      "You bridge design and engineering: shaping layouts, design systems, and interactions, then implementing them in modern stacks (Next.js, Tailwind, component libraries). You work closely with project managers and developers on multi-disciplinary client work.",
    responsibilities: [
      "Own UI direction for web projects from wireframe to shipped pages",
      "Build responsive, accessible interfaces in React / Next.js",
      "Maintain and extend shared design tokens and component patterns",
      "Present work to clients and incorporate feedback with polish",
      "Mentor juniors on craft, performance, and handoff quality",
    ],
    requirements: [
      "5+ years across product design and front-end development",
      "Strong portfolio of shipped web work (not only mockups)",
      "Proficiency in Figma and modern CSS (Tailwind or equivalent)",
      "Comfort with TypeScript/React and Git-based workflows",
      "Clear communication in English; Dutch is a plus",
    ],
    niceToHave: [
      "Motion design (Framer Motion, Lottie)",
      "Experience with headless CMS or e-commerce builds",
    ],
    whatWeOffer: [
      "Small senior team with direct client exposure",
      "Hybrid schedule from our Paramaribo studio",
      "Projects across Suriname and international clients",
      "Room to influence tools, process, and quality bar",
    ],
  },
  {
    slug: "junior-frontend-developer",
    title: "Junior Frontend Developer",
    category: "development",
    employmentType: "Full-time",
    workplace: "Paramaribo · Suriname",
    summary:
      "Grow your craft building polished interfaces for agency and product work — with code review, pairing, and clear growth paths.",
    intro:
      "You will implement designs in Next.js and React, fix bugs, improve performance, and learn how a digital agency ships real client projects. We value curiosity, reliability, and attention to detail over years of experience.",
    responsibilities: [
      "Implement pages and components from Figma specs",
      "Write clean, typed TypeScript and accessible markup",
      "Participate in code review and sprint planning",
      "Test across browsers and devices before handoff",
      "Document small features and component usage",
    ],
    requirements: [
      "1–2 years front-end experience or strong bootcamp / self-taught portfolio",
      "Working knowledge of HTML, CSS, JavaScript, and React",
      "Familiarity with Git and basic REST/API integration",
      "Willingness to learn Next.js and Tailwind on the job",
      "Based in or willing to relocate to Paramaribo",
    ],
    niceToHave: [
      "Side projects or contributions on GitHub",
      "Basic understanding of design systems",
    ],
    whatWeOffer: [
      "Structured mentoring from senior developers",
      "Mix of client sites and in-house product work",
      "Paid learning time for courses and certifications",
      "Friendly studio culture — no burnout heroics",
    ],
  },
  {
    slug: "ui-ux-and-product-designer",
    title: "UI/UX & Product Designer",
    category: "design",
    employmentType: "Full-time",
    workplace: "Paramaribo · hybrid",
    summary:
      "Shape user flows, prototypes, and visual systems for web apps, marketing sites, and TAD’s own SaaS products.",
    intro:
      "You turn business goals into intuitive experiences: discovery workshops, user flows, high-fidelity UI, and developer-ready specs. You collaborate with engineering from day one so designs ship faithfully.",
    responsibilities: [
      "Run discovery and map user journeys for client projects",
      "Produce wireframes, prototypes, and design systems in Figma",
      "Define typography, color, and component rules aligned with brand",
      "Usability-test key flows and iterate from feedback",
      "Support developers during implementation and QA",
    ],
    requirements: [
      "3+ years in UI/UX for web or mobile products",
      "Portfolio showing end-to-end process, not only visuals",
      "Strong layout, typography, and interaction skills",
      "Experience handing off to developers (auto-layout, specs)",
      "English working proficiency",
    ],
    niceToHave: [
      "Basic HTML/CSS literacy",
      "Experience with dashboards, B2B, or local-market products",
    ],
    whatWeOffer: [
      "Variety across agencies clients and internal HR/invoice products",
      "Design-led culture with engineering respect for craft",
      "Hybrid work when focus work benefits from home",
    ],
  },
  {
    slug: "senior-backend-developer",
    title: "Senior Backend Developer",
    category: "development",
    employmentType: "Full-time",
    workplace: "Paramaribo · Suriname",
    summary:
      "Architect APIs, databases, and integrations that power client platforms and TAD’s growing product suite.",
    intro:
      "You own server-side reliability: data models, authentication, third-party integrations, and deployment pipelines. Our stack leans TypeScript (Node, Next.js API routes, Prisma) with room to introduce tools when they earn their place.",
    responsibilities: [
      "Design and implement REST/GraphQL APIs and data layers",
      "Model schemas, migrations, and performance-sensitive queries",
      "Integrate payments, messaging, CRM, and marketing tools",
      "Harden security, logging, and error handling for production",
      "Guide juniors on patterns, testing, and documentation",
    ],
    requirements: [
      "5+ years backend development on production systems",
      "Strong SQL and experience with ORMs (Prisma preferred)",
      "Node.js / TypeScript at scale",
      "Understanding of auth, webhooks, and cloud hosting (Vercel/AWS)",
      "Pragmatic approach to testing and observability",
    ],
    niceToHave: [
      "Python or PHP legacy maintenance",
      "Multi-tenant SaaS experience",
    ],
    whatWeOffer: [
      "Ownership of product backends end-to-end",
      "Direct line to leadership on technical decisions",
      "Stable roadmap — fewer throwaway prototypes, more shipped systems",
    ],
  },
  {
    slug: "it-department-manager",
    title: "IT Department Manager",
    category: "management",
    employmentType: "Full-time",
    workplace: "Paramaribo · Suriname",
    summary:
      "Coordinate people, priorities, and delivery across TAD’s engineering and infrastructure — keeping projects on track and teams unblocked.",
    intro:
      "You are the operational backbone of our technical org: sprint rhythm, resource planning, vendor relationships, and internal IT. You understand software delivery enough to translate between clients, designers, and developers.",
    responsibilities: [
      "Plan capacity and timelines across concurrent client and product work",
      "Facilitate standups, retros, and cross-team communication",
      "Maintain tooling, access, backups, and studio infrastructure",
      "Track risks, blockers, and quality gates before release",
      "Support hiring, onboarding, and performance check-ins",
    ],
    requirements: [
      "3+ years leading technical teams (agency or product)",
      "Solid grasp of web project lifecycles and SDLC basics",
      "Excellent organization and stakeholder communication",
      "Comfort with project tools (Linear, Jira, Notion, or similar)",
      "Professional Dutch and English",
    ],
    niceToHave: [
      "Background as developer or designer before management",
      "ITIL or formal project management training",
    ],
    whatWeOffer: [
      "Authority to improve how we plan and deliver",
      "Cross-functional visibility — not siloed ticket-pushing",
      "Competitive package for a senior leadership role in Suriname",
    ],
  },
  {
    slug: "social-media-designer",
    title: "Social Media Designer",
    category: "design",
    employmentType: "Full-time",
    workplace: "Paramaribo · Suriname",
    summary:
      "Create scroll-stopping visuals and short-form campaigns for TAD clients and our own brand across social platforms.",
    intro:
      "You design carousels, reels covers, ad sets, and brand templates that stay on-message and on-brand. You work with marketing strategists and sometimes animate light motion in After Effects or similar.",
    responsibilities: [
      "Produce platform-native creative for Instagram, Facebook, LinkedIn, TikTok",
      "Adapt client brand guides into flexible social templates",
      "Collaborate on campaign concepts and content calendars",
      "Export correct formats, safe zones, and accessible contrast",
      "Iterate quickly from performance feedback and A/B learnings",
    ],
    requirements: [
      "2+ years design focused on social or digital marketing",
      "Strong Adobe Creative Suite (Photoshop, Illustrator; After Effects a plus)",
      "Eye for typography, hierarchy, and trends without cliché",
      "Ability to manage multiple brands in parallel",
      "Portfolio with live or mock campaign examples",
    ],
    niceToHave: [
      "Basic video editing for reels/shorts",
      "Copywriting or Suriname-market cultural nuance",
    ],
    whatWeOffer: [
      "Steady pipeline of client brands plus TAD’s own channels",
      "Creative freedom within clear brand guardrails",
      "Team that understands marketing outcomes, not only pixels",
    ],
  },
];

export function getCareerRoleBySlug(slug: string): CareerRole | undefined {
  return careerRoles.find((r) => r.slug === slug);
}

export function getCareerRolesByCategory(category: CareerCategory): CareerRole[] {
  if (category === "all") return careerRoles;
  return careerRoles.filter((r) => r.category === category);
}

/** Other roles in the same department, then any remaining (for detail page footer). */
export function getRelatedCareerRoles(slug: string, limit = 3): CareerRole[] {
  const current = getCareerRoleBySlug(slug);
  if (!current) return careerRoles.slice(0, limit);
  const sameCategory = careerRoles.filter(
    (r) => r.slug !== slug && r.category === current.category,
  );
  const rest = careerRoles.filter(
    (r) => r.slug !== slug && r.category !== current.category,
  );
  return [...sameCategory, ...rest].slice(0, limit);
}
