import PageHero from "@/components/layout/PageHero";
import ProductsGrid from "@/components/products/ProductsGrid";
import PageCTA from "@/components/layout/PageCTA";
import { productsPageContent } from "@/lib/content/products-page";

export const metadata = {
  title: "Products",
  description:
    "TAD in-house products — PayZa POS, HR Plus, Bouw+, Invoice+, and Vendor+ for modern operations teams.",
};

export default function ProductsPage() {
  const { hero } = productsPageContent;

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        titleLines={hero.titleLines}
        titleGradientLine={hero.titleGradientLine}
        subtitle={hero.subtitle}
      />
      <ProductsGrid sectionIndex={0} />
      <PageCTA afterSectionIndex={0} lastSectionTone="white" tone="white" />
    </>
  );
}
