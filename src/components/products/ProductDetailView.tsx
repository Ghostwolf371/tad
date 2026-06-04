"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import type { Product } from "@/data/products";
import { products } from "@/data/products";
import PageHero from "@/components/layout/PageHero";
import PageSection from "@/components/layout/PageSection";
import { PAGE_SECTION_PY } from "@/lib/theme/section-spacing";
import ProductMockup from "@/components/sections/ProductMockup";
import {
  PRODUCT_ICONS,
  PRODUCT_LABELS,
  PRODUCT_MOCKUP_VARIANT,
} from "@/components/products/product-visuals";
import { ButtonLink } from "@/components/ui/Button";
import { heroTitleLines } from "@/lib/hero-title-lines";
import {
  greenBandPanelCardClassName,
  greenBandPromoPanelClassName,
} from "@/lib/theme/green-band-surfaces";
import HomeSectionHeader from "@/components/home/HomeSectionHeader";
import { surfaceCardClassName, surfaceCardInteractiveClassName } from "@/lib/theme/surfaces";
import { cn } from "@/lib/utils";

type ProductDetailViewProps = {
  product: Product;
};

export default function ProductDetailView({ product }: ProductDetailViewProps) {
  const index = products.findIndex((p) => p.slug === product.slug);
  const next = products[(index + 1) % products.length];
  const Icon = PRODUCT_ICONS[product.id] ?? PRODUCT_ICONS["flex-pos"];
  const label = PRODUCT_LABELS[product.id] ?? product.tags[0];
  const mockupVariant = PRODUCT_MOCKUP_VARIANT[product.id] ?? "flex-pos";
  const titleLines = heroTitleLines(product.heading);
  const greenCard =
    product.id === "hr-plus" || product.id === "invoice-plus" || product.id === "whatsapp-ai";

  const accentVars = {
    "--product-primary": product.palette.primary,
    "--product-secondary": product.palette.secondary,
  } as CSSProperties;

  const showNext = next && next.slug !== product.slug;

  return (
    <div style={accentVars}>
      <PageHero
        eyebrow={`${String(index + 1).padStart(2, "0")} · ${label}`}
        titleLines={titleLines}
        titleGradientLine={titleLines.length > 1 ? 1 : 0}
        subtitle={product.longDescr}
      />

      <PageSection index={0} tone="white" previousTone="light-green" py="py-10 sm:py-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-3">
            <ButtonLink
              href={product.externalHref}
              size="lg"
              variant="primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit product site <ExternalLink className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/book" size="lg" variant="outline">
              Request a demo
            </ButtonLink>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-swamp/10 px-3 py-1 text-[10px] font-medium uppercase tracking-normal text-swamp/55"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </PageSection>

      <PageSection
        index={1}
        tone="white"
        previousTone="white"
        py="py-16 sm:py-24"
        className="border-t border-swamp/[0.06]"
      >
        <article
          className={cn(
            surfaceCardClassName(
              product.id === "hr-plus" ? "overflow-visible" : "overflow-hidden",
            ),
            greenCard &&
              "border-malachite/25 bg-gradient-to-br from-[#0d281f] via-[#103126] to-[#123a2e] text-white",
            "grid gap-8 p-6 sm:p-8 lg:grid-cols-2 lg:items-center lg:gap-12",
          )}
        >
          <div
            className={cn(
              "lg:order-2",
              "flex items-center justify-center rounded-xl border p-5 sm:p-6",
              greenCard
                ? "border-white/20 bg-[#F8F7F2]"
                : "border-swamp/8 bg-bone-50/80",
            )}
          >
            <div className="h-[18.5rem] w-full max-w-[40rem] sm:h-[19.5rem]">
              <ProductMockup variant={mockupVariant} className="size-full" />
            </div>
          </div>

          <div className="lg:order-1">
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "inline-flex h-11 w-11 items-center justify-center rounded-xl border shadow-sm",
                  greenCard
                    ? "border-white/20 bg-white/10 text-malachite"
                    : "border-swamp/10 bg-white",
                )}
                style={greenCard ? undefined : { color: product.palette.primary }}
              >
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <span
                className={cn(
                  greenCard ? "label-tech-on-dark text-malachite" : "label-tech text-malachite-700",
                )}
              >
                {label.toUpperCase()}
              </span>
            </div>

            <h2
              className={cn(
                "mt-5 text-3xl font-semibold leading-[1.08] tracking-normal sm:text-4xl",
                greenCard ? "text-white" : "text-swamp",
              )}
            >
              {product.name}
            </h2>
            <p className={cn("mt-4 text-base leading-relaxed", greenCard ? "text-white/80" : "text-swamp/75")}>
              {product.descr}
            </p>

            <p
              className={cn(
                "mt-6 rounded-xl border px-4 py-3 text-sm leading-relaxed",
                greenCard
                  ? "border-white/15 bg-white/8 text-white/75"
                  : "border-swamp/10 bg-bone-50/60 text-swamp/70",
              )}
            >
              <span className={cn("font-medium", greenCard ? "text-white" : "text-swamp")}>Best for: </span>
              {product.idealFor}
            </p>

            <ul className="mt-8 space-y-3">
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
          </div>
        </article>
      </PageSection>

      <PageSection
        index={2}
        tone="dark-green"
        previousTone="white"
        nextSectionTone="white"
        py={PAGE_SECTION_PY}
        ambient="dark-band"
      >
        <HomeSectionHeader
          variant="dark"
          eyebrow="Capabilities"
          title="Built for how your team works"
          className="max-w-2xl"
          titleClassName="leading-[1.04]"
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-3 sm:mt-12 sm:gap-5">
          {product.highlights.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className={greenBandPanelCardClassName("relative flex h-full flex-col", {
                featured: i === 0,
              })}
            >
              <span className="label-tech-on-dark font-mono text-malachite">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-white/75">
                {item.description}
              </p>
            </motion.article>
          ))}
        </div>

        <div className={cn(greenBandPromoPanelClassName("mt-12"), "flex flex-wrap items-center gap-4")}>
          <p className="flex-1 text-sm leading-relaxed text-white/75">
            Need onboarding, custom integrations, or training for your staff? TAD implements and
            supports every product we ship.
          </p>
          <ButtonLink href="/contact" variant="primary" size="md">
            Talk to us <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>
      </PageSection>

      {showNext && (
        <PageSection index={3} tone="white" previousTone="dark-green" py="py-12 sm:py-16">
          <div className="flex flex-col justify-between gap-6 border-t border-swamp/10 pt-10 sm:flex-row sm:items-center">
            <Link
              href="/products"
              className="label-tech inline-flex items-center gap-2 text-malachite-700 transition-all hover:gap-3"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> All products
            </Link>
            <Link
              href={`/products/${next.slug}`}
              className={cn(
                surfaceCardInteractiveClassName(
                  "group flex max-w-sm flex-col gap-2 p-5 sm:items-end sm:text-right",
                ),
              )}
            >
              <span className="label-tech inline-flex items-center gap-1 text-malachite-700">
                Next product <ArrowRight className="h-3 w-3" />
              </span>
              <span className="text-lg font-semibold text-swamp transition group-hover:text-malachite-700">
                {next.name}
              </span>
              <span className="text-sm text-swamp/60 line-clamp-2">{next.descr}</span>
            </Link>
          </div>
        </PageSection>
      )}
    </div>
  );
}
