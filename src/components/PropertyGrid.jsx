import { PropertyCard } from "./PropertyCard";

export function PropertyGrid({ properties }) {
  if (!properties.length) {
    return (
      <div className="premium-card rounded-[30px] p-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-deep)]">
          No matches found
        </p>
        <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">
          Try adjusting the filters to explore a wider set of listings.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
