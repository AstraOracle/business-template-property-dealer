import { Link } from "react-router-dom";
import { siteConfig } from "../../config/siteConfig";
import { buildConsultationWhatsAppUrl } from "../../utils/contact";
import { createHeroPlaceholder, getMediaSurfaceStyle } from "../../utils/media";

const premiumHighlights = [
  "Verified premium listings",
  "Private consultations",
  "WhatsApp-first response",
];

export function HeroSection() {
  const whatsappUrl = buildConsultationWhatsAppUrl({
    whatsappNumber: siteConfig.whatsappNumber,
    businessName: siteConfig.businessName,
    city: siteConfig.city,
    sourcePage: "Homepage Hero",
    notes: "I want to explore premium property options and would like a guided consultation.",
  });
  const heroVisual = siteConfig.heroImageUrl || createHeroPlaceholder({
    businessName: siteConfig.businessName,
    city: siteConfig.city,
  });

  return (
    <section className="shell-container pt-8 pb-6 sm:pt-12 sm:pb-8 lg:pb-10">
      <div className="theme-panel relative overflow-hidden rounded-[36px] border border-[var(--color-border)] px-6 py-8 shadow-[0_32px_80px_rgba(28,35,50,0.10)] sm:px-8 md:px-12 md:py-14">
        <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-[radial-gradient(circle_at_top,rgba(183,121,43,0.14),transparent_56%)] lg:block" />
        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-center xl:gap-12 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0 space-y-8">
            <div className="space-y-5">
              <span className="inline-flex rounded-full bg-[var(--color-accent-soft)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-accent-deep)]">
                Premium property advisory in {siteConfig.city}
              </span>
              <h1 className="section-title max-w-[10.5ch] text-4xl leading-[0.98] font-semibold text-[var(--color-text)] sm:max-w-[11ch] sm:text-5xl md:text-6xl lg:max-w-[9.5ch] xl:max-w-[11ch]">
                {siteConfig.heroHeadline}
              </h1>
              <p className="max-w-2xl text-base leading-8 text-[var(--color-text-soft)] sm:text-lg">
                {siteConfig.heroSubheadline}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary inline-flex w-full items-center justify-center px-6 py-4 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 sm:w-auto"
              >
                {siteConfig.primaryCTA}
              </a>
              <Link
                to="/buy"
                className="btn-secondary inline-flex w-full items-center justify-center px-6 py-4 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 sm:w-auto"
              >
                {siteConfig.secondaryCTA}
              </Link>
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-[var(--color-text-soft)]">
              {premiumHighlights.map((item) => (
                <span key={item} className="theme-chip rounded-full bg-white/80 px-4 py-2 shadow-[0_10px_24px_rgba(20,26,41,0.05)]">
                  {item}
                </span>
              ))}
            </div>

            <p className="text-sm leading-7 text-[var(--color-text-soft)]">{siteConfig.trustMicrocopy}</p>
          </div>

          <div className="lg:hidden">
            <div
              className="premium-card h-[240px] overflow-hidden rounded-[28px] border border-[var(--color-border)] sm:h-[300px]"
              style={getMediaSurfaceStyle(
                heroVisual,
                createHeroPlaceholder({
                  businessName: siteConfig.businessName,
                  city: siteConfig.city,
                }),
              )}
            />
          </div>

          <div className="hidden lg:block">
            <div
              className="premium-card h-[380px] overflow-hidden rounded-[32px] border border-[var(--color-border)] xl:h-[420px]"
              style={getMediaSurfaceStyle(heroVisual, createHeroPlaceholder({
                businessName: siteConfig.businessName,
                city: siteConfig.city,
              }))}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
