import { cn } from "@/lib/utils";

const SURFACE_CARD =
  "data-card-surface rounded-2xl border border-swamp/10 bg-white text-swamp shadow-[0_1px_0_rgba(0,30,28,0.06)]";

const SURFACE_CARD_INTERACTIVE =
  "transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-malachite/30 hover:shadow-[0_18px_34px_rgba(0,30,28,0.12)]";

/** Standard elevated card on mint/white sections */
export function surfaceCardClassName(className?: string) {
  return cn(SURFACE_CARD, className);
}

/** Card with hover lift and border emphasis */
export function surfaceCardInteractiveClassName(className?: string) {
  return cn(SURFACE_CARD, SURFACE_CARD_INTERACTIVE, className);
}
