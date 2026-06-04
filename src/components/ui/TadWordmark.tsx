import { cn } from "@/lib/utils";

const sizeClasses = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-4xl",
  xl: "text-6xl sm:text-7xl",
  hero: "text-7xl sm:text-8xl lg:text-9xl",
} as const;

const dotSizes = {
  sm: "h-1.5 w-1.5",
  md: "h-2 w-2",
  lg: "h-3 w-3",
  xl: "h-4 w-4",
  hero: "h-5 w-5 sm:h-6 sm:w-6",
} as const;

type TadWordmarkProps = {
  className?: string;
  size?: keyof typeof sizeClasses;
  theme?: "light" | "dark";
  showDot?: boolean;
};

/** Lowercase "tad." wordmark — always uses brand geometric type */
export default function TadWordmark({
  className,
  size = "md",
  theme = "light",
  showDot = true,
}: TadWordmarkProps) {
  return (
    <span
      className={cn(
        "font-sans font-bold lowercase leading-none tracking-normal",
        sizeClasses[size],
        theme === "dark" ? "text-white" : "text-swamp",
        className
      )}
    >
      tad
      {showDot && (
        <span
          className={cn(
            "inline-block rounded-full align-middle",
            dotSizes[size],
            theme === "dark" ? "bg-malachite" : "bg-malachite-700"
          )}
        />
      )}
    </span>
  );
}
