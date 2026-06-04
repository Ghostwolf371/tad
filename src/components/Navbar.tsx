"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import Logo from "./Logo";
import { ButtonLink, buttonVariants } from "./ui/Button";
import OverlayMenu from "./OverlayMenu";
import { cn } from "@/lib/utils";

const subscribeToClientMount = (onStoreChange: () => void) => {
  queueMicrotask(onStoreChange);
  return () => {};
};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

function MobileMenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative grid h-5 w-5 place-items-center" aria-hidden>
      <span
        className={cn(
          "col-start-1 row-start-1 flex w-5 flex-col gap-[5px] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "scale-75 opacity-0" : "scale-100 opacity-100",
        )}
      >
        <span className="h-[2px] w-full rounded-full bg-swamp" />
        <span className="flex w-full justify-end">
          <span className="h-[2px] w-1/2 rounded-full bg-malachite" />
        </span>
        <span className="h-[2px] w-full rounded-full bg-swamp" />
      </span>
      <X
        strokeWidth={2.5}
        className={cn(
          "col-start-1 row-start-1 h-5 w-5 text-malachite-700 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "scale-100 rotate-0 opacity-100" : "scale-75 rotate-90 opacity-0",
        )}
      />
    </span>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const portalReady = useSyncExternalStore(
    subscribeToClientMount,
    getClientSnapshot,
    getServerSnapshot,
  );

  const closeMenu = useCallback(() => setOpen(false), []);
  const toggleMenu = useCallback(() => setOpen((v) => !v), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const prevPathRef = useRef(pathname);
  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;
      closeMenu();
    }
  }, [pathname, closeMenu]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeMenu]);

  const frosted = open || scrolled;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[92]">
        {/* Frosted panel that draws in on scroll / when open */}
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 origin-top border-b transition-[opacity,transform,box-shadow] duration-300",
            // Mobile: always a clean near-white bar so the logo reads cleanly (no glassy see-through).
            "scale-y-100 border-swamp/10 bg-white/95 opacity-100 shadow-[0_8px_30px_rgba(0,0,0,0.05)] backdrop-blur-md",
            // Desktop: transparent at top, frosted glass on scroll / when open.
            frosted
              ? "sm:bg-white/70 sm:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
              : "sm:scale-y-95 sm:border-transparent sm:bg-white/0 sm:opacity-0 sm:shadow-none sm:backdrop-blur-none",
          )}
        />

        <div className="relative mx-auto max-w-[90rem] px-5 sm:px-6 lg:px-20">
          <div
            className={cn(
              "flex items-center justify-between transition-[height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
              scrolled ? "h-[4.5rem]" : "h-[5.25rem]",
            )}
          >
            <Logo size="lg" className="[&_img]:h-9 sm:[&_img]:h-12" />

            <div className="flex items-center gap-2 sm:gap-3">
              <ButtonLink
                href="/contact"
                size="md"
                variant="outline"
                className="hidden sm:inline-flex"
              >
                Start a project
              </ButtonLink>

              <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="site-menu"
                onClick={toggleMenu}
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "relative z-[1] h-10 w-10 shrink-0 rounded-xl p-0 sm:h-11 sm:w-11",
                  open && "border-malachite/45 bg-white text-malachite-700",
                )}
              >
                <MobileMenuIcon open={open} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {portalReady
        ? createPortal(
            <div id="site-menu">
              <OverlayMenu open={open} onClose={closeMenu} pathname={pathname} />
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
