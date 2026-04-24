import { siteConfig } from "../../config/siteConfig";

export function AboutServicesSection() {
  return (
    <section className="site-section grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="premium-card rounded-[30px] p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-accent-deep)]">Why clients choose us</p>
        <div className="mt-5 grid gap-4">
          {siteConfig.whyChooseUs.map((reason, index) => (
            <div key={reason} className="rounded-[22px] bg-[var(--color-surface-muted)] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-deep)]">
                0{index + 1}
              </p>
              <p className="mt-2 text-sm leading-7 text-[var(--color-text-soft)]">{reason}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="premium-card rounded-[30px] p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-accent-deep)]">Service coverage</p>
        <p className="mt-4 text-sm leading-8 text-[var(--color-text-soft)]">
          {siteConfig.serviceCoverageIntro}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {siteConfig.serviceCoverage.map((city) => (
            <span key={city} className="rounded-full bg-[var(--color-surface-muted)] px-4 py-3 text-sm font-semibold text-[var(--color-text)]">
              {city}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
