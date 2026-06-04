"use client";

import type { CSSProperties } from "react";
import { clientLogos, type ClientLogo } from "@/lib/content/clients";
import ClientLogoMark from "@/components/clients/ClientLogoMark";
import { cn } from "@/lib/utils";
import HomeSection from "@/components/home/HomeSection";
import { HOME_SECTION_PY_AFTER_DARK } from "@/lib/theme/section-spacing";
import KineticHeading from "@/components/ui/KineticHeading";
import Reveal from "@/components/ui/Reveal";
import { motion } from "framer-motion";

const CLIENT_THEME: Record<
  string,
  { glow: string; tint: string; border: string; chip: string }
> = {
  Heineken: {
    glow: "rgba(0,168,89,0.22)",
    tint: "rgba(0,168,89,0.1)",
    border: "rgba(0,168,89,0.35)",
    chip: "rgba(0,168,89,0.12)",
  },
  "Parbo Bier": {
    glow: "rgba(216,49,37,0.2)",
    tint: "rgba(216,49,37,0.08)",
    border: "rgba(216,49,37,0.3)",
    chip: "rgba(216,49,37,0.1)",
  },
  Telesur: {
    glow: "rgba(250,191,39,0.22)",
    tint: "rgba(250,191,39,0.1)",
    border: "rgba(250,191,39,0.35)",
    chip: "rgba(250,191,39,0.12)",
  },
  "King's Enterprises": {
    glow: "rgba(181,139,44,0.2)",
    tint: "rgba(181,139,44,0.08)",
    border: "rgba(181,139,44,0.3)",
    chip: "rgba(181,139,44,0.1)",
  },
  "Smart Connexxionz": {
    glow: "rgba(30,182,236,0.2)",
    tint: "rgba(30,182,236,0.08)",
    border: "rgba(30,182,236,0.3)",
    chip: "rgba(30,182,236,0.1)",
  },
  Fernandes: {
    glow: "rgba(187,42,45,0.2)",
    tint: "rgba(187,42,45,0.08)",
    border: "rgba(187,42,45,0.3)",
    chip: "rgba(187,42,45,0.1)",
  },
  "Trustbank Amanah": {
    glow: "rgba(10,134,88,0.2)",
    tint: "rgba(10,134,88,0.08)",
    border: "rgba(10,134,88,0.3)",
    chip: "rgba(10,134,88,0.1)",
  },
  "All Star": {
    glow: "rgba(239,107,50,0.22)",
    tint: "rgba(239,107,50,0.1)",
    border: "rgba(239,107,50,0.35)",
    chip: "rgba(239,107,50,0.12)",
  },
  "Digital World": {
    glow: "rgba(24,143,129,0.2)",
    tint: "rgba(24,143,129,0.08)",
    border: "rgba(24,143,129,0.3)",
    chip: "rgba(24,143,129,0.1)",
  },
  Maze: {
    glow: "rgba(92,71,179,0.2)",
    tint: "rgba(92,71,179,0.08)",
    border: "rgba(92,71,179,0.3)",
    chip: "rgba(92,71,179,0.1)",
  },
  "Queens Hotel": {
    glow: "rgba(114,0,10,0.2)",
    tint: "rgba(114,0,10,0.08)",
    border: "rgba(114,0,10,0.3)",
    chip: "rgba(114,0,10,0.1)",
  },
  "Chuck E. Cheese": {
    glow: "rgba(146,33,96,0.2)",
    tint: "rgba(146,33,96,0.08)",
    border: "rgba(146,33,96,0.3)",
    chip: "rgba(146,33,96,0.1)",
  },
};

function Pill({ client }: { client: ClientLogo }) {
  const pill = client.pill;
  const theme = CLIENT_THEME[client.name] ?? {
    glow: "rgba(0,227,87,0.18)",
    tint: "rgba(0,227,87,0.08)",
    border: "rgba(0,227,87,0.3)",
    chip: "rgba(0,227,87,0.1)",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -1 }}
      className="group relative isolate flex shrink-0 cursor-pointer items-center gap-3 rounded-full border border-white/20 bg-white/[0.08] px-5 py-3 shadow-[0_8px_26px_rgba(0,0,0,0.22)] transition-colors duration-300 hover:border-white/30 hover:bg-white/[0.14] hover:shadow-glow-green"
      style={
        {
          "--hover-glow": theme.glow,
          "--hover-tint": theme.tint,
          "--hover-border": theme.border,
        } as CSSProperties
      }
    >
      <span
        className={cn(
          "relative z-10 flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border p-1.5",
          pill?.darkBg
            ? "border-white/15 bg-swamp/70"
            : "border-white/20 bg-white/20",
        )}
      >
        <ClientLogoMark
          client={client}
          size={28}
          variant="pill"
          className="rounded-full object-cover"
        />
      </span>

      <span className="relative z-10 whitespace-nowrap text-base font-medium text-white/88 transition-colors group-hover:text-white">
        {client.name}
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          backgroundColor: "var(--hover-tint)",
          boxShadow:
            "0 0 0 1px var(--hover-border) inset, 0 10px 22px -16px var(--hover-glow)",
        }}
      />
    </motion.div>
  );
}

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: typeof clientLogos;
  reverse?: boolean;
}) {
  const quadrupled = [...items, ...items, ...items, ...items];
  return (
    <div
      className={
        "flex w-max items-center gap-4 " +
        (reverse
          ? "animate-marquee-reverse hover:[animation-play-state:paused]"
          : "animate-marquee hover:[animation-play-state:paused]")
      }
    >
      {quadrupled.map((client, i) => (
        <Pill key={`${client.name}-${i}`} client={client} />
      ))}
    </div>
  );
}

export default function TrustedBy() {
  const topRow = clientLogos.slice(0, 6);
  const bottomRow = clientLogos.slice(6, 12);

  return (
    <HomeSection
      tone="dark-green"
      backgroundClassName="bg-canvas-green"
      edgeTop
      edgeBottom
      py={HOME_SECTION_PY_AFTER_DARK}
    >
      <Reveal>
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-malachite" aria-hidden />
            <span className="label-tech-on-dark">
              TRUSTED BY AWESOME CLIENTS
            </span>
          </div>
          <KineticHeading
            as="h2"
            lines={["Brands that trust us to build their digital future"]}
            accentLastWord
            className="mt-6 text-3xl font-semibold leading-[1.08] tracking-normal text-white sm:text-4xl lg:text-5xl"
          />
        </div>
      </Reveal>

      <span
        aria-hidden
        className="glow-bloom pointer-events-none absolute left-1/2 top-1/2 z-0 h-[420px] w-[820px] max-w-[120%] -translate-x-1/2 -translate-y-1/2 opacity-70"
      />

      <div className="marquee-edge-mask relative z-[1] overflow-hidden py-2">
        <div className="space-y-5">
          <div className="overflow-hidden py-1">
            <MarqueeRow items={topRow} />
          </div>
          <div className="overflow-hidden py-1">
            <MarqueeRow items={bottomRow} reverse />
          </div>
        </div>
      </div>
    </HomeSection>
  );
}
