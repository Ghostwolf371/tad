"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import LegalProse from "@/components/layout/LegalProse";
import { cookiePolicy } from "@/lib/content/legal/cookies";
import { Check, Cookie, X } from "lucide-react";
import { surfaceCardClassName } from "@/lib/theme/surfaces";

function CookiePreferences() {
  const [prefs, setPrefs] = useState({
    essential: true,
    analytics: true,
    marketing: false,
  });
  const [saved, setSaved] = useState(false);

  const toggle = (key: keyof typeof prefs) => {
    if (key === "essential") return;
    setPrefs((p) => ({ ...p, [key]: !p[key] }));
    setSaved(false);
  };

  const categories = [
    {
      key: "essential" as const,
      label: "Essential",
      desc: "Required for the site to function. Cannot be disabled.",
    },
    {
      key: "analytics" as const,
      label: "Analytics",
      desc: "Helps us understand how visitors use our site.",
    },
    {
      key: "marketing" as const,
      label: "Marketing",
      desc: "Used to deliver relevant advertising.",
    },
  ];

  return (
    <div className={surfaceCardClassName("mt-16 p-6 sm:p-8")}>
      <h3 className="mb-2 text-lg font-semibold text-swamp">Cookie preferences</h3>
      <p className="mb-6 text-sm text-swamp/65">
        Manage which cookies you allow. Essential cookies are always active.
      </p>
      <div className="space-y-4">
        {categories.map((cat) => (
          <div
            key={cat.key}
            className={`flex items-center justify-between rounded-xl border p-4 transition-colors ${
              prefs[cat.key]
                ? "border-malachite/30 bg-malachite/5"
                : "border-swamp/10 bg-white"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                  prefs[cat.key] ? "bg-malachite/20 text-malachite-700" : "bg-bone-50 text-swamp/40"
                }`}
              >
                {cat.key === "essential" ? (
                  <Cookie className="h-4 w-4" />
                ) : prefs[cat.key] ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <X className="h-4 w-4" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-swamp">{cat.label}</p>
                <p className="text-xs text-swamp/55">{cat.desc}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => toggle(cat.key)}
              disabled={cat.key === "essential"}
              className={`relative h-6 w-11 rounded-full transition-colors duration-300 ${
                prefs[cat.key] ? "bg-malachite" : "bg-swamp/20"
              } ${cat.key === "essential" ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${
                  prefs[cat.key] ? "left-[22px]" : "left-0.5"
                }`}
              />
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-end gap-4">
        {saved && (
          <span className="flex items-center gap-1 text-xs text-malachite-700">
            <Check className="h-3 w-3" /> Preferences saved
          </span>
        )}
        <button
          type="button"
          onClick={() => {
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
          }}
          className="rounded-full bg-malachite px-5 py-2 text-sm font-medium text-swamp transition hover:bg-spring"
        >
          Save preferences
        </button>
      </div>
    </div>
  );
}

export default function CookiesClient() {
  return (
    <>
      <Reveal>
        <LegalProse
          intro={cookiePolicy.intro}
          sections={cookiePolicy.sections}
          showToc
          lastUpdated="2026-05-25"
        />
      </Reveal>
      <Reveal delay={0.1}>
        <CookiePreferences />
      </Reveal>
    </>
  );
}
