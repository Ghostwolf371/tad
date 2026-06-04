import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  items: ReactNode[];
  /** Use .animate-marquee-reverse instead of .animate-marquee. */
  reverse?: boolean;
  /** Tailwind gap class. */
  gap?: string;
  className?: string;
  itemClassName?: string;
};

export default function MarqueeRail({
  items,
  reverse = false,
  gap = "gap-10",
  className,
  itemClassName,
}: Props) {
  const animClass = reverse ? "animate-marquee-reverse" : "animate-marquee";

  return (
    <div className={cn("group overflow-hidden marquee-edge-mask", className)}>
      <div
        className={cn(
          "flex w-max group-hover:[animation-play-state:paused]",
          gap,
          animClass,
        )}
      >
        <div className={cn("flex shrink-0", gap)}>
          {items.map((item, i) => (
            <div key={i} className={itemClassName}>
              {item}
            </div>
          ))}
        </div>
        <div className={cn("flex shrink-0", gap)} aria-hidden>
          {items.map((item, i) => (
            <div key={i} className={itemClassName}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
