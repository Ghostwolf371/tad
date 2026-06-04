"use client";

import Image from "next/image";

const PREVIEW = {
  url: "kings.sr",
  client: "King's Enterprises N.V.",
  status: "Delivered",
  growth: "+92% traffic",
  image: "/projects/screenshots/kings-enterprises-home-v2.jpg",
} as const;

/** Compact portfolio preview for hero on viewports below lg (replaces hidden 3D showcase). */
export default function HeroMobilePreview() {
  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl border border-swamp/10 bg-white shadow-[0_20px_48px_-16px_rgba(0,30,28,0.18)]"
      aria-hidden
    >
      <div className="flex items-center gap-1.5 border-b border-swamp/[0.07] bg-[#eef2ef] px-3 py-2">
        <div className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex min-w-0 flex-1 items-center justify-center rounded-md border border-swamp/12 bg-white px-2 py-0.5">
          <span className="truncate font-mono text-[9px] font-semibold text-swamp/50">
            TAD.SR/DASHBOARD
          </span>
        </div>
      </div>

      <div className="border-b border-swamp/[0.06] bg-white px-3 py-2">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[9px] font-medium uppercase tracking-wide text-swamp/45">Portfolio</p>
            <p className="truncate text-xs font-bold text-swamp">{PREVIEW.client}</p>
          </div>
          <span className="shrink-0 rounded-full bg-[#e9f8ee] px-2 py-0.5 text-[9px] font-bold text-malachite">
            {PREVIEW.status}
          </span>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <div className="rounded-lg border border-swamp/[0.06] bg-[#f4f7f5] px-2 py-1.5">
            <p className="text-[8px] text-swamp/45">Growth</p>
            <p className="text-[11px] font-bold text-malachite">{PREVIEW.growth}</p>
          </div>
          <div className="rounded-lg border border-swamp/[0.06] bg-[#f4f7f5] px-2 py-1.5">
            <p className="text-[8px] text-swamp/45">Live site</p>
            <p className="truncate text-[11px] font-bold text-swamp">{PREVIEW.url}</p>
          </div>
        </div>
      </div>

      <div className="relative aspect-[16/10] bg-bone-50">
        <Image
          src={PREVIEW.image}
          alt=""
          fill
          className="object-cover object-top"
          sizes="(max-width: 1023px) 100vw, 0px"
          priority
        />
      </div>
    </div>
  );
}
