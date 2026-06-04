import {
  Bot,
  Building2,
  FileText,
  PackageCheck,
  Store,
  type LucideIcon,
} from "lucide-react";
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

export const PRODUCT_LABELS: Record<string, string> = {
  "flex-pos": "Retail operations",
  "hr-plus": "HR Plus",
  "bouw-plus": "Finance operations",
  "invoice-plus": "Billing operations",
  "vendor-plus": "Vendor operations",
  "whatsapp-ai": "AI automation",
};
