import { HeroSection } from "@/features/landing/hero-section";
import { FeaturesSection } from "@/features/landing/features-section";
import { ModulesSection } from "@/features/landing/modules-section";
import { TestimonialsSection } from "@/features/landing/testimonials-section";
import { PricingSection } from "@/features/landing/pricing-section";
import { FAQSection } from "@/features/landing/faq-section";
import { CTASection } from "@/features/landing/cta-section";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <ModulesSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
