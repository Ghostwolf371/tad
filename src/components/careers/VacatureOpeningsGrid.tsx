"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Clock,
  Code2,
  MapPin,
  Palette,
  Users,
  type LucideIcon,
} from "lucide-react";
import KineticHeading from "@/components/ui/KineticHeading";
import { careersPageContent } from "@/lib/content/careers-page";
import {
  careerCategories,
  careerRoles,
  type CareerCategory,
  type CareerRole,
} from "@/data/careers";
import {
  greenBandCardClassName,
  greenBandChipClassName,
  greenBandIconWellClassName,
} from "@/lib/theme/green-band-surfaces";
import { cn } from "@/lib/utils";

const CATEGORY_ICONS: Record<Exclude<CareerCategory, "all">, LucideIcon> = {
  development: Code2,
  design: Palette,
  management: Users,
};

const CARD_HOVER =
  "transition-[border-color,box-shadow,transform] duration-[480ms] ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none motion-reduce:hover:transform-none hover:-translate-y-1 hover:border-malachite/45 hover:shadow-[0_22px_44px_-16px_rgba(0,0,0,0.45),0_0_0_1px_rgba(0,200,83,0.28),0_0_0_3px_rgba(0,200,83,0.1),0_0_18px_-2px_rgba(0,200,83,0.18)]";

function RoleCard({ role, index }: { role: CareerRole; index: number }) {
  const Icon = CATEGORY_ICONS[role.category] ?? Briefcase;
  const categoryLabel =
    careerCategories.find((c) => c.id === role.category)?.label ?? role.category;

  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="min-w-0"
    >
      <Link
        href={`/vacature/${role.slug}`}
        className={cn(
          greenBandCardClassName("group flex h-full flex-col p-5 sm:p-6", {
            interactive: false,
          }),
          CARD_HOVER,
        )}
      >
        <div className="flex items-start gap-3">
          <div className={greenBandIconWellClassName()}>
            <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
          </div>
          <div className="min-w-0 pt-0.5">
            <p className="label-tech-on-dark text-malachite">{categoryLabel}</p>
            <h3 className="mt-1.5 text-lg font-semibold leading-snug text-white transition-colors group-hover:text-malachite">
              {role.title}
            </h3>
          </div>
        </div>

        <p className="mt-4 flex-1 text-sm leading-relaxed text-white/70">{role.summary}</p>

        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-white/12 pt-4">
          <span className={cn(greenBandChipClassName, "inline-flex items-center gap-1.5")}>
            <Clock className="h-3.5 w-3.5 text-malachite" aria-hidden />
            {role.employmentType}
          </span>
          <span className={cn(greenBandChipClassName, "inline-flex items-center gap-1.5")}>
            <MapPin className="h-3.5 w-3.5 text-malachite" aria-hidden />
            {role.workplace}
          </span>
        </div>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-malachite">
          Read more
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </Link>
    </motion.li>
  );
}

export default function VacatureOpeningsGrid() {
  const { openings } = careersPageContent;
  const [activeCategory, setActiveCategory] = useState<CareerCategory>("all");

  const filtered = useMemo(() => {
    if (activeCategory === "all") return careerRoles;
    return careerRoles.filter((r) => r.category === activeCategory);
  }, [activeCategory]);

  return (
    <div>
      <div className="max-w-3xl">
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-malachite" aria-hidden />
          <span className="label-tech-on-dark text-malachite">{openings.eyebrow}</span>
        </div>
        <KineticHeading
          as="h2"
          lines={[...openings.titleLines]}
          className="mt-4 text-3xl font-semibold leading-[1.08] tracking-normal text-white sm:mt-5 sm:text-4xl md:text-5xl lg:text-6xl"
        />
        <p className="mt-4 max-w-xl text-base leading-8 text-white/75 sm:mt-6 sm:text-lg">
          {openings.description}
        </p>
      </div>

      <div
        className="mt-8 flex flex-wrap justify-start gap-2"
        role="tablist"
        aria-label="Filter roles by department"
      >
        {careerCategories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "border-malachite bg-malachite text-swamp shadow-[0_8px_24px_rgba(0,200,83,0.25)]"
                  : "border-white/15 bg-white/10 text-white/75 hover:border-malachite/40 hover:text-white",
              )}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((role, i) => (
          <RoleCard key={role.slug} role={role} index={i} />
        ))}
      </ul>

      {filtered.length === 0 ? (
        <p className="mt-8 text-center text-sm text-white/65">
          No roles in this category right now. Try another filter or send an open application to{" "}
          <a href="mailto:info@tad.sr" className="font-medium text-malachite hover:underline">
            info@tad.sr
          </a>
          .
        </p>
      ) : null}
    </div>
  );
}
