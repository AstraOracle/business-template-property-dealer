import { Link } from "react-router-dom";
import { navigationLinks } from "../config/navigation";
import { siteConfig } from "../config/siteConfig";
import { buildConsultationWhatsAppUrl } from "../utils/contact";

export function Footer() {
  const footerWhatsappUrl = buildConsultationWhatsAppUrl({
    whatsappNumber: siteConfig.whatsappNumber,
    businessName: siteConfig.businessName,
    city: siteConfig.city,
    sourcePage: "Footer",
    notes: "I would like to connect regarding premium property options.",
  });

  return (
    <footer className="mt-20 border-t border-[var(--color-border)] bg-[rgba(255,253,249,0.88)]">
      <div className="shell-container grid gap-8 py-10 md:grid-cols-[1.2fr_0.9fr_1fr]">
        <div className="space-y-5">
          <h3 className="section-title text-2xl font-semibold text-[var(--color-text)]">
            {siteConfig.businessName}
          </h3>
          <p className="max-w-md text-sm leading-7 text-[var(--color-text-soft)]">
            Premium real estate advisory for {siteConfig.city}, built around qualified conversations, better presentation, and sharper property decisions.
          </p>
          <div className="premium-card rounded-[24px] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-deep)]">Conversion focus</p>
            <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">{siteConfig.trustMicrocopy}</p>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-text)]">Navigate</h4>
          <div className="grid gap-3 text-sm text-[var(--color-text-soft)]">
            {navigationLinks.map((link) => (
              <Link key={link.to} to={link.to} className="hover:text-[var(--color-text)]">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-text)]">Contact</h4>
          <div className="grid gap-3 text-sm text-[var(--color-text-soft)]">
            <p className="break-words">{siteConfig.address}</p>
            <a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a>
            <a href={`mailto:${siteConfig.email}`} className="break-all">{siteConfig.email}</a>
            <a href={footerWhatsappUrl} target="_blank" rel="noreferrer">
              {siteConfig.ctaLabels.whatsapp}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
