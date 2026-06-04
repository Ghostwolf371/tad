"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { products } from "@/data/products";
import HomeSection from "@/components/home/HomeSection";
import { HOME_SECTION_PY_AFTER_DARK } from "@/lib/theme/section-spacing";
import Reveal from "@/components/ui/Reveal";
import KineticHeading from "@/components/ui/KineticHeading";
import Magnetic from "@/components/ui/Magnetic";
import Parallax from "@/components/ui/Parallax";
import { SectionGreenBleedUp } from "@/components/ui/SectionAmbient";
import ProductMockup, { PRODUCT_MOCKUP_HEIGHT } from "@/components/sections/ProductMockup";
import type { Product } from "@/data/products";
import { PRODUCT_MOCKUP_VARIANT } from "@/components/products/product-visuals";
import { surfaceCardInteractiveClassName } from "@/lib/theme/surfaces";
import { cn } from "@/lib/utils";

function featuredMockupBandStyle(product: Product) {
  return {
    backgroundImage: `radial-gradient(ellipse 90% 70% at 12% 0%, ${product.palette.primary}55 0%, transparent 52%), linear-gradient(160deg, #0c1814 0%, #0a1410 42%, #0f1f18 100%)`,
  };
}

export default function ProductsSection() {
  const featuredProductIds = ["flex-pos", "hr-plus", "whatsapp-ai"];
  const featuredProducts = featuredProductIds
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is (typeof products)[number] => Boolean(product));

  return (
    <HomeSection tone="white" edgeTop id="products" py={HOME_SECTION_PY_AFTER_DARK}>
      <SectionGreenBleedUp />
      <div className="relative z-[2]">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-malachite-700" aria-hidden />
                <span className="label-tech text-malachite-700">
                  Our products
                </span>
              </div>
            </Reveal>
            <KineticHeading
              as="h2"
              lines={["Proof we build", "for real operators."]}
              accentLastWord
              delay={0.05}
              className="mt-4 text-3xl font-semibold leading-[1.08] tracking-normal text-swamp sm:mt-5 sm:text-4xl md:text-5xl lg:text-6xl"
            />
            <Reveal delay={0.1}>
              <p className="mt-4 text-base leading-8 text-swamp/70 sm:mt-6 sm:text-lg">
                TAD does not only ship client work. We also build and run our
                own software products, which keeps our team close to practical
                business problems.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.05}>
            <Link
              href="/products"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-malachite-700 transition hover:text-malachite-800"
            >
              View all products
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:mt-14 lg:grid-cols-3">
          {featuredProducts.map((product, i) => {
            const mockupVariant =
              PRODUCT_MOCKUP_VARIANT[product.id] ?? "flex-pos";

            return (
              <Reveal key={product.id} delay={0.08 + i * 0.06}>
                <Link
                  href={`/products/${product.slug}`}
                  className={cn(
                    surfaceCardInteractiveClassName(
                      "group flex h-full flex-col overflow-hidden transition-shadow duration-500 hover:shadow-glow-green",
                    ),
                  )}
                >
                  <div
                    className="relative overflow-hidden border-b border-white/10 p-5"
                    style={featuredMockupBandStyle(product)}
                  >
                    <Parallax speed={i % 2 === 0 ? 0.1 : 0.16}>
                      <div className={cn("w-full", PRODUCT_MOCKUP_HEIGHT)}>
                        <ProductMockup
                          variant={mockupVariant}
                          presentation="browser"
                          theme="dark"
                          compact
                          animated={false}
                          className="size-full transition duration-500 group-hover:translate-y-[-2px]"
                        />
                      </div>
                    </Parallax>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-2xl font-semibold leading-tight tracking-normal text-swamp">
                      {product.name}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-swamp/75">
                      {product.descr}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {product.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-swamp/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-normal text-swamp/55"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Magnetic strength={0.25} className="mt-6 w-fit">
                      <span className="label-tech inline-flex items-center gap-2 text-malachite-700 transition group-hover:gap-3">
                        Explore product
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </Magnetic>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </HomeSection>
  );
}
