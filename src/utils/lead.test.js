import { buildLeadPayload, computeLeadScore, generateWhatsAppMessage } from "./lead";

describe("computeLeadScore", () => {
  it("marks a lead HOT when budget is present and timeline is immediate", () => {
    expect(
      computeLeadScore({
        budget: "Rs 5 Cr - Rs 7 Cr",
        timeline: "Immediate",
        locality: "Golf Course Road",
        propertyType: "Apartment",
      }),
    ).toBe("HOT");
  });

  it("marks a lead WARM when partial info exists and timeline is within 90 days", () => {
    expect(
      computeLeadScore({
        budget: "",
        timeline: "Within 90 days",
        locality: "DLF Phase 5",
        propertyType: "",
      }),
    ).toBe("WARM");
  });

  it("marks a lead COLD when no budget is present", () => {
    expect(
      computeLeadScore({
        budget: "",
        timeline: "",
        locality: "",
        propertyType: "",
      }),
    ).toBe("COLD");
  });
});

describe("buildLeadPayload", () => {
  it("builds a structured buy lead payload", () => {
    const payload = buildLeadPayload({
      formData: {
        intent: "buy",
        preferredLocality: "Golf Course Extension Road",
        propertyType: "Apartment",
        budgetRange: "Rs 3 Cr - Rs 5 Cr",
        timeline: "Within 30 days",
        name: "Ritika Sethi",
        phone: "+91 98765 43210",
        notes: "Needs a quick site visit.",
      },
      metadata: {
        sourcePage: "Contact Page",
        city: "Gurugram",
        businessName: "Urban Crest Realty",
        prefilledPropertyTitle: "",
      },
    });

    expect(payload.intent).toBe("buy");
    expect(payload.status).toBe("New");
    expect(payload.score).toBe("HOT");
    expect(payload.locality).toBe("Golf Course Extension Road");
    expect(payload.requirement).toBe("Apartment in Golf Course Extension Road");
    expect(payload.businessName).toBe("Urban Crest Realty");
  });

  it("keeps seller timeline in the normalized timeline field", () => {
    const payload = buildLeadPayload({
      formData: {
        intent: "sell",
        sellLocality: "DLF Phase 1",
        propertyType: "Builder Floor",
        expectedPrice: "Rs 4 Cr+",
        timelineToSell: "Within 60 days",
        name: "Amit Khanna",
        phone: "+91 91234 56789",
        notes: "",
      },
      metadata: {
        sourcePage: "Sell Property Page",
        city: "Gurugram",
        businessName: "Urban Crest Realty",
        prefilledPropertyTitle: "",
      },
    });

    expect(payload.intent).toBe("sell");
    expect(payload.budget).toBe("Rs 4 Cr+");
    expect(payload.timeline).toBe("Within 60 days");
    expect(payload.timelineToSell).toBe("Within 60 days");
    expect(payload.score).toBe("WARM");
  });
});

describe("generateWhatsAppMessage", () => {
  it("includes the core qualification fields in the message", () => {
    const message = generateWhatsAppMessage({
      inquiryType: "Buy Inquiry",
      businessName: "Urban Crest Realty",
      name: "Ritika Sethi",
      phone: "+91 98765 43210",
      requirement: "Apartment in Golf Course Road",
      locality: "Golf Course Road",
      budget: "Rs 7 Cr+",
      propertyType: "Apartment",
      timeline: "Within 30 days",
      score: "HOT",
      status: "New",
      sourcePage: "Homepage Hero",
    });

    expect(message).toContain("Buy Inquiry");
    expect(message).toContain("Budget: Rs 7 Cr+");
    expect(message).toContain("Property Type: Apartment");
    expect(message).toContain("Timeline: Within 30 days");
    expect(message).toContain("Lead Score: HOT");
  });
});
