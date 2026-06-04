"use client";

import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import {
  motion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { skeletonBarClassName } from "@/components/ui/SkeletonBar";

/** Dev-only layout tuner — set true to re-open the editor */
const LAYOUT_TUNER_ENABLED = false;

const subscribeToClientMount = (onStoreChange: () => void) => {
  queueMicrotask(onStoreChange);
  return () => {};
};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

type DeviceLayout = {
  top: number;
  left: number;
  width: number;
  height: number;
  bottom: number | null;
  translateZ: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  zIndex: number;
};

type FloatLayout = {
  top: number | null;
  left: number | null;
  right: number | null;
  bottom: number | null;
  translateZ: number;
  rotateY: number;
};

type ShowcaseLayout = {
  grid: { rotateX: number; rotateY: number; rotateZ: number };
  browser: DeviceLayout;
  phone: DeviceLayout;
  badge: FloatLayout;
  statusCard: FloatLayout;
  pauseAnimations: boolean;
};

const DEFAULT_LAYOUT: ShowcaseLayout = {
  grid: { rotateX: 8, rotateY: -12, rotateZ: 0 },
  browser: {
    top: 44,
    left: 75,
    width: 86,
    height: 56,
    bottom: null,
    translateZ: -60,
    rotateX: -6,
    rotateY: -2,
    rotateZ: 2,
    zIndex: 25,
  },
  phone: {
    top: 48,
    left: 16,
    width: 46,
    height: 68,
    bottom: null,
    translateZ: 240,
    rotateX: 2,
    rotateY: 38,
    rotateZ: -14,
    zIndex: 40,
  },
  badge: { top: 10, left: 44, right: null, bottom: null, translateZ: 100, rotateY: 6 },
  statusCard: { top: 76, left: 95, right: null, bottom: null, translateZ: 86, rotateY: 18 },
  pauseAnimations: true,
};

type HeroDashboardShowcaseProps = {
  reduceMotion: boolean;
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
};

function deviceStyle(d: DeviceLayout): React.CSSProperties {
  const transform = `translate(-50%, -50%) translateZ(${d.translateZ}px) rotateX(${d.rotateX}deg) rotateY(${d.rotateY}deg) rotateZ(${d.rotateZ}deg)`;
  const base: React.CSSProperties = {
    position: "absolute",
    left: `${d.left}%`,
    width: `${d.width}%`,
    height: `${d.height}%`,
    zIndex: d.zIndex,
    transform,
    transformStyle: "preserve-3d",
    transformOrigin: "center center",
  };
  if (d.bottom != null) {
    return { ...base, bottom: `${d.bottom}%`, top: "auto" };
  }
  return { ...base, top: `${d.top}%` };
}

function floatStyle(f: FloatLayout): React.CSSProperties {
  const s: React.CSSProperties = {
    position: "absolute",
    transform: `translateZ(${f.translateZ}px) rotateY(${f.rotateY}deg)`,
  };
  if (f.top != null) s.top = `${f.top}%`;
  if (f.left != null) s.left = `${f.left}%`;
  if (f.right != null) s.right = `${f.right}%`;
  if (f.bottom != null) s.bottom = `${f.bottom}%`;
  return s;
}

/* ─────────────── Layout Tuner (dev-only) ─────────────── */

function Slider({ label, value, min, max, step = 1, onChange }: {
  label: string; value: number; min: number; max: number; step?: number; onChange: (v: number) => void;
}) {
  return (
    <label className="grid grid-cols-[1fr_52px] items-center gap-2 text-[11px] text-swamp/80">
      <span className="truncate">{label}</span>
      <input type="number" value={value} step={step} onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded border border-swamp/15 bg-white px-1.5 py-0.5 text-[11px]" />
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))}
        className="col-span-2 h-1.5 accent-malachite" />
    </label>
  );
}

type TunerTab = "browser" | "phone" | "scene";

function DeviceControls({ title, device, onChange, onCopy, onReset, widthMax, heightMax }: {
  title: string; device: DeviceLayout; onChange: (patch: Partial<DeviceLayout>) => void;
  onCopy: () => void; onReset: () => void; widthMax: number; heightMax: number;
}) {
  const anchorBottom = device.bottom != null;
  return (
    <div className="rounded-lg border-2 border-swamp/10 bg-bone-50/50 p-3">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="text-sm font-bold text-swamp">{title}</h3>
        <div className="flex gap-1">
          <button type="button" onClick={onReset} className="rounded px-2 py-1 text-[10px] border border-swamp/15 bg-white">Reset</button>
          <button type="button" onClick={onCopy} className="rounded px-2 py-1 text-[10px] bg-malachite text-white font-semibold">Copy</button>
        </div>
      </div>
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-normalr text-swamp/50">Position & size</p>
      <div className="space-y-2 mb-4">
        <label className="flex items-center gap-2 text-[11px]">
          <input type="checkbox" checked={anchorBottom} onChange={(e) =>
            onChange(e.target.checked ? { bottom: device.bottom ?? 0, top: device.top } : { bottom: null, top: device.top })
          } />
          Anchor from bottom (uncheck = anchor from top)
        </label>
        {anchorBottom ? (
          <Slider label="bottom %" value={device.bottom ?? 0} min={-30} max={60} onChange={(v) => onChange({ bottom: v })} />
        ) : (
          <Slider label="top %" value={device.top} min={0} max={100} onChange={(v) => onChange({ top: v, bottom: null })} />
        )}
        <Slider label="left %" value={device.left} min={0} max={100} onChange={(v) => onChange({ left: v })} />
        <Slider label="width %" value={device.width} min={10} max={widthMax} onChange={(v) => onChange({ width: v })} />
        <Slider label="height %" value={device.height} min={20} max={heightMax} onChange={(v) => onChange({ height: v })} />
      </div>
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-normalr text-swamp/50">Depth & layer</p>
      <div className="space-y-2 mb-4">
        <Slider label="z-index" value={device.zIndex} min={0} max={50} onChange={(v) => onChange({ zIndex: v })} />
        <Slider label="translateZ" value={device.translateZ} min={-80} max={250} onChange={(v) => onChange({ translateZ: v })} />
      </div>
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-normalr text-swamp/50">Rotation</p>
      <div className="space-y-2">
        <Slider label="rotateX" value={device.rotateX} min={-45} max={45} onChange={(v) => onChange({ rotateX: v })} />
        <Slider label="rotateY" value={device.rotateY} min={-45} max={45} onChange={(v) => onChange({ rotateY: v })} />
        <Slider label="rotateZ" value={device.rotateZ} min={-45} max={45} onChange={(v) => onChange({ rotateZ: v })} />
      </div>
    </div>
  );
}

function LayoutTuner({ layout, setLayout, open, onToggle }: {
  layout: ShowcaseLayout; setLayout: React.Dispatch<React.SetStateAction<ShowcaseLayout>>;
  open: boolean; onToggle: () => void;
}) {
  const [tab, setTab] = useState<TunerTab>("browser");
  const patchDevice = (key: "browser" | "phone", patch: Partial<DeviceLayout>) =>
    setLayout((l) => ({ ...l, [key]: { ...l[key], ...patch } }));
  const copyToClipboard = async (payload: unknown, label: string) => {
    await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    alert(`${label} copied to clipboard.`);
  };
  const copyAll = useCallback(() => copyToClipboard(layout, "Full layout"), [layout]);
  const copyBrowser = useCallback(() => copyToClipboard(layout.browser, "Browser"), [layout.browser]);
  const copyPhone = useCallback(() => copyToClipboard(layout.phone, "Phone"), [layout.phone]);
  const resetAll = () => setLayout(DEFAULT_LAYOUT);
  const resetBrowser = () => setLayout((l) => ({ ...l, browser: { ...DEFAULT_LAYOUT.browser } }));
  const resetPhone = () => setLayout((l) => ({ ...l, phone: { ...DEFAULT_LAYOUT.phone } }));

  if (!open) {
    return (
      <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggle(); }}
        className="pointer-events-auto fixed bottom-24 left-4 z-[99999] rounded-full bg-swamp px-4 py-2.5 text-xs font-semibold text-white shadow-2xl ring-2 ring-white">
        Layout tuner
      </button>
    );
  }

  const tabClass = (id: TunerTab) =>
    `flex-1 rounded-lg py-2 text-xs font-semibold transition-colors ${
      tab === id ? "bg-malachite text-white" : "bg-swamp/5 text-swamp/70 hover:bg-swamp/10"
    }`;

  return (
    <div className="pointer-events-auto fixed bottom-24 left-4 z-[99999] flex max-h-[88vh] w-[min(420px,calc(100vw-2rem))] flex-col overflow-hidden rounded-xl border border-swamp/20 bg-white shadow-2xl">
      <div className="flex items-center justify-between border-b border-swamp/10 bg-bone-50 px-3 py-2">
        <span className="text-xs font-bold text-swamp">Hero layout tuner</span>
        <button type="button" onClick={onToggle} className="text-swamp/50 hover:text-swamp text-lg leading-none">×</button>
      </div>
      <div className="flex gap-1 border-b border-swamp/10 p-2">
        <button type="button" className={tabClass("browser")} onClick={() => setTab("browser")}>Browser</button>
        <button type="button" className={tabClass("phone")} onClick={() => setTab("phone")}>Phone</button>
        <button type="button" className={tabClass("scene")} onClick={() => setTab("scene")}>Scene</button>
      </div>
      <div className="flex-1 overflow-y-auto p-3 text-swamp">
        <label className="mb-3 flex items-center gap-2 text-xs">
          <input type="checkbox" checked={layout.pauseAnimations} onChange={(e) => setLayout((l) => ({ ...l, pauseAnimations: e.target.checked }))} />
          Pause float animations (both devices)
        </label>
        {tab === "browser" && (
          <DeviceControls title="Browser window" device={layout.browser} onChange={(patch) => patchDevice("browser", patch)}
            onCopy={copyBrowser} onReset={resetBrowser} widthMax={100} heightMax={95} />
        )}
        {tab === "phone" && (
          <DeviceControls title="Phone" device={layout.phone} onChange={(patch) => patchDevice("phone", patch)}
            onCopy={copyPhone} onReset={resetPhone} widthMax={55} heightMax={100} />
        )}
        {tab === "scene" && (
          <div className="rounded-lg border-2 border-swamp/10 bg-bone-50/50 p-3 space-y-2">
            <h3 className="text-sm font-bold text-swamp mb-2">Whole scene tilt</h3>
            <p className="text-[11px] text-swamp/60 mb-2">Affects both browser and phone together (mouse parallax).</p>
            <Slider label="grid rotateX" value={layout.grid.rotateX} min={-30} max={30} onChange={(v) => setLayout((l) => ({ ...l, grid: { ...l.grid, rotateX: v } }))} />
            <Slider label="grid rotateY" value={layout.grid.rotateY} min={-40} max={40} onChange={(v) => setLayout((l) => ({ ...l, grid: { ...l.grid, rotateY: v } }))} />
            <Slider label="grid rotateZ" value={layout.grid.rotateZ} min={-20} max={20} onChange={(v) => setLayout((l) => ({ ...l, grid: { ...l.grid, rotateZ: v } }))} />
          </div>
        )}
      </div>
      <div className="flex gap-2 border-t border-swamp/10 p-3">
        <button type="button" onClick={resetAll} className="flex-1 rounded-lg border border-swamp/15 py-2 text-xs font-medium">Reset all</button>
        <button type="button" onClick={copyAll} className="flex-1 rounded-lg bg-swamp py-2 text-xs font-semibold text-white">Copy all</button>
      </div>
    </div>
  );
}

/* ─────────────── Showcase content (real portfolio / agency data) ─────────────── */

const SHOWCASE_NAV = [
  { label: "Home", active: false },
  { label: "About", active: false },
  { label: "Services", active: false },
  { label: "Portfolio", active: true },
  { label: "Contact", active: false },
] as const;

const SHOWCASE_FILTERS = ["All", "E-commerce", "Hospitality"] as const;

const SHOWCASE_METRICS = [
  { label: "Client", value: "King's Enterprises", sub: "Duty-free · Retail", subGreen: false },
  { label: "Status", value: "Delivered", sub: "+92% traffic", subGreen: true },
  { label: "Launches", value: "18 shipped", sub: "+13% YoY", subGreen: true },
  { label: "Live sites", value: "12 regions", sub: null, subGreen: false, bars: true },
] as const;

const SHOWCASE_BARS = [28, 42, 36, 55, 48, 62, 52, 70] as const;

const SHOWCASE_FEATURED = {
  name: "King's Enterprises N.V.",
  status: "Delivered",
  tags: ["E-Commerce", "Web", "Brand"],
  image: "/projects/screenshots/kings-enterprises-home-v2.jpg",
  tint: "#FEE15B",
  url: "kings.sr",
} as const;

const SHOWCASE_HIGHLIGHTS = [
  {
    name: "Smart Connexxionz",
    status: "Delivered",
    tags: ["E-Commerce", "Mobile"],
    image: "/projects/screenshots/smart-connexxionz.png",
    tint: "#1EB6EC",
  },
  {
    name: "Queens Hotel",
    status: "Delivered",
    tags: ["Hospitality", "Web"],
    image: "/projects/screenshots/queens-hotel-homepage.png",
    tint: "#72000A",
  },
] as const;

const SHOWCASE_ACTIVITY = [
  { project: "Trustbank Amanah", detail: "Islamic banking portal", when: "Q4" },
  { project: "Smart Connexxionz", detail: "Checkout + catalog", when: "Live" },
] as const;

function MiniTadLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
        <span className="absolute h-2.5 w-2.5 rotate-45 rounded-[2px] bg-malachite" />
        <span className="absolute h-1.5 w-1.5 -translate-x-px translate-y-px rotate-45 rounded-[1px] bg-spring/80" />
      </span>
      <span className="text-[11px] font-bold tracking-tight text-swamp">
        tad<span className="text-malachite">.</span>
      </span>
    </span>
  );
}

function ProjectTags({ tags }: { tags: readonly string[] }) {
  return (
    <div className="flex flex-wrap gap-0.5">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded bg-swamp/[0.05] px-1 py-px text-[5px] font-semibold text-swamp/50"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function BrowserDashboard() {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-[#f2f6f4]">
      {/* Site nav */}
      <div className="flex shrink-0 items-center gap-1.5 border-b border-swamp/[0.06] bg-white px-2 py-1.5">
        <MiniTadLogo />
        <nav className="flex min-w-0 flex-1 items-center gap-1.5 overflow-hidden" aria-hidden>
          {SHOWCASE_NAV.map((item) => (
            <span
              key={item.label}
              className={`shrink-0 text-[6px] font-semibold ${
                item.active
                  ? "text-swamp underline decoration-malachite decoration-2 underline-offset-[3px]"
                  : "text-swamp/40"
              }`}
            >
              {item.label}
            </span>
          ))}
        </nav>
        <div className="hidden min-w-0 flex-[0.8] items-center gap-1 rounded-md border border-swamp/10 bg-bone-50/80 px-1.5 py-0.5 sm:flex">
          <svg width="8" height="8" viewBox="0 0 12 12" className="shrink-0 text-swamp/35" aria-hidden>
            <circle cx="5" cy="5" r="3.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
            <path d="M8 8L10.5 10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span className="truncate text-[6px] text-swamp/40">Search clients…</span>
        </div>
        <span className="shrink-0 rounded-full bg-malachite px-1.5 py-0.5 text-[5px] font-bold text-swamp">
          Start a project
        </span>
        <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-swamp/[0.08] text-[6px] font-bold text-swamp/50">
          T
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-1.5 overflow-hidden px-2 py-1.5">
        {/* Page header */}
        <div className="flex shrink-0 items-end justify-between gap-2">
          <div>
            <p className="text-[5px] font-medium uppercase tracking-wide text-swamp/40">
              Dashboard / Portfolio
            </p>
            <h2 className="text-[10px] font-bold tracking-tight text-swamp">Client portfolio</h2>
            <p className="text-[5px] text-swamp/45">Production builds for Suriname & Caribbean brands</p>
          </div>
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-0.5 rounded-md border border-swamp/10 bg-white px-1 py-0.5">
              <span className="text-[6px] text-swamp/45">View</span>
              <span className="rounded bg-swamp/[0.06] px-1 text-[6px] font-semibold text-swamp">Grid</span>
            </div>
            <span className="text-[8px] text-swamp/25">‹ ›</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex shrink-0 gap-1" aria-hidden>
          {SHOWCASE_FILTERS.map((f, i) => (
            <span
              key={f}
              className={`rounded-full px-1.5 py-0.5 text-[5px] font-semibold ${
                i === 0 ? "bg-swamp text-white" : "border border-swamp/10 bg-white text-swamp/45"
              }`}
            >
              {f}
            </span>
          ))}
        </div>

        {/* Metrics */}
        <div className="grid shrink-0 grid-cols-4 gap-1">
          {SHOWCASE_METRICS.map((m) => (
            <div
              key={m.label}
              className="rounded-lg border border-swamp/[0.06] bg-white px-1.5 py-1 shadow-[0_1px_4px_rgba(0,30,28,0.04)]"
            >
              <p className="text-[5px] font-medium uppercase tracking-wide text-swamp/40">{m.label}</p>
              <p className="mt-0.5 truncate text-[6px] font-bold leading-tight text-swamp">{m.value}</p>
              {"bars" in m && m.bars ? (
                <div className="mt-0.5 flex h-4 items-end gap-px">
                  {SHOWCASE_BARS.map((h, j) => (
                    <div
                      key={j}
                      className="flex-1 rounded-[1px]"
                      style={{
                        height: `${h * 0.16}px`,
                        background: j >= 5 ? "rgba(16,227,89,0.6)" : "rgba(15,35,28,0.1)",
                      }}
                    />
                  ))}
                </div>
              ) : m.sub ? (
                <p
                  className={`truncate text-[5px] font-semibold ${
                    m.subGreen ? "text-malachite" : "text-swamp/45"
                  }`}
                >
                  {m.sub}
                </p>
              ) : null}
            </div>
          ))}
        </div>

        {/* Featured + highlights */}
        <p className="shrink-0 text-[6px] font-semibold text-swamp/55">Project highlights</p>
        <div className="grid min-h-0 flex-1 grid-cols-[1.15fr_1fr] gap-1">
          <article className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-swamp/[0.06] bg-white shadow-[0_1px_8px_rgba(0,30,28,0.06)]">
            <div className="border-b border-swamp/[0.05] px-1.5 py-1">
              <div className="flex items-start justify-between gap-1">
                <div className="min-w-0">
                  <p className="truncate text-[7px] font-bold text-swamp">{SHOWCASE_FEATURED.name}</p>
                  <ProjectTags tags={SHOWCASE_FEATURED.tags} />
                </div>
                <span className="shrink-0 text-[5px] font-semibold text-malachite">
                  {SHOWCASE_FEATURED.status}
                </span>
              </div>
              <p className="mt-0.5 text-[5px] text-swamp/40">{SHOWCASE_FEATURED.url}</p>
            </div>
            <div className="relative min-h-0 flex-1 bg-[#eef2ef]">
              <div
                className="absolute inset-0 opacity-25"
                style={{ background: `linear-gradient(135deg, ${SHOWCASE_FEATURED.tint}66, transparent)` }}
                aria-hidden
              />
              <Image
                src={SHOWCASE_FEATURED.image}
                alt=""
                fill
                className="object-cover object-top"
                sizes="220px"
              />
            </div>
          </article>

          <div className="flex min-h-0 flex-col gap-1">
            {SHOWCASE_HIGHLIGHTS.map((project) => (
              <article
                key={project.name}
                className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-swamp/[0.06] bg-white shadow-[0_1px_6px_rgba(0,30,28,0.05)]"
              >
                <div className="flex items-center justify-between gap-1 border-b border-swamp/[0.05] px-1.5 py-0.5">
                  <div className="min-w-0">
                    <p className="truncate text-[6px] font-bold text-swamp">{project.name}</p>
                    <ProjectTags tags={project.tags} />
                  </div>
                  <span className="shrink-0 text-[5px] font-semibold text-malachite">{project.status}</span>
                </div>
                <div className="relative min-h-0 flex-1 bg-[#eef2ef]">
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{ background: `linear-gradient(135deg, ${project.tint}44, transparent)` }}
                    aria-hidden
                  />
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    className="object-cover object-top"
                    sizes="120px"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="shrink-0 rounded-lg border border-swamp/[0.06] bg-white px-1.5 py-1 shadow-[0_1px_4px_rgba(0,30,28,0.04)]">
          <p className="mb-0.5 text-[5px] font-semibold uppercase tracking-wide text-swamp/40">
            Recent deliveries
          </p>
          {SHOWCASE_ACTIVITY.map((row) => (
            <div
              key={row.project}
              className="flex items-center justify-between gap-1 border-t border-swamp/[0.04] py-0.5 first:border-t-0"
            >
              <div className="min-w-0">
                <p className="truncate text-[6px] font-semibold text-swamp">{row.project}</p>
                <p className="truncate text-[5px] text-swamp/45">{row.detail}</p>
              </div>
              <span className="shrink-0 rounded bg-[#e9f8ee] px-1 py-px text-[5px] font-bold text-malachite">
                {row.when}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const PHONE_PROJECT = {
  name: "Smart Connexxionz",
  tagline: "Gadgets e-commerce · Suriname",
  status: "Live product",
  growth: "+38%",
  growthLabel: "online orders",
  updateTitle: "Checkout shipped",
  updateMeta: "TAD · Engineering",
  updateBody:
    "End-to-end store for discovering, trying, and buying the latest gadgets in Suriname.",
  highlightName: "King's Enterprises",
  highlightMeta: "E-commerce · Delivered",
  highlightImage: "/projects/screenshots/kings-enterprises-home-v2.jpg",
  storeImage: "/projects/screenshots/smart-connexxionz.png",
} as const;

function PhoneTopChrome() {
  return (
    <div className="relative shrink-0 border-b border-swamp/[0.05] px-3 pt-2 pb-2">
      {/* Status row — island sits above nav, not over it */}
      <div className="relative flex h-4 items-center justify-between">
        <span className="text-[9px] font-semibold tabular-nums text-swamp">9:41</span>
        <div className="flex items-center gap-1" aria-hidden>
          <div className="flex items-end gap-px">
            {[4, 6, 8, 10].map((h, i) => (
              <div key={i} className="w-[2px] rounded-sm bg-swamp/45" style={{ height: h }} />
            ))}
          </div>
          <svg width="10" height="8" viewBox="0 0 10 8" className="text-swamp/45">
            <path
              d="M5 1.5C3.2 1.5 1.6 2.2.5 3.4L0 2.8C1.3 1.4 3 0.5 5 0.5S8.7 1.4 10 2.8L9.5 3.4C8.4 2.2 6.8 1.5 5 1.5Z"
              fill="currentColor"
            />
            <path
              d="M5 3.5C4 3.5 3.1 3.9 2.5 4.6L2 4.1C2.8 3.2 3.8 2.7 5 2.7S7.2 3.2 8 4.1L7.5 4.6C6.9 3.9 6 3.5 5 3.5Z"
              fill="currentColor"
            />
            <circle cx="5" cy="6.5" r="1.2" fill="currentColor" />
          </svg>
          <div className="flex h-2.5 w-5 items-center rounded-[2px] border border-swamp/35 p-px">
            <div className="h-full w-[72%] rounded-[1px] bg-swamp/50" />
          </div>
        </div>
        <div
          className="pointer-events-none absolute left-1/2 top-0 z-10 h-[22px] w-[68px] -translate-x-1/2 rounded-full bg-[#0d0d0f] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
          aria-hidden
        />
      </div>

      {/* Nav row — clear gap below dynamic island */}
      <div className="mt-3 grid grid-cols-[auto_1fr_auto] items-center gap-2">
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-swamp/[0.06]" aria-hidden>
          <span className="text-[8px] text-swamp/40">‹</span>
        </div>
        <div className="min-w-0 text-center">
          <p className="text-[7px] font-medium text-swamp/45">Project</p>
          <p className="truncate text-[10px] font-bold leading-tight text-swamp">{PHONE_PROJECT.name}</p>
        </div>
        <div className="flex gap-0.5" aria-hidden>
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-1 w-1 rounded-full bg-swamp/25" />
          ))}
        </div>
      </div>
    </div>
  );
}

function PhoneDashboard() {
  const months = ["Jan", "Mar", "May", "Jul", "Sep", "Nov"];
  const tabs = ["Portfolio", "Insights", "Alerts"] as const;

  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden">
      <PhoneTopChrome />

      <div className="flex min-h-0 flex-1 flex-col gap-2 px-2.5 pb-3 pt-1.5">
        <div className="flex shrink-0 gap-1.5">
          <div className="flex-1 rounded-xl border border-swamp/[0.06] bg-white px-2 py-1.5 shadow-[0_2px_8px_rgba(0,30,28,0.04)]">
            <p className="text-[6px] text-swamp/45">Growth</p>
            <p className="text-[11px] font-bold text-malachite">{PHONE_PROJECT.growth}</p>
            <p className="text-[5px] text-swamp/50">{PHONE_PROJECT.growthLabel}</p>
          </div>
          <div className="flex flex-1 flex-col justify-center rounded-xl border border-swamp/[0.06] bg-[#e9f8ee] px-2 py-1.5">
            <span className="inline-flex items-center gap-1 text-[6px] font-bold uppercase text-swamp">
              <span className="h-1.5 w-1.5 rounded-full bg-malachite" />
              {PHONE_PROJECT.status}
            </span>
            <p className="mt-0.5 text-[5px] leading-snug text-swamp/55">{PHONE_PROJECT.tagline}</p>
          </div>
        </div>

        {/* Store preview */}
        <div className="flex min-h-0 flex-[1.05] flex-col overflow-hidden rounded-2xl border border-swamp/[0.06] bg-white shadow-[0_4px_16px_rgba(0,30,28,0.06)]">
          <div className="relative h-[52%] min-h-[3.5rem] shrink-0 bg-[#1EB6EC]/10">
            <Image
              src={PHONE_PROJECT.storeImage}
              alt=""
              fill
              className="object-cover object-top"
              sizes="140px"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-2 py-1.5">
              <p className="text-[7px] font-bold text-white">{PHONE_PROJECT.name}</p>
              <p className="text-[6px] text-white/85">Discover · Try · Buy gadgets</p>
            </div>
          </div>
          <div className="flex min-h-0 flex-1 flex-col gap-1.5 p-2">
            <div className="flex items-start gap-2">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e9f8ee]">
                <span className="text-[8px] font-bold text-malachite">T</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[7px] font-bold text-swamp">{PHONE_PROJECT.updateTitle}</p>
                <p className="text-[5px] text-swamp/45">{PHONE_PROJECT.updateMeta}</p>
                <p className="mt-0.5 line-clamp-2 text-[6px] leading-snug text-swamp/60">
                  {PHONE_PROJECT.updateBody}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Chart card */}
        <div className="flex min-h-0 flex-[0.95] flex-col rounded-2xl border border-swamp/[0.06] bg-white p-2 shadow-[0_4px_14px_rgba(0,30,28,0.05)]">
          <div className="mb-1 flex items-center justify-between gap-1">
            <p className="text-[7px] font-semibold text-swamp">Online orders</p>
            <span className="text-[6px] font-semibold text-malachite">{PHONE_PROJECT.growth}</span>
          </div>
          <div className="relative min-h-0 flex-1">
            <div className="absolute inset-0 flex flex-col justify-between py-1" aria-hidden>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-px w-full bg-swamp/[0.05]" />
              ))}
            </div>
            <svg viewBox="0 0 100 44" className="relative h-full w-full" preserveAspectRatio="none" aria-hidden>
              <defs>
                <linearGradient id="heroPhoneWaveGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10E359" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#10E359" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M 0,36 Q 10,32 20,34 T 40,26 T 60,28 T 80,16 T 100,10 L 100,44 L 0,44 Z"
                fill="url(#heroPhoneWaveGrad)"
              />
              <path
                d="M 0,36 Q 10,32 20,34 T 40,26 T 60,28 T 80,16 T 100,10"
                fill="none"
                stroke="#10E359"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="mt-1 flex justify-between px-0.5">
            {months.map((m) => (
              <span key={m} className="text-[5px] text-swamp/35">
                {m}
              </span>
            ))}
          </div>
        </div>

        {/* Related project */}
        <div className="flex min-h-0 flex-[0.9] flex-col gap-1 rounded-2xl border border-swamp/[0.06] bg-white p-2 shadow-[0_4px_12px_rgba(0,30,28,0.05)]">
          <p className="text-[7px] font-semibold text-swamp/60">Also in portfolio</p>
          <div className="relative min-h-0 flex-1 overflow-hidden rounded-lg bg-[#eef2ef]">
            <Image
              src={PHONE_PROJECT.highlightImage}
              alt=""
              fill
              className="object-cover object-top"
              sizes="140px"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-2 py-1">
              <p className="text-[7px] font-bold text-white">{PHONE_PROJECT.highlightName}</p>
              <p className="text-[6px] text-white/85">{PHONE_PROJECT.highlightMeta}</p>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 justify-around rounded-2xl border border-swamp/[0.06] bg-white px-2 py-1.5">
          {tabs.map((tab, i) => (
            <span
              key={tab}
              className={`text-[6px] font-semibold ${i === 0 ? "text-malachite" : "text-swamp/35"}`}
            >
              {tab}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────── Frames ─────────────── */

function BrowserFrame({ children }: { children: ReactNode }) {
  const radius = "1.1rem";
  return (
    <div className="relative h-full w-full" style={{ transformStyle: "preserve-3d" }}>
      <div aria-hidden className="pointer-events-none absolute -bottom-6 left-[6%] h-8 w-[88%] rounded-full bg-black/15 blur-xl" />
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden" style={{ borderRadius: radius }}>
        <div className="absolute inset-0 bg-[#b5c5bc]" style={{ borderRadius: radius, transform: "translate(8px, 6px)" }} />
        <div className="absolute inset-0 bg-[#cdd9d3]" style={{ borderRadius: radius, transform: "translate(4px, 3px)" }} />
      </div>
      <div className="relative z-10 flex h-full min-h-0 flex-col overflow-hidden border-2 border-[#e6ece8] bg-white"
        style={{ borderRadius: radius, boxShadow: "inset 2px 0 0 rgba(255,255,255,0.95), 0 16px 40px -10px rgba(0,30,28,0.12)" }}>
        <div className="flex h-10 shrink-0 items-center gap-1.5 border-b border-swamp/[0.07] bg-[#eef2ef] px-2.5">
          <div className="flex shrink-0 gap-1">
            <div className="h-2 w-2 rounded-full bg-[#f46b5d]" />
            <div className="h-2 w-2 rounded-full bg-[#f9be38]" />
            <div className="h-2 w-2 rounded-full bg-[#34c749]" />
          </div>
          <div className="flex min-w-0 flex-1 items-center gap-1 overflow-hidden">
            <div className="flex shrink-0 gap-0.5" aria-hidden>
              {["Dashboard", "Portfolio"].map((tab, i) => (
                <span
                  key={tab}
                  className={`max-w-[52px] truncate rounded px-1 py-0.5 text-[6px] font-semibold ${
                    i === 1 ? "bg-white text-swamp shadow-sm" : "text-swamp/40"
                  }`}
                >
                  {tab}
                </span>
              ))}
            </div>
            <div className="flex min-w-0 flex-1 items-center gap-1 rounded-md border border-swamp/15 bg-white px-2 py-0.5 shadow-[inset_0_1px_2px_rgba(0,30,28,0.06)]">
              <svg width="7" height="8" viewBox="0 0 8 10" className="shrink-0 text-swamp/35" aria-hidden>
                <rect x="1.5" y="4" width="5" height="4" rx="0.5" stroke="currentColor" fill="none" />
                <path d="M4 1.5v5" stroke="currentColor" strokeWidth="0.8" />
                <circle cx="4" cy="7.5" r="0.6" fill="currentColor" />
              </svg>
              <span className="min-w-0 flex-1 truncate text-[8px] font-bold tracking-wide text-[#7a8480]">
                TAD.SR/DASHBOARD
              </span>
              <svg width="7" height="7" viewBox="0 0 10 10" className="shrink-0 text-swamp/30" aria-hidden>
                <path
                  d="M5 1.5v5M2.5 4L5 1.5 7.5 4"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>
          </div>
          <div className="flex shrink-0 gap-0.5" aria-hidden>
            <div className="h-4 w-4 rounded border border-swamp/10 bg-white/80" />
            <div className="h-4 w-4 rounded border border-swamp/10 bg-white/80" />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-full w-full" style={{ transformStyle: "preserve-3d" }}>
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-8 left-[6%] h-12 w-[88%] rounded-full bg-black/25 blur-2xl"
      />
      <div
        aria-hidden
        className="absolute inset-0 -translate-x-[4px] translate-y-[5px] rounded-[2.35rem] bg-[#141416]"
      />
      {/* Hardware buttons */}
      <div aria-hidden className="absolute -left-[2px] top-[20%] z-20 h-7 w-[3px] rounded-l-sm bg-[#3a3a3c]" />
      <div aria-hidden className="absolute -left-[2px] top-[30%] z-20 h-11 w-[3px] rounded-l-sm bg-[#3a3a3c]" />
      <div aria-hidden className="absolute -left-[2px] top-[42%] z-20 h-11 w-[3px] rounded-l-sm bg-[#3a3a3c]" />
      <div aria-hidden className="absolute -right-[2px] top-[28%] z-20 h-14 w-[3px] rounded-r-sm bg-[#3a3a3c]" />
      <div
        className="relative h-full w-full rounded-[2.4rem] bg-[#1c1c1e] p-[3px]"
        style={{
          boxShadow:
            "inset 1px 0 0 rgba(255,255,255,0.08), 0 0 0 1px rgba(255,255,255,0.06), 0 28px 56px rgba(0,0,0,0.32)",
        }}
      >
        <div className="h-full w-full rounded-[2.2rem] bg-[#0a0a0b] p-[2px]">
          <div className="relative flex h-full w-full min-h-0 flex-col overflow-hidden rounded-[2.05rem] bg-[#f6faf7]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[2.05rem] bg-gradient-to-br from-white/25 via-transparent to-transparent"
            />
            {children}
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-1.5 left-1/2 h-[3px] w-[32%] -translate-x-1/2 rounded-full bg-swamp/25"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── Floating Cards ─────────────── */

const FLOAT_CARD = "rounded-xl border border-swamp/10 bg-white/95 shadow-[0_8px_24px_-8px_rgba(0,30,28,0.15)] backdrop-blur-sm";

function SystemsReadyBadge() {
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-swamp/[0.08] bg-white px-4 py-2.5 shadow-[0_6px_24px_rgba(0,30,28,0.1)]">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#10E359]/12">
        <svg width="16" height="16" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path
            d="M2.5 6L5 8.5L9.5 4"
            stroke="#10E359"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className="pr-0.5 text-sm font-bold tracking-normal text-swamp">
        Systems Ready
      </span>
    </div>
  );
}

function ChatCardSkeleton() {
  return (
    <div className={`${FLOAT_CARD} w-[12.5rem] rounded-2xl p-3.5`} aria-hidden>
      <div className={skeletonBarClassName("light", "h-3 w-[88%] rounded-md", false)} />
      <div className="mt-2.5 space-y-1.5">
        <div className={skeletonBarClassName("light", "h-2 w-full rounded-full", false)} />
        <div className={skeletonBarClassName("light", "h-2 w-[76%] rounded-full", false)} />
      </div>
      <div className="mt-3 flex h-9 w-full items-center justify-center gap-1.5 rounded-full border border-malachite/20 bg-malachite/10">
        <div className={skeletonBarClassName("light", "h-3 w-3 rounded-full", false)} />
        <div className={skeletonBarClassName("light", "h-2 w-16 rounded-full", false)} />
      </div>
    </div>
  );
}

/* ─────────────── Main Component ─────────────── */

export default function HeroDashboardShowcase({ reduceMotion, rotateX, rotateY }: HeroDashboardShowcaseProps) {
  const [layout, setLayout] = useState<ShowcaseLayout>(DEFAULT_LAYOUT);
  const [tunerOpen, setTunerOpen] = useState(false);
  const [showTuner, setShowTuner] = useState(LAYOUT_TUNER_ENABLED);
  const portalReady = useSyncExternalStore(
    subscribeToClientMount,
    getClientSnapshot,
    getServerSnapshot
  );

  useEffect(() => {
    if (!LAYOUT_TUNER_ENABLED) return;
    queueMicrotask(() => {
      const params = new URLSearchParams(window.location.search);
      if (params.get("layoutTuner") === "1") {
        setShowTuner(true);
        setTunerOpen(true);
      }
      const saved = localStorage.getItem("hero-showcase-layout");
      if (saved) {
        try {
          setLayout({ ...DEFAULT_LAYOUT, ...JSON.parse(saved) });
        } catch {
          /* ignore */
        }
      }
    });
  }, []);

  useEffect(() => {
    if (!showTuner || !LAYOUT_TUNER_ENABLED) return;
    localStorage.setItem("hero-showcase-layout", JSON.stringify(layout));
  }, [layout, showTuner]);

  const grid = layout.grid;
  const transformedX = useTransform(rotateX, (v) => v + grid.rotateX);
  const transformedY = useTransform(rotateY, (v) => v + grid.rotateY);

  const activeRotateX = reduceMotion ? grid.rotateX : transformedX;
  const activeRotateY = reduceMotion ? grid.rotateY : transformedY;
  const noAnim = reduceMotion || layout.pauseAnimations;

  const browserStyle = useMemo(() => deviceStyle(layout.browser), [layout.browser]);
  const phoneStyle = useMemo(() => deviceStyle(layout.phone), [layout.phone]);

  const tunerUi = showTuner ? (
    <LayoutTuner layout={layout} setLayout={setLayout} open={tunerOpen} onToggle={() => setTunerOpen((o) => !o)} />
  ) : null;

  return (
    <>
      {portalReady && tunerUi ? createPortal(tunerUi, document.body) : null}
      <div className="relative h-full w-full max-w-[100vw] overflow-visible">
        <motion.div
          style={{ rotateX: activeRotateX, rotateY: activeRotateY, rotateZ: grid.rotateZ, transformStyle: "preserve-3d" }}
          className="relative h-full w-full max-w-[1000px] mx-auto preserve-3d"
        >
          {/* Outer layer holds 3D pose; inner layer floats so Framer never overwrites transform */}
          <div className="preserve-3d origin-center" style={browserStyle}>
            <motion.div
              className="h-full w-full preserve-3d"
              animate={noAnim ? undefined : { y: [0, -5, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              <BrowserFrame><BrowserDashboard /></BrowserFrame>
            </motion.div>
          </div>

          <div className="preserve-3d origin-center" style={phoneStyle}>
            <motion.div
              className="h-full w-full preserve-3d"
              animate={noAnim ? undefined : { y: [0, 8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <PhoneFrame><PhoneDashboard /></PhoneFrame>
            </motion.div>
          </div>

          <div className="absolute preserve-3d" style={floatStyle(layout.badge)}>
            <motion.div
              animate={noAnim ? undefined : { y: [0, -6, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <SystemsReadyBadge />
            </motion.div>
          </div>

          <div className="absolute preserve-3d" style={floatStyle(layout.statusCard)}>
            <motion.div
              animate={noAnim ? undefined : { y: [0, 8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2.3 }}
            >
              <ChatCardSkeleton />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
