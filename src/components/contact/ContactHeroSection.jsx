import { siteConfig } from "../../config/siteConfig";
import { buildConsultationWhatsAppUrl } from "../../utils/contact";

export function ContactHeroSection() {
  const whatsappUrl = buildConsultationWhatsAppUrl({
    whatsappNumber: siteConfig.whatsappNumber,
    businessName: siteConfig.businessName,
    city: siteConfig.city,
    sourcePage: "Contact Hero",
    notes: "I want to discuss a premium property requirement.",
  });

  return (
    <section className="theme-panel site-section rounded-[36px] border border-[var(--color-border)] p-7 shadow-[0_24px_60px_rgba(20,26,41,0.08)] sm:p-9 lg:p-10">
      <div className="max-w-3xl space-y-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-accent-deep)]">Contact</p>
        <h1 className="section-title text-4xl font-semibold leading-tight text-[var(--color-text)] sm:text-5xl">
          Speak with a property team that values clarity before conversion.
        </h1>
        <p className="max-w-2xl text-sm leading-8 text-[var(--color-text-soft)] sm:text-base">
          {siteConfig.contactIntro}
        </p>
        <div className="flex flex-col gap-3.5 sm:flex-row">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-primary inline-flex w-full items-center justify-center px-6 py-4 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 sm:w-auto"
          >
            WhatsApp the advisory desk
          </a>
          <a
            href={`tel:${siteConfig.phone}`}
            className="btn-secondary inline-flex w-full items-center justify-center px-6 py-4 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 sm:w-auto"
          >
            Call {siteConfig.phone}
          </a>
        </div>
        <p className="pt-1 text-xs leading-6 tracking-[0.08em] text-[var(--color-text-soft)]">
          Fastest response on WhatsApp. Share your requirement once and our team will take the conversation forward with context.
        </p>
      </div>
    </section>
  );
}
