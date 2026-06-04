import {
  Globe,
  Megaphone,
  ShoppingBag,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import type { ServiceMockupVariant } from "@/components/sections/ServiceMockup";

export const SERVICE_ICONS: Record<string, LucideIcon> = {
  ShoppingBag,
  Globe,
  Smartphone,
  Megaphone,
};

export const SERVICE_MOCKUP_VARIANT: Record<string, ServiceMockupVariant> = {
  "e-commerce": "ecommerce",
  "web-development": "dashboard",
  "mobile-development": "mobile",
  "digital-marketing": "marketing",
};
