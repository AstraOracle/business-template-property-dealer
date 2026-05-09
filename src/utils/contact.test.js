import {
  buildDealerLeadAlertLink,
  generateDealerLeadAlertMessage,
  generateWhatsAppLink,
} from "./contact";

describe("generateWhatsAppLink", () => {
  it("normalizes the phone number and url-encodes the message", () => {
    const url = generateWhatsAppLink("+91 98765 43210", "Hello there");

    expect(url).toBe("https://wa.me/919876543210?text=Hello%20there");
  });
});

describe("generateDealerLeadAlertMessage", () => {
  it("formats the dealer alert in a structured way", () => {
    const message = generateDealerLeadAlertMessage({
      intent: "buy",
      propertyType: "Apartment",
      locality: "Golf Course Road",
      budget: "Rs 5 Cr - Rs 7 Cr",
      timeline: "Within 30 days",
      name: "Ritika Sethi",
      phone: "+91 98765 43210",
    });

    expect(message).toContain("New Lead");
    expect(message).toContain("Intent: Buy");
    expect(message).toContain("Property Type: Apartment");
    expect(message).toContain("Location: Golf Course Road");
    expect(message).toContain("Phone: +91 98765 43210");
  });
});

describe("buildDealerLeadAlertLink", () => {
  it("builds a clickable dealer alert whatsapp link", () => {
    const url = buildDealerLeadAlertLink({
      whatsappNumber: "+91 98765 43210",
      lead: {
        intent: "rent",
        propertyType: "Apartment",
        locality: "DLF Phase 5",
        budget: "Rs 1.5 L / month",
        timeline: "Immediate",
        name: "Neha Arora",
        phone: "+91 91234 56789",
      },
    });

    expect(url).toContain("https://wa.me/919876543210?text=");
    expect(decodeURIComponent(url)).toContain("Intent: Rent");
    expect(decodeURIComponent(url)).toContain("Location: DLF Phase 5");
  });
});
