import {
  Bot,
  Building2,
  FileText,
  PackageCheck,
  Store,
  type LucideIcon,
} from "lucide-react";
import type { CSSProperties } from "react";
import type { Product } from "@/data/products";
import type { ProductMockupVariant } from "@/components/sections/ProductMockup";

export const PRODUCT_ICONS: Record<string, LucideIcon> = {
  "flex-pos": Store,
  "hr-plus": Building2,
  "bouw-plus": Building2,
  "invoice-plus": FileText,
  "vendor-plus": PackageCheck,
  "whatsapp-ai": Bot,
};

export const PRODUCT_MOCKUP_VARIANT: Record<string, ProductMockupVariant> = {
  "flex-pos": "flex-pos",
  "hr-plus": "hr-plus",
  "bouw-plus": "bouw-plus",
  "invoice-plus": "invoice-plus",
  "vendor-plus": "vendor-plus",
  "whatsapp-ai": "whatsapp-ai",
};

export function isGreenProductCard(productId: string) {
  return (
    productId === "hr-plus" ||
    productId === "invoice-plus" ||
    productId === "whatsapp-ai"
  );
}

export function productMockupBandStyle(
  product: Product,
  greenCard: boolean,
): CSSProperties {
  if (greenCard) {
    return {
      backgroundImage: `radial-gradient(ellipse 90% 70% at 12% 0%, ${product.palette.primary}44 0%, transparent 52%), linear-gradient(160deg, #0c1814 0%, #0a1410 42%, #0f1f18 100%)`,
    };
  }
  return {
    backgroundImage: `radial-gradient(ellipse 85% 65% at 20% 0%, ${product.palette.primary}22 0%, transparent 55%), linear-gradient(165deg, #f4f7f6 0%, #eef5f1 48%, #ffffff 100%)`,
  };
}

export function productTitleClassName(_productId: string, greenCard: boolean) {
  if (greenCard) return "text-white";
  return "text-swamp";
}

export const PRODUCT_LABELS: Record<string, string> = {
  "flex-pos": "Retail operations",
  "hr-plus": "HR Plus",
  "bouw-plus": "Finance operations",
  "invoice-plus": "Billing operations",
  "vendor-plus": "Vendor operations",
  "whatsapp-ai": "AI automation",
};
