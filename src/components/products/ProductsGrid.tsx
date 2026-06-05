"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { products } from "@/data/products";
import PageSection from "@/components/layout/PageSection";
import { PAGE_SECTION_PY } from "@/lib/theme/section-spacing";
import HomeSectionHeader from "@/components/home/HomeSectionHeader";
import ProductMockup, { PRODUCT_MOCKUP_HEIGHT } from "@/components/sections/ProductMockup";
import {
  PRODUCT_ICONS,
  PRODUCT_LABELS,
  PRODUCT_MOCKUP_VARIANT,
  isGreenProductCard,
  productMockupBandStyle,
  productTitleClassName,
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
      nextSectionTone="white"
      py={PAGE_SECTION_PY}
      id="products"
      className="bg-white"
    >
      <HomeSectionHeader
        eyebrow={grid.eyebrow}
        title={grid.title}
        description={grid.description}
      />

      <div className="mt-12 grid gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {products.map((product, i) => {
          const Icon = PRODUCT_ICONS[product.id] ?? PRODUCT_ICONS["flex-pos"];
          const mockupVariant = PRODUCT_MOCKUP_VARIANT[product.id] ?? "flex-pos";
          const label = PRODUCT_LABELS[product.id] ?? product.tags[0];
          const greenCard = isGreenProductCard(product.id);

          return (
            <article
              key={product.id}
              id={product.id}
              className={cn(
                surfaceCardClassName(
                  "group flex h-full scroll-mt-28 flex-col overflow-hidden transition-[border-color,box-shadow,transform] duration-[480ms] ease-[cubic-bezier(0.33,1,0.68,1)] hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none",
                ),
                greenCard &&
                  "border-malachite/25 bg-gradient-to-br from-[#0d281f] via-[#103126] to-[#123a2e] text-white hover:border-malachite/45 hover:shadow-[0_22px_44px_-20px_rgba(0,30,28,0.35),0_0_0_1px_rgba(0,200,83,0.28),0_0_0_3px_rgba(0,200,83,0.1),0_0_18px_-2px_rgba(0,200,83,0.2)]",
                !greenCard &&
                  "hover:border-malachite/35 hover:shadow-[0_22px_44px_-20px_rgba(0,30,28,0.12),0_0_0_1px_rgba(0,200,83,0.22),0_0_0_3px_rgba(0,200,83,0.08),0_0_16px_-2px_rgba(0,200,83,0.16)]",
              )}
            >
              <Link
                href={`/products/${product.slug}`}
                className="flex flex-1 flex-col"
                aria-label={`Open ${product.name} product`}
              >
                <div
                  className={cn(
                    "relative overflow-hidden border-b p-4 sm:p-5",
                    greenCard ? "border-white/10" : "border-swamp/8",
                  )}
                  style={productMockupBandStyle(product, greenCard)}
                >
                  <div className={cn("mx-auto w-full max-w-[22rem]", PRODUCT_MOCKUP_HEIGHT)}>
                    <ProductMockup
                      variant={mockupVariant}
                      presentation="browser"
                      theme={greenCard ? "dark" : "light"}
                      compact
                      animated={false}
                      className="size-full transition duration-500 group-hover:translate-y-[-2px]"
                    />
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "inline-flex h-9 w-9 items-center justify-center rounded-lg border shadow-sm",
                        greenCard
                          ? "border-white/20 bg-white/10 text-malachite"
                          : "border-swamp/10 bg-bone-50 text-malachite-700",
                      )}
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    <span
                      className={cn(
                        greenCard
                          ? "label-tech-on-dark text-malachite"
                          : "label-tech text-malachite-700",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")} · {label.toUpperCase()}
                    </span>
                  </div>

                  <h3
                    className={cn(
                      "mt-4 text-2xl font-semibold leading-[1.1] tracking-normal",
                      productTitleClassName(product.id, greenCard),
                    )}
                  >
                    {product.name}
                  </h3>
                  <p
                    className={cn(
                      "mt-3 line-clamp-3 text-sm leading-relaxed",
                      greenCard ? "text-white/78" : "text-swamp/72",
                    )}
                  >
                    {product.descr}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {product.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className={cn(
                          "rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-normal",
                          greenCard
                            ? "border-white/20 text-white/70"
                            : "border-swamp/10 bg-bone-50/80 text-swamp/55",
                        )}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span
                    className={cn(
                      "mt-auto inline-flex items-center gap-2 pt-6 transition-all group-hover:gap-3",
                      greenCard
                        ? "label-tech !text-white/90 group-hover:!text-white"
                        : "label-tech text-malachite-700",
                    )}
                  >
                    View product <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </article>
          );
        })}
      </div>

      <p className="mt-10 text-center text-sm text-swamp/45 sm:mt-12">{grid.footnote}</p>
    </PageSection>
  );
}
