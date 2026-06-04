export const aboutContent = {
  hero: {
    eyebrow: "About TAD",
    titleLines: ["The people", "behind TAD."] as const,
    titleGradientLine: 1,
    subtitle:
      "A Suriname-born digital agency — our story, how we work, and the team building products, brands, and platforms from Paramaribo for clients worldwide.",
  },
  story: {
    eyebrow: "The story of TAD",
    title: "Started in Paramaribo, built for what's next",
    text: "TAD began in Paramaribo with a simple belief: local businesses deserve the same caliber of design, engineering, and marketing that global brands take for granted. What started as a small studio taking on websites and campaigns grew into a full-service bureau — shipping e-commerce platforms, mobile apps, in-house SaaS, and campaigns that reach millions. We still work from Suriname, still think globally, and still measure success by what ships and what performs.",
  },
  mission: {
    eyebrow: "Mission",
    title: "Centralize great digital work",
    text: "We make serious technology accessible — logos to launch campaigns, websites to custom software, ads to infrastructure. Our mission is to be the partner that removes friction: one team, clear communication, and outcomes you can measure.",
  },
  vision: {
    eyebrow: "Vision",
    title: "Lead the Caribbean tech space",
    text: "We want Suriname and the wider Caribbean to be known for world-class digital products, not just outsourced execution. That means UI-centered design, modern stacks, and transparency at every step — so clients always know what's being built, why, and when.",
  },
  culture: {
    eyebrow: "Culture & how we work",
    title: "UI-centered design, transparent delivery",
    intro:
      "We don't chase vanity metrics or over-engineered stacks. Every engagement starts with users and flows, then design, then code — with open checkpoints so you're never guessing.",
    pillars: [
      {
        title: "UI-centered design",
        text: "Interfaces and flows come first. We prototype, test, and refine before we scale engineering — so what ships is usable, on-brand, and fast.",
      },
      {
        title: "Transparency",
        text: "Clear scopes, honest timelines, and direct access to the people doing the work. No black boxes, no surprise invoices.",
      },
      {
        title: "Full-stack ownership",
        text: "Strategy, design, development, and marketing under one roof — fewer handoffs, faster iteration, one accountable team.",
      },
    ],
  },
  gallery: {
    eyebrow: "Behind the scenes",
    title: "Life at TAD",
    description:
      "Trade shows, launches, and the day-to-day in Paramaribo — the moments around the work we ship for clients.",
    slides: [
      {
        src: "/about/tad-group-trade-show.jpg",
        alt: "The TAD team at a trade show booth in Paramaribo",
        caption: "Register & win — connecting with businesses at our booth.",
      },
      {
        src: "/team/group-2.jpeg",
        alt: "TAD team group photo",
        caption: "The crew behind the builds.",
      },
      {
        src: "/team/group-3.jpeg",
        alt: "TAD team at an event",
        caption: "Out in the field, representing Suriname tech.",
      },
      {
        src: "/about/about-hero-bg.jpg",
        alt: "TAD workspace and creative environment",
        caption: "Where strategy, design, and engineering come together.",
      },
    ],
  },
  team: {
    eyebrow: "Meet the team",
    title: "Developers, designers, and marketing",
    intro:
      "The core team behind TAD — the people you'll actually talk to on your project.",
    members: [
      { name: "Akash Prahladsingh", role: "CEO" },
      { name: "Surekha Pitai", role: "HRM" },
      { name: "Arvan Jagroep", role: "Project manager" },
      { name: "Inaiksi Deochand", role: "Marketing manager" },
      { name: "Justin Mandikarijo", role: "Full stack developer" },
      { name: "Rochan Ragghu", role: "Full stack developer" },
      { name: "Terrence Linger", role: "Full stack developer" },
      { name: "Azaad Ramkisoen", role: "Designer" },
    ],
  },
  storyImage: "/about/tad-group-trade-show.jpg",
  careers: {
    eyebrow: "Careers",
    title: "Join the team",
    text: "We're always looking for talented designers, engineers, and strategists who care about craft and shipping great work. No open roles listed? Send an open application — we keep strong profiles on file.",
    primaryCta: { label: "View open positions", href: "/vacature" },
    secondaryCta: {
      label: "Open application",
      href: "mailto:info@tad.sr?subject=Open%20application%20%E2%80%94%20TAD",
    },
  },
} as const;
