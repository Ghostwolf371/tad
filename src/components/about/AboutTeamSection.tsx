"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import PageSection, { type SectionTone } from "@/components/layout/PageSection";
import HomeSectionHeader from "@/components/home/HomeSectionHeader";
import { aboutContent } from "@/lib/content/about";
import { greenBandCardClassName } from "@/lib/theme/green-band-surfaces";

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
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className={greenBandCardClassName("group relative flex h-full flex-col overflow-hidden", {
        interactive: true,
      })}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute right-3 top-3 z-10 font-mono text-4xl font-bold leading-none text-white/[0.08]"
      >
        {num}
      </span>

      <div className="relative aspect-[4/5] overflow-hidden bg-swamp/40">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-swamp/85 via-swamp/20 to-transparent"
        />
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <h3 className="text-xl font-semibold text-white">{member.name}</h3>
          <p className="label-tech-on-dark mt-1 text-malachite">{member.role}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-sm leading-relaxed text-white/78">{member.bio}</p>
        <div
          aria-hidden
          className="mt-5 h-px w-full bg-gradient-to-r from-malachite/50 via-white/15 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      </div>
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
      tone="dark-green"
      previousTone={previousTone}
      ambient="timeline"
      py="pt-6 pb-10 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-32"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end lg:gap-14">
        <HomeSectionHeader
          variant="dark"
          eyebrow={team.eyebrow}
          title={team.title}
          className="max-w-none"
          titleClassName="leading-[1.04]"
          descriptionClassName="max-w-xl"
        />
        <p className="text-sm leading-relaxed text-white/75 lg:pb-2 lg:text-right lg:text-base">
          {team.intro}
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5 sm:mt-12">
        {team.members.map((member, i) => (
          <TeamMemberCard key={member.name} member={member} index={i} />
        ))}
      </div>
    </PageSection>
  );
}
