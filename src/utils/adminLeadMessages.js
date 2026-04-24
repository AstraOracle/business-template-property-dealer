import { siteConfig } from "../config/siteConfig";
import { generateLeadFormMessage, generateSiteVisitMessage, generateWhatsAppLink } from "./contact";

function formatLeadTypeLabel(value) {
  const normalized = String(value ?? "").toLowerCase();

  if (normalized === "buy") {
    return "Buy Requirement";
  }

  if (normalized === "rent") {
    return "Rental Requirement";
  }

  if (normalized === "sell") {
    return "Seller Requirement";
  }

  return "Property Consultation";
}

export function generateLeadInboxWhatsAppLink(lead) {
  return generateWhatsAppLink(
    lead.phone,
    generateLeadFormMessage({
      businessName: siteConfig.businessName,
      sourcePage: `Lead Inbox - ${lead.sourcePage || "Admin"}`,
      inquiryType: formatLeadTypeLabel(lead.leadType),
      locality: lead.locality,
      budget: lead.budget,
      name: lead.name,
      phone: lead.phone,
      notes: "Hello, we reviewed your enquiry and are ready to assist with the next step.",
    }),
  );
}

export function generateSendOptionsWhatsAppLink(lead) {
  return generateWhatsAppLink(
    lead.phone,
    generateLeadFormMessage({
      businessName: siteConfig.businessName,
      sourcePage: `Lead Inbox - Send Options`,
      inquiryType: `${formatLeadTypeLabel(lead.leadType)} - Options`,
      locality: lead.locality,
      budget: lead.budget,
      name: lead.name,
      phone: lead.phone,
      notes:
        "We have shortlisted relevant options that match your requirement. Reply here and we will share the best-fit inventory first.",
    }),
  );
}

export function generateScheduleVisitWhatsAppLink(lead) {
  return generateWhatsAppLink(
    lead.phone,
    generateSiteVisitMessage({
      businessName: siteConfig.businessName,
      sourcePage: "Lead Inbox - Schedule Visit",
      locality: lead.locality,
      budget: lead.budget,
      name: lead.name,
      phone: lead.phone,
      notes:
        "We can coordinate a site visit at your preferred time. Share a suitable day and time window, and we will align the visit schedule.",
    }),
  );
}
