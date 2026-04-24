import { siteConfig } from "../../config/siteConfig";

export function AboutTrustSection() {
  return (
    <section className="site-section space-y-8 rounded-[36px] border border-[var(--color-border)] bg-white/80 p-6 shadow-[0_18px_45px_rgba(20,26,41,0.06)] sm:p-8">
      <div className="max-w-3xl space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-accent-deep)]">Trust section</p>
        <h2 className="section-title text-3xl font-semibold text-[var(--color-text)] sm:text-4xl">
          Why serious clients stay with guidance that feels measured, local, and transparent.
        </h2>
        <p className="text-sm leading-8 text-[var(--color-text-soft)] sm:text-base">
          Trust in real estate is built through cleaner advice, better qualification, and a visible respect for the decision at hand. That standard shapes how {siteConfig.businessName} works across every enquiry.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {siteConfig.trustHighlights.map((point) => (
          <article key={point.title} className="premium-card rounded-[30px] p-6 transition duration-300 hover:-translate-y-1">
            <h3 className="text-xl font-semibold text-[var(--color-text)]">{point.title}</h3>
            <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">{point.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
