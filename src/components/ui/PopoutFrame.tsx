import Image from "next/image";
import { cn } from "@/lib/utils";

export type PopoutFrameMode = "cover" | "character" | "contain" | "popout";

type PopoutFrameProps = {
  src: string;
  alt: string;
  mode: PopoutFrameMode;
  sizes?: string;
  aspectClassName?: string;
  frameClassName?: string;
  className?: string;
};

export default function PopoutFrame({
  src,
  alt,
  mode,
  sizes = "100vw",
  aspectClassName = "aspect-[16/10]",
  frameClassName,
  className,
}: PopoutFrameProps) {
  const isCharacter = mode === "character";
  const isContain = mode === "contain";
  const isCover = mode === "cover";
  const isPopout = mode === "popout";

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        aspectClassName,
        isCharacter || isPopout ? "overflow-visible" : "overflow-hidden",
        frameClassName,
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={cn(
          isContain && "object-contain object-center p-3",
          isCover && "object-cover object-top",
          isCharacter &&
            "object-contain object-bottom drop-shadow-[0_16px_32px_rgba(0,30,28,0.2)]",
          isPopout &&
            "object-contain object-bottom px-2 pb-0 pt-2 drop-shadow-[0_14px_30px_rgba(0,30,28,0.18)]"
        )}
      />
      {isCover && (
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-swamp/25 via-transparent to-transparent"
          aria-hidden
        />
      )}
    </div>
  );
}
