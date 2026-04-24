import { HeroSection } from "../components/home/HeroSection";
import { FeaturedPropertiesSection } from "../components/home/FeaturedPropertiesSection";
import { WhyChooseUsSection } from "../components/home/WhyChooseUsSection";
import { FeaturedLocalitiesSection } from "../components/home/FeaturedLocalitiesSection";
import { TestimonialsSection } from "../components/home/TestimonialsSection";
import { FinalCtaSection } from "../components/home/FinalCtaSection";
import { StickyMobileActionBar } from "../components/home/StickyMobileActionBar";
import { localities } from "../data/localities";
import { properties } from "../data/properties";
import { testimonials } from "../data/testimonials";

export function HomePage() {
  const featuredProperties = properties.filter((property) => property.featured);
  const featuredLocalities = localities.filter((locality) => locality.featured);

  return (
    <div className="space-y-36 pb-20 md:space-y-40">
      <HeroSection />
      <FeaturedPropertiesSection properties={featuredProperties} />
      <WhyChooseUsSection />
      <FeaturedLocalitiesSection localities={featuredLocalities} />
      <TestimonialsSection testimonials={testimonials} />
      <FinalCtaSection />
      <StickyMobileActionBar />
    </div>
  );
}
