import { siteConfig } from "../../config/siteConfig";
import {
  generatePropertyInquiryMessage,
  generateSiteVisitMessage,
  generateWhatsAppLink,
} from "../../utils/contact";

export function PropertyInquiryCard({ property }) {
  const whatsappUrl = generateWhatsAppLink(
    siteConfig.whatsappNumber,
    generatePropertyInquiryMessage({
      businessName: siteConfig.businessName,
      sourcePage: "Property Detail Page",
      propertyName: property.title,
      locality: `${property.locality}, ${property.city}`,
      budget: property.priceLabel,
      notes: "Please share availability, pricing clarity, and next steps.",
    }),
  );
  const siteVisitUrl = generateWhatsAppLink(
    siteConfig.whatsappNumber,
    generateSiteVisitMessage({
      businessName: siteConfig.businessName,
      sourcePage: "Property Detail Page",
      propertyName: property.title,
      locality: `${property.locality}, ${property.city}`,
      budget: property.priceLabel,
      notes: "I would like to schedule a site visit.",
    }),
  );

  return (
    <aside className="premium-card rounded-[32px] p-6 sm:p-7 lg:sticky lg:top-24">
      <div className="space-y-6">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-deep)]">
            Private inquiry
          </p>
          <h3 className="section-title text-[2rem] font-semibold leading-[1.06] text-[var(--color-text)]">Request a guided consultation</h3>
          <p className="text-sm leading-8 text-[var(--color-text-soft)]">
            Speak directly with {siteConfig.founderName}'s team for pricing clarity, availability, and curated next steps.
          </p>
        </div>

        <div className="rounded-[24px] bg-[var(--color-surface-muted)] p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-soft)]">Trust note</p>
          <p className="mt-3 text-sm leading-8 text-[var(--color-text-soft)]">
            We focus on serious enquiries, verified inventory, and a calmer consultation flow for high-value decisions.
          </p>
        </div>

        <div className="grid gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-primary inline-flex items-center justify-center px-5 py-3 text-sm font-semibold transition duration-300"
          >
            {siteConfig.ctaLabels.whatsapp}
          </a>
          <a
            href={siteVisitUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary inline-flex items-center justify-center px-5 py-3 text-sm font-semibold transition duration-300"
          >
            Book Site Visit
          </a>
        </div>

        <p className="text-sm leading-7 text-[var(--color-text-soft)]">{property.ctaMessage}</p>
      </div>
    </aside>
  );
}
