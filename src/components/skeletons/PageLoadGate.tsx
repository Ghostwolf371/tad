"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { getPageSkeleton } from "@/components/skeletons/registry";
import { cn } from "@/lib/utils";

/** Minimum skeleton time so the transition does not flash. */
const MIN_VISIBLE_MS = 320;
/** Cap wait for hero / priority images so slow networks are not blocked forever. */
const MAX_IMAGE_WAIT_MS = 4500;

function isSafariBrowser() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return (
    /Safari/i.test(ua) &&
    !/Chrome|Chromium|CriOS|FxiOS|EdgiOS|OPR|Android/i.test(ua)
  );
}

function waitForNextFrame(): Promise<void> {
  return new Promise((resolve) => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => resolve());
    });
  });
}

function imageAppearsReady(img: HTMLImageElement) {
  return img.complete && img.naturalWidth > 0;
}

async function waitForImage(img: HTMLImageElement): Promise<void> {
  if (imageAppearsReady(img)) {
    if (typeof img.decode === "function") {
      try {
        await img.decode();
      } catch {
        /* ignore decode errors — paint with loaded bitmap */
      }
    }
    return;
  }

  await new Promise<void>((resolve) => {
    const done = () => resolve();
    img.addEventListener("load", done, { once: true });
    img.addEventListener("error", done, { once: true });
  });

  if (typeof img.decode === "function") {
    try {
      await img.decode();
    } catch {
      /* ignore */
    }
  }
}

/**
 * Waits for priority / above-the-fold images inside the hidden page shell so
 * revealing content does not pop in half-loaded media.
 */
function waitForCriticalImages(root: HTMLElement | null): Promise<void> {
  if (!root) return Promise.resolve();

  const viewportBottom = window.innerHeight * 1.15;
  const seen = new Set<HTMLImageElement>();

  for (const img of root.querySelectorAll("img")) {
    const el = img as HTMLImageElement;
    if (seen.has(el)) continue;

    const isPriority =
      el.getAttribute("fetchpriority") === "high" || el.loading === "eager";
    const rect = el.getBoundingClientRect();
    const inUpperViewport = rect.top < viewportBottom && rect.bottom > 0;

    if (isPriority || inUpperViewport) {
      seen.add(el);
    }
  }

  const images = [...seen];
  if (images.length === 0) return Promise.resolve();

  const loads = Promise.all(images.map((img) => waitForImage(img)));
  const timeout = new Promise<void>((resolve) => {
    window.setTimeout(resolve, MAX_IMAGE_WAIT_MS);
  });

  return Promise.race([loads, timeout]).then(() => undefined);
}

function waitForPageReady(contentRoot: HTMLElement | null): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();

  const minDelay = new Promise<void>((resolve) => {
    window.setTimeout(resolve, MIN_VISIBLE_MS);
  });

  const fonts = document.fonts?.ready ?? Promise.resolve();
  const frames = waitForNextFrame();
  const images = waitForCriticalImages(contentRoot);

  return Promise.all([minDelay, fonts, frames, images]).then(() => undefined);
}

type PageLoadGateProps = {
  children: ReactNode;
};

export default function PageLoadGate({ children }: PageLoadGateProps) {
  const pathname = usePathname();
  const contentRef = useRef<HTMLDivElement>(null);
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

    void (async () => {
      await waitForNextFrame();
      await waitForPageReady(contentRef.current);
      if (!cancelled) setPhase("content");
    })();

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
        ref={contentRef}
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
