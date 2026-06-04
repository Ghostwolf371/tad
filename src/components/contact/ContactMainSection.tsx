"use client";

import { Mail, MapPin, Phone, ArrowUpRight, MessageSquare } from "lucide-react";
import HomeSectionHeader from "@/components/home/HomeSectionHeader";
import ContactForm from "@/components/contact/ContactForm";
import Reveal from "@/components/ui/Reveal";
import { site } from "@/lib/content/site";
import { surfaceCardClassName } from "@/lib/theme/surfaces";
import { cn } from "@/lib/utils";

const CHANNELS = [
  {
    icon: Phone,
    label: "Phone",
    value: site.phone,
    href: site.phoneHref,
  },
  {
    icon: Mail,
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: site.location,
    href: `https://maps.google.com/?q=${encodeURIComponent(site.location)}`,
  },
] as const;

export default function ContactMainSection() {
  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start lg:gap-14 xl:gap-20">
      <Reveal>
        <HomeSectionHeader
          eyebrow="Reach us"
          title="We're here to help."
          description="Prefer email or a call? We respond within one business day."
          className="max-w-xl"
          titleClassName="text-3xl sm:text-4xl lg:text-5xl"
        />
        <p className="mt-6 max-w-md text-sm leading-relaxed text-swamp/60">
          Reach the studio directly — we review every message and follow up with clear next steps.
        </p>

        <div className={surfaceCardClassName("mt-8 overflow-hidden")}>
          <div className="flex items-center gap-3 border-b border-swamp/8 px-5 py-4 sm:px-6">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-malachite/25 bg-malachite/10 text-malachite-700">
              <Phone className="h-4 w-4" strokeWidth={1.75} aria-hidden />
            </span>
            <div>
              <p className="label-tech text-malachite-700">Contact</p>
              <p className="text-sm text-swamp/60">Paramaribo HQ · Suriname</p>
            </div>
          </div>
          <ul className="divide-y divide-swamp/8">
            {CHANNELS.map((channel) => {
              const Icon = channel.icon;
              const row = (
                <>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-swamp/10 bg-white text-malachite-700">
                    <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="label-tech text-malachite-700">{channel.label}</p>
                    <p className="mt-1 text-sm font-medium leading-snug text-swamp">
                      {channel.value}
                    </p>
                  </div>
                  {channel.href && (
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 text-swamp/25 transition group-hover:text-malachite-700"
                      aria-hidden
                    />
                  )}
                </>
              );

              return (
                <li key={channel.label}>
                  {channel.href ? (
                    <a
                      href={channel.href}
                      className={cn(
                        "group flex items-start gap-4 px-5 py-4 transition-colors sm:px-6",
                        "hover:bg-malachite/[0.04]",
                      )}
                      target={channel.label === "Location" ? "_blank" : undefined}
                      rel={
                        channel.label === "Location" ? "noopener noreferrer" : undefined
                      }
                    >
                      {row}
                    </a>
                  ) : (
                    <div className="flex items-start gap-4 px-5 py-4 sm:px-6">{row}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </Reveal>

      <Reveal>
        <div className={surfaceCardClassName("overflow-hidden lg:mt-2")}>
          <div className="flex items-center gap-3 border-b border-swamp/8 px-5 py-4 sm:px-6">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-malachite/25 bg-malachite/10 text-malachite-700">
              <MessageSquare className="h-4 w-4" strokeWidth={1.75} aria-hidden />
            </span>
            <div>
              <p className="label-tech text-malachite-700">Project inquiry</p>
              <p className="text-sm text-swamp/60">
                Tell us about your goals — we&apos;ll reply with next steps.
              </p>
            </div>
          </div>
          <div className="p-5 sm:p-6">
            <ContactForm />
          </div>
        </div>
      </Reveal>
    </div>
  );
}
