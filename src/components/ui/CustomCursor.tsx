"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "link" | "view";

/**
 * Desktop-only custom cursor: a precise dot plus a lagging ring that grows into
 * a "View" badge over project cards (elements with data-cursor="view") and a
 * soft circle over links/buttons. Disabled on touch and for reduced-motion.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<Variant>("default");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;
    let shown = false;

    const place = (el: HTMLDivElement | null, px: number, py: number) => {
      if (el) el.style.transform = `translate(${px}px, ${py}px) translate(-50%, -50%)`;
    };

    const loop = () => {
      rx += (mx - rx) * 0.2;
      ry += (my - ry) * 0.2;
      place(ringRef.current, rx, ry);
      if (Math.abs(mx - rx) > 0.1 || Math.abs(my - ry) > 0.1) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0;
      }
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      place(dotRef.current, mx, my);
      if (!shown) {
        shown = true;
        setVisible(true);
      }
      if (!raf) raf = requestAnimationFrame(loop);

      const target = e.target as HTMLElement | null;
      const cursorEl = target?.closest?.("[data-cursor]");
      const cursorAttr = cursorEl?.getAttribute("data-cursor");
      if (cursorAttr === "view") setVariant("view");
      else if (target?.closest?.("a, button, [role='button'], label"))
        setVariant("link");
      else setVariant("default");
    };

    const onLeave = () => {
      shown = false;
      setVisible(false);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[300]">
      <div
        ref={dotRef}
        className={cn(
          "fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-malachite transition-opacity duration-300",
          visible && variant !== "view" ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        ref={ringRef}
        className={cn(
          "fixed left-0 top-0 flex items-center justify-center rounded-full border transition-[width,height,background-color,border-color,opacity] duration-300 ease-out",
          visible ? "opacity-100" : "opacity-0",
          variant === "view"
            ? "h-[68px] w-[68px] border-transparent bg-malachite text-swamp shadow-[0_8px_30px_rgba(0,227,87,0.4)]"
            : variant === "link"
              ? "h-11 w-11 border-malachite/50 bg-malachite/10"
              : "h-8 w-8 border-malachite/70",
        )}
      >
        <span
          className={cn(
            "text-[11px] font-semibold tracking-wide transition-opacity duration-200",
            variant === "view" ? "opacity-100" : "opacity-0",
          )}
        >
          View
        </span>
      </div>
    </div>
  );
}
