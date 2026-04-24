import { siteConfig } from "../../config/siteConfig";
import { buildConsultationWhatsAppUrl } from "../../utils/contact";

export function ContactInfoPanel() {
  const whatsappUrl = buildConsultationWhatsAppUrl({
    whatsappNumber: siteConfig.whatsappNumber,
    businessName: siteConfig.businessName,
    city: siteConfig.city,
    sourcePage: "Contact Page",
    notes: "I want to connect with your team for a premium property consultation.",
  });

  return (
    <div className="space-y-8 lg:space-y-10">
      <div className="premium-card rounded-[32px] p-7 sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-deep)]">Location map</p>
            <p className="mt-3 max-w-2xl text-sm leading-8 text-[var(--color-text-soft)]">
              Use the map to get a quick sense of the office area before calling or opening WhatsApp.
            </p>
          </div>
          <p className="text-sm font-semibold text-[var(--color-text)]">{siteConfig.city}</p>
        </div>
        {siteConfig.mapEmbedUrl ? (
          <div className="mt-6 overflow-hidden rounded-[26px] border border-[var(--color-border)]">
            <iframe
              title={`${siteConfig.businessName} map`}
              src={siteConfig.mapEmbedUrl}
              className="h-[320px] w-full sm:h-[380px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        ) : (
          <div className="mt-6 flex h-[320px] items-end rounded-[26px] bg-[linear-gradient(135deg,#ece5d8,#f7f2ea)] p-6 sm:h-[380px]">
            <p className="max-w-sm text-sm leading-7 text-[var(--color-text-soft)]">
              The live office map will appear here as soon as the location link finishes syncing.
            </p>
          </div>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:gap-6">
        <div className="premium-card rounded-[26px] p-6 transition duration-300 hover:-translate-y-0.5">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-soft)]">Phone</p>
          <p className="mt-3 break-all text-lg font-semibold text-[var(--color-text)]">{siteConfig.phone}</p>
          <a href={`tel:${siteConfig.phone}`} className="mt-4 inline-flex text-sm font-semibold text-[var(--color-accent-deep)]">
            Tap to call
          </a>
        </div>
        <div className="premium-card rounded-[26px] p-6 transition duration-300 hover:-translate-y-0.5">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-soft)]">WhatsApp</p>
          <p className="mt-3 break-all text-lg font-semibold text-[var(--color-text)]">{siteConfig.whatsappNumber}</p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex text-sm font-semibold text-[var(--color-accent-deep)]"
          >
            Start WhatsApp chat
          </a>
        </div>
        <div className="premium-card rounded-[26px] p-6 transition duration-300 hover:-translate-y-0.5">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-soft)]">Email</p>
          <p className="mt-3 break-all text-lg font-semibold text-[var(--color-text)]">{siteConfig.email}</p>
          <a href={`mailto:${siteConfig.email}`} className="mt-4 inline-flex text-sm font-semibold text-[var(--color-accent-deep)]">
            Send an email
          </a>
        </div>
        <div className="premium-card rounded-[26px] p-6 transition duration-300 hover:-translate-y-0.5">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-soft)]">Address</p>
          <p className="mt-3 break-words text-lg font-semibold text-[var(--color-text)]">{siteConfig.address}</p>
          <p className="mt-4 text-sm text-[var(--color-text-soft)]">By appointment for detailed consultations and office meetings.</p>
        </div>
      </div>

      <div className="premium-card rounded-[30px] p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-deep)]">Business hours</p>
        <div className="mt-4 grid gap-3 text-sm leading-7 text-[var(--color-text-soft)]">
          {siteConfig.businessHours.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </div>

      <div className="premium-card rounded-[30px] p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-deep)]">Quick actions</p>
        <p className="mt-4 text-sm leading-8 text-[var(--color-text-soft)]">
          For the fastest response, use WhatsApp first. For a more detailed requirement, complete the form alongside this panel.
        </p>
        <div className="mt-7 flex flex-col gap-3.5">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-primary inline-flex items-center justify-center px-5 py-3 text-sm font-semibold transition duration-300"
          >
            Start WhatsApp consultation
          </a>
          <a
            href={`tel:${siteConfig.phone}`}
            className="btn-soft inline-flex items-center justify-center px-5 py-3 text-sm font-semibold transition duration-300"
          >
            Call the team
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="btn-secondary inline-flex items-center justify-center px-5 py-3 text-sm font-semibold transition duration-300"
          >
            Email the advisory desk
          </a>
        </div>
      </div>
    </div>
  );
}
