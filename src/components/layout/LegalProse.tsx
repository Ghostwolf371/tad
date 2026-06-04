"use client";

import { useEffect, useState, useRef } from "react";
import type { LegalSection } from "@/lib/content/legal/privacy";
import { CheckCircle2, Database, Eye, Lock, ShieldCheck } from "lucide-react";

export default function LegalProse({
  intro,
  sections,
  showToc = false,
  showInfographic = false,
  lastUpdated,
}: {
  intro: string;
  sections: LegalSection[];
  showToc?: boolean;
  showInfographic?: boolean;
  lastUpdated?: string;
}) {
  const [activeId, setActiveId] = useState<string>("");
  const sectionRefs = useRef<Record<string, HTMLElement>>({});

  useEffect(() => {
    if (!showToc) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    sections.forEach((s) => {
      const el = document.getElementById(`legal-${s.title}`);
      if (el) {
        sectionRefs.current[s.title] = el;
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [sections, showToc]);

  return (
    <div className="relative">
      <div className="flex gap-12 lg:gap-16">
        {/* Sticky TOC */}
        {showToc && (
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-28">
              <p className="label-tech text-malachite-700 mb-4">Contents</p>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <a
                    key={section.title}
                    href={`#legal-${section.title}`}
                    className={`block text-xs leading-relaxed transition-colors py-1 border-l-2 pl-3 ${
                      activeId === `legal-${section.title}`
                        ? "border-malachite text-swamp font-medium"
                        : "border-transparent text-swamp/50 hover:text-swamp/70"
                    }`}
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        )}

        <div className={`prose-tad mx-auto ${showToc ? "max-w-2xl" : "max-w-3xl"}`}>
          {/* Last updated badge */}
          {lastUpdated && (
            <div className="mb-8 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-malachite/10 border border-malachite/20 px-3 py-1 text-[11px] font-mono text-malachite-700">
                <CheckCircle2 className="h-3 w-3" />
                verified
              </span>
              <span className="text-xs font-mono text-swamp/40">last updated: {lastUpdated}</span>
            </div>
          )}

          {/* Data Practices Infographic */}
          {showInfographic && (
            <div className="mb-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: Lock, label: "Encrypted", desc: "TLS 1.3" },
                { icon: Eye, label: "Transparent", desc: "No hidden trackers" },
                { icon: Database, label: "Minimal", desc: "Only what we need" },
                { icon: ShieldCheck, label: "Protected", desc: "GDPR/CCPA ready" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-swamp/10 bg-white p-4 text-center hover:border-malachite/30 transition-colors"
                >
                  <item.icon className="h-5 w-5 text-malachite-700 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-swamp">{item.label}</p>
                  <p className="text-[10px] text-swamp/50 mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>
          )}

          <p className="leading-relaxed text-swamp/75">{intro}</p>
          {sections.map((section) => (
            <div key={section.title} id={`legal-${section.title}`} className="mt-12 scroll-mt-28">
              <h2 className="text-xl font-semibold tracking-normal text-swamp">
                {section.title}
              </h2>
              {section.paragraphs.map((p) => (
                <p key={p.slice(0, 40)} className="mt-4 leading-relaxed text-swamp/75">
                  {p}
                </p>
              ))}
              {section.list && (
                <ul className="mt-4 list-disc space-y-2 pl-6 text-swamp/75">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
