/*
Sample lead payload sent to Google Apps Script:
{
  "timestamp": "2026-04-18T23:59:59.000Z",
  "sourcePage": "Contact Page",
  "leadType": "buy",
  "inquiryType": "Buy Inquiry",
  "propertyTitle": "Camellias Signature Residence",
  "locality": "Golf Course Road",
  "city": "Gurugram",
  "budget": "Rs 7 Cr+",
  "propertyType": "Apartment",
  "expectedPrice": "",
  "timelineToSell": "",
  "name": "Ritika Sethi",
  "phone": "+91 98765 43210",
  "notes": "Looking for a site visit this weekend.",
  "businessName": "Urban Crest Realty",
  "requirement": "Camellias Signature Residence"
}

Sample Apps Script responses:
{ "success": true, "message": "Lead saved" }
{ "success": false, "message": "Save failed" }
*/

const GOOGLE_APPS_SCRIPT_URL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL;

async function parseResponseBody(response) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json().catch(() => null);
  }

  const text = await response.text().catch(() => "");
  return text ? { message: text } : null;
}

export async function submitLeadToSheet(payload) {
  if (!GOOGLE_APPS_SCRIPT_URL) {
    return {
      ok: false,
      status: 0,
      error: "Lead submission endpoint is not configured.",
      data: null,
    };
  }

  try {
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await parseResponseBody(response);

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        error: data?.message || "Could not save lead to system.",
        data,
      };
    }

    if (data && typeof data.success === "boolean" && !data.success) {
      return {
        ok: false,
        status: response.status,
        error: data.message || "Could not save lead to system.",
        data,
      };
    }

    return {
      ok: true,
      status: response.status,
      message: data?.message || "Lead saved successfully.",
      data,
    };
  } catch (error) {
    return {
      ok: false,
      status: 0,
      error: error instanceof Error ? error.message : "Network request failed while saving the lead.",
      data: null,
    };
  }
}
