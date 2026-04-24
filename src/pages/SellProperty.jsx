import { siteConfig } from "../config/siteConfig";
import { SellerLeadForm } from "../components/sell-property/SellerLeadForm";
import { buildConsultationWhatsAppUrl } from "../utils/contact";

const sellerBenefits = [
  {
    title: "Faster access to serious buyers",
    description: "We focus on qualified conversations, reducing noise and wasted site visits.",
  },
  {
    title: "Premium positioning for your property",
    description: "Stronger listing presentation, cleaner narrative, and sharper pricing communication.",
  },
  {
    title: "Locality-specific pricing guidance",
    description: "Advice grounded in micro-market understanding rather than generic listing benchmarks.",
  },
];

export function SellPropertyPage() {
  const sellerWhatsappUrl = buildConsultationWhatsAppUrl({
    whatsappNumber: siteConfig.whatsappNumber,
    businessName: siteConfig.businessName,
    city: siteConfig.city,
    sourcePage: "Sell Property Page",
    notes: "I want expert guidance to sell my property faster with verified buyer outreach.",
  });

  return (
    <div className="shell-container page-shell space-y-12 sm:space-y-14 lg:space-y-16">
      <section className="theme-panel grid gap-8 rounded-[36px] border border-[var(--color-border)] p-6 shadow-[0_24px_60px_rgba(20,26,41,0.08)] sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <div className="space-y-6">
          <span className="inline-flex rounded-full bg-[var(--color-accent-soft)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-accent-deep)]">
            Seller services
          </span>
          <div className="space-y-4">
            <h1 className="section-title text-4xl font-semibold leading-tight text-[var(--color-text)] sm:text-5xl">
              Sell with stronger positioning, verified buyer focus, and local expertise.
            </h1>
            <p className="max-w-2xl text-sm leading-8 text-[var(--color-text-soft)] sm:text-base">
              Work with a seller-focused team that sharpens presentation, qualifies demand, and keeps the process moving with better buyer conversations.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={sellerWhatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary inline-flex items-center justify-center px-6 py-4 text-sm font-semibold transition duration-300"
            >
              WhatsApp seller desk
            </a>
            <a
              href="#seller-form"
              className="btn-secondary inline-flex items-center justify-center px-6 py-4 text-sm font-semibold shadow-[0_16px_30px_rgba(20,26,41,0.06)] transition duration-300 hover:-translate-y-0.5"
            >
              Share property details
            </a>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          <div className="premium-card rounded-[28px] p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-soft)]">Primary goal</p>
            <p className="mt-3 text-lg font-semibold text-[var(--color-text)]">Faster seller conversion</p>
          </div>
          <div className="premium-card rounded-[28px] p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-soft)]">Positioning</p>
            <p className="mt-3 text-lg font-semibold text-[var(--color-text)]">Verified buyers + local expertise</p>
          </div>
          <div className="premium-card rounded-[28px] p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-soft)]">City focus</p>
            <p className="mt-3 text-lg font-semibold text-[var(--color-text)]">{siteConfig.city}</p>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="max-w-3xl space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-deep)]">Benefits</p>
          <h2 className="section-title text-3xl font-semibold text-[var(--color-text)] sm:text-4xl">Why owners convert here.</h2>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          {sellerBenefits.map((benefit) => (
            <article key={benefit.title} className="premium-card rounded-[30px] p-6">
              <h3 className="text-xl font-semibold text-[var(--color-text)]">{benefit.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">{benefit.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="seller-form" className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
        <div className="premium-card rounded-[30px] p-6 sm:p-8">
          <h2 className="section-title text-3xl font-semibold text-[var(--color-text)]">Seller lead form</h2>
          <p className="mt-4 text-sm leading-8 text-[var(--color-text-soft)]">
            Share the property details and your ideal timeline to sell. We will use that to plan pricing guidance, buyer targeting, and the right next step for your listing.
          </p>
          <a
            href={sellerWhatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary mt-6 inline-flex px-5 py-3 text-sm font-semibold transition duration-300"
          >
            Start on WhatsApp instead
          </a>
        </div>
        <SellerLeadForm
          sourcePage="Sell Property Page"
          city={siteConfig.city}
          businessName={siteConfig.businessName}
          whatsappNumber={siteConfig.whatsappNumber}
        />
      </section>
    </div>
  );
}
