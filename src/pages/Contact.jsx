import { LeadMultiStepForm } from "../components/lead/LeadMultiStepForm";
import { ContactInfoPanel } from "../components/contact/ContactInfoPanel";
import { ContactHeroSection } from "../components/contact/ContactHeroSection";
import { siteConfig } from "../config/siteConfig";
import { SectionHeading } from "../components/SectionHeading";

export function ContactPage() {
  return (
    <div className="shell-container page-shell space-y-12 sm:space-y-14 lg:space-y-16">
      <ContactHeroSection />

      <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
        <ContactInfoPanel />
        <div className="space-y-6">
          <div className="premium-card rounded-[32px] p-7 sm:p-8 lg:p-10">
            <SectionHeading
              eyebrow="Inquiry form"
              title="Share your requirement in a format built for follow-through."
              description="Use the form below for a structured first brief so our team can follow up with the right options and next steps."
            />
          </div>
          <LeadMultiStepForm
            sourcePage="Contact Page"
            city={siteConfig.city}
            businessName={siteConfig.businessName}
            whatsappNumber={siteConfig.whatsappNumber}
          />
        </div>
      </section>
    </div>
  );
}
