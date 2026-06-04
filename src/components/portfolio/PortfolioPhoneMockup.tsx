"use client";

import Image from "next/image";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

type PortfolioPhoneMockupProps = {
  screenshots: string[];
  alt: string;
  palette: Project["palette"];
  slug?: string;
  priority?: boolean;
  interactive?: boolean;
  className?: string;
};

function hexAlpha(hex: string, alpha: string) {
  const normalized = hex.replace("#", "");
  const expanded =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => char + char)
          .join("")
      : normalized.slice(0, 6);
  return `#${expanded}${alpha}`;
}

/** Matches ServiceMockup phone shell — consistent across marketing sections. */
function PhoneDeviceFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative h-full w-full", className)}>
      <div aria-hidden className="absolute -left-px top-[22%] z-20 h-3.5 w-[2px] rounded-l-sm bg-[#3a3a3c]" />
      <div aria-hidden className="absolute -left-px top-[31%] z-20 h-5 w-[2px] rounded-l-sm bg-[#3a3a3c]" />
      <div aria-hidden className="absolute -left-px top-[42%] z-20 h-5 w-[2px] rounded-l-sm bg-[#3a3a3c]" />
      <div aria-hidden className="absolute -right-px top-[30%] z-20 h-6 w-[2px] rounded-r-sm bg-[#3a3a3c]" />
      <div
        className="relative h-full w-full rounded-[1.35rem] bg-[#1c1c1e] p-[2px] sm:rounded-[1.4rem]"
        style={{
          boxShadow:
            "inset 1px 0 0 rgba(255,255,255,0.08), 0 0 0 1px rgba(255,255,255,0.06), 0 18px 40px rgba(0,30,28,0.22), 0 6px 16px rgba(0,30,28,0.12)",
        }}
      >
        <div className="h-full w-full rounded-[1.22rem] bg-[#0a0a0b] p-[1.5px] sm:rounded-[1.28rem]">
          <div className="relative flex h-full min-h-0 w-full flex-col overflow-hidden rounded-[1.12rem] bg-black sm:rounded-[1.18rem]">
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-[6px] z-30 h-[8px] w-[26%] min-w-[40px] max-w-[52px] -translate-x-1/2 rounded-full bg-[#0d0d0f] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)] sm:top-[7px]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/14 via-transparent to-transparent"
            />
            {children}
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-1 left-1/2 z-30 h-[2px] w-[28%] min-w-[36px] -translate-x-1/2 rounded-full bg-white/30"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function PhoneScreen({
  src,
  alt,
  priority,
  interactive,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  interactive?: boolean;
}) {
  return (
    <div className="relative min-h-0 flex-1 overflow-hidden bg-[#0a0a0b]">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 640px) 22vw, 180px"
        className={cn(
          "object-contain object-top",
          interactive && "transition duration-500 group-hover:scale-[1.015]",
        )}
      />
    </div>
  );
}

/** Light studio backdrop — aligns with browser card preview areas (bone/white, not dark grid). */
function StudioBackdrop({ palette }: { palette: Project["palette"] }) {
  const primary = palette.primary;
  const secondary = palette.secondary;

  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-[#f6faf8] via-white to-[#eef4f1]"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 55% at 18% 88%, ${hexAlpha(primary, "22")} 0%, transparent 58%),
            radial-gradient(ellipse 65% 50% at 88% 22%, ${hexAlpha(secondary, "18")} 0%, transparent 55%),
            radial-gradient(ellipse 90% 60% at 50% 50%, ${hexAlpha(primary, "08")} 0%, transparent 70%)
          `,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-[8%] bottom-[6%] h-[14%] rounded-[100%] bg-swamp/[0.07] blur-xl"
      />
    </>
  );
}

/**
 * Dual-device layout inspired by professional mockup galleries (LS Graphics / Screenhance):
 * two phones, equal prominence, slight overlap, minimal tilt, light isolated studio.
 */
function DualPhonePair({
  screenshots,
  alt,
  priority,
  interactive,
}: {
  screenshots: [string, string];
  alt: string;
  priority?: boolean;
  interactive?: boolean;
}) {
  const [left, right] = screenshots;

  return (
    <div className="relative z-10 flex h-full w-full items-center justify-center px-[6%] pb-[4%] pt-[6%]">
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[5%] left-1/2 h-[10%] w-[72%] -translate-x-1/2 rounded-[100%] bg-swamp/10 blur-2xl"
      />

      <div className="relative flex h-[88%] max-h-full items-center justify-center">
        {/* Left screen — primary */}
        <div
          className={cn(
            "relative z-20 h-full shrink-0 aspect-[10/19.5]",
            interactive && "transition duration-500 group-hover:-translate-y-0.5",
          )}
          style={{ transform: "rotate(-5deg)" }}
        >
          <PhoneDeviceFrame>
            <PhoneScreen src={left} alt={`${alt} — screen 1`} priority={priority} interactive={interactive} />
          </PhoneDeviceFrame>
        </div>

        {/* Right screen — secondary, slightly behind */}
        <div
          className={cn(
            "relative z-10 -ml-[16%] h-[92%] shrink-0 aspect-[10/19.5]",
            interactive && "transition duration-500 group-hover:-translate-y-0.5",
          )}
          style={{ transform: "rotate(7deg) translateY(2%)" }}
        >
          <PhoneDeviceFrame>
            <PhoneScreen src={right} alt={`${alt} — screen 2`} interactive={interactive} />
          </PhoneDeviceFrame>
        </div>
      </div>
    </div>
  );
}

function SinglePhoneCenter({
  src,
  alt,
  priority,
  interactive,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  interactive?: boolean;
}) {
  return (
    <div className="relative z-10 flex h-full w-full items-center justify-center px-[10%] py-[8%]">
      <div
        className={cn(
          "relative h-[88%] aspect-[10/19.5]",
          interactive && "transition duration-500 group-hover:-translate-y-0.5",
        )}
        style={{ transform: "rotate(-3deg)" }}
      >
        <PhoneDeviceFrame>
          <PhoneScreen src={src} alt={alt} priority={priority} interactive={interactive} />
        </PhoneDeviceFrame>
      </div>
    </div>
  );
}

export default function PortfolioPhoneMockup({
  screenshots,
  alt,
  palette,
  priority = false,
  interactive = false,
  className,
}: PortfolioPhoneMockupProps) {
  const primaryShot = screenshots[0];
  const secondaryShot = screenshots[1];
  const hasPair = Boolean(primaryShot && secondaryShot);

  if (!primaryShot) {
    return null;
  }

  return (
    <div
      className={cn(
        "relative flex h-full min-h-0 w-full overflow-hidden",
        className,
      )}
    >
      <StudioBackdrop palette={palette} />

      {hasPair ? (
        <DualPhonePair
          screenshots={[primaryShot, secondaryShot]}
          alt={alt}
          priority={priority}
          interactive={interactive}
        />
      ) : (
        <SinglePhoneCenter
          src={primaryShot}
          alt={alt}
          priority={priority}
          interactive={interactive}
        />
      )}
    </div>
  );
}
