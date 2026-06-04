import PageHero from "@/components/layout/PageHero";
import ServicesDetail from "@/components/services/ServicesDetail";
import ServicesProcess from "@/components/services/ServicesProcess";
import Packages from "@/components/services/Packages";
import { servicesPageContent } from "@/lib/content/services-page";

export const metadata = {
  title: "Services",
  description:
    "TAD services — e-commerce platforms, web development, mobile apps, and digital marketing for businesses in Suriname and beyond.",
};

export default function ServicesPage() {
  const { hero } = servicesPageContent;

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        titleLines={hero.titleLines}
        titleGradientLine={hero.titleGradientLine}
        subtitle={hero.subtitle}
      />
      <ServicesDetail sectionIndex={0} />
      <ServicesProcess sectionIndex={1} />
      <Packages sectionIndex={2} previousTone="dark-green" />
    </>
  );
}
