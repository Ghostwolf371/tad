"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import HomeSectionHeader from "@/components/home/HomeSectionHeader";
import { site } from "@/lib/content/site";
import { cn } from "@/lib/utils";

export default function ContactMapSection() {
  return (
    <>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-14">
        <HomeSectionHeader
          variant="dark"
          eyebrow="Location"
          title="Visit us in Paramaribo"
          description="Stop by the studio or open directions — we're on the ground in Suriname with clients across the region."
          className="max-w-none"
          titleClassName="leading-[1.04]"
        />
        <p className="text-sm leading-relaxed text-white/70 lg:pb-2 lg:text-right lg:text-base">
          {site.location}
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-10 overflow-hidden rounded-2xl border border-white/12 bg-white/[0.06] shadow-[0_24px_64px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:mt-12"
      >
        <div className="relative h-[380px] w-full sm:h-[420px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15915.228511736932!2d-55.166667!3d5.833333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwNTAnMDAuMCJOIDU1wrAxMCcwMC4wIlc!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="TAD Location"
            className="absolute inset-0"
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-5 py-4 sm:px-6">
          <div>
            <p className="text-sm font-semibold text-white">Studio address</p>
            <p className="mt-0.5 text-sm text-white/65">{site.location}</p>
          </div>
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(site.location)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium text-white transition hover:border-malachite/35 hover:bg-malachite/15 hover:text-malachite"
          >
            Open in Maps
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </motion.div>
    </>
  );
}
