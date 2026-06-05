"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { HrPlusPreviewStage } from "@/components/products/MockupSkeleton";
import { MockupAnimationProvider } from "@/components/ui/MockupAnimationContext";
import { skeletonBarClassName, type SkeletonTone } from "@/components/ui/SkeletonBar";
import { useMockupAnimated } from "@/components/ui/MockupAnimationContext";
import { cn } from "@/lib/utils";

function useSk() {
  const animated = useMockupAnimated();
  return (tone: SkeletonTone, className: string) =>
    skeletonBarClassName(tone, className, animated);
}

export type ProductMockupVariant =
  | "flex-pos"
  | "hr-plus"
  | "bouw-plus"
  | "invoice-plus"
  | "vendor-plus"
  | "whatsapp-ai"
  | "gatekeepr"
  | "live-fotos";

/** Match service frame height for consistent product rows */
export const PRODUCT_MOCKUP_HEIGHT = "h-[16.5rem]";

/** Match sibling product cards on the homepage grid */
export const PRODUCT_MOCKUP_HEIGHT_HR_PLUS = PRODUCT_MOCKUP_HEIGHT;

type ProductMockupProps = {
  variant: ProductMockupVariant;
  className?: string;
  /** HR Plus: `floating` = full landing skeleton; `browser` = dashboard-only chrome */
  presentation?: "browser" | "floating";
  /** Homepage featured row — dark green shell like HR Plus */
  theme?: "light" | "dark";
  /** HR Plus homepage card — tighter two-column layout */
  compact?: boolean;
  /** false on homepage — static skeletons */
  animated?: boolean;
};

const DARK_FRAME_CLASS =
  "border-white/10 bg-[#0a1210] shadow-[0_12px_36px_-14px_rgba(0,0,0,0.55)]";
const DARK_CANVAS_CLASS = "bg-[#0f1f18]";

const PATHS: Record<ProductMockupVariant, string> = {
  "flex-pos": "payza",
  "hr-plus": "hr-plus",
  "bouw-plus": "bouw-plus",
  "invoice-plus": "invoice-plus",
  "vendor-plus": "vendor-plus",
  "whatsapp-ai": "whatsapp",
  gatekeepr: "gatekeepr",
  "live-fotos": "fotos",
};

const CHROME_URLS: Partial<Record<ProductMockupVariant, string>> = {
  "live-fotos": "fotos.tad.sr",
};

function Chrome({ path, dark, url }: { path: string; dark?: boolean; url?: string }) {
  const address = url ?? `app.tad.sr/${path}`;
  return (
    <div
      className={cn(
        "flex h-8 shrink-0 items-center gap-1.5 border-b px-2.5",
        dark
          ? "border-white/[0.08] bg-[#0a1210]"
          : "border-swamp/[0.06] bg-bone-50",
      )}
    >
      <span className="h-[6px] w-[6px] rounded-full bg-[#ff5f57]" />
      <span className="h-[6px] w-[6px] rounded-full bg-[#febc2e]" />
      <span className="h-[6px] w-[6px] rounded-full bg-[#28c840]" />
      {dark ? (
        <span className="ml-1 min-w-0 flex-1 truncate rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[7px] text-white/45">
          {address}
        </span>
      ) : (
        <span
          className={cn(
            "ml-1 min-w-0 flex-1 truncate rounded px-1.5 py-0.5 font-mono text-[7px]",
            "bg-swamp/[0.04] text-swamp/40",
          )}
        >
          {address}
        </span>
      )}
    </div>
  );
}

function Canvas({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-h-0 flex-1 flex-col justify-start overflow-hidden bg-white p-2.5",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** PayZa — register / cart checkout (not a storefront grid) */
function FlexPosMockup({ dark = false }: { dark?: boolean }) {
  const sk = useSk();
  const tone = dark ? "dark" : "light";

  return (
    <Canvas
      className={cn(
        "relative overflow-hidden p-2",
        dark
          ? DARK_CANVAS_CLASS
          : "bg-gradient-to-br from-[#eaf7ee] via-white to-[#e0f6ea]",
      )}
    >
      {!dark && (
        <div
          aria-hidden
          className="pointer-events-none absolute -left-8 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-malachite/20 blur-2xl"
        />
      )}
      <div className="relative z-10 mx-auto flex h-full w-[94%] max-w-[27rem] items-center justify-center">
        <div
          className={cn(
            "w-full overflow-hidden rounded-[0.95rem] border p-0",
            dark
              ? "border-white/10 bg-[#0a1814] shadow-[0_16px_38px_-18px_rgba(0,0,0,0.45)]"
              : "border-swamp/10 bg-white shadow-[0_16px_38px_-18px_rgba(0,30,28,0.28)]",
          )}
        >
          <div className="grid h-[12.25rem] grid-cols-[1.35fr_0.85fr] gap-2 p-2">
            <div
              className={cn(
                "flex min-h-0 flex-col rounded-lg border p-2",
                dark ? "border-white/[0.08] bg-white/[0.04]" : "border-swamp/[0.07] bg-bone-50/55",
              )}
            >
              <div className="mb-2 flex items-center justify-between">
                <div className={sk(tone, "h-1.5 w-14 rounded-full")} />
                <div className="rounded bg-malachite/20 px-1.5 py-0.5 text-[6px] font-semibold text-malachite">
                  LIVE
                </div>
              </div>
              <div className="grid min-h-0 flex-1 grid-cols-4 gap-1.5">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex min-h-0 flex-col rounded-md border p-1",
                      dark ? "border-white/[0.06] bg-white/[0.03]" : "border-swamp/[0.05] bg-white",
                    )}
                  >
                    <div
                      className={cn(
                        "min-h-0 flex-1 rounded-sm",
                        i % 5 === 0
                          ? "bg-gradient-to-br from-malachite/35 to-spring/10"
                          : dark
                            ? "bg-white/[0.06]"
                            : "bg-bone-100",
                      )}
                    />
                    <div className={sk(tone, "mt-1 h-0.5 w-full rounded-full")} />
                  </div>
                ))}
              </div>
            </div>

            <div
              className={cn(
                "flex min-h-0 flex-col rounded-lg border p-2",
                dark ? "border-white/[0.08] bg-[#0f1f18]" : "border-swamp/[0.07] bg-white shadow-sm",
              )}
            >
              <div className="mb-2 flex items-center justify-between">
                <div className={sk(tone, "h-1.5 w-10 rounded-full")} />
                <div className={sk(tone, "h-1.5 w-6 rounded-full")} />
              </div>
              <div className="min-h-0 flex-1 space-y-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex items-center gap-1.5 rounded-md border px-1.5 py-1",
                      dark
                        ? "border-white/[0.06] bg-white/[0.04]"
                        : "border-swamp/[0.05] bg-bone-50/70",
                    )}
                  >
                    <div className={sk(tone, "h-1.5 w-5 rounded-full")} />
                    <div className={sk(tone, "h-1.5 flex-1 rounded-full")} />
                    <div className={sk(i === 0 ? "accent" : tone, "h-1.5 w-7 rounded-full")} />
                  </div>
                ))}
              </div>
              <div className="mt-2 rounded-md border border-malachite/30 bg-gradient-to-r from-malachite/25 to-spring/10 p-1.5">
                <div className="flex items-center justify-between">
                  <div className={sk(tone, "h-1 w-9 rounded-full")} />
                  <div className={sk("accent", "h-2 w-10 rounded-full")} />
                </div>
                <div className="mt-1.5 grid grid-cols-2 gap-1">
                  <div className="rounded bg-malachite py-1 text-center text-[6px] font-bold text-swamp">
                    Pay
                  </div>
                  <div
                    className={cn(
                      "rounded border py-1 text-center text-[6px] font-medium",
                      dark
                        ? "border-white/15 bg-white/[0.06] text-white/50"
                        : "border-swamp/10 bg-white text-swamp/50",
                    )}
                  >
                    Hold
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Canvas>
  );
}

/** WhatsApp AI — chat thread + calendar slot */
function BouwPlusMockup() {
  const sk = useSk();

  return (
    <Canvas className="relative overflow-hidden bg-gradient-to-br from-[#eff4ff] via-white to-[#eaf2ff] p-2">
      <div className="relative z-10 flex h-full rounded-xl border border-[#d7e4ff] bg-white/95 p-2 shadow-sm">
        <div className="mr-2 flex w-[20%] shrink-0 flex-col rounded-lg border border-[#d9e6ff] bg-[#f3f7ff] p-1.5">
          <div className={sk("light", "h-1.5 w-7 rounded-full")} />
          <div className={sk("light", "mt-2 h-5 rounded")} />
          <div className={sk("light", "mt-1.5 h-5 rounded")} />
          <div className={sk("light", "mt-1.5 h-5 rounded")} />
          <div className={sk("light", "mt-auto h-5 rounded")} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-center justify-between rounded-lg border border-[#d9e6ff] bg-[#f8fbff] px-2 py-1.5">
            <div className={sk("light", "h-1.5 w-24 rounded-full")} />
            <div className="rounded-md bg-[#2563eb]/12 px-1.5 py-0.5 text-[6px] font-semibold text-[#1d4ed8]">
              DASHBOARD
            </div>
          </div>

          <div className="mb-2 grid grid-cols-4 gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="space-y-1 rounded-lg border border-[#dbe7ff] bg-[#f6f9ff] p-1.5"
              >
                <div className={sk("light", "h-1 w-8 rounded-full")} />
                <div
                  className={sk(i === 1 ? "accent" : "light", "h-2 rounded")}
                  style={i === 1 ? { backgroundColor: "rgba(37, 99, 235, 0.24)" } : undefined}
                />
                <div className={sk("light", "h-1 w-6 rounded-full")} />
              </div>
            ))}
          </div>

          <div className="grid h-[calc(100%-2.5rem)] grid-cols-[2fr_1fr] gap-2">
            <div className="rounded-lg border border-[#dbe7ff] bg-[#fbfdff] p-2">
              <div className={sk("light", "h-1.5 w-20 rounded-full")} />
              <div className="mt-3 flex h-[70%] items-end gap-1.5">
                {[55, 82, 60, 96, 72, 48].map((h, i) => (
                  <div
                    key={i}
                    className="w-full rounded-t-sm bg-[#bfdbfe]"
                    style={{ height: `${h}%`, opacity: i === 3 ? 0.95 : 0.7 }}
                  />
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-[#dbe7ff] bg-[#f3f8ff] p-2">
              <div className={sk("light", "h-1.5 w-10 rounded-full")} />
              <div className={sk("light", "mt-2 h-4 rounded")} />
              <div className={sk("light", "mt-1.5 h-4 rounded")} />
              <div className={sk("light", "mt-1.5 h-4 rounded")} />
              <div className={sk("light", "mt-3 h-7 rounded")} />
            </div>
          </div>
        </div>
      </div>
    </Canvas>
  );
}

function InvoicePlusMockup({ dark = false }: MockupBodyProps) {
  const sk = useSk();
  const tone = dark ? "dark" : "light";

  return (
    <Canvas
      className={cn(
        "p-2.5",
        dark
          ? DARK_CANVAS_CLASS
          : "bg-gradient-to-br from-bone-50 via-white to-green-50/40",
      )}
    >
      <div className="flex h-full gap-2">
        <div
          className={cn(
            "flex min-w-0 flex-1 flex-col rounded-xl border p-2 shadow-sm",
            dark
              ? "border-white/10 bg-[#0a1814]"
              : "border-swamp/[0.08] bg-white",
          )}
        >
          <div className="mb-2 flex items-center justify-between">
            <div className={sk(tone, "h-1.5 w-20 rounded-full")} />
            <span
              className={cn(
                "rounded-md px-1.5 py-0.5 font-mono text-[6px] font-semibold",
                dark
                  ? "bg-malachite/20 text-malachite"
                  : "bg-malachite/15 text-malachite-800",
              )}
            >
              DRAFT
            </span>
          </div>
          <div className="space-y-1.5">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={cn(
                  "flex items-center gap-2 rounded-lg border px-2 py-1.5",
                  dark
                    ? "border-white/[0.06] bg-white/[0.04]"
                    : "border-swamp/[0.06] bg-bone-50/70",
                )}
              >
                <div className={sk(tone, "h-1.5 w-6 rounded-full")} />
                <div className={sk(tone, "h-1.5 flex-1 rounded-full")} />
                <div className={sk(i === 2 ? "accent" : tone, "h-1.5 w-8 rounded-full")} />
              </div>
            ))}
          </div>
          <div
            className={cn(
              "mt-auto rounded-lg border p-2",
              dark
                ? "border-malachite/30 bg-gradient-to-r from-malachite/25 to-spring/10"
                : "border-malachite/20 bg-malachite/10",
            )}
          >
            <div className="flex items-center justify-between">
              <div className={sk(tone, "h-1.5 w-12 rounded-full")} />
              <div className={sk("accent", "h-2 w-10 rounded-full")} />
            </div>
          </div>
        </div>
      </div>
    </Canvas>
  );
}

function VendorPlusMockup() {
  const sk = useSk();

  return (
    <Canvas className="bg-gradient-to-br from-bone-50 via-white to-cyan-50/45 p-2.5">
      <div className="flex h-full gap-2">
        <div className="flex min-w-0 flex-1 flex-col rounded-xl border border-swamp/[0.08] bg-white p-2 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <div className={sk("light", "h-1.5 w-16 rounded-full")} />
            <div className={sk("light", "h-1.5 w-10 rounded-full")} />
          </div>
          <div className="space-y-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex items-center gap-2 rounded-lg border border-swamp/[0.06] bg-bone-50/75 px-2 py-1.5"
              >
                <div className={sk("light", "size-5 rounded-md")} />
                <div className="min-w-0 flex-1">
                  <div className={sk("light", "h-1.5 rounded-full")} />
                  <div className={sk("light", "mt-1 h-1 w-2/3 rounded-full")} />
                </div>
                <div className={sk(i === 0 ? "accent" : "light", "h-1.5 w-8 rounded-full")} />
              </div>
            ))}
          </div>
          <div className="mt-auto grid grid-cols-2 gap-1.5">
            <div className={sk("accent", "h-5 rounded-md")} />
            <div className={sk("light", "h-5 rounded-md")} />
          </div>
        </div>
      </div>
    </Canvas>
  );
}

function WhatsAppBubble({
  out,
  dark,
  children,
  className,
  delay = 0,
}: {
  out: boolean;
  dark: boolean;
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35 }}
      className={cn("flex", out ? "justify-end" : "justify-start", className)}
    >
      <div
        className={cn(
          "max-w-[92%] rounded-xl px-2.5 py-1.5 shadow-sm",
          out
            ? cn(
                "rounded-br-sm",
                dark
                  ? "border border-malachite/30 bg-gradient-to-br from-malachite/40 to-spring/15 text-white"
                  : "bg-[#d9fdd3] text-[#111b21]",
              )
            : cn(
                "rounded-bl-sm",
                dark
                  ? "border border-white/[0.07] bg-white/[0.07] text-white/85"
                  : "bg-white text-[#111b21]",
              ),
        )}
      >
        {children}
      </div>
    </motion.div>
  );
}

/** WhatsApp AI — full-width chat + calendar sidebar (matches PayZa / HR Plus frame size) */
function WhatsAppAiMockup({ dark = false }: { dark?: boolean }) {
  const sk = useSk();
  const tone = dark ? "dark" : "light";
  const timestampClass = dark ? "text-white/40" : "text-[#667781]";
  const messages = [
    { out: false, text: "Hi! Can I book an appointment?" },
    { out: true, text: "Sure — I have openings tomorrow. Which time works?" },
    { out: false, text: "Tuesday afternoon please" },
    { out: true, text: "Perfect. Confirming Tue 14:00 for you." },
  ];

  return (
    <Canvas
      className={cn(
        "relative overflow-hidden p-2",
        dark ? DARK_CANVAS_CLASS : "bg-gradient-to-br from-[#eaf7ee] via-white to-[#e0f6ea]",
      )}
    >
      {!dark && (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-6 top-0 h-24 w-24 rounded-full bg-malachite/20 blur-2xl"
        />
      )}

      <div className="relative z-10 flex h-full min-h-0 gap-2">
        {/* Chat column */}
        <div
          className={cn(
            "flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-xl border shadow-sm",
            dark
              ? "border-white/10 bg-[#0a1814]"
              : "border-[#128C7E]/15 bg-[#efeae2]",
          )}
        >
          <div
            className={cn(
              "flex shrink-0 items-center gap-2 border-b px-2.5 py-2",
              dark
                ? "border-malachite/25 bg-[#0f1f18]"
                : "border-[#128C7E]/20 bg-[#128C7E]",
            )}
          >
            <div
              className={cn(
                "size-7 shrink-0 rounded-full",
                dark ? "bg-malachite/80 ring-2 ring-malachite/30" : "bg-white/25",
              )}
            />
            <div className="min-w-0 flex-1">
              <p
                className={cn(
                  "text-[8px] font-semibold leading-tight",
                  dark ? "text-white/90" : "text-white",
                )}
              >
                TAD Assistant
              </p>
              <p className={cn("text-[6px]", dark ? "text-malachite/75" : "text-white/65")}>
                online · WhatsApp
              </p>
            </div>
            {dark && (
              <span className="rounded-md bg-malachite/20 px-1.5 py-0.5 text-[6px] font-semibold text-malachite">
                LIVE
              </span>
            )}
          </div>

          <div
            className={cn(
              "flex min-h-0 flex-1 flex-col gap-2 overflow-hidden p-2.5",
              dark ? "bg-[#0f1f18]" : "bg-[#efeae2]",
            )}
          >
            {messages.map((msg, i) => (
              <WhatsAppBubble key={msg.text} out={msg.out} dark={dark} delay={0.05 + i * 0.06}>
                <p className="text-[7px] leading-snug">{msg.text}</p>
                <p className={cn("mt-1 text-right text-[5px]", timestampClass)}>
                  09:{12 + i}
                  {msg.out ? " ✓✓" : ""}
                </p>
              </WhatsAppBubble>
            ))}

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.32, duration: 0.35 }}
              className="mt-auto flex justify-start"
            >
              <div
                className={cn(
                  "rounded-xl rounded-bl-sm border px-2.5 py-2 shadow-sm",
                  dark
                    ? "border-malachite/35 bg-malachite/10"
                    : "border-malachite/30 bg-white",
                )}
              >
                <p className={cn("text-[7px] font-semibold", dark ? "text-malachite" : "text-[#128C7E]")}>
                  📅 Slot confirmed
                </p>
                <div className="mt-1.5 flex gap-1">
                  <span
                    className={cn(
                      "rounded-md px-2 py-0.5 text-[6px] font-semibold",
                      dark
                        ? "bg-malachite/25 text-malachite"
                        : "bg-malachite/15 text-malachite-800",
                    )}
                  >
                    Tue 14:00
                  </span>
                  <span
                    className={cn(
                      "rounded-md px-2 py-0.5 text-[6px] font-medium",
                      dark ? "bg-white/[0.06] text-white/50" : "bg-bone-100 text-swamp/45",
                    )}
                  >
                    Calendar
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Sidebar — calendar + AI */}
        <div className="flex w-[36%] shrink-0 flex-col gap-2">
          <div
            className={cn(
              "flex min-h-0 flex-1 flex-col rounded-xl border p-2.5 shadow-sm",
              dark ? "border-white/10 bg-[#0a1814]" : "border-swamp/[0.08] bg-white",
            )}
          >
            <div className="mb-2 flex items-center gap-1.5">
              <div className="flex size-4 items-center justify-center rounded-sm bg-[#4285F4]/90">
                <Calendar className="size-2.5 text-white" strokeWidth={2.5} aria-hidden />
              </div>
              <div className={sk(tone, "h-1.5 w-14 rounded-full")} />
            </div>
            <div className="grid flex-1 grid-cols-2 gap-1">
              {[0, 1, 1, 0, 0, 1].map((booked, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex min-h-[1.75rem] items-center justify-center rounded-md text-[7px] font-semibold",
                    booked
                      ? dark
                        ? "bg-malachite/30 text-malachite"
                        : "bg-malachite/25 text-malachite-800"
                      : dark
                        ? "border border-white/[0.06] bg-white/[0.04]"
                        : "bg-bone-50",
                  )}
                >
                  {booked ? "✓" : null}
                </div>
              ))}
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div className={sk(tone, "h-1 w-10 rounded-full")} />
              <span className={cn("text-[5px] font-medium", dark ? "text-malachite/70" : "text-malachite-700")}>
                Synced
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-center rounded-xl bg-gradient-to-br from-malachite to-malachite-700 p-3 text-center shadow-[0_8px_24px_-8px_rgba(0,227,87,0.45)]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-swamp/90">AI</span>
            <div className={sk("dark", "mx-auto mt-2 h-1 w-10 rounded-full")} />
            <div className={sk("dark", "mx-auto mt-1 h-1 w-7 rounded-full")} />
            <p className="mt-2 text-[5px] font-medium text-swamp/70">Auto-replies 24/7</p>
          </div>
        </div>
      </div>
    </Canvas>
  );
}

/** Gatekeepr — event check-in queue + attendance stats */
function GatekeeprMockup({ dark = false }: MockupBodyProps) {
  const sk = useSk();
  const tone = dark ? "dark" : "light";

  return (
    <Canvas
      className={cn(
        "p-2.5",
        dark
          ? DARK_CANVAS_CLASS
          : "bg-gradient-to-br from-bone-50 via-white to-green-50/40",
      )}
    >
      <div className="flex h-full gap-2">
        <div
          className={cn(
            "flex min-w-0 flex-[1.15] flex-col rounded-xl border p-2 shadow-sm",
            dark
              ? "border-white/10 bg-[#0a1814]"
              : "border-swamp/[0.08] bg-white",
          )}
        >
          <div className="mb-2 flex items-center justify-between">
            <div className={sk(tone, "h-1.5 w-16 rounded-full")} />
            <span
              className={cn(
                "rounded-md px-1.5 py-0.5 text-[6px] font-semibold",
                dark
                  ? "bg-malachite/20 text-malachite"
                  : "bg-malachite/15 text-malachite-800",
              )}
            >
              LIVE
            </span>
          </div>
          <div className="space-y-1.5">
            {[
              { checked: true, label: "Admitted" },
              { checked: true, label: "Admitted" },
              { checked: false, label: "Pending" },
              { checked: true, label: "Admitted" },
            ].map((row, i) => (
              <div
                key={i}
                className={cn(
                  "flex items-center gap-2 rounded-lg border px-2 py-1.5",
                  dark
                    ? "border-white/[0.06] bg-white/[0.04]"
                    : "border-swamp/[0.06] bg-bone-50/70",
                )}
              >
                <div
                  className={cn(
                    "flex size-4 shrink-0 items-center justify-center rounded-md text-[7px] font-bold",
                    row.checked
                      ? "bg-malachite/25 text-malachite"
                      : dark
                        ? "border border-white/10 bg-white/[0.04] text-white/35"
                        : "border border-swamp/10 bg-white text-swamp/35",
                  )}
                >
                  {row.checked ? "✓" : "·"}
                </div>
                <div className="min-w-0 flex-1">
                  <div className={sk(tone, "h-1.5 w-full max-w-[8rem] rounded-full")} />
                  <div className={sk(tone, "mt-1 h-1 w-2/3 rounded-full")} />
                </div>
                <div
                  className={cn(
                    "rounded px-1.5 py-0.5 text-[5px] font-semibold uppercase tracking-wide",
                    row.checked
                      ? dark
                        ? "bg-malachite/15 text-malachite"
                        : "bg-malachite/10 text-malachite-800"
                      : dark
                        ? "text-white/35"
                        : "text-swamp/35",
                  )}
                >
                  {row.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div
            className={cn(
              "flex flex-1 flex-col items-center justify-center rounded-xl border p-2 text-center",
              dark
                ? "border-white/10 bg-[#0f1f18]"
                : "border-swamp/[0.08] bg-bone-50/80",
            )}
          >
            <div
              className={cn(
                "mb-2 grid size-14 grid-cols-3 gap-0.5 rounded-md border p-1",
                dark ? "border-white/10 bg-white/[0.04]" : "border-swamp/10 bg-white",
              )}
            >
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "rounded-[2px]",
                    i % 3 === 1
                      ? "bg-malachite/70"
                      : dark
                        ? "bg-white/[0.08]"
                        : "bg-swamp/10",
                  )}
                />
              ))}
            </div>
            <p
              className={cn(
                "text-[6px] font-semibold uppercase tracking-wider",
                dark ? "text-malachite" : "text-malachite-800",
              )}
            >
              Scan to check in
            </p>
          </div>
          <div
            className={cn(
              "rounded-xl border p-2",
              dark
                ? "border-malachite/30 bg-gradient-to-r from-malachite/25 to-spring/10"
                : "border-malachite/20 bg-malachite/10",
            )}
          >
            <div className="flex items-end justify-between gap-2">
              <div>
                <p className={cn("text-[5px] font-medium", dark ? "text-white/45" : "text-swamp/45")}>
                  Checked in
                </p>
                <p className={cn("text-[11px] font-bold leading-none", dark ? "text-white" : "text-swamp")}>
                  248
                </p>
              </div>
              <div className="text-right">
                <p className={cn("text-[5px] font-medium", dark ? "text-white/45" : "text-swamp/45")}>
                  Expected
                </p>
                <p className={cn("text-[9px] font-semibold", dark ? "text-malachite" : "text-malachite-800")}>
                  312
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Canvas>
  );
}

/** Live Fotos — live event photo grid */
function LiveFotosMockup({ dark = false }: MockupBodyProps) {
  const sk = useSk();
  const tone = dark ? "dark" : "light";
  const tileTones = [
    "from-amber-300/80 to-orange-400/70",
    "from-rose-300/75 to-pink-400/65",
    "from-sky-300/70 to-blue-400/60",
    "from-emerald-300/70 to-teal-400/60",
    "from-violet-300/70 to-purple-400/60",
    "from-amber-200/80 to-yellow-400/70",
  ];

  return (
    <Canvas
      className={cn(
        "p-2.5",
        dark
          ? DARK_CANVAS_CLASS
          : "bg-gradient-to-br from-[#fff8eb] via-white to-[#fef3c7]/40",
      )}
    >
      <div
        className={cn(
          "flex h-full flex-col overflow-hidden rounded-xl border shadow-sm",
          dark ? "border-white/10 bg-[#0a1814]" : "border-swamp/[0.08] bg-white",
        )}
      >
        <div
          className={cn(
            "flex shrink-0 items-center justify-between border-b px-2.5 py-2",
            dark ? "border-white/[0.08] bg-[#0f1f18]" : "border-swamp/[0.06] bg-bone-50/80",
          )}
        >
          <div className={sk(tone, "h-1.5 w-20 rounded-full")} />
          <span
            className={cn(
              "rounded-md px-1.5 py-0.5 text-[6px] font-semibold",
              dark
                ? "bg-malachite/20 text-malachite"
                : "bg-amber-400/20 text-amber-700",
            )}
          >
            LIVE
          </span>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-3 gap-1.5 p-2">
          {tileTones.map((gradient, i) => (
            <div
              key={i}
              className={cn(
                "relative min-h-[3.25rem] overflow-hidden rounded-lg bg-gradient-to-br",
                gradient,
                i === 0 && "col-span-2 row-span-2 min-h-[6.75rem]",
              )}
            >
              {i === 1 && (
                <span className="absolute right-1 top-1 rounded bg-black/35 px-1 py-0.5 text-[5px] font-semibold text-white">
                  NEW
                </span>
              )}
            </div>
          ))}
        </div>

        <div
          className={cn(
            "flex shrink-0 items-center justify-between border-t px-2.5 py-2",
            dark ? "border-white/[0.08]" : "border-swamp/[0.06]",
          )}
        >
          <div className={sk(tone, "h-1.5 w-16 rounded-full")} />
          <span
            className={cn(
              "text-[5px] font-medium",
              dark ? "text-malachite/80" : "text-amber-700/80",
            )}
          >
            42 photos · updating
          </span>
        </div>
      </div>
    </Canvas>
  );
}

type MockupBodyProps = { dark?: boolean };

const BODIES: Record<
  Exclude<ProductMockupVariant, "hr-plus">,
  (props: MockupBodyProps) => ReactNode
> = {
  "flex-pos": FlexPosMockup,
  "bouw-plus": () => <BouwPlusMockup />,
  "invoice-plus": InvoicePlusMockup,
  "vendor-plus": () => <VendorPlusMockup />,
  "whatsapp-ai": WhatsAppAiMockup,
  gatekeepr: GatekeeprMockup,
  "live-fotos": LiveFotosMockup,
};

export default function ProductMockup({
  variant,
  className = "",
  presentation = "browser",
  theme = "light",
  compact = false,
  animated = true,
}: ProductMockupProps) {
  const isDark = theme === "dark";

  if (variant === "hr-plus") {
    if (presentation === "floating") {
      return (
        <MockupAnimationProvider animated={animated}>
          <HrPlusPreviewStage
            variant="detail"
            compact={compact}
            animated={animated}
            className={className}
          />
        </MockupAnimationProvider>
      );
    }

    return (
      <MockupAnimationProvider animated={animated}>
        <div
          className={cn(
            "flex h-full min-h-0 flex-col overflow-hidden rounded-lg border",
            isDark ? DARK_FRAME_CLASS : "border-swamp/10 bg-white shadow-[0_12px_32px_-16px_rgba(0,30,28,0.18)]",
            className,
          )}
        >
          <Chrome
            path={PATHS["hr-plus"]}
            url={CHROME_URLS["hr-plus"]}
            dark={isDark}
          />
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-[#0f1f18]">
            <HrPlusPreviewStage
              variant={compact ? "card" : "detail"}
              compact={compact}
              animated={animated}
              embedded
              className="min-h-0 flex-1"
            />
          </div>
        </div>
      </MockupAnimationProvider>
    );
  }

  const Body = BODIES[variant];

  return (
    <MockupAnimationProvider animated={animated}>
      <div
        className={cn(
          "flex h-full min-h-0 flex-col overflow-hidden rounded-lg border",
          isDark
            ? DARK_FRAME_CLASS
            : "border-swamp/10 bg-white shadow-[0_12px_32px_-16px_rgba(0,30,28,0.18)]",
          className,
        )}
      >
        <Chrome
          path={PATHS[variant]}
          url={CHROME_URLS[variant]}
          dark={isDark}
        />
        <Body dark={isDark} />
      </div>
    </MockupAnimationProvider>
  );
}
