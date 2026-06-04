import { cn } from "@/lib/utils";

type GreenBandCardOptions = {
  featured?: boolean;
  interactive?: boolean;
};

/** Glass card on dark green bands (#001715) */
export function greenBandCardClassName(
  className?: string,
  { featured = false, interactive = true }: GreenBandCardOptions = {},
) {
  return cn(
    "rounded-xl border backdrop-blur-sm",
    featured
      ? "border-malachite/35 bg-white/10 shadow-[0_0_0_1px_rgba(0,227,87,0.1)]"
      : "border-white/12 bg-white/[0.07]",
    interactive &&
      "transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-malachite/40 hover:bg-white/10 hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)]",
    className,
  );
}

/** Inner panel card (process / roadmap / case study blocks) */
export function greenBandPanelCardClassName(
  className?: string,
  { featured = false }: Pick<GreenBandCardOptions, "featured"> = {},
) {
  return cn(
    "flex flex-col rounded-xl border p-5 backdrop-blur-sm sm:p-6",
    featured
      ? "border-malachite/45 bg-white/14 shadow-[0_0_0_1px_rgba(0,227,87,0.12)]"
      : "border-white/12 bg-white/8 hover:border-white/20 hover:bg-white/10",
    className,
  );
}

export const greenBandTagClassName =
  "rounded-full border border-white/15 bg-white/8 px-3 py-1 text-xs font-medium text-white/70";

export const greenBandChipClassName =
  "inline-flex rounded-full border border-white/15 bg-white/10 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-normal text-white/75";

export const greenBandDeliverableClassName =
  "label-tech-on-dark inline-flex w-fit items-center rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-white/75";

export function greenBandIconWellClassName(featured?: boolean) {
  return cn(
    "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border",
    featured
      ? "border-malachite/40 bg-malachite/20 text-malachite"
      : "border-white/15 bg-white/10 text-white",
  );
}

export function greenBandIconWellLgClassName(featured?: boolean) {
  return cn(
    "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border",
    featured
      ? "border-malachite/40 bg-malachite/20 text-malachite"
      : "border-white/15 bg-white/10 text-white",
  );
}

/** CTA / large promo panel on green bands */
export function greenBandPromoPanelClassName(className?: string) {
  return cn(
    "relative overflow-hidden rounded-3xl border border-white/15 bg-white/[0.08] px-6 py-10 shadow-[0_24px_80px_rgba(0,0,0,0.25)] backdrop-blur-md sm:px-10 sm:py-12 lg:px-14 lg:py-14",
    className,
  );
}

export const greenBandStatCardClassName =
  "rounded-xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-sm";
