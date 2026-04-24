import { Link, useParams } from "react-router-dom";
import { PropertyImageGallery } from "../components/property-detail/PropertyImageGallery";
import { PropertyInquiryCard } from "../components/property-detail/PropertyInquiryCard";
import { PropertyKeyFactsRow } from "../components/property-detail/PropertyKeyFactsRow";
import { properties } from "../data/properties";
import { formatPropertyArea, toTitleCase } from "../utils/formatters";

export function PropertyDetailPage() {
  const { propertySlug } = useParams();
  const property = properties.find((item) => item.slug === propertySlug);
  if (!property) {
    return (
      <section className="shell-container page-shell">
        <div className="premium-card rounded-[28px] p-8">
          <h1 className="text-3xl font-semibold text-[var(--color-text)]">Property not found</h1>
          <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">
            This property is not available right now. Return to the listings page to continue browsing verified options.
          </p>
        </div>
      </section>
    );
  }

  return (
    <div className="shell-container page-shell space-y-12 sm:space-y-14 lg:space-y-16">
      <section className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end lg:gap-10">
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-[var(--color-accent-soft)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-deep)]">
              {toTitleCase(property.purpose)}
            </span>
            {property.featured ? (
              <span className="rounded-full bg-[var(--color-primary)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-button-text)]">
                Featured
              </span>
            ) : null}
            {property.verified ? (
              <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text)] shadow-[0_10px_24px_rgba(20,26,41,0.05)]">
                Verified
              </span>
            ) : null}
          </div>
          <div className="space-y-4">
            <h1 className="section-title text-[2.6rem] font-semibold leading-[1.01] text-[var(--color-text)] sm:text-[3.5rem]">
              {property.title}
            </h1>
            <p className="text-base text-[var(--color-text-soft)] sm:text-lg">
              {property.locality}, {property.city}
            </p>
            <p className="text-3xl font-semibold text-[var(--color-text)] sm:text-4xl">{property.priceLabel}</p>
          </div>
        </div>
        <div className="premium-card rounded-[30px] p-6">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-soft)]">Quick snapshot</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {[property.propertyType, `${property.bedrooms} Bed`, `${property.bathrooms} Bath`, formatPropertyArea(property)].map((item) => (
              <span key={item} className="rounded-full bg-[var(--color-surface-muted)] px-3 py-2 text-sm font-semibold text-[var(--color-text)]">
                {item}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm leading-8 text-[var(--color-text-soft)]">{property.shortDescription}</p>
        </div>
      </section>

      <PropertyImageGallery property={property} />

      <PropertyKeyFactsRow property={property} />

      <section className="grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:gap-10">
        <div className="space-y-8">
          <article className="premium-card rounded-[32px] p-6 sm:p-8">
            <h2 className="section-title text-[2rem] font-semibold text-[var(--color-text)]">Highlights</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {property.highlights.map((highlight) => (
                <div key={highlight} className="rounded-[22px] bg-[var(--color-surface-muted)] p-5 text-sm leading-8 text-[var(--color-text-soft)]">
                  {highlight}
                </div>
              ))}
            </div>
          </article>

          <article className="premium-card rounded-[32px] p-6 sm:p-8">
            <h2 className="section-title text-[2rem] font-semibold text-[var(--color-text)]">Amenities</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {property.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="rounded-full bg-[var(--color-surface-muted)] px-4 py-3 text-sm font-medium text-[var(--color-text)]"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </article>

          <article className="premium-card rounded-[32px] p-6 sm:p-8">
            <h2 className="section-title text-[2rem] font-semibold text-[var(--color-text)]">About this property</h2>
            <p className="mt-6 max-w-4xl text-sm leading-8 text-[var(--color-text-soft)] sm:text-base">
              {property.fullDescription}
            </p>
          </article>
        </div>

        <div className="space-y-8">
          <PropertyInquiryCard property={property} />
          <div className="premium-card rounded-[28px] p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-soft)]">Need a broader shortlist?</p>
            <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">
              Compare similar inventory from the same purpose funnel or return to listings for a wider view.
            </p>
            <Link
              to={property.purpose === "rent" ? "/rent" : "/buy"}
              className="btn-secondary mt-5 inline-flex px-5 py-3 text-sm font-semibold"
            >
              Back to {property.purpose === "rent" ? "rent" : "buy"} listings
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
