import { LocalityCard } from "./LocalityCard";

export function LocalityGrid({ localities }) {
  if (!localities.length) {
    return (
      <div className="premium-card rounded-[28px] p-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-deep)]">
          No localities available
        </p>
        <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">
          More Gurgaon micro-markets will appear here as they are added to the site.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {localities.map((locality) => (
        <LocalityCard key={locality.id} locality={locality} />
      ))}
    </div>
  );
}
