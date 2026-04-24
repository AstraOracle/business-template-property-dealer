import { Link } from "react-router-dom";
import { PropertyCard } from "../PropertyCard";
import { SectionHeading } from "../SectionHeading";

export function FeaturedPropertiesSection({ properties }) {
  return (
    <section className="shell-container site-section space-y-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Featured properties"
          title="Curated premium inventory presented with more calm, clarity, and trust."
          description="A tighter shortlist helps high-intent buyers focus faster. These cards are designed to feel like serious opportunities, not crowded listing tiles."
        />
        <Link
          to="/buy"
          className="inline-flex h-fit items-center justify-center rounded-full border border-[var(--color-border)] bg-white px-5 py-3 text-sm font-semibold text-[var(--color-text)] shadow-[0_16px_30px_rgba(20,26,41,0.04)] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-surface-muted)]"
        >
          Browse all buy listings
        </Link>
      </div>
      <div className="grid gap-8 xl:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  );
}
