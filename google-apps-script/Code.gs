var SHEET_NAMES = {
  settings: "settings",
  properties: "properties",
  localities: "localities",
  testimonials: "testimonials",
  faqs: "faqs",
  leads: "leads",
};

var SECTION_HEADERS = {
  settings: [
    "businessName",
    "phone",
    "whatsappNumber",
    "email",
    "address",
    "heroHeadline",
    "heroSubheadline",
    "primaryCTA",
    "secondaryCTA",
    "logoUrl",
    "heroImageUrl",
    "mapEmbedUrl",
    "adminPassword",
    "themePresetId",
    "themePrimaryColorOverride",
  ],
  properties: [
    "id",
    "slug",
    "title",
    "purpose",
    "propertyType",
    "city",
    "locality",
    "price",
    "priceLabel",
    "bedrooms",
    "bathrooms",
    "area",
    "areaUnit",
    "featuredImage",
    "galleryImages",
    "shortDescription",
    "fullDescription",
    "highlights",
    "amenities",
    "featured",
    "verified",
    "ctaMessage",
  ],
  localities: [
    "id",
    "slug",
    "name",
    "city",
    "shortDescription",
    "avgPriceLabel",
    "idealFor",
    "image",
    "highlights",
    "featured",
  ],
  testimonials: [
    "id",
    "name",
    "location",
    "role",
    "quote",
    "avatarImage",
  ],
  faqs: [
    "id",
    "question",
    "answer",
  ],
  leads: [
    "id",
    "timestamp",
    "sourcePage",
    "leadType",
    "inquiryType",
    "propertyTitle",
    "locality",
    "city",
    "budget",
    "propertyType",
    "expectedPrice",
    "timelineToSell",
    "name",
    "phone",
    "notes",
    "businessName",
    "requirement",
    "status",
  ],
};

var ARRAY_FIELDS = {
  properties: ["galleryImages", "highlights", "amenities"],
  localities: ["highlights"],
};

var NUMBER_FIELDS = {
  properties: ["price", "bedrooms", "bathrooms", "area"],
};

var BOOLEAN_FIELDS = {
  properties: ["featured", "verified"],
  localities: ["featured"],
};

function doGet(e) {
  try {
    var action = getAction_(e);

    if (action === "fetch-admin-data") {
      return jsonResponse_({
        success: true,
        data: buildAdminDataResponse_(),
      });
    }

    if (action === "fetch-leads") {
      return jsonResponse_({
        success: true,
        data: getLeadRows_(),
      });
    }

    return jsonResponse_({
      success: true,
      message: "Apps Script backend-lite is healthy.",
    });
  } catch (error) {
    return jsonResponse_({
      success: false,
      message: error.message || "GET request failed.",
    });
  }
}

function doPost(e) {
  try {
    var payload = parseRequestBody_(e);
    var action = payload.action || "";

    if (!action) {
      return handleLeadSubmission_(payload);
    }

    if (action === "save-admin-section") {
      return handleSaveAdminSection_(payload);
    }

    if (action === "update-admin-password") {
      return handleUpdateAdminPassword_(payload);
    }

    if (action === "update-lead-status") {
      return handleUpdateLeadStatus_(payload);
    }

    return jsonResponse_({
      success: false,
      message: "Unsupported action.",
    });
  } catch (error) {
    return jsonResponse_({
      success: false,
      message: error.message || "POST request failed.",
    });
  }
}

function handleLeadSubmission_(payload) {
  var lead = normalizeLead_(payload);
  appendRows_(SHEET_NAMES.leads, [lead], SECTION_HEADERS.leads);

  return jsonResponse_({
    success: true,
    message: "Lead saved",
    data: lead,
  });
}

function handleSaveAdminSection_(payload) {
  var section = payload.section;
  var sectionPayload = payload.payload;

  if (!SECTION_HEADERS[section]) {
    throw new Error("Unknown admin section: " + section);
  }

  if (section === "settings") {
    var normalizedSettings = normalizeSettings_(sectionPayload || {});
    writeRows_(SHEET_NAMES.settings, [flattenSettings_(normalizedSettings)], SECTION_HEADERS.settings, true);

    return jsonResponse_({
      success: true,
      message: "Settings saved",
      data: normalizedSettings,
    });
  }

  var rows = normalizeSectionRows_(section, sectionPayload);
  writeRows_(SHEET_NAMES[section], rows, SECTION_HEADERS[section], true);

  return jsonResponse_({
    success: true,
    message: section + " saved",
    data: rows,
  });
}

function handleUpdateAdminPassword_(payload) {
  var settings = getSettingsRow_();
  settings.adminPassword = String(payload.payload && payload.payload.adminPassword || "").trim();
  var normalizedSettings = normalizeSettings_(settings);

  writeRows_(SHEET_NAMES.settings, [flattenSettings_(normalizedSettings)], SECTION_HEADERS.settings, true);

  return jsonResponse_({
    success: true,
    message: "Admin password updated",
    data: normalizedSettings,
  });
}

function handleUpdateLeadStatus_(payload) {
  var leadId = String(payload.lead_id || "").trim();
  var status = String(payload.status || "").trim();

  if (!leadId || !status) {
    throw new Error("Lead ID and status are required.");
  }

  var sheet = getOrCreateSheet_(SHEET_NAMES.leads, SECTION_HEADERS.leads);
  var values = sheet.getDataRange().getValues();

  if (values.length < 2) {
    throw new Error("Lead not found.");
  }

  var headers = values[0];
  var idIndex = headers.indexOf("id");
  var statusIndex = headers.indexOf("status");

  for (var rowIndex = 1; rowIndex < values.length; rowIndex += 1) {
    if (String(values[rowIndex][idIndex]) === leadId) {
      sheet.getRange(rowIndex + 1, statusIndex + 1).setValue(status);
      return jsonResponse_({
        success: true,
        message: "Lead status updated",
      });
    }
  }

  throw new Error("Lead not found.");
}

function buildAdminDataResponse_() {
  return {
    settings: getSettingsRow_(),
    properties: getSectionRows_("properties"),
    localities: getSectionRows_("localities"),
    testimonials: getSectionRows_("testimonials"),
    faqs: getSectionRows_("faqs"),
  };
}

function getSettingsRow_() {
  var rows = readRows_(SHEET_NAMES.settings, SECTION_HEADERS.settings);
  var firstRow = rows[0] || {};

  return normalizeSettings_(firstRow);
}

function getSectionRows_(section) {
  return readRows_(SHEET_NAMES[section], SECTION_HEADERS[section]).map(function (row) {
    return normalizeSectionRow_(section, row);
  });
}

function getLeadRows_() {
  return readRows_(SHEET_NAMES.leads, SECTION_HEADERS.leads)
    .map(function (row) {
      return normalizeLead_(row);
    });
}

function normalizeSettings_(row) {
  var themeSource = row.theme || {};
  var themePresetId =
    row.themePresetId ||
    row.presetId ||
    themeSource.presetId ||
    "modern-blue";
  var themePrimaryColorOverride =
    row.themePrimaryColorOverride ||
    row.primaryColorOverride ||
    themeSource.primaryColorOverride ||
    "";

  return {
    businessName: row.businessName || "",
    phone: row.phone || "",
    whatsappNumber: row.whatsappNumber || "",
    email: row.email || "",
    address: row.address || "",
    heroHeadline: row.heroHeadline || "",
    heroSubheadline: row.heroSubheadline || "",
    primaryCTA: row.primaryCTA || "",
    secondaryCTA: row.secondaryCTA || "",
    logoUrl: row.logoUrl || "",
    heroImageUrl: row.heroImageUrl || "",
    mapEmbedUrl: row.mapEmbedUrl || "",
    adminPassword: row.adminPassword || "",
    theme: {
      presetId: themePresetId,
      primaryColorOverride: themePrimaryColorOverride,
    },
  };
}

function flattenSettings_(settings) {
  return {
    businessName: settings.businessName || "",
    phone: settings.phone || "",
    whatsappNumber: settings.whatsappNumber || "",
    email: settings.email || "",
    address: settings.address || "",
    heroHeadline: settings.heroHeadline || "",
    heroSubheadline: settings.heroSubheadline || "",
    primaryCTA: settings.primaryCTA || "",
    secondaryCTA: settings.secondaryCTA || "",
    logoUrl: settings.logoUrl || "",
    heroImageUrl: settings.heroImageUrl || "",
    mapEmbedUrl: settings.mapEmbedUrl || "",
    adminPassword: settings.adminPassword || "",
    themePresetId: settings.theme && settings.theme.presetId || "modern-blue",
    themePrimaryColorOverride: settings.theme && settings.theme.primaryColorOverride || "",
  };
}

function normalizeSectionRows_(section, payload) {
  return ensureArray_(payload).map(function (row) {
    return normalizeSectionRow_(section, row);
  });
}

function normalizeSectionRow_(section, row) {
  var nextRow = cloneObject_(row || {});

  (ARRAY_FIELDS[section] || []).forEach(function (field) {
    nextRow[field] = normalizeArrayField_(nextRow[field]);
  });

  (NUMBER_FIELDS[section] || []).forEach(function (field) {
    nextRow[field] = normalizeNumberField_(nextRow[field]);
  });

  (BOOLEAN_FIELDS[section] || []).forEach(function (field) {
    nextRow[field] = normalizeBooleanField_(nextRow[field]);
  });

  return nextRow;
}

function normalizeLead_(row) {
  var nextRow = cloneObject_(row || {});

  nextRow.id = nextRow.id || createLeadId_();
  nextRow.timestamp = nextRow.timestamp || new Date().toISOString();
  nextRow.sourcePage = nextRow.sourcePage || "";
  nextRow.leadType = nextRow.leadType || nextRow.intent || "";
  nextRow.inquiryType = nextRow.inquiryType || "";
  nextRow.propertyTitle = nextRow.propertyTitle || "";
  nextRow.locality = nextRow.locality || "";
  nextRow.city = nextRow.city || "";
  nextRow.budget = nextRow.budget || "";
  nextRow.propertyType = nextRow.propertyType || "";
  nextRow.expectedPrice = nextRow.expectedPrice || "";
  nextRow.timelineToSell = nextRow.timelineToSell || "";
  nextRow.name = nextRow.name || "";
  nextRow.phone = nextRow.phone || "";
  nextRow.notes = nextRow.notes || "";
  nextRow.businessName = nextRow.businessName || "";
  nextRow.requirement = nextRow.requirement || "";
  nextRow.status = nextRow.status || "new";

  return nextRow;
}

function readRows_(sheetName, defaultHeaders) {
  var sheet = getOrCreateSheet_(sheetName, defaultHeaders);
  var range = sheet.getDataRange();
  var values = range.getValues();

  if (!values.length) {
    return [];
  }

  var headers = values[0];
  return values.slice(1).filter(function (row) {
    return row.some(function (cell) {
      return String(cell || "").trim() !== "";
    });
  }).map(function (row) {
    return headers.reduce(function (record, header, index) {
      record[header] = parseCellValue_(row[index]);
      return record;
    }, {});
  });
}

function writeRows_(sheetName, rows, defaultHeaders, preserveExistingHeaders) {
  var sheet = getOrCreateSheet_(sheetName, defaultHeaders);
  var currentHeaders = getHeaders_(sheet);
  var mergedHeaders = mergeHeaders_(defaultHeaders, rows, preserveExistingHeaders ? currentHeaders : []);
  var matrix = [mergedHeaders].concat(rows.map(function (row) {
    return mergedHeaders.map(function (header) {
      return serializeCellValue_(row[header]);
    });
  }));

  sheet.clearContents();
  sheet.getRange(1, 1, matrix.length, mergedHeaders.length).setValues(matrix);
}

function appendRows_(sheetName, rows, defaultHeaders) {
  var sheet = getOrCreateSheet_(sheetName, defaultHeaders);
  var headers = mergeHeaders_(defaultHeaders, rows, getHeaders_(sheet));
  ensureHeaders_(sheet, headers);

  var matrix = rows.map(function (row) {
    return headers.map(function (header) {
      return serializeCellValue_(row[header]);
    });
  });

  if (matrix.length) {
    sheet.getRange(sheet.getLastRow() + 1, 1, matrix.length, headers.length).setValues(matrix);
  }
}

function getOrCreateSheet_(sheetName, defaultHeaders) {
  var spreadsheet = getSpreadsheet_();
  var sheet = spreadsheet.getSheetByName(sheetName);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }

  ensureHeaders_(sheet, defaultHeaders);
  return sheet;
}

function ensureHeaders_(sheet, headers) {
  var currentHeaders = getHeaders_(sheet);

  if (!currentHeaders.length) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    return;
  }

  if (currentHeaders.join("|") !== headers.join("|")) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    if (currentHeaders.length > headers.length) {
      sheet.getRange(1, headers.length + 1, 1, currentHeaders.length - headers.length).clearContent();
    }
  }
}

function getHeaders_(sheet) {
  if (sheet.getLastRow() < 1 || sheet.getLastColumn() < 1) {
    return [];
  }

  return sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].map(function (header) {
    return String(header || "").trim();
  }).filter(Boolean);
}

function mergeHeaders_(defaultHeaders, rows, existingHeaders) {
  var seen = {};
  var merged = [];

  defaultHeaders.concat(existingHeaders || []).forEach(function (header) {
    if (header && !seen[header]) {
      seen[header] = true;
      merged.push(header);
    }
  });

  rows.forEach(function (row) {
    Object.keys(row || {}).forEach(function (header) {
      if (header && !seen[header]) {
        seen[header] = true;
        merged.push(header);
      }
    });
  });

  return merged;
}

function parseCellValue_(value) {
  if (typeof value !== "string") {
    return value;
  }

  var trimmed = value.trim();

  if (!trimmed) {
    return "";
  }

  if ((trimmed.charAt(0) === "[" && trimmed.charAt(trimmed.length - 1) === "]") ||
      (trimmed.charAt(0) === "{" && trimmed.charAt(trimmed.length - 1) === "}")) {
    try {
      return JSON.parse(trimmed);
    } catch (error) {
      return trimmed;
    }
  }

  return trimmed;
}

function serializeCellValue_(value) {
  if (Array.isArray(value) || isPlainObject_(value)) {
    return JSON.stringify(value);
  }

  if (value === undefined || value === null) {
    return "";
  }

  return value;
}

function normalizeArrayField_(value) {
  if (Array.isArray(value)) {
    return value.map(function (item) {
      return String(item || "").trim();
    }).filter(Boolean);
  }

  if (typeof value === "string" && value.trim()) {
    try {
      var parsed = JSON.parse(value);
      return normalizeArrayField_(parsed);
    } catch (error) {
      return value.split(",").map(function (item) {
        return item.trim();
      }).filter(Boolean);
    }
  }

  return [];
}

function normalizeNumberField_(value) {
  if (value === "" || value === null || value === undefined) {
    return "";
  }

  var parsed = Number(value);
  return isNaN(parsed) ? "" : parsed;
}

function normalizeBooleanField_(value) {
  if (value === true || value === "true" || value === "TRUE") {
    return true;
  }

  if (value === false || value === "false" || value === "FALSE") {
    return false;
  }

  return false;
}

function createLeadId_() {
  return "lead-" + new Date().getTime();
}

function getSpreadsheet_() {
  var spreadsheetId = PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");

  if (spreadsheetId) {
    return SpreadsheetApp.openById(spreadsheetId);
  }

  return SpreadsheetApp.getActiveSpreadsheet();
}

function parseRequestBody_(e) {
  var rawBody = e && e.postData && e.postData.contents ? e.postData.contents : "{}";
  return JSON.parse(rawBody || "{}");
}

function getAction_(e) {
  return e && e.parameter && e.parameter.action ? e.parameter.action : "";
}

function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function cloneObject_(value) {
  return JSON.parse(JSON.stringify(value || {}));
}

function ensureArray_(value) {
  return Array.isArray(value) ? value : [];
}

function isPlainObject_(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}
