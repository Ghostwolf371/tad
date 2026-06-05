"use client";

import { useEffect, useMemo, useState } from "react";
import type { LegalSection } from "@/lib/content/legal/privacy";
import { cn } from "@/lib/utils";

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function renderInlineMarkdown(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);

  return parts.map((part, index) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!match) return <span key={index}>{part}</span>;

    const [, label, href] = match;
    const external = href.startsWith("http");

    return (
      <a
        key={index}
        href={href}
        className="text-malachite-700 underline underline-offset-2 transition hover:text-malachite-600"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {label}
      </a>
    );
  });
}

function LegalParagraph({ text }: { text: string }) {
  return (
    <p className="text-[15px] leading-[1.75] text-swamp/75 sm:text-base">
      {renderInlineMarkdown(text)}
    </p>
  );
}

const legalCardClass =
  "rounded-2xl border border-swamp/[0.08] bg-white shadow-[0_8px_30px_rgba(0,30,28,0.06)]";

export default function LegalProse({
  intro,
  sections,
  showToc = false,
}: {
  intro?: string | string[];
  sections: LegalSection[];
  showToc?: boolean;
}) {
  const firstSectionId = useMemo(
    () => (sections[0] ? `legal-${slugify(sections[0].title)}` : ""),
    [sections],
  );
  const [activeId, setActiveId] = useState(firstSectionId);
  const introParagraphs = intro ? (Array.isArray(intro) ? intro : [intro]) : [];

  useEffect(() => {
    if (!showToc || !firstSectionId) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );

    sections.forEach((section) => {
      const el = document.getElementById(`legal-${slugify(section.title)}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections, showToc, firstSectionId]);

  return (
    <div className="relative -mt-2 sm:-mt-4">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10 xl:gap-12">
        {showToc && (
          <aside className="lg:w-64 lg:shrink-0 xl:w-72">
            <div className={cn(legalCardClass, "p-5 sm:p-6 lg:sticky lg:top-28")}>
              <p className="label-tech mb-4 text-swamp/45">On this page</p>
              <nav className="space-y-0.5" aria-label="On this page">
                {sections.map((section) => {
                  const id = `legal-${slugify(section.title)}`;
                  const isActive = activeId === id;

                  return (
                    <a
                      key={section.title}
                      href={`#${id}`}
                      className={cn(
                        "block border-l-[3px] py-1.5 pl-3.5 text-[13px] leading-snug transition-colors",
                        isActive
                          ? "border-malachite font-semibold text-swamp"
                          : "border-transparent font-normal text-swamp/50 hover:text-swamp/70",
                      )}
                    >
                      {section.title}
                    </a>
                  );
                })}
              </nav>
            </div>
          </aside>
        )}

        <article className={cn(legalCardClass, "min-w-0 flex-1 p-6 sm:p-8 lg:p-10 xl:p-12")}>
          {introParagraphs.length > 0 && (
            <div className="space-y-4 border-b border-swamp/[0.08] pb-8">
              {introParagraphs.map((paragraph) => (
                <LegalParagraph key={paragraph.slice(0, 48)} text={paragraph} />
              ))}
            </div>
          )}

          {sections.map((section, index) => {
            const sectionId = `legal-${slugify(section.title)}`;

            return (
              <section
                key={section.title}
                id={sectionId}
                className={cn("scroll-mt-32", index > 0 || introParagraphs.length > 0 ? "mt-10" : "")}
              >
                <h2 className="flex items-center gap-3 text-xl font-semibold tracking-normal text-swamp sm:text-2xl">
                  <span
                    className="inline-block h-6 w-[3px] shrink-0 rounded-full bg-malachite"
                    aria-hidden
                  />
                  {section.title}
                </h2>

                {section.paragraphs.length > 0 && (
                  <div className="mt-4 space-y-4">
                    {section.paragraphs.map((paragraph) => (
                      <LegalParagraph key={paragraph.slice(0, 48)} text={paragraph} />
                    ))}
                  </div>
                )}

                {section.list && section.list.length > 0 && (
                  <ul className="mt-4 list-disc space-y-2.5 pl-6 text-[15px] leading-[1.75] text-swamp/75 sm:text-base">
                    {section.list.map((item) => (
                      <li key={item}>{renderInlineMarkdown(item)}</li>
                    ))}
                  </ul>
                )}

                {section.afterList && section.afterList.length > 0 && (
                  <div className="mt-4 space-y-4">
                    {section.afterList.map((paragraph) => (
                      <LegalParagraph key={paragraph.slice(0, 48)} text={paragraph} />
                    ))}
                  </div>
                )}

                {section.subsections?.map((subsection) => (
                  <div
                    key={subsection.title || subsection.paragraphs[0]?.slice(0, 32)}
                    className="mt-6"
                  >
                    {subsection.title ? (
                      <h3 className="text-base font-semibold text-swamp">{subsection.title}</h3>
                    ) : null}
                    <div className={subsection.title ? "mt-3 space-y-4" : "space-y-4"}>
                      {subsection.paragraphs.map((paragraph) => (
                        <LegalParagraph key={paragraph.slice(0, 48)} text={paragraph} />
                      ))}
                    </div>
                  </div>
                ))}
              </section>
            );
          })}
        </article>
      </div>
    </div>
  );
}
