import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  href?: string;
  variant?: "full" | "mark";
  theme?: "light" | "dark";
  size?: "md" | "lg";
};

const logoSize = {
  md: {
    full: "h-10 w-auto",
    fullImg: { w: 180, h: 60 },
  },
  lg: {
    full: "h-12 w-auto",
    fullImg: { w: 220, h: 72 },
  },
} as const;

export default function Logo({
  className,
  href = "/",
  size = "md",
}: LogoProps) {
  const s = logoSize[size];

  const content = (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src="/brand/logo-full.webp"
        alt="TAD logo"
        width={s.fullImg.w}
        height={s.fullImg.h}
        sizes="240px"
        className={cn("shrink-0 object-contain", s.full)}
        priority
      />
    </span>
  );
  if (!href) return content;
  return (
    <Link href={href} aria-label="TAD home" className="inline-flex">
      {content}
    </Link>
  );
}
