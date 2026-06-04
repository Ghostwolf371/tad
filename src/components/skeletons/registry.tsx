import type { ComponentType } from "react";
import {
  AboutPageSkeleton,
  BookPageSkeleton,
  ContactPageSkeleton,
  HomePageSkeleton,
  LegalPageSkeleton,
  PortfolioPageSkeleton,
  ProductDetailSkeleton,
  ProductsPageSkeleton,
  ProjectDetailSkeleton,
  ServicesPageSkeleton,
  VacaturePageSkeleton,
  VacatureRoleDetailSkeleton,
} from "@/components/skeletons/pages";

export type PageSkeletonComponent = ComponentType;

const ROUTE_SKELETONS: Array<{ test: (path: string) => boolean; Skeleton: PageSkeletonComponent }> =
  [
    { test: (p) => p === "/", Skeleton: HomePageSkeleton },
    { test: (p) => p === "/about", Skeleton: AboutPageSkeleton },
    { test: (p) => p === "/services", Skeleton: ServicesPageSkeleton },
    { test: (p) => p === "/contact", Skeleton: ContactPageSkeleton },
    { test: (p) => p === "/book", Skeleton: BookPageSkeleton },
    { test: (p) => p === "/products", Skeleton: ProductsPageSkeleton },
    { test: (p) => p.startsWith("/products/"), Skeleton: ProductDetailSkeleton },
    { test: (p) => p === "/portfolio", Skeleton: PortfolioPageSkeleton },
    { test: (p) => p.startsWith("/portfolio/"), Skeleton: ProjectDetailSkeleton },
    { test: (p) => p === "/vacature", Skeleton: VacaturePageSkeleton },
    { test: (p) => p.startsWith("/vacature/"), Skeleton: VacatureRoleDetailSkeleton },
    { test: (p) => p === "/privacy" || p === "/cookies", Skeleton: LegalPageSkeleton },
  ];

export function getPageSkeleton(pathname: string): PageSkeletonComponent {
  const path = pathname.split("?")[0]?.replace(/\/$/, "") || "/";
  const normalized = path === "" ? "/" : path;
  return ROUTE_SKELETONS.find(({ test }) => test(normalized))?.Skeleton ?? HomePageSkeleton;
}
