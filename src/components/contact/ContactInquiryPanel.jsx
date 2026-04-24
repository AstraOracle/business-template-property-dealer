import { siteConfig } from "../../config/siteConfig";

export function ContactInquiryPanel({ hasLead }) {
  return (
    <div className="space-y-4">
      <div className="premium-card rounded-[28px] p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-deep)]">Simple inquiry block</p>
        <h3 className="mt-4 text-2xl font-semibold text-[var(--color-text)]">
          Share the requirement once. We will take it forward with context.
        </h3>
        <p className="mt-3 text-sm leading-8 text-[var(--color-text-soft)]">
          {siteConfig.inquiryPrompt}
        </p>
      </div>

      <div className="premium-card rounded-[24px] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-deep)]">
          {hasLead ? "Lead routing active" : "How this helps"}
        </p>
        <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">
          {hasLead
            ? "Your enquiry has been captured and is ready for a fast WhatsApp follow-up from the advisory team."
            : "Use the form for a structured requirement, or start with direct WhatsApp contact if the requirement is urgent and you want a faster first response."}
        </p>
      </div>
    </div>
  );
}
