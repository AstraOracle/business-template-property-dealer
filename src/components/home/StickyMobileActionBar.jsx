import { Link } from "react-router-dom";
import { siteConfig } from "../../config/siteConfig";
import { buildConsultationWhatsAppUrl } from "../../utils/contact";

export function StickyMobileActionBar() {
  const whatsappUrl = buildConsultationWhatsAppUrl({
    whatsappNumber: siteConfig.whatsappNumber,
    businessName: siteConfig.businessName,
    city: siteConfig.city,
    sourcePage: "Sticky Mobile Action Bar",
    notes: "I would like to enquire about premium property options.",
  });

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--color-border)] bg-[rgba(255,253,249,0.96)] px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl md:hidden">
      <div className="grid grid-cols-3 gap-2">
        <a
          href={`tel:${siteConfig.phone}`}
          className="btn-secondary inline-flex min-h-12 items-center justify-center px-3 py-3 text-sm font-semibold shadow-[0_14px_28px_rgba(20,26,41,0.08)]"
        >
          Call
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-primary inline-flex min-h-12 items-center justify-center px-3 py-3 text-sm font-semibold shadow-[0_14px_28px_rgba(20,26,41,0.12)]"
        >
          WhatsApp
        </a>
        <Link
          to="/contact"
          className="btn-soft inline-flex min-h-12 items-center justify-center px-3 py-3 text-sm font-semibold shadow-[0_14px_28px_rgba(20,26,41,0.14)]"
        >
          {siteConfig.ctaLabels.inquiry}
        </Link>
      </div>
    </div>
  );
}
