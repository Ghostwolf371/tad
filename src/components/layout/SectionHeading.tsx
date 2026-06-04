import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export type SectionHeadingVariant = "light" | "dark";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  variant?: SectionHeadingVariant;
  /** Scroll-reveal wrapper (off when content must show immediately) */
  reveal?: boolean;
  className?: string;
};

const VARIANT_STYLES: Record<
  SectionHeadingVariant,
  { line: string; eyebrow: string; title: string; description: string }
> = {
  light: {
    line: "bg-malachite-700",
    eyebrow: "text-malachite-700",
    title: "text-swamp",
    description: "text-swamp/75",
  },
  dark: {
    line: "bg-malachite",
    eyebrow: "",
    title: "text-white",
    description: "text-white/85",
  },
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  variant = "light",
  reveal = true,
  className = "",
}: SectionHeadingProps) {
  const styles = VARIANT_STYLES[variant];
  const alignClass = align === "center" ? "text-center mx-auto" : "";

  const body = (
    <div className={cn("max-w-3xl", alignClass, className)}>
      {eyebrow && (
        <div
          className={cn(
            "flex items-center gap-3",
            align === "center" && "justify-center",
          )}
        >
          <span className={cn("h-px w-10", styles.line)} aria-hidden />
          <span
            className={cn(
              variant === "dark" ? "label-tech-on-dark" : cn("label-tech", styles.eyebrow),
            )}
          >
            {eyebrow}
          </span>
        </div>
      )}
      <h2
        className={cn(
          "mt-5 text-3xl font-semibold leading-[1.05] tracking-normal sm:text-4xl lg:text-5xl",
          styles.title,
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            styles.description,
          )}
        >
          {description}
        </p>
      )}
    </div>
  );

  if (!reveal) return body;

  return (
    <Reveal viewport={{ once: true, amount: 0.08 }}>{body}</Reveal>
  );
}
