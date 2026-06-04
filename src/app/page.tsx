import Hero from "@/components/home/Hero";
import VideoSection from "@/components/home/VideoSection";
import AboutSection from "@/components/home/AboutSection";
import FeaturedWork from "@/components/home/FeaturedWork";
import ServicesSection from "@/components/sections/ServicesSection";
// import Timeline from "@/components/home/Timeline"; // temporarily hidden — re-enable to restore the process section
import ProductsSection from "@/components/sections/ProductsSection";
import TrustedBy from "@/components/home/TrustedBy";
import CTA from "@/components/home/CTA";

export const metadata = {
  title: "TAD — From Now to Next",
  description:
    "TAD is a Suriname-based digital agency engineering world-class products, brands and experiences for small, medium and large enterprises.",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <VideoSection />
      <AboutSection />
      <FeaturedWork />
      <ServicesSection />
      {/* <Timeline /> */} {/* temporarily hidden — re-enable to restore the process section */}
      <ProductsSection />
      <TrustedBy />
      <CTA />
    </main>
  );
}
