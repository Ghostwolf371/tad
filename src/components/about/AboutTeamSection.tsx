"use client";

import { User } from "lucide-react";
import { motion } from "framer-motion";
import PageSection, { type SectionTone } from "@/components/layout/PageSection";
import HomeSectionHeader from "@/components/home/HomeSectionHeader";
import { aboutContent } from "@/lib/content/about";
import { surfaceCardInteractiveClassName } from "@/lib/theme/surfaces";

type AboutTeamSectionProps = {
  sectionIndex?: number;
  previousTone?: SectionTone;
};

function TeamMemberCard({
  member,
  index,
}: {
  member: (typeof aboutContent.team.members)[number];
  index: number;
}) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className={surfaceCardInteractiveClassName(
        "group relative flex h-full flex-col items-center overflow-hidden p-6 text-center sm:p-7",
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute right-3 top-3 font-mono text-4xl font-bold leading-none text-swamp/[0.06]"
      >
        {num}
      </span>

      <div
        className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#e8eaed] ring-1 ring-swamp/10 sm:h-28 sm:w-28"
        aria-hidden
      >
        <User
          className="h-11 w-11 text-[#9aa0a6] sm:h-12 sm:w-12"
          strokeWidth={1.5}
        />
      </div>

      <h3 className="mt-5 text-lg font-semibold leading-snug text-swamp">{member.name}</h3>
      <p className="label-tech mt-1.5 text-malachite-700">{member.role}</p>

      <div
        aria-hidden
        className="mt-5 h-px w-full max-w-[8rem] bg-gradient-to-r from-transparent via-malachite/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </motion.article>
  );
}

export default function AboutTeamSection({
  sectionIndex = 4,
  previousTone = "dark-green",
}: AboutTeamSectionProps) {
  const { team } = aboutContent;

  return (
    <PageSection
      index={sectionIndex}
      tone="white"
      previousTone={previousTone}
      py="pt-6 pb-10 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-32"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end lg:gap-14">
        <HomeSectionHeader
          variant="light"
          eyebrow={team.eyebrow}
          title={team.title}
          className="max-w-none"
          titleClassName="leading-[1.04]"
          descriptionClassName="max-w-xl"
        />
        <p className="text-sm leading-relaxed text-swamp/75 lg:pb-2 lg:text-right lg:text-base">
          {team.intro}
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-5 sm:mt-12">
        {team.members.map((member, i) => (
          <TeamMemberCard key={member.name} member={member} index={i} />
        ))}
      </div>
    </PageSection>
  );
}
