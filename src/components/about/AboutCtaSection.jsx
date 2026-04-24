import { Link } from "react-router-dom";
import { siteConfig } from "../../config/siteConfig";
import { generateLeadFormMessage, generateWhatsAppLink } from "../../utils/contact";

export function AboutCtaSection() {
  const whatsappUrl = generateWhatsAppLink(
    siteConfig.whatsappNumber,
    generateLeadFormMessage({
      businessName: siteConfig.businessName,
      sourcePage: "About Page",
      inquiryType: "General Consultation",
      locality: siteConfig.city,
      notes: "I would like to understand how your team can help with a premium property requirement.",
    }),
  );

  return (
    <section className="site-section rounded-[36px] bg-[linear-gradient(135deg,#1d2433,#283041)] px-6 py-8 text-white shadow-[0_28px_70px_rgba(20,26,41,0.18)] sm:px-8 md:px-12 md:py-12">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f1d4ac]">Final CTA</p>
          <h2 className="section-title text-3xl font-semibold leading-tight sm:text-4xl">
            Start the conversation with a team built for higher-trust property decisions.
          </h2>
          <p className="max-w-2xl text-sm leading-8 text-[rgba(255,255,255,0.76)] sm:text-base">
            Reach out on WhatsApp for a faster conversation, or continue into the contact page to share your requirement in more detail with {siteConfig.businessName}.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-semibold text-[var(--color-text)] transition duration-300 hover:-translate-y-0.5"
          >
            WhatsApp now
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-full border border-[rgba(255,255,255,0.18)] px-6 py-4 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[rgba(255,255,255,0.08)]"
          >
            Visit contact page
          </Link>
        </div>
      </div>
    </section>
  );
}
