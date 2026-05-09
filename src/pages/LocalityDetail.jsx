import { useParams } from "react-router-dom";
import { PropertyGrid } from "../components/PropertyGrid";
import { SectionHeading } from "../components/SectionHeading";
import { siteConfig } from "../config/siteConfig";
import { localities } from "../data/localities";
import { properties } from "../data/properties";
import { buildConsultationWhatsAppUrl } from "../utils/contact";
import { createLocalityPlaceholder, getMediaSurfaceStyle } from "../utils/media";

export function LocalityDetailPage() {
  const { localitySlug } = useParams();
  const locality = localities.find((item) => item.slug === localitySlug);
  const featuredProperties = properties.filter((property) => property.locality === locality?.name);

  if (!locality) {
    return (
      <section className="shell-container page-shell">
        <div className="premium-card rounded-[28px] p-8">
          <h1 className="text-3xl font-semibold text-[var(--color-text)]">Locality not found</h1>
          <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">
            This locality page is not available right now. Return to the locality hub to continue browsing Gurgaon micro-markets.
          </p>
        </div>
      </section>
    );
  }

  const localityWhatsappUrl = buildConsultationWhatsAppUrl({
    whatsappNumber: siteConfig.whatsappNumber,
    businessName: siteConfig.businessName,
    city: `${locality.name}, ${locality.city}`,
    sourcePage: `Locality Detail - ${locality.name}`,
    notes: `I want expert guidance for ${locality.name}.`,
  });

  return (
    <div className="shell-container page-shell space-y-12 sm:space-y-14 lg:space-y-16">
      <section className="theme-panel grid gap-8 rounded-[36px] border border-[var(--color-border)] p-6 shadow-[0_24px_60px_rgba(20,26,41,0.08)] sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div className="space-y-5">
          <SectionHeading
            eyebrow={locality.city}
            title={locality.name}
            description={locality.shortDescription}
          />
          <a
            href={localityWhatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-primary inline-flex items-center justify-center px-6 py-4 text-sm font-semibold transition duration-300"
          >
            WhatsApp for {locality.name}
          </a>
        </div>
        <div
          className="premium-card h-[320px] rounded-[32px]"
          style={getMediaSurfaceStyle(locality.image, createLocalityPlaceholder(locality))}
        />
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="premium-card rounded-[28px] p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-text-soft)]">Average price</p>
          <p className="mt-3 text-2xl font-semibold text-[var(--color-text)]">{locality.avgPriceLabel}</p>
        </div>
        <div className="premium-card rounded-[28px] p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-text-soft)]">Ideal for</p>
          <p className="mt-3 text-lg font-semibold text-[var(--color-text)]">{locality.idealFor}</p>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <article className="premium-card rounded-[30px] p-6 sm:p-8">
          <h2 className="section-title text-3xl font-semibold text-[var(--color-text)]">Why this locality</h2>
          <p className="mt-6 text-sm leading-8 text-[var(--color-text-soft)] sm:text-base">
            {locality.shortDescription}
          </p>
        </article>

        <article className="premium-card rounded-[30px] p-6 sm:p-8">
          <h2 className="section-title text-3xl font-semibold text-[var(--color-text)]">Highlights</h2>
          <div className="mt-6 grid gap-4">
            {locality.highlights.map((highlight) => (
              <div key={highlight} className="rounded-[22px] bg-[var(--color-surface-muted)] p-4 text-sm leading-7 text-[var(--color-text-soft)]">
                {highlight}
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Featured properties"
          title={`Listings currently matched to ${locality.name}.`}
          description="Browse available options, then move directly into WhatsApp for a faster shortlist."
        />
        <PropertyGrid properties={featuredProperties} />
      </section>
    </div>
  );
}
