import { Link } from "react-router-dom";
import { LocalityCard } from "../LocalityCard";
import { SectionHeading } from "../SectionHeading";

export function FeaturedLocalitiesSection({ localities }) {
  return (
    <section className="shell-container site-section space-y-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Featured localities"
          title="Locality-led discovery that feels informed, polished, and investment-aware."
          description="Use these market pages to build authority, improve discoverability, and guide users toward the right micro-market."
        />
        <Link
          to="/localities"
          className="inline-flex h-fit items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--color-text)] shadow-[0_16px_30px_rgba(20,26,41,0.06)] transition duration-300 hover:-translate-y-0.5"
        >
          View all localities
        </Link>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {localities.map((locality) => (
          <LocalityCard key={locality.id} locality={locality} />
        ))}
      </div>
    </section>
  );
}
