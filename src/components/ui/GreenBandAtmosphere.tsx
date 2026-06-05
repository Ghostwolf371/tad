import Starfield from "@/components/ui/Starfield";
import { cn } from "@/lib/utils";

type GreenBandAtmosphereProps = {
  /** Twinkling stars — off for footer and compact UI shells */
  starfield?: boolean;
  className?: string;
};

/**
 * Homepage-style dark-green band atmosphere: center glow, soft bloom, optional stars.
 * Bloom uses percentage sizing (not fixed rem) so it never reads as a visible box.
 */
export default function GreenBandAtmosphere({
  starfield = true,
  className,
}: GreenBandAtmosphereProps) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 z-[1]", className)}
    >
      <div className="section-green-band-glow absolute inset-0 opacity-90" />
      <div className="glow-bloom absolute left-1/2 top-1/2 h-[130%] w-[130%] min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 opacity-50" />
      {starfield && <Starfield className="absolute inset-0 h-full w-full" />}
    </div>
  );
}
