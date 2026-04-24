import { generateWhatsAppLink } from "./contact";

function normalizeText(value) {
  return String(value ?? "").trim();
}

function toTitleCase(value) {
  const normalizedValue = normalizeText(value);

  if (!normalizedValue) {
    return "";
  }

  return normalizedValue.charAt(0).toUpperCase() + normalizedValue.slice(1);
}

function buildRequirementSummary(payload) {
  if (payload.propertyTitle) {
    return payload.propertyTitle;
  }

  const parts = [payload.propertyType, payload.locality].filter(Boolean);
  return parts.join(" in ");
}

function buildBudgetValue({ intent, budgetRange, expectedPrice }) {
  if (intent === "sell") {
    return normalizeText(expectedPrice);
  }

  return normalizeText(budgetRange);
}

export function buildLeadPayload({
  formData,
  metadata,
}) {
  const timestamp = new Date().toISOString();
  const leadType = normalizeText(formData.intent || metadata.leadType);
  const isSell = leadType === "sell";
  const locality = normalizeText(isSell ? formData.sellLocality : formData.preferredLocality);
  const propertyType = normalizeText(formData.propertyType);
  const propertyTitle = normalizeText(metadata.prefilledPropertyTitle);
  const budget = buildBudgetValue({
    intent: leadType,
    budgetRange: formData.budgetRange,
    expectedPrice: formData.expectedPrice,
  });

  return {
    timestamp,
    sourcePage: normalizeText(metadata.sourcePage),
    leadType,
    inquiryType: `${toTitleCase(leadType)} Inquiry`,
    propertyTitle,
    locality,
    city: normalizeText(metadata.city),
    budget,
    propertyType,
    expectedPrice: normalizeText(formData.expectedPrice),
    timelineToSell: normalizeText(formData.timelineToSell),
    name: normalizeText(formData.name),
    phone: normalizeText(formData.phone),
    notes: normalizeText(formData.notes),
    businessName: normalizeText(metadata.businessName),
    requirement: buildRequirementSummary({
      propertyTitle,
      propertyType,
      locality,
    }),
  };
}

export function formatLeadPayload(args) {
  return buildLeadPayload({
    formData: args.formValues,
    metadata: {
      sourcePage: args.sourcePage,
      city: args.city,
      businessName: args.businessName,
      prefilledPropertyTitle: args.prefilledPropertyTitle,
    },
  });
}

export function generateWhatsAppMessage(payload) {
  const lines = [
    `${payload.inquiryType || "Lead Inquiry"}`,
    payload.businessName ? `Business: ${payload.businessName}` : "",
    payload.name ? `Name: ${payload.name}` : "",
    payload.phone ? `Phone: ${payload.phone}` : "",
    payload.requirement ? `Requirement: ${payload.requirement}` : "",
    payload.propertyTitle ? `Property: ${payload.propertyTitle}` : "",
    payload.locality ? `Locality: ${payload.locality}` : "",
    payload.city ? `City: ${payload.city}` : "",
    payload.budget ? `Budget: ${payload.budget}` : "",
    payload.propertyType ? `Property Type: ${payload.propertyType}` : "",
    payload.timelineToSell ? `Timeline: ${payload.timelineToSell}` : "",
    payload.notes ? `Notes: ${payload.notes}` : "",
    payload.sourcePage ? `Source Page: ${payload.sourcePage}` : "",
    payload.timestamp ? `Timestamp: ${payload.timestamp}` : "",
  ];

  return lines.filter(Boolean).join("\n");
}

export function generateLeadWhatsAppText(payload) {
  return generateWhatsAppMessage(payload);
}

export function openWhatsApp({ whatsappNumber, payload, target = "_blank" }) {
  const whatsappUrl = buildLeadWhatsAppUrl(whatsappNumber, payload);

  if (typeof window !== "undefined") {
    window.open(whatsappUrl, target, "noopener,noreferrer");
  }

  return whatsappUrl;
}

export function buildLeadWhatsAppUrl(whatsappNumber, payload) {
  return generateWhatsAppLink(whatsappNumber, generateWhatsAppMessage(payload));
}

export function prepareGoogleSheetsPayload(payload) {
  return payload;
}
