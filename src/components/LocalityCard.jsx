import { Link } from "react-router-dom";
import { createLocalityPlaceholder, getMediaSurfaceStyle } from "../utils/media";

export function LocalityCard({ locality }) {
  return (
    <article className="premium-card group overflow-hidden rounded-[30px] transition duration-500 hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(20,26,41,0.10)]">
      <div className="space-y-5 p-5 sm:p-6">
        <div className="overflow-hidden rounded-[24px]">
          <div className="h-52 transition duration-700 group-hover:scale-[1.04]" style={getMediaSurfaceStyle(locality.image, createLocalityPlaceholder(locality))} />
        </div>
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-deep)]">
              {locality.city}
            </p>
            {locality.featured ? (
              <span className="rounded-full bg-[var(--color-accent-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-accent-deep)]">
                Featured
              </span>
            ) : null}
          </div>
          <h3 className="section-title text-[1.75rem] font-semibold text-[var(--color-text)]">{locality.name}</h3>
        </div>
        <p className="text-sm leading-8 text-[var(--color-text-soft)]">{locality.shortDescription}</p>
        <div className="flex flex-wrap gap-2 text-xs font-medium text-[var(--color-text-soft)]">
          {locality.highlights.slice(0, 2).map((highlight) => (
            <span key={highlight} className="rounded-full bg-[var(--color-surface-muted)] px-3 py-2.5">
              {highlight}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-3 text-sm text-[var(--color-text)] sm:grid-cols-2">
          <div className="rounded-[22px] bg-[var(--color-surface-muted)] p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-soft)]">Avg. value</p>
            <p className="mt-2 font-semibold leading-6">{locality.avgPriceLabel}</p>
          </div>
          <div className="rounded-[22px] bg-[var(--color-surface-muted)] p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-soft)]">Ideal for</p>
            <p className="mt-2 font-semibold leading-6">{locality.idealFor}</p>
          </div>
        </div>
        <Link
          to={`/localities/${locality.slug}`}
          className="inline-flex items-center rounded-full bg-[var(--color-surface-muted)] px-4 py-3 text-sm font-semibold text-[var(--color-text)] transition duration-300 hover:bg-[rgba(183,121,43,0.12)]"
        >
          Explore locality
        </Link>
      </div>
    </article>
  );
}
