"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { ButtonLink } from "./ui/Button";
import { InstagramIcon, LinkedInIcon, FacebookIcon } from "./icons/Social";
import { site } from "@/lib/content/site";
import { cn } from "@/lib/utils";

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/vacature", label: "Careers" },
  { href: "/contact", label: "Contact" },
] as const;

const EASE = [0.215, 0.61, 0.355, 1] as const;

const SOCIALS = [
  { href: site.social.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: site.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: site.social.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
] as const;

const CONTACTS = [
  { Icon: Phone, label: "Call Us", value: site.phone, href: site.phoneHref },
  { Icon: Mail, label: "Email Us", value: site.email, href: `mailto:${site.email}` },
  { Icon: MapPin, label: "Find Us", value: site.location, href: undefined },
] as const;

type OverlayMenuProps = {
  open: boolean;
  onClose: () => void;
  pathname: string | null;
};

export default function OverlayMenu({ open, onClose, pathname }: OverlayMenuProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    cardRef.current?.focus();
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[91]"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          onKeyDown={(event) => {
            if (event.key === "Escape") onClose();
          }}
        >
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Close menu"
            tabIndex={-1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="absolute inset-0 bg-swamp/40 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Card */}
          <motion.div
            ref={cardRef}
            tabIndex={-1}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="absolute inset-x-3 bottom-3 top-[5.25rem] overflow-hidden rounded-[0.75rem] bg-canvas-green outline-none sm:inset-x-5 sm:bottom-5 sm:top-24 lg:inset-x-8 lg:bottom-8"
          >
            {/* Green radial-glow accents */}
            <div
              aria-hidden
              className="pointer-events-none absolute -left-1/4 top-0 h-[70vh] w-[70vh]"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(0,227,87,0.20), transparent)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-1/4 -right-1/4 h-[55vh] w-[55vh]"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(1,242,173,0.14), transparent)",
              }}
            />

            {/* Giant faint wordmark (desktop) */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 hidden select-none items-center justify-center lg:flex"
            >
              <span className="text-[27vw] font-extrabold leading-none tracking-tighter text-white/[0.03]">
                TAD
              </span>
            </span>

            <div className="relative flex h-full max-h-full flex-col gap-8 overflow-y-auto p-6 sm:p-10 lg:p-14">
              {/* Eyebrow */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.4, ease: EASE }}
                className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40"
              >
                Menu
              </motion.p>

              <div className="flex flex-1 flex-col gap-10 lg:grid lg:grid-cols-2 lg:items-center lg:gap-0">
                {/* LEFT: nav links */}
                <nav
                  aria-label="Primary"
                  className="flex flex-col gap-0.5 sm:gap-1 lg:pr-16"
                >
                  {NAV.map((item, i) => {
                    const active =
                      item.href === "/"
                        ? pathname === "/"
                        : Boolean(pathname?.startsWith(item.href));
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.12 + i * 0.05,
                          duration: 0.4,
                          ease: EASE,
                        }}
                      >
                        <Link
                          href={item.href}
                          onClick={onClose}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "group flex w-fit items-center gap-3 rounded-lg px-3 py-1 font-semibold leading-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-malachite/70 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas-green sm:py-1.5 lg:-mx-3 lg:px-4 lg:py-2",
                            active
                              ? "text-malachite lg:bg-white/[0.05]"
                              : "text-white hover:text-malachite lg:hover:bg-white/[0.04]",
                          )}
                          style={{
                            fontSize: "clamp(1.3rem, 0.85rem + 2vw, 2.6rem)",
                          }}
                        >
                          <span
                            aria-hidden
                            className={cn(
                              "inline-block h-px w-6 origin-left bg-malachite transition-transform duration-300 ease-[cubic-bezier(0.215,0.61,0.355,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100",
                              active ? "scale-x-100" : "scale-x-0",
                            )}
                          />
                          {item.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                {/* RIGHT: rich contact (desktop) */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28, duration: 0.45, ease: EASE }}
                  className="hidden h-full flex-col justify-center gap-10 border-white/10 lg:flex lg:border-l lg:pl-16"
                >
                  <div>
                    <h3 className="flex items-center gap-2 text-2xl font-semibold text-white">
                      Get In Touch
                      <ArrowUpRight className="h-5 w-5 text-malachite" />
                    </h3>
                    <div className="mt-7 flex flex-col gap-5">
                      {CONTACTS.map(({ Icon, label, value, href }) => {
                        const inner = (
                          <>
                            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/15 text-white/80 transition-colors group-hover:border-malachite/50 group-hover:text-malachite">
                              <Icon className="h-5 w-5" strokeWidth={1.6} />
                            </span>
                            <span className="min-w-0">
                              <span className="block text-xs uppercase tracking-[0.12em] text-white/40">
                                {label}
                              </span>
                              <span className="block text-lg font-medium leading-snug text-white transition-colors group-hover:text-malachite">
                                {value}
                              </span>
                            </span>
                          </>
                        );
                        return href ? (
                          <a
                            key={label}
                            href={href}
                            className="group flex items-center gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-malachite/70 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas-green"
                          >
                            {inner}
                          </a>
                        ) : (
                          <div key={label} className="group flex items-center gap-4">
                            {inner}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h3 className="flex items-center gap-2 text-2xl font-semibold text-white">
                      Social Links
                      <ArrowUpRight className="h-5 w-5 text-malachite" />
                    </h3>
                    <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
                      {SOCIALS.map(({ href, label, Icon }) => (
                        <a
                          key={label}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-2.5 text-white/80 transition-colors hover:text-malachite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-malachite/70 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas-green"
                        >
                          <Icon className="h-5 w-5" />
                          <span className="link-underline text-base font-medium">
                            {label}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* RIGHT: compact contact (mobile / tablet) */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28, duration: 0.45, ease: EASE }}
                  className="flex flex-col gap-5 lg:hidden"
                >
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-malachite">
                      Get in touch
                    </p>
                    <a
                      href={site.phoneHref}
                      className="link-underline inline-block w-fit text-base font-medium text-white transition-colors hover:text-malachite sm:text-xl"
                    >
                      {site.phone}
                    </a>
                    <a
                      href={`mailto:${site.email}`}
                      className="link-underline inline-block w-fit text-base font-medium text-white transition-colors hover:text-malachite sm:text-xl"
                    >
                      {site.email}
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    {SOCIALS.map(({ href, label, Icon }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white transition-colors hover:border-malachite/50 hover:text-malachite sm:h-11 sm:w-11"
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    ))}
                  </div>

                  <ButtonLink
                    href="/contact"
                    size="lg"
                    variant="outline"
                    onClick={onClose}
                    className="w-full border-white/20 bg-transparent text-white hover:border-malachite/60 hover:text-malachite sm:w-auto"
                  >
                    Start a project
                  </ButtonLink>
                </motion.div>
              </div>

              {/* Bottom meta */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.42, duration: 0.45, ease: EASE }}
                className="flex flex-col gap-1 border-t border-white/10 pt-6 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between"
              >
                <span>From now to next.</span>
                <span>Paramaribo, Suriname</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
