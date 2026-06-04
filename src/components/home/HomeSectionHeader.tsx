import { cn } from "@/lib/utils";

export type HomeSectionHeaderVariant = "light" | "dark";

type HomeSectionHeaderProps = {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  variant?: HomeSectionHeaderVariant;
  className?: string;
  eyebrowClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

const VARIANT_STYLES: Record<
  HomeSectionHeaderVariant,
  {
    line: string;
    eyebrow: string;
    title: string;
    description: string;
  }
> = {
  light: {
    line: "bg-malachite-700",
    eyebrow: "text-malachite-700",
    title: "text-swamp",
    description: "text-swamp/70",
  },
  dark: {
    line: "bg-malachite",
    eyebrow: "text-malachite",
    title: "text-white",
    description: "text-white/75",
  },
};

export default function HomeSectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  variant = "light",
  className,
  eyebrowClassName,
  titleClassName,
  descriptionClassName,
}: HomeSectionHeaderProps) {
  const styles = VARIANT_STYLES[variant];
  const centered = align === "center";

  return (
    <div className={cn("max-w-3xl", centered && "mx-auto text-center", className)}>
      {eyebrow && (
        <div
          className={cn("flex items-center gap-3", centered && "justify-center")}
        >
          <span className={cn("h-px w-10", styles.line)} aria-hidden />
          <span
            className={cn(
              variant === "dark" ? "label-tech-on-dark" : cn("label-tech", styles.eyebrow),
              eyebrowClassName,
            )}
          >
            {eyebrow}
          </span>
        </div>
      )}

      <h2
        className={cn(
          "font-display mt-4 text-3xl font-bold leading-[1.08] tracking-normal sm:mt-5 sm:text-4xl md:text-5xl lg:text-6xl",
          styles.title,
          titleClassName,
        )}
      >
        {title}
      </h2>

      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-8 sm:mt-6 sm:text-lg",
            styles.description,
            descriptionClassName,
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
