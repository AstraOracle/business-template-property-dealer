import { Link } from "react-router-dom";
import { siteConfig } from "../config/siteConfig";
import { generatePropertyInquiryMessage, generateWhatsAppLink } from "../utils/contact";
import { formatBedBathLabel, formatPropertyArea, toTitleCase } from "../utils/formatters";
import { createPropertyPlaceholder, getMediaSurfaceStyle } from "../utils/media";

export function PropertyCard({ property }) {
  const whatsappUrl = generateWhatsAppLink(
    siteConfig.whatsappNumber,
    generatePropertyInquiryMessage({
      businessName: siteConfig.businessName,
      sourcePage: "Featured Property Card",
      propertyName: property.title,
      locality: `${property.locality}, ${property.city}`,
      budget: property.priceLabel,
    }),
  );

  return (
    <article className="premium-card group overflow-hidden rounded-[28px] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_54px_rgba(20,26,41,0.10)]">
      <div
        className="relative h-56 transition duration-500 group-hover:scale-[1.03]"
        style={getMediaSurfaceStyle(property.featuredImage, createPropertyPlaceholder(property))}
      >
        <div className="absolute inset-x-0 top-0 flex flex-wrap gap-2 p-4">
          {property.featured ? (
            <span className="theme-chip rounded-full bg-[var(--color-primary)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-button-text)]">
              Featured
            </span>
          ) : null}
          {property.verified ? (
            <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-text)]">
              Verified
            </span>
          ) : null}
        </div>
      </div>
      <div className="space-y-5 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="rounded-full bg-[var(--color-accent-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-deep)]">
            {toTitleCase(property.purpose)}
          </span>
          <span className="text-sm font-medium text-[var(--color-text-soft)]">
            {property.priceLabel}
          </span>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-[var(--color-text)]">{property.title}</h3>
          <p className="text-sm text-[var(--color-text-soft)]">
            {property.locality}, {property.city}
          </p>
          <p className="text-sm leading-7 text-[var(--color-text-soft)]">{property.shortDescription}</p>
          <p className="text-sm font-medium text-[var(--color-accent-deep)]">{property.ctaMessage}</p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-medium text-[var(--color-text-soft)]">
          <span className="rounded-full bg-[var(--color-surface-muted)] px-3 py-2">
            {property.propertyType}
          </span>
          <span className="rounded-full bg-[var(--color-surface-muted)] px-3 py-2">
            {formatBedBathLabel(property)}
          </span>
          <span className="rounded-full bg-[var(--color-surface-muted)] px-3 py-2">
            {formatPropertyArea(property)}
          </span>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            to={`/properties/${property.slug}`}
            className="btn-primary inline-flex flex-1 items-center justify-center px-5 py-3 text-sm font-semibold transition duration-300"
          >
            View details
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-soft inline-flex flex-1 items-center justify-center px-5 py-3 text-sm font-semibold transition duration-300"
          >
            WhatsApp inquiry
          </a>
        </div>
      </div>
    </article>
  );
}
