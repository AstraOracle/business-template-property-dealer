import { siteConfig } from "../../config/siteConfig";

export function FounderTrustSection() {
  return (
    <section className="shell-container">
      <div className="grid gap-6 rounded-[36px] border border-[var(--color-border)] bg-[rgba(255,253,249,0.94)] p-6 shadow-[0_24px_60px_rgba(20,26,41,0.08)] sm:p-8 lg:grid-cols-[0.75fr_1.25fr] lg:p-10">
        <div className="rounded-[30px] bg-[linear-gradient(135deg,rgba(233,220,200,1),rgba(246,238,229,1))] p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-accent-deep)]">Advisor spotlight</p>
          <h2 className="section-title mt-5 text-3xl font-semibold text-[var(--color-text)]">{siteConfig.founderName}</h2>
          <p className="mt-2 text-sm text-[var(--color-text-soft)]">{siteConfig.founderTitle}</p>
        </div>
        <div className="grid gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-accent-deep)]">Founder trust section</p>
            <h3 className="section-title mt-4 text-3xl font-semibold text-[var(--color-text)] sm:text-4xl">
              Built for clients who want thoughtful guidance, not pressure.
            </h3>
          </div>
          <p className="max-w-3xl text-sm leading-8 text-[var(--color-text-soft)] sm:text-base">
            Position the founder or agency lead as the reassuring face behind the brand. This section is especially useful for high-ticket real estate, where trust is often won before the first call is booked.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-[24px] bg-[var(--color-surface-muted)] p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-text-soft)]">Approach</p>
              <p className="mt-3 font-semibold text-[var(--color-text)]">Calm, consultative, discreet</p>
            </div>
            <div className="rounded-[24px] bg-[var(--color-surface-muted)] p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-text-soft)]">Focus</p>
              <p className="mt-3 font-semibold text-[var(--color-text)]">Premium homes, rentals, seller strategy</p>
            </div>
            <div className="rounded-[24px] bg-[var(--color-surface-muted)] p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-text-soft)]">City</p>
              <p className="mt-3 font-semibold text-[var(--color-text)]">{siteConfig.city}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
