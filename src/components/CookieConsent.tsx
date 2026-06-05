"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "tad-cookie-consent";

type Consent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  ts: number;
};

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [customising, setCustomising] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(true);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // Small delay so it eases in after the page settles
        const t = window.setTimeout(() => setVisible(true), 600);
        return () => window.clearTimeout(t);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const persist = useCallback((consent: Consent) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    } catch {
      /* ignore storage failures */
    }
    setVisible(false);
  }, []);

  const acceptAll = () =>
    persist({ necessary: true, analytics: true, marketing: true, ts: Date.now() });
  const rejectAll = () =>
    persist({ necessary: true, analytics: false, marketing: false, ts: Date.now() });
  const savePreferences = () =>
    persist({ necessary: true, analytics, marketing, ts: Date.now() });

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie consent"
      className="fixed bottom-3 left-3 right-3 z-[120] sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-md motion-safe:animate-[cookie-in_0.4s_cubic-bezier(0.22,1,0.36,1)]"
    >
      <div className="rounded-xl border border-white/10 bg-canvas-green p-5 text-white shadow-[0_24px_60px_-12px_rgba(0,0,0,0.6)] sm:rounded-2xl sm:p-8">
        <h2 className="text-base font-bold tracking-tight sm:text-xl">A few friendly cookies</h2>

        <p className="mt-1.5 text-[13px] leading-snug text-white/70 sm:mt-3 sm:text-[15px] sm:leading-relaxed">
          We use cookies to give you the best web experience possible. You can
          accept all or{" "}
          <Link href="/cookies" className="text-malachite underline underline-offset-2">
            tweak your preferences
          </Link>
          .
        </p>

        {customising && (
          <div className="mt-4 flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 sm:p-4">
            <ToggleRow
              label="Strictly necessary"
              description="Required for the site to function."
              checked
              locked
            />
            <ToggleRow
              label="Analytics"
              description="Helps us understand how the site is used."
              checked={analytics}
              onChange={setAnalytics}
            />
            <ToggleRow
              label="Marketing"
              description="Used to personalise and measure campaigns."
              checked={marketing}
              onChange={setMarketing}
            />
          </div>
        )}

        <div className="mt-4 flex flex-col gap-2 sm:mt-6 sm:flex-row sm:gap-3">
          {customising ? (
            <button
              type="button"
              onClick={savePreferences}
              className="order-1 rounded-lg border border-white/30 px-4 py-2 text-[13px] sm:px-5 sm:py-2.5 sm:text-sm font-medium text-white transition-colors hover:bg-white/10 sm:flex-1"
            >
              Save preferences
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setCustomising(true)}
              className="order-1 rounded-lg border border-white/30 px-4 py-2 text-[13px] sm:px-5 sm:py-2.5 sm:text-sm font-medium text-white transition-colors hover:bg-white/10 sm:flex-1"
            >
              Customise
            </button>
          )}
          <div className="order-2 flex gap-2 sm:contents">
            <button
              type="button"
              onClick={rejectAll}
              className="flex-1 rounded-lg border border-white/30 px-4 py-2 text-[13px] sm:px-5 sm:py-2.5 sm:text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Reject All
            </button>
            <button
              type="button"
              onClick={acceptAll}
              className="order-3 flex-1 rounded-lg bg-malachite px-4 py-2 text-[13px] sm:px-5 sm:py-2.5 sm:text-sm font-semibold text-swamp transition-colors hover:bg-spring"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ToggleRow({
  label,
  description,
  checked,
  locked = false,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  locked?: boolean;
  onChange?: (value: boolean) => void;
}) {
  return (
    <label
      className={cn(
        "flex items-start justify-between gap-4",
        locked ? "cursor-default" : "cursor-pointer",
      )}
    >
      <span>
        <span className="block text-sm font-medium text-white">{label}</span>
        <span className="block text-xs text-white/50">{description}</span>
      </span>
      <span
        className={cn(
          "relative mt-0.5 inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors",
          checked ? "bg-malachite" : "bg-white/20",
          locked && "opacity-60",
        )}
      >
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          disabled={locked}
          onChange={(e) => onChange?.(e.target.checked)}
        />
        <span
          className={cn(
            "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
            checked ? "translate-x-4" : "translate-x-0.5",
          )}
        />
      </span>
    </label>
  );
}
