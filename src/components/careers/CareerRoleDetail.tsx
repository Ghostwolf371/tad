"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PageHero from "@/components/layout/PageHero";
import PageSection from "@/components/layout/PageSection";
import HomeSectionHeader from "@/components/home/HomeSectionHeader";
import { PAGE_SECTION_PY } from "@/lib/theme/section-spacing";
import { ButtonLink } from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import CareerRoleRelated from "@/components/careers/CareerRoleRelated";
import type { CareerRole } from "@/data/careers";
import { careerCategories, getRelatedCareerRoles } from "@/data/careers";
import { heroTitleLines } from "@/lib/hero-title-lines";
import {
  greenBandChipClassName,
  greenBandPanelCardClassName,
} from "@/lib/theme/green-band-surfaces";
import { surfaceCardClassName } from "@/lib/theme/surfaces";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Check,
  Clock,
  Code2,
  MapPin,
  Palette,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type CareerRoleDetailProps = {
  role: CareerRole;
};

const CATEGORY_ICONS: Record<Exclude<CareerRole["category"], never>, LucideIcon> = {
  development: Code2,
  design: Palette,
  management: Users,
};

function categoryLabel(category: CareerRole["category"]): string {
  return careerCategories.find((c) => c.id === category)?.label ?? category;
}

function MetaChip({
  icon: Icon,
  children,
  dark = false,
}: {
  icon: LucideIcon;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium",
        dark
          ? cn(greenBandChipClassName)
          : "border-malachite/20 bg-malachite/[0.06] text-swamp/75",
      )}
    >
      <Icon
        className={cn("h-3.5 w-3.5 shrink-0", dark ? "text-malachite" : "text-malachite-700")}
        aria-hidden
      />
      {children}
    </span>
  );
}

function RoleList({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed text-swamp/80 sm:text-[0.9375rem]">
          <span
            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-malachite"
            aria-hidden
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ApplyPanel({
  role,
  applyHref,
  className,
}: {
  role: CareerRole;
  applyHref: string;
  className?: string;
}) {
  return (
    <div className={cn(surfaceCardClassName(), "overflow-hidden shadow-[0_16px_40px_rgba(0,30,28,0.07)]", className)}>
      <div
        aria-hidden
        className="h-1 bg-gradient-to-r from-malachite via-spring to-malachite/40"
      />
      <div className="p-6 lg:p-7">
        <p className="label-tech text-malachite-700">Apply</p>
        <p className="mt-2 text-lg font-semibold leading-snug text-swamp">{role.title}</p>
        <p className="mt-2 text-sm leading-relaxed text-swamp/65">
          Email your CV, portfolio link, and a short note on why you want to join TAD.
        </p>
        <ButtonLink href={applyHref} size="lg" variant="primary" className="mt-6 w-full">
          Apply for this role <ArrowRight className="h-4 w-4" />
        </ButtonLink>
        <ButtonLink href="/contact" size="md" variant="outline" className="mt-3 w-full">
          Ask a question first
        </ButtonLink>
        <div className="mt-6 space-y-2.5 border-t border-swamp/8 pt-5 text-sm text-swamp/70">
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0 text-malachite-700" aria-hidden />
            {role.workplace}
          </p>
          <p className="flex items-center gap-2">
            <Clock className="h-4 w-4 shrink-0 text-malachite-700" aria-hidden />
            {role.employmentType}
          </p>
          <p className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 shrink-0 text-malachite-700" aria-hidden />
            {categoryLabel(role.category)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CareerRoleDetail({ role }: CareerRoleDetailProps) {
  const applyHref = `mailto:info@tad.sr?subject=${encodeURIComponent(`Application — ${role.title}`)}`;
  const related = getRelatedCareerRoles(role.slug, 3);
  const titleLines = heroTitleLines(role.title);

  return (
    <>
      <PageHero
        eyebrow={categoryLabel(role.category)}
        titleLines={titleLines}
        titleGradientLine={titleLines.length > 1 ? 1 : 0}
        subtitle={role.summary}
        cta={{ label: "Apply for this role", href: applyHref }}
      />

      <PageSection
        index={0}
        tone="white"
        previousTone="light-green"
        py="py-8 sm:py-10"
        backgroundClassName="bg-[#FEFEFE]"
      >
        <Reveal>
          <div className="flex flex-wrap items-center gap-2">
            <MetaChip icon={MapPin}>{role.workplace}</MetaChip>
            <MetaChip icon={Clock}>{role.employmentType}</MetaChip>
            <MetaChip icon={Briefcase}>{categoryLabel(role.category)}</MetaChip>
          </div>
        </Reveal>
      </PageSection>

      <PageSection
        index={1}
        tone="white"
        previousTone="white"
        py={PAGE_SECTION_PY}
        backgroundClassName="bg-[#FEFEFE]"
        className="border-t border-swamp/[0.06]"
      >
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
          <div className="min-w-0 lg:col-span-8">
            <Link
              href="/vacature"
              className="inline-flex items-center gap-2 text-sm font-medium text-swamp/60 transition-colors hover:text-malachite-700"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              All open roles
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 max-w-3xl"
            >
              <p className="label-tech text-malachite-700">About this role</p>
              <p className="mt-4 text-base leading-relaxed text-swamp/80 sm:text-lg">
                {role.intro}
              </p>
            </motion.div>

            <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-10 xl:gap-14">
              <motion.section
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 className="text-xl font-semibold tracking-normal text-swamp sm:text-2xl">
                  What you&apos;ll do
                </h2>
                <div className="mt-2 h-px w-12 bg-malachite" aria-hidden />
                <div className="mt-6">
                  <RoleList items={role.responsibilities} />
                </div>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.45, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 className="text-xl font-semibold tracking-normal text-swamp sm:text-2xl">
                  What we&apos;re looking for
                </h2>
                <div className="mt-2 h-px w-12 bg-malachite" aria-hidden />
                <div className="mt-6">
                  <RoleList items={role.requirements} />
                </div>
                {role.niceToHave && role.niceToHave.length > 0 ? (
                  <div className="mt-8">
                    <p className="flex items-center gap-2 text-sm font-semibold text-swamp">
                      <Sparkles className="h-4 w-4 text-malachite-700" aria-hidden />
                      Nice to have
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {role.niceToHave.map((item) => (
                        <li
                          key={item}
                          className="rounded-lg border border-malachite/20 bg-white px-3 py-2 text-sm text-swamp/75"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </motion.section>
            </div>

            <div className="mt-12 lg:hidden">
              <ApplyPanel role={role} applyHref={applyHref} />
            </div>
          </div>

          <aside className="mt-10 hidden lg:col-span-4 lg:mt-0 lg:block">
            <div className="lg:sticky lg:top-28">
              <ApplyPanel role={role} applyHref={applyHref} />
            </div>
          </aside>
        </div>
      </PageSection>

      <PageSection
        index={2}
        tone="dark-green"
        previousTone="white"
        py={PAGE_SECTION_PY}
        ambient="dark-band"
      >
        <HomeSectionHeader
          variant="dark"
          eyebrow="Benefits"
          title="What we offer"
          description="Working at TAD means real projects, a tight team, and room to grow your craft."
          align="left"
          className="max-w-2xl"
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {role.whatWeOffer.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className={cn(greenBandPanelCardClassName(), "flex gap-4 p-5 sm:p-6")}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-malachite/30 bg-malachite/15 text-malachite">
                <Check className="h-4 w-4" strokeWidth={2.5} aria-hidden />
              </span>
              <p className="text-sm leading-relaxed text-white/80 sm:text-[0.9375rem]">{item}</p>
            </motion.li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href={applyHref} size="lg" variant="primary">
            Apply for this role <ArrowRight className="h-4 w-4" />
          </ButtonLink>
          <Link
            href="/vacature"
            className="inline-flex items-center gap-2 self-center text-sm font-medium text-white/70 transition-colors hover:text-malachite"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Browse all roles
          </Link>
        </div>
      </PageSection>

      <PageSection
        index={3}
        tone="white"
        previousTone="dark-green"
        py={PAGE_SECTION_PY}
        backgroundClassName="bg-[#FEFEFE]"
      >
        <CareerRoleRelated roles={related} />
      </PageSection>
    </>
  );
}
