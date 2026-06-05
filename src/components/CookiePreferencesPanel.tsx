"use client";

import { BarChart3, Cookie, Megaphone } from "lucide-react";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import {
  COOKIE_CONSENT_CHANGED_EVENT,
  readCookieConsent,
  writeCookieConsent,
} from "@/lib/cookie-consent";
import { cn } from "@/lib/utils";

type CategoryId = "essential" | "analytics" | "marketing";

const categories: {
  id: CategoryId;
  label: string;
  description: string;
  icon: typeof Cookie;
  locked?: boolean;
}[] = [
  {
    id: "essential",
    label: "Essential",
    description: "Required for the site to function. Cannot be disabled.",
    icon: Cookie,
    locked: true,
  },
  {
    id: "analytics",
    label: "Analytics",
    description: "Helps us understand how visitors use our site.",
    icon: BarChart3,
  },
  {
    id: "marketing",
    label: "Marketing",
    description: "Used to deliver relevant advertising.",
    icon: Megaphone,
  },
];

export default function CookiePreferencesPanel() {
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [saved, setSaved] = useState(false);

  const hydrateFromStorage = useCallback(() => {
    const stored = readCookieConsent();
    if (!stored) return;
    setAnalytics(stored.analytics);
    setMarketing(stored.marketing);
  }, []);

  useEffect(() => {
    hydrateFromStorage();

    const onChanged = () => hydrateFromStorage();
    window.addEventListener(COOKIE_CONSENT_CHANGED_EVENT, onChanged);
    return () => window.removeEventListener(COOKIE_CONSENT_CHANGED_EVENT, onChanged);
  }, [hydrateFromStorage]);

  const savePreferences = () => {
    writeCookieConsent({
      necessary: true,
      analytics,
      marketing,
      ts: Date.now(),
    });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2800);
  };

  return (
    <div className="mt-10 lg:mt-12">
      <div className="rounded-2xl border border-swamp/[0.08] bg-white p-6 shadow-[0_8px_30px_rgba(0,30,28,0.06)] sm:p-8">
        <div className="max-w-2xl">
          <h2 className="text-xl font-bold tracking-tight text-swamp sm:text-2xl">
            Cookie preferences
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-swamp/60 sm:text-[15px]">
            Manage which cookies you allow. Essential cookies are always active.
          </p>
        </div>

        <div className="mt-6 space-y-3">
          {categories.map((category) => {
            const Icon = category.icon;
            const isEssential = category.id === "essential";
            const isAnalytics = category.id === "analytics";
            const checked = isEssential
              ? true
              : isAnalytics
                ? analytics
                : marketing;
            const onChange = isAnalytics
              ? setAnalytics
              : category.id === "marketing"
                ? setMarketing
                : undefined;

            return (
              <PreferenceRow
                key={category.id}
                label={category.label}
                description={category.description}
                checked={checked}
                locked={category.locked}
                onChange={onChange}
                icon={<Icon className="h-4 w-4" strokeWidth={2.25} />}
              />
            );
          })}
        </div>

        <div className="mt-6 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-end">
          {saved ? (
            <p className="text-center text-sm font-medium text-malachite-700 sm:mr-auto sm:text-left">
              Preferences saved.
            </p>
          ) : null}
          <button
            type="button"
            onClick={savePreferences}
            className="rounded-full bg-malachite px-6 py-2.5 text-sm font-semibold text-swamp transition-colors hover:bg-spring"
          >
            Save preferences
          </button>
        </div>
      </div>
    </div>
  );
}

function PreferenceRow({
  label,
  description,
  checked,
  locked = false,
  onChange,
  icon,
}: {
  label: string;
  description: string;
  checked: boolean;
  locked?: boolean;
  onChange?: (value: boolean) => void;
  icon: ReactNode;
}) {
  return (
    <label
      className={cn(
        "flex items-center justify-between gap-4 rounded-xl border px-4 py-4 transition-colors sm:px-5",
        checked
          ? "border-malachite/25 bg-malachite/[0.06]"
          : "border-swamp/[0.08] bg-white",
        locked ? "cursor-default" : "cursor-pointer",
      )}
    >
      <span className="flex min-w-0 items-start gap-3.5">
        <span
          className={cn(
            "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
            checked ? "bg-malachite text-swamp" : "bg-swamp/[0.06] text-swamp/35",
          )}
        >
          {icon}
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-semibold text-swamp">{label}</span>
          <span className="mt-0.5 block text-[13px] leading-snug text-swamp/55">
            {description}
          </span>
        </span>
      </span>

      <span
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors",
          checked ? "bg-malachite" : "bg-swamp/15",
          locked && "opacity-80",
        )}
      >
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          disabled={locked}
          onChange={(e) => onChange?.(e.target.checked)}
          aria-label={label}
        />
        <span
          className={cn(
            "inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform",
            checked ? "translate-x-[22px]" : "translate-x-0.5",
          )}
        />
      </span>
    </label>
  );
}
