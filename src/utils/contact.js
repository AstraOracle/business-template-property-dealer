function normalizePhoneNumber(number) {
  return String(number ?? "").replace(/[^\d]/g, "");
}

function formatMessageLines(lines) {
  return lines.filter(Boolean).join("\n");
}

export function buildConsultationWhatsAppUrl({
  whatsappNumber,
  businessName,
  city,
  sourcePage,
  notes,
}) {
  return generateWhatsAppLink(
    whatsappNumber,
    generateLeadFormMessage({
      businessName,
      sourcePage,
      inquiryType: "General Consultation",
      locality: city,
      notes,
    }),
  );
}

export function generateWhatsAppLink(number, text = "Hello, I would like to connect.") {
  const cleanedNumber = normalizePhoneNumber(number);
  const encodedText = encodeURIComponent(text);

  return `https://wa.me/${cleanedNumber}?text=${encodedText}`;
}

export function generatePropertyInquiryMessage({
  businessName,
  sourcePage,
  propertyName = "",
  locality = "",
  budget = "",
  name = "",
  phone = "",
  notes = "",
}) {
  return formatMessageLines([
    `Inquiry Type: Property Inquiry`,
    `Business: ${businessName}`,
    propertyName ? `Property: ${propertyName}` : "",
    locality ? `Locality: ${locality}` : "",
    budget ? `Budget: ${budget}` : "",
    name ? `Name: ${name}` : "",
    phone ? `Phone: ${phone}` : "",
    notes ? `Notes: ${notes}` : "",
    sourcePage ? `Source Page: ${sourcePage}` : "",
  ]);
}

export function generateLeadFormMessage({
  businessName,
  sourcePage,
  inquiryType,
  propertyName = "",
  locality = "",
  budget = "",
  propertyType = "",
  expectedPrice = "",
  timelineToSell = "",
  name = "",
  phone = "",
  notes = "",
}) {
  return formatMessageLines([
    `Inquiry Type: ${inquiryType || "Lead Form"}`,
    `Business: ${businessName}`,
    propertyName ? `Property: ${propertyName}` : "",
    locality ? `Locality: ${locality}` : "",
    budget ? `Budget: ${budget}` : "",
    propertyType ? `Property Type: ${propertyType}` : "",
    expectedPrice ? `Expected Price: ${expectedPrice}` : "",
    timelineToSell ? `Timeline: ${timelineToSell}` : "",
    name ? `Name: ${name}` : "",
    phone ? `Phone: ${phone}` : "",
    notes ? `Notes: ${notes}` : "",
    sourcePage ? `Source Page: ${sourcePage}` : "",
  ]);
}

export function generateSiteVisitMessage({
  businessName,
  sourcePage,
  propertyName = "",
  locality = "",
  budget = "",
  name = "",
  phone = "",
  notes = "",
}) {
  return formatMessageLines([
    `Inquiry Type: Site Visit Request`,
    `Business: ${businessName}`,
    propertyName ? `Property: ${propertyName}` : "",
    locality ? `Locality: ${locality}` : "",
    budget ? `Budget: ${budget}` : "",
    name ? `Name: ${name}` : "",
    phone ? `Phone: ${phone}` : "",
    notes ? `Notes: ${notes}` : "",
    sourcePage ? `Source Page: ${sourcePage}` : "",
  ]);
}
