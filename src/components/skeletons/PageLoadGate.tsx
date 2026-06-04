"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { getPageSkeleton } from "@/components/skeletons/registry";
import { cn } from "@/lib/utils";

const MIN_VISIBLE_MS = 280;
const IDLE_TIMEOUT_MS = 900;

function isSafariBrowser() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return (
    /Safari/i.test(ua) &&
    !/Chrome|Chromium|CriOS|FxiOS|EdgiOS|OPR|Android/i.test(ua)
  );
}

function waitForPaintReady(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();

  const minDelay = new Promise<void>((resolve) => {
    window.setTimeout(resolve, MIN_VISIBLE_MS);
  });

  const fonts = document.fonts?.ready ?? Promise.resolve();

  const idle = new Promise<void>((resolve) => {
    const win = window as Window & {
      requestIdleCallback?: (
        cb: IdleRequestCallback,
        opts?: IdleRequestOptions,
      ) => number;
    };
    if (typeof win.requestIdleCallback === "function") {
      win.requestIdleCallback(() => resolve(), { timeout: IDLE_TIMEOUT_MS });
    } else {
      setTimeout(resolve, 120);
    }
  });

  const nextFrame = new Promise<void>((resolve) => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => resolve());
    });
  });

  return Promise.all([minDelay, fonts, idle, nextFrame]).then(() => undefined);
}

type PageLoadGateProps = {
  children: ReactNode;
};

export default function PageLoadGate({ children }: PageLoadGateProps) {
  const pathname = usePathname();
  const [phase, setPhase] = useState<"skeleton" | "content">("skeleton");

  useEffect(() => {
    let cancelled = false;
    setPhase("skeleton");

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      isSafariBrowser()
    ) {
      setPhase("content");
      return;
    }

    void waitForPaintReady().then(() => {
      if (!cancelled) setPhase("content");
    });

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  const Skeleton = getPageSkeleton(pathname);
  const showSkeleton = phase === "skeleton";

  return (
    <div className="relative min-h-[50vh]">
      {showSkeleton && (
        <div
          className="absolute inset-0 z-[60] overflow-x-clip overflow-y-auto bg-white"
          role="status"
          aria-live="polite"
          aria-busy="true"
          aria-label="Loading page"
        >
          <Skeleton />
        </div>
      )}
      <div
        className={cn(
          "transition-opacity duration-300 ease-out",
          showSkeleton ? "pointer-events-none invisible opacity-0" : "opacity-100",
        )}
        aria-hidden={showSkeleton}
      >
        {children}
      </div>
    </div>
  );
}
