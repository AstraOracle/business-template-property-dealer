const appsScriptPattern = /script\.google\.com\/macros\/s\/.+\/exec/;

const mockSiteContent = {
  settings: {
    businessName: "Urban Crest Realty",
    phone: "+91 98765 43210",
    whatsappNumber: "+91 98765 43210",
    email: "hello@urbancrealty.in",
    address: "Golf Course Extension Road, Gurgaon",
    heroHeadline: "Premium property advisory for confident homebuyers, investors, and sellers.",
    heroSubheadline: "Work with a calm, well-informed property team for buying, renting, and selling across Gurgaon.",
    primaryCTA: "WhatsApp for Priority Access",
    secondaryCTA: "Explore Premium Listings",
    logoUrl: "https://example.com/logo.svg",
    heroImageUrl: "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1400&q=80",
    mapEmbedUrl: "https://www.google.com/maps?q=DLF%20Cyber%20Hub%20Gurgaon&output=embed",
    theme: {
      presetId: "modern-blue",
      primaryColorOverride: "",
    },
  },
  properties: [],
  localities: [],
  testimonials: [],
  faqs: [],
};

const mockAdminData = {
  settings: mockSiteContent.settings,
  properties: [
    {
      id: "prop-001",
      slug: "camellias-signature-residence",
      title: "Camellias Signature Residence",
      priceLabel: "Rs 17.5 Cr onwards",
      locality: "Golf Course Road",
      propertyType: "Apartment",
      purpose: "buy",
      bedrooms: 4,
      bathrooms: 5,
      area: 7350,
      featuredImage: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      galleryImages: [],
      featured: true,
      verified: true,
      ctaMessage: "Request a curated walkthrough and pricing brief.",
    },
  ],
  localities: [
    {
      id: "loc-001",
      slug: "golf-course-road",
      name: "Golf Course Road",
      shortDescription: "A premium Gurgaon corridor with strong luxury demand.",
      avgPriceLabel: "Rs 20,000 per sq.ft.",
      idealFor: "Luxury end users and investors",
      image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
    },
  ],
  testimonials: [
    {
      id: "testi-001",
      name: "Ritika Sethi",
      location: "Gurgaon",
      role: "Homebuyer",
      quote: "Very structured guidance from shortlist to site visit.",
      avatarImage: "",
    },
  ],
  faqs: [
    {
      id: "faq-001",
      question: "Do you help with site visits?",
      answer: "Yes, we coordinate qualified site visits.",
    },
  ],
};

const mockLeads = [
  {
    id: "lead-001",
    name: "Ritika Sethi",
    phone: "+91 98765 43210",
    intent: "buy",
    leadType: "buy",
    propertyType: "Apartment",
    locality: "Golf Course Road",
    budget: "Rs 7 Cr+",
    timeline: "Within 30 days",
    sourcePage: "Contact Page",
    timestamp: "2026-05-08T12:00:00.000Z",
    createdAt: "2026-05-08T12:00:00.000Z",
    lastUpdatedAt: "2026-05-08T12:00:00.000Z",
    status: "New",
    score: "HOT",
    notes: "Wants a premium 4BHK site visit.",
  },
];

export async function mockAppsScript(page) {
  await page.route(appsScriptPattern, async (route) => {
    const request = route.request();
    const url = new URL(request.url());
    const action = url.searchParams.get("action");

    if (request.method() === "GET") {
      if (action === "fetch-site-content") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ success: true, data: mockSiteContent }),
        });
        return;
      }

      if (action === "fetch-admin-data") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ success: true, data: mockAdminData }),
        });
        return;
      }

      if (action === "fetch-leads") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ success: true, data: mockLeads }),
        });
        return;
      }
    }

    if (request.method() === "POST") {
      const payload = request.postDataJSON?.() ?? JSON.parse(request.postData() || "{}");
      const postAction = payload.action || "";

      if (!postAction) {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ success: true, message: "Lead saved" }),
        });
        return;
      }

      if (postAction === "verify-admin-password") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ success: true, message: "Admin password verified." }),
        });
        return;
      }

      if (postAction === "update-lead-status") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ success: true, message: "Lead status updated" }),
        });
        return;
      }

      if (postAction === "save-admin-section" || postAction === "update-admin-password") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ success: true, message: "Admin action saved" }),
        });
        return;
      }
    }

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true }),
    });
  });
}
