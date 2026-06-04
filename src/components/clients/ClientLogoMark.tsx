import Image from "next/image";
import type { ClientLogo } from "@/lib/content/clients";
import { cn } from "@/lib/utils";

type ClientLogoMarkProps = {
  client: ClientLogo;
  size?: number;
  className?: string;
  variant?: "pill" | "marquee";
};

export default function ClientLogoMark({
  client,
  size = 28,
  className,
  variant = "pill",
}: ClientLogoMarkProps) {
  const pill = client.pill;

  const imgSrc =
    variant === "pill" ? (pill?.mark ?? client.mark) : client.src;
  const isWide = (client.aspect ?? 1) > 1.6;
  const width =
    variant === "marquee" && isWide
      ? Math.round(size * 1.8)
      : variant === "pill" && isWide
        ? Math.round(size * 1.35)
        : size;
  const height = size;

  return (
    <Image
      src={imgSrc}
      alt={client.name}
      width={width}
      height={height}
      unoptimized
      className={cn(
        variant === "pill" ? "object-contain object-center" : "object-contain",
        (variant === "pill" || client.round) && "rounded-full",
        className,
      )}
    />
  );
}
