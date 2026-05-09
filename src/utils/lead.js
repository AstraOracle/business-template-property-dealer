import { buildDealerLeadAlertLink, generateWhatsAppLink } from "./contact";

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

function buildTimelineValue({ intent, timeline, timelineToSell }) {
  if (intent === "sell") {
    return normalizeText(timelineToSell || timeline);
  }

  return normalizeText(timeline);
}

function isHotTimeline(timeline) {
  const normalized = normalizeText(timeline).toLowerCase();
  return normalized === "immediate" || normalized === "within 30 days" || normalized === "within 1 month";
}

function isWarmTimeline(timeline) {
  const normalized = normalizeText(timeline).toLowerCase();
  return normalized === "within 60 days" || normalized === "within 90 days" || normalized === "within 1-3 months" || normalized === "within 3 months";
}

export function computeLeadScore({ budget, timeline, locality, propertyType }) {
  const hasBudget = Boolean(normalizeText(budget));
  const hasLocality = Boolean(normalizeText(locality));
  const hasPropertyType = Boolean(normalizeText(propertyType));

  if (hasBudget && isHotTimeline(timeline)) {
    return "HOT";
  }

  if ((hasBudget || hasLocality || hasPropertyType) && isWarmTimeline(timeline)) {
    return "WARM";
  }

  if (!hasBudget) {
    return "COLD";
  }

  if (hasBudget && (hasLocality || hasPropertyType)) {
    return "WARM";
  }

  return "COLD";
}

export function buildLeadPayload({
  formData,
  metadata,
}) {
  const createdAt = new Date().toISOString();
  const leadType = normalizeText(formData.intent || metadata.leadType).toLowerCase();
  const isSell = leadType === "sell";
  const locality = normalizeText(isSell ? formData.sellLocality : formData.preferredLocality);
  const propertyType = normalizeText(formData.propertyType);
  const propertyTitle = normalizeText(metadata.prefilledPropertyTitle);
  const budget = buildBudgetValue({
    intent: leadType,
    budgetRange: formData.budgetRange,
    expectedPrice: formData.expectedPrice,
  });
  const timeline = buildTimelineValue({
    intent: leadType,
    timeline: formData.timeline,
    timelineToSell: formData.timelineToSell,
  });
  const score = computeLeadScore({ budget, timeline, locality, propertyType, propertyTitle, intent: leadType });

  return {
    timestamp: createdAt,
    createdAt,
    lastUpdatedAt: createdAt,
    status: "New",
    score,
    intent: leadType,
    sourcePage: normalizeText(metadata.sourcePage),
    leadType,
    inquiryType: `${toTitleCase(leadType)} Inquiry`,
    propertyTitle,
    locality,
    city: normalizeText(metadata.city),
    budget,
    propertyType,
    timeline,
    expectedPrice: normalizeText(formData.expectedPrice),
    timelineToSell: isSell ? timeline : "",
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
    payload.timeline ? `Timeline: ${payload.timeline}` : payload.timelineToSell ? `Timeline: ${payload.timelineToSell}` : "",
    payload.score ? `Lead Score: ${payload.score}` : "",
    payload.status ? `Status: ${payload.status}` : "",
    payload.notes ? `Notes: ${payload.notes}` : "",
    payload.sourcePage ? `Source Page: ${payload.sourcePage}` : "",
    payload.createdAt ? `Created At: ${payload.createdAt}` : payload.timestamp ? `Timestamp: ${payload.timestamp}` : "",
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

export function buildDealerAlertWhatsAppUrl(whatsappNumber, payload) {
  return buildDealerLeadAlertLink({
    whatsappNumber,
    lead: payload,
  });
}
