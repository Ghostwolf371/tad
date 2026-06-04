"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import HomeSectionHeader from "@/components/home/HomeSectionHeader";
import type { CareerRole } from "@/data/careers";
import { surfaceCardInteractiveClassName } from "@/lib/theme/surfaces";
import { cn } from "@/lib/utils";

type CareerRoleRelatedProps = {
  roles: CareerRole[];
};

export default function CareerRoleRelated({ roles }: CareerRoleRelatedProps) {
  if (roles.length === 0) return null;

  return (
    <div>
      <HomeSectionHeader
        variant="light"
        eyebrow="More roles"
        title="Other openings at TAD"
        description="Explore similar positions or browse every role on the careers page."
        align="center"
        className="mx-auto max-w-2xl"
      />
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {roles.map((role, i) => (
          <motion.li
            key={role.slug}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href={`/vacature/${role.slug}`}
              className={cn(
                surfaceCardInteractiveClassName(),
                "group flex h-full flex-col p-6",
              )}
            >
              <p className="label-tech text-malachite-700">{role.employmentType}</p>
              <h3 className="mt-2 text-lg font-semibold text-swamp group-hover:text-malachite-800">
                {role.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-swamp/65 line-clamp-3">
                {role.summary}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-malachite-700">
                View role
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </motion.li>
        ))}
      </ul>
      <p className="mt-8 text-center">
        <Link
          href="/vacature"
          className="inline-flex items-center gap-2 text-sm font-medium text-swamp/70 transition-colors hover:text-malachite-700"
        >
          <ArrowRight className="h-4 w-4 rotate-180" aria-hidden />
          All open roles
        </Link>
      </p>
    </div>
  );
}
