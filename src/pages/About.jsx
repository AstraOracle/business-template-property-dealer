import { AboutCtaSection } from "../components/about/AboutCtaSection";
import { AboutServicesSection } from "../components/about/AboutServicesSection";
import { AboutStorySection } from "../components/about/AboutStorySection";
import { AboutTrustSection } from "../components/about/AboutTrustSection";
import { testimonials } from "../data/testimonials";
import { siteConfig } from "../config/siteConfig";

export function AboutPage() {
  return (
    <div className="shell-container page-shell space-y-12 sm:space-y-14 lg:space-y-16">
      <AboutStorySection />
      <AboutTrustSection />
      <AboutServicesSection />
      <section className="space-y-8">
        <div className="max-w-3xl space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-accent-deep)]">Client trust</p>
          <h2 className="section-title text-3xl font-semibold text-[var(--color-text)] sm:text-4xl">
            What clients value when the process feels thoughtful, local, and well guided.
          </h2>
          <p className="text-sm leading-8 text-[var(--color-text-soft)] sm:text-base">
            The strongest feedback tends to be consistent: clearer communication, cleaner shortlists, and a pace that makes major decisions feel more manageable.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article key={testimonial.id} className="premium-card rounded-[30px] p-6 transition duration-300 hover:-translate-y-1">
              <p className="text-sm leading-8 text-[var(--color-text-soft)]">"{testimonial.quote}"</p>
              <p className="mt-5 font-semibold text-[var(--color-text)]">{testimonial.name}</p>
              <p className="text-sm text-[var(--color-text-soft)]">
                {testimonial.role} - {testimonial.location}
              </p>
            </article>
          ))}
        </div>
      </section>
      <section className="grid gap-6 rounded-[36px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[0_20px_55px_rgba(20,26,41,0.06)] sm:p-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-accent-deep)]">Local expert positioning</p>
          <h2 className="section-title text-3xl font-semibold text-[var(--color-text)] sm:text-4xl">
            Built to represent premium residential decisions with more care and less noise.
          </h2>
        </div>
        <p className="text-sm leading-8 text-[var(--color-text-soft)] sm:text-base">
          From flagship homes in {siteConfig.city} to investor-focused opportunities across {siteConfig.serviceCoverage.join(", ")}, the goal is to keep each recommendation grounded in fit, timing, and market reality. That is what helps the brand feel like an advisor, not just a listing source.
        </p>
      </section>
      <AboutCtaSection />
    </div>
  );
}
