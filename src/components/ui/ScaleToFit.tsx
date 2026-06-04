"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ScaleToFitProps = {
  /** Width the children are designed/rendered at (px). */
  designWidth: number;
  /** Height the children are designed/rendered at (px). */
  designHeight: number;
  /** Cap so the content isn't upscaled past its design size. */
  maxScale?: number;
  className?: string;
  children: ReactNode;
};

/**
 * Renders `children` at a fixed design size and uniformly scales it to fit the
 * available width — so artwork keeps its proportions in any column width
 * instead of stretching or overflowing. `aspect-ratio` reserves the correct
 * height up front, so there's no layout shift before the scale is measured.
 */
export default function ScaleToFit({
  designWidth,
  designHeight,
  maxScale = 1,
  className,
  children,
}: ScaleToFitProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      if (w > 0) setScale(Math.min(maxScale, w / designWidth));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [designWidth, maxScale]);

  return (
    <div
      ref={ref}
      className={cn("overflow-hidden", className)}
      style={{ aspectRatio: `${designWidth} / ${designHeight}` }}
    >
      <div
        style={{
          width: designWidth,
          height: designHeight,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
}
