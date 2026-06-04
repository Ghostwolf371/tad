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
      {
        name: "Tariq",
        role: "Founder & Lead Engineer",
        bio: "Leads architecture and delivery across web, mobile, and platform work.",
        image: "/team/member-1.png",
      },
      {
        name: "Alex",
        role: "Head of Design",
        bio: "Owns brand, UI systems, and the visual language of every product we ship.",
        image: "/team/member-2.webp",
      },
      {
        name: "Sarah",
        role: "Project Manager",
        bio: "Keeps roadmaps clear, stakeholders aligned, and launches on schedule.",
        image: "/team/member-3.jpeg",
      },
      {
        name: "Jordan",
        role: "Marketing Strategist",
        bio: "Connects brand, campaigns, and analytics so growth stays measurable after launch.",
        image: "/team/member-4.webp",
      },
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
