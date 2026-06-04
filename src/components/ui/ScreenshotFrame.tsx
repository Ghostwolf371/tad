import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  variant?: "browser" | "phone";
  /** Shown in the browser address bar (e.g. "queenshotel.sr"); ignored for phone. */
  url?: string;
  width: number;
  height: number;
  priority?: boolean;
  sizes?: string;
  /** Tailwind radius class override. */
  rounded?: string;
  className?: string;
};

export default function ScreenshotFrame({
  src,
  alt,
  variant = "browser",
  url,
  width,
  height,
  priority = false,
  sizes,
  rounded,
  className,
}: Props) {
  if (variant === "phone") {
    return (
      <div
        className={cn(
          "relative overflow-hidden border border-white/15 bg-white/80 p-2 backdrop-blur",
          rounded ?? "rounded-[2.5rem]",
          className,
        )}
      >
        <div className="mx-auto mb-2 h-1.5 w-20 rounded-full bg-swamp/15" aria-hidden />
        <div className="relative overflow-hidden rounded-[2rem]">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            sizes={sizes}
            className="h-full w-full object-cover object-top"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "overflow-hidden border border-white/15 bg-white/80 backdrop-blur",
        rounded ?? "rounded-[1.4rem]",
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-swamp/10 px-4 py-3">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        {url ? (
          <span className="inline-flex max-w-full items-center truncate rounded-full border border-swamp/10 bg-white/80 px-3 py-1 font-mono text-[11px] tracking-[0.04em] text-swamp/52">
            {url}
          </span>
        ) : null}
      </div>
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes={sizes}
          className="h-full w-full object-cover object-top"
        />
      </div>
    </div>
  );
}
