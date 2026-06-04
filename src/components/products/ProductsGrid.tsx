"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { products } from "@/data/products";
import PageSection from "@/components/layout/PageSection";
import { PAGE_SECTION_PY } from "@/lib/theme/section-spacing";
import HomeSectionHeader from "@/components/home/HomeSectionHeader";
import ProductMockup from "@/components/sections/ProductMockup";
import {
  PRODUCT_ICONS,
  PRODUCT_LABELS,
  PRODUCT_MOCKUP_VARIANT,
} from "@/components/products/product-visuals";
import { productsPageContent } from "@/lib/content/products-page";
import { surfaceCardClassName } from "@/lib/theme/surfaces";
import { cn } from "@/lib/utils";

type ProductsGridProps = {
  sectionIndex?: number;
};

export default function ProductsGrid({ sectionIndex = 0 }: ProductsGridProps) {
  const { grid } = productsPageContent;

  return (
    <PageSection
      index={sectionIndex}
      tone="white"
      previousTone="light-green"
      nextSectionTone="light-green"
      py={PAGE_SECTION_PY}
      id="products"
    >
      <HomeSectionHeader
        eyebrow={grid.eyebrow}
        title={grid.title}
        description={grid.description}
      />
      <p className="mt-8 text-sm text-swamp/45">{grid.footnote}</p>

      <div className="mt-14 space-y-8 sm:mt-16">
        {products.map((product, i) => {
          const Icon = PRODUCT_ICONS[product.id] ?? PRODUCT_ICONS["flex-pos"];
          const mockupVariant = PRODUCT_MOCKUP_VARIANT[product.id] ?? "flex-pos";
          const label = PRODUCT_LABELS[product.id] ?? product.tags[0];
          const reverse = i % 2 === 1;
          const greenCard =
            product.id === "hr-plus" ||
            product.id === "invoice-plus" ||
            product.id === "whatsapp-ai";

          return (
            <article
              key={product.id}
              id={product.id}
              className={cn(
                surfaceCardClassName("scroll-mt-28 overflow-hidden"),
                greenCard &&
                  "border-malachite/25 bg-gradient-to-br from-[#0d281f] via-[#103126] to-[#123a2e] text-white",
                "grid gap-8 p-6 sm:p-8 lg:grid-cols-2 lg:items-center lg:gap-12",
              )}
            >
              <div
                className={cn(
                  reverse && "lg:order-2",
                  "flex items-center justify-center rounded-xl border p-5 sm:p-6",
                  greenCard
                    ? "border-white/20 bg-[#F8F7F2]"
                    : "border-swamp/8 bg-bone-50/80",
                )}
              >
                <Link
                  href={`/products/${product.slug}`}
                  aria-label={`Open ${product.name} product`}
                  className="block h-[18.5rem] w-full max-w-[40rem] sm:h-[19.5rem]"
                >
                  <ProductMockup variant={mockupVariant} className="size-full" />
                </Link>
              </div>

              <div className={cn(reverse && "lg:order-1")}>
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "inline-flex h-10 w-10 items-center justify-center rounded-lg border shadow-sm",
                      greenCard
                        ? "border-white/20 bg-white/10 text-malachite"
                        : "border-swamp/10 bg-white text-malachite-700",
                    )}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <span className={cn("label-tech", greenCard ? "text-malachite" : "text-malachite-700")}>
                    {String(i + 1).padStart(2, "0")} · {label.toUpperCase()}
                  </span>
                </div>

                <h3
                  className={cn(
                    "mt-5 text-3xl font-semibold leading-[1.08] tracking-normal sm:text-4xl",
                    greenCard ? "text-white" : "text-swamp",
                  )}
                >
                  {product.name}
                </h3>
                <p className={cn("mt-4 text-base leading-relaxed", greenCard ? "text-white/80" : "text-swamp/75")}>
                  {product.descr}
                </p>
                <p className={cn("mt-4 text-sm leading-relaxed", greenCard ? "text-white/72" : "text-swamp/70")}>
                  {product.longDescr}
                </p>

                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {product.features.map((feature) => (
                    <li
                      key={feature}
                      className={cn(
                        "flex items-start gap-3 text-sm before:mt-2 before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-malachite",
                        greenCard ? "text-white/82" : "text-swamp/80",
                      )}
                    >
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className={cn(
                        "rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-normal",
                        greenCard
                          ? "border-white/20 text-white/70"
                          : "border-swamp/10 text-swamp/50",
                      )}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/products/${product.slug}`}
                  className={cn(
                    "mt-8 inline-flex items-center gap-2 transition-all hover:gap-3",
                    greenCard
                      ? "label-tech !text-white/90 hover:!text-white"
                      : "label-tech text-malachite-700",
                  )}
                >
                  View product <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </PageSection>
  );
}
