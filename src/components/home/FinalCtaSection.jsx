import { Link } from "react-router-dom";
import { siteConfig } from "../../config/siteConfig";
import { buildConsultationWhatsAppUrl } from "../../utils/contact";

export function FinalCtaSection() {
  const whatsappUrl = buildConsultationWhatsAppUrl({
    whatsappNumber: siteConfig.whatsappNumber,
    businessName: siteConfig.businessName,
    city: siteConfig.city,
    sourcePage: "Homepage Final CTA",
    notes: "I want to book a consultation for premium property options.",
  });

  return (
    <section className="shell-container site-section pb-28 md:pb-16">
      <div className="rounded-[36px] bg-[linear-gradient(135deg,#1d2433,#283041)] px-6 py-8 text-white shadow-[0_28px_70px_rgba(20,26,41,0.18)] sm:px-8 md:px-12 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f1d4ac]">Final call to action</p>
            <h2 className="section-title text-3xl font-semibold leading-tight sm:text-4xl">
              Book a premium consultation and move faster with more clarity.
            </h2>
            <p className="max-w-2xl text-sm leading-8 text-[rgba(255,255,255,0.76)] sm:text-base">
              Push high-intent visitors toward WhatsApp first, then offer a browsing route for those still comparing options.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-semibold text-[var(--color-text)] transition duration-300 hover:-translate-y-0.5 sm:w-auto"
            >
              {siteConfig.ctaLabels.whatsapp}
            </a>
            <Link
              to="/buy"
              className="inline-flex w-full items-center justify-center rounded-full border border-[rgba(255,255,255,0.18)] px-6 py-4 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[rgba(255,255,255,0.08)] sm:w-auto"
            >
              {siteConfig.ctaLabels.listings}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
