"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
  { href: site.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: site.social.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  { href: site.social.facebook, label: "Facebook", Icon: FacebookIcon },
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
              className="pointer-events-none absolute -left-1/4 -top-1/4 h-[60vh] w-[60vh]"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(0,227,87,0.22), transparent)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-1/4 -right-1/4 h-[55vh] w-[55vh]"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(1,242,173,0.16), transparent)",
              }}
            />

            <div className="relative flex h-full max-h-full flex-col justify-between gap-5 overflow-y-auto p-6 sm:gap-10 sm:p-10 lg:p-14">
              {/* Eyebrow */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.4, ease: EASE }}
                className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40"
              >
                Menu
              </motion.p>

              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
                {/* LEFT: nav links */}
                <nav
                  aria-label="Primary"
                  className="flex flex-col gap-0.5 sm:gap-1"
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
                            "group inline-flex items-center gap-3 rounded-md py-1 font-semibold leading-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-malachite/70 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas-green sm:py-1.5",
                            active
                              ? "text-malachite"
                              : "text-white hover:text-malachite",
                          )}
                          style={{
                            fontSize: "clamp(1.3rem, 0.85rem + 2vw, 2.75rem)",
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

                {/* RIGHT: contact block */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28, duration: 0.45, ease: EASE }}
                  className="flex flex-col gap-4 sm:gap-7 lg:items-end lg:text-right"
                >
                  <div className="flex flex-col gap-2 sm:gap-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-malachite">
                      Get in touch
                    </p>
                    <a
                      href={site.phoneHref}
                      className="text-base font-medium text-white transition-colors hover:text-malachite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-malachite/70 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas-green sm:text-xl"
                    >
                      {site.phone}
                    </a>
                    <a
                      href={`mailto:${site.email}`}
                      className="text-base font-medium text-white transition-colors hover:text-malachite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-malachite/70 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas-green sm:text-xl"
                    >
                      {site.email}
                    </a>
                  </div>

                  <div className="flex items-center gap-3 lg:justify-end">
                    {SOCIALS.map(({ href, label, Icon }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white transition-colors hover:border-malachite/50 hover:text-malachite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-malachite/70 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas-green sm:h-11 sm:w-11"
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
