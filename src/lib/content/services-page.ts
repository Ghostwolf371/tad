export const servicesPageContent = {
  hero: {
    eyebrow: "Services",
    titleLines: ["Services engineered", "for growth."] as const,
    titleGradientLine: 1,
    subtitle:
      "Strategy, design, engineering, and marketing — planned together so every touchpoint works as one system.",
  },
  overview: {
    eyebrow: "What we do",
    title: "Four disciplines. One delivery team.",
    description:
      "From flagship e-commerce to bespoke web and mobile apps, plus full-spectrum marketing — pick a lane or combine them into one roadmap.",
    footnote: "Four disciplines · One delivery team",
  },
  detail: {
    eyebrow: "Deep dive",
    title: "Built for outcomes, not slide decks.",
    description:
      "Each service ships with clear deliverables, measurable milestones, and a team that stays in the room from kickoff to launch.",
  },
  process: {
    eyebrow: "TAD process",
    title: "From kickoff to launch, without the black box.",
    description:
      "A predictable path from idea to production. Each step has a clear output, so you always know what is being decided, designed, built, and shipped.",
  },
  packages: {
    eyebrow: "Packages",
    title: "Clear packages for your growth",
    description:
      "Structured solutions that lower the barrier to entry while delivering high-end results. No hidden costs — just clear value.",
  },
} as const;

export const SERVICES_PROCESS_STEPS = [
  {
    when: "01",
    title: "Discovery",
    text: "Goals, audience, scope, content, integrations, and success metrics.",
    deliverable: "Project map",
  },
  {
    when: "02",
    title: "Wireframes",
    text: "User journeys and page structure before visual polish locks the flow.",
    deliverable: "Clickable flow",
  },
  {
    when: "03",
    title: "Design",
    text: "High-fidelity UI, responsive states, content rhythm, and design system.",
    deliverable: "Launch UI",
  },
  {
    when: "04",
    title: "Development",
    text: "Clean build, staging, testing, analytics, handoff, and production deploy.",
    deliverable: "Live product",
  },
] as const;
