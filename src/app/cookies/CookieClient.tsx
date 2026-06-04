"use client";

import { useState, useEffect } from "react";
import { Check, Cookie, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

function CookieJarIcon() {
  return (
    <Reveal scale={0.9}>
      <div className="mx-auto mb-6 h-20 w-20 relative">
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
          <path
            d="M18 22c0-4 3-6 6-6h16c3 0 6 2 6 6v26c0 4-3 6-6 6H24c-3 0-6-2-6-6V22z"
            stroke="#001e1c"
            strokeWidth="2"
            fill="rgba(0,30,28,0.04)"
          />
          <rect x="18" y="14" width="28" height="4" rx="1" fill="#001e1c" />
          <circle cx="32" cy="38" r="8" fill="#d4ccba" stroke="#001e1c" strokeWidth="1.5" />
          <circle cx="29" cy="35" r="1" fill="#001e1c" />
          <circle cx="35" cy="36" r="1.2" fill="#001e1c" />
          <circle cx="32" cy="41" r="1" fill="#001e1c" />
          <path
            d="M28 10c2-2 4-2 6 0"
            stroke="#00e357"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            className="animate-steam"
            style={{ animationDelay: "0s" }}
          />
          <path
            d="M32 8c-2-2-4-2-6 0"
            stroke="#01f2ad"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            className="animate-steam"
            style={{ animationDelay: "0.6s" }}
          />
          <path
            d="M36 10c2-2 4-2 6 0"
            stroke="#00e357"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            className="animate-steam"
            style={{ animationDelay: "1.2s" }}
          />
        </svg>
      </div>
    </Reveal>
  );
}

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

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const categories = [
    { key: "essential" as const, label: "Essential", desc: "Required for the site to function. Cannot be disabled.", icon: Cookie },
    { key: "analytics" as const, label: "Analytics", desc: "Helps us understand how visitors use our site.", icon: Check },
    { key: "marketing" as const, label: "Marketing", desc: "Used to deliver relevant advertising.", icon: Check },
  ];

  return (
    <div className="mt-16 rounded-xl border border-swamp/15 bg-white p-6 sm:p-8">
      <h3 className="text-lg font-semibold text-swamp mb-2">Cookie Preferences</h3>
      <p className="text-sm text-swamp/60 mb-6">
        Manage which cookies you allow. Essential cookies are always active.
      </p>
      <div className="space-y-4">
        {categories.map((cat) => (
          <div
            key={cat.key}
            className={`flex items-center justify-between rounded-lg border p-4 transition-all ${
              prefs[cat.key] ? "border-malachite/30 bg-malachite/5" : "border-swamp/10 bg-white"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`h-8 w-8 rounded-md flex items-center justify-center shrink-0 ${
                  prefs[cat.key] ? "bg-malachite/20 text-malachite-700" : "bg-swamp-50 text-swamp/40"
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
                <p className="text-xs text-swamp/50">{cat.desc}</p>
              </div>
            </div>
            <button
              onClick={() => toggle(cat.key)}
              disabled={cat.key === "essential"}
              className={`relative h-6 w-11 rounded-full transition-colors duration-300 ${
                prefs[cat.key] ? "bg-malachite" : "bg-swamp/20"
              } ${cat.key === "essential" ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
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
          <span className="text-xs font-mono text-malachite-700 flex items-center gap-1">
            <Check className="h-3 w-3" /> preferences saved
          </span>
        )}
        <button
          onClick={handleSave}
          className="rounded-full bg-malachite px-5 py-2 text-sm font-medium text-swamp transition hover:bg-spring"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
}

function CrumbTrail() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const crumbs = [
    { left: "20%", top: 120, delay: 0 },
    { left: "45%", top: 200, delay: 0.2 },
    { left: "70%", top: 160, delay: 0.4 },
    { left: "35%", top: 280, delay: 0.1 },
    { left: "60%", top: 340, delay: 0.3 },
    { left: "25%", top: 420, delay: 0.5 },
    { left: "75%", top: 480, delay: 0.2 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {crumbs.map((c, i) => {
        const fade = Math.max(0, 1 - scrollY / 600);
        return (
          <span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-malachite/40"
            style={{
              left: c.left,
              top: `${c.top}px`,
              opacity: fade * (0.5 + c.delay),
              transform: `translateY(${scrollY * 0.1}px) scale(${fade})`,
              transition: "opacity 0.3s ease",
            }}
          />
        );
      })}
    </div>
  );
}

export default function CookieClient() {
  return (
    <div className="relative">
      <CrumbTrail />
      <CookieJarIcon />
      <CookiePreferences />
    </div>
  );
}
