"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

type Props = {
  as?: "h1" | "h2" | "h3";
  /** Each array item is one visual line. */
  lines: string[];
  trigger?: "mount" | "inView";
  /** Wrap the last word of the last line in text-malachite. */
  accentLastWord?: boolean;
  /** Wrap the last word of the last line in brand-gradient-text. Wins over accentLastWord. */
  gradientLastWord?: boolean;
  delay?: number;
  className?: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

const lineVariants: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)", y: "110%", opacity: 0 },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    y: "0%",
    opacity: 1,
    transition: { duration: 0.7, ease: EASE },
  },
};

export default function KineticHeading({
  as = "h2",
  lines,
  trigger = "inView",
  accentLastWord = false,
  gradientLastWord = false,
  delay = 0,
  className,
}: Props) {
  const reduceMotion = useReducedMotion();
  const Tag = motion[as];
  const lastLineIndex = lines.length - 1;

  const renderLineContent = (line: string, isLastLine: boolean) => {
    if (isLastLine && (accentLastWord || gradientLastWord)) {
      const words = line.split(" ");
      const lastWord = words.pop() ?? "";
      const lead = words.join(" ");
      const wordClass = gradientLastWord ? "brand-gradient-text" : "text-malachite";
      return (
        <>
          {lead ? `${lead} ` : null}
          <span className={wordClass}>{lastWord}</span>
        </>
      );
    }
    return line;
  };

  if (reduceMotion) {
    return (
      <Tag className={className}>
        {lines.map((line, i) => (
          <span key={i} className="block">
            {renderLineContent(line, i === lastLineIndex)}
          </span>
        ))}
      </Tag>
    );
  }

  const containerProps =
    trigger === "mount"
      ? { initial: "hidden" as const, animate: "visible" as const }
      : {
          initial: "hidden" as const,
          whileInView: "visible" as const,
          viewport: { once: true, amount: 0.08, margin: "0px 0px -48px 0px" },
        };

  return (
    <Tag
      className={className}
      {...containerProps}
      transition={{ staggerChildren: 0.08, delayChildren: delay }}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span className="block" variants={lineVariants}>
            {renderLineContent(line, i === lastLineIndex)}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
